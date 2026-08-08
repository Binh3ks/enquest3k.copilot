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
    },
    {
      id: 3,
      nova_says: "Leo passed the baton cleanly to Maya. Ask me what he passed!",
      nova_says_vi: "Leo đã truyền gậy tiếp sức gọn gàng cho Maya. Hãy hỏi Nova xem cậu ấy truyền gì!",
      context_en: "Ask Nova what Leo passed to Maya.",
      question_word_bank: ["What did", "Where did", "Who did"],
      question_frame: "___ Leo pass to Maya?",
      correctWord: "What did",
      answer: "What did Leo pass to Maya?"
    },
    {
      id: 4,
      nova_says: "Playing outdoor sports keeps us happy and strong. Ask me where we play!",
      nova_says_vi: "Chơi thể thao ngoài trời giúp chúng ta vui khỏe. Hãy hỏi Nova xem chúng ta chơi ở đâu!",
      context_en: "Ask Nova where children play sports.",
      question_word_bank: ["Where do", "When do", "Why do"],
      question_frame: "___ children play outdoor sports?",
      correctWord: "Where do",
      answer: "Where do children play outdoor sports?"
    }
  ]
};
