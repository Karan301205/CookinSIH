-- Student Accounts
CREATE TABLE students (
    id uuid PRIMARY KEY,
    name text,
    email text UNIQUE,
    password_hash text,
    grade int,
    created_at timestamptz DEFAULT now()
);

-- Teacher Accounts
CREATE TABLE teachers (
    id uuid PRIMARY KEY,
    name text,
    email text UNIQUE,
    password_hash text,
    school text
);

-- Classes mapped to teachers
CREATE TABLE classes (
    id uuid PRIMARY KEY,
    teacher_id uuid REFERENCES teachers(id),
    class_name text,
    grade int,
    section text
);

-- Map students to classes
CREATE TABLE student_class_map (
    id uuid PRIMARY KEY,
    class_id uuid REFERENCES classes(id),
    student_id uuid REFERENCES students(id)
);

-- Events synced from student devices
CREATE TABLE question_events (
    id uuid PRIMARY KEY,
    student_id uuid REFERENCES students(id),
    raw_question text,
    asked_at timestamptz
);

CREATE TABLE answer_events (
    id uuid PRIMARY KEY,
    question_id uuid REFERENCES question_events(id),
    answer_text text,
    helpful boolean,
    time_taken_ms int
);

CREATE TABLE mastery_snapshots (
    id uuid PRIMARY KEY,
    student_id uuid REFERENCES students(id),
    chapter_id int,
    score numeric,
    last_updated timestamptz
);

CREATE TABLE quiz_events (
    id uuid PRIMARY KEY,
    student_id uuid REFERENCES students(id),
    chapter_id int,
    score int,
    taken_at timestamptz
);
