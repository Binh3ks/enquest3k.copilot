/* eslint-env node */
const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const { sendPushToAdmins } = require('../utils/pushNotify');

const router = express.Router();

function adminOnly(req, res, next) {
  if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
}

// Seat count per plan (mirrors SubscriptionManager.js)
const SEAT_MAP = {
  student: 0, sibling: 2, family: 4,
  teacher_starter: 5, teacher_pro: 20, team: 60, center: 200,
  premium: 0, premium_lifetime: 0,
};

// Default role when a plan is activated
const PLAN_TO_ROLE = {
  student: 'student',
  sibling: 'parent',
  family: 'parent',
  teacher_starter: 'teacher',
  teacher_pro: 'teacher',
  team: 'team_leader',
  center: 'center_director',
};

const VALID_PLANS = Object.keys(SEAT_MAP);

// ─── POST /api/payment/request ────────────────────────────────────────────────
// Authenticated user submits a payment confirmation after bank transfer.
// Creates a DB record in payment_requests (status = 'pending').
// SuperAdmin sees it in the Billing tab and approves with one click.
router.post('/request', authMiddleware, async (req, res) => {
  try {
    const { plan, amount, billing_months = 1, extra_seats = 0, notes } = req.body;
    if (!plan || !amount) return res.status(400).json({ message: 'Missing plan or amount' });
    if (!VALID_PLANS.includes(plan)) return res.status(400).json({ message: 'Invalid plan' });
    if (typeof amount !== 'number' || amount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const result = await db.query(
      `INSERT INTO payment_requests (username, plan, amount, billing_months, extra_seats, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending') RETURNING *`,
      [req.user.username, plan, amount, billing_months, extra_seats, notes || null]
    );

    // Fire push notification to admins (non-fatal)
    sendPushToAdmins({
      title: '💰 Thanh toán mới — EngQuest',
      body: `${req.user.username} đã xác nhận chuyển khoản gói ${plan} — ${amount.toLocaleString('vi-VN')}đ`,
      url: '/?admin=1',
      tag: 'payment-request',
    }).catch(() => {});

    res.json({ message: 'Payment request received', request: result.rows[0] });
  } catch (err) {
    console.error('Payment request error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── GET /api/payment/requests ─────────────────────────────────────────────────
// Admin reads all payment requests from DB (most recent first).
router.get('/requests', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const result = await db.query(
      `SELECT * FROM payment_requests ORDER BY created_at DESC LIMIT 100`
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Get payment requests error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── POST /api/payment/approve/:id ────────────────────────────────────────────
// Admin approves → auto-activates plan, updates role, cascades to children (family).
router.post('/approve/:id', [authMiddleware, adminOnly], async (req, res) => {
  const { id } = req.params;
  const { months } = req.body; // optional override

  try {
    const reqResult = await db.query('SELECT * FROM payment_requests WHERE id = $1', [id]);
    if (reqResult.rowCount === 0) return res.status(404).json({ message: 'Request not found' });

    const pr = reqResult.rows[0];
    if (pr.status === 'approved') return res.status(400).json({ message: 'Already approved' });

    const billingMonths = months || pr.billing_months || 1;
    const seats = (SEAT_MAP[pr.plan] ?? 0) + (pr.extra_seats || 0);
    const role = PLAN_TO_ROLE[pr.plan] || null;

    // billing_months=9 means "buy 9, get 3 free" → 12 calendar months coverage
    const calendarMonths = billingMonths === 9 ? 12 : billingMonths;
    const expiry = new Date();
    expiry.setMonth(expiry.getMonth() + calendarMonths);

    // Activate plan on user
    await db.query(
      `UPDATE users SET plan = $1, plan_expires_at = $2, seats_total = $3 WHERE username = $4`,
      [pr.plan, expiry.toISOString(), seats, pr.username]
    );

    // Best-effort: save plan_months so lesson restriction works correctly
    try {
      await db.query(`UPDATE users SET plan_months = $1 WHERE username = $2`, [calendarMonths, pr.username]);
    } catch (_) { /* column may not exist on older schema — safe to ignore */ }

    // Promote role if applicable (never demote admin/super_admin)
    if (role) {
      await db.query(
        `UPDATE users SET role = $1 WHERE username = $2 AND role NOT IN ('super_admin', 'admin')`,
        [role, pr.username]
      );
    }

    // Mark request as approved
    await db.query(
      `UPDATE payment_requests SET status = 'approved', approved_at = NOW(), approved_by = $1 WHERE id = $2`,
      [req.user.username, id]
    );

    // Family/sibling plan: cascade plan + expiry to child accounts
    if (pr.plan === 'family' || pr.plan === 'sibling') {
      const parentRes = await db.query('SELECT id FROM users WHERE username = $1', [pr.username]);
      if (parentRes.rowCount > 0) {
        await db.query(
          `UPDATE users SET plan = $1, plan_expires_at = $2 WHERE parent_id = $3`,
          [pr.plan, expiry.toISOString(), parentRes.rows[0].id]
        );
      }
    }

    res.json({
      message: `✅ Plan '${pr.plan}' activated for '${pr.username}' until ${expiry.toDateString()}`,
    });
  } catch (err) {
    console.error('Approve payment error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ─── POST /api/payment/reject/:id ────────────────────────────────────────────
// Admin rejects a payment request (marks as rejected, no plan change).
router.post('/reject/:id', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const result = await db.query(
      `UPDATE payment_requests SET status = 'rejected', approved_by = $1 WHERE id = $2 RETURNING id`,
      [req.user.username, req.params.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Request rejected' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
