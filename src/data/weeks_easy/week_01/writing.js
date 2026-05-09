export default {
  title: "My School",
  min_words: 20,
  model_sentence: "I am Alex. I am a student. My teacher is kind. My class is big. I am happy.",
  instruction_en: "Write about your school!",
  instruction_vi: "Vi\u1ebft v\u1ec1 tr\u01b0\u1eddng c\u1ee7a b\u1ea1n!",
  prompt_en: "What is your name? How is your teacher? How is your class?",
  prompt_vi: "T\u00ean b\u1ea1n l\u00e0 g\u00ec? Th\u1ea7y/c\u00f4 th\u1ebf n\u00e0o? L\u1edbp h\u1ecdc th\u1ebf n\u00e0o?",
  keywords: ["student", "teacher", "class", "happy", "big"],
  topic_talk_prompt: "Tell me about your school!",
  sentence_frames: [
    {
        "template": "My name is ___.",
        "answers": [
            "Alex"
        ]
    },
    {
        "template": "I am a ___.",
        "answers": [
            "student"
        ]
    },
    {
        "template": "My teacher is ___.",
        "answers": [
            "kind"
        ]
    },
    {
        "template": "My class is ___.",
        "answers": [
            "big"
        ]
    },
    {
        "template": "I feel ___ at school.",
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
      scaffolding_stage: "high",
      words: [
    {
        "word": "Alex",
        "vi": "",
        "distractor": false
    },
    {
        "word": "student",
        "vi": "học sinh",
        "distractor": false
    },
    {
        "word": "kind",
        "vi": "tốt bụng",
        "distractor": false
    },
    {
        "word": "big",
        "vi": "to lớn",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "sad",
        "vi": "buồn",
        "distractor": true
    },
    {
        "word": "mean",
        "vi": "xấu tính",
        "distractor": true
    },
    {
        "word": "small",
        "vi": "nhỏ",
        "distractor": true
    }
]
    }
  }
};
