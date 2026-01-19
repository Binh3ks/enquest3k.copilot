export default {
  prompts: [
    // ✅ Prompt 1 - What is this? (A0)
    {
      id: 1,
      context_en: "You see something on the desk. Ask what it is.",
      context_vi: "Bạn thấy cái gì trên bàn. Hỏi nó là gì.",
      audio_url: "/audio/week2/ask_ai_1.mp3",
      answer: ["What is this?", "What is it?"],
      hint: "What is..."
    },
    
    // ✅ Prompt 2 - Where is...? (A0)
    {
      id: 2,
      context_en: "You cannot find your pen in your bag. Ask where it is.",
      context_vi: "Bạn không tìm bút trong túi của bạn. Hỏi nó ở đâu.",
      audio_url: "/audio/week2/ask_ai_2.mp3",
      answer: ["Where is it?", "Where is my pen?"],
      hint: "Where is..."
    },
    
    // ✅ Prompt 3 - Is this...? (A0)
    {
      id: 3,
      context_en: "You find a book on the desk. Ask if it is yours.",
      context_vi: "Bạn tìm sách trên bàn. Hỏi có phải của bạn.",
      audio_url: "/audio/week2/ask_ai_3.mp3",
      answer: ["Is this mine?"],
      hint: "Is this..."
    },
    
    // ✅ Prompt 4 - Can I...? (A0)
    {
      id: 4,
      context_en: "Your friends are playing a game now. Ask if you can join.",
      context_vi: "Bạn bè đang chơi trò chơi lúc này. Hỏi bạn có thể tham gia.",
      audio_url: "/audio/week2/ask_ai_4.mp3",
      answer: ["Can I play?", "Can I join?"],
      hint: "Can I..."
    },
    
    // ✅ Prompt 5 - Do you...? (A0)
    {
      id: 5,
      context_en: "Your friend comes to your home. Ask if they like games.",
      context_vi: "Bạn đến nhà bạn. Hỏi bạn ấy có thích trò chơi.",
      audio_url: "/audio/week2/ask_ai_5.mp3",
      answer: ["Do you like games?"],
      hint: "Do you..."
    }
  ]
};
