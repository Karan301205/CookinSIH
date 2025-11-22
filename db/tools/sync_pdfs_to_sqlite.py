"""
Download PDFs from a Supabase storage bucket, extract text, and save into
a local SQLite `books` table.

Environment variables:
  SUPABASE_URL     - Supabase project URL
  SUPABASE_KEY     - Supabase anon/service role key
  SUPABASE_BUCKET  - (optional) bucket name, default: "books"
  SQLITE_DB_PATH   - (optional) sqlite db path, default: "db/content/books.sqlite"

Usage:
  python db/tools/sync_pdfs_to_sqlite.py

This script is intentionally simple and idempotent: it skips files whose
`pdf_url` already exists in the SQLite table.
"""
import os
import io
import sqlite3
import logging
from typing import Optional

import requests
import pdfplumber
from supabase import create_client
from dotenv import load_dotenv


# Load environment variables from .env if present
load_dotenv()


logging.basicConfig(level=logging.INFO, format="%(levelname)s: %(message)s")
logger = logging.getLogger(__name__)


def get_supabase_client() -> Optional[object]:
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key:
        logger.error("SUPABASE_URL and SUPABASE_KEY must be set in environment")
        return None
    return create_client(url, key)


def ensure_table(conn: sqlite3.Connection):
    conn.execute(
        """
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
        """
    )
    conn.commit()


def list_bucket_files(supabase, bucket: str):
    try:
        storage = supabase.storage
        # storage.from_(bucket) returns a client for the bucket in many versions
        bucket_client = getattr(storage, "from_")(bucket)

        # Try the common list() call
        res = None
        try:
            res = bucket_client.list()
        except TypeError:
            # Some implementations expect keyword args like list(path='')
            try:
                res = bucket_client.list(path="")
            except Exception:
                res = None

        # Defensive handling: many clients return (data, error) or dicts
        if isinstance(res, tuple) and len(res) >= 1:
            data = res[0]
        else:
            data = res

        # If still no data, try using the storage.list() high-level API if present
        if not data and hasattr(storage, "list"):
            try:
                data = storage.list(bucket)
            except Exception:
                data = None

        if not data:
            return []
        return data or []
    except Exception as e:
        logger.error("Error listing files in bucket '%s': %s", bucket, e)
        return []


def download_file_bytes(supabase, bucket: str, path: str) -> Optional[bytes]:
    try:
        storage = supabase.storage
        bucket_client = getattr(storage, "from_")(bucket)

        # Try direct download
        try:
            res = bucket_client.download(path)
            if isinstance(res, (bytes, bytearray)):
                return bytes(res)
            if hasattr(res, "read"):
                # file-like
                return res.read()
            if hasattr(res, "content"):
                return res.content
        except Exception:
            # continue to public URL fallback
            pass

        # Fallback: try public URL
        try:
            public = bucket_client.get_public_url(path)
        except Exception:
            # some clients expose get_public_url on storage
            try:
                public = storage.get_public_url(bucket, path)
            except Exception:
                public = None

        url = None
        if isinstance(public, dict):
            url = public.get("publicURL") or public.get("public_url") or public.get("url")
        elif isinstance(public, str):
            url = public
        if url:
            r = requests.get(url)
            r.raise_for_status()
            return r.content
    except Exception as e:
        logger.error("Failed to download %s from bucket %s: %s", path, bucket, e)
    return None


def extract_text_from_pdf_bytes(b: bytes) -> str:
    text_parts = []
    with pdfplumber.open(io.BytesIO(b)) as pdf:
        for page in pdf.pages:
            try:
                page_text = page.extract_text() or ""
            except Exception:
                page_text = ""
            if page_text:
                text_parts.append(page_text)
    return "\n\n".join(text_parts)


def main():
    supabase = get_supabase_client()
    if supabase is None:
        return

    bucket = os.environ.get("SUPABASE_BUCKET", "books")
    sqlite_path = os.environ.get("SQLITE_DB_PATH", "db/content/books.sqlite")

    os.makedirs(os.path.dirname(sqlite_path), exist_ok=True)
    conn = sqlite3.connect(sqlite_path)
    ensure_table(conn)

    files = list_bucket_files(supabase, bucket)
    if not files:
        logger.info("No files found in bucket '%s'", bucket)

    for entry in files:
        # entry may be a dict with 'name' or 'Key' depending on client
        name = None
        if isinstance(entry, dict):
            name = entry.get("name") or entry.get("Key") or entry.get("key")
        else:
            # sometimes the client returns plain strings
            name = str(entry)
        if not name:
            continue

        pdf_url = f"{bucket}/{name}"

        # Skip if already present
        cur = conn.execute("SELECT id FROM books WHERE pdf_url = ?", (pdf_url,))
        if cur.fetchone():
            logger.info("Skipping already-imported: %s", pdf_url)
            continue

        logger.info("Downloading: %s", name)
        data = download_file_bytes(supabase, bucket, name)
        if not data:
            logger.warning("Could not download %s, skipping", name)
            continue

        logger.info("Extracting text from: %s", name)
        text = extract_text_from_pdf_bytes(data)

        # Derive a title from filename if none provided
        title = os.path.splitext(os.path.basename(name))[0]

        conn.execute(
            "INSERT INTO books (title, class, subject, language, pdf_url, extracted_text) VALUES (?, ?, ?, ?, ?, ?)",
            (title, None, None, "English", pdf_url, text),
        )
        conn.commit()
        logger.info("Imported: %s", name)

    conn.close()


if __name__ == "__main__":
    main()
