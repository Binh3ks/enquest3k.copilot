/**
 * scripts/wipe_w35_legacy_content.mjs
 * 
 * ENGQUEST3K — FULL W35 CONTENT WIPE (ROUND 60 TASK 0)
 * 
 * Expands the reset beyond the 6 hub files to EVERY content file in
 * src/data/weeks/week_35/ that currently holds legacy pre-SOP content.
 * Preserves exact named/default exports so Vite build passes cleanly,
 * but zeroes all pedagogical content.
 * 
 * Keeps blueprint.json untouched.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const W35_DIR = path.join(ROOT_DIR, 'src/data/weeks/week_35');

const STUBS = {
  'grammar.js': `// Week 35 Grammar Drills (Clean Un-authored Placeholder Stub)
export default {
  title: "Grammar Practice",
  drills: [],
  exercises: []
};
`,

  'mindmap.js': `// Week 35 Mindmap (Clean Un-authored Placeholder Stub)
export default {
  central_idea: "",
  stems: [],
  branches: []
};
`,

  'vocab_dictionary_master.js': `// Week 35 Vocab Dictionary Master (Clean Un-authored Placeholder Stub)
export default [];
`,

  'logic_lab.js': `// Week 35 Logic Lab (Clean Un-authored Placeholder Stub)
export default {
  title: "Logic Lab",
  problems: []
};
`,

  'logic_science.js': `// Week 35 Logic Science (Clean Un-authored Placeholder Stub)
export default {
  title: "Science Lab",
  experiments: [],
  scenarios: []
};
`,

  'word_match.js': `// Week 35 Word Match (Clean Un-authored Placeholder Stub)
export default [];
`,

  'word_power.js': `// Week 35 Word Power (Clean Un-authored Placeholder Stub)
export default [];
`,

  'ask_ai.js': `// Week 35 Ask AI / Info Exchange (Clean Un-authored Placeholder Stub)
export const CUE_CARD_PROMPTS = [];
export const INFORMATION_EXCHANGE_P2 = {};
export default [];
`,

  'writing.js': `// Week 35 Writing Studio (Clean Un-authored Placeholder Stub)
export default {
  title: "Writing Studio",
  prompts: [],
  panels: []
};
`,

  'shadowing_ipa.js': `// Week 35 Shadowing IPA (Clean Un-authored Placeholder Stub)
export default [];
`,

  'daily_watch.js': `// Week 35 Daily Watch (Clean Un-authored Placeholder Stub)
export default [];
`,

  'games.js': `// Week 35 Games (Clean Un-authored Placeholder Stub)
export const week35GamesAdvanced = {};
export default week35GamesAdvanced;
`,

  'read.js': `// Week 35 Story / Reading (Clean Un-authored Placeholder Stub)
export const readData = {
  week: 35,
  title: "Storytelling Practice 2 (Personal Recount)",
  text_en: "",
  text_vi: "",
  story_scenes: []
};
export default readData;
`,

  'explore.js': `// Week 35 Explore / CLIL (Clean Un-authored Placeholder Stub)
export const exploreData = {
  theme: "Storytelling Practice 2 (Personal Recount)",
  title_en: "Storytelling Practice 2 (Personal Recount)",
  title_vi: "",
  content_en: "",
  content_vi: "",
  check_questions: []
};
export default exploreData;
`,

  'shadowing.js': `// Week 35 Shadowing (Clean Un-authored Placeholder Stub)
export const shadowingData = {
  sentences: []
};
export default shadowingData;
`,

  'dictation.js': `// Week 35 Dictation (Clean Un-authored Placeholder Stub)
export default [];
`,

  'singapore_math.js': `// Week 35 Singapore Math (Clean Un-authored Placeholder Stub)
export default {
  title: "Singapore Math",
  problems: []
};
`,

  'week_35_real.js': `// Week 35 Real Data (Clean Un-authored Placeholder Stub)
export const weekRealData = {
  week: 35,
  title: "Storytelling Practice 2 (Personal Recount)",
  cefr_level: "A2 Flyers",
  target_vocab: [],
  story_missions: []
};
export default weekRealData;
`,

  'index.js': `// Index wrapper for Week 35 (Clean Un-authored Placeholder Stub)
import read_explore from './read.js';
import explore from './explore.js';
import new_words from './vocab.js';
import word_match from './word_match.js';
import word_power from './word_power.js';
import grammar from './grammar.js';
import daily_watch from './daily_watch.js';
import logic_lab from './logic_lab.js';
import mindmap_speaking from './mindmap.js';
import ask_ai, { INFORMATION_EXCHANGE_P2, CUE_CARD_PROMPTS } from './ask_ai.js';
import writing from './writing.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';

import { readingHubData as readingHub } from './reading_hub.js';
import { listeningHubData as listeningHub } from './listening_hub.js';
import { writingHubData as writingHub } from './writing_hub.js';
import { speakingHubData as speakingHub } from './speaking_hub.js';

export const weekData = {
  weekId: 35,
  title: "Storytelling Practice 2 (Personal Recount)",
  weekTitle_en: "Storytelling Practice 2 (Personal Recount)",

  cue_card_info_exchange: INFORMATION_EXCHANGE_P2,
  cue_card_prompts: CUE_CARD_PROMPTS,

  readingHub,
  listeningHub,
  writingHub,
  speakingHub,
  stations: {
    read_explore,
    explore,
    new_words,
    word_match,
    word_power,
    grammar,
    daily_watch,
    logic_lab,
    mindmap_speaking,
    ask_ai,
    writing,
    dictation,
    shadowing
  }
};

export default weekData;
`
};

console.log('========================================================================');
console.log('🧹 ENGQUEST3K — FULL W35 CONTENT WIPE (TASK 0)');
console.log('========================================================================');

// Delete backup file if present
const bakPath = path.join(W35_DIR, 'shadowing.js.bak');
if (fs.existsSync(bakPath)) {
  fs.unlinkSync(bakPath);
  console.log('  🗑️ Removed: shadowing.js.bak');
}

// Write stubs
for (const [filename, content] of Object.entries(STUBS)) {
  const filePath = path.join(W35_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✓ Reset stub: ${filename}`);
}

console.log('========================================================================');
console.log('✅ W35 Content Wipe Complete: All legacy files reset to clean stubs.');
console.log('========================================================================\n');
