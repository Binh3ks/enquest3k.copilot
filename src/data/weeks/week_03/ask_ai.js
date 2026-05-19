export default {
    prompts: [
    {
      id: 1,
      nova_says: "My best friend's name is Lily.",
      nova_says_vi: "Tên người bạn thân nhất của cô là Lily.",
      task_en: "Ask Nova WHAT her best friend's name is.",
      task_vi: "Hỏi cô Nova tên người bạn thân của cô là gì.",

      context_en: "Nova sees Lily on Saturdays.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
            question_frame: "What ___ your best friend's name?",
      answer: ["What is your best friend's name?","What's your best friend's name?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "Lily has long curly hair.",
      nova_says_vi: "Lily có mái tóc dài xoăn.",
      task_en: "Ask Nova WHAT Lily's hair looks like.",
      task_vi: "Hỏi cô Nova tóc của Lily trông như thế nào.",
      question_frame: "What ___ Lily's hair look like?",
      answer: ["What does Lily's hair look like?"],
      hint: "does",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "We play games at school every day.",
      nova_says_vi: "Chúng tôi chơi trò chơi ở trường mỗi ngày.",
      task_en: "Ask Nova WHERE they play games.",
      task_vi: "Hỏi cô Nova họ chơi trò chơi ở đâu.",
      question_frame: "___ do you and Lily play games?",
      answer: ["Where do you and Lily play games?","Where do you play games?"],
      hint: "Where",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "Lily likes drawing and painting.",
      nova_says_vi: "Lily thích vẽ và tô màu.",
      task_en: "Ask Nova WHAT Lily likes to do.",
      task_vi: "Hỏi cô Nova Lily thích làm gì.",
      question_frame: "What ___ Lily like to do?",
      answer: ["What does Lily like to do?"],
      hint: "does",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I see Lily on Saturdays.",
      nova_says_vi: "Cô gặp Lily vào các ngày thứ Bảy.",
      task_en: "Ask Nova WHEN she sees Lily.",
      task_vi: "Hỏi cô Nova cô gặp Lily khi nào.",
      question_frame: "___ do you see Lily?",
      answer: ["When do you see Lily?"],
      hint: "When",
      audio_url: null
    }
  ]
};
