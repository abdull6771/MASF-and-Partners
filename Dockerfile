# Single-container deployment: builds the React frontend, then serves it and
# the API from one FastAPI process on port 8000.
#
#   docker build --build-arg VITE_SITE_URL=https://your-domain.tld -t masf-site .
#   docker run -p 8000:8000 -v masf-data:/app/backend/data --env-file backend/.env masf-site
#
# The volume keeps SQLite submissions and uploads across restarts.

FROM node:22-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci --no-fund --no-audit
COPY frontend/ ./
ARG VITE_SITE_URL
ENV VITE_SITE_URL=$VITE_SITE_URL
RUN npm run build

FROM python:3.12-slim
WORKDIR /app/backend
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/app ./app
COPY --from=frontend /app/frontend/dist /app/frontend/dist
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
