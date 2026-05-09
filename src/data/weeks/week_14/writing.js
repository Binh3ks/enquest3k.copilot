export default {
  title: "Write About Your Presentation Day",
  min_words: 35,
  model_sentence: "Today is my presentation day! I feel confident and proud. My poster is about my family. I have pictures of my mom, dad, and little sister on it.",
  instruction_en: "Write about presenting your poster at school!",
  instruction_vi: "Vi\u1ebft v\u1ec1 ng\u00e0y thuy\u1ebft tr\u00ecnh \u00e1p ph\u00edch \u1edf tr\u01b0\u1eddng!",
  prompt_en: "How do you feel? What is your poster about? What pictures do you have?",
  prompt_vi: "B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o? \u00c1p ph\u00edch n\u00f3i v\u1ec1 g\u00ec?",
  keywords: ["presentation", "confident", "proud", "poster", "family", "pictures"],
  topic_talk_prompt: "Tell me about your presentation day at school!",
  sentence_frames: [
    {
        "template": "Today is ___ and I feel ___ and ___.",
        "answers": [
            "my presentation day",
            "confident",
            "proud"
        ]
    },
    {
        "template": "My poster is about ___.",
        "answers": [
            "my family"
        ]
    },
    {
        "template": "I have pictures of my ___, ___, and ___ on it.",
        "answers": [
            "mom",
            "dad",
            "little sister"
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
        "word": "my presentation day",
        "vi": "ngày thuyết trình của tôi",
        "distractor": false
    },
    {
        "word": "confident",
        "vi": "tự tin",
        "distractor": false
    },
    {
        "word": "proud",
        "vi": "tự hào",
        "distractor": false
    },
    {
        "word": "my family",
        "vi": "gia đình tôi",
        "distractor": false
    },
    {
        "word": "mom",
        "vi": "mẹ",
        "distractor": false
    },
    {
        "word": "dad",
        "vi": "bố",
        "distractor": false
    },
    {
        "word": "little sister",
        "vi": "em gái",
        "distractor": false
    },
    {
        "word": "nervous and scared",
        "vi": "lo lắng và sợ hãi",
        "distractor": true
    },
    {
        "word": "my school building",
        "vi": "tòa nhà trường",
        "distractor": true
    }
]
    }
  }
};
