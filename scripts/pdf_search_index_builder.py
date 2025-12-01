#!/usr/bin/env python3
"""
index_books.py

Usage:
  python index_books.py                # build / update DB from Supabase bucket
  python index_books.py --search "q"   # run a search query

Environment:
  SUPABASE_URL    Supabase project URL
  SUPABASE_KEY    Supabase service role or anon key

Optional args:
  --bucket        Supabase storage bucket name (default: 'books')
  --db            SQLite DB filepath (default: 'books.db')
  --download-dir  Directory to store downloaded PDFs (default: './downloads')

This script downloads PDFs from a Supabase bucket, extracts text, performs
smart paragraph chunking, and indexes chunks into a SQLite FTS5 virtual table
for retrieval.
"""

import os
import re
import sys
import argparse
import logging
import sqlite3
from pathlib import Path
from typing import List, Tuple

try:
    from supabase import create_client
except Exception:
    print("Missing dependency 'supabase'. Install from requirements.txt")
    raise

try:
    import fitz  # PyMuPDF
except Exception:
    print("Missing dependency 'PyMuPDF'. Install from requirements.txt")
    raise

from tqdm import tqdm
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s: %(message)s")
logger = logging.getLogger(__name__)


def get_supabase_client():
    url = os.environ.get("SUPABASE_URL")
    key = os.environ.get("SUPABASE_KEY")
    if not url or not key:
        logger.error("SUPABASE_URL and SUPABASE_KEY must be set in environment")
        sys.exit(1)
    return create_client(url, key)


def list_bucket_files(supabase, bucket: str) -> List[str]:
    # Returns a list of object names (paths) in the bucket root
    logger.info("Listing files in bucket '%s'", bucket)
    try:
        res = supabase.storage().from_(bucket).list()
    except Exception as e:
        logger.error("Failed to list bucket '%s': %s", bucket, e)
        raise
    names = []
    for item in res:
        # supabase-py list items have 'name'
        name = item.get("name") if isinstance(item, dict) else None
        if not name:
            # try attribute access
            try:
                name = item.name
            except Exception:
                name = None
        if name and name.lower().endswith(".pdf"):
            names.append(name)
    logger.info("Found %d pdf(s) in bucket", len(names))
    return names


def download_file(supabase, bucket: str, object_name: str, dest_dir: Path) -> Path:
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest_path = dest_dir / Path(object_name).name
    logger.info("Downloading '%s' to '%s'", object_name, dest_path)
    try:
        data = supabase.storage().from_(bucket).download(object_name)
    except Exception as e:
        logger.error("Download failed for %s: %s", object_name, e)
        raise

    # supabase-py may return bytes or a response-like object
    if isinstance(data, (bytes, bytearray)):
        content = data
    else:
        # Try to read .content or file-like
        content = None
        if hasattr(data, "content"):
            content = data.content
        elif hasattr(data, "read"):
            content = data.read()
        else:
            logger.error("Unknown download response type for %s", object_name)
            raise RuntimeError("Unknown download response type")

    with open(dest_path, "wb") as f:
        f.write(content)

    return dest_path


def extract_text_from_pdf(path: Path) -> str:
    logger.info("Extracting text from '%s'", path)
    doc = fitz.open(str(path))
    parts = []
    for page in doc:
        text = page.get_text("text")
        parts.append(text)
    doc.close()
    return "\n".join(parts)


