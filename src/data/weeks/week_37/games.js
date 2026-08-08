export const week_37GamesAdvanced = {
  title: "Games: The Sports Day Challenge",
  image_url: null,
  audio_url: "/audio/week37/games_main.mp3",
  games: [
    { id: "sports_categories", type: "categories", title: "Sports Categories",
      instructions_easy: "Put each word into the correct category: Gear, Actions, or People.",
      instructions_advanced: "Categorize each word into Gear, Actions, or People related to track sports.",
      categories: ["Gear", "Actions", "People"],
      sentences: [
        { text: "Baton", correct: "Gear" },
        { text: "Sprinted", correct: "Actions" },
        { text: "Athlete", correct: "People" },
        { text: "Track shoes", correct: "Gear" },
        { text: "Passed", correct: "Actions" },
        { text: "Spectator", correct: "People" },
        { text: "Medal", correct: "Gear" },
        { text: "Cheered", correct: "Actions" },
        { text: "Opponent", correct: "People" }
      ]
    },
    { id: "sports_word_smash", type: "word_smash", title: "Sports Word Smash",
      instructions_easy: "Say the word clearly, then use it in a short sentence.",
      instructions_advanced: "Use the word in a full sentence with an adverb of manner (-ly).",
      word_list: ["relay", "baton", "stadium", "sprint", "spectator", "teamwork", "victory", "trophy"]
    },
    { id: "sports_scramble", type: "sentence_scramble", title: "Sports Sentence Scramble",
      instructions_easy: "Unscramble the words to make a sentence about sports day.",
      instructions_advanced: "Unscramble the words to make a sentence about sports day.",
      sentences: [
        { scrambled: ["Leo", "ran", "very", "fast"], answer: "Leo ran very fast." },
        { scrambled: ["He", "passed", "the", "baton", "cleanly"], answer: "He passed the baton cleanly." },
        { scrambled: ["Max", "sprinted", "to", "the", "finish", "line"], answer: "Max sprinted to the finish line." },
        { scrambled: ["Their", "teamwork", "brought", "a", "great", "victory"], answer: "Their teamwork brought a great victory." }
      ]
    }
  ]
};

export default week_37GamesAdvanced;
