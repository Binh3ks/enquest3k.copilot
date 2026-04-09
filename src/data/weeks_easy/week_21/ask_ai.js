export default {
  topic_talk_prompt: "Tell me about what you did yesterday. What happened? What did you eat?",
  prompts: [
    {
      id: 1,
      context_en: "Your friend wrote in their diary: 'I walked to school.' You want to know WHERE they walked to. Ask them.",
      context_vi: "Bạn viết trong nhật ký: 'Tôi đã đi bộ đến trường.' Bạn muốn biết họ đi bộ ĐẾN ĐÂU. Hỏi họ.",
      audio_url: "/audio/week21_easy/ask_ai_1.mp3",
      answer: ["Where did you walk?", "Where did you walk to?", "Did you walk to school?"],
      hint: "Where did you..."
    },
    {
      id: 2,
      context_en: "Max says: 'I cooked something yesterday.' You want to know WHAT he cooked. Ask him.",
      context_vi: "Max nói: 'Hôm qua tôi đã nấu gì đó.' Bạn muốn biết anh ấy đã nấu GÌ. Hỏi anh ấy.",
      audio_url: "/audio/week21_easy/ask_ai_2.mp3",
      answer: ["What did you cook?", "What did you make?"],
      hint: "What did you..."
    },
    {
      id: 3,
      context_en: "Your sister says she played a game yesterday. You want to know WHO she played with. Ask her.",
      context_vi: "Chị bạn nói chị đã chơi trò chơi hôm qua. Bạn muốn biết chị đã chơi VỚI AI. Hỏi chị.",
      audio_url: "/audio/week21_easy/ask_ai_3.mp3",
      answer: ["Who did you play with?", "Who was playing with you?"],
      hint: "Who did you..."
    },
    {
      id: 4,
      context_en: "Your friend says they watched something last night. You want to know WHAT they watched. Ask them.",
      context_vi: "Bạn của bạn nói họ đã xem gì đó tối qua. Bạn muốn biết họ đã xem GÌ. Hỏi họ.",
      audio_url: "/audio/week21_easy/ask_ai_4.mp3",
      answer: ["What did you watch?", "What did you watch last night?"],
      hint: "What did you..."
    },
    {
      id: 5,
      context_en: "You see Max write in a diary. You want to know WHY he writes in a diary. Ask him.",
      context_vi: "Bạn thấy Max viết nhật ký. Bạn muốn biết TẠI SAO anh ấy viết nhật ký. Hỏi anh ấy.",
      audio_url: "/audio/week21_easy/ask_ai_5.mp3",
      answer: ["Why do you write a diary?", "Why are you writing a diary?", "Why did you write that?"],
      hint: "Why do you..."
    }
  ]
};
