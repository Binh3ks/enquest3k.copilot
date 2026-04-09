export const week30GamesEasy = {
  title: "Games: The Perfect Picnic — Easy Mode",
  image_url: "/images/week30/games_cover_w30.jpg",
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
    word_list: ["picnic", "basket", "sandwich", "juice", "share", "delicious", "thirsty", "hungry", "cheerful", "ate", "drank", "bought", "gave"],
    instructions_easy: "Say the word clearly, then add a short phrase, then make a sentence using ate, drank, bought, or gave.",
    instructions_advanced: "Use the word in a full Past Simple sentence about a meal or picnic. Use: ate / drank / bought / gave.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a sentence using the word and a past verb."
    }
  }
};
