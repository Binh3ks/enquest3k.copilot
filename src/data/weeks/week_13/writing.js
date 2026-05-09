export default {
  title: "Write About Your Daily Routine",
  min_words: 35,
  model_sentence: "I wake up at 7 o'clock every morning. First, I brush my teeth and wash my face. Then I eat breakfast with my family. I enjoy my daily routine.",
  instruction_en: "Write your daily routine using sequence words!",
  instruction_vi: "Vi\u1ebft th\u00f3i quen h\u00e0ng ng\u00e0y v\u1edbi t\u1eeb n\u1ed1i tr\u00ecnh t\u1ef1!",
  prompt_en: "What do you do first, then, and finally each day?",
  prompt_vi: "B\u1ea1n l\u00e0m g\u00ec \u0111\u1ea7u ti\u00ean, sau \u0111\u00f3 v\u00e0 cu\u1ed1i c\u00f9ng m\u1ed7i ng\u00e0y?",
  keywords: ["wake", "brush", "wash", "breakfast", "family", "routine"],
  topic_talk_prompt: "Describe your daily routine in order!",
  sentence_frames: [
    {
        "template": "I wake up at ___ every ___.",
        "answers": [
            "7 o'clock",
            "morning"
        ]
    },
    {
        "template": "First, I ___ and ___.",
        "answers": [
            "brush my teeth",
            "wash my face"
        ]
    },
    {
        "template": "Then I ___ with ___.",
        "answers": [
            "eat breakfast",
            "my family"
        ]
    },
    {
        "template": "I enjoy my daily ___.",
        "answers": [
            "routine"
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
        "word": "7 o'clock",
        "vi": "7 giờ",
        "distractor": false
    },
    {
        "word": "morning",
        "vi": "buổi sáng",
        "distractor": false
    },
    {
        "word": "brush my teeth",
        "vi": "đánh răng",
        "distractor": false
    },
    {
        "word": "wash my face",
        "vi": "rửa mặt",
        "distractor": false
    },
    {
        "word": "eat breakfast",
        "vi": "ăn sáng",
        "distractor": false
    },
    {
        "word": "my family",
        "vi": "gia đình tôi",
        "distractor": false
    },
    {
        "word": "routine",
        "vi": "thói quen",
        "distractor": false
    },
    {
        "word": "midnight",
        "vi": "nửa đêm",
        "distractor": true
    },
    {
        "word": "watch television",
        "vi": "xem ti vi",
        "distractor": true
    },
    {
        "word": "lunchtime",
        "vi": "giờ ăn trưa",
        "distractor": true
    }
]
    }
  }
};
