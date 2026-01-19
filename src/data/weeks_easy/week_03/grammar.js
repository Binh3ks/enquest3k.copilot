export default {
  grammar_explanation: {
    title_en: "is vs has (Easy)",
    title_vi: "is vs has (Dễ)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "I am tall.", rule_vi: "Tôi cao." },
      { type: "rule", icon: "2️⃣", rule_en: "I have long hair.", rule_vi: "Tôi có tóc dài." },
      { type: "rule", icon: "3️⃣", rule_en: "I am not short.", rule_vi: "Tôi không thấp." }
    ]
  },
  exercises: [
    // 30% AFFIRMATIVE (6 exercises)
    { id: 1, type: "fill", question: "I _____ tall.", answer: "am", hint: "I + am" },
    { id: 2, type: "mc", question: "She _____ long hair.", options: ["is", "has", "am"], answer: "has", hint: "She + has" },
    { id: 3, type: "fill", question: "He _____ short.", answer: "is", hint: "He + is" },
    { id: 4, type: "mc", question: "My mom _____ glasses.", options: ["is", "has", "are"], answer: "has", hint: "She + has" },
    { id: 5, type: "fill", question: "I _____ brown eyes.", answer: "have", hint: "I + have" },
    { id: 6, type: "mc", question: "You _____ a nice smile.", options: ["is", "has", "have"], answer: "have", hint: "You + have" },

    // 30% NEGATIVE (6 exercises)
    { id: 7, type: "fill", question: "I _____ not tall.", answer: "am", hint: "I + am + not" },
    { id: 8, type: "mc", question: "She does _____ have glasses.", options: ["no", "not", "isn't"], answer: "not", hint: "does + not" },
    { id: 9, type: "fill", question: "He is _____ short.", answer: "not", hint: "is + not" },
    { id: 10, type: "mc", question: "I do _____ wear glasses.", options: ["no", "not", "isn't"], answer: "not", hint: "do + not" },
    { id: 11, type: "unscramble", question: "Order:", words: ["not", "I", "am", "tall"], answer: "I am not tall.", hint: "I am not" },
    { id: 12, type: "fill", question: "My hair is _____ curly.", answer: "not", hint: "is + not" },

    // 40% QUESTIONS (8 exercises)
    { id: 13, type: "fill", question: "_____ you tall?", answer: "Are", hint: "Are + you" },
    { id: 14, type: "mc", question: "_____ she have long hair?", options: ["Is", "Do", "Does"], answer: "Does", hint: "Does + she" },
    { id: 15, type: "unscramble", question: "Order:", words: ["Is", "he", "short"], answer: "Is he short?", hint: "Is + he" },
    { id: 16, type: "fill", question: "_____ you wear glasses?", answer: "Do", hint: "Do + you" },
    { id: 17, type: "mc", question: "What color _____ your hair?", options: ["am", "is", "are"], answer: "is", hint: "What color + is" },
    { id: 18, type: "unscramble", question: "Order:", words: ["Do", "you", "have", "brown", "eyes"], answer: "Do you have brown eyes?", hint: "Do you" },
    { id: 19, type: "fill", question: "_____ your hair curly?", answer: "Is", hint: "Is + your hair" },
    { id: 20, type: "mc", question: "_____ he tall or short?", options: ["Am", "Is", "Are"], answer: "Is", hint: "Is + he" }
  ]
};
