// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Logic & Science Station — Advanced Mode

export default {
  title: "Accidents and Consequences",
  theme: "accidents_and_consequences",
  questions: [
    {
      id: 1,
      type: "sequence",
      question_en: "Put the events in order:",
      scenario: "Jake had an accident in the corridor.",
      steps: [
        "Jake was running in the corridor.",
        "He hit his knee on the table.",
        "He fell down on the floor.",
        "The nurse put a cold pack on his knee.",
        "Jake promised to walk carefully."
      ]
    },
    {
      id: 2,
      type: "cause_effect",
      question_en: "What happened BECAUSE Jake was running?",
      scenario: "Jake was running because he was late.",
      answer: "Jake had an accident and fell down.",
      choices: [
        "Jake arrived early to class.",
        "Jake hit his knee and fell.",
        "Jake walked carefully."
      ]
    },
    {
      id: 3,
      type: "vocabulary",
      question_en: "What is the connection between these words?",
      words: ["accident", "fall", "hurt"],
      answer: "They are all related to injuries and accidents."
    }
  ]
};
