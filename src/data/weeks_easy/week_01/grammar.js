export default {
  grammar_explanation: {
    title_en: "Subject Pronouns & Verb to be",
    title_vi: "Đại từ nhân xưng chủ ngữ & Động từ to be",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "I + AM", rule_vi: "I + AM (Tôi + là)" },
      { type: "rule", icon: "2️⃣", rule_en: "You / We / They + ARE", rule_vi: "You / We / They + ARE (Bạn / Chúng tôi / Họ + là)" },
      { type: "rule", icon: "3️⃣", rule_en: "He / She / It + IS", rule_vi: "He / She / It + IS (Anh ấy / Cô ấy / Nó + là)" }
    ]
  },
  exercises: [
    // 30% AFFIRMATIVE (6 exercises) - EASIER
    { id: 1, type: "fill", question: "I _____ Lily.", answer: "am", hint: "I + am" },
    { id: 2, type: "mc", question: "She _____ happy.", options: ["am", "is", "are"], answer: "is", hint: "She + is" },
    { id: 3, type: "fill", question: "You _____ my friend.", answer: "are", hint: "You + are" },
    { id: 4, type: "mc", question: "It _____ red.", options: ["am", "is", "are"], answer: "is", hint: "It + is" },
    { id: 5, type: "fill", question: "We _____ at school.", answer: "are", hint: "We + are" },
    { id: 6, type: "mc", question: "He _____ Tom.", options: ["am", "is", "are"], answer: "is", hint: "He + is" },

    // 30% NEGATIVE (6 exercises) - EASIER
    { id: 7, type: "fill", question: "I _____ not sad.", answer: "am", hint: "I + am + not" },
    { id: 8, type: "mc", question: "It _____ not big.", options: ["am", "is", "are"], answer: "is", hint: "It + is + not" },
    { id: 9, type: "fill", question: "You _____ not here.", answer: "are", hint: "You + are + not" },
    { id: 10, type: "mc", question: "She _____ not a teacher.", options: ["am", "is", "are"], answer: "is", hint: "She + is + not" },
    { id: 11, type: "unscramble", question: "Order:", words: ["not", "We", "are", "home"], answer: "We are not home.", hint: "We + are + not" },
    { id: 12, type: "fill", question: "They _____ not bad.", answer: "are", hint: "They + are + not" },

    // 40% QUESTIONS (8 exercises) - EASIER
    { id: 13, type: "fill", question: "_____ you OK?", answer: "Are", hint: "Are + you" },
    { id: 14, type: "mc", question: "_____ it a pen?", options: ["Am", "Is", "Are"], answer: "Is", hint: "Is + it" },
    { id: 15, type: "unscramble", question: "Order:", words: ["your", "What", "is", "name"], answer: "What is your name?", hint: "What + is" },
    { id: 16, type: "fill", question: "_____ I late?", answer: "Am", hint: "Am + I" },
    { id: 17, type: "mc", question: "_____ she nice?", options: ["Am", "Is", "Are"], answer: "Is", hint: "Is + she" },
    { id: 18, type: "unscramble", question: "Order:", words: ["a", "this", "Is", "bag"], answer: "Is this a bag?", hint: "Is + this" },
    { id: 19, type: "fill", question: "_____ they here?", answer: "Are", hint: "Are + they" },
    { id: 20, type: "mc", question: "_____ you happy?", options: ["Am", "Is", "Are"], answer: "Are", hint: "Are + you" }
  ]
};
