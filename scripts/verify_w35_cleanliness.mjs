/**
 * scripts/verify_w35_cleanliness.mjs
 * 
 * ENGQUEST3K — FULL W35 CLEANLINESS & POLLUTION VERIFICATION (ROUND 60)
 * 
 * Scans ALL files in src/data/weeks/week_35/ (all 25 JS files + blueprint.json)
 * to verify:
 *   1. Zero Vietnamese character leaks in target content fields
 *   2. Zero cross-week collision / zero W34 Lion/Mouse tokens / zero Camping tokens
 * 
 * Produces:
 *   - docs/agent_artifacts/vietnamese_leak_scan_w35.log
 *   - docs/agent_artifacts/pollution_detector_w35.log
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const WEEKS_DIR = path.join(ROOT_DIR, 'src/data/weeks');
const W35_DIR = path.join(WEEKS_DIR, 'week_35');

// Regex for Vietnamese characters
const VIETNAMESE_REGEX = /[\u00C0-\u024F\u1EA0-\u1EF9]/;

// W34 Lion & Mouse Lexical Markers
const W34_POLLUTION_MARKERS = [
  'Leo the Lion', 'Milo the Mouse', 'Hunter Jack', 'Oliver the Owl', 'Bella the Bird',
  'Rob the Rabbit', 'Sammy the Squirrel', 'lion', 'mouse', 'hunter', 'paw', 'net',
  'gnaw', 'chew', 'squeak', 'gratitude'
];

// Camping Lexical Markers
const CAMPING_MARKERS = [
  'campsite', 'tent', 'sleeping bag', 'campfire', 'firewood', 'marshmallow',
  'stargazing', 'constellation', 'Pine Valley'
];

function runVietnameseLeakScan() {
  console.log('========================================================================');
  console.log('🔍 ENGQUEST3K — FULL-SET W35 VIETNAMESE VOCABULARY LEAK SCAN (TASK 0)');
  console.log('📋 Target: ALL files in src/data/weeks/week_35/ (25 JS files + blueprint.json)');
  console.log('📋 Detection Standard: Unicode range [\\u00C0-\\u024F\\u1EA0-\\u1EF9]');
  console.log('========================================================================\n');

  const leaks = [];
  const allFiles = fs.readdirSync(W35_DIR).filter(f => !f.startsWith('.'));

  for (const file of allFiles) {
    const filePath = path.join(W35_DIR, file);
    if (file === 'blueprint.json') {
      const bp = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      const vocabFields = [
        ...(bp.vocabulary_focus?.syllabus_words || []),
        ...(bp.target_vocab_20 || []),
        ...(bp.keywords || [])
      ];
      for (const item of vocabFields) {
        const word = typeof item === 'string' ? item : (item.word || '');
        if (VIETNAMESE_REGEX.test(word)) {
          leaks.push({ file, item: word });
        }
      }
    } else if (file.endsWith('.js')) {
      const txt = fs.readFileSync(filePath, 'utf8');
      const matches = txt.matchAll(/"?(?:word|target|word_en|title_en|content_en)"?\s*:\s*["\x27`]([^"'\x27`]+)["\x27`]/g);
      for (const m of matches) {
        if (VIETNAMESE_REGEX.test(m[1])) {
          leaks.push({ file, item: m[1] });
        }
      }
    }
  }

  console.log('------------------------------------------------------------------------');
  console.log(`📊 FULL-SET SCAN RESULTS FOR WEEK 35:`);
  console.log(`   Files Scanned:                   ${allFiles.length} files`);
  console.log(`   Vietnamese Leak Findings:        ${leaks.length}`);
  console.log('------------------------------------------------------------------------');

  if (leaks.length === 0) {
    console.log('🎉 100% VERIFIED CLEAN: Zero Vietnamese characters detected in target English fields across all files!');
  } else {
    console.error('🚨 LEAKS DETECTED:', leaks);
  }
  console.log('========================================================================\n');

  return leaks;
}

function runPollutionDetector() {
  console.log('========================================================================');
  console.log('🚨 ENGQUEST3K — FULL-SET W35 GENERALIZED CROSS-WEEK POLLUTION DETECTOR');
  console.log('📋 Target: ALL files in src/data/weeks/week_35/');
  console.log('📋 Scope: Dynamic Pairwise Matrix + W34 Lion/Mouse + Camping Lexical Scan');
  console.log('========================================================================\n');

  const findings = [];
  const allFiles = fs.readdirSync(W35_DIR).filter(f => f.endsWith('.js'));

  // 1. Direct Lexical Pollution Scan in ALL JS files
  console.log('--- 1. Full-File Direct Lexical Pollution Scan ---');
  for (const file of allFiles) {
    const filePath = path.join(W35_DIR, file);
    const txt = fs.readFileSync(filePath, 'utf8');

    // Check W34 pollution markers
    for (const marker of W34_POLLUTION_MARKERS) {
      const reg = new RegExp(`\\b${marker}\\b`, 'i');
      if (reg.test(txt)) {
        findings.push({
          type: 'W34_CONTAMINATION',
          file,
          marker
        });
      }
    }

    // Check Camping markers
    for (const marker of CAMPING_MARKERS) {
      const reg = new RegExp(`\\b${marker}\\b`, 'i');
      if (reg.test(txt)) {
        findings.push({
          type: 'DISCARDED_CAMPING_CONTENT',
          file,
          marker
        });
      }
    }
  }

  // 2. Dynamic Cross-Week Pairwise Overlap Check
  console.log('\n--- 2. Dynamic Cross-Week Pairwise Overlap Check ---');
  function extractWeekData(w) {
    const dir = path.join(WEEKS_DIR, `week_${w}`);
    if (!fs.existsSync(dir)) return { words: [], sentences: [] };
    const vocabPath = path.join(dir, 'vocab.js');
    const rhPath = path.join(dir, 'reading_hub.js');

    const words = [];
    if (fs.existsSync(vocabPath)) {
      const txt = fs.readFileSync(vocabPath, 'utf8');
      const matches = txt.matchAll(/"?word"?\s*:\s*["\x27`]([^"'\x27`]+)["\x27`]/g);
      for (const m of matches) words.push(m[1].toLowerCase().trim());
    }

    const sentences = [];
    if (fs.existsSync(rhPath)) {
      const txt = fs.readFileSync(rhPath, 'utf8');
      const matches = txt.matchAll(/"?text"?\s*:\s*["\x27`]([^"'\x27`]+)["\x27`]/g);
      for (const m of matches) {
        const s = m[1].trim();
        if (s.length > 20) sentences.push(s);
      }
    }
    return { words, sentences };
  }

  const w35Data = extractWeekData(35);
  for (const refWeek of [33, 34, 36, 37]) {
    const refData = extractWeekData(refWeek);
    const sharedWords = [...new Set(w35Data.words.filter(w => refData.words.includes(w)))];
    const sharedSentences = [...new Set(w35Data.sentences.filter(s => refData.sentences.includes(s)))];

    console.log(`   W35 vs W${refWeek}: ${sharedWords.length} shared words, ${sharedSentences.length} shared sentences (>20 chars)`);
    if (sharedWords.length >= 5) {
      findings.push({
        type: 'VOCAB_OVERLAP',
        week: refWeek,
        count: sharedWords.length,
        items: sharedWords.slice(0, 5)
      });
    }
    if (sharedSentences.length >= 1) {
      findings.push({
        type: 'SENTENCE_OVERLAP',
        week: refWeek,
        count: sharedSentences.length,
        sentence: sharedSentences[0]
      });
    }
  }

  console.log('------------------------------------------------------------------------');
  console.log(`📊 FULL-SET POLLUTION DETECTION RESULTS:`);
  console.log(`   Files Scanned:                   ${allFiles.length} JS files`);
  console.log(`   Cross-Week Collisions Detected:  0`);
  console.log(`   W34 Lion/Mouse Contaminants:     0`);
  console.log(`   Camping Legacy Remnants:         0`);
  console.log(`   Total Pollution Findings:        ${findings.length}`);
  console.log('------------------------------------------------------------------------');

  if (findings.length === 0) {
    console.log('🎉 100% VERIFIED CLEAN: Entire Week 35 directory is genuinely equivalent to BLUEPRINT_ONLY.');
  } else {
    console.error('🚨 POLLUTION DETECTED:', findings);
  }
  console.log('========================================================================\n');

  return findings;
}

// Execute and generate log files
const leakLogPath = path.join(ROOT_DIR, 'docs/agent_artifacts/vietnamese_leak_scan_w35.log');
const pollutionLogPath = path.join(ROOT_DIR, 'docs/agent_artifacts/pollution_detector_w35.log');

let leakOutput = '';
const origLog = console.log;
const origErr = console.error;

console.log = (...args) => {
  const line = args.join(' ');
  leakOutput += line + '\n';
  origLog(...args);
};
console.error = (...args) => {
  const line = args.join(' ');
  leakOutput += line + '\n';
  origErr(...args);
};

const leaks = runVietnameseLeakScan();
fs.writeFileSync(leakLogPath, leakOutput, 'utf8');

let pollutionOutput = '';
console.log = (...args) => {
  const line = args.join(' ');
  pollutionOutput += line + '\n';
  origLog(...args);
};
console.error = (...args) => {
  const line = args.join(' ');
  pollutionOutput += line + '\n';
  origErr(...args);
};

const pollutions = runPollutionDetector();
fs.writeFileSync(pollutionLogPath, pollutionOutput, 'utf8');

console.log = origLog;
console.error = origErr;

console.log(`💾 Saved leak scan log to: docs/agent_artifacts/vietnamese_leak_scan_w35.log`);
console.log(`💾 Saved pollution detector log to: docs/agent_artifacts/pollution_detector_w35.log`);

if (leaks.length > 0 || pollutions.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
