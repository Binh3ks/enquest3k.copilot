#!/usr/bin/env node
/**
 * EngQuest3K Database Backup Script
 * Usage:
 *   node scripts/backup_db.js                    # Full backup -> backups/YYYY-MM-DDTHH:MM:SS/
 *   node scripts/backup_db.js --latest           # Backup with "latest" symlink
 *   node scripts/backup_db.js --dry-run          # Show what would be backed up
 *
 * Environment variables (override defaults):
 *   SUPABASE_DB_HOST, SUPABASE_DB_USER, SUPABASE_DB_PASS, SUPABASE_DB_PORT, SUPABASE_DB_NAME
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

// Table definitions with optional description
const TABLES = [
  { name: 'users',                  desc: 'User accounts (includes bcrypt password hashes)' },
  { name: 'teacher_assignments',    desc: 'Teacher -> Student relationships' },
  { name: 'manager_teacher_assignments', desc: 'Manager -> Teacher relationships' },
  { name: 'station_progress',       desc: 'Student station progress (most critical)' },
  { name: 'lesson_plans_index',    desc: 'Lesson plan week index' },
  { name: 'lesson_plans',          desc: 'Full lesson plan content (156 weeks)' },
  { name: 'messages',              desc: 'Messages between teachers and students' },
  { name: 'teacher_session_notes',  desc: 'Teacher session notes' },
  { name: 'teacher_task_assignments', desc: 'Task assignments' },
  { name: 'periodic_assessments',  desc: 'Periodic assessments' },
  { name: 'checkpoint_results',    desc: 'Checkpoint results' },
  { name: 'payment_requests',      desc: 'Payment records' },
  { name: 'push_subscriptions',    desc: 'Push notification subscriptions' },
  { name: 'student_activity_log',   desc: 'Student activity log' },
];

const OUTPUT_DIR = process.env.BACKUP_OUTPUT_DIR || path.join(__dirname, '../backups');

async function backupTable(name) {
  try {
    const result = await pool.query(`SELECT * FROM public.${name}`);
    return { name, rows: result.rows, count: result.rows.length, error: null };
  } catch (err) {
    if (err.code === '42P01') {
      return { name, rows: null, count: 0, error: 'TABLE_NOT_FOUND' };
    }
    return { name, rows: null, count: 0, error: err.message };
  }
}

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const latest = args.includes('--latest');

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const backupDir = latest ? path.join(OUTPUT_DIR, 'latest') : path.join(OUTPUT_DIR, timestamp);

  console.log(`\n EngQuest3K Backup`);
  console.log(`   Time: ${new Date().toISOString()}`);
  console.log(`   Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
  console.log(`   Out:  ${backupDir}\n`);

  if (dryRun) {
    console.log('Tables to backup:');
    for (const t of TABLES) {
      console.log(`  [ ] ${t.name} — ${t.desc}`);
    }
    console.log(`\nRun without --dry-run to execute.`);
    await pool.end();
    return;
  }

  fs.mkdirSync(backupDir, { recursive: true });

  const metadata = {
    timestamp: new Date().toISOString(),
    version: '1.1',
    nodeVersion: process.version,
    tables: {},
  };

  for (const t of TABLES) {
    process.stdout.write(`  Backing up ${t.name}... `);
    const result = await backupTable(t.name);
    if (result.error === 'TABLE_NOT_FOUND') {
      console.log('SKIP (table not found)');
      metadata.tables[t.name] = { status: 'skipped', reason: 'table_not_found' };
    } else if (result.error) {
      console.log(`ERROR: ${result.error}`);
      metadata.tables[t.name] = { status: 'error', error: result.error };
    } else {
      const filePath = path.join(backupDir, `${t.name}.json`);
      fs.writeFileSync(filePath, JSON.stringify(result.rows, null, 2));
      console.log(`${result.count} rows -> ${t.name}.json`);
      metadata.tables[t.name] = { status: 'ok', rows: result.count, file: `${t.name}.json`, desc: t.desc };
    }
  }

  fs.writeFileSync(path.join(backupDir, 'metadata.json'), JSON.stringify(metadata, null, 2));

  // Summary
  const ok = Object.values(metadata.tables).filter(t => t.status === 'ok').length;
  const err = Object.values(metadata.tables).filter(t => t.status === 'error').length;
  console.log(`\n  Done — ${ok} tables OK, ${err} errors`);
  if (err > 0) {
    const errTables = Object.entries(metadata.tables).filter(([,v]) => v.status === 'error').map(([k]) => k);
    console.log(`  Failed tables: ${errTables.join(', ')}`);
  }

  await pool.end();
}

main().catch(err => {
  console.error('\n Backup failed:', err.message);
  process.exit(1);
});
