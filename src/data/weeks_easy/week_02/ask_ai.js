export default {
  prompts: [
    // ✅ Prompt 1 - What is this? (A0)
    {
      id: 1,
      context_en: "You see a pen. Ask what it is.",
      context_vi: "Bạn thấy cái bút. Hỏi nó là gì.",
      audio_url: "/audio/week2_easy/ask_ai_1.mp3",
      answer: ["What is this?", "What is it?"],
      hint: "What is..."
    },
    
    // ✅ Prompt 2 - Where is...? (A0)
    {
      id: 2,
      context_en: "You cannot find your book. Ask where it is.",
      context_vi: "Bạn không tìm thấy sách. Hỏi nó ở đâu.",
      audio_url: "/audio/week2_easy/ask_ai_2.mp3",
      answer: ["Where is it?", "Where is my book?"],
      hint: "Where is..."
    },
    
    // ✅ Prompt 3 - Is this...? (A0)
    {
      id: 3,
      context_en: "You find a toy. Ask if it is yours.",
      context_vi: "Bạn tìm thấy đồ chơi. Hỏi có phải của bạn.",
      audio_url: "/audio/week2_easy/ask_ai_3.mp3",
      answer: ["Is this mine?"],
      hint: "Is this..."
    },
    
    // ✅ Prompt 4 - Can I...? (A0)
    {
      id: 4,
      context_en: "Your friends are playing. Ask if you can play.",
      context_vi: "Bạn bè đang chơi. Hỏi bạn có thể chơi không.",
      audio_url: "/audio/week2_easy/ask_ai_4.mp3",
      answer: ["Can I play?"],
      hint: "Can I..."
    },
    
    // ✅ Prompt 5 - Do you...? (A0)
    {
      id: 5,
      context_en: "Your friend is here. Ask if they like toys.",
      context_vi: "Bạn ở đây. Hỏi bạn ấy có thích đồ chơi.",
      audio_url: "/audio/week2_easy/ask_ai_5.mp3",
      answer: ["Do you like toys?"],
      hint: "Do you..."
    }
  ]
};
