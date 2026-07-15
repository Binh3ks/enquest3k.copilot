#!/usr/bin/env node
/**
 * migrate_shadowing.mjs — Normalize all shadowing.js files to unified schema.
 *
 * Usage:
 *   node tools/migrate_shadowing.mjs          # Run migration (with backup)
 *   node tools/migrate_shadowing.mjs --dry    # Dry run (no writes)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WEEKS_DIR = path.join(ROOT, 'src', 'data', 'weeks');
const WEEKS_EASY_DIR = path.join(ROOT, 'src', 'data', 'weeks_easy');

const DRY = process.argv.includes('--dry');

function getWeekDirs(baseDir) {
  if (!fs.existsSync(baseDir)) return [];
  return fs.readdirSync(baseDir)
    .filter(d => /^week_\d{2}$/.test(d) && fs.statSync(path.join(baseDir, d)).isDirectory())
    .sort();
}

function readJsExport(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  // Extract the export default { ... } content
  const match = raw.match(/export\s+default\s+(\{[\s\S]*\})\s*;?\s*$/);
  if (!match) return null;
  // Parse with Function constructor (safe for local data files)
  try {
    const fn = new Function('return ' + match[1]);
    return fn();
  } catch (e) {
    console.error(`  Failed to parse: ${filePath} — ${e.message}`);
    return null;
  }
}

function readDailyWatch(weekDir, modeDir) {
  const dwPath = path.join(modeDir, weekDir, 'daily_watch.js');
  if (!fs.existsSync(dwPath)) return null;
  const data = readJsExport(dwPath);
  if (!data?.videos?.length) return null;
  return data.videos[0]?.videoId || null;
}

function isRealVietnamese(vi) {
  if (!vi || typeof vi !== 'string') return false;
  // Reject placeholder-like patterns
  if (vi.startsWith('(cụm từ:') || vi.startsWith('(phrase:')) return false;
  // Reject if too short (likely placeholder)
  if (vi.length < 5) return false;
  // Check for Vietnamese characters (diacritics)
  if (/[àáảãạăắằẳẵặâấầẩẫậèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵđ]/i.test(vi)) {
    return true;
  }
  // Accept if it has Vietnamese-looking content (even without diacritics, if it's long enough)
  return vi.length > 15;
}

function migrateShadowing(data, videoId) {
  const out = {};

  // Title: keep if exists
  if (data.title) out.title = data.title;

  // videoId from daily_watch
  if (videoId) out.videoId = videoId;

  // content_en: keep if exists
  if (data.content_en) out.content_en = data.content_en;

  // Normalize script array
  let script = data.script || data.sentences || [];
  out.script = script.map(s => {
    const text = s.text_en || s.text || '';
    // Only keep vi if it looks like real Vietnamese
    const vi = isRealVietnamese(s.vi) ? s.vi : null;
    return { id: s.id, text, vi };
  });

  return out;
}

function writeShadowing(filePath, data) {
  let output = 'export default {\n';

  if (data.title) output += `  title: ${JSON.stringify(data.title)},\n`;
  if (data.videoId) output += `  videoId: ${JSON.stringify(data.videoId)},\n`;
  if (data.content_en) {
    // Preserve template literal format for content_en if it's multiline
    if (data.content_en.includes('\n')) {
      output += `  content_en: \`${data.content_en}\`,\n`;
    } else {
      output += `  content_en: ${JSON.stringify(data.content_en)},\n`;
    }
  }

  output += '  script: [\n';
  for (const s of data.script) {
    const viStr = s.vi !== null ? `, vi: ${JSON.stringify(s.vi)}` : ', vi: null';
    output += `    { id: ${s.id}, text: ${JSON.stringify(s.text)}${viStr} },\n`;
  }
  output += '  ]\n';
  output += '};\n';

  fs.writeFileSync(filePath, output, 'utf8');
}

function backupFile(filePath) {
  const bakPath = filePath + '.bak';
  if (!fs.existsSync(bakPath)) {
    fs.copyFileSync(filePath, bakPath);
  }
}

function processMode(modeName, modeDir) {
  const weekDirs = getWeekDirs(modeDir);
  let migrated = 0;
  let skipped = 0;
  const details = [];

  for (const weekDir of weekDirs) {
    const shadowPath = path.join(modeDir, weekDir, 'shadowing.js');
    if (!fs.existsSync(shadowPath)) {
      skipped++;
      continue;
    }

    const data = readJsExport(shadowPath);
    if (!data) {
      skipped++;
      continue;
    }

    // Read videoId from daily_watch.js
    const videoId = readDailyWatch(weekDir, modeDir);

    // Migrate
    const migratedData = migrateShadowing(data, videoId);

    // Report changes
    const oldKeys = Object.keys(data);
    const newKeys = Object.keys(migratedData);
    const hadScript = !!data.script;
    const hadSentences = !!data.sentences;
    const hadVideoId = !!data.videoId;

    const changes = [];
    if (hadSentences) changes.push('sentences→script');
    if (!hadVideoId && videoId) changes.push('+videoId');
    if (data.audio_full) changes.push('-audio_full');
    if (data.audio_url) changes.push('-audio_url');
    if (data.image_url) changes.push('-image_url');

    details.push({
      week: weekDir,
      sentenceCount: migratedData.script.length,
      changes: changes.length > 0 ? changes.join(', ') : 'no changes',
      videoId: videoId || 'none',
    });

    if (!DRY) {
      backupFile(shadowPath);
      writeShadowing(shadowPath, migratedData);
    }

    migrated++;
  }

  return { migrated, skipped, details };
}

function main() {
  console.log(`\n=== Shadowing Data Migration ${DRY ? '(DRY RUN)' : ''} ===\n`);

  // Process both modes
  const adv = processMode('advanced', WEEKS_DIR);
  const easy = processMode('easy', WEEKS_EASY_DIR);

  // Print details
  console.log('--- Advanced Mode ---');
  for (const d of adv.details) {
    console.log(`  ${d.week}: ${d.sentenceCount} sentences, ${d.changes}, video=${d.videoId}`);
  }

  console.log('\n--- Easy Mode ---');
  for (const d of easy.details) {
    console.log(`  ${d.week}: ${d.sentenceCount} sentences, ${d.changes}, video=${d.videoId}`);
  }

  console.log('\n--- Summary ---');
  console.log(`Advanced: ${adv.migrated} migrated, ${adv.skipped} skipped`);
  console.log(`Easy:     ${easy.migrated} migrated, ${easy.skipped} skipped`);
  console.log(`Total:    ${adv.migrated + easy.migrated} files ${DRY ? 'would be' : ''} updated`);

  if (DRY) {
    console.log('\n[DRY RUN] No files were written. Remove --dry to apply.');
  } else {
    console.log('\nOriginals backed up as .bak files.');
  }

  console.log('\n=== Done ===\n');
}

main();
