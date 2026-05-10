export default {
  title: "My Classroom",
  min_words: 20,
  model_sentence: "My classroom is big. There are twenty desks. There are many books on the shelf. I love my classroom.",
  instruction_en: "Write about your classroom!",
  instruction_vi: "Vi\u1ebft v\u1ec1 l\u1edbp h\u1ecdc c\u1ee7a b\u1ea1n!",
  prompt_en: "What is in your classroom? How many things are there? How do you feel?",
  prompt_vi: "L\u1edbp h\u1ecdc c\u1ee7a b\u1ea1n c\u00f3 g\u00ec? C\u00f3 bao nhi\u00eau th\u1ee9? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["classroom", "big", "desks", "books", "shelf", "love"],
  topic_talk_prompt: "What is your classroom like?",
  sentence_frames: [
    {
        "template": "My classroom is ___.",
        "answers": [
            "big"
        ]
    },
    {
        "template": "There are ___ desks.",
        "answers": [
            "twenty"
        ]
    },
    {
        "template": "There are ___ books on the shelf.",
        "answers": [
            "many"
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
        "word": "big",
        "vi": "to lớn",
        "distractor": false
    },
    {
        "word": "twenty",
        "vi": "hai mươi",
        "distractor": false
    },
    {
        "word": "many",
        "vi": "nhiều",
        "distractor": false
    },
    {
        "word": "love",
        "vi": "yêu thích",
        "distractor": false
    },
    {
        "word": "tiny",
        "vi": "rất nhỏ",
        "distractor": true
    },
    {
        "word": "zero",
        "vi": "không có — sai",
        "distractor": true
    },
    {
        "word": "hate",
        "vi": "ghét",
        "distractor": true
    }
]
    }
  }
};
