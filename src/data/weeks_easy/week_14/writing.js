export default {
  title: "My World",
  min_words: 25,
  model_sentence: "My name is Emma. I have a wonderful family. I live near the park. I feel happy every day.",
  instruction_en: "Write about your world \u2014 your family, home, and feelings!",
  instruction_vi: "Vi\u1ebft v\u1ec1 th\u1ebf gi\u1edbi c\u1ee7a b\u1ea1n \u2014 gia \u0111\u00ecnh, nh\u00e0 v\u00e0 c\u1ea3m x\u00fac!",
  prompt_en: "What is your name? What is your family like? Where do you live? How do you feel?",
  prompt_vi: "T\u00ean b\u1ea1n l\u00e0 g\u00ec? Gia \u0111\u00ecnh th\u1ebf n\u00e0o? B\u1ea1n s\u1ed1ng \u1edf \u0111\u00e2u? C\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["Emma", "wonderful", "family", "park", "happy"],
  topic_talk_prompt: "Tell me about your world!",
  sentence_frames: [
    {
        "template": "My name is ___.",
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
        "template": "I live near the ___.",
        "answers": [
            "park"
        ]
    },
    {
        "template": "I feel ___ every day.",
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
        "word": "park",
        "vi": "công viên",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "terrible",
        "vi": "tệ hại",
        "distractor": true
    },
    {
        "word": "library",
        "vi": "thư viện",
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
