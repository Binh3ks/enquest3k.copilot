#!/usr/bin/env node
/**
 * Supabase Data Import Script
 * Usage: node import_supabase.js <users_json_file>
 *
 * Example: node import_supabase.js users_backup.json
 *
 * Requires:
 *   SUPABASE_URL=https://dlvjqdyvatceidzeyfnq.supabase.co
 *   SUPABASE_SERVICE_KEY=<your-service-role-key>
 */
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dlvjqdyvatceidzeyfnq.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Error: SUPABASE_SERVICE_KEY env var not set.');
  console.error('Get it from: Supabase Dashboard → Settings → API → service_role secret');
  process.exit(1);
}

async function upsert(table, rows, primaryKey = 'id') {
  if (!rows || rows.length === 0) { console.log(`  ✓ ${table}: nothing to import`); return 0; }

  const cleaned = rows.map(r => {
    const c = {};
    for (const [k, v] of Object.entries(r)) {
      if (v !== undefined) c[k] = (typeof v === 'string' && v.trim() === '') ? null : v;
    }
    return c;
  });

  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'apikey': SERVICE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates',
    },
    body: JSON.stringify(cleaned),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error(`  ✗ ${table}: ${JSON.stringify(data).substring(0, 200)}`);
    return 0;
  }
  console.log(`  ✓ ${table}: imported ${cleaned.length} rows`);
  return cleaned.length;
}

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log(`Usage: node import_supabase.js <users.json> [progress.json] [messages.json]`);
    console.log(`\nExample: node import_supabase.js users.json progress.json`);
    console.log(`\nSupabase URL: ${SUPABASE_URL}`);
    console.log(`Service Key: ${SERVICE_KEY.substring(0, 10)}...`);

    // Test connection
    const test = await fetch(`${SUPABASE_URL}/rest/v1/users?select=id&limit=1`, {
      headers: { 'apikey': SERVICE_KEY, 'Authorization': `Bearer ${SERVICE_KEY}` }
    });
    const testData = await test.json();
    if (test.ok) {
      console.log(`\n✓ Connected to Supabase! Found ${testData.length || 0} users.`);
    } else {
      console.error(`\n✗ Connection failed: ${JSON.stringify(testData).substring(0, 200)}`);
    }
    return;
  }

  console.log(`Importing into ${SUPABASE_URL}...`);

  // Load users
  const usersData = require(args[0]);
  let total = 0;

  if (Array.isArray(usersData)) {
    total += await upsert('users', usersData);
  } else if (usersData.users_json) {
    total += await upsert('users', usersData.users_json);
  } else if (usersData.data) {
    total += await upsert('users', usersData.data);
  }

  // Load progress if provided
  if (args[1]) {
    const progressData = require(args[1]);
    if (Array.isArray(progressData)) {
      total += await upsert('station_progress', progressData);
    } else {
      total += await upsert('station_progress', progressData.station_progress || progressData.data || []);
    }
  }

  // Load messages if provided
  if (args[2]) {
    const messagesData = require(args[2]);
    if (Array.isArray(messagesData)) {
      total += await upsert('messages', messagesData);
    } else {
      total += await upsert('messages', messagesData.messages || messagesData.data || []);
    }
  }

  console.log(`\n✓ Total rows imported: ${total}`);
  console.log('Next: update Railway environment variables with Supabase DATABASE_URL');
}

main().catch(console.error);
