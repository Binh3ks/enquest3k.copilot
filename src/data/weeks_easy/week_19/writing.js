export default {
  title: "When I Was Small",
  min_words: 28,
  model_sentence: "I was a baby in this photo. I was very small. My face was round. My eyes were big. I was a noisy baby!",
  instruction_en: "Write about when you were a baby!",
  instruction_vi: "Vi\u1ebft v\u1ec1 khi b\u1ea1n c\u00f2n l\u00e0 em b\u00e9!",
  prompt_en: "What did you look like? What were you like as a baby?",
  prompt_vi: "B\u1ea1n tr\u00f4ng th\u1ebf n\u00e0o? B\u1ea1n nh\u01b0 th\u1ebf n\u00e0o khi c\u00f2n nh\u1ecf?",
  keywords: ["baby", "small", "round", "big", "noisy"],
  topic_talk_prompt: "Tell me what you were like when you were a baby!",
  sentence_frames: [
    {
        "template": "I was a ___ in this photo.",
        "answers": [
            "baby"
        ]
    },
    {
        "template": "I was very ___.",
        "answers": [
            "small"
        ]
    },
    {
        "template": "My face was ___.",
        "answers": [
            "round"
        ]
    },
    {
        "template": "My eyes were ___.",
        "answers": [
            "big"
        ]
    },
    {
        "template": "I was a ___ baby!",
        "answers": [
            "noisy"
        ]
    }
],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
    {
        "word": "baby",
        "vi": "em bé",
        "distractor": false
    },
    {
        "word": "small",
        "vi": "nhỏ",
        "distractor": false
    },
    {
        "word": "round",
        "vi": "tròn",
        "distractor": false
    },
    {
        "word": "big",
        "vi": "to",
        "distractor": false
    },
    {
        "word": "noisy",
        "vi": "ồn ào",
        "distractor": false
    },
    {
        "word": "tall",
        "vi": "cao — không phải baby",
        "distractor": true
    },
    {
        "word": "square",
        "vi": "vuông",
        "distractor": true
    },
    {
        "word": "silent",
        "vi": "im lặng",
        "distractor": true
    }
]
    }
  }
};
