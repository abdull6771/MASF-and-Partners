"""MASF & Partners Limited — backend API.

FastAPI service for the corporate website. Handles contact-form submissions:
validates input, applies a light per-IP rate limit, stores submissions (and
optional file attachments) in SQLite, optionally verifies a Cloudflare
Turnstile challenge, and forwards enquiries by email when SMTP is configured.

Run from the backend/ directory:
    uvicorn app.main:app --reload --port 8000
"""
from __future__ import annotations

import hmac
import json
import logging
import os
import re
import smtplib
import sqlite3
import threading
import time
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from email.message import EmailMessage
from pathlib import Path

from fastapi import FastAPI, File, Form, Header, HTTPException, Request, UploadFile
from fastapi.concurrency import run_in_threadpool
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, EmailStr, Field, ValidationError, field_validator
from starlette.exceptions import HTTPException as StarletteHTTPException

logger = logging.getLogger("masf")

BACKEND_DIR = Path(__file__).resolve().parent.parent


def _load_env_file() -> None:
    """Load backend/.env into the environment. Real env vars take precedence."""
    env_path = BACKEND_DIR / ".env"
    if not env_path.is_file():
        return
    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip("'\""))


_load_env_file()

# --------------------------------------------------------------------------
# Configuration (overridable via environment variables — see .env.example)
# --------------------------------------------------------------------------
# On serverless platforms (Vercel sets VERCEL=1) the project directory is
# read-only and only /tmp is writable — and /tmp is EPHEMERAL, so submissions
# and attachments do not persist between invocations there. Configure the
# MASF_SMTP_* variables so every enquiry is emailed, or point MASF_DB_PATH at
# persistent storage.
_DEFAULT_DATA_DIR = Path("/tmp/masf-data") if os.getenv("VERCEL") else BACKEND_DIR / "data"
DB_PATH = Path(os.getenv("MASF_DB_PATH", str(_DEFAULT_DATA_DIR / "submissions.db")))
UPLOAD_DIR = Path(os.getenv("MASF_UPLOAD_DIR", str(_DEFAULT_DATA_DIR / "uploads")))
ADMIN_TOKEN = os.getenv("MASF_ADMIN_TOKEN", "")
TURNSTILE_SECRET = os.getenv("MASF_TURNSTILE_SECRET", "")
CORS_ORIGINS = [
    origin.strip()
    for origin in os.getenv(
        "MASF_CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173"
    ).split(",")
    if origin.strip()
]
RATE_LIMIT_MAX = int(os.getenv("MASF_RATE_LIMIT_MAX", "5"))
RATE_LIMIT_WINDOW = int(os.getenv("MASF_RATE_LIMIT_WINDOW_SECONDS", "600"))
MAX_ATTACHMENT_BYTES = int(os.getenv("MASF_MAX_ATTACHMENT_MB", "10")) * 1024 * 1024

SERVICES = (
    "General enquiry",
    "Environmental Consultancy",
    "Electrical & Mechanical Engineering",
    "ICT & Telecommunications",
    "Safety & Security",
)

PHONE_RE = re.compile(r"^[0-9+()\s\-]{7,20}$")
ALLOWED_ATTACHMENT_EXTENSIONS = {
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".png",
    ".jpg",
    ".jpeg",
}

