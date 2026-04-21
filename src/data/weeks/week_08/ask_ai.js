export default {
  topic_talk_prompt: "Tell me about your classroom. What do you see? What do you do there?",
  prompts: [
    {
      id: 1,
      nova_says: "My classroom has a big whiteboard.",
      nova_says_vi: "Lớp học của cô có bảng trắng lớn.",
      task_en: "Ask Nova WHAT her classroom has.",
      task_vi: "Hỏi cô Nova lớp của cô có gì.",
      question_frame: "What ___ your classroom have?",
      answer: ["What does your classroom have?"],
      hint: "does",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "We have English class every Tuesday.",
      nova_says_vi: "Chúng tôi có tiết Anh văn mỗi thứ Ba.",
      task_en: "Ask Nova WHEN they have English class.",
      task_vi: "Hỏi cô Nova họ có tiết Anh văn khi nào.",
      question_frame: "___ do you have English class?",
      answer: ["When do you have English class?"],
      hint: "When",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "My teacher's name is Mr Brown.",
      nova_says_vi: "Tên thầy giáo của cô là thầy Brown.",
      task_en: "Ask Nova WHAT her teacher's name is.",
      task_vi: "Hỏi cô Nova tên giáo viên của cô là gì.",
      question_frame: "What ___ your teacher's name?",
      answer: ["What is your teacher's name?","What's your teacher's name?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I sit at the front of the classroom.",
      nova_says_vi: "Cô ngồi ở phía trước lớp.",
      task_en: "Ask Nova WHERE she sits in the classroom.",
      task_vi: "Hỏi cô Nova cô ngồi ở đâu trong lớp.",
      question_frame: "Where ___ you sit in the classroom?",
      answer: ["Where do you sit in the classroom?"],
      hint: "do",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "We sing songs at the start of class.",
      nova_says_vi: "Chúng tôi hát bài hát đầu giờ học.",
      task_en: "Ask Nova WHAT they do at the start of class.",
      task_vi: "Hỏi cô Nova họ làm gì đầu giờ học.",
      question_frame: "What ___ you do at the start of class?",
      answer: ["What do you do at the start of class?"],
      hint: "do",
      audio_url: null
    }
  ]
};
