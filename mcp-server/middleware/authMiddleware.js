/* eslint-env node */
const jwt = require('jsonwebtoken');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dlvjqdyvatceidzeyfnq.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'sb_publishable_z9iUKGkbsXC4IkHgpD7tng_thmSuMGP';

/**
 * Middleware to protect routes that require authentication.
 * Supports two token types:
 * 1. Railway JWT (old) — signed with process.env.JWT_SECRET (HS256)
 * 2. Supabase JWT (new) — verified via Supabase /auth/v1/user endpoint
 */
const authMiddleware = async (req, res, next) => {
  // Allow CORS preflight to pass through — it has no Authorization header.
  if (req.method === 'OPTIONS') return next();

  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token format is invalid, authorization denied' });
  }

  const token = parts[1];

  // Try Railway JWT first (HS256, symmetric)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    req.tokenType = 'railway';
    return next();
  } catch (_) {}

  // Try Supabase JWT — verify via Supabase Auth /user endpoint
  try {
    const res2 = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    });
    if (!res2.ok) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    const user = await res2.json();
    req.user = { id: user.id, supabase_uid: user.id, email: user.email };
    req.tokenType = 'supabase';
    return next();
  } catch (_) {}

  res.status(401).json({ message: 'Token is not valid' });
};

module.exports = authMiddleware;
