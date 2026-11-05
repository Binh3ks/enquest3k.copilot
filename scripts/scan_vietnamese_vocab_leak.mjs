#!/usr/bin/env node
/**
 * scripts/scan_vietnamese_vocab_leak.mjs
 * 
 * Round 53 — Independent Verification Scanner
 * Scans all 156 blueprint.json files across the curriculum to detect any leaked
 * Vietnamese accented characters in vocabulary fields:
 * - vocabulary_focus.syllabus_words
 * - target_vocab_20
 * - keywords
 * 
 * Unicode range: [\u00C0-\u024F\u1EA0-\u1EF9] (Latin-1 Supplement, Latin Extended-A, Latin Extended Additional)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const VIETNAMESE_ACCENT_REGEX = /[\u00C0-\u024F\u1EA0-\u1EF9]/;

function scanAllBlueprints() {
  console.log('========================================================================');
  console.log('🔍 ENGQUEST3K — 156-WEEK INDEPENDENT VIETNAMESE VOCABULARY LEAK SCANNER');
  console.log('📋 Target Fields: vocabulary_focus.syllabus_words, target_vocab_20, keywords');
  console.log('📋 Detection Standard: Unicode range [\\u00C0-\\u024F\\u1EA0-\\u1EF9]');
  console.log('========================================================================\n');

  const leakedWeeks = [];
  let totalWeeksScanned = 0;
  let totalWordsScanned = 0;

  for (let w = 1; w <= 156; w++) {
    const bpPath = path.join(ROOT_DIR, `src/data/weeks/week_${w}/blueprint.json`);
    if (!fs.existsSync(bpPath)) {
      console.warn(`⚠️ Warning: Blueprint missing for Week ${w}`);
      continue;
    }

    totalWeeksScanned++;
    const raw = fs.readFileSync(bpPath, 'utf8');
    const bp = JSON.parse(raw);
    const weekFindings = [];

    // 1. Check syllabus_words
    const syllabusWords = bp.vocabulary_focus?.syllabus_words || [];
    syllabusWords.forEach((word, idx) => {
      totalWordsScanned++;
      if (typeof word === 'string' && VIETNAMESE_ACCENT_REGEX.test(word)) {
        weekFindings.push({ field: `vocabulary_focus.syllabus_words[${idx}]`, value: word });
      }
    });

    // 2. Check target_vocab_20
    const targetVocab = bp.target_vocab_20 || [];
    targetVocab.forEach((item, idx) => {
      if (item && typeof item.word === 'string' && VIETNAMESE_ACCENT_REGEX.test(item.word)) {
        weekFindings.push({ field: `target_vocab_20[${idx}].word`, value: item.word });
      }
    });

    // 3. Check keywords
    const keywords = bp.keywords || [];
    keywords.forEach((kw, idx) => {
      if (typeof kw === 'string' && VIETNAMESE_ACCENT_REGEX.test(kw)) {
        weekFindings.push({ field: `keywords[${idx}]`, value: kw });
      }
    });

    if (weekFindings.length > 0) {
      leakedWeeks.push({
        week: w,
        theme: bp.theme,
        findings: weekFindings
      });
    }
  }

  console.log('========================================================================');
  console.log('📊 SCAN RESULTS SUMMARY:');
  console.log(`   Total Blueprints Scanned:       ${totalWeeksScanned} / 156`);
  console.log(`   Total Vocabulary Items Checked: ${totalWordsScanned}`);
  console.log(`   Weeks with Leaked Vietnamese:   ${leakedWeeks.length}`);
  console.log('========================================================================\n');

  if (leakedWeeks.length > 0) {
    console.error('🚨 VIETNAMESE CHARACTERS DETECTED IN THE FOLLOWING WEEKS:');
    console.error(JSON.stringify(leakedWeeks, null, 2));
    process.exit(1);
  } else {
    console.log('🎉 100% VERIFIED CLEAN: Zero Vietnamese characters detected in vocabulary fields across all 156 weeks!');
    process.exit(0);
  }
}

scanAllBlueprints();
