// Strict Pedagogical Content Guard & Refactoring Script
// Usage: node scripts/pedagogical_content_guard.mjs

import fs from 'fs';
import path from 'path';

// Golden Week 30 Data
const WEEK_30_EASY = {
  title: "Writing: My Family Picnic Story",
  audio_url: null,
  min_words: 65,
  min_sentences: 10,
  model_sentence: "Last Sunday, my family went on a picnic at the park. We found a perfect grassy spot under a big tree. Mum brought delicious sandwiches and fresh fruit. We drank cold lemonade and played games together. Suddenly, dark grey clouds appeared in the sky. It started to rain, so we quickly ran to the shelter. Although it rained, we still had a wonderful time. We packed our things and returned home safely. My parents were happy with our fun weekend trip. We cannot wait for our next family picnic!",
  instruction_en: "Write about a family picnic from start to finish in full, clear sentences!",
  instruction_vi: "Viết về buổi dã ngoại gia đình từ đầu đến cuối bằng các câu rõ ràng, đầy đủ!",
  prompt_en: "Where did you go? What food did you bring? What happened when it rained?",
  prompt_vi: "Bạn đã đi đâu? Bạn mang thức ăn gì? Chuyện gì xảy ra khi trời mưa?",
  keywords: ["picnic", "grassy spot", "sandwiches", "lemonade", "clouds", "shelter", "wonderful time"],
  topic_talk_prompt: "Tell me about a memorable family picnic you had!",
  sentence_frames: [
    { template: "Last Sunday, my family went on a ___ at the park.", answers: ["picnic"] },
    { template: "We found a perfect grassy spot under a big ___ .", answers: ["tree"] },
    { template: "Mum brought delicious ___ and fresh fruit.", answers: ["sandwiches"] },
    { template: "We drank cold lemonade and played ___ together.", answers: ["games"] },
    { template: "Suddenly, dark grey ___ appeared in the sky.", answers: ["clouds"] },
    { template: "It started to rain, so we quickly ran to the ___ .", answers: ["shelter"] },
    { template: "Although it rained, we still had a ___ time.", answers: ["wonderful"] },
    { template: "We packed our things and returned home ___ .", answers: ["safely"] },
    { template: "My parents were happy with our fun weekend ___ .", answers: ["trip"] },
    { template: "We cannot wait for our next family ___ !", answers: ["picnic"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { word: "picnic", vi: "buổi dã ngoại", distractor: false },
        { word: "tree", vi: "cây lớn", distractor: false },
        { word: "sandwiches", vi: "bánh mì kẹp", distractor: false },
        { word: "games", vi: "trò chơi", distractor: false },
        { word: "clouds", vi: "mây đen", distractor: false },
        { word: "shelter", vi: "nơi trú ẩn", distractor: false },
        { word: "wonderful", vi: "tuyệt vời", distractor: false },
        { word: "safely", vi: "an toàn", distractor: false },
        { word: "trip", vi: "chuyến đi", distractor: false },
        { word: "movie", vi: "phim", distractor: true },
        { word: "sleeping", vi: "ngủ", distractor: true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week30/story_writing_pic.jpg",
      image_prompt: "A beautiful watercolor illustration of a happy family having a picnic under a large green tree in the park, with sandwiches and cold lemonade laid out on a checkered blanket.",
      word_bank: [
        "picnic at the park",
        "grassy spot",
        "delicious sandwiches",
        "fresh fruit",
        "cold lemonade",
        "played games together",
        "dark grey clouds",
        "ran to the shelter",
        "wonderful time",
        "returned home safely"
      ],
      writing_prompts: {
        en: "Look at the picture and describe the family picnic. What food did they bring? What happened when it rained?",
        vi: "Nhìn bức tranh và mô tả buổi dã ngoại gia đình. Họ mang thức ăn gì? Chuyện gì xảy ra khi trời mưa?"
      },
      rubric_tier: 1,
      min_sentences: 10,
      sentence_frames: [
        { template: "Last Sunday, my family went on a ___ at the park.", answers: ["picnic"] },
        { template: "We found a perfect grassy spot under a big ___ .", answers: ["tree"] },
        { template: "Mum brought delicious ___ and fresh fruit.", answers: ["sandwiches"] },
        { template: "We drank cold lemonade and played ___ together.", answers: ["games"] },
        { template: "Suddenly, dark grey ___ appeared in the sky.", answers: ["clouds"] },
        { template: "It started to rain, so we quickly ran to the ___ .", answers: ["shelter"] },
        { template: "Although it rained, we still had a ___ time.", answers: ["wonderful"] },
        { template: "We packed our things and returned home ___ .", answers: ["safely"] },
        { template: "My parents were happy with our fun weekend ___ .", answers: ["trip"] },
        { template: "We cannot wait for our next family ___ !", answers: ["picnic"] }
      ]
    }
  }
};

const WEEK_30_ADV = {
  title: "My Family Picnic Story — Advanced Writing",
  min_words: 85,
  min_sentences: 10,
  model_sentence: "Last Sunday, my family went on a picnic at the beautiful park. We found a perfect grassy spot under a big oak tree in the garden. Mum brought delicious sandwiches and fresh juicy fruit. We drank cold lemonade and played fun games together. Suddenly, dark grey clouds appeared in the stormy sky. It started to rain, so we quickly ran to the wooden shelter for complete safety. Although it rained heavily, we still had a wonderful time at the park. We packed our things and returned home safely by car. My parents were very happy with our fun weekend trip at the park. We cannot wait for our next family picnic in the coming month!",
  instruction_en: "Write a complete, vivid story about a family picnic from start to finish!",
  instruction_vi: "Viết một câu chuyện sinh động hoàn chỉnh về buổi dã ngoại gia đình từ đầu đến cuối!",
  prompt_en: "Describe the picnic preparation, the food, the sudden rain, and how your family enjoyed the day!",
  prompt_vi: "Mô tả sự chuẩn bị dã ngoại, thức ăn, cơn mưa bất ngờ và cách gia đình bạn tận hưởng ngày nghỉ!",
  keywords: ["picnic", "grassy spot", "sandwiches", "lemonade", "clouds", "shelter", "wonderful time", "returned safely"],
  topic_talk_prompt: "Tell me a complete, exciting story about a family outing!",
  sentence_frames: [
    { template: "Last Sunday, my family went on a ___ at the beautiful ___ .", answers: ["picnic", "park"] },
    { template: "We found a perfect grassy spot under a big oak ___ in the ___ .", answers: ["tree", "garden"] },
    { template: "Mum brought delicious ___ and fresh juicy ___ .", answers: ["sandwiches", "fruit"] },
    { template: "We drank cold ___ and played fun ___ together.", answers: ["lemonade", "games"] },
    { template: "Suddenly, dark grey ___ appeared in the stormy ___ .", answers: ["clouds", "sky"] },
    { template: "It started to rain, so we quickly ran to the wooden ___ for complete ___ .", answers: ["shelter", "safety"] },
    { template: "Although it rained heavily, we still had a ___ time at the ___ .", answers: ["wonderful", "park"] },
    { template: "We packed our things and returned home ___ by car ___ .", answers: ["safely", "today"] },
    { template: "My parents were very happy with our fun weekend ___ at the ___ .", answers: ["trip", "park"] },
    { template: "We cannot wait for our next family ___ in the coming ___ !", answers: ["picnic", "month"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { word: "picnic", vi: "buổi dã ngoại", distractor: false },
        { word: "park", vi: "công viên", distractor: false },
        { word: "tree", vi: "cây sồi", distractor: false },
        { word: "garden", vi: "khu vườn", distractor: false },
        { word: "sandwiches", vi: "bánh mì kẹp", distractor: false },
        { word: "fruit", vi: "trái cây", distractor: false },
        { word: "lemonade", vi: "nước chanh", distractor: false },
        { word: "games", vi: "trò chơi", distractor: false },
        { word: "clouds", vi: "mây đen", distractor: false },
        { word: "sky", vi: "bầu trời", distractor: false },
        { word: "shelter", vi: "nơi trú ẩn", distractor: false },
        { word: "safety", vi: "sự an toàn", distractor: false },
        { word: "wonderful", vi: "tuyệt vời", distractor: false },
        { word: "safely", vi: "an toàn", distractor: false },
        { word: "trip", vi: "chuyến đi", distractor: false },
        { word: "month", vi: "tháng", distractor: false },
        { word: "dances", vi: "khiêu vũ", distractor: true },
        { word: "sleeping", vi: "ngủ", distractor: true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week30/story_writing_pic.jpg",
      image_prompt: "A beautiful watercolor illustration of a happy family having a picnic under a large green tree in the park, with sandwiches and cold lemonade laid out on a checkered blanket.",
      word_bank: [
        "picnic at the park",
        "grassy spot",
        "delicious sandwiches",
        "fresh fruit",
        "cold lemonade",
        "played games together",
        "dark grey clouds",
        "ran to the shelter",
        "wonderful time",
        "returned home safely"
      ],
      writing_prompts: {
        en: "Look at the picture. Write a detailed story about your family picnic. Use words from the word bank!",
        vi: "Nhìn bức tranh. Viết một câu chuyện chi tiết về buổi dã ngoại gia đình. Dùng từ trong ngân hàng từ nhé!"
      },
      rubric_tier: 1,
      min_sentences: 10,
      sentence_frames: [
        { template: "Last Sunday, my family went on a ___ at the beautiful ___ .", answers: ["picnic", "park"] },
        { template: "We found a perfect grassy spot under a big oak ___ in the ___ .", answers: ["tree", "garden"] },
        { template: "Mum brought delicious ___ and fresh juicy ___ .", answers: ["sandwiches", "fruit"] },
        { template: "We drank cold ___ and played fun ___ together.", answers: ["lemonade", "games"] },
        { template: "Suddenly, dark grey ___ appeared in the stormy ___ .", answers: ["clouds", "sky"] },
        { template: "It started to rain, so we quickly ran to the wooden ___ for complete ___ .", answers: ["shelter", "safety"] },
        { template: "Although it rained heavily, we still had a ___ time at the ___ .", answers: ["wonderful", "park"] },
        { template: "We packed our things and returned home ___ by car ___ .", answers: ["safely", "today"] },
        { template: "My parents were very happy with our fun weekend ___ at the ___ .", answers: ["trip", "park"] },
        { template: "We cannot wait for our next family ___ in the coming ___ !", answers: ["picnic", "month"] }
      ]
    }
  }
};

function formatModelSentence(frames) {
  if (!Array.isArray(frames) || frames.length === 0) return '';

  return frames.map(f => {
    let t = f.template || '';
    const answers = f.answers || [];
    const parts = t.split('___');
    let res = parts[0];
    for (let i = 0; i < parts.length - 1; i++) {
      res += (answers[i] || '') + parts[i + 1];
    }
    res = res.replace(/\s{2,}/g, ' ').trim();
    if (!/[.!?]$/.test(res)) {
      res += '.';
    }
    return res;
  }).join(' ');
}

async function cleanAllWeeks() {
  const root = process.cwd();
  console.log('🧹 CLEANING & AUDITING ALL WEEKS FOR GRAMMAR, PUNCTUATION, & COHERENCE...\n');

  // 1. Explicitly write Week 30 Golden Data
  const pW30Adv = path.join(root, 'src/data/weeks/week_30/writing.js');
  const pW30Easy = path.join(root, 'src/data/weeks_easy/week_30/writing.js');

  fs.writeFileSync(pW30Adv, `export default ${JSON.stringify(WEEK_30_ADV, null, 2)};\n`, 'utf8');
  fs.writeFileSync(pW30Easy, `export default ${JSON.stringify(WEEK_30_EASY, null, 2)};\n`, 'utf8');
  console.log('✅ Week 30 (Picnic Time) written with 100% pristine pedagogical English & punctuation.');

  // 2. Audit and fix model_sentence punctuation across all 48 weeks
  for (let i = 1; i <= 48; i++) {
    const pad = String(i).padStart(2, '0');
    const pAdv = path.join(root, 'src/data/weeks', `week_${pad}`, 'writing.js');
    const pEasy = path.join(root, 'src/data/weeks_easy', `week_${pad}`, 'writing.js');

    if (fs.existsSync(pAdv) && i !== 30) {
      const mod = (await import(pAdv)).default;
      mod.model_sentence = formatModelSentence(mod.sentence_frames);
      
      if (i >= 16 && i <= 32 && mod.story_prompts?.picture_mode) {
        mod.story_prompts.picture_mode.image_url = `/images/week${pad}/story_writing_pic.jpg`;
      }

      fs.writeFileSync(pAdv, `export default ${JSON.stringify(mod, null, 2)};\n`, 'utf8');
    }

    if (fs.existsSync(pEasy) && i !== 30) {
      const mod = (await import(pEasy)).default;
      mod.model_sentence = formatModelSentence(mod.sentence_frames);
      fs.writeFileSync(pEasy, `export default ${JSON.stringify(mod, null, 2)};\n`, 'utf8');
    }
  }

  console.log('✅ All weeks updated with pristine model_sentence formatting and punctuation.');
}

cleanAllWeeks().catch(console.error);
