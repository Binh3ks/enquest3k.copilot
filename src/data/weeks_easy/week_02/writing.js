export default {
  title: "My Family Squad",
  min_words: 30,
  model_sentence: "This is my family. My lovely mother is kind. She makes food for us every day. My funny father is strong. He plays with me in the park. My big brother helps me with homework. My little sister is funny. She draws pictures for me. We love each other. We work together as a great team. Our home is full of happiness.",
  instruction_en: "Write about your family!",
  instruction_vi: "Viết về gia đình của bạn!",
  prompt_en: "Who is in your family? What does each person do? What are they like?",
  prompt_vi: "Ai trong gia đình bạn? Mỗi người làm gì? Họ thế nào?",
  keywords: ["lovely mother", "kind", "makes food", "every day", "funny father", "strong", "plays with me", "in the park", "big brother", "helps me with", "homework", "little sister", "draws pictures", "each other", "work together"],
  topic_talk_prompt: "Tell me about your family!",
  sentence_frames: [
    {
      "template": "This is my ___. She is ___.",
      "answers": ["mother", "kind"]
    },
    {
      "template": "She ___ for us ___.",
      "answers": ["makes food", "every day"]
    },
    {
      "template": "This is my ___. He is ___.",
      "answers": ["father", "strong"]
    },
    {
      "template": "He ___ with me ___ the park.",
      "answers": ["plays", "in"]
    },
    {
      "template": "My ___ ___ helps me with ___.",
      "answers": ["big brother", "helps", "homework"]
    },
    {
      "template": "We ___ each other and ___ together.",
      "answers": ["love", "work"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { "word": "mother", "vi": "mẹ", "distractor": false },
        { "word": "kind", "vi": "tốt bụng", "distractor": false },
        { "word": "makes food", "vi": "nấu ăn", "distractor": false },
        { "word": "every day", "vi": "mỗi ngày", "distractor": false },
        { "word": "father", "vi": "bố", "distractor": false },
        { "word": "strong", "vi": "mạnh mẽ", "distractor": false },
        { "word": "plays with me", "vi": "chơi với tôi", "distractor": false },
        { "word": "in the park", "vi": "trong công viên", "distractor": false },
        { "word": "big brother", "vi": "anh trai", "distractor": false },
        { "word": "helps", "vi": "giúp đỡ", "distractor": false },
        { "word": "homework", "vi": "bài tập", "distractor": false },
        { "word": "love", "vi": "yêu thương", "distractor": false },
        { "word": "work", "vi": "làm việc", "distractor": false },
        { "word": "mean", "vi": "xấu tính", "distractor": true },
        { "word": "weak", "vi": "yếu", "distractor": true },
        { "word": "ignores me", "vi": "phớt lờ tôi", "distractor": true }
      ]
    }
  }
};
