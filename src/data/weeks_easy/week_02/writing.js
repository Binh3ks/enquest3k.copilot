export default {
  title: "My Family Squad",
  min_words: 20,
  model_sentence: "This is my mother. She is kind. This is my father. He is strong.",
  instruction_en: "Write about your family!",
  instruction_vi: "Vi\u1ebft v\u1ec1 gia \u0111\u00ecnh c\u1ee7a b\u1ea1n!",
  prompt_en: "Who is in your family? What are they like?",
  prompt_vi: "Ai \u1edf trong gia \u0111\u00ecnh b\u1ea1n? H\u1ecd th\u1ebf n\u00e0o?",
  keywords: ["mother", "father", "kind", "strong", "family"],
  topic_talk_prompt: "Tell me about your family!",
  sentence_frames: [
    {
        "template": "This is my ___.",
        "answers": [
            "mother"
        ]
    },
    {
        "template": "She is ___.",
        "answers": [
            "kind"
        ]
    },
    {
        "template": "This is my ___.",
        "answers": [
            "father"
        ]
    },
    {
        "template": "He is ___.",
        "answers": [
            "strong"
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
        "word": "mother",
        "vi": "mẹ",
        "distractor": false
    },
    {
        "word": "kind",
        "vi": "tốt bụng",
        "distractor": false
    },
    {
        "word": "father",
        "vi": "bố",
        "distractor": false
    },
    {
        "word": "strong",
        "vi": "mạnh mẽ",
        "distractor": false
    },
    {
        "word": "sister",
        "vi": "chị/em gái",
        "distractor": true
    },
    {
        "word": "mean",
        "vi": "xấu tính",
        "distractor": true
    },
    {
        "word": "weak",
        "vi": "yếu",
        "distractor": true
    }
]
    }
  }
};
