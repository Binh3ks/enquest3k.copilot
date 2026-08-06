// WEEK 36: Adventure Stories (Irregular Verbs)
// Ask AI Station — Advanced Mode
// 100% Interactive Inquiry with target answer validation

export default {
  prompts: [
    {
      nova_says: "I know where Marco Polo travelled on his famous journey. Ask me!",
      nova_says_vi: "Nova biết Marco Polo đã du hành đến đâu trong chuyến đi nổi tiếng. Hãy hỏi Nova đi!",
      context_en: "Ask Nova about Marco Polo's journey destination.",
      question_word_bank: ["Where did", "How long did", "When did", "Why did"],
      question_frame: "___ Marco Polo go on his journey?",
      correctWord: "Where did",
      answer: "Where did Marco Polo go on his journey?"
    },
    {
      nova_says: "The ocean explorers discovered an ancient underwater secret inside the deep cave. Ask me what they found!",
      nova_says_vi: "Các nhà thám hiểm đại dương đã phát hiện ra một bí mật cổ đại bên trong hang động sâu. Hãy hỏi Nova xem họ tìm thấy gì!",
      context_en: "Ask Nova what the explorers discovered in the cave.",
      question_word_bank: ["What did", "Where did", "Who did", "How did"],
      question_frame: "___ the explorers find in the cave?",
      correctWord: "What did",
      answer: "What did the explorers find in the cave?"
    },
    {
      nova_says: "Traders carried very valuable goods across the Silk Road between Asia and Europe. Ask me what they carried!",
      nova_says_vi: "Các thương nhân đã mang theo những hàng hóa rất giá trị trên Con đường Tơ lụa. Hãy hỏi Nova xem họ đã mang gì!",
      context_en: "Ask Nova what goods traders carried on the Silk Road.",
      question_word_bank: ["What did", "Where did", "When did", "Why did"],
      question_frame: "___ traders carry on the Silk Road?",
      correctWord: "What did",
      answer: "What did traders carry on the Silk Road?"
    },
    {
      nova_says: "Marco Polo encountered a famous, powerful ruler when he arrived in China. Ask me who he met!",
      nova_says_vi: "Marco Polo đã gặp một vị vua quyền lực nổi tiếng khi ông tới Trung Quốc. Hãy hỏi Nova xem ông đã gặp ai!",
      context_en: "Ask Nova who Marco Polo met in China.",
      question_word_bank: ["Who did", "What did", "Where did", "When did"],
      question_frame: "___ Marco Polo meet in China?",
      correctWord: "Who did",
      answer: "Who did Marco Polo meet in China?"
    },
    {
      nova_says: "Explorers did something special when they finally returned home from their journeys. Ask me what they did!",
      nova_says_vi: "Các nhà thám hiểm đã làm điều đặc biệt khi cuối cùng trở về nhà. Hãy hỏi Nova xem họ đã làm gì!",
      context_en: "Ask Nova what explorers did upon returning home.",
      question_word_bank: ["What did", "When did", "Why did", "How did"],
      question_frame: "___ explorers do when they came back?",
      correctWord: "What did",
      answer: "What did explorers do when they came back?"
    }
  ]
};