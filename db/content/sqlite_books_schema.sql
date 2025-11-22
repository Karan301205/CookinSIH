-- SQLite schema for the `books` table (local use)
-- This schema is intentionally permissive for `class` and `subject`
-- to accommodate PDF-only imports where metadata may be missing.

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  class INTEGER,
  subject TEXT,
  language TEXT DEFAULT 'English',
  pdf_url TEXT NOT NULL UNIQUE,
  extracted_text TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
