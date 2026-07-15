/* eslint-env node */
const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Plan hierarchy for access control
const PLAN_FREE_WEEKS = 4;   // free_trial: W1-W4 (14 days)
const PLAN_GUEST_WEEKS = 3;  // guest: W1-3

// B2B plan → seat count
const B2B_PLANS = {
  teacher_5: 5,
  teacher_10: 10,
  teacher_20: 20,
  center_50: 50,
};

function isExpired(dateStr) {
  if (!dateStr) return true;
  return new Date(dateStr) < new Date();
}

function isPaidPlan(plan) {
  return ['student', 'teacher_5', 'teacher_10', 'teacher_20', 'center_50', 'premium'].includes(plan);
}

// GET /api/subscription/status
// Returns effective plan access for the current user (handles B2B inheritance from teacher)
router.get('/status', authMiddleware, async (req, res) => {
  try {
    const userRes = await db.query(
      'SELECT id, username, role, plan, trial_expires_at, plan_expires_at, seats_total FROM users WHERE id = $1',
      [req.user.id]
    );
    if (userRes.rowCount === 0) return res.status(404).json({ message: 'User not found' });

    const user = userRes.rows[0];

    // ── OWNER / SUPER_ADMIN → always unlimited ──
    if (user.role === 'super_admin' || user.role === 'admin') {
      return res.json({
        plan: user.plan,
        effective_plan: 'unlimited',
        full_access: true,
        max_week: 999,
        ai_unlimited: true,
        can_print: true,
        seats_total: user.seats_total || 0,
        seats_used: 0,
        trial_expires_at: null,
        plan_expires_at: null,
        days_left: null,
      });
    }

    // ── Check own active paid plan ──
    if (isPaidPlan(user.plan) && !isExpired(user.plan_expires_at)) {
      const seatsUsed = B2B_PLANS[user.plan]
        ? (await db.query(
            'SELECT COUNT(*) FROM teacher_assignments WHERE teacher_id = $1', [user.id]
          )).rows[0].count
        : 0;

      const daysLeft = user.plan_expires_at
        ? Math.ceil((new Date(user.plan_expires_at) - new Date()) / (1000 * 60 * 60 * 24))
        : null;

      return res.json({
        plan: user.plan,
        effective_plan: user.plan,
        full_access: true,
        max_week: 999,
        ai_unlimited: true,
        can_print: true,
        seats_total: user.seats_total || B2B_PLANS[user.plan] || 0,
        seats_used: parseInt(seatsUsed),
        trial_expires_at: user.trial_expires_at,
        plan_expires_at: user.plan_expires_at,
        days_left: daysLeft,
      });
    }

    // ── Check if sponsored by an active teacher (B2B) ──
    const teacherRes = await db.query(`
      SELECT u.plan, u.plan_expires_at
      FROM teacher_assignments ta
      JOIN users u ON u.id = ta.teacher_id
      WHERE ta.student_id = $1
        AND u.plan IN ('teacher_5','teacher_10','teacher_20','center_50')
        AND (u.plan_expires_at IS NULL OR u.plan_expires_at > NOW())
      LIMIT 1
    `, [user.id]);

    if (teacherRes.rowCount > 0) {
      const teacher = teacherRes.rows[0];
      const daysLeft = teacher.plan_expires_at
        ? Math.ceil((new Date(teacher.plan_expires_at) - new Date()) / (1000 * 60 * 60 * 24))
        : null;
      return res.json({
        plan: user.plan,
        effective_plan: 'student_sponsored',
        full_access: true,
        max_week: 999,
        ai_unlimited: true,
        can_print: true,
        seats_total: 0,
        seats_used: 0,
        trial_expires_at: user.trial_expires_at,
        plan_expires_at: teacher.plan_expires_at,
        days_left: daysLeft,
        sponsored_by_teacher: true,
      });
    }

    // ── Check active free trial ──
    if (!isExpired(user.trial_expires_at)) {
      const daysLeft = Math.ceil((new Date(user.trial_expires_at) - new Date()) / (1000 * 60 * 60 * 24));
      return res.json({
        plan: 'free_trial',
        effective_plan: 'free_trial',
        full_access: false,
        max_week: PLAN_FREE_WEEKS,
        ai_unlimited: false,
        ai_daily_limit: 5,
        can_print: false,
        seats_total: 0,
        seats_used: 0,
        trial_expires_at: user.trial_expires_at,
        plan_expires_at: null,
        days_left: daysLeft,
      });
    }

    // ── Expired / no plan ──
    return res.json({
      plan: user.plan || 'expired',
      effective_plan: 'expired',
      full_access: false,
      max_week: PLAN_GUEST_WEEKS,
      ai_unlimited: false,
      ai_daily_limit: 0,
      can_print: false,
      seats_total: 0,
      seats_used: 0,
      trial_expires_at: user.trial_expires_at,
      plan_expires_at: null,
      days_left: 0,
    });
  } catch (error) {
    console.error('Subscription status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/subscription/teacher-students
// B2B: teacher sees their assigned students and occupancy
router.get('/teacher-students', authMiddleware, async (req, res) => {
  try {
    const teacherRes = await db.query(
      'SELECT plan, plan_expires_at, seats_total FROM users WHERE id = $1', [req.user.id]
    );
    if (teacherRes.rowCount === 0) return res.status(404).json({ message: 'Not found' });

    const teacher = teacherRes.rows[0];
    if (!B2B_PLANS[teacher.plan] && teacher.seats_total === 0) {
      return res.status(403).json({ message: 'No B2B plan active' });
    }

    const studentsRes = await db.query(`
      SELECT u.id, u.username, u.email, u.plan, ta.assigned_at, ta.notes
      FROM teacher_assignments ta
      JOIN users u ON u.id = ta.student_id
      WHERE ta.teacher_id = $1
      ORDER BY ta.assigned_at DESC
    `, [req.user.id]);

    res.json({
      seats_total: teacher.seats_total || B2B_PLANS[teacher.plan] || 0,
      seats_used: studentsRes.rowCount,
      plan_expires_at: teacher.plan_expires_at,
      students: studentsRes.rows,
    });
  } catch (error) {
    console.error('Teacher students error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
