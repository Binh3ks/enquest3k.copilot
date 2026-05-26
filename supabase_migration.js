#!/usr/bin/env node
/**
 * Supabase Migration Tool v2
 * Migrates all data from Railway/CockroachDB to Supabase
 *
 * Usage:
 *   1. Export from CockroachDB:
 *      curl https://enquest3k.up.railway.app/api/export/users
 *      curl https://enquest3k.up.railway.app/api/export/progress
 *
 *   2. Import to Supabase:
 *      node supabase_migration.js --import <SUPABASE_URL> <SUPABASE_SERVICE_KEY>
 *
 *   3. Update frontend .env with Supabase credentials
 */

const https = require('https');

// ── Supabase REST API helpers ─────────────────────────────────────────────────
async function supabaseUpsert(table, rows, { primaryKey = 'id' } = {}) {
  if (!rows || rows.length === 0) { console.log(`  ${table}: nothing to import`); return; }

  const body = rows.map(r => {
    // Remove undefined values and clean up
    const clean = {};
    for (const [k, v] of Object.entries(r)) {
      if (v !== undefined && v !== null) clean[k] = v;
    }
    return clean;
  });

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'apikey': SERVICE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`${table}: ${JSON.stringify(data).substring(0, 200)}`);
  }
  console.log(`  ${table}: imported ${rows.length} rows`);
}

// ── HTTP helper ───────────────────────────────────────────────────────────────
function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'Accept': 'application/json' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve(data); }
      });
    }).on('error', reject);
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────
const [,, cmd, SUPABASE_URL, SERVICE_KEY, ...extra] = process.argv;

if (cmd === '--import' && SUPABASE_URL && SERVICE_KEY) {
  // Import mode
  if (extra.length === 0) {
    console.error('Usage: node supabase_migration.js --import <SUPABASE_URL> <SERVICE_KEY> <users.json> [progress.json]');
    process.exit(1);
  }

  const usersData = extra[0] === '-' ? JSON.parse(require('fs').readFileSync(0) ) : require(extra[0]);
  const progressData = extra[1] && extra[1] !== '-' ? require(extra[1]) : null;

  if (Array.isArray(usersData)) {
    supabaseUpsert('users', usersData).catch(console.error);
    if (progressData) supabaseUpsert('station_progress', progressData).catch(console.error);
  }

} else {
  // Export mode — fetch from Railway
  console.log(`
Supabase Migration Tool

STEP 1: Export data from Railway
================================
Run in CockroachDB SQL Shell:
  COPY users TO 'users.csv' WITH (HEADER true, DELIMITER ',');
  COPY station_progress TO 'progress.csv' WITH (HEADER true, DELIMITER ',');
  COPY messages TO 'messages.csv' WITH (HEADER true, DELIMITER ',');
  COPY teacher_assignments TO 'assignments.csv' WITH (HEADER true, DELIMITER ',');

STEP 2: Import into Supabase
============================
Upload CSV files via Supabase Dashboard → Table Editor → Import CSV

STEP 3: Update frontend .env
================================
`);
}
