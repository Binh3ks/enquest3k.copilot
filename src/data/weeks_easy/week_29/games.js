export const week29GamesEasy = {
  title: "Games: Off We Go! — Easy Mode",
  image_url: "/images/week29/games_cover_w29.jpg",
  audio_url: "/audio/week29_easy/games_main.mp3",
  games: [
    {
      id: "verb_match_easy",
      type: "matching",
      title_en: "Past Tense Match!",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Noi moi dong tu nguyen mau voi dang qua khu.",
      cards: [
        { id: "a1", type: "word", value: "go" }, { id: "a2", type: "meaning", value: "went" },
        { id: "b1", type: "word", value: "run" }, { id: "b2", type: "meaning", value: "ran" },
        { id: "c1", type: "word", value: "come" }, { id: "c2", type: "meaning", value: "came" },
        { id: "d1", type: "word", value: "fly" }, { id: "d2", type: "meaning", value: "flew" },
        { id: "e1", type: "word", value: "airport" }, { id: "e2", type: "meaning", value: "san bay" },
        { id: "f1", type: "word", value: "journey" }, { id: "f2", type: "meaning", value: "hanh trinh" },
        { id: "g1", type: "word", value: "adventure" }, { id: "g2", type: "meaning", value: "cuoc phieu luu" }
      ]
    },
    {
      id: "trip_sequence_easy",
      type: "sorting",
      title_en: "My Trip Sequence!",
      instruction_en: "Put the events of the plane trip in the right order.",
      instruction_vi: "Sap xep cac su kien chuyen bay theo dung thu tu.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "We went to the airport by taxi.", correct: "Step 1 (First)" },
        { text: "Dad ran to the gate because our departure was soon.", correct: "Step 1 (First)" },
        { text: "We got on the plane and I sat by the window.", correct: "Step 2 (Next)" },
        { text: "The plane flew up into the sky!", correct: "Step 2 (Next)" },
        { text: "We flew above the white clouds.", correct: "Step 3 (After that)" },
        { text: "The cars below looked very small from the window.", correct: "Step 3 (After that)" },
        { text: "We landed and came to the arrival hall.", correct: "Step 4 (Finally)" },
        { text: "Grandma ran to hug us. It was the best adventure ever!", correct: "Step 4 (Finally)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["journey", "airport", "ticket", "luggage", "departure", "arrival", "destination", "adventure", "passenger", "vehicle"],
    instructions_easy: "Say the word clearly, then add a short phrase, then make a sentence using went, ran, came, or flew.",
    instructions_advanced: "Use the word in a full Past Simple sentence about a journey. Use: went / ran / came / flew.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a sentence using the word and a past verb."
    }
  }
};