app = FastAPI(
    title="MASF & Partners API",
    version="1.1.0",
    description="Backend for the MASF & Partners Limited corporate website.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------------
# Storage
# --------------------------------------------------------------------------
def _connect() -> sqlite3.Connection:
    DB_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DB_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def _init_db() -> None:
    with _connect() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                created_at TEXT NOT NULL,
                name TEXT NOT NULL,
                organization TEXT,
                email TEXT NOT NULL,
                phone TEXT,
                service TEXT NOT NULL,
                message TEXT NOT NULL,
                client_ip TEXT,
                attachment TEXT
            )
            """
        )
        # Databases created before the attachment feature: add the column.
        try:
            connection.execute("ALTER TABLE submissions ADD COLUMN attachment TEXT")
        except sqlite3.OperationalError:
            pass  # column already exists


_init_db()


# --------------------------------------------------------------------------
# Models
# --------------------------------------------------------------------------
class ContactSubmission(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    organization: str | None = Field(default=None, max_length=160)
    email: EmailStr
    phone: str | None = None
    service: str = Field(default="General enquiry")
    message: str = Field(..., min_length=10, max_length=5000)

    @field_validator("name", "message", mode="before")
    @classmethod
    def _strip_text(cls, value):
        return value.strip() if isinstance(value, str) else value

    @field_validator("organization", mode="before")
    @classmethod
    def _organization_empty_to_none(cls, value):
        if isinstance(value, str):
            value = value.strip()
            return value or None
        return value

    @field_validator("phone", mode="before")
    @classmethod
    def _validate_phone(cls, value):
        if value is None:
            return None
        value = value.strip()
        if not value:
            return None
        if not PHONE_RE.fullmatch(value):
            raise ValueError("Enter a valid phone number (digits, +, spaces, dashes).")
        return value

    @field_validator("service")
    @classmethod
    def _validate_service(cls, value):
        if value not in SERVICES:
            raise ValueError("Unknown service selection.")
        return value


# --------------------------------------------------------------------------
# Rate limiting (in-memory, per client IP)
# --------------------------------------------------------------------------
_rate_lock = threading.Lock()
_hits: dict[str, list[float]] = {}


def _rate_limited(client_ip: str) -> bool:
    now = time.monotonic()
    with _rate_lock:
        recent = [t for t in _hits.get(client_ip, []) if now - t < RATE_LIMIT_WINDOW]
        if len(recent) >= RATE_LIMIT_MAX:
            _hits[client_ip] = recent
            return True
        recent.append(now)
        _hits[client_ip] = recent
        return False


# --------------------------------------------------------------------------
# Cloudflare Turnstile (active only when MASF_TURNSTILE_SECRET is set)
# --------------------------------------------------------------------------
def _verify_turnstile(token: str, client_ip: str) -> bool:
    if not token:
        return False
    try:
        payload = urllib.parse.urlencode(
            {"secret": TURNSTILE_SECRET, "response": token, "remoteip": client_ip}
        ).encode()
        request = urllib.request.Request(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify", data=payload
        )
        with urllib.request.urlopen(request, timeout=7) as response:
            return bool(json.loads(response.read().decode()).get("success"))
    except Exception:  # noqa: BLE001 — fail closed on network/parse errors
        logger.exception("Turnstile verification errored")
        return False


# --------------------------------------------------------------------------
# Optional email notification (enabled by setting MASF_SMTP_HOST)
# --------------------------------------------------------------------------
def _maybe_send_email(submission: ContactSubmission, attachment_name: str | None) -> None:
    host = os.getenv("MASF_SMTP_HOST")
    if not host:
        return
    try:
        port = int(os.getenv("MASF_SMTP_PORT", "587"))
        user = os.getenv("MASF_SMTP_USER", "")
        password = os.getenv("MASF_SMTP_PASSWORD", "")
        recipient = os.getenv("MASF_NOTIFY_TO", "masfpartnerslimited@gmail.com")
        sender = os.getenv("MASF_SMTP_FROM", user or "no-reply@masfpartners.local")

        email = EmailMessage()
        email["Subject"] = f"New website enquiry — {submission.service} — {submission.name}"
        email["From"] = sender
        email["To"] = recipient
        email.set_content(
            "\n".join(
                [
                    f"Name: {submission.name}",
                    f"Organisation: {submission.organization or '-'}",
                    f"Email: {submission.email}",
                    f"Phone: {submission.phone or '-'}",
                    f"Service: {submission.service}",
                    f"Attachment: {attachment_name or '-'} (stored on the server)",
                    "",
                    submission.message,
                ]
            )
        )
        with smtplib.SMTP(host, port, timeout=10) as server:
            server.starttls()
            if user:
                server.login(user, password)
            server.send_message(email)
    except Exception:  # noqa: BLE001 — notification is best-effort by design
        logger.exception("Email notification failed; submission is still stored.")


# --------------------------------------------------------------------------
# Helpers
# --------------------------------------------------------------------------
def _require_admin(x_admin_token: str) -> None:
    if not ADMIN_TOKEN:
        raise HTTPException(status_code=404, detail="Not found.")
    if not hmac.compare_digest(x_admin_token, ADMIN_TOKEN):
        raise HTTPException(status_code=403, detail="Invalid admin token.")


def _safe_filename(original: str) -> str:
    name = Path(original).name
    return re.sub(r"[^A-Za-z0-9._-]", "_", name)[:80]


# --------------------------------------------------------------------------
# Routes
# --------------------------------------------------------------------------
@app.get("/api/health")
def health() -> dict:
    return {
        "status": "ok",
        "service": "masf-partners-api",
        "time": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/api/contact", status_code=201)
async def create_contact(
    request: Request,
    name: str = Form(""),
    organization: str = Form(""),
    email: str = Form(""),
    phone: str = Form(""),
    service: str = Form("General enquiry"),
    message: str = Form(""),
    website: str = Form(""),  # honeypot — humans never see or fill this field
    turnstile_token: str = Form("", alias="cf-turnstile-response"),
    attachment: UploadFile | None = File(default=None),
) -> dict:
    # Bots that fill the honeypot get a fake success and are never stored.
    if website:
        return {"ok": True, "id": None}

    try:
        submission = ContactSubmission(
            name=name,
            organization=organization,
            email=email,
            phone=phone,
            service=service,
            message=message,
        )
    except ValidationError as exc:
        raise HTTPException(
            status_code=422,
            detail=[
                {
                    "field": ".".join(str(part) for part in error["loc"]),
                    "message": error["msg"],
                }
                for error in exc.errors()
            ],
        ) from exc

    client_ip = request.client.host if request.client else "unknown"
    if _rate_limited(client_ip):
        raise HTTPException(
            status_code=429,
            detail="Too many submissions from this address. Please try again later or email us directly.",
        )

    if TURNSTILE_SECRET and not await run_in_threadpool(
        _verify_turnstile, turnstile_token, client_ip
    ):
        raise HTTPException(
            status_code=400,
            detail="Human verification failed. Please retry the challenge, or email us directly.",
        )

    # Validate and buffer the optional attachment before touching the database.
    attachment_bytes: bytes | None = None
    attachment_original: str | None = None
    if attachment is not None and attachment.filename:
        attachment_original = _safe_filename(attachment.filename)
        extension = Path(attachment_original).suffix.lower()
        if extension not in ALLOWED_ATTACHMENT_EXTENSIONS:
            raise HTTPException(
                status_code=422,
                detail="Unsupported attachment type. Allowed: PDF, Word, Excel, PNG or JPG.",
            )
        attachment_bytes = await attachment.read()
        if len(attachment_bytes) > MAX_ATTACHMENT_BYTES:
            raise HTTPException(
                status_code=413,
                detail=f"Attachment is too large (max {MAX_ATTACHMENT_BYTES // (1024 * 1024)} MB).",
            )
        if not attachment_bytes:
            attachment_bytes = None
            attachment_original = None

    created_at = datetime.now(timezone.utc).isoformat()
    stored_name: str | None = None
    with _connect() as connection:
        cursor = connection.execute(
            """
            INSERT INTO submissions
                (created_at, name, organization, email, phone, service, message, client_ip, attachment)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NULL)
            """,
            (
                created_at,
                submission.name,
                submission.organization,
                submission.email,
                submission.phone,
                submission.service,
                submission.message,
                client_ip,
            ),
        )
        submission_id = cursor.lastrowid
        if attachment_bytes:
            stored_name = f"{submission_id:06d}_{attachment_original}"
            UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
            (UPLOAD_DIR / stored_name).write_bytes(attachment_bytes)
            connection.execute(
                "UPDATE submissions SET attachment = ? WHERE id = ?",
                (stored_name, submission_id),
            )

    await run_in_threadpool(_maybe_send_email, submission, attachment_original)
    return {
        "ok": True,
        "id": submission_id,
        "received_at": created_at,
        "attachment": stored_name,
    }


@app.get("/api/submissions")
def list_submissions(x_admin_token: str = Header(default="")) -> list[dict]:
    """Admin-only listing of stored submissions.

    Disabled unless MASF_ADMIN_TOKEN is set; requests must send the token in
    the X-Admin-Token header.
    """
    _require_admin(x_admin_token)
    with _connect() as connection:
        rows = connection.execute(
            "SELECT * FROM submissions ORDER BY id DESC LIMIT 200"
        ).fetchall()
    return [dict(row) for row in rows]


@app.get("/api/submissions/{submission_id}/attachment")
def download_attachment(
    submission_id: int, x_admin_token: str = Header(default="")
) -> FileResponse:
    """Admin-only download of a submission's stored attachment."""
    _require_admin(x_admin_token)
    with _connect() as connection:
        row = connection.execute(
            "SELECT attachment FROM submissions WHERE id = ?", (submission_id,)
        ).fetchone()
    if not row or not row["attachment"]:
        raise HTTPException(status_code=404, detail="No attachment for this submission.")
    stored_name = Path(row["attachment"]).name  # defence against path tampering
    file_path = UPLOAD_DIR / stored_name
    if not file_path.is_file():
        raise HTTPException(status_code=404, detail="Attachment file is missing.")
    download_name = stored_name.split("_", 1)[1] if "_" in stored_name else stored_name
    return FileResponse(file_path, filename=download_name)


# --------------------------------------------------------------------------
# Single-server deployment: serve the built frontend when frontend/dist exists
# --------------------------------------------------------------------------
class SPAStaticFiles(StaticFiles):
    """Static file server that falls back to index.html for SPA routes."""

    async def get_response(self, path: str, scope):
        try:
            response = await super().get_response(path, scope)
        except StarletteHTTPException as exc:
            if exc.status_code == 404:
                return await super().get_response("index.html", scope)
            raise
        if response.status_code == 404:
            return await super().get_response("index.html", scope)
        return response


_dist = BACKEND_DIR.parent / "frontend" / "dist"
if _dist.is_dir():
    app.mount("/", SPAStaticFiles(directory=_dist, html=True), name="frontend")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True)
