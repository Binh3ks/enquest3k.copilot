// WEEK 11: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "My favorite weekend place is the beach.",
      nova_says_vi: "Nơi yêu thích của cô vào cuối tuần là bãi biển.",
      context_en: "Nova describes her favorite place.",
      task_en: "Ask Nova WHAT her favorite weekend place is.",
      task_vi: "Hỏi cô Nova nơi yêu thích của cô vào cuối tuần là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your favorite weekend place?"
    },
    {
      nova_says: "I go to the beach every Saturday.",
      nova_says_vi: "Cô đi biển mỗi thứ Bảy.",
      context_en: "Nova goes to the beach.",
      task_en: "Ask Nova HOW OFTEN she goes to the beach.",
      task_vi: "Hỏi cô Nova cô đi biển bao lâu một lần.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ do you go to the beach?"
    },
    {
      nova_says: "I usually swim and build sandcastles there.",
      nova_says_vi: "Cô thường bơi và xây lâu đài cát ở đó.",
      context_en: "Nova describes beach activities.",
      task_en: "Ask Nova WHAT she usually does at the beach.",
      task_vi: "Hỏi cô Nova cô thường làm gì ở biển.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ you usually do at the beach?"
    },
    {
      nova_says: "I go to the beach with my family.",
      nova_says_vi: "Cô đi biển với gia đình.",
      context_en: "Nova goes to the beach with family.",
      task_en: "Ask Nova WHO she goes to the beach with.",
      task_vi: "Hỏi cô Nova cô đi biển với ai.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you go to the beach with?"
    },
    {
      nova_says: "The beach near my house is very clean.",
      nova_says_vi: "Bãi biển gần nhà cô rất sạch sẽ.",
      context_en: "Nova describes the beach.",
      task_en: "Ask Nova HOW the beach near her house is.",
      task_vi: "Hỏi cô Nova bãi biển gần nhà cô như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is the beach near your house?"
    }
  ]
};