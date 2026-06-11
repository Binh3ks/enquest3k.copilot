export default {
  title: "Writing: My Magic Trip",
  image_url: null,
  min_words: 30,
  instruction_en: "Write about a magic trip! Use the past tense. Where did you GO? Who did you MEET? Use: went, flew, came, ran. Try to include a pilot, doctor, farmer, or teacher!",
  instruction_vi: "Viết về một chuyến đi kỳ diệu! Dùng thì quá khứ. Bạn đã ĐI đâu? Bạn GẶP ai? Dùng: went, flew, came, ran.",
  prompt_en: "Imagine you found a magic carpet. Where did it go? Who did you meet on the way?",
  prompt_vi: "Hãy tưởng tượng bạn tìm thấy một tấm thảm kỳ diệu. Nó đã đi đâu? Bạn gặp ai trên đường đi?",
  model_sentence: "Last night I found a magic carpet. It flew me to a wonderful island. A friendly pilot came and helped me. A kind farmer gave me some mangoes. Then the carpet flew back home. It was the best trip ever!",
  keywords: ["magic carpet", "flew", "wonderful", "pilot", "farmer", "went", "came"],
  topic_talk_prompt: "What job would you like — pilot, doctor, farmer, or teacher? Why?",
  audio_model: "/audio/week29/writing_model_easy.mp3",
  sentence_frames: [
    {
      "template": "One night I found a ___ ___.",
      "answers": ["magic carpet"]
    },
    {
      "template": "It ___ me to a wonderful island in the ___.",
      "answers": ["flew", "sea"]
    },
    {
      "template": "A ___ ___ and helped me.",
      "answers": ["friendly pilot", "came"]
    },
    {
      "template": "A ___ ___ gave me some mangoes.",
      "answers": ["kind farmer"]
    },
    {
      "template": "Then the carpet ___ back home.",
      "answers": ["flew"]
    },
    {
      "template": "It was the best ___ ever!",
      "answers": ["trip"]
    }
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
      word_bank: ["magic carpet","flew","wonderful island","sea","friendly pilot","came","helped me","kind farmer","gave me mangoes","flew back home","best trip ever"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 2
    }
  }
}