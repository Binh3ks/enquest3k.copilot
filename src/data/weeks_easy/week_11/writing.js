export default {
  title: "My Favourite Weekend Place",
  min_words: 25,
  model_sentence: "My favourite place is the park. There is a big tree and there are many flowers. I go with my family. We play and walk together. I love the park.",
  instruction_en: "Write about your favourite weekend place!",
  instruction_vi: "Vi\u1ebft v\u1ec1 n\u01a1i y\u00eau th\u00edch cu\u1ed1i tu\u1ea7n c\u1ee7a b\u1ea1n!",
  prompt_en: "Where do you go? What is there? Who goes with you?",
  prompt_vi: "B\u1ea1n \u0111i \u0111\u00e2u? \u1ede \u0111\u00f3 c\u00f3 g\u00ec? Ai \u0111i c\u00f9ng b\u1ea1n?",
  keywords: ["park", "tree", "flowers", "family", "play", "walk", "love"],
  topic_talk_prompt: "What is your favourite place on the weekend?",
  sentence_frames: [
    {
        "template": "My favourite place is ___.",
        "answers": [
            "the park"
        ]
    },
    {
        "template": "There is a big ___ and many ___.",
        "answers": [
            "tree",
            "flowers"
        ]
    },
    {
        "template": "I go with my ___.",
        "answers": [
            "family"
        ]
    },
    {
        "template": "We ___ and ___ together.",
        "answers": [
            "play",
            "walk"
        ]
    },
    {
        "template": "I ___ the park.",
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
      scaffolding_stage: "medium",
      words: [
    {
        "word": "the park",
        "vi": "công viên",
        "distractor": false
    },
    {
        "word": "tree",
        "vi": "cây",
        "distractor": false
    },
    {
        "word": "flowers",
        "vi": "hoa",
        "distractor": false
    },
    {
        "word": "family",
        "vi": "gia đình",
        "distractor": false
    },
    {
        "word": "play",
        "vi": "chơi",
        "distractor": false
    },
    {
        "word": "walk",
        "vi": "đi bộ",
        "distractor": false
    },
    {
        "word": "love",
        "vi": "yêu thích",
        "distractor": false
    },
    {
        "word": "the library",
        "vi": "thư viện",
        "distractor": true
    },
    {
        "word": "hate",
        "vi": "ghét",
        "distractor": true
    },
    {
        "word": "run",
        "vi": "chạy",
        "distractor": true
    }
]
    }
  }
};
