-- Stored after online login
CREATE TABLE auth_local (
    id INTEGER PRIMARY KEY,
    student_id TEXT,
    token TEXT,                    -- session token from Supabase
    logged_in INTEGER DEFAULT 1
);
