export default {
  grammar_explanation: {
    title_en: "This is my... (Possession)",
    title_vi: "Đây là... của tôi (Sở hữu)",
    rules: [
      {
        id: 1,
        rule: "**This is** + **my** + (noun)",
        example_simple: "This is my father.",
        example_vi: "Đây là bố tôi.",
        note: "Use 'This is my...' to show someone or something belongs to you."
      },
      {
        id: 2,
        rule: "**My** + (noun) + **is** + (adjective)",
        example_simple: "My mother is kind.",
        example_vi: "Mẹ tôi tốt bụng.",
        note: "Use 'My... is...' to describe someone."
      },
      {
        id: 3,
        rule: "**We are** + (noun)",
        example_simple: "We are a team.",
        example_vi: "Chúng tôi là một đội.",
        note: "Use 'We are...' to talk about the group."
      }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "_____ is my family.", answer: "This", hint: "This is..." },
    { id: 2, type: "mc", question: "This is _____ mother.", options: ["my", "your", "his"], answer: "my", hint: "This is my..." },
    { id: 3, type: "unscramble", question: "Sort:", words: ["This", "is", "my", "father"], answer: "This is my father.", hint: "This is my..." },
    { id: 4, type: "fill", question: "My sister _____ (be) funny.", answer: "is", hint: "My sister is..." },
    { id: 5, type: "mc", question: "_____ is my brother.", options: ["This", "These", "That"], answer: "This", hint: "This is..." },
    { id: 6, type: "unscramble", question: "Sort:", words: ["are", "We", "a", "team"], answer: "We are a team.", hint: "We are..." },
    { id: 7, type: "fill", question: "This is _____ (I) family.", answer: "my", hint: "my family" },
    { id: 8, type: "mc", question: "My father _____ the leader.", options: ["is", "are"], answer: "is", hint: "He is..." },
    { id: 9, type: "fill", question: "Make sentence: 'This / my / mother'", answer: ["This is my mother.", "this is my mother."], customCheck: true, hint: "This is my..." },
    { id: 10, type: "fill", question: "We _____ (be) together.", answer: "are", hint: "We are..." },
    { id: 11, type: "fill", question: "My mother _____ (be) kind.", answer: "is", hint: "She is..." },
    { id: 12, type: "unscramble", question: "Sort:", words: ["love", "I", "my", "family"], answer: "I love my family.", hint: "I love..." },
    { id: 13, type: "fill", question: "_____ is my brother.", answer: "This", hint: "This is..." },
    { id: 14, type: "mc", question: "My brother is a good _____.", options: ["helper", "leader"], answer: "helper", hint: "He helps..." },
    { id: 15, type: "fill", question: "This is _____ (I) sister.", answer: "my", hint: "my sister" },
    { id: 16, type: "unscramble", question: "Sort:", words: ["is", "He", "the", "leader"], answer: "He is the leader.", hint: "He is..." },
    { id: 17, type: "fill", question: "Make sentence: 'My / family / happy'", answer: ["My family is happy.", "my family is happy."], customCheck: true, hint: "My family is..." },
    { id: 18, type: "mc", question: "_____ play together.", options: ["We", "They", "I"], answer: "We", hint: "We play..." },
    { id: 19, type: "fill", question: "This is my _____ (dad).", answer: "father", hint: "father" },
    { id: 20, type: "fill", question: "We are a _____ (team/group).", answer: "team", hint: "team" }
  ]
};
