export default {
  grammar_explanation: {
    title_en: "Past Questions with Did",
    title_vi: "Cau hoi qua khu voi Did",
    rules: [
      {
        id: 1,
        rule_en: "Use Did to ask about the past: Did you play?",
        rule_vi: "Dung Did de hoi ve qua khu: Did you play?",
        example_en: "Did you walk to school yesterday?",
        example_vi: "Ban co di bo den truong hom qua khong?"
      },
      {
        id: 2,
        rule_en: "After Did, use base verb: Did she walk?",
        rule_vi: "Sau Did, dung dong tu nguyen mau: Did she walk?",
        example_en: "Did he clean the desk?",
        example_vi: "Ban ay co don ban hoc khong?"
      },
      {
        id: 3,
        rule_en: "Short answers: Yes, I did. / No, I did not.",
        rule_vi: "Cau tra loi ngan: Yes, I did. / No, I didn't.",
        example_en: "Did you watch TV? Yes, I did.",
        example_vi: "Ban co xem TV khong? Yes, I did."
      }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "___ you play yesterday?", options: ["Did", "Do", "Are"], answer: "Did", hint: "Use Did for past" },
    { id: 2, type: "fill", question: "Did she ___ (walk) to school?", answer: "walk", hint: "Base verb" },
    { id: 3, type: "fill", question: "Did he ___ (cook) dinner?", answer: "cook", hint: "No -ed after Did" },
    { id: 4, type: "mc", question: "Did they watch TV last night?", options: ["Yes, they did.", "Yes, they do.", "Yes, they are."], answer: "Yes, they did.", hint: "Past short answer" },
    { id: 5, type: "mc", question: "Did Mai clean her room?", options: ["No, she didn't.", "No, she don't.", "No, she not."], answer: "No, she didn't.", hint: "Use didn't" },
    { id: 6, type: "fill", question: "Did you ___ (help) your mom?", answer: "help", hint: "Use base verb" },
    { id: 7, type: "fill", question: "Did Nam ___ (open) the door?", answer: "open", hint: "Base verb" },
    { id: 8, type: "mc", question: "Which is correct?", options: ["Did she played?", "Did she play?", "Did she playing?"], answer: "Did she play?", hint: "Did + base verb" },
    { id: 9, type: "fill", question: "___ you listen to music yesterday?", answer: "Did", hint: "Question starter" },
    { id: 10, type: "mc", question: "Did you finish homework?", options: ["Yes, I did.", "Yes, I do.", "Yes, I finished did."], answer: "Yes, I did.", hint: "Correct short answer" },
    { id: 11, type: "unscramble", question: "Order:", words: ["did", "you", "what", "do"], answer: "What did you do?", hint: "What did you..." },
    { id: 12, type: "unscramble", question: "Order:", words: ["did", "he", "play", "soccer"], answer: "Did he play soccer?", hint: "Did he + base verb" },
    { id: 13, type: "fill", question: "Did Linh ___ (wash) her hands?", answer: "wash", hint: "Base verb" },
    { id: 14, type: "fill", question: "Did they ___ (start) early?", answer: "start", hint: "No -ed" },
    { id: 15, type: "mc", question: "No, I ___ not.", options: ["did", "do", "am"], answer: "did", hint: "No, I did not" },
    { id: 16, type: "fill", question: "Did your dad ___ (look) for the key?", answer: "look", hint: "Base verb" },
    { id: 17, type: "mc", question: "Did she talk to her friend?", options: ["Yes, she did.", "Yes, she do.", "Yes, she talked did."], answer: "Yes, she did.", hint: "Past short answer" },
    { id: 18, type: "fill", question: "Did we ___ (play) after school?", answer: "play", hint: "Base verb" },
    { id: 19, type: "unscramble", question: "Order:", words: ["didn't", "we", "watch", "TV"], answer: "We didn't watch TV.", hint: "Past negative sentence" },
    { id: 20, type: "mc", question: "Did you ask a question yesterday?", options: ["Yes, I did.", "Yes, I do.", "Yes, I asked did."], answer: "Yes, I did.", hint: "Correct short answer" }
  ]
};
