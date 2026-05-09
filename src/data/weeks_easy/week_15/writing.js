export default {
  title: "Write About My Park Day",
  min_words: 25,
  model_sentence: "Today I am going to the park! The park is fun! I am walking with my mom. My dad is jogging. I see a boy running with his dog.",
  instruction_en: "Write about your park day!",
  instruction_vi: "Vi\u1ebft v\u1ec1 ng\u00e0y \u1edf c\u00f4ng vi\u00ean c\u1ee7a b\u1ea1n!",
  prompt_en: "Who is at the park? What are people doing? How do you feel?",
  prompt_vi: "Ai \u1edf c\u00f4ng vi\u00ean? M\u1ecdi ng\u01b0\u1eddi \u0111ang l\u00e0m g\u00ec? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["park", "fun", "walking", "mom", "jogging", "running", "dog"],
  topic_talk_prompt: "Tell me about a day at the park!",
  sentence_frames: [
    {
        "template": "The park is ___.",
        "answers": [
            "fun"
        ]
    },
    {
        "template": "I am ___ with my mom.",
        "answers": [
            "walking"
        ]
    },
    {
        "template": "My dad is ___.",
        "answers": [
            "jogging"
        ]
    },
    {
        "template": "I see a boy ___ with his ___.",
        "answers": [
            "running",
            "dog"
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
    {
        "word": "fun",
        "vi": "thú vị",
        "distractor": false
    },
    {
        "word": "walking",
        "vi": "đi bộ",
        "distractor": false
    },
    {
        "word": "jogging",
        "vi": "chạy bộ",
        "distractor": false
    },
    {
        "word": "running",
        "vi": "chạy",
        "distractor": false
    },
    {
        "word": "dog",
        "vi": "con chó",
        "distractor": false
    },
    {
        "word": "boring",
        "vi": "chán",
        "distractor": true
    },
    {
        "word": "swimming",
        "vi": "bơi",
        "distractor": true
    },
    {
        "word": "cat",
        "vi": "con mèo",
        "distractor": true
    }
]
    }
  }
};
