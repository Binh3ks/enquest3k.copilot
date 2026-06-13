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
      "template": "Welcome to the live morning news!",
      "answers": [
        "live morning news"
      ]
    },
    {
      "template": "I am the ___. I pick up the microphone.",
      "answers": [
        "reporter"
      ]
    },
    {
      "template": "Tom is ___ a rocket.",
      "answers": [
        "drawing"
      ]
    },
    {
      "template": "Sara is ___ at her desk.",
      "answers": [
        "reading quietly"
      ]
    },
    {
      "template": "I walk to my friend Maya. I ask if I can interview her.",
      "answers": [
        "walk to my friend",
        "ask if I can interview her"
      ]
    },
    {
      "template": "Maya says she is writing a report. This is what is happening right now!",
      "answers": [
        "what is happening"
      ]
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
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "At the Art Club, ___", "answers": ["students are painting"]},
        {"template": "At the Science Club, ___", "answers": ["a girl mixes liquids"]},
        {"template": "At the Drama Club, ___", "answers": ["students are acting"]},
        {"template": "Everywhere I look, ___", "answers": ["people are smiling"]}
      ]
    }
  }
}
