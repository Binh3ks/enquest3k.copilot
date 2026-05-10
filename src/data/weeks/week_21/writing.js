export default {
  title: "My Yesterday",
  min_words: 45,
  model_sentence: "Yesterday was a wonderful and busy day, and I want to tell you about all the things I did from morning to night. In the morning, I walked to school with my best friend and we talked about our favourite books on the way. In class, I listened carefully to my teacher and opened my notebook to write down the most important ideas. After school, I helped my mum in the kitchen because she was cooking a big pot of soup and rice for dinner, and the smell made me very hungry. In the evening, I cleaned my room, watched a short programme about animals, and then looked at the bright stars from my window. Before I went to bed, I finished all my homework and wrote three sentences in my diary. I felt proud, calm, and very happy at the end of the day.",
  instruction_en: "Write about your yesterday in full detail using past tense \u2014 morning to night!",
  instruction_vi: "Vi\u1ebft v\u1ec1 h\u00f4m qua chi ti\u1ebft b\u1eb1ng th\u00ec qu\u00e1 kh\u1ee9 \u2014 t\u1eeb s\u00e1ng \u0111\u1ebfn t\u1ed1i!",
  prompt_en: "What did you do morning, afternoon, and evening? How did you feel at the end?",
  prompt_vi: "B\u1ea1n \u0111\u00e3 l\u00e0m g\u00ec s\u00e1ng, chi\u1ec1u, t\u1ed1i? Cu\u1ed1i ng\u00e0y b\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["walked", "talked", "listened", "notebook", "cleaned", "programme", "diary", "proud"],
  topic_talk_prompt: "Tell me everything you did yesterday from morning to night!",
  sentence_frames: [
    {
        "template": "In the morning, I ___ to school with my best friend and we ___ about our favourite books.",
        "answers": [
            "walked",
            "talked"
        ]
    },
    {
        "template": "In class, I ___ carefully to my teacher and ___ my notebook to write down important ideas.",
        "answers": [
            "listened",
            "opened"
        ]
    },
    {
        "template": "After school, I ___ my mum because she was ___ a big pot of soup and rice.",
        "answers": [
            "helped",
            "cooking"
        ]
    },
    {
        "template": "In the evening, I ___ my room, ___ a short programme, and then ___ at the bright stars.",
        "answers": [
            "cleaned",
            "watched",
            "looked"
        ]
    },
    {
        "template": "Before I went to bed, I ___ all my homework and ___ three sentences in my diary.",
        "answers": [
            "finished",
            "wrote"
        ]
    },
    {
        "template": "I felt ___, ___, and very ___ at the end of the day.",
        "answers": [
            "proud",
            "calm",
            "happy"
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
        "word": "walked",
        "vi": "đi bộ",
        "distractor": false
    },
    {
        "word": "talked",
        "vi": "trò chuyện",
        "distractor": false
    },
    {
        "word": "listened",
        "vi": "lắng nghe",
        "distractor": false
    },
    {
        "word": "opened",
        "vi": "mở ra",
        "distractor": false
    },
    {
        "word": "helped",
        "vi": "giúp đỡ",
        "distractor": false
    },
    {
        "word": "cooking",
        "vi": "nấu ăn",
        "distractor": false
    },
    {
        "word": "cleaned",
        "vi": "dọn dẹp",
        "distractor": false
    },
    {
        "word": "watched",
        "vi": "xem",
        "distractor": false
    },
    {
        "word": "looked",
        "vi": "nhìn",
        "distractor": false
    },
    {
        "word": "finished",
        "vi": "hoàn thành",
        "distractor": false
    },
    {
        "word": "wrote",
        "vi": "viết",
        "distractor": false
    },
    {
        "word": "proud",
        "vi": "tự hào",
        "distractor": false
    },
    {
        "word": "calm",
        "vi": "bình tĩnh",
        "distractor": false
    },
    {
        "word": "happy",
        "vi": "vui",
        "distractor": false
    },
    {
        "word": "runs",
        "vi": "chạy — sai thì",
        "distractor": true
    },
    {
        "word": "arguing",
        "vi": "tranh cãi",
        "distractor": true
    },
    {
        "word": "stressed and tired",
        "vi": "căng thẳng và mệt",
        "distractor": true
    }
]
    }
  }
};
