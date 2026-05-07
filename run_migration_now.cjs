#!/usr/bin/env node
/**
 * ONE-CLICK Migration Script
 * Paste Railway credentials and run!
 */

const { Pool } = require('pg');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise(resolve => rl.question(prompt, resolve));
}

async function runMigration() {
  console.log('🔧 RAILWAY POSTGRESQL MIGRATION\n');
  
  // Get credentials
  const host = await question('PG_HOST (ep-calm-surf...): ');
  const database = await question('PG_DATABASE (neondb): ') || 'neondb';
  const user = await question('PG_USER (neondb_owner): ') || 'neondb_owner';
  const password = await question('PG_PASSWORD (npg_pk4YxjPe...): ');
  const port = await question('PG_PORT (5432): ') || '5432';
  
  rl.close();
  
  console.log('\n🔗 Connecting to PostgreSQL...');
  
  const pool = new Pool({
    host,
    port: parseInt(port),
    database,
    user,
    password,
    ssl: { rejectUnauthorized: false }
  });
  
  try {
    const client = await pool.connect();
    
    console.log('✅ Connected!\n');
    console.log('🔧 Adding real_email column...');
    
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS real_email VARCHAR(255);
    `);
    
    console.log('📊 Creating index...');
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_real_email 
      ON users(real_email);
    `);
    
    console.log('✅ Verifying...');
    
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'real_email';
    `);
    
    if (result.rows.length > 0) {
      console.log('\n✨ SUCCESS! Migration completed!\n');
      console.log('Column details:', result.rows[0]);
      console.log('\n👉 Now refresh production app: Cmd+Shift+R');
    } else {
      console.error('\n❌ Verification failed');
    }
    
    client.release();
    await pool.end();
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    await pool.end();
    process.exit(1);
  }
}

runMigration();
