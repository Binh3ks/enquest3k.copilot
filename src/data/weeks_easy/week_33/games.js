export const week33GamesEasy = {
  title: "Games: The Mistake — Irregular Verbs 5: Accidents",
  audio_url: "/audio/week33_easy/games_main.mp3",
  games: [
    {
      id: "accident_verb_match",
      type: "matching",
      title_en: "Accident Verb Match!",
      title_vi: "Nối từ: Động từ tai nạn",
      instruction_en: "Match each base verb to its past simple form.",
      instruction_vi: "Nối mỗi động từ nguyên mẫu với dạng quá khứ.",
      cards: [
        { id: "a1", type: "word", value: "hit" }, { id: "a2", type: "meaning", value: "hit" },
        { id: "b1", type: "word", value: "fall" }, { id: "b2", type: "meaning", value: "fell" },
        { id: "c1", type: "word", value: "break" }, { id: "c2", type: "meaning", value: "broke" },
        { id: "d1", type: "word", value: "hurt" }, { id: "d2", type: "meaning", value: "hurt" },
        { id: "e1", type: "word", value: "begin" }, { id: "e2", type: "meaning", value: "began" },
        { id: "f1", type: "word", value: "lose" }, { id: "f2", type: "meaning", value: "lost" },
        { id: "g1", type: "word", value: "forget" }, { id: "g2", type: "meaning", value: "forgot" }
      ]
    },
    {
      id: "accident_sequence",
      type: "sorting",
      title_en: "Jake's Accident: What Happened First?",
      title_vi: "Tai nạn của Jake: Điều gì xảy ra trước?",
      instruction_en: "Put Jake's accident events in the correct order.",
      instruction_vi: "Sắp xếp các sự kiện tai nạn của Jake theo đúng thứ tự.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "Jake was running in the corridor because he was late.", correct: "Step 1 (First)" },
        { text: "He hit his knee on a table.", correct: "Step 1 (First)" },
        { text: "He fell down and broke a cup.", correct: "Step 2 (Next)" },
        { text: "His knee hurt a lot.", correct: "Step 2 (Next)" },
        { text: "The nurse put a cold pack on his knee.", correct: "Step 3 (After that)" },
        { text: "Jake learned to walk carefully.", correct: "Step 4 (Finally)" }
      ]
    },
    {
      id: "grammar_fill",
      type: "fill_in",
      title_en: "Choose the Correct Past Verb",
      title_vi: "Chọn động từ quá khứ đúng",
      instruction_en: "Choose the correct past tense form.",
      instruction_vi: "Chọn dạng quá khứ đúng.",
      sentences: [
        { sentence: "Jake ___ in the corridor because he was late. (run)", answer: "ran", options: ["ran", "run", "runs"] },
        { sentence: "He ___ his knee on the table. (hit)", answer: "hit", options: ["hit", "hitted", "hitting"] },
        { sentence: "Jake ___ down hard. (fall)", answer: "fell", options: ["fell", "fall", "falled"] },
        { sentence: "He ___ the glass cup. (break)", answer: "broke", options: ["broke", "broken", "break"] },
        { sentence: "His knee ___ a lot. (hurt)", answer: "hurt", options: ["hurt", "hurtted", "hurting"] },
        { sentence: "The nurse ___ a cold pack on his knee. (put)", answer: "put", options: ["put", "putted", "puts"] },
        { sentence: "Jake ___ the truth to the teacher. (tell)", answer: "told", options: ["told", "tell", "talled"] },
        { sentence: "He ___ to walk carefully after that. (learn)", answer: "learned", options: ["learned", "learnt", "learn"] }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["accident", "corridor", "cold pack", "lesson", "carefully", "catch", "terrible", "understand", "explain", "recover"],
    instructions_easy: "Tell your partner about Jake's accident using the words in the list!",
    instructions_advanced: "Tell your partner about a real or imagined accident using accident verbs. Try to use all 10 vocabulary words!",
    step_instructions: {
      1: "Point to 3 words and tell your partner what each one means.",
      2: "Tell your partner 2 things Jake did using past tense verbs.",
      3: "Ask your partner: 'What happened to Jake?'"
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a sentence about Jake's accident.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence.",
    sentences_easy: [
      { scrambled: ["Jake", "had", "an", "accident"], answer: "Jake had an accident." },
      { scrambled: ["He", "fell", "down"], answer: "He fell down." },
      { scrambled: ["His", "knee", "hurt"], answer: "His knee hurt." },
      { scrambled: ["The", "nurse", "came"], answer: "The nurse came." },
      { scrambled: ["He", "learned", "a", "lesson"], answer: "He learned a lesson." }
    ],
    sentences_advanced: [
      { scrambled: ["Jake", "fell", "down", "and", "broke", "a", "cup"], answer: "Jake fell down and broke a cup." },
      { scrambled: ["He", "hurt", "his", "knee", "when", "he", "fell"], answer: "He hurt his knee when he fell." },
      { scrambled: ["The", "nurse", "put", "a", "cold", "pack", "on", "his", "knee"], answer: "The nurse put a cold pack on his knee." },
      { scrambled: ["He", "learned", "an", "important", "lesson", "about", "carefulness"], answer: "He learned an important lesson about carefulness." },
      { scrambled: ["Always", "walk", "carefully", "in", "the", "corridor"], answer: "Always walk carefully in the corridor." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about Jake's accident using what or where.",
    instructions_advanced: "Ask a Past Simple question using accident verbs from Week 33.",
    contexts_easy: [
      {
        id: "w33_easy_what_hurt",
        task_type: "find_question",
        topic: "accidents",
        intro: "I hurt my knee when I fell in the corridor. Ask me what I hurt.",
        acceptedQuestions: ["What did you hurt?", "Where did you get hurt?", "What hurt?"],
        answer: "I hurt my knee when I fell in the corridor."
      },
      {
        id: "w33_easy_where_accident",
        task_type: "find_question",
        topic: "accidents",
        intro: "I had an accident in the school corridor. Ask me where I had the accident.",
        acceptedQuestions: ["Where did you have the accident?", "Where did it happen?"],
        answer: "I had an accident in the school corridor."
      }
    ],
    contexts_advanced: [
      {
        id: "w33_easy_why_ran",
        task_type: "find_question",
        topic: "accident cause",
        intro: "Jake was running because he was late. Ask me why Jake was running.",
        acceptedQuestions: ["Why was Jake running?", "Why did Jake run?"],
        answer: "Jake was running because he was late for class."
      }
    ]
  }
};

export default week33GamesEasy;
