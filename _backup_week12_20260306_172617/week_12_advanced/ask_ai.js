export default {
  theme: "The Talent Show - Abilities (Week 12)",
  description: "Test your knowledge about abilities, talents, and the modal 'can'",
  
  // Easy contexts (5 items)
  contexts_easy: [
    {
      id: "w12_sing_what",
      task_type: "find_question",
      topic: "singing",
      intro: "I can sing a song. What is my talent?",
      acceptedQuestions: [
        "What can you sing?",
        "What is your talent?",
        "What can you do?"
      ],
      answer: "I can sing a song.",
      required_question_words: ["what"],
      hints: {
        words: ["what", "can", "you", "sing"],
        tricky: ["who", "when", "where"]
      }
    },
    {
      id: "w12_dance_can",
      task_type: "find_question",
      topic: "dancing",
      intro: "I can dance to music. Can you dance?",
      acceptedQuestions: [
        "Can you dance?",
        "Can you dance to music?",
        "Can you dance well?"
      ],
      answer: "Yes, I can dance.",
      required_question_words: ["can"],
      hints: {
        words: ["can", "you", "dance"],
        tricky: ["do", "are", "is"]
      }
    },
    {
      id: "w12_run_how",
      task_type: "find_question",
      topic: "running",
      intro: "I can run very fast. How fast can I run?",
      acceptedQuestions: [
        "How fast can you run?",
        "Can you run fast?",
        "How do you run?"
      ],
      answer: "I can run very fast.",
      required_question_words: ["how"],
      hints: {
        words: ["how", "fast", "can", "you", "run"],
        tricky: ["what", "where"]
      }
    },
    {
      id: "w12_draw_what",
      task_type: "find_question",
      topic: "drawing",
      intro: "I can draw beautiful pictures. What can I draw?",
      acceptedQuestions: [
        "What can you draw?",
        "Can you draw pictures?",
        "What do you draw?"
      ],
      answer: "I can draw beautiful pictures.",
      required_question_words: ["what"],
      hints: {
        words: ["what", "can", "you", "draw"],
        tricky: ["who", "when"]
      }
    },
    {
      id: "w12_swim_can",
      task_type: "find_question",
      topic: "swimming",
      intro: "I can swim in the pool. Can you swim?",
      acceptedQuestions: [
        "Can you swim?",
        "Can you swim in the pool?",
        "Can you swim well?"
      ],
      answer: "Yes, I can swim.",
      required_question_words: ["can"],
      hints: {
        words: ["can", "you", "swim"],
        tricky: ["do", "are"]
      }
    }
  ],
  
  // Advanced contexts (5 items)
  contexts_advanced: [
    {
      id: "w12_talent_show",
      task_type: "find_question",
      topic: "talent show performance",
      intro: "At the talent show, I will sing a song. What will I do at the talent show?",
      acceptedQuestions: [
        "What will you do at the talent show?",
        "What can you do at the talent show?",
        "What is your performance?"
      ],
      answer: "I will sing a song.",
      required_question_words: ["what"],
      hints: {
        words: ["what", "will", "you", "do", "at", "talent", "show"],
        tricky: ["who", "when"]
      }
    },
    {
      id: "w12_best_talent",
      task_type: "find_question",
      topic: "best ability",
      intro: "My best talent is dancing. I practice every day. What is my best talent?",
      acceptedQuestions: [
        "What is your best talent?",
        "What can you do best?",
        "What is your special ability?"
      ],
      answer: "My best talent is dancing.",
      required_question_words: ["what"],
      hints: {
        words: ["what", "is", "your", "best", "talent"],
        tricky: ["who", "where"]
      }
    },
    {
      id: "w12_practice",
      task_type: "find_question",
      topic: "practice",
      intro: "I practice singing every day. How often do I practice?",
      acceptedQuestions: [
        "How often do you practice?",
        "When do you practice?",
        "How do you practice?"
      ],
      answer: "I practice every day.",
      required_question_words: ["how", "when"],
      hints: {
        words: ["how", "often", "when", "do", "you", "practice"],
        tricky: ["what", "who"]
      }
    },
    {
      id: "w12_learn",
      task_type: "find_question",
      topic: "learning abilities",
      intro: "I learned to swim last year. When did I learn to swim?",
      acceptedQuestions: [
        "When did you learn to swim?",
        "When did you learn?",
        "What year did you learn?"
      ],
      answer: "I learned last year.",
      required_question_words: ["when"],
      hints: {
        words: ["when", "did", "you", "learn", "to", "swim"],
        tricky: ["what", "where"]
      }
    },
    {
      id: "w12_favorite",
      task_type: "find_question",
      topic: "favorite talent",
      intro: "My favorite talent is drawing pictures. I love art. What is my favorite talent?",
      acceptedQuestions: [
        "What is your favorite talent?",
        "What talent do you like most?",
        "What do you love to do?"
      ],
      answer: "My favorite talent is drawing.",
      required_question_words: ["what"],
      hints: {
        words: ["what", "is", "your", "favorite", "talent"],
        tricky: ["who", "where"]
      }
    }
  ]
};
