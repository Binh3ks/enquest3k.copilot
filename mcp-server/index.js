/* eslint-env node */
require('dotenv').config();
const _bootEnv = (k) => `${k}=${process.env[k] ? `${process.env[k].length}ch` : 'MISSING'}`;
console.log('[Boot] Runtime env (Railway injects these):');
console.log(' ', _bootEnv('DEEPGRAM_API_KEY'));
console.log(' ', _bootEnv('DATABASE_URL'));
console.log(' ', _bootEnv('GEMINI_API_KEY'));
console.log(' ', _bootEnv('CEREBRAS_API_KEY'));
console.log(' ', _bootEnv('GROQ_API_KEY'));
console.log('  RAILWAY_ENVIRONMENT:', process.env.RAILWAY_ENVIRONMENT || 'unknown');
console.log('  RAILWAY_PROJECT_NAME:', process.env.RAILWAY_PROJECT_NAME || 'unknown');
console.log('  RAILWAY_SERVICE_NAME:', process.env.RAILWAY_SERVICE_NAME || 'unknown');
if (!process.env.DEEPGRAM_API_KEY) {
  console.error('❌ DEEPGRAM_API_KEY is MISSING from runtime env.');
  console.error('   → Set it in Railway Dashboard → Variables for THIS service.');
  console.error('   → Then trigger Redeploy.');
}
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./config/db'); // Import the database configuration

// Import routes
const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');
const aiRoutes = require('./routes/ai');
const adminRoutes = require('./routes/admin');
const pronunciationRoutes = require('./routes/pronunciation');
const cacheRoutes = require('./routes/cache'); // 🔥 R2 Audio Cache
const teacherRoutes = require('./routes/teacher'); // 🎓 Teacher-Student System
const parentRoutes = require('./routes/parent');   // 👨‍👩‍👧 Parent-Child Family Plan
const passwordResetRoutes = require('./routes/passwordReset'); // 🔐 Password Reset with OTP

const app = express();

// ══════════════════════════════════════════════════════════════════
//  STARTUP DATABASE SEED
//  Runs once on deploy — ensures schema is correct and owner exists
// ══════════════════════════════════════════════════════════════════
async function safeQuery(sql) {
  try {
    return await db.query(sql);
  } catch(e) {
    // CockroachDB: ADD COLUMN IF NOT EXISTS returns error if column exists — this is OK
    if (e.code === '42701' || e.code === '42P07') return null; // column/table already exists
    console.log('⚠️  safeQuery warning:', e.code, e.message.split('\n')[0]);
    return null;
  }
}

