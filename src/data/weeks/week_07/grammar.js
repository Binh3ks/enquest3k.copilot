export default {
  grammar_explanation: {
    title_en: "There is... (Singular Items)",
    title_vi: "There is... (Đồ vật số ít)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use 'There is' to say something exists: There is a pen.", rule_vi: "Dùng 'There is' để nói có cái gì đó: There is a pen." },
      { type: "rule", icon: "2️⃣", rule_en: "Pattern: There is + a/an + [noun]", rule_vi: "Cấu trúc: There is + a/an + [danh từ]" },
      { type: "rule", icon: "3️⃣", rule_en: "Question: Is there + a/an + [noun]? Answer: Yes, there is. / No, there isn't.", rule_vi: "Câu hỏi: Is there + a/an + [danh từ]? Trả lời: Yes, there is. / No, there isn't." }
    ]
  },
  exercises: [
    // Multiple Choice (8 questions)
    {
      id: 1,
      type: "mc",
      question: "There ___ a pen in the pencil case.",
      options: ["is", "are", "am", "be"],
      answer: "is",
      hint: "Use 'is' for singular."
    },
    {
      id: 2,
      type: "mc",
      question: "___ a book on the desk.",
      options: ["There is", "There are", "This is", "That is"],
      answer: "There is",
      hint: "'There is' for one item."
    },
    {
      id: 3,
      type: "mc",
      question: "There ___ an eraser in my bag.",
      options: ["is", "are", "am", "be"],
      answer: "is",
      hint: "One eraser = singular = 'is'."
    },
    {
      id: 4,
      type: "mc",
      question: "Is there a ruler? Yes, ___.",
      options: ["there is", "there are", "it is", "I am"],
      answer: "there is",
      hint: "Answer 'there is' for singular."
    },
    {
      id: 5,
      type: "mc",
      question: "There ___ a computer in the classroom.",
      options: ["is", "are", "am", "be"],
      answer: "is",
      hint: "One computer = 'is'."
    },
    {
      id: 6,
      type: "mc",
      question: "___ a whiteboard on the wall.",
      options: ["There is", "There are", "It is", "I see"],
      answer: "There is",
      hint: "'There is' for existence."
    },
    {
      id: 7,
      type: "mc",
      question: "Is there a notebook? No, ___.",
      options: ["there isn't", "there aren't", "it isn't", "I'm not"],
      answer: "there isn't",
      hint: "Negative form."
    },
    {
      id: 8,
      type: "mc",
      question: "There is ___ teacher in the room.",
      options: ["a", "an", "the", "some"],
      answer: "a",
      hint: "'a' before consonant."
    },
    
    // Fill in the blank (7 questions)
    {
      id: 9,
      type: "fill",
      question: "There ___ a pen in my backpack.",
      answer: "is",
      hint: "Use 'is' for singular."
    },
    {
      id: 10,
      type: "fill",
      question: "___ is a book on the table.",
      answer: "There",
      hint: "Start with 'There'."
    },
    {
      id: 11,
      type: "fill",
      question: "Is ___ a ruler here?",
      answer: "there",
      hint: "Question form: Is there...?"
    },
    {
      id: 12,
      type: "fill",
      question: "There is ___ eraser in my pencil case.",
      answer: "an",
      hint: "'an' before vowel sound."
    },
    {
      id: 13,
      type: "fill",
      question: "___ there a computer? Yes, there ___.",
      answer: "Is, is",
      hint: "Question and answer."
    },
    {
      id: 14,
      type: "fill",
      question: "There ___ a whiteboard in the classroom.",
      answer: "is",
      hint: "Singular = is."
    },
    {
      id: 15,
      type: "fill",
      question: "Is there a notebook? No, there ___.",
      answer: "isn't",
      hint: "Short form of 'is not'."
    },
    
    // Unscramble (5 questions)
    {
      id: 16,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["is", "There", "pen", "a", "here"],
      answer: "There is a pen here.",
      hint: "Start with 'There is'."
    },
    {
      id: 17,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["ruler", "backpack", "in", "a", "is", "There", "my"],
      answer: "There is a ruler in my backpack.",
      hint: "There is a... in my..."
    },
    {
      id: 18,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["there", "Is", "book", "a", "?"],
      answer: "Is there a book?",
      hint: "Question: Is there...?"
    },
    {
      id: 19,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["whiteboard", "classroom", "the", "a", "in", "is", "There"],
      answer: "There is a whiteboard in the classroom.",
      hint: "There is a... in the..."
    },
    {
      id: 20,
      type: "unscramble",
      question: "Put the words in order:",
      words: ["eraser", "an", "desk", "on", "is", "the", "There"],
      answer: "There is an eraser on the desk.",
      hint: "'an' before eraser!"
    }
  ]
};
