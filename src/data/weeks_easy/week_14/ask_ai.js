// WEEK 14: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "My name is Nova and I am from Hanoi.",
      nova_says_vi: "Tên tôi là Nova và tôi đến từ Hà Nội.",
      context_en: "My name is Nova and I am from Hanoi.",
      task_en: "Ask Nova WHERE she is from.",
      task_vi: "Hỏi cô Nova cô đến từ đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ are you from?",
      correctWord: "WHERE"
    },
    {
      nova_says: "I am a teacher and I love my job.",
      nova_says_vi: "Tôi là một giáo viên và tôi yêu công việc của mình.",
      context_en: "I am a teacher and I love my job.",
      task_en: "Ask Nova WHAT she is.",
      task_vi: "Hỏi cô Nova cô làm nghề gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ are you?",
      correctWord: "WHAT"
    },
    {
      nova_says: "I like reading books in my free time.",
      nova_says_vi: "Tôi thích đọc sách trong thời gian rảnh.",
      context_en: "I like reading books in my free time.",
      task_en: "Ask Nova WHAT she likes to do.",
      task_vi: "Hỏi cô Nova cô thích làm gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you like to do in your free time?",
      correctWord: "WHAT"
    },
    {
      nova_says: "I have lived in this city for five years.",
      nova_says_vi: "Tôi đã sống ở thành phố này năm năm.",
      context_en: "I have lived in this city for five years.",
      task_en: "Ask Nova HOW LONG she has lived here.",
      task_vi: "Hỏi cô Nova cô sống ở đây bao lâu rồi.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ have you lived here?",
      correctWord: "HOW"
    },
    {
      nova_says: "I have one cat and two dogs at home.",
      nova_says_vi: "Tôi có một con mèo và hai con chó ở nhà.",
      context_en: "I have one cat and two dogs at home.",
      task_en: "Ask Nova WHAT pets she has.",
      task_vi: "Hỏi cô Nova cô có những thú cưng gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ pets do you have?",
      correctWord: "WHAT"
    }
  ]
};
