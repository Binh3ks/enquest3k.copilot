export default {
  grammar_explanation: {
    title_en: "Using 'at' with Places",
    title_vi: "Dùng 'at' với Địa điểm",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'at' with places: at the park", rule_vi: "Dùng 'at' với địa điểm: at the park" },
      { type: "rule", icon: "2️⃣", rule_en: "Say: I play at the park", rule_vi: "Nói: I play at the park" },
      { type: "rule", icon: "3️⃣", rule_en: "Say: I read at the library", rule_vi: "Nói: I read at the library" },
      { type: "rule", icon: "4️⃣", rule_en: "Say: I buy at the store", rule_vi: "Nói: I buy at the store" }
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
    { id: 15, type: "unscramble", question: "Order:", words: ["I", "go", "to", "the", "zoo"], answer: "I go to the zoo.", hint: "I go" }
  ]
};
