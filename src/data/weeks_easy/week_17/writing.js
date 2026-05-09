export default {
  title: "My Weather Day",
  min_words: 25,
  model_sentence: "It is raining today, so I am wearing my coat. I am also carrying my umbrella. My boots keep my feet dry. The sky is grey but I am happy.",
  instruction_en: "Write about a rainy day!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u1ed9t ng\u00e0y m\u01b0a!",
  prompt_en: "What is the weather? What are you wearing? How do you feel?",
  prompt_vi: "Th\u1eddi ti\u1ebft th\u1ebf n\u00e0o? B\u1ea1n m\u1eb7c g\u00ec? C\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["raining", "coat", "umbrella", "boots", "dry", "grey", "happy"],
  topic_talk_prompt: "What is the weather like today?",
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
        "template": "My boots keep my feet ___.",
        "answers": [
            "dry"
        ]
    },
    {
        "template": "I am still ___!",
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
        "word": "dry",
        "vi": "khô",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "sunny",
        "vi": "nắng",
        "distractor": true
    },
    {
        "word": "sandals",
        "vi": "dép",
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
