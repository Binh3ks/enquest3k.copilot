-- RAILWAY PRODUCTION HOTFIX
-- Run this SQL directly in Railway PostgreSQL dashboard
-- Dashboard → engquest3k database → Query tab

-- Add real_email column
ALTER TABLE users ADD COLUMN IF NOT EXISTS real_email VARCHAR(255);

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_real_email ON users(real_email);

-- Verify it worked
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'real_email';

-- You should see: real_email | character varying | YES
