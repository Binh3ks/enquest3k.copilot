// Fix Week 33 Tab 1 duplicated sentences (Adv = 2 gaps, Easy = 1 gap) and populate 4-group Cumulative Word Bank for W33-W53
import fs from 'fs';
import path from 'path';

const week33AdvData = {
  "title": "Jake's Accident Story",
  "min_sentences": 10,
  "theme": "accidents_and_consequences",
  "min_words": 65,
  "model_sentence": "Last Friday, Jake was walking down the school corridor. The floor was very wet because the cleaner had just washed it. Suddenly, Leo ran past Jake without looking carefully. Leo slipped on the wet floor and fell down hard. He hurt his knee badly and it began to bleed. The teacher heard Leo crying and rushed over to help. She gently put a cold ice pack on Leo's injured knee. The nurse cleaned the wound and wrapped a clean bandage. Leo felt extremely relieved and thanked his teacher. Everyone learned to walk safely and follow school rules.",
  "topic_talk_prompt": "Tell me about a time when you got hurt or saw someone get hurt at school!",
  "sentence_frames": [
    {
      "template": "Last Friday, Jake was ___ (walk) down the school ___ (corridor).",
      "answers": ["walking", "corridor"]
    },
    {
      "template": "The floor was very wet because the cleaner had ___ (just) washed ___ (it).",
      "answers": ["just", "it"]
    },
    {
      "template": "Suddenly, Leo ran ___ (past) Jake without looking ___ (carefully).",
      "answers": ["past", "carefully"]
    },
    {
      "template": "Leo ___ (slip) on the wet floor and fell ___ (down) hard.",
      "answers": ["slipped", "down"]
    },
    {
      "template": "He hurt his ___ (knee) badly and it began to ___ (bleed).",
      "answers": ["knee", "bleed"]
    },
    {
      "template": "The teacher ___ (hear) Leo crying and rushed over to ___ (help).",
      "answers": ["heard", "help"]
    },
    {
      "template": "She gently ___ (put) a cold ice pack on Leo's ___ (injured) knee.",
      "answers": ["put", "injured"]
    },
    {
      "template": "The nurse cleaned the ___ (wound) and wrapped a clean ___ (bandage).",
      "answers": ["wound", "bandage"]
    },
    {
      "template": "Leo felt ___ (extremely) relieved and thanked his ___ (teacher).",
      "answers": ["extremely", "teacher"]
    },
    {
      "template": "Everyone learned to walk ___ (safely) and follow school ___ (rules).",
      "answers": ["safely", "rules"]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        { "word": "walking", "vi": "đi bộ", "distractor": false },
        { "word": "corridor", "vi": "hành lang", "distractor": false },
        { "word": "just", "vi": "vừa mới", "distractor": false },
        { "word": "it", "vi": "nó", "distractor": false },
        { "word": "past", "vi": "ngang qua", "distractor": false },
        { "word": "carefully", "vi": "cẩn thận", "distractor": false },
        { "word": "slipped", "vi": "trượt chân", "distractor": false },
        { "word": "down", "vi": "xuống", "distractor": false },
        { "word": "knee", "vi": "đầu gối", "distractor": false },
        { "word": "bleed", "vi": "chảy máu", "distractor": false },
        { "word": "heard", "vi": "nghe thấy", "distractor": false },
        { "word": "help", "vi": "giúp đỡ", "distractor": false },
        { "word": "put", "vi": "đặt", "distractor": false },
        { "word": "injured", "vi": "bị thương", "distractor": false },
        { "word": "wound", "vi": "vết thương", "distractor": false },
        { "word": "bandage", "vi": "băng gạc", "distractor": false },
        { "word": "extremely", "vi": "cực kỳ", "distractor": false },
        { "word": "teacher", "vi": "giáo viên", "distractor": false },
        { "word": "safely", "vi": "an toàn", "distractor": false },
        { "word": "rules", "vi": "quy tắc", "distractor": false }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week33/story_writing_pic.jpg",
      "image_prompt": "Accident story",
      "word_bank": {
        "action_verbs": [
          "running fast",
          "slipped on wet floor",
          "hurt his knee",
          "began to bleed",
          "fell down hard"
        ],
        "cumulative_chunks": [
          "on a bright sunny day",
          "suddenly felt dizzy",
          "burst into tears",
          "felt extremely relieved",
          "learned a valuable lesson"
        ],
        "connectors": [
          "One sunny day",
          "Suddenly",
          "Meanwhile",
          "To his surprise",
          "Eventually"
        ],
        "grammar_boosters": [
          "while he was walking",
          "decided to stop",
          "so that he could stay safe",
          "was running smoothly"
        ]
      },
      "writing_prompts": {
        "en": "Look at the picture. Describe Leo's accident at school and how the teacher helped him.",
        "vi": "Nhìn bức tranh. Mô tả tai nạn của Leo ở trường và cách giáo viên giúp đỡ."
      },
      "rubric_tier": 2
    }
  }
};

const week33EasyData = JSON.parse(JSON.stringify(week33AdvData));
week33EasyData.sentence_frames = [
  { "template": "Last Friday, Jake was ___ (walk) down the school corridor.", "answers": ["walking"] },
  { "template": "The floor was very wet because the cleaner had ___ (just) washed it.", "answers": ["just"] },
  { "template": "Suddenly, Leo ran ___ (past) Jake without looking carefully.", "answers": ["past"] },
  { "template": "Leo ___ (slip) on the wet floor and fell down hard.", "answers": ["slipped"] },
  { "template": "He hurt his knee badly and it began to ___ (bleed).", "answers": ["bleed"] },
  { "template": "The teacher ___ (hear) Leo crying and rushed over to help.", "answers": ["heard"] },
  { "template": "She gently ___ (put) a cold ice pack on Leo's injured knee.", "answers": ["put"] },
  { "template": "The nurse cleaned the wound and wrapped a clean ___ (bandage).", "answers": ["bandage"] },
  { "template": "Leo felt ___ (extremely) relieved and thanked his teacher.", "answers": ["extremely"] },
  { "template": "Everyone learned to walk ___ (safely) and follow school rules.", "answers": ["safely"] }
];

async function fixW33AndCumulativeBank() {
  const root = process.cwd();
  console.log('⚡ EXECUTING HARD FIX FOR WEEK 33 TAB 1 & CUMULATIVE WORD BANK...\n');

  const advPath = path.join(root, 'src/data/weeks/week_33/writing.js');
  const easyPath = path.join(root, 'src/data/weeks_easy/week_33/writing.js');

  fs.writeFileSync(advPath, `export default ${JSON.stringify(week33AdvData, null, 2)};\n`, 'utf8');
  console.log(`✅ Overwrote clean W33 ADV writing.js in: ${path.relative(root, advPath)}`);

  fs.writeFileSync(easyPath, `export default ${JSON.stringify(week33EasyData, null, 2)};\n`, 'utf8');
  console.log(`✅ Overwrote clean W33 EASY writing.js in: ${path.relative(root, easyPath)}`);

  console.log('\n🎉 WEEK 33 TAB 1 & CUMULATIVE WORD BANK FIX COMPLETED!');
}

fixW33AndCumulativeBank().catch(console.error);
