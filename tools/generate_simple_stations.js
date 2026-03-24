#!/usr/bin/env node

/**
 * SIMPLE STATIONS GENERATOR
 * 
 * Generates template-based station files that don't require AI:
 * - word_match.js (auto from vocab)
 * - writing.js (template-based)
 * - ask_ai.js (template-based)
 * - mindmap.js (template-based)
 * - games.js (game link insertion)
 * - video_queries.json (from BLUEPRINT)
 * - index.js (auto-import all stations)
 * 
 * Usage: node tools/generate_simple_stations.js <week_number>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * Generate word_match.js from vocabulary
 */
const generateWordMatch = (weekNum, vocab) => {
  console.log(`\n🔤 word_match.js (Auto from vocab)`);
  
  const pairs = vocab.map((word, index) => ({
    left_id: index + 1,
    right_match: word.short_definition // simplified definition
  }));
  
  const content = `export default {
  // Note: WordMatch component reads vocab from stations.new_words.vocab (global_vocab).
  // This file provides custom definition matches for the matching game mode.
  pairs: ${JSON.stringify(pairs, null, 4)}
};
`;
  
  writeFile(weekNum, 'word_match.js', content);
};

/**
 * Generate writing.js
 */
const generateWriting = (weekNum, theme, grammar, keywords) => {
  console.log(`\n✍️  writing.js (Template)`);
  
  const content = `export default {
  title: "${theme}",
  min_words: 40,
  model_sentence: "Write a model sentence using the grammar pattern and keywords here. Include ${keywords.slice(0, 3).join(', ')}. Show examples of ${grammar}.",
  instruction_en: "Write about the topic. Use the grammar: ${grammar}",
  instruction_vi: "Viết về chủ đề. Sử dụng ngữ pháp: ${grammar}",
  prompt_en: "What are you doing? How do you feel? Describe the situation.",
  prompt_vi: "Bạn đang làm gì? Bạn cảm thấy thế nào? Miêu tả tình huống.",
  keywords: ${JSON.stringify(keywords.slice(0, 10))}
};
`;
  
  writeFile(weekNum, 'writing.js', content);
};

/**
 * Generate ask_ai.js
 */
const generateAskAI = (weekNum, theme, keywords) => {
  console.log(`\n🤖 ask_ai.js (Template)`);
  
  // Generate 4 AI prompts based on theme
  const prompts = [
    {
      id: 1,
      context_en: `You see someone using ${keywords[0]}. You want to know WHY. Ask them.`,
      context_vi: `Bạn thấy ai đó đang sử dụng ${keywords[0]}. Bạn muốn biết TẠI SAO. Hỏi họ.`,
      audio_url: `/audio/week${weekNum}/ask_ai_1.mp3`,
      answer: [`Why are you ${keywords[0]}?`, `Why do you ${keywords[0]}?`],
      hint: "Why..."
    },
    {
      id: 2,
      context_en: `Your friend is talking about ${theme}. You want to know HOW MANY. Ask them.`,
      context_vi: `Bạn đang nói về ${theme}. Bạn muốn biết BAO NHIÊU. Hỏi họ.`,
      audio_url: `/audio/week${weekNum}/ask_ai_2.mp3`,
      answer: [`How many...?`, `How much...?`],
      hint: "How many..."
    },
    {
      id: 3,
      context_en: `You see something related to ${theme}. You want to know WHERE. Ask.`,
      context_vi: `Bạn thấy điều gì đó liên quan đến ${theme}. Bạn muốn biết Ở ĐÂU. Hỏi.`,
      audio_url: `/audio/week${weekNum}/ask_ai_3.mp3`,
      answer: [`Where is...?`, `Where are...?`],
      hint: "Where..."
    },
    {
      id: 4,
      context_en: `You want to understand ${theme} better. Ask WHAT causes it.`,
      context_vi: `Bạn muốn hiểu ${theme} hơn. Hỏi CÁI GÌ gây ra nó.`,
      audio_url: `/audio/week${weekNum}/ask_ai_4.mp3`,
      answer: [`What causes...?`, `What makes...?`],
      hint: "What..."
    }
  ];
  
  const content = `export default {
  prompts: ${JSON.stringify(prompts, null, 4)}
};
`;
  
  writeFile(weekNum, 'ask_ai.js', content);
};

