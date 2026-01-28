export default {
  grammar_explanation: {
    title_en: "There is... (One Thing)",
    title_vi: "There is... (Một đồ vật)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'There is' for one thing: There is a pencil.", rule_vi: "Dùng 'There is' cho một đồ: There is a pencil." },
      { type: "rule", icon: "2️⃣", rule_en: "Pattern: There is + a + [thing]", rule_vi: "Cấu trúc: There is + a + [đồ vật]" },
      { type: "rule", icon: "3️⃣", rule_en: "Question: Is there a [thing]? Answer: Yes, there is. / No, there isn't.", rule_vi: "Câu hỏi: Is there a [đồ]? Trả lời: Yes, there is. / No, there isn't." }
    ]
  },
  exercises: [
    // Multiple Choice (8 questions - simpler)
    {
      id: 1,
      type: "mc",
      question: "There ___ a pencil in my bag.",
      options: ["is", "are", "am", "be"],
      answer: "is",
      hint: "Use 'is' for one thing."
    },
    {
      id: 2,
      type: "mc",
      question: "___ a crayon on the desk.",
      options: ["There is", "There are", "I have", "I see"],
      answer: "There is",
      hint: "'There is' for one item."
    },
    {
      id: 3,
      type: "mc",
      question: "There ___ scissors in the pencil case.",
      options: ["is", "are", "am", "be"],
      answer: "is",
      hint: "One scissors = 'is'."
    },
    {
      id: 4,
      type: "mc",
      question: "Is there a lunch box? Yes, ___.",
      options: ["there is", "there are", "it is", "I am"],
      answer: "there is",
      hint: "Answer 'there is'."
    },
    {
      id: 5,
      type: "mc",
      question: "There ___ paper on the table.",
      options: ["is", "are", "am", "be"],
      answer: "is",
      hint: "Paper = 'is'."
    },
    {
      id: 6,
      type: "mc",
      question: "___ a water bottle here.",
      options: ["There is", "There are", "I have", "I see"],
      answer: "There is",
      hint: "'There is' for one bottle."
    },
    {
      id: 7,
      type: "mc",
      question: "Is there glue? No, ___.",
      options: ["there isn't", "there aren't", "it isn't", "I don't"],
      answer: "there isn't",
      hint: "Say 'there isn't'."
    },
    {
      id: 8,
      type: "mc",
      question: "There is ___ folder in my bag.",
      options: ["a", "an", "the", "some"],
      answer: "a",
      hint: "'a' before folder."
    },
    
    // Fill in the blank (7 questions - easier)
    {
      id: 9,
      type: "fill",
      question: "There ___ a marker here.",
      answer: "is",
      hint: "Use 'is'."
    },
    {
      id: 10,
      type: "fill",
      question: "___ is glue in my bag.",
      answer: "There",
      hint: "Start with 'There'."
    },
    {
      id: 11,
      type: "fill",
      question: "Is ___ a stapler here?",
      answer: "there",
      hint: "Is there...?"
    },
    {
      id: 12,
      type: "fill",
      question: "There is ___ apple in my lunch box.",
      answer: "an",
      hint: "'an' before apple."
    },
    {
      id: 13,
      type: "fill",
      question: "___ there paper? Yes, there ___.",
      answer: "Is, is",
      hint: "Question and answer."
    },
    {
      id: 14,
      type: "fill",
      question: "There ___ a chart on the wall.",
      answer: "is",
      hint: "One chart = is."
    },
    {
      id: 15,
      type: "fill",
      question: "Is there a map? No, there ___.",
      answer: "isn't",
      hint: "isn't = is not."
    },
    
    // Unscramble (5 questions - shorter)
    {
      id: 16,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["is", "There", "pencil", "a", "here"],
      answer: "There is a pencil here.",
      hint: "There is a..."
    },
    {
      id: 17,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["crayon", "bag", "in", "a", "is", "There", "my"],
      answer: "There is a crayon in my bag.",
      hint: "There is a... in my..."
    },
    {
      id: 18,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["there", "Is", "marker", "a", "?"],
      answer: "Is there a marker?",
      hint: "Question: Is there...?"
    },
    {
      id: 19,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["desk", "the", "a", "on", "is", "There", "book"],
      answer: "There is a book on the desk.",
      hint: "There is a... on the..."
    },
    {
      id: 20,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["apple", "an", "box", "in", "is", "the", "There"],
      answer: "There is an apple in the box.",
      hint: "'an' before apple!"
    }
  ]
};
