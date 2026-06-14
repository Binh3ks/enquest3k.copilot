export default {
  title: "My Happy Jar",
  min_words: 45,
  model_sentence: "My name is Sam. I have a happy jar at home. Every day, I put happy things in my jar. When I am playing with my dog, I feel excited. I put a yellow star in my jar. When I am reading a good book, I feel calm and happy. I put a blue heart in my jar. When I am drawing colorful pictures, I feel creative. My mom is friendly and funny. She makes me laugh every day. I love my happy jar because it helps me remember all the happy moments.",
  instruction_en: "Write about your personality and hobbies using because and when!",
  instruction_vi: "Viết về tính cách và sở thích bằng because và when!",
  prompt_en: "What makes you feel happy? What do you like doing? How do you feel?",
  prompt_vi: "Điều gì làm bạn hạnh phúc? Bạn thích làm gì? Bạn cảm thấy thế nào?",
  keywords: ["happy jar", "every day", "playing with my dog", "feel excited", "reading a good book", "feel calm", "drawing colorful pictures", "feel creative", "friendly and funny", "makes me laugh", "remember happy moments"],
  topic_talk_prompt: "Tell me about your personality and what you love doing!",
  sentence_frames: [
    {
      "template": "I have a happy jar at ___.",
      "answers": ["home"]
    },
    {
      "template": "When I am playing, I feel ___ and happy.",
      "answers": ["excited"]
    },
    {
      "template": "When I am reading, I feel ___ and calm.",
      "answers": ["happy"]
    },
    {
      "template": "When I am drawing, I feel ___ and joyful.",
      "answers": ["creative"]
    },
    {
      "template": "My mom is friendly and funny and she makes me laugh ___.",
      "answers": ["every day"]
    },
    {
      "template": "My happy jar helps me remember all the ___ moments.",
      "answers": ["happy"]
    },
    {
      "template": "Every day I put something new in my jar because I want to ___ good times.",
      "answers": ["remember"]
    },
    {
      "template": "I love my ___ jar because it makes me feel grateful.",
      "answers": ["happy"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "happy jar", "vi": "chiếc hũ hạnh phúc", "distractor": false },
        { "word": "playing with my dog", "vi": "chơi với chó", "distractor": false },
        { "word": "excited", "vi": "hào hứng", "distractor": false },
        { "word": "reading a good book", "vi": "đọc sách hay", "distractor": false },
        { "word": "calm", "vi": "bình tĩnh", "distractor": false },
        { "word": "drawing colorful pictures", "vi": "vẽ tranh nhiều màu", "distractor": false },
        { "word": "creative", "vi": "sáng tạo", "distractor": false },
        { "word": "friendly and funny", "vi": "thân thiện và vui tính", "distractor": false },
        { "word": "makes me laugh", "vi": "khiến tôi cười", "distractor": false },
        { "word": "remember", "vi": "nhớ", "distractor": false },
        { "word": "happy moments", "vi": "khoảnh khắc hạnh phúc", "distractor": false },
        { "word": "remember good times", "vi": "nhớ lại những khoảnh khắc tốt", "distractor": false },
        { "word": "grateful", "vi": "biết ơn", "distractor": false },
        { "word": "staying home alone", "vi": "ở nhà một mình", "distractor": true },
        { "word": "bored and lazy", "vi": "chán và lười", "distractor": true },
        { "word": "sad and lonely", "vi": "buồn và cô đơn", "distractor": true }
      ]
    }
  }
};
