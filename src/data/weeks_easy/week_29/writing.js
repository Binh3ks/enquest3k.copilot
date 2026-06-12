export default {
  title: "The Magic Island Trip",
  image_url: null,
  min_words: 50,
  min_sentences: 6,
  instruction_en: "Write about a magic trip! Use the past tense. Where did you GO? Who did you MEET? Use: went, flew, came, ran. Try to include a pilot, doctor, farmer, or teacher!",
  instruction_vi: "Viết về một chuyến đi kỳ diệu! Dùng thì quá khứ. Bạn đã ĐI đâu? Bạn GẶP ai? Dùng: went, flew, came, ran.",
  prompt_en: "Imagine you found a magic carpet. Where did it go? Who did you meet on the way?",
  prompt_vi: "Hãy tưởng tượng bạn tìm thấy một tấm thảm kỳ diệu. Nó đã đi đâu? Bạn gặp ai trên đường đi?",
  model_sentence: "Last night I found a magic carpet. It flew me to a wonderful island. A friendly pilot came and helped me. A kind farmer gave me some mangoes. Then the carpet flew back home. It was the best trip ever!",
  keywords: ["magic carpet", "flew", "wonderful", "pilot", "farmer", "went", "came"],
  topic_talk_prompt: "What job would you like — pilot, doctor, farmer, or teacher? Why?",
  audio_model: "/audio/week29/writing_model_easy.mp3",
  sentence_frames: [
    { "template": "Last night, I ___", "answers": ["went to bed early"] },
    { "template": "On the island, I ___", "answers": ["saw a magic forest"] },
    { "template": "I met a ___", "answers": ["friendly pilot"] },
    { "template": "Before I left, ___", "answers": ["I took a photo"] },
    { "template": "When I woke up, ___", "answers": ["it was a dream"] },
    { "template": "The adventure ___", "answers": ["was wonderful"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Can tro giup? Bam ben canh moi o",
      show_by_default: true,
      scaffolding_stage: "low",
      words: [
        { "word": "magic carpet", "vi": "tham than", "distractor": false },
        { "word": "flew", "vi": "bay", "distractor": false },
        { "word": "wonderful island", "vi": "dao tuyet voi", "distractor": false },
        { "word": "sea", "vi": "bien", "distractor": false },
        { "word": "friendly pilot", "vi": "phi cong than thien", "distractor": false },
        { "word": "came", "vi": "den", "distractor": false },
        { "word": "helped me", "vi": "giup toi", "distractor": false },
        { "word": "kind farmer", "vi": "nong dan tot bung", "distractor": false },
        { "word": "gave me mangoes", "vi": "cho toi xoai", "distractor": false },
        { "word": "flew back home", "vi": "bay ve nha", "distractor": false },
        { "word": "best trip ever", "vi": "chuyen di hay nhat", "distractor": false },
        { "word": "a magic car", "vi": "xe than", "distractor": true },
        { "word": "fell down", "vi": "nga xuong", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week29/story_writing_pic.jpg',
      image_prompt: "Last night, I went to bed early and had a wonderful, crazy dream about a truly magic trip! In my dream, I sat on a beautiful flying carpet, and it flew quietly over the deep blue sea. Soon, I arrived safely at a beautiful, secret magic island. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["went to bed early","flying carpet","secret magic island","tiny purple monkey","friendly talking dolphin","brave pilot","kind doctor","hardworking farmer","giant glowing fruits","smart teacher","took a photo","wonderful adventure"],
      writing_prompts: {
        en: "Look at the picture. You went on a magic adventure! Who did you meet? What did you see on the island? Use 3+ words from the word bank to tell your adventure.",
        vi: "Nhìn bức tranh. Bạn đã đi một chuyến phiêu lưu kỳ diệu! Bạn gặp ai? Bạn thấy gì trên đảo? Dùng 3+ từ trong ngân hàng từ để kể cuộc phiêu lưu."
      },
      sentence_frames: [
        { "template": "Last night, I ___", "answers": ["went to bed early"] },
        { "template": "On the island, I ___", "answers": ["saw a magic forest"] },
        { "template": "I met a ___", "answers": ["friendly pilot"] },
        { "template": "Before I left, ___", "answers": ["I took a photo"] },
        { "template": "When I woke up, ___", "answers": ["it was a dream"] }
      ],
      min_sentences: 6,
      rubric_tier: 1
    }
  }
}