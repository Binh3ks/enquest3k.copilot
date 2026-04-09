export default {
  topic_talk_prompt: "Tell me about your school bag. What is inside? What colours do you see?",
  prompts: [
    // ✅ Prompt 1 - What is this? (A0 - Super Simple)
    {
      id: 1,
      context_en: "You see a pen. Ask what.",
      context_vi: "Bạn thấy cái bút. Hỏi cái gì.",
      audio_url: null,
      answer: ["What is this?", "What is it?"],
      hint: "What is..."
    },
    
    // ✅ Prompt 2 - Where is...? (A0 - Super Simple)
    {
      id: 2,
      context_en: "You want your bag. Ask where.",
      context_vi: "Bạn muốn cặp. Hỏi ở đâu.",
      audio_url: null,
      answer: ["Where is my bag?", "Where is it?"],
      hint: "Where is..."
    },
    
    // ✅ Prompt 3 - Is this...? (A0 - Super Simple)
    {
      id: 3,
      context_en: "You see a desk. Ask if big.",
      context_vi: "Bạn thấy bàn. Hỏi có to không.",
      audio_url: null,
      answer: ["Is this big?", "Is it big?"],
      hint: "Is this..."
    },
    
    // ✅ Prompt 4 - Can I...? (A0 - Super Simple)
    {
      id: 4,
      context_en: "You want to sit. Ask.",
      context_vi: "Bạn muốn ngồi. Hỏi.",
      audio_url: null,
      answer: ["Can I sit?"],
      hint: "Can I..."
    },
    
    // ✅ Prompt 5 - Do you...? (A0 - Super Simple)
    {
      id: 5,
      context_en: "Ask friend: like school?",
      context_vi: "Hỏi bạn: thích trường?",
      audio_url: null,
      answer: ["Do you like school?"],
      hint: "Do you..."
    }
  ]
};