def split_into_sentences(text: str) -> List[str]:
    # Simple sentence splitter that tries to preserve abbreviations roughly
    # Splits on punctuation followed by whitespace and a capital letter or digit
    text = text.strip()
    if not text:
        return []
    sentences = re.split(r'(?<=[.!?])\s+(?=[A-Z0-9"\'])', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    return sentences


def words_count(text: str) -> int:
    return len(re.findall(r"\w+", text))


def smart_chunk_text(text: str, min_words=40, max_words=120) -> List[str]:
    # 1) Split by blank lines
    raw_parts = [p.strip() for p in text.split("\n\n")]
    parts = [p for p in raw_parts if p]

    chunks: List[str] = []

    i = 0
    while i < len(parts):
        part = parts[i]
        wc = words_count(part)
        if min_words <= wc <= max_words:
            chunks.append(part)
            i += 1
            continue

        # If too long, break into sentence-based chunks
        if wc > max_words:
            sentences = split_into_sentences(part)
            buf = []
            buf_words = 0
            for s in sentences:
                s_w = words_count(s)
                if buf_words + s_w <= max_words or not buf:
                    buf.append(s)
                    buf_words += s_w
                else:
                    # flush
                    chunks.append(" ".join(buf))
                    buf = [s]
                    buf_words = s_w
            if buf:
                # If last buffer too small, try to merge with next part
                if buf_words < min_words and i + 1 < len(parts):
                    parts[i + 1] = " ".join(buf) + " " + parts[i + 1]
                else:
                    chunks.append(" ".join(buf))
            i += 1
            continue

        # If too short, merge with following parts until reach min_words
        buf = [part]
        buf_words = wc
        j = i + 1
        while buf_words < min_words and j < len(parts):
            next_part = parts[j]
            next_words = words_count(next_part)
            buf.append(next_part)
            buf_words += next_words
            j += 1
            if buf_words >= min_words:
                break

        # If still too long after merging, further split by sentences
        merged = "\n\n".join(buf)
        if buf_words > max_words:
            # fallback to sentence chunking
            sentences = split_into_sentences(merged)
            small_buf = []
            small_w = 0
            for s in sentences:
                s_w = words_count(s)
                if small_w + s_w <= max_words or not small_buf:
                    small_buf.append(s)
                    small_w += s_w
                else:
                    chunks.append(" ".join(small_buf))
                    small_buf = [s]
                    small_w = s_w
            if small_buf:
                chunks.append(" ".join(small_buf))
        else:
            chunks.append(merged)

        i = j

    # Final pass: trim whitespace and ensure chunks meet min_words by merging small trailing
    final_chunks: List[str] = []
    for c in chunks:
        c = c.strip()
        if not c:
            continue
        if words_count(c) < min_words and final_chunks:
            final_chunks[-1] = final_chunks[-1] + " " + c
        else:
            final_chunks.append(c)

    return final_chunks


def init_db(conn: sqlite3.Connection):
    cur = conn.cursor()
    cur.execute(
        """
    CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        pdf_path TEXT UNIQUE NOT NULL
    );
    """
    )
    # Create FTS5 table for chunks
    cur.execute(
        "CREATE VIRTUAL TABLE IF NOT EXISTS books_fts USING fts5(content, book_id UNINDEXED, chunk_index UNINDEXED);"
    )
    conn.commit()


def index_book(conn: sqlite3.Connection, title: str, pdf_path: str, chunks: List[str]) -> int:
    cur = conn.cursor()
    # Insert or get book id
    cur.execute("SELECT id FROM books WHERE pdf_path = ?", (pdf_path,))
    row = cur.fetchone()
    if row:
        book_id = row[0]
        logger.info("Book already present (id=%d), updating chunks", book_id)
    else:
        cur.execute("INSERT INTO books(title, pdf_path) VALUES(?, ?)", (title, pdf_path))
        book_id = cur.lastrowid
        logger.info("Inserted book id=%d", book_id)

    # Remove existing chunks for this book to avoid duplicates
    try:
        cur.execute("DELETE FROM books_fts WHERE book_id = ?", (book_id,))
    except sqlite3.OperationalError:
        # Some builds require `books_fts` references with rowid -- ignore if not supported
        pass

    # Insert chunks
    for idx, chunk in enumerate(chunks):
        cur.execute(
            "INSERT INTO books_fts(content, book_id, chunk_index) VALUES(?, ?, ?);",
            (chunk, book_id, idx),
        )

    conn.commit()
    return book_id


def search(conn: sqlite3.Connection, query: str, limit: int = 5) -> List[Tuple[str, str, float]]:
    cur = conn.cursor()
    sql = """
    SELECT
        b.title,
        snippet(books_fts, '<b>', '</b>', ' ... ', 40) AS snippet,
        bm25(books_fts) AS score
    FROM books_fts
    JOIN books b ON books_fts.book_id = b.id
    WHERE books_fts MATCH ?
    ORDER BY score
    LIMIT ?;
    """
    try:
        cur.execute(sql, (query, limit))
        rows = cur.fetchall()
        return rows
    except sqlite3.OperationalError as e:
        logger.warning("FTS5 bm25/snippet may not be available in this SQLite build: %s", e)
        # Fallback: try simpler snippet and rank via matchinfo
        fallback_sql = """
        SELECT
            b.title,
            snippet(books_fts, '<b>', '</b>', ' ... ', 40) AS snippet,
            0.0 as score
        FROM books_fts
        JOIN books b ON books_fts.book_id = b.id
        WHERE books_fts MATCH ?
        LIMIT ?;
        """
        cur.execute(fallback_sql, (query, limit))
        return cur.fetchall()


def build_index(supabase, bucket: str, download_dir: Path, db_path: Path, limit: int = None):
    files = list_bucket_files(supabase, bucket)
    if limit:
        files = files[:limit]

    conn = sqlite3.connect(str(db_path))
    init_db(conn)

    total_chunks = 0
    for obj_path in files:
        try:
            local_pdf = download_file(supabase, bucket, obj_path, download_dir)
            text = extract_text_from_pdf(local_pdf)
            chunks = smart_chunk_text(text)
            title = Path(obj_path).stem
            book_id = index_book(conn, title, obj_path, chunks)
            logger.info("Indexed %d chunk(s) for '%s' (book_id=%d)", len(chunks), title, book_id)
            total_chunks += len(chunks)
        except Exception as e:
            logger.exception("Failed to process '%s': %s", obj_path, e)

    logger.info("Finished indexing. Total chunks: %d", total_chunks)
    conn.close()


def main():
    # Determine project root relative to this script (tools/index_books.py -> project_root)
    project_root = Path(__file__).resolve().parent.parent
    default_db = project_root / "content" / "books.db"
    default_dl = project_root / "content" / "downloads"

    parser = argparse.ArgumentParser()
    parser.add_argument("--bucket", default=os.environ.get("SUPABASE_BUCKET", "books"), help="Supabase storage bucket name")
    parser.add_argument("--db", default=str(default_db), help="SQLite DB filepath")
    parser.add_argument("--download-dir", default=str(default_dl), help="Directory to store downloaded PDFs")
    parser.add_argument("--limit", type=int, default=None, help="Limit number of PDFs to process")
    parser.add_argument("--search", type=str, default=None, help="Run search against the index and exit")
    args = parser.parse_args()

    db_path = Path(args.db)

    if args.search:
        # Run search
        conn = sqlite3.connect(str(db_path))
        rows = search(conn, args.search)
        for title, snippet, score in rows:
            print(f"Title: {title}\nScore: {score:.4f}\nSnippet: {snippet}\n---")
        conn.close()
        return

    # Build/update index
    supabase = get_supabase_client()
    download_dir = Path(args.download_dir)
    build_index(supabase, args.bucket, download_dir, db_path, limit=args.limit)


if __name__ == "__main__":
    main()
