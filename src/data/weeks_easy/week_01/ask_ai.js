// WEEK 01: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I have a red bag.",
      nova_says_vi: "Cô có một cái cặp màu đỏ.",
      context_en: "Nova talks about her school bag.",
      task_en: "Ask Nova WHAT COLOR her bag is.",
      task_vi: "Hỏi cô Nova cặp của cô màu gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ is your bag?"
    },
    {
      nova_says: "My pen is here.",
      nova_says_vi: "Cái bút của cô ở đây.",
      context_en: "Nova describes her school bag.",
      task_en: "Ask Nova WHERE her pen is.",
      task_vi: "Hỏi cô Nova bút của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "Where ___ your pen?"
    },
    {
      nova_says: "This is my book.",
      nova_says_vi: "Đây là sách của cô.",
      context_en: "Nova shows her school items.",
      task_en: "Ask Nova if this is HER book.",
      task_vi: "Hỏi cô Nova đây có phải sách của cô không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ this your book?"
    },
    {
      nova_says: "I have some crayons.",
      nova_says_vi: "Cô có vài cái bút sáp.",
      context_en: "Nova shares about school.",
      task_en: "Ask Nova if you can use her crayons.",
      task_vi: "Hỏi cô Nova bạn có thể dùng bút sáp không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ I use your crayons?"
    },
    {
      nova_says: "I like my school.",
      nova_says_vi: "Cô thích trường của mình.",
      context_en: "Nova says she likes school.",
      task_en: "Ask Nova if she likes school.",
      task_vi: "Hỏi cô Nova cô có thích trường không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ you like school?"
    }
  ]
};