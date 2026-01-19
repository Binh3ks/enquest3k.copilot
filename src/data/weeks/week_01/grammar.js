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
    // 30% AFFIRMATIVE (6 exercises)
    { id: 1, type: "fill", question: "I _____ a student.", answer: "am", hint: "I + am" },
    { id: 2, type: "mc", question: "She _____ my teacher.", options: ["am", "is", "are"], answer: "is", hint: "She + is" },
    { id: 3, type: "fill", question: "They _____ happy.", answer: "are", hint: "They + are" },
    { id: 4, type: "mc", question: "He _____ a student.", options: ["am", "is", "are"], answer: "is", hint: "He + is" },
    { id: 5, type: "fill", question: "We _____ in the classroom.", answer: "are", hint: "We + are" },
    { id: 6, type: "mc", question: "It _____ a book.", options: ["am", "is", "are"], answer: "is", hint: "It + is" },

    // 30% NEGATIVE (6 exercises)
    { id: 7, type: "fill", question: "I _____ not a teacher.", answer: "am", hint: "I + am + not" },
    { id: 8, type: "mc", question: "He _____ not sad.", options: ["am", "is", "are"], answer: "is", hint: "He + is + not" },
    { id: 9, type: "fill", question: "We _____ not at home.", answer: "are", hint: "We + are + not" },
    { id: 10, type: "mc", question: "They _____ not students.", options: ["am", "is", "are"], answer: "are", hint: "They + are + not" },
    { id: 11, type: "unscramble", question: "Order:", words: ["is", "She", "not", "my", "friend"], answer: "She is not my friend.", hint: "S + is + not" },
    { id: 12, type: "fill", question: "It _____ not a pen.", answer: "is", hint: "It + is + not" },

    // 40% QUESTIONS (8 exercises)
    { id: 13, type: "fill", question: "_____ you a student?", answer: "Are", hint: "Are + you" },
    { id: 14, type: "mc", question: "_____ he happy?", options: ["Am", "Is", "Are"], answer: "Is", hint: "Is + he" },
    { id: 15, type: "unscramble", question: "Order:", words: ["is", "What", "your", "name"], answer: "What is your name?", hint: "What + is" },
    { id: 16, type: "fill", question: "_____ she your teacher?", answer: "Is", hint: "Is + she" },
    { id: 17, type: "mc", question: "_____ they friends?", options: ["Am", "Is", "Are"], answer: "Are", hint: "Are + they" },
    { id: 18, type: "unscramble", question: "Order:", words: ["is", "this", "a", "book"], answer: "Is this a book?", hint: "Is + this" },
    { id: 19, type: "fill", question: "_____ I in the right room?", answer: "Am", hint: "Am + I" },
    { id: 20, type: "unscramble", question: "Order:", words: ["are", "How", "you"], answer: "How are you?", hint: "How + are" }
  ]
};
