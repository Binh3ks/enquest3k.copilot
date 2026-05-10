export default {
  title: "Hello, World!",
  min_words: 20,
  model_sentence: "My name is Alex. I am eight years old. I am a student. I feel happy at school.",
  instruction_en: "Write about yourself!",
  instruction_vi: "Vi\u1ebft v\u1ec1 b\u1ea3n th\u00e2n b\u1ea1n!",
  prompt_en: "What is your name? How old are you? How do you feel at school?",
  prompt_vi: "T\u00ean b\u1ea1n l\u00e0 g\u00ec? B\u1ea1n bao nhi\u00eau tu\u1ed5i? B\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o \u1edf tr\u01b0\u1eddng?",
  keywords: ["name", "old", "student", "happy", "school"],
  topic_talk_prompt: "Tell me about yourself!",
  sentence_frames: [
    {
        "template": "My name is ___.",
        "answers": [
            "Alex"
        ]
    },
    {
        "template": "I am ___ years old.",
        "answers": [
            "eight"
        ]
    },
    {
        "template": "I am a ___.",
        "answers": [
            "student"
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
        "word": "eight",
        "vi": "tám",
        "distractor": false
    },
    {
        "word": "student",
        "vi": "học sinh",
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
        "word": "teacher",
        "vi": "giáo viên",
        "distractor": true
    },
    {
        "word": "ten",
        "vi": "mười — sai tuổi",
        "distractor": true
    }
]
    }
  }
};
