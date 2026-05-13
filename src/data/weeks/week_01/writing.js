export default {
  title: "Hello, World!",
  min_words: 35,
  model_sentence: "My name is Alex and I am eight years old. I am a student at Green Hill School. My teacher is Ms. Johnson and she is very kind. I have many friends in my class. My favorite subject is English because I love reading stories. I feel excited and happy every day at school.",
  instruction_en: "Write about yourself and your school in full sentences!",
  instruction_vi: "Vi\u1ebft v\u1ec1 b\u1ea3n th\u00e2n v\u00e0 tr\u01b0\u1eddng h\u1ecdc b\u1eb1ng c\u00e2u \u0111\u1ea7y \u0111\u1ee7!",
  prompt_en: "What is your name and age? What is your school and teacher like? What do you love? How do you feel?",
  prompt_vi: "T\u00ean v\u00e0 tu\u1ed5i? Tr\u01b0\u1eddng v\u00e0 th\u1ea7y/c\u00f4 th\u1ebf n\u00e0o? B\u1ea1n th\u00edch g\u00ec? C\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["name", "student", "teacher", "kind", "subject", "English", "excited"],
  topic_talk_prompt: "Tell me about yourself and your school!",
  sentence_frames: [
    {
        "template": "My name is ___ and I am ___ years old.",
        "answers": [
            "Alex",
            "eight"
        ]
    },
    {
        "template": "I am a student at ___ School.",
        "answers": [
            "Green Hill"
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
        "template": "My favorite subject is ___ because I love ___.",
        "answers": [
            "English",
            "reading stories"
        ]
    },
    {
        "template": "I feel ___ and ___ every day at school.",
        "answers": [
            "excited",
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
        "word": "eight",
        "vi": "tám",
        "distractor": false
    },
    {
        "word": "Green Hill",
        "vi": "",
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
        "word": "English",
        "vi": "môn tiếng Anh",
        "distractor": false
    },
    {
        "word": "reading stories",
        "vi": "đọc truyện",
        "distractor": false
    },
    {
        "word": "excited",
        "vi": "hào hứng",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "very strict",
        "vi": "rất nghiêm khắc",
        "distractor": true
    },
    {
        "word": "maths",
        "vi": "toán — sai môn",
        "distractor": true
    },
    {
        "word": "bored and tired",
        "vi": "chán và mệt",
        "distractor": true
    }
]
    }
  }
};
