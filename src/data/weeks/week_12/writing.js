export default {
  title: "The Talent Show",
  min_words: 35,
  model_sentence: "I can sing and I can draw. I can run fast but I can't swim yet. I want to learn to swim. Performing in a talent show is my dream.",
  instruction_en: "Write about your talents for a talent show!",
  instruction_vi: "Vi\u1ebft v\u1ec1 t\u00e0i n\u0103ng c\u1ee7a b\u1ea1n cho bu\u1ed5i bi\u1ec3u di\u1ec5n!",
  prompt_en: "What can you do? What can't you do yet? What is your dream?",
  prompt_vi: "B\u1ea1n c\u00f3 th\u1ec3 l\u00e0m g\u00ec? Ch\u01b0a l\u00e0m \u0111\u01b0\u1ee3c g\u00ec? Gi\u1ea5c m\u01a1 c\u1ee7a b\u1ea1n l\u00e0 g\u00ec?",
  keywords: ["sing", "draw", "run", "swim", "talent show", "dream"],
  topic_talk_prompt: "What talent would you show at a talent show?",
  sentence_frames: [
    {
        "template": "I can ___ and I can ___.",
        "answers": [
            "sing",
            "draw"
        ]
    },
    {
        "template": "I can run fast but I can't ___ yet.",
        "answers": [
            "swim"
        ]
    },
    {
        "template": "I want to learn to ___ one day.",
        "answers": [
            "swim"
        ]
    },
    {
        "template": "Performing in ___ is my dream.",
        "answers": [
            "a talent show"
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
        "word": "sing",
        "vi": "hát",
        "distractor": false
    },
    {
        "word": "draw",
        "vi": "vẽ",
        "distractor": false
    },
    {
        "word": "swim",
        "vi": "bơi",
        "distractor": false
    },
    {
        "word": "a talent show",
        "vi": "một buổi biểu diễn tài năng",
        "distractor": false
    },
    {
        "word": "fly like a bird",
        "vi": "bay như chim",
        "distractor": true
    },
    {
        "word": "drive a car",
        "vi": "lái xe ô tô",
        "distractor": true
    },
    {
        "word": "a cooking class",
        "vi": "lớp nấu ăn",
        "distractor": true
    }
]
    }
  }
};
