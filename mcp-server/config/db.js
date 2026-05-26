/* eslint-env node */
require('dotenv').config();
const { Pool } = require('pg');

// Supabase pooler connection
const SB_HOST = process.env.SUPABASE_DB_HOST || 'aws-1-ap-northeast-1.pooler.supabase.com';
const SB_USER = process.env.SUPABASE_DB_USER || 'postgres.dlvjqdyvatceidzeyfnq';
const SB_PASS = process.env.SUPABASE_DB_PASS || '!4hqV$bpceK!?KR';
const SB_PORT = parseInt(process.env.SUPABASE_DB_PORT || '5432', 10);
const SB_DB = process.env.SUPABASE_DB_NAME || 'postgres';

const connStr = `postgresql://${SB_USER}:${encodeURIComponent(SB_PASS)}@${SB_HOST}:${SB_PORT}/${SB_DB}`;

const pool = new Pool({
  connectionString: connStr,
  ssl: { rejectUnauthorized: false },
  max: 10,
});

pool.on('error', err => console.error('[db] Pool error:', err.message));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
