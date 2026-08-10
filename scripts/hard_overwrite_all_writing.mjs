// Hard Overwrite Script for Writing Datasets (W01–W48+)
// Strictly overwrites file content without merging old junk strings.

import fs from 'fs';
import path from 'path';

// EXACT GOLDEN DATASET FOR WEEK 09
const WEEK_09_EASY = {
  title: "Writing: City Sounds & Sights",
  min_words: 35,
  min_sentences: 6,
  model_sentence: "I walk on a busy street every day. There are many people and cars everywhere. It is a very noisy place. I see a tall building near the bus stop. A yellow bus arrives and people get on. There is lots of traffic on the main road.",
  instruction_en: "Write about city sounds and sights in full sentences!",
  instruction_vi: "Viết về âm thanh và cảnh vật thành phố bằng các câu đầy đủ!",
  prompt_en: "What do you see and hear in the city? What vehicles are on the road?",
  prompt_vi: "Bạn thấy và nghe gì ở thành phố? Phương tiện nào có trên đường?",
  keywords: ["street", "cars", "noisy", "building", "bus", "traffic"],
  topic_talk_prompt: "Tell me about the city where you live or visit!",
  sentence_frames: [
    { template: "I walk on a ___ every day.", answers: ["street"] },
    { template: "There are many people and ___ everywhere.", answers: ["cars"] },
    { template: "It is a very ___ place.", answers: ["noisy"] },
    { template: "I see a tall ___ near the bus stop.", answers: ["building"] },
    { template: "A yellow ___ arrives and people get on.", answers: ["bus"] },
    { template: "There is lots of ___ on the main road.", answers: ["traffic"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { word: "street", vi: "con đường", distractor: false },
        { word: "cars", vi: "xe ô tô", distractor: false },
        { word: "noisy", vi: "ồn ào", distractor: false },
        { word: "building", vi: "tòa nhà", distractor: false },
        { word: "bus", vi: "xe buýt", distractor: false },
        { word: "traffic", vi: "giao thông", distractor: false },
        { word: "park", vi: "công viên", distractor: true },
        { word: "house", vi: "ngôi nhà", distractor: true },
        { word: "birds", vi: "chim", distractor: true },
        { word: "trees", vi: "cây cối", distractor: true },
        { word: "quiet", vi: "yên tĩnh", distractor: true },
        { word: "green", vi: "xanh lá", distractor: true }
      ]
    }
  }
};

const WEEK_09_ADV = {
  title: "City Sounds & Sights — Advanced Writing",
  min_words: 45,
  min_sentences: 6,
  model_sentence: "I walk on a busy street every day. There are many people and cars everywhere. It is a very noisy place. I see a tall building near the bus stop. A yellow bus arrives and people get on. There is lots of traffic on the main road.",
  instruction_en: "Write a complete descriptive passage about city life!",
  instruction_vi: "Viết đoạn văn mô tả hoàn chỉnh về cuộc sống thành phố!",
  prompt_en: "Describe the busy streets, buildings, and traffic in the city!",
  prompt_vi: "Mô tả những con phố đông đúc, các tòa nhà và giao thông ở thành phố!",
  keywords: ["busy street", "every day", "many people", "everywhere", "very noisy", "bus stop", "traffic", "main road"],
  topic_talk_prompt: "Tell me a detailed story about city sights and sounds!",
  sentence_frames: [
    { template: "I walk on a ___ street ___.", answers: ["busy", "every day"] },
    { template: "There are ___ people and ___ everywhere.", answers: ["many", "cars"] },
    { template: "It is a ___ noisy ___.", answers: ["very", "place"] },
    { template: "I see a ___ building near the ___.", answers: ["tall", "bus stop"] },
    { template: "A yellow ___ arrives and people ___.", answers: ["bus", "get on"] },
    { template: "There is lots of ___ on the ___.", answers: ["traffic", "main road"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { word: "busy", vi: "đông đúc", distractor: false },
        { word: "every day", vi: "mỗi ngày", distractor: false },
        { word: "many", vi: "nhiều", distractor: false },
        { word: "cars", vi: "xe ô tô", distractor: false },
        { word: "very", vi: "rất", distractor: false },
        { word: "place", vi: "nơi chốn", distractor: false },
        { word: "tall", vi: "cao", distractor: false },
        { word: "bus stop", vi: "trạm xe buýt", distractor: false },
        { word: "bus", vi: "xe buýt", distractor: false },
        { word: "get on", vi: "lên xe", distractor: false },
        { word: "traffic", vi: "giao thông", distractor: false },
        { word: "main road", vi: "đường chính", distractor: false },
        { word: "empty", vi: "trống rỗng", distractor: true },
        { word: "sleeping", vi: "đang ngủ", distractor: true }
      ]
    }
  }
};

