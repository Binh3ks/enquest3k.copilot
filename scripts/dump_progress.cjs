#!/usr/bin/env node
/**
 * dump_progress.cjs — Dump all progress records from the backend
 *
 * Usage:
 *   node scripts/dump_progress.cjs                        # all users, all weeks
 *   node scripts/dump_progress.cjs --user 42              # single user
 *   node scripts/dump_progress.cjs --week 1               # single week
 *   node scripts/dump_progress.cjs --has-data             # only rows with rich data
 *   node scripts/dump_progress.cjs --output progress.json # write to file
 *   node scripts/dump_progress.cjs --stats                # only show stats
 *
 * Requires: ADMIN_TOKEN env var (the token of an admin or super_admin user)
 *
 * API endpoint: GET /api/admin/progress/dump
 * (added 2026-06-09 after the data-wipe bug forced operator to audit
 * what progress records were still on the server)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const API_BASE = process.env.API_URL || 'https://heartfelt-mindfulness-production-40ff.up.railway.app/api';
const TOKEN = process.env.ADMIN_TOKEN;

if (!TOKEN) {
  console.error('Error: ADMIN_TOKEN env var not set.');
  console.error('Usage: ADMIN_TOKEN=<jwt> node scripts/dump_progress.cjs');
  console.error('Get the token by logging in as admin via the web app, then');
  console.error("check localStorage → 'engquest-auth' → state.token");
  process.exit(1);
}

// Parse args
const args = process.argv.slice(2);
const opts = {};
let outputFile = null;
let statsOnly = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--user')   opts.userId = args[++i];
  if (args[i] === '--week')   opts.weekId = args[++i];
  if (args[i] === '--has-data') opts.hasData = 'true';
  if (args[i] === '--output') outputFile = args[++i];
  if (args[i] === '--stats')  statsOnly = true;
  if (args[i] === '--limit')  opts.limit = args[++i];
}

function fetchJson(path) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const client = url.protocol === 'https:' ? https : http;
    const req = client.request({
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname + url.search,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error(`Bad JSON (${res.statusCode}): ${data.slice(0, 200)}`)); }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  try {
    if (statsOnly) {
      const stats = await fetchJson('/admin/progress/stats');
      console.log('Progress stats:');
      console.log(JSON.stringify(stats, null, 2));
      return;
    }

    const queryString = new URLSearchParams(opts).toString();
    const qs = queryString ? `?${queryString}` : '';
    const data = await fetchJson(`/admin/progress/dump${qs}`);

    if (outputFile) {
      fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
      console.log(`Wrote ${data.count} rows to ${outputFile}`);
    } else {
      console.log(`Count: ${data.count}`);
      console.log(`Filter: ${JSON.stringify(data.filter)}`);
      console.log('');
      // Compact table view
      const rows = data.rows;
      if (rows.length === 0) {
        console.log('(no rows)');
      } else {
        const cols = ['user_id', 'username', 'week_id', 'station_key', 'score', 'is_completed', 'updated_at'];
        console.log(cols.join('\t'));
        for (const r of rows) {
          console.log(cols.map((c) => r[c] === null || r[c] === undefined ? '-' : String(r[c]).slice(0, 60)).join('\t'));
        }
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
