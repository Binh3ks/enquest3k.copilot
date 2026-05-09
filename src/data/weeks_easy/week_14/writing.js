export default {
  title: "My World",
  min_words: 25,
  model_sentence: "My name is Emma and I want to show you my world. I have a wonderful family with my mom, my dad, and my little sister. I live in a nice house near the park.",
  instruction_en: "Write about your world!",
  instruction_vi: "Vi\u1ebft v\u1ec1 th\u1ebf gi\u1edbi c\u1ee7a b\u1ea1n!",
  prompt_en: "What is your name? What is your family like? Where do you live?",
  prompt_vi: "T\u00ean b\u1ea1n l\u00e0 g\u00ec? Gia \u0111\u00ecnh th\u1ebf n\u00e0o? B\u1ea1n s\u1ed1ng \u1edf \u0111\u00e2u?",
  keywords: ["Emma", "family", "mom", "dad", "sister", "house", "park"],
  topic_talk_prompt: "Tell me about your world \u2014 your family and home!",
  sentence_frames: [
    {
        "template": "My name is ___ and I want to show you my world.",
        "answers": [
            "Emma"
        ]
    },
    {
        "template": "I have a ___ family.",
        "answers": [
            "wonderful"
        ]
    },
    {
        "template": "My family has my ___, my ___, and my little ___.",
        "answers": [
            "mom",
            "dad",
            "sister"
        ]
    },
    {
        "template": "I live near the ___.",
        "answers": [
            "park"
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
        "word": "Emma",
        "vi": "",
        "distractor": false
    },
    {
        "word": "wonderful",
        "vi": "tuyệt vời",
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
        "word": "sister",
        "vi": "chị/em gái",
        "distractor": false
    },
    {
        "word": "park",
        "vi": "công viên",
        "distractor": false
    },
    {
        "word": "terrible",
        "vi": "tệ",
        "distractor": true
    },
    {
        "word": "brother",
        "vi": "anh/em trai",
        "distractor": true
    },
    {
        "word": "school",
        "vi": "trường",
        "distractor": true
    }
]
    }
  }
};
