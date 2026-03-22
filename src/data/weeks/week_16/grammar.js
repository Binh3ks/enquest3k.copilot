export default {
  grammar_explanation: {
    title_en: "Present Continuous (is/are + verb-ing)",
    title_vi: "Thì Hiện tại Tiếp diễn",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'am' with I: I am playing", rule_vi: "Dùng 'am' với I: I am playing" },
      { type: "rule", icon: "2️⃣", rule_en: "Use 'is' with he/she/it: He is running", rule_vi: "Dùng 'is' với he/she/it: He is running" },
      { type: "rule", icon: "3️⃣", rule_en: "Use 'are' with you/we/they: They are playing", rule_vi: "Dùng 'are' với you/we/they: They are playing" },
      { type: "rule", icon: "4️⃣", rule_en: "Add -ing to verbs: play → playing, run → running", rule_vi: "Thêm -ing vào động từ: play → playing, run → running" }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "Tom ___ (kick) the ball now.", answer: "is kicking", hint: "he/she/it + is" },
    { id: 2, type: "fill", question: "The players ___ (run) on the field.", answer: "are running", hint: "they + are" },
    { id: 3, type: "fill", question: "I ___ (watch) the game.", answer: "am watching", hint: "I + am" },
    { id: 4, type: "fill", question: "She ___ (throw) the ball to her friend.", answer: "is throwing", hint: "she + is" },
    { id: 5, type: "fill", question: "We ___ (play) soccer together.", answer: "are playing", hint: "we + are" },
    { id: 6, type: "fill", question: "The coach ___ (talk) to the team.", answer: "is talking", hint: "he/she + is" },
    { id: 7, type: "fill", question: "They ___ (cheer) for their team.", answer: "are cheering", hint: "they + are" },
    { id: 8, type: "fill", question: "He ___ (score) a goal!", answer: "is scoring", hint: "he + is" },
    { id: 9, type: "fill", question: "You ___ (jump) very high!", answer: "are jumping", hint: "you + are" },
    { id: 10, type: "fill", question: "The goalkeeper ___ (catch) the ball.", answer: "is catching", hint: "he/she + is" },
    { id: 11, type: "mc", question: "Look! The bird ___ away.", options: ["fly", "is flying", "flies"], answer: "is flying", hint: "happening now" },
    { id: 12, type: "mc", question: "We ___ our homework right now.", options: ["do", "are doing", "does"], answer: "are doing", hint: "we + are" },
    { id: 13, type: "fill", question: "My mom ___ (cook) dinner.", answer: "is cooking", hint: "she + is" },
    { id: 14, type: "fill", question: "The children ___ (sing) a song.", answer: "are singing", hint: "they + are" },
    { id: 15, type: "mc", question: "I ___ to music.", options: ["listen", "am listening", "listens"], answer: "am listening", hint: "I + am" },
    { id: 16, type: "unscramble", question: "Order:", words: ["is", "She", "reading", "a", "book"], answer: "She is reading a book.", hint: "She is" },
    { id: 17, type: "unscramble", question: "Order:", words: ["are", "They", "playing", "soccer"], answer: "They are playing soccer.", hint: "They are" },
    { id: 18, type: "fill", question: "The dog ___ (bark) at the cat.", answer: "is barking", hint: "it + is" },
    { id: 19, type: "fill", question: "You ___ (do) a great job!", answer: "are doing", hint: "you + are" },
    { id: 20, type: "unscramble", question: "Order:", words: ["am", "I", "learning", "English"], answer: "I am learning English.", hint: "I am" }
  ]
};
