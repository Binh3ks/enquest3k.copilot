export default {
  title: "My Favorite Sport",
  min_words: 25,
  model_sentence: "I love soccer. I am kicking the ball. My team is running fast. We are scoring goals. Everyone is cheering. I have energy and fun!",
  instruction_en: "Write about your favourite sport!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u00f4n th\u1ec3 thao y\u00eau th\u00edch c\u1ee7a b\u1ea1n!",
  prompt_en: "What sport do you play? What are you doing? How do you feel?",
  prompt_vi: "B\u1ea1n ch\u01a1i m\u00f4n th\u1ec3 thao g\u00ec? B\u1ea1n \u0111ang l\u00e0m g\u00ec? C\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["soccer", "kicking", "ball", "running", "goals", "cheering", "energy"],
  topic_talk_prompt: "What is your favourite sport?",
  sentence_frames: [
    {
        "template": "I love ___.",
        "answers": [
            "soccer"
        ]
    },
    {
        "template": "I am ___ the ball.",
        "answers": [
            "kicking"
        ]
    },
    {
        "template": "My team is running ___.",
        "answers": [
            "fast"
        ]
    },
    {
        "template": "We are scoring ___.",
        "answers": [
            "goals"
        ]
    },
    {
        "template": "Everyone is ___.",
        "answers": [
            "cheering"
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
        "word": "soccer",
        "vi": "bóng đá",
        "distractor": false
    },
    {
        "word": "kicking",
        "vi": "đá",
        "distractor": false
    },
    {
        "word": "fast",
        "vi": "nhanh",
        "distractor": false
    },
    {
        "word": "goals",
        "vi": "bàn thắng",
        "distractor": false
    },
    {
        "word": "cheering",
        "vi": "cổ vũ",
        "distractor": false
    },
    {
        "word": "catching",
        "vi": "bắt",
        "distractor": true
    },
    {
        "word": "slowly",
        "vi": "chậm chạp",
        "distractor": true
    },
    {
        "word": "sleeping",
        "vi": "ngủ",
        "distractor": true
    }
]
    }
  }
};
