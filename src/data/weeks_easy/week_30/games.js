export const week30GamesEasy = {
  title: "Games: The Perfect Picnic — Easy Mode",
  image_url: null,
  audio_url: "/audio/week30_easy/games_main.mp3",
  games: [
    {
      id: "verb_match_easy",
      type: "matching",
      title_en: "Past Tense Match!",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Noi moi dong tu nguyen mau voi dang qua khu.",
      cards: [
        { id: "a1", type: "word", value: "eat" }, { id: "a2", type: "meaning", value: "ate" },
        { id: "b1", type: "word", value: "drink" }, { id: "b2", type: "meaning", value: "drank" },
        { id: "c1", type: "word", value: "buy" }, { id: "c2", type: "meaning", value: "bought" },
        { id: "d1", type: "word", value: "give" }, { id: "d2", type: "meaning", value: "gave" },
        { id: "e1", type: "word", value: "picnic" }, { id: "e2", type: "meaning", value: "da ngoai" },
        { id: "f1", type: "word", value: "basket" }, { id: "f2", type: "meaning", value: "cai gio" },
        { id: "g1", type: "word", value: "delicious" }, { id: "g2", type: "meaning", value: "ngon" }
      ]
    },
    {
      id: "picnic_sequence_easy",
      type: "sorting",
      title_en: "My Picnic Sequence!",
      instruction_en: "Put the events of the picnic day in the right order.",
      instruction_vi: "Sap xep cac su kien ngay da ngoai theo dung thu tu.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "Mum bought sandwiches and juice at the market.", correct: "Step 1 (First)" },
        { text: "Luna packed everything into the picnic basket.", correct: "Step 1 (First)" },
        { text: "They spread the blanket on the grass in the park.", correct: "Step 2 (Next)" },
        { text: "Tom said he was thirsty and drank cold juice.", correct: "Step 2 (Next)" },
        { text: "Luna ate a delicious sandwich and felt great.", correct: "Step 3 (After that)" },
        { text: "Dad gave everyone a cookie as a treat.", correct: "Step 3 (After that)" },
        { text: "Luna shared her biscuits with friends nearby.", correct: "Step 4 (Finally)" },
        { text: "Everyone felt cheerful. It was a perfect picnic!", correct: "Step 4 (Finally)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["picnic", "basket", "sandwich", "juice", "share", "delicious", "thirsty", "hungry", "cheerful", "ate", "drank", "bought", "gave", "engineer", "scientist", "artist", "dentist", "firefighter", "chef"],
    instructions_easy: "Say the word clearly, then add a short phrase, then make a sentence using ate, drank, bought, or gave.",
    instructions_advanced: "Use the word in a full Past Simple sentence about a meal or picnic. Use: ate / drank / bought / gave.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a sentence using the word and a past verb."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a sentence about the picnic.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence.",
    sentences_easy: [
      { scrambled: ["I", "ate", "a", "sandwich"], answer: "I ate a sandwich." },
      { scrambled: ["Tom", "drank", "his", "juice"], answer: "Tom drank his juice." },
      { scrambled: ["Mum", "bought", "food", "for", "us"], answer: "Mum bought food for us." },
      { scrambled: ["Dad", "gave", "us", "cookies"], answer: "Dad gave us cookies." },
      { scrambled: ["We", "shared", "everything"], answer: "We shared everything." }
    ],
    sentences_advanced: [
      { scrambled: ["Mum", "bought", "sandwiches", "and", "juice", "at", "the", "market"], answer: "Mum bought sandwiches and juice at the market." },
      { scrambled: ["I", "ate", "a", "delicious", "sandwich", "at", "the", "picnic"], answer: "I ate a delicious sandwich at the picnic." },
      { scrambled: ["Tom", "drank", "cold", "juice", "because", "he", "was", "thirsty"], answer: "Tom drank cold juice because he was thirsty." },
      { scrambled: ["Dad", "gave", "everyone", "a", "cookie", "to", "share"], answer: "Dad gave everyone a cookie to share." },
      { scrambled: ["we", "felt", "cheerful", "and", "happy", "at", "the", "picnic"], answer: "We felt cheerful and happy at the picnic." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the picnic using who, what, or where.",
    instructions_advanced: "Ask a question about the picnic using who, what, where, or why.",
    contexts_easy: [
      {
        id: "w30e_who_bought",
        task_type: "find_question",
        topic: "picnic food",
        intro: "Mum bought sandwiches and juice. Ask who bought the food.",
        acceptedQuestions: ["Who bought the food?", "Who bought the sandwiches?", "Who went to the market?"],
        answer: "Mum bought the sandwiches and juice.",
        question_hints: ["Who bought the food?", "Who bought the sandwiches?"],
        required_question_words: ["who"],
        required_keywords: ["bought", "food", "sandwiches"],
        hints: { words: ["who", "bought", "the", "food"], tricky: ["what", "where"] }
      },
      {
        id: "w30e_what_ate",
        task_type: "find_question",
        topic: "picnic food",
        intro: "Luna ate a delicious sandwich at the picnic. Ask what Luna ate.",
        acceptedQuestions: ["What did Luna eat?", "What did Luna have?"],
        answer: "Luna ate a delicious sandwich.",
        question_hints: ["What did Luna eat?"],
        required_question_words: ["what"],
        required_keywords: ["eat", "ate", "Luna", "sandwich"],
        hints: { words: ["what", "did", "Luna", "eat"], tricky: ["who", "where"] }
      },
      {
        id: "w30e_where_picnic",
        task_type: "find_question",
        topic: "picnic place",
        intro: "They had their picnic in the park. Ask where they had the picnic.",
        acceptedQuestions: ["Where did they have the picnic?", "Where did they go?"],
        answer: "They had the picnic at the park.",
        question_hints: ["Where did they have the picnic?", "Where did they go?"],
        required_question_words: ["where"],
        required_keywords: ["park", "picnic", "go", "went"],
        hints: { words: ["where", "did", "they", "have", "the", "picnic"], tricky: ["who", "what"] }
      }
    ],
    contexts_advanced: [
      {
        id: "w30e_adv_gave",
        task_type: "find_question",
        topic: "sharing at the picnic",
        intro: "Dad gave everyone a cookie as a treat. Ask what Dad gave everyone.",
        acceptedQuestions: ["What did Dad give everyone?", "What did Dad give to everyone?"],
        answer: "Dad gave everyone a cookie as a treat.",
        question_hints: ["What did Dad give everyone?"],
        required_question_words: ["what"],
        required_keywords: ["Dad", "give", "gave", "cookie"],
        hints: { words: ["what", "did", "Dad", "give", "everyone"], tricky: ["who", "where"] }
      },
      {
        id: "w30e_adv_thirsty",
        task_type: "find_question",
        topic: "feelings at the picnic",
        intro: "Tom drank cold juice because he was very thirsty after playing. Ask why Tom drank juice.",
        acceptedQuestions: ["Why did Tom drink juice?", "Why did Tom drink cold juice?"],
        answer: "Tom drank juice because he was very thirsty.",
        question_hints: ["Why did Tom drink juice?"],
        required_question_words: ["why"],
        required_keywords: ["Tom", "drink", "drank", "thirsty"],
        hints: { words: ["why", "did", "Tom", "drink", "juice"], tricky: ["what", "who"] }
      },
      {
        id: "w30e_adv_cheerful",
        task_type: "find_question",
        topic: "feelings after the picnic",
        intro: "Everyone felt cheerful because they ate good food and shared together. Ask how everyone felt.",
        acceptedQuestions: ["How did everyone feel?", "How did they feel at the picnic?"],
        answer: "Everyone felt cheerful because they ate good food and shared together.",
        question_hints: ["How did everyone feel?", "How did they feel?"],
        required_question_words: ["how"],
        required_keywords: ["feel", "felt", "cheerful"],
        hints: { words: ["how", "did", "everyone", "feel"], tricky: ["what", "why"] }
      }
    ]
  }
};
