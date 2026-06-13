export default {
  title: "My Old Photo Album",
  min_words: 30,
  instruction_en: "Write about an old photo of yourself!",
  instruction_vi: "Viết về một bức ảnh cũ của bạn!",
  prompt_en: "What did you look like as a baby? What were you like?",
  prompt_vi: "Bạn trông thế nào khi còn là em bé? Bạn như thế nào?",
  topic_talk_prompt: "Describe yourself as a baby!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "I was a ___ in this photo.",
      "answers": [
        "baby"
      ]
    },
    {
      "template": "I was little! I was cute.",
      "answers": [
        "was little"
      ]
    },
    {
      "template": "My face was round and my eyes were very big.",
      "answers": [
        "was round and",
        "were very big"
      ]
    },
    {
      "template": "I was noisy. I cried many times.",
      "answers": [
        "was noisy"
      ]
    },
    {
      "template": "I was quiet and sleeping in this picture.",
      "answers": [
        "was quiet and sleeping"
      ]
    },
    {
      "template": "These photos are special memories. I keep these memories in my heart.",
      "answers": [
        "special memories",
        "keep these memories in my heart"
      ]
    }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "baby",
    "was little",
    "was round and",
    "were very big",
    "was noisy",
    "was quiet and sleeping",
    "special memories",
    "keep these memories in my heart"
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "photo album", "vi": "albums ảnh", "distractor": false },
        { "word": "living room", "vi": "phòng khách", "distractor": false },
        { "word": "looking at pictures", "vi": "xem ảnh", "distractor": false },
        { "word": "tiny baby", "vi": "em bé nhỏ", "distractor": false },
        { "word": "very cute", "vi": "rất dễ thương", "distractor": false },
        { "word": "very noisy", "vi": "rất ồn", "distractor": false },
        { "word": "brave and smart", "vi": "dũng cảm và thông minh", "distractor": false },
        { "word": "first day school", "vi": "ngày đầu đi học", "distractor": false },
        { "word": "big backpack", "vi": "ba lô to", "distractor": false },
        { "word": "shy and nervous", "vi": "nhút nhát và hồi hộp", "distractor": false },
        { "word": "watching TV", "vi": "xem TV", "distractor": true },
        { "word": "eating dinner", "vi": "ăn tối", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week19/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 19 story writing.",
      word_bank: [
        "photo album",
        "looking at pictures",
        "tiny baby",
        "very cute",
        "extremely noisy",
        "brave and smart",
        "first day of school",
        "big backpack",
        "shy and nervous",
        "funny pictures"
      ],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "In this photo, I ___", "answers": ["was a baby"]},
        {"template": "My brother ___", "answers": ["was very noisy"]},
        {"template": "On my first day, ___", "answers": ["I was so shy"]},
        {"template": "But now, I ___", "answers": ["am much taller"]}
      ]
    }
  }
}
