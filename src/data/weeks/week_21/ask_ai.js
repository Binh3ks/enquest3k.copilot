export default {
  topic_talk_prompt: "Tell me about what you did yesterday. What was the best part of your day?",
  prompts: [
    {
      id: 1,
      nova_says: "I went to the museum yesterday.",
      nova_says_vi: "Hôm qua cô đã đi bảo tàng.",
      task_en: "Ask Nova WHERE she went yesterday.",
      task_vi: "Hỏi cô Nova hôm qua cô đã đi đâu.",
      question_word_bank: ["Where","What","Who","When"],
      question_frame: "___ did you go yesterday?",
      answer: ["Where did you go yesterday?"],
      hint_word: "Where",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I saw a dinosaur exhibition at the museum.",
      nova_says_vi: "Cô đã xem triển lãm khủng long ở bảo tàng.",
      task_en: "Ask Nova WHAT she saw at the museum.",
      task_vi: "Hỏi cô Nova cô đã xem gì ở bảo tàng.",
      question_word_bank: ["What","Where","Why","How"],
      question_frame: "___ did you see at the museum?",
      answer: ["What did you see at the museum?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I went with my younger sister.",
      nova_says_vi: "Cô đã đi cùng em gái.",
      task_en: "Ask Nova WHO she went with.",
      task_vi: "Hỏi cô Nova cô đã đi cùng ai.",
      question_word_bank: ["Who","What","Where","Why"],
      question_frame: "___ did you go with?",
      answer: ["Who did you go with?"],
      hint_word: "Who",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "We stayed at the museum for three hours.",
      nova_says_vi: "Chúng tôi đã ở bảo tàng trong ba tiếng.",
      task_en: "Ask Nova HOW LONG they stayed at the museum.",
      task_vi: "Hỏi cô Nova họ đã ở bảo tàng bao lâu.",
      question_word_bank: ["How","When","What","Where"],
      question_frame: "___ long did you stay at the museum?",
      answer: ["How long did you stay at the museum?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "The dinosaur bones were the best thing I saw.",
      nova_says_vi: "Xương khủng long là thứ ấn tượng nhất cô đã thấy.",
      task_en: "Ask Nova WHAT the best thing she saw was.",
      task_vi: "Hỏi cô Nova thứ ấn tượng nhất cô đã thấy là gì.",
      question_word_bank: ["What","How","Why","Where"],
      question_frame: "___ was the best thing you saw?",
      answer: ["What was the best thing you saw?"],
      hint_word: "What",
      audio_url: null
    }
  ]
};
