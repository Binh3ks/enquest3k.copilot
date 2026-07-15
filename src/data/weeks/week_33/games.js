export const week33GamesAdvanced = {
  title: "Games: The Mistake — Irregular Verbs 5: Accidents",
  image_url: null,
  audio_url: "/audio/week33/games_main.mp3",
  games: [
    {
      id: "accident_verb_match",
      type: "matching",
      title_en: "Accident Verb Match!",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Noi moi dong tu nguyen mau voi dang qua khu cua no.",
      cards: [
        { id: "a1", type: "word", value: "hit" }, { id: "a2", type: "meaning", value: "hit" },
        { id: "b1", type: "word", value: "fall" }, { id: "b2", type: "meaning", value: "fell" },
        { id: "c1", type: "word", value: "break" }, { id: "c2", type: "meaning", value: "broke" },
        { id: "d1", type: "word", value: "hurt" }, { id: "d2", type: "meaning", value: "hurt" },
        { id: "e1", type: "word", value: "bite" }, { id: "e2", type: "meaning", value: "bit" },
        { id: "f1", type: "word", value: "begin" }, { id: "f2", type: "meaning", value: "began" },
        { id: "g1", type: "word", value: "lose" }, { id: "g2", type: "meaning", value: "lost" },
        { id: "h1", type: "word", value: "forget" }, { id: "h2", type: "meaning", value: "forgot" }
      ]
    },
    {
      id: "accident_sequence",
      type: "sorting",
      title_en: "Jake's Accident Sequence!",
      instruction_en: "Drag each event into the correct order of Jake's accident.",
      instruction_vi: "Keo moi su kien vao dung thu tu cua tai nan cua Jake.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "Jake was running in the corridor because he was late.", correct: "Step 1 (First)" },
        { text: "He hit his knee on the corner of a table.", correct: "Step 1 (First)" },
        { text: "He fell down hard and broke a glass cup.", correct: "Step 2 (Next)" },
        { text: "His arm hurt and he bit his tongue.", correct: "Step 2 (Next)" },
        { text: "The nurse put a cold pack on his knee.", correct: "Step 3 (After that)" },
        { text: "Jake told the truth to the teacher.", correct: "Step 3 (After that)" },
        { text: "He learned to always walk carefully in the corridor.", correct: "Step 4 (Finally)" },
        { text: "Jake recovered at home and promised to be more careful.", correct: "Step 4 (Finally)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["accident", "corridor", "cold pack", "lesson", "carefully", "catch", "terrible", "understand", "explain", "recover"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use hit/fell/broke in a sentence.",
    instructions_advanced: "Use the word in a full Past Simple sentence about Jake's accident, with ran / hit / fell / broke / hurt.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence using the word."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about Jake's accident.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence using accident verbs.",
    sentences_easy: [
      { scrambled: ["Jake", "was", "running", "in", "the", "corridor"], answer: "Jake was running in the corridor." },
      { scrambled: ["He", "hit", "his", "knee", "on", "the", "table"], answer: "He hit his knee on the table." },
      { scrambled: ["Jake", "fell", "down", "and", "broke", "the", "cup"], answer: "Jake fell down and broke the cup." },
      { scrambled: ["His", "knee", "hurt", "a", "lot"], answer: "His knee hurt a lot." },
      { scrambled: ["The", "nurse", "put", "a", "cold", "pack", "on", "his", "knee"], answer: "The nurse put a cold pack on his knee." }
    ],
    sentences_advanced: [
      { scrambled: ["Jake", "was", "running", "in", "the", "corridor", "because", "he", "was", "late"], answer: "Jake was running in the corridor because he was late." },
      { scrambled: ["He", "hit", "his", "knee", "on", "the", "corner", "of", "a", "table"], answer: "He hit his knee on the corner of a table." },
      { scrambled: ["Jake", "fell", "down", "hard", "and", "broke", "the", "glass", "cup"], answer: "Jake fell down hard and broke the glass cup." },
      { scrambled: ["He", "hurt", "his", "arm", "and", "bit", "his", "tongue"], answer: "He hurt his arm and bit his tongue." },
      { scrambled: ["The", "nurse", "put", "a", "cold", "pack", "on", "his", "knee", "to", "help"], answer: "The nurse put a cold pack on his knee to help." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about Jake's accident using what, where, when, or why.",
    instructions_advanced: "Ask a Past Simple question about Jake's accident that uses accident verbs.",
    contexts_easy: [
      {
        id: "w33_where_accident",
        task_type: "find_question",
        topic: "accident location",
        intro: "Jake had an accident in the school corridor. Ask where Jake had the accident.",
        acceptedQuestions: ["Where did Jake have the accident?", "Where did it happen?", "Where was Jake?"],
        answer: "Jake had the accident in the school corridor."
      },
      {
        id: "w33_why_ran",
        task_type: "find_question",
        topic: "accident cause",
        intro: "Jake was running because he was late for class. Ask why Jake was running.",
        acceptedQuestions: ["Why was Jake running?", "Why did Jake run?", "Why was Jake late?"],
        answer: "Jake was running because he was late for class."
      }
    ],
    contexts_advanced: [
      {
        id: "w33_adv_what_happened",
        task_type: "find_question",
        topic: "accident sequence",
        intro: "Jake hit his knee on the table, fell down, broke a cup, and hurt his arm. Ask what happened in Jake's accident.",
        acceptedQuestions: ["What happened to Jake in the corridor?", "What did Jake hit?", "What happened when Jake fell?"],
        answer: "Jake hit his knee on the table, fell down, broke the cup, and hurt his arm."
      },
      {
        id: "w33_adv_what_hurt",
        task_type: "find_question",
        topic: "injuries",
        intro: "Jake hurt his knee, arm, and bit his tongue in the accident. Ask what parts of his body were hurt.",
        acceptedQuestions: ["What parts of his body did Jake hurt?", "What did he hurt?", "What body parts were injured?"],
        answer: "Jake hurt his knee, arm, and bit his tongue."
      }
    ]
  }
};

export default week33GamesAdvanced;
