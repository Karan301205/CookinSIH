# Smart Chunking FTS Setup

This folder contains a script to index PDF textbooks from Supabase into a local SQLite database with FTS5 support.

## Prerequisites

- Python 3.11+
- A Supabase project with a storage bucket (default: 'books') containing PDFs.

## Setup

1.  **Install Dependencies**

    ```bash
    pip install -r requirements.txt
    ```

2.  **Environment Variables**

    Create a `.env` file in the root directory (or ensure your existing `.env` has these):

    ```env
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key
    SUPABASE_BUCKET=your_bucket_name  # Optional, default is 'books'
    ```

## Usage

Run the indexing script from the root directory:

```bash
python3.11 scripts/pdf_search_index_builder.py
```

This will:
- Download PDFs to `content/downloads/`
- Create/Update the database at `content/books.db`

### Search

To test the index:

```bash
python3.11 scripts/pdf_search_index_builder.py --search "your query here"
```
