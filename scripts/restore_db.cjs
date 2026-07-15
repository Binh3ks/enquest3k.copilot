#!/usr/bin/env node
/**
 * EngQuest3K Database Restore Script
 * Usage:
 *   node scripts/restore_db.js --list                    # List available backups
 *   node scripts/restore_db.js --list <dir>             # List files in a backup dir
 *
 *   node scripts/restore_db.js --restore <dir>          # Restore ALL tables from backup dir
 *   node scripts/restore_db.js --restore <dir> users                     # Restore specific table
 *   node scripts/restore_db.js --restore <dir> station_progress          # Restore student progress
 *   node scripts/restore_db.js --restore <dir> teacher_assignments       # Restore teacher links
 *   node scripts/restore_db.js --restore <dir> messages                  # Restore messages
 *
 *   node scripts/restore_db.js --restore users <file.json>               # Restore users from JSON file directly
 *   node scripts/restore_db.js --restore station_progress <file.json>    # Restore progress from JSON
 *
 *   node scripts/restore_db.js --preview <dir>            # Show what changed without restoring
 *   node scripts/restore_db.js --dry-run <dir> users     # Dry run for specific table
 *
 * Examples:
 *   node scripts/restore_db.js --restore backups/2026-05-26T10-00-00
 *   node scripts/restore_db.js --restore backups/2026-05-26T10-00-00 station_progress
 *   node scripts/restore_db.js --restore station_progress ./my_progress_backup.json
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
  max: 3,
});

// Map table name -> column list for INSERT (exclude auto-generated columns)
const TABLE_COLUMNS = {
  users: ['id', 'username', 'email', 'password_hash', 'role', 'plan', 'avatar_url', 'display_name', 'created_at', 'updated_at', 'supabase_uid', 'parent_id', 'trial_expires_at', 'plan_expires_at', 'class_start_date', 'plan_months', 'real_email'],
  teacher_assignments: ['id', 'teacher_id', 'student_id', 'notes', 'assigned_by', 'private_notes', 'assigned_at'],
  manager_teacher_assignments: ['id', 'manager_id', 'teacher_id', 'allocated_seats', 'assigned_at'],
  station_progress: ['id', 'user_id', 'week_id', 'station_key', 'station_id', 'is_completed', 'score', 'progress_percent', 'data', 'updated_at'],
  lesson_plans_index: ['week_num', 'unit_theme'],
  lesson_plans: ['week_num', 'content'],
  messages: ['id', 'sender_id', 'receiver_id', 'content', 'read', 'sent_at', 'read_at'],
  teacher_session_notes: ['id', 'teacher_id', 'student_id', 'week_id', 'note', 'created_at'],
  teacher_task_assignments: ['id', 'teacher_id', 'student_id', 'task_type', 'data', 'assigned_at', 'completed'],
  periodic_assessments: ['id', 'user_id', 'assessment_type', 'week_id', 'score', 'completed_at', 'data'],
  checkpoint_results: ['id', 'user_id', 'checkpoint_key', 'score', 'completed_at', 'data'],
  payment_requests: ['id', 'user_id', 'amount', 'status', 'created_at', 'paid_at', 'metadata'],
  push_subscriptions: ['id', 'user_id', 'endpoint', 'keys', 'created_at'],
  student_activity_log: ['id', 'user_id', 'activity_type', 'week_id', 'station_type', 'metadata', 'created_at'],
};

function getColumns(tableName, row) {
  const defined = TABLE_COLUMNS[tableName];
  if (defined) return defined.filter(c => c in row);
  // Fallback: use all keys from the first row
  return Object.keys(row);
}

async function getCurrentCount(table) {
  try {
    const r = await pool.query(`SELECT COUNT(*) FROM public.${table}`);
    return parseInt(r.rows[0].count);
  } catch {
    return -1;
  }
}

async function restoreTable(tableName, rows, dryRun = false, replace = false) {
  if (!rows || rows.length === 0) {
    console.log(`  ${tableName}: 0 rows — nothing to restore`);
    return { table: tableName, action: 'skip', rows: 0 };
  }

  const currentCount = await getCurrentCount(tableName);
  console.log(`  ${tableName}: ${currentCount >= 0 ? currentCount + ' current rows' : 'table not found'} -> restoring ${rows.length} rows`);

  if (dryRun) {
    return { table: tableName, action: 'dry-run', rows: rows.length };
  }

  // Determine primary key for ON CONFLICT
  const pk = tableName === 'lesson_plans_index' ? 'week_num'
           : tableName === 'lesson_plans' ? 'week_num'
           : 'id';

  const cols = getColumns(tableName, rows[0]);
  const placeholders = cols.map((_, i) => `$${i + 1}`).join(', ');

  let inserted = 0, errors = 0;
  for (const row of rows) {
    const values = cols.map(c => {
      const v = row[c];
      if (typeof v === 'object') return JSON.stringify(v);
      return v;
    });

    try {
      await pool.query(
        `INSERT INTO public.${tableName} (${cols.join(', ')}) VALUES (${placeholders}) ON CONFLICT (${pk}) DO UPDATE SET ${cols.map(c => `${c}=EXCLUDED.${c}`).join(', ')}`,
        values
      );
      inserted++;
    } catch (err) {
      errors++;
      if (errors <= 3) console.error(`    ERROR (${row[pk] || row.id}): ${err.message.substring(0, 80)}`);
    }
  }

  console.log(`    -> ${inserted} restored, ${errors} errors`);
  return { table: tableName, action: 'restored', rows: inserted, errors };
}

async function listBackups() {
  const backupDir = path.join(__dirname, '../backups');
  if (!fs.existsSync(backupDir)) {
    console.log('No backups directory found at', backupDir);
    return;
  }

  const dirs = fs.readdirSync(backupDir)
    .filter(f => fs.statSync(path.join(backupDir, f)).isDirectory())
    .sort()
    .reverse();

  if (dirs.length === 0) {
    console.log('No backups found.');
    return;
  }

  console.log(`\nAvailable backups (${dirs.length}):\n`);
  for (const dir of dirs.slice(0, 20)) {
    const metaPath = path.join(backupDir, dir, 'metadata.json');
    let info = '';
    if (fs.existsSync(metaPath)) {
      try {
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
        const total = Object.values(meta.tables).filter(t => t.status === 'ok').reduce((s, t) => s + t.rows, 0);
        info = ` — ${total} rows across ${Object.values(meta.tables).filter(t => t.status === 'ok').length} tables`;
      } catch {}
    }
    const isLink = fs.lstatSync(path.join(backupDir, dir)).isSymbolicLink();
    console.log(`  ${isLink ? '🔗' : '📁'} ${dir}${isLink ? ' (latest)' : ''}${info}`);
  }
  if (dirs.length > 20) console.log(`\n  ... and ${dirs.length - 20} more`);
}

async function previewBackup(backupDir) {
  const metaPath = path.join(backupDir, 'metadata.json');
  if (!fs.existsSync(metaPath)) {
    console.error('Not a valid backup directory (no metadata.json)');
    return;
  }

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  console.log(`\n Backup: ${backupDir}`);
  console.log(`  Time: ${meta.timestamp}`);
  console.log(`\n Tables:\n`);
  for (const [name, info] of Object.entries(meta.tables)) {
    const status = info.status === 'ok' ? '✅' : info.status === 'skipped' ? '⏭️' : '❌';
    console.log(`  ${status} ${name}: ${info.rows || 0} rows — ${info.desc || ''}`);
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === '--list') {
    if (args[1]) {
      const metaPath = path.join(args[1], 'metadata.json');
      if (fs.existsSync(metaPath)) {
        previewBackup(args[1]);
      } else {
        console.error('Not a valid backup:', args[1]);
      }
    } else {
      await listBackups();
    }
    await pool.end();
    return;
  }

  if (args[0] === '--preview') {
    const dir = args[1] || path.join(__dirname, '../backups/latest');
    previewBackup(fs.existsSync(dir) ? dir : path.join(__dirname, '../backups/latest'));
    await pool.end();
    return;
  }

  if (args[0] === '--restore') {
    const arg2 = args[1];
    const arg3 = args[2];
    const dryRun = args.includes('--dry-run');

    // Case: --restore <dir> [table...]
    if (arg2 && (fs.existsSync(arg2) || fs.existsSync(path.join(__dirname, '..', arg2)))) {
      const dir = fs.existsSync(arg2) ? arg2 : path.join(__dirname, '..', arg2);
      const metaPath = path.join(dir, 'metadata.json');

      if (!fs.existsSync(metaPath)) {
        console.error('Not a valid backup directory:', dir);
        await pool.end();
        process.exit(1);
      }

      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      const tables = arg3 ? [arg3] : Object.keys(meta.tables);

      console.log(`\n Restoring from: ${dir}`);
      console.log(` Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}\n`);

      const results = [];
      for (const table of tables) {
        const info = meta.tables[table];
        if (!info || info.status !== 'ok') {
          console.log(`  ⏭️ ${table}: skipped (not in backup)`);
          continue;
        }

        const filePath = path.join(dir, info.file);
        if (!fs.existsSync(filePath)) {
          console.log(`  ❌ ${table}: file missing (${info.file})`);
          continue;
        }

        const rows = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const result = await restoreTable(table, rows, dryRun);
        results.push(result);
      }

      const ok = results.filter(r => r.action === 'restored').length;
      console.log(`\n  ${dryRun ? 'Dry-run' : 'Restore'} complete — ${ok}/${results.length} tables`);
      await pool.end();
      return;
    }

    // Case: --restore <table> <file.json>
    if (arg2 && arg3) {
      const table = arg2;
      const filePath = arg3.startsWith('/') ? arg3 : path.join(process.cwd(), arg3);
      if (!fs.existsSync(filePath)) {
        console.error('File not found:', filePath);
        await pool.end();
        process.exit(1);
      }

      console.log(`\n Restoring ${table} from ${filePath}`);
      const rows = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const result = await restoreTable(table, rows, dryRun);
      await pool.end();
      return;
    }

    console.error(`Usage:\n  node scripts/restore_db.js --restore <backup_dir> [table]\n  node scripts/restore_db.js --restore <table> <file.json>`);
    await pool.end();
    process.exit(1);
  }

  // Help
  console.log(`
EngQuest3K Restore Script

Usage:
  node scripts/restore_db.js --list                              List all backups
  node scripts/restore_db.js --list <dir>                        Preview a backup
  node scripts/restore_db.js --preview <dir>                     Show backup contents

  node scripts/restore_db.js --restore backups/latest             Restore everything
  node scripts/restore_db.js --restore backups/latest users       Restore users only
  node scripts/restore_db.js --restore backups/latest station_progress  Restore student progress

  node scripts/restore_db.js --restore backups/latest --dry-run  Preview without changes
  node scripts/restore_db.js --restore <table> <file.json>      Restore table from JSON file

Available tables: users, teacher_assignments, station_progress,
  lesson_plans_index, lesson_plans, messages, teacher_session_notes,
  teacher_task_assignments, periodic_assessments, checkpoint_results,
  payment_requests, push_subscriptions, student_activity_log
`);
  await pool.end();
}

main().catch(err => {
  console.error('\n Restore failed:', err.message);
  process.exit(1);
});
