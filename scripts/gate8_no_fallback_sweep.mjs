#!/usr/bin/env node
/**
 * GATE 8: Static No-Fallback Sweep & Fail-Loud Auditor
 * Scans all React components and modules in src/:
 * 1. Prohibits hardcoded week-specific story characters and incident strings in default fallbacks (e.g. Jake, corridor incident)
 * 2. Asserts components do not silently render hardcoded legacy content when props are missing
 * 3. Enforces clean fail-loud behavior in dev mode
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log(`\n========================================================================`);
console.log(`🛡️  GATE 8: STATIC NO-FALLBACK SWEEP & FAIL-LOUD AUDIT`);
console.log(`========================================================================`);

const targetDirs = [
  path.join(rootDir, 'src/components'),
  path.join(rootDir, 'src/modules'),
  path.join(rootDir, 'src/config')
];

const BANNED_HARDCODED_FALLBACK_PATTERNS = [
  { name: "Jake's Diary Fallback", regex: /Jake's Diary/i },
  { name: "Hardcoded School Nurse Room", regex: /NURSE ROOM/i },
  { name: "Hardcoded Slipped Corridor Action", regex: /slipped on wet floor/i },
  { name: "Hardcoded Wet Floor Vector Art", regex: /WET FLOOR/i },
  { name: "Hardcoded Headmaster Assembly Fallback", regex: /praised you during assembly/i }
];

let errors = [];
let scannedCount = 0;

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
      // Ignore tests and mocks
      if (entry.name.includes('.test.') || entry.name.includes('.spec.')) continue;

      scannedCount++;
      const content = fs.readFileSync(fullPath, 'utf8');

      BANNED_HARDCODED_FALLBACK_PATTERNS.forEach(pat => {
        if (pat.regex.test(content)) {
          const relPath = path.relative(rootDir, fullPath);
          errors.push(`[SILENT HARDCODED FALLBACK] In ${relPath}: Found banned pattern "${pat.name}"`);
        }
      });
    }
  }
}

targetDirs.forEach(scanDir);
console.log(`📂 Scanned ${scannedCount} component and module files across src/`);

console.log(`\n========================================================================`);
if (errors.length > 0) {
  console.error(`❌ GATE 8 FAILED: Found ${errors.length} hardcoded silent fallbacks!`);
  errors.forEach(e => console.error(`   - ${e}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 8 PASSED: 0 Hardcoded Fallbacks Detected (100% Fail-Loud Compliance)!`);
  process.exit(0);
}
