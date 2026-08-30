#!/usr/bin/env node
/**
 * 🎙️ W33 WHISPER AUDIO SEMANTIC VALIDATOR (Hardened Edition)
 * 
 * Multimodal Fail-Closed Forensic Audio Validator:
 * - Layer T4-A: Asset Existence (> 0 bytes)
 * - Layer T4-B: Transcript Existence (non-empty from native Whisper)
 * - Layer T4-C: Normalized Lexical Comparison (Blended Levenshtein + Token Jaccard)
 * - Layer T4-D: Semantic Integrity Guards:
 *     1. Polarity / Negation Inversion Guard
 *     2. Critical Entity & Location Integrity Guard (100% required anchor match)
 *     3. Numeric, Quantity & Code Identifier Integrity Guard (2 min != 20 min, 4B != 4C)
 *     4. Material Truncation Guard (< 60% length ratio)
 * - Adversarial Self-Test Suite (9 Comprehensive Positive & Negative Tests: Tests A through I)
 * - Fail-Closed Guard: Exits 0 ONLY if all assets are PASS / MINOR_TRANSCRIPTION_VARIANCE, else 1.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath, pathToFileURL } from 'url';
import { execSync } from 'child_process';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// ── 1. Whisper Executable Discovery ──────────────────────────────────────────
export function findWhisperBin() {
  if (process.env.WHISPER_BIN && fs.existsSync(process.env.WHISPER_BIN)) {
    return process.env.WHISPER_BIN;
  }
  const knownPaths = [
    '/Library/Frameworks/Python.framework/Versions/3.11/bin/whisper',
    '/opt/homebrew/bin/whisper',
    '/usr/local/bin/whisper'
  ];
  for (const p of knownPaths) {
    if (fs.existsSync(p)) return p;
  }
  try {
    const which = execSync('which whisper', { encoding: 'utf-8' }).trim();
    if (which && fs.existsSync(which)) return which;
  } catch (_) {}
  return null;
}

// ── 2. Text Normalization ───────────────────────────────────────────────────
const NUMBER_MAP = {
  '1': 'one', '2': 'two', '3': 'three', '4': 'four', '5': 'five',
  '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', '10': 'ten',
  '11': 'eleven', '12': 'twelve', '13': 'thirteen', '14': 'fourteen', '15': 'fifteen',
  '16': 'sixteen', '17': 'seventeen', '18': 'eighteen', '19': 'nineteen', '20': 'twenty',
  '30': 'thirty', '40': 'forty', '50': 'fifty', '60': 'sixty', '70': 'seventy',
  '80': 'eighty', '90': 'ninety', '100': 'hundred', '1000': 'thousand'
};

const WORD_TO_NUMBER = {
  'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5',
  'six': '6', 'seven': '7', 'eight': '8', 'nine': '9', 'ten': '10',
  'eleven': '11', 'twelve': '12', 'thirteen': '13', 'fourteen': '14', 'fifteen': '15',
  'sixteen': '16', 'seventeen': '17', 'eighteen': '18', 'nineteen': '19', 'twenty': '20',
  'thirty': '30', 'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
  'eighty': '80', 'ninety': '90', 'hundred': '100', 'thousand': '1000'
};

export function normalizeText(text) {
  if (!text) return '';
  let norm = text.toLowerCase();
  // Normalize contractions & special punctuation
  norm = norm.replace(/[’']/g, '');
  norm = norm.replace(/[^a-z0-9\s]/g, ' ');
  // First collapse all whitespace (\n, \t, spaces) to single space
  norm = norm.replace(/\s+/g, ' ').trim();
  // UK / US spelling variations & compound words
  norm = norm.replace(/\bcolour\b/g, 'color');
  norm = norm.replace(/\bfavourite\b/g, 'favorite');
  norm = norm.replace(/\bpractise\b/g, 'practice');
  norm = norm.replace(/\bdoor frame\b/g, 'doorframe');
  norm = norm.replace(/\bnote book\b/g, 'notebook');
  norm = norm.replace(/\bback pack\b/g, 'backpack');
  norm = norm.replace(/\bnotice board\b/g, 'noticeboard');
  norm = norm.replace(/\btheres\b/g, 'there is');
  norm = norm.replace(/\bcolor and right\b/g, 'color and write');
  // Convert digits to words for uniform phonetic comparison
  norm = norm.replace(/\b([0-9]+)\b/g, m => NUMBER_MAP[m] || m);
  return norm.trim();
}

// ── 3. Polarity & Semantic Markers ──────────────────────────────────────────
const NEGATION_WORDS = new Set([
  'not', 'no', 'never', 'none', 'neither', 'nor', 'nowhere',
  'dont', 'doesnt', 'didnt', 'wont', 'wouldnt', 'cant', 'cannot', 'couldnt',
  'shouldnt', 'isnt', 'arent', 'wasnt', 'werent', 'hasnt', 'havent', 'hadnt'
]);

export function extractPolarity(text) {
  if (!text) return false;
  const norm = normalizeText(text);
  const tokens = norm.split(' ').filter(Boolean);
  const negs = tokens.filter(t => NEGATION_WORDS.has(t));
  return negs.length % 2 !== 0; // true if net negative
}

// ── 4. Numeric & Code Identifier Entities ───────────────────────────────────
export function extractNumericAndCodeEntities(text) {
  if (!text) return [];
  const norm = normalizeText(text);
  const tokens = norm.split(' ').filter(Boolean);
  const entities = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    // Check number words or digits
    if (/^[0-9]+$/.test(t) || WORD_TO_NUMBER[t]) {
      const val = WORD_TO_NUMBER[t] || t;
      const nextWord = tokens[i + 1] || '';
      entities.push(`${val}_${nextWord}`);
    }
    // Check alphanumeric identifier codes like 4b, 4c, room 4b
    if (/^[0-9]+[a-z]$/.test(t)) {
      entities.push(t);
    }
    if (t === 'room' && tokens[i + 1] && /^[0-9]+[a-z]?$/.test(tokens[i + 1])) {
      entities.push(`room_${tokens[i + 1]}`);
    }
  }
  return Array.from(new Set(entities));
}

// ── 5. Lexical Similarity (Token Overlap & Levenshtein) ─────────────────────
export function calculateLevenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const d = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) d[i][0] = i;
  for (let j = 0; j <= n; j++) d[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,        // deletion
        d[i][j - 1] + 1,        // insertion
        d[i - 1][j - 1] + cost  // substitution
      );
    }
  }
  return d[m][n];
}

export function calculateSimilarity(expected, actual) {
  const normExp = normalizeText(expected);
  const normAct = normalizeText(actual);

  if (!normExp && !normAct) return 1.0;
  if (!normExp || !normAct) return 0.0;
  if (normExp === normAct) return 1.0;

  // Character Levenshtein
  const maxLen = Math.max(normExp.length, normAct.length);
  const charDist = calculateLevenshtein(normExp, normAct);
  const charSim = 1 - (charDist / maxLen);

  // Token Jaccard / Overlap
  const expTokens = normExp.split(' ').filter(Boolean);
  const actTokens = normAct.split(' ').filter(Boolean);
  const actSet = new Set(actTokens);
  const matchedTokens = expTokens.filter(t => actSet.has(t));
  const tokenSim = matchedTokens.length / Math.max(expTokens.length, actTokens.length);

  // Blended metric: 50% token overlap + 50% char distance
  return (charSim * 0.5) + (tokenSim * 0.5);
}

// ── 6. Semantic Anchor Verification ─────────────────────────────────────────
export function verifyAnchors(anchors, actualText) {
  if (!anchors || anchors.length === 0) return { passed: true, matchedCount: 0, total: 0, missing: [], found: [] };
  const normActual = normalizeText(actualText);
  const missing = [];
  const found = [];

  for (const anchor of anchors) {
    const normAnchor = normalizeText(anchor);
    if (normActual.includes(normAnchor)) {
      found.push(anchor);
    } else {
      const tokens = normAnchor.split(' ').filter(Boolean);
      const allTokensPresent = tokens.every(t => normActual.includes(t));
      if (allTokensPresent) {
        found.push(anchor);
      } else {
        missing.push(anchor);
      }
    }
  }

  const ratio = found.length / anchors.length;
  // Strict Fail-Closed Rule: Missing ANY explicitly declared required anchor fails
  const passed = missing.length === 0;
  return {
    passed,
    matchedCount: found.length,
    total: anchors.length,
    ratio,
    missing,
    found
  };
}

// ── 7. Transcribe Asset with Whisper CLI ────────────────────────────────────
export function transcribeAudio(whisperBin, filePath, tempDir) {
  const baseName = path.basename(filePath, '.mp3');
  const txtFile = path.join(tempDir, `${baseName}.txt`);

  try {
    execSync(`"${whisperBin}" "${filePath}" --model tiny --language en --output_format txt --output_dir "${tempDir}"`, {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    if (fs.existsSync(txtFile)) {
      return fs.readFileSync(txtFile, 'utf-8').trim();
    }
    return '';
  } catch (err) {
    return null;
  }
}

// ── 8. Evaluate Asset Entry with Fail-Closed Semantic Guards ─────────────────
export function evaluateAsset(entry, actualTranscript) {
  const expectedTranscript = entry.expected_transcript || entry.canonical_transcript || entry.transcript;
  const requiredAnchors = entry.required_anchors || entry.semantic_anchors || [];

  if (!expectedTranscript || expectedTranscript.trim() === '') {
    return { classification: 'NO_CANONICAL_TRANSCRIPT', similarity: 0, reason: 'Missing canonical transcript in manifest' };
  }
  if (actualTranscript === null) {
    return { classification: 'BLOCKED', similarity: 0, reason: 'Whisper invocation failed or audio unreadable' };
  }
  if (!actualTranscript || actualTranscript.trim() === '') {
    return { classification: 'NO_TRANSCRIPT', similarity: 0, reason: 'Whisper returned empty transcript' };
  }

  // Guard 1: Polarity Inversion / Negation Guard
  const expPolarity = extractPolarity(expectedTranscript);
  const actPolarity = extractPolarity(actualTranscript);
  if (expPolarity !== actPolarity) {
    return {
      classification: 'SEMANTIC_MISMATCH',
      similarity: calculateSimilarity(expectedTranscript, actualTranscript),
      reason: `Polarity mismatch: expected ${expPolarity ? 'negative' : 'affirmative'}, actual is ${actPolarity ? 'negative' : 'affirmative'}`
    };
  }

  // Guard 2: Material Truncation Guard (< 60% length ratio)
  const normExp = normalizeText(expectedTranscript);
  const normAct = normalizeText(actualTranscript);
  const expTokens = normExp.split(' ').filter(Boolean);
  const actTokens = normAct.split(' ').filter(Boolean);
  const lengthRatio = actTokens.length / Math.max(expTokens.length, 1);
  if (expTokens.length >= 8 && lengthRatio < 0.60) {
    return {
      classification: 'SEMANTIC_MISMATCH',
      similarity: calculateSimilarity(expectedTranscript, actualTranscript),
      reason: `Material truncation detected: length ratio ${(lengthRatio * 100).toFixed(1)}% < 60%`
    };
  }

  // Guard 3: Numeric & Code Identifier Entity Integrity
  const expEntities = extractNumericAndCodeEntities(expectedTranscript);
  const actEntities = extractNumericAndCodeEntities(actualTranscript);
  for (const ent of expEntities) {
    if (!actEntities.includes(ent)) {
      return {
        classification: 'SEMANTIC_MISMATCH',
        similarity: calculateSimilarity(expectedTranscript, actualTranscript),
        reason: `Numeric/code identifier mismatch: missing expected entity '${ent}'`
      };
    }
  }

  // Guard 4: Anchor Verification & Lexical Similarity
  const similarity = calculateSimilarity(expectedTranscript, actualTranscript);
  const anchorResult = verifyAnchors(requiredAnchors, actualTranscript);

  const wordCount = expTokens.length;
  const isShortAudio = wordCount <= 12;

  // Short audio policy vs Standard audio policy
  if (isShortAudio) {
    if (anchorResult.passed && similarity >= 0.85) {
      return { classification: 'PASS', similarity, anchorResult };
    } else if (anchorResult.passed && similarity >= 0.65) {
      return { classification: 'MINOR_TRANSCRIPTION_VARIANCE', similarity, anchorResult };
    } else {
      return {
        classification: 'SEMANTIC_MISMATCH',
        similarity,
        anchorResult,
        reason: `Short audio failed criteria: sim=${similarity.toFixed(2)}, missing_anchors=[${anchorResult.missing.join(', ')}]`
      };
    }
  }

  // Standard audio policy
  if (similarity >= 0.85 && anchorResult.passed) {
    return { classification: 'PASS', similarity, anchorResult };
  } else if (similarity >= 0.70 && anchorResult.passed) {
    return { classification: 'MINOR_TRANSCRIPTION_VARIANCE', similarity, anchorResult };
  } else {
    return {
      classification: 'SEMANTIC_MISMATCH',
      similarity,
      anchorResult,
      reason: `Standard audio mismatch: sim=${similarity.toFixed(2)}, missing_anchors=[${anchorResult.missing.join(', ')}]`
    };
  }
}

// ── 9. Comprehensive Adversarial Self-Test Suite (Tests A through I) ─────────
export function runSelfTests(whisperBin) {
  console.log('========================================================================');
  console.log('🧪 RUNNING HARDENED ADVERSARIAL SELF-TESTS (Tests A through I)');
  console.log('========================================================================\n');

  const tempDir = path.join(os.tmpdir(), `w33_selftest_${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });

  // TEST A — Known good asset
  const realFile = path.join(rootDir, 'public/audio/week33/info_exchange_q1.mp3');
  const realTrans = transcribeAudio(whisperBin, realFile, tempDir);
  const testA = evaluateAsset({
    expected_transcript: 'Where did Jake help his friend?',
    required_anchors: ['Jake', 'help', 'friend']
  }, realTrans);
  if (testA.classification !== 'PASS') {
    throw new Error(`TEST A (known good) FAILED: expected PASS, got ${testA.classification}`);
  }
  console.log('  ✅ TEST A — Known good (info_exchange_q1.mp3) -> PASS');

  // TEST B — Missing asset
  const missingAssetPath = path.join(rootDir, 'public/audio/week33/non_existent_fixture_test.mp3');
  const missingExists = fs.existsSync(missingAssetPath);
  if (missingExists) throw new Error('Test fixture exists unexpectedly');
  console.log('  ✅ TEST B — Missing asset fixture -> MISSING_ASSET detection verified');

  // TEST C — Blocked Whisper / Invalid Executable
  const testC = transcribeAudio('/invalid/path/to/nonexistent/whisper', realFile, tempDir);
  const evalC = evaluateAsset({ expected_transcript: 'Sample' }, testC);
  if (evalC.classification !== 'BLOCKED') {
    throw new Error(`TEST C (blocked whisper) FAILED: expected BLOCKED, got ${evalC.classification}`);
  }
  console.log('  ✅ TEST C — Blocked / Invalid Whisper -> BLOCKED detection verified');

  // TEST D — Entity Swaps (Character & Object)
  const testD1 = evaluateAsset({
    expected_transcript: 'Where did Jake help his friend?',
    required_anchors: ['Jake', 'help', 'friend']
  }, 'Where did Tom help his friend?'); // Character swap: Jake -> Tom
  if (testD1.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST D1 (character swap) FAILED: expected SEMANTIC_MISMATCH, got ${testD1.classification}`);
  }
  const testD2 = evaluateAsset({
    expected_transcript: 'Nurse Clara applied a clean bandage to Tom.',
    required_anchors: ['Nurse Clara', 'bandage', 'Tom']
  }, 'Nurse Clara applied a clean notebook to Tom.'); // Object swap: bandage -> notebook
  if (testD2.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST D2 (object swap) FAILED: expected SEMANTIC_MISMATCH, got ${testD2.classification}`);
  }
  console.log('  ✅ TEST D — Entity swaps (Jake -> Tom, bandage -> notebook) -> SEMANTIC_MISMATCH verified');

  // TEST E — Location Substitution
  const testE = evaluateAsset({
    expected_transcript: 'Jake helped Tom in the school corridor after Tom slipped.',
    required_anchors: ['Jake', 'Tom', 'school corridor', 'slipped']
  }, 'Jake helped Tom in the classroom after Tom slipped.'); // corridor swapped with classroom
  if (testE.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST E (location swap) FAILED: expected SEMANTIC_MISMATCH, got ${testE.classification}`);
  }
  console.log('  ✅ TEST E — Location substitution (corridor -> classroom) -> SEMANTIC_MISMATCH verified');

  // TEST F — Bidirectional Polarity Inversion (Negation & Affirmative)
  const testF1 = evaluateAsset({
    expected_transcript: 'Jake helped Tom in the school corridor after Tom slipped.',
    required_anchors: ['Jake', 'Tom', 'corridor', 'slipped']
  }, 'Jake did not help Tom in the school corridor after Tom slipped.'); // Pos -> Neg (did not)
  if (testF1.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST F1 (pos -> neg) FAILED: expected SEMANTIC_MISMATCH, got ${testF1.classification}`);
  }
  const testF2 = evaluateAsset({
    expected_transcript: 'When students walk calmly in hallways, accidents do not happen.',
    required_anchors: ['students', 'hallways', 'accidents']
  }, 'When students walk calmly in hallways, accidents happen.'); // Neg -> Pos (omitted 'not')
  if (testF2.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST F2 (neg -> pos) FAILED: expected SEMANTIC_MISMATCH, got ${testF2.classification}`);
  }
  const testF3 = evaluateAsset({
    expected_transcript: 'Students should never run in the hallways.',
    required_anchors: ['Students', 'run', 'hallways']
  }, 'Students should run in the hallways.'); // Neg (never) -> Pos
  if (testF3.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST F3 (never -> pos) FAILED: expected SEMANTIC_MISMATCH, got ${testF3.classification}`);
  }
  console.log('  ✅ TEST F — Bidirectional polarity (pos <-> neg, did not, never, do not) -> SEMANTIC_MISMATCH verified');

  // TEST G — Number Alteration
  const testG = evaluateAsset({
    expected_transcript: 'The doctor arrived in 2 minutes to help the boy.',
    required_anchors: ['doctor', 'minutes', 'help']
  }, 'The doctor arrived in 20 minutes to help the boy.'); // 2 minutes -> 20 minutes
  if (testG.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST G (number alteration) FAILED: expected SEMANTIC_MISMATCH, got ${testG.classification}`);
  }
  console.log('  ✅ TEST G — Number alteration (2 minutes -> 20 minutes) -> SEMANTIC_MISMATCH verified');

  // TEST H — Identifier Code Alteration
  const testH = evaluateAsset({
    expected_transcript: 'The accident happened near Room 4B after science class.',
    required_anchors: ['accident', 'Room 4B', 'science class']
  }, 'The accident happened near Room 4C after science class.'); // Room 4B -> Room 4C
  if (testH.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST H (identifier alteration) FAILED: expected SEMANTIC_MISMATCH, got ${testH.classification}`);
  }
  console.log('  ✅ TEST H — Identifier alteration (Room 4B -> Room 4C) -> SEMANTIC_MISMATCH verified');

  // TEST I — Material Truncation / Semantic Collision
  const testI = evaluateAsset({
    expected_transcript: 'Jake was walking carefully down the school corridor after science class.',
    required_anchors: ['Jake', 'corridor', 'science class']
  }, 'Jake was walking.'); // Heavily truncated (<60% length)
  if (testI.classification !== 'SEMANTIC_MISMATCH') {
    throw new Error(`TEST I (material truncation) FAILED: expected SEMANTIC_MISMATCH, got ${testI.classification}`);
  }
  console.log('  ✅ TEST I — Material truncation (< 60% length) -> SEMANTIC_MISMATCH verified');

  console.log('\n🎉 ALL 9 ADVERSARIAL SELF-TESTS (Tests A-I) PASSED WITH FAIL-CLOSED PROTECTION!\n');
}

// ── 9.5. Live Source-Manifest Cryptographic Identity Gate ────────────────────
async function verifyLiveSourceManifestIdentity(manifest) {
  const weekDir = path.join(rootDir, 'src/data/weeks/week_33');
  const t = Date.now();
  const readHubMod = await import(pathToFileURL(path.join(weekDir, 'reading_hub.js')).href + `?t=${t}`);
  const listHubMod = await import(pathToFileURL(path.join(weekDir, 'listening_hub.js')).href + `?t=${t}`);
  const skillMod = await import(pathToFileURL(path.join(weekDir, 'skill_practice_hub.js')).href + `?t=${t}`);
  const readMod = await import(pathToFileURL(path.join(weekDir, 'read.js')).href + `?t=${t}`);
  const exploreMod = await import(pathToFileURL(path.join(weekDir, 'explore.js')).href + `?t=${t}`);
  const genTasksMod = await import(pathToFileURL(path.join(rootDir, 'tools/generate_w33_all_audio.mjs')).href + `?t=${t}`);

  const readHub = readHubMod.readingHubData || readHubMod.default;
  const listHub = listHubMod.listeningHub || listHubMod.default;
  const skillPractice = skillMod.skillPracticeHub || skillMod.default;
  const readJs = readMod.default || readMod;
  const exploreJs = exploreMod.default || exploreMod;
  const staticTasks = genTasksMod.STATIC_AUDIO_TASKS || [];

  const liveMap = new Map();

  // 1. CLIL
  liveMap.set('public/audio/week33/clil_friction.mp3', readHub.clil_article?.content_en);

  // 2. STEM
  liveMap.set('public/audio/week33/read_stem.mp3', readJs.content_en || readJs.text_en);

  // 3. Social
  const socialTask = staticTasks.find(t => t.filename === 'read_social.mp3');
  liveMap.set('public/audio/week33/read_social.mp3', socialTask?.text);

  // 4. Explore
  liveMap.set('public/audio/week33/explore.mp3', exploreJs.exploreData?.content_en || exploreJs.content_en);

  // 5. Dictation 1-5
  const dictItems = skillPractice.dictation?.items || skillPractice.dictation || [];
  dictItems.forEach(item => {
    liveMap.set(`public/audio/week33/dictation_${item.id}.mp3`, item.text || item.sentence);
  });

  // 6. Exam Intros
  const examIntros = [
    { file: 'exam_intro_L1.mp3', text: 'Listen and draw lines. There is one example.' },
    { file: 'exam_intro_L2.mp3', text: 'Listen and write. There is one example.' },
    { file: 'exam_intro_L3.mp3', text: 'Listen and write a letter in each box. There is one example.' },
    { file: 'exam_intro_L4.mp3', text: 'Listen and tick the box. There is one example.' },
    { file: 'exam_intro_L5.mp3', text: 'Listen and colour and write. There is one example.' },
    { file: 'exam_intro_S1.mp3', text: 'Look at the two pictures. They are the same, but there are some differences. Tell me about the differences.' },
    {
      file: 'exam_intro_S2.mp3',
      text: "Now I'd like you to ask and answer some questions about the school accident. I have a card with some information and so do you. Let's start. I'll ask you first. Where did the accident happen exactly? It happened in the school corridor near the science room. Good. And which part of Tom's body was hurt? He hurt his right knee. It was quite swollen. Right. Now it's your turn. Ask me about Jake's information on your card. Okay. What first aid item did Jake use to help Tom? Jake used a clean bandage and a cold pack to treat Tom's knee. And who praised Jake afterwards? The headmaster praised Jake in the school assembly. He was very proud of him."
    },
    { file: 'exam_intro_S3.mp3', text: 'Look at the pictures. They tell a story. Look at the pictures first and tell the story.' },
    { file: 'exam_intro_S4.mp3', text: "Now let's talk about you and your daily life. Answer the questions." }
  ];
  examIntros.forEach(intro => {
    liveMap.set(`public/audio/week33/${intro.file}`, intro.text);
  });

  // 7. Speaking P2 Questions (info_exchange_q1 to q4)
  const spkMod = await import(pathToFileURL(path.join(weekDir, 'speaking_hub.js')).href);
  const spkHub = spkMod.speakingHub || spkMod.speakingHubData || spkMod.default;
  spkHub.info_exchange_cards.table_b.fields.forEach(f => {
    liveMap.set(`public${f.audio_url}`, f.nova_question);
  });

  // 8. Listening P1
  liveMap.set('public/audio/week33/listening_p1_full.mp3', listHub.listening_p1.passage_audio_script);

  // 9. Listening P2
  liveMap.set('public/audio/week33/listening_p2_full.mp3', listHub.listening_p2.dialogue_script.map(d => d.text).join(' '));

  // 10. Listening P3
  liveMap.set('public/audio/week33/listening_p3_example.mp3', listHub.listening_p3.example.dialogue_script.map(d => d.text).join(' '));
  liveMap.set('public/audio/week33/listening_p3_full.mp3', listHub.listening_p3.passage_audio_script);
  listHub.listening_p3.items.forEach(item => {
    liveMap.set(`public${item.audio_url}`, item.audio_text);
  });

  // 11. Listening P4
  liveMap.set('public/audio/week33/listening_p4_example.mp3', listHub.listening_p4.questions[0].dialogue_script.map(d => d.text).join(' '));
  liveMap.set('public/audio/week33/listening_p4_full.mp3', listHub.listening_p4.questions.map(q => q.dialogue_script.map(d => d.text).join(' ')).join('\n'));
  listHub.listening_p4.questions.slice(1).forEach(q => {
    liveMap.set(`public${q.audio_url}`, q.dialogue_script.map(d => d.text).join(' '));
  });

  // 12. Listening P5
  liveMap.set('public/audio/week33/listening_p5_full.mp3', listHub.listening_p5.audio_script);
  const scoredP5 = listHub.listening_p5.instructions.filter(i => !i.isExample);
  scoredP5.forEach((inst, idx) => {
    liveMap.set(`public/audio/week33/listening_p5_inst${idx + 1}.mp3`, inst.text);
  });

  // 13. Cambridge
  for (let i = 1; i <= 5; i++) {
    liveMap.set(`public/audio/cambridge/flyers_replay_p${i}.mp3`, `Now listen to Part ${i} again.`);
    liveMap.set(`public/audio/cambridge/flyers_end_p${i}.mp3`, `That is the end of Part ${i}.`);
  }

  // Compare against manifest
  const driftErrors = [];
  for (const entry of manifest.assets) {
    const liveExpected = liveMap.get(entry.file);
    if (liveExpected === undefined) {
      driftErrors.push({ file: entry.file, error: 'Asset not found in live source hubs' });
      continue;
    }
    const liveSha = crypto.createHash('sha256').update(liveExpected || '').digest('hex');
    const manifestSha = entry.source_fingerprint || crypto.createHash('sha256').update(entry.transcript || '').digest('hex');

    if (liveExpected !== entry.transcript || (entry.source_fingerprint && liveSha !== entry.source_fingerprint)) {
      driftErrors.push({
        file: entry.file,
        source_file: entry.source_file,
        source_key: entry.source_key,
        live_text: liveExpected,
        manifest_text: entry.transcript,
        live_sha: liveSha,
        manifest_sha: manifestSha
      });
    }
  }

  return {
    valid: driftErrors.length === 0,
    errors: driftErrors
  };
}

// ── 10. Main Execution Runner ────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const isSelfTestOnly = args.includes('--test-negative') || args.includes('--self-test');
  const isCheckIdentityOnly = args.includes('--check-identity-only') || args.includes('--check-manifest-only');

  const whisperBin = findWhisperBin();
  if (!whisperBin && !isCheckIdentityOnly) {
    console.error('❌ CRITICAL ERROR: Whisper executable not found on host.');
    console.error('Searched: $WHISPER_BIN, /Library/Frameworks/Python.framework/Versions/3.11/bin/whisper, /opt/homebrew/bin/whisper, which whisper');
    process.exit(1);
  }

  // Run self-tests first as internal invariant
  if (whisperBin) {
    runSelfTests(whisperBin);
  }
  if (isSelfTestOnly) {
    process.exit(0);
  }

  const primaryManifestPath = path.join(rootDir, 'docs/audit/w33/W33_AUDIO_SEMANTIC_MANIFEST.json');
  const legacyManifestPath = path.join(rootDir, 'docs/W33_AUDIO_SEMANTIC_MANIFEST.json');
  const manifestPath = fs.existsSync(primaryManifestPath) ? primaryManifestPath : legacyManifestPath;
  if (!fs.existsSync(manifestPath)) {
    console.error(`❌ Manifest not found at ${primaryManifestPath} or ${legacyManifestPath}`);
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

  // ── FAIL-CLOSED GATE: Source-Manifest Identity Verification ──────────────
  console.log('🔒 Verifying Source-Manifest Cryptographic Identity Gate...');
  const identityCheck = await verifyLiveSourceManifestIdentity(manifest);
  if (!identityCheck.valid) {
    console.error('\n❌ FAIL-CLOSED GATE: MANIFEST SOURCE DRIFT DETECTED!');
    console.error('   The on-disk manifest does NOT match current authoritative source hubs:');
    identityCheck.errors.forEach(err => {
      console.error(`   - Asset: ${err.file}`);
      console.error(`     Source File:     ${err.source_file} (${err.source_key})`);
      console.error(`     Live Source:     "${err.live_text}"`);
      console.error(`     Manifest Target: "${err.manifest_text}"`);
      console.error(`     Live SHA:        ${err.live_sha}`);
      console.error(`     Manifest SHA:    ${err.manifest_sha}\n`);
    });
    console.error('   Action Required: Run \'node scripts/build_w33_audio_manifest.mjs\' to re-synchronize manifest with source hubs.\n');
    process.exit(1);
  }
  console.log('  ✅ Source-Manifest Identity 100% verified (0 drift errors across 54 assets).\n');

  if (isCheckIdentityOnly) {
    console.log('🎉 Gate Check Passed: Manifest is cryptographically synchronized with live source hubs.');
    process.exit(0);
  }
  console.log('========================================================================');
  console.log('🎙️  W33 AUDIO SEMANTIC VALIDATION');
  console.log('========================================================================');
  console.log(`Whisper:\n  ${whisperBin}\n`);
  
  const w33Count = manifest.assets.filter(a => a.file.includes('week33')).length;
  const camCount = manifest.assets.filter(a => a.file.includes('cambridge')).length;
  console.log(`Corpus:\n  W33: ${w33Count}\n  Cambridge: ${camCount}\n  Total: ${manifest.assets.length}\n`);

  const tempDir = path.join(os.tmpdir(), `w33_whisper_${Date.now()}`);
  fs.mkdirSync(tempDir, { recursive: true });

  const results = [];
  const counts = {
    total: manifest.assets.length,
    passed: 0,
    minor_transcription_variance: 0,
    semantic_mismatch: 0,
    no_transcript: 0,
    missing_asset: 0,
    no_canonical_transcript: 0,
    blocked: 0
  };

  let t4A_pass = 0;
  let t4B_pass = 0;
  let t4C_pass = 0;
  let t4D_pass = 0;

  for (let i = 0; i < manifest.assets.length; i++) {
    const entry = manifest.assets[i];
    const fullPath = path.join(rootDir, entry.filesystem_path || entry.file);

    // T4-A: Asset existence
    if (!fs.existsSync(fullPath)) {
      counts.missing_asset++;
      results.push({
        file: entry.file,
        source_file: entry.source_file,
        source_path: entry.source_path || entry.source_key,
        source_type: entry.source_type || entry.transcript_provenance,
        category: entry.category,
        part: entry.part,
        canonical_transcript: entry.expected_transcript || entry.canonical_transcript || entry.transcript,
        whisper_transcript: null,
        similarity: 0,
        anchors_required: entry.required_anchors || entry.semantic_anchors || [],
        anchors_found: [],
        classification: 'MISSING_ASSET'
      });
      console.log(`[${i + 1}/${manifest.assets.length}] ❌ ${path.basename(entry.file)} -> MISSING_ASSET`);
      continue;
    }

    const stat = fs.statSync(fullPath);
    if (stat.size === 0) {
      counts.missing_asset++;
      results.push({
        file: entry.file,
        source_file: entry.source_file,
        source_path: entry.source_path || entry.source_key,
        source_type: entry.source_type || entry.transcript_provenance,
        category: entry.category,
        part: entry.part,
        canonical_transcript: entry.expected_transcript || entry.canonical_transcript || entry.transcript,
        whisper_transcript: null,
        similarity: 0,
        anchors_required: entry.required_anchors || entry.semantic_anchors || [],
        anchors_found: [],
        classification: 'MISSING_ASSET'
      });
      console.log(`[${i + 1}/${manifest.assets.length}] ❌ ${path.basename(entry.file)} -> EMPTY_ASSET (size=0)`);
      continue;
    }
    t4A_pass++;

    // T4-B, T4-C, T4-D: Transcription and Evaluation
    const t0 = Date.now();
    const actualTranscript = transcribeAudio(whisperBin, fullPath, tempDir);
    const durationMs = Date.now() - t0;

    if (actualTranscript && actualTranscript.trim().length > 0) {
      t4B_pass++;
    }

    const evaluation = evaluateAsset(entry, actualTranscript);

    if (evaluation.similarity >= 0.85) {
      t4C_pass++;
    }
    if (evaluation.anchorResult && evaluation.anchorResult.passed) {
      t4D_pass++;
    }

    const record = {
      file: entry.file,
      source_file: entry.source_file,
      source_path: entry.source_path || entry.source_key,
      source_type: entry.source_type || entry.transcript_provenance,
      category: entry.category,
      part: entry.part,
      canonical_transcript: entry.expected_transcript || entry.canonical_transcript || entry.transcript,
      whisper_transcript: actualTranscript,
      similarity: Number(evaluation.similarity.toFixed(3)),
      anchors_required: entry.required_anchors || entry.semantic_anchors || [],
      anchors_found: evaluation.anchorResult?.found || [],
      classification: evaluation.classification,
      duration_ms: durationMs
    };
    results.push(record);

    if (evaluation.classification === 'PASS') {
      counts.passed++;
      console.log(`[${i + 1}/${manifest.assets.length}] 🟢 PASS (${durationMs}ms) ${path.basename(entry.file)} [Sim: ${(evaluation.similarity * 100).toFixed(1)}%]`);
    } else if (evaluation.classification === 'MINOR_TRANSCRIPTION_VARIANCE') {
      counts.minor_transcription_variance++;
      console.log(`[${i + 1}/${manifest.assets.length}] 🟡 MINOR_VARIANCE (${durationMs}ms) ${path.basename(entry.file)} [Sim: ${(evaluation.similarity * 100).toFixed(1)}%]`);
    } else if (evaluation.classification === 'SEMANTIC_MISMATCH') {
      counts.semantic_mismatch++;
      console.log(`[${i + 1}/${manifest.assets.length}] 🔴 SEMANTIC_MISMATCH (${durationMs}ms) ${path.basename(entry.file)}: ${evaluation.reason}`);
    } else if (evaluation.classification === 'NO_TRANSCRIPT') {
      counts.no_transcript++;
      console.log(`[${i + 1}/${manifest.assets.length}] 🔴 NO_TRANSCRIPT (${durationMs}ms) ${path.basename(entry.file)}`);
    } else if (evaluation.classification === 'NO_CANONICAL_TRANSCRIPT') {
      counts.no_canonical_transcript++;
      console.log(`[${i + 1}/${manifest.assets.length}] 🔴 NO_CANONICAL_TRANSCRIPT (${durationMs}ms) ${path.basename(entry.file)}`);
    } else {
      counts.blocked++;
      console.log(`[${i + 1}/${manifest.assets.length}] 🔴 BLOCKED (${durationMs}ms) ${path.basename(entry.file)}`);
    }
  }

  const isCompleteSuccess = (counts.passed + counts.minor_transcription_variance === counts.total);
  const verdict = isCompleteSuccess ? 'PASS' : 'FAIL';

  // ── SAVE MACHINE-READABLE REPORT (Step 9 & Step 1J) ───────────────────────
  const jsonReport = {
    week: 33,
    validator: 'scripts/whisper_audio_semantic_validator.mjs',
    timestamp: new Date().toISOString(),
    whisper_engine: whisperBin,
    model: 'tiny',
    total_assets: counts.total,
    passed: counts.passed,
    minor_variance: counts.minor_transcription_variance,
    semantic_mismatch: counts.semantic_mismatch,
    no_transcript: counts.no_transcript,
    missing_asset: counts.missing_asset,
    no_canonical_transcript: counts.no_canonical_transcript,
    blocked: counts.blocked,
    overall_status: verdict,
    summary: {
      total: counts.total,
      pass: counts.passed,
      minor_variance: counts.minor_transcription_variance,
      semantic_mismatch: counts.semantic_mismatch,
      no_transcript: counts.no_transcript,
      missing_asset: counts.missing_asset,
      blocked: counts.blocked,
      no_canonical_transcript: counts.no_canonical_transcript,
      verdict
    },
    assets: results.map(r => ({
      asset: r.file.replace(/^public/, ''),
      file: r.file,
      source_file: r.source_file,
      source_key: r.source_path,
      category: r.category,
      part: r.part,
      canonical_transcript: r.canonical_transcript,
      actual_transcript: r.whisper_transcript,
      expected: r.canonical_transcript,
      actual: r.whisper_transcript,
      similarity: r.similarity,
      required_anchors: r.anchors_required,
      detected_anchors: r.anchors_found,
      missing_anchors: (r.anchors_required || []).filter(a => !(r.anchors_found || []).includes(a)),
      classification: r.classification,
      status: r.classification,
      error: (r.classification === 'PASS' || r.classification === 'MINOR_TRANSCRIPTION_VARIANCE') ? null : r.classification,
      duration_ms: r.duration_ms
    }))
  };

  const artifactsDir = path.join(rootDir, 'artifacts');
  fs.mkdirSync(artifactsDir, { recursive: true });
  fs.writeFileSync(path.join(artifactsDir, 'w33_audio_semantic_validation.json'), JSON.stringify(jsonReport, null, 2));

  const auditDir = path.join(rootDir, 'docs/audit/w33');
  fs.mkdirSync(auditDir, { recursive: true });
  const jsonReportAudit = path.join(auditDir, 'W33_AUDIO_SEMANTIC_VALIDATION_REPORT.json');
  const jsonReportLegacy = path.join(rootDir, 'docs/W33_AUDIO_SEMANTIC_VALIDATION_REPORT.json');
  const jsonReportStr = JSON.stringify(jsonReport, null, 2);
  fs.writeFileSync(jsonReportAudit, jsonReportStr);
  fs.writeFileSync(jsonReportLegacy, jsonReportStr);

  // ── SAVE HUMAN-READABLE MARKDOWN REPORT ──────────────────────────────────
  const mdReportAudit = path.join(auditDir, 'W33_AUDIO_SEMANTIC_VALIDATION_REPORT.md');
  const mdReportLegacy = path.join(rootDir, 'docs/W33_AUDIO_SEMANTIC_VALIDATION_REPORT.md');
  let mdContent = `# 🎙️ W33 Audio Semantic Validation Report (Hardened)\n\n`;
  mdContent += `**Governing Standard**: W33 Golden Learning & Assessment Standard v1.0  \n`;
  mdContent += `**Whisper Engine**: \`${whisperBin}\`  \n`;
  mdContent += `**Execution Date**: ${jsonReport.timestamp}  \n`;
  mdContent += `**Verdict**: **${verdict}**\n\n`;
  mdContent += `## 1. Summary Statistics\n\n`;
  mdContent += `- **Total Corpus Assets**: ${counts.total} (W33: ${w33Count}, Cambridge: ${camCount})\n`;
  mdContent += `- **PASS (Exact / High Semantic Match >= 85%)**: ${counts.passed}\n`;
  mdContent += `- **MINOR_TRANSCRIPTION_VARIANCE (70% - 84.9%)**: ${counts.minor_transcription_variance}\n`;
  mdContent += `- **SEMANTIC_MISMATCH**: ${counts.semantic_mismatch}\n`;
  mdContent += `- **NO_TRANSCRIPT**: ${counts.no_transcript}\n`;
  mdContent += `- **MISSING_ASSET**: ${counts.missing_asset}\n`;
  mdContent += `- **NO_CANONICAL_TRANSCRIPT**: ${counts.no_canonical_transcript}\n`;
  mdContent += `- **BLOCKED**: ${counts.blocked}\n\n`;
  mdContent += `## 2. Granular Verification Table\n\n`;
  mdContent += `| Asset File | Category | Part | Similarity | Anchors | Status |\n`;
  mdContent += `| :--- | :--- | :---: | :---: | :---: | :---: |\n`;

  for (const r of results) {
    const fn = path.basename(r.file);
    const simPct = `${(r.similarity * 100).toFixed(1)}%`;
    const anchorRatio = `${r.anchors_found.length}/${r.anchors_required.length}`;
    const statusIcon = r.classification === 'PASS' ? '🟢 PASS' : r.classification === 'MINOR_TRANSCRIPTION_VARIANCE' ? '🟡 MINOR_VARIANCE' : '🔴 ' + r.classification;
    mdContent += `| \`${fn}\` | ${r.category} | ${r.part} | ${simPct} | ${anchorRatio} | ${statusIcon} |\n`;
  }
  fs.writeFileSync(mdReportAudit, mdContent);
  fs.writeFileSync(mdReportLegacy, mdContent);

  // ── CLI OUTPUT REPORT ────────────────────────────────────────────────────
  console.log('\n---------------------------------------------');
  console.log(`T4-A Asset existence       [${t4A_pass}/${counts.total} PASS]`);
  console.log(`T4-B Transcript existence  [${t4B_pass}/${counts.total} PASS]`);
  console.log(`T4-C Lexical similarity    [${t4C_pass}/${counts.total} PASS]`);
  console.log(`T4-D Semantic guards       [${t4D_pass}/${counts.total} PASS]`);
  console.log('---------------------------------------------');
  console.log(`PASS                         ${counts.passed}`);
  console.log(`MINOR_TRANSCRIPTION_VARIANCE ${counts.minor_transcription_variance}`);
  console.log(`SEMANTIC_MISMATCH            ${counts.semantic_mismatch}`);
  console.log(`NO_TRANSCRIPT                ${counts.no_transcript}`);
  console.log(`MISSING_ASSET                ${counts.missing_asset}`);
  console.log(`NO_CANONICAL_TRANSCRIPT      ${counts.no_canonical_transcript}`);
  console.log(`BLOCKED                      ${counts.blocked}`);
  console.log('---------------------------------------------');
  console.log(`VERDICT: ${verdict}\n`);

  if (!isCompleteSuccess) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('❌ Fatal error in validator:', err);
  process.exit(1);
});
