// WEEK 07: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I have five books in my bag.",
      nova_says_vi: "Cô có năm quyển sách trong cặp.",
      context_en: "Nova talks about her school bag.",
      task_en: "Ask Nova HOW MANY books she has in her bag.",
      task_vi: "Hỏi cô Nova cô có bao nhiêu sách trong cặp.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ books do you have?"
    },
    {
      nova_says: "My favorite color pencil is blue.",
      nova_says_vi: "Màu bút chì yêu thích của cô là màu xanh.",
      context_en: "Nova describes her color pencil.",
      task_en: "Ask Nova WHAT her favorite color pencil is.",
      task_vi: "Hỏi cô Nova bút chì màu yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your favorite color pencil?"
    },
    {
      nova_says: "I don",
      nova_says_vi: "Hôm nay cô không có kéo trong cặp.",
      context_en: "Nova doesn't have scissors.",
      task_en: "Ask Nova if she has scissors in her bag.",
      task_vi: "Hỏi cô Nova cô có kéo trong cặp không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ you have scissors in your bag?"
    },
    {
      nova_says: "I use a ruler to draw straight lines.",
      nova_says_vi: "Cô dùng thước kẻ để vẽ đường thẳng.",
      context_en: "Nova uses a ruler.",
      task_en: "Ask Nova WHY she uses a ruler.",
      task_vi: "Hỏi cô Nova tại sao cô dùng thước kẻ.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you use a ruler?"
    },
    {
      nova_says: "I put my homework in my bag every morning.",
      nova_says_vi: "Cô bỏ bài tập vào cặp mỗi sáng.",
      context_en: "Nova puts homework in her bag.",
      task_en: "Ask Nova WHEN she puts her homework in her bag.",
      task_vi: "Hỏi cô Nova cô bỏ bài tập vào cặp khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you put your homework in your bag?"
    }
  ]
};