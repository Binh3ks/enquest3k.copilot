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
      "template": "Yesterday I woke up early and brushed my teeth.",
      "answers": [
        "woke up early",
        "brushed my teeth"
      ]
    },
    {
      "template": "I packed my bag and walked to school with my friend.",
      "answers": [
        "packed my bag",
        "walked to school"
      ]
    },
    {
      "template": "At school, I listened carefully to my teacher.",
      "answers": [
        "listened carefully"
      ]
    },
    {
      "template": "At break time, I played soccer. I shouted with excitement when we scored a goal!",
      "answers": [
        "At break time",
        "played soccer",
        "shouted with excitement"
      ]
    },
    {
      "template": "After school, I helped my mother prepare dinner. Then I cleaned my room.",
      "answers": [
        "helped my mother prepare dinner",
        "cleaned my room"
      ]
    },
    {
      "template": "In the evening, I looked at the stars and counted ten of them. Then I started to fall asleep.",
      "answers": [
        "looked at the stars",
        "counted ten",
        "started to fall asleep"
      ]
    }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "woke up early",
    "brushed my teeth",
    "packed my bag",
    "walked to school",
    "listened carefully",
    "At break time",
    "played soccer",
    "shouted with excitement",
    "helped my mother prepare dinner",
    "cleaned my room",
    "looked at the stars",
    "counted ten",
    "started to fall asleep"
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
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "Yesterday morning, I ___", "answers": ["woke up early"]},
        {"template": "At school, I ___", "answers": ["listened carefully"]},
        {"template": "In the afternoon, ___", "answers": ["I helped my mother"]},
        {"template": "Before bed, ___", "answers": ["I felt very tired"]}
      ]
    }
  }
}
