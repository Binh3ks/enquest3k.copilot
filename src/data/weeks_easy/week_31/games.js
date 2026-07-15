export const week31GamesEasy = {
  title: "Games: The Market — Senses Fun",
  image_url: null,
  audio_url: "/audio/week31/games_main.mp3",
  games: [
    {
      id: "senses_verb_match_easy",
      type: "matching",
      title_en: "Senses Verb Match!",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Noi moi dong tu nguyen mau voi dang qua khu cua no.",
      cards: [
        { id: "a1", type: "word", value: "see" }, { id: "a2", type: "meaning", value: "saw" },
        { id: "b1", type: "word", value: "hear" }, { id: "b2", type: "meaning", value: "heard" },
        { id: "c1", type: "word", value: "feel" }, { id: "c2", type: "meaning", value: "felt" },
        { id: "d1", type: "word", value: "smell" }, { id: "d2", type: "meaning", value: "smelt" },
        { id: "e1", type: "word", value: "stall" }, { id: "e2", type: "meaning", value: "quay hang" },
        { id: "f1", type: "word", value: "cotton" }, { id: "f2", type: "meaning", value: "vai cotton" },
        { id: "g1", type: "word", value: "texture" }, { id: "g2", type: "meaning", value: "chat lieu / be mat" }
      ]
    },
    {
      id: "market_senses_sorting_easy",
      type: "sorting",
      title_en: "Which Sense Did Luna Use?",
      instruction_en: "Drag each market experience into the correct sense category.",
      instruction_vi: "Keo moi trai nghiem cho vao dung giac quan tuong ung.",
      categories: ["Eyes (See)", "Ears (Hear)", "Hands (Feel)", "Nose (Smell)"],
      items: [
        { text: "She saw rows of colorful stalls at the market.", correct: "Eyes (See)" },
        { text: "Luna saw cotton scarves in red and blue colors.", correct: "Eyes (See)" },
        { text: "She heard vendors calling out prices across the market.", correct: "Ears (Hear)" },
        { text: "Luna heard children laughing and birds singing nearby.", correct: "Ears (Hear)" },
        { text: "She felt the smooth wooden shelf with her hands.", correct: "Hands (Feel)" },
        { text: "Luna felt the stone bowl — it was very heavy and hard.", correct: "Hands (Feel)" },
        { text: "She smelt wonderful cinnamon near the spice stall.", correct: "Nose (Smell)" },
        { text: "Luna smelt fresh roses at the flower stall.", correct: "Nose (Smell)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["market", "stall", "seller", "colorful", "texture", "cotton", "wood", "stone", "glass", "cinnamon", "cloth", "breeze"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use saw/heard/felt/smelt in a sentence.",
    instructions_advanced: "Use the word in a full Past Simple sentence about the market visit.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence using the word."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about the market.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence.",
    sentences_easy: [
      { scrambled: ["Luna", "saw", "colorful", "stalls"], answer: "Luna saw colorful stalls." },
      { scrambled: ["She", "heard", "a", "loud", "vendor"], answer: "She heard a loud vendor." },
      { scrambled: ["I", "felt", "the", "smooth", "wood"], answer: "I felt the smooth wood." },
      { scrambled: ["She", "smelt", "sweet", "cinnamon"], answer: "She smelt sweet cinnamon." },
      { scrambled: ["The", "market", "was", "busy", "and", "bright"], answer: "The market was busy and bright." }
    ],
    sentences_advanced: [
      { scrambled: ["Luna", "saw", "rows", "of", "colorful", "stalls", "at", "the", "market"], answer: "Luna saw rows of colorful stalls at the market." },
      { scrambled: ["she", "heard", "vendors", "calling", "out", "prices", "across", "the", "stalls"], answer: "She heard vendors calling out prices across the stalls." },
      { scrambled: ["the", "wooden", "shelf", "felt", "smooth", "and", "cool", "under", "my", "hands"], answer: "The wooden shelf felt smooth and cool under my hands." },
      { scrambled: ["she", "smelt", "wonderful", "cinnamon", "near", "the", "spice", "stall"], answer: "She smelt wonderful cinnamon near the spice stall." },
      { scrambled: ["Luna", "felt", "wonder", "because", "the", "market", "was", "so", "busy", "and", "colorful"], answer: "Luna felt wonder because the market was so busy and colorful." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the market using what, where, or how.",
    instructions_advanced: "Ask a Past Simple question about the market visit.",
    contexts_easy: [
      {
        id: "w31_easy_what_saw",
        task_type: "find_question",
        topic: "market sights",
        intro: "Luna saw colorful stalls at the market. Ask what she saw.",
        acceptedQuestions: ["What did Luna see?", "What did she see at the market?"],
        answer: "Luna saw rows of colorful stalls with cotton scarves and glass jars."
      },
      {
        id: "w31_easy_what_smelt",
        task_type: "find_question",
        topic: "market smells",
        intro: "Luna smelt something sweet near a stall. Ask what she smelt.",
        acceptedQuestions: ["What did Luna smell?", "What did she smell at the market?"],
        answer: "Luna smelt sweet cinnamon and fresh roses at the market."
      },
      {
        id: "w31_easy_how_felt",
        task_type: "find_question",
        topic: "market textures",
        intro: "Luna touched a wooden shelf. Ask how it felt.",
        acceptedQuestions: ["How did the shelf feel?", "How did it feel?"],
        answer: "The wooden shelf felt smooth and cool under her hands."
      }
    ]
  }
};
