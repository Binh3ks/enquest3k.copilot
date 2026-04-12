-- EngQuest Database Initialization Script
-- This script creates the necessary tables for the application to run.

-- ========= USERS TABLE =========
-- Stores core user information, credentials, and roles.

CREATE TABLE users (
    id SERIAL PRIMARY KEY, -- Auto-incrementing unique identifier for each user.
    username VARCHAR(50) UNIQUE NOT NULL, -- User's login name, must be unique.
    email VARCHAR(100) UNIQUE NOT NULL, -- User's email, must be unique for password recovery, etc.
    password_hash VARCHAR(255) NOT NULL, -- NEVER store plain text passwords. This will store a secure hash.
    role VARCHAR(20) NOT NULL DEFAULT 'student', -- Role of the user, e.g., 'student', 'admin'.
    avatar_url VARCHAR(255), -- URL for the user's profile picture.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the account was created.
    last_login TIMESTAMP WITH TIME ZONE -- To track the last login time, can be updated by a trigger or application logic.
);

-- ========= STATION_PROGRESS TABLE =========
-- Tracks the learning progress of each user for each station.
-- This normalized structure is much more scalable than storing progress in a JSON blob.

CREATE TABLE station_progress (
    id SERIAL PRIMARY KEY, -- Unique identifier for each progress entry.
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- Foreign key to the users table. If a user is deleted, their progress is also deleted.
    week_id INTEGER NOT NULL, -- The week number (e.g., 1, 2, 19).
    station_key VARCHAR(50) NOT NULL, -- The key for the station (e.g., 'read_explore', 'word_power').
    progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100), -- The completion percentage.
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    -- This constraint ensures that there is only one progress entry per user, per week, per station.
    UNIQUE(user_id, week_id, station_key)
);

-- ========= INDEXES =========
-- Indexes are crucial for performance, especially as the tables grow.

CREATE INDEX idx_station_progress_user_week ON station_progress (user_id, week_id);

-- Log script completion
-- (This is just a note for anyone running the script manually)

-- End of script.
