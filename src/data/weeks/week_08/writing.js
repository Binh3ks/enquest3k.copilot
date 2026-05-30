export default {
  title: "My Busy Classroom",
  min_words: 45,
  model_sentence: "My classroom is very bright and cheerful because the walls are covered with colorful posters and student artwork. There are exactly twenty-eight students in my class and we all sit at wooden desks arranged in four rows. On the front wall there is a large whiteboard and two interactive screens that the teacher uses every day. Along the back wall there is a tall bookshelf with over a hundred books organised by subject. Our classroom also has a reading corner with soft cushions where we can sit and read quietly during free time. I feel proud of our classroom because we all help to keep it neat and tidy.",
  instruction_en: "Describe your busy classroom with numbers, colors, and reasons!",
  instruction_vi: "Mô tả lớp học bận rộn của bạn với số đếm, màu sắc và lý do!",
  prompt_en: "What does your classroom look like? How many of each thing? Why do you feel proud?",
  prompt_vi: "Lớp học trông thế nào? Có bao nhiêu thứ mỗi loại? Tại sao bạn tự hào?",
  keywords: ["bright and cheerful", "colorful posters", "student artwork", "twenty-eight students", "wooden desks", "four rows", "large whiteboard", "two interactive screens", "tall bookshelf", "over a hundred books", "reading corner", "soft cushions", "proud", "neat and tidy"],
  topic_talk_prompt: "Give me a full detailed description of your classroom!",
  sentence_frames: [
    {
      "template": "My classroom is ___ and ___ because the walls are covered with ___ and ___.",
      "answers": ["very bright", "cheerful", "colorful posters", "student artwork"]
    },
    {
      "template": "There are exactly ___ students and we sit at ___ arranged in ___.",
      "answers": ["twenty-eight", "wooden desks", "four rows"]
    },
    {
      "template": "On the front wall there is ___ and ___ that the teacher uses every day.",
      "answers": ["a large whiteboard", "two interactive screens"]
    },
    {
      "template": "Along the back wall there is ___ with ___ organised by subject.",
      "answers": ["a tall bookshelf", "over a hundred books"]
    },
    {
      "template": "Our classroom also has a ___ with ___ where we can sit and read quietly.",
      "answers": ["reading corner", "soft cushions"]
    },
    {
      "template": "I feel ___ of our classroom because we all help to keep it ___.",
      "answers": ["proud", "neat and tidy"]
    },
    {
      "template": "The teacher uses the ___ and ___ to teach us new things every day.",
      "answers": ["whiteboard", "interactive screens"]
    },
    {
      "template": "I love coming to our classroom because it is ___ and we are a great team.",
      "answers": ["wonderful"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "very bright", "vi": "rất sáng", "distractor": false },
        { "word": "cheerful", "vi": "vui tươi", "distractor": false },
        { "word": "colorful posters", "vi": "áp phích đầy màu", "distractor": false },
        { "word": "student artwork", "vi": "tranh vẽ của học sinh", "distractor": false },
        { "word": "twenty-eight", "vi": "hai mươi tám", "distractor": false },
        { "word": "wooden desks", "vi": "bàn gỗ", "distractor": false },
        { "word": "four rows", "vi": "bốn hàng", "distractor": false },
        { "word": "a large whiteboard", "vi": "bảng trắng lớn", "distractor": false },
        { "word": "two interactive screens", "vi": "hai màn hình tương tác", "distractor": false },
        { "word": "a tall bookshelf", "vi": "kệ sách cao", "distractor": false },
        { "word": "over a hundred books", "vi": "hơn một trăm cuốn sách", "distractor": false },
        { "word": "reading corner", "vi": "góc đọc sách", "distractor": false },
        { "word": "soft cushions", "vi": "gối mềm", "distractor": false },
        { "word": "proud", "vi": "tự hào", "distractor": false },
        { "word": "neat and tidy", "vi": "gọn gàng và sạch sẽ", "distractor": false },
        { "word": "whiteboard", "vi": "bảng trắng", "distractor": false },
        { "word": "wonderful", "vi": "tuyệt vời", "distractor": false },
        { "word": "very dark and gloomy", "vi": "rất tối và ảm đạm", "distractor": true },
        { "word": "zero students", "vi": "không có học sinh", "distractor": true },
        { "word": "ashamed and messy", "vi": "xấu hổ và bừa bộn", "distractor": true }
      ]
    }
  }
};
