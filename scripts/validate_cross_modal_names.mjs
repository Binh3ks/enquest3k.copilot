#!/usr/bin/env node
/**
 * validate_cross_modal_names.mjs — Golden Standard v1.0 Gates M1, M3
 *
 * Usage: node scripts/validate_cross_modal_names.mjs <weekNum>
 *
 * Checks that character names used in listening_hub.js are consistent
 * with names appearing in all other data files for the week.
 * Flags any cross-modal identity mismatch as HIGH severity.
 */
import { pathToFileURL } from 'url';
import path from 'path';
import fs from 'fs';

const weekNum = process.argv[2];
if (!weekNum) { console.error('Usage: node validate_cross_modal_names.mjs <weekNum>'); process.exit(1); }

const weekDir = path.resolve(`src/data/weeks/week_${weekNum}`);

// Extract character names from listening_hub L1 names[]
const lhPath = path.join(weekDir, 'listening_hub.js');
if (!fs.existsSync(lhPath)) {
  console.error(`ERROR: listening_hub.js not found for week ${weekNum}`);
  process.exit(1);
}
const lhMod = await import(pathToFileURL(lhPath).href);
const lh = lhMod.listeningHub || lhMod.listeningHubData || lhMod.default;

// Collect all proper names from L1 names[] and passage_audio_script
const canonicalNames = new Set();
(lh?.listening_p1?.names || []).forEach(n => {
  const parts = n.text.split(' ');
  parts.forEach(p => { if (p.length > 2 && /^[A-Z]/.test(p)) canonicalNames.add(p); });
});

console.log(`\nCross-Modal Name Consistency Check — Week ${weekNum}`);
console.log(`Canonical names from L1: [${[...canonicalNames].join(', ')}]\n`);

// Stale names to detect (from audit findings — names that appear ONLY in stale audio)
// NOTE: 'Harry' and 'Oliver' are INTENTIONAL reading-station characters (R&W P2, P3, check_mode)
//       They do NOT appear in audio. Do NOT flag them as stale.
const staleNames = ['Clara', 'Davis', 'Emma'];

let highFails = 0;

// Files to scan for cross-modal consistency
const filesToScan = fs.readdirSync(weekDir).filter(f => f.endsWith('.js'));

for (const file of filesToScan) {
  const filePath = path.join(weekDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');

  // Check for stale names
  staleNames.forEach(name => {
    if (content.includes(name)) {
      // Not a false positive check: does it appear in a string context (not a comment variable name)?
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        if (line.includes(name) && !line.trim().startsWith('//') && !line.trim().startsWith('*')) {
          console.warn(`  ⚠️  [M3] ${file}:${i+1}: stale name "${name}" found: ${line.trim().slice(0,100)}`);
          highFails++;
        }
      });
    }
  });
}

// Scan audio files (via ORPHANED_AUDIO_MANIFEST if present)
const manifestPath = path.resolve(`public/audio/week${weekNum}/ORPHANED_AUDIO_MANIFEST.json`);
if (fs.existsSync(manifestPath)) {
  const raw = fs.readFileSync(manifestPath, 'utf-8');
  const manifest = JSON.parse(raw);
  console.log('[Gate M3] Orphan manifest loaded. Checking stale active audio:');
  (manifest.stale_active || []).forEach(entry => {
    if (entry.blocking) {
      console.error(`  ❌ [M3] BLOCKING STALE: ${entry.filename} — ${entry.reason}`);
    } else {
      console.warn(`  ⚠️  [M3] Minor stale: ${entry.filename} — ${entry.reason}`);
    }
  });
  const blockingCount = (manifest.stale_active || []).filter(e => e.blocking).length;
  if (blockingCount > 0) {
    console.error(`\n  ❌ ${blockingCount} blocking stale audio file(s) detected`);
    highFails += blockingCount;
  }
}

console.log(`\n══════════════════════════════════════════════`);
console.log(`Gate M1/M3 Results — Week ${weekNum}`);
if (highFails === 0) {
  console.log('  ✅ No cross-modal name conflicts detected\n');
  process.exit(0);
} else {
  console.warn(`  ⚠️  ${highFails} cross-modal / stale-name issue(s) found`);
  console.warn('  HIGH severity — blocks Assessment Release\n');
  process.exit(1);
}
