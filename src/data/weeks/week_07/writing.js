export default {
  title: "Inside My Backpack",
  min_words: 40,
  model_sentence: "Every morning I pack my school bag very carefully so that I do not forget anything important. In my backpack there is a notebook, a textbook, and a pencil case with coloured pencils and an eraser inside. I also carry a water bottle and a healthy snack because I get hungry between lessons. My bag is dark blue and it has a small pocket at the front for my bus card and my library card. It is quite heavy but I do not mind because I love being organised and ready for school. Being prepared makes me feel confident every day.",
  instruction_en: "Describe everything in your school bag and why you carry it!",
  instruction_vi: "M\u00f4 t\u1ea3 m\u1ecdi th\u1ee9 trong c\u1eb7p v\u00e0 t\u1ea1i sao b\u1ea1n mang ch\u00fang!",
  prompt_en: "What is in your bag? Why do you carry each item? How does being prepared make you feel?",
  prompt_vi: "C\u1eb7p c\u00f3 g\u00ec? T\u1ea1i sao mang t\u1eebng \u0111\u1ed3 v\u1eadt? Chu\u1ea9n b\u1ecb t\u1ed1t khi\u1ebfn b\u1ea1n c\u1ea3m th\u1ea5y th\u1ebf n\u00e0o?",
  keywords: ["carefully", "notebook", "textbook", "pencil case", "eraser", "organised", "confident", "prepared"],
  topic_talk_prompt: "Tell me everything that is in your school bag and why!",
  sentence_frames: [
    {
        "template": "In my backpack there is ___, ___, and ___ with ___ and an eraser inside.",
        "answers": [
            "a notebook",
            "a textbook",
            "a pencil case",
            "coloured pencils"
        ]
    },
    {
        "template": "I also carry ___ and ___ because I get hungry between lessons.",
        "answers": [
            "a water bottle",
            "a healthy snack"
        ]
    },
    {
        "template": "My bag is ___ and it has ___ for my ___ and ___.",
        "answers": [
            "dark blue",
            "a small pocket at the front",
            "bus card",
            "library card"
        ]
    },
    {
        "template": "It is quite ___ but I do not mind because I love being ___ and ready.",
        "answers": [
            "heavy",
            "organised"
        ]
    },
    {
        "template": "Being prepared makes me feel ___ every day.",
        "answers": [
            "confident"
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
        "word": "a notebook",
        "vi": "một cuốn vở",
        "distractor": false
    },
    {
        "word": "a textbook",
        "vi": "một cuốn sách giáo khoa",
        "distractor": false
    },
    {
        "word": "a pencil case",
        "vi": "hộp bút",
        "distractor": false
    },
    {
        "word": "coloured pencils",
        "vi": "bút chì màu",
        "distractor": false
    },
    {
        "word": "a water bottle",
        "vi": "bình nước",
        "distractor": false
    },
    {
        "word": "a healthy snack",
        "vi": "đồ ăn nhẹ lành mạnh",
        "distractor": false
    },
    {
        "word": "dark blue",
        "vi": "xanh đậm",
        "distractor": false
    },
    {
        "word": "a small pocket at the front",
        "vi": "túi nhỏ phía trước",
        "distractor": false
    },
    {
        "word": "bus card",
        "vi": "thẻ xe buýt",
        "distractor": false
    },
    {
        "word": "library card",
        "vi": "thẻ thư viện",
        "distractor": false
    },
    {
        "word": "heavy",
        "vi": "nặng",
        "distractor": false
    },
    {
        "word": "organised",
        "vi": "ngăn nắp",
        "distractor": false
    },
    {
        "word": "confident",
        "vi": "tự tin",
        "distractor": false
    },
    {
        "word": "a television",
        "vi": "ti vi — không phải đồ học",
        "distractor": true
    },
    {
        "word": "very light and empty",
        "vi": "rất nhẹ và trống rỗng",
        "distractor": true
    },
    {
        "word": "nervous",
        "vi": "lo lắng",
        "distractor": true
    }
]
    }
  }
};