async function seedDatabase() {
  try {
    // 0-pre. Ensure display_name column exists — run FIRST before anything that could fail
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS display_name VARCHAR(100)`);
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS supabase_uid UUID`);

    // 0. Ensure core tables exist
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        supabase_uid UUID UNIQUE,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) NOT NULL DEFAULT 'student',
        plan VARCHAR(20) DEFAULT 'free',
        avatar_url TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await safeQuery(`
      CREATE TABLE IF NOT EXISTS station_progress (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        week_id INTEGER NOT NULL,
        station_key VARCHAR(50) NOT NULL,
        data JSONB DEFAULT '{}'::jsonb,
        is_completed BOOLEAN DEFAULT FALSE,
        score INTEGER DEFAULT 0,
        progress_percent INTEGER NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, week_id, station_key)
      );
    `);

    // 1. Ensure `plan` column exists on users
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS plan VARCHAR(20) DEFAULT 'free';`);

    // 2. Ensure station_progress has JSONB data, is_completed, score columns
    //    NOTE: we keep the column named station_key (not station_id) to match routes
    await safeQuery(`ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS station_key VARCHAR(50);`);
    await safeQuery(`ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS data JSONB DEFAULT '{}'::jsonb;`);
    await safeQuery(`ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS is_completed BOOLEAN DEFAULT FALSE;`);
    await safeQuery(`ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS score INTEGER DEFAULT 0;`);
    await safeQuery(`ALTER TABLE station_progress ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();`);

    // 2b. Backfill station_key if legacy station_id exists
    await safeQuery(`UPDATE station_progress SET station_key = station_id::VARCHAR WHERE station_key IS NULL AND station_id IS NOT NULL;`);

    // 2c. Ensure unique index for new key
    await safeQuery(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_station_progress_user_week_key
      ON station_progress (user_id, week_id, station_key);
    `);

    // 2d. ★ CRITICAL FIX: Drop NOT NULL on legacy station_id column
    //     The old table was created with station_id INTEGER NOT NULL.
    //     We no longer use station_id — only station_key.
    //     Without this, INSERT without station_id fails with error 23502.
    // NOTE: station_id NOT NULL constraint removed — handled by station_key as primary key

    // 2e. Drop old unique constraint on station_id if it exists
    // NOTE: Old unique constraint dropped if existed

    console.log('✅ [Seed] station_id NOT NULL constraint removed (if it existed)');

    // 2f. Ensure avatar_url can hold base64 data (VARCHAR(255) is too small)
    await safeQuery(`ALTER TABLE public.users ALTER COLUMN avatar_url TYPE TEXT;`);

    // 2g-pre. Add subscription columns to users table
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS trial_expires_at TIMESTAMPTZ;`);
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS plan_expires_at TIMESTAMPTZ;`);
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS seats_total INT DEFAULT 0;`);

    // 2g. Create global_avatars table (shared avatar gallery for all users)
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS global_avatars (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // 2h. Create teacher_assignments table
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS teacher_assignments (
        id SERIAL PRIMARY KEY,
        teacher_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        student_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        notes TEXT,
        assigned_at TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(teacher_id, student_id)
      );
    `);

    // 2i. Create messages table
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        from_user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        to_user_id INTEGER NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        subject VARCHAR(200) DEFAULT 'Message from Teacher',
        message TEXT NOT NULL,
        read BOOLEAN DEFAULT FALSE,
        read_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT messages_not_empty CHECK (char_length(message) > 0)
      );
      CREATE INDEX IF NOT EXISTS idx_messages_to_user ON messages(to_user_id, created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_messages_from_user ON messages(from_user_id, created_at DESC);
    `);

    // 2i-a. Add assigned_by column to teacher_assignments (records which teacher/admin created the assignment)
    await safeQuery(`
      ALTER TABLE teacher_assignments ADD COLUMN IF NOT EXISTS assigned_by INT REFERENCES public.users(id);
    `);

    // 2i-a2. Create student_activity_log table (used by teacher dashboard last_active + 7-day heatmap)
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS student_activity_log (
        id            BIGSERIAL PRIMARY KEY,
        user_id       INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        activity_type TEXT NOT NULL,
        week_id       INT,
        station_type  TEXT,
        metadata      JSONB DEFAULT '{}'::jsonb,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_activity_user_time ON student_activity_log(user_id, created_at DESC);
    `);
    console.log('✅ [Seed] teacher_assignments.assigned_by + student_activity_log ready.');

    // 2i-b. Add private_notes column to teacher_assignments (GV ghi chú nội bộ về HS)
    await safeQuery(`ALTER TABLE teacher_assignments ADD COLUMN IF NOT EXISTS private_notes TEXT;`);

    // 2j. Create payment_requests table (replaces localStorage billing)
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS payment_requests (
        id            SERIAL PRIMARY KEY,
        username      VARCHAR(100) NOT NULL,
        plan          VARCHAR(50)  NOT NULL,
        amount        BIGINT       NOT NULL,
        billing_months INTEGER     DEFAULT 1,
        extra_seats   INTEGER      DEFAULT 0,
        notes         TEXT,
        status        VARCHAR(20)  DEFAULT 'pending',
        approved_by   VARCHAR(100),
        approved_at   TIMESTAMPTZ,
        created_at    TIMESTAMPTZ  DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_payment_requests_status ON payment_requests(status, created_at DESC);
    `);

    // 2k-push. Create push_subscriptions table for Web Push notifications
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS push_subscriptions (
        id               SERIAL PRIMARY KEY,
        username         VARCHAR(100) NOT NULL,
        endpoint         TEXT         NOT NULL UNIQUE,
        subscription_json TEXT        NOT NULL,
        updated_at       TIMESTAMPTZ  DEFAULT NOW()
      );
    `);

    console.log('✅ [Seed] teacher_assignments + messages + payment_requests + push_subscriptions tables ready.');

    // 2k. Add parent_id column for Family Plan child accounts
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS parent_id INTEGER REFERENCES public.users(id) ON DELETE SET NULL;`);
    await safeQuery(`CREATE INDEX IF NOT EXISTS idx_users_parent_id ON users(parent_id);`);
    console.log('✅ [Seed] parent_id column ready.');

    // 2j. Create/refresh teacher_student_overview view
    await safeQuery(`
      CREATE OR REPLACE VIEW teacher_student_overview AS
      SELECT
        ta.id            AS assignment_id,
        ta.teacher_id,
        ta.student_id,
        u.username       AS student_name,
        u.email          AS student_email,
        u.avatar_url,
        u.plan,
        COALESCE(
          (SELECT MAX(week_id) FROM station_progress sp WHERE sp.user_id = u.id),
          1
        )                AS current_week,
        COALESCE(
          (SELECT COUNT(DISTINCT week_id) FROM station_progress sp WHERE sp.user_id = u.id AND sp.score >= 60),
          0
        )                AS weeks_completed,
        COALESCE(
          (SELECT MAX(sp.updated_at) FROM station_progress sp WHERE sp.user_id = u.id),
          u.created_at
        )                AS last_active,
        ta.assigned_at,
        COALESCE(
          (SELECT COUNT(*) FROM messages m WHERE m.from_user_id = ta.teacher_id AND m.to_user_id = ta.student_id AND m.read = FALSE),
          0
        )                AS unread_messages_from_teacher
      FROM teacher_assignments ta
      JOIN users u ON u.id = ta.student_id;
    `);
    console.log('✅ [Seed] teacher_student_overview view ready.');

    // (manager_teacher_assignments is created separately below — outside this try/catch)

    // T1-B: teacher_task_assignments (curriculum control)
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS teacher_task_assignments (
        id          BIGSERIAL PRIMARY KEY,
        teacher_id  INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        student_id  INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        type        TEXT NOT NULL CHECK (type IN ('week_override','week_lock','station_assign')),
        week_num    INT,
        station_key TEXT,
        notes       TEXT,
        deadline    TIMESTAMPTZ,
        is_active   BOOLEAN NOT NULL DEFAULT true,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        CONSTRAINT no_self_assign CHECK (teacher_id != student_id)
      )
    `);
    console.log('✅ [Seed] teacher_task_assignments ready.');

    // T4-A: teacher_session_notes
    await safeQuery(`
      CREATE TABLE IF NOT EXISTS teacher_session_notes (
        id          BIGSERIAL PRIMARY KEY,
        teacher_id  INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        student_id  INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        week_num    INT NOT NULL,
        session_num INT NOT NULL DEFAULT 0,
        note        TEXT NOT NULL,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    console.log('✅ [Seed] teacher_session_notes ready.');

    // T4-B: class_start_date column on users
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS class_start_date DATE`);
    console.log('✅ [Seed] users.class_start_date ready.');

    // T4-C: plan_months column — stores how many months the activated plan covers
    // Used for accurate lesson access restriction (avoids date-math issues with created_at)
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS plan_months INTEGER DEFAULT NULL`);
    console.log('✅ [Seed] users.plan_months ready.');

    // Migration: make email column nullable + partial unique index (allow multiple NULLs)
    try {
      await safeQuery(`ALTER TABLE public.users ALTER COLUMN email DROP NOT NULL`);
      await safeQuery(`ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_email_key`);
      await safeQuery(`CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_notnull ON users (email) WHERE email IS NOT NULL`);
      console.log('✅ [Seed] email column: nullable + partial unique index.');
    } catch (e) { console.warn('⚠️ [Seed] email migration skipped:', e.message); }

    // Migration: add display_name column (the name Nova/app uses to address the student)
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS display_name VARCHAR(100)`);
    console.log('✅ [Seed] users.display_name ready.');

    // Migration: add real_email column for actual email addresses (password reset, notifications)
    await safeQuery(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS real_email VARCHAR(255)`);
    await safeQuery(`CREATE INDEX IF NOT EXISTS idx_users_real_email ON users(real_email)`);
    console.log('✅ [Seed] users.real_email ready.');

    // NOTE: Account resets moved to dedicated migration scripts.
    // Do NOT add one-time seed UPDATEs here — they re-run on every startup.

    // 3. Create/restore the owner super-admin account
    const OWNER_USERNAME = 'owner';
    const OWNER_PASSWORD = 'binh3k';
    const OWNER_EMAIL    = 'owner@engquest.com';
    const passwordHash   = await bcrypt.hash(OWNER_PASSWORD, 10);

    await safeQuery(`
      INSERT INTO public.users (username, email, password_hash, role, plan)
      VALUES ($1, $2, $3, 'super_admin', 'premium')
      ON CONFLICT (username) DO UPDATE
        SET password_hash = $3,
            role          = 'super_admin',
            plan          = 'premium',
            email         = $2
    `, [OWNER_USERNAME, OWNER_EMAIL, passwordHash]);

    console.log('✅ [Seed] Database schema OK. Owner account ready (username: owner).');
  } catch (err) {
    console.error('⚠️  [Seed] Startup seed error (non-fatal):', err.message);
  }
}


// Middleware
app.use(cors()); // Cho phép Cross-Origin Resource Sharing
app.use(express.json({ limit: '10mb' })); // Tăng limit để nhận avatar base64 lớn
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// --- API Routes ---
const subscriptionRoutes = require('./routes/subscription');
const paymentRoutes = require('./routes/payment');
const pushRoutes = require('./routes/push');
const assessmentRoutes = require('./routes/assessment'); // 📊 Periodic Assessments
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/pronunciation', pronunciationRoutes);
app.use('/api/teacher', teacherRoutes);     // 🎓 Teacher-Student System
app.use('/api/parent', parentRoutes);        // 👨‍👩‍👧 Parent-Child Family Plan
app.use('/api/subscription', subscriptionRoutes); // 💳 Subscription & Plan Management
app.use('/api/payment', paymentRoutes);      // 💰 Payment Requests & Auto-Activation
app.use('/api/push', pushRoutes);            // 🔔 Web Push Notifications
app.use('/api/assessment', assessmentRoutes); // 📊 Periodic Assessments
app.use('/api/password-reset', passwordResetRoutes); // 🔐 Password Reset with OTP

console.log('✅ API Routes registered: /api/auth, /api/progress, /api/ai, /api/admin, /api/pronunciation, /api/teacher, /api/parent, /api/subscription, /api/payment');


// Simple health check route
app.get('/', (req, res) => {
  res.json({ message: 'MCP Server is up and running!' });
});

// DEBUG: Check lesson data path
app.get('/api/debug-path', (req, res) => {
  const db = require('./config/db');
  const fs = require('fs');
  const path = require('path');
  res.json({
    __dirname,
    cwd: process.cwd(),
    dbQuery: db.query ? 'available' : 'missing',
    fileExists: fs.existsSync(path.join(__dirname, '../data/lessonPlans_index.json')),
    dataDir: path.join(__dirname, '../data'),
  });
});

// POST /api/backup/run — Manual backup trigger
// Protected by ADMIN_TOKEN so only authorized callers can trigger
app.post('/api/backup/run', async (req, res) => {
  const adminToken = req.headers['x-admin-token'];
  if (adminToken !== process.env.BACKUP_ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const { execSync } = require('child_process');
    const path = require('path');
    const fs = require('fs');

    // Create backup dir
    const backupDir = path.join(process.cwd(), 'backups');
    fs.mkdirSync(backupDir, { recursive: true });

    const TABLES = [
      'users', 'teacher_assignments', 'manager_teacher_assignments',
      'station_progress', 'lesson_plans_index', 'lesson_plans',
      'messages', 'teacher_session_notes', 'teacher_task_assignments',
      'periodic_assessments', 'checkpoint_results', 'payment_requests',
      'push_subscriptions', 'student_activity_log',
    ];

    const metadata = { timestamp: new Date().toISOString(), version: '1.1', tables: {} };

    for (const table of TABLES) {
      try {
        const result = await db.query(`SELECT * FROM public.${table}`);
        const filePath = path.join(backupDir, `${table}.json`);
        fs.writeFileSync(filePath, JSON.stringify(result.rows, null, 2));
        metadata.tables[table] = { status: 'ok', rows: result.rows.length };
      } catch (err) {
        if (err.code !== '42P01') {
          metadata.tables[table] = { status: 'error', error: err.message };
        }
      }
    }

    const metaPath = path.join(backupDir, 'metadata.json');
    fs.writeFileSync(metaPath, JSON.stringify(metadata, null, 2));

    res.json({ message: 'Backup complete', timestamp: metadata.timestamp, tables: metadata.tables });
  } catch (err) {
    console.error('Backup error:', err);
    res.status(500).json({ message: err.message });
  }
});

// DEBUG: Test DB query by id=1 and supabase_uid
app.get('/api/db-check', async (req, res) => {
  try {
    const dbInfo = await db.query("SELECT current_database() as db, current_user as usr, now() as ts");
    const byId = await db.query("SELECT id, username, email, supabase_uid FROM public.users WHERE id = $1", [1]);
    const byUid = await db.query("SELECT id, username, email, supabase_uid FROM public.users WHERE supabase_uid = $1", ['a7d6a417-f837-42de-8673-e5d79400d319']);
    res.json({
      deploy_id: process.env.RAILWAY_DEPLOYMENT_ID || 'unknown',
      node_version: process.version,
      ts: Date.now(),
      db_info: dbInfo.rows[0],
      by_id: byId.rows,
      by_uid: byUid.rows,
    });
  } catch (e) {
    res.json({ error: e.message, code: e.code });
  }
});

// Database connection test route
app.get('/api/db-test', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  try {
    const result = await db.query("SELECT current_database() as db, current_user as user, NOW() as ts, version() as ver");
    const row = result.rows[0];
    res.json({
      message: 'Database connection successful!',
      db: row.db,
      user: row.user,
      ts: row.ts,
      ver: row.ver.substring(0, 50),
      deploy_id: process.env.RAILWAY_DEPLOYMENT_ID || 'unknown',
    });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection failed.', error: error.message });
  }
});

app.get('/api/schema-check', async (req, res) => {
  try {
    const tables = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    const usersCols = await db.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users' ORDER BY ordinal_position");
    const messagesCols = await db.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'messages' ORDER BY ordinal_position");
    res.json({
      tables: tables.rows.map(r => r.table_name),
      usersColumns: usersCols.rows.map(r => r.column_name),
      messagesColumns: messagesCols.rows.map(r => r.column_name),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;

// Startup: seedDatabase runs all idempotent DDL on every deploy (last updated: 2026-04-15)
async function ensureManagerTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS manager_teacher_assignments (
        id              SERIAL PRIMARY KEY,
        manager_id      INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        teacher_id      INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        allocated_seats INT NOT NULL DEFAULT 5,
        assigned_at     TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(manager_id, teacher_id)
      )
    `);
    // Ensure plan_months column exists — added here as a safety net so it
    // always runs even if seedDatabase() encountered an error before its migration.
    await db.query(`ALTER TABLE public.users ADD COLUMN IF NOT EXISTS plan_months INTEGER DEFAULT NULL`);
    // Ensure student_activity_log exists (also added as safety net)
    await db.query(`
      CREATE TABLE IF NOT EXISTS student_activity_log (
        id            BIGSERIAL PRIMARY KEY,
        user_id       INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        activity_type TEXT NOT NULL,
        week_id       INT,
        station_type  TEXT,
        metadata      JSONB DEFAULT '{}'::jsonb,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_activity_user_time ON student_activity_log(user_id, created_at DESC)`);
    await db.query(`ALTER TABLE teacher_assignments ADD COLUMN IF NOT EXISTS assigned_by INT REFERENCES public.users(id)`);
    console.log('✅ manager_teacher_assignments + safety-net migrations ready.');
  } catch (err) {
    console.error('⚠️  manager_teacher_assignments migration error:', err.message);
  }
}

