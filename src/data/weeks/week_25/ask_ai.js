// WEEK 25: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "First, I mixed the flour and eggs together.",
      nova_says_vi: "Đầu tiên, cô đã trộn bột mì và trứng lại với nhau.",
      context_en: "Nova mixed flour and eggs.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you mix together first?",
      correctWord: "What"
    },
    {
      nova_says: "Then I added sugar and butter to the mix.",
      nova_says_vi: "Sau đó cô đã thêm đường và bơ vào hỗn hợp.",
      context_en: "Nova added sugar and butter.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you add to the mix?",
      correctWord: "What"
    },
    {
      nova_says: "I put the cake in the oven at 180 degrees.",
      nova_says_vi: "Cô đã cho bánh vào lò nướng ở 180 độ.",
      context_en: "The oven was set to 180 degrees.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ hot did you set the oven?",
      correctWord: "How"
    },
    {
      nova_says: "The cake baked for thirty minutes.",
      nova_says_vi: "Bánh nướng trong ba mươi phút.",
      context_en: "The cake baked 30 minutes.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ long did the cake bake?",
      correctWord: "How"
    },
    {
      nova_says: "Finally, I decorated the cake with cream and strawberries.",
      nova_says_vi: "Cuối cùng, cô đã trang trí bánh bằng kem và dâu tây.",
      context_en: "Nova decorated the cake.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you decorate the cake?",
      correctWord: "How"
    }
  ]
};