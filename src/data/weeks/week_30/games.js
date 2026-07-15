export const week30GamesAdvanced = {
  title: "Games: The Perfect Picnic — Irregular Verbs 2",
  image_url: null,
  audio_url: "/audio/week30/games_main.mp3",
  games: [
    {
      id: "picnic_verb_match",
      type: "matching",
      title_en: "Picnic Verb Match!",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Noi moi dong tu nguyen mau voi dang qua khu cua no.",
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
      id: "picnic_day_sequence",
      type: "sorting",
      title_en: "Picnic Day Story Sequence!",
      instruction_en: "Drag each event into the correct order of Luna's picnic day.",
      instruction_vi: "Keo moi su kien vao dung thu tu cua ngay da ngoai cua Luna.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "Mum bought sandwiches and fruit at the market.", correct: "Step 1 (First)" },
        { text: "Luna helped pack everything into the basket.", correct: "Step 1 (First)" },
        { text: "They spread the blanket on the grass in the park.", correct: "Step 2 (Next)" },
        { text: "Tom said he was thirsty and drank some cold lemonade.", correct: "Step 2 (Next)" },
        { text: "Luna ate a delicious watermelon slice and felt cheerful.", correct: "Step 3 (After that)" },
        { text: "Luna gave some cookies to her friends at the next blanket.", correct: "Step 3 (After that)" },
        { text: "They cleaned up the outdoor area before going home.", correct: "Step 4 (Finally)" },
        { text: "Dad said it was the most refreshing picnic ever!", correct: "Step 4 (Finally)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["picnic", "basket", "sandwich", "lemonade", "market", "watermelon", "blanket", "thirsty", "hungry", "cheerful", "delicious", "outdoor", "refreshing", "engineer", "scientist", "artist", "dentist", "firefighter", "chef"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use ate/drank/bought/gave in a sentence.",
    instructions_advanced: "Use the word in a full Past Simple sentence about a meal or picnic, with ate / drank / bought / gave.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence using the word."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about the picnic.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence using picnic vocabulary.",
    sentences_easy: [
      { scrambled: ["Luna", "ate", "a", "delicious", "sandwich"], answer: "Luna ate a delicious sandwich." },
      { scrambled: ["Tom", "drank", "cold", "lemonade"], answer: "Tom drank cold lemonade." },
      { scrambled: ["Mum", "bought", "fruit", "at", "the", "market"], answer: "Mum bought fruit at the market." },
      { scrambled: ["Luna", "gave", "her", "friends", "cookies"], answer: "Luna gave her friends cookies." },
      { scrambled: ["They", "felt", "cheerful", "at", "the", "picnic"], answer: "They felt cheerful at the picnic." }
    ],
    sentences_advanced: [
      { scrambled: ["Mum", "bought", "a", "basket", "of", "watermelon", "at", "the", "market", "morning", "that"], answer: "Mum bought a basket of watermelon at that morning's market." },
      { scrambled: ["the", "friends", "spread", "their", "blanket", "in", "the", "outdoor", "park"], answer: "The friends spread their blanket in the outdoor park." },
      { scrambled: ["Tom", "was", "thirsty", "so", "he", "drank", "cold", "lemonade", "refreshing", "from", "the", "basket"], answer: "Tom was thirsty so he drank refreshing cold lemonade from the basket." },
      { scrambled: ["Luna", "gave", "cheerful", "cookies", "to", "everyone", "because", "sharing", "is", "caring"], answer: "Luna gave cheerful cookies to everyone because sharing is caring." },
      { scrambled: ["they", "all", "ate", "delicious", "sandwiches", "and", "felt", "hungry", "no", "more"], answer: "They all ate delicious sandwiches and felt hungry no more." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the picnic using who, what, where, or why.",
    instructions_advanced: "Ask a Past Simple question about the picnic that uses vocabulary from Week 30.",
    contexts_easy: [
      {
        id: "w30_who_bought",
        task_type: "find_question",
        topic: "picnic preparation",
        intro: "Mum went to the market and bought sandwiches and fruit. Ask who bought the food.",
        acceptedQuestions: ["Who bought the food?", "Who bought the sandwiches?", "Who went to the market?"],
        answer: "Mum bought the sandwiches and fruit at the market.",
        question_hints: ["Who bought the food?", "Who went to the market?"],
        required_question_words: ["who"],
        required_keywords: ["bought", "market", "food", "sandwiches"],
        hints: { words: ["who", "bought", "the", "food"], tricky: ["what", "where"] }
      },
      {
        id: "w30_what_drank",
        task_type: "find_question",
        topic: "picnic food",
        intro: "Tom was thirsty and drank cold lemonade from the basket. Ask what Tom drank.",
        acceptedQuestions: ["What did Tom drink?", "What did Tom have to drink?"],
        answer: "Tom drank cold lemonade from the basket.",
        question_hints: ["What did Tom drink?"],
        required_question_words: ["what"],
        required_keywords: ["Tom", "drink", "drank", "lemonade"],
        hints: { words: ["what", "did", "Tom", "drink"], tricky: ["who", "why"] }
      },
      {
        id: "w30_why_gave",
        task_type: "find_question",
        topic: "sharing",
        intro: "Luna gave everyone a cookie because she wanted to share. Ask why Luna gave cookies.",
        acceptedQuestions: ["Why did Luna give cookies?", "Why did Luna share the cookies?"],
        answer: "Luna gave cookies because she wanted to share with her friends.",
        question_hints: ["Why did Luna give cookies?", "Why did Luna share?"],
        required_question_words: ["why"],
        required_keywords: ["Luna", "give", "gave", "cookies", "share"],
        hints: { words: ["why", "did", "Luna", "give", "cookies"], tricky: ["who", "what"] }
      }
    ],
    contexts_advanced: [
      {
        id: "w30_adv_hungry",
        task_type: "find_question",
        topic: "feelings at the picnic",
        intro: "Luna was very hungry when they arrived, so they opened the basket right away. Ask what Luna felt when they arrived.",
        acceptedQuestions: ["What did Luna feel when they arrived?", "How did Luna feel at the picnic?", "Why did they open the basket right away?"],
        answer: "Luna felt hungry, so they opened the basket and started eating.",
        question_hints: ["What did Luna feel when they arrived?", "How did Luna feel?"],
        required_question_words: ["what", "how", "why"],
        required_keywords: ["Luna", "feel", "felt", "hungry", "arrived"],
        hints: { words: ["what", "did", "Luna", "feel", "when", "they", "arrived"], tricky: ["who", "where"] }
      },
      {
        id: "w30_adv_refreshing",
        task_type: "find_question",
        topic: "picnic experience",
        intro: "After eating watermelon and drinking cold lemonade outdoors, Maya said it was the most refreshing afternoon ever. Ask what made the afternoon so refreshing.",
        acceptedQuestions: ["What made the afternoon so refreshing?", "What did they eat and drink to feel refreshed?", "Why was it the most refreshing afternoon?"],
        answer: "They ate watermelon and drank cold lemonade outdoors, which made the afternoon very refreshing.",
        question_hints: ["What made the afternoon so refreshing?", "Why was it so refreshing?"],
        required_question_words: ["what", "why"],
        required_keywords: ["refreshing", "watermelon", "lemonade", "outdoor", "afternoon"],
        hints: { words: ["what", "made", "the", "afternoon", "so", "refreshing"], tricky: ["who", "when"] }
      },
      {
        id: "w30_adv_basket",
        task_type: "find_question",
        topic: "picnic items",
        intro: "Mum packed the picnic basket with watermelon, sandwiches, cookies, and cold lemonade before they left home. Ask what Mum packed in the basket.",
        acceptedQuestions: ["What did Mum pack in the basket?", "What was in the picnic basket?", "What did Mum put in the basket?"],
        answer: "Mum packed watermelon, sandwiches, cookies, and cold lemonade in the basket.",
        question_hints: ["What did Mum pack in the basket?", "What was in the picnic basket?"],
        required_question_words: ["what"],
        required_keywords: ["basket", "pack", "packed", "watermelon", "sandwiches"],
        hints: { words: ["what", "did", "Mum", "pack", "in", "the", "basket"], tricky: ["who", "why"] }
      }
    ]
  }
};
