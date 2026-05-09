export default {
  title: "My Weather Day",
  min_words: 35,
  model_sentence: "It is raining today, so I am wearing my coat and warm boots. I am also carrying my umbrella because the rain is very heavy. The sky is dark grey.",
  instruction_en: "Describe a rainy day using cause-and-effect phrases!",
  instruction_vi: "M\u00f4 t\u1ea3 ng\u00e0y m\u01b0a b\u1eb1ng c\u1ee5m t\u1eeb nguy\u00ean nh\u00e2n - k\u1ebft qu\u1ea3!",
  prompt_en: "Why are you wearing these clothes? What is the rain like?",
  prompt_vi: "T\u1ea1i sao b\u1ea1n m\u1eb7c nh\u1eefng qu\u1ea7n \u00e1o \u0111\u00f3? M\u01b0a th\u1ebf n\u00e0o?",
  keywords: ["raining", "coat", "boots", "umbrella", "heavy", "grey"],
  topic_talk_prompt: "Describe a rainy day with all the details!",
  sentence_frames: [
    {
        "template": "It is ___ today, so I am wearing my ___ and ___.",
        "answers": [
            "raining",
            "coat",
            "warm boots"
        ]
    },
    {
        "template": "I am carrying ___ because the rain is ___.",
        "answers": [
            "my umbrella",
            "very heavy"
        ]
    },
    {
        "template": "The sky is ___ and ___ today.",
        "answers": [
            "dark",
            "grey"
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
        "word": "raining",
        "vi": "đang mưa",
        "distractor": false
    },
    {
        "word": "coat",
        "vi": "áo khoác",
        "distractor": false
    },
    {
        "word": "warm boots",
        "vi": "giày ấm",
        "distractor": false
    },
    {
        "word": "my umbrella",
        "vi": "cái ô của tôi",
        "distractor": false
    },
    {
        "word": "very heavy",
        "vi": "rất nặng/to",
        "distractor": false
    },
    {
        "word": "dark",
        "vi": "tối",
        "distractor": false
    },
    {
        "word": "grey",
        "vi": "xám",
        "distractor": false
    },
    {
        "word": "sunny and bright",
        "vi": "nắng và sáng",
        "distractor": true
    },
    {
        "word": "a sunhat",
        "vi": "mũ nắng",
        "distractor": true
    },
    {
        "word": "light and thin",
        "vi": "nhẹ và mỏng",
        "distractor": true
    }
]
    }
  }
};
