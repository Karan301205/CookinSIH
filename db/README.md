# Database Architecture Overview

This `/db` directory contains all database-related files for the offline-first learning system.

The data flow in this project is strictly:

**Student → Supabase (Cloud) → Teacher → Email (feedback)**

There is **no data flow back to the student app**.

---

## 📁 Databases Included

### 1. `content/` – Grade Pack Content DB (SQLite)
Stores all textbook content and vector embeddings required for offline semantic search (RAG).  
This DB ships with the app and is read-only.

### 2. `student/` – Student Local DB (SQLite)
Stores the student's questions, answers, quizzes, mastery, and login token.  
This DB syncs **only upward** to Supabase when internet is available.

### 3. `teacher/` – Teacher Local DB (SQLite)
Stores class-wide data downloaded from Supabase for offline analysis.  
Teacher never uploads anything to Supabase except through email (not DB).

### 4. `supabase/` – Master Cloud DB (PostgreSQL)
Central database and source of truth.  
Students upload → teachers download.

### 5. `migrations/`
SQL files to evolve schemas over time.

### 6. `tools/`
Automation scripts for initializing DBs, exporting Grade Packs, and syncing.

### 7. `backups/`
Local database backups.  
This folder is **ignored** in Git.

---

## 🔁 Data Flow Summary

1. **Student uses app offline**
   - OCR → Vector Search → SLM → Answer
   - All activity stored in local Student DB

2. **Student goes online**
   - Student DB pushes updates to Supabase (`sync_outbox`)

3. **Teacher logs in + syncs**
   - Teacher Dashboard pulls class data from Supabase
   - Data saved into Teacher DB (`sync_inbox`)

4. **Teacher gives feedback**
   - Sent via email (not stored in any DB)

---

## 📦 Databases Purpose Summary

| Database | Purpose |
|---------|----------|
| Content DB | Offline textbooks + embeddings |
| Student DB | Offline learning + upload-only |
| Teacher DB | Offline analytics + download-only |
| Supabase DB | Central master database |

---

## 🧩 Technologies Used

- SQLite (Student, Teacher, Content)
- PostgreSQL (Supabase)
- sqlite-vec or sqlite-vss (Vector Search)
- Supabase Auth
- LangChain (RAG)
- SLM `.gguf` model (offline inference)

---

## 🚀 Maintainers
Add your team info here.
