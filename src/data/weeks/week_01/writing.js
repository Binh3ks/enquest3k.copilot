export default {
  title: "Hello, World!",
  min_words: 45,
  model_sentence: "My name is Alex and I am eight years old. I am a new student at Greenwood Elementary School. Every morning, I wake up early and get ready for school. My backpack is heavy because I carry my story book and small notebook every day. My teacher, Ms. Johnson, is very kind and patient. She teaches us English, Math, and Science. I love learning new things and studying every day. I want to become a young scientist when I grow up.",
  instruction_en: "Write about yourself and your school in full sentences!",
  instruction_vi: "Viết về bản thân và trường học bằng câu đầy đủ!",
  prompt_en: "What is your name and age? What is your school like? What do you carry in your bag? What do you want to become?",
  prompt_vi: "Tên và tuổi bạn là gì? Trường của bạn thế nào? Bạn mang gì trong cặp? Bạn muốn trở thành gì?",
  keywords: ["new student", "Greenwood Elementary", "wake up early", "get ready", "story book", "small notebook", "very kind and patient", "English", "Math", "Science", "learning new things", "studying every day", "young scientist"],
  topic_talk_prompt: "Tell me about yourself and your school!",
  sentence_frames: [
    {
      "template": "My name is ___ and I am ___ years old.",
      "answers": ["Alex", "eight"]
    },
    {
      "template": "I am a ___ at ___ School.",
      "answers": ["new student", "Greenwood Elementary"]
    },
    {
      "template": "Every morning, I ___ and ___ for school.",
      "answers": ["wake up early", "get ready"]
    },
    {
      "template": "My teacher is ___ and she is ___.",
      "answers": ["Ms. Johnson", "very kind and patient"]
    },
    {
      "template": "She teaches us ___, ___, and ___.",
      "answers": ["English", "Math", "Science"]
    },
    {
      "template": "My backpack is heavy because I carry my ___ and ___ every day.",
      "answers": ["story book", "small notebook"]
    },
    {
      "template": "I love ___ and ___ every day.",
      "answers": ["learning new things", "studying"]
    },
    {
      "template": "I want to become a ___ when I grow up.",
      "answers": ["young scientist"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "Alex", "vi": "", "distractor": false },
        { "word": "eight", "vi": "tám", "distractor": false },
        { "word": "new student", "vi": "học sinh mới", "distractor": false },
        { "word": "Greenwood Elementary", "vi": "", "distractor": false },
        { "word": "wake up early", "vi": "thức dậy sớm", "distractor": false },
        { "word": "get ready", "vi": "chuẩn bị sẵn sàng", "distractor": false },
        { "word": "Ms. Johnson", "vi": "", "distractor": false },
        { "word": "very kind and patient", "vi": "rất tốt bụng và kiên nhẫn", "distractor": false },
        { "word": "English", "vi": "tiếng Anh", "distractor": false },
        { "word": "Math", "vi": "Toán", "distractor": false },
        { "word": "Science", "vi": "Khoa học", "distractor": false },
        { "word": "story book", "vi": "sách truyện", "distractor": false },
        { "word": "small notebook", "vi": "quyển vở nhỏ", "distractor": false },
        { "word": "learning new things", "vi": "học những điều mới", "distractor": false },
        { "word": "studying", "vi": "học tập", "distractor": false },
        { "word": "young scientist", "vi": "nhà khoa học trẻ", "distractor": false },
        { "word": "very strict", "vi": "rất nghiêm khắc", "distractor": true },
        { "word": "sleeping late", "vi": "ngủ muộn", "distractor": true },
        { "word": "bored and tired", "vi": "chán và mệt", "distractor": true }
      ]
    }
  }
};
