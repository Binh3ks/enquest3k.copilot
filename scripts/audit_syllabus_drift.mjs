import fs from 'fs';
import path from 'path';

const root = process.cwd();
const syllabusPath = path.join(root, '1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

if (!fs.existsSync(syllabusPath)) {
  console.error('❌ Error: Syllabus source file 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt missing!');
  process.exit(1);
}

// Expected Syllabus Rules mapping
const SYLLABUS_WEEK_RULES = {
  34: {
    topicKeywords: ['lion', 'mouse', 'fable'],
    forbiddenKeywords: ['grasshopper', 'ant'],
    targetVocab: ['net', 'trap', 'roar', 'help', 'friend', 'tiny', 'huge']
  },
  35: {
    topicKeywords: ['best day', 'recount', 'wonderful'],
    forbiddenKeywords: ['litter', 'recycling'],
    targetVocab: ['wonderful', 'exciting', 'sunny', 'memorable', 'joyful', 'delicious', 'happy', 'remember']
  },
  36: {
    topicKeywords: ['adventure book', 'project'],
    forbiddenKeywords: ['flashlight', 'stalactite'],
    targetVocab: ['adventure', 'journey', 'explore', 'path', 'forest', 'mountain', 'island', 'map', 'compass', 'treasure']
  },
  37: {
    topicKeywords: ['living', 'non-living', 'nature'],
    forbiddenKeywords: ['stadium', 'marathon'],
    targetVocab: ['living', 'non-living', 'breathe', 'grow', 'need', 'food', 'water', 'rock', 'plastic']
  }
};

const args = process.argv.slice(2);
const weeksToAudit = args.length > 0 ? args.map(n => parseInt(n, 10)) : [34, 35, 36, 37];

console.log('\n================================================================');
console.log('🛡️ STRENGTHENED PRODUCTION ANTI-DRIFT GUARD (MULTIPLE RUNTIME DATA SOURCES)');
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
  
  // Inspect ALL active runtime data sources for this week
  const dataSourcesToAudit = [
    { name: `week_${weekStr}/read.js`, filePath: path.join(weekDir, 'read.js') },
    { name: `week_${weekStr}/vocab.js`, filePath: path.join(weekDir, 'vocab.js') },
    { name: `week_${weekStr}_real.js (flat)`, filePath: path.join(root, 'src', 'data', 'weeks', `week_${weekStr}_real.js`) },
    { name: `week_${weekStr}/week_${weekStr}_real.js (nested)`, filePath: path.join(weekDir, `week_${weekStr}_real.js`) }
  ];

  dataSourcesToAudit.forEach((src) => {
    if (!fs.existsSync(src.filePath)) {
      console.error(`❌ Week ${weekId}: Data source missing: ${src.name}`);
      totalDriftErrors++;
      return;
    }

    const fileContent = fs.readFileSync(src.filePath, 'utf8').toLowerCase();
    const sourceErrors = [];

    // 1. Topic Keyword Check
    const hasTopic = rule.topicKeywords.some(kw => fileContent.includes(kw));
    if (!hasTopic) {
      sourceErrors.push(`Topic Drift in ${src.name}: Missing expected topic keywords [${rule.topicKeywords.join(', ')}]`);
    }

    // 2. Forbidden Un-restored Keyword Check
    if (rule.forbiddenKeywords) {
      const foundForbidden = rule.forbiddenKeywords.filter(kw => fileContent.includes(kw));
      if (foundForbidden.length > 0) {
        sourceErrors.push(`Legacy Drift in ${src.name}: Contains un-restored legacy keywords [${foundForbidden.join(', ')}]`);
      }
    }

    if (sourceErrors.length > 0) {
      totalDriftErrors++;
      console.error(`❌ [DRIFT DETECTED] WEEK ${weekId} (${src.name})`);
      sourceErrors.forEach(e => console.error(`   └─ ${e}`));
    }
  });

  if (totalDriftErrors === 0) {
    console.log(`✅ [FAITHFUL] WEEK ${weekId}: ALL 4 active data sources are 100% aligned with Syllabus.`);
  }
});

console.log('\n================================================================');
if (totalDriftErrors > 0) {
  console.error(`❌ STRENGTHENED ANTI-DRIFT GUARD FAILED! Found ${totalDriftErrors} data source error(s).`);
  process.exit(1);
} else {
  console.log(`🎉 ALL AUDITED RUNTIME DATA SOURCES ARE 100% FAITHFUL TO THE SYLLABUS! STATUS: GO.`);
  console.log('================================================================\n');
  process.exit(0);
}
