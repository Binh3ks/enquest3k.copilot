export default {
  grammar_explanation: {
    title_en: "Review: Present Simple, Can/Can't, Possessives",
    title_vi: "Ôn Tập: Thì Hiện Tại Đơn, Can/Can't, Sở Hữu",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Present Simple: I present, She introduces (add -s with he/she)", example_en: "I present my project. She introduces her family.", example_vi: "Tôi thuyết trình dự án của mình. Cô ấy giới thiệu gia đình.", rule_vi: "Thì Hiện Tại Đơn: I present, She introduces (thêm -s với he/she)" },
      { type: "rule", icon: "2️⃣", rule_en: "Can/Can't: I can sing, He cannot draw (no -s after can)", example_en: "I can sing a song. He cannot draw well. She can speak English.", example_vi: "Tôi có thể hát một bài hát. Anh ấy không thể vẽ tốt.", rule_vi: "Can/Can't: I can sing, He cannot draw (không có -s sau can)" },
      { type: "rule", icon: "3️⃣", rule_en: "Possessives: my poster, your project, his family, her talent", example_en: "This is my poster. That is her talent. His family is big.", example_vi: "Đây là áp phích của tôi. Đó là tài năng của cô ấy. Gia đình anh ấy lớn.", rule_vi: "Sở hữu: my poster, your project, his family, her talent" },
      { type: "rule", icon: "4️⃣", rule_en: "Describe abilities: I am good at..., I am confident, I am proud of...", example_en: "I am good at singing. I am proud of my drawing. She is confident on stage.", example_vi: "Tôi giỏi hát. Tôi tự hào về bức tranh của mình. Cô ấy tự tin trên sân khấu.", rule_vi: "Mô tả khả năng: I am good at..., I am confident, I am proud of..." }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "I ___ my poster to the class.", options: ["present", "presents", "presenting"], answer: "present", explanation: "Use 'present' with I" },
    { id: 2, type: "mc", question: "She ___ herself with confidence.", options: ["introduce", "introduces", "introducing"], answer: "introduces", explanation: "Add -s with she" },
    { id: 3, type: "mc", question: "I ___ sing very well.", options: ["can", "cans", "is"], answer: "can", explanation: "Use 'can' to show ability" },
    { id: 4, type: "mc", question: "He ___ draw beautiful pictures.", options: ["cannot", "can not", "can't"], answer: "cannot", explanation: "Use 'cannot' or 'can't' for negative" },
    { id: 5, type: "mc", question: "This is ___ family photo.", options: ["my", "me", "I"], answer: "my", explanation: "Use 'my' before a noun" },
    { id: 6, type: "fill", question: "I ___ my project to the audience.", answer: "describe", hint: "verb: to explain" },
    { id: 7, type: "fill", question: "___ name is on the poster.", answer: "Her", hint: "possessive for a girl" },
    { id: 8, type: "fill", question: "I ___ play the guitar.", answer: "can", hint: "ability word" },
    { id: 9, type: "fill", question: "They ___ proud of their work.", answer: "are", hint: "verb: to be" },
    { id: 10, type: "fill", question: "This is ___ talent show poster.", answer: "your", hint: "possessive for you" },
    { id: 11, type: "unscramble", question: "Unscramble the words:", words: ["I", "present", "my", "poster"], answer: "I present my poster" },
    { id: 12, type: "unscramble", question: "Unscramble the words:", words: ["introduce", "I", "myself"], answer: "I introduce myself" },
    { id: 13, type: "unscramble", question: "Unscramble the words:", words: ["can", "I", "sing", "well"], answer: "I can sing well" },
    { id: 14, type: "unscramble", question: "Unscramble the words:", words: ["family", "my", "is", "here"], answer: "My family is here" },
    { id: 15, type: "unscramble", question: "Unscramble the words:", words: ["talented", "She", "is", "very"], answer: "She is very talented" },
    { id: 16, type: "unscramble", question: "Unscramble the words:", words: ["his", "name", "is", "Tom"], answer: "His name is Tom" },
    { id: 17, type: "unscramble", question: "Unscramble the words:", words: ["draw", "cannot", "I"], answer: "I cannot draw" },
    { id: 18, type: "unscramble", question: "Unscramble the words:", words: ["proud", "I", "am", "of", "it"], answer: "I am proud of it" },
    { id: 19, type: "unscramble", question: "Unscramble the words:", words: ["her", "project", "is", "amazing"], answer: "Her project is amazing" },
    { id: 20, type: "unscramble", question: "Unscramble the words:", words: ["can", "dance", "you", "?"], answer: "You can dance?" }
  ]
};
