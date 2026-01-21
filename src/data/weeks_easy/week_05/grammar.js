export default {
  grammar_explanation: {
    title_en: "Articles 'A/An' (Simple)",
    title_vi: "Mạo từ 'A/An' (Đơn giản)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'a' before words: a bed, a chair", rule_vi: "Dùng 'a' trước từ: a bed, a chair" },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'an' before a, e, i, o, u: an apple", rule_vi: "Dùng 'an' trước a, e, i, o, u: an apple" },
      { type: "rule", icon: "3️⃣", rule_en: "Say: This is a/an...", rule_vi: "Nói: This is a/an..." }
    ]
  },
  exercises: [
    // A exercises (10)
    { id: 1, type: "mc", question: "This is ___ bed.", options: ["a", "an"], answer: "a", hint: "bed starts with 'b'" },
    { id: 2, type: "fill", question: "I see ___ chair.", answer: "a", hint: "chair starts with 'c'" },
    { id: 3, type: "mc", question: "This is ___ table.", options: ["a", "an"], answer: "a", hint: "table starts with 't'" },
    { id: 4, type: "fill", question: "I have ___ house.", answer: "a", hint: "house starts with 'h'" },
    { id: 5, type: "mc", question: "This is ___ kitchen.", options: ["a", "an"], answer: "a", hint: "kitchen starts with 'k'" },
    { id: 6, type: "fill", question: "I see ___ bedroom.", answer: "a", hint: "bedroom starts with 'b'" },
    { id: 7, type: "mc", question: "This is ___ bathroom.", options: ["a", "an"], answer: "a", hint: "bathroom starts with 'b'" },
    { id: 8, type: "fill", question: "I have ___ mystery.", answer: "a", hint: "mystery starts with 'm'" },
    { id: 9, type: "mc", question: "This is ___ living room.", options: ["a", "an"], answer: "a", hint: "living starts with 'l'" },
    { id: 10, type: "fill", question: "I see ___ big house.", answer: "a", hint: "big starts with 'b'" },

    // AN exercises (5)
    { id: 11, type: "mc", question: "This is ___ apple.", options: ["a", "an"], answer: "an", hint: "apple starts with 'a'" },
    { id: 12, type: "fill", question: "I see ___ egg.", answer: "an", hint: "egg starts with 'e'" },
    { id: 13, type: "mc", question: "This is ___ orange.", options: ["a", "an"], answer: "an", hint: "orange starts with 'o'" },
    { id: 14, type: "fill", question: "I have ___ umbrella.", answer: "an", hint: "umbrella starts with 'u'" },
    { id: 15, type: "mc", question: "This is ___ ice cream.", options: ["a", "an"], answer: "an", hint: "ice starts with 'i'" },

    // UNSCRAMBLE (5)
    { id: 16, type: "unscramble", question: "Order:", words: ["is", "This", "a", "bed"], answer: "This is a bed.", hint: "This is a" },
    { id: 17, type: "unscramble", question: "Order:", words: ["see", "I", "a", "chair"], answer: "I see a chair.", hint: "I see a" },
    { id: 18, type: "unscramble", question: "Order:", words: ["have", "I", "a", "house"], answer: "I have a house.", hint: "I have a" },
    { id: 19, type: "unscramble", question: "Order:", words: ["is", "This", "an", "apple"], answer: "This is an apple.", hint: "This is an" },
    { id: 20, type: "unscramble", question: "Order:", words: ["see", "I", "a", "table"], answer: "I see a table.", hint: "I see a" }
  ]
};
