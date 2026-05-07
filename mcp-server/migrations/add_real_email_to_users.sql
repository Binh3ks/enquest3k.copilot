-- Migration: Add real_email column to users table
-- Purpose: Store actual email addresses for password reset, notifications, etc.
-- The existing 'email' column is used as username (e.g., owner@engquest.com)

-- Add real_email column (nullable, will be populated gradually)
ALTER TABLE users
ADD COLUMN IF NOT EXISTS real_email VARCHAR(255);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_real_email ON users(real_email);

-- Add comment to clarify purpose
COMMENT ON COLUMN users.real_email IS 'Actual email address for notifications and password reset (optional)';
COMMENT ON COLUMN users.email IS 'Username in email format (required, used for login)';
