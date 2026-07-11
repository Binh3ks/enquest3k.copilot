// WEEK 36: Adventure Stories (Irregular Verbs)
// Games Station — Advanced Mode

export const week_36GamesAdvanced = {
  title: "Games: Adventure Stories",
  image_url: null,
  audio_url: "/audio/week36/games_main.mp3",
  games: [
    { id: "adventure_modal_verbs", type: "categories", title: "Adventure Categories",
      instructions_easy: "Put each word into the correct category: Place, Action, or Person.",
      instructions_advanced: "Categorize each word into Places, Actions, or People related to adventure.",
      categories: ["Places", "Actions", "People"],
      sentences: [
        { text: "Submarine", correct: "Places" },
        { text: "Dived", correct: "Actions" },
        { text: "Explorers", correct: "People" },
        { text: "Silk Road", correct: "Places" },
        { text: "Discovered", correct: "Actions" },
        { text: "Merchants", correct: "People" }
      ]
    },
    { id: "adventure_word_smash", type: "word_smash", title: "Adventure Word Smash",
      instructions_easy: "Say the word clearly, then use it in a sentence about an adventure.",
      instructions_advanced: "Say the word, use a short phrase with it, then make a sentence about an adventure.",
      word_list: ["submarine", "cave", "compass", "museum", "discovery", "explorer", "adventure", "treasure"],
      instructions_easy: "Say the word clearly, then use it in a sentence about an adventure.",
      instructions_advanced: "Use the word in a full sentence with an irregular verb about an adventure."
    },
    { id: "adventure_scramble", type: "sentence_scramble", title: "Adventure Sentence Scramble",
      instructions_easy: "Unscramble the words to make a sentence about an adventure.",
      instructions_advanced: "Unscramble the words to make a sentence about an adventure.",
      sentences: [
        { scrambled: ["I", "went", "on", "an", "adventure"], answer: "I went on an adventure." },
        { scrambled: ["We", "saw", "a", "beautiful", "cave"], answer: "We saw a beautiful cave." },
        { scrambled: ["He", "found", "a", "gold", "compass"], answer: "He found a gold compass." },
        { scrambled: ["They", "took", "many", "photos"], answer: "They took many photos." }
      ]
    }
  ]
};