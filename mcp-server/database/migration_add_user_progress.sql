-- Migration: Add Universal Progress System with JSONB support
-- Date: 2026-01-11
-- Purpose: Upgrade station_progress to support complex state restoration

-- OPTION 1: Create new table (recommended for clean start)
-- Uncomment this section if you want to start fresh

/*
DROP TABLE IF EXISTS station_progress;

CREATE TABLE user_progress (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_id INTEGER NOT NULL,
    station_id VARCHAR(50) NOT NULL,
    
    -- UI DISPLAY STATE
    is_completed BOOLEAN DEFAULT FALSE,
    score INTEGER DEFAULT 0,
    
    -- DETAILED STATE (JSONB for flexibility)
    data JSONB DEFAULT '{}'::jsonb,
    
    -- METADATA
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    PRIMARY KEY (user_id, week_id, station_id)
);

CREATE INDEX idx_progress_user_week ON user_progress(user_id, week_id);
CREATE INDEX idx_progress_jsonb ON user_progress USING GIN(data);
*/

-- OPTION 2: Migrate existing table (preserves current data)
-- This adds JSONB columns to existing station_progress table

-- Rename station_key to station_id for consistency
ALTER TABLE station_progress RENAME COLUMN station_key TO station_id;

-- Add new columns if they don't exist
DO $$ 
BEGIN
    -- Add is_completed column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='station_progress' AND column_name='is_completed') THEN
        ALTER TABLE station_progress ADD COLUMN is_completed BOOLEAN DEFAULT FALSE;
    END IF;
    
    -- Add score column (keep progress_percent for backward compatibility)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='station_progress' AND column_name='score') THEN
        ALTER TABLE station_progress ADD COLUMN score INTEGER DEFAULT 0;
    END IF;
    
    -- Add JSONB data column (THE KEY FEATURE)
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='station_progress' AND column_name='data') THEN
        ALTER TABLE station_progress ADD COLUMN data JSONB DEFAULT '{}'::jsonb;
    END IF;
    
    -- Add created_at if missing
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name='station_progress' AND column_name='created_at') THEN
        ALTER TABLE station_progress ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Rename last_updated to updated_at for consistency
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name='station_progress' AND column_name='last_updated') THEN
        ALTER TABLE station_progress RENAME COLUMN last_updated TO updated_at;
    END IF;
END $$;

-- Create GIN index for efficient JSONB queries
CREATE INDEX IF NOT EXISTS idx_progress_jsonb ON station_progress USING GIN(data);

-- Update existing records to have proper is_completed flag
UPDATE station_progress SET is_completed = TRUE WHERE progress_percent = 100;

-- Add comment for documentation
COMMENT ON COLUMN station_progress.data IS 'JSONB field for storing module-specific state (e.g., video timestamp, quiz answers, etc.)';

-- Verify migration
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'station_progress'
ORDER BY ordinal_position;
