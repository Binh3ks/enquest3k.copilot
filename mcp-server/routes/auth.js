/* eslint-env node */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dlvjqdyvatceidzeyfnq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_z9iUKGkbsXC4IkHgpD7tng_thmSuMGP';

/**
 * Verifies a Supabase JWT by calling the Supabase Auth /user endpoint.
 * This validates the token server-side without needing JWKS.
 */
async function verifySupabaseToken(token) {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'apikey': SUPABASE_ANON_KEY,
    },
  });
  if (!res.ok) {
    throw new Error('Invalid Supabase token');
  }
  return await res.json();
}

const router = express.Router();
const auth = require('../middleware/authMiddleware');

// GET /api/auth/me
// Returns the current user's data based on the JWT.
// Supports both Railway JWT (by id) and Supabase JWT (by supabase_uid).
router.get('/me', auth, async (req, res) => {
  try {
    let userResult;
    if (req.tokenType === 'supabase' && req.user.supabase_uid) {
      // Supabase: find by supabase_uid or create profile
      userResult = await db.query(
        'SELECT id, username, email, role, plan, trial_expires_at, plan_expires_at, seats_total, avatar_url, display_name, created_at FROM public.users WHERE supabase_uid = $1',
        [req.user.supabase_uid]
      );
      // Auto-create profile if first login
      if (userResult.rows.length === 0) {
        userResult = await db.query(
          `INSERT INTO public.users (supabase_uid, username, email, role, plan, trial_expires_at)
           VALUES ($1, $2, $3, 'student', 'free_trial', NOW() + INTERVAL '14 days')
           RETURNING id, username, email, role, plan, trial_expires_at, plan_expires_at, seats_total, avatar_url, display_name, created_at`,
          [req.user.supabase_uid, req.user.email || 'user_' + req.user.supabase_uid, req.user.email || '']
        );
      }
    } else {
      // Railway: find by id
      userResult = await db.query(
        'SELECT id, username, email, role, plan, trial_expires_at, plan_expires_at, seats_total, avatar_url, display_name, created_at FROM public.users WHERE id = $1',
        [req.user.id]
      );
    }
    const user = userResult.rows[0];
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Fetch user error:', error);
    res.status(500).json({ message: 'Server error fetching user data.' });
  }
});

// PUT /api/auth/profile
// Updates the current user's profile (display_name and avatar).
router.put('/profile', auth, async (req, res) => {
  const { avatar_url, display_name } = req.body;

  try {
    const updateResult = await db.query(
      'UPDATE public.users SET avatar_url = COALESCE($1, avatar_url), display_name = COALESCE($2, display_name) WHERE id = $3 RETURNING id, username, email, role, plan, trial_expires_at, plan_expires_at, seats_total, avatar_url, display_name, created_at',
      [avatar_url, display_name || null, req.user.id]
    );

    res.json({
      message: 'Profile updated successfully!',
      user: updateResult.rows[0],
    });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Username already exists.' });
    }
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error updating profile.' });
  }
});

// POST /api/auth/register
// Handles new user registration.
router.post('/register', async (req, res) => {
  const { username, email, password, avatar_url, display_name } = req.body;

  // Basic validation — email required for payment confirmation
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'Vui lòng nhập username, email và mật khẩu.' });
  }

  const usernameValue = username.trim();
  const realEmailValue = email.trim().toLowerCase();
  const usernameEmail = `${usernameValue}@engquest.com`; // Auto-generated username email

  try {
    // Hash the password for security
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Insert the new user with 14-day free trial
    // - email: username@engquest.com (auto-generated)
    // - real_email: actual parent email for password reset and billing
    const trialExpiry = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const newUser = await db.query(
      `INSERT INTO public.users (username, email, real_email, password_hash, avatar_url, plan, trial_expires_at, display_name)
       VALUES ($1, $2, $3, $4, $5, 'free_trial', $6, $7)
       RETURNING id, username, email, real_email, role, plan, trial_expires_at, avatar_url, display_name, created_at`,
      [usernameValue, usernameEmail, realEmailValue, password_hash, avatar_url || null, trialExpiry, display_name || null]
    );

    res.status(201).json({
      message: 'User registered successfully!',
      user: newUser.rows[0],
    });
  } catch (error) {
    if (error.code === '23505') {
      // Check which unique constraint fired
      if (error.constraint && error.constraint.includes('real_email') && realEmailValue) {
        return res.status(409).json({ message: 'Email này đã được dùng. Vui lòng chọn email khác.' });
      }
      return res.status(409).json({ message: 'Username đã tồn tại. Vui lòng chọn tên khác.' });
    }
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration.' });
  }
});

