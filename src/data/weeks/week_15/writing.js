export default {
  title: "Write About Your Park Visit",
  min_words: 35,
  model_sentence: "Today I am visiting the park with my class! The park is very busy and exciting. Many people are enjoying their day. A young family is having a picnic on the grass.",
  instruction_en: "Write about your park visit with descriptive phrases!",
  instruction_vi: "Vi\u1ebft v\u1ec1 chuy\u1ebfn th\u0103m c\u00f4ng vi\u00ean v\u1edbi t\u1eeb m\u00f4 t\u1ea3!",
  prompt_en: "Who is at the park? What are they doing? What do you see?",
  prompt_vi: "Ai \u1edf c\u00f4ng vi\u00ean? H\u1ecd \u0111ang l\u00e0m g\u00ec? B\u1ea1n th\u1ea5y g\u00ec?",
  keywords: ["park", "class", "busy", "exciting", "people", "family", "picnic", "grass"],
  topic_talk_prompt: "Describe a visit to the park with your class!",
  sentence_frames: [
    {
        "template": "I am visiting ___ with ___!",
        "answers": [
            "the park",
            "my class"
        ]
    },
    {
        "template": "The park is very ___ and ___.",
        "answers": [
            "busy",
            "exciting"
        ]
    },
    {
        "template": "A young family is ___ on ___.",
        "answers": [
            "having a picnic",
            "the grass"
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
        "word": "the park",
        "vi": "công viên",
        "distractor": false
    },
    {
        "word": "my class",
        "vi": "lớp học của tôi",
        "distractor": false
    },
    {
        "word": "busy",
        "vi": "đông đúc",
        "distractor": false
    },
    {
        "word": "exciting",
        "vi": "thú vị",
        "distractor": false
    },
    {
        "word": "having a picnic",
        "vi": "dã ngoại",
        "distractor": false
    },
    {
        "word": "the grass",
        "vi": "bãi cỏ",
        "distractor": false
    },
    {
        "word": "the library",
        "vi": "thư viện",
        "distractor": true
    },
    {
        "word": "boring and empty",
        "vi": "chán và vắng",
        "distractor": true
    },
    {
        "word": "sleeping",
        "vi": "ngủ",
        "distractor": true
    }
]
    }
  }
};
