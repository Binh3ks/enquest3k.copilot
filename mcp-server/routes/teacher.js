/* eslint-env node */
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Middleware: Teacher or admin only (includes manager roles)
const teacherOrAdmin = (req, res, next) => {
  if (!['teacher', 'admin', 'super_admin', 'team_leader', 'center_director'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Teacher or admin only.' });
  }
  next();
};

// Middleware: Manager roles (team_leader / center_director) or admin
const managerOrAdmin = (req, res, next) => {
  if (!['team_leader', 'center_director', 'admin', 'super_admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Manager or admin only.' });
  }
  next();
};

// Middleware: Admin only (for assignments)
const adminOnly = (req, res, next) => {
  if (!['admin', 'super_admin'].includes(req.user.role)) {
    return res.status(403).json({ message: 'Access denied. Admin only.' });
  }
  next();
};

// ============================================================================
// MANAGER ROUTES — team_leader / center_director manages teachers
// ============================================================================

const MANAGER_MAX_TEACHERS = { team_leader: 3, center_director: 8 };
const MANAGER_SEATS_PER_TEACHER = { team_leader: 20, center_director: 25 };

/**
 * GET /api/teacher/manager-seat-info
 * Returns manager's plan + teacher quota usage
 */
router.get('/manager-seat-info', [authMiddleware, managerOrAdmin], async (req, res) => {
  const managerId = req.user.id;
  try {
    const managerRes = await db.query('SELECT role, plan, plan_expires_at FROM users WHERE id = $1', [managerId]);
    if (managerRes.rowCount === 0) return res.status(404).json({ message: 'Manager not found' });
    const { role, plan, plan_expires_at } = managerRes.rows[0];
    const maxTeachers = MANAGER_MAX_TEACHERS[role] || 0;
    const usedRes = await db.query('SELECT COUNT(*) AS used FROM manager_teacher_assignments WHERE manager_id = $1', [managerId]);
    const teachers_used = parseInt(usedRes.rows[0].used);
    res.json({ role, plan, plan_expires_at, teachers_total: maxTeachers, teachers_used });
  } catch (err) {
    console.error('manager-seat-info error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/my-teachers
 * Returns list of teachers managed by this manager
 */
router.get('/my-teachers', [authMiddleware, managerOrAdmin], async (req, res) => {
  const managerId = req.user.id;
  try {
    const result = await db.query(
      `SELECT mta.id AS assignment_id, mta.teacher_id, mta.allocated_seats, mta.assigned_at,
              u.username AS teacher_name, u.email AS teacher_email, u.plan, u.plan_expires_at,
              COALESCE(ta_count.student_count, 0) AS students_assigned
       FROM manager_teacher_assignments mta
       JOIN users u ON u.id = mta.teacher_id
       LEFT JOIN (SELECT teacher_id, COUNT(*) AS student_count FROM teacher_assignments GROUP BY teacher_id) ta_count
         ON ta_count.teacher_id = mta.teacher_id
       WHERE mta.manager_id = $1
       ORDER BY mta.assigned_at`,
      [managerId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('my-teachers error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/teacher/create-teacher
 * Manager creates a teacher account within their quota.
 * Body: { username, password, allocated_seats? }
 */
router.post('/create-teacher', [authMiddleware, managerOrAdmin], async (req, res) => {
  const managerId = req.user.id;
  const { username, password, allocated_seats } = req.body;

  if (!username || !password) return res.status(400).json({ message: 'username and password are required' });
  if (username.length < 3 || username.length > 30) return res.status(400).json({ message: 'Username must be 3–30 chars' });
  if (!/^[a-zA-Z0-9_.-]+$/.test(username)) return res.status(400).json({ message: 'Username: letters, numbers, _ . - only' });
  if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 chars' });

  try {
    const managerRes = await db.query('SELECT role, plan, plan_expires_at, trial_expires_at FROM users WHERE id = $1', [managerId]);
    const manager = managerRes.rows[0];
    if (!manager) return res.status(404).json({ message: 'Manager not found' });

    const maxTeachers = MANAGER_MAX_TEACHERS[manager.role] || 0;
    const usedRes = await db.query('SELECT COUNT(*) AS used FROM manager_teacher_assignments WHERE manager_id = $1', [managerId]);
    const teachers_used = parseInt(usedRes.rows[0].used);
    if (teachers_used >= maxTeachers) {
      return res.status(403).json({ message: `Teacher quota full (${teachers_used}/${maxTeachers}). Upgrade plan to add more teachers.`, teachers_used, maxTeachers });
    }

    const defaultSeats = allocated_seats ?? MANAGER_SEATS_PER_TEACHER[manager.role] ?? 10;
    // Compute expiry: use manager's plan_expires_at, or trial_expires_at, or 14-day fallback
    const expiryFallback = manager.trial_expires_at
      || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const planExpiry = manager.plan_expires_at || expiryFallback;
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      `INSERT INTO users (username, email, password_hash, role, plan, plan_expires_at, trial_expires_at, seats_total)
       VALUES ($1, $2, $3, 'teacher', $4, $5, $5, $6)
       RETURNING id, username, role, plan, seats_total`,
      [username, `${username}@mgr${managerId}.engquest`, passwordHash,
       manager.plan, planExpiry, defaultSeats]
    );
    const teacher = newUser.rows[0];

    await db.query(
      'INSERT INTO manager_teacher_assignments (manager_id, teacher_id, allocated_seats) VALUES ($1, $2, $3)',
      [managerId, teacher.id, defaultSeats]
    );

    res.status(201).json({ message: 'Teacher created successfully', teacher, teachers_used: teachers_used + 1, maxTeachers });
  } catch (err) {
    if (err.code === '23505') return res.status(409).json({ message: 'Username already taken.' });
    console.error('create-teacher error:', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

/**
 * DELETE /api/teacher/teacher/:teacherId
 * Manager removes a teacher from their roster.
 */
router.delete('/teacher/:teacherId', [authMiddleware, managerOrAdmin], async (req, res) => {
  const managerId = req.user.id;
  const { teacherId } = req.params;
  const deleteAccount = req.query.deleteAccount === 'true';
  try {
    const assignRes = await db.query('SELECT id FROM manager_teacher_assignments WHERE manager_id = $1 AND teacher_id = $2', [managerId, teacherId]);
    if (assignRes.rowCount === 0) return res.status(403).json({ message: 'Teacher not in your roster' });
    await db.query('DELETE FROM manager_teacher_assignments WHERE manager_id = $1 AND teacher_id = $2', [managerId, teacherId]);
    if (deleteAccount) await db.query('DELETE FROM users WHERE id = $1', [teacherId]);
    res.json({ message: deleteAccount ? 'Teacher account deleted' : 'Teacher removed from roster' });
  } catch (err) {
    console.error('remove-teacher error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/teacher/teacher/:teacherId/reset-password
 * Manager resets a teacher's password. Verifies ownership via manager_teacher_assignments.
 * Body: { newPassword }
 */
router.put('/teacher/:teacherId/reset-password', [authMiddleware, managerOrAdmin], async (req, res) => {
  const managerId = req.user.id;
  const { teacherId } = req.params;
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }
  try {
    const assignRes = await db.query(
      'SELECT id FROM manager_teacher_assignments WHERE manager_id = $1 AND teacher_id = $2',
      [managerId, teacherId]
    );
    if (assignRes.rowCount === 0) return res.status(403).json({ message: 'Teacher not in your roster' });
    const passwordHash = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [passwordHash, teacherId]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('reset-teacher-password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============================================================================
// TEACHER SELF-SERVICE: seat management
// ============================================================================

/**
 * GET /api/teacher/seat-info
 * Returns teacher's plan, seats_total and seats_used count.
 */
router.get('/seat-info', [authMiddleware, teacherOrAdmin], async (req, res) => {
  try {
    const teacherId = req.user.id;
    const userRes = await db.query(
      'SELECT plan, seats_total, plan_expires_at FROM users WHERE id = $1',
      [teacherId]
    );
    if (userRes.rowCount === 0) return res.status(404).json({ message: 'User not found' });

    const usedRes = await db.query(
      'SELECT COUNT(*) AS used FROM teacher_assignments WHERE teacher_id = $1',
      [teacherId]
    );
    const { plan, seats_total, plan_expires_at } = userRes.rows[0];
    const seats_used = parseInt(usedRes.rows[0].used);
    res.json({ plan, seats_total: seats_total || 0, seats_used, plan_expires_at });
  } catch (err) {
    console.error('seat-info error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /api/teacher/create-student
 * Teacher creates a student account within their seat quota.
 * Body: { username, password, display_name? }
 */
router.post('/create-student', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { username, password, display_name } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'username and password are required' });
  }
  if (username.length < 3 || username.length > 30) {
    return res.status(400).json({ message: 'Username must be 3–30 characters' });
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(username)) {
    return res.status(400).json({ message: 'Username: letters, numbers, _ . - only' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  try {
    // Check teacher quota
    const teacherRes = await db.query(
      'SELECT seats_total, plan, plan_expires_at FROM users WHERE id = $1',
      [teacherId]
    );
    const teacher = teacherRes.rows[0];
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });

    const usedRes = await db.query(
      'SELECT COUNT(*) AS used FROM teacher_assignments WHERE teacher_id = $1',
      [teacherId]
    );
    const seats_used = parseInt(usedRes.rows[0].used);
    const seats_total = teacher.seats_total || 0;

    if (seats_used >= seats_total) {
      return res.status(403).json({
        message: `Seat quota full (${seats_used}/${seats_total}). Upgrade your plan to add more students.`,
        seats_used,
        seats_total,
      });
    }

    // Inherit teacher's plan expiry; fall back to trial or 14-day window
    const teacherTrialRes = await db.query('SELECT trial_expires_at FROM users WHERE id = $1', [teacherId]);
    const expiryFallback = teacherTrialRes.rows[0]?.trial_expires_at
      || new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const planExpiresAt = teacher.plan_expires_at || expiryFallback;

    // Create student account
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await db.query(
      `INSERT INTO users (username, email, password_hash, role, plan, plan_expires_at, trial_expires_at, avatar_url)
       VALUES ($1, $2, $3, 'student', 'student', $4, $4, NULL)
       RETURNING id, username, role, plan`,
      [
        username,
        `${username}@tch${teacherId}.engquest`,
        passwordHash,
        planExpiresAt,
      ]
    );

    const student = newUser.rows[0];

    // Auto-assign to this teacher
    await db.query(
      `INSERT INTO teacher_assignments (teacher_id, student_id, assigned_by)
       VALUES ($1, $2, $3)`,
      [teacherId, student.id, teacherId]
    );

    res.status(201).json({
      message: 'Student created and assigned successfully',
      student,
      seats_used: seats_used + 1,
      seats_total,
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Username already taken. Choose a different one.' });
    }
    console.error('create-student error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * DELETE /api/teacher/student/:studentId
 * Remove a student from teacher's roster (unassign + optionally delete account).
 * Query: ?deleteAccount=true to also delete the user account.
 */
router.delete('/student/:studentId', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { studentId } = req.params;
  const deleteAccount = req.query.deleteAccount === 'true';

  try {
    // Verify ownership
    const assignRes = await db.query(
      'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
      [teacherId, studentId]
    );
    if (assignRes.rowCount === 0) {
      return res.status(403).json({ message: 'Student not in your roster' });
    }

    await db.query('DELETE FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2', [teacherId, studentId]);

    if (deleteAccount) {
      await db.query('DELETE FROM users WHERE id = $1', [studentId]);
    }

    res.json({ message: deleteAccount ? 'Student account deleted' : 'Student removed from your roster' });
  } catch (err) {
    console.error('remove-student error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/teacher/student/:studentId/private-notes
 * Teacher saves private internal notes about a student (not visible to student).
 * Body: { notes }
 */
router.put('/student/:studentId/private-notes', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const { studentId } = req.params;
  const { notes } = req.body;

  try {
    // Verify access
    if (req.user.role === 'teacher') {
      const access = await db.query(
        'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
        [req.user.id, studentId]
      );
      if (access.rowCount === 0) return res.status(403).json({ message: 'No access to this student' });
    }

    await db.query(
      `UPDATE teacher_assignments SET private_notes = $1
       WHERE teacher_id = $2 AND student_id = $3`,
      [notes || null, req.user.id, studentId]
    );
    res.json({ message: 'Notes saved' });
  } catch (err) {
    console.error('Save private notes error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/teacher/student/:studentId/reset-password
 * Teacher resets a student's password.
 * Body: { newPassword }
 */
router.put('/student/:studentId/reset-password', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { studentId } = req.params;
  const { newPassword } = req.body;

  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: 'newPassword must be at least 6 characters' });
  }

  try {
    // Verify ownership
    const assignRes = await db.query(
      'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
      [teacherId, studentId]
    );
    if (assignRes.rowCount === 0) {
      return res.status(403).json({ message: 'Student not in your roster' });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, studentId]);
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    console.error('reset-password error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============================================================================
// TEACHER ASSIGNMENTS
// ============================================================================

/**
 * GET /api/teacher/all-assignments
 * Admin/owner: get every teacher_assignment row with names (for Transfer panel)
 */
router.get('/all-assignments', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const result = await db.query(`
      SELECT ta.id AS assignment_id, ta.teacher_id, ta.student_id,
             u_s.username AS student_name, u_t.username AS teacher_username
      FROM teacher_assignments ta
      JOIN users u_s ON u_s.id = ta.student_id
      JOIN users u_t ON u_t.id = ta.teacher_id
      ORDER BY ta.assigned_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('all-assignments error:', err);
    res.status(500).json({ message: err.message });
  }
});

/**
 * POST /api/teacher/assign
 * Assign a student to a teacher (admin only)
 * Body: { teacherId, studentId, notes? }
 */
router.post('/assign', [authMiddleware, adminOnly], async (req, res) => {
  const { teacherId, studentId, notes } = req.body;

  if (!teacherId || !studentId) {
    return res.status(400).json({ message: 'teacherId and studentId are required' });
  }

  try {
    // Verify teacher role
    const teacherCheck = await db.query(
      'SELECT id, role FROM users WHERE id = $1',
      [teacherId]
    );
    if (teacherCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    if (teacherCheck.rows[0].role !== 'teacher') {
      return res.status(400).json({ message: 'User is not a teacher' });
    }

    // Verify student role
    const studentCheck = await db.query(
      'SELECT id, role FROM users WHERE id = $1',
      [studentId]
    );
    if (studentCheck.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    if (studentCheck.rows[0].role !== 'student') {
      return res.status(400).json({ message: 'User is not a student' });
    }

    // Insert assignment (will fail if student already assigned due to UNIQUE constraint)
    const result = await db.query(
      `INSERT INTO teacher_assignments (teacher_id, student_id, assigned_by, notes)
       VALUES ($1, $2, $3, $4)
       RETURNING id, teacher_id, student_id, assigned_at`,
      [teacherId, studentId, req.user.id, notes || null]
    );

    res.status(201).json({
      message: 'Student assigned successfully',
      assignment: result.rows[0]
    });
  } catch (error) {
    if (error.code === '23505') { // Unique constraint violation
      return res.status(409).json({ message: 'Student is already assigned to another teacher' });
    }
    console.error('Assign student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * DELETE /api/teacher/assign/:studentId
 * Unassign a student from their teacher (admin only)
 */
router.delete('/assign/:studentId', [authMiddleware, adminOnly], async (req, res) => {
  const { studentId } = req.params;

  try {
    const result = await db.query(
      'DELETE FROM teacher_assignments WHERE student_id = $1 RETURNING id',
      [studentId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json({ message: 'Student unassigned successfully' });
  } catch (error) {
    console.error('Unassign student error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/my-students
 * Get all students assigned to the current teacher
 * Returns: Array of students with progress overview
 */
router.get('/my-students', [authMiddleware, teacherOrAdmin], async (req, res) => {
  try {
    const teacherId = req.user.id;

    // Rewritten as CTEs so each table is scanned once with index lookups
    // instead of massive JOIN + GROUP BY across 18k activity_log rows.
    const result = await db.query(
      `WITH
        -- 1. Students assigned to this teacher
        assigned AS (
          SELECT ta.id AS assignment_id, ta.student_id, ta.assigned_at,
                 u.username AS student_name, u.email AS student_email,
                 u.avatar_url, u.plan, u.created_at
          FROM teacher_assignments ta
          JOIN users u ON ta.student_id = u.id
          WHERE ta.teacher_id = $1 AND u.role = 'student'
        ),
        -- 2. Aggregate station_progress per student (one scan, indexed on user_id)
        sp_agg AS (
          SELECT user_id,
                 COALESCE(MAX(week_id), 1)    AS current_week,
                 COUNT(DISTINCT week_id)       AS weeks_completed,
                 MAX(updated_at)               AS last_sp_updated,
                 COALESCE(SUM(CASE WHEN score >= 90 THEN 3
                                   WHEN score >= 80 THEN 2
                                   WHEN score >= 60 THEN 1 ELSE 0 END), 0) AS total_stars
          FROM station_progress
          WHERE user_id IN (SELECT student_id FROM assigned)
          GROUP BY user_id
        ),
        -- 3. Max activity_log timestamp per student (one scan, indexed on user_id)
        sal_agg AS (
          SELECT user_id, MAX(created_at) AS last_sal_created
          FROM student_activity_log
          WHERE user_id IN (SELECT student_id FROM assigned)
          GROUP BY user_id
        ),
        -- 4. Today's session duration (indexed on user_id)
        today_sal AS (
          SELECT user_id,
                 EXTRACT(EPOCH FROM (MAX(created_at) - MIN(created_at)))/60 AS session_duration_minutes
          FROM student_activity_log
          WHERE user_id IN (SELECT student_id FROM assigned)
            AND created_at >= CURRENT_DATE
          GROUP BY user_id
        ),
        -- 5. Unread messages per student (indexed on to_user_id + read)
        msg_agg AS (
          SELECT to_user_id AS student_id, COUNT(*) AS unread_count
          FROM messages
          WHERE from_user_id = $1 AND read = FALSE
            AND to_user_id IN (SELECT student_id FROM assigned)
          GROUP BY to_user_id
        ),
        -- 6. Activity in last 7 days from activity_log (indexed on user_id)
        sal_7days AS (
          SELECT user_id, (CURRENT_DATE - created_at::date) AS days_ago
          FROM student_activity_log
          WHERE user_id IN (SELECT student_id FROM assigned)
            AND created_at >= CURRENT_DATE - 6
        ),
        -- 7. Activity in last 7 days from station_progress (indexed on user_id)
        sp_7days AS (
          SELECT user_id, (CURRENT_DATE - updated_at::date) AS days_ago
          FROM station_progress
          WHERE user_id IN (SELECT student_id FROM assigned)
            AND updated_at >= CURRENT_DATE - 6
        ),
        -- 8. Merge 7-day activity into boolean array [day0..day6]
        activity_7 AS (
          SELECT user_id,
                 ARRAY[
                   bool_or(days_ago = 6), bool_or(days_ago = 5), bool_or(days_ago = 4),
                   bool_or(days_ago = 3), bool_or(days_ago = 2), bool_or(days_ago = 1),
                   bool_or(days_ago = 0)
                 ] AS activity_last_7_days
          FROM (SELECT user_id, days_ago FROM sal_7days
                UNION ALL SELECT user_id, days_ago FROM sp_7days) combined
          GROUP BY user_id
        ),
        -- 9. Current-week completion % per student
        cur_week_done AS (
          SELECT sp.user_id,
                 COUNT(*) FILTER (WHERE score > 0 OR is_completed = true OR progress_percent > 0)::numeric
                 / NULLIF(COUNT(*), 0) * 100 AS pct
          FROM station_progress sp
          WHERE sp.user_id IN (SELECT student_id FROM assigned)
            AND sp.week_id = (SELECT COALESCE(MAX(week_id),1) FROM station_progress WHERE user_id = sp.user_id)
          GROUP BY sp.user_id
        ),
        -- 10. Station scores map per student
        station_scores_agg AS (
          SELECT user_id, jsonb_object_agg(station_key, best_score) AS station_scores
          FROM (
            SELECT user_id, station_key, MAX(score) AS best_score
            FROM station_progress
            WHERE user_id IN (SELECT student_id FROM assigned) AND score > 0
            GROUP BY user_id, station_key
          ) s
          GROUP BY user_id
        )
      SELECT
        a.assignment_id,
        a.student_id,
        a.student_name,
        a.student_email,
        a.avatar_url,
        a.plan,
        a.assigned_at,
        COALESCE(sp.current_week, 1)           AS current_week,
        COALESCE(sp.weeks_completed, 0)        AS weeks_completed,
        GREATEST(
          COALESCE(sal.last_sal_created, a.created_at),
          COALESCE(sp.last_sp_updated,   a.created_at)
        ) AS last_active,
        ROUND(EXTRACT(EPOCH FROM (NOW() - GREATEST(
          COALESCE(sal.last_sal_created, a.created_at),
          COALESCE(sp.last_sp_updated,   a.created_at)
        )))/86400)::int AS days_inactive,
        COALESCE(msg.unread_count, 0)          AS unread_messages_from_teacher,
        ts.session_duration_minutes,
        LEAST(100, ROUND(COALESCE(cwd.pct, 0)))::int AS current_week_completion_pct,
        COALESCE(act.activity_last_7_days, ARRAY[false,false,false,false,false,false,false]) AS activity_last_7_days,
        ssa.station_scores,
        COALESCE(sp.total_stars, 0)            AS total_stars
      FROM assigned a
      LEFT JOIN sp_agg         sp  ON sp.user_id  = a.student_id
      LEFT JOIN sal_agg        sal ON sal.user_id  = a.student_id
      LEFT JOIN today_sal      ts  ON ts.user_id   = a.student_id
      LEFT JOIN msg_agg        msg ON msg.student_id = a.student_id
      LEFT JOIN activity_7     act ON act.user_id  = a.student_id
      LEFT JOIN cur_week_done  cwd ON cwd.user_id  = a.student_id
      LEFT JOIN station_scores_agg ssa ON ssa.user_id = a.student_id
      ORDER BY last_active DESC NULLS LAST`,
      [teacherId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get my students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/student/:studentId/detail
 * Get detailed progress for a specific student
 * Returns: Week progress, station breakdown, recent activity
 */
router.get('/student/:studentId/detail', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const { studentId } = req.params;

  try {
    // Verify teacher has access to this student
    if (req.user.role === 'teacher') {
      const accessCheck = await db.query(
        'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
        [req.user.id, studentId]
      );
      if (accessCheck.rows.length === 0) {
        return res.status(403).json({ message: 'You do not have access to this student' });
      }
    }

    // Get student info + private notes from teacher_assignments
    const studentInfo = await db.query(
      `SELECT u.id, u.username, u.email, u.avatar_url, u.plan, u.created_at,
              ta.private_notes
       FROM users u
       LEFT JOIN teacher_assignments ta ON ta.student_id = u.id AND ta.teacher_id = $2
       WHERE u.id = $1`,
      [studentId, req.user.id]
    );
    if (studentInfo.rows.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get week completion summary — use confirmed column names from Progress V3
    const weekProgress = await db.query(
      `SELECT 
        week_id,
        COUNT(*) AS stations_completed,
        AVG(score) AS avg_score,
        SUM(CASE WHEN score >= 90 THEN 3 WHEN score >= 80 THEN 2 WHEN score >= 60 THEN 1 ELSE 0 END) AS total_stars,
        MAX(updated_at) AS last_completed
      FROM station_progress
      WHERE user_id = $1
      GROUP BY week_id
      ORDER BY week_id`,
      [studentId]
    );

    // Get station details for ALL weeks (not just current)
    // Deduplicate easy/advanced variants: strip _easy suffix, normalize legacy tab-key aliases,
    // then pick the best (highest) score per (week, base_station_key).
    const allStationDetails = await db.query(
      `SELECT week_id, station_type, score, completed_at
       FROM (
         SELECT
           week_id,
           CASE base_key
             WHEN 'word_match'    THEN 'game_word_match'
             WHEN 'read_explore'  THEN 'skill_reading'
             WHEN 'writing'       THEN 'video_challenge'
             WHEN 'new_words'     THEN 'vocab_mastery'
             WHEN 'grammar'       THEN 'grammar_lab'
             WHEN 'dictation'     THEN 'skill_dictation'
             WHEN 'shadowing'     THEN 'skill_shadowing'
             WHEN 'logic_lab'     THEN 'game_logic'
             WHEN 'mindmap_speaking' THEN 'production_mindmap'
             ELSE base_key
           END AS station_type,
           GREATEST(
             COALESCE(score, 0),
             COALESCE(progress_percent, 0),
             CASE WHEN is_completed THEN 100 ELSE 0 END
           ) AS score,
           updated_at AS completed_at,
           ROW_NUMBER() OVER (
             PARTITION BY week_id, CASE base_key
               WHEN 'word_match'    THEN 'game_word_match'
               WHEN 'read_explore'  THEN 'skill_reading'
               WHEN 'writing'       THEN 'video_challenge'
               WHEN 'new_words'     THEN 'vocab_mastery'
               WHEN 'grammar'       THEN 'grammar_lab'
               WHEN 'dictation'     THEN 'skill_dictation'
               WHEN 'shadowing'     THEN 'skill_shadowing'
               WHEN 'logic_lab'     THEN 'game_logic'
               WHEN 'mindmap_speaking' THEN 'production_mindmap'
               ELSE base_key
             END
             ORDER BY GREATEST(
               COALESCE(score, 0),
               COALESCE(progress_percent, 0),
               CASE WHEN is_completed THEN 100 ELSE 0 END
             ) DESC, updated_at DESC
           ) AS rn
         FROM (
           SELECT *, REGEXP_REPLACE(station_key, '_easy$', '') AS base_key
           FROM station_progress
           WHERE user_id = $1
         ) raw
       ) deduped
       WHERE rn = 1
       ORDER BY week_id DESC, completed_at DESC`,
      [studentId]
    );

    // Group stations by week
    const stationsByWeek = {};
    for (const row of allStationDetails.rows) {
      if (!stationsByWeek[row.week_id]) stationsByWeek[row.week_id] = [];
      stationsByWeek[row.week_id].push(row);
    }

    // currentWeek = last week where student actually has score > 0, fallback to max
    const weeksWithProgress = weekProgress.rows.filter(w => Number(w.total_stars) > 0);
    const currentWeek = weeksWithProgress.length > 0
      ? Math.max(...weeksWithProgress.map(w => w.week_id))
      : (weekProgress.rows.length > 0 ? Math.max(...weekProgress.rows.map(w => w.week_id)) : 1);

    const stationDetails = stationsByWeek[currentWeek] || [];

    const recentActivity = { rows: [] };

    // Compute total_stars by summing per-week values (not from users table, which is stale)
    const totalStars = weekProgress.rows.reduce((sum, w) => sum + Number(w.total_stars || 0), 0);

    // Compute streak: count consecutive days (today backwards) with any station_progress activity
    const streakRes = await db.query(
      `SELECT DISTINCT updated_at::date AS d FROM station_progress
       WHERE user_id = $1 AND score > 0 ORDER BY d DESC LIMIT 30`,
      [studentId]
    );
    const datesSet = new Set(streakRes.rows.map(r => new Date(r.d).toISOString().split('T')[0]));
    let streak = 0;
    for (let i = 0; i < 31; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      if (datesSet.has(ds)) { streak++; }
      else if (i === 0) { /* today not active yet — continue to check yesterday */ }
      else { break; }
    }

    res.json({
      student: { ...studentInfo.rows[0], total_stars: totalStars, streak_days: streak },
      weekProgress: weekProgress.rows,
      currentWeek,
      stationDetails,
      stationsByWeek,
      recentActivity: recentActivity.rows
    });
  } catch (error) {
    console.error('Get student detail error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============================================================================
// MESSAGING
// ============================================================================

/**
 * POST /api/teacher/message
 * Send a message to a student
 * Body: { toUserId, subject?, message }
 */
router.post('/message', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const { toUserId, subject, message } = req.body;

  if (!toUserId || !message) {
    return res.status(400).json({ message: 'toUserId and message are required' });
  }

  try {
    // Verify teacher has access to this student (if role is teacher)
    if (req.user.role === 'teacher') {
      const accessCheck = await db.query(
        'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
        [req.user.id, toUserId]
      );
      if (accessCheck.rows.length === 0) {
        return res.status(403).json({ message: 'You can only message your assigned students' });
      }
    }

    // Insert message
    const result = await db.query(
      `INSERT INTO messages (from_user_id, to_user_id, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, from_user_id, to_user_id, subject, message, created_at`,
      [req.user.id, toUserId, subject || 'Message from Teacher', message]
    );

    res.status(201).json({
      message: 'Message sent successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/messages/inbox
 * Get all messages between teacher and their students (sent + received)
 */
router.get('/messages/inbox', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT 
        m.id,
        m.from_user_id,
        m.to_user_id,
        u_from.username AS from_username,
        u_from.avatar_url AS from_avatar,
        u_to.username AS to_username,
        m.subject,
        m.message,
        m.read,
        m.read_at,
        m.created_at,
        CASE WHEN m.from_user_id = $1 THEN 'sent' ELSE 'received' END AS direction
      FROM messages m
      JOIN users u_from ON m.from_user_id = u_from.id
      JOIN users u_to ON m.to_user_id = u_to.id
      WHERE m.from_user_id = $1 OR m.to_user_id = $1
      ORDER BY m.created_at DESC
      LIMIT 100`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get inbox error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/teacher/messages/:messageId/read
 * Mark a message as read
 */
router.put('/messages/:messageId/read', authMiddleware, async (req, res) => {
  const { messageId } = req.params;

  try {
    const result = await db.query(
      `UPDATE messages 
       SET read = TRUE, read_at = NOW()
       WHERE id = $1 AND to_user_id = $2
       RETURNING id`,
      [messageId, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Message not found or access denied' });
    }

    res.json({ message: 'Message marked as read' });
  } catch (error) {
    console.error('Mark message read error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/messages/unread-count
 * Get count of unread messages
 */
router.get('/messages/unread-count', authMiddleware, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT COUNT(*) as count FROM messages WHERE to_user_id = $1 AND read = FALSE',
      [req.user.id]
    );

    res.json({ count: parseInt(result.rows[0].count) });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============================================================================
// ACTIVITY LOGGING (called from frontend)
// ============================================================================

/**
 * POST /api/teacher/log-activity
 * Log student activity (login, station start, station complete)
 * Body: { activityType, weekId?, stationType?, metadata? }
 */
router.post('/log-activity', authMiddleware, async (req, res) => {
  const { activityType, weekId, stationType, metadata } = req.body;

  if (!activityType) {
    return res.status(400).json({ message: 'activityType is required' });
  }

  try {
    await db.query(
      `INSERT INTO student_activity_log (user_id, activity_type, week_id, station_type, metadata)
       VALUES ($1, $2, $3, $4, $5)`,
      [req.user.id, activityType, weekId || null, stationType || null, metadata || null]
    );

    res.status(201).json({ message: 'Activity logged' });
  } catch (error) {
    console.error('Log activity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============================================================================
// TEACHER TASK ASSIGNMENTS (T1-B)
// ============================================================================

/**
 * POST /api/teacher/task-assignments
 * Create a task assignment for a student (auto-replaces same type).
 * Body: { studentId, type, weekNum?, stationKey?, notes?, deadline? }
 * type: 'week_override' | 'week_lock' | 'station_assign'
 */
router.post('/task-assignments', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { studentId, type, weekNum, stationKey, notes, deadline } = req.body;

  if (!studentId || !type) {
    return res.status(400).json({ message: 'studentId and type are required' });
  }
  const validTypes = ['week_override', 'week_lock', 'station_assign'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ message: 'type must be week_override, week_lock, or station_assign' });
  }

  try {
    if (req.user.role === 'teacher') {
      const access = await db.query(
        'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
        [teacherId, studentId]
      );
      if (access.rowCount === 0) return res.status(403).json({ message: 'Student not in your roster' });
    }

    // Deactivate existing active assignment of same type for this student
    await db.query(
      `UPDATE teacher_task_assignments SET is_active = false
       WHERE teacher_id = $1 AND student_id = $2 AND type = $3 AND is_active = true`,
      [teacherId, studentId, type]
    );

    const result = await db.query(
      `INSERT INTO teacher_task_assignments (teacher_id, student_id, type, week_num, station_key, notes, deadline)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [teacherId, studentId, type, weekNum || null, stationKey || null, notes || null, deadline || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('task-assignment create error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/task-assignments/:studentId
 * Get all active task assignments for a student.
 */
router.get('/task-assignments/:studentId', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { studentId } = req.params;

  try {
    if (req.user.role === 'teacher') {
      const access = await db.query(
        'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
        [teacherId, studentId]
      );
      if (access.rowCount === 0) return res.status(403).json({ message: 'Student not in your roster' });
    }

    const result = await db.query(
      `SELECT * FROM teacher_task_assignments
       WHERE teacher_id = $1 AND student_id = $2 AND is_active = true
       ORDER BY created_at DESC`,
      [teacherId, studentId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('task-assignments fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * DELETE /api/teacher/task-assignments/:id
 * Soft-delete (deactivate) a task assignment.
 */
router.delete('/task-assignments/:id', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { id } = req.params;

  try {
    const result = await db.query(
      `UPDATE teacher_task_assignments SET is_active = false
       WHERE id = $1 AND teacher_id = $2
       RETURNING id`,
      [id, teacherId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Assignment not found or access denied' });
    }

    res.json({ message: 'Assignment removed' });
  } catch (err) {
    console.error('task-assignment delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============================================================================
// SESSION NOTES (T4-A) — per-student, per-week/session teaching notes
// ============================================================================

/**
 * POST /api/teacher/session-notes
 * Save a session note for a student.
 * Body: { studentId, weekNum, sessionNum, note }
 */
router.post('/session-notes', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { studentId, weekNum, sessionNum = 0, note } = req.body;

  if (!studentId || !weekNum || !note || !note.trim()) {
    return res.status(400).json({ message: 'studentId, weekNum, and note are required' });
  }

  try {
    // Verify student is in teacher's roster
    if (req.user.role === 'teacher') {
      const access = await db.query(
        'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
        [teacherId, studentId]
      );
      if (access.rowCount === 0) return res.status(403).json({ message: 'Student not in your roster' });
    }

    const result = await db.query(
      `INSERT INTO teacher_session_notes (teacher_id, student_id, week_num, session_num, note)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [teacherId, studentId, parseInt(weekNum), parseInt(sessionNum), note.trim()]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('session-notes save error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/session-notes/:studentId
 * Fetch all session notes for a student (newest first, max 50).
 */
router.get('/session-notes/:studentId', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { studentId } = req.params;

  try {
    if (req.user.role === 'teacher') {
      const access = await db.query(
        'SELECT id FROM teacher_assignments WHERE teacher_id = $1 AND student_id = $2',
        [teacherId, studentId]
      );
      if (access.rowCount === 0) return res.status(403).json({ message: 'Student not in your roster' });
    }

    const result = await db.query(
      `SELECT id, week_num, session_num, note, created_at
       FROM teacher_session_notes
       WHERE teacher_id = $1 AND student_id = $2
       ORDER BY created_at DESC
       LIMIT 50`,
      [teacherId, studentId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error('session-notes fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ============================================================================
// CLASS SETTINGS (T4-B) — class_start_date for Content Pack unlock logic
// ============================================================================

/**
 * GET /api/teacher/class-settings
 * Returns the teacher's class_start_date.
 */
router.get('/class-settings', [authMiddleware, teacherOrAdmin], async (req, res) => {
  try {
    const result = await db.query(
      'SELECT class_start_date FROM users WHERE id = $1',
      [req.user.id]
    );
    const row = result.rows[0] || {};
    res.json({ class_start_date: row.class_start_date || null });
  } catch (err) {
    console.error('class-settings get error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * PUT /api/teacher/class-settings
 * Save the teacher's class_start_date.
 * Body: { class_start_date: "YYYY-MM-DD" }
 */
router.put('/class-settings', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const { class_start_date } = req.body;

  if (!class_start_date || !/^\d{4}-\d{2}-\d{2}$/.test(class_start_date)) {
    return res.status(400).json({ message: 'class_start_date must be YYYY-MM-DD' });
  }

  try {
    // Self-healing: ensure column exists before writing (handles cases where migration hasn't run)
    await db.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS class_start_date DATE`);
    await db.query(
      'UPDATE users SET class_start_date = $1 WHERE id = $2',
      [class_start_date, req.user.id]
    );
    res.json({ class_start_date });
  } catch (err) {
    console.error('class-settings put error:', err);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ============================================================================
// LESSON FILE SERVING (authenticated, week-window enforced)
// ============================================================================

/**
 * GET /api/teacher/lesson/:weekNum
 * Returns the lesson JSON for the given week number.
 * Enforces: teacher can only view weeks within class_start_date window ± 2 weeks.
 * If no class_start_date is set, all weeks are accessible (fallback).
 */
router.get('/lesson/:weekNum', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const weekNum = parseInt(req.params.weekNum, 10);
  if (isNaN(weekNum) || weekNum < 1 || weekNum > 999) {
    return res.status(400).json({ message: 'Invalid week number' });
  }

  try {
    // Query settings; plan_months may not exist on older DB schemas — fall back gracefully
    let settingsRow = {};
    try {
      const settingsRes = await db.query(
        'SELECT class_start_date, role, plan, plan_expires_at, plan_months FROM users WHERE id = $1',
        [req.user.id]
      );
      settingsRow = settingsRes.rows[0] || {};
    } catch (_colErr) {
      // plan_months column not yet added — query without it
      const settingsRes = await db.query(
        'SELECT class_start_date, role, plan, plan_expires_at FROM users WHERE id = $1',
        [req.user.id]
      );
      settingsRow = settingsRes.rows[0] || {};
    }
    const { class_start_date: classStartDate, role, plan, plan_expires_at: planExpiresAt, plan_months: planMonthsRaw } = settingsRow;

    // Only admin & super_admin have unrestricted access to all lesson weeks
    const isUnrestricted = ['admin', 'super_admin'].includes(role);

    if (!isUnrestricted) {
      // First content week in our dataset (W25)
      const FIRST_WEEK = 25;
      // Weeks available as free trial when no active plan
      const FREE_TRIAL_WEEKS = 2;
      const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

      let maxAllowed;
      const now = new Date();

      if (planExpiresAt && new Date(planExpiresAt) > now) {
        // Active paid plan — compute accessible weeks from plan duration
        let planWeeks;
        if (planMonthsRaw != null) {
          // plan_months explicitly set (preferred)
          planWeeks = Math.floor(Number(planMonthsRaw) * 4.33);
        } else if (classStartDate) {
          // Fallback: compute weeks from class_start_date → plan_expires_at span
          planWeeks = Math.max(0, Math.floor((new Date(planExpiresAt) - new Date(classStartDate)) / MS_PER_WEEK));
        } else {
          // plan_months not set yet and no class_start_date: derive from remaining subscription time
          // This handles legacy accounts activated before plan_months column was added
          const remainingMs = new Date(planExpiresAt) - now;
          planWeeks = Math.max(1, Math.floor(remainingMs / MS_PER_WEEK));
        }
        maxAllowed = FIRST_WEEK + Math.min(planWeeks, 999) - 1;
      } else {
        // No active plan / expired: free trial access (FIRST_WEEK to FIRST_WEEK+FREE_TRIAL_WEEKS-1)
        maxAllowed = FIRST_WEEK + FREE_TRIAL_WEEKS - 1;
      }

      if (weekNum > maxAllowed) {
        return res.status(403).json({
          message: `Tuần ${weekNum} nằm ngoài gói đăng ký. Gói hiện tại cho phép xem đến tuần W${maxAllowed}.`,
          maxAllowed,
          plan: plan || 'free',
        });
      }
    }

    const result = await db.query('SELECT content FROM public.lesson_plans WHERE week_num = $1', [weekNum]);
    if (!result.rows.length) {
      return res.status(404).json({ message: `Lesson data for week ${weekNum} not found` });
    }
    res.json(result.rows[0].content);
  } catch (err) {
    console.error('lesson fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * GET /api/teacher/lessons-index
 * Returns the lessons index JSON (week → unit_theme map).
 * Authenticated teachers only.
 */
router.get('/lessons-index', [authMiddleware, teacherOrAdmin], async (req, res) => {
  try {
    const result = await db.query('SELECT week_num, unit_theme FROM public.lesson_plans_index ORDER BY week_num');
    const data = {};
    for (const row of result.rows) {
      data[row.week_num] = { week: row.week_num, unit_theme: row.unit_theme };
    }
    res.json(data);
  } catch (err) {
    console.error('lessons-index error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * DELETE /api/teacher/session-notes/:id
 * Delete a session note by id.
 */
router.delete('/session-notes/:id', [authMiddleware, teacherOrAdmin], async (req, res) => {
  const teacherId = req.user.id;
  const { id } = req.params;

  try {
    const result = await db.query(
      `DELETE FROM teacher_session_notes
       WHERE id = $1 AND teacher_id = $2
       RETURNING id`,
      [id, teacherId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Note not found or access denied' });
    }

    res.json({ message: 'Note deleted' });
  } catch (err) {
    console.error('session-note delete error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
