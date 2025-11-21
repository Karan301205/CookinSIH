# Student Local Database (SQLite)

This database stores **all student activity while offline**, including:

- profile
- questions asked
- AI answers
- quiz results
- mastery
- login token
- sync-outbox (upload-only)

The student app works **100% offline**.

---

## 📦 Purpose

- Store learning history offline
- Enable fast RAG + SLM interactions
- Push all learning data to Supabase when online
- Allow offline auto-login

---

## 📂 Files

### `schema.sql`
Core tables:
- student_profile
- questions
- answers
- quizzes
- quiz_questions
- mastery

### `sync_schema.sql`
Upload-only outbox (`sync_outbox`).

### `auth_schema.sql`
Stores login token for offline auto-login.

### `seed.sql`
Optional test data.

### `README.md`
This file.

---

## 🔁 Sync Flow

1. Student works offline → data stored locally  
2. When internet returns → `sync_outbox` rows uploaded  
3. After successful upload → `synced = 1`

Student **never downloads** any data from Supabase.

---

## 🗂 Table Summary

| Table | Purpose |
|--------|----------|
| student_profile | Student identity |
| questions | Questions asked |
| answers | Generated AI answers |
| quizzes | Quiz attempts |
| quiz_questions | Questions inside a quiz |
| mastery | Chapter-level understanding |
| sync_outbox | Changes to upload to Supabase |
| auth_local | Login token |
