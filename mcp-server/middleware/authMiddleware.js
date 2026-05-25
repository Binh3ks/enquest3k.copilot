/* eslint-env node */
const jwt = require('jsonwebtoken');

/**
 * Middleware to protect routes that require authentication.
 * Supports two token types:
 * 1. Railway JWT (old) — signed with process.env.JWT_SECRET
 * 2. Supabase JWT (new) — signed by Supabase, verified with process.env.SUPABASE_JWT_SECRET
 */
const authMiddleware = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Token format is invalid, authorization denied' });
  }

  const token = parts[1];

  // Try Railway JWT first (for backward compatibility)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    req.tokenType = 'railway';
    return next();
  } catch (_) {}

  // Try Supabase JWT
  if (process.env.SUPABASE_JWT_SECRET) {
    try {
      const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
      // Supabase JWT structure: { sub: supabase_uid, email: ..., user_metadata: {...} }
      req.user = { id: decoded.sub, supabase_uid: decoded.sub, email: decoded.email };
      req.tokenType = 'supabase';
      return next();
    } catch (_) {}
  }

  res.status(401).json({ message: 'Token is not valid' });
};

module.exports = authMiddleware;
