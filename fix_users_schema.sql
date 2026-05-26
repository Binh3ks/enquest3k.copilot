-- ============================================================
-- STEP 1: Backup all existing users data FIRST
-- ============================================================
SELECT id, username, email, password_hash, role, plan, created_at FROM users;

-- ============================================================
-- STEP 2: Add ALL missing columns to users table
-- CockroachDB supports ADD COLUMN IF NOT EXISTS
-- ============================================================
ALTER TABLE users ADD COLUMN IF NOT EXISTS email VARCHAR(100) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS real_email VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS display_name VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS plan VARCHAR(20) DEFAULT 'free';
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS trial_expires_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_expires_at TIMESTAMPTZ;
ALTER TABLE users ADD COLUMN IF NOT EXISTS seats_total INT DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS class_start_date DATE;

-- ============================================================
-- STEP 3: Create new tables
-- ============================================================
CREATE TABLE IF NOT EXISTS global_avatars (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teacher_assignments (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notes TEXT,
    assigned_by INT REFERENCES users(id),
    private_notes TEXT,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(teacher_id, student_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    from_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    to_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(200) DEFAULT 'Message from Teacher',
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT messages_not_empty CHECK (char_length(message) > 0)
);
CREATE INDEX IF NOT EXISTS idx_messages_to_user ON messages(to_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_from_user ON messages(from_user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS student_activity_log (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    week_id INT,
    station_type TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_activity_user_time ON student_activity_log(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS payment_requests (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    plan VARCHAR(50) NOT NULL,
    amount BIGINT NOT NULL,
    billing_months INTEGER DEFAULT 1,
    extra_seats INTEGER DEFAULT 0,
    notes TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    approved_by VARCHAR(100),
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_payment_requests_status ON payment_requests(status, created_at DESC);

CREATE TABLE IF NOT EXISTS push_subscriptions (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    endpoint TEXT NOT NULL UNIQUE,
    subscription_json TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- STEP 4: Fix station_progress table
-- ============================================================
ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS station_key VARCHAR(50);
ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS data JSONB DEFAULT '{}'::JSONB;
ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS is_completed BOOLEAN DEFAULT FALSE;
ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0;
ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

UPDATE station_progress SET station_key = station_id::VARCHAR WHERE station_key IS NULL AND station_id IS NOT NULL;

-- ============================================================
-- STEP 5: Verify
-- ============================================================
SELECT 'users columns:' as info;
SELECT column_name FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position;
SELECT 'messages columns:' as info;
SELECT column_name FROM information_schema.columns WHERE table_name = 'messages' ORDER BY ordinal_position;
SELECT 'All tables:' as info;
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
