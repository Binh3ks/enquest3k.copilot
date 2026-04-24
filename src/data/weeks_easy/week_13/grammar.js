export default {
  grammar_explanation: {
    title_en: "Present Simple (I do every day)",
    title_vi: "Thì Hiện Tại Đơn (Tôi làm mỗi ngày)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "I wake up. I eat. I play.", example_en: "I wake up at 6. I eat breakfast. I play after school.", example_vi: "Tôi thức dậy lúc 6 giờ. Tôi ăn sáng. Tôi chơi sau giờ học.", rule_vi: "I wake up. I eat. I play." },
      { type: "rule", icon: "2️⃣", rule_en: "She wakes up. He eats.", example_en: "She wakes up early. He eats lunch at school.", example_vi: "Cô ấy thức dậy sớm. Anh ấy ăn trưa ở trường.", rule_vi: "She wakes up. He eats." },
      { type: "rule", icon: "3️⃣", rule_en: "I go to school. I go to bed.", example_en: "I go to school at 7. I go to bed at 9 o'clock.", example_vi: "Tôi đi học lúc 7 giờ. Tôi đi ngủ lúc 9 giờ.", rule_vi: "I go to school. I go to bed." }
    ]
  },
  exercises: [
    { id: 1, type: "multiple_choice", question: "I ___ up.", options: ["wake", "wakes"], answer: "wake", explanation: "I wake" },
    { id: 2, type: "multiple_choice", question: "I ___ my teeth.", options: ["brush", "brushes"], answer: "brush", explanation: "I brush" },
    { id: 3, type: "multiple_choice", question: "I ___ breakfast.", options: ["eat", "eats"], answer: "eat", explanation: "I eat" },
    { id: 4, type: "multiple_choice", question: "I ___ to school.", options: ["go", "goes"], answer: "go", explanation: "I go" },
    { id: 5, type: "multiple_choice", question: "I ___ lunch.", options: ["have", "has"], answer: "have", explanation: "I have" },
    { id: 6, type: "fill_in_blank", question: "I ___.", answer: "play", hint: "have fun" },
    { id: 7, type: "fill_in_blank", question: "I ___ homework.", answer: "do", hint: "work" },
    { id: 8, type: "fill_in_blank", question: "I ___ dinner.", answer: "have", hint: "eat food" },
    { id: 9, type: "fill_in_blank", question: "I ___ TV.", answer: "watch", hint: "look at" },
    { id: 10, type: "fill_in_blank", question: "I ___ to bed.", answer: "go", hint: "sleep" },
    { id: 11, type: "unscramble", words: ["I", "wake", "up"], answer: "I wake up" },
    { id: 12, type: "unscramble", words: ["I", "brush", "teeth"], answer: "I brush teeth" },
    { id: 13, type: "unscramble", words: ["I", "eat"], answer: "I eat" },
    { id: 14, type: "unscramble", words: ["I", "go", "school"], answer: "I go school" },
    { id: 15, type: "unscramble", words: ["I", "have", "lunch"], answer: "I have lunch" },
    { id: 16, type: "unscramble", words: ["I", "play"], answer: "I play" },
    { id: 17, type: "unscramble", words: ["I", "do", "homework"], answer: "I do homework" },
    { id: 18, type: "unscramble", words: ["I", "have", "dinner"], answer: "I have dinner" },
    { id: 19, type: "unscramble", words: ["I", "watch", "TV"], answer: "I watch TV" },
    { id: 20, type: "unscramble", words: ["I", "go", "bed"], answer: "I go bed" }
  ]
};
