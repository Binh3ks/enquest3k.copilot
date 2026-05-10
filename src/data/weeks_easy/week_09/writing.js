export default {
  title: "My City",
  min_words: 25,
  model_sentence: "I live in a big city. The city is busy and noisy. I see tall buildings every day. People go to work and school.",
  instruction_en: "Write about your city!",
  instruction_vi: "Vi\u1ebft v\u1ec1 th\u00e0nh ph\u1ed1 c\u1ee7a b\u1ea1n!",
  prompt_en: "Where do you live? What is it like? What do you see?",
  prompt_vi: "B\u1ea1n s\u1ed1ng \u1edf \u0111\u00e2u? N\u01a1i \u0111\u00f3 nh\u01b0 th\u1ebf n\u00e0o? B\u1ea1n nh\u00ecn th\u1ea5y g\u00ec?",
  keywords: ["city", "busy", "noisy", "buildings", "people", "work", "school"],
  topic_talk_prompt: "Tell me about your city!",
  sentence_frames: [
    {
        "template": "I live in a ___ city.",
        "answers": [
            "big"
        ]
    },
    {
        "template": "The city is ___ and ___.",
        "answers": [
            "busy",
            "noisy"
        ]
    },
    {
        "template": "I see ___ buildings every day.",
        "answers": [
            "tall"
        ]
    },
    {
        "template": "People go to ___ and ___.",
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
        "word": "work",
        "vi": "làm việc",
        "distractor": false
    },
    {
        "word": "school",
        "vi": "trường học",
        "distractor": false
    },
    {
        "word": "tiny",
        "vi": "rất nhỏ",
        "distractor": true
    },
    {
        "word": "peaceful",
        "vi": "bình yên",
        "distractor": true
    },
    {
        "word": "silent",
        "vi": "im lặng — sai ngữ cảnh",
        "distractor": true
    }
]
    }
  }
};
