export default {
  title: "Sports Science & Physical Logic",
  theme: "sports_day",
  questions: [
    {
      id: 1,
      type: "science",
      clue_statement: "When Leo ran very fast along the track, his heart beat faster and his breathing increased.",
      question_en: "Why does your heart beat faster when you run in a relay race?",
      options: [
        "To pump oxygen-rich blood faster to working leg muscles",
        "Because muscles turn into ice during sports",
        "Because lungs stop working when you run",
        "To cool down the weather on the track"
      ],
      correct: "To pump oxygen-rich blood faster to working leg muscles",
      explanation_en: "Active muscles require extra oxygen during exercise. The heart pumps faster to deliver oxygen through the bloodstream!"
    },
    {
      id: 2,
      type: "logic",
      clue_statement: "Runner A passed the baton to Runner B, who passed it to Runner C, who handed it to Runner D at the finish.",
      question_en: "If Runner B was delayed by 3 seconds, who receives the baton later than expected?",
      options: [
        "Runner C and Runner D",
        "Only Runner A",
        "Nobody in the team",
        "The coach in the stands"
      ],
      correct: "Runner C and Runner D",
      explanation_en: "Since a relay is a sequential chain (A→B→C→D), any delay in leg 2 affects all subsequent runners!"
    },
    {
      id: 3,
      type: "science",
      clue_statement: "Breathing fresh outdoor air and absorbing bright sunlight helps our body produce Vitamin D.",
      question_en: "Which vitamin does our skin synthesize when exposed to healthy morning sunlight?",
      options: [
        "Vitamin D",
        "Vitamin C",
        "Vitamin A",
        "Vitamin B12"
      ],
      correct: "Vitamin D",
      explanation_en: "Sunlight contains UV rays that interact with skin cells to synthesize Vitamin D, which strengthens bones!"
    },
    {
      id: 4,
      type: "logic",
      clue_statement: "The 400m track has 4 lanes. Runner in Lane 1 starts further back than Lane 4 around curves.",
      question_en: "Why do outer lanes get a staggered starting line in track races?",
      options: [
        "Because outer lanes cover a larger curve radius, making total distance equal",
        "To give outer runners an unfair advantage",
        "Because inner lanes are reserved for coaches",
        "To make the track look more colorful"
      ],
      correct: "Because outer lanes cover a larger curve radius, making total distance equal",
      explanation_en: "Outer curves are wider. Staggered starting lines ensure every runner covers exactly 400 metres!"
    },
    {
      id: 5,
      type: "science",
      clue_statement: "After drinking fresh water and taking 30 minutes of exercise, athletes feel energized.",
      question_en: "Why is staying hydrated important during sports day?",
      options: [
        "Water replaces fluid lost through sweat and prevents muscle cramps",
        "Water makes shoes run faster on grass",
        "Water changes muscle color to blue",
        "Water stops the sun from shining"
      ],
      correct: "Water replaces fluid lost through sweat and prevents muscle cramps",
      explanation_en: "Sweating lowers body fluids. Drinking water maintains healthy hydration and muscle performance!"
    }
  ]
};
