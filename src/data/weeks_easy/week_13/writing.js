export default {
  title: "My Day",
  min_words: 25,
  model_sentence: "I wake up at 7 o'clock. I brush my teeth. I eat breakfast. I go to school. I have lunch. I play with friends. I do homework. I go to bed.",
  instruction_en: "Write about your day from morning to night!",
  instruction_vi: "Vi\u1ebft v\u1ec1 ng\u00e0y c\u1ee7a b\u1ea1n t\u1eeb s\u00e1ng \u0111\u1ebfn t\u1ed1i!",
  prompt_en: "What do you do in the morning? At school? In the evening?",
  prompt_vi: "B\u1ea1n l\u00e0m g\u00ec bu\u1ed5i s\u00e1ng? \u1ede tr\u01b0\u1eddng? Bu\u1ed5i t\u1ed1i?",
  keywords: ["wake", "brush", "breakfast", "school", "lunch", "play", "homework", "bed"],
  topic_talk_prompt: "Tell me about your daily routine!",
  sentence_frames: [
    {
        "template": "I wake up at ___ o'clock.",
        "answers": [
            "7"
        ]
    },
    {
        "template": "I ___ my teeth in the morning.",
        "answers": [
            "brush"
        ]
    },
    {
        "template": "I eat ___ with my family.",
        "answers": [
            "breakfast"
        ]
    },
    {
        "template": "I go to ___ every day.",
        "answers": [
            "school"
        ]
    },
    {
        "template": "In the evening, I do my ___.",
        "answers": [
            "homework"
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
        "word": "7",
        "vi": "bảy giờ",
        "distractor": false
    },
    {
        "word": "brush",
        "vi": "đánh",
        "distractor": false
    },
    {
        "word": "breakfast",
        "vi": "bữa sáng",
        "distractor": false
    },
    {
        "word": "school",
        "vi": "trường",
        "distractor": false
    },
    {
        "word": "homework",
        "vi": "bài tập về nhà",
        "distractor": false
    },
    {
        "word": "12",
        "vi": "mười hai giờ (sai giờ thức)",
        "distractor": true
    },
    {
        "word": "comb",
        "vi": "chải (không phải răng)",
        "distractor": true
    },
    {
        "word": "dinner",
        "vi": "bữa tối",
        "distractor": true
    }
]
    }
  }
};
