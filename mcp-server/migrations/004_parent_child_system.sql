-- Migration: Parent-Child Account System (Family Plan)
-- Date: April 14, 2026
-- Description: Add parent_id FK so parent accounts can own up to 3 child student accounts

ALTER TABLE users ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_users_parent_id ON users(parent_id);
