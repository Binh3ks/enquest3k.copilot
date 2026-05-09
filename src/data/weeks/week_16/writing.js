export default {
  title: "My Favorite Sport",
  min_words: 35,
  model_sentence: "I love playing soccer. I am kicking the ball hard. My team is running fast. We are scoring many goals. The ball is flying through the air.",
  instruction_en: "Describe your sport using present continuous phrases!",
  instruction_vi: "M\u00f4 t\u1ea3 m\u00f4n th\u1ec3 thao b\u1eb1ng th\u00ec hi\u1ec7n t\u1ea1i ti\u1ebfp di\u1ec5n!",
  prompt_en: "What are you and your team doing? What does it feel like?",
  prompt_vi: "B\u1ea1n v\u00e0 \u0111\u1ed9i \u0111ang l\u00e0m g\u00ec? C\u1ea3m gi\u00e1c th\u1ebf n\u00e0o?",
  keywords: ["soccer", "kicking", "hard", "running", "goals", "flying", "air"],
  topic_talk_prompt: "Describe your favourite sport in action!",
  sentence_frames: [
    {
        "template": "I love playing ___ and I am ___ the ball hard.",
        "answers": [
            "soccer",
            "kicking"
        ]
    },
    {
        "template": "My team is ___ and we are scoring ___ goals.",
        "answers": [
            "running fast",
            "many"
        ]
    },
    {
        "template": "The ball is ___ through ___.",
        "answers": [
            "flying",
            "the air"
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
        "word": "running fast",
        "vi": "chạy nhanh",
        "distractor": false
    },
    {
        "word": "many",
        "vi": "nhiều",
        "distractor": false
    },
    {
        "word": "flying",
        "vi": "bay",
        "distractor": false
    },
    {
        "word": "the air",
        "vi": "không khí",
        "distractor": false
    },
    {
        "word": "tennis",
        "vi": "tennis",
        "distractor": true
    },
    {
        "word": "walking slowly",
        "vi": "đi chậm rãi",
        "distractor": true
    },
    {
        "word": "zero",
        "vi": "không (sai)",
        "distractor": true
    }
]
    }
  }
};
