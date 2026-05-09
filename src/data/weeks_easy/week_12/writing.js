export default {
  title: "My Talents",
  min_words: 25,
  model_sentence: "I can sing. I can dance. I can run fast. I can't swim yet but I want to learn!",
  instruction_en: "Write about your talents!",
  instruction_vi: "Vi\u1ebft v\u1ec1 t\u00e0i n\u0103ng c\u1ee7a b\u1ea1n!",
  prompt_en: "What can you do well? What can't you do yet? What do you want to learn?",
  prompt_vi: "B\u1ea1n l\u00e0m \u0111\u01b0\u1ee3c g\u00ec gi\u1ecfi? B\u1ea1n ch\u01b0a l\u00e0m \u0111\u01b0\u1ee3c g\u00ec? B\u1ea1n mu\u1ed1n h\u1ecdc g\u00ec?",
  keywords: ["sing", "dance", "run", "swim", "learn", "fast"],
  topic_talk_prompt: "What can you do? What do you want to learn?",
  sentence_frames: [
    {
        "template": "I can ___.",
        "answers": [
            "sing"
        ]
    },
    {
        "template": "I can also ___.",
        "answers": [
            "dance"
        ]
    },
    {
        "template": "I can run ___.",
        "answers": [
            "fast"
        ]
    },
    {
        "template": "I can't ___ yet.",
        "answers": [
            "swim"
        ]
    },
    {
        "template": "I want to ___ one day.",
        "answers": [
            "learn"
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
        "word": "dance",
        "vi": "nhảy",
        "distractor": false
    },
    {
        "word": "fast",
        "vi": "nhanh",
        "distractor": false
    },
    {
        "word": "swim",
        "vi": "bơi",
        "distractor": false
    },
    {
        "word": "learn",
        "vi": "học",
        "distractor": false
    },
    {
        "word": "fly",
        "vi": "bay",
        "distractor": true
    },
    {
        "word": "slowly",
        "vi": "chậm chạp",
        "distractor": true
    },
    {
        "word": "forget",
        "vi": "quên",
        "distractor": true
    }
]
    }
  }
};
