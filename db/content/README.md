# Content Database (Grade Pack)

The **Content DB** stores all textbook content and embeddings required for offline semantic search and RAG.

This database is included inside the app and is **read-only**.

---

## 📦 Purpose

- Store textbook structure (classes, subjects, books, chapters, pages)
- Store cleaned text extracted from PDF/OCR
- Store embeddings for semantic search using sqlite-vec
- Provide fast retrieval of relevant textbook content offline

---

## 📂 Files

### `base_schema.sql`
Defines structure for:
- classes
- subjects
- books
- chapters
- pages

### `vector_schema.sql`
Defines embeddings table:
- embeddings stored as BLOB vectors
- used for semantic search

### `seed.sql`
Optional dummy/sample content.

### `README.md`
This file.

---

## 🧠 How it works

1. Student asks a question  
2. App creates an embedding for the question  
3. SQLite runs vector search on `embeddings` table  
4. Best-matching pages/paragraphs returned  
5. LangChain builds prompt  
6. SLM generates final answer offline  

---

## 🗂 Table Summary

| Table | Purpose |
|--------|----------|
| classes | Class levels 1–12 |
| subjects | Subjects under each class |
| books | NCERT books |
| chapters | Chapters inside each book |
| pages | Page/paragraph content |
| embeddings | Vector representations for text |

---

## 🚀 Notes
- Do not modify this DB on device.
- Generate Grade Packs using `export_gradepack.py`.
