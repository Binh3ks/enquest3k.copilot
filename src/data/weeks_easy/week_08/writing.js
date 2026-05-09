export default {
  title: "My Classroom",
  min_words: 20,
  model_sentence: "My classroom is nice! There are desks and chairs for everyone. There are pencils and markers in my bag. There are books on the shelf. I love my classroom.",
  instruction_en: "Write about your classroom!",
  instruction_vi: "Vi\u1ebft v\u1ec1 l\u1edbp h\u1ecdc c\u1ee7a b\u1ea1n!",
  prompt_en: "What is in your classroom? How do you feel about it?",
  prompt_vi: "L\u1edbp h\u1ecdc c\u1ee7a b\u1ea1n c\u00f3 g\u00ec? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o v\u1ec1 l\u1edbp?",
  keywords: ["classroom", "desks", "chairs", "pencils", "books", "love"],
  topic_talk_prompt: "What is your classroom like?",
  sentence_frames: [
    {
        "template": "My classroom is ___.",
        "answers": [
            "nice"
        ]
    },
    {
        "template": "There are ___ and ___ for everyone.",
        "answers": [
            "desks",
            "chairs"
        ]
    },
    {
        "template": "There are ___ on the shelf.",
        "answers": [
            "books"
        ]
    },
    {
        "template": "I ___ my classroom.",
        "answers": [
            "love"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "high",
      words: [
    {
        "word": "nice",
        "vi": "đẹp",
        "distractor": false
    },
    {
        "word": "desks",
        "vi": "bàn học",
        "distractor": false
    },
    {
        "word": "chairs",
        "vi": "ghế",
        "distractor": false
    },
    {
        "word": "books",
        "vi": "sách",
        "distractor": false
    },
    {
        "word": "love",
        "vi": "yêu/thích",
        "distractor": false
    },
    {
        "word": "messy",
        "vi": "bừa bộn",
        "distractor": true
    },
    {
        "word": "hate",
        "vi": "ghét",
        "distractor": true
    },
    {
        "word": "windows",
        "vi": "cửa sổ",
        "distractor": true
    }
]
    }
  }
};
