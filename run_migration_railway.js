#!/usr/bin/env node
/**
 * Emergency Migration Runner for Railway Production
 * Connects directly to Railway PostgreSQL and adds real_email column
 * 
 * Usage:
 * 1. Set environment variable: export RAILWAY_DATABASE_URL="postgres://..."
 * 2. Run: node run_migration_railway.js
 */

require('dotenv').config();
const { Pool } = require('pg');

const DATABASE_URL = process.env.RAILWAY_DATABASE_URL || process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ ERROR: No DATABASE_URL found');
  console.error('\nPlease set RAILWAY_DATABASE_URL environment variable:');
  console.error('export RAILWAY_DATABASE_URL="postgres://user:pass@host:port/db"');
  console.error('\nGet from Railway Dashboard → PostgreSQL → Connect → Connection String');
  process.exit(1);
}

async function runMigration() {
  const pool = new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  
  try {
    console.log('🔗 Connecting to PostgreSQL...');
    const client = await pool.connect();
    
    console.log('🔧 Running migration: Add real_email column...');
    await client.query(`
      ALTER TABLE users 
      ADD COLUMN IF NOT EXISTS real_email VARCHAR(255);
    `);
    
    console.log('📊 Creating index on real_email...');
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_users_real_email 
      ON users(real_email);
    `);
    
    console.log('✅ Verifying column exists...');
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'users' AND column_name = 'real_email';
    `);
    
    if (result.rows.length > 0) {
      const col = result.rows[0];
      console.log('✅ SUCCESS! Column created:');
      console.log(`   - Name: ${col.column_name}`);
      console.log(`   - Type: ${col.data_type}`);
      console.log(`   - Nullable: ${col.is_nullable}`);
    } else {
      console.error('❌ Verification failed - column not found');
      process.exit(1);
    }
    
    client.release();
    await pool.end();
    console.log('\n✨ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error.stack);
    await pool.end();
    process.exit(1);
  }
}

runMigration();
