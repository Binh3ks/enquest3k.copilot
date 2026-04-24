export default {
  grammar_explanation: {
    title_en: "Present Continuous (am/is/are + V-ing)",
    title_vi: "Thì hiện tại tiếp diễn (am/is/are + V-ing)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "I am running: I am running in the park.", example_en: "I am running in the park. I am eating lunch now.", example_vi: "Tôi đang chạy trong công viên. Tôi đang ăn trưa bây giờ.", rule_vi: "I am running: Tôi đang chạy trong công viên." },
      { type: "rule", icon: "2️⃣", rule_en: "He/She is playing: She is playing games.", example_en: "She is playing games. He is reading a book.", example_vi: "Cô ấy đang chơi game. Anh ấy đang đọc sách.", rule_vi: "He/She is playing: Cô ấy đang chơi trò chơi." },
      { type: "rule", icon: "3️⃣", rule_en: "They are eating: They are eating snacks.", example_en: "They are eating snacks. We are watching a movie.", example_vi: "Họ đang ăn vặt. Chúng tôi đang xem phim.", rule_vi: "They are eating: Họ đang ăn nhẹ." },
      { type: "rule", icon: "4️⃣", rule_en: "Use for actions happening NOW.", example_en: "Look! She is dancing now. Listen! He is singing!", example_vi: "Nhìn kìa! Cô ấy đang nhảy. Nghe kìa! Anh ấy đang hát!", rule_vi: "Dùng cho hành động đang xảy ra BÂY GIỜ." }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "I ___ running.", options: ["am", "is", "are"], answer: "am", hint: "I uses am" },
    { id: 2, type: "fill", question: "He ___ walking.", answer: "is", hint: "He uses is" },
    { id: 3, type: "mc", question: "They ___ playing.", options: ["am", "is", "are"], answer: "are", hint: "They uses are" },
    { id: 4, type: "fill", question: "She ___ sitting.", answer: "is", hint: "She uses is" },
    { id: 5, type: "mc", question: "We ___ eating.", options: ["am", "is", "are"], answer: "are", hint: "We uses are" },
    { id: 6, type: "fill", question: "I ___ flying a kite.", answer: "am", hint: "I uses am" },
    { id: 7, type: "mc", question: "My dad ___ jogging.", options: ["am", "is", "are"], answer: "is", hint: "He uses is" },
    { id: 8, type: "fill", question: "I ___ relaxing.", answer: "am", hint: "I uses am" },
    { id: 9, type: "unscramble", question: "Order:", words: ["am", "I", "running"], answer: "I am running.", hint: "I am" },
    { id: 10, type: "unscramble", question: "Order:", words: ["is", "She", "walking"], answer: "She is walking.", hint: "She is" },
    { id: 11, type: "unscramble", question: "Order:", words: ["are", "They", "playing"], answer: "They are playing.", hint: "They are" },
    { id: 12, type: "unscramble", question: "Order:", words: ["am", "I", "eating"], answer: "I am eating.", hint: "I am" },
    { id: 13, type: "mc", question: "My mom ___ sitting.", options: ["am", "is", "are"], answer: "is", hint: "She uses is" },
    { id: 14, type: "fill", question: "We ___ having a picnic.", answer: "are", hint: "We uses are" },
    { id: 15, type: "mc", question: "The dog ___ running.", options: ["am", "is", "are"], answer: "is", hint: "It uses is" },
    { id: 16, type: "fill", question: "I ___ playing games.", answer: "am", hint: "I uses am" },
    { id: 17, type: "mc", question: "My sister ___ flying her kite.", options: ["am", "is", "are"], answer: "is", hint: "She uses is" },
    { id: 18, type: "fill", question: "The kids ___ jogging.", answer: "are", hint: "They uses are" },
    { id: 19, type: "unscramble", question: "Order:", words: ["is", "He", "relaxing"], answer: "He is relaxing.", hint: "He is" },
    { id: 20, type: "unscramble", question: "Order:", words: ["am", "I", "sitting"], answer: "I am sitting.", hint: "I am" }
  ]
};
