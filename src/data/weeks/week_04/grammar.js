export default {
  grammar_explanation: {
    title_en: "I like + V-ing (Expressing Preferences)",
    title_vi: "I like + V-ing (Diễn đạt Sở thích)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Add -ing to verbs after 'like': I like playing", rule_vi: "Thêm -ing vào động từ sau 'like': I like playing" },
      { type: "rule", icon: "2️⃣", rule_en: "Negative: I don't like + V-ing", rule_vi: "Phủ định: I don't like + V-ing" },
      { type: "rule", icon: "3️⃣", rule_en: "Question: Do you like + V-ing?", rule_vi: "Câu hỏi: Do you like + V-ing?" }
    ]
  },
  exercises: [
    // 30% AFFIRMATIVE (6 exercises)
    { id: 1, type: "fill", question: "I like _____ (play) games.", answer: "playing", hint: "play + ing" },
    { id: 2, type: "mc", question: "She likes _____ books.", options: ["read", "reading", "reads"], answer: "reading", hint: "like + V-ing" },
    { id: 3, type: "fill", question: "We like _____ (draw) pictures.", answer: "drawing", hint: "draw + ing" },
    { id: 4, type: "mc", question: "He likes _____ songs.", options: ["sing", "singing", "sings"], answer: "singing", hint: "like + V-ing" },
    { id: 5, type: "fill", question: "They like _____ (dance).", answer: "dancing", hint: "dance + e + ing" },
    { id: 6, type: "mc", question: "I like _____ with my friends.", options: ["play", "playing", "plays"], answer: "playing", hint: "like + V-ing" },

    // 30% NEGATIVE (6 exercises)
    { id: 7, type: "fill", question: "I don't like _____ (run).", answer: "running", hint: "don't like + V-ing" },
    { id: 8, type: "mc", question: "She _____ like reading.", options: ["don't", "doesn't", "isn't"], answer: "doesn't", hint: "She + doesn't" },
    { id: 9, type: "fill", question: "We _____ like singing.", answer: "don't", hint: "We + don't" },
    { id: 10, type: "mc", question: "He doesn't like _____.", options: ["draw", "drawing", "draws"], answer: "drawing", hint: "doesn't like + V-ing" },
    { id: 11, type: "unscramble", question: "Order:", words: ["don't", "I", "like", "dancing"], answer: "I don't like dancing.", hint: "I don't like" },
    { id: 12, type: "fill", question: "They don't like _____ (swim).", answer: "swimming", hint: "swim + m + ing" },

    // 40% QUESTIONS (8 exercises)
    { id: 13, type: "fill", question: "_____ you like playing?", answer: "Do", hint: "Do + you" },
    { id: 14, type: "mc", question: "Does she like _____?", options: ["read", "reading", "reads"], answer: "reading", hint: "Does + V-ing" },
    { id: 15, type: "unscramble", question: "Order:", words: ["like", "Do", "you", "drawing"], answer: "Do you like drawing?", hint: "Do you like" },
    { id: 16, type: "fill", question: "_____ he like singing?", answer: "Does", hint: "Does + he" },
    { id: 17, type: "mc", question: "What do you like _____?", options: ["do", "doing", "does"], answer: "doing", hint: "like + V-ing" },
    { id: 18, type: "unscramble", question: "Order:", words: ["Does", "she", "like", "dancing"], answer: "Does she like dancing?", hint: "Does she like" },
    { id: 19, type: "fill", question: "Do they like _____ (play) games?", answer: "playing", hint: "play + ing" },
    { id: 20, type: "mc", question: "_____ you like reading books?", options: ["Do", "Does", "Are"], answer: "Do", hint: "Do + you" }
  ]
};
