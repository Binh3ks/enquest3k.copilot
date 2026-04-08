/**
 * Placement Test Data — 3 difficulty levels per module
 * Adaptive branching: correct → advance; wrong → stop module
 * Result → localStorage["placement_result"] = { startWeek, mode }
 */

export const PLACEMENT_DATA = {
  vocab: [
    // Level 1 — Pre-A1 (W1-W14)
    {
      level: 1,
      question: "Which word means a place where you sleep?",
      options: ["bedroom", "kitchen", "garden", "car"],
      answer: "bedroom",
    },
    // Level 2 — A1 (W15-W28)
    {
      level: 2,
      question: "Which word means feeling very tired after a long day?",
      options: ["exhausted", "hungry", "nervous", "polite"],
      answer: "exhausted",
    },
    // Level 3 — A1+ / A2 (W29+)
    {
      level: 3,
      question: "Which word best fits: 'The scientist made a great ___ that changed medicine'?",
      options: ["discovery", "decoration", "discussion", "direction"],
      answer: "discovery",
    },
  ],

  grammar: [
    // Level 1 — simple present / basic nouns
    {
      level: 1,
      question: "Choose the correct sentence:",
      options: [
        "She have a cat.",
        "She has a cat.",
        "She are having a cat.",
        "She having cat.",
      ],
      answer: "She has a cat.",
    },
    // Level 2 — past tense / prepositions
    {
      level: 2,
      question: "Choose the correct sentence:",
      options: [
        "Yesterday I go to school.",
        "Yesterday I going to school.",
        "Yesterday I went to school.",
        "Yesterday I goed to school.",
      ],
      answer: "Yesterday I went to school.",
    },
    // Level 3 — present perfect / complex structures
    {
      level: 3,
      question: "Choose the correct sentence:",
      options: [
        "I have finish my homework.",
        "I have finished my homework.",
        "I finished already my homework.",
        "I had finished my homework yesterday.",
      ],
      answer: "I have finished my homework.",
    },
  ],

  reading: [
    // Easy passage (W1-W28 range)
    {
      level: "easy",
      passage:
        "Tom has a dog named Max. Max is big and brown. Every morning, Tom takes Max for a walk in the park. Max loves to run and play with other dogs. Tom and Max are best friends.",
      questions: [
        {
          q: "What colour is Max?",
          options: ["black", "white", "brown", "yellow"],
          answer: "brown",
        },
        {
          q: "Where does Tom take Max every morning?",
          options: ["to school", "to the park", "to the beach", "to the shop"],
          answer: "to the park",
        },
      ],
    },
    // Advanced passage (W29+ range)
    {
      level: "advanced",
      passage:
        "Rainforests cover only about 6% of the Earth's surface, yet they are home to more than half of the world's plant and animal species. These dense, humid forests play a crucial role in regulating the global climate by absorbing carbon dioxide and releasing oxygen. Unfortunately, deforestation threatens these vital ecosystems at an alarming rate.",
      questions: [
        {
          q: "What percentage of Earth's surface do rainforests cover?",
          options: ["50%", "6%", "25%", "12%"],
          answer: "6%",
        },
        {
          q: "What do rainforests absorb to help regulate climate?",
          options: ["oxygen", "nitrogen", "carbon dioxide", "water vapour"],
          answer: "carbon dioxide",
        },
      ],
    },
  ],

  writing: [
    {
      level: 1,
      prompt: "Write 2-3 sentences about your favourite animal. (Use: I like..., It is..., It can...)",
      min_words: 10,
      max_words: 40,
    },
    {
      level: 2,
      prompt: "Write 3-4 sentences describing a place you love to visit. (Use good describing words.)",
      min_words: 20,
      max_words: 60,
    },
    {
      level: 3,
      prompt:
        "Write a short paragraph (4-5 sentences) explaining why it is important to protect the environment.",
      min_words: 30,
      max_words: 80,
    },
  ],
};

/**
 * Given scores across modules, compute starting week recommendation
 * scores = { vocab: 0|1|2|3, grammar: 0|1|2|3, reading: 0|1|2, writing: 0|1|2|3 }
 * Returns { startWeek, mode, cefr_level }
 */
export function computePlacementResult(scores) {
  const vocabLvl = scores.vocab || 0;
  const gramLvl = scores.grammar || 0;
  const readLvl = scores.reading || 0;
  const writeLvl = scores.writing || 0;

  const avg = (vocabLvl + gramLvl + readLvl + writeLvl) / 4;

  let startWeek, mode, cefr_level;

  if (avg >= 2.5) {
    startWeek = 29;
    mode = "advanced";
    cefr_level = "A1+";
  } else if (avg >= 1.5) {
    startWeek = 15;
    mode = "advanced";
    cefr_level = "A1";
  } else if (avg >= 0.8) {
    startWeek = 8;
    mode = "easy";
    cefr_level = "Pre-A1";
  } else {
    startWeek = 1;
    mode = "easy";
    cefr_level = "Pre-A1";
  }

  return { startWeek, mode, cefr_level };
}
