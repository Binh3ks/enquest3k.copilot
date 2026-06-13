export default {
  title: "Max's Diary - Yesterday",
  min_words: 30,
  instruction_en: "Write about what you did yesterday using past tense!",
  instruction_vi: "Viết về những gì bạn đã làm hôm qua bằng thì quá khứ!",
  model_sentence: "Yesterday I woke up early and brushed my teeth. I packed my bag and walked to school with my friend. At school, I listened carefully to my teacher. At break time, I played soccer. I shouted with excitement when we scored a goal! After school, I helped my mother prepare dinner. Then I cleaned my room. In the evening, I looked at the stars and counted ten of them. Then I started to fall asleep. What a busy day!",
  prompt_en: "What did you do in the morning? After school? In the evening?",
  prompt_vi: "Buổi sáng bạn đã làm gì? Sau trường? Tối thì sao?",
  topic_talk_prompt: "What did you do yesterday — morning, afternoon, and evening?",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "Yesterday, I woke ___ at 6:30 a.m.",
      "answers": ["up"]
    },
    {
      "template": "First, I made my bed and cleaned my ___.",
      "answers": ["room"]
    },
    {
      "template": "Then I wrote a letter to my ___.",
      "answers": ["grandmother"]
    },
    {
      "template": "I helped Dad cut the grass in the ___.",
      "answers": ["garden"]
    },
    {
      "template": "We built a ___ together.",
      "answers": ["birdhouse"]
    },
    {
      "template": "At the cafe, I chose a ___ and paid for it.",
      "answers": ["muffin"]
    },
    {
      "template": "By evening, I fell ___ early.",
      "answers": ["asleep"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "walked slowly", "vi": "đi chậm", "distractor": false },
        { "word": "talked happily", "vi": "nói chuyện vui", "distractor": false },
        { "word": "worked hard", "vi": "làm việc chăm chỉ", "distractor": false },
        { "word": "helped mother", "vi": "giúp mẹ", "distractor": false },
        { "word": "cooked dinner", "vi": "nấu bữa tối", "distractor": false },
        { "word": "cleaned table", "vi": "lau bàn", "distractor": false },
        { "word": "watched a movie", "vi": "xem phim", "distractor": false },
        { "word": "slept well", "vi": "ngủ ngon", "distractor": false },
        { "word": "woke up early", "vi": "thức dậy sớm", "distractor": false },
        { "word": "brushed teeth", "vi": "đánh răng", "distractor": false },
        { "word": "played games", "vi": "chơi trò chơi", "distractor": true },
        { "word": "ate snacks", "vi": "ăn vặt", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week21/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 21 story writing.",
      word_bank: [
        "walked slowly",
        "talked happily",
        "worked hard",
        "helped my mother",
        "cooked dinner",
        "washed vegetables",
        "cleaned the table",
        "watched a movie",
        "slept well",
        "woke up early"
      ],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "Yesterday morning, I ___", "answers": ["woke up early"]},
        {"template": "First, I ___", "answers": ["cleaned my room"]},
        {"template": "Then I ___", "answers": ["wrote a letter"]},
        {"template": "At the café, I ___", "answers": ["chose a muffin"]},
        {"template": "By evening, I ___", "answers": ["felt tired"]},
        {"template": "It was a ___", "answers": ["busy Saturday"]}
      ]
    }
  }
}
