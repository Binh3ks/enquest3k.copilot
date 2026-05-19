// WEEK 21: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I went to the museum yesterday.",
      nova_says_vi: "Hôm qua cô đã đi bảo tàng.",
      context_en: "Nova went to the museum.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you go yesterday?",
      correctWord: "Where"
    },
    {
      nova_says: "I saw a dinosaur exhibition at the museum.",
      nova_says_vi: "Cô đã xem triển lãm khủng long ở bảo tàng.",
      context_en: "A dinosaur exhibition at the museum.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you see at the museum?",
      correctWord: "What"
    },
    {
      nova_says: "I went with my younger sister.",
      nova_says_vi: "Cô đã đi cùng em gái.",
      context_en: "Nova went with her sister.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you go with?",
      correctWord: "Who"
    },
    {
      nova_says: "We stayed at the museum for three hours.",
      nova_says_vi: "Chúng tôi đã ở bảo tàng trong ba tiếng.",
      context_en: "They stayed three hours.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ long did you stay at the museum?",
      correctWord: "How"
    },
    {
      nova_says: "The dinosaur bones were the best thing I saw.",
      nova_says_vi: "Xương khủng long là thứ ấn tượng nhất cô đã thấy.",
      context_en: "Dinosaur bones were the best.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ was the best thing you saw?",
      correctWord: "What"
    }
  ]
};