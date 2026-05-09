export default {
  title: "My First Day at School",
  min_words: 30,
  model_sentence: "I am Alex. I am a student. My teacher is Ms. Johnson. She is very kind. My classroom is big. There are many desks and books.",
  instruction_en: "Describe your school using full phrases!",
  instruction_vi: "M\u00f4 t\u1ea3 tr\u01b0\u1eddng c\u1ee7a b\u1ea1n b\u1eb1ng c\u1ee5m t\u1eeb \u0111\u1ea7y \u0111\u1ee7!",
  prompt_en: "Who is your teacher? What is your classroom like? What do you see?",
  prompt_vi: "Th\u1ea7y/c\u00f4 c\u1ee7a b\u1ea1n l\u00e0 ai? L\u1edbp h\u1ecdc tr\u00f4ng th\u1ebf n\u00e0o?",
  keywords: ["student", "teacher", "classroom", "kind", "desks", "books"],
  topic_talk_prompt: "Tell me about your school. What is your classroom like?",
  sentence_frames: [
    {
        "template": "My name is ___ and I am ___.",
        "answers": [
            "Alex",
            "a student"
        ]
    },
    {
        "template": "My teacher is ___ and she is ___.",
        "answers": [
            "Ms. Johnson",
            "very kind"
        ]
    },
    {
        "template": "My classroom is ___ with many ___ and ___ on the shelves.",
        "answers": [
            "big",
            "desks",
            "books"
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
        "word": "a student",
        "vi": "một học sinh",
        "distractor": false
    },
    {
        "word": "Ms. Johnson",
        "vi": "",
        "distractor": false
    },
    {
        "word": "very kind",
        "vi": "rất tốt bụng",
        "distractor": false
    },
    {
        "word": "big",
        "vi": "to lớn",
        "distractor": false
    },
    {
        "word": "desks",
        "vi": "bàn học",
        "distractor": false
    },
    {
        "word": "books",
        "vi": "sách",
        "distractor": false
    },
    {
        "word": "very strict",
        "vi": "rất nghiêm",
        "distractor": true
    },
    {
        "word": "very messy",
        "vi": "rất bừa bộn",
        "distractor": true
    }
]
    }
  }
};
