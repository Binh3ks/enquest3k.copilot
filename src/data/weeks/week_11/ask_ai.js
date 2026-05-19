// WEEK 11: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "My favorite weekend place is the beach.",
      nova_says_vi: "Nơi yêu thích vào cuối tuần của cô là bãi biển.",
      context_en: "My favorite weekend place is the beach.",
      task_en: "Ask Nova WHAT her favorite weekend place is.",
      task_vi: "Hỏi cô Nova nơi yêu thích của cô vào cuối tuần là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your favorite weekend place?"
    },
    {
      nova_says: "I go to the beach every Saturday.",
      nova_says_vi: "Cô đi bãi biển vào thứ Bảy hàng tuần.",
      context_en: "I go to the beach every Saturday.",
      task_en: "Ask Nova WHEN she goes to the beach.",
      task_vi: "Hỏi cô Nova cô đi bãi biển khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you go to the beach?"
    },
    {
      nova_says: "I usually swim and build sandcastles there.",
      nova_says_vi: "Cô thường bơi và xâng lâu đài cát ở đó.",
      context_en: "I usually swim and build sandcastles there.",
      task_en: "Ask Nova WHAT she does at the beach.",
      task_vi: "Hỏi cô Nova cô làm gì ở bãi biển.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you do at the beach?"
    },
    {
      nova_says: "I go to the beach with my family.",
      nova_says_vi: "Cô đi bãi biển với gia đình.",
      context_en: "I go to the beach with my family.",
      task_en: "Ask Nova WHO she goes to the beach with.",
      task_vi: "Hỏi cô Nova cô đi bãi biển với ai.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you go to the beach with?"
    },
    {
      nova_says: "The beach near my house is very clean.",
      nova_says_vi: "Bãi biển gần nhà tôi rất sạch sẽ.",
      context_en: "The beach near my house is very clean.",
      task_en: "Ask Nova WHAT the beach is like.",
      task_vi: "Hỏi cô Nova bãi biển như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is the beach near your house?"
    }
  ]
};
