export default {
  prompts: [
    // ✅ Prompt 1 - What is this? (A0)
    {
      id: 1,
      context_en: "You see a bag. Ask what it is.",
      context_vi: "Bạn thấy một cái cặp. Hỏi nó là gì.",
      audio_url: null,
      answer: ["What is this?", "What is it?"],
      hint: "What is..."
    },
    
    // ✅ Prompt 2 - Where is...? (A0)
    {
      id: 2,
      context_en: "You want the pen. Ask where.",
      context_vi: "Bạn muốn cái bút. Hỏi ở đâu.",
      audio_url: null,
      answer: ["Where is the pen?", "Where is it?"],
      hint: "Where is..."
    },
    
    // ✅ Prompt 3 - Is this...? (A0)
    {
      id: 3,
      context_en: "You see a book. Ask if it is yours.",
      context_vi: "Bạn thấy một quyển sách. Hỏi có phải của bạn.",
      audio_url: null,
      answer: ["Is this my book?", "Is this mine?"],
      hint: "Is this..."
    },
    
    // ✅ Prompt 4 - Can I...? (A0)
    {
      id: 4,
      context_en: "Friends play. You want to play.",
      context_vi: "Bạn bè chơi. Bạn muốn chơi.",
      audio_url: null,
      answer: ["Can I play?"],
      hint: "Can I..."
    },
    
    // ✅ Prompt 5 - Do you...? (A0)
    {
      id: 5,
      context_en: "You like school. Ask your friend.",
      context_vi: "Bạn thích trường. Hỏi bạn mình.",
      audio_url: null,
      answer: ["Do you like school?"],
      hint: "Do you..."
    }
  ]
};
