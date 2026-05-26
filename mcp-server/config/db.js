/* eslint-env node */
require('dotenv').config();
const { Pool } = require('pg');

let pool;

const dbUrl = process.env.RAILWAY_DATABASE_URL || process.env.DATABASE_URL;

if (dbUrl) {
  pool = new Pool({
    connectionString: dbUrl,
    ssl: { rejectUnauthorized: false },
    max: 10,
  });
} else {
  pool = new Pool({
    user: (process.env.PG_USER || '').trim(),
    host: (process.env.PG_HOST || '').trim(),
    database: (process.env.PG_DATABASE || '').trim(),
    password: (process.env.PG_PASSWORD || '').trim(),
    port: parseInt((process.env.PG_PORT || '5432').trim(), 10),
    ssl: (process.env.PG_SSL || '').trim() !== 'false',
  });
}

pool.on('error', err => console.error('[db] Pool error:', err.message));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
