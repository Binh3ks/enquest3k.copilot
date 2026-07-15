#!/usr/bin/env node
/**
 * generate_story_writing_data.cjs — Generate `story_prompts` block for W16-W35.
 *
 * Reads /tmp/stories.json (pre-extracted via Python). Maps Story N to week W,
 * generates a `story_prompts.picture_mode` block with image_prompt + word_bank
 * + sentence_frames, and writes into both src/data/weeks/week_NN/writing.js
 * and src/data/weeks_easy/week_NN/writing.js.
 *
 * Usage:
 *   node tools/generate_story_writing_data.cjs              # all W16-W35
 *   node tools/generate_story_writing_data.cjs --week 18    # single week
 */

const fs = require('fs');
const path = require('path');

const STORIES_JSON = '/tmp/stories.json';
const WEEKS_DIR = path.join(__dirname, '..', 'src', 'data', 'weeks');
const WEEKS_EASY_DIR = path.join(__dirname, '..', 'src', 'data', 'weeks_easy');

// Story num -> week (matches docx table of contents)
const STORY_TO_WEEK = {
  '1': 4, '2': 6, '3': 8, '4.1': 9, '4.2': 10,
  '5.1': 12, '5.2': 13, '6': 14, '7': 15, '8': 16,
  '9': 17, '10': 19, '11': 20, '12': 21, '13': 22,
  '14': 23, '15': 24, '16': 25, '17': 26, '18': 27,
  '19': 28, '20': 29, '21': 30, '22': 31, '23': 32,
  '24': 33, '25': 34, '26': 35, '27': 36, '28': 37,
};

const args = process.argv.slice(2);
let onlyWeek = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--week' && args[i + 1]) {
    onlyWeek = parseInt(args[i + 1], 10);
    i++;
  }
}

function extractImagePrompt(body) {
  // body is array of paragraphs; first 1-2 are grammar notes, rest is English content
  // Filter to find English content paragraphs
  const content = body.filter(p =>
    p.length > 30 && !/(Nghĩa|Trọng tâm|Từ vựng|Ngữ pháp|Mạo từ|Giới từ|Sở thích|Định|Bao|Storytelling|Trật tự|Cấu trúc|Số|Trạng|Động từ|Hành)/.test(p.slice(0, 100))
  );
  const text = content.join(' ').trim();
  if (!text) return 'Children in a friendly scene, watercolor illustration style.';
  // Take first 3 sentences
  const sentences = text.split(/(?<=[.!?])\s+/);
  const prompt = sentences.slice(0, 3).join(' ').trim();
  if (prompt.length < 50) return text.slice(0, 300) + ' Watercolor children book illustration, soft pastel colors, friendly characters.';
  return prompt.slice(0, 400) + ' Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.';
}

function extractWordBankFromExisting(existingData) {
  const bank = existingData?.vocabulary_bank || existingData?.hints?.vocabulary_bank;
  if (!bank) return [];
  const words = bank.words || bank;
  if (!Array.isArray(words)) return [];
  return words
    .filter(w => !w.distractor && w.word && !w.word.startsWith('==='))
    .map(w => w.word)
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 14);
}

function extractSentenceFramesFromExisting(existingData, storyContent) {
  // Tier 1 (W16-W23): reuse existing sentence_frames if available
  if (existingData?.sentence_frames && Array.isArray(existingData.sentence_frames)) {
    return existingData.sentence_frames.slice(0, 3);
  }
  // Fallback: extract 2-3 short sentences from story body
  const content = storyContent
    .filter(p => p.length > 20 && p.length < 150 && /[.!?]$/.test(p) && /^[A-Z]/.test(p))
    .slice(0, 3);
  return content.map(c => {
    // Replace last noun with blank
    return { template: c.replace(/\b([a-z]{4,12})\b\s*([.!?]?)$/, '___ $2').trim(), answers: [] };
  });
}

function buildBlock(story, week, existingData) {
  const wordBank = extractWordBankFromExisting(existingData);
  const tier = week <= 23 ? 1 : 2;
  const sentenceFrames = tier === 1 ? extractSentenceFramesFromExisting(existingData, story.body) : [];

  return {
    type: 'picture',
    image_url: `/images/week${week}/story_writing_pic.jpg`,
    image_prompt: extractImagePrompt(story.body),
    word_bank: wordBank,
    writing_prompts: {
      en: `Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.`,
      vi: `Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả.`,
    },
    rubric_tier: tier,
    ...(sentenceFrames.length > 0 ? { sentence_frames: sentenceFrames } : {}),
  };
}

function injectStoryPrompts(filePath, story, week) {
  if (!fs.existsSync(filePath)) {
    console.log(`  SKIP ${filePath} (missing)`);
    return false;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('story_prompts:')) {
    console.log(`  SKIP ${path.basename(filePath)} (already has story_prompts)`);
    return false;
  }

  let existingData = null;
  try {
    const m = content.match(/export default\s+({[\s\S]*?});?\s*$/);
    if (m) {
      existingData = (new Function('return ' + m[1]))();
    }
  } catch (e) {
    console.log(`  PARSE ERROR ${path.basename(filePath)}: ${e.message}`);
    return false;
  }

  const block = buildBlock(story, week, existingData);
  // Build JS object literal (no quoted keys, no JSON.stringify quirks)
  const lines = [];
  lines.push('type: \'picture\',');
  lines.push(`image_url: '/images/week${week}/story_writing_pic.jpg',`);
  lines.push(`image_prompt: ${JSON.stringify(block.image_prompt)},`);
  lines.push('word_bank: ' + JSON.stringify(block.word_bank) + ',');
  lines.push('writing_prompts: {');
  lines.push(`  en: ${JSON.stringify(block.writing_prompts.en)},`);
  lines.push(`  vi: ${JSON.stringify(block.writing_prompts.vi)}`);
  lines.push('},');
  lines.push(`rubric_tier: ${block.rubric_tier}`);
  if (block.sentence_frames && block.sentence_frames.length > 0) {
    lines.push(',');
    lines.push('sentence_frames: ' + JSON.stringify(block.sentence_frames, null, 2));
  }
  const blockStr = lines.join('\n      ');

  const replacement = `,\n  story_prompts: {\n    picture_mode: {\n      ${blockStr}\n    }\n  }\n}`;

  const newContent = content.replace(/,?\s*}\s*;?\s*$/, replacement);
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`  WROTE ${path.basename(filePath)}`);
  return true;
}

function main() {
  if (!fs.existsSync(STORIES_JSON)) {
    console.error(`Stories JSON not found: ${STORIES_JSON}`);
    console.error('Run the python extract first:');
    console.error('  python3 <(see session log) > /tmp/stories.json');
    process.exit(1);
  }

  const stories = JSON.parse(fs.readFileSync(STORIES_JSON, 'utf8'));
  console.log(`Loaded ${stories.length} stories from ${STORIES_JSON}`);

  let written = 0;
  for (const story of stories) {
    const week = STORY_TO_WEEK[story.num];
    if (!week) continue;
    if (onlyWeek && week !== onlyWeek) continue;
    if (week < 16 || week > 35) continue;

    console.log(`\nW${week} | Story ${story.num} | ${story.name}`);

    const advPath = path.join(WEEKS_DIR, `week_${week}`, 'writing.js');
    const easyPath = path.join(WEEKS_EASY_DIR, `week_${week}`, 'writing.js');

    if (injectStoryPrompts(advPath, story, week)) written++;
    if (injectStoryPrompts(easyPath, story, week)) written++;
  }

  console.log(`\nDone. ${written} files updated.`);
}

main();
