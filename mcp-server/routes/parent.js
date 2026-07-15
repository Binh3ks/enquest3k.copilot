/* eslint-env node */
// routes/parent.js
// Parent self-service: create/manage child accounts (sibling=2, family=4)
// Max seats come from seats_total in DB — set at plan activation, no hardcoded limit.

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware: only 'parent' role may call these endpoints
function parentOnly(req, res, next) {
  if (req.user.role !== 'parent') {
    return res.status(403).json({ message: 'Chỉ tài khoản Parent mới có thể dùng API này.' });
  }
  next();
}

// ── GET /api/parent/children ────────────────────────────────────────────────
// List all child accounts created by this parent
router.get('/children', [authMiddleware, parentOnly], async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, username, email, plan, plan_expires_at, created_at
       FROM users
       WHERE parent_id = $1
       ORDER BY created_at ASC`,
      [req.user.id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('parent/children GET error:', err);
    res.status(500).json({ message: 'Lỗi server.' });
  }
});

// ── POST /api/parent/children ───────────────────────────────────────────────
// Create a child account — limit enforced by seats_total from DB (sibling=2, family=4)
router.post('/children', [authMiddleware, parentOnly], async (req, res) => {
  const { username, password, display_name } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Cần có tên đăng nhập và mật khẩu.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu phải có ít nhất 6 ký tự.' });
  }

  try {
    // Count existing children vs seats_total from DB (sibling=2, family=4, etc.)
    const countRes = await db.query(
      'SELECT COUNT(*) FROM users WHERE parent_id = $1',
      [req.user.id]
    );
    const parentSeatRes = await db.query(
      'SELECT seats_total, plan FROM users WHERE id = $1',
      [req.user.id]
    );
    const maxSeats = parentSeatRes.rows[0]?.seats_total || 2; // default 2 if not set
    if (parseInt(countRes.rows[0].count) >= maxSeats) {
      return res.status(400).json({ message: `Đã đạt tối đa ${maxSeats} tài khoản con cho gói ${parentSeatRes.rows[0]?.plan || 'gia đình'}.` });
    }

    // Fetch parent's current plan & expiry to inherit
    const parentRes = await db.query(
      'SELECT plan, plan_expires_at FROM users WHERE id = $1',
      [req.user.id]
    );
    const parent = parentRes.rows[0];
    if (!parent) return res.status(404).json({ message: 'Không tìm thấy tài khoản parent.' });

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const childEmail = `${username}@family.${req.user.username}.engquest`;
    const childDisplayName = display_name || username;

    const result = await db.query(
      `INSERT INTO users (username, email, password_hash, role, plan, plan_expires_at, parent_id, avatar_url)
       VALUES ($1, $2, $3, 'student', $4, $5, $6, $7)
       RETURNING id, username, email, role, plan, plan_expires_at, parent_id, created_at`,
      [childDisplayName, childEmail, password_hash, parent.plan, parent.plan_expires_at, req.user.id, null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ message: 'Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.' });
    }
    console.error('parent/children POST error:', err);
    res.status(500).json({ message: 'Lỗi server khi tạo tài khoản con.' });
  }
});

// ── PATCH /api/parent/children/:childUsername/password ─────────────────────
// Reset child's password
router.patch('/children/:childUsername/password', [authMiddleware, parentOnly], async (req, res) => {
  const { childUsername } = req.params;
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ message: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
  }
  try {
    // Verify this child belongs to this parent
    const childRes = await db.query(
      'SELECT id FROM users WHERE username = $1 AND parent_id = $2',
      [childUsername, req.user.id]
    );
    if (!childRes.rows.length) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản con.' });
    }
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    await db.query('UPDATE users SET password_hash = $1 WHERE id = $2', [password_hash, childRes.rows[0].id]);
    res.json({ message: 'Đã cập nhật mật khẩu.' });
  } catch (err) {
    console.error('parent/children PATCH password error:', err);
    res.status(500).json({ message: 'Lỗi server.' });
  }
});

// ── DELETE /api/parent/children/:childUsername ──────────────────────────────
// Remove a child account (hard delete)
router.delete('/children/:childUsername', [authMiddleware, parentOnly], async (req, res) => {
  const { childUsername } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM users WHERE username = $1 AND parent_id = $2 RETURNING id',
      [childUsername, req.user.id]
    );
    if (!result.rows.length) {
      return res.status(404).json({ message: 'Không tìm thấy tài khoản con.' });
    }
    res.json({ message: 'Đã xóa tài khoản con.' });
  } catch (err) {
    console.error('parent/children DELETE error:', err);
    res.status(500).json({ message: 'Lỗi server.' });
  }
});

// ── POST /api/parent/sync-children ─────────────────────────────────────────
// Sync all children's plan_expires_at to match parent's (call after plan renewal)
router.post('/sync-children', [authMiddleware, parentOnly], async (req, res) => {
  try {
    const parentRes = await db.query(
      'SELECT plan, plan_expires_at FROM users WHERE id = $1',
      [req.user.id]
    );
    const parent = parentRes.rows[0];
    if (!parent) return res.status(404).json({ message: 'Không tìm thấy tài khoản parent.' });

    const updated = await db.query(
      `UPDATE users SET plan = $1, plan_expires_at = $2
       WHERE parent_id = $3
       RETURNING id, username`,
      [parent.plan, parent.plan_expires_at, req.user.id]
    );
    res.json({ message: `Đã đồng bộ ${updated.rows.length} tài khoản con.`, children: updated.rows });
  } catch (err) {
    console.error('parent/sync-children error:', err);
    res.status(500).json({ message: 'Lỗi server.' });
  }
});

module.exports = router;
