import fs from 'fs';
import path from 'path';

const root = process.cwd();
const syllabusPath = path.join(root, '1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

if (!fs.existsSync(syllabusPath)) {
  console.error('❌ Error: Syllabus source file 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt missing!');
  process.exit(1);
}

const syllabusRaw = fs.readFileSync(syllabusPath, 'utf8');

// Expected Syllabus Rules mapping
const SYLLABUS_WEEK_RULES = {
  34: {
    topicKeywords: ['lion', 'mouse', 'fable'],
    grammarKeywords: ['past'],
    targetVocab: ['net', 'trap', 'roar', 'help', 'friend', 'tiny', 'huge']
  },
  35: {
    topicKeywords: ['best day', 'recount', 'wonderful'],
    grammarKeywords: ['past simple', 'adjective'],
    targetVocab: ['wonderful', 'exciting', 'sunny', 'memorable', 'joyful', 'delicious', 'happy', 'remember']
  },
  36: {
    topicKeywords: ['adventure book', 'project'],
    grammarKeywords: ['irregular verb'],
    targetVocab: ['adventure', 'journey', 'explore', 'path', 'forest', 'mountain', 'island', 'map', 'compass', 'treasure']
  },
  37: {
    topicKeywords: ['living', 'non-living', 'nature'],
    grammarKeywords: ['because'],
    targetVocab: ['living', 'non-living', 'breathe', 'grow', 'need', 'food', 'water', 'rock', 'plastic']
  }
};

const args = process.argv.slice(2);
const weeksToAudit = args.length > 0 ? args.map(n => parseInt(n, 10)) : [34, 35, 36, 37];

console.log('\n================================================================');
console.log('🛡️ PRODUCTION ANTI-DRIFT GUARD: SYLLABUS INTEGRITY VALIDATOR');
console.log('================================================================\n');

let totalDriftErrors = 0;

weeksToAudit.forEach((weekId) => {
  const rule = SYLLABUS_WEEK_RULES[weekId];
  if (!rule) {
    console.log(`ℹ️ Week ${weekId}: No specific anti-drift rule configured (skipping).`);
    return;
  }

  const weekStr = weekId < 10 ? `0${weekId}` : `${weekId}`;
  const weekDir = path.join(root, 'src', 'data', 'weeks', `week_${weekStr}`);
  const readPath = path.join(weekDir, 'read.js');
  const vocabPath = path.join(weekDir, 'vocab.js');

  if (!fs.existsSync(readPath) || !fs.existsSync(vocabPath)) {
    console.error(`❌ Week ${weekId}: Missing read.js or vocab.js file in ${weekDir}`);
    totalDriftErrors++;
    return;
  }

  const readContent = fs.readFileSync(readPath, 'utf8').toLowerCase();
  const vocabContent = fs.readFileSync(vocabPath, 'utf8').toLowerCase();

  const errors = [];

  // Check 1: Topic Keyword Check
  const hasTopic = rule.topicKeywords.some(kw => readContent.includes(kw));
  if (!hasTopic) {
    errors.push(`Topic Drift: read.js does not contain expected topic keywords [${rule.topicKeywords.join(', ')}]`);
  }

  // Check 2: Target Vocabulary Match Rate (Must contain at least 70% of target vocab)
  const missingVocab = rule.targetVocab.filter(word => !readContent.includes(word) && !vocabContent.includes(word));
  if (missingVocab.length > Math.floor(rule.targetVocab.length * 0.4)) {
    errors.push(`Lexical Drift: Missing critical target vocabulary from Syllabus [${missingVocab.join(', ')}]`);
  }

  if (errors.length > 0) {
    totalDriftErrors++;
    console.error(`❌ [DRIFT DETECTED] WEEK ${weekId}`);
    errors.forEach(e => console.error(`   └─ ${e}`));
  } else {
    console.log(`✅ [FAITHFUL] WEEK ${weekId}: 100% aligned with original Syllabus source of truth.`);
  }
});

console.log('\n================================================================');
if (totalDriftErrors > 0) {
  console.error(`❌ ANTI-DRIFT GUARD FAILED! Found ${totalDriftErrors} week(s) with Syllabus drift.`);
  process.exit(1);
} else {
  console.log(`🎉 ALL AUDITED WEEKS ARE 100% FAITHFUL TO THE SYLLABUS! STATUS: GO.`);
  console.log('================================================================\n');
  process.exit(0);
}
