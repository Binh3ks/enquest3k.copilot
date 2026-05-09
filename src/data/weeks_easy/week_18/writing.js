export default {
  title: "My Home News Report",
  min_words: 25,
  model_sentence: "Hello! This is live news from my home. I am sitting at my desk and learning English. My mum is cooking in the kitchen right now.",
  instruction_en: "Write a news report from your home!",
  instruction_vi: "Vi\u1ebft m\u1ed9t b\u1ea3n tin t\u1eeb nh\u00e0 c\u1ee7a b\u1ea1n!",
  prompt_en: "What is happening at home right now? What is each person doing?",
  prompt_vi: "Chuy\u1ec7n g\u00ec \u0111ang x\u1ea3y ra \u1edf nh\u00e0 l\u00fac n\u00e0y? M\u1ed7i ng\u01b0\u1eddi \u0111ang l\u00e0m g\u00ec?",
  keywords: ["news", "home", "sitting", "learning", "mum", "cooking", "kitchen"],
  topic_talk_prompt: "Report the news from your home right now!",
  sentence_frames: [
    {
        "template": "This is live ___ from my home.",
        "answers": [
            "news"
        ]
    },
    {
        "template": "I am ___ at my desk.",
        "answers": [
            "sitting"
        ]
    },
    {
        "template": "I am ___ English.",
        "answers": [
            "learning"
        ]
    },
    {
        "template": "My mum is ___ in the ___.",
        "answers": [
            "cooking",
            "kitchen"
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
        "word": "news",
        "vi": "tin tức",
        "distractor": false
    },
    {
        "word": "sitting",
        "vi": "ngồi",
        "distractor": false
    },
    {
        "word": "learning",
        "vi": "học",
        "distractor": false
    },
    {
        "word": "cooking",
        "vi": "nấu ăn",
        "distractor": false
    },
    {
        "word": "kitchen",
        "vi": "nhà bếp",
        "distractor": false
    },
    {
        "word": "old stories",
        "vi": "tin cũ",
        "distractor": true
    },
    {
        "word": "flying",
        "vi": "đang bay",
        "distractor": true
    },
    {
        "word": "bedroom",
        "vi": "phòng ngủ",
        "distractor": true
    }
]
    }
  }
};
