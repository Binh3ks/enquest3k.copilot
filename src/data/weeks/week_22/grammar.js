export default {
  grammar_explanation: {
    title_en: "Past Questions: Did + subject + base verb",
    title_vi: "Cau hoi qua khu: Did + chu ngu + dong tu nguyen mau",
    rules: [
      {
        id: 1,
        rule_en: "Use Did to ask yes/no questions in the past: Did you play soccer?",
        rule_vi: "Dung Did de hoi yes/no trong qua khu: Did you play soccer?",
        example_en: "Did you watch TV last night?",
        example_vi: "Ban co xem TV toi qua khong?"
      },
      {
        id: 2,
        rule_en: "After Did, use base verb (NOT -ed): Did he walk? NOT Did he walked?",
        rule_vi: "Sau Did, dung dong tu nguyen mau (KHONG them -ed): Did he walk?",
        example_en: "Did she clean her desk?",
        example_vi: "Co ay co don ban hoc khong?"
      },
      {
        id: 3,
        rule_en: "Short answers: Yes, I did. / No, I did not (didn't).",
        rule_vi: "Cau tra loi ngan: Yes, I did. / No, I didn't.",
        example_en: "Did they finish homework? Yes, they did.",
        example_vi: "Ho da hoan thanh bai tap chua? Yes, they did."
      }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "___ you walk to school yesterday?", options: ["Did", "Do", "Are"], answer: "Did", hint: "Past question uses Did" },
    { id: 2, type: "mc", question: "Did she ___ dinner last night?", options: ["cook", "cooked", "cooking"], answer: "cook", hint: "Base verb after Did" },
    { id: 3, type: "fill", question: "Did they ___ (play) soccer after class?", answer: "play", hint: "No -ed after Did" },
    { id: 4, type: "fill", question: "Did he ___ (watch) the match last night?", answer: "watch", hint: "Use base verb" },
    { id: 5, type: "mc", question: "Did you clean your room?", options: ["Yes, I did.", "Yes, I do.", "Yes, I am."], answer: "Yes, I did.", hint: "Short answer in past" },
    { id: 6, type: "mc", question: "Did Anna help her mother?", options: ["No, she didn't.", "No, she doesn't.", "No, she isn't."], answer: "No, she didn't.", hint: "Use didn't for past negative" },
    { id: 7, type: "fill", question: "Did your team ___ (finish) the project last week?", answer: "finish", hint: "Did + base verb" },
    { id: 8, type: "fill", question: "Did Minh ___ (open) the window in the morning?", answer: "open", hint: "Base verb" },
    { id: 9, type: "mc", question: "Which sentence is correct?", options: ["Did she walked home?", "Did she walk home?", "Did she walking home?"], answer: "Did she walk home?", hint: "Did + base verb" },
    { id: 10, type: "fill", question: "___ you talk to your teacher yesterday?", answer: "Did", hint: "Question starter" },
    { id: 11, type: "unscramble", question: "Order:", words: ["did", "you", "what", "yesterday", "do"], answer: "What did you do yesterday?", hint: "Wh-question + did" },
    { id: 12, type: "unscramble", question: "Order:", words: ["did", "she", "listen", "carefully"], answer: "Did she listen carefully?", hint: "Did she + base verb" },
    { id: 13, type: "mc", question: "Did they wash their hands before lunch?", options: ["Yes, they did.", "Yes, they do.", "Yes, they washed."], answer: "Yes, they did.", hint: "Standard short answer" },
    { id: 14, type: "fill", question: "Did your brother ___ (start) homework at 7 p.m.?", answer: "start", hint: "Base verb" },
    { id: 15, type: "mc", question: "No, I ___ not.", options: ["do", "did", "am"], answer: "did", hint: "No, I did not" },
    { id: 16, type: "fill", question: "Did you ___ (look) for clues last night?", answer: "look", hint: "Base verb after Did" },
    { id: 17, type: "mc", question: "Choose the best question for a detective interview.", options: ["Did you finish the task yesterday?", "You finished the task yesterday?", "Do you finished the task yesterday?"], answer: "Did you finish the task yesterday?", hint: "Correct question form" },
    { id: 18, type: "fill", question: "Did the witness ___ (answer) all questions?", answer: "answer", hint: "Base verb" },
    { id: 19, type: "unscramble", question: "Order:", words: ["didn't", "we", "play", "last", "night"], answer: "We didn't play last night.", hint: "Past negative" },
    { id: 20, type: "mc", question: "Did you ask about the clue?", options: ["Yes, I did.", "Yes, I asked did.", "Yes, I am."], answer: "Yes, I did.", hint: "Did question short answer" }
  ]
};
