import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const weekNum = parseInt(process.argv[2], 10) || 34;
const weekDir = path.join(rootDir, 'src', 'data', 'weeks', `week_${weekNum}`);

console.log(`========================================================================`);
console.log(`🛡️  GATE 11: CONTENT RICHNESS & VOLUME AUDIT (WEEK ${weekNum})`);
console.log(`========================================================================`);

if (!fs.existsSync(weekDir)) {
  console.error(`❌ Week directory not found: ${weekDir}`);
  process.exit(1);
}

let errors = [];
const metrics = [];

// 1. Check Reading Hub story scenes
try {
  const readingHubPath = path.join(weekDir, 'reading_hub.js');
  const readingHubModule = await import(`file://${readingHubPath}`);
  const rh = readingHubModule.readingHub || readingHubModule.default;
  const scenes = rh?.read_explore?.story_scenes || rh?.story_scenes || [];

  const scenesCount = scenes?.length || 0;
  metrics.push({
    item: 'Story Scenes (Webtoon)',
    measured: `${scenesCount} scenes`,
    threshold: 'exactly 5',
    status: scenesCount === 5 ? '✅ PASS' : '❌ FAIL'
  });

  if (!scenes || scenes.length !== 5) {
    errors.push(`Expected 5 story scenes, found ${scenes?.length || 0}`);
  } else {
    scenes.forEach((s, idx) => {
      const text = s.narration_en || s.description_en || s.en || '';
      const pins = s.lexical_chunks || s.hotspots || [];
      metrics.push({
        item: `  Scene ${idx + 1} Narration Chars`,
        measured: `${text.length} chars`,
        threshold: '>= 40 chars',
        status: text.length >= 40 ? '✅ PASS' : '❌ FAIL'
      });
      metrics.push({
        item: `  Scene ${idx + 1} Pins/Hotspots`,
        measured: `${pins.length} pins`,
        threshold: '>= 3 pins',
        status: pins.length >= 3 ? '✅ PASS' : '❌ FAIL'
      });

      if (text.length < 40) {
        errors.push(`Scene ${idx + 1} narration length (${text.length} chars) is less than 40 chars: "${text}"`);
      }
      if (pins.length < 3) {
        errors.push(`Scene ${idx + 1} has fewer than 3 pins/hotspots (found ${pins.length})`);
      }
    });
  }

  // 2. Check CLIL Article
  const clil = rh?.read_explore?.clil_article || rh?.clil_article;
  if (!clil) {
    errors.push(`Missing clil_article in reading_hub.js`);
    metrics.push({ item: 'CLIL Article Word Count', measured: '0 words (missing)', threshold: '90 - 200 words', status: '❌ FAIL' });
  } else {
    const words = (clil.content_en || '').trim().split(/\s+/).filter(Boolean);
    const inBounds = words.length >= 90 && words.length <= 200;
    metrics.push({
      item: 'CLIL Article Word Count',
      measured: `${words.length} words`,
      threshold: '90 - 200 words',
      status: inBounds ? '✅ PASS' : '❌ FAIL'
    });
    if (!inBounds) {
      errors.push(`CLIL article word count (${words.length} words) out of bounds [90 - 200]`);
    }

    const glossary = clil.glossary || [];
    metrics.push({
      item: 'CLIL Glossary Items',
      measured: `${glossary.length} items`,
      threshold: '>= 3 items',
      status: glossary.length >= 3 ? '✅ PASS' : '❌ FAIL'
    });
    if (glossary.length < 3) {
      errors.push(`CLIL glossary has fewer than 3 items (found ${glossary.length})`);
    }
  }
} catch (e) {
  errors.push(`Error loading reading_hub.js: ${e.message}`);
}

// 3. Check Skill Practice / Listening Hub
try {
  let skillHub = null;
  const skillPracticePath = path.join(weekDir, 'skill_practice_hub.js');
  if (fs.existsSync(skillPracticePath)) {
    const spModule = await import(`file://${skillPracticePath}`);
    skillHub = spModule.skillPracticeHub || spModule.skillPracticeHubData || spModule.default;
  }
  if (!skillHub) {
    const listeningHubPath = path.join(weekDir, 'listening_hub.js');
    const listeningHubModule = await import(`file://${listeningHubPath}`);
    skillHub = listeningHubModule.listeningHub || listeningHubModule.listeningHubData || listeningHubModule.default;
  }

  const mathCount = skillHub?.singapore_math?.length || 0;
  metrics.push({
    item: 'Singapore Math Bar Models',
    measured: `${mathCount} problems`,
    threshold: 'exactly 5',
    status: mathCount === 5 ? '✅ PASS' : '❌ FAIL'
  });
  if (mathCount !== 5) {
    errors.push(`Expected 5 singapore_math items, found ${mathCount}`);
  }

  const grammarCount = skillHub?.grammar_drills?.length || 0;
  metrics.push({
    item: 'Grammar Duel Drills',
    measured: `${grammarCount} drills`,
    threshold: 'exactly 5',
    status: grammarCount === 5 ? '✅ PASS' : '❌ FAIL'
  });
  if (grammarCount !== 5) {
    errors.push(`Expected 5 grammar_drills items, found ${grammarCount}`);
  }

  const labTargets = skillHub.science_lab?.targets || skillHub.science_lab?.zones || skillHub.science_lab?.stages?.[0]?.targets || skillHub.science_lab?.stages?.[0]?.zones || [];
  const labStages = skillHub.science_lab?.stages?.length || 1;
  metrics.push({
    item: 'Action Lab Drag Targets (Stage 1)',
    measured: `${labTargets.length} targets (${labStages} stages)`,
    threshold: '>= 3 targets',
    status: labTargets.length >= 3 ? '✅ PASS' : '❌ FAIL'
  });
  if (!skillHub.science_lab || labTargets.length < 3) {
    errors.push(`science_lab missing or has fewer than 3 drag targets`);
  }
} catch (e) {
  errors.push(`Error loading skill_practice_hub.js / listening_hub.js: ${e.message}`);
}

// 4. Check Vocab
try {
  const vocabPath = path.join(weekDir, 'vocab.js');
  const vocabModule = await import(`file://${vocabPath}`);
  const vocabList = vocabModule[`week${weekNum}Vocab`] || vocabModule.vocab || vocabModule.default || [];
  const vocabCount = Array.isArray(vocabList) ? vocabList.length : Object.keys(vocabList).length;

  metrics.push({
    item: 'Target Vocabulary List (vocab.js)',
    measured: `${vocabCount} words`,
    threshold: '>= 20 words',
    status: vocabCount >= 20 ? '✅ PASS' : '❌ FAIL'
  });
  if (vocabCount < 20) {
    errors.push(`Expected at least 20 target vocabulary items, found ${vocabCount}`);
  }
} catch (e) {
  errors.push(`Error loading vocab.js: ${e.message}`);
}

// PRINT VERBOSE METRICS TABLE
console.log('\n📊 CONTENT VOLUME AUDIT REPORT — WEEK ' + weekNum + ':');
console.log('| Metric Checked | Measured Value | Threshold | Status |');
console.log('|---|---|---|---|');
metrics.forEach(m => {
  console.log(`| ${m.item} | ${m.measured} | ${m.threshold} | ${m.status} |`);
});

if (errors.length > 0) {
  console.error(`\n❌ GATE 11 FAILED with ${errors.length} errors:`);
  errors.forEach((err, idx) => console.error(`   ${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`\n✅ GATE 11 PASSED: Content Richness & Volume Standard 100% Met (${metrics.length} items checked)!`);
  process.exit(0);
}
