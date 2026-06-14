export default {
  title: "Inside My Backpack",
  min_words: 45,
  model_sentence: "Every morning I pack my school bag very carefully so that I do not forget anything important. In my backpack there is a notebook, a textbook, and a pencil case with colored pencils and an eraser inside. I also carry a water bottle and a healthy snack because I get hungry between lessons. My bag is dark blue and it has a small pocket at the front for my bus card and my library card. It is quite heavy but I do not mind because I love being organised and ready for school. Being prepared makes me feel confident every day.",
  instruction_en: "Describe everything in your school bag and why you carry it!",
  instruction_vi: "Mô tả mọi thứ trong cặp và tại sao bạn mang chúng!",
  prompt_en: "What is in your bag? Why do you carry each item? How does being prepared make you feel?",
  prompt_vi: "Cặp có gì? Tại sao mang từng đồ vật? Chuẩn bị tốt khiến bạn cảm thấy thế nào?",
  keywords: ["pack my school bag", "carefully", "notebook", "textbook", "pencil case", "colored pencils", "eraser", "water bottle", "healthy snack", "get hungry", "dark blue", "small pocket at the front", "bus card", "library card", "heavy", "organised", "prepared", "confident"],
  topic_talk_prompt: "Tell me everything that is in your school bag and why!",
  sentence_frames: [
    {
      "template": "In my backpack there is a notebook, a textbook, and a ___ case.",
      "answers": ["pencil"]
    },
    {
      "template": "I also carry a water bottle and a ___ because I get hungry.",
      "answers": ["snack"]
    },
    {
      "template": "My bag is dark blue and it has a ___ pocket at the front.",
      "answers": ["small"]
    },
    {
      "template": "It is quite heavy but I do not mind because I love being ___ and ready.",
      "answers": ["organised"]
    },
    {
      "template": "Being prepared makes me feel ___ every day.",
      "answers": ["confident"]
    },
    {
      "template": "I pack my bag very ___ every morning.",
      "answers": ["carefully"]
    },
    {
      "template": "I use my colored pencils to ___ and draw in class.",
      "answers": ["write"]
    },
    {
      "template": "Every afternoon I check my bag to make sure I have everything ___ for the next day.",
      "answers": ["ready"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "notebook", "vi": "vở", "distractor": false },
        { "word": "textbook", "vi": "sách giáo khoa", "distractor": false },
        { "word": "pencil case", "vi": "hộp bút", "distractor": false },
        { "word": "colored pencils", "vi": "bút chì màu", "distractor": false },
        { "word": "water bottle", "vi": "bình nước", "distractor": false },
        { "word": "healthy snack", "vi": "đồ ăn nhẹ lành mạnh", "distractor": false },
        { "word": "dark blue", "vi": "xanh đậm", "distractor": false },
        { "word": "small pocket", "vi": "túi nhỏ", "distractor": false },
        { "word": "bus card", "vi": "thẻ xe buýt", "distractor": false },
        { "word": "library card", "vi": "thẻ thư viện", "distractor": false },
        { "word": "heavy", "vi": "nặng", "distractor": false },
        { "word": "organised", "vi": "ngăn nắp", "distractor": false },
        { "word": "prepared", "vi": "chuẩn bị sẵn sàng", "distractor": false },
        { "word": "confident", "vi": "tự tin", "distractor": false },
        { "word": "very carefully", "vi": "rất cẩn thận", "distractor": false },
        { "word": "everything ready", "vi": "mọi thứ sẵn sàng", "distractor": false },
        { "word": "a television", "vi": "ti vi — không phải đồ học", "distractor": true },
        { "word": "very light and empty", "vi": "rất nhẹ và trống rỗng", "distractor": true },
        { "word": "nervous and messy", "vi": "lo lắng và bừa bộn", "distractor": true }
      ]
    }
  }
};
