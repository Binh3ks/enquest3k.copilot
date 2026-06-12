// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Writing Station — Advanced Mode

export default {
  title: "Jake's Accident Story",
  min_sentences: 8,
  theme: "accidents_and_consequences",
  min_words: 45,
  model_sentence: "Last week, Jake walked too fast in the school corridor and fell down near the staircase. He hurt his knee badly. His teacher came and said, 'Walk carefully, Jake!' The nurse cleaned the wound and put a bandage on it. Jake learned an important lesson: always walk carefully in the corridor. We must walk carefully to stay safe!",
  topic_talk_prompt: "Tell me about a time when you got hurt or saw someone get hurt at school!",
  sentence_frames: [
    {
        "template": "Jake ___ too fast in the corridor and ___ down near the staircase.",
        "answers": [
            "walked",
            "ran",
            "fell"
        ]
    },
    {
        "template": "He ___ his knee and it ___ very badly.",
        "answers": [
            "hurt",
            "hurt",
            "began to bleed"
        ]
    },
    {
        "template": "His teacher heard Jake ___ and ___ to help him right away.",
        "answers": [
            "crying",
            "ran",
            "came",
            "hurried"
        ]
    },
    {
        "template": "The nurse ___ the wound and ___ a bandage on Jake's knee.",
        "answers": [
            "cleaned",
            "put",
            "placed"
        ]
    },
    {
        "template": "Jake ___ to walk carefully after that because he ___ how painful it was.",
        "answers": [
            "learned",
            "began",
            "remembered",
            "saw"
        ]
    },
    {
        "template": "The teacher told Jake: 'Always ___ ___ in the corridor!'",
        "answers": [
            "walk",
            "carefully"
        ]
    },
    {
        "template": "Jake told everyone: '___ ___ ___ in the corridor or you might ___ and ___!'",
        "answers": [
            "Walk",
            "slowly",
            "carefully",
            "fall",
            "hurt yourself"
        ]
    },
    {
        "template": "Now Jake always ___ carefully and never ___ in the corridor because he ___ his lesson.",
        "answers": [
            "walks",
            "runs",
            "learned",
            "remembered"
        ]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "walked", "vi": "đi bộ", "distractor": false },
        { "word": "ran", "vi": "chạy", "distractor": false },
        { "word": "fell", "vi": "ngã", "distractor": false },
        { "word": "hurt", "vi": "bị thương", "distractor": false },
        { "word": "began to bleed", "vi": "bắt đầu chảy máu", "distractor": false },
        { "word": "crying", "vi": "khóc", "distractor": false },
        { "word": "ran", "vi": "chạy đến", "distractor": false },
        { "word": "came", "vi": "đến", "distractor": false },
        { "word": "cleaned", "vi": "lau sạch", "distractor": false },
        { "word": "put", "vi": "đặt", "distractor": false },
        { "word": "learned", "vi": "học được", "distractor": false },
        { "word": "walk carefully", "vi": "đi cẩn thận", "distractor": false },
        { "word": "walks", "vi": "đi bộ", "distractor": false },
        { "word": "runs", "vi": "chạy", "distractor": false },
        { "word": "lesson", "vi": "bài học", "distractor": false },
        { "word": "slowly", "vi": "chậm rãi", "distractor": true },
        { "word": "faster", "vi": "nhanh hơn", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week33/story_writing_pic.jpg',
      image_prompt: "This interesting picture shows a terrible and painful accident that happened at my school yesterday afternoon. My good friend Leo was running very fast down the main corridor because he was late for his important math class. He did not look carefully where he was going, and he completely ignored the strict school rules. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["walked","ran","fell","hurt","began to bleed","crying","came","cleaned","put","learned","walk carefully","walks","runs","lesson"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 2
    }
  }
}