// Fix Week 9 explicit golden override & purge synthetic connectives across all weeks
// Usage: node scripts/fix_week09_and_purge_synthetic_connectives.mjs

import fs from 'fs';
import path from 'path';

const WEEK_09_EASY = {
  title: "Writing: City Sounds & Sights",
  min_words: 35,
  min_sentences: 6,
  model_sentence: "I walk on a busy street every day. There are many people and cars everywhere. It is a very noisy place. I see a very tall building near the bus stop. A yellow bus stops near me and people get on. There is lots of traffic on the main road.",
  instruction_en: "Write about city sounds and sights in full sentences!",
  instruction_vi: "Viết về âm thanh và cảnh vật thành phố bằng các câu đầy đủ!",
  prompt_en: "What do you see and hear in the city? What vehicles are on the road?",
  prompt_vi: "Bạn thấy và nghe gì ở thành phố? Phương tiện nào có trên đường?",
  keywords: ["street", "cars", "noisy", "building", "bus", "traffic"],
  topic_talk_prompt: "Tell me about the city where you live or visit!",
  sentence_frames: [
    { template: "I walk on a busy ___ every day.", answers: ["street"] },
    { template: "There are many people and ___ everywhere.", answers: ["cars"] },
    { template: "It is a very ___ place.", answers: ["noisy"] },
    { template: "I see a very tall ___ near the bus stop.", answers: ["building"] },
    { template: "A yellow ___ stops near me and people get on.", answers: ["bus"] },
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
        { word: "quiet", vi: "yên tĩnh", distractor: true }
      ]
    }
  }
};

const WEEK_09_ADV = {
  title: "City Sounds & Sights — Advanced Writing",
  min_words: 45,
  min_sentences: 6,
  model_sentence: "I walk on a busy city street every day. There are many people and cars everywhere. It is a very truly noisy place. I see a tall building near the bus stop. A yellow bus stops and people get on. There is lots of traffic on the main road.",
  instruction_en: "Write a complete descriptive passage about city life!",
  instruction_vi: "Viết đoạn văn mô tả hoàn chỉnh về cuộc sống thành phố!",
  prompt_en: "Describe the busy streets, buildings, and traffic in the city!",
  prompt_vi: "Mô tả những con phố đông đúc, các tòa nhà và giao thông ở thành phố!",
  keywords: ["busy street", "every day", "many people", "everywhere", "very noisy", "bus stop", "traffic", "main road"],
  topic_talk_prompt: "Tell me a detailed story about city sights and sounds!",
  sentence_frames: [
    { template: "I walk on a ___ city street ___.", answers: ["busy", "every day"] },
    { template: "There are ___ people and cars ___.", answers: ["many", "everywhere"] },
    { template: "It is a ___ truly noisy ___.", answers: ["very", "place"] },
    { template: "I see a tall ___ near the ___.", answers: ["building", "bus stop"] },
    { template: "A yellow ___ stops and people ___.", answers: ["bus", "get on"] },
    { template: "There is lots of ___ on the ___.", answers: ["traffic", "main road"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { word: "busy", vi: "bận rộn, đông đúc", distractor: false },
        { word: "every day", vi: "mỗi ngày", distractor: false },
        { word: "many", vi: "nhiều", distractor: false },
        { word: "everywhere", vi: "khắp nơi", distractor: false },
        { word: "very", vi: "rất", distractor: false },
        { word: "place", vi: "nơi chốn", distractor: false },
        { word: "building", vi: "tòa nhà", distractor: false },
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

const SYNTHETIC_CONNECTIVES_REGEX = /\s+(?:then|so|next|finally)\s*([.,!?])/gi;

function purgeSyntheticConnectives(template) {
  if (!template) return '';
  let t = template;
  t = t.replace(SYNTHETIC_CONNECTIVES_REGEX, '$1');
  t = t.replace(/\s+([.,!?;:])/g, '$1');
  t = t.replace(/\s{2,}/g, ' ').trim();
  return t;
}

function reformatModelSentence(frames) {
  if (!Array.isArray(frames) || frames.length === 0) return '';
  return frames.map(f => {
    let t = f.template || '';
    const answers = f.answers || [];
    const parts = t.split('___');
    let res = parts[0];
    for (let i = 0; i < parts.length - 1; i++) {
      res += (answers[i] || '') + parts[i + 1];
    }
    res = res.replace(/\s+([.,!?;:])/g, '$1');
    res = res.replace(/\s{2,}/g, ' ').trim();
    if (!/[.!?]$/.test(res)) {
      res += '.';
    }
    return res;
  }).join(' ');
}

async function fixWeek09AndPurge() {
  const root = process.cwd();
  console.log('🚀 OVERRIDING WEEK 09 GOLDEN DATASET & PURGING SYNTHETIC CONNECTIVES...\n');

  // 1. Write Week 09 Golden Datasets
  const pW09Adv = path.join(root, 'src/data/weeks/week_09/writing.js');
  const pW09Easy = path.join(root, 'src/data/weeks_easy/week_09/writing.js');

  fs.writeFileSync(pW09Adv, `export default ${JSON.stringify(WEEK_09_ADV, null, 2)};\n`, 'utf8');
  fs.writeFileSync(pW09Easy, `export default ${JSON.stringify(WEEK_09_EASY, null, 2)};\n`, 'utf8');
  console.log('✅ Week 09 Easy and Advanced datasets explicitly overridden with golden pedagogical English.');

  // 2. Purge synthetic connectives across all 48 weeks
  for (let i = 1; i <= 48; i++) {
    if (i === 9) continue;
    const pad = String(i).padStart(2, '0');
    const pAdv = path.join(root, 'src/data/weeks', `week_${pad}`, 'writing.js');
    const pEasy = path.join(root, 'src/data/weeks_easy', `week_${pad}`, 'writing.js');

    if (fs.existsSync(pAdv)) {
      const mod = (await import(pAdv)).default;
      if (Array.isArray(mod.sentence_frames)) {
        mod.sentence_frames = mod.sentence_frames.map(f => {
          const cleanT = purgeSyntheticConnectives(f.template);
          const cleanA = (f.answers || []).filter(a => !['then', 'so', 'next', 'finally'].includes(String(a).toLowerCase()));
          return { template: cleanT, answers: cleanA.length > 0 ? cleanA : (f.answers || []) };
        });
      }
      mod.model_sentence = reformatModelSentence(mod.sentence_frames);
      fs.writeFileSync(pAdv, `export default ${JSON.stringify(mod, null, 2)};\n`, 'utf8');
    }

    if (fs.existsSync(pEasy)) {
      const mod = (await import(pEasy)).default;
      if (Array.isArray(mod.sentence_frames)) {
        mod.sentence_frames = mod.sentence_frames.map(f => {
          const cleanT = purgeSyntheticConnectives(f.template);
          const cleanA = (f.answers || []).filter(a => !['then', 'so', 'next', 'finally'].includes(String(a).toLowerCase()));
          return { template: cleanT, answers: cleanA.length > 0 ? cleanA : (f.answers || []) };
        });
      }
      mod.model_sentence = reformatModelSentence(mod.sentence_frames);
      fs.writeFileSync(pEasy, `export default ${JSON.stringify(mod, null, 2)};\n`, 'utf8');
    }
  }

  console.log('✅ Purge of synthetic connectives complete across all weeks.');
}

fixWeek09AndPurge().catch(console.error);
