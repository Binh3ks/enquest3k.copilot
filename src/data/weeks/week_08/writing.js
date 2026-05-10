export default {
  title: "My Busy Classroom",
  min_words: 40,
  model_sentence: "My classroom is very bright and cheerful because the walls are covered with colourful posters and student artwork. There are exactly twenty-eight students in my class and we all sit at wooden desks arranged in four rows. On the front wall there is a large whiteboard and two interactive screens that the teacher uses every day. Along the back wall there is a tall bookshelf with over a hundred books organised by subject and reading level. Our classroom also has a reading corner with soft cushions where we can sit and read quietly during free time. I feel proud of our classroom because we all help to keep it neat and tidy.",
  instruction_en: "Describe your busy classroom with numbers, colours, and reasons!",
  instruction_vi: "M\u00f4 t\u1ea3 l\u1edbp h\u1ecdc c\u1ee7a b\u1ea1n v\u1edbi s\u1ed1 \u0111\u1ebfm, m\u00e0u s\u1eafc v\u00e0 l\u00fd do!",
  prompt_en: "What does your classroom look like? How many of each thing? Why do you feel proud?",
  prompt_vi: "L\u1edbp h\u1ecdc tr\u00f4ng th\u1ebf n\u00e0o? C\u00f3 bao nhi\u00eau th\u1ee9 m\u1ed7i lo\u1ea1i? T\u1ea1i sao b\u1ea1n t\u1ef1 h\u00e0o?",
  keywords: ["bright", "cheerful", "arranged", "whiteboard", "interactive", "bookshelf", "cushions", "tidy"],
  topic_talk_prompt: "Give me a full detailed description of your classroom!",
  sentence_frames: [
    {
        "template": "My classroom is ___ and ___ because the walls are covered with ___ and ___.",
        "answers": [
            "very bright",
            "cheerful",
            "colourful posters",
            "student artwork"
        ]
    },
    {
        "template": "There are exactly ___ students and we sit at ___ arranged in ___.",
        "answers": [
            "twenty-eight",
            "wooden desks",
            "four rows"
        ]
    },
    {
        "template": "On the front wall there is ___ and ___ that the teacher uses every day.",
        "answers": [
            "a large whiteboard",
            "two interactive screens"
        ]
    },
    {
        "template": "Along the back wall there is ___ with ___ organised by subject.",
        "answers": [
            "a tall bookshelf",
            "over a hundred books"
        ]
    },
    {
        "template": "I feel ___ of our classroom because we all help to keep it ___.",
        "answers": [
            "proud",
            "neat and tidy"
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
        "word": "very bright",
        "vi": "rất sáng",
        "distractor": false
    },
    {
        "word": "cheerful",
        "vi": "vui tươi",
        "distractor": false
    },
    {
        "word": "colourful posters",
        "vi": "áp phích đầy màu sắc",
        "distractor": false
    },
    {
        "word": "student artwork",
        "vi": "tranh vẽ của học sinh",
        "distractor": false
    },
    {
        "word": "twenty-eight",
        "vi": "hai mươi tám",
        "distractor": false
    },
    {
        "word": "wooden desks",
        "vi": "bàn gỗ",
        "distractor": false
    },
    {
        "word": "four rows",
        "vi": "bốn hàng",
        "distractor": false
    },
    {
        "word": "a large whiteboard",
        "vi": "bảng trắng lớn",
        "distractor": false
    },
    {
        "word": "two interactive screens",
        "vi": "hai màn hình tương tác",
        "distractor": false
    },
    {
        "word": "a tall bookshelf",
        "vi": "kệ sách cao",
        "distractor": false
    },
    {
        "word": "over a hundred books",
        "vi": "hơn một trăm cuốn sách",
        "distractor": false
    },
    {
        "word": "proud",
        "vi": "tự hào",
        "distractor": false
    },
    {
        "word": "neat and tidy",
        "vi": "gọn gàng và sạch sẽ",
        "distractor": false
    },
    {
        "word": "very dark and gloomy",
        "vi": "rất tối và ảm đạm",
        "distractor": true
    },
    {
        "word": "zero students",
        "vi": "không có học sinh",
        "distractor": true
    },
    {
        "word": "ashamed",
        "vi": "xấu hổ",
        "distractor": true
    }
]
    }
  }
};
