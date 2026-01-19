/**
 * GRAMMAR - Week 1
 * CEFR Level: A0/A0++
 * Focus: Subject Pronouns (I, you, he, she, it, we, they) + Verb 'to be' (am, is, are)
 * Structure: 30% Affirmative, 30% Negative, 40% Questions
 */

export default {
  exercises: [
    // --- AFFIRMATIVE (6 exercises) ---
    {
      id: 1,
      type: "fill",
      question: "I ___ a student.",
      options: null,
      answer: "am"
    },
    {
      id: 2,
      type: "mc",
      question: "She ___ my friend.",
      options: ["am", "is", "are"],
      answer: "is"
    },
    {
      id: 3,
      type: "fill",
      question: "They ___ happy.",
      options: null,
      answer: "are"
    },
    {
      id: 4,
      type: "mc",
      question: "He ___ a teacher.",
      options: ["am", "is", "are"],
      answer: "is"
    },
    {
      id: 5,
      type: "fill",
      question: "We ___ in the classroom.",
      options: null,
      answer: "are"
    },
    {
      id: 6,
      type: "mc",
      question: "It ___ a book.",
      options: ["am", "is", "are"],
      answer: "is"
    },

    // --- NEGATIVE (6 exercises) ---
    {
      id: 7,
      type: "fill",
      question: "I ___ not a teacher.",
      options: null,
      answer: "am"
    },
    {
      id: 8,
      type: "mc",
      question: "He ___ not sad.",
      options: ["am", "is", "are"],
      answer: "is"
    },
    {
      id: 9,
      type: "fill",
      question: "We ___ not at home.",
      options: null,
      answer: "are"
    },
    {
      id: 10,
      type: "mc",
      question: "They ___ not students.",
      options: ["am", "is", "are"],
      answer: "are"
    },
    {
      id: 11,
      type: "unscramble",
      question: "Order the words:",
      words: ["is", "She", "not", "my", "friend"],
      answer: "She is not my friend"
    },
    {
      id: 12,
      type: "fill",
      question: "It ___ not a pen.",
      options: null,
      answer: "is"
    },

    // --- QUESTIONS (8 exercises) ---
    {
      id: 13,
      type: "fill",
      question: "___ you a student?",
      options: null,
      answer: "Are"
    },
    {
      id: 14,
      type: "mc",
      question: "___ he happy?",
      options: ["Am", "Is", "Are"],
      answer: "Is"
    },
    {
      id: 15,
      type: "unscramble",
      question: "Order the words:",
      words: ["is", "What", "your", "name"],
      answer: "What is your name"
    },
    {
      id: 16,
      type: "fill",
      question: "___ she your teacher?",
      options: null,
      answer: "Is"
    },
    {
      id: 17,
      type: "mc",
      question: "___ they friends?",
      options: ["Am", "Is", "Are"],
      answer: "Are"
    },
    {
      id: 18,
      type: "unscramble",
      question: "Order the words:",
      words: ["is", "this", "a", "book"],
      answer: "Is this a book"
    },
    {
      id: 19,
      type: "fill",
      question: "___ I in the right room?",
      options: null,
      answer: "Am"
    },
    {
      id: 20,
      type: "unscramble",
      question: "Order the words:",
      words: ["are", "How", "you"],
      answer: "How are you"
    }
  ]
};
