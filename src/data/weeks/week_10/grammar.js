export default {
  grammar_explanation: {
    title_en: "Contrast with 'but'",
    title_vi: "Đối lập với 'but'",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'but' to show difference: The city is noisy, but the farm is quiet.", rule_vi: "Dùng 'but' để chỉ sự khác biệt: The city is noisy, but the farm is quiet." },
      { type: "rule", icon: "2️⃣", rule_en: "Pattern: [Place] is [adjective], but [place] is [adjective]", rule_vi: "Mẫu câu: [Nơi] is [tính từ], but [nơi] is [tính từ]" },
      { type: "rule", icon: "3️⃣", rule_en: "'But' connects two opposite ideas in one sentence", rule_vi: "'But' nối hai ý tưởng đối lập trong một câu" },
      { type: "rule", icon: "4️⃣", rule_en: "Use comma before 'but': The city is big, but the farm is small.", rule_vi: "Dùng dấu phẩy trước 'but': The city is big, but the farm is small." }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "The city is noisy, ___ the farm is quiet.", options: ["and", "but", "or"], answer: "but", hint: "shows contrast" },
    { id: 2, type: "fill", question: "The city is dirty, ___ the countryside is clean.", answer: "but", hint: "opposite ideas" },
    { id: 3, type: "mc", question: "The farm is peaceful, ___ the city is busy.", options: ["and", "but", "or"], answer: "but", hint: "shows difference" },
    { id: 4, type: "fill", question: "The city is big, ___ the farm is small.", answer: "but", hint: "contrast" },
    { id: 5, type: "mc", question: "The farm has animals, ___ the city has cars.", options: ["and", "but", "or"], answer: "but", hint: "showing contrast" },
    { id: 6, type: "fill", question: "The countryside has trees, ___ the city has buildings.", answer: "but", hint: "opposite" },
    { id: 7, type: "mc", question: "The city is crowded, ___ the farm is empty.", options: ["and", "but", "or"], answer: "but", hint: "contrast" },
    { id: 8, type: "fill", question: "The farm is clean, ___ the city is dirty.", answer: "but", hint: "difference" },
    { id: 9, type: "unscramble", question: "Order:", words: ["city", "The", "is", "noisy", "but", "the", "farm", "is", "quiet"], answer: "The city is noisy, but the farm is quiet.", hint: "The city is" },
    { id: 10, type: "unscramble", question: "Order:", words: ["farm", "The", "is", "peaceful", "but", "the", "city", "is", "busy"], answer: "The farm is peaceful, but the city is busy.", hint: "The farm is" },
    { id: 11, type: "unscramble", question: "Order:", words: ["countryside", "The", "is", "clean", "but", "the", "city", "is", "dirty"], answer: "The countryside is clean, but the city is dirty.", hint: "The countryside is" },
    { id: 12, type: "unscramble", question: "Order:", words: ["city", "The", "is", "big", "but", "the", "farm", "is", "small"], answer: "The city is big, but the farm is small.", hint: "The city is" },
    { id: 13, type: "mc", question: "The farm has cows, ___ the city has people.", options: ["and", "but", "or"], answer: "but", hint: "contrast" },
    { id: 14, type: "fill", question: "The city is fast, ___ the farm is slow.", answer: "but", hint: "opposite" },
    { id: 15, type: "mc", question: "The countryside is green, ___ the city is grey.", options: ["and", "but", "or"], answer: "but", hint: "showing difference" },
    { id: 16, type: "fill", question: "The farm is quiet, ___ the city is loud.", answer: "but", hint: "contrast" },
    { id: 17, type: "mc", question: "The city has buildings, ___ the farm has fields.", options: ["and", "but", "or"], answer: "but", hint: "opposite" },
    { id: 18, type: "fill", question: "The farm has chickens, ___ the city has buses.", answer: "but", hint: "contrast" },
    { id: 19, type: "unscramble", question: "Order:", words: ["city", "The", "is", "crowded", "but", "the", "farm", "is", "empty"], answer: "The city is crowded, but the farm is empty.", hint: "The city is" },
    { id: 20, type: "unscramble", question: "Order:", words: ["farm", "The", "has", "trees", "but", "the", "city", "has", "cars"], answer: "The farm has trees, but the city has cars.", hint: "The farm has" }
  ]
};
