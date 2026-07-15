-- Migration: Teacher-Student Assignment System
-- Date: March 4, 2026
-- Description: Add teacher assignments and messaging system

-- ============================================================================
-- 1. Teacher Assignments Table
-- ============================================================================
-- Links teachers to their assigned students for monitoring and support

CREATE TABLE IF NOT EXISTS teacher_assignments (
  id SERIAL PRIMARY KEY,
  teacher_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT NOW(),
  assigned_by INT REFERENCES users(id), -- Which admin assigned this
  notes TEXT, -- Optional notes about the assignment
  
  -- Ensure one student can only be assigned to one teacher at a time
  UNIQUE(student_id),
  
  -- Ensure teacher can't be assigned to themselves
  CHECK (teacher_id != student_id)
);

-- Indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_teacher_students ON teacher_assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_teacher ON teacher_assignments(student_id);
CREATE INDEX IF NOT EXISTS idx_assigned_at ON teacher_assignments(assigned_at DESC);

-- ============================================================================
-- 2. Messages Table
-- ============================================================================
-- In-app messaging between teachers and students

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  from_user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  to_user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject VARCHAR(200),
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  
  -- Prevent empty messages
  CHECK (LENGTH(TRIM(message)) > 0)
);

-- Indexes for inbox/outbox queries
CREATE INDEX IF NOT EXISTS idx_messages_to_user ON messages(to_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_from_user ON messages(from_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(to_user_id, read) WHERE read = FALSE;

-- ============================================================================
-- 3. Student Activity Log (Track for alerts)
-- ============================================================================
-- Track when students are active to detect inactive patterns

CREATE TABLE IF NOT EXISTS student_activity_log (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL, -- 'login', 'station_start', 'station_complete'
  week_id INT,
  station_type VARCHAR(50),
  metadata JSONB, -- Store additional data (score, errors, etc.)
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for recent activity queries
CREATE INDEX IF NOT EXISTS idx_activity_user_time ON student_activity_log(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_type ON student_activity_log(activity_type);

-- ============================================================================
-- 4. Helper Views
-- ============================================================================

-- View: Teacher's student list with latest activity
CREATE OR REPLACE VIEW teacher_student_overview AS
SELECT 
  ta.id AS assignment_id,
  ta.teacher_id,
  ta.student_id,
  ta.assigned_at,
  u.username AS student_name,
  u.email AS student_email,
  u.avatar_url,
  u.plan,
  COALESCE(MAX(sp.week_id), 1) AS current_week,
  COUNT(DISTINCT sp.week_id) AS weeks_completed,
  COALESCE(
    MAX(sal.created_at), 
    u.created_at
  ) AS last_active,
  (
    SELECT COUNT(*) 
    FROM messages m 
    WHERE m.to_user_id = ta.student_id 
      AND m.from_user_id = ta.teacher_id 
      AND m.read = FALSE
  ) AS unread_messages_from_teacher
FROM teacher_assignments ta
JOIN users u ON ta.student_id = u.id
LEFT JOIN station_progress sp ON u.id = sp.user_id
LEFT JOIN student_activity_log sal ON u.id = sal.user_id
WHERE u.role = 'student'
GROUP BY ta.id, ta.teacher_id, ta.student_id, ta.assigned_at, 
         u.username, u.email, u.avatar_url, u.plan, u.created_at;

-- View: Message inbox with sender info
CREATE OR REPLACE VIEW message_inbox AS
SELECT 
  m.id,
  m.from_user_id,
  m.to_user_id,
  m.subject,
  m.message,
  m.read,
  m.read_at,
  m.created_at,
  u_from.username AS from_username,
  u_from.avatar_url AS from_avatar,
  u_to.username AS to_username
FROM messages m
JOIN users u_from ON m.from_user_id = u_from.id
JOIN users u_to ON m.to_user_id = u_to.id;

-- ============================================================================
-- 5. Sample Data (for testing)
-- ============================================================================

-- Assign student 'Kay' to teacher 'Lebatai' (only if they exist)
DO $$
DECLARE
  v_teacher_id INT;
  v_student_id INT;
BEGIN
  SELECT id INTO v_teacher_id FROM users WHERE username = 'Lebatai' AND role = 'teacher';
  SELECT id INTO v_student_id FROM users WHERE username = 'Kay' AND role = 'student';
  
  IF v_teacher_id IS NOT NULL AND v_student_id IS NOT NULL THEN
    INSERT INTO teacher_assignments (teacher_id, student_id, assigned_by, notes)
    VALUES (v_teacher_id, v_student_id, 1, 'Initial assignment for testing')
    ON CONFLICT (student_id) DO NOTHING;
  END IF;
END $$;

-- Grant permissions (if using row-level security in future)
GRANT SELECT, INSERT, UPDATE, DELETE ON teacher_assignments TO neondb_owner;
GRANT SELECT, INSERT, UPDATE, DELETE ON messages TO neondb_owner;
GRANT SELECT, INSERT ON student_activity_log TO neondb_owner;
GRANT SELECT ON teacher_student_overview TO neondb_owner;
GRANT SELECT ON message_inbox TO neondb_owner;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Migration 003 completed successfully!';
  RAISE NOTICE 'Created tables: teacher_assignments, messages, student_activity_log';
  RAISE NOTICE 'Created views: teacher_student_overview, message_inbox';
END $$;