async function ensurePeriodicAssessments() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS periodic_assessments (
        id           SERIAL PRIMARY KEY,
        user_id      INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        block        INT NOT NULL,
        trigger_week INT NOT NULL,
        correct      INT NOT NULL DEFAULT 0,
        total        INT NOT NULL DEFAULT 0,
        total_pct    INT NOT NULL DEFAULT 0,
        taken_at     TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, block)
      )
    `);

    // Forward-migrate: add 'block' column if missing (legacy table)
    await db.query(`ALTER TABLE periodic_assessments ADD COLUMN IF NOT EXISTS block INT`);
    await db.query(`CREATE UNIQUE INDEX IF NOT EXISTS uniq_periodic_user_block ON periodic_assessments (user_id, block)`);    console.log('✅ periodic_assessments ready.');
  } catch (err) {
    console.error('⚠️  periodic_assessments migration error:', err.message);
  }
}

async function ensureCheckpointResults() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS checkpoint_results (
        id           SERIAL PRIMARY KEY,
        user_id      INT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        week_num     INT NOT NULL CHECK (week_num IN (14, 26, 36, 54)),
        passed       BOOLEAN NOT NULL DEFAULT false,
        results      JSONB NOT NULL DEFAULT '[]',
        taken_at     TIMESTAMPTZ DEFAULT NOW(),
        UNIQUE(user_id, week_num)
      )
    `);
    await db.query(`CREATE INDEX IF NOT EXISTS idx_checkpoint_results_user ON checkpoint_results(user_id)`);
    console.log('✅ checkpoint_results ready.');
  } catch (err) {
    console.error('⚠️  checkpoint_results migration error:', err.message);
  }
}

// One-time cleanup: delete periodic_assessment records that were auto-submitted
// when the student had zero real activity (the 100%-fake-submit bug, fixed 2026-04-17)
async function cleanFakeAssessments() {
  try {
    const res = await db.query(`
      DELETE FROM periodic_assessments pa
      WHERE NOT EXISTS (
        SELECT 1 FROM station_progress sp
        WHERE sp.user_id = pa.user_id AND sp.score > 0
      )
      RETURNING id, user_id, block, total_pct
    `);
    if (res.rowCount > 0) {
      console.log(`🧹 Cleaned ${res.rowCount} fake assessment record(s):`, res.rows);
    }
  } catch (err) {
    console.error('⚠️  cleanFakeAssessments error:', err.message);
  }
}

// Run seed then start listening
seedDatabase()
  .then(ensureManagerTable)
  .then(ensurePeriodicAssessments)
  .then(ensureCheckpointResults)
  .then(cleanFakeAssessments)
  .then(() => {
  app.listen(PORT, () => {
    console.log(`MCP Server is listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
