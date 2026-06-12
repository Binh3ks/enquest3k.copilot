export default {
  title: "Writing: Tom's Very Busy Saturday",
  audio_url: null,
  min_words: 65,
  min_sentences: 8,
  model_sentence: "Last Saturday, I woke up early and had a very busy day. First, I made my bed and kept my room tidy. Then I wrote a letter to my grandmother and did all my homework. In the afternoon, I helped Dad cut the grass and we built a birdhouse together. At the café, I chose my own lunch and paid for it myself. By evening, I put everything away and fell asleep very quickly — it was my best Saturday ever!",
  instruction_en: "Write about a busy Saturday using at least 5 task verbs (woke, made, did, wrote, cut, built, put, kept, chose, or paid)!",
  instruction_vi: "Viết về một ngày thứ Bảy bận rộn, sử dụng ít nhất 5 động từ công việc (woke, made, did, wrote, cut, built, put, kept, chose, hoặc paid)!",
  prompt_en: "What did you do on a busy Saturday? Use: woke, made, did, wrote, cut, built, put, kept, chose, paid",
  prompt_vi: "Bạn đã làm gì vào một ngày thứ Bảy bận rộn? Dùng: woke, made, did, wrote, cut, built, put, kept, chose, paid",
  keywords: ["woke", "made", "did", "wrote", "cut", "built", "put", "kept", "chose", "paid", "tidy", "birdhouse", "letter", "café", "early", "asleep"],
  topic_talk_prompt: "Tell me about your busiest Saturday — what did you make, do, write, or build? Did you wake up early? Did you choose something special?",
  sentence_frames: [
    { template: "Last Saturday, I woke up ___ and made ___." },
    { template: "First, I did ___ and wrote ___ to ___." },
    { template: "Then I cut ___ and put ___ away." },
    { template: "I kept my room ___ by ___." },
    { template: "My mum/dad and I built ___ together." },
    { template: "I chose ___ because ___." },
    { template: "At the café, I paid for ___ with my ___." },
    { template: "By evening, I put ___ away and fell asleep ___." },
    { template: "I felt ___ because I ___." }
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
        {"word": "morning", "vi": "buổi sáng", "distractor": true},
        {"word": "homework", "vi": "bài tập về nhà", "distractor": true}
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week32/story_writing_pic.jpg',
      image_prompt: "My grandmother is a very active, healthy, and independent woman, and she had an incredibly busy Saturday last weekend. Early in the morning, she woke up at five o'clock, opened all her windows, and completely tidied her big, messy bedroom until it was perfectly clean. Then, she put on her old leather boots, went out to the large garden, and cut the long green grass near the wooden fence. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["woke","made","did","wrote","cut","built","put","kept","chose","paid"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 2
    }
  }
}