// WEEK 36: Adventure Stories (Irregular Verbs)
// Games Station — Easy Mode

export const week_36GamesEasy = {
  title: "Adventure Games",
  image_url: null,
  audio_url: "/audio/week36/games_easy.mp3",
  games: [
    { id: "adventure_categories", type: "categories", title: "Adventure Categories",
      instructions_easy: "Put each word into the correct category: Place, Action, or Person.",
      categories: ["Places", "Actions", "People"],
      sentences: [
        { text: "Cave", correct: "Places" },
        { text: "Went", correct: "Actions" },
        { text: "Explorer", correct: "People" },
        { text: "Museum", correct: "Places" },
        { text: "Found", correct: "Actions" },
        { text: "Merchant", correct: "People" }
      ]
    },
    { id: "adventure_scramble", type: "sentence_scramble", title: "Adventure Sentence Scramble",
      instructions_easy: "Unscramble the words to make a sentence.",
      sentences: [
        { scrambled: ["I", "went", "on", "a", "trip"], answer: "I went on a trip." },
        { scrambled: ["We", "found", "a", "cave"], answer: "We found a cave." },
        { scrambled: ["She", "saw", "a", "compass"], answer: "She saw a compass." },
        { scrambled: ["He", "took", "a", "photo"], answer: "He took a photo." }
      ]
    }
  ]
};