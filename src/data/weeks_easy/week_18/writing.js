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
      "template": "Welcome to the **live morning news**!",
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
      "template": "I **walk to my friend** Maya. I **ask if I can interview her**.",
      "answers": [
        "walk to my friend",
        "ask if I can interview her"
      ]
    },
    {
      "template": "Maya says she is writing a report. This is **what is happening** right now!",
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
      scaffolding_stage: "medium-low",
      words: [
        { "word": "broadcasting live", "vi": "broadcasting live", "distractor": false },
        { "word": "school courtyard", "vi": "school courtyard", "distractor": false },
        { "word": "annual Spring Festival", "vi": "annual Spring Festival", "distractor": false },
        { "word": "painting a giant mural", "vi": "painting a giant mural", "distractor": false },
        { "word": "using bright paints", "vi": "using bright paints", "distractor": false },
        { "word": "mixing mysterious liquids", "vi": "mixing mysterious liquids", "distractor": false },
        { "word": "changing color", "vi": "changing color", "distractor": false },
        { "word": "practicing for their play", "vi": "practicing for their play", "distractor": false },
        { "word": "speaking loudly", "vi": "speaking loudly", "distractor": false },
        { "word": "clapping happily", "vi": "clapping happily", "distractor": false },
        { "word": "smiling and chatting", "vi": "smiling and chatting", "distractor": false },
        { "word": "exciting activities", "vi": "exciting activities", "distractor": false },
        { "word": "playing beautiful music", "vi": "playing beautiful music", "distractor": false },
        { "word": "watching the stage", "vi": "watching the stage", "distractor": false },
        { "word": "waving colorful flags", "vi": "waving colorful flags", "distractor": false },
        { "word": "eating festival snacks", "vi": "eating festival snacks", "distractor": true },
        { "word": "wearing school uniform", "vi": "wearing school uniform", "distractor": true },
        { "word": "very proud students", "vi": "very proud students", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week18/story_writing_pic.jpg",
      image_prompt: "Students at the school festival — painting, mixing, acting.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Use simple sentences.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết những câu đơn giản."
      },
      rubric_tier: 1
    }
  }
};
