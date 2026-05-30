export default {
  title: "My Family Squad",
  min_words: 45,
  model_sentence: "My name is Emma. This is my family. We are like a team! This is my mother. She is the leader of our family and she helps us every day. This is my father. He is strong and kind. He works hard for our family. This is my big brother Tom. He helps me with homework. This is my little sister Lily. She is funny and sweet. We love each other very much. Our home is full of love. We work together as a great team.",
  instruction_en: "Describe each family member in detail!",
  instruction_vi: "Mô tả từng thành viên gia đình chi tiết!",
  prompt_en: "What does each person do? What are they like? What do you do together as a family?",
  prompt_vi: "Mỗi người làm gì? Họ thế nào? Cả nhà làm gì cùng nhau?",
  keywords: ["like a team", "leader", "helps us every day", "strong and kind", "works hard", "big brother", "little sister", "funny and sweet", "love each other", "full of love", "work together"],
  topic_talk_prompt: "Tell me about each person in your family!",
  sentence_frames: [
    {
      "template": "This is my ___. She is the ___ of our family.",
      "answers": ["mother", "leader"]
    },
    {
      "template": "My mother helps us ___.",
      "answers": ["every day"]
    },
    {
      "template": "This is my ___. He is ___ and kind.",
      "answers": ["father", "strong"]
    },
    {
      "template": "He works ___ for our family.",
      "answers": ["very hard"]
    },
    {
      "template": "This is my ___ ___. His name is ___.",
      "answers": ["big brother", "Tom"]
    },
    {
      "template": "He ___ me with ___.",
      "answers": ["helps", "homework"]
    },
    {
      "template": "This is my ___ ___. She is ___ and ___.",
      "answers": ["little sister", "funny", "sweet"]
    },
    {
      "template": "We ___ each other and ___ together as a great team.",
      "answers": ["love", "work"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "mother", "vi": "mẹ", "distractor": false },
        { "word": "leader", "vi": "người lãnh đạo", "distractor": false },
        { "word": "every day", "vi": "mỗi ngày", "distractor": false },
        { "word": "father", "vi": "bố", "distractor": false },
        { "word": "strong", "vi": "mạnh mẽ", "distractor": false },
        { "word": "very hard", "vi": "rất chăm chỉ", "distractor": false },
        { "word": "big brother", "vi": "anh trai", "distractor": false },
        { "word": "Tom", "vi": "", "distractor": false },
        { "word": "helps", "vi": "giúp đỡ", "distractor": false },
        { "word": "homework", "vi": "bài tập về nhà", "distractor": false },
        { "word": "little sister", "vi": "em gái", "distractor": false },
        { "word": "funny", "vi": "vui tính", "distractor": false },
        { "word": "sweet", "vi": "dễ thương", "distractor": false },
        { "word": "love", "vi": "yêu thương", "distractor": false },
        { "word": "work", "vi": "làm việc", "distractor": false },
        { "word": "very mean", "vi": "rất xấu tính", "distractor": true },
        { "word": "never talks", "vi": "không bao giờ nói chuyện", "distractor": true },
        { "word": "ignores everyone", "vi": "phớt lờ mọi người", "distractor": true }
      ]
    }
  }
};
