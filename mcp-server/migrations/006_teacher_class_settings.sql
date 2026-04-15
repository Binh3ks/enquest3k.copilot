-- Migration 006: Teacher Class Settings (T4-B)
-- Stores per-teacher class start date for Content Pack unlock logic.
-- Week N unlocks when: class_start_date + (N-1)*7 days <= today

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS class_start_date DATE;

-- Grant API user access to read and update class_start_date
-- (run as the table owner if on Neon: replace neondb_owner with your role)
DO $$ BEGIN
  GRANT SELECT, UPDATE (class_start_date) ON users TO engquest_user;
EXCEPTION WHEN undefined_object THEN NULL;
END $$;
