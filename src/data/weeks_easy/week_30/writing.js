export default {
  title: "Writing: My Picnic Story",
  min_words: 35,
  model_sentence: "Last Sunday, Mum bought sandwiches, fruit, and juice at the market. We went to the park and spread a blanket on the soft grass. We ate and talked and laughed together. It was a perfect sunny day.",
  instruction_en: "Write about your picnic story!",
  instruction_vi: "Vi\u1ebft v\u1ec1 c\u00e2u chuy\u1ec7n d\u00e3 ngo\u1ea1i c\u1ee7a b\u1ea1n!",
  prompt_en: "Where did you go? What did you eat? How did you feel?",
  prompt_vi: "B\u1ea1n \u0111i \u0111\u00e2u? B\u1ea1n \u0103n g\u00ec? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["Sunday", "sandwiches", "fruit", "juice", "park", "blanket", "grass", "ate", "laughed", "sunny"],
  topic_talk_prompt: "Tell me about a picnic you went on!",
  sentence_frames: [
    {
        "template": "Last Sunday, Mum bought ___, ___, and ___.",
        "answers": [
            "sandwiches",
            "fruit",
            "juice"
        ]
    },
    {
        "template": "We went to the ___ and spread a ___ on the grass.",
        "answers": [
            "park",
            "blanket"
        ]
    },
    {
        "template": "We ate and ___ and ___ together.",
        "answers": [
            "talked",
            "laughed"
        ]
    },
    {
        "template": "It was a perfect ___ day.",
        "answers": [
            "sunny"
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
        "word": "sandwiches",
        "vi": "bánh sandwich",
        "distractor": false
    },
    {
        "word": "fruit",
        "vi": "trái cây",
        "distractor": false
    },
    {
        "word": "juice",
        "vi": "nước ép",
        "distractor": false
    },
    {
        "word": "park",
        "vi": "công viên",
        "distractor": false
    },
    {
        "word": "blanket",
        "vi": "tấm chăn/khăn trải",
        "distractor": false
    },
    {
        "word": "talked",
        "vi": "nói chuyện",
        "distractor": false
    },
    {
        "word": "laughed",
        "vi": "cười",
        "distractor": false
    },
    {
        "word": "sunny",
        "vi": "nắng",
        "distractor": false
    },
    {
        "word": "pizza",
        "vi": "bánh pizza",
        "distractor": true
    },
    {
        "word": "roof",
        "vi": "mái nhà",
        "distractor": true
    },
    {
        "word": "cried",
        "vi": "khóc",
        "distractor": true
    }
]
    }
  }
};
