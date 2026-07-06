"""Vercel serverless entrypoint — exposes the FastAPI app at the service root.

Local development still uses:  uvicorn app.main:app --reload --port 8000
"""
from app.main import app  # noqa: F401
