export default {
  title: "My Best Friend",
  min_words: 30,
  model_sentence: "This is my best friend. His name is Tom. He is tall. He has short hair. His hair is black. He has brown eyes. He wears glasses.",
  instruction_en: "Describe your best friend using phrases!",
  instruction_vi: "M\u00f4 t\u1ea3 ng\u01b0\u1eddi b\u1ea1n th\u00e2n c\u1ee7a b\u1ea1n b\u1eb1ng c\u1ee5m t\u1eeb!",
  prompt_en: "What does your best friend look like? What makes them special?",
  prompt_vi: "Ng\u01b0\u1eddi b\u1ea1n th\u00e2n c\u1ee7a b\u1ea1n tr\u00f4ng th\u1ebf n\u00e0o?",
  keywords: ["Tom", "tall", "short", "black", "brown", "glasses"],
  topic_talk_prompt: "Describe your best friend in detail!",
  sentence_frames: [
    {
        "template": "My best friend's name is ___ and he is ___.",
        "answers": [
            "Tom",
            "tall"
        ]
    },
    {
        "template": "He has ___ and his hair is ___.",
        "answers": [
            "short hair",
            "black"
        ]
    },
    {
        "template": "He has ___ eyes and he wears ___.",
        "answers": [
            "brown",
            "glasses"
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
        "word": "Tom",
        "vi": "",
        "distractor": false
    },
    {
        "word": "tall",
        "vi": "cao",
        "distractor": false
    },
    {
        "word": "short hair",
        "vi": "tóc ngắn",
        "distractor": false
    },
    {
        "word": "black",
        "vi": "đen",
        "distractor": false
    },
    {
        "word": "brown",
        "vi": "nâu",
        "distractor": false
    },
    {
        "word": "glasses",
        "vi": "kính",
        "distractor": false
    },
    {
        "word": "very short",
        "vi": "rất thấp",
        "distractor": true
    },
    {
        "word": "blonde hair",
        "vi": "tóc vàng",
        "distractor": true
    },
    {
        "word": "green eyes",
        "vi": "mắt xanh",
        "distractor": true
    }
]
    }
  }
};
