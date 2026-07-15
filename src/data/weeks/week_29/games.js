export const week29GamesAdvanced = {
  title: "Games: Off We Go! — Irregular Verbs 1",
  image_url: null,
  audio_url: "/audio/week29/games_main.mp3",
  games: [
    {
      id: "verb_time_machine",
      type: "matching",
      title_en: "Verb Time Machine!",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Noi moi dong tu nguyen mau voi dang qua khu cua no.",
      cards: [
        { id: "a1", type: "word", value: "go" }, { id: "a2", type: "meaning", value: "went" },
        { id: "b1", type: "word", value: "run" }, { id: "b2", type: "meaning", value: "ran" },
        { id: "c1", type: "word", value: "come" }, { id: "c2", type: "meaning", value: "came" },
        { id: "d1", type: "word", value: "fly" }, { id: "d2", type: "meaning", value: "flew" },
        { id: "e1", type: "word", value: "journey" }, { id: "e2", type: "meaning", value: "cuoc hanh trinh" },
        { id: "f1", type: "word", value: "departure" }, { id: "f2", type: "meaning", value: "khoi hanh" },
        { id: "g1", type: "word", value: "destination" }, { id: "g2", type: "meaning", value: "diem den" }
      ]
    },
    {
      id: "airport_sequence",
      type: "sorting",
      title_en: "Airport Story Sequence!",
      instruction_en: "Drag each event into the correct order of Lily's journey.",
      instruction_vi: "Keo moi su kien vao dung thu tu cua hanh trinh cua Lily.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "Lily's family went to the airport by taxi.", correct: "Step 1 (First)" },
        { text: "Dad ran to the check-in desk because they were early.", correct: "Step 1 (First)" },
        { text: "Mum came through the doors with two big suitcases.", correct: "Step 2 (Next)" },
        { text: "They rushed to the departure gate for boarding.", correct: "Step 2 (Next)" },
        { text: "The plane flew up into the blue sky above the clouds.", correct: "Step 3 (After that)" },
        { text: "Lily pressed her face against the window to see the tiny cars below.", correct: "Step 3 (After that)" },
        { text: "The plane landed at Da Nang — their destination.", correct: "Step 4 (Finally)" },
        { text: "Grandma ran to hug everyone and asked: 'How was the journey?'", correct: "Step 4 (Finally)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["adventure", "magic", "carpet", "island", "trip", "dolphin", "coast", "pilot", "doctor", "farmer", "teacher", "driver", "nurse"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use went/ran/came/flew in a sentence.",
    instructions_advanced: "Use the word in a full Past Simple sentence about a travel experience, with went / ran / came / flew.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence using the word."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about the airport journey.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence using travel vocabulary.",
    sentences_easy: [
      { scrambled: ["Lily", "went", "to", "the", "airport"], answer: "Lily went to the airport." },
      { scrambled: ["Dad", "ran", "to", "the", "check-in", "desk"], answer: "Dad ran to the check-in desk." },
      { scrambled: ["The", "plane", "flew", "above", "the", "clouds"], answer: "The plane flew above the clouds." },
      { scrambled: ["Grandma", "came", "to", "meet", "them"], answer: "Grandma came to meet them." },
      { scrambled: ["It", "was", "the", "best", "adventure", "ever"], answer: "It was the best adventure ever!" }
    ],
    sentences_advanced: [
      { scrambled: ["Lily's", "family", "went", "to", "the", "airport", "by", "taxi", "on", "Saturday"], answer: "Lily's family went to the airport by taxi on Saturday." },
      { scrambled: ["Dad", "ran", "to", "the", "check-in", "desk", "because", "their", "departure", "was", "in", "30", "minutes"], answer: "Dad ran to the check-in desk because their departure was in 30 minutes." },
      { scrambled: ["Mum", "came", "through", "the", "doors", "pulling", "two", "big", "pieces", "of", "luggage"], answer: "Mum came through the doors pulling two big pieces of luggage." },
      { scrambled: ["The", "plane", "flew", "up", "into", "the", "sky", "and", "the", "vehicles", "below", "looked", "like", "tiny", "toys"], answer: "The plane flew up into the sky and the vehicles below looked like tiny toys." },
      { scrambled: ["Grandma", "ran", "from", "the", "arrival", "hall", "to", "hug", "them", "at", "their", "destination"], answer: "Grandma ran from the arrival hall to hug them at their destination." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple Past Simple question about the airport journey using who, what, where, or how.",
    instructions_advanced: "Ask a Past Simple question about Lily's journey using travel vocabulary from Week 29.",
    contexts_easy: [
      {
        id: "w29_where_went",
        task_type: "find_question",
        topic: "airport journey",
        intro: "Lily and her family went to the airport. Ask where they went.",
        acceptedQuestions: ["Where did Lily go?", "Where did the family go?", "Where did they go?"],
        answer: "Lily and her family went to the airport.",
        question_hints: ["Where did Lily go?", "Where did the family go?"],
        required_question_words: ["where"],
        required_keywords: ["go", "went", "airport"],
        hints: { words: ["where", "did", "Lily", "go"], tricky: ["who", "why"] }
      },
      {
        id: "w29_who_ran",
        task_type: "find_question",
        topic: "running to check-in",
        intro: "Dad ran to the check-in desk because they were nearly late. Ask who ran.",
        acceptedQuestions: ["Who ran to the check-in desk?", "Who ran to the desk?", "Who ran?"],
        answer: "Dad ran to the check-in desk.",
        question_hints: ["Who ran to the check-in desk?"],
        required_question_words: ["who"],
        required_keywords: ["ran", "dad"],
        hints: { words: ["who", "ran", "to", "the", "desk"], tricky: ["where", "why"] }
      },
      {
        id: "w29_where_flew",
        task_type: "find_question",
        topic: "destination",
        intro: "The plane flew to Da Nang — their destination. Ask where the plane flew.",
        acceptedQuestions: ["Where did the plane fly?", "Where did they fly to?", "Where did Lily fly?"],
        answer: "The plane flew to Da Nang.",
        question_hints: ["Where did the plane fly?"],
        required_question_words: ["where"],
        required_keywords: ["fly", "flew", "plane"],
        hints: { words: ["where", "did", "the", "plane", "fly"], tricky: ["who", "how"] }
      }
    ],
    contexts_advanced: [
      {
        id: "w29_adv_luggage",
        task_type: "find_question",
        topic: "packing and arrival",
        intro: "Mum came through the airport doors pulling two big pieces of luggage and smiling calmly. Ask what Mum was carrying.",
        acceptedQuestions: ["What was Mum carrying?", "What did Mum bring to the airport?", "What did Mum pull through the doors?"],
        answer: "Mum came pulling two big pieces of luggage.",
        question_hints: ["What was Mum carrying?", "What did Mum pull?"],
        required_question_words: ["what"],
        required_keywords: ["mum", "carry", "luggage"],
        hints: { words: ["what", "did", "Mum", "carry", "bring"], tricky: ["who", "where"] }
      },
      {
        id: "w29_adv_window",
        task_type: "find_question",
        topic: "view from the plane",
        intro: "Lily pressed her face against the glass when the plane flew above the clouds. The vehicles on the roads below looked like tiny toys. Ask what Lily saw from the window.",
        acceptedQuestions: ["What did Lily see from the window?", "What did the vehicles look like from the plane?", "What did Lily see when the plane flew above the clouds?"],
        answer: "Lily saw the vehicles and roads below — they looked like tiny toys.",
        question_hints: ["What did Lily see from the window?"],
        required_question_words: ["what"],
        required_keywords: ["Lily", "see", "saw", "window", "vehicles"],
        hints: { words: ["what", "did", "Lily", "see", "from", "the", "window"], tricky: ["where", "why"] }
      }
    ]
  }
};

