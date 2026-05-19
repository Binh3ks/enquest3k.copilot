// WEEK 07: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "I have five books in my bag.",
      nova_says_vi: "Cô có năm cuốn sách trong cặp.",
      context_en: "I have five books in my bag.",
      task_en: "Ask Nova HOW MANY books she has.",
      task_vi: "Hỏi cô Nova cô có bao nhiêu sách.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ books do you have?",
      correctWord: "HOW"
    },
    {
      nova_says: "My favorite color pencil is blue.",
      nova_says_vi: "Bút chì màu yêu thích của cô là màu xanh.",
      context_en: "My favorite color pencil is blue.",
      task_en: "Ask Nova WHAT her favorite color is.",
      task_vi: "Hỏi cô Nova màu yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your favorite color?",
      correctWord: "WHAT"
    },
    {
      nova_says: "I don't have scissors in my bag today.",
      nova_says_vi: "Hôm nay cô không có kéo trong cặp.",
      context_en: "I don't have scissors in my bag today.",
      task_en: "Ask Nova WHAT she doesn't have.",
      task_vi: "Hỏi cô Nova cô không có gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you not have today?",
      correctWord: "WHAT"
    },
    {
      nova_says: "I use a ruler to draw straight lines.",
      nova_says_vi: "Cô dùng thước để vẽ đường thẳng.",
      context_en: "I use a ruler to draw straight lines.",
      task_en: "Ask Nova WHAT she uses to draw.",
      task_vi: "Hỏi cô Nova cô dùng gì để vẽ.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you use to draw?",
      correctWord: "WHAT"
    },
    {
      nova_says: "I put my homework in my bag every morning.",
      nova_says_vi: "Mỗi sáng tôi bỏ bài tập vào cặp.",
      context_en: "I put my homework in my bag every morning.",
      task_en: "Ask Nova WHERE she puts her homework.",
      task_vi: "Hỏi cô Nova cô bỏ bài tập ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you put your homework?",
      correctWord: "WHERE"
    }
  ]
};
