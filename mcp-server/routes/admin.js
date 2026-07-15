/* eslint-env node */
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware to check if user is admin
const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// POST /api/admin/run-migration
// Emergency migration endpoint - runs real_email migration on production
router.post('/run-migration', authMiddleware, async (req, res) => {
  if (req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Access denied. Super admin only.' });
  }
  
  try {
    console.log('🔧 [Migration] Running real_email migration...');
    
    // Add real_email column
    await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS real_email VARCHAR(255)`);
    console.log('✅ [Migration] real_email column added');
    
    // Add index
    await db.query(`CREATE INDEX IF NOT EXISTS idx_users_real_email ON users(real_email)`);
    console.log('✅ [Migration] real_email index added');
    
    // Verify column exists
    const verify = await db.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'real_email'
    `);
    
    if (verify.rows.length > 0) {
      console.log('✅ [Migration] Verified - real_email column exists');
      res.json({ 
        success: true, 
        message: 'Migration completed successfully',
        column: verify.rows[0]
      });
    } else {
      throw new Error('Column verification failed');
    }
    
  } catch (error) {
    console.error('❌ [Migration] Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Migration failed', 
      error: error.message 
    });
  }
});

// GET /api/admin/students
// Fetch all students and their aggregated progress
router.get('/students', authMiddleware, async (req, res) => {
  const allowed = ['admin', 'super_admin', 'teacher', 'team_leader', 'center_director'];
  if (!allowed.includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied.' });
  }

  // Teachers see only their own students; team/center managers see only students under their teachers; admins see all
  const isFilteredTeacher = req.user.role === 'teacher';
  const isManager = ['team_leader', 'center_director'].includes(req.user.role);
  const teacherFilter = isFilteredTeacher
    ? `AND u.id IN (SELECT student_id FROM teacher_assignments WHERE teacher_id = ${req.user.id})`
    : isManager
    ? `AND u.id IN (SELECT student_id FROM teacher_assignments WHERE teacher_id IN (SELECT teacher_id FROM manager_teacher_assignments WHERE manager_id = ${req.user.id}))`
    : '';
  const stationFilter = isFilteredTeacher
    ? `AND sp.user_id IN (SELECT student_id FROM teacher_assignments WHERE teacher_id = ${req.user.id})`
    : isManager
    ? `AND sp.user_id IN (SELECT student_id FROM teacher_assignments WHERE teacher_id IN (SELECT teacher_id FROM manager_teacher_assignments WHERE manager_id = ${req.user.id}))`
    : '';

  try {
    // Column names confirmed from Progress V3 route: score, updated_at, station_key
    const scoreCol = 'score';
    const tsCol = 'updated_at';

    const studentsResult = await db.query(`
      SELECT
        u.id,
        u.username,
        u.email,
        u.avatar_url,
        COALESCE(MAX(sp.week_id), 1) AS last_week,
        COALESCE(SUM(CASE
          WHEN sp.${scoreCol} >= 90 THEN 3
          WHEN sp.${scoreCol} >= 80 THEN 2
          WHEN sp.${scoreCol} >= 60 THEN 1
          ELSE 0 END), 0) AS stars,
        COALESCE(SUM(CASE
          WHEN sp.${scoreCol} >= 90 THEN 3
          WHEN sp.${scoreCol} >= 80 THEN 2
          WHEN sp.${scoreCol} >= 60 THEN 1
          ELSE 0 END), 0) AS total_stars,
        FLOOR(EXTRACT(EPOCH FROM (NOW() - COALESCE(MAX(sp.${tsCol}), u.created_at)))/86400)::int AS days_inactive
      FROM users u
      LEFT JOIN station_progress sp ON u.id = sp.user_id
      WHERE u.role = 'student'
        ${teacherFilter}
      GROUP BY u.id
      ORDER BY last_week DESC
    `);

    // Build station_scores map: all-time best score per canonical station per student.
    // Strips _easy/_hard suffix, normalizes legacy tab-key aliases, deduplicates easy+advanced,
    // and scores are GREATEST(score, progress_percent, is_completed*100) capped at 100.
    const stationScoresResult = await db.query(`
      SELECT user_id, normalized_key AS station_key,
             LEAST(100, MAX(score_val))::int AS score
      FROM (
        SELECT sp.user_id,
          CASE REGEXP_REPLACE(sp.station_key, '_(easy|hard)$', '')
            WHEN 'word_match'        THEN 'game_word_match'
            WHEN 'read_explore'      THEN 'skill_reading'
            WHEN 'writing'           THEN 'video_challenge'
            WHEN 'new_words'         THEN 'vocab_mastery'
            WHEN 'grammar'           THEN 'grammar_lab'
            WHEN 'dictation'         THEN 'skill_dictation'
            WHEN 'shadowing'         THEN 'skill_shadowing'
            WHEN 'logic_lab'         THEN 'game_logic'
            WHEN 'mindmap_speaking'  THEN 'production_mindmap'
            ELSE REGEXP_REPLACE(sp.station_key, '_(easy|hard)$', '')
          END AS normalized_key,
          GREATEST(
            COALESCE(sp.score, 0),
            COALESCE(sp.progress_percent, 0),
            CASE WHEN sp.is_completed THEN 100 ELSE 0 END
          ) AS score_val
        FROM station_progress sp
        JOIN users u ON sp.user_id = u.id
        WHERE u.role = 'student'
          ${stationFilter}
          AND sp.station_key IS NOT NULL
          AND sp.station_key <> ''
      ) normalized
      GROUP BY user_id, normalized_key
    `);

    const stationMap = {};
    for (const row of stationScoresResult.rows) {
      if (!stationMap[row.user_id]) stationMap[row.user_id] = {};
      if (row.station_key) stationMap[row.user_id][row.station_key] = Number(row.score) || 0;
    }

    const rows = studentsResult.rows.map(r => ({
      ...r,
      stars: Number(r.stars) || 0,
      total_stars: Number(r.total_stars) || 0,
      days_inactive: Number(r.days_inactive) || 0,
      station_scores: stationMap[r.id] || {},
    }));
    res.json(rows);
  } catch (error) {
    console.error('Fetch students error:', error);
    res.status(500).json({ message: 'Server error fetching students.' });
  }
});

