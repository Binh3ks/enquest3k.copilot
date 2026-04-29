export default {
  title: "Ask AI: My Forest Walk",
  image_url: "/images/week31/askai_cover_easy.jpg",
  audio_url: "/audio/week31/askai_main_easy.mp3",
  nova_says: "Hi! I am Nova. Let us talk about forests and senses together! I will ask you questions and you can ask me too. Use: saw, heard, felt, smelt!",
  question_starters: [
    { id: 1, starter: "What did Luna see in the forest?", audio_url: "/audio/week31/askai_q1_easy.mp3", hint_en: "Luna saw a beautiful..." },
    { id: 2, starter: "How did the grass feel?", audio_url: "/audio/week31/askai_q2_easy.mp3", hint_en: "The grass felt..." },
    { id: 3, starter: "What did Luna smell on her walk?", audio_url: "/audio/week31/askai_q3_easy.mp3", hint_en: "Luna smelt a..." }
  ],
  prompts: [
    { id: 1, context_en: "What is your favourite animal to see in nature? Why?", prompt_en: "What is your favourite animal to see in nature? Why?", prompt_vi: "Động vật yêu thích của bạn khi thấy trong thiên nhiên là gì? Tại sao?", hint_en: "My favourite animal to see is... because..." },
    { id: 2, context_en: "What is the loudest sound you have ever heard outdoors?", prompt_en: "What is the loudest sound you have ever heard outdoors?", prompt_vi: "Âm thanh to nhất bạn từng nghe ngoài trời là gì?", hint_en: "The loudest sound I heard was..." },
    { id: 3, context_en: "Describe something soft and something hard you can touch at home.", prompt_en: "Describe something soft and something hard you can touch at home.", prompt_vi: "Mô tả một thứ mềm và một thứ cứng bạn có thể chạm vào ở nhà.", hint_en: "Something soft is... Something hard is..." },
    { id: 4, context_en: "What is your favourite smell in nature?", prompt_en: "What is your favourite smell in nature?", prompt_vi: "Mùi hương yêu thích của bạn trong thiên nhiên là gì?", hint_en: "My favourite smell is..." },
    { id: 5, context_en: "Tell me about a time you felt wonder or surprise outside.", prompt_en: "Tell me about a time you felt wonder or surprise outside.", prompt_vi: "Kể cho tôi nghe về một lần bạn cảm thấy ngạc nhiên thích thú bên ngoài.", hint_en: "Once I felt wonder when I saw/heard..." }
  ]
};
