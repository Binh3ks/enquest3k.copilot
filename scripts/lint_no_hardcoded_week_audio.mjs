#!/usr/bin/env node
/**
 * scripts/lint_no_hardcoded_week_audio.mjs
 * 
 * CI Lint Gate: No Hardcoded Week Audio or Fallback Week Leaks
 * 
 * Enforces architectural invariance across all 156 weeks:
 * 1. CẤM chuỗi literal `/audio/week\d+/` trong component, module, service ngoài src/data/
 * 2. CẤM biểu thức fallback `/audio/week${... || \d+}/`
 * 3. CẤM `weekNumber || 33`, `activeWeek || 33`, `weekNumber = 33` trong shared components và zones
 */

import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const srcDir = path.resolve(rootDir, 'src');

function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllJsFiles(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getAllJsFiles(srcDir);
const violations = [];

// Rule 1: Literal /audio/week\d+/ outside src/data/
const LITERAL_WEEK_AUDIO_REGEX = /['"`]\/audio\/week\d+[\/_]/;

// Rule 2: Dynamic template literal with fallback || \d+ for week audio
const FALLBACK_WEEK_AUDIO_REGEX = /\/audio\/week\$\{[^}]*\|\|\s*\d+[^}]*\}/;

// Rule 3: weekNumber || 33, activeWeek || 33, or default weekNumber = 33 in components/zones
const WEEK_FALLBACK_33_REGEX = /\b(weekNumber|activeWeek)\s*\|\|\s*33\b/;
const DEFAULT_WEEK_33_PARAM_REGEX = /\bweekNumber\s*=\s*33\b/;

for (const filePath of files) {
  const relPath = path.relative(rootDir, filePath);
  const isDataFile = relPath.startsWith('src/data/');
  const isComponentOrZone = relPath.startsWith('src/components/') || relPath.startsWith('src/modules/zones/') || relPath.startsWith('src/modules/cambridge_suite/');

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();

    // Skip pure comment lines
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) {
      return;
    }

    // Check Rule 1: Literal /audio/weekXX/ outside data files
    if (!isDataFile && LITERAL_WEEK_AUDIO_REGEX.test(line)) {
      // Disallow literal audio week path in code
      violations.push({
        file: relPath,
        line: lineNum,
        rule: 'RULE-1: LITERAL_WEEK_AUDIO_PATH',
        message: 'Hardcoded literal audio path with specific week number outside src/data/ is forbidden. Use dynamic `/audio/week${weekNumber}/...` instead.',
        snippet: trimmed
      });
    }

    // Check Rule 2: Fallback || \d+ inside /audio/week${...}/
    if (FALLBACK_WEEK_AUDIO_REGEX.test(line)) {
      violations.push({
        file: relPath,
        line: lineNum,
        rule: 'RULE-2: FALLBACK_WEEK_AUDIO_EXPRESSION',
        message: 'Audio URL contains fallback week number (e.g., `|| 33`). Use explicit weekNumber or null guard.',
        snippet: trimmed
      });
    }

    // Check Rule 3: Fallback || 33 in components and zones
    if (isComponentOrZone && WEEK_FALLBACK_33_REGEX.test(line)) {
      violations.push({
        file: relPath,
        line: lineNum,
        rule: 'RULE-3: WEEK_FALLBACK_33_IN_COMPONENT',
        message: 'Found `weekNumber || 33` or `activeWeek || 33` in component/zone. Propagate explicit weekNumber instead of defaulting to week 33.',
        snippet: trimmed
      });
    }

    // Check Rule 4: Default parameter weekNumber = 33 in component/zone function signatures
    if (isComponentOrZone && DEFAULT_WEEK_33_PARAM_REGEX.test(line)) {
      violations.push({
        file: relPath,
        line: lineNum,
        rule: 'RULE-4: DEFAULT_WEEK_33_PARAM',
        message: 'Default parameter `weekNumber = 33` in shared component/zone is forbidden.',
        snippet: trimmed
      });
    }
  });
}

console.log('========================================================================');
console.log('🔍 ENGQUEST3K — CI LINT GATE: NO HARDCODED WEEK AUDIO');
console.log(`📁 Files scanned in src/: ${files.length}`);
console.log('========================================================================\n');

if (violations.length === 0) {
  console.log('✅ PASS: 0 hardcoded week audio paths or fallback week leaks detected.');
  console.log('   All shared components and zones conform to dynamic weekNumber contract.');
  console.log('------------------------------------------------------------------------\n');
  process.exit(0);
} else {
  console.error(`❌ FAIL: Found ${violations.length} violation(s):\n`);
  violations.forEach((v, i) => {
    console.error(`[${i + 1}] ${v.file}:${v.line} — [${v.rule}]`);
    console.error(`    ${v.message}`);
    console.error(`    Line: ${v.snippet}\n`);
  });
  console.log('------------------------------------------------------------------------\n');
  process.exit(1);
}
