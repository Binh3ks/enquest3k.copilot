export default {
  title: "My Favourite Sport",
  min_words: 25,
  model_sentence: "I love football. I am kicking the ball. My team is running fast. We are scoring a goal!",
  instruction_en: "Write about your favourite sport!",
  instruction_vi: "Vi\u1ebft v\u1ec1 m\u00f4n th\u1ec3 thao y\u00eau th\u00edch c\u1ee7a b\u1ea1n!",
  prompt_en: "What sport do you love? What are you doing? How does it feel?",
  prompt_vi: "B\u1ea1n y\u00eau th\u00edch m\u00f4n th\u1ec3 thao n\u00e0o? B\u1ea1n \u0111ang l\u00e0m g\u00ec? C\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["football", "kicking", "ball", "running", "scoring", "goal"],
  topic_talk_prompt: "Tell me about your favourite sport!",
  sentence_frames: [
    {
        "template": "I love ___.",
        "answers": [
            "football"
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
        "template": "We are scoring a ___!",
        "answers": [
            "goal"
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
        "word": "football",
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
        "word": "goal",
        "vi": "bàn thắng",
        "distractor": false
    },
    {
        "word": "catching",
        "vi": "bắt — không phải đá bóng",
        "distractor": true
    },
    {
        "word": "slowly",
        "vi": "chậm rãi",
        "distractor": true
    },
    {
        "word": "point",
        "vi": "điểm — không phải goal",
        "distractor": true
    }
]
    }
  }
};
