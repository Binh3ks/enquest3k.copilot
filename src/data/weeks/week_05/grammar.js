export default {
  grammar_explanation: {
    title_en: "Articles 'A/An' (Describing Things)",
    title_vi: "Mạo từ 'A/An' (Miêu tả Đồ vật)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'a' before consonant sounds: a sofa, a lamp", example_en: "There is a sofa in the living room. I see a lamp.", example_vi: "Có một chiếc sofa trong phòng khách. Tôi thấy một cây đèn.", rule_vi: "Dùng 'a' trước phụ âm: a sofa, a lamp" },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'an' before vowel sounds: an apple, an egg", example_en: "There is an oven in the kitchen. I eat an orange.", example_vi: "Có một cái lò nướng trong bếp. Tôi ăn một quả cam.", rule_vi: "Dùng 'an' trước nguyên âm: an apple, an egg" },
      { type: "rule", icon: "3️⃣", rule_en: "Pattern: This is a/an [noun]", example_en: "This is a bedroom. This is an armchair.", example_vi: "Đây là một phòng ngủ. Đây là một chiếc ghế bành.", rule_vi: "Cấu trúc: This is a/an [danh từ]" }
    ]
  },
  exercises: [
    // AFFIRMATIVE with A (8 exercises)
    { id: 1, type: "mc", question: "This is ___ sofa.", options: ["a", "an"], answer: "a", hint: "sofa starts with 's'" },
    { id: 2, type: "fill", question: "I see ___ lamp.", answer: "a", hint: "lamp starts with 'l'" },
    { id: 3, type: "mc", question: "There is ___ rug on the floor.", options: ["a", "an"], answer: "a", hint: "rug starts with 'r'" },
    { id: 4, type: "fill", question: "This is ___ mirror.", answer: "a", hint: "mirror starts with 'm'" },
    { id: 5, type: "mc", question: "I have ___ fridge.", options: ["a", "an"], answer: "a", hint: "fridge starts with 'f'" },
    { id: 6, type: "fill", question: "There is ___ cabinet in the kitchen.", answer: "a", hint: "cabinet starts with 'c'" },
    { id: 7, type: "mc", question: "This is ___ shelf.", options: ["a", "an"], answer: "a", hint: "shelf starts with 's'" },
    { id: 8, type: "fill", question: "I see ___ bedroom upstairs.", answer: "a", hint: "bedroom starts with 'b'" },

    // AFFIRMATIVE with AN (6 exercises)
    { id: 9, type: "mc", question: "This is ___ apple.", options: ["a", "an"], answer: "an", hint: "apple starts with 'a'" },
    { id: 10, type: "fill", question: "I see ___ egg.", answer: "an", hint: "egg starts with 'e'" },
    { id: 11, type: "mc", question: "There is ___ orange on the table.", options: ["a", "an"], answer: "an", hint: "orange starts with 'o'" },
    { id: 12, type: "fill", question: "This is ___ umbrella.", answer: "an", hint: "umbrella starts with 'u'" },
    { id: 13, type: "mc", question: "I have ___ elephant toy.", options: ["a", "an"], answer: "an", hint: "elephant starts with 'e'" },
    { id: 14, type: "fill", question: "There is ___ ice cream.", answer: "an", hint: "ice starts with 'i'" },

    // UNSCRAMBLE exercises (6 exercises)
    { id: 15, type: "unscramble", question: "Order:", words: ["is", "This", "a", "sofa"], answer: "This is a sofa.", hint: "This is a" },
    { id: 16, type: "unscramble", question: "Order:", words: ["see", "I", "a", "lamp"], answer: "I see a lamp.", hint: "I see a" },
    { id: 17, type: "unscramble", question: "Order:", words: ["is", "There", "a", "rug"], answer: "There is a rug.", hint: "There is a" },
    { id: 18, type: "unscramble", question: "Order:", words: ["is", "This", "an", "apple"], answer: "This is an apple.", hint: "This is an" },
    { id: 19, type: "unscramble", question: "Order:", words: ["have", "I", "a", "fridge"], answer: "I have a fridge.", hint: "I have a" },
    { id: 20, type: "unscramble", question: "Order:", words: ["is", "There", "a", "mirror"], answer: "There is a mirror.", hint: "There is a" }
  ]
};
