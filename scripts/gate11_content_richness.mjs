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

// 1. Check Reading Hub story scenes
try {
  const readingHubPath = path.join(weekDir, 'reading_hub.js');
  const readingHubModule = await import(`file://${readingHubPath}`);
  const rh = readingHubModule.readingHub || readingHubModule.default;
  const scenes = rh?.read_explore?.story_scenes || [];

  if (!scenes || scenes.length !== 5) {
    errors.push(`Expected 5 story scenes, found ${scenes?.length || 0}`);
  } else {
    scenes.forEach((s, idx) => {
      const text = s.narration_en || s.description_en || s.en || '';
      if (text.length < 40) {
        errors.push(`Scene ${idx + 1} narration length (${text.length} chars) is less than 40 chars: "${text}"`);
      }
      const pins = s.lexical_chunks || s.hotspots || [];
      if (pins.length < 3) {
        errors.push(`Scene ${idx + 1} has fewer than 3 pins/hotspots (found ${pins.length})`);
      }
    });
  }

  // 2. Check CLIL Article
  const clil = rh?.read_explore?.clil_article || rh?.clil_article;
  if (!clil) {
    errors.push(`Missing clil_article in reading_hub.js`);
  } else {
    const words = (clil.content_en || '').trim().split(/\s+/).filter(Boolean);
    if (words.length < 90 || words.length > 200) {
      errors.push(`CLIL article word count (${words.length} words) out of bounds [90 - 200]`);
    }
  }
} catch (e) {
  errors.push(`Error loading reading_hub.js: ${e.message}`);
}

// 3. Check Listening Hub
try {
  const listeningHubPath = path.join(weekDir, 'listening_hub.js');
  const listeningHubModule = await import(`file://${listeningHubPath}`);
  const lh = listeningHubModule.listeningHub || listeningHubModule.default;

  if (!lh.dictation || lh.dictation.length !== 5) {
    errors.push(`Expected 5 dictation sentences, found ${lh.dictation?.length || 0}`);
  }
  if (!lh.singapore_math || lh.singapore_math.length !== 5) {
    errors.push(`Expected 5 singapore_math items, found ${lh.singapore_math?.length || 0}`);
  }
  if (!lh.grammar_drills || lh.grammar_drills.length !== 5) {
    errors.push(`Expected 5 grammar_drills items, found ${lh.grammar_drills?.length || 0}`);
  }
  const labTargets = lh.science_lab?.targets || lh.science_lab?.zones || [];
  if (!lh.science_lab || labTargets.length < 3) {
    errors.push(`science_lab missing or has fewer than 3 drag targets`);
  }
} catch (e) {
  errors.push(`Error loading listening_hub.js: ${e.message}`);
}

// 4. Check Vocab
try {
  const vocabPath = path.join(weekDir, 'vocab.js');
  const vocabModule = await import(`file://${vocabPath}`);
  const vocabList = vocabModule[`week${weekNum}Vocab`] || vocabModule.vocab || vocabModule.default;
  if (!vocabList || vocabList.length !== 20) {
    errors.push(`Expected exactly 20 target vocabulary items, found ${vocabList?.length || 0}`);
  }
} catch (e) {
  errors.push(`Error loading vocab.js: ${e.message}`);
}

if (errors.length > 0) {
  console.error(`\n❌ GATE 11 FAILED with ${errors.length} errors:`);
  errors.forEach((err, idx) => console.error(`   ${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log(`✅ GATE 11 PASSED: Content Richness & Volume Standard 100% Met!`);
  process.exit(0);
}
