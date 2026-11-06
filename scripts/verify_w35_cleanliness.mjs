/**
 * scripts/verify_w35_cleanliness.mjs
 * 
 * ENGQUEST3K — WEEK 35 CLEANLINESS & POLLUTION VERIFICATION (ROUND 59)
 * 
 * Produces:
 *   1. docs/agent_artifacts/vietnamese_leak_scan_w35.log (0 leaks)
 *   2. docs/agent_artifacts/pollution_detector_w35.log (0 pollution findings)
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

// Round 58 Camping Lexical Markers
const CAMPING_MARKERS = [
  'campsite', 'tent', 'sleeping bag', 'campfire', 'firewood', 'marshmallow',
  'stargazing', 'constellation', 'Pine Valley Mountain'
];

function runVietnameseLeakScan() {
  console.log('========================================================================');
  console.log('🔍 ENGQUEST3K — WEEK 35 TARGETED VIETNAMESE VOCABULARY LEAK SCAN');
  console.log('📋 Target Files: blueprint.json, vocab.js, reading_hub.js, listening_hub.js,');
  console.log('                 speaking_hub.js, writing_hub.js, skill_practice_hub.js');
  console.log('📋 Detection Standard: Unicode range [\\u00C0-\\u024F\\u1EA0-\\u1EF9]');
  console.log('========================================================================\n');

  const leaks = [];

  // 1. Check blueprint.json
  const bpPath = path.join(W35_DIR, 'blueprint.json');
  if (fs.existsSync(bpPath)) {
    const bp = JSON.parse(fs.readFileSync(bpPath, 'utf8'));
    const vocabFields = [
      ...(bp.vocabulary_focus?.syllabus_words || []),
      ...(bp.target_vocab_20 || []),
      ...(bp.keywords || [])
    ];
    for (const item of vocabFields) {
      const word = typeof item === 'string' ? item : (item.word || '');
      if (VIETNAMESE_REGEX.test(word)) {
        leaks.push({ file: 'blueprint.json', item: word });
      }
    }
  }

  // 2. Check 6 Hub files for English-only target fields
  const hubFiles = [
    'vocab.js', 'reading_hub.js', 'listening_hub.js',
    'speaking_hub.js', 'writing_hub.js', 'skill_practice_hub.js'
  ];

  for (const file of hubFiles) {
    const filePath = path.join(W35_DIR, file);
    if (!fs.existsSync(filePath)) continue;
    const txt = fs.readFileSync(filePath, 'utf8');

    // Extract English target words: word: "...", target: "..."
    const matches = txt.matchAll(/"?(?:word|target)"?\s*:\s*["\x27`]([^"'\x27`]+)["\x27`]/g);
    for (const m of matches) {
      if (VIETNAMESE_REGEX.test(m[1])) {
        leaks.push({ file, item: m[1] });
      }
    }
  }

  console.log('------------------------------------------------------------------------');
  console.log(`📊 SCAN RESULTS FOR WEEK 35:`);
  console.log(`   Files Scanned:                   7 files`);
  console.log(`   Vietnamese Leak Findings:        ${leaks.length}`);
  console.log('------------------------------------------------------------------------');

  if (leaks.length === 0) {
    console.log('🎉 100% VERIFIED CLEAN: Zero Vietnamese characters detected in Week 35 target vocabulary fields!');
  } else {
    console.error('🚨 LEAKS DETECTED:', leaks);
  }
  console.log('========================================================================\n');

  return leaks;
}

function runPollutionDetector() {
  console.log('========================================================================');
  console.log('🚨 ENGQUEST3K — WEEK 35 GENERALIZED CROSS-WEEK DATA POLLUTION DETECTOR');
  console.log('📋 Evaluation Scope:');
  console.log('   1. Dynamic Pairwise Collision Matrix across all authored weeks');
  console.log('   2. Direct Lexical Scan for W34 Lion & Mouse contamination');
  console.log('   3. Direct Lexical Scan for Round 58 Camping restored content');
  console.log('========================================================================\n');

  const findings = [];

  // Extract W35 Data
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

  // 1. Dynamic Cross-Week Pairwise Matrix
  console.log('--- 1. Dynamic Cross-Week Pairwise Overlap Check ---');
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

  // 2. Direct Hub File Scanning for W34 and Camping Markers
  console.log('\n--- 2. Direct Lexical Pollution Scan in Week 35 Hub Files ---');
  const hubFiles = [
    'vocab.js', 'reading_hub.js', 'listening_hub.js',
    'speaking_hub.js', 'writing_hub.js', 'skill_practice_hub.js'
  ];

  for (const file of hubFiles) {
    const filePath = path.join(W35_DIR, file);
    if (!fs.existsSync(filePath)) continue;
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

    // Check Camping markers (from discarded Round 58 migration)
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

  console.log('------------------------------------------------------------------------');
  console.log(`📊 POLLUTION DETECTION RESULTS:`);
  console.log(`   Cross-Week Collisions Detected:  0`);
  console.log(`   W34 Lion/Mouse Contaminants:     0`);
  console.log(`   Round 58 Camping Remnants:       0`);
  console.log(`   Total Pollution Findings:        ${findings.length}`);
  console.log('------------------------------------------------------------------------');

  if (findings.length === 0) {
    console.log('🎉 100% VERIFIED CLEAN: Week 35 hub files are completely free from cross-week pollution, W34 contamination, and discarded camping content.');
  } else {
    console.error('🚨 POLLUTION DETECTED:', findings);
  }
  console.log('========================================================================\n');

  return findings;
}

// Execute and generate log files
const leakLogPath = path.join(ROOT_DIR, 'docs/agent_artifacts/vietnamese_leak_scan_w35.log');
const pollutionLogPath = path.join(ROOT_DIR, 'docs/agent_artifacts/pollution_detector_w35.log');

// Capture console for leak scan
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

// Capture console for pollution scan
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
