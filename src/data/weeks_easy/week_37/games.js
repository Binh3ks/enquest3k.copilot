export const week_37GamesAdvanced = {
  title: "Games: Sports Day & Global Olympics",
  image_url: null,
  audio_url: null,
  games: [
    {
      id: "sports_day_categories",
      type: "categories",
      title: "Sports Day Categories",
      instructions_easy: "Put each word into the correct category: Speed Science, History, or Nations.",
      instructions_advanced: "Categorize each word into Speed Science, Olympic History, or Global Nations.",
      categories: ["Speed Science", "Olympic History", "Global Nations"],
      sentences: [
        { text: "Velocity", correct: "Speed Science" },
        { text: "Sacred Truce", correct: "Olympic History" },
        { text: "Kenya", correct: "Global Nations" },
        { text: "Momentum", correct: "Speed Science" },
        { text: "Olympia", correct: "Olympic History" },
        { text: "Greece", correct: "Global Nations" }
      ]
    },
    {
      id: "sports_day_word_smash",
      type: "word_smash",
      title: "Sports Day Word Smash",
      instructions_easy: "Say the word clearly, then use it in a sentence about sports.",
      instructions_advanced: "Say the word, use a short phrase with it, then make a full sentence about sports science.",
      word_list: ["relay", "baton", "velocity", "momentum", "truce", "stadium", "athlete", "champion"]
    },
    {
      id: "sports_day_scramble",
      type: "sentence_scramble",
      title: "Sports Day Sentence Scramble",
      instructions_easy: "Unscramble the words to make a sentence about sports.",
      instructions_advanced: "Unscramble the words to make a complete sentence about sports science or history.",
      sentences: [
        { scrambled: ["Leo", "passed", "the", "baton", "cleanly"], answer: "Leo passed the baton cleanly." },
        { scrambled: ["Velocity", "equals", "distance", "over", "time"], answer: "Velocity equals distance over time." },
        { scrambled: ["Ancient", "leaders", "declared", "a", "sacred", "truce"], answer: "Ancient leaders declared a sacred truce." },
        { scrambled: ["Kenyan", "runners", "trained", "in", "the", "mountains"], answer: "Kenyan runners trained in the mountains." }
      ]
    }
  ]
};

export default week_37GamesAdvanced;
