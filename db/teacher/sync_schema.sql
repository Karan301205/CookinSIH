-- Teacher downloads data only (Supabase → Teacher)
CREATE TABLE sync_inbox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_table TEXT NOT NULL,    -- mastery, quizzes, students
    external_id TEXT NOT NULL,     -- UUID from Supabase
    processed INTEGER DEFAULT 0
);
