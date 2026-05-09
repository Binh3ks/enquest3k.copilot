export default {
  title: "My School Supplies",
  min_words: 30,
  model_sentence: "There is a backpack on my desk. In my backpack, there is a book, a notebook, and a pen. There is a pencil case in my backpack with coloured pencils inside.",
  instruction_en: "Write about your school supplies in detail!",
  instruction_vi: "Vi\u1ebft v\u1ec1 d\u1ee5ng c\u1ee5 h\u1ecdc t\u1eadp c\u1ee7a b\u1ea1n!",
  prompt_en: "What school supplies do you have? Where are they?",
  prompt_vi: "B\u1ea1n c\u00f3 nh\u1eefng d\u1ee5ng c\u1ee5 h\u1ecdc t\u1eadp g\u00ec? Ch\u00fang \u1edf \u0111\u00e2u?",
  keywords: ["backpack", "book", "notebook", "pen", "pencil case", "coloured pencils"],
  topic_talk_prompt: "Describe what is in your school backpack!",
  sentence_frames: [
    {
        "template": "In my backpack, there is ___, ___, and ___.",
        "answers": [
            "a book",
            "a notebook",
            "a pen"
        ]
    },
    {
        "template": "There is also ___ with ___ inside.",
        "answers": [
            "a pencil case",
            "coloured pencils"
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
        "word": "a book",
        "vi": "một cuốn sách",
        "distractor": false
    },
    {
        "word": "a notebook",
        "vi": "một cuốn vở",
        "distractor": false
    },
    {
        "word": "a pen",
        "vi": "một cái bút",
        "distractor": false
    },
    {
        "word": "a pencil case",
        "vi": "hộp bút",
        "distractor": false
    },
    {
        "word": "coloured pencils",
        "vi": "bút chì màu",
        "distractor": false
    },
    {
        "word": "a television",
        "vi": "một cái ti vi",
        "distractor": true
    },
    {
        "word": "a toy car",
        "vi": "ô tô đồ chơi",
        "distractor": true
    }
]
    }
  }
};
