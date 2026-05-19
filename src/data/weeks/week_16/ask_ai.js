// WEEK 16: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I",
      nova_says_vi: "Hiện tại cô đang chơi bóng rổ với bạn bè.",
      context_en: "Nova plays a sport.",
      task_en: "Ask Nova WHAT sport she is playing right now.",
      task_vi: "Hỏi cô Nova ngay lúc này cô đang chơi môn thể thao gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ sport are you playing?",
      correctWord: "WHAT"
    },
    {
      nova_says: "We are playing in the school gym.",
      nova_says_vi: "Chúng tôi đang chơi trong phòng thể dục trường.",
      context_en: "They play in the gym.",
      task_en: "Ask Nova WHERE they are playing.",
      task_vi: "Hỏi cô Nova họ đang chơi ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ are you playing?",
      correctWord: "WHERE"
    },
    {
      nova_says: "My team is winning the game!",
      nova_says_vi: "Đội của cô đang thắng trận đấu!",
      context_en: "A team is winning.",
      task_en: "Ask Nova WHO is winning.",
      task_vi: "Hỏi cô Nova ai đang thắng.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is winning?",
      correctWord: "WHO"
    },
    {
      nova_says: "I love basketball because it",
      nova_says_vi: "Cô thích bóng rổ vì nó rất kích thích.",
      context_en: "Nova loves basketball.",
      task_en: "Ask Nova WHY she loves basketball.",
      task_vi: "Hỏi cô Nova tại sao cô thích bóng rổ.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you love basketball?",
      correctWord: "WHY"
    },
    {
      nova_says: "We play basketball every Saturday morning.",
      nova_says_vi: "Chúng tôi chơi bóng rổ mỗi sáng thứ Bảy.",
      context_en: "Nova plays basketball on Saturdays.",
      task_en: "Ask Nova WHEN they play basketball.",
      task_vi: "Hỏi cô Nova họ chơi bóng rổ khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you play basketball?",
      correctWord: "WHEN"
    }
  ]
};