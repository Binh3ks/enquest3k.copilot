export default {
  topic_talk_prompt: "Tell me about your home. What rooms does it have? What is in your favourite room?",
  prompts: [
    {
      id: 1,
      context_en: "You want to know what room your friend sleeps in. Ask them.",
      context_vi: "Bạn muốn biết bạn của mình ngủ ở phòng nào. Hỏi họ.",
      audio_url: "/audio/week5/ask_ai_1.mp3",
      answer: ["Where do you sleep?", "What room do you sleep in?", "Which room is your bedroom?"],
      answer_audio_url: "/audio/week5/ask_ai_answer_1.mp3",
      hint: "Where do you..."
    },
    {
      id: 2,
      context_en: "You want to know what is in your friend's kitchen. Ask them.",
      context_vi: "Bạn muốn biết trong bếp của bạn mình có gì. Hỏi họ.",
      audio_url: "/audio/week5/ask_ai_2.mp3",
      answer: ["What is in your kitchen?", "What do you have in the kitchen?", "What is in the kitchen?"],
      answer_audio_url: "/audio/week5/ask_ai_answer_2.mp3",
      hint: "What is..."
    },
    {
      id: 3,
      context_en: "You see a lamp in your friend's room. Ask about it.",
      context_vi: "Bạn thấy một cái đèn trong phòng bạn của mình. Hỏi về nó.",
      audio_url: "/audio/week5/ask_ai_3.mp3",
      answer: ["What is this?", "Is this a lamp?", "What is that lamp?"],
      answer_audio_url: "/audio/week5/ask_ai_answer_3.mp3",
      hint: "What is..."
    },
    {
      id: 4,
      context_en: "You want to sit down. Ask if you can sit on the sofa.",
      context_vi: "Bạn muốn ngồi xuống. Hỏi xem bạn có thể ngồi trên ghế sofa không.",
      audio_url: "/audio/week5/ask_ai_4.mp3",
      answer: ["Can I sit on the sofa?", "Can I sit here?", "May I sit on the sofa?"],
      answer_audio_url: "/audio/week5/ask_ai_answer_4.mp3",
      hint: "Can I..."
    },
    {
      id: 5,
      context_en: "You need to use the bathroom. Ask where it is.",
      context_vi: "Bạn cần dùng phòng tắm. Hỏi nó ở đâu.",
      audio_url: "/audio/week5/ask_ai_5.mp3",
      answer: ["Where is the bathroom?", "Where is the toilet?", "Where can I find the bathroom?"],
      answer_audio_url: "/audio/week5/ask_ai_answer_5.mp3",
      hint: "Where is..."
    }
  ]
};
