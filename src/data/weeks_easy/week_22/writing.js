export default {
  title: "The Time Detective",
  min_words: 28,
  model_sentence: "I am a time detective. I asked my friend questions. Did you walk to school? Did you eat breakfast? My friend answered yes to both.",
  instruction_en: "Write a time detective interview using past tense questions!",
  instruction_vi: "Vi\u1ebft m\u1ed9t cu\u1ed9c ph\u1ecfng v\u1ea5n th\u00e1m t\u1eed th\u1eddi gian b\u1eb1ng c\u00e2u h\u1ecfi qu\u00e1 kh\u1ee9!",
  prompt_en: "What questions did you ask? What did your friend answer?",
  prompt_vi: "B\u1ea1n \u0111\u00e3 h\u1ecfi g\u00ec? B\u1ea1n c\u1ee7a b\u1ea1n \u0111\u00e3 tr\u1ea3 l\u1eddi g\u00ec?",
  keywords: ["detective", "asked", "walk", "breakfast", "answered"],
  topic_talk_prompt: "Interview a friend using past tense questions!",
  sentence_frames: [
    {
        "template": "I am a time ___.",
        "answers": [
            "detective"
        ]
    },
    {
        "template": "I ___ my friend questions.",
        "answers": [
            "asked"
        ]
    },
    {
        "template": "Did you ___ to school?",
        "answers": [
            "walk"
        ]
    },
    {
        "template": "Did you eat ___?",
        "answers": [
            "breakfast"
        ]
    },
    {
        "template": "My friend ___ yes to both.",
        "answers": [
            "answered"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
    {
        "word": "detective",
        "vi": "thám tử",
        "distractor": false
    },
    {
        "word": "asked",
        "vi": "đã hỏi",
        "distractor": false
    },
    {
        "word": "walk",
        "vi": "đi bộ",
        "distractor": false
    },
    {
        "word": "breakfast",
        "vi": "bữa sáng",
        "distractor": false
    },
    {
        "word": "answered",
        "vi": "đã trả lời",
        "distractor": false
    },
    {
        "word": "superhero",
        "vi": "siêu anh hùng",
        "distractor": true
    },
    {
        "word": "telling",
        "vi": "đang nói",
        "distractor": true
    },
    {
        "word": "lunch",
        "vi": "bữa trưa — không khớp",
        "distractor": true
    }
]
    }
  }
};
