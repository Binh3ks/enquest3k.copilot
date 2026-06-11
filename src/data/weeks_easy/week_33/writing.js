// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Writing Station — Easy Mode

export default {
  title: "Writing: My Accident Story",
  audio_url: null,
  min_words: 30,
  model_sentence: "Last week I was at school. I walked in the corridor and fell down. I hurt my knee. My teacher came and helped me. She put a bandage on my knee. I learned to walk carefully in the corridor!",
  instruction_en: "Write about a time when you got hurt or saw someone get hurt. Use at least 3 of these words: hurt, fell, walked, ran, teacher, corridor, knee, bandage",
  instruction_vi: "Viết về một lần bạn bị đau hoặc thấy ai đó bị đau. Dùng ít nhất 3 từ: hurt, fell, walked, ran, teacher, corridor, knee, bandage",
  prompt_en: "Write about a small accident: I walked in the corridor and fell down. I hurt my knee. My teacher helped me.",
  prompt_vi: "Viết về một tai nạn nhỏ: Tôi đi trong hành lang và ngã xuống. Tôi bị đau đầu gối. Giáo viên đã giúp tôi.",
  keywords: ["hurt", "fell", "walked", "ran", "teacher", "corridor", "knee", "bandage", "help", "carefully"],
  topic_talk_prompt: "Tell me about a time when you got hurt or saw someone get hurt!",
  sentence_frames: [
    {
      template: "Last week I ___ in the corridor and ___ down.",
      blank_labels: ["walked/ran", "fell"]
    },
    {
      template: "I ___ my ___ and it hurt a lot.",
      blank_labels: ["hurt", "knee/elbow/leg"]
    },
    {
      template: "My ___ came and ___ me right away.",
      blank_labels: ["teacher/friend", "helped"]
    },
    {
      template: "She ___ a ___ on my ___.",
      blank_labels: ["put", "bandage/plaster", "knee/arm"]
    },
    {
      template: "I learned to ___ ___ in the corridor.",
      blank_labels: ["walk carefully"]
    },
    {
      template: "Now I always ___ slowly and ___ carefully.",
      blank_labels: ["walk/go", "look/be careful"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { "word": "walked", "vi": "đi bộ", "distractor": false },
        { "word": "ran", "vi": "chạy", "distractor": false },
        { "word": "fell", "vi": "ngã", "distractor": false },
        { "word": "hurt", "vi": "bị thương/đau", "distractor": false },
        { "word": "knee", "vi": "đầu gối", "distractor": false },
        { "word": "teacher", "vi": "giáo viên", "distractor": false },
        { "word": "corridor", "vi": "hành lang", "distractor": false },
        { "word": "helped", "vi": "giúp đỡ", "distractor": false },
        { "word": "bandage", "vi": "băng", "distractor": false },
        { "word": "carefully", "vi": "cẩn thận", "distractor": false },
        { "word": "walk", "vi": "đi", "distractor": true },
        { "word": "run", "vi": "chạy", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week33/story_writing_pic.jpg',
      image_prompt: "This interesting picture shows a terrible and painful accident that happened at my school yesterday afternoon. My good friend Leo was running very fast down the main corridor because he was late for his important math class. He did not look carefully where he was going, and he completely ignored the strict school rules. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["walked","ran","fell","hurt","knee","teacher","corridor","helped","bandage","carefully"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 2
    }
  }
}