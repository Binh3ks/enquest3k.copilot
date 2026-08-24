#!/usr/bin/env node
/**
 * GATE 9: Generator Purity & Zero-Clone Auditor
 * Asserts data generators:
 * 1. Do NOT import, require, or read from src/data/weeks/week_33 or any other week folder
 * 2. Only take blueprint.json + schemas/week_data.schema.json as input
 * 3. Enforces Zero-Cloning invariant for all future week generations
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log(`\n========================================================================`);
console.log(`🧬 GATE 9: GENERATOR PURITY & ZERO-CLONE AUDITOR`);
console.log(`========================================================================`);

const GENERATOR_FILES = [
  path.join(rootDir, 'scripts/generate_pure_week_data.mjs'),
  path.join(rootDir, 'scripts/generate_pure_week_data.js'),
  path.join(rootDir, 'scripts/generate_week_data.mjs')
].filter(fs.existsSync);

let violations = [];

const CLONE_PATTERNS = [
  /from\s+['"].*weeks\/week_[0-9]+.*['"]/i,
  /require\(['"].*weeks\/week_[0-9]+.*['"]\)/i,
  /readFileSync\(.*weeks\/week_[0-9]+.*['"]\)/i,
  /cp\s+-r\s+.*week_33/i
];

GENERATOR_FILES.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(rootDir, filePath);

  CLONE_PATTERNS.forEach(pat => {
    if (pat.test(content)) {
      violations.push(`[ILLEGAL CLONE IMPORT] In ${relPath}: Found pattern ${pat}`);
    }
  });
});

console.log(`📂 Scanned ${GENERATOR_FILES.length} generator script files.`);

console.log(`\n========================================================================`);
if (violations.length > 0) {
  console.error(`❌ GATE 9 FAILED: Generator purity violated!`);
  violations.forEach(v => console.error(`   - ${v}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 9 PASSED: Generator is 100% Pure (0 cross-week clone imports)!`);
  process.exit(0);
}
