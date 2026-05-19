// WEEK 10: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "My favorite animal is a horse.",
      nova_says_vi: "Con vật yêu thích của cô là con ngựa.",
      context_en: "My favorite animal is a horse.",
      task_en: "Ask Nova WHAT her favorite animal is.",
      task_vi: "Hỏi cô Nova con vật yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your favorite animal?"
    },
    {
      nova_says: "Horses live on farms.",
      nova_says_vi: "Ngựa sống ở trang trại.",
      context_en: "Horses live on farms.",
      task_en: "Ask Nova WHERE horses live.",
      task_vi: "Hỏi cô Nova ngựa sống ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do horses live?"
    },
    {
      nova_says: "Horses eat grass and carrots.",
      nova_says_vi: "Ngựa ăn cỏ và cà rốt.",
      context_en: "Horses eat grass and carrots.",
      task_en: "Ask Nova WHAT horses eat.",
      task_vi: "Hỏi cô Nova ngựa ăn gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do horses eat?"
    },
    {
      nova_says: "Some horses are very fast runners.",
      nova_says_vi: "Một số con ngựa chạy rất nhanh.",
      context_en: "Some horses are very fast runners.",
      task_en: "Ask Nova HOW horses run.",
      task_vi: "Hỏi cô Nova ngựa chạy như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do horses run?"
    },
    {
      nova_says: "Farmers use horses to help with work.",
      nova_says_vi: "Nông dân dùng ngựa để giúp công việc.",
      context_en: "Farmers use horses to help with work.",
      task_en: "Ask Nova HOW farmers use horses.",
      task_vi: "Hỏi cô Nova nông dân dùng ngựa như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do farmers use horses?"
    }
  ]
};
