export default {
  title: "Max's Diary - Yesterday",
  min_words: 55,
  min_sentences: 8,
  instruction_en: "Write about your yesterday in full detail using past tense — morning to night!",
  instruction_vi: "Viết về hôm qua chi tiết bằng thì quá khứ — từ sáng đến tối!",
  model_sentence: "Yesterday was a busy and beautiful day. I woke up early, brushed my teeth, and packed my bag. I walked to school with my friend Lily, and we talked all the way about our science homework. At school, I listened carefully to the teacher. At break time, I played soccer with my classmates. We shouted with excitement when our team scored a goal. After school, I helped my mother prepare dinner. Then I cleaned my room and organised my books. I washed my hands before dinner and watched my favourite TV program for thirty minutes. In the evening, I looked at the stars through my bedroom window and counted ten of them. I was very tired, so I started to fall asleep at nine o'clock. What a busy and beautiful day!",
  prompt_en: "What did you do morning, afternoon, and evening? How did you feel at the end?",
  prompt_vi: "Bạn đã làm gì sáng, chiều, tối? Cuối ngày bạn cảm thấy thế nào?",
  topic_talk_prompt: "Tell me everything you did yesterday from morning to night!",
  sentence_frames: [
    {
      "template": "Yesterday, I woke ___ at 6:30 a.m.",
      "answers": ["up"]
    },
    {
      "template": "First, I made my bed and cleaned my ___ because I wanted everything tidy.",
      "answers": ["room"]
    },
    {
      "template": "Then I wrote a letter to my ___ because I missed her very much.",
      "answers": ["grandmother"]
    },
    {
      "template": "After that, I helped Dad ___ the grass in the garden.",
      "answers": ["cut"]
    },
    {
      "template": "We built a beautiful ___ together using old wood and nails.",
      "answers": ["birdhouse"]
    },
    {
      "template": "At the cafe, I chose a chocolate muffin because I was so ___.",
      "answers": ["hungry"]
    },
    {
      "template": "I paid for the muffin with my own ___ because I am growing up!",
      "answers": ["money"]
    },
    {
      "template": "By evening, I put all my toys away and fell ___ early.",
      "answers": ["asleep"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "walked slowly", "vi": "đi chậm", "distractor": false },
        { "word": "talked happily", "vi": "nói chuyện vui vẻ", "distractor": false },
        { "word": "listened carefully", "vi": "nghe kỹ", "distractor": false },
        { "word": "worked hard", "vi": "làm việc chăm chỉ", "distractor": false },
        { "word": "helped my mother", "vi": "giúp mẹ", "distractor": false },
        { "word": "cooked dinner", "vi": "nấu bữa tối", "distractor": false },
        { "word": "washed vegetables", "vi": "rửa rau", "distractor": false },
        { "word": "cleaned the table", "vi": "lau bàn", "distractor": false },
        { "word": "played board game", "vi": "chơi trò chơi bàn", "distractor": false },
        { "word": "watched a movie", "vi": "xem phim", "distractor": false },
        { "word": "slept very well", "vi": "ngủ rất ngon", "distractor": false },
        { "word": "woke up early", "vi": "thức dậy sớm", "distractor": false },
        { "word": "brushed my teeth", "vi": "đánh răng", "distractor": false },
        { "word": "packed my bag", "vi": "dọn ba lô", "distractor": false },
        { "word": "walked to school", "vi": "đi bộ đến trường", "distractor": false },
        { "word": "ate breakfast quickly", "vi": "ăn sáng nhanh", "distractor": true },
        { "word": "did my homework", "vi": "làm bài tập về nhà", "distractor": true },
        { "word": "studied in the evening", "vi": "học buổi tối", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week21/story_writing_pic.jpg',
      image_prompt: "This is a page from my personal diary, and it is all about my day yesterday. It was a very busy but incredibly happy day for me. In the morning, I walked slowly to school with my best friend, and we talked happily about our English homework. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "best friend",
        "walked slowly",
        "talked happily",
        "listened carefully",
        "kind teacher",
        "worked hard",
        "helped my mother",
        "bright kitchen",
        "cooked dinner",
        "washed vegetables",
        "cleaned the table",
        "fun board game",
        "younger brother",
        "watched a movie",
        "slept very well"
      ],
      writing_prompts: {
        en: "Look at the picture. This is a diary page about yesterday. Describe your day from morning to night using past tense verbs like walked, listened, helped, and cooked.",
        vi: "Nhìn bức tranh. Đây là trang nhật ký về hôm qua. Hãy mô tả ngày hôm qua từ sáng đến tối dùng các động từ quá khứ như walked, listened, helped, cooked."
      },
      rubric_tier: 1,
      min_sentences: 8,
      sentence_frames: [
        {"template": "Yesterday morning, I ___", "answers": ["woke up early"]},
        {"template": "First, I ___", "answers": ["made my bed"]},
        {"template": "Then I ___", "answers": ["wrote a letter"]},
        {"template": "After that, I ___", "answers": ["helped my mother"]},
        {"template": "We ___", "answers": ["built a birdhouse"]},
        {"template": "At the café, I ___", "answers": ["chose a muffin"]},
        {"template": "I paid for ___", "answers": ["the muffin"]},
        {"template": "By evening, I ___", "answers": ["fell asleep early"]}
      ]
    }
  }
}