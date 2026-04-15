-- Migration 005: Teacher Session Notes
-- Run on Neon/Supabase SQL Editor

CREATE TABLE IF NOT EXISTS teacher_session_notes (
  id          BIGSERIAL PRIMARY KEY,
  teacher_id  INT  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id  INT  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_num    INT  NOT NULL,
  session_num INT  NOT NULL DEFAULT 0,   -- 0 = general, 1/2/3 = session within week
  note        TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_session_notes_teacher_student
  ON teacher_session_notes(teacher_id, student_id);

CREATE INDEX IF NOT EXISTS idx_session_notes_student
  ON teacher_session_notes(student_id, created_at DESC);

-- Grant API user access
DO $$ BEGIN
  GRANT SELECT, INSERT, DELETE ON teacher_session_notes TO engquest_user;
  GRANT USAGE, SELECT ON SEQUENCE teacher_session_notes_id_seq TO engquest_user;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;
