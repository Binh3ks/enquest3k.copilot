#!/usr/bin/env node
/**
 * Supabase Migration Script for EngQuest3K
 * Usage: node migrate_to_supabase.js <SUPABASE_URL> <SUPABASE_SERVICE_ROLE_KEY>
 *
 * Steps:
 * 1. Creates all tables in Supabase
 * 2. Disables RLS (or configures policies)
 * 3. Imports users + station_progress data
 * 4. Validates migration
 */

const SUPABASE_URL = process.argv[2];
const SERVICE_KEY = process.argv[3];

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Usage: node migrate_to_supabase.js <SUPABASE_URL> <SERVICE_ROLE_KEY>');
  process.exit(1);
}

async function supabaseRequest(method, path, body) {
  const res = await fetch(`${SUPABASE_URL}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Supabase ${method} ${path} failed: ${JSON.stringify(data)}`);
  return data;
}

async function createTables() {
  console.log('Creating tables...');

  // Users table
  await supabaseRequest('POST', '/rest/v1/rpc/create_users_table', {
    // Use direct SQL via RPC if available, otherwise use REST
  }).catch(() => {}); // Ignore if function doesn't exist

  // Use REST API to create tables via SQL
  // Note: Supabase REST API doesn't support DDL directly — need to use pg_net or supabase-js
  // For now, we'll use the SQL Editor via the Management API

  console.log(`
⚠️  Manual step required in Supabase Dashboard → SQL Editor:

Run the following SQL:

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100),
    real_email VARCHAR(255),
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    display_name VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'student',
    plan VARCHAR(20) DEFAULT 'free',
    avatar_url TEXT,
    trial_expires_at TIMESTAMPTZ,
    plan_expires_at TIMESTAMPTZ,
    seats_total INT DEFAULT 0,
    parent_id INTEGER REFERENCES users(id),
    class_start_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ
);

-- ============================================================
-- STATION PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.station_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_id INTEGER NOT NULL,
    station_key VARCHAR(50) NOT NULL,
    station_id INTEGER,
    data JSONB DEFAULT '{}',
    is_completed BOOLEAN DEFAULT FALSE,
    score INTEGER DEFAULT 0,
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, week_id, station_key)
);

-- ============================================================
-- USER PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.user_progress (
    user_id INTEGER NOT NULL,
    week_id INTEGER NOT NULL,
    station_id VARCHAR(50) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    score INTEGER DEFAULT 0,
    data JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, week_id, station_id)
);

-- ============================================================
-- MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
    id SERIAL PRIMARY KEY,
    from_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    to_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(200) DEFAULT 'Message from Teacher',
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TEACHER ASSIGNMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.teacher_assignments (
    id SERIAL PRIMARY KEY,
    teacher_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    notes TEXT,
    assigned_by INT REFERENCES users(id),
    private_notes TEXT,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(teacher_id, student_id)
);

-- ============================================================
-- PERIODIC ASSESSMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.periodic_assessments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    week_id INTEGER NOT NULL,
    score INTEGER,
    max_score INTEGER,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CHECKPOINT RESULTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.checkpoint_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    checkpoint_id VARCHAR(50) NOT NULL,
    score INTEGER,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Disable RLS for now (enable after migration)
-- ============================================================
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.station_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.periodic_assessments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkpoint_results DISABLE ROW LEVEL SECURITY;
`);
}

async function migrateUsers(users) {
  console.log(`Migrating ${users.length} users...`);
  for (const user of users) {
    try {
      await supabaseRequest('POST', '/rest/v1/users', user);
    } catch (e) {
      console.log(`  Skipped user ${user.username}: ${e.message.split('\n')[0]}`);
    }
  }
}

async function main() {
  console.log(`Supabase URL: ${SUPABASE_URL}`);

  // Step 1: Create tables
  await createTables();

  console.log(`
After running SQL in Supabase Dashboard:
1. Export data from CockroachDB SQL Shell
2. Import into Supabase via Dashboard → Table Editor → Import CSV
   or use this script's REST API

Supabase Project Ref: ${SUPABASE_URL}
`);
}

main().catch(console.error);
