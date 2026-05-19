export default {
    prompts: [
    {
      id: 1,
      nova_says: "My pen is under the chair.",
      nova_says_vi: "Cái bút của cô ở dưới ghế.",
      task_en: "Ask Nova WHERE her pen is.",
      task_vi: "Hỏi cô Nova bút của cô ở đâu.",

      context_en: "Nova sits near the window.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
            question_frame: "Where ___ your pen?",
      answer: ["Where is your pen?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "The clock is on the wall.",
      nova_says_vi: "Đồng hồ ở trên tường.",
      task_en: "Ask Nova WHAT is on the wall.",
      task_vi: "Hỏi cô Nova có gì trên tường.",
      question_frame: "What ___ on the wall?",
      answer: ["What is on the wall?","What's on the wall?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "My bag is next to the door.",
      nova_says_vi: "Cặp của cô ở cạnh cửa.",
      task_en: "Ask Nova WHERE her bag is.",
      task_vi: "Hỏi cô Nova cặp của cô ở đâu.",
      question_frame: "Where ___ your bag?",
      answer: ["Where is your bag?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "There are twenty students in my class.",
      nova_says_vi: "Có hai mươi học sinh trong lớp của cô.",
      task_en: "Ask Nova HOW MANY students are in her class.",
      task_vi: "Hỏi cô Nova có bao nhiêu học sinh trong lớp của cô.",
      question_frame: "How ___ students are in your class?",
      answer: ["How many students are in your class?"],
      hint: "many",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I sit near the window.",
      nova_says_vi: "Cô ngồi gần cửa sổ.",
      task_en: "Ask Nova WHERE she sits.",
      task_vi: "Hỏi cô Nova cô ngồi ở đâu.",
      question_frame: "Where ___ you sit?",
      answer: ["Where do you sit?"],
      hint: "do",
      audio_url: null
    }
  ]
};
