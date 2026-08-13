import fs from 'fs';
import path from 'path';
import { getRegisteredDataSourcesForWeek, detectUnregisteredDataSources } from '../src/contracts/RuntimeDataSourceRegistry.js';

const root = process.cwd();
const syllabusPath = path.join(root, '1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt');

if (!fs.existsSync(syllabusPath)) {
  console.error('❌ Error: Syllabus source file 1. NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt missing!');
  process.exit(1);
}

// Expected Syllabus Rules mapping for W33-W37
const SYLLABUS_WEEK_RULES = {
  33: {
    topicKeywords: ['corridor', 'safety', 'school', 'care', 'nurse', 'slipped'],
    forbiddenKeywords: ['grasshopper', 'ant', 'flashlight', 'cave', 'treasure map'],
    targetVocab: ['corridor', 'slipped', 'nurse', 'bandage', 'relieved', 'safety']
  },
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
    topicKeywords: ['adventure book', 'project', 'adventure'],
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
const weeksToAudit = args.length > 0 ? args.map(n => parseInt(n, 10)) : [33, 34, 35, 36, 37];

console.log('\n================================================================');
console.log('🛡️ REGISTRY-BASED PRODUCTION ANTI-DRIFT GUARD (ALL RUNTIME SOURCES)');
console.log('================================================================\n');

let totalDriftErrors = 0;

weeksToAudit.forEach((weekId) => {
  const rule = SYLLABUS_WEEK_RULES[weekId];
  if (!rule) {
    console.log(`ℹ️ Week ${weekId}: No specific anti-drift rule configured (skipping).`);
    return;
  }

  // 1. Detect Unregistered Data Sources
  const { unregistered } = detectUnregisteredDataSources(weekId);
  if (unregistered.length > 0) {
    console.error(`❌ [UNREGISTERED SOURCE DETECTED] WEEK ${weekId}: Found untracked files [${unregistered.join(', ')}]`);
    totalDriftErrors++;
  }

  // 2. Audit All Registered Data Sources from Registry
  const registeredSources = getRegisteredDataSourcesForWeek(weekId);

  registeredSources.forEach((src) => {
    if (!fs.existsSync(src.filePath)) {
      console.error(`❌ Week ${weekId}: Registered data source missing: ${src.name}`);
      totalDriftErrors++;
      return;
    }

    const fileContent = fs.readFileSync(src.filePath, 'utf8').toLowerCase();
    const sourceErrors = [];

    // Special check for metadata.js: check entry for this week
    if (src.key === 'metadata') {
      const weekPattern = new RegExp(`${weekId}:\\s*\\{\\s*title_en:\\s*"([^"]+)"`);
      const match = fileContent.match(weekPattern);
      if (!match) {
        sourceErrors.push(`Metadata Drift: No title_en found for Week ${weekId} in metadata.js`);
      } else {
        const titleEn = match[1].toLowerCase();
        const hasTopic = rule.topicKeywords.some(kw => titleEn.includes(kw));
        if (!hasTopic) {
          sourceErrors.push(`Metadata Title Drift: "${match[1]}" does not match topic keywords [${rule.topicKeywords.join(', ')}]`);
        }
      }
    } else {
      // General check for all week data files
      const hasTopic = rule.topicKeywords.some(kw => fileContent.includes(kw));
      if (!hasTopic) {
        sourceErrors.push(`Topic Drift in ${src.name}: Missing expected topic keywords [${rule.topicKeywords.join(', ')}]`);
      }

      if (rule.forbiddenKeywords) {
        const foundForbidden = rule.forbiddenKeywords.filter(kw => {
          // Use word boundary regex to avoid false positives (e.g. 'ant' in 'important')
          const regex = new RegExp(`\\b${kw}\\b`, 'i');
          return regex.test(fileContent);
        });
        if (foundForbidden.length > 0) {
          sourceErrors.push(`Legacy Drift in ${src.name}: Contains un-restored legacy keywords [${foundForbidden.join(', ')}]`);
        }
      }
    }

    if (sourceErrors.length > 0) {
      totalDriftErrors++;
      console.error(`❌ [DRIFT DETECTED] WEEK ${weekId} (${src.name})`);
      sourceErrors.forEach(e => console.error(`   └─ ${e}`));
    }
  });

  if (totalDriftErrors === 0) {
    console.log(`✅ [REGISTRY FAITHFUL] WEEK ${weekId}: All ${registeredSources.length} registered runtime data sources are 100% aligned with Syllabus.`);
  }
});

console.log('\n================================================================');
if (totalDriftErrors > 0) {
  console.error(`❌ REGISTRY-BASED ANTI-DRIFT GUARD FAILED! Found ${totalDriftErrors} data source error(s).`);
  process.exit(1);
} else {
  console.log(`🎉 ALL REGISTERED RUNTIME DATA SOURCES ARE 100% FAITHFUL TO THE SYLLABUS! STATUS: GO.`);
  console.log('================================================================\n');
  process.exit(0);
}
