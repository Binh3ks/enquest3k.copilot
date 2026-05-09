export default {
  title: "My City",
  min_words: 25,
  model_sentence: "I live in a big city. My city is very busy and noisy. Every day I see tall buildings and modern cars. The streets are full of people.",
  instruction_en: "Write about where you live!",
  instruction_vi: "Vi\u1ebft v\u1ec1 n\u01a1i b\u1ea1n s\u1ed1ng!",
  prompt_en: "What is your city like? What do you see every day?",
  prompt_vi: "Th\u00e0nh ph\u1ed1 c\u1ee7a b\u1ea1n th\u1ebf n\u00e0o? B\u1ea1n nh\u00ecn th\u1ea5y g\u00ec m\u1ed7i ng\u00e0y?",
  keywords: ["city", "busy", "noisy", "buildings", "cars", "streets", "people"],
  topic_talk_prompt: "Tell me about your city!",
  sentence_frames: [
    {
        "template": "I live in a ___ city.",
        "answers": [
            "big"
        ]
    },
    {
        "template": "My city is very ___ and ___.",
        "answers": [
            "busy",
            "noisy"
        ]
    },
    {
        "template": "I see ___ buildings and ___ cars.",
        "answers": [
            "tall",
            "modern"
        ]
    },
    {
        "template": "The streets are full of ___.",
        "answers": [
            "people"
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
        "word": "big",
        "vi": "to lớn",
        "distractor": false
    },
    {
        "word": "busy",
        "vi": "bận rộn",
        "distractor": false
    },
    {
        "word": "noisy",
        "vi": "ồn ào",
        "distractor": false
    },
    {
        "word": "tall",
        "vi": "cao",
        "distractor": false
    },
    {
        "word": "modern",
        "vi": "hiện đại",
        "distractor": false
    },
    {
        "word": "people",
        "vi": "người",
        "distractor": false
    },
    {
        "word": "quiet",
        "vi": "yên tĩnh",
        "distractor": true
    },
    {
        "word": "empty",
        "vi": "trống vắng",
        "distractor": true
    },
    {
        "word": "old",
        "vi": "cũ",
        "distractor": true
    }
]
    }
  }
};
