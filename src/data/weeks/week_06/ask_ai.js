// WEEK 06: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "My pen is under the chair.",
      nova_says_vi: "Cái bút của cô ở dưới ghế.",
      context_en: "My pen is under the chair.",
      task_en: "Ask Nova WHERE her pen is.",
      task_vi: "Hỏi cô Nova bút của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your pen?",
      correctWord: "WHERE"
    },
    {
      nova_says: "The clock is on the wall.",
      nova_says_vi: "Cái đồng hồ ở trên tường.",
      context_en: "The clock is on the wall.",
      task_en: "Ask Nova WHERE the clock is.",
      task_vi: "Hỏi cô Nova đồng hồ ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is the clock?",
      correctWord: "WHERE"
    },
    {
      nova_says: "My bag is next to the door.",
      nova_says_vi: "Cặp của cô ở cạnh cửa.",
      context_en: "My bag is next to the door.",
      task_en: "Ask Nova WHERE her bag is.",
      task_vi: "Hỏi cô Nova cặp của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your bag?",
      correctWord: "WHERE"
    },
    {
      nova_says: "There are twenty students in my class.",
      nova_says_vi: "Có hai mươi học sinh trong lớp tôi.",
      context_en: "There are twenty students in my class.",
      task_en: "Ask Nova HOW MANY students are in her class.",
      task_vi: "Hỏi cô Nova có bao nhiêu học sinh trong lớp.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ students are in your class?",
      correctWord: "HOW"
    },
    {
      nova_says: "I sit near the window.",
      nova_says_vi: "Cô ngồi gần cửa sổ.",
      context_en: "I sit near the window.",
      task_en: "Ask Nova WHERE she sits.",
      task_vi: "Hỏi cô Nova cô ngồi ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you sit?",
      correctWord: "WHERE"
    }
  ]
};
