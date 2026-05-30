export default {
  title: "Finding the Treasure",
  min_words: 30,
  model_sentence: "Today I play a game. I look for my toy car. I look on the floor. It is not there! I look in the box. No toy! My friend helps me. He looks under the desk. He finds it! The toy car is under the desk! Now I look for my ball. It is next to the door. Now we play hide and seek. I hide my ball in the box. My friend hides his toy next to the window. We seek them again. This game is so much fun!",
  instruction_en: "Write about your treasure hunt and hiding games!",
  instruction_vi: "Viết về cuộc săn kho báu và trò chơi giấu đồ của bạn!",
  prompt_en: "Where do you look? Where do you find things? What game do you play?",
  prompt_vi: "Bạn tìm ở đâu? Bạn tìm thấy ở đâu? Bạn chơi trò chơi gì?",
  keywords: ["look for", "toy car", "look on the floor", "look in the box", "friend helps", "look under the desk", "find it", "next to the door", "hide and seek", "hide my ball", "in the box", "next to the window", "seek them again", "much fun"],
  topic_talk_prompt: "Tell me about your treasure hunt and hiding games!",
  sentence_frames: [
    {
      "template": "I ___ for my toy car.",
      "answers": ["look"]
    },
    {
      "template": "I look ___ the floor. I look ___ the box.",
      "answers": ["on", "in"]
    },
    {
      "template": "My friend ___ me. He looks ___ the desk.",
      "answers": ["helps", "under"]
    },
    {
      "template": "He finds it! The toy car is ___ the desk!",
      "answers": ["under"]
    },
    {
      "template": "Now I look for my ball. It is ___ ___ the door.",
      "answers": ["next to"]
    },
    {
      "template": "We play ___. I hide my ball in the ___. My friend hides his toy ___ the window.",
      "answers": ["hide and seek", "box", "next to"]
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
        { "word": "on", "vi": "trên", "distractor": false },
        { "word": "in", "vi": "trong", "distractor": false },
        { "word": "helps", "vi": "giúp", "distractor": false },
        { "word": "under", "vi": "dưới", "distractor": false },
        { "word": "next to", "vi": "bên cạnh", "distractor": false },
        { "word": "hide and seek", "vi": "trốn tìm", "distractor": false },
        { "word": "box", "vi": "hộp", "distractor": false },
        { "word": "gives", "vi": "đưa", "distractor": true },
        { "word": "above", "vi": "phía trên xa", "distractor": true },
        { "word": "lose", "vi": "đánh mất", "distractor": true }
      ]
    }
  }
};
