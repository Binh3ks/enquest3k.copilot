export default {
  title: "My Talents",
  min_words: 25,
  model_sentence: "I can sing. I can draw pictures. I cannot swim yet. I want to learn.",
  instruction_en: "Write about what you can and cannot do!",
  instruction_vi: "Vi\u1ebft v\u1ec1 nh\u1eefng g\u00ec b\u1ea1n c\u00f3 th\u1ec3 v\u00e0 ch\u01b0a l\u00e0m \u0111\u01b0\u1ee3c!",
  prompt_en: "What can you do? What can't you do yet? What do you want to learn?",
  prompt_vi: "B\u1ea1n c\u00f3 th\u1ec3 l\u00e0m g\u00ec? Ch\u01b0a l\u00e0m \u0111\u01b0\u1ee3c g\u00ec? B\u1ea1n mu\u1ed1n h\u1ecdc g\u00ec?",
  keywords: ["sing", "draw", "swim", "learn", "yet"],
  topic_talk_prompt: "What can you do? What do you want to learn?",
  sentence_frames: [
    {
        "template": "I can ___.",
        "answers": [
            "sing"
        ]
    },
    {
        "template": "I can also ___ pictures.",
        "answers": [
            "draw"
        ]
    },
    {
        "template": "I cannot ___ yet.",
        "answers": [
            "swim"
        ]
    },
    {
        "template": "I want to ___.",
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
        "word": "already",
        "vi": "rồi — sai nghĩa với yet",
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
