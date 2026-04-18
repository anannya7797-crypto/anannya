# Portfolio App

This project contains:

- a React + Vite frontend in the repository root
- a Django REST Framework backend in [backend](C:/Users/DELL/Proj/Portfolio/Frontened/artisan-app-view-main/backend/manage.py)

## Frontend

Install and run:

```bash
npm install
npm run dev
```

The frontend expects the API at `http://localhost:8000/api` by default.

If you want to override that, set:

```bash
VITE_API_URL=http://localhost:8000/api
```

For production builds, use [.env.production.example](C:/Users/DELL/Proj/Portfolio/Frontened/artisan-app-view-main/.env.production.example) as the template and point it at your deployed backend:

```bash
VITE_API_URL=https://api.anannya.info/api
```

## Backend

Backend dependencies are listed in [backend/requirements.txt](C:/Users/DELL/Proj/Portfolio/Frontened/artisan-app-view-main/backend/requirements.txt).

Run the backend from [backend](C:/Users/DELL/Proj/Portfolio/Frontened/artisan-app-view-main/backend/manage.py):

```bash
python manage.py migrate
python manage.py seed_portfolio
python manage.py runserver
```

For environment variables, copy values from [.env.example](C:/Users/DELL/Proj/Portfolio/Frontened/artisan-app-view-main/.env.example).

## PostgreSQL and deployment

The backend is now prepared for production with:

- `DATABASE_URL` support for PostgreSQL
- `whitenoise` static file serving
- `gunicorn` for Linux hosting
- env-driven `ALLOWED_HOSTS`, CORS, and CSRF trusted origins
- secure cookie and HTTPS redirect settings that default on when `DJANGO_DEBUG=False`

Example production environment values:

```bash
DJANGO_DEBUG=False
DJANGO_SECRET_KEY=your-production-secret
DJANGO_ALLOWED_HOSTS=api.anannya.info
DJANGO_CORS_ALLOWED_ORIGINS=https://anannya.info,https://www.anannya.info
DJANGO_CSRF_TRUSTED_ORIGINS=https://anannya.info,https://www.anannya.info,https://api.anannya.info
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DBNAME
DJANGO_SECURE_SSL_REDIRECT=True
DJANGO_SESSION_COOKIE_SECURE=True
DJANGO_CSRF_COOKIE_SECURE=True
DJANGO_SECURE_HSTS_SECONDS=3600
DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS=True
DJANGO_SECURE_HSTS_PRELOAD=False
```

Production startup flow:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_portfolio
python manage.py collectstatic --noinput
gunicorn config.wsgi:application
```

Recommended domain setup:

- frontend: `https://anannya.info`
- backend API: `https://api.anannya.info`

Then set the frontend env:

```bash
VITE_API_URL=https://api.anannya.info/api
```

## API routes

- `GET /api/`
- `GET /api/projects/`
- `GET /api/blogs/`
- `GET /api/skills/`
- `GET /api/timeline/`
- `POST /api/contact/`
- `POST /api/ai/infer/`

## Notes

- `POST /api/contact/` stores contact form submissions in SQLite.
- `POST /api/ai/infer/` returns a lightweight sentiment result compatible with the current AI Lab frontend.
- Seed data mirrors the portfolio mock data so the frontend can transition cleanly from fallback mode to live API mode.
