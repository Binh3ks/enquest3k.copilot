export default {
  grammar_explanation: {
    title_en: "is vs has (Describing People)",
    title_vi: "is vs has (Miêu tả Người)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'is' for qualities: She is tall", rule_vi: "Dùng 'is' cho đặc điểm: She is tall" },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'has' for possession: She has long hair", rule_vi: "Dùng 'has' cho sở hữu: She has long hair" },
      { type: "rule", icon: "3️⃣", rule_en: "Negative: is not (isn't), does not have", rule_vi: "Phủ định: is not (isn't), does not have" }
    ]
  },
  exercises: [
    // 30% AFFIRMATIVE (6 exercises)
    { id: 1, type: "fill", question: "She _____ tall.", answer: "is", hint: "She + is" },
    { id: 2, type: "mc", question: "He _____ short hair.", options: ["is", "has", "am"], answer: "has", hint: "He + has" },
    { id: 3, type: "fill", question: "My sister _____ beautiful.", answer: "is", hint: "She + is" },
    { id: 4, type: "mc", question: "I _____ brown eyes.", options: ["is", "has", "have"], answer: "have", hint: "I + have" },
    { id: 5, type: "fill", question: "They _____ curly hair.", answer: "have", hint: "They + have" },
    { id: 6, type: "mc", question: "You _____ very tall.", options: ["is", "are", "has"], answer: "are", hint: "You + are" },

    // 30% NEGATIVE (6 exercises)
    { id: 7, type: "fill", question: "He _____ not short.", answer: "is", hint: "He + is + not" },
    { id: 8, type: "mc", question: "I do _____ have glasses.", options: ["no", "not", "isn't"], answer: "not", hint: "do + not" },
    { id: 9, type: "fill", question: "She does _____ have long hair.", answer: "not", hint: "does + not" },
    { id: 10, type: "mc", question: "They _____ not tall.", options: ["is", "are", "has"], answer: "are", hint: "They + are + not" },
    { id: 11, type: "unscramble", question: "Order:", words: ["not", "I", "am", "short"], answer: "I am not short.", hint: "I am not" },
    { id: 12, type: "fill", question: "My friend _____ not wear glasses.", answer: "does", hint: "does + not" },

    // 40% QUESTIONS (8 exercises)
    { id: 13, type: "fill", question: "_____ she tall?", answer: "Is", hint: "Is + she" },
    { id: 14, type: "mc", question: "_____ you have long hair?", options: ["Is", "Do", "Are"], answer: "Do", hint: "Do + you" },
    { id: 15, type: "unscramble", question: "Order:", words: ["is", "What", "color", "your", "hair"], answer: "What color is your hair?", hint: "What color" },
    { id: 16, type: "fill", question: "_____ he wear glasses?", answer: "Does", hint: "Does + he" },
    { id: 17, type: "mc", question: "_____ they short or tall?", options: ["Am", "Is", "Are"], answer: "Are", hint: "Are + they" },
    { id: 18, type: "unscramble", question: "Order:", words: ["have", "Do", "you", "brown", "eyes"], answer: "Do you have brown eyes?", hint: "Do you" },
    { id: 19, type: "fill", question: "_____ your hair curly?", answer: "Is", hint: "Is + your hair" },
    { id: 20, type: "mc", question: "What _____ she look like?", options: ["is", "does", "has"], answer: "does", hint: "What does" }
  ]
};
