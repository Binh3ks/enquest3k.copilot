-- EngQuest3k - Complete Database Schema (Clean Install)
-- Run this ONCE in Neon SQL Editor

-- ========= USERS TABLE =========
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'student',
    avatar_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- ========= STATION_PROGRESS TABLE (with JSONB) =========
CREATE TABLE IF NOT EXISTS station_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_id INTEGER NOT NULL,
    station_id VARCHAR(50) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    score INTEGER DEFAULT 0,
    progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, week_id, station_id)
);

-- ========= INDEXES =========
CREATE INDEX IF NOT EXISTS idx_station_progress_user_week ON station_progress (user_id, week_id);
CREATE INDEX IF NOT EXISTS idx_progress_jsonb ON station_progress USING GIN(data);

-- Verify tables created
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
