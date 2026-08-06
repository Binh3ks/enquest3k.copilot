// WEEK 36: Adventure Stories (Irregular Verbs)
// Ask AI Station — Advanced Mode
// 100% Story-bound, clear Wh-question scaffolding for student inquiry

export default {
  prompts: [
    {
      nova_says: "Marco Polo was a famous explorer from Venice, Italy. He travelled to China on the Silk Road and came back after 24 years.",
      nova_says_vi: "Marco Polo là một nhà thám hiểm nổi tiếng từ Venice, Ý. Ông đã du hành đến Trung Quốc trên Con đường Tơ lụa và trở về sau 24 năm.",
      context_en: "Marco Polo went on an epic journey. Student asks where he travelled.",
      question_word_bank: ["Where did", "How long did", "When did", "Why did"],
      question_frame: "___ Marco Polo go on his journey?",
      correctWord: "Where did"
    },
    {
      nova_says: "Explorers in our story dove deep into the ocean. They found an ancient underwater cave filled with treasures.",
      nova_says_vi: "Các nhà thám hiểm lặn sâu xuống đại dương. Họ tìm thấy một hang động ngầm cổ đại chứa đầy kho báu.",
      context_en: "Explorers found something inside the cave. Student asks what they found.",
      question_word_bank: ["What did", "Where did", "Who did", "How did"],
      question_frame: "___ the explorers find in the cave?",
      correctWord: "What did"
    },
    {
      nova_says: "The Silk Road connected Asia and Europe for over 1,400 years. Traders carried silk, spices, and tea along this route.",
      nova_says_vi: "Con đường Tơ lụa kết nối Châu Á và Châu Âu trong hơn 1.400 năm. Thương nhân mang lụa, gia vị và trà theo tuyến đường này.",
      context_en: "Traders carried valuable goods on the Silk Road. Student asks what they carried.",
      question_word_bank: ["What did", "Where did", "When did", "Why did"],
      question_frame: "___ traders carry on the Silk Road?",
      correctWord: "What did"
    },
    {
      nova_says: "Marco Polo met many merchants, artists, and powerful rulers like Kublai Khan during his long travels.",
      nova_says_vi: "Marco Polo đã gặp nhiều thương nhân, nghệ sĩ và các vị vua quyền lực như Hốt Tất Liệt trong chuyến đi dài.",
      context_en: "Marco Polo encountered famous people. Student asks who he met.",
      question_word_bank: ["Who did", "What did", "Where did", "When did"],
      question_frame: "___ Marco Polo meet in China?",
      correctWord: "Who did"
    },
    {
      nova_says: "When explorers returned home from their journeys, they wrote books and gave their findings to museums on shore.",
      nova_says_vi: "Khi các nhà thám hiểm trở về nhà, họ viết sách và trao lại phát hiện cho các bảo tàng trên bờ.",
      context_en: "Explorers completed their journey. Student asks what they did after returning.",
      question_word_bank: ["What did", "When did", "Why did", "How did"],
      question_frame: "___ explorers do when they came back?",
      correctWord: "What did"
    }
  ]
};