// POST /api/admin/users/:username/extend-trial
// Owner extends a user's free trial by 4 weeks (28 days)
router.post('/users/:username/extend-trial', [authMiddleware, adminOnly], async (req, res) => {
  const { username } = req.params;
  try {
    const userRes = await db.query('SELECT id, trial_expires_at FROM users WHERE username = $1', [username]);
    if (userRes.rowCount === 0) return res.status(404).json({ message: 'User not found' });
    const existing = userRes.rows[0].trial_expires_at;
    const base = existing && new Date(existing) > new Date() ? new Date(existing) : new Date();
    const newExpiry = new Date(base.getTime() + 28 * 24 * 60 * 60 * 1000);
    const result = await db.query(
      'UPDATE users SET trial_expires_at = $1 WHERE username = $2 RETURNING username, trial_expires_at',
      [newExpiry.toISOString(), username]
    );
    res.json({ message: `Trial extended to ${newExpiry.toDateString()} (+4 weeks)`, user: result.rows[0] });
  } catch (error) {
    console.error('Extend trial error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/users
// Get all users
router.get('/users', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email, real_email, role, plan, plan_expires_at, plan_months, trial_expires_at, seats_total, avatar_url, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/hierarchy
// Returns manager → teacher → student_count tree for Owner Control Panel
router.get('/hierarchy', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const managers = await db.query(`
      SELECT u.id, u.username, u.role, u.plan, u.trial_expires_at, u.plan_expires_at,
             COUNT(DISTINCT mta.teacher_id)::int AS teacher_count,
             (
               SELECT COUNT(*)::int FROM teacher_assignments ta2
               JOIN manager_teacher_assignments mta3 ON ta2.teacher_id = mta3.teacher_id
               WHERE mta3.manager_id = u.id
             ) AS student_count
      FROM users u
      LEFT JOIN manager_teacher_assignments mta ON mta.manager_id = u.id
      WHERE u.role IN ('team_leader', 'center_director')
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `);

    const hierarchy = await Promise.all(managers.rows.map(async (m) => {
      const teachers = await db.query(`
        SELECT u.id, u.username, mta.allocated_seats,
               COALESCE(COUNT(ta.student_id), 0)::int AS student_count
        FROM manager_teacher_assignments mta
        JOIN users u ON u.id = mta.teacher_id
        LEFT JOIN teacher_assignments ta ON ta.teacher_id = u.id
        WHERE mta.manager_id = $1
        GROUP BY u.id, u.username, mta.allocated_seats
      `, [m.id]);
      return { ...m, teachers: teachers.rows };
    }));

    res.json(hierarchy);
  } catch (err) {
    console.error('hierarchy error:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/users
// Create a new user (admin version)
router.post('/users', [authMiddleware, adminOnly], async (req, res) => {
  const { username, password, role, plan, email, seats_total } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const userEmail = email || `${username}@engquest.com`;

    const trialExpiry = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const staffRoles = ['teacher', 'team_leader', 'center_director'];
    const planExpiry = staffRoles.includes(role) ? trialExpiry : null;
    // Parent accounts: use seats_total if supplied; default 2 if not provided
    const resolvedSeats = role === 'parent' ? (Number(seats_total) || 2) : null;
    const result = await db.query(
      `INSERT INTO users (username, password_hash, role, plan, email, trial_expires_at, plan_expires_at, seats_total)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, username, role, plan, seats_total`,
      [username, password_hash, role || 'student', plan || 'free_trial', userEmail, trialExpiry, planExpiry, resolvedSeats]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Username already exists' });
    }
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/users/:username
router.delete('/users/:username', [authMiddleware, adminOnly], async (req, res) => {
  const { username } = req.params;

  if (username === 'owner') {
    return res.status(403).json({ message: 'Cannot delete the owner account' });
  }

  try {
    const result = await db.query('DELETE FROM users WHERE username = $1 RETURNING username', [username]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `User ${username} deleted successfully` });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/admin/users/:username
// Update role, plan, plan_expires_at, seats_total, or reset password for any user
router.put('/users/:username', [authMiddleware, adminOnly], async (req, res) => {
  const { username } = req.params;
  const { role, plan, newPassword, plan_expires_at, trial_expires_at, seats_total, plan_months, real_email } = req.body;

  // Only super_admin can touch the owner account or escalate to super_admin
  if (username === 'owner' && req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Only super_admin can modify the owner account.' });
  }
  if (role === 'super_admin' && req.user.role !== 'super_admin') {
    return res.status(403).json({ message: 'Only super_admin can grant super_admin role.' });
  }

  try {
    const updates = [];
    const values = [];
    let idx = 1;

    if (role)              { updates.push(`role = $${idx++}`);              values.push(role); }
    if (plan)              { updates.push(`plan = $${idx++}`);              values.push(plan); }
    if (plan_expires_at !== undefined) { updates.push(`plan_expires_at = $${idx++}`); values.push(plan_expires_at || null); }
    if (trial_expires_at !== undefined) { updates.push(`trial_expires_at = $${idx++}`); values.push(trial_expires_at || null); }
    if (seats_total !== undefined) { updates.push(`seats_total = $${idx++}`); values.push(parseInt(seats_total) || 0); }
    if (plan_months !== undefined) { updates.push(`plan_months = $${idx++}`); values.push(plan_months != null ? parseInt(plan_months) : null); }
    if (real_email !== undefined) { updates.push(`real_email = $${idx++}`); values.push(real_email || null); }
    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      updates.push(`password_hash = $${idx++}`);
      values.push(hash);
    }

    if (updates.length === 0) {
      return res.status(400).json({ message: 'No fields to update.' });
    }

    values.push(username);
    const result = await db.query(
      `UPDATE users SET ${updates.join(', ')} WHERE username = $${idx}
       RETURNING id, username, role, plan, plan_expires_at, trial_expires_at, seats_total, email, real_email`,
      values
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: result.rows[0] });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/users (enhanced — return subscription fields)
// (Already defined above, replacing just the SELECT fields)

// POST /api/admin/users/:username/activate-plan
// Activate/extend a plan for a user (B2C or B2B)
router.post('/users/:username/activate-plan', [authMiddleware, adminOnly], async (req, res) => {
  const { username } = req.params;
  const { plan, months, seats_total } = req.body;

  if (!plan || !months) {
    return res.status(400).json({ message: 'plan and months are required.' });
  }

  const VALID_PLANS = ['student', 'family', 'teacher_starter', 'teacher_pro', 'team', 'center', 'premium_lifetime', 'free_trial'];
  if (!VALID_PLANS.includes(plan)) {
    return res.status(400).json({ message: `Invalid plan. Valid: ${VALID_PLANS.join(', ')}` });
  }

  try {
    // premium_lifetime: no expiry (NULL), one-time grant
    if (plan === 'premium_lifetime') {
      const result = await db.query(
        `UPDATE users SET plan = $1, plan_expires_at = NULL, seats_total = 0
         WHERE username = $2
         RETURNING id, username, role, plan, plan_expires_at, trial_expires_at, seats_total, email`,
        [plan, username]
      );
      if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' });
      return res.json({ message: `Premium Lifetime granted to ${username}`, user: result.rows[0] });
    }

    // Calculate expiry: extend from now OR from current expiry, whichever is later
    const userRes = await db.query('SELECT plan_expires_at FROM users WHERE username = $1', [username]);
    if (userRes.rowCount === 0) return res.status(404).json({ message: 'User not found' });

    const existingExpiry = userRes.rows[0].plan_expires_at;
    const base = existingExpiry && new Date(existingExpiry) > new Date() ? new Date(existingExpiry) : new Date();
    const newExpiry = new Date(base.getTime() + months * 30 * 24 * 60 * 60 * 1000);

    const seatsMap = {
      student: 0, family: 4, free_trial: 0, premium_lifetime: 0,
      teacher_starter: 5, teacher_pro: 20,
      team: 60, center: 200,
    };
    const finalSeats = seats_total !== undefined ? parseInt(seats_total) : (seatsMap[plan] ?? 0);
    const newRole = plan === 'family' ? 'parent' : undefined;

    // Step 1: Core update (always works regardless of schema version)
    const result = await db.query(
      `UPDATE users SET plan = $1, plan_expires_at = $2, seats_total = $3
         ${newRole ? ", role = '" + newRole + "'" : ''}
       WHERE username = $4
       RETURNING id, username, role, plan, plan_expires_at, trial_expires_at, seats_total, email`,
      [plan, newExpiry.toISOString(), finalSeats, username]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' });

    // Step 2: Best-effort save plan_months (column may not exist on older DB schemas)
    try {
      await db.query(`UPDATE users SET plan_months = $1 WHERE username = $2`, [months, username]);
    } catch (_) { /* column not yet added via migration — safe to ignore */ }

    // Step 3: Cascade for family plan
    if (plan === 'family') {
      const parentId = result.rows[0].id;
      await db.query(`UPDATE users SET plan = $1, plan_expires_at = $2 WHERE parent_id = $3`,
        [plan, newExpiry.toISOString(), parentId]);
    }

    res.json({ message: `Plan activated: ${plan} until ${newExpiry.toDateString()}`, user: result.rows[0] });
  } catch (error) {
    console.error('Error activating plan:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// POST /api/admin/users/:username/set-trial
// Set free trial period for a user (resets to free_trial plan).
// days = 14 (default, any admin) | 60 (owner-only special case).
router.post('/users/:username/set-trial', [authMiddleware, adminOnly], async (req, res) => {
  const { username } = req.params;
  const { days = 14 } = req.body;
  const allowedDays = [14, 60];
  if (!allowedDays.includes(Number(days))) {
    return res.status(400).json({ message: 'days must be 14 or 60' });
  }
  // Only super_admin (owner) can set 60-day trial
  if (Number(days) === 60 && req.user.role !== 'super_admin') {
    return res.status(403).json({ message: '60-day trial is owner-only' });
  }
  try {
    const trialExpiry = new Date(Date.now() + Number(days) * 24 * 60 * 60 * 1000).toISOString();
    const result = await db.query(
      `UPDATE users
       SET plan = 'free_trial', trial_expires_at = $1, plan_expires_at = NULL
       WHERE username = $2
       RETURNING id, username, role, plan, trial_expires_at, plan_expires_at`,
      [trialExpiry, username]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' });
    // Best-effort: clear plan_months if the column exists
    try { await db.query(`UPDATE users SET plan_months = NULL WHERE username = $1`, [username]); } catch (_) {}
    res.json({ message: `Free trial set: ${days} days until ${new Date(trialExpiry).toDateString()}`, user: result.rows[0] });
  } catch (err) {
    console.error('set-trial error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// POST /api/admin/users/:username/set-expiry
// Override plan + expiry to exactly NOW + N days. Does NOT stack on existing expiry.
// NOTE: role is intentionally NOT changed here — plan and role are independent.
router.post('/users/:username/set-expiry', [authMiddleware, adminOnly], async (req, res) => {
  const { username } = req.params;
  const { plan, days } = req.body;
  if (!days || days < 1 || days > 36500) return res.status(400).json({ message: 'days must be 1–36500' });

  const SEAT_MAP = { student: 0, sibling: 2, family: 4, teacher_starter: 5, teacher_pro: 20, team: 60, center: 200, premium_lifetime: 0 };

  try {
    let result;
    if (plan === 'premium_lifetime') {
      // Lifetime: set plan with NO expiry
      result = await db.query(
        `UPDATE users SET plan = 'premium_lifetime', plan_expires_at = NULL, seats_total = 0
         WHERE username = $1
         RETURNING id, username, role, plan, plan_expires_at`,
        [username]
      );
    } else if (plan && plan !== 'free_trial') {
      const newExpiry = new Date(Date.now() + Number(days) * 24 * 60 * 60 * 1000).toISOString();
      const seats = SEAT_MAP[plan] ?? 0;
      result = await db.query(
        `UPDATE users SET plan = $1, plan_expires_at = $2, seats_total = $3
         WHERE username = $4
         RETURNING id, username, role, plan, plan_expires_at`,
        [plan, newExpiry, seats, username]
      );
    } else {
      const newExpiry = new Date(Date.now() + Number(days) * 24 * 60 * 60 * 1000).toISOString();
      result = await db.query(
        `UPDATE users SET plan_expires_at = $1
         WHERE username = $2
         RETURNING id, username, role, plan, plan_expires_at`,
        [newExpiry, username]
      );
    }
    if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' });
    const approxMonths = plan === 'premium_lifetime' ? null : Math.round(Number(days) / 30) || 1;
    await db.query(`UPDATE users SET plan_months = $1 WHERE username = $2`, [approxMonths, username]);
    const userRes = await db.query('SELECT id, username, role, plan, plan_expires_at, plan_months, seats_total FROM users WHERE username = $1', [username]);
    res.json({ message: `Plan updated for ${username}`, user: userRes.rows[0] });
  } catch (err) {
    console.error('set-expiry error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// PUT /api/admin/users/:username/reset-password
// Admin resets any user's password.
router.put('/users/:username/reset-password', [authMiddleware, adminOnly], async (req, res) => {
  const { username } = req.params;
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) return res.status(400).json({ message: 'Mật khẩu tối thiểu 6 ký tự' });
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    const result = await db.query(
      'UPDATE users SET password_hash = $1 WHERE username = $2 RETURNING username',
      [hash, username]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'User not found' });
    res.json({ message: `Đã reset mật khẩu cho ${username}` });
  } catch (err) {
    console.error('reset-password error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ——— GLOBAL AVATARS ———

// GET /api/admin/global-avatars  (public – any logged-in user can read)
router.get('/global-avatars', authMiddleware, async (req, res) => {
  try {
    const result = await db.query('SELECT id, url, created_at FROM global_avatars ORDER BY id ASC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching global avatars:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/global-avatars  (super_admin only)
router.post('/global-avatars', [authMiddleware, adminOnly], async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ message: 'url is required' });
  try {
    const result = await db.query(
      'INSERT INTO global_avatars (url) VALUES ($1) RETURNING id, url, created_at',
      [url]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error adding global avatar:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/admin/global-avatars/:id  (super_admin only)
router.delete('/global-avatars/:id', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const result = await db.query('DELETE FROM global_avatars WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Avatar not found' });
    res.json({ message: 'Avatar deleted' });
  } catch (error) {
    console.error('Error deleting global avatar:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ────────────────────────────────────────────────
// GET /api/admin/progress/dump
// Dumps all progress records for retrieval / migration / audit.
// Query params:
//   userId  - filter by user id (optional)
//   weekId  - filter by week id (optional)
//   hasData - "true" to only return rows with non-empty data (default: false)
//   limit   - cap rows (default: 1000, max: 10000)
// BUG FIX (Jun 9, 2026): added so the operator can audit/recover any
// progress records after a save-flow bug. Returns joined user info for
// easy CSV export.
// ────────────────────────────────────────────────
router.get('/progress/dump', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const { userId, weekId, hasData, limit: limitRaw } = req.query;
    const limit = Math.min(parseInt(limitRaw, 10) || 1000, 10000);

    const where = [];
    const args = [];
    let i = 1;
    if (userId) { where.push(`sp.user_id = $${i++}`); args.push(parseInt(userId, 10)); }
    if (weekId) { where.push(`sp.week_id = $${i++}`); args.push(parseInt(weekId, 10)); }
    if (hasData === 'true') {
      where.push(`(sp.data IS NOT NULL AND sp.data::text NOT IN ('{}', 'null'))`);
    }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

    const { rows } = await db.query(
      `SELECT sp.user_id, u.username, u.email, sp.week_id, sp.station_key,
              sp.data, sp.is_completed, sp.score, sp.progress_percent, sp.updated_at
       FROM station_progress sp
       LEFT JOIN users u ON u.id = sp.user_id
       ${whereSql}
       ORDER BY sp.updated_at DESC
       LIMIT $${i}`,
      [...args, limit]
    );

    res.json({
      count: rows.length,
      filter: { userId, weekId, hasData, limit },
      rows
    });
  } catch (error) {
    console.error('Error dumping progress:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/admin/progress/stats
// Returns aggregate counts: total rows, distinct users, rows with data, etc.
router.get('/progress/stats', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const { rows } = await db.query(`
      SELECT
        COUNT(*)::int AS total_rows,
        COUNT(DISTINCT user_id)::int AS distinct_users,
        COUNT(DISTINCT week_id)::int AS distinct_weeks,
        COUNT(*) FILTER (WHERE data IS NOT NULL AND data::text NOT IN ('{}', 'null'))::int AS rows_with_data,
        COUNT(*) FILTER (WHERE is_completed = true)::int AS completed_rows,
        MAX(updated_at) AS last_update
      FROM station_progress
    `);
    res.json(rows[0] || {});
  } catch (error) {
    console.error('Error fetching progress stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
