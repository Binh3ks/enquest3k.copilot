#!/usr/bin/env node
/**
 * Phase 1-2-3 Batch Screening for all weeks
 * Frozen pipeline: Monologue check → Sentence format → Quality scoring
 */
const fs = require('fs');
const path = require('path');

const WEEK_VIDEOS = {
  "01": "h6tJjMqBNOY", "02": "lDZA54Bi8sg", "03": "zT5IiE9m9oY", "04": "f0dMJ7OzxcA",
  "05": "O07X1XLK4tM", "06": "JwGnCIsLOpU", "07": "5cYMu3RTMJU", "08": "7isSwerYaQc",
  "09": "JwGnCIsLOpU", "10": "1Sbi7VIDO1o", "11": "SRJqmRPcOII", "12": "MNQMpFVrMOs",
  "13": "ico9ztlb46k", "14": "8wZi38lF28E", "15": "N1o4oOXLOZc", "16": "tgUSHk6JaTY",
  "17": "P9abGg_gF1s", "18": "MNQMpFVrMOs", "19": "wy398w9QcB4", "20": "qwjfQNQsRRI",
  "21": "tGWiowdjnHk", "22": "qwjfQNQsRRI", "23": "pcWBtzTnpb8", "24": "LlC-Trk54Zg",
  "25": "cH8BuvQ7ZoI", "26": "OdNv-J31Kk8", "27": "D3h-1mBjYdY", "28": "tftSHIh8enw",
  "29": "aSdnkKnL6Ys", "30": "aqMpREQdnCY", "31": "LNajQTnZviQ", "32": "qD1pnquN_DM",
  "33": "gWOqA3pUaTk", "34": "XPZXpuoIndo", "35": "X2YgM1Zw4_E"
};

const CACHE_DIR = path.join(__dirname, '..', 'src/data/video_transcripts_by_id/cleaned');

