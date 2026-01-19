export default {
  grammar_explanation: {
    title_en: "This is my...",
    title_vi: "Đây là... của tôi",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "This is my + [person]", rule_vi: "This is my + [người]" },
      { type: "rule", icon: "2️⃣", rule_en: "We are a team", rule_vi: "We are a team (Chúng tôi là đội)" },
      { type: "rule", icon: "3️⃣", rule_en: "I love my family", rule_vi: "I love my family (Tôi yêu gia đình)" }
    ]
  },
  exercises: [
    // 30% AFFIRMATIVE (6 exercises)
    { id: 1, type: "fill", question: "This is _____ mother.", answer: "my", hint: "This is + my" },
    { id: 2, type: "mc", question: "This is _____ father.", options: ["I", "my", "me"], answer: "my", hint: "This is + my" },
    { id: 3, type: "fill", question: "This is _____ family.", answer: "my", hint: "This is + my" },
    { id: 4, type: "mc", question: "We _____ a team.", options: ["am", "is", "are"], answer: "are", hint: "We + are" },
    { id: 5, type: "fill", question: "I _____ my family.", answer: "love", hint: "I + love" },
    { id: 6, type: "mc", question: "This is _____ home.", options: ["I", "my", "me"], answer: "my", hint: "This is + my" },

    // 30% NEGATIVE (6 exercises)
    { id: 7, type: "fill", question: "This is _____ my brother.", answer: "not", hint: "This is + not" },
    { id: 8, type: "mc", question: "He is _____ my father.", options: ["not", "no"], answer: "not", hint: "He is + not" },
    { id: 9, type: "fill", question: "We are _____ sad.", answer: "not", hint: "We are + not" },
    { id: 10, type: "mc", question: "She is _____ my mother.", options: ["not", "no"], answer: "not", hint: "She is + not" },
    { id: 11, type: "unscramble", question: "Order:", words: ["is", "This", "not", "my", "sister"], answer: "This is not my sister.", hint: "This is not" },
    { id: 12, type: "fill", question: "I am _____ at home.", answer: "not", hint: "I am + not" },

    // 40% QUESTIONS (8 exercises)
    { id: 13, type: "fill", question: "_____ this your mother?", answer: "Is", hint: "Is + this" },
    { id: 14, type: "mc", question: "_____ you a team?", options: ["Am", "Is", "Are"], answer: "Are", hint: "Are + you" },
    { id: 15, type: "unscramble", question: "Order:", words: ["is", "Who", "this"], answer: "Who is this?", hint: "Who + is" },
    { id: 16, type: "fill", question: "_____ he your father?", answer: "Is", hint: "Is + he" },
    { id: 17, type: "mc", question: "_____ she your sister?", options: ["Am", "Is", "Are"], answer: "Is", hint: "Is + she" },
    { id: 18, type: "unscramble", question: "Order:", words: ["you", "Do", "love", "your", "family"], answer: "Do you love your family?", hint: "Do you" },
    { id: 19, type: "fill", question: "_____ you happy?", answer: "Are", hint: "Are + you" },
    { id: 20, type: "unscramble", question: "Order:", words: ["is", "this", "your", "home"], answer: "Is this your home?", hint: "Is + this" }
  ]
};
