export default {
  title: "My House Description",
  min_words: 30,
  model_sentence: "I live in a nice house. My house has a bedroom, a kitchen, a bathroom, and a living room. In my bedroom, there is a lamp and a bookshelf.",
  instruction_en: "Describe your house using full phrases!",
  instruction_vi: "M\u00f4 t\u1ea3 ng\u00f4i nh\u00e0 c\u1ee7a b\u1ea1n b\u1eb1ng c\u1ee5m t\u1eeb \u0111\u1ea7y \u0111\u1ee7!",
  prompt_en: "What rooms does your house have? What is in each room?",
  prompt_vi: "Nh\u00e0 b\u1ea1n c\u00f3 nh\u1eefng ph\u00f2ng g\u00ec? M\u1ed7i ph\u00f2ng c\u00f3 g\u00ec?",
  keywords: ["bedroom", "kitchen", "bathroom", "living room", "lamp", "bookshelf"],
  topic_talk_prompt: "Describe your house room by room!",
  sentence_frames: [
    {
        "template": "I live in ___.",
        "answers": [
            "a nice house"
        ]
    },
    {
        "template": "My house has ___, ___, ___, and ___.",
        "answers": [
            "a bedroom",
            "a kitchen",
            "a bathroom",
            "a living room"
        ]
    },
    {
        "template": "In my bedroom, there is ___ and ___.",
        "answers": [
            "a lamp",
            "a bookshelf"
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
        "word": "a nice house",
        "vi": "một ngôi nhà đẹp",
        "distractor": false
    },
    {
        "word": "a bedroom",
        "vi": "phòng ngủ",
        "distractor": false
    },
    {
        "word": "a kitchen",
        "vi": "nhà bếp",
        "distractor": false
    },
    {
        "word": "a bathroom",
        "vi": "phòng tắm",
        "distractor": false
    },
    {
        "word": "a living room",
        "vi": "phòng khách",
        "distractor": false
    },
    {
        "word": "a lamp",
        "vi": "đèn",
        "distractor": false
    },
    {
        "word": "a bookshelf",
        "vi": "kệ sách",
        "distractor": false
    },
    {
        "word": "a broken house",
        "vi": "nhà hỏng",
        "distractor": true
    },
    {
        "word": "a swimming pool",
        "vi": "bể bơi",
        "distractor": true
    }
]
    }
  }
};
