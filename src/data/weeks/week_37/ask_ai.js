export default {
  prompts: [
    {
      id: 1,
      nova_says: "Leo and Maya won the relay race at the stadium today! Ask me how they trained!",
      nova_says_vi: "Leo và Maya đã thắng cuộc đua tiếp sức hôm nay! Hãy hỏi Nova xem họ đã tập luyện như thế nào!",
      context_en: "Ask Nova how the relay team trained for the sports day.",
      question_word_bank: ["How did", "Where did", "When did", "Why did"],
      question_frame: "___ the team train for the relay race?",
      correctWord: "How did",
      answer: "How did the team train for the relay race?"
    },
    {
      id: 2,
      nova_says: "The coach gave Leo an important tip about passing the baton cleanly. Ask me what the tip was!",
      nova_says_vi: "Huấn luyện viên đã cho Leo lời khuyên quan trọng về việc truyền gậy. Hãy hỏi Nova xem đó là gì!",
      context_en: "Ask Nova what tip the coach gave to Leo.",
      question_word_bank: ["What tip did", "Where did", "Who did", "Why did"],
      question_frame: "___ the coach give to Leo?",
      correctWord: "What tip did",
      answer: "What tip did the coach give to Leo?"
    },
    {
      id: 3,
      nova_says: "Thousands of spectators clapped when Max crossed the finish line. Ask me how many people were there!",
      nova_says_vi: "Hàng ngàn khán giả đã vỗ tay khi Max cán đích. Hãy hỏi Nova xem có bao nhiêu người ở đó!",
      context_en: "Ask Nova how many spectators were at the sports stadium.",
      question_word_bank: ["How many", "Where did", "Which", "Why"],
      question_frame: "___ spectators were at the stadium?",
      correctWord: "How many",
      answer: "How many spectators were at the stadium?"
    },
    {
      id: 4,
      nova_says: "Outdoor exercise keeps our active minds sharp and healthy. Ask me how long we should exercise daily!",
      nova_says_vi: "Tập thể dục ngoài trời giúp trí óc nhạy bén. Hãy hỏi Nova xem chúng ta nên tập bao lâu mỗi ngày!",
      context_en: "Ask Nova how many minutes of exercise we need every single day.",
      question_word_bank: ["How many minutes", "Where did", "Who did", "Why"],
      question_frame: "___ of exercise should we do daily?",
      correctWord: "How many minutes",
      answer: "How many minutes of exercise should we do daily?"
    },
    {
      id: 5,
      nova_says: "Leo smiled with pride when receiving his golden medal. Ask me why he felt proud!",
      nova_says_vi: "Leo mỉm cười tự hào khi nhận huy chương vàng. Hãy hỏi Nova tại sao cậu ấy tự hào!",
      context_en: "Ask Nova why Leo felt proud at the award ceremony.",
      question_word_bank: ["Why did", "Where did", "When did", "What did"],
      question_frame: "___ Leo feel proud after the race?",
      correctWord: "Why did",
      answer: "Why did Leo feel proud after the race?"
    }
  ]
};
