export default {
  title: "My Classroom",
  min_words: 30,
  model_sentence: "Today I am at school. I look around my classroom. There are desks in neat rows in my room. There are chairs too. I sit on a chair at a desk. I open my bag and take out my pencil. In my pencil case there are bright markers. The teacher writes on the board. There are words on the board! On the wall there are shelves. There are books on the shelves. We do art today. There are crayons and papers on the desks. I love my classroom!",
  instruction_en: "Write about your classroom and what you see!",
  instruction_vi: "Viết về lớp học của bạn và những gì bạn nhìn thấy!",
  prompt_en: "What is in your classroom? How many things are there? What do you do?",
  prompt_vi: "Lớp học có gì? Có bao nhiêu thứ? Bạn làm gì?",
  keywords: ["at school", "look around", "classroom", "desks in neat rows", "chairs", "sit on a chair", "at a desk", "open my bag", "take out my pencil", "bright markers", "writes on the board", "words on the board", "shelves", "books on the shelves", "do art", "crayons and papers", "love my classroom"],
  topic_talk_prompt: "What is your classroom like? What do you see?",
  sentence_frames: [
    {
      "template": "Today I am ___ school.",
      "answers": ["at"]
    },
    {
      "template": "I look ___ my classroom.",
      "answers": ["around"]
    },
    {
      "template": "There are desks in ___ rows.",
      "answers": ["neat"]
    },
    {
      "template": "I sit on a chair ___ a desk.",
      "answers": ["at"]
    },
    {
      "template": "I open my bag and ___ out my ___.",
      "answers": ["take", "pencil"]
    },
    {
      "template": "The teacher ___ on the board. There are ___ on the shelves.",
      "answers": ["writes", "books"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { "word": "at", "vi": "ở", "distractor": false },
        { "word": "school", "vi": "trường", "distractor": false },
        { "word": "around", "vi": "quanh", "distractor": false },
        { "word": "neat", "vi": "ngay ngắn", "distractor": false },
        { "word": "at", "vi": "ở", "distractor": false },
        { "word": "take", "vi": "lấy", "distractor": false },
        { "word": "pencil", "vi": "bút chì", "distractor": false },
        { "word": "writes", "vi": "viết", "distractor": false },
        { "word": "books", "vi": "sách", "distractor": false },
        { "word": "tiny", "vi": "rất nhỏ", "distractor": true },
        { "word": "zero", "vi": "không — sai số", "distractor": true },
        { "word": "hate", "vi": "ghét", "distractor": true }
      ]
    }
  }
};
