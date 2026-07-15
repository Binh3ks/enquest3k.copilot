export const week31GamesAdvanced = {
  title: "Games: The Market — Irregular Verbs 3",
  image_url: null,
  audio_url: "/audio/week31/games_main.mp3",
  games: [
    {
      id: "senses_verb_match",
      type: "matching",
      title_en: "Senses Verb Match!",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Noi moi dong tu nguyen mau voi dang qua khu cua no.",
      cards: [
        { id: "a1", type: "word", value: "see" }, { id: "a2", type: "meaning", value: "saw" },
        { id: "b1", type: "word", value: "hear" }, { id: "b2", type: "meaning", value: "heard" },
        { id: "c1", type: "word", value: "feel" }, { id: "c2", type: "meaning", value: "felt" },
        { id: "d1", type: "word", value: "smell" }, { id: "d2", type: "meaning", value: "smelt" },
        { id: "e1", type: "word", value: "market" }, { id: "e2", type: "meaning", value: "cai cho" },
        { id: "f1", type: "word", value: "texture" }, { id: "f2", type: "meaning", value: "chat lieu" },
        { id: "g1", type: "word", value: "colorful" }, { id: "g2", type: "meaning", value: "nhieu mau sac" }
      ]
    },
    {
      id: "market_senses_sequence",
      type: "sorting",
      title_en: "Market Senses Sequence!",
      instruction_en: "Drag each sensory event into the correct sense from Luna's market visit.",
      instruction_vi: "Keo moi su kien giac quan vao dung giac quan trong chuyen tham cho cua Luna.",
      categories: ["Sense 1: Sight", "Sense 2: Touch", "Sense 3: Smell", "Sense 4: Hearing"],
      items: [
        { text: "Luna saw rows of colorful stalls at the market.", correct: "Sense 1: Sight" },
        { text: "She saw smooth glass jars filled with golden honey.", correct: "Sense 1: Sight" },
        { text: "Luna felt the rough wooden shelf carved with leaf patterns.", correct: "Sense 2: Touch" },
        { text: "She felt the cool heavy stone bowl in her hands.", correct: "Sense 2: Touch" },
        { text: "She smelt cinnamon and pepper drifting from the spice stall.", correct: "Sense 3: Smell" },
        { text: "A cool breeze carried the sweet scent of roses to her.", correct: "Sense 3: Smell" },
        { text: "Luna heard vendors calling out to customers.", correct: "Sense 4: Hearing" },
        { text: "She heard children laughing and footsteps on the stone path.", correct: "Sense 4: Hearing" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["market", "stall", "colorful", "texture", "cotton", "glass", "stone", "wooden", "sculpture", "breeze", "seller", "fresh", "price"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use saw/heard/felt/smelt in a sentence.",
    instructions_advanced: "Use the word in a full Past Simple sentence about the market visit, with saw / heard / felt / smelt.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence using the word."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about the market.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence using senses vocabulary.",
    sentences_easy: [
      { scrambled: ["Luna", "saw", "colorful", "stalls", "at", "the", "market"], answer: "Luna saw colorful stalls at the market." },
      { scrambled: ["She", "felt", "the", "rough", "wooden", "shelf"], answer: "She felt the rough wooden shelf." },
      { scrambled: ["Luna", "smelt", "cinnamon", "at", "the", "spice", "stall"], answer: "Luna smelt cinnamon at the spice stall." },
      { scrambled: ["She", "heard", "the", "vendors", "calling", "loudly"], answer: "She heard the vendors calling loudly." },
      { scrambled: ["She", "felt", "soft", "cotton", "scarves", "at", "the", "fabric", "stall"], answer: "She felt soft cotton scarves at the fabric stall." }
    ],
    sentences_advanced: [
      { scrambled: ["Luna", "saw", "smooth", "glass", "jars", "filled", "with", "golden", "honey"], answer: "Luna saw smooth glass jars filled with golden honey." },
      { scrambled: ["she", "felt", "the", "rough", "texture", "of", "the", "carved", "wooden", "shelf"], answer: "She felt the rough texture of the carved wooden shelf." },
      { scrambled: ["Luna", "smelt", "cinnamon", "and", "pepper", "drifting", "from", "the", "spice", "stall"], answer: "Luna smelt cinnamon and pepper drifting from the spice stall." },
      { scrambled: ["she", "heard", "vendors", "calling", "and", "children", "laughing", "on", "the", "stone", "path"], answer: "She heard vendors calling and children laughing on the stone path." },
      { scrambled: ["Luna", "felt", "the", "cool", "heavy", "stone", "bowl", "smooth", "in", "her", "hands"], answer: "Luna felt the cool heavy stone bowl smooth in her hands." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the market using what, where, how, or why.",
    instructions_advanced: "Ask a Past Simple question about the market that uses vocabulary from Week 31.",
    contexts_easy: [
      {
        id: "w31_what_saw",
        task_type: "find_question",
        topic: "market sights",
        intro: "Luna saw colorful stalls at the market. Ask what she saw.",
        acceptedQuestions: ["What did Luna see?", "What did she see at the market?", "What were the stalls like?"],
        answer: "Luna saw rows of colorful stalls with glass jars, cotton scarves, and stone sculptures."
      }
    ],
    contexts_advanced: [
      {
        id: "w31_sensation",
        task_type: "find_question",
        topic: "sensory experience",
        intro: "Luna felt two very different textures — a rough wooden shelf and a smooth stone bowl. Ask about her experience.",
        acceptedQuestions: ["How did the wooden shelf feel?", "What did the stone bowl feel like?", "Which felt rougher — the shelf or the bowl?"],
        answer: "The wooden shelf felt rough and warm, but the stone bowl felt cool, smooth, and very heavy."
      }
    ]
  }
};