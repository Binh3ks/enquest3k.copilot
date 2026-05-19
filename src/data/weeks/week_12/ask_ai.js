// WEEK 12: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I can play the piano very well.",
      nova_says_vi: "Cô có thể chơi đàn piano rất giỏi.",
      context_en: "Nova talks about piano.",
      task_en: "Ask Nova WHAT she can play.",
      task_vi: "Hỏi cô Nova cô có thể chơi nhạc cụ gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ you play?"
    },
    {
      nova_says: "I practice piano for one hour every day.",
      nova_says_vi: "Cô tập đàn một tiếng mỗi ngày.",
      context_en: "Nova practices piano.",
      task_en: "Ask Nova HOW LONG she practises piano each day.",
      task_vi: "Hỏi cô Nova cô tập đàn bao lâu mỗi ngày.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ do you practice piano?"
    },
    {
      nova_says: "I learned piano when I was six.",
      nova_says_vi: "Cô học đàn lúc sáu tuổi.",
      context_en: "Nova learned piano at six.",
      task_en: "Ask Nova WHEN she learned to play piano.",
      task_vi: "Hỏi cô Nova cô học đàn khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you learn to play piano?"
    },
    {
      nova_says: "My piano teacher is very patient.",
      nova_says_vi: "Giáo viên đàn của cô rất kiên nhẫn.",
      context_en: "Nova describes her piano teacher.",
      task_en: "Ask Nova HOW her piano teacher is.",
      task_vi: "Hỏi cô Nova giáo viên đàn của cô như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your piano teacher?"
    },
    {
      nova_says: "I want to play in a concert one day.",
      nova_says_vi: "Cô muốn biểu diễn trong một buổi hòa nhạc.",
      context_en: "Nova dreams of concerts.",
      task_en: "Ask Nova WHAT she wants to do one day.",
      task_vi: "Hỏi cô Nova cô muốn làm gì một ngày nào đó.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ you want to do one day?"
    }
  ]
};