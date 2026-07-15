export const week29GamesEasy = {
  title: "Games: Off We Go! — Easy Mode",
  image_url: null,
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
    word_list: ["adventure", "magic", "carpet", "island", "trip", "dolphin", "coast", "pilot", "doctor", "farmer", "teacher", "driver", "nurse"],
    instructions_easy: "Say the word clearly, then add a short phrase, then make a sentence using went, ran, came, or flew.",
    instructions_advanced: "Use the word in a full Past Simple sentence about a journey. Use: went / ran / came / flew.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a sentence using the word and a past verb."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a simple sentence about the plane trip.",
    instructions_advanced: "Unscramble the words to make a Past Simple sentence about the journey.",
    sentences_easy: [
      { scrambled: ["We", "went", "to", "the", "airport"], answer: "We went to the airport." },
      { scrambled: ["Dad", "ran", "so", "fast"], answer: "Dad ran so fast." },
      { scrambled: ["The", "plane", "flew", "up"], answer: "The plane flew up." },
      { scrambled: ["Grandma", "came", "to", "hug", "us"], answer: "Grandma came to hug us." },
      { scrambled: ["It", "was", "a", "great", "adventure"], answer: "It was a great adventure." }
    ],
    sentences_advanced: [
      { scrambled: ["We", "went", "to", "the", "airport", "by", "taxi"], answer: "We went to the airport by taxi." },
      { scrambled: ["Dad", "ran", "to", "the", "gate", "very", "fast"], answer: "Dad ran to the gate very fast." },
      { scrambled: ["The", "plane", "flew", "above", "the", "white", "clouds"], answer: "The plane flew above the white clouds." },
      { scrambled: ["We", "came", "to", "Da", "Nang", "at", "last"], answer: "We came to Da Nang at last." },
      { scrambled: ["Grandma", "ran", "to", "hug", "us", "at", "the", "airport"], answer: "Grandma ran to hug us at the airport." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the plane trip using where, who, or how.",
    instructions_advanced: "Ask a question about the journey using what, where, who, or how.",
    contexts_easy: [
      {
        id: "w29e_where_went",
        task_type: "find_question",
        topic: "trip destination",
        intro: "We went to the airport and flew to Da Nang. Ask where we went.",
        acceptedQuestions: ["Where did you go?", "Where did Lily go?", "Where did the family go?"],
        answer: "We went to the airport and flew to Da Nang.",
        question_hints: ["Where did you go?"],
        required_question_words: ["where"],
        required_keywords: ["go", "went", "airport"],
        hints: { words: ["where", "did", "you", "go"], tricky: ["who", "why"] }
      },
      {
        id: "w29e_how_went",
        task_type: "find_question",
        topic: "how they traveled",
        intro: "Lily's family went to the airport by taxi. Ask how they got there.",
        acceptedQuestions: ["How did you get to the airport?", "How did Lily's family go?", "How did they travel?"],
        answer: "We went to the airport by taxi.",
        question_hints: ["How did you get to the airport?"],
        required_question_words: ["how"],
        required_keywords: ["how", "taxi", "go", "went"],
        hints: { words: ["how", "did", "you", "go"], tricky: ["where", "who"] }
      },
      {
        id: "w29e_who_came",
        task_type: "find_question",
        topic: "arrival",
        intro: "Grandma came to meet Lily at Da Nang Airport. Ask who came.",
        acceptedQuestions: ["Who came to meet you?", "Who came to the airport?", "Who ran to hug you?"],
        answer: "Grandma came to meet us at the airport.",
        question_hints: ["Who came to meet you?"],
        required_question_words: ["who"],
        required_keywords: ["grandma", "came", "meet"],
        hints: { words: ["who", "came", "to", "meet", "you"], tricky: ["where", "what"] }
      }
    ],
    contexts_advanced: [
      {
        id: "w29e_adv_fly",
        task_type: "find_question",
        topic: "flying experience",
        intro: "The plane flew above the clouds and Lily looked out the window. Ask what Lily saw from the window.",
        acceptedQuestions: ["What did Lily see from the window?", "What did Lily look at?", "What could Lily see outside?"],
        answer: "Lily saw the clouds and the tiny cars below from the window.",
        question_hints: ["What did Lily see from the window?"],
        required_question_words: ["what"],
        required_keywords: ["Lily", "see", "window", "clouds"],
        hints: { words: ["what", "did", "Lily", "see", "from", "the", "window"], tricky: ["where", "who"] }
      }
    ]
  }
};
