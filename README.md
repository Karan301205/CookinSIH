# CookinSIH — PDF to SQLite sync

This repository has been trimmed to a minimal toolset for importing PDF files
stored in a Supabase storage bucket into a local SQLite `books` database.

What remains in the repo:

- `db/content/sqlite_books_schema.sql` — local SQLite `books` table schema
- `db/tools/sync_pdfs_to_sqlite.py` — script to download PDFs, extract text, and insert rows into SQLite
- `requirements.txt` — Python dependencies for the sync script

Quick start

1. Install dependencies:

```bash
pip install -r requirements.txt
```

2. Export Supabase credentials and run the sync:

```bash
export SUPABASE_URL=https://xyz.supabase.co
export SUPABASE_KEY='your_supabase_key_here'
export SUPABASE_BUCKET=books        # optional, defaults to 'books'
export SQLITE_DB_PATH=db/content/books.sqlite  # optional
python db/tools/sync_pdfs_to_sqlite.py
```

Notes

- The script is idempotent and skips PDFs already imported (uses `pdf_url` as unique key).
- The repository has been pruned of vector-search and other app-specific artifacts — it's focused only on the PDF→SQLite workflow.
