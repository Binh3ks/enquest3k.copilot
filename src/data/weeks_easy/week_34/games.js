// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Games Station — Easy Mode

export const week34GamesEasy = {
  title: "Games: The Ant and the Grasshopper — Fable Stories",
  audio_url: "/audio/week34_easy/games_main.mp3",
  games: [
    {
      id: "ant_relative_clause",
      type: "matching",
      title_en: "Match the Relative Clause!",
      title_vi: "Nối mệnh đề quan hệ",
      instruction_en: "Match each main sentence to its correct relative clause.",
      instruction_vi: "Nối mỗi câu chính với mệnh đề quan hệ đúng.",
      cards: [
        { id: "a1", type: "word", value: "The ant works hard." }, { id: "a2", type: "meaning", value: "which lives in groups" },
        { id: "b1", type: "word", value: "The grasshopper sings songs." }, { id: "b2", type: "meaning", value: "who never works" },
        { id: "c1", type: "word", value: "The ant gathered seeds." }, { id: "c2", type: "meaning", value: "that fell from the tree" },
        { id: "d1", type: "word", value: "The insect lives underground." }, { id: "d2", type: "meaning", value: "who is hard-working" },
        { id: "e1", type: "word", value: "The food was shared." }, { id: "e2", type: "meaning", value: "that the ant stored" }
      ]
    },
    {
      id: "fable_sequence",
      type: "sorting",
      title_en: "Story Order: What Happened First?",
      title_vi: "Thứ tự câu chuyện: Điều gì xảy ra trước?",
      instruction_en: "Put the fable events in the correct order.",
      instruction_vi: "Sắp xếp các sự kiện trong truyện theo đúng thứ tự.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "The ant gathered seeds and stored food every day.", correct: "Step 1 (First)" },
        { text: "The grasshopper sang songs and danced all summer.", correct: "Step 1 (First)" },
        { text: "Winter came and frost appeared on the ground.", correct: "Step 2 (Next)" },
        { text: "The ant had a warm shelter and lots of food.", correct: "Step 2 (Next)" },
        { text: "The grasshopper was cold and hungry.", correct: "Step 3 (After that)" },
        { text: "The kind ant shared food with the grasshopper.", correct: "Step 4 (Finally)" }
      ]
    },
    {
      id: "grammar_fill",
      type: "fill_in",
      title_en: "Fill in WHO, WHICH, or THAT",
      title_vi: "Điền WHO, WHICH hoac THAT",
      instruction_en: "Choose the correct relative pronoun.",
      instruction_vi: "Chọn đại từ quan hệ đúng.",
      sentences: [
        { sentence: "The ant ___ works hard is smart. (WHO/WHICH/THAT)", answer: "WHO", options: ["WHO", "WHICH", "THAT"] },
        { sentence: "The food ___ the ant stored was enough for winter. (WHO/WHICH/THAT)", answer: "WHICH", options: ["WHO", "WHICH", "THAT"] },
        { sentence: "The grasshopper ___ sang all day was lazy. (WHO/WHICH/THAT)", answer: "WHO", options: ["WHO", "WHICH", "THAT"] },
        { sentence: "The seeds ___ fell from the tree were gathered by the ant. (WHO/WHICH/THAT)", answer: "WHICH", options: ["WHO", "WHICH", "THAT"] },
        { sentence: "The shelter ___ the ant built was very warm. (WHO/WHICH/THAT)", answer: "THAT", options: ["WHO", "WHICH", "THAT"] },
        { sentence: "The insect ___ has wings is a grasshopper. (WHO/WHICH/THAT)", answer: "WHICH", options: ["WHO", "WHICH", "THAT"] },
        { sentence: "The lesson ___ we learned is important. (WHO/WHICH/THAT)", answer: "THAT", options: ["WHO", "WHICH", "THAT"] },
        { sentence: "The ant ___ never stops working is my hero. (WHO/WHICH/THAT)", answer: "WHO", options: ["WHO", "WHICH", "THAT"] }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["ant", "grasshopper", "fable", "shelter", "gather", "prepare", "share", "frost", "future", "lazy", "hard-working"],
    instructions_easy: "Tell your partner about The Ant and the Grasshopper using the words in the list!",
    instructions_advanced: "Tell your partner about the fable using relative clauses. Try to use all 11 vocabulary words!",
    step_instructions: {
      1: "Point to 3 words and tell your partner what each one means.",
      2: "Tell your partner 2 things the ant did using past tense.",
      3: "Ask your partner: 'Was the grasshopper lazy or just having fun?'"
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a sentence about the fable.",
    instructions_advanced: "Unscramble the words to make a correct sentence using WHO, WHICH, or THAT.",
    sentences_easy: [
      { scrambled: ["The", "ant", "gathered", "seeds"], answer: "The ant gathered seeds." },
      { scrambled: ["The", "grasshopper", "was", "lazy"], answer: "The grasshopper was lazy." },
      { scrambled: ["Winter", "came"], answer: "Winter came." },
      { scrambled: ["The", "ant", "shared", "food"], answer: "The ant shared food." },
      { scrambled: ["The", "lesson", "is", "important"], answer: "The lesson is important." }
    ],
    sentences_advanced: [
      { scrambled: ["The", "ant", "who", "works", "hard", "is", "smart"], answer: "The ant who works hard is smart." },
      { scrambled: ["The", "food", "which", "the", "ant", "stored", "was", "enough"], answer: "The food which the ant stored was enough." },
      { scrambled: ["The", "grasshopper", "who", "was", "lazy", "was", "hungry"], answer: "The grasshopper who was lazy was hungry." },
      { scrambled: ["The", "lesson", "that", "we", "learned", "is", "important"], answer: "The lesson that we learned is important." },
      { scrambled: ["The", "shelter", "which", "the", "ant", "built", "was", "warm"], answer: "The shelter which the ant built was warm." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about the fable using who or what.",
    instructions_advanced: "Ask a question using WHO, WHICH, or THAT about the fable.",
    contexts_easy: [
      {
        id: "w34_easy_who_lazy",
        task_type: "find_question",
        topic: "fable",
        intro: "The grasshopper was very lazy in the summer. Ask me who was lazy.",
        acceptedQuestions: ["Who was lazy?", "Who was the lazy one?"],
        answer: "The grasshopper was lazy."
      },
      {
        id: "w34_easy_what_did_ant",
        task_type: "find_question",
        topic: "fable",
        intro: "The ant gathered seeds and stored food every day. Ask me what the ant did.",
        acceptedQuestions: ["What did the ant do?", "What did the ant gather?"],
        answer: "The ant gathered seeds and stored food every day."
      }
    ],
    contexts_advanced: [
      {
        id: "w34_easy_which_food",
        task_type: "find_question",
        topic: "fable",
        intro: "The ant shared the food that it stored during the summer. Ask me about the food.",
        acceptedQuestions: ["Which food did the ant share?", "What food was shared?"],
        answer: "The ant shared the food that it stored during the summer."
      }
    ]
  }
};

export default week34GamesEasy;
