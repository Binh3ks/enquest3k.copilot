// WEEK 03: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "My best friend",
      nova_says_vi: "Tên người bạn thân nhất của cô là Lily.",
      context_en: "Nova talks about her best friend.",
      task_en: "Ask Nova WHAT her best friend",
      task_vi: "Hỏi cô Nova tên người bạn thân của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your best friend"
    },
    {
      nova_says: "Lily has long curly hair.",
      nova_says_vi: "Lily có mái tóc dài xoăn.",
      context_en: "Nova describes Lily's appearance.",
      task_en: "Ask Nova WHAT Lily",
      task_vi: "Hỏi cô Nova tóc của Lily trông như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ Lily"
    },
    {
      nova_says: "We play games at school every day.",
      nova_says_vi: "Chúng tôi chơi trò chơi ở trường mỗi ngày.",
      context_en: "Nova and Lily play at school.",
      task_en: "Ask Nova WHERE they play games.",
      task_vi: "Hỏi cô Nova họ chơi trò chơi ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you and Lily play games?"
    },
    {
      nova_says: "Lily likes drawing and painting.",
      nova_says_vi: "Lily thích vẽ và tô màu.",
      context_en: "Nova shares Lily's hobbies.",
      task_en: "Ask Nova WHAT Lily likes to do.",
      task_vi: "Hỏi cô Nova Lily thích làm gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ Lily like to do?"
    },
    {
      nova_says: "I see Lily on Saturdays.",
      nova_says_vi: "Cô gặp Lily vào các ngày thứ Bảy.",
      context_en: "Nova sees Lily on weekends.",
      task_en: "Ask Nova WHEN she sees Lily.",
      task_vi: "Hỏi cô Nova cô gặp Lily khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you see Lily?"
    }
  ]
};