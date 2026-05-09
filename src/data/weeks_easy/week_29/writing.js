export default {
  title: "Writing: My Trip Story",
  min_words: 35,
  model_sentence: "Last weekend, my family went to the airport. We ran to the gate because we were almost late. The plane flew up fast. I saw tiny houses below. We arrived and felt excited.",
  instruction_en: "Write about your trip story!",
  instruction_vi: "Vi\u1ebft v\u1ec1 c\u00e2u chuy\u1ec7n chuy\u1ebfn \u0111i c\u1ee7a b\u1ea1n!",
  prompt_en: "Where did you go? What happened? How did you feel?",
  prompt_vi: "B\u1ea1n \u0111i \u0111\u00e2u? \u0110i\u1ec1u g\u00ec x\u1ea3y ra? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["airport", "ran", "gate", "late", "plane", "flew", "houses", "arrived", "excited"],
  topic_talk_prompt: "Tell me about a trip you went on!",
  sentence_frames: [
    {
        "template": "Last weekend, my family went to the ___.",
        "answers": [
            "airport"
        ]
    },
    {
        "template": "We ___ to the gate because we were almost ___.",
        "answers": [
            "ran",
            "late"
        ]
    },
    {
        "template": "The plane ___ up fast.",
        "answers": [
            "flew"
        ]
    },
    {
        "template": "I saw tiny ___ below.",
        "answers": [
            "houses"
        ]
    },
    {
        "template": "We ___ and felt ___.",
        "answers": [
            "arrived",
            "excited"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
    {
        "word": "airport",
        "vi": "sân bay",
        "distractor": false
    },
    {
        "word": "ran",
        "vi": "chạy",
        "distractor": false
    },
    {
        "word": "late",
        "vi": "muộn",
        "distractor": false
    },
    {
        "word": "flew",
        "vi": "bay",
        "distractor": false
    },
    {
        "word": "houses",
        "vi": "nhà cửa",
        "distractor": false
    },
    {
        "word": "arrived",
        "vi": "đến nơi",
        "distractor": false
    },
    {
        "word": "excited",
        "vi": "hào hứng",
        "distractor": false
    },
    {
        "word": "market",
        "vi": "chợ",
        "distractor": true
    },
    {
        "word": "walked",
        "vi": "đi bộ",
        "distractor": true
    },
    {
        "word": "early",
        "vi": "sớm",
        "distractor": true
    }
]
    }
  }
};
