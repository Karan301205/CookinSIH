# Supabase Master Database (PostgreSQL)

Supabase acts as the **central cloud database**.
Flow: Student uploads → Teacher downloads.

Supabase is the single source of truth.

---

## 📦 Purpose

- Store all student uploads
- Store teacher and class mapping
- Enable teacher dashboards
- Manage login & authentication
- Ensure secure, role-based data access

---

## 📂 Files

### `schema.sql`
Defines:
- students
- teachers
- classes
- student_class_map
- question_events
- answer_events
- mastery_snapshots
- quiz_events

### `functions.sql`
Triggers, utilities, auto-timestamps.

### `policies.sql`
Supabase Row-Level Security (RLS rules):
- Student can only upload their own data
- Teacher can only see their own class

---

## 🔁 Data Flow

1. Student uploads → Supabase  
2. Teacher downloads → Supabase  
3. Teacher gives feedback via email  
4. **No reverse sync to student app**

---

## 🛡 Security

RLS must enforce:
- Students can only read/write their own rows
- Teachers can only read rows belonging to their class
