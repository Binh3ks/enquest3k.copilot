export default {
  grammar_explanation: {
    title_en: "Can / Can't (Abilities)",
    title_vi: "Can / Can't (Khả năng)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'can' to say you are able to do something: I can sing.", rule_vi: "Dùng 'can' để nói bạn có thể làm gì: I can sing." },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'can't' or 'cannot' to say you are not able: I can't swim.", rule_vi: "Dùng 'can't' hoặc 'cannot' để nói bạn không thể: I can't swim." },
      { type: "rule", icon: "3️⃣", rule_en: "After 'can' or 'can't', use base verb (no -s, no -ing): She can dance.", rule_vi: "Sau 'can' hoặc 'can't', dùng động từ nguyên thể: She can dance." },
      { type: "rule", icon: "4️⃣", rule_en: "Questions: Can + subject + verb: Can you sing?", rule_vi: "Câu hỏi: Can + chủ ngữ + động từ: Can you sing?" }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "I ___ sing very well.", options: ["can", "cans", "caning"], answer: "can", hint: "ability" },
    { id: 2, type: "fill", question: "She ___ dance beautifully.", answer: "can", hint: "ability" },
    { id: 3, type: "mc", question: "He ___ run fast.", options: ["can't", "cannot", "can not"], answer: "can't", hint: "negative, short form" },
    { id: 4, type: "fill", question: "___ you swim?", answer: "Can", hint: "question" },
    { id: 5, type: "mc", question: "They ___ play the piano.", options: ["can", "cans", "are can"], answer: "can", hint: "ability" },
    { id: 6, type: "fill", question: "I ___ climb trees easily.", answer: "can", hint: "ability" },
    { id: 7, type: "mc", question: "We ___ cook dinner.", options: ["can", "can to", "cans"], answer: "can", hint: "no 'to' after can" },
    { id: 8, type: "fill", question: "Can she ___? (draw)", answer: "draw", hint: "base verb" },
    { id: 9, type: "unscramble", question: "Order:", words: ["can", "I", "sing"], answer: "I can sing.", hint: "I can" },
    { id: 10, type: "unscramble", question: "Order:", words: ["Can", "you", "dance", "?"], answer: "Can you dance?", hint: "Can you" },
    { id: 11, type: "unscramble", question: "Order:", words: ["She", "can't", "swim"], answer: "She can't swim.", hint: "She can't" },
    { id: 12, type: "unscramble", question: "Order:", words: ["ride", "a", "bike", "He", "can"], answer: "He can ride a bike.", hint: "He can" },
    { id: 13, type: "mc", question: "Anna ___ jump high.", options: ["can", "cans", "is can"], answer: "can", hint: "ability" },
    { id: 14, type: "fill", question: "They ___ run fast.", answer: "can't", hint: "negative" },
    { id: 15, type: "mc", question: "___ he play the piano?", options: ["Can", "Cans", "Is can"], answer: "Can", hint: "question" },
    { id: 16, type: "fill", question: "We ___ ___ cook well.", answer: "can't", hint: "negative" },
    { id: 17, type: "mc", question: "I can ___ pictures.", options: ["draw", "draws", "drawing"], answer: "draw", hint: "base verb" },
    { id: 18, type: "fill", question: "Can they ___ songs? (sing)", answer: "sing", hint: "base verb" },
    { id: 19, type: "unscramble", question: "Order:", words: ["swim", "can", "like", "a", "fish", "I"], answer: "I can swim like a fish.", hint: "I can swim" },
    { id: 20, type: "unscramble", question: "Order:", words: ["Can", "climb", "you", "trees", "?"], answer: "Can you climb trees?", hint: "Can you climb" }
  ]
};
