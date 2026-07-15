// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper (Fable)
// Games Station — Advanced Mode

export const week34GamesAdvanced = {
  title: "Games: The Ant and the Grasshopper — Storytelling Fable",
  image_url: null,
  audio_url: "/audio/week34/games_main.mp3",
  games: [
    {
      id: "fable_relative_clause_match",
      type: "matching",
      title_en: "Relative Clause Match!",
      instruction_en: "Match each sentence starter to the correct relative clause.",
      instruction_vi: "Nối mỗi câu bắt đầu với mệnh đề quan hệ đúng.",
      cards: [
        { id: "a1", type: "word", value: "The ant, who" }, { id: "a2", type: "meaning", value: "was very hard-working," },
        { id: "b1", type: "word", value: "The grasshopper, who" }, { id: "b2", type: "meaning", value: "was very lazy," },
        { id: "c1", type: "word", value: "Summer, which" }, { id: "c2", type: "meaning", value: "was warm and sunny," },
        { id: "d1", type: "word", value: "The food that" }, { id: "d2", type: "meaning", value: "the ant stored," },
        { id: "e1", type: "word", value: "The frost that" }, { id: "e2", type: "meaning", value: "appeared in autumn," },
        { id: "f1", type: "word", value: "The lesson that" }, { id: "f2", type: "meaning", value: "the grasshopper learned," },
        { id: "g1", type: "word", value: "The shelter which" }, { id: "g2", type: "meaning", value: "the ant built," },
        { id: "h1", type: "word", value: "The future that" }, { id: "h2", type: "meaning", value: "we must prepare for." }
      ]
    },
    {
      id: "fable_sequence_sorting",
      type: "sorting",
      title_en: "Fable Sequence!",
      instruction_en: "Drag each event into the correct chronological order of the fable.",
      instruction_vi: "Keo moi su kien vao dung thu tu thoi gian cua truyen ngon.",
      categories: ["Summer (First)", "Late Summer", "Autumn (Next)", "Winter (Finally)"],
      items: [
        { text: "The ant gathered seeds every day.", correct: "Summer (First)" },
        { text: "The grasshopper jumped around and sang songs.", correct: "Summer (First)" },
        { text: "The ant built a warm shelter.", correct: "Summer (First)" },
        { text: "The grasshopper never worked and never worried.", correct: "Late Summer" },
        { text: "The first frost appeared in autumn.", correct: "Autumn (Next)" },
        { text: "The grasshopper felt very cold and very hungry.", correct: "Autumn (Next)" },
        { text: "The ant gave the grasshopper some food.", correct: "Autumn (Next)" },
        { text: "The two animals shared food together all winter.", correct: "Winter (Finally)" },
        { text: "Both animals worked hard together for the rest of the year.", correct: "Winter (Finally)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["ant", "grasshopper", "fable", "gather", "prepare", "frost", "shelter", "hard-working", "lazy", "lesson", "future", "share"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use it in a sentence about the fable.",
    instructions_advanced: "Use the word in a full sentence with a relative clause (WHO/WHICH/THAT) about the fable.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full sentence with WHO, WHICH, or THAT using the word."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a correct sentence about the fable.",
    instructions_advanced: "Unscramble the words to make a correct sentence with a relative clause (WHO/WHICH/THAT).",
    sentences_easy: [
      { scrambled: ["The", "ant", "gathered", "seeds", "every", "day"], answer: "The ant gathered seeds every day." },
      { scrambled: ["The", "grasshopper", "was", "very", "lazy"], answer: "The grasshopper was very lazy." },
      { scrambled: ["The", "frost", "appeared", "in", "autumn"], answer: "The frost appeared in autumn." },
      { scrambled: ["The", "ant", "shared", "food", "with", "the", "grasshopper"], answer: "The ant shared food with the grasshopper." },
      { scrambled: ["The", "grasshopper", "learned", "a", "lesson"], answer: "The grasshopper learned a lesson." }
    ],
    sentences_advanced: [
      { scrambled: ["The", "ant", "who", "gathered", "seeds", "every", "day", "was", "very", "hard-working"], answer: "The ant, who gathered seeds every day, was very hard-working." },
      { scrambled: ["The", "grasshopper", "who", "never", "worked", "felt", "cold", "in", "winter"], answer: "The grasshopper, who never worked, felt cold in winter." },
      { scrambled: ["Summer", "which", "was", "warm", "and", "sunny", "came", "before", "autumn"], answer: "Summer, which was warm and sunny, came before autumn." },
      { scrambled: ["The", "food", "that", "the", "ant", "stored", "helped", "both", "animals", "survive"], answer: "The food that the ant stored helped both animals survive." },
      { scrambled: ["The", "lesson", "which", "both", "learned", "was", "always", "prepare", "for", "the", "future"], answer: "The lesson which both learned was: always prepare for the future." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the fable using what, who, where, or when.",
    instructions_advanced: "Ask a question about the fable using a WHO or WHICH clause.",
    contexts_easy: [
      {
        id: "w34_what_ant",
        task_type: "find_question",
        topic: "ant's activities",
        intro: "The ant gathered seeds and stored food every day in summer. Ask what the ant did.",
        acceptedQuestions: ["What did the ant do?", "What did the ant do in summer?", "What did the ant gather?"],
        answer: "The ant gathered seeds and stored food every day."
      },
      {
        id: "w34_why_cold",
        task_type: "find_question",
        topic: "grasshopper's cold",
        intro: "The grasshopper felt cold and hungry because he did not prepare for winter. Ask why the grasshopper felt cold.",
        acceptedQuestions: ["Why did the grasshopper feel cold?", "Why was the grasshopper cold?", "Why did the grasshopper feel hungry?"],
        answer: "The grasshopper felt cold and hungry because he did not prepare for winter."
      }
    ],
    contexts_advanced: [
      {
        id: "w34_adv_relative_clause",
        task_type: "find_question",
        topic: "relative clauses",
        intro: "The ant was hard-working and gathered seeds. The grasshopper was lazy and played all day. Ask about the ant using a WHO clause.",
        acceptedQuestions: ["Who was the ant that gathered seeds?", "Who is the animal who worked hard?", "Which animal who gathered seeds was hard-working?"],
        answer: "The ant, who gathered seeds every day, was very hard-working."
      },
      {
        id: "w34_adv_lesson",
        task_type: "find_question",
        topic: "the lesson",
        intro: "The grasshopper learned to prepare for the future. Ask what lesson the grasshopper learned using WHAT or WHICH.",
        acceptedQuestions: ["What lesson did the grasshopper learn?", "Which lesson did both animals learn?", "What did the grasshopper learn which was important?"],
        answer: "The grasshopper learned to always work hard and prepare for the future."
      }
    ]
  }
};

export default week34GamesAdvanced;
