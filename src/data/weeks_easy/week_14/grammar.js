export default {
  grammar_explanation: {
    title_en: "I can, My name is, I have",
    title_vi: "Tôi có thể, Tên tôi là, Tôi có",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "I can sing. I can draw.", example_en: "I can sing a song. I can draw a picture. She can dance.", example_vi: "Tôi có thể hát một bài. Tôi có thể vẽ tranh. Cô ấy có thể nhảy.", rule_vi: "Tôi có thể hát. Tôi có thể vẽ." },
      { type: "rule", icon: "2️⃣", rule_en: "My name is Emma.", example_en: "My name is Emma. His name is Tom. Her name is Lily.", example_vi: "Tên tôi là Emma. Tên anh ấy là Tom. Tên cô ấy là Lily.", rule_vi: "Tên tôi là Emma." },
      { type: "rule", icon: "3️⃣", rule_en: "I have a family.", example_en: "I have a family. I have a mother and a father. I have a bag.", example_vi: "Tôi có một gia đình. Tôi có bố và mẹ. Tôi có một cái túi.", rule_vi: "Tôi có một gia đình." }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "I ___ draw.", options: ["can", "cans"], answer: "can", explanation: "I can" },
    { id: 2, type: "mc", question: "I ___ sing.", options: ["can", "cans"], answer: "can", explanation: "I can" },
    { id: 3, type: "mc", question: "My name ___ Emma.", options: ["is", "are"], answer: "is", explanation: "My name is" },
    { id: 4, type: "mc", question: "I ___ a family.", options: ["have", "has"], answer: "have", explanation: "I have" },
    { id:5, type: "mc", question: "I can ___ mom.", options: ["help", "helps"], answer: "help", explanation: "I can help" },
    { id: 6, type: "fill", question: "I ___ play.", answer: "can", hint: "able to" },
    { id: 7, type: "fill", question: "My ___ is Emma.", answer: "name", hint: "what you are called" },
    { id: 8, type: "fill", question: "I have a ___.", answer: "friend", hint: "someone you play with" },
    { id: 9, type: "fill", question: "I can ___.", answer: "sing", hint: "make music" },
    { id: 10, type: "fill", question: "I ___ help.", answer: "can", hint: "able to" },
    { id: 11, type: "unscramble", question: "Unscramble the words:", words: ["I", "can", "draw"], answer: "I can draw" },
    { id: 12, type: "unscramble", question: "Unscramble the words:", words: ["I", "can", "sing"], answer: "I can sing" },
    { id: 13, type: "unscramble", question: "Unscramble the words:", words: ["My", "name", "is"], answer: "My name is" },
    { id: 14, type: "unscramble", question: "Unscramble the words:", words: ["I", "have", "family"], answer: "I have family" },
    { id: 15, type: "unscramble", question: "Unscramble the words:", words: ["I", "can", "help"], answer: "I can help" },
    { id: 16, type: "unscramble", question: "Unscramble the words:", words: ["I", "can", "play"], answer: "I can play" },
    { id: 17, type: "unscramble", question: "Unscramble the words:", words: ["I", "show", "picture"], answer: "I show picture" },
    { id: 18, type: "unscramble", question: "Unscramble the words:", words: ["I", "tell", "story"], answer: "I tell story" },
    { id: 19, type: "unscramble", question: "Unscramble the words:", words: ["I", "have", "friend"], answer: "I have friend" },
    { id: 20, type: "unscramble", question: "Unscramble the words:", words: ["I", "can", "help", "mom"], answer: "I can help mom" }
  ]
};
