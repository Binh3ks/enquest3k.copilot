// WEEK 12: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "I can play the piano very well.",
      nova_says_vi: "Cô có thể chơi piano rất giỏi.",
      context_en: "I can play the piano very well.",
      task_en: "Ask Nova WHAT she can play.",
      task_vi: "Hỏi cô Nova cô có thể chơi gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ can you play?",
      correctWord: "WHAT"
    },
    {
      nova_says: "I practice piano for one hour every day.",
      nova_says_vi: "Cô tập piano một tiếng mỗi ngày.",
      context_en: "I practice piano for one hour every day.",
      task_en: "Ask Nova HOW LONG she practices piano.",
      task_vi: "Hỏi cô Nova cô tập piano bao lâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you practice piano?",
      correctWord: "HOW"
    },
    {
      nova_says: "I learned piano when I was six.",
      nova_says_vi: "Cô học piano khi cô sáu tuổi.",
      context_en: "I learned piano when I was six.",
      task_en: "Ask Nova WHEN she learned piano.",
      task_vi: "Hỏi cô Nova cô học piano khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you learn piano?",
      correctWord: "WHEN"
    },
    {
      nova_says: "My piano teacher is very patient.",
      nova_says_vi: "Giáo viên piano của cô rất kiên nhẫn.",
      context_en: "My piano teacher is very patient.",
      task_en: "Ask Nova WHAT her piano teacher is like.",
      task_vi: "Hỏi cô Nova giáo viên piano của cô như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your piano teacher like?",
      correctWord: "WHAT"
    },
    {
      nova_says: "I want to play in a concert one day.",
      nova_says_vi: "Cô muốn chơi trong một buổi hòa nhạc một ngày nào đó.",
      context_en: "I want to play in a concert one day.",
      task_en: "Ask Nova WHAT she wants to do one day.",
      task_vi: "Hỏi cô Nova cô muốn làm gì một ngày nào đó.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you want to do one day?",
      correctWord: "WHAT"
    }
  ]
};
