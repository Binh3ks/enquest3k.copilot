export default {
  grammar_explanation: {
    title_en: "Using 'at' with Places",
    title_vi: "Dùng 'at' với Địa điểm",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'at' with places: at the park", example_en: "I am at the park. She is at school.", example_vi: "Tôi đang ở công viên. Cô ấy đang ở trường.", rule_vi: "Dùng 'at' với địa điểm: at the park" },
      { type: "rule", icon: "2️⃣", rule_en: "Say: I play at the park", example_en: "I play at the park. We run at the park.", example_vi: "Tôi chơi ở công viên. Chúng tôi chạy ở công viên.", rule_vi: "Nói: I play at the park" },
      { type: "rule", icon: "3️⃣", rule_en: "Say: I read at the library", example_en: "I read at the library. She reads at the library.", example_vi: "Tôi đọc sách ở thư viện. Cô ấy đọc sách ở thư viện.", rule_vi: "Nói: I read at the library" },
      { type: "rule", icon: "4️⃣", rule_en: "Say: I buy at the store", example_en: "I buy food at the store. Mum buys milk at the supermarket.", example_vi: "Tôi mua thức ăn ở cửa hàng. Mẹ mua sữa ở siêu thị.", rule_vi: "Nói: I buy at the store" }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "I play ___ the park.", answer: "at", hint: "little word" },
    { id: 2, type: "fill", question: "I read ___ the library.", answer: "at", hint: "little word" },
    { id: 3, type: "fill", question: "I buy ___ the store.", answer: "at", hint: "little word" },
    { id: 4, type: "mc", question: "I eat ___ the zoo.", options: ["at", "in", "on"], answer: "at", hint: "with places" },
    { id: 5, type: "fill", question: "I play ___ the playground.", answer: "at", hint: "little word" },
    { id: 6, type: "mc", question: "I go ___ school.", options: ["to", "at", "in"], answer: "to", hint: "movement" },
    { id: 7, type: "fill", question: "I learn ___ school.", answer: "at", hint: "activity at place" },
    { id: 8, type: "mc", question: "I see animals ___ the zoo.", options: ["at", "in", "on"], answer: "at", hint: "location" },
    { id: 9, type: "fill", question: "I play ___ the park every day.", answer: "at", hint: "place word" },
    { id: 10, type: "mc", question: "I read ___ the library.", options: ["at", "on", "in"], answer: "at", hint: "place" },
    { id: 11, type: "unscramble", question: "Order:", words: ["I", "play", "at", "the", "park"], answer: "I play at the park.", hint: "I play" },
    { id: 12, type: "unscramble", question: "Order:", words: ["I", "read", "at", "the", "library"], answer: "I read at the library.", hint: "I read" },
    { id: 13, type: "unscramble", question: "Order:", words: ["I", "buy", "at", "the", "store"], answer: "I buy at the store.", hint: "I buy" },
    { id: 14, type: "unscramble", question: "Order:", words: ["I", "eat", "food"], answer: "I eat food.", hint: "I eat" },
    { id: 15, type: "unscramble", question: "Order:", words: ["I", "go", "to", "the", "zoo"], answer: "I go to the zoo.", hint: "I go" },
    { id: 16, type: "fill", question: "I see animals ___ the zoo.", answer: "at", hint: "place word" },
    { id: 17, type: "mc", question: "I slide ___ the playground.", options: ["at", "in", "on"], answer: "at", hint: "place" },
    { id: 18, type: "fill", question: "I help mom ___ the store.", answer: "at", hint: "location" },
    { id: 19, type: "unscramble", question: "Order:", words: ["I", "like", "books"], answer: "I like books.", hint: "I like" },
    { id: 20, type: "mc", question: "I have fun ___ the park.", options: ["at", "in", "under"], answer: "at", hint: "place of fun" }
  ]
};
