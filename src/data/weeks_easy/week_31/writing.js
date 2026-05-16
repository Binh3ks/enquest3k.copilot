export default {
  title: "My Market Visit",
  min_words: 50,
  model_sentence: "Last Sunday my mum and I went to the market. The stalls were full of fresh fruit, colorful cloth, paper bags, glass bottles and shiny metal pots. I saw oranges and bright red apples. I heard sellers calling and the coins jingling on the wooden table. I smelt warm bread and spicy food from the next stall. I felt the smooth cotton scarf and the cold metal tray. I bought a sweet mango and carried it home in a paper bag. The market was noisy and exciting.",
  instruction_en: "Write about a visit to the market using saw, heard, felt, and smelt. Mention at least TWO materials words such as cotton, metal, paper, glass, stone, or wood.",
  instruction_vi: "Viết về chuyến đi chợ dùng saw, heard, felt, smelt. Dùng ít nhất HAI từ vật liệu như cotton, metal, paper, glass, stone hoặc wood.",
  prompt_en: "What did you see, hear, smell, and feel at the market? Which market materials did you notice?",
  prompt_vi: "Bạn thấy, nghe, ngửi và cảm nhận gì ở chợ? Bạn nhận thấy vật liệu nào ở chợ?",
  keywords: ["market", "fruit", "cloth", "paper", "glass", "metal", "cotton", "seller", "heard", "saw", "felt", "smelt", "busy", "spicy", "bread"],
  topic_talk_prompt: "Describe a busy market using your senses and materials words.",
  sentence_frames: [
    { "template": "Last Sunday I went to the busy ___ with my ___.", "answers": ["market", "mum"] },
    { "template": "The stalls had fresh ___, colorful ___, and big bags of ___.", "answers": ["fruit", "cloth", "rice"] },
    { "template": "I saw a seller counting ___ on the ___ table.", "answers": ["coins", "wooden"] },
    { "template": "I smelt warm ___ and spicy ___ from the food stall.", "answers": ["bread", "ginger"] },
    { "template": "I felt the smooth ___ scarf and the cold ___ pot.", "answers": ["cotton", "metal"] },
    { "template": "I bought a sweet ___ and a ___ bag.", "answers": ["mango", "paper"] },
    { "template": "The market smelled ___, looked ___ and felt ___.", "answers": ["busy", "colorful", "exciting"] },
    { "template": "At the end I said the market was ___ and I wanted to ___.", "answers": ["amazing", "come back"] }
  ]
};