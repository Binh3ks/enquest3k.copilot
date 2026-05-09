export default {
  title: "City and Farm",
  min_words: 25,
  model_sentence: "I like the farm. The city is noisy, but the farm is quiet. The city is dirty, but the farm is clean. I see a cow on the farm.",
  instruction_en: "Compare the city and the farm!",
  instruction_vi: "So s\u00e1nh th\u00e0nh ph\u1ed1 v\u00e0 n\u00f4ng tr\u1ea1i!",
  prompt_en: "What is the city like? What is the farm like? Which do you prefer?",
  prompt_vi: "Th\u00e0nh ph\u1ed1 th\u1ebf n\u00e0o? N\u00f4ng tr\u1ea1i th\u1ebf n\u00e0o? B\u1ea1n th\u00edch c\u00e1i n\u00e0o h\u01a1n?",
  keywords: ["farm", "city", "noisy", "quiet", "dirty", "clean", "cow"],
  topic_talk_prompt: "Do you prefer the city or the farm?",
  sentence_frames: [
    {
        "template": "The city is ___, but the farm is ___.",
        "answers": [
            "noisy",
            "quiet"
        ]
    },
    {
        "template": "The city is ___, but the farm is ___.",
        "answers": [
            "dirty",
            "clean"
        ]
    },
    {
        "template": "I see a ___ on the farm.",
        "answers": [
            "cow"
        ]
    },
    {
        "template": "I like the ___.",
        "answers": [
            "farm"
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
        "word": "noisy",
        "vi": "ồn ào",
        "distractor": false
    },
    {
        "word": "quiet",
        "vi": "yên tĩnh",
        "distractor": false
    },
    {
        "word": "dirty",
        "vi": "bẩn",
        "distractor": false
    },
    {
        "word": "clean",
        "vi": "sạch",
        "distractor": false
    },
    {
        "word": "cow",
        "vi": "con bò",
        "distractor": false
    },
    {
        "word": "farm",
        "vi": "nông trại",
        "distractor": false
    },
    {
        "word": "loud",
        "vi": "to tiếng",
        "distractor": true
    },
    {
        "word": "robot",
        "vi": "rô bốt",
        "distractor": true
    },
    {
        "word": "airplane",
        "vi": "máy bay",
        "distractor": true
    }
]
    }
  }
};
