export default {
  grammar_explanation: {
    title_en: "Modal 'can' for Abilities",
    title_vi: "Động từ khuyết thiếu 'can' cho khả năng",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'can' to talk about abilities: I can sing, I can dance", rule_vi: "Dùng 'can' để nói về khả năng: I can sing, I can dance" },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'can't' for things you cannot do: I can't fly", rule_vi: "Dùng 'can't' cho những điều bạn không thể làm: I can't fly" },
      { type: "rule", icon: "3️⃣", rule_en: "Pattern: I can + [verb]", rule_vi: "Mẫu câu: I can + [động từ]" },
      { type: "rule", icon: "4️⃣", rule_en: "Example: I can sing well, I can draw pictures", rule_vi: "Ví dụ: I can sing well, I can draw pictures" }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "I ___ sing a song.", answer: "can", hint: "ability modal" },
    { id: 2, type: "fill", question: "I ___ dance to music.", answer: "can", hint: "ability" },
    { id: 3, type: "fill", question: "I ___ run very fast.", answer: "can", hint: "ability" },
    { id: 4, type: "mc", question: "I ___ jump high.", options: ["can", "do", "am"], answer: "can", hint: "ability modal" },
    { id: 5, type: "fill", question: "I ___ draw pictures.", answer: "can", hint: "ability" },
    { id: 6, type: "mc", question: "I ___ swim in the pool.", options: ["can", "go", "have"], answer: "can", hint: "ability" },
    { id: 7, type: "fill", question: "I ___ ride a bike.", answer: "can", hint: "ability" },
    { id: 8, type: "mc", question: "___ you sing?", options: ["Can", "Do", "Are"], answer: "Can", hint: "ability question" },
    { id: 9, type: "fill", question: "I ___ fly.", answer: "can't", hint: "negative ability" },
    { id: 10, type: "mc", question: "I ___ climb trees.", options: ["can", "do", "am"], answer: "can", hint: "ability" },
    { id: 11, type: "unscramble", question: "Order:", words: ["I", "can", "sing"], answer: "I can sing.", hint: "I can" },
    { id: 12, type: "unscramble", question: "Order:", words: ["I", "can", "dance", "well"], answer: "I can dance well.", hint: "I can dance" },
    { id: 13, type: "unscramble", question: "Order:", words: ["Can", "you", "run", "fast"], answer: "Can you run fast?", hint: "Can you" },
    { id: 14, type: "unscramble", question: "Order:", words: ["I", "can", "draw", "pictures"], answer: "I can draw pictures.", hint: "I can draw" },
    { id: 15, type: "unscramble", question: "Order:", words: ["I", "can", "jump", "high"], answer: "I can jump high.", hint: "I can jump" },
    { id: 16, type: "mc", question: "I ___ cook food.", options: ["can", "do", "am"], answer: "can", hint: "ability" },
    { id: 17, type: "fill", question: "I ___ play soccer well.", answer: "can", hint: "ability" },
    { id: 18, type: "mc", question: "___ you dance?", options: ["Can", "Do", "Are"], answer: "Can", hint: "ability question" },
    { id: 19, type: "unscramble", question: "Order:", words: ["I", "can", "ride", "a", "bike"], answer: "I can ride a bike.", hint: "I can ride" },
    { id: 20, type: "unscramble", question: "Order:", words: ["I", "can", "swim", "fast"], answer: "I can swim fast.", hint: "I can swim" }
  ]
};
