PRAGMA foreign_keys = ON;

-- Classes (1–12)
CREATE TABLE classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    class_name TEXT NOT NULL
);

-- Subjects under each class
CREATE TABLE subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_name TEXT NOT NULL,
    class_id INTEGER NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);

-- Books under each subject
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_title TEXT NOT NULL,
    class_id INTEGER NOT NULL,
    subject_id INTEGER NOT NULL,
    book_code TEXT,
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (subject_id) REFERENCES subjects(id)
);

-- Chapters inside each book
CREATE TABLE chapters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chapter_number INTEGER NOT NULL,
    chapter_title TEXT NOT NULL,
    book_id INTEGER NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id)
);

-- Pages / Paragraph chunks
CREATE TABLE pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chapter_id INTEGER NOT NULL,
    page_number INTEGER,
    content TEXT,         -- extracted text
    page_url TEXT,        -- optional PDF/image
    FOREIGN KEY (chapter_id) REFERENCES chapters(id)
);
