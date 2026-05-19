// WEEK 01: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I have a red bag.",
      nova_says_vi: "Cô có một cái cặp màu đỏ.",
      context_en: "Nova talks about her school bag.",
      task_en: "Ask Nova what color HER bag is.",
      task_vi: "Hỏi cô Nova cặp của cô màu gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ is your bag?"
    },
    {
      nova_says: "My pencil is on the table.",
      nova_says_vi: "Cái bút chì của cô ở trên bàn.",
      context_en: "Nova describes her school bag.",
      task_en: "Ask Nova WHERE her pencil is.",
      task_vi: "Hỏi cô Nova bút chì của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "Where ___ your pencil?"
    },
    {
      nova_says: "This is my book.",
      nova_says_vi: "Đây là quyển sách của cô.",
      context_en: "Nova shows her school items.",
      task_en: "Ask Nova if this is HER book.",
      task_vi: "Hỏi cô Nova đây có phải sách của cô không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ this your book?"
    },
    {
      nova_says: "I have some crayons in my bag.",
      nova_says_vi: "Cô có vài cái bút sáp trong cặp.",
      context_en: "Nova shares about school.",
      task_en: "Ask Nova if you can use her crayons.",
      task_vi: "Hỏi cô Nova bạn có thể dùng bút sáp của cô không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ I use your crayons?"
    },
    {
      nova_says: "I like my school very much.",
      nova_says_vi: "Cô rất thích trường của mình.",
      context_en: "Nova says she likes school.",
      task_en: "Ask Nova if she likes school.",
      task_vi: "Hỏi cô Nova cô có thích trường không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ you like school?"
    }
  ]
};