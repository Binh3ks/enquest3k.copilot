export default {
    prompts: [
    {
      id: 1,
      nova_says: "I can play the piano very well.",
      nova_says_vi: "Cô có thể chơi đàn piano rất giỏi.",
      task_en: "Ask Nova WHAT she can play.",
      task_vi: "Hỏi cô Nova cô có thể chơi nhạc cụ gì.",

      context_en: "Nova wants to play in a concert.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
            question_frame: "What ___ you play?",
      answer: ["What can you play?"],
      hint: "can",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I practice piano for one hour every day.",
      nova_says_vi: "Cô tập đàn một tiếng mỗi ngày.",
      task_en: "Ask Nova HOW LONG she practises piano each day.",
      task_vi: "Hỏi cô Nova cô tập đàn bao lâu mỗi ngày.",
      question_frame: "How ___ do you practice piano?",
      answer: ["How long do you practice piano?","How long do you practice piano each day?"],
      hint: "long",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I learned piano when I was six.",
      nova_says_vi: "Cô học đàn lúc sáu tuổi.",
      task_en: "Ask Nova WHEN she learned to play piano.",
      task_vi: "Hỏi cô Nova cô học đàn khi nào.",
      question_frame: "___ did you learn to play piano?",
      answer: ["When did you learn to play piano?"],
      hint: "When",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "My piano teacher is very patient.",
      nova_says_vi: "Giáo viên đàn của cô rất kiên nhẫn.",
      task_en: "Ask Nova HOW her piano teacher is.",
      task_vi: "Hỏi cô Nova giáo viên đàn của cô như thế nào.",
      question_frame: "___ is your piano teacher?",
      answer: ["How is your piano teacher?"],
      hint: "How",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I want to play in a concert one day.",
      nova_says_vi: "Cô muốn biểu diễn trong một buổi hòa nhạc.",
      task_en: "Ask Nova WHAT she wants to do one day.",
      task_vi: "Hỏi cô Nova cô muốn làm gì một ngày nào đó.",
      question_frame: "What ___ you want to do one day?",
      answer: ["What do you want to do one day?"],
      hint: "do",
      audio_url: null
    }
  ]
};
