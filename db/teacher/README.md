# Teacher Local Database (SQLite)

This database stores **downloaded class data** for offline teacher usage.

Teacher uses the dashboard offline after initial sync.

---

## 📦 Purpose

- Store students in teacher’s class
- Store mastery summaries
- Store quiz results
- Allow offline analytics
- Teacher never uploads anything (feedback is via email)

---

## 📂 Files

### `schema.sql`
Core tables:
- students
- classes
- student_class_map
- mastery_summary
- quiz_summary

### `sync_schema.sql`
Download-only inbox (`sync_inbox`).

### `auth_schema.sql`
Stores teacher login token.

### `seed.sql`
Optional dummy data.

---

## 🔁 Sync Flow

1. Teacher logs in (online required)  
2. Dashboard pulls:
   - students  
   - class mapping  
   - quiz events  
   - mastery snapshots  

3. Data stored locally in Teacher DB  
4. Teacher can now work offline  
5. Feedback is sent via email (not DB)

---

## 🗂 Table Summary

| Table | Purpose |
|--------|----------|
| students | Students under teacher |
| classes | Teacher’s classes |
| student_class_map | Student → class assignment |
| mastery_summary | Downloaded mastery |
| quiz_summary | Downloaded quiz results |
| sync_inbox | Download queue |
| auth_local | Teacher login token |
