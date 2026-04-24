export default {
  grammar_explanation: {
    title_en: "It is a [adjective] [noun]",
    title_vi: "Cấu trúc: It is a [tính từ] [danh từ]",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'It is a' then adjective then noun", example_en: "It is a big city. It is a small village.", example_vi: "Đó là một thành phố lớn. Đó là một ngôi làng nhỏ.", rule_vi: "Dùng 'It is a' rồi tính từ rồi danh từ" },
      { type: "rule", icon: "2️⃣", rule_en: "Adjective describes the noun: noisy city, tall building", example_en: "It is a noisy city. It is a tall building.", example_vi: "Đó là một thành phố ồn ào. Đó là một tòa nhà cao.", rule_vi: "Tính từ miêu tả danh từ: noisy city, tall building" },
      { type: "rule", icon: "3️⃣", rule_en: "Adjective comes BEFORE the noun", example_en: "a clean park (✓). a park clean (✗). a quiet street (✓).", example_vi: "a clean park (✓). a park clean (✗). a quiet street (✓).", rule_vi: "Tính từ đứng TRƯỚC danh từ" }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "It is ___ noisy city.", options: ["a", "an", "the"], answer: "a", hint: "before noisy" },
    { id: 2, type: "fill", question: "It is a ___ street.", answer: "busy", hint: "full of people" },
    { id: 3, type: "mc", question: "It is a ___ building.", options: ["tall", "busy", "noisy"], answer: "tall", hint: "very high" },
    { id: 4, type: "fill", question: "It is a ___ car.", answer: "modern", hint: "new" },
    { id: 5, type: "mc", question: "It is ___ busy street.", options: ["a", "an", "the"], answer: "a", hint: "before busy" },
    { id: 6, type: "fill", question: "It ___ a tall building.", answer: "is", hint: "to be" },
    { id: 7, type: "mc", question: "It is a noisy ___.", options: ["city", "street", "bus"], answer: "city", hint: "big town" },
    { id: 8, type: "fill", question: "It is a ___ bus.", answer: "yellow", hint: "a color" },
    { id: 9, type: "unscramble", question: "Order:", words: ["It", "is", "a", "busy", "street"], answer: "It is a busy street.", hint: "It is a" },
    { id: 10, type: "unscramble", question: "Order:", words: ["a", "tall", "It", "is", "building"], answer: "It is a tall building.", hint: "It is a" },
    { id: 11, type: "unscramble", question: "Order:", words: ["noisy", "is", "It", "a", "city"], answer: "It is a noisy city.", hint: "It is a" },
    { id: 12, type: "unscramble", question: "Order:", words: ["modern", "It", "a", "car", "is"], answer: "It is a modern car.", hint: "It is a" },
    { id: 13, type: "mc", question: "It is a fast ___.", options: ["car", "bus", "city"], answer: "car", hint: "vehicle" },
    { id: 14, type: "fill", question: "It is a busy ___.", answer: "street", hint: "road" },
    { id: 15, type: "mc", question: "It is ___ modern city.", options: ["a", "an", "the"], answer: "a", hint: "before modern" },
    { id: 16, type: "fill", question: "It ___ a noisy place.", answer: "is", hint: "to be" },
    { id: 17, type: "mc", question: "It is a ___ street.", options: ["busy", "tall", "heavy"], answer: "busy", hint: "full" },
    { id: 18, type: "fill", question: "It is a tall ___.", answer: "building", hint: "structure" },
    { id: 19, type: "unscramble", question: "Order:", words: ["is", "a", "It", "modern", "city"], answer: "It is a modern city.", hint: "It is a" },
    { id: 20, type: "unscramble", question: "Order:", words: ["It", "is", "a", "big", "bus"], answer: "It is a big bus.", hint: "It is a" }
  ]
};
