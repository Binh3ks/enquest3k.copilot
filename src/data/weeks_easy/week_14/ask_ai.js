// WEEK 14: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "My name is Nova and I",
      nova_says_vi: "Tên cô là Nova và cô đến từ Anh.",
      context_en: "Nova introduces herself.",
      task_en: "Ask Nova WHERE she is from.",
      task_vi: "Hỏi cô Nova cô đến từ đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ are you from?"
    },
    {
      nova_says: "I am a teacher and I love my job.",
      nova_says_vi: "Cô là giáo viên và cô yêu công việc của mình.",
      context_en: "Nova is a teacher.",
      task_en: "Ask Nova WHAT her job is.",
      task_vi: "Hỏi cô Nova nghề nghiệp của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your job?"
    },
    {
      nova_says: "I like reading books in my free time.",
      nova_says_vi: "Cô thích đọc sách lúc rảnh.",
      context_en: "Nova reads in free time.",
      task_en: "Ask Nova WHAT she likes to do in her free time.",
      task_vi: "Hỏi cô Nova cô thích làm gì lúc rảnh.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ you like to do in your free time?"
    },
    {
      nova_says: "I have lived in this city for five years.",
      nova_says_vi: "Cô đã sống ở thành phố này được năm năm.",
      context_en: "Nova has lived in the city.",
      task_en: "Ask Nova HOW LONG she has lived in this city.",
      task_vi: "Hỏi cô Nova cô đã sống ở thành phố này bao lâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ have you lived here?"
    },
    {
      nova_says: "I have one cat and two dogs at home.",
      nova_says_vi: "Cô có một con mèo và hai con chó ở nhà.",
      context_en: "Nova has pets at home.",
      task_en: "Ask Nova HOW MANY pets she has.",
      task_vi: "Hỏi cô Nova cô có bao nhiêu thú cưng.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ pets do you have?"
    }
  ]
};