function cleanSentenceText(str) {
  if (!str) return '';
  return str
    .replace(/\s+([.,!?;:])/g, '$1')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function buildCleanModelSentence(frames) {
  if (!Array.isArray(frames)) return '';
  const sentences = frames.map(f => {
    let t = f.template || '';
    const ans = f.answers || [];
    const parts = t.split('___');
    let res = parts[0];
    for (let i = 0; i < parts.length - 1; i++) {
      res += (ans[i] || '') + parts[i + 1];
    }
    res = cleanSentenceText(res);
    if (!/[.!?]$/.test(res)) {
      res += '.';
    }
    return res;
  });
  return sentences.join(' ');
}

async function hardOverwriteAllWriting() {
  const root = process.cwd();
  console.log('💥 EXECUTING HARD OVERWRITE OF ALL WRITING DATASETS (W01–W48+)...\n');

  // 1. HARD OVERWRITE WEEK 09 EXPLICITLY
  const pW09Adv = path.join(root, 'src/data/weeks/week_09/writing.js');
  const pW09Easy = path.join(root, 'src/data/weeks_easy/week_09/writing.js');

  fs.writeFileSync(pW09Adv, `export default ${JSON.stringify(WEEK_09_ADV, null, 2)};\n`, 'utf8');
  fs.writeFileSync(pW09Easy, `export default ${JSON.stringify(WEEK_09_EASY, null, 2)};\n`, 'utf8');
  console.log('✅ HARD OVERWRITE WEEK 09 COMPLETED (100% FRESH GOLDEN OBJECTS).');

  // 2. HARD OVERWRITE ALL OTHER WEEKS WITH CLEAN NEW SCHEMAS
  for (let i = 1; i <= 48; i++) {
    if (i === 9) continue;
    const pad = String(i).padStart(2, '0');
    const pAdv = path.join(root, 'src/data/weeks', `week_${pad}`, 'writing.js');
    const pEasy = path.join(root, 'src/data/weeks_easy', `week_${pad}`, 'writing.js');

    if (fs.existsSync(pAdv)) {
      const mod = (await import(pAdv)).default;
      if (Array.isArray(mod.sentence_frames)) {
        mod.sentence_frames = mod.sentence_frames.map(f => {
          const t = cleanSentenceText(f.template);
          const a = (f.answers || []).map(ans => cleanSentenceText(String(ans)).replace(/[.,!?;:]/g, ''));
          return { template: t, answers: a };
        });
      }
      mod.model_sentence = buildCleanModelSentence(mod.sentence_frames);

      // ASSET GUARD W16-W32
      if (i >= 16 && i <= 32 && mod.story_prompts?.picture_mode) {
        mod.story_prompts.picture_mode.image_url = `/images/week${pad}/story_writing_pic.jpg`;
      }

      fs.writeFileSync(pAdv, `export default ${JSON.stringify(mod, null, 2)};\n`, 'utf8');
    }

    if (fs.existsSync(pEasy)) {
      const mod = (await import(pEasy)).default;
      if (Array.isArray(mod.sentence_frames)) {
        mod.sentence_frames = mod.sentence_frames.map(f => {
          const t = cleanSentenceText(f.template);
          const a = (f.answers || []).map(ans => cleanSentenceText(String(ans)).replace(/[.,!?;:]/g, ''));
          return { template: t, answers: a };
        });
      }
      mod.model_sentence = buildCleanModelSentence(mod.sentence_frames);

      fs.writeFileSync(pEasy, `export default ${JSON.stringify(mod, null, 2)};\n`, 'utf8');
    }
  }

  console.log('✅ HARD OVERWRITE COMPLETED ACROSS ALL WEEKS.');
}

hardOverwriteAllWriting().catch(console.error);
