# MASF & Partners — Backend (FastAPI)

Handles contact-form submissions for the corporate website: validation,
per-IP rate limiting, honeypot + optional Cloudflare Turnstile anti-spam,
SQLite persistence, file attachments and optional email notification.

## Run locally

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1        # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Interactive API docs: http://127.0.0.1:8000/docs

## Endpoints

| Method | Path                                    | Purpose                                                            |
| ------ | --------------------------------------- | ------------------------------------------------------------------ |
| GET    | `/api/health`                           | Liveness check                                                      |
| POST   | `/api/contact`                          | Store a contact-form submission (multipart; optional `attachment`) |
| GET    | `/api/submissions`                      | List submissions — requires `MASF_ADMIN_TOKEN` + `X-Admin-Token`   |
| GET    | `/api/submissions/{id}/attachment`      | Download a stored attachment — same admin token                    |

Submissions live in `backend/data/submissions.db`; uploaded files in
`backend/data/uploads/` (both created automatically — back up `data/`).

Configuration is via environment variables, auto-loaded from `backend/.env`
if present — see [.env.example](.env.example). Email notification activates
only when `MASF_SMTP_HOST` is set; Turnstile verification only when
`MASF_TURNSTILE_SECRET` is set. The form works without either.

## Asset generators (dev tools)

```powershell
pip install -r requirements-dev.txt
python scripts\generate_profile_pdf.py    # -> frontend/public/downloads/*.pdf
python scripts\generate_og_image.py       # -> frontend/public/og-image.png
```

## Single-server deployment

If `frontend/dist` exists (run `npm run build` in `frontend/`), this app also
serves the built site at `/` with SPA fallback routing — one process serves
both the website and the API, so no CORS setup is needed in production. See
the root `Dockerfile` for a containerised version.
