export default {
  title: "My Day",
  min_words: 25,
  model_sentence: "I wake up at seven. I brush my teeth. I eat breakfast. Then I go to school.",
  instruction_en: "Write about your morning routine!",
  instruction_vi: "Vi\u1ebft v\u1ec1 th\u00f3i quen bu\u1ed5i s\u00e1ng c\u1ee7a b\u1ea1n!",
  prompt_en: "What do you do in the morning? What order do you do things in?",
  prompt_vi: "B\u1ea1n l\u00e0m g\u00ec v\u00e0o bu\u1ed5i s\u00e1ng? B\u1ea1n l\u00e0m theo th\u1ee9 t\u1ef1 n\u00e0o?",
  keywords: ["wake", "brush", "teeth", "breakfast", "school"],
  topic_talk_prompt: "Tell me about your morning step by step!",
  sentence_frames: [
    {
        "template": "I wake up at ___.",
        "answers": [
            "seven"
        ]
    },
    {
        "template": "I ___ my teeth.",
        "answers": [
            "brush"
        ]
    },
    {
        "template": "I eat ___.",
        "answers": [
            "breakfast"
        ]
    },
    {
        "template": "Then I go to ___.",
        "answers": [
            "school"
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
        "word": "seven",
        "vi": "bảy giờ",
        "distractor": false
    },
    {
        "word": "brush",
        "vi": "đánh",
        "distractor": false
    },
    {
        "word": "breakfast",
        "vi": "bữa sáng",
        "distractor": false
    },
    {
        "word": "school",
        "vi": "trường",
        "distractor": false
    },
    {
        "word": "midnight",
        "vi": "nửa đêm",
        "distractor": true
    },
    {
        "word": "comb",
        "vi": "chải — không phải răng",
        "distractor": true
    },
    {
        "word": "dinner",
        "vi": "bữa tối",
        "distractor": true
    }
]
    }
  }
};
