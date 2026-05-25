#!/usr/bin/env node
/**
 * Supabase Backend Setup Script
 *
 * Usage: node setup_supabase_backend.js
 *
 * This script helps set up the Railway backend to connect to Supabase.
 *
 * 1. Prints the Supabase DATABASE_URL format
 * 2. Prints the JWT_SECRET needed
 * 3. Tests the Supabase connection
 *
 * Requires:
 *   SUPABASE_URL=https://dlvjqdyvatceidzeyfnq.supabase.co
 *   SUPABASE_SERVICE_KEY=<your-service-role-key>
 */
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://dlvjqdyvatceidzeyfnq.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Error: SUPABASE_SERVICE_KEY env var not set.');
  console.error('Get it from: Supabase Dashboard → Settings → API → service_role secret');
  process.exit(1);
}

// Extract project ref from URL
const projectRef = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '');

console.log('\n=== SUPABASE BACKEND SETUP ===\n');
console.log(`Project Ref: ${projectRef}`);
console.log(`URL: ${SUPABASE_URL}\n`);

// The DATABASE_URL format for Supabase (direct connection, not pooler)
// Pooler port 6543 works but direct port 5432 is more compatible
// Format: postgresql://postgres.[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
console.log('--- DATABASE_URL ---\n');
console.log(`postgresql://postgres.[YOUR-SUPABASE-DB-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`);
console.log('\n  Find YOUR-SUPABASE-DB-PASSWORD at:');
console.log('  Supabase Dashboard → Settings → Database → Database password\n');
console.log('  Or use the "Connection string" section for pre-filled format.\n');

// Test connection
async function testConnection() {
  console.log('--- Testing Supabase connection ---');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/users?select=id&limit=1`, {
      headers: {
        'apikey': SERVICE_KEY,
        'Authorization': `Bearer ${SERVICE_KEY}`
      }
    });
    if (res.ok) {
      const data = await res.json();
      console.log(`✓ Connected! Found ${data.length} users in Supabase.`);
    } else {
      const data = await res.text();
      console.log(`✗ Connection error: ${res.status} ${data.substring(0, 200)}`);
    }
  } catch (e) {
    console.log(`✗ Connection failed: ${e.message}`);
  }
}

testConnection().then(() => {
  console.log('\n=== NEXT STEPS ===');
  console.log('\n1. Set these Railway Environment Variables:');
  console.log('   DATABASE_URL=postgresql://postgres.[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres');
  console.log('   SUPABASE_JWT_SECRET=<from Supabase Dashboard → Settings → API → JWT Secret>');
  console.log('   (Remove PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE, PG_PORT if set)');
  console.log('\n2. Import users:');
  console.log('   SUPABASE_SERVICE_KEY=<key> node import_supabase.js users.json');
  console.log('\n3. Redeploy Railway backend\n');
});