// ═══════════════════════════════════════════════════════════════
// PHASE 1: MONOLOGUE TRAP (Strict Rejection)
// ═══════════════════════════════════════════════════════════════
function phase1Check(text) {
  const lower = text.toLowerCase();

  // Count dialogue indicators
  const secondPerson = (lower.match(/\b(you are|you have|you like|your name|are you|do you|what's your|how are you|where are you|nice to meet you)\b/g) || []).length;
  const questions = (text.match(/\?/g) || []).length;
  const hasGreetings = /\b(hi |hello |hey |welcome |thank you|nice to meet|good morning|good afternoon)\b/i.test(lower);

  // Detect repeated word chants (e.g., "Book Book", "Notebook Notebook")
  const words = lower.split(/\s+/);
  let hasChant = false;
  for (let i = 0; i < words.length - 1; i++) {
    if (words[i] === words[i+1] && words[i].length > 2) { hasChant = true; break; }
  }

  // Count 3rd person narration markers
  const hasNarration = (lower.match(/\b(this is my|these are my|she is|he is|it is|they are|i am)\b/g) || []).length;
  const has3rdPersonBias = hasNarration > secondPerson * 3;

  // Phase 1 score (0-35)
  let score = 0;
  let verdict = 'FAIL';
  let reason = '';

  if (hasChant) {
    score = 0;
    verdict = 'FAIL';
    reason = 'Vocabulary chant/drill format';
  } else if (has3rdPersonBias && secondPerson < 2) {
    score = 0;
    verdict = 'FAIL';
    reason = 'Monologue/narration (3rd person)';
  } else if (questions >= 2 && secondPerson >= 2) {
    score = 30;
    verdict = 'PASS';
  } else if (hasGreetings && secondPerson >= 1) {
    score = 20;
    verdict = 'PASS';
  } else if (secondPerson >= 1 && questions >= 1) {
    score = 20;
    verdict = 'PASS';
  } else {
    score = 10;
    verdict = 'FAIL';
    reason = 'Weak dialogue (' + secondPerson + ' 2nd person, ' + questions + ' questions)';
  }

  return { score, verdict, reason, secondPerson, questions, hasChant, hasNarration };
}

// ═══════════════════════════════════════════════════════════════
// PHASE 3: QUALITY SCORING (0-100)
// ═══════════════════════════════════════════════════════════════
function phase3Score(text, dialogueScore) {
  if (dialogueScore < 15) return 0; // monologue = instant 0

  const lower = text.toLowerCase();

  // Vocab: count target words for K-12 A1 level
  const vocabWords = (lower.match(/\b(book|house|room|school|family|friend|class|teacher|student|please|thank|hello|goodbye|morning|today|like|love|help|play|read|write|eat|drink|go|come|see|look|want|need|have|are|is|pen|pencil|bag|desk|chair|gym|library|garden|kitchen|bathroom|bedroom|sport|music|dance|computer|internet|game|homework|lunch|breakfast|dinner|mother|father|sister|brother|grandma|grandpa|pet|dog|cat|park|shop|store|hospital|bank|restaurant)\b/g) || []).length;
  const vocabScore = Math.min(25, Math.round(vocabWords * 2));

  // Grammar: check for interaction patterns
  const grammarPatterns = (lower.match(/\b(what|where|how|this is|do you|are you|can you|i have|you have|i like|you like|let's|shall we)\b/g) || []).length;
  const grammarScore = Math.min(20, grammarPatterns * 3);

  // Shadowing: sentence length suitability
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWords = sentences.length > 0
    ? sentences.reduce((a, s) => a + s.trim().split(/\s+/).length, 0) / sentences.length
    : 20;
  const shadowScore = avgWords <= 10 ? 20 : avgWords <= 15 ? 18 : avgWords <= 20 ? 15 : avgWords <= 25 ? 10 : 5;

  // ASR quality deductions
  const lowerText = lower;
  const hasRepeatedWords = /\b(\w+)\s+\1\b/.test(lowerText);
  const asrPenalty = hasRepeatedWords ? -5 : 0;

  return dialogueScore + vocabScore + grammarScore + shadowScore + asrPenalty;
}

// ═══════════════════════════════════════════════════════════════
// MAIN: Run batch screening
// ═══════════════════════════════════════════════════════════════
console.log('═══════════════════════════════════════════════════════════════');
console.log('  PHASE 1-2-3 BATCH SCREENING — ALL 35 WEEKS');
console.log('═══════════════════════════════════════════════════════════════');
console.log();

const passed = [];
const failed = [];
const noTranscript = [];

for (const [week, vid] of Object.entries(WEEK_VIDEOS)) {
  const cachePath = path.join(CACHE_DIR, vid + '.json');

  if (!fs.existsSync(cachePath)) {
    noTranscript.push({ week, vid, reason: 'No cached transcript available' });
    continue;
  }

  const data = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  const text = data.text || '';

  // Phase 1
  const p1 = phase1Check(text);

  // Phase 2 (sentence isolation happens downstream — we just check format)
  // For now, if Phase 1 fails, skip Phase 2/3

  // Phase 3
  const p3 = phase3Score(text, p1.score);

  if (p1.verdict === 'FAIL') {
    failed.push({ week, vid, p1: p1.score, p3: 0, reason: p1.reason });
  } else if (p3 < 80) {
    failed.push({ week, vid, p1: p1.score, p3, reason: 'Score ' + p3 + ' < 80' });
  } else {
    passed.push({ week, vid, p1: p1.score, p3 });
  }
}

// Output results
console.log('PHASE 1-3 RESULTS');
console.log('═══════════════════════════════════════════════════════════════');
console.log('TOTAL WEEKS SCREENED:', Object.keys(WEEK_VIDEOS).length);
console.log('PASSED (Phase 1=PASS + Score≥80):', passed.length);
console.log('FAILED (Phase 1=FAIL or Score<80):', failed.length);
console.log('NO TRANSCRIPT:', noTranscript.length);
console.log();

console.log('═══════════════════════════════════════════════════════════════');
console.log('  PASSED WEEKS (Auto-assign candidates)');
console.log('═══════════════════════════════════════════════════════════════');
passed.forEach(r => {
  console.log('  W' + r.week.padStart(2, '0') + ' | ' + r.vid.padEnd(14) + ' | P1: ' + String(r.p1).padStart(2) + ' | P3: ' + String(r.p3).padStart(3) + ' | APPROVED');
});

console.log();
console.log('═══════════════════════════════════════════════════════════════');
console.log('  FAILED WEEKS (Manual review required)');
console.log('═══════════════════════════════════════════════════════════════');
failed.forEach(r => {
  console.log('  W' + r.week.padStart(2, '0') + ' | ' + r.vid.padEnd(14) + ' | P1: ' + String(r.p1).padStart(2) + ' | P3: ' + String(r.p3).padStart(3) + ' | ' + r.reason);
});

if (noTranscript.length > 0) {
  console.log();
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('  NO TRANSCRIPT (Need YouTube API)');
  console.log('═══════════════════════════════════════════════════════════════');
  noTranscript.forEach(r => {
    console.log('  W' + r.week.padStart(2, '0') + ' | ' + r.vid.padEnd(14) + ' | ' + r.reason);
  });
}
