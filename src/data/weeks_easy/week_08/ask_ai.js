// WEEK 08: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "My classroom has a big whiteboard.",
      nova_says_vi: "Lớp học của cô có một bảng trắng lớn.",
      context_en: "My classroom has a big whiteboard.",
      task_en: "Ask Nova WHAT her classroom has.",
      task_vi: "Hỏi cô Nova lớp của cô có gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does your classroom have?"
    },
    {
      nova_says: "We have English class every Tuesday.",
      nova_says_vi: "Chúng tôi có tiết Anh vào thứ Ba hàng tuần.",
      context_en: "We have English class every Tuesday.",
      task_en: "Ask Nova WHEN they have English class.",
      task_vi: "Hỏi cô Nova khi nào có tiết Anh.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you have English class?"
    },
    {
      nova_says: "My teacher is very kind.",
      nova_says_vi: "Giáo viên của cô rất tốt.",
      context_en: "My teacher is very kind.",
      task_en: "Ask Nova WHAT her teacher is like.",
      task_vi: "Hỏi cô Nova giáo viên của cô như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your teacher like?"
    },
    {
      nova_says: "I sit at the front of the classroom.",
      nova_says_vi: "Cô ngồi ở hàng đầu của lớp.",
      context_en: "I sit at the front of the classroom.",
      task_en: "Ask Nova WHERE she sits.",
      task_vi: "Hỏi cô Nova cô ngồi ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you sit in the classroom?"
    },
    {
      nova_says: "We sing songs at the start of class.",
      nova_says_vi: "Chúng tôi hát ở đầu tiết học.",
      context_en: "We sing songs at the start of class.",
      task_en: "Ask Nova WHAT they do at the start of class.",
      task_vi: "Hỏi cô Nova họ làm gì ở đầu tiết.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you do at the start of class?"
    }
  ]
};
