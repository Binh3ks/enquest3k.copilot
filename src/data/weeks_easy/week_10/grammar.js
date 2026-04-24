export default {
  grammar_explanation: {
    title_en: "Contrast with 'but'",
    title_vi: "Đối lập với 'but'",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'but' to show difference: The city is noisy, but the farm is quiet.", example_en: "The city is noisy, but the farm is quiet. The road is busy, but the path is empty.", example_vi: "Thành phố ồn ào, nhưng nông trại yên tĩnh. Đường bận rộn, nhưng con đường mòn vắng.", rule_vi: "Dùng 'but' để chỉ sự khác biệt: The city is noisy, but the farm is quiet." },
      { type: "rule", icon: "2️⃣", rule_en: "Pattern: [Place] is [adjective], but [place] is [adjective]", example_en: "The city is big, but the village is small. The park is clean, but the street is dirty.", example_vi: "Thành phố lớn, nhưng làng nhỏ. Công viên sạch, nhưng đường bẩn.", rule_vi: "Mẫu câu: [Nơi] is [tính từ], but [nơi] is [tính từ]" },
      { type: "rule", icon: "3️⃣", rule_en: "'But' connects two opposite ideas", example_en: "It is hot here, but it is cool there. I like cats, but I don't like dogs.", example_vi: "Ở đây nóng, nhưng ở đó mát. Tôi thích mèo, nhưng không thích chó.", rule_vi: "'But' nối hai ý tưởng đối lập" },
      { type: "rule", icon: "4️⃣", rule_en: "The city is big, but the farm is small.", example_en: "The city is big, but the farm is small. The school is near, but the library is far.", example_vi: "Thành phố lớn, nhưng nông trại nhỏ. Trường gần, nhưng thư viện xa.", rule_vi: "Thành phố lớn, nhưng trang trại nhỏ." }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "The city is noisy, ___ the farm is quiet.", options: ["and", "but", "or"], answer: "but", hint: "shows contrast" },
    { id: 2, type: "fill", question: "The farm is clean, ___ the city is dirty.", answer: "but", hint: "opposite" },
    { id: 3, type: "mc", question: "The city is busy, ___ the farm is peaceful.", options: ["and", "but", "or"], answer: "but", hint: "difference" },
    { id: 4, type: "fill", question: "The city is big, ___ the farm is small.", answer: "but", hint: "contrast" },
    { id: 5, type: "mc", question: "The farm is quiet, ___ the city is loud.", options: ["and", "but", "or"], answer: "but", hint: "opposite" },
    { id: 6, type: "fill", question: "The farm has animals, ___ the city has cars.", answer: "but", hint: "different" },
    { id: 7, type: "mc", question: "The countryside is clean, ___ the city is dirty.", options: ["and", "but", "or"], answer: "but", hint: "contrast" },
    { id: 8, type: "fill", question: "The city is crowded, ___ the farm is empty.", answer: "but", hint: "opposite" },
    { id: 9, type: "unscramble", question: "Order:", words: ["city", "The", "is", "noisy", "but", "the", "farm", "is", "quiet"], answer: "The city is noisy, but the farm is quiet.", hint: "The city is" },
    { id: 10, type: "unscramble", question: "Order:", words: ["farm", "The", "is", "clean"], answer: "The farm is clean.", hint: "The farm" },
    { id: 11, type: "unscramble", question: "Order:", words: ["see", "I", "a", "cow"], answer: "I see a cow.", hint: "I see" },
    { id: 12, type: "unscramble", question: "Order:", words: ["countryside", "The", "is", "peaceful"], answer: "The countryside is peaceful.", hint: "The countryside" },
    { id: 13, type: "mc", question: "The farm has cows, ___ the city has buses.", options: ["and", "but", "or"], answer: "but", hint: "different" },
    { id: 14, type: "fill", question: "The city is fast, ___ the farm is slow.", answer: "but", hint: "opposite" },
    { id: 15, type: "mc", question: "The farm is peaceful, ___ the city is busy.", options: ["and", "but", "or"], answer: "but", hint: "contrast" },
    { id: 16, type: "fill", question: "The countryside is green, ___ the city is grey.", answer: "but", hint: "different" },
    { id: 17, type: "mc", question: "I see animals on the farm.", options: ["yes", "no", "maybe"], answer: "yes", hint: "true" },
    { id: 18, type: "fill", question: "The farm has trees, ___ the city has buildings.", answer: "but", hint: "opposite" },
    { id: 19, type: "unscramble", question: "Order:", words: ["city", "The", "is", "big", "but", "the", "farm", "is", "small"], answer: "The city is big, but the farm is small.", hint: "The city is" },
    { id: 20, type: "unscramble", question: "Order:", words: ["I", "see", "a", "chicken"], answer: "I see a chicken.", hint: "I see" }
  ]
};