// POST /api/auth/login
// Handles user login and token generation.
// Supports two modes:
// 1. Railway auth: { username, password } — validates against password_hash
// 2. Supabase auth: { supabase_uid, supabase_token } — validates Supabase JWT
router.post('/login', async (req, res) => {
  const { username, password, supabase_uid, supabase_token } = req.body;

  // Mode 1: Supabase OAuth login (no password hash in Railway DB)
  if (supabase_uid && supabase_token) {
    // Verify the Supabase token via Supabase Auth API
    let supabaseUser;
    try {
      supabaseUser = await verifySupabaseToken(supabase_token);
    } catch (e) {
      console.error('Supabase token verify failed:', e.message);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (supabaseUser.id !== supabase_uid) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Look up or create user by supabase_uid
    let user;
    try {
      const userResult = await db.query('SELECT * FROM public.users WHERE supabase_uid = $1', [supabase_uid]);
      user = userResult.rows[0];
    } catch (e) {
      console.error('DB query for supabase_uid failed:', e.message);
      // If column doesn't exist, try to add it
      try {
        await db.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS supabase_uid UUID');
        const userResult = await db.query('SELECT * FROM public.users WHERE supabase_uid = $1', [supabase_uid]);
        user = userResult.rows[0];
      } catch (e2) {
        console.error('Fallback DB query also failed:', e2.message);
        return res.status(500).json({ message: 'Database error: ' + e2.message });
      }
    }

    if (!user) {
      // Auto-create profile for new Supabase user
      try {
        const usernameValue = `user_${supabase_uid.substring(0, 8)}`;
        const emailValue = (supabaseUser.email || '').toLowerCase().trim();
        const userResult = await db.query(
          `INSERT INTO public.users (supabase_uid, username, email, password_hash, role, plan, trial_expires_at)
           VALUES ($1, $2, $3, 'supabase-oauth', 'student', 'free_trial', NOW() + INTERVAL '14 days')
           RETURNING *`,
          [supabase_uid, usernameValue, emailValue]
        );
        user = userResult.rows[0];
      } catch (e) {
        console.error('Auto-create user failed:', e.message);
        return res.status(500).json({ message: 'Database error creating user: ' + e.message });
      }
    }

    // Generate Railway JWT for backend operations
    try {
      const payload = { user: { id: user.id, role: user.role } };
      jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
        if (err) {
          console.error('JWT sign failed:', err.message);
          return res.status(500).json({ message: 'Server error during login.' });
        }
        res.json({
          message: 'Login successful!',
          token: token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            plan: user.plan || 'free_trial',
            trial_expires_at: user.trial_expires_at || null,
            plan_expires_at: user.plan_expires_at || null,
            plan_months: user.plan_months || null,
            seats_total: user.seats_total || 0,
            avatar_url: user.avatar_url
          }
        });
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login.' });
    }
    return;
  }

  // Mode 2: Railway auth (username + password)
  if (!username || !password) {
    return res.status(400).json({ message: 'Please provide username and password.' });
  }

  try {
    const userResult = await db.query('SELECT * FROM public.users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.json({
        message: 'Login successful!',
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          plan: user.plan || 'free_trial',
          trial_expires_at: user.trial_expires_at || null,
          plan_expires_at: user.plan_expires_at || null,
          plan_months: user.plan_months || null,
          seats_total: user.seats_total || 0,
          avatar_url: user.avatar_url
        }
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// PUT /api/auth/change-password
// Allows user to change their own password
router.put('/change-password', auth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide current and new password.' });
  }

  try {
    // Get current user
    const userResult = await db.query('SELECT * FROM public.users WHERE id = $1', [req.user.id]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect.' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const newPasswordHash = await bcrypt.hash(newPassword, salt);

    // Update password
    const updateResult = await db.query(
      'UPDATE public.users SET password_hash = $1 WHERE id = $2 RETURNING id, username, email, role',
      [newPasswordHash, req.user.id]
    );

    res.json({
      message: 'Password changed successfully!',
      user: updateResult.rows[0],
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error changing password.' });
  }
});

module.exports = router;
