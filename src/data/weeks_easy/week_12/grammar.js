export default {
  grammar_explanation: {
    title_en: "I can / I can't (Abilities)",
    title_vi: "Tôi có thể / Tôi không thể (Khả năng)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'I can' to talk about abilities: I can swim.", rule_vi: "Dùng 'I can' để nói về khả năng: Tôi có thể bơi." },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'I can't' (cannot) for things you cannot do: I can't fly.", rule_vi: "Dùng 'I can't' cho việc không thể làm: Tôi không thể bay." },
      { type: "rule", icon: "3️⃣", rule_en: "Use 'Can you...?' to ask about abilities: Can you dance?", rule_vi: "Dùng 'Can you...?' để hỏi về khả năng: Bạn có thể nhảy không?" },
      { type: "rule", icon: "4️⃣", rule_en: "After 'can', always use base verb (not -ing or -s): He can run.", rule_vi: "Sau 'can', luôn dùng động từ gốc: Anh ấy có thể chạy." }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "Can you ___ English?", options: ["speak", "speaking", "speaks"], answer: "speak", hint: "ability" },
    { id: 2, type: "fill", question: "I ___ swim very well.", answer: "", hint: "positive form" },
    { id: 3, type: "mc", question: "She ___ play the piano.", options: ["can", "cans", "caning"], answer: "can", hint: "singular subject" },
    { id: 4, type: "fill", question: "He can ___ very fast.", answer: "", hint: "verb after can" },
    { id: 5, type: "mc", question: "Can birds ___?", options: ["fly", "flies", "flying"], answer: "fly", hint: "question form" },
    { id: 6, type: "fill", question: "They ___ dance at the party.", answer: "", hint: "ability" },
    { id: 7, type: "mc", question: "I ___ ride a bike.", options: ["can", "am", "is"], answer: "can", hint: "ability verb" },
    { id: 8, type: "fill", question: "Can you ___ high?", answer: "", hint: "question" },
    { id: 9, type: "unscramble", question: "Order:", words: ["can", "I", "sing", "songs"], answer: "I can sing songs.", hint: "I can" },
    { id: 10, type: "unscramble", question: "Order:", words: ["you", "Can", "draw", "?"], answer: "Can you draw?", hint: "Can you" },
    { id: 11, type: "mc", question: "She can ___ delicious food.", options: ["cook", "cooks", "cooking"], answer: "cook", hint: "verb" },
    { id: 12, type: "fill", question: "We ___ play games together.", answer: "", hint: "plural subject" },
    { id: 13, type: "mc", question: "Can he ___?", options: ["climb", "climbs", "climbing"], answer: "climb", hint: "question" },
    { id: 14, type: "fill", question: "You can ___ in the pool.", answer: "", hint: "activity" },
    { id: 15, type: "mc", question: "They can ___ on stage.", options: ["dance", "dances", "dancing"], answer: "dance", hint: "plural" },
    { id: 16, type: "fill", question: "I can ___ pictures.", answer: "", hint: "verb" },
    { id: 17, type: "unscramble", question: "Order:", words: ["can", "swim", "fish", "Fish"], answer: "Fish can swim.", hint: "Fish can" },
    { id: 18, type: "unscramble", question: "Order:", words: ["ride", "can", "I", "a", "bike"], answer: "I can ride a bike.", hint: "I can ride" },
    { id: 19, type: "mc", question: "Can you ___ me?", options: ["help", "helps", "helping"], answer: "help", hint: "request" },
    { id: 20, type: "fill", question: "Dogs can ___ loudly.", answer: "", hint: "ability" }
  ]
};