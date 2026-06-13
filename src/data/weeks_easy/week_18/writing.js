export default {
  title: "The Live Reporter",
  min_words: 30,
  instruction_en: "Write a live news report from your classroom!",
  instruction_vi: "Viết bản tin trực tiếp từ lớp học của bạn!",
  prompt_en: "What is everyone doing in your classroom right now?",
  prompt_vi: "Mỗi người trong lớp đang làm gì lúc này?",
  topic_talk_prompt: "Report the news from your classroom!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "Welcome to the school ___!",
      "answers": ["festival"]
    },
    {
      "template": "I am the ___. I pick up the microphone.",
      "answers": ["reporter"]
    },
    {
      "template": "Students are painting a giant ___ on the wall.",
      "answers": ["mural"]
    },
    {
      "template": "The Science Club is mixing two ___ liquids.",
      "answers": ["mysterious"]
    },
    {
      "template": "The Drama Club is practicing for their ___.",
      "answers": ["play"]
    },
    {
      "template": "Everyone is smiling and chatting ___.",
      "answers": ["happily"]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "live morning news",
    "reporter",
    "drawing",
    "reading quietly",
    "walk to my friend",
    "ask if I can interview her",
    "what is happening"
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "Spring Festival", "vi": "lễ hội mùa xuân", "distractor": false },
        { "word": "painting pictures", "vi": "vẽ tranh", "distractor": false },
        { "word": "bright paints", "vi": "sơn tươi sáng", "distractor": false },
        { "word": "mixing colors", "vi": "pha màu", "distractor": false },
        { "word": "changing color", "vi": "đổi màu", "distractor": false },
        { "word": "practicing play", "vi": "tập kịch", "distractor": false },
        { "word": "speaking loudly", "vi": "nói to", "distractor": false },
        { "word": "clapping hands", "vi": "vỗ tay", "distractor": false },
        { "word": "smiling happy", "vi": "cười vui", "distractor": false },
        { "word": "playing music", "vi": "chơi nhạc", "distractor": false },
        { "word": "eating snacks", "vi": "ăn vặt", "distractor": true },
        { "word": "wearing uniforms", "vi": "mặc đồng phục", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week18/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 18 story writing.",
      word_bank: [
        "Spring Festival",
        "painting pictures",
        "bright colors",
        "mixing liquids",
        "changing color",
        "speaking loudly",
        "clapping hands",
        "exciting activities",
        "playing music",
        "smiling happily"
      ],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "At the festival, ___", "answers": ["students are painting"]},
        {"template": "The reporter is ___", "answers": ["broadcasting live"]},
        {"template": "On stage, ___", "answers": ["students are singing"]},
        {"template": "The audience is ___", "answers": ["clapping happily"]},
        {"template": "At the science corner, ___", "answers": ["students are mixing colors"]},
        {"template": "Everyone feels ___", "answers": ["excited and happy"]}
      ]
    }
  }
}
