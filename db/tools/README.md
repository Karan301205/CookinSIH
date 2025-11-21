# DB Tools (Automation Scripts)

This folder contains scripts that automate building, exporting, and syncing all databases.

---

## 📄 Scripts

### `init_content_db.py`
Builds the Content DB (Grade Pack).

### `init_student_db.py`
Creates a fresh Student DB on device.

### `init_teacher_db.py`
Creates a fresh Teacher DB on device.

### `export_gradepack.py`
Combines content + embeddings into a final Grade Pack.

### `sync_to_supabase.py`
Uploads student activity from `sync_outbox` → Supabase.

### `sync_from_supabase.py`
Downloads class data for teachers → `sync_inbox`.

---

## 🧠 Purpose of Tools

- Automate DB creation
- Package Grade Packs
- Sync student → Supabase
- Sync teacher ← Supabase
- Avoid manual SQL work
- Speed up development

---

## 🕒 Typical Workflow

1. Build Content DB  
2. Generate embeddings  
3. Export Grade Pack  
4. Student uses app offline  
5. Student syncs when online  
6. Teacher downloads class data  
7. Teacher works offline  
8. Teacher gives email feedback  

---

## 🛠 Requirements
- Python 3.x
- sqlite3
- sqlite-vec (optional)
- Supabase Python client
