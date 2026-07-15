#!/usr/bin/env node
/**
 * Supabase Migration Script — Full Data Migration
 * Step 1 of 3: Create schema in Supabase
 *
 * Run AFTER user provides Supabase URL + Service Role Key
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_KEY env vars');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// ── Create all tables ────────────────────────────────────────────────────────
async function createSchema() {
  console.log('Creating schema in Supabase...');

  const sql = `
-- ============================================================
-- USERS TABLE (core — no RLS for migration)
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
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_station_progress_user ON public.station_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_station_progress_week ON public.station_progress(week_id);
CREATE INDEX IF NOT EXISTS idx_messages_to_user ON public.messages(to_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_from_user ON public.messages(from_user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_progress_user_week ON public.user_progress(user_id, week_id);

-- ============================================================
-- DISABLE RLS (enable after migration)
-- ============================================================
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.station_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.teacher_assignments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.periodic_assessments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.checkpoint_results DISABLE ROW LEVEL SECURITY;
`;

  // Execute via pg client
  const { error } = await supabase.rpc('exec', { sql_text: sql }).catch(() => {
    // If RPC doesn't exist, try direct approach
    return { error: new Error('Need manual SQL execution') };
  });

  if (error) {
    console.log('⚠️  RPC exec not available. Run SQL manually in Supabase SQL Editor.');
    console.log('\nCopy this SQL to Supabase → SQL Editor → Run:\n');
    console.log(sql);
    return false;
  }
  return true;
}

createSchema().then(ok => {
  if (ok) console.log('Schema created successfully!');
  else console.log('Manual SQL execution required.');
});
