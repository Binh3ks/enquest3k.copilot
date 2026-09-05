#!/usr/bin/env node
/**
 * GATE 18: 5-Feature Data Contract Compliance Validator
 * ═══════════════════════════════════════════════════════
 * 
 * Validates that week data files include required data contracts
 * for the 5-feature architecture (SRS, Inference, QuickWrite, Placement, Dashboard).
 * 
 * Usage: node scripts/gate18_feature_compliance.mjs <weekNumber>
 * 
 * Enforcement policy:
 *   - W33–W48: inference_questions WARNED (not required)
 *   - W49+:    inference_questions REQUIRED (gate fails)
 *   - All weeks: vocab must have 20 items with SRS-required fields
 * 
 * Exit code: 0 = all pass, 1 = failures found
 */

import fs from 'fs';
import path from 'path';
import process from 'process';
import { pathToFileURL } from 'url';

const weekArg = process.argv[2] || '33';
const weekNum = parseInt(weekArg, 10);
const weekStr = weekNum < 10 ? `0${weekNum}` : `${weekNum}`;

if (isNaN(weekNum) || weekNum < 1 || weekNum > 156) {
  console.error('❌ Error: Provide a valid week number 1–156.');
  process.exit(1);
}

const WEEKS_DIR = path.join(process.cwd(), 'src', 'data', 'weeks', `week_${weekStr}`);
const INFERENCE_REQUIRED_FROM = 49;
const INFERENCE_MIN_ITEMS = 2;
const VOCAB_REQUIRED_COUNT = 20;

// Gen 3 (W113+) requires ≥3 inference questions
const INFERENCE_MIN_ITEMS_GEN3 = 3;

console.log(`\n========================================================================`);
console.log(`🔬  GATE 18: 5-FEATURE DATA CONTRACT COMPLIANCE — WEEK ${weekNum}`);
console.log(`========================================================================`);
console.log(`    Enforcement: ${weekNum >= INFERENCE_REQUIRED_FROM ? '🔴 STRICT' : '🟡 WARN-ONLY (transition period)'}`);
console.log(`    Generation:  ${weekNum >= 113 ? 'Gen 3 (B1+ Academic)' : weekNum >= 73 ? 'Gen 2 (B1 PET)' : 'Gen 1 (A2 Flyers)'}\n`);

if (!fs.existsSync(WEEKS_DIR)) {
  console.error(`❌ Week directory not found: ${WEEKS_DIR}`);
  process.exit(1);
}

async function loadModuleFile(filename) {
  const fileP = path.join(WEEKS_DIR, filename);
  if (!fs.existsSync(fileP)) return null;
  try {
    const mod = await import(pathToFileURL(fileP).href + `?t=${Date.now()}`);
    return mod.default || mod;
  } catch (e) {
    console.error(`  ⚠️  Error loading ${filename}: ${e.message}`);
    return null;
  }
}

let errors = 0;
let warnings = 0;

function fail(id, msg) {
  errors++;
  console.log(`  ❌ [${id}] FAIL: ${msg}`);
}

function warn(id, msg) {
  warnings++;
  console.log(`  ⚠️  [${id}] WARN: ${msg}`);
}

function pass(id, msg) {
  console.log(`  ✅ [${id}] PASS: ${msg}`);
}

