-- ============================================================
-- Supabase Schema for EngQuest3K
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ============================================================
-- 1. USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id SERIAL PRIMARY KEY,
  -- Auth link — Supabase Auth UID (set after Supabase Auth creates user)
  supabase_uid UUID UNIQUE,

  -- Login fields
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100),
  -- Password hash only needed for Railway auth (backward compat). Supabase users use Supabase Auth.
  password_hash VARCHAR(255),

  -- Profile
  full_name VARCHAR(100),
  display_name VARCHAR(100),
  avatar_url TEXT,
  role VARCHAR(20) NOT NULL DEFAULT 'student',

  -- Subscription / Plan
  plan VARCHAR(20) DEFAULT 'free',
  plan_months INT,
  trial_expires_at TIMESTAMPTZ,
  plan_expires_at TIMESTAMPTZ,
  seats_total INT DEFAULT 0,

  -- Family
  parent_id INTEGER REFERENCES public.users(id) ON DELETE SET NULL,

  -- Meta
  real_email VARCHAR(255),
  class_start_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

-- ============================================================
-- 2. STATION PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.station_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  week_id INTEGER NOT NULL,
  station_key VARCHAR(50) NOT NULL,
  station_id INTEGER,
  data JSONB DEFAULT '{}',
  is_completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  progress_percent INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week_id, station_key)
);

-- ============================================================
-- 3. USER PROGRESS
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
-- 4. MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id SERIAL PRIMARY KEY,
  from_user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  to_user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  subject VARCHAR(200) DEFAULT 'Message from Teacher',
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. TEACHER ASSIGNMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.teacher_assignments (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  notes TEXT,
  assigned_by INTEGER REFERENCES public.users(id),
  private_notes TEXT,
  assigned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(teacher_id, student_id)
);

-- ============================================================
-- 6. PERIODIC ASSESSMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.periodic_assessments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  week_id INTEGER NOT NULL,
  score INTEGER,
  max_score INTEGER,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. CHECKPOINT RESULTS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.checkpoint_results (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
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

-- ============================================================
-- ENABLE SUPABASE AUTH
-- ============================================================
-- In Supabase Dashboard → Authentication → Users, you can manage users
-- For programmatic access, use Supabase Service Role Key
