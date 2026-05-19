// WEEK 06: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "My pen is under the chair.",
      nova_says_vi: "Cái bút của cô ở dưới ghế.",
      context_en: "Nova describes where her things are.",
      task_en: "Ask Nova WHERE her pen is.",
      task_vi: "Hỏi cô Nova bút của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "Where ___ your pen?"
    },
    {
      nova_says: "The clock is on the wall.",
      nova_says_vi: "Đồng hồ ở trên tường.",
      context_en: "Nova describes things on the wall.",
      task_en: "Ask Nova WHAT is on the wall.",
      task_vi: "Hỏi cô Nova có gì trên tường.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ on the wall?"
    },
    {
      nova_says: "My bag is next to the door.",
      nova_says_vi: "Cặp của cô ở cạnh cửa.",
      context_en: "Nova describes where her bag is.",
      task_en: "Ask Nova WHERE her bag is.",
      task_vi: "Hỏi cô Nova cặp của cô ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "Where ___ your bag?"
    },
    {
      nova_says: "There are twenty students in my class.",
      nova_says_vi: "Có hai mươi học sinh trong lớp của cô.",
      context_en: "Nova counts students in class.",
      task_en: "Ask Nova HOW MANY students are in her class.",
      task_vi: "Hỏi cô Nova có bao nhiêu học sinh trong lớp của cô.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ students are in your class?"
    },
    {
      nova_says: "I sit near the window.",
      nova_says_vi: "Cô ngồi gần cửa sổ.",
      context_en: "Nova sits near the window.",
      task_en: "Ask Nova WHERE she sits.",
      task_vi: "Hỏi cô Nova cô ngồi ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "Where ___ you sit?"
    }
  ]
};