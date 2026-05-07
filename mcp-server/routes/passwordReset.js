/* eslint-env node */
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const crypto = require('crypto');
const { sendPasswordResetOTP } = require('../services/emailService');

const router = express.Router();

// Utility: Generate 6-digit OTP
function generateOTP() {
  return crypto.randomInt(100000, 999999).toString();
}

// POST /api/password-reset/request
// Request password reset - sends OTP to user's email
router.post('/request', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  try {
    // Find user by email
    console.log(`🔍 [Password Reset] Request for email: ${email}`);
    const userResult = await db.query(
      'SELECT id, username, email FROM users WHERE email = $1',
      [email]
    );

    if (userResult.rows.length === 0) {
      console.log(`⚠️  [Password Reset] Email not found: ${email}`);
      // Security: Don't reveal if email exists
      return res.json({ message: 'If your email is registered, you will receive an OTP shortly.' });
    }

    const user = userResult.rows[0];
    console.log(`✅ [Password Reset] User found - ID: ${user.id}, Email: ${user.email}`);
    
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store OTP in database
    await db.query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at) 
       VALUES ($1, $2, $3)`,
      [user.id, otp, expiresAt]
    );

    // Send OTP email
    console.log(`📧 [Password Reset] Sending OTP to: ${user.email}`);
    await sendPasswordResetOTP(user.email, otp);

    res.json({ 
      message: 'If your email is registered, you will receive an OTP shortly.',
      // FOR TESTING ONLY - REMOVE IN PRODUCTION
      _dev_otp: process.env.NODE_ENV === 'development' ? otp : undefined
    });

  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ message: 'Server error processing password reset.' });
  }
});

// POST /api/password-reset/verify
// Verify OTP token
router.post('/verify', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  try {
    const result = await db.query(
      `SELECT prt.id, prt.user_id, prt.expires_at, prt.used, u.email
       FROM password_reset_tokens prt
       JOIN users u ON u.id = prt.user_id
       WHERE u.email = $1 AND prt.token = $2
       ORDER BY prt.created_at DESC
       LIMIT 1`,
      [email, otp]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    const token = result.rows[0];

    if (token.used) {
      return res.status(400).json({ message: 'OTP has already been used.' });
    }

    if (new Date() > new Date(token.expires_at)) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    res.json({ 
      message: 'OTP verified successfully.',
      resetToken: token.id // Frontend needs this for the reset step
    });

  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ message: 'Server error verifying OTP.' });
  }
});

// POST /api/password-reset/reset
// Reset password with valid OTP
router.post('/reset', async (req, res) => {
  const { resetToken, newPassword } = req.body;

  if (!resetToken || !newPassword) {
    return res.status(400).json({ message: 'Reset token and new password are required.' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  try {
    // Get token details
    const tokenResult = await db.query(
      `SELECT id, user_id, expires_at, used 
       FROM password_reset_tokens 
       WHERE id = $1`,
      [resetToken]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid reset token.' });
    }

    const token = tokenResult.rows[0];

    if (token.used) {
      return res.status(400).json({ message: 'Reset token has already been used.' });
    }

    if (new Date() > new Date(token.expires_at)) {
      return res.status(400).json({ message: 'Reset token has expired.' });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update user password
    await db.query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [hashedPassword, token.user_id]
    );

    // Mark token as used
    await db.query(
      'UPDATE password_reset_tokens SET used = TRUE WHERE id = $1',
      [token.id]
    );

    res.json({ message: 'Password reset successfully!' });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Server error resetting password.' });
  }
});

module.exports = router;
