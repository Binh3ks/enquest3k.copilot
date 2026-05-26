#!/usr/bin/env node
/**
 * EngQuest3K Database Backup Script
 * Exports all critical data to JSON for backup purposes.
 * Run: node scripts/backup_db.js
 *
 * Backup data:
 *   - users (with bcrypt password hashes, NOT plaintext passwords)
 *   - teacher_assignments
 *   - station_progress
 *   - lesson_plans_index
 *   - lesson_plans
 *   - messages
 *   - teacher_session_notes
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.SUPABASE_DB_HOST || 'aws-1-ap-northeast-1.pooler.supabase.com',
  port: parseInt(process.env.SUPABASE_DB_PORT || '5432'),
  user: process.env.SUPABASE_DB_USER || 'postgres.dlvjqdyvatceidzeyfnq',
  password: process.env.SUPABASE_DB_PASS || '!4hqV$bpceK!?KR',
  database: process.env.SUPABASE_DB_NAME || 'postgres',
  ssl: { rejectUnauthorized: false },
  max: 2,
});

const OUTPUT_DIR = process.env.BACKUP_OUTPUT_DIR || path.join(__dirname, '../backups');
const TABLES = [
  'users',
  'teacher_assignments',
  'station_progress',
  'lesson_plans_index',
  'lesson_plans',
  'messages',
  'teacher_session_notes',
  'manager_teacher_assignments',
  'teacher_task_assignments',
  'periodic_assessments',
  'checkpoint_results',
  'payment_requests',
];

async function backupTable(tableName) {
  try {
    const result = await pool.query(`SELECT * FROM public.${tableName}`);
    console.log(`  ${tableName}: ${result.rows.length} rows`);
    return result.rows;
  } catch (err) {
    if (err.code === '42P01') {
      console.log(`  ${tableName}: SKIP (table does not exist)`);
      return null;
    }
    console.error(`  ${tableName}: ERROR ${err.message}`);
    return null;
  }
}

async function main() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = path.join(OUTPUT_DIR, timestamp);
  fs.mkdirSync(backupDir, { recursive: true });

  const metadata = {
    timestamp: new Date().toISOString(),
    version: '1.0',
    tables: {},
  };

  console.log(`\nBackup started: ${timestamp}`);
  console.log(`Output: ${backupDir}\n`);

  for (const table of TABLES) {
    process.stdout.write(`Backing up ${table}... `);
    const rows = await backupTable(table);
    if (rows !== null) {
      const filePath = path.join(backupDir, `${table}.json`);
      fs.writeFileSync(filePath, JSON.stringify(rows, null, 2));
      metadata.tables[table] = { rows: rows.length, file: `${table}.json` };
    }
  }

  // Write metadata
  fs.writeFileSync(path.join(backupDir, 'metadata.json'), JSON.stringify(metadata, null, 2));

  // Write latest symlink
  const latestDir = path.join(OUTPUT_DIR, 'latest');
  if (fs.existsSync(latestDir)) fs.unlinkSync(latestDir);
  try { fs.symlinkSync(backupDir, latestDir); } catch {}

  console.log(`\nBackup complete: ${backupDir}`);
  console.log('\nBackup summary:');
  for (const [table, info] of Object.entries(metadata.tables)) {
    console.log(`  ${table}: ${info.rows} rows -> ${info.file}`);
  }

  await pool.end();
}

main().catch(err => {
  console.error('Backup failed:', err);
  process.exit(1);
});
