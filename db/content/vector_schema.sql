-- Embeddings for semantic search (sqlite-vec)
CREATE TABLE embeddings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source_type TEXT NOT NULL,    -- "page", "chapter"
    source_id INTEGER NOT NULL,   -- ID in respective table
    embedding BLOB NOT NULL,      -- vector as binary
    content TEXT,                 -- text used to generate vector
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_embeddings_source ON embeddings(source_type, source_id);
