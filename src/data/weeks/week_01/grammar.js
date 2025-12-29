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
    { id: 1, type: "mc", question: "I _____ a student.", options: ["am", "is", "are"], answer: "am", hint: "I + am" },
    { id: 2, type: "mc", question: "She _____ my teacher.", options: ["am", "is", "are"], answer: "is", hint: "She + is" },
    { id: 3, type: "mc", question: "They _____ in the classroom.", options: ["am", "is", "are"], answer: "are", hint: "They + are" },
    { id: 4, type: "fill", question: "We _____ (be) students.", answer: "are", hint: "We + are" },
    { id: 5, type: "fill", question: "He _____ (be) a scientist.", answer: "is", hint: "He + is" },
    { id: 6, type: "fill", question: "I _____ (be) happy.", answer: "am", hint: "I + am" },
    { id: 7, type: "unscramble", question: "Order:", words: ["is", "My teacher", "kind"], answer: "My teacher is kind.", hint: "S + V + adj" },
    { id: 8, type: "unscramble", question: "Order:", words: ["are", "We", "at school"], answer: "We are at school.", hint: "S + V + place" },
    { id: 9, type: "mc", question: "You _____ a good student.", options: ["am", "is", "are"], answer: "are", hint: "You + are" },
    { id: 10, type: "mc", question: "It _____ a big backpack.", options: ["am", "is", "are"], answer: "is", hint: "It + is" },
    { id: 11, type: "fill", question: "The book _____ (be) on the desk.", answer: "is", hint: "Singular + is" },
    { id: 12, type: "mc", question: "My friends _____ kind.", options: ["am", "is", "are"], answer: "are", hint: "Plural + are" },
    { id: 13, type: "unscramble", question: "Order:", words: ["am", "I", "Alex"], answer: "I am Alex.", hint: "S + V + name" },
    { id: 14, type: "fill", question: "You and I _____ (be) classmates.", answer: "are", hint: "Plural + are" },
    { id: 15, type: "mc", question: "The teacher _____ in the classroom.", options: ["am", "is", "are"], answer: "is", hint: "Singular + is" },
    { id: 16, type: "fill", question: "They _____ (be) scientists.", answer: "are", hint: "They + are" },
    { id: 17, type: "unscramble", question: "Order:", words: ["is", "My school", "big"], answer: "My school is big.", hint: "S + V + adj" },
    { id: 18, type: "mc", question: "I _____ in the library.", options: ["am", "is", "are"], answer: "am", hint: "I + am" },
    { id: 19, type: "fill", question: "She and he _____ (be) students.", answer: "are", hint: "Plural + are" },
    { id: 20, type: "mc", question: "The books _____ new.", options: ["am", "is", "are"], answer: "are", hint: "Plural + are" }
  ]
};
