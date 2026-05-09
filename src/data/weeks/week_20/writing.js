export default {
  title: "The Old Town",
  min_words: 40,
  model_sentence: "In the old town, there was a small market near the river. There were many tall trees along the road. There was a wooden bridge that children loved to cross.",
  instruction_en: "Write about an old neighborhood using was/were phrases!",
  instruction_vi: "Vi\u1ebft v\u1ec1 khu ph\u1ed1 c\u0169 d\u00f9ng c\u1ee5m t\u1eeb was/were!",
  prompt_en: "What was there in the old town? What did people do there?",
  prompt_vi: "X\u01b0a kia c\u00f3 g\u00ec \u1edf \u0111\u00e2y? M\u1ecdi ng\u01b0\u1eddi l\u00e0m g\u00ec \u1edf \u0111\u00f3?",
  keywords: ["old town", "market", "river", "trees", "bridge", "wooden", "cross"],
  topic_talk_prompt: "Describe the old town using past tense!",
  sentence_frames: [
    {
        "template": "In the old town, there was ___ near ___.",
        "answers": [
            "a small market",
            "the river"
        ]
    },
    {
        "template": "There were ___ along the road.",
        "answers": [
            "many tall trees"
        ]
    },
    {
        "template": "There was ___ that children loved to ___.",
        "answers": [
            "a wooden bridge",
            "cross"
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
        "word": "a small market",
        "vi": "một khu chợ nhỏ",
        "distractor": false
    },
    {
        "word": "the river",
        "vi": "con sông",
        "distractor": false
    },
    {
        "word": "many tall trees",
        "vi": "nhiều cây cao",
        "distractor": false
    },
    {
        "word": "a wooden bridge",
        "vi": "một cây cầu gỗ",
        "distractor": false
    },
    {
        "word": "cross",
        "vi": "vượt qua",
        "distractor": false
    },
    {
        "word": "a new shopping mall",
        "vi": "một trung tâm mua sắm mới",
        "distractor": true
    },
    {
        "word": "a busy highway",
        "vi": "đường cao tốc đông đúc",
        "distractor": true
    },
    {
        "word": "avoid",
        "vi": "tránh",
        "distractor": true
    }
]
    }
  }
};
