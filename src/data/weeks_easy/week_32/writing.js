export default {
  title: "Grandmother's Busy Saturday",
  audio_url: null,
  min_words: 50,
  min_sentences: 6,
  model_sentence: "Last Saturday, I woke up early and made my bed. Then I wrote a letter to my grandmother. I helped Dad cut the grass and we built a birdhouse. At the café, I chose a muffin and paid for it myself. I put all my things away in the evening. I fell asleep early because I was so tired!",
  instruction_en: "Write about your own busy Saturday using at least 4 task verbs (woke, made, did, wrote, cut, built, put, chose, or paid)!",
  instruction_vi: "Viết về ngày thứ Bảy bận rộn của bạn, sử dụng ít nhất 4 động từ công việc (woke, made, did, wrote, cut, built, put, chose, hoặc paid)!",
  prompt_en: "What did you do on a busy Saturday? Use: woke, made, did, wrote, cut, built, put, chose, paid",
  prompt_vi: "Bạn đã làm gì vào ngày thứ Bảy bận rộn? Dùng: woke, made, did, wrote, cut, built, put, chose, paid",
  keywords: ["woke", "made", "did", "wrote", "cut", "built", "put", "chose", "paid", "tidy", "birdhouse", "letter", "café", "early", "asleep"],
  topic_talk_prompt: "Tell me about your Saturday — what did you make, do, or build? Did you wake up early? What did you choose?",
  sentence_frames: [
    { "template": "Early in the morning, ___", "answers": ["I woke up early"] },
    { "template": "Then, ___", "answers": ["I made my bed"] },
    { "template": "In the afternoon, ___", "answers": ["I cut the grass"] },
    { "template": "Later, ___", "answers": ["I wrote a letter"] },
    { "template": "In the evening, ___", "answers": ["I put things away"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {"word": "woke", "vi": "thức dậy", "distractor": false},
        {"word": "made", "vi": "làm", "distractor": false},
        {"word": "did", "vi": "đã làm", "distractor": false},
        {"word": "wrote", "vi": "đã viết", "distractor": false},
        {"word": "cut", "vi": "cắt", "distractor": false},
        {"word": "built", "vi": "đã xây", "distractor": false},
        {"word": "put", "vi": "đã để", "distractor": false},
        {"word": "kept", "vi": "đã giữ", "distractor": false},
        {"word": "chose", "vi": "đã chọn", "distractor": false},
        {"word": "paid", "vi": "đã trả", "distractor": false},
        {"word": "bed", "vi": "giường", "distractor": true},
        {"word": "letter", "vi": "thư", "distractor": true},
        {"word": "birdhouse", "vi": "chuồng chim", "distractor": true},
        {"word": "cafe", "vi": "quán cà phê", "distractor": true},
        {"word": "muffin", "vi": "bánh muffin", "distractor": true},
        {"word": "early", "vi": "sớm", "distractor": true}
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week32/story_writing_pic.jpg',
      image_prompt: "My grandmother is a very active, healthy, and independent woman, and she had an incredibly busy Saturday last weekend. Early in the morning, she woke up at five o'clock, opened all her windows, and completely tidied her big, messy bedroom until it was perfectly clean. Then, she put on her old leather boots, went out to the large garden, and cut the long green grass near the wooden fence. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["completely tidied her bedroom","old leather boots","cut the long green grass","built a beautiful birdhouse","hung it on a tree","drank herbal tea","wrote a long letter","chose soft cotton fabric","make a new summer dress","very tired but satisfied"],
      writing_prompts: {
        en: "Look at the picture. Grandma had a very busy Saturday! What did she do first? What did she build? Use 3+ words from the word bank to tell her story.",
        vi: "Nhìn bức tranh. Bà có một ngày thứ Bảy rất bận rộn! Bà làm gì trước? Bà xây gì? Dùng 3+ từ trong ngân hàng từ để kể câu chuyện."
      },
      sentence_frames: [
        { "template": "Early in the morning, ___", "answers": ["she woke up early"] },
        { "template": "Then, ___", "answers": ["she made her bed"] },
        { "template": "In the afternoon, ___", "answers": ["she cut the grass"] },
        { "template": "Later, ___", "answers": ["she wrote a letter"] },
        { "template": "In the evening, ___", "answers": ["she put things away"] }
      ],
      min_sentences: 6,
      rubric_tier: 1
    }
  }
}