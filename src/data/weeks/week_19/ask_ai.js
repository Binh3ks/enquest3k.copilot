// WEEK 19: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "Look! In this old photo, I was wearing a funny hat.",
      nova_says_vi: "Nhìn này! Trong bức ảnh cũ này, cô đang đội một cái mũ buồn cười.",
      context_en: "Nova shows an old photo.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ were you wearing in the photo?",
      correctWord: "What"
    },
    {
      nova_says: "This photo was taken at a birthday party.",
      nova_says_vi: "Bức ảnh này được chụp tại một bữa tiệc sinh nhật.",
      context_en: "The photo was at a party.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ was the photo taken?",
      correctWord: "Where"
    },
    {
      nova_says: "I was very young in this photo — maybe five years old.",
      nova_says_vi: "Cô còn rất nhỏ trong ảnh này — có lẽ năm tuổi.",
      context_en: "Nova was young.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ old were you in the photo?",
      correctWord: "How"
    },
    {
      nova_says: "My grandpa took this photo a long time ago.",
      nova_says_vi: "Ông của cô chụp ảnh này từ rất lâu rồi.",
      context_en: "Grandpa took the photo.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ took the photo?",
      correctWord: "Who"
    },
    {
      nova_says: "Everyone in the photo was laughing and happy.",
      nova_says_vi: "Mọi người trong ảnh đều đang cười và vui vẻ.",
      context_en: "Everyone was happy.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ was everyone feeling in the photo?",
      correctWord: "How"
    }
  ]
};