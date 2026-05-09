export default {
  title: "The Time Detective Interview",
  min_words: 40,
  model_sentence: "I interviewed my friend like a time detective. I asked, Did you walk to school yesterday? Did you talk to your teacher? My friend answered every question carefully.",
  instruction_en: "Write a time detective interview using past tense questions!",
  instruction_vi: "Vi\u1ebft cu\u1ed9c ph\u1ecfng v\u1ea5n th\u00e1m t\u1eed th\u1eddi gian v\u1edbi c\u00e2u h\u1ecfi qu\u00e1 kh\u1ee9!",
  prompt_en: "What questions did you ask? How did your friend respond?",
  prompt_vi: "B\u1ea1n h\u1ecfi nh\u1eefng g\u00ec? B\u1ea1n b\u00e8 c\u1ee7a b\u1ea1n tr\u1ea3 l\u1eddi th\u1ebf n\u00e0o?",
  keywords: ["interviewed", "time detective", "walk", "school", "talk", "teacher", "answered"],
  topic_talk_prompt: "Conduct a time detective interview about yesterday!",
  sentence_frames: [
    {
        "template": "I ___ my friend like ___.",
        "answers": [
            "interviewed",
            "a time detective"
        ]
    },
    {
        "template": "I asked, Did you ___ yesterday?",
        "answers": [
            "walk to school"
        ]
    },
    {
        "template": "I also asked, Did you ___ to your ___?",
        "answers": [
            "talk",
            "teacher"
        ]
    },
    {
        "template": "My friend answered every question ___.",
        "answers": [
            "carefully"
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
        "word": "interviewed",
        "vi": "phỏng vấn",
        "distractor": false
    },
    {
        "word": "a time detective",
        "vi": "một thám tử thời gian",
        "distractor": false
    },
    {
        "word": "walk to school",
        "vi": "đi bộ đến trường",
        "distractor": false
    },
    {
        "word": "talk",
        "vi": "nói chuyện",
        "distractor": false
    },
    {
        "word": "teacher",
        "vi": "giáo viên",
        "distractor": false
    },
    {
        "word": "carefully",
        "vi": "cẩn thận",
        "distractor": false
    },
    {
        "word": "ignored",
        "vi": "bỏ qua",
        "distractor": true
    },
    {
        "word": "a superhero",
        "vi": "siêu anh hùng",
        "distractor": true
    },
    {
        "word": "tomorrow",
        "vi": "ngày mai",
        "distractor": true
    }
]
    }
  }
};
