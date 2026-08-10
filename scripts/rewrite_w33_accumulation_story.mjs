// Rewrite Week 33 Tab 1 Model Challenge with Cambridge Accumulation Story
import fs from 'fs';
import path from 'path';

const week33AccumulationData = {
  "title": "Jake's Accident Story",
  "min_sentences": 10,
  "theme": "accidents_and_consequences",
  "min_words": 65,
  "model_sentence": "On a bright sunny day, Jake was walking smoothly down the school corridor. The floor was very wet because the janitor had just washed it. Suddenly, Leo ran past Jake while he was walking without looking carefully. Leo slipped on the wet floor and fell down hard. He hurt his knee badly and burst into tears. The teacher heard him crying and rushed over to help. She gently put a cold ice pack on Leo's injured knee. The nurse cleaned the wound and wrapped a clean bandage. Leo felt extremely relieved and thanked his teacher. Everyone learned a valuable lesson to walk safely.",
  "topic_talk_prompt": "Tell me about a time when you got hurt or saw someone get hurt at school!",
  "sentence_frames": [
    {
      "template": "On a _____ day, Jake was walking _____ down the school corridor.",
      "answers": ["bright sunny", "smoothly"]
    },
    {
      "template": "The floor was very wet because the janitor had _____ washed it.",
      "answers": ["just"]
    },
    {
      "template": "_____, Leo ran past Jake while he was walking without looking _____.",
      "answers": ["Suddenly", "carefully"]
    },
    {
      "template": "Leo _____ on the wet floor and fell down _____.",
      "answers": ["slipped", "hard"]
    },
    {
      "template": "He hurt his knee badly and _____ into tears.",
      "answers": ["burst"]
    },
    {
      "template": "The teacher heard him crying and _____ over to help.",
      "answers": ["rushed"]
    },
    {
      "template": "She gently put a cold _____ pack on Leo's injured knee.",
      "answers": ["ice"]
    },
    {
      "template": "The nurse cleaned the wound and wrapped a _____ bandage.",
      "answers": ["clean"]
    },
    {
      "template": "Leo felt _____ relieved and thanked his teacher.",
      "answers": ["extremely"]
    },
    {
      "template": "Everyone learned a _____ lesson to walk safely.",
      "answers": ["valuable"]
    }
  ],
  "hints": {
    "vocabulary_bank": {
      "label_en": "💡 Need help? Click 💡 next to each blank",
      "label_vi": "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      "show_by_default": false,
      "scaffolding_stage": "medium",
      "words": [
        { "word": "bright sunny", "vi": "nắng đẹp rực rỡ", "distractor": false },
        { "word": "smoothly", "vi": "mượt mà, êm ả", "distractor": false },
        { "word": "just", "vi": "vừa mới", "distractor": false },
        { "word": "Suddenly", "vi": "Đột nhiên", "distractor": false },
        { "word": "carefully", "vi": "cẩn thận", "distractor": false },
        { "word": "slipped", "vi": "trượt chân", "distractor": false },
        { "word": "hard", "vi": "mạnh", "distractor": false },
        { "word": "burst", "vi": "oà khóc", "distractor": false },
        { "word": "rushed", "vi": "vội vã chạy đến", "distractor": false },
        { "word": "ice", "vi": "đá lạnh", "distractor": false },
        { "word": "clean", "vi": "sạch sẻ", "distractor": false },
        { "word": "extremely", "vi": "cực kỳ", "distractor": false },
        { "word": "valuable", "vi": "quý giá", "distractor": false },
        { "word": "slowly", "vi": "chậm rãi", "distractor": true },
        { "word": "faster", "vi": "nhanh hơn", "distractor": true }
      ]
    }
  },
  "story_prompts": {
    "picture_mode": {
      "type": "picture",
      "image_url": "/images/week33/story_writing_pic.jpg",
      "image_prompt": "This interesting picture shows a terrible and painful accident that happened at my school yesterday afternoon. My good friend Leo was running very fast down the main corridor because he was late for his important math class. He did not look carefully where he was going, and he completely ignored the strict school rules. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
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

async function rewriteW33Accumulation() {
  const root = process.cwd();
  console.log('⚡ REWRITING WEEK 33 TAB 1 WITH CAMBRIDGE ACCUMULATION STORY...\n');

  const targets = [
    path.join(root, 'src/data/weeks/week_33/writing.js'),
    path.join(root, 'src/data/weeks_easy/week_33/writing.js')
  ];

  for (const targetPath of targets) {
    if (fs.existsSync(path.dirname(targetPath))) {
      const code = `export default ${JSON.stringify(week33AccumulationData, null, 2)};\n`;
      fs.writeFileSync(targetPath, code, 'utf8');
      console.log(`✅ Overwrote W33 accumulation writing.js in: ${path.relative(root, targetPath)}`);
    }
  }

  console.log('\n🎉 WEEK 33 ACCUMULATION STORY REWRITE COMPLETE!');
}

rewriteW33Accumulation().catch(console.error);