/**
 * Generate mindmap.js
 */
const generateMindmap = (weekNum, grammar, keywords) => {
  console.log(`\n🧠 mindmap.js (Template)`);
  
  // Generate 6 center stems using grammar pattern
  const centerStems = [
    { text: `I am ___.`, audio: `/audio/week${weekNum}/mindmap_stem_1.mp3` },
    { text: `They are ___.`, audio: `/audio/week${weekNum}/mindmap_stem_2.mp3` },
    { text: `When I ___, I ___.`, audio: `/audio/week${weekNum}/mindmap_stem_3.mp3` },
    { text: `We need to ___.`, audio: `/audio/week${weekNum}/mindmap_stem_4.mp3` },
    { text: `My friend is ___.`, audio: `/audio/week${weekNum}/mindmap_stem_5.mp3` },
    { text: `To ___, you must ___.`, audio: `/audio/week${weekNum}/mindmap_stem_6.mp3` }
  ];
  
  // Generate branches from keywords (6 branches per stem)
  const branchLabels = {};
  centerStems.forEach((stem, stemIndex) => {
    const branches = [];
    for (let i = 0; i < 6; i++) {
      const wordIndex = (stemIndex * 6 + i) % keywords.length;
      branches.push({
        text: keywords[wordIndex],
        audio: `/audio/week${weekNum}/mindmap_branch_${stemIndex * 6 + i + 1}.mp3`
      });
    }
    branchLabels[stem.text] = branches;
  });
  
  const content = `const mindMapContent = {
  centerStems: ${JSON.stringify(centerStems, null, 4)},
  branchLabels: ${JSON.stringify(branchLabels, null, 4)}
};

export default mindMapContent;
`;
  
  writeFile(weekNum, 'mindmap.js', content);
};

/**
 * Generate games.js
 */
const generateGames = (weekNum, theme, keywords) => {
  console.log(`\n🎮 games.js (Link insertion)`);
  
  // For now, use generic game links - would integrate with Wordwall/Quizizz API later
  const content = `/**
 * Week ${weekNum} Game Data - Advanced Mode (GameHub)
 * Theme: ${theme}
 */

export const week${weekNum}GamesAdvanced = {
  vocabulary: ${JSON.stringify(keywords.slice(0, 13))},
  show_tell: {
    steps: 3,
    word_list: ${JSON.stringify(keywords.slice(0, 13))},
    instructions_easy: 'Say the word, add a phrase, then make a full sentence.',
    instructions_advanced: 'Say the word, add a phrase, then make a full sentence.',
    step_instructions: {
      1: 'Step 1: say the word clearly.',
      2: 'Step 2: add a short phrase with the word.',
      3: 'Step 3: make a full sentence.'
    },
    frames_easy: ['I ___.', 'We ___.'],
    frames_advanced: ['I am ___.', 'They are ___.'],
    details_easy: [],
    details_advanced: [],
    detail_map: {}
  },
  game_links: [
    {
      id: 1,
      title: "${theme} - Memory Game",
      url: "https://wordwall.net/resource/[ID]",
      type: "wordwall",
      description: "Match words with definitions"
    },
    {
      id: 2,
      title: "${theme} - Quiz",
      url: "https://quizizz.com/[ID]",
      type: "quizizz",
      description: "Answer questions about the topic"
    },
    {
      id: 3,
      title: "${theme} - Race",
      url: "https://kahoot.it/[ID]",
      type: "kahoot",
      description: "Fast-paced competition game"
    }
  ]
};

export default week${weekNum}GamesAdvanced;
`;
  
  writeFile(weekNum, 'games.js', content);
};

/**
 * Generate video_queries.json
 */
const generateVideoQueries = (weekNum, blueprintData) => {
  console.log(`\n📹 video_queries.json (From BLUEPRINT)`);
  
  const { theme, grammar, keywords, video_hint } = blueprintData;
  
  const content = `{
  "weekId": ${weekNum},
  "theme": "${theme}",
  "grammar": "${grammar}",
  "keywords": "${keywords}",
  "video_hint": "${video_hint}",
  "queries": ["Grammar 1", "Grammar 2", "Story", "Vocabulary", "Science"],
  "notes": "Use video_tasks.json for manual query overrides if needed"
}
`;
  
  writeFile(weekNum, 'video_queries.json', content, true); // JSON file
};

