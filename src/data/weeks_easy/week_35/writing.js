// WEEK 35: ENVIRONMENTAL ISSUES
// Writing Station — Easy Mode

export default {
  title: "Writing: How We Can Protect Our Planet",
  audio_url: null,
  min_words: 30,
  model_sentence: "Our planet Earth is very beautiful but it is in danger. The ice is melting and the sea is rising. We must protect our planet. We can plant trees and recycle more. We can use less plastic and save energy. Small actions can make a big difference!",
  instruction_en: "Write about how we can protect our planet. Use at least 3 of these words: planet, protect, recycle, trees, energy, save, plastic, pollution, climate",
  instruction_vi: "Viết về cách chúng ta có thể bảo vệ hành tinh. Dùng ít nhất 3 từ: planet, protect, recycle, trees, energy, save, plastic, pollution, climate",
  prompt_en: "Write about protecting our planet: Our planet is in danger. We must protect it. We can plant trees, recycle, and save energy.",
  prompt_vi: "Viết về bảo vệ hành tinh của chúng ta: Hành tinh của chúng ta đang gặp nguy hiểm. Chúng ta phải bảo vệ nó. Chúng ta có thể trồng cây, tái chế và tiết kiệm năng lượng.",
  keywords: ["planet", "protect", "recycle", "trees", "energy", "save", "plastic", "pollution", "climate", "ice", "sea", "danger", "act now"],
  topic_talk_prompt: "Tell me about something you do to help the environment!",
  sentence_frames: [
    {
      template: "Our planet ___ is very beautiful but it is in ___.",
      blank_labels: ["Earth", "danger"]
    },
    {
      template: "The ___ is ___ and the ___ is rising.",
      blank_labels: ["ice/polar ice", "melting", "sea/ocean"]
    },
    {
      template: "We must ___ our ___ to help the planet.",
      blank_labels: ["protect", "Earth/planet/world"]
    },
    {
      template: "We can ___ ___ and ___ more to help the environment.",
      blank_labels: ["plant trees", "recycle", "save energy"]
    },
    {
      template: "We should use less ___ and save ___ every day.",
      blank_labels: ["plastic", "water/energy"]
    },
    {
      template: "Small ___ like recycling can make a big ___.",
      blank_labels: ["actions/things", "difference"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { "word": "planet", "vi": "hành tinh", "distractor": false },
        { "word": "Earth", "vi": "Trái Đất", "distractor": false },
        { "word": "danger", "vi": "nguy hiểm", "distractor": false },
        { "word": "ice", "vi": "băng", "distractor": false },
        { "word": "melting", "vi": "tan chảy", "distractor": false },
        { "word": "sea", "vi": "biển", "distractor": false },
        { "word": "rising", "vi": "dâng cao", "distractor": false },
        { "word": "protect", "vi": "bảo vệ", "distractor": false },
        { "word": "plant", "vi": "trồng", "distractor": false },
        { "word": "trees", "vi": "cây", "distractor": false },
        { "word": "recycle", "vi": "tái chế", "distractor": false },
        { "word": "energy", "vi": "năng lượng", "distractor": false },
        { "word": "save", "vi": "tiết kiệm", "distractor": false },
        { "word": "plastic", "vi": "nhựa", "distractor": false },
        { "word": "pollution", "vi": "ô nhiễm", "distractor": false },
        { "word": "act now", "vi": "hành động ngay", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week35/story_writing_pic.jpg",
      image_prompt: "Learning to do things carefully.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Use simple sentences.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết những câu đơn giản."
      },
      rubric_tier: 1
    }
  }
};
