-- Upload-only sync outbox (Student → Supabase)
CREATE TABLE sync_outbox (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    table_name TEXT NOT NULL,      -- questions, answers, quizzes, mastery
    row_id INTEGER NOT NULL,       -- PK in corresponding table
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    synced INTEGER DEFAULT 0        -- 0 = pending, 1 = uploaded
);
