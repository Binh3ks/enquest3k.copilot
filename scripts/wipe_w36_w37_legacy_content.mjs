/**
 * scripts/wipe_w36_w37_legacy_content.mjs
 * 
 * ENGQUEST3K — FULL W36 & W37 LEGACY CONTENT WIPE (ROUND 65 TASK 1)
 * 
 * Applies the exact same wipe treatment as W35 (Round 59/60 precedent):
 * - Preserves exact load-bearing exports required by gameAdaptation.js,
 *   FreeTalkTab.jsx, StoryMissionTab.jsx, etc.
 * - Wipes all pedagogical content to clean empty stubs.
 * - W36 is ready for Mock Exam build (staged in Task 2).
 * - W37 is reset to empty stubs, rejoining rotary practice backlog for future waves.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

function wipeWeek(weekNum, title, gameVarName) {
  const dir = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}`);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const stubs = {
    'grammar.js': `// Week ${weekNum} Grammar Drills (Clean Stub)\nexport default {\n  title: "Grammar Practice",\n  drills: [],\n  exercises: []\n};\n`,
    'mindmap.js': `// Week ${weekNum} Mindmap (Clean Stub)\nexport default {\n  central_idea: "",\n  stems: [],\n  branches: []\n};\n`,
    'logic_lab.js': `// Week ${weekNum} Logic Lab (Clean Stub)\nexport default {\n  title: "Logic Lab",\n  problems: []\n};\n`,
    'logic_science.js': `// Week ${weekNum} Logic Science (Clean Stub)\nexport default {\n  title: "Science Lab",\n  experiments: [],\n  scenarios: []\n};\n`,
    'word_match.js': `// Week ${weekNum} Word Match (Clean Stub)\nexport default [];\n`,
    'word_power.js': `// Week ${weekNum} Word Power (Clean Stub)\nexport default [];\n`,
    'ask_ai.js': `// Week ${weekNum} Ask AI (Clean Stub)\nexport const CUE_CARD_PROMPTS = [];\nexport const INFORMATION_EXCHANGE_P2 = {};\nexport default [];\n`,
    'writing.js': `// Week ${weekNum} Writing Studio (Clean Stub)\nexport default {\n  title: "Writing Studio",\n  prompts: [],\n  panels: []\n};\n`,
    'shadowing_ipa.js': `// Week ${weekNum} Shadowing IPA (Clean Stub)\nexport default [];\n`,
    'daily_watch.js': `// Week ${weekNum} Daily Watch (Clean Stub)\nexport default [];\n`,
    'dictation.js': `// Week ${weekNum} Dictation (Clean Stub)\nexport default [];\n`,
    'singapore_math.js': `// Week ${weekNum} Singapore Math (Clean Stub)\nexport default {\n  title: "Singapore Math",\n  problems: []\n};\n`,
    'social_quiz.js': `// Week ${weekNum} Social Quiz (Clean Stub)\nexport default {\n  title: "Social Quiz",\n  questions: []\n};\n`,
    'games.js': `// Week ${weekNum} Games (Clean Stub)\nexport const ${gameVarName} = {};\nexport default ${gameVarName};\n`,
    'read.js': `// Week ${weekNum} Reading (Clean Stub)\nexport const readData = {\n  week: ${weekNum},\n  title: ${JSON.stringify(title)},\n  text_en: "",\n  text_vi: "",\n  story_scenes: []\n};\nexport default readData;\n`,
    'explore.js': `// Week ${weekNum} Explore (Clean Stub)\nexport const exploreData = {\n  theme: ${JSON.stringify(title)},\n  title_en: ${JSON.stringify(title)},\n  title_vi: "",\n  content_en: "",\n  content_vi: "",\n  check_questions: []\n};\nexport default exploreData;\n`,
    'shadowing.js': `// Week ${weekNum} Shadowing (Clean Stub)\nexport const shadowingData = {\n  sentences: []\n};\nexport default shadowingData;\n`,
    'vocab.js': `// Week ${weekNum} Vocab (Clean Stub)\nexport const vocab = [];\nexport default vocab;\n`,
    'reading_hub.js': `// Week ${weekNum} Reading Hub (Clean Stub)\nexport const readingHubData = {};\nexport default readingHubData;\n`,
    'listening_hub.js': `// Week ${weekNum} Listening Hub (Clean Stub)\nexport const listeningHubData = {};\nexport default listeningHubData;\n`,
    'writing_hub.js': `// Week ${weekNum} Writing Hub (Clean Stub)\nexport const writingHubData = {};\nexport default writingHubData;\n`,
    'speaking_hub.js': `// Week ${weekNum} Speaking Hub (Clean Stub)\nexport const speakingHubData = {};\nexport default speakingHubData;\n`,
    'skill_practice_hub.js': `// Week ${weekNum} Skill Practice Hub (Clean Stub)\nexport const skillPracticeHubData = {};\nexport default skillPracticeHubData;\n`,
    [`week_${weekNum}_real.js`]: `// Week ${weekNum} Real Data (Clean Stub)\nexport const weekRealData = {\n  week: ${weekNum},\n  title: ${JSON.stringify(title)},\n  cefr_level: "A2 Flyers",\n  target_vocab: [],\n  story_missions: []\n};\nexport default weekRealData;\n`,
    'index.js': `// Index wrapper for Week ${weekNum} (Clean Stub)\nimport read_explore from './read.js';\nimport explore from './explore.js';\nimport new_words from './vocab.js';\nimport word_match from './word_match.js';\nimport word_power from './word_power.js';\nimport grammar from './grammar.js';\nimport daily_watch from './daily_watch.js';\nimport logic_lab from './logic_lab.js';\nimport mindmap_speaking from './mindmap.js';\nimport ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';\nimport writing from './writing.js';\nimport dictation from './dictation.js';\nimport shadowing from './shadowing.js';\n\nimport { readingHubData as readingHub } from './reading_hub.js';\nimport { listeningHubData as listeningHub } from './listening_hub.js';\nimport { writingHubData as writingHub } from './writing_hub.js';\nimport { speakingHubData as speakingHub } from './speaking_hub.js';\n\nexport const weekData = {\n  weekId: ${weekNum},\n  title: ${JSON.stringify(title)},\n  weekTitle_en: ${JSON.stringify(title)},\n  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,\n  cue_card_prompts: CUE_CARD_PROMPTS,\n  readingHub,\n  listeningHub,\n  writingHub,\n  speakingHub,\n  stations: {\n    read_explore,\n    explore,\n    new_words,\n    word_match,\n    word_power,\n    grammar,\n    daily_watch,\n    logic_lab,\n    mindmap_speaking,\n    ask_ai,\n    writing,\n    dictation,\n    shadowing\n  }\n};\nexport default weekData;\n`
  };

  // Remove .bak files if any
  const bakPath = path.join(dir, 'shadowing.js.bak');
  if (fs.existsSync(bakPath)) {
    fs.unlinkSync(bakPath);
    console.log(`  🗑️ Removed ${dir}/shadowing.js.bak`);
  }

  for (const [filename, content] of Object.entries(stubs)) {
    fs.writeFileSync(path.join(dir, filename), content, 'utf8');
  }
  console.log(`  ✓ Wiped Week ${weekNum} to clean stubs (${Object.keys(stubs).length} files)`);
}

console.log('========================================================================');
console.log('🧹 WIPING LEGACY FILES IN WEEK 36 & WEEK 37 TO CLEAN EMPTY STUBS');
console.log('========================================================================');

wipeWeek(36, 'Review & Project 3: "My Adventure Book"', 'week36GamesAdvanced');
wipeWeek(37, 'Living vs. Non-Living (Reasoning)', 'week37GamesAdvanced');

console.log('========================================================================');
console.log('✅ Full Content Wipe Complete for W36 & W37.');
console.log('========================================================================\n');
