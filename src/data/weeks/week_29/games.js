export const week29GamesAdvanced = {
  weekId: 29,
  theme: "Off We Go! — Irregular Verbs 1 Adventure",
  games: [
    {
      id: "verb_blast",
      title: "Verb Blast!",
      description: "Shoot the correct past tense form. Irregular verbs: go, run, come, fly.",
      type: "multiple_choice_rapid",
      questions: [
        { prompt: "go → ?", options: ["went", "goed", "going", "gone"], correct: "went" },
        { prompt: "run → ?", options: ["runned", "ran", "runs", "run"], correct: "ran" },
        { prompt: "come → ?", options: ["comed", "coming", "came", "comes"], correct: "came" },
        { prompt: "fly → ?", options: ["flyed", "flown", "flies", "flew"], correct: "flew" },
        { prompt: "Yesterday, we ___ to the airport.", options: ["go", "goes", "gone", "went"], correct: "went" },
        { prompt: "Dad ___ to the gate quickly.", options: ["runned", "run", "ran", "runs"], correct: "ran" },
        { prompt: "Mum ___ with the luggage.", options: ["comed", "come", "comes", "came"], correct: "came" },
        { prompt: "The plane ___ above the clouds.", options: ["flyed", "fly", "flies", "flew"], correct: "flew" }
      ]
    },
    {
      id: "airport_adventure",
      title: "Airport Adventure",
      description: "Help the family get to their destination! Answer questions to move forward.",
      type: "quiz_journey",
      questions: [
        { question: "What do you call where a plane lands and takes off?", options: ["platform", "route", "airport", "vehicle"], correct: "airport" },
        { question: "What is the word for your travel bags and suitcases?", options: ["tickets", "luggage", "route", "delay"], correct: "luggage" },
        { question: "When a plane is late, there is a...?", options: ["destination", "arrival", "delay", "departure"], correct: "delay" },
        { question: "The place where you stand and wait for a train is the...?", options: ["airport", "platform", "ticket", "adventure"], correct: "platform" },
        { question: "The place you are travelling TO is your...?", options: ["departure", "route", "arrival", "destination"], correct: "destination" },
        { question: "A person travelling on a plane or bus is a...?", options: ["vehicle", "passenger", "pilot", "ticket"], correct: "passenger" }
      ]
    },
    {
      id: "sentence_builder",
      title: "Journey Sentence Builder",
      description: "Put the words in the right order to make a correct sentence.",
      type: "word_order",
      sentences: [
        { words: ["We", "went", "airport", "to", "the", "by", "taxi", "."], correct: "We went to the airport by taxi ." },
        { words: ["Dad", "ran", "desk", "the", "to", "check-in", "."], correct: "Dad ran to the check-in desk ." },
        { words: ["The", "plane", "clouds", "above", "the", "flew", "."], correct: "The plane flew above the clouds ." },
        { words: ["Mum", "came", "the", "with", "luggage", "."], correct: "Mum came with the luggage ." },
        { words: ["did", "not", "We", "go", "by", "bus", "."], correct: "We did not go by bus ." }
      ]
    }
  ]
};
