/* eslint-env node */
require('dotenv').config(); // Load environment variables
const { Pool } = require('pg');

let pool;

// Support two modes:
// 1. Connection string: DATABASE_URL (Supabase, Neon, CockroachDB)
// 2. Individual vars: PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT
if (process.env.DATABASE_URL) {
  // Use connection string (Supabase format)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });
} else {
  // Use individual env vars (backward compatibility)
  pool = new Pool({
    user: (process.env.PG_USER || '').trim(),
    host: (process.env.PG_HOST || '').trim(),
    database: (process.env.PG_DATABASE || '').trim(),
    password: (process.env.PG_PASSWORD || '').trim(),
    port: parseInt((process.env.PG_PORT || '5432').trim(), 10),
    ssl: (process.env.PG_SSL || '').trim() !== 'false',
  });
}

// We export a query function that will be used throughout the application
// to interact with the database.
module.exports = {
  query: (text, params) => pool.query(text, params),
};
