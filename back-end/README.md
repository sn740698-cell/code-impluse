# AI Career Compass backend

## Setup

1. Create `back-end/.env` from `.env.example` and enter PostgreSQL credentials.
2. Install dependencies: `pip install -r requirements.txt`.
3. Create the database named by `POSTGRES_DB`, then run `python manage.py migrate`.
4. Start Ollama with `ollama serve` and ensure the configured Qwen model is available, e.g. `ollama pull qwen3:8b`.
5. Run `python manage.py runserver`.

The API uses Django's session authentication. Create users in `/admin/`, then add a Profile with role `teacher` to authorize opportunity publishing.

If no `POSTGRES_PASSWORD` is supplied, the backend automatically uses `db.sqlite3` for local development. To use PostgreSQL (the production configuration), set a real `POSTGRES_PASSWORD` in `.env`, create the `POSTGRES_DB` database, and run migrations again.

Recommendation scores are deterministic and configurable in `opportunities/services.py`. Ollama is isolated to `ai/services.py`, where its JSON output is parsed, whitelisted, and safely falls back if unavailable.
