-- ============================================================================
-- Migration 004: Teacher Task Assignments (T1-B)
-- Purpose: Allow teachers to override curriculum pace per student:
--   - week_override:  force a student to study a specific week
--   - week_lock:      prevent a student from advancing past a week
--   - station_assign: assign a specific station (optionally with a deadline)
-- NOTE: teacher_assignments (already exists) links teachers to students.
--       THIS table is for curriculum-level task control, not roster management.
-- ============================================================================

CREATE TABLE IF NOT EXISTS teacher_task_assignments (
  id          BIGSERIAL PRIMARY KEY,
  teacher_id  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type        TEXT NOT NULL CHECK (type IN ('week_override', 'week_lock', 'station_assign')),
  week_num    INT,
  station_key TEXT,
  notes       TEXT,
  deadline    TIMESTAMPTZ,
  is_active   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT no_self_assign CHECK (teacher_id != student_id)
);

CREATE INDEX IF NOT EXISTS idx_task_assign_teacher ON teacher_task_assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_task_assign_student ON teacher_task_assignments(student_id);
CREATE INDEX IF NOT EXISTS idx_task_assign_active  ON teacher_task_assignments(student_id, is_active);
