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
    // 40% AFFIRMATIVE (8 exercises - easier)
    { id: 1, type: "fill", question: "I like _____ (play).", answer: "playing", hint: "play + ing" },
    { id: 2, type: "mc", question: "She likes _____ books.", options: ["read", "reading", "reads"], answer: "reading", hint: "like + reading" },
    { id: 3, type: "fill", question: "We like _____ (draw).", answer: "drawing", hint: "draw + ing" },
    { id: 4, type: "mc", question: "He likes _____.", options: ["sing", "singing", "sings"], answer: "singing", hint: "like + singing" },
    { id: 5, type: "fill", question: "I like _____ (dance).", answer: "dancing", hint: "dance + ing" },
    { id: 6, type: "mc", question: "They like _____ games.", options: ["play", "playing", "plays"], answer: "playing", hint: "like + playing" },
    { id: 7, type: "fill", question: "You like _____ (read).", answer: "reading", hint: "read + ing" },
    { id: 8, type: "mc", question: "I like _____ pictures.", options: ["draw", "drawing", "draws"], answer: "drawing", hint: "like + drawing" },

    // 30% NEGATIVE (6 exercises)
    { id: 9, type: "fill", question: "I don't like _____ (run).", answer: "running", hint: "run + n + ing" },
    { id: 10, type: "mc", question: "She _____ like playing.", options: ["don't", "doesn't", "isn't"], answer: "doesn't", hint: "She + doesn't" },
    { id: 11, type: "fill", question: "We _____ like dancing.", answer: "don't", hint: "We + don't" },
    { id: 12, type: "mc", question: "He doesn't like _____.", options: ["sing", "singing", "sings"], answer: "singing", hint: "doesn't like + singing" },
    { id: 13, type: "fill", question: "They don't like _____ (swim).", answer: "swimming", hint: "swim + m + ing" },
    { id: 14, type: "mc", question: "I _____ like reading.", options: ["don't", "doesn't", "isn't"], answer: "don't", hint: "I + don't" },

    // 30% QUESTIONS (6 exercises - simpler)
    { id: 15, type: "fill", question: "_____ you like playing?", answer: "Do", hint: "Do + you" },
    { id: 16, type: "mc", question: "Does she like _____?", options: ["read", "reading", "reads"], answer: "reading", hint: "Does + reading" },
    { id: 17, type: "fill", question: "_____ he like singing?", answer: "Does", hint: "Does + he" },
    { id: 18, type: "mc", question: "Do you like _____?", options: ["dance", "dancing", "dances"], answer: "dancing", hint: "Do + dancing" },
    { id: 19, type: "fill", question: "_____ they like drawing?", answer: "Do", hint: "Do + they" },
    { id: 20, type: "mc", question: "_____ you like reading?", options: ["Do", "Does", "Are"], answer: "Do", hint: "Do + you" }
  ]
};
