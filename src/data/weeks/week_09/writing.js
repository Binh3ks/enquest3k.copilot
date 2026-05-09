export default {
  title: "My City",
  min_words: 35,
  model_sentence: "I live in a big city. My city is very busy and noisy. Every day I see tall buildings and modern cars. The streets are full of people going to work and school.",
  instruction_en: "Describe your city using detailed phrases!",
  instruction_vi: "M\u00f4 t\u1ea3 th\u00e0nh ph\u1ed1 c\u1ee7a b\u1ea1n b\u1eb1ng c\u1ee5m t\u1eeb chi ti\u1ebft!",
  prompt_en: "What makes your city special? What do you see and hear?",
  prompt_vi: "\u0110i\u1ec1u g\u00ec l\u00e0m th\u00e0nh ph\u1ed1 c\u1ee7a b\u1ea1n \u0111\u1eb7c bi\u1ec7t?",
  keywords: ["city", "busy", "noisy", "buildings", "cars", "people", "work", "school"],
  topic_talk_prompt: "Describe your city in detail!",
  sentence_frames: [
    {
        "template": "I live in ___ and it is very ___ and ___.",
        "answers": [
            "a big city",
            "busy",
            "noisy"
        ]
    },
    {
        "template": "Every day I see ___ and ___ on the streets.",
        "answers": [
            "tall buildings",
            "modern cars"
        ]
    },
    {
        "template": "The streets are full of people going to ___ and ___.",
        "answers": [
            "work",
            "school"
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
        "word": "a big city",
        "vi": "một thành phố lớn",
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
        "word": "tall buildings",
        "vi": "những tòa nhà cao",
        "distractor": false
    },
    {
        "word": "modern cars",
        "vi": "xe hơi hiện đại",
        "distractor": false
    },
    {
        "word": "work",
        "vi": "đi làm",
        "distractor": false
    },
    {
        "word": "school",
        "vi": "đi học",
        "distractor": false
    },
    {
        "word": "a small village",
        "vi": "một ngôi làng nhỏ",
        "distractor": true
    },
    {
        "word": "peaceful and quiet",
        "vi": "bình yên và yên tĩnh",
        "distractor": true
    }
]
    }
  }
};
