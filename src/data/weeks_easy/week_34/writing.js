// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Writing Station — Easy Mode

export default {
  title: "Writing: The Ant and the Grasshopper Story",
  audio_url: null,
  min_words: 30,
  model_sentence: "Once upon a time there was an ant and a grasshopper. The ant worked hard and gathered seeds every day. The grasshopper only played and sang songs. When winter came, the grasshopper was cold and hungry. The kind ant gave the grasshopper some food. They learned: always prepare for the future!",
  instruction_en: "Write about the ant and the grasshopper story. Use at least 3 of these words: ant, grasshopper, worked, gathered, seeds, winter, cold, hungry, shared, lesson",
  instruction_vi: "Viết về câu chuyện con kiến và con châu chấu. Dùng ít nhất 3 từ: ant, grasshopper, worked, gathered, seeds, winter, cold, hungry, shared, lesson",
  prompt_en: "Write about the ant and the grasshopper: The ant worked hard and gathered seeds. The grasshopper only played. When winter came, the grasshopper was cold and hungry.",
  prompt_vi: "Viết về con kiến và châu chấu: Con kiến làm việc chăm chỉ và nhặt hạt. Con châu chấu chỉ chơi. Khi mùa đông đến, châu chấu lạnh và đói.",
  keywords: ["ant", "grasshopper", "worked", "gathered", "seeds", "winter", "cold", "hungry", "shared", "lesson", "summer", "food"],
  topic_talk_prompt: "Tell me about a time when you helped a friend or a friend helped you!",
  sentence_frames: [
    {
      template: "Once upon a time there was an ___ and a ___.",
      blank_labels: ["ant", "grasshopper"]
    },
    {
      template: "The ant ___ hard every day and ___ seeds.",
      blank_labels: ["worked", "gathered"]
    },
    {
      template: "The grasshopper only ___ and ___ songs all summer.",
      blank_labels: ["played", "sang"]
    },
    {
      template: "When ___ came, the grasshopper was very ___ and ___.",
      blank_labels: ["winter", "cold", "hungry"]
    },
    {
      template: "The ___ ant ___ the grasshopper some food.",
      blank_labels: ["kind", "gave", "shared"]
    },
    {
      template: "They learned a ___: always ___ ___ ___.",
      blank_labels: ["lesson", "prepare", "for the future"]
    },
    {
      template: "Now the ant and the grasshopper ___ ___ together every day.",
      blank_labels: ["work", "hard"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { "word": "ant", "vi": "con kiến", "distractor": false },
        { "word": "grasshopper", "vi": "con châu chấu", "distractor": false },
        { "word": "worked", "vi": "làm việc", "distractor": false },
        { "word": "gathered", "vi": "nhặt", "distractor": false },
        { "word": "seeds", "vi": "hạt", "distractor": false },
        { "word": "winter", "vi": "mùa đông", "distractor": false },
        { "word": "cold", "vi": "lạnh", "distractor": false },
        { "word": "hungry", "vi": "đói", "distractor": false },
        { "word": "kind", "vi": "tốt bụng", "distractor": false },
        { "word": "gave", "vi": "cho", "distractor": false },
        { "word": "shared", "vi": "chia sẻ", "distractor": false },
        { "word": "lesson", "vi": "bài học", "distractor": false },
        { "word": "prepare", "vi": "chuẩn bị", "distractor": false },
        { "word": "future", "vi": "tương lai", "distractor": false },
        { "word": "summer", "vi": "mùa hè", "distractor": true },
        { "word": "played", "vi": "chơi", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week34/story_writing_pic.jpg",
      image_prompt: "The Three Little Pigs story.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Use simple sentences.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết những câu đơn giản."
      },
      rubric_tier: 1
    }
  }
};
