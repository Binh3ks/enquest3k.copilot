export default {
    prompts: [
    {
      id: 1,
      nova_says: "I have a brother.",
      nova_says_vi: "Cô có một anh trai.",
      task_en: "Ask Nova HOW MANY brothers she has.",
      task_vi: "Hỏi cô Nova cô có bao nhiêu anh trai.",

      context_en: "Nova's family eats dinner together.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
            question_frame: "How many ___ do you have?",
      answer: ["How many brothers do you have?"],
      hint: "brothers",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "My mum works at a hospital.",
      nova_says_vi: "Mẹ cô làm việc ở bệnh viện.",
      task_en: "Ask Nova WHERE her mum works.",
      task_vi: "Hỏi cô Nova mẹ cô làm việc ở đâu.",
      question_frame: "Where ___ your mum work?",
      answer: ["Where does your mum work?"],
      hint: "does",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "My dad loves cooking.",
      nova_says_vi: "Ba cô thích nấu ăn.",
      task_en: "Ask Nova WHAT her dad loves.",
      task_vi: "Hỏi cô Nova ba cô thích gì.",
      question_frame: "What ___ your dad love?",
      answer: ["What does your dad love?"],
      hint: "does",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "My grandma is very kind.",
      nova_says_vi: "Bà cô rất tốt bụng.",
      task_en: "Ask Nova if her grandma lives with her.",
      task_vi: "Hỏi cô Nova bà cô có sống cùng cô không.",
      question_frame: "___ your grandma live with you?",
      answer: ["Does your grandma live with you?"],
      hint: "Does",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "We eat dinner together.",
      nova_says_vi: "Chúng tôi ăn tối cùng nhau.",
      task_en: "Ask Nova WHEN her family eats dinner.",
      task_vi: "Hỏi cô Nova gia đình cô ăn tối khi nào.",
      question_frame: "___ does your family eat dinner?",
      answer: ["When does your family eat dinner?"],
      hint: "When",
      audio_url: null
    }
  ]
};
