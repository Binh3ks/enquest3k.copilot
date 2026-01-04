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

// GET /api/admin/students
// Fetch all students and their aggregated progress
router.get('/students', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'super_admin' && req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Access denied.' });
  }

  try {
    const studentsResult = await db.query(`
      SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.avatar_url,
        COALESCE(MAX(sp.week_id), 1) as last_week,
        0 as stars -- Placeholder for stars logic
      FROM users u
      LEFT JOIN station_progress sp ON u.id = sp.user_id
      WHERE u.role = 'student'
      GROUP BY u.id
      ORDER BY last_week DESC
    `);
    
    res.json(studentsResult.rows);
  } catch (error) {
    console.error('Fetch students error:', error);
    res.status(500).json({ message: 'Server error fetching students.' });
  }
});

// GET /api/admin/users
// Get all users
router.get('/users', [authMiddleware, adminOnly], async (req, res) => {
  try {
    const result = await db.query('SELECT id, username, email, role, plan, avatar_url, created_at FROM users ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/admin/users
// Create a new user (admin version)
router.post('/users', [authMiddleware, adminOnly], async (req, res) => {
  const { username, password, role, plan, email } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const userEmail = email || `${username}@engquest.com`;

    const result = await db.query(
      'INSERT INTO users (username, password_hash, role, plan, email) VALUES ($1, $2, $3, $4, $5) RETURNING id, username, role, plan',
      [username, password_hash, role || 'student', plan || 'free', userEmail]
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

module.exports = router;