/**
 * Generate index.js
 */
const generateIndex = (weekNum, hasLogicScience = true) => {
  console.log(`\n📦 index.js (Auto-import)`);
  
  const logicFile = hasLogicScience ? 'logic_science' : 'logic';
  
  const content = `import daily_watch from './daily_watch.js';
import read from './read.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import games from './games.js';
import word_match from './word_match.js';
import word_power from './word_power.js';
import writing from './writing.js';
import ask_ai from './ask_ai.js';
import explore from './explore.js';
import mindmap from './mindmap.js';
import ${logicFile} from './${logicFile}.js';
import singapore_math from './singapore_math.js';

export default {
  daily_watch,
  read,
  dictation,
  shadowing,
  vocab,
  grammar,
  games,
  word_match,
  word_power,
  writing,
  ask_ai,
  explore,
  mindmap,
  ${logicFile},
  singapore_math
};
`;
  
  writeFile(weekNum, 'index.js', content);
};

/**
 * Helper: Write file to disk
 */
const writeFile = (weekNum, filename, content, isJSON = false) => {
  const outputDir = path.join(ROOT_DIR, `src/data/weeks/week_${weekNum}`);
  const outputPath = path.join(outputDir, filename);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, content, 'utf8');
  
  const stats = fs.statSync(outputPath);
  const lines = content.split('\n').length;
  
  console.log(`  ✅ ${filename.padEnd(20)} (${lines} lines, ${(stats.size / 1024).toFixed(1)} KB)`);
  
  return { filePath: outputPath, lines, size: stats.size };
};

/**
 * Main execution
 */
const main = () => {
  const weekArg = process.argv[2];
  
  if (!weekArg) {
    console.log('❌ Error: Week number required\n');
    console.log('Usage: node tools/generate_simple_stations.js <week_number>');
    console.log('Example: node tools/generate_simple_stations.js 19\n');
    process.exit(1);
  }
  
  const weekNum = parseInt(weekArg);
  
  if (isNaN(weekNum) || weekNum < 1 || weekNum > 156) {
    console.log(`❌ Error: Invalid week number "${weekArg}"`);
    process.exit(1);
  }
  
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📝 GENERATING SIMPLE STATIONS - Week ${weekNum}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // Simplified data - would load from BLUEPRINT in production
  const weekData = {
    theme: 'Past Simple Actions',
    grammar: 'Past Simple irregular verbs',
    keywords: ['went', 'saw', 'came', 'ate', 'made', 'took', 'got', 'had', 'did', 'said'],
    video_hint: 'Yesterday actions'
  };
  
  const vocab = weekData.keywords.map((word, i) => ({
    id: i + 1,
    word,
    short_definition: `definition of ${word}`
  }));
  
  // Generate all simple stations
  generateWordMatch(weekNum, vocab);
  generateWriting(weekNum, weekData.theme, weekData.grammar, weekData.keywords);
  generateAskAI(weekNum, weekData.theme, weekData.keywords);
  generateMindmap(weekNum, weekData.grammar, weekData.keywords);
  generateGames(weekNum, weekData.theme, weekData.keywords);
  generateVideoQueries(weekNum, weekData);
  generateIndex(weekNum, weekNum >= 16);
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ SIMPLE STATIONS COMPLETE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📊 Generated: 7 files`);
  console.log(`📁 Location: src/data/weeks/week_${weekNum}/`);
  console.log(`\n✓ CHECK: All files created successfully`);
  console.log(`  ✅ word_match.js`);
  console.log(`  ✅ writing.js`);
  console.log(`  ✅ ask_ai.js`);
  console.log(`  ✅ mindmap.js`);
  console.log(`  ✅ games.js`);
  console.log(`  ✅ video_queries.json`);
  console.log(`  ✅ index.js`);
  
  process.exit(0);
};

main();
