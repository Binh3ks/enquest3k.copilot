export default {
  title: "My Neighborhood",
  min_words: 30,
  model_sentence: "I live near a river. There was an old market near my house. There were big trees on the road. There was a wooden bridge over the river.",
  instruction_en: "Write about your neighborhood!",
  instruction_vi: "Vi\u1ebft v\u1ec1 khu ph\u1ed1 c\u1ee7a b\u1ea1n!",
  prompt_en: "What is near your house? What was there before?",
  prompt_vi: "G\u1ea7n nh\u00e0 b\u1ea1n c\u00f3 g\u00ec? Tr\u01b0\u1edbc \u0111\u00e2y c\u00f3 g\u00ec?",
  keywords: ["river", "market", "trees", "road", "bridge", "wooden"],
  topic_talk_prompt: "Tell me about your neighborhood!",
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
        "template": "There was a ___ bridge over the river.",
        "answers": [
            "wooden"
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
        "word": "wooden",
        "vi": "bằng gỗ",
        "distractor": false
    },
    {
        "word": "mountain",
        "vi": "núi",
        "distractor": true
    },
    {
        "word": "new",
        "vi": "mới",
        "distractor": true
    },
    {
        "word": "stone",
        "vi": "bằng đá",
        "distractor": true
    }
]
    }
  }
};
