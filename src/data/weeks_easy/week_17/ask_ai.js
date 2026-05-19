// WEEK 17: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "It",
      nova_says_vi: "Hôm nay trời rất nóng và nắng.",
      context_en: "The weather is described.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is the weather today?"
    },
    {
      nova_says: "I",
      nova_says_vi: "Cô đang đội mũ vì trời quá sáng.",
      context_en: "Nova wears a sun hat.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ are you wearing a sun hat?"
    },
    {
      nova_says: "My favorite season is winter.",
      nova_says_vi: "Mùa yêu thích của cô là mùa đông.",
      context_en: "Nova's favorite season.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your favorite season?"
    },
    {
      nova_says: "It snows a lot in my hometown in winter.",
      nova_says_vi: "Ở quê hương cô tuyết rơi nhiều vào mùa đông.",
      context_en: "It snows in winter.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ much does it snow there?"
    },
    {
      nova_says: "I like to drink hot chocolate when it",
      nova_says_vi: "Cô thích uống ca cao nóng khi trời lạnh.",
      context_en: "Nova drinks hot chocolate.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you like to drink when it"
    }
  ]
};