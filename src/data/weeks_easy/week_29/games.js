export const week29GamesEasy = {
  weekId: 29,
  theme: "Off We Go! — Irregular Verbs 1 (Easy)",
  games: [
    {
      id: "verb_match_easy",
      title: "Past Tense Match!",
      description: "Match each base verb to its past form.",
      type: "multiple_choice_rapid",
      questions: [
        { prompt: "go → ?", options: ["went", "goed", "go", "goes"], correct: "went" },
        { prompt: "run → ?", options: ["runned", "ran", "run", "runs"], correct: "ran" },
        { prompt: "come → ?", options: ["comed", "came", "come", "comes"], correct: "came" },
        { prompt: "fly → ?", options: ["flyed", "flew", "fly", "flies"], correct: "flew" },
        { prompt: "Yesterday, we ___ to the airport.", options: ["go", "going", "went", "gone"], correct: "went" },
        { prompt: "The plane ___ above the clouds.", options: ["fly", "flies", "flyed", "flew"], correct: "flew" }
      ]
    },
    {
      id: "travel_quiz_easy",
      title: "Travel Quiz!",
      description: "Answer questions about travel words.",
      type: "quiz_journey",
      questions: [
        { question: "A place where planes take off and land:", options: ["route", "airport", "platform", "vehicle"], correct: "airport" },
        { question: "Your bags when you travel:", options: ["ticket", "delay", "luggage", "arrival"], correct: "luggage" },
        { question: "The place you are going TO:", options: ["departure", "arrival", "destination", "route"], correct: "destination" },
        { question: "When a plane is late:", options: ["arrival", "journey", "delay", "ticket"], correct: "delay" },
        { question: "A person who travels on a plane:", options: ["pilot", "driver", "passenger", "vehicle"], correct: "passenger" },
        { question: "An exciting trip:", options: ["delay", "luggage", "platform", "adventure"], correct: "adventure" }
      ]
    }
  ]
};
