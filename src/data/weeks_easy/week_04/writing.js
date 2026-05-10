export default {
  title: "My Happy Jar",
  min_words: 20,
  model_sentence: "I like playing. I like drawing. I like reading. I feel happy when I draw.",
  instruction_en: "Write about things you like doing!",
  instruction_vi: "Vi\u1ebft v\u1ec1 nh\u1eefng vi\u1ec7c b\u1ea1n th\u00edch l\u00e0m!",
  prompt_en: "What do you like doing? How do you feel when you do it?",
  prompt_vi: "B\u1ea1n th\u00edch l\u00e0m g\u00ec? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o khi l\u00e0m \u0111i\u1ec1u \u0111\u00f3?",
  keywords: ["playing", "drawing", "reading", "happy"],
  topic_talk_prompt: "What do you like doing? How does it make you feel?",
  sentence_frames: [
    {
        "template": "I like ___.",
        "answers": [
            "playing"
        ]
    },
    {
        "template": "I also like ___.",
        "answers": [
            "drawing"
        ]
    },
    {
        "template": "I love ___, too.",
        "answers": [
            "reading"
        ]
    },
    {
        "template": "I feel ___ when I draw.",
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
      scaffolding_stage: "high",
      words: [
    {
        "word": "playing",
        "vi": "chơi",
        "distractor": false
    },
    {
        "word": "drawing",
        "vi": "vẽ",
        "distractor": false
    },
    {
        "word": "reading",
        "vi": "đọc",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "sleeping",
        "vi": "ngủ",
        "distractor": true
    },
    {
        "word": "sad",
        "vi": "buồn",
        "distractor": true
    },
    {
        "word": "cooking",
        "vi": "nấu ăn",
        "distractor": true
    }
]
    }
  }
};
