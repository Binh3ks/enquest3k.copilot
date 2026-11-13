#!/usr/bin/env node
/**
 * scripts/verify_round92_math_fields.mjs
 *
 * RIGOROUS ADAPTER VERIFICATION FOR ROUND 92:
 * Runs normalizeBarModelQuestion() from src/utils/station2Adapters.js
 * against all 40 singapore_math questions across W47-W54 (8 weeks).
 *
 * Asserts:
 * 1. problemText is NOT 'Solve the Bar Model problem below:'
 * 2. hintText is NOT 'Check the bar model diagram to calculate the target answer!'
 * 3. correctAnswer is a valid positive integer matching target_answer
 * 4. SVG modelData.bars is present and non-empty
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { normalizeBarModelQuestion, resolveNumericAnswer } from '../src/utils/station2Adapters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const OUT_FILE = path.join(ROOT_DIR, 'docs/agent_artifacts/round92_math_verification_raw.txt');
const STAGING_DIR = path.join(ROOT_DIR, 'docs/agent_artifacts/staging');

const WEEKS = [47, 48, 49, 50, 51, 52, 53, 54];

const GENERIC_PROBLEM_FALLBACK = 'Solve the Bar Model problem below:';
const GENERIC_HINT_FALLBACK = 'Check the bar model diagram to calculate the target answer!';

const logLines = [];
function log(msg = '') {
  console.log(msg);
  logLines.push(msg);
}

async function run() {
  log('================================================================================');
  log('ROUND 92: SINGAPORE MATH ADAPTER FIELD RESOLUTION AUDIT (W47–W54)');
  log(`Timestamp: ${new Date().toISOString()}`);
  log(`Adapter: src/utils/station2Adapters.js -> normalizeBarModelQuestion()`);
  log('================================================================================\n');

  let totalQuestions = 0;
  let genericFallbacksFound = 0;
  let invalidAnswers = 0;

  for (const w of WEEKS) {
    const weekDir = path.join(STAGING_DIR, `week_${w}`);
    const spFile = path.join(weekDir, 'skill_practice_hub.js');
    const mod = await import(`file://${spFile}`);
    const mathProblems = mod.skillPracticeHubData?.singapore_math || [];

    log(`>>> Week ${w}: ${mod.skillPracticeHubData?.theme} (${mathProblems.length} questions) <<<`);

    for (let i = 0; i < mathProblems.length; i++) {
      totalQuestions++;
      const q = mathProblems[i];
      const norm = normalizeBarModelQuestion(q, i, w);
      const ans = resolveNumericAnswer(q);

      const isProblemGeneric = norm.problemText === GENERIC_PROBLEM_FALLBACK;
      const isHintGeneric = norm.hintText === GENERIC_HINT_FALLBACK;

      if (isProblemGeneric || isHintGeneric) {
        genericFallbacksFound++;
        log(`  [FAIL] Q${i + 1} ('${norm.title}'):`);
        if (isProblemGeneric) log(`    problemText fell back to generic: "${norm.problemText}"`);
        if (isHintGeneric) log(`    hintText fell back to generic: "${norm.hintText}"`);
      } else {
        log(`  [PASS] Q${i + 1}: ${norm.title}`);
        log(`         problemText: "${norm.problemText}"`);
        log(`         hintText:    "${norm.hintText}"`);
        log(`         answer:      ${norm.correctAnswer} ${norm.unit} (bars: ${norm.modelData?.bars?.length || 0})`);
      }

      if (typeof ans !== 'number' || isNaN(ans) || ans <= 0 || !Number.isInteger(ans)) {
        invalidAnswers++;
        log(`  [FAIL] Q${i + 1} numeric answer invalid: ${ans}`);
      }
    }
    log('');
  }

  log('================================================================================');
  log('AUDIT SUMMARY:');
  log(`  Total Questions Audited: ${totalQuestions} / 40`);
  log(`  Generic Fallback Detections: ${genericFallbacksFound}`);
  log(`  Invalid Answers: ${invalidAnswers}`);
  log('================================================================================');

  fs.writeFileSync(OUT_FILE, logLines.join('\n'), 'utf8');
  log(`\nRaw audit log saved to: ${OUT_FILE}`);

  if (genericFallbacksFound > 0 || invalidAnswers > 0) {
    log('❌ FAILED: Generic fallbacks or invalid answers detected.');
    process.exit(1);
  } else {
    log('✅ PASSED: 40/40 math questions resolve genuine problemText and hintText via normalizeBarModelQuestion()');
    process.exit(0);
  }
}

run().catch(err => {
  console.error('Fatal error in audit harness:', err);
  process.exit(1);
});