async function runChecks() {
  // ═══════════════════════════════════════════════════════════════
  // CHECK GROUP 1: Vocabulary — SRS Leitner Enrollment Contract
  // ═══════════════════════════════════════════════════════════════
  console.log(`\n── Vocab / SRS Contract ──`);
  
  const readingHub = await loadModuleFile('reading_hub.js');
  if (!readingHub) {
    fail('VOC-00', 'reading_hub.js not found or failed to load');
  } else {
    // Find vocab in various export shapes
    const vocab = readingHub.readingHubData?.vocab
      || readingHub.vocab
      || readingHub.readingHub?.vocab
      || null;

    if (!vocab || !Array.isArray(vocab)) {
      fail('VOC-01', 'vocab array not found in reading_hub.js exports');
    } else {
      // VOC-01: Exactly 20 vocab items
      if (vocab.length !== VOCAB_REQUIRED_COUNT) {
        fail('VOC-01', `vocab must have exactly ${VOCAB_REQUIRED_COUNT} items (found ${vocab.length})`);
      } else {
        pass('VOC-01', `vocab has ${vocab.length} items`);
      }

      // VOC-02: Each item must have SRS-required fields
      const srsFields = ['word', 'definition_en', 'definition_vi'];
      let vocFieldErrors = 0;
      vocab.forEach((item, idx) => {
        srsFields.forEach(field => {
          if (!item[field] || typeof item[field] !== 'string' || item[field].trim() === '') {
            vocFieldErrors++;
            if (vocFieldErrors <= 5) {
              fail('VOC-02', `vocab[${idx}] missing or empty "${field}" (required for SRS flashcard)`);
            }
          }
        });
      });
      if (vocFieldErrors === 0) {
        pass('VOC-02', 'All vocab items have SRS-required fields (word, definition_en, definition_vi)');
      } else if (vocFieldErrors > 5) {
        console.log(`  ... (${vocFieldErrors - 5} more VOC-02 errors suppressed)`);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // CHECK GROUP 2: Inference Questions — CLIL Article Contract
  // ═══════════════════════════════════════════════════════════════
  console.log(`\n── Inference Questions Contract ──`);

  if (!readingHub) {
    fail('INF-00', 'Cannot check inference questions — reading_hub.js not loaded');
  } else {
    // Navigate to clil_article
    const clilArticle = readingHub.readingHubData?.read_explore?.clil_article
      || readingHub.readingHubData?.clil_article
      || readingHub.clil_article
      || readingHub.readingHub?.read_explore?.clil_article
      || readingHub.readingHub?.clil_article
      || null;

    if (!clilArticle) {
      if (weekNum >= INFERENCE_REQUIRED_FROM) {
        fail('INF-00', 'clil_article not found in reading_hub.js (required for inference questions)');
      } else {
        warn('INF-00', 'clil_article not found — inference questions cannot be validated');
      }
    } else {
      const inferQs = clilArticle.inference_questions;
      const minRequired = weekNum >= 113 ? INFERENCE_MIN_ITEMS_GEN3 : INFERENCE_MIN_ITEMS;

      if (!Array.isArray(inferQs) || inferQs.length === 0) {
        const msg = `inference_questions missing or empty (need ≥${minRequired} items)`;
        if (weekNum >= INFERENCE_REQUIRED_FROM) {
          fail('INF-01', msg);
        } else {
          warn('INF-01', msg + ' [transition period — not yet enforced]');
        }
      } else {
        // INF-01: Minimum count
        if (inferQs.length < minRequired) {
          const msg = `inference_questions has ${inferQs.length} items (need ≥${minRequired})`;
          if (weekNum >= INFERENCE_REQUIRED_FROM) {
            fail('INF-01', msg);
          } else {
            warn('INF-01', msg);
          }
        } else {
          pass('INF-01', `inference_questions has ${inferQs.length} items (≥${minRequired})`);
        }

        // INF-02: Type validation
        const validTypes = ['mcq_with_evidence', 'open_response'];
        inferQs.forEach((q, idx) => {
          if (!q.id || !q.text || !q.type) {
            fail('INF-02', `inference_questions[${idx}] missing required field (id, text, or type)`);
            return;
          }
          if (!q.id.startsWith('infer_')) {
            fail('INF-02', `inference_questions[${idx}].id must start with "infer_" (got "${q.id}")`);
          }
          if (!validTypes.includes(q.type)) {
            fail('INF-02', `inference_questions[${idx}].type invalid: "${q.type}" (expected: ${validTypes.join('|')})`);
          }
        });
        if (!inferQs.some(q => errors > 0)) {
          // Check for type not already reported
        }

        // INF-03: MCQ validation
        const mcqs = inferQs.filter(q => q.type === 'mcq_with_evidence');
        mcqs.forEach((q, idx) => {
          if (!Array.isArray(q.options) || q.options.length < 3) {
            fail('INF-03', `MCQ "${q.id}" needs ≥3 options (found ${q.options?.length || 0})`);
          }
          if (typeof q.correct !== 'number' || q.correct < 0 || q.correct >= (q.options?.length || 0)) {
            fail('INF-03', `MCQ "${q.id}" has invalid correct index: ${q.correct}`);
          }
        });
        if (mcqs.length > 0 && mcqs.every(q => Array.isArray(q.options) && q.options.length >= 3 && typeof q.correct === 'number')) {
          pass('INF-03', `${mcqs.length} MCQ question(s) have valid options and correct index`);
        }

        // INF-04: Open response validation
        const openQs = inferQs.filter(q => q.type === 'open_response');
        openQs.forEach(q => {
          if (!q.modelAnswer || typeof q.modelAnswer !== 'string' || q.modelAnswer.trim() === '') {
            fail('INF-04', `open_response "${q.id}" missing modelAnswer`);
          }
          if (!Array.isArray(q.acceptableKeywords) || q.acceptableKeywords.length === 0) {
            fail('INF-04', `open_response "${q.id}" missing acceptableKeywords[]`);
          }
        });
        if (openQs.length > 0 && openQs.every(q => q.modelAnswer && Array.isArray(q.acceptableKeywords) && q.acceptableKeywords.length > 0)) {
          pass('INF-04', `${openQs.length} open_response question(s) have modelAnswer + keywords`);
        }
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // CHECK GROUP 3: Story Retell Scaffolding (chips[])
  // ═══════════════════════════════════════════════════════════════
  console.log(`\n── Story Retell Scaffolding ──`);

  if (readingHub) {
    const retell = readingHub.readingHubData?.retellData
      || readingHub.retellData
      || readingHub.readingHub?.retellData
      || null;

    if (!retell || !retell.questions || !Array.isArray(retell.questions)) {
      warn('SCF-01', 'retellData.questions not found — scaffolding chips cannot be validated');
    } else {
      const questionsWithChips = retell.questions.filter(q => Array.isArray(q.chips) && q.chips.length > 0);
      const totalQs = retell.questions.length;
      
      if (questionsWithChips.length === 0) {
        warn('SCF-01', `No retell questions have chips[] — "chunks" scaffold mode will show empty content`);
      } else if (questionsWithChips.length < totalQs) {
        warn('SCF-01', `${questionsWithChips.length}/${totalQs} retell questions have chips[] — partial scaffold coverage`);
      } else {
        pass('SCF-01', `All ${totalQs} retell questions have chips[] for scaffold modes`);
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // CHECK GROUP 4: Hub File Existence
  // ═══════════════════════════════════════════════════════════════
  console.log(`\n── Hub File Existence ──`);

  const requiredHubs = ['reading_hub.js', 'listening_hub.js', 'writing_hub.js', 'speaking_hub.js'];
  requiredHubs.forEach(hub => {
    const hubPath = path.join(WEEKS_DIR, hub);
    if (fs.existsSync(hubPath)) {
      pass('HUB-01', `${hub} exists`);
    } else {
      fail('HUB-01', `${hub} not found`);
    }
  });

  // ═══════════════════════════════════════════════════════════════
  // SUMMARY
  // ═══════════════════════════════════════════════════════════════
  console.log(`\n========================================================================`);
  if (errors === 0 && warnings === 0) {
    console.log(`✅ GATE 18 PASSED — Week ${weekNum}: 5-feature compliance verified (0 errors, 0 warnings)`);
  } else if (errors === 0) {
    console.log(`🟡 GATE 18 PASSED WITH WARNINGS — Week ${weekNum}: ${warnings} warning(s), 0 errors`);
  } else {
    console.log(`❌ GATE 18 FAILED — Week ${weekNum}: ${errors} error(s), ${warnings} warning(s)`);
  }
  console.log(`========================================================================\n`);

  process.exit(errors > 0 ? 1 : 0);
}

runChecks().catch(err => {
  console.error('Gate 18 crashed:', err);
  process.exit(2);
});
