export default {
  title: "The Mirror Game",
  min_words: 30,
  model_sentence: "I look in the mirror every day. I see my round face. I have two brown eyes. I have long brown hair. My hair is straight. I am not very tall yet. I am short for my age. My friend wears glasses to read. Her hair is curly and very long. We are good friends and we look different from each other.",
  instruction_en: "Describe your appearance and your friend's appearance!",
  instruction_vi: "Mô tả ngoại hình của bạn và bạn của bạn!",
  prompt_en: "What do you look like? What about your friend? Are you the same or different?",
  prompt_vi: "Bạn trông thế nào? Còn bạn của bạn thì sao? Các bạn giống hay khác nhau?",
  keywords: ["look in the mirror", "every day", "round face", "two brown eyes", "long brown hair", "straight", "not very tall", "short for my age", "wears glasses", "curly", "good friends", "different from each other"],
  topic_talk_prompt: "Describe what you and your friend look like!",
  sentence_frames: [
    {
      "template": "I ___ in the mirror every day.",
      "answers": ["look"]
    },
    {
      "template": "I see my ___ face.",
      "answers": ["round"]
    },
    {
      "template": "I have two ___ eyes.",
      "answers": ["brown"]
    },
    {
      "template": "I have long ___ hair.",
      "answers": ["brown"]
    },
    {
      "template": "I am not very tall ___. I am short.",
      "answers": ["yet"]
    },
    {
      "template": "My friend ___ glasses to read.",
      "answers": ["wears"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { "word": "look", "vi": "nhìn", "distractor": false },
        { "word": "every day", "vi": "mỗi ngày", "distractor": false },
        { "word": "round", "vi": "tròn", "distractor": false },
        { "word": "brown", "vi": "nâu", "distractor": false },
        { "word": "long brown", "vi": "dài nâu", "distractor": false },
        { "word": "tall", "vi": "cao", "distractor": false },
        { "word": "wears glasses", "vi": "đeo kính", "distractor": false },
        { "word": "short", "vi": "thấp", "distractor": true },
        { "word": "blonde", "vi": "vàng", "distractor": true },
        { "word": "tiny", "vi": "rất nhỏ", "distractor": true }
      ]
    }
  }
};
