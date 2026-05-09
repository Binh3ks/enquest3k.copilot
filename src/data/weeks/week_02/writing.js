export default {
  title: "My Family Squad",
  min_words: 30,
  model_sentence: "This is my family. This is my mother. She is kind. This is my father. He is strong. This is my brother. He helps me.",
  instruction_en: "Describe your family members using phrases!",
  instruction_vi: "M\u00f4 t\u1ea3 c\u00e1c th\u00e0nh vi\u00ean gia \u0111\u00ecnh b\u1eb1ng c\u1ee5m t\u1eeb!",
  prompt_en: "Who is in your family? What are they like? How do they help you?",
  prompt_vi: "Ai trong gia \u0111\u00ecnh? H\u1ecd th\u1ebf n\u00e0o? H\u1ecd gi\u00fap b\u1ea1n th\u1ebf n\u00e0o?",
  keywords: ["mother", "father", "brother", "kind", "strong", "helps"],
  topic_talk_prompt: "Tell me about your family members!",
  sentence_frames: [
    {
        "template": "This is my ___ and she is ___.",
        "answers": [
            "mother",
            "kind"
        ]
    },
    {
        "template": "This is my ___ and he is ___.",
        "answers": [
            "father",
            "strong"
        ]
    },
    {
        "template": "This is my ___ and he ___ me.",
        "answers": [
            "brother",
            "helps"
        ]
    },
    {
        "template": "I love my family because they are always ___.",
        "answers": [
            "there for me"
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
        "word": "brother",
        "vi": "anh/em trai",
        "distractor": false
    },
    {
        "word": "helps",
        "vi": "giúp đỡ",
        "distractor": false
    },
    {
        "word": "there for me",
        "vi": "luôn ở bên tôi",
        "distractor": false
    },
    {
        "word": "mean and strict",
        "vi": "xấu tính và nghiêm khắc",
        "distractor": true
    },
    {
        "word": "never around",
        "vi": "không bao giờ ở đây",
        "distractor": true
    }
]
    }
  }
};
