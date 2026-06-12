export default {
  title: "The Colourful Market",
  min_words: 50,
  min_sentences: 6,
  model_sentence: "Last Sunday my mum and I went to the market. The stalls were full of fresh fruit, colorful cloth, paper bags, glass bottles and shiny metal pots. I saw oranges and bright red apples. I heard sellers calling and the coins jingling on the wooden table. I smelt warm bread and spicy food from the next stall. I felt the smooth cotton scarf and the cold metal tray. I bought a sweet mango and carried it home in a paper bag. The market was noisy and exciting.",
  instruction_en: "Write about a visit to the market using saw, heard, felt, and smelt. Mention at least TWO materials words such as cotton, metal, paper, glass, stone, or wood.",
  instruction_vi: "Viết về chuyến đi chợ dùng saw, heard, felt, smelt. Dùng ít nhất HAI từ vật liệu như cotton, metal, paper, glass, stone hoặc wood.",
  prompt_en: "What did you see, hear, smell, and feel at the market? Which market materials did you notice?",
  prompt_vi: "Bạn thấy, nghe, ngửi và cảm nhận gì ở chợ? Bạn nhận thấy vật liệu nào ở chợ?",
  keywords: ["market", "fruit", "cloth", "paper", "glass", "metal", "cotton", "seller", "heard", "saw", "felt", "smelt", "busy", "spicy", "bread"],
  topic_talk_prompt: "Describe a busy market using your senses and materials words.",
  sentence_frames: [
    { "template": "At the market, I ___", "answers": ["saw many stalls"] },
    { "template": "I saw ___", "answers": ["fresh fruit"] },
    { "template": "I heard ___", "answers": ["sellers calling"] },
    { "template": "I felt ___", "answers": ["soft cotton"] },
    { "template": "I smelt ___", "answers": ["warm bread"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {"word": "market", "vi": "chợ", "distractor": false},
        {"word": "mum", "vi": "mẹ", "distractor": false},
        {"word": "fruit", "vi": "trái cây", "distractor": false},
        {"word": "cloth", "vi": "vải", "distractor": false},
        {"word": "rice", "vi": "cơm", "distractor": false},
        {"word": "coins", "vi": "đồng xu", "distractor": false},
        {"word": "wooden", "vi": "bằng gỗ", "distractor": false},
        {"word": "bread", "vi": "bánh mì", "distractor": false},
        {"word": "ginger", "vi": "gừng", "distractor": false},
        {"word": "cotton", "vi": "cotton", "distractor": false},
        {"word": "metal", "vi": "kim loại", "distractor": false},
        {"word": "mango", "vi": "xoài", "distractor": false},
        {"word": "paper", "vi": "giấy", "distractor": false},
        {"word": "busy", "vi": "bận rộn", "distractor": false},
        {"word": "colorful", "vi": "nhiều màu", "distractor": false},
        {"word": "exciting", "vi": "hào hứng", "distractor": false},
        {"word": "amazing", "vi": "tuyệt vời", "distractor": true},
        {"word": "come back", "vi": "trở lại", "distractor": true},
        {"word": "forest", "vi": "khu rừng", "distractor": true},
        {"word": "animal", "vi": "động vật", "distractor": true}
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week31/story_writing_pic.jpg',
      image_prompt: "Yesterday morning, I woke up very early and went to the busy old market with my mother to buy some special gifts for our family. It was an incredibly colourful and noisy place, and I used all my senses to explore everything around me! First, I looked around the big shops and saw beautiful traditional clothes made of soft cotton, and shiny winter shoes made of strong leather. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["busy old market","traditional clothes","made of soft cotton","strong leather","loud cheerful voices","friendly sellers","heavy cooking pot","made of metal","smooth stone sculpture","cheap bright toys","plastic and glass","juicy red apple"],
      writing_prompts: {
        en: "Look at the picture. You visited a busy market! What did you see and hear? What did you touch? Use 3+ words from the word bank to describe your visit.",
        vi: "Nhìn bức tranh. Bạn đi một khu chợ đông đúc! Bạn thấy và nghe gì? Bạn chạm vào gì? Dùng 3+ từ trong ngân hàng từ để mô tả chuyến đi."
      },
      sentence_frames: [
        { "template": "At the market, I ___", "answers": ["saw many stalls"] },
        { "template": "I saw ___", "answers": ["fresh fruit"] },
        { "template": "I heard ___", "answers": ["sellers calling"] },
        { "template": "I felt ___", "answers": ["soft cotton"] },
        { "template": "I smelt ___", "answers": ["warm bread"] }
      ],
      min_sentences: 6,
      rubric_tier: 1
    }
  }
}