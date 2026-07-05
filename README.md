# MASF & Partners Limited — Corporate Website

Production-ready corporate website for **MASF & Partners Limited**, a Nigerian
environmental and engineering consultancy in Wuse II, Abuja (RC 1161410).

> “Let our services be your advantage.”

| Folder      | Stack                                              | Purpose                                                 |
| ----------- | -------------------------------------------------- | ------------------------------------------------------- |
| `frontend/` | React 19 · Vite 6 · Tailwind CSS v4 · lucide-react | The website (7 pages + staff admin, client-side routed) |
| `backend/`  | FastAPI · SQLite · Uvicorn                          | Contact API, attachments, admin listing, static host    |

## Quick start (two terminals)

**Terminal 1 — backend** (Python 3.11+):

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1        # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 — frontend** (Node 20+):

```powershell
cd frontend
npm install
npm run dev
```

Open http://localhost:5173. The Vite dev server proxies `/api/*` to the
backend on port 8000, so the contact form works end-to-end with no CORS setup.

## Features

- **7 public pages** — Home, About (story, board, org structure, HSE policy),
  Services (4 pillars / 20 expandable services), Projects (filterable),
  Capabilities (owned instrument fleet), Compliance (tender credentials),
  Contact (validated form with optional file attachment).
- **Contact pipeline** — submissions are validated (client + server),
  rate-limited per IP, honeypot-filtered, stored in SQLite with the uploaded
  RFQ/tender document, optionally emailed to the company inbox, and optionally
  gated by Cloudflare Turnstile.
- **Staff admin** — `/admin` (not linked in navigation, `noindex`, disallowed
  in robots.txt) lists enquiries and downloads attachments. Enable it by
  setting `MASF_ADMIN_TOKEN` on the backend; staff enter that token on the page.
- **WhatsApp click-to-chat** — floating button site-wide plus a contact-page
  entry (number configured in `frontend/src/data/content.js`).
- **Company profile PDF** — generated, brand-styled 3-page profile at
  `/downloads/MASF-Partners-Company-Profile.pdf`, linked from the Compliance
  page and footer.
- **SEO** — per-page meta, JSON-LD Organization + LocalBusiness, generated
  `sitemap.xml` + `robots.txt`, Open Graph tags with a branded 1200×630 share
  image (`/og-image.png`).
- **Analytics-ready** — set `VITE_PLAUSIBLE_DOMAIN` to enable privacy-friendly
  Plausible analytics (no cookies, GDPR/NDPR-friendly).
- **Testimonials & certificate scans** — data-driven and hidden until real
  content is added (see Customisation below).

## Configuration

Copy the examples and fill in what you need — both files are auto-loaded:

- `backend/.env.example` → `backend/.env` — SMTP email notifications, admin
  token, Turnstile secret, rate limits, CORS origins, storage paths.
- `frontend/.env.example` → `frontend/.env` — production domain
  (`VITE_SITE_URL`), separate API origin, Plausible domain, Turnstile site key.

**To receive enquiries by email (recommended first step):** create a Gmail App
Password (Google Account → Security → 2-Step Verification → App passwords),
then set `MASF_SMTP_HOST/PORT/USER/PASSWORD` in `backend/.env` and restart the
backend. Submissions are stored in SQLite either way.

## Production deployment

**Single server (simplest):**

```powershell
cd frontend
npm run build        # emits dist/ + sitemap/robots + domain-injected meta
cd ..\backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

When `frontend/dist` exists, FastAPI serves the built site at `/` with SPA
fallback — one process for website + API. Put Caddy or Nginx in front for
HTTPS.

**Docker:**

```bash
docker build --build-arg VITE_SITE_URL=https://your-domain.tld -t masf-site .
docker run -p 8000:8000 -v masf-data:/app/backend/data --env-file backend/.env masf-site
```

**Split hosting** (Netlify/Vercel frontend + Railway/Render backend): set
`VITE_API_BASE_URL` at build time and add the frontend origin to
`MASF_CORS_ORIGINS`.

**Backups:** everything user-generated lives in `backend/data/` (SQLite
database + uploaded attachments). Copy that folder on a schedule — e.g. a
daily Windows Task Scheduler job or a volume snapshot in Docker.

## Design decisions

- **Palette** — deep brand teal (`brand-*`) with a deep-blue partner hue
  (`sea-*`), both derived from the green/blue logo, over white and slate. One
  warm amber accent for primary CTAs. All text combinations meet WCAG 2.1 AA.
- **Typography** — Space Grotesk (display) + Inter (body), loaded with
  `display=swap`.
- **Graphics** — no stock photos; abstract SVG motifs (topographic contours,
  circuit traces, dot grids, power-line catenaries) echo the four disciplines.
- **Motion** — IntersectionObserver reveals, fully disabled under
  `prefers-reduced-motion`.
- **Accessibility** — semantic landmarks, correct heading order, skip link,
  focus-trapped mobile menu, ARIA accordions and form-error associations.
- **Honest claims** — copy derives from the company profile only; the Projects
  page notes that 2006–2009 engagements predate the 2013 incorporation.

## Customisation guide

| What                     | Where                                                                                     |
| ------------------------ | ----------------------------------------------------------------------------------------- |
| Colors & fonts           | `frontend/src/index.css` — `@theme` tokens (`--color-brand-*`, `--color-sea-*`, `--font-*`) |
| All copy, projects, team | `frontend/src/data/content.js` — one data module drives every page                        |
| Add a project            | Append to `projects` in `content.js` (`category`, optional `featured: true`)              |
| Add testimonials         | Fill the `testimonials` array in `content.js` — the Home section appears automatically     |
| Certificate scans        | Drop images in `frontend/public/certificates/`, then set `image: "/certificates/x.jpg"` on entries in `credentials` |
| WhatsApp number          | `company.whatsapp` in `content.js`                                                        |
| Regenerate profile PDF   | Edit + run `backend/scripts/generate_profile_pdf.py` (needs `pip install -r backend/requirements-dev.txt`) |
| Regenerate share image   | `backend/scripts/generate_og_image.py`                                                    |
| Read enquiries           | Visit `/admin` with the `MASF_ADMIN_TOKEN` value, or `GET /api/submissions` with the `X-Admin-Token` header |
| Anti-spam hardening      | Create a free Cloudflare Turnstile widget; set `VITE_TURNSTILE_SITE_KEY` (frontend) + `MASF_TURNSTILE_SECRET` (backend) |

## Before go-live checklist

- [ ] Point a real domain; set `VITE_SITE_URL` in `frontend/.env` and rebuild
      (fixes og:url/og:image, sitemap.xml, robots.txt automatically).
- [ ] Configure SMTP in `backend/.env` so enquiries reach the inbox; send a
      test enquiry end-to-end.
- [ ] Set a strong `MASF_ADMIN_TOKEN` and share it only with staff.
- [ ] Verify the social profile URLs in `content.js` match the live accounts.
- [ ] Replace the SVG monogram with the real company logo
      (`frontend/src/components/BrandMark.jsx`, `frontend/public/favicon.svg`).
- [ ] Add real project/team photos when available.
- [ ] Add certificate scans and client testimonials (see Customisation).
- [ ] Create a **Google Business Profile** for “MASF & Partners Limited, Wuse
      II, Abuja” — free, and the biggest quick win for local search.
- [ ] Optional: enable Plausible analytics and Cloudflare Turnstile.
