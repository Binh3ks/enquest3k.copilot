// WEEK 35: Environmental Issues
// Writing Station — Easy Mode

export default {
  title: "Writing: How We Can Protect Our Planet",
  audio_url: null,
  min_words: 80,
  model_sentence: "Our planet Earth is very beautiful. It has blue oceans, green forests, and high mountains. But our planet is in danger because of pollution. Climate change is making the Earth warmer. Polar ice is melting and sea levels are rising. We must protect our planet. We should reduce, reuse, and recycle. We can plant more trees. Small actions can make a big difference. Together, we can save our planet. We must act now!",
  instruction_en: "Write about environmental issues and what we can do to help. Use at least 4 of these words: planet, pollution, climate, recycle, renewable, solar, protect, act now!",
  instruction_vi: "Viết về các vấn đề môi trường và những gì chúng ta có thể làm để giúp. Dùng ít nhất 4 từ: planet, pollution, climate, recycle, renewable, solar, protect, act now!",
  prompt_en: "Write about how we can protect our planet. Use: planet, pollution, climate, recycle, protect, act now, solar power, renewable",
  prompt_vi: "Viết về cách chúng ta có thể bảo vệ hành tinh. Dùng: planet, pollution, climate, recycle, protect, act now, solar power, renewable",
  keywords: ["planet", "pollution", "climate", "recycle", "renewable", "solar", "protect", "act now", "melting", "sea level", "greenhouse", "energy", "trees", "clean", "environment"],
  topic_talk_prompt: "Tell me about environmental issues — what problems are there? What can we do to help? Why must we act now?",
  sentence_frames: [
    { template: "Our planet Earth is very beautiful but it is in ___." },
    { template: "Climate change is making the Earth ___" },
    { template: "We ___ protect our planet." },
    { template: "We ___ recycle paper and plastic." },
    { template: "Solar power is ___ energy." },
    { template: "We must ___ ___ to save our planet." }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Can giup? Bam ben canh moi o trong",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {"word": "planet", "vi": "hanh tinh", "distractor": false},
        {"word": "pollution", "vi": "o nhiem", "distractor": false},
        {"word": "climate", "vi": "khi hau", "distractor": false},
        {"word": "recycle", "vi": "tai che", "distractor": false},
        {"word": "renewable", "vi": "tai tao", "distractor": false},
        {"word": "solar", "vi": "mat troi", "distractor": false},
        {"word": "protect", "vi": "bao ve", "distractor": false},
        {"word": "act now", "vi": "hanh dong ngay", "distractor": false},
        {"word": "melting", "vi": "tan chay", "distractor": true},
        {"word": "sea level", "vi": "muc nuoc bien", "distractor": true},
        {"word": "warmer", "vi": "nong hon", "distractor": true},
        {"word": "green", "vi": "xanh", "distractor": true},
        {"word": "danger", "vi": "nguy hiem", "distractor": false},
        {"word": "energy", "vi": "nang luong", "distractor": true}
      ]
    }
  }
};
