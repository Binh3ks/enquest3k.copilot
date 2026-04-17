/* eslint-env node */
const express = require('express');
const db = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');
const { VAPID_PUBLIC } = require('../utils/pushNotify');

const router = express.Router();

function adminOnly(req, res, next) {
  if (req.user.role !== 'super_admin' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin only' });
  }
  next();
}

// GET /api/push/vapid-public-key — public, returns the VAPID public key for frontend subscription
router.get('/vapid-public-key', (req, res) => {
  res.json({ publicKey: VAPID_PUBLIC });
});

// POST /api/push/subscribe — authenticated user (admin or parent); stores push subscription
router.post('/subscribe', authMiddleware, async (req, res) => {
  try {
    const { subscription } = req.body;
    if (!subscription?.endpoint) return res.status(400).json({ message: 'Invalid subscription object' });

    await db.query(
      `INSERT INTO push_subscriptions (username, endpoint, subscription_json)
       VALUES ($1, $2, $3)
       ON CONFLICT (endpoint) DO UPDATE
         SET subscription_json = $3, username = $1, updated_at = NOW()`,
      [req.user.username, subscription.endpoint, JSON.stringify(subscription)]
    );
    res.json({ message: 'Subscribed to push notifications' });
  } catch (err) {
    console.error('Push subscribe error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/push/unsubscribe — removes all subscriptions for the current user
router.delete('/unsubscribe', authMiddleware, async (req, res) => {
  try {
    await db.query('DELETE FROM push_subscriptions WHERE username = $1', [req.user.username]);
    res.json({ message: 'Unsubscribed' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
