-- Teacher login token (online login only)
CREATE TABLE auth_local (
    id INTEGER PRIMARY KEY,
    teacher_id TEXT,
    token TEXT                    -- session token from Supabase
);
