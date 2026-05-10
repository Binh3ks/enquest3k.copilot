export default {
  title: "City and Farm",
  min_words: 25,
  model_sentence: "The city is noisy but the farm is quiet. The city is dirty but the farm is clean. I see cows on the farm. I like the farm.",
  instruction_en: "Compare the city and the farm!",
  instruction_vi: "So s\u00e1nh th\u00e0nh ph\u1ed1 v\u00e0 n\u00f4ng tr\u1ea1i!",
  prompt_en: "What is different about the city and the farm? Which do you prefer?",
  prompt_vi: "Th\u00e0nh ph\u1ed1 v\u00e0 n\u00f4ng tr\u1ea1i kh\u00e1c nhau th\u1ebf n\u00e0o? B\u1ea1n th\u00edch c\u00e1i n\u00e0o h\u01a1n?",
  keywords: ["noisy", "quiet", "dirty", "clean", "farm", "cows"],
  topic_talk_prompt: "Do you prefer the city or the farm? Tell me why!",
  sentence_frames: [
    {
        "template": "The city is ___ but the farm is ___.",
        "answers": [
            "noisy",
            "quiet"
        ]
    },
    {
        "template": "The city is ___ but the farm is ___.",
        "answers": [
            "dirty",
            "clean"
        ]
    },
    {
        "template": "I see ___ on the farm.",
        "answers": [
            "cows"
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
        "word": "cows",
        "vi": "bò",
        "distractor": false
    },
    {
        "word": "farm",
        "vi": "nông trại",
        "distractor": false
    },
    {
        "word": "silent",
        "vi": "im lặng",
        "distractor": true
    },
    {
        "word": "tidy",
        "vi": "gọn gàng",
        "distractor": true
    },
    {
        "word": "city",
        "vi": "thành phố",
        "distractor": true
    }
]
    }
  }
};
