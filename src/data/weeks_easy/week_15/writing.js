export default {
  title: "Write About My Park Day",
  min_words: 25,
  model_sentence: "The park is fun today. I am walking with my mum. My dad is jogging. A boy is running with his dog.",
  instruction_en: "Write about what people are doing in the park right now!",
  instruction_vi: "Vi\u1ebft v\u1ec1 nh\u1eefng g\u00ec m\u1ecdi ng\u01b0\u1eddi \u0111ang l\u00e0m trong c\u00f4ng vi\u00ean ngay l\u00fac n\u00e0y!",
  prompt_en: "What is happening in the park? What are different people doing?",
  prompt_vi: "Chuy\u1ec7n g\u00ec \u0111ang x\u1ea3y ra trong c\u00f4ng vi\u00ean? M\u1ecdi ng\u01b0\u1eddi \u0111ang l\u00e0m g\u00ec?",
  keywords: ["fun", "walking", "mum", "jogging", "running", "dog"],
  topic_talk_prompt: "Describe what you see happening in the park right now!",
  sentence_frames: [
    {
        "template": "The park is ___ today.",
        "answers": [
            "fun"
        ]
    },
    {
        "template": "I am ___ with my mum.",
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
        "template": "A boy is ___ with his dog.",
        "answers": [
            "running"
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
        "word": "boring",
        "vi": "chán",
        "distractor": true
    },
    {
        "word": "swimming",
        "vi": "bơi lội",
        "distractor": true
    },
    {
        "word": "sleeping",
        "vi": "đang ngủ",
        "distractor": true
    }
]
    }
  }
};
