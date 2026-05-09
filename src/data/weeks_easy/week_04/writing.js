export default {
  title: "What I Like",
  min_words: 20,
  model_sentence: "I like to play. I like to draw. I like to read. When I play, I smile. When I draw, I am happy. When I read, I feel good.",
  instruction_en: "Write about things you like!",
  instruction_vi: "Vi\u1ebft v\u1ec1 nh\u1eefng th\u1ee9 b\u1ea1n th\u00edch!",
  prompt_en: "What do you like to do? How does it make you feel?",
  prompt_vi: "B\u1ea1n th\u00edch l\u00e0m g\u00ec? N\u00f3 khi\u1ebfn b\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["play", "draw", "read", "smile", "happy", "good"],
  topic_talk_prompt: "What do you like to do?",
  sentence_frames: [
    {
        "template": "I like to ___.",
        "answers": [
            "play"
        ]
    },
    {
        "template": "I also like to ___.",
        "answers": [
            "draw"
        ]
    },
    {
        "template": "I love to ___, too.",
        "answers": [
            "read"
        ]
    },
    {
        "template": "When I play, I ___.",
        "answers": [
            "smile"
        ]
    },
    {
        "template": "When I read, I feel ___.",
        "answers": [
            "good"
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
        "word": "play",
        "vi": "chơi",
        "distractor": false
    },
    {
        "word": "draw",
        "vi": "vẽ",
        "distractor": false
    },
    {
        "word": "read",
        "vi": "đọc",
        "distractor": false
    },
    {
        "word": "smile",
        "vi": "cười",
        "distractor": false
    },
    {
        "word": "good",
        "vi": "tốt/vui",
        "distractor": false
    },
    {
        "word": "cry",
        "vi": "khóc",
        "distractor": true
    },
    {
        "word": "sleep",
        "vi": "ngủ",
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
