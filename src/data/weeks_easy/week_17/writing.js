export default {
  title: "My Weather Day",
  min_words: 25,
  model_sentence: "It is raining today. I am wearing my coat. I am carrying my umbrella. I still feel happy.",
  instruction_en: "Write about a rainy day and what you are doing!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u1ed9t ng\u00e0y m\u01b0a v\u00e0 nh\u1eefng g\u00ec b\u1ea1n \u0111ang l\u00e0m!",
  prompt_en: "What is the weather like? What are you wearing? How do you feel?",
  prompt_vi: "Th\u1eddi ti\u1ebft th\u1ebf n\u00e0o? B\u1ea1n \u0111ang m\u1eb7c g\u00ec? C\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["raining", "wearing", "coat", "umbrella", "happy"],
  topic_talk_prompt: "Describe a rainy day \u2014 what are you wearing and how do you feel?",
  sentence_frames: [
    {
        "template": "It is ___ today.",
        "answers": [
            "raining"
        ]
    },
    {
        "template": "I am wearing my ___.",
        "answers": [
            "coat"
        ]
    },
    {
        "template": "I am carrying my ___.",
        "answers": [
            "umbrella"
        ]
    },
    {
        "template": "I still feel ___.",
        "answers": [
            "happy"
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
        "word": "raining",
        "vi": "mưa",
        "distractor": false
    },
    {
        "word": "coat",
        "vi": "áo khoác",
        "distractor": false
    },
    {
        "word": "umbrella",
        "vi": "ô/dù",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "sunny",
        "vi": "nắng — không phải hôm nay",
        "distractor": true
    },
    {
        "word": "sandals",
        "vi": "dép — không phải mưa",
        "distractor": true
    },
    {
        "word": "sad",
        "vi": "buồn",
        "distractor": true
    }
]
    }
  }
};
