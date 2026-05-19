// WEEK 23: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I drew a picture of a sunset over the ocean last week.",
      nova_says_vi: "Tuần trước cô đã vẽ một bức tranh về hoàng hôn trên biển.",
      context_en: "Nova drew a sunset.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you draw last week?"
    },
    {
      nova_says: "I used watercolor paints to make the picture.",
      nova_says_vi: "Cô đã dùng màu nước để vẽ bức tranh.",
      context_en: "Nova used watercolors.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ kind of paint did you use?"
    },
    {
      nova_says: "The sky in my picture was orange and pink.",
      nova_says_vi: "Bầu trời trong tranh của cô có màu cam và hồng.",
      context_en: "The sky was orange and pink.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ colors was the sky in your picture?"
    },
    {
      nova_says: "I spent two hours making the painting.",
      nova_says_vi: "Cô đã dành hai tiếng để vẽ bức tranh.",
      context_en: "Nova spent two hours.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ long did you spend making the painting?"
    },
    {
      nova_says: "I gave the painting to my mum as a gift.",
      nova_says_vi: "Cô đã tặng bức tranh cho mẹ như một món quà.",
      context_en: "Nova gave the painting to her mum.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you give the painting to?"
    }
  ]
};