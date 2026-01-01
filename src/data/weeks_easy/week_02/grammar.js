export default {
  grammar_explanation: {
    title_en: "This is my... (Possession)",
    title_vi: "Đây là... của tôi (Sở hữu)",
    rules: [
      {
        id: 1,
        rule: "**This is my** + (thing)",
        example_simple: "This is my cat.",
        example_vi: "Đây là mèo của tôi.",
        note: "Use 'This is my...' to show it is yours."
      },
      {
        id: 2,
        rule: "**My** + (thing) + **is** + (how it is)",
        example_simple: "My mom is nice.",
        example_vi: "Mẹ tôi tốt.",
        note: "Use 'My... is...' to tell about it."
      },
      {
        id: 3,
        rule: "**I love my** + (thing)",
        example_simple: "I love my home.",
        example_vi: "Tôi yêu nhà tôi.",
        note: "Use 'I love my...' to show you like it."
      }
    ]
  },
  exercises: [
    { id: 1, type: "fill", question: "_____ is my home.", answer: "This", hint: "This is..." },
    { id: 2, type: "mc", question: "This is _____ mom.", options: ["my", "your"], answer: "my", hint: "my mom" },
    { id: 3, type: "unscramble", question: "Sort:", words: ["This", "is", "my", "dad"], answer: "This is my dad.", hint: "This is..." },
    { id: 4, type: "fill", question: "My cat _____ (be) soft.", answer: "is", hint: "My cat is..." },
    { id: 5, type: "mc", question: "_____ is my dog.", options: ["This", "These"], answer: "This", hint: "This is..." },
    { id: 6, type: "unscramble", question: "Sort:", words: ["I", "love", "my", "home"], answer: "I love my home.", hint: "I love..." },
    { id: 7, type: "fill", question: "This is _____ (I) room.", answer: "my", hint: "my room" },
    { id: 8, type: "mc", question: "My baby _____ small.", options: ["is", "are"], answer: "is", hint: "She is..." },
    { id: 9, type: "fill", question: "Make: 'This / my / book'", answer: ["This is my book.", "this is my book."], customCheck: true, hint: "This is my..." },
    { id: 10, type: "fill", question: "My dog _____ (be) fun.", answer: "is", hint: "My dog is..." },
    { id: 11, type: "fill", question: "My mom _____ (be) nice.", answer: "is", hint: "She is..." },
    { id: 12, type: "unscramble", question: "Sort:", words: ["my", "This", "is", "toy"], answer: "This is my toy.", hint: "This is..." },
    { id: 13, type: "fill", question: "_____ is my bed.", answer: "This", hint: "This is..." },
    { id: 14, type: "mc", question: "I _____ my home.", options: ["love", "like"], answer: "love", hint: "I love..." },
    { id: 15, type: "fill", question: "This is _____ (I) cat.", answer: "my", hint: "my cat" },
    { id: 16, type: "unscramble", question: "Sort:", words: ["is", "My", "dad", "big"], answer: "My dad is big.", hint: "My dad..." },
    { id: 17, type: "fill", question: "Make: 'My / baby / small'", answer: ["My baby is small.", "my baby is small."], customCheck: true, hint: "My baby is..." },
    { id: 18, type: "mc", question: "This _____ my book.", options: ["is", "are"], answer: "is", hint: "This is..." },
    { id: 19, type: "fill", question: "My cat is _____ (soft/hard).", answer: "soft", hint: "soft" },
    { id: 20, type: "fill", question: "I love my _____.", answer: "home", hint: "home" }
  ]
};
