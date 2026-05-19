// WEEK 03: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "My best friend's name is Lily.",
      nova_says_vi: "Tên người bạn thân nhất của cô là Lily.",
      context_en: "My best friend's name is Lily.",
      task_en: "Ask Nova WHAT her best friend's name is.",
      task_vi: "Hỏi cô Nova tên bạn thân của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your best friend's name?"
    },
    {
      nova_says: "Lily has long curly hair.",
      nova_says_vi: "Lily có mái tóc dài xoăn.",
      context_en: "Lily has long curly hair.",
      task_en: "Ask Nova WHAT Lily looks like.",
      task_vi: "Hỏi cô Nova Lily trông như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does Lily look like?"
    },
    {
      nova_says: "We play games at school every day.",
      nova_says_vi: "Chúng tôi chơi trò chơi ở trường mỗi ngày.",
      context_en: "We play games at school every day.",
      task_en: "Ask Nova WHERE you play games.",
      task_vi: "Hỏi cô Nova họ chơi trò chơi ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you play games?"
    },
    {
      nova_says: "Lily likes drawing and painting.",
      nova_says_vi: "Lily thích vẽ và tô màu.",
      context_en: "Lily likes drawing and painting.",
      task_en: "Ask Nova WHAT Lily likes to do.",
      task_vi: "Hỏi cô Nova Lily thích làm gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does Lily like to do?"
    },
    {
      nova_says: "I see Lily on Saturdays.",
      nova_says_vi: "Cô gặp Lily vào các ngày thứ Bảy.",
      context_en: "I see Lily on Saturdays.",
      task_en: "Ask Nova WHEN she sees Lily.",
      task_vi: "Hỏi cô Nova cô gặp Lily khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you see Lily?"
    }
  ]
};
