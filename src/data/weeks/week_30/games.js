export const week30GamesAdvanced = {
  title: "Games: The Perfect Picnic — Irregular Verbs 2",
  image_url: "/images/week30/games_cover_w30.jpg",
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
    word_list: ["picnic", "basket", "sandwich", "lemonade", "market", "watermelon", "blanket", "thirsty", "hungry", "cheerful", "delicious", "outdoor", "refreshing"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use ate/drank/bought/gave in a sentence.",
    instructions_advanced: "Use the word in a full Past Simple sentence about a meal or picnic, with ate / drank / bought / gave.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Past Simple sentence using the word."
    }
  }
};
