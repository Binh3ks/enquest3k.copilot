export default {
  title: "My Weekend Story",
  min_words: 32,
  model_sentence: "Last weekend my family went to the park. We packed some food. We walked along the trail. We saw a waterfall. We drove home feeling happy.",
  instruction_en: "Write your weekend story in order, like a comic strip!",
  instruction_vi: "Vi\u1ebft c\u00e2u chuy\u1ec7n cu\u1ed1i tu\u1ea7n theo th\u1ee9 t\u1ef1 nh\u01b0 m\u1ed9t d\u1ea3i truy\u1ec7n tranh!",
  prompt_en: "Where did you go? What did you do first? Then? At the end?",
  prompt_vi: "B\u1ea1n \u0111\u00e3 \u0111i \u0111\u00e2u? \u0110\u1ea7u ti\u00ean l\u00e0m g\u00ec? Ti\u1ebfp theo? Cu\u1ed1i c\u00f9ng th\u1ebf n\u00e0o?",
  keywords: ["weekend", "park", "packed", "trail", "waterfall", "happy"],
  topic_talk_prompt: "Tell me about your last weekend like a four-panel story!",
  sentence_frames: [
    {
        "template": "Last weekend my family went to the ___.",
        "answers": [
            "park"
        ]
    },
    {
        "template": "We ___ some food.",
        "answers": [
            "packed"
        ]
    },
    {
        "template": "We walked along the ___.",
        "answers": [
            "trail"
        ]
    },
    {
        "template": "We saw a ___.",
        "answers": [
            "waterfall"
        ]
    },
    {
        "template": "We drove home feeling ___.",
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
      scaffolding_stage: "low",
      words: [
    {
        "word": "park",
        "vi": "công viên",
        "distractor": false
    },
    {
        "word": "packed",
        "vi": "đóng gói",
        "distractor": false
    },
    {
        "word": "trail",
        "vi": "đường mòn",
        "distractor": false
    },
    {
        "word": "waterfall",
        "vi": "thác nước",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "airport",
        "vi": "sân bay",
        "distractor": true
    },
    {
        "word": "threw away",
        "vi": "ném đi",
        "distractor": true
    },
    {
        "word": "bored",
        "vi": "chán nản",
        "distractor": true
    }
]
    }
  }
};
