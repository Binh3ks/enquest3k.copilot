// WEEK 26: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "In the story, a fox tried to trick a crow.",
      nova_says_vi: "Trong câu chuyện, một con cáo đã cố lừa một con quạ.",
      context_en: "A fox tried to trick a crow.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ tried to trick the crow?"
    },
    {
      nova_says: "The fox wanted to get the cheese the crow was holding.",
      nova_says_vi: "Con cáo muốn lấy miếng pho mát mà con quạ đang giữ.",
      context_en: "The fox wanted the cheese.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did the fox want to get?"
    },
    {
      nova_says: "The fox said the crow had a beautiful voice.",
      nova_says_vi: "Con cáo nói con quạ có giọng hát hay.",
      context_en: "The fox flattered the crow.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did the fox say to the crow?"
    },
    {
      nova_says: "When the crow opened its mouth to sing, the cheese fell.",
      nova_says_vi: "Khi con quạ mở miệng để hát, miếng pho mát rơi xuống.",
      context_en: "The cheese fell.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ happened when the crow opened its mouth?"
    },
    {
      nova_says: "The fox tricked the crow because the crow was too proud.",
      nova_says_vi: "Con cáo lừa được con quạ vì con quạ quá tự kiêu.",
      context_en: "The crow was too proud.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ was the fox able to trick the crow?"
    }
  ]
};