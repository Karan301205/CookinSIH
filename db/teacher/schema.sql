PRAGMA foreign_keys = ON;

-- Students in teacher's class
CREATE TABLE students (
    id TEXT PRIMARY KEY,
    name TEXT,
    grade INTEGER
);

-- Teacher's classes
CREATE TABLE classes (
    id TEXT PRIMARY KEY,
    class_name TEXT,
    grade INTEGER,
    section TEXT
);

-- Which student belongs to which class
CREATE TABLE student_class_map (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_id TEXT NOT NULL,
    student_id TEXT NOT NULL
);

-- Mastery summary synced from Supabase
CREATE TABLE mastery_summary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT,
    chapter_id INTEGER,
    score REAL,
    last_synced DATETIME
);

-- Quiz summary synced from Supabase
CREATE TABLE quiz_summary (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id TEXT,
    chapter_id INTEGER,
    score INTEGER,
    taken_at DATETIME
);
