export default {
  grammar_explanation: {
    title_en: "This is my... (Possession)",
    title_vi: "This is my... (Sở hữu)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "This is my + [family member]", rule_vi: "This is my + [thành viên gia đình]" },
      { type: "rule", icon: "2️⃣", rule_en: "This is + [name]", rule_vi: "This is + [tên]" },
      { type: "rule", icon: "3️⃣", rule_en: "We are a team", rule_vi: "We are a team (Chúng tôi là một đội)" }
    ]
  },
  exercises: [
    // 30% AFFIRMATIVE (6 exercises)
    { id: 1, type: "fill", question: "This is _____ mother.", answer: "my", hint: "This is + my" },
    { id: 2, type: "mc", question: "This is _____ father.", options: ["I", "my", "me"], answer: "my", hint: "This is + my" },
    { id: 3, type: "fill", question: "This is _____ brother.", answer: "my", hint: "This is + my" },
    { id: 4, type: "mc", question: "This is _____ sister.", options: ["I", "my", "me"], answer: "my", hint: "This is + my" },
    { id: 5, type: "fill", question: "We _____ a team.", answer: "are", hint: "We + are" },
    { id: 6, type: "mc", question: "This is _____ family.", options: ["I", "my", "me"], answer: "my", hint: "This is + my" },

    // 30% NEGATIVE (6 exercises)
    { id: 7, type: "fill", question: "This is _____ my brother.", answer: "not", hint: "This is + not" },
    { id: 8, type: "mc", question: "He is _____ my father.", options: ["not", "no", "don't"], answer: "not", hint: "He is + not" },
    { id: 9, type: "fill", question: "She is _____ my sister.", answer: "not", hint: "She is + not" },
    { id: 10, type: "mc", question: "We are _____ a big team.", options: ["not", "no", "don't"], answer: "not", hint: "We are + not" },
    { id: 11, type: "unscramble", question: "Order:", words: ["is", "This", "not", "my", "mother"], answer: "This is not my mother.", hint: "This is not" },
    { id: 12, type: "fill", question: "This is _____ my home.", answer: "not", hint: "This is + not" },

    // 40% QUESTIONS (8 exercises)
    { id: 13, type: "fill", question: "_____ this your mother?", answer: "Is", hint: "Is + this" },
    { id: 14, type: "mc", question: "_____ this your father?", options: ["Am", "Is", "Are"], answer: "Is", hint: "Is + this" },
    { id: 15, type: "unscramble", question: "Order:", words: ["is", "Who", "this"], answer: "Who is this?", hint: "Who + is" },
    { id: 16, type: "fill", question: "_____ this your brother?", answer: "Is", hint: "Is + this" },
    { id: 17, type: "mc", question: "_____ you a team?", options: ["Am", "Is", "Are"], answer: "Are", hint: "Are + you" },
    { id: 18, type: "unscramble", question: "Order:", words: ["is", "this", "your", "family"], answer: "Is this your family?", hint: "Is + this" },
    { id: 19, type: "fill", question: "_____ she your sister?", answer: "Is", hint: "Is + she" },
    { id: 20, type: "unscramble", question: "Order:", words: ["are", "you", "happy", "at", "home"], answer: "Are you happy at home?", hint: "Are + you" }
  ]
};
