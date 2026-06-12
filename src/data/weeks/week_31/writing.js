export default {
  title: "My Market Visit",
  min_words: 70,
  model_sentence: "Last Sunday, I walked to the busy market with my mum. The stalls were full of fresh fruit, colorful cloth, paper bags, glass bottles, and shiny metal pots. I saw oranges, green vegetables, and bright red apples. I heard the sellers calling and the sound of coins on the wooden table. I smelt warm bread and spicy ginger near the food stall. I felt the smooth cotton scarf, the rough stone tile, and the cold metal tray. Later I bought a sweet mango and a cool lemonade. The market was noisy, exciting, and full of new smells.",
  instruction_en: "Write about a visit to the market using saw, heard, felt, and smelt. Mention at least TWO materials words such as cotton, metal, paper, glass, stone, or wood.",
  instruction_vi: "Viết về chuyến đi chợ dùng saw, heard, felt, smelt. Dùng ít nhất HAI từ vật liệu như cotton, metal, paper, glass, stone hoặc wood.",
  prompt_en: "What did you see, hear, smell, and feel at the market? Which market materials did you notice?",
  prompt_vi: "Bạn thấy, nghe, ngửi và cảm nhận gì ở chợ? Bạn nhận thấy vật liệu nào ở chợ?",
  keywords: ["market", "fruit", "cloth", "paper", "glass", "metal", "stone", "cotton", "seller", "heard", "saw", "felt", "smelt", "busy", "spicy", "bread"],
  topic_talk_prompt: "Describe a busy market using your senses and materials words.",
  sentence_frames: [
    {
      "template": "Last Sunday I went to the busy ___ with my ___.",
      "answers": ["market", "mum"]
    },
    {
      "template": "The stalls had fresh ___, colorful ___, and big bags of ___.",
      "answers": ["fruit", "cloth", "rice"]
    },
    {
      "template": "I saw a seller counting ___ on the ___ table.",
      "answers": ["coins", "wooden"]
    },
    {
      "template": "I heard people ___ and the sound of ___ in the market.",
      "answers": ["calling", "coins"]
    },
    {
      "template": "I smelt warm ___ and spicy ___ from the food stall.",
      "answers": ["bread", "ginger"]
    },
    {
      "template": "I felt the smooth ___ scarf and the rough ___ pot.",
      "answers": ["cotton", "metal"]
    },
    {
      "template": "The paper ___ were full of ___ and small ___.",
      "answers": ["bags", "fruit", "goods"]
    },
    {
      "template": "I bought a sweet ___ and a cool ___ drink.",
      "answers": ["mango", "lemonade"]
    },
    {
      "template": "The market smelled ___, looked ___, and felt ___.",
      "answers": ["busy", "colorful", "exciting"]
    },
    {
      "template": "At the end, I said the market was ___ and I wanted to ___.",
      "answers": ["amazing", "come back"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        {"word": "forest", "vi": "rừng", "distractor": false},
        {"word": "breeze", "vi": "gió nhẹ", "distractor": false},
        {"word": "butterfly", "vi": "con bướm", "distractor": false},
        {"word": "rustling", "vi": "tiếng xào xạc", "distractor": false},
        {"word": "leaf", "vi": "lá", "distractor": false},
        {"word": "bark", "vi": "vỏ cây", "distractor": false},
        {"word": "moss", "vi": "rêu", "distractor": false},
        {"word": "stone", "vi": "đá", "distractor": false},
        {"word": "roses", "vi": "hoa hồng", "distractor": false},
        {"word": "path", "vi": "lối đi", "distractor": false},
        {"word": "heard", "vi": "nghe", "distractor": false},
        {"word": "saw", "vi": "thấy", "distractor": false},
        {"word": "felt", "vi": "cảm thấy", "distractor": false},
        {"word": "smelt", "vi": "ngửi thấy", "distractor": false},
        {"word": "amazing", "vi": "tuyệt vời", "distractor": false},
        {"word": "happy", "vi": "vui", "distractor": false},
        {"word": "a tall tree", "vi": "một cây cao", "distractor": true},
        {"word": "a busy market", "vi": "một chợ đông đúc", "distractor": true}
      ]
    }
  },

  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week31/story_writing_pic.jpg",
      image_prompt: "A busy market with colourful stalls.",
      word_bank: ["forest","breeze","butterfly","rustling","leaf","bark","moss","stone","roses","path","heard","saw","felt","smelt","amazing"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? What are they doing? Use 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ."
      },
      rubric_tier: 2,
      min_sentences: 8,
      sentence_frames: [
        { "template": "First, ___" },
        { "template": "Then, ___" },
        { "template": "After that, ___" },
        { "template": "Finally, ___" }
      ]
    }
  }
}
