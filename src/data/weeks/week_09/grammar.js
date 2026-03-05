export default {
  grammar_explanation: {
    title_en: "It is a [adjective] [noun]",
    title_vi: "Cấu trúc: It is a [tính từ] [danh từ]",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'It is a' before adjective + noun: It is a busy street", rule_vi: "Dùng 'It is a' trước tính từ + danh từ: It is a busy street" },
      { type: "rule", icon: "2️⃣", rule_en: "Adjectives describe nouns: noisy city, tall building", rule_vi: "Tính từ miêu tả danh từ: noisy city, tall building" },
      { type: "rule", icon: "3️⃣", rule_en: "Adjective comes BEFORE the noun: a modern car (NOT a car modern)", rule_vi: "Tính từ đứng TRƯỚC danh từ: a modern car (KHÔNG PHẢI a car modern)" },
      { type: "rule", icon: "4️⃣", rule_en: "Use 'a' before consonant sounds: a busy street, a tall building", rule_vi: "Dùng 'a' trước âm phụ âm: a busy street, a tall building" }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "It is ___ noisy city.", options: ["a", "an", "the"], answer: "a", hint: "consonant sound" },
    { id: 2, type: "fill", question: "It is a ___ street.", answer: "busy", hint: "full of people" },
    { id: 3, type: "mc", question: "It is a ___ building.", options: ["tall", "busy", "noisy"], answer: "tall", hint: "very high" },
    { id: 4, type: "fill", question: "It is a ___ car.", answer: "modern", hint: "new style" },
    { id: 5, type: "mc", question: "It is ___ busy traffic.", options: ["a", "an", "the"], answer: "a", hint: "before busy" },
    { id: 6, type: "fill", question: "It ___ a tall building.", answer: "is", hint: "to be verb" },
    { id: 7, type: "mc", question: "It is a noisy ___.", options: ["city", "street", "bus"], answer: "city", hint: "all correct, pick city" },
    { id: 8, type: "fill", question: "It is a ___ bus.", answer: "yellow", hint: "a color, school transport" },
    { id: 9, type: "unscramble", question: "Order:", words: ["It", "is", "a", "busy", "street"], answer: "It is a busy street.", hint: "It is a" },
    { id: 10, type: "unscramble", question: "Order:", words: ["a", "tall", "It", "is", "building"], answer: "It is a tall building.", hint: "It is a" },
    { id: 11, type: "unscramble", question: "Order:", words: ["noisy", "is", "It", "a", "city"], answer: "It is a noisy city.", hint: "It is a" },
    { id: 12, type: "unscramble", question: "Order:", words: ["modern", "It", "a", "car", "is"], answer: "It is a modern car.", hint: "It is a" },
    { id: 13, type: "mc", question: "It is a fast ___.", options: ["car", "bus", "traffic"], answer: "car", hint: "vehicle" },
    { id: 14, type: "fill", question: "It is a ___ street.", answer: "noisy", hint: "lots of sound" },
    { id: 15, type: "mc", question: "It is ___ modern building.", options: ["a", "an", "the"], answer: "a", hint: "before modern" },
    { id: 16, type: "fill", question: "It is ___ heavy traffic.", answer: "a", hint: "article before heavy" },
    { id: 17, type: "mc", question: "It is a busy ___.", options: ["street", "building", "car"], answer: "street", hint: "road in city" },
    { id: 18, type: "fill", question: "It is a tall ___.", answer: "building", hint: "structure in city" },
    { id: 19, type: "unscramble", question: "Order:", words: ["heavy", "traffic", "It", "is", "a"], answer: "It is a heavy traffic.", hint: "It is a" },
    { id: 20, type: "unscramble", question: "Order:", words: ["is", "a", "It", "modern", "city"], answer: "It is a modern city.", hint: "It is a" }
  ]
};
