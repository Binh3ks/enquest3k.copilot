// WEEK 01: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "I have a red bag.",
      nova_says_vi: "Cô có một cái cặp màu đỏ.",
      context_en: "I have a red bag.",
      task_en: "Ask Nova WHAT her bag is.",
      task_vi: "Hỏi cô Nova cặp của cô màu gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your bag?"
    },
    {
      nova_says: "My pencil is on the table.",
      nova_says_vi: "Cái bút chì của cô ở trên bàn.",
      context_en: "My pencil is on the table.",
      task_en: "Ask Nova WHERE her pencil is.",
      task_vi: "Hỏi cô Nova bút chì của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your pencil?"
    },
    {
      nova_says: "This is my book.",
      nova_says_vi: "Đây là quyển sách của cô.",
      context_en: "This is my book.",
      task_en: "Ask Nova WHAT this is.",
      task_vi: "Hỏi cô Nova đây là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is this?"
    },
    {
      nova_says: "I have some crayons in my bag.",
      nova_says_vi: "Cô có vài cái bút sáp trong cặp.",
      context_en: "I have some crayons in my bag.",
      task_en: "Ask Nova WHAT she has in her bag.",
      task_vi: "Hỏi cô Nova cô có gì trong cặp.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does she have in her bag?"
    },
    {
      nova_says: "I like my school very much.",
      nova_says_vi: "Cô rất thích trường của mình.",
      context_en: "I like my school very much.",
      task_en: "Ask Nova WHAT she likes.",
      task_vi: "Hỏi cô Nova cô thích gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does she like?"
    }
  ]
};
