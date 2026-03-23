export default {
  grammar_explanation: {
    title_en: "Cause and Effect: 'It is [weather], so I am wearing [clothes].'",
    title_vi: "Quan hệ nhân quả: 'Trời đang [thời tiết], vì vậy tôi đang mặc [quần áo].'",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'so' to connect the weather cause to the clothing effect.", rule_vi: "Dùng 'so' để kết nối nguyên nhân thời tiết với hiệu quả quần áo." },
      { type: "rule", icon: "2️⃣", rule_en: "Pattern: It is [weather], so I am wearing [clothes].", rule_vi: "Mẫu câu: Trời đang [thời tiết], vì vậy tôi đang mặc [quần áo]." },
      { type: "rule", icon: "3️⃣", rule_en: "The weather part uses Present Simple: It is raining / It is cold.", rule_vi: "Phần thời tiết dùng Present Simple: It is raining / It is cold." },
      { type: "rule", icon: "4️⃣", rule_en: "The clothing part uses Present Continuous: I am wearing a coat.", rule_vi: "Phần quần áo dùng Present Continuous: I am wearing a coat." }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "It is raining, ___ I am wearing boots.", answer: "so", hint: "connecting cause and effect" },
    { id: 2, type: "fill", question: "It is cold, so I am ___ (wear) a coat.", answer: "wearing", hint: "Present Continuous" },
    { id: 3, type: "fill", question: "It is sunny, so she is ___ (wear) a hat.", answer: "wearing", hint: "she + is" },
    { id: 4, type: "fill", question: "It is ___ (rain), so I am carrying my umbrella.", answer: "raining", hint: "add -ing" },
    { id: 5, type: "fill", question: "It is cold and ___ (snow), so they are wearing boots.", answer: "snowing", hint: "add -ing" },
    { id: 6, type: "mc", question: "It is raining, ___ she is wearing a coat.", options: ["but", "so", "and"], answer: "so", hint: "cause-effect connector" },
    { id: 7, type: "mc", question: "It is ___, so I am wearing a hat.", options: ["sunny", "raining", "cold"], answer: "sunny", hint: "why wear a hat outdoors?" },
    { id: 8, type: "fill", question: "It is warm, so we ___ (not wear) heavy coats.", answer: "are not wearing", hint: "negative Present Continuous" },
    { id: 9, type: "fill", question: "It is ___ (cold) today, so students are wearing coats.", answer: "cold", hint: "adjective for temperature" },
    { id: 10, type: "mc", question: "It is raining, so he ___ an umbrella.", options: ["carries", "is carrying", "carry"], answer: "is carrying", hint: "Present Continuous happening now" },
    { id: 11, type: "fill", question: "The ___ (evaporate) of water causes clouds to form.", answer: "evaporation", hint: "noun form of evaporate" },
    { id: 12, type: "mc", question: "Rain and snow are both types of ___.", options: ["atmosphere", "precipitation", "evaporation"], answer: "precipitation", hint: "water falling from clouds" },
    { id: 13, type: "fill", question: "Clouds form high in the ___.", answer: "atmosphere", hint: "the air around Earth" },
    { id: 14, type: "unscramble", question: "Order:", words: ["raining", "It", "is", "so", "am", "I", "wearing", "a", "coat"], answer: "It is raining so I am wearing a coat.", hint: "It is..." },
    { id: 15, type: "unscramble", question: "Order:", words: ["sunny", "is", "It", "so", "is", "she", "wearing", "a", "hat"], answer: "It is sunny so she is wearing a hat.", hint: "It is sunny..." },
    { id: 16, type: "fill", question: "It is cold, ___ I am wearing my boots.", answer: "so", hint: "cause-effect word" },
    { id: 17, type: "mc", question: "What do you wear on a rainy day?", options: ["shorts and sandals", "coat and boots", "summer dress"], answer: "coat and boots", hint: "to stay dry and warm" },
    { id: 18, type: "fill", question: "It is snowing, so they ___ (wear) warm coats.", answer: "are wearing", hint: "they + are" },
    { id: 19, type: "unscramble", question: "Order:", words: ["cold", "is", "It", "so", "wearing", "am", "I", "my", "coat"], answer: "It is cold so I am wearing my coat.", hint: "It is cold..." },
    { id: 20, type: "fill", question: "It is warm and ___ (sun) today, so I am wearing a hat.", answer: "sunny", hint: "adjective from sun" }
  ]
};
