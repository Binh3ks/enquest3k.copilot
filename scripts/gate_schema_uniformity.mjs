#!/usr/bin/env node
/**
 * SCHEMA UNIFORMITY GATE (Gate 003B-0 Step 1)
 * 
 * Strict Enforcement:
 * 1. Prohibits dual fallback reading patterns (`.fields || .items` or `.items || .fields`) anywhere in src/.
 * 2. Compares target week data hub schemas against standards:
 *    - speaking_hub.js:
 *      * info_exchange_cards MUST standardize on `.items` for candidate_card and examiner_card (not `.fields`).
 *      * Candidate Card in Phase 1 MUST have 100% known facts (0 null values, 0 known: false, 0 "???").
 *      * Examiner Card / cues in Phase 2 must contain Wh- prompts / cues.
 *    - skill_practice_hub.js:
 *      * Action Lab (science_lab) MUST have `stages` array with >= 3 scenarios (Action Lab 3-Scenario Invariant).
 *      * NO legacy dictation data in skill_practice_hub.js (abolished since round 5).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const TARGET_WEEK = parseInt(process.argv[2] || '34', 10);

console.log('========================================================================');
console.log(`🛡️ SCHEMA UNIFORMITY GATE (Week ${TARGET_WEEK})`);
console.log('========================================================================\n');

const violations = [];

// ─────────────────────────────────────────────────────────────────────────────
// CHECK 1: CODEBASE DUAL-FALLBACK PATTERNS
// ─────────────────────────────────────────────────────────────────────────────
console.log('🔍 [CHECK 1] Scanning src/ for prohibited dual-fallback patterns (.items || .fields)...');
const srcDir = path.join(ROOT_DIR, 'src');

function scanDirForFallbacks(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDirForFallbacks(fullPath);
    } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        // Pattern 1: .items || .fields or .fields || .items
        if (/\.items\s*\|\|\s*.*\.fields/.test(line) || /\.fields\s*\|\|\s*.*\.items/.test(line)) {
          const relPath = path.relative(ROOT_DIR, fullPath);
          violations.push({
            gate: 'SCHEMA_UNIFORMITY',
            type: 'DUAL_FALLBACK_CODE_PATTERN',
            file: relPath,
            line: idx + 1,
            detail: `Prohibited dual fallback pattern detected: "${line.trim()}"`
          });
          console.error(`  ❌ [FAIL] ${relPath}:${idx + 1} -> ${line.trim()}`);
        }
      });
    }
  }
}
scanDirForFallbacks(srcDir);

// ─────────────────────────────────────────────────────────────────────────────
// CHECK 2: SPEAKING HUB SCHEMA (.items Standardization & Cambridge Invariants)
// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n🔍 [CHECK 2] Verifying speaking_hub.js schema for Week ${TARGET_WEEK}...`);
const speakingHubPath = path.join(ROOT_DIR, `src/data/weeks/week_${TARGET_WEEK}/speaking_hub.js`);

if (!fs.existsSync(speakingHubPath)) {
  violations.push({
    gate: 'SCHEMA_UNIFORMITY',
    type: 'FILE_MISSING',
    file: `src/data/weeks/week_${TARGET_WEEK}/speaking_hub.js`,
    detail: 'speaking_hub.js not found!'
  });
} else {
  const content = fs.readFileSync(speakingHubPath, 'utf8');
  
  // Dynamic import of speakingHub
  const hubModule = await import(`file://${speakingHubPath}`);
  const speakingHub = hubModule.speakingHub || hubModule.default || {};
  const cards = speakingHub.info_exchange_cards || {};

  // Check standardization on .items
  if (cards.candidate_card) {
    if (cards.candidate_card.fields && !cards.candidate_card.items) {
      violations.push({
        gate: 'SCHEMA_UNIFORMITY',
        type: 'SCHEMA_KEY_DRIFT',
        file: `src/data/weeks/week_${TARGET_WEEK}/speaking_hub.js`,
        detail: 'candidate_card uses deprecated key ".fields" instead of standardized key ".items".'
      });
      console.error('  ❌ [FAIL] candidate_card uses ".fields" instead of standardized ".items"');
    }

    // Check Cambridge Flyers Phase 1 Invariant: 100% known data (no null / false / ???)
    const candList = cards.candidate_card.items || cards.candidate_card.fields || [];
    const missingItems = candList.filter(item => item.value === null || item.known === false || item.value === '?' || item.value === '???');
    if (missingItems.length > 0) {
      violations.push({
        gate: 'SCHEMA_UNIFORMITY',
        type: 'CAMBRIDGE_P1_DATA_INCOMPLETE',
        file: `src/data/weeks/week_${TARGET_WEEK}/speaking_hub.js`,
        detail: `Candidate Card Phase 1 has ${missingItems.length} unknown/null items. Cambridge Flyers Phase 1 requires 100% complete facts on candidate sheet.`
      });
      console.error(`  ❌ [FAIL] Candidate Card Phase 1 has ${missingItems.length} incomplete items (contains null/known:false)`);
    }
  } else if (!cards.table_a) {
    violations.push({
      gate: 'SCHEMA_UNIFORMITY',
      type: 'SCHEMA_MISSING_CARD',
      file: `src/data/weeks/week_${TARGET_WEEK}/speaking_hub.js`,
      detail: 'Missing candidate_card in info_exchange_cards'
    });
  }

  if (cards.examiner_card) {
    if (cards.examiner_card.fields && !cards.examiner_card.items) {
      violations.push({
        gate: 'SCHEMA_UNIFORMITY',
        type: 'SCHEMA_KEY_DRIFT',
        file: `src/data/weeks/week_${TARGET_WEEK}/speaking_hub.js`,
        detail: 'examiner_card uses deprecated key ".fields" instead of standardized key ".items".'
      });
      console.error('  ❌ [FAIL] examiner_card uses ".fields" instead of standardized ".items"');
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECK 3: SKILL PRACTICE HUB (Action Lab 3-Scenario & Dictation Abolition)
// ─────────────────────────────────────────────────────────────────────────────
console.log(`\n🔍 [CHECK 3] Verifying skill_practice_hub.js schema for Week ${TARGET_WEEK}...`);
const skillHubPath = path.join(ROOT_DIR, `src/data/weeks/week_${TARGET_WEEK}/skill_practice_hub.js`);

if (fs.existsSync(skillHubPath)) {
  const skillModule = await import(`file://${skillHubPath}`);
  const skillHub = skillModule.skillPracticeHub || skillModule.default || {};

  // Check Dictation abolition
  if (skillHub.dictation && skillHub.dictation.length > 0) {
    violations.push({
      gate: 'SCHEMA_UNIFORMITY',
      type: 'ABOLISHED_DICTATION_DATA_PRESENT',
      file: `src/data/weeks/week_${TARGET_WEEK}/skill_practice_hub.js`,
      detail: `skill_practice_hub.js contains ${skillHub.dictation.length} dictation sentences. Dictation has been abolished since Round 5.`
    });
    console.error(`  ❌ [FAIL] Abolished dictation data detected (${skillHub.dictation.length} items in skillPracticeHub.dictation)`);
  }

  // Check Action Lab 3-Scenario Invariant
  const scienceLab = skillHub.science_lab;
  if (!scienceLab) {
    violations.push({
      gate: 'SCHEMA_UNIFORMITY',
      type: 'ACTION_LAB_MISSING',
      file: `src/data/weeks/week_${TARGET_WEEK}/skill_practice_hub.js`,
      detail: 'Missing science_lab in skill_practice_hub.js'
    });
  } else {
    const hasStages = Array.isArray(scienceLab.stages) && scienceLab.stages.length >= 3;
    if (!hasStages) {
      violations.push({
        gate: 'SCHEMA_UNIFORMITY',
        type: 'ACTION_LAB_INSUFFICIENT_SCENARIOS',
        file: `src/data/weeks/week_${TARGET_WEEK}/skill_practice_hub.js`,
        detail: `Action Lab does not meet 3-Scenario Invariant. stages is ${scienceLab.stages ? scienceLab.stages.length : 'undefined'} (minimum required: 3).`
      });
      console.error(`  ❌ [FAIL] Action Lab does not meet 3-Scenario Invariant (stages count: ${scienceLab.stages ? scienceLab.stages.length : 0}, required: >=3)`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SUMMARY & EXIT
// ─────────────────────────────────────────────────────────────────────────────
console.log('\n========================================================================');
console.log('📊 SCHEMA UNIFORMITY AUDIT RESULTS');
console.log('========================================================================');
console.log(`Total Violations: ${violations.length}`);

if (violations.length > 0) {
  console.error('\n🚨 SCHEMA UNIFORMITY GATE FAILED WITH THE FOLLOWING VIOLATIONS:');
  violations.forEach((v, i) => {
    console.error(`  [${i + 1}] [${v.type}] ${v.file}${v.line ? `:${v.line}` : ''} -> ${v.detail}`);
  });
  console.log('\n❌ EXIT 1 (Schema Uniformity Gate FAILED as expected on unpatched codebase)\n');
  process.exit(1);
}

console.log('\n✅ SCHEMA UNIFORMITY GATE PASSED: Clean schemas and zero dual-fallback patterns.\n');
process.exit(0);
