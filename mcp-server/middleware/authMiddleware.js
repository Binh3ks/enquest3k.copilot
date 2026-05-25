/* eslint-env node */
const jwt = require('jsonwebtoken');

// Lazy-loaded ESM module for Supabase JWT verification (ES256)
let jose = null;
async function getJose() {
  if (!jose) jose = await import('jose');
  return jose;
}

let supabaseJWKSet = null;

/**
 * Middleware to protect routes that require authentication.
 * Supports two token types:
 * 1. Railway JWT (old) — signed with process.env.JWT_SECRET (HS256)
 * 2. Supabase JWT (new) — signed by Supabase, verified via JWKS (ES256)
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

  // Try Railway JWT first (HS256, symmetric)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    req.tokenType = 'railway';
    return next();
  } catch (_) {}

  // Try Supabase JWT (ES256, asymmetric) using JWKS
  if (process.env.SUPABASE_URL) {
    try {
      const { createRemoteJWKSet, jwtVerify } = await getJose();
      if (!supabaseJWKSet) {
        const supabaseUrl = process.env.SUPABASE_URL;
        const jwksUrl = new URL(`${supabaseUrl}/auth/v1/jwks`);
        supabaseJWKSet = createRemoteJWKSet(jwksUrl);
      }
      const { payload } = await jwtVerify(token, supabaseJWKSet, {
        issuer: process.env.SUPABASE_URL,
      });
      req.user = { id: payload.sub, supabase_uid: payload.sub, email: payload.email };
      req.tokenType = 'supabase';
      return next();
    } catch (_) {}
  }

  res.status(401).json({ message: 'Token is not valid' });
};

module.exports = authMiddleware;
