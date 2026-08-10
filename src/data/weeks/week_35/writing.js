// WEEK 35: ENVIRONMENTAL ISSUES & CLIMATE PROTECTION
// Writing Station — Advanced Mode

export default {
  title: "Protecting Our Planet — Environmental Action",
  theme: "environment",
  min_words: 65,
  min_sentences: 8,
  model_sentence: "Our planet Earth is remarkably beautiful, but it faces serious environmental dangers today. Polar ice caps are melting rapidly in high temperatures, and global sea levels are rising across oceans. We must act now to protect our home planet. Communities around the world are planting new trees and recycling waste more effectively. Every day, families reduce single-use plastic and conserve energy at home. Small, mindful actions combined together can create a powerful difference for future generations!",
  topic_talk_prompt: "Tell me about what we can do to protect the environment and combat climate change!",
  instruction_en: "Write about protecting our planet using environmental action words!",
  instruction_vi: "Viết về bảo vệ hành tinh bằng các từ chỉ hành động môi trường!",
  prompt_en: "Why is our planet in danger? What actions can we take to protect nature and save energy?",
  prompt_vi: "Tại sao hành tinh của chúng ta đang gặp nguy hiểm? Chúng ta có thể làm gì để bảo vệ thiên nhiên và tiết kiệm năng lượng?",
  keywords: ["planet Earth", "environmental dangers", "melting rapidly", "sea levels rising", "protect our planet", "planting trees", "recycling waste", "reduce plastic", "conserve energy", "powerful difference"],
  sentence_frames: [
    { "template": "Our home planet Earth faces serious ___ today.", "answers": ["environmental dangers"] },
    { "template": "Polar ice caps are ___ rapidly in high temperatures.", "answers": ["melting"] },
    { "template": "Global sea levels are ___ across oceans.", "answers": ["rising"] },
    { "template": "We must act now to ___ our home planet.", "answers": ["protect"] },
    { "template": "Communities around the world are ___ new trees.", "answers": ["planting"] },
    { "template": "Families reduce single-use ___ and conserve energy.", "answers": ["plastic"] },
    { "template": "Recycling waste more ___ helps clean our rivers.", "answers": ["effectively"] },
    { "template": "Small mindful actions create a powerful ___ for Earth.", "answers": ["difference"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "environmental dangers", "vi": "mối nguy hại môi trường", "distractor": false },
        { "word": "melting", "vi": "tan chảy", "distractor": false },
        { "word": "rising", "vi": "dâng cao", "distractor": false },
        { "word": "protect", "vi": "bảo vệ", "distractor": false },
        { "word": "planting", "vi": "trồng", "distractor": false },
        { "word": "plastic", "vi": "nhựa", "distractor": false },
        { "word": "effectively", "vi": "hiệu quả", "distractor": false },
        { "word": "difference", "vi": "sự khác biệt", "distractor": false },
        { "word": "melted", "vi": "đã tan chảy", "distractor": true },
        { "word": "rose", "vi": "đã dâng cao", "distractor": true },
        { "word": "destroying", "vi": "tàn phá", "distractor": true },
        { "word": "pollution", "vi": "ô nhiễm", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week35/story_writing_pic.jpg",
      image_prompt: "A vivid watercolor illustration of children planting green trees and recycling plastic bottles under a bright blue sky, surrounded by melting ice and lush green nature.",
      word_bank: [
        "environmental dangers",
        "melting rapidly",
        "sea levels rising",
        "protect our planet",
        "planting new trees",
        "recycling waste",
        "reduce single-use plastic",
        "conserve energy",
        "powerful difference",
        "future generations"
      ],
      writing_prompts: {
        en: "Look at the picture and describe how children are protecting the planet. Use 3+ environmental action phrases.",
        vi: "Nhìn bức tranh và mô tả cách các bạn nhỏ bảo vệ hành tinh. Dùng 3+ cụm từ hành động môi trường."
      },
      rubric_tier: 1,
      min_words: 65,
      min_sentences: 8,
      sentence_frames: [
        { "template": "Our home planet faces ___", "answers": ["serious dangers"] },
        { "template": "The polar ice is ___", "answers": ["melting fast"] },
        { "template": "Sea levels are ___", "answers": ["rising high"] },
        { "template": "Children are ___", "answers": ["planting trees"] },
        { "template": "They recycle plastic ___", "answers": ["every day"] },
        { "template": "We must save ___", "answers": ["clean energy"] },
        { "template": "Small actions make a ___", "answers": ["big difference"] },
        { "template": "Together we protect ___", "answers": ["our planet Earth"] }
      ]
    }
  }
};