// WEEK 02: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "I have a brother.",
      nova_says_vi: "Cô có một anh trai.",
      context_en: "I have a brother.",
      task_en: "Ask Nova WHAT she has.",
      task_vi: "Hỏi cô Nova cô có gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does she have?",
      correctWord: "WHAT"
    },
    {
      nova_says: "My mum works at a hospital.",
      nova_says_vi: "Mẹ cô làm việc ở bệnh viện.",
      context_en: "My mum works at a hospital.",
      task_en: "Ask Nova WHERE her mum works.",
      task_vi: "Hỏi cô Nova mẹ cô làm việc ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does your mum work?",
      correctWord: "WHERE"
    },
    {
      nova_says: "My dad loves cooking.",
      nova_says_vi: "Ba cô thích nấu ăn.",
      context_en: "My dad loves cooking.",
      task_en: "Ask Nova WHAT her dad loves.",
      task_vi: "Hỏi cô Nova ba cô thích gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does your dad love?",
      correctWord: "WHAT"
    },
    {
      nova_says: "My grandma is very kind.",
      nova_says_vi: "Bà cô rất tốt bụng.",
      context_en: "My grandma is very kind.",
      task_en: "Ask Nova WHERE her grandma lives.",
      task_vi: "Hỏi cô Nova bà cô sống ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does your grandma live?",
      correctWord: "WHERE"
    },
    {
      nova_says: "We eat dinner together.",
      nova_says_vi: "Chúng tôi ăn tối cùng nhau.",
      context_en: "We eat dinner together.",
      task_en: "Ask Nova WHEN you eat dinner.",
      task_vi: "Hỏi cô Nova khi nào bạn ăn tối.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you eat dinner?",
      correctWord: "WHEN"
    }
  ]
};
