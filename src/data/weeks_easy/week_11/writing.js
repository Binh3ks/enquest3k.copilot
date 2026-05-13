export default {
  title: "My Favorite Weekend Place",
  min_words: 25,
  model_sentence: "My favorite place is the park. I go there with my family. We play and walk together. I love the park.",
  instruction_en: "Write about your favorite place on the weekend!",
  instruction_vi: "Vi\u1ebft v\u1ec1 n\u01a1i y\u00eau th\u00edch v\u00e0o cu\u1ed1i tu\u1ea7n!",
  prompt_en: "Where do you like to go? Who do you go with? What do you do there?",
  prompt_vi: "B\u1ea1n th\u00edch \u0111i \u0111\u00e2u? \u0110i v\u1edbi ai? B\u1ea1n l\u00e0m g\u00ec \u1edf \u0111\u00f3?",
  keywords: ["park", "family", "play", "walk", "love"],
  topic_talk_prompt: "What is your favorite weekend place and why?",
  sentence_frames: [
    {
        "template": "My favorite place is ___.",
        "answers": [
            "the park"
        ]
    },
    {
        "template": "I go there with my ___.",
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
        "word": "alone",
        "vi": "một mình",
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
