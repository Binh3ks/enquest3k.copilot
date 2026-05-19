// WEEK 02: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I have a brother and a sister.",
      nova_says_vi: "Cô có một anh trai và một chị gái.",
      context_en: "Nova introduces her family.",
      task_en: "Ask Nova HOW MANY brothers she has.",
      task_vi: "Hỏi cô Nova cô có bao nhiêu anh trai.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How many ___ do you have?"
    },
    {
      nova_says: "My mum works at a hospital.",
      nova_says_vi: "Mẹ của cô làm việc ở bệnh viện.",
      context_en: "Nova describes her mother.",
      task_en: "Ask Nova WHERE her mum works.",
      task_vi: "Hỏi cô Nova mẹ của cô làm việc ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "Where ___ your mum work?"
    },
    {
      nova_says: "My dad loves cooking.",
      nova_says_vi: "Ba của cô rất thích nấu ăn.",
      context_en: "Nova talks about her father.",
      task_en: "Ask Nova WHAT her dad loves to do.",
      task_vi: "Hỏi cô Nova ba của cô thích làm gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your dad love?"
    },
    {
      nova_says: "My grandma is very kind.",
      nova_says_vi: "Bà của cô rất tốt bụng.",
      context_en: "Nova describes her grandma.",
      task_en: "Ask Nova if her grandma lives with her.",
      task_vi: "Hỏi cô Nova bà của cô có sống cùng cô không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ your grandma live with you?"
    },
    {
      nova_says: "We eat dinner together every night.",
      nova_says_vi: "Chúng tôi ăn tối cùng nhau mỗi đêm.",
      context_en: "Nova talks about family dinner.",
      task_en: "Ask Nova WHEN her family eats dinner.",
      task_vi: "Hỏi cô Nova gia đình cô ăn tối khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does your family eat dinner?"
    }
  ]
};