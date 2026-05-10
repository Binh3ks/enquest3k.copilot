export default {
  title: "The Time Detective Interview",
  min_words: 45,
  model_sentence: "Yesterday I pretended to be a time detective and I interviewed my friend about everything she did the day before. I had a clipboard and a pencil and I asked her questions in a very serious voice. Did you walk to school or did you come by bus? Did you talk to your teacher? Did you finish all your homework last night? My friend laughed at first but then she answered every question carefully and honestly. She said she walked to school, talked to three teachers, and finished her maths but not her reading. I wrote down all her answers in my detective notebook and then I made my official report: my friend had a normal but productive day, and the time detective was satisfied with the evidence.",
  instruction_en: "Write a time detective interview in full using past tense questions and answers!",
  instruction_vi: "Vi\u1ebft cu\u1ed9c ph\u1ecfng v\u1ea5n th\u00e1m t\u1eed th\u1eddi gian \u0111\u1ea7y \u0111\u1ee7 b\u1eb1ng c\u00e2u h\u1ecfi v\u00e0 tr\u1ea3 l\u1eddi qu\u00e1 kh\u1ee9!",
  prompt_en: "What did you ask? How did your friend answer? What was your official report?",
  prompt_vi: "B\u1ea1n h\u1ecfi g\u00ec? B\u1ea1n c\u1ee7a b\u1ea1n tr\u1ea3 l\u1eddi th\u1ebf n\u00e0o? B\u00e1o c\u00e1o ch\u00ednh th\u1ee9c c\u1ee7a b\u1ea1n l\u00e0 g\u00ec?",
  keywords: ["detective", "clipboard", "seriously", "honestly", "productive", "evidence", "official", "satisfied"],
  topic_talk_prompt: "Tell me about your time detective interview \u2014 what did you ask and what did you find out?",
  sentence_frames: [
    {
        "template": "I had ___ and asked my friend questions in a ___.",
        "answers": [
            "a clipboard and a pencil",
            "very serious voice"
        ]
    },
    {
        "template": "Did you ___ or did you come by bus? Did you ___ to your teacher?",
        "answers": [
            "walk to school",
            "talk"
        ]
    },
    {
        "template": "Did you ___ last night? My friend answered ___ and ___.",
        "answers": [
            "finish all your homework",
            "carefully",
            "honestly"
        ]
    },
    {
        "template": "She said she ___, talked to three teachers, and finished ___ but not ___.",
        "answers": [
            "walked to school",
            "her maths",
            "her reading"
        ]
    },
    {
        "template": "I wrote down all her answers and made my ___ report: she had a ___ but ___ day.",
        "answers": [
            "official",
            "normal",
            "productive"
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
        "word": "a clipboard and a pencil",
        "vi": "một tập kẹp giấy và bút chì",
        "distractor": false
    },
    {
        "word": "very serious voice",
        "vi": "giọng rất nghiêm túc",
        "distractor": false
    },
    {
        "word": "walk to school",
        "vi": "đi bộ đến trường",
        "distractor": false
    },
    {
        "word": "talk",
        "vi": "nói chuyện",
        "distractor": false
    },
    {
        "word": "finish all your homework",
        "vi": "hoàn thành hết bài tập về nhà",
        "distractor": false
    },
    {
        "word": "carefully",
        "vi": "cẩn thận",
        "distractor": false
    },
    {
        "word": "honestly",
        "vi": "thành thật",
        "distractor": false
    },
    {
        "word": "walked to school",
        "vi": "đã đi bộ đến trường",
        "distractor": false
    },
    {
        "word": "her maths",
        "vi": "bài toán",
        "distractor": false
    },
    {
        "word": "her reading",
        "vi": "bài đọc",
        "distractor": false
    },
    {
        "word": "official",
        "vi": "chính thức",
        "distractor": false
    },
    {
        "word": "normal",
        "vi": "bình thường",
        "distractor": false
    },
    {
        "word": "productive",
        "vi": "hiệu quả",
        "distractor": false
    },
    {
        "word": "a toy sword",
        "vi": "một thanh kiếm đồ chơi",
        "distractor": true
    },
    {
        "word": "carelessly",
        "vi": "bất cẩn",
        "distractor": true
    },
    {
        "word": "a terrible day",
        "vi": "một ngày tệ hại",
        "distractor": true
    }
]
    }
  }
};
