export default {
  prompts: [
    {
      id: 1,
      nova_says: "Leo ran very fast today! Ask me how fast he ran!",
      nova_says_vi: "Leo đã chạy rất nhanh hôm nay! Hãy hỏi Nova xem cậu ấy chạy nhanh thế nào!",
      context_en: "Ask Nova how fast Leo ran.",
      question_word_bank: ["How fast", "Where", "Why"],
      question_frame: "___ did Leo run?",
      correctWord: "How fast",
      answer: "How fast did Leo run?"
    },
    {
      id: 2,
      nova_says: "The team won gold medals! Ask me who won!",
      nova_says_vi: "Đội đã giành huy chương vàng! Hãy hỏi Nova xem ai đã thắng!",
      context_en: "Ask Nova who won the gold medals.",
      question_word_bank: ["Who won", "Where", "When"],
      question_frame: "___ the gold medals?",
      correctWord: "Who won",
      answer: "Who won the gold medals?"
    }
  ]
};
