// WEEK 10: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "My favorite animal is a horse.",
      nova_says_vi: "Con vật yêu thích của cô là con ngựa.",
      context_en: "Nova talks about horses.",
      task_en: "Ask Nova WHAT her favorite animal is.",
      task_vi: "Hỏi cô Nova con vật yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your favorite animal?"
    },
    {
      nova_says: "Horses live on farms.",
      nova_says_vi: "Ngựa sống ở trang trại.",
      context_en: "Nova describes where horses live.",
      task_en: "Ask Nova WHERE horses live.",
      task_vi: "Hỏi cô Nova ngựa sống ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do horses live?"
    },
    {
      nova_says: "Horses eat grass and carrots.",
      nova_says_vi: "Ngựa ăn cỏ và cà rốt.",
      context_en: "Nova talks about horse diet.",
      task_en: "Ask Nova WHAT horses eat.",
      task_vi: "Hỏi cô Nova ngựa ăn gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ horses eat?"
    },
    {
      nova_says: "Some horses are very fast runners.",
      nova_says_vi: "Một số con ngựa chạy rất nhanh.",
      context_en: "Nova describes horse speed.",
      task_en: "Ask Nova HOW FAST horses can run.",
      task_vi: "Hỏi cô Nova ngựa có thể chạy nhanh thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ can horses run?"
    },
    {
      nova_says: "Farmers use horses to help with work.",
      nova_says_vi: "Nông dân dùng ngựa để giúp công việc.",
      context_en: "Nova explains how farmers use horses.",
      task_en: "Ask Nova WHY farmers use horses.",
      task_vi: "Hỏi cô Nova tại sao nông dân dùng ngựa.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do farmers use horses?"
    }
  ]
};