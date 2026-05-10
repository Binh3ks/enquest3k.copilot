export default {
  title: "My Neighbourhood",
  min_words: 28,
  model_sentence: "I live near a river. There was an old market near my house. There were big trees on the road. The neighbourhood was quiet and green.",
  instruction_en: "Write about your neighbourhood \u2014 now and in the past!",
  instruction_vi: "Vi\u1ebft v\u1ec1 khu ph\u1ed1 c\u1ee7a b\u1ea1n \u2014 hi\u1ec7n t\u1ea1i v\u00e0 trong qu\u00e1 kh\u1ee9!",
  prompt_en: "What is near your house? What was there before? How was it different?",
  prompt_vi: "G\u1ea7n nh\u00e0 b\u1ea1n c\u00f3 g\u00ec? Tr\u01b0\u1edbc \u0111\u00e2y c\u00f3 g\u00ec? N\u00f3 kh\u00e1c nhau nh\u01b0 th\u1ebf n\u00e0o?",
  keywords: ["river", "market", "trees", "road", "quiet", "green"],
  topic_talk_prompt: "Describe your neighbourhood \u2014 past and present!",
  sentence_frames: [
    {
        "template": "I live near a ___.",
        "answers": [
            "river"
        ]
    },
    {
        "template": "There was an old ___ near my house.",
        "answers": [
            "market"
        ]
    },
    {
        "template": "There were big ___ on the road.",
        "answers": [
            "trees"
        ]
    },
    {
        "template": "The neighbourhood was ___ and ___.",
        "answers": [
            "quiet",
            "green"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
    {
        "word": "river",
        "vi": "sông",
        "distractor": false
    },
    {
        "word": "market",
        "vi": "chợ",
        "distractor": false
    },
    {
        "word": "trees",
        "vi": "cây",
        "distractor": false
    },
    {
        "word": "quiet",
        "vi": "yên tĩnh",
        "distractor": false
    },
    {
        "word": "green",
        "vi": "xanh mát",
        "distractor": false
    },
    {
        "word": "mountain",
        "vi": "núi",
        "distractor": true
    },
    {
        "word": "factory",
        "vi": "nhà máy",
        "distractor": true
    },
    {
        "word": "noisy",
        "vi": "ồn ào",
        "distractor": true
    }
]
    }
  }
};
