// WEEK 08: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "My classroom has a big whiteboard.",
      nova_says_vi: "Lớp học của cô có bảng trắng lớn.",
      context_en: "Nova describes her classroom.",
      task_en: "Ask Nova WHAT her classroom has.",
      task_vi: "Hỏi cô Nova lớp của cô có gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your classroom have?"
    },
    {
      nova_says: "We have English class every Tuesday.",
      nova_says_vi: "Chúng tôi có tiết Anh văn mỗi thứ Ba.",
      context_en: "Nova has English class.",
      task_en: "Ask Nova WHEN they have English class.",
      task_vi: "Hỏi cô Nova họ có tiết Anh văn khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you have English class?"
    },
    {
      nova_says: "My teacher",
      nova_says_vi: "Tên thầy giáo của cô là thầy Brown.",
      context_en: "Nova describes her teacher.",
      task_en: "Ask Nova WHAT her teacher",
      task_vi: "Hỏi cô Nova tên giáo viên của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your teacher"
    },
    {
      nova_says: "I sit at the front of the classroom.",
      nova_says_vi: "Cô ngồi ở phía trước lớp.",
      context_en: "Nova sits at the front.",
      task_en: "Ask Nova WHERE she sits in the classroom.",
      task_vi: "Hỏi cô Nova cô ngồi ở đâu trong lớp.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "Where ___ you sit in the classroom?"
    },
    {
      nova_says: "We sing songs at the start of class.",
      nova_says_vi: "Chúng tôi hát bài hát đầu giờ học.",
      context_en: "Nova starts class with songs.",
      task_en: "Ask Nova WHAT they do at the start of class.",
      task_vi: "Hỏi cô Nova họ làm gì đầu giờ học.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ you do at the start of class?"
    }
  ]
};