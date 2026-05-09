export default {
  title: "My Busy Classroom",
  min_words: 30,
  model_sentence: "My classroom is very busy on Monday morning! There are 28 students in my class. There are desks for everyone. There are colourful posters on the walls.",
  instruction_en: "Describe your busy classroom using full phrases!",
  instruction_vi: "M\u00f4 t\u1ea3 l\u1edbp h\u1ecdc b\u1eadn r\u1ed9n c\u1ee7a b\u1ea1n b\u1eb1ng c\u1ee5m t\u1eeb!",
  prompt_en: "How many students are there? What do you see around you?",
  prompt_vi: "C\u00f3 bao nhi\u00eau h\u1ecdc sinh? B\u1ea1n th\u1ea5y g\u00ec xung quanh?",
  keywords: ["busy", "students", "desks", "posters", "Monday", "colourful"],
  topic_talk_prompt: "Describe a busy day in your classroom!",
  sentence_frames: [
    {
        "template": "My classroom is ___ on ___!",
        "answers": [
            "very busy",
            "Monday morning"
        ]
    },
    {
        "template": "There are ___ students and ___ for everyone.",
        "answers": [
            "28",
            "desks"
        ]
    },
    {
        "template": "There are ___ on the walls.",
        "answers": [
            "colourful posters"
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
        "word": "very busy",
        "vi": "rất bận rộn",
        "distractor": false
    },
    {
        "word": "Monday morning",
        "vi": "sáng thứ Hai",
        "distractor": false
    },
    {
        "word": "28",
        "vi": "28",
        "distractor": false
    },
    {
        "word": "desks",
        "vi": "bàn học",
        "distractor": false
    },
    {
        "word": "colourful posters",
        "vi": "áp phích đầy màu sắc",
        "distractor": false
    },
    {
        "word": "very quiet",
        "vi": "rất yên tĩnh",
        "distractor": true
    },
    {
        "word": "Sunday afternoon",
        "vi": "chiều Chủ nhật",
        "distractor": true
    },
    {
        "word": "no students",
        "vi": "không có học sinh",
        "distractor": true
    }
]
    }
  }
};
