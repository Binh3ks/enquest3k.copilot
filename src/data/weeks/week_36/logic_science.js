// WEEK 36: Adventure Stories (Irregular Verbs)
// Logic and Science Station — Advanced Mode
// 100% Story-bound, age-appropriate (A1+), with story context clues

export default {
  title: "Adventure Stories Logic and Science",
  theme: "adventure_stories",
  questions: [
    {
      id: 1,
      type: "science",
      clue_statement: "We dove down 300 metres into the deep ocean in a submarine. It was dark, but our lights showed us many beautiful things.",
      question_en: "Why is it pitch dark 300 metres deep in the ocean?",
      options: [
        "Sunlight cannot reach deep under water, so submersibles need headlights",
        "The ocean water turns into black ice at 300 metres",
        "Deep sea creatures absorb all the sunlight",
        "The ocean floor turns off the lights at night"
      ],
      correct: "Sunlight cannot reach deep under water, so submersibles need headlights",
      explanation_en: "Sunlight can only penetrate the ocean down to about 200 metres (the photic zone). Below 200 metres, the deep ocean becomes completely dark!"
    },
    {
      id: 2,
      type: "logic",
      clue_statement: "Marco Polo went from Venice (Italy) to China. He rode north across high mountains, then turned right to travel east along the Silk Road.",
      question_en: "If Marco Polo travels North first and then turns 90 degrees to his right, which cardinal direction is he facing?",
      options: [
        "East",
        "West",
        "South",
        "North-West"
      ],
      correct: "East",
      explanation_en: "On a standard compass rose, turning 90 degrees to your right when facing North points directly to the East!"
    },
    {
      id: 3,
      type: "logic",
      clue_statement: "Our submarine dove down 300 metres into the ocean, then carefully rose up 120 metres to explore an underwater cave.",
      question_en: "At what depth is the submarine exploring the cave now?",
      options: [
        "180 metres",
        "420 metres",
        "200 metres",
        "150 metres"
      ],
      correct: "180 metres",
      explanation_en: "300 metres deep minus 120 metres ascending = 180 metres deep!"
    },
    {
      id: 4,
      type: "science",
      clue_statement: "The best find took our breath away — a 16th-century gold compass used by early sea explorers.",
      question_en: "How does a compass needle help explorers find direction at sea?",
      options: [
        "Its magnetic needle aligns with Earth's magnetic field to point North",
        "The needle glows in the dark whenever it faces South",
        "The compass needle points toward the nearest island",
        "The needle rotates with the ocean waves"
      ],
      correct: "Its magnetic needle aligns with Earth's magnetic field to point North",
      explanation_en: "Earth acts like a giant magnet! A compass needle is a small magnet that naturally aligns with Earth's magnetic field to point toward Magnetic North."
    },
    {
      id: 5,
      type: "logic",
      clue_statement: "Marco Polo left Venice when he was 17 years old in 1271 and returned home to Venice in 1295.",
      question_en: "How many years did Marco Polo's epic journey to China and back last?",
      options: [
        "24 years",
        "17 years",
        "41 years",
        "12 years"
      ],
      correct: "24 years",
      explanation_en: "1295 minus 1271 = 24 years! Marco Polo left at age 17 and returned at age 41 (41 - 17 = 24)."
    }
  ]
};