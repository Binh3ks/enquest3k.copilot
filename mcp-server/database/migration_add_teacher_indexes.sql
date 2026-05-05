-- Migration: Add performance indexes for teacher/my-students query
-- The GET /api/teacher/my-students query runs 6 correlated subqueries per student.
-- Without indexes on student_activity_log and messages, each subquery does a full table scan.

-- ── student_activity_log ──────────────────────────────────────────────────────
-- Needed for: last_active, session_duration_minutes, activity_last_7_days
CREATE INDEX IF NOT EXISTS idx_sal_user_id
  ON student_activity_log (user_id);

CREATE INDEX IF NOT EXISTS idx_sal_user_date
  ON student_activity_log (user_id, (created_at::date));

-- ── messages ─────────────────────────────────────────────────────────────────
-- Needed for: unread_messages_from_teacher
CREATE INDEX IF NOT EXISTS idx_messages_to_user_read
  ON messages (to_user_id, read);

CREATE INDEX IF NOT EXISTS idx_messages_from_to
  ON messages (from_user_id, to_user_id);

-- ── teacher_assignments ───────────────────────────────────────────────────────
-- Needed for: teacher_id lookup
CREATE INDEX IF NOT EXISTS idx_ta_teacher_id
  ON teacher_assignments (teacher_id);

CREATE INDEX IF NOT EXISTS idx_ta_student_id
  ON teacher_assignments (student_id);

-- ── station_progress ─────────────────────────────────────────────────────────
-- Existing: (user_id, week_id) — but we also need user_id alone for aggregations
CREATE INDEX IF NOT EXISTS idx_sp_user_id
  ON station_progress (user_id);

-- For total_stars and station_scores subqueries that filter score > 0
CREATE INDEX IF NOT EXISTS idx_sp_user_score
  ON station_progress (user_id, score) WHERE score > 0;

-- For last_active: updated_at per user
CREATE INDEX IF NOT EXISTS idx_sp_user_updated
  ON station_progress (user_id, updated_at);
