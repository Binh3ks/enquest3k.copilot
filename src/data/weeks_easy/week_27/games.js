export const week27GamesEasy = {
  title: "Games: Maya's Growing Plant",
  image_url: null,
  audio_url: "/audio/week27_easy/games_main.mp3",
  games: [
    {
      id: "plant_vocab_match",
      type: "matching",
      title_en: "Plant Word Match",
      instruction_en: "Match each plant word to its Vietnamese meaning.",
      instruction_vi: "Nối mỗi từ với nghĩa tiếng Việt.",
      cards: [
        { id: "a1", type: "word", value: "seed" }, { id: "a2", type: "meaning", value: "hat giong" },
        { id: "b1", type: "word", value: "soil" }, { id: "b2", type: "meaning", value: "dat" },
        { id: "c1", type: "word", value: "root" }, { id: "c2", type: "meaning", value: "re cay" },
        { id: "d1", type: "word", value: "stem" }, { id: "d2", type: "meaning", value: "than cay" }
      ]
    },
    {
      id: "growth_sequence",
      type: "sorting",
      title_en: "Plant Growth Order!",
      instruction_en: "Drag each step into the correct order.",
      instruction_vi: "Kéo mỗi bước vào đúng thứ tự.",
      categories: ["First", "Next", "After that", "Finally"],
      items: [
        { text: "A tiny green sprout comes out.", correct: "Next" },
        { text: "A seed is planted in soil.", correct: "First" },
        { text: "A yellow flower blooms at the top.", correct: "Finally" },
        { text: "The stem and leaves grow.", correct: "After that" }
      ]
    }
  ],
  show_tell: {
    steps: 2,
    word_list: ["seed", "soil", "root", "stem", "leaf", "flower", "sunlight", "sprout"],
    instructions_easy: "Say the word, then make a short sentence about plants.",
    instructions_advanced: "Use the word in a Present Simple fact sentence.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: make a sentence with that word."
    },
    frames_easy: ["A ___ needs ___.", "The ___ grows ___."],
    frames_advanced: ["The ___ absorbs ___.", "A ___ uses ___ to ___."],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      "seed": ["seed", "a tiny seed", "A seed grows in soil", "A tiny seed is planted in warm soil and with water it grows into a new plant."],
      "soil": ["soil", "good soil", "Soil holds the plant", "Good soil contains nutrients and water that the roots need to grow."],
      "root": ["root", "the root", "The root absorbs water", "The root absorbs water and nutrients from the soil every day."],
      "stem": ["stem", "the stem", "The stem carries water", "The stem carries water from the root up to the leaves of the plant."],
      "leaf": ["leaf", "a green leaf", "A leaf makes food", "A green leaf uses sunlight to make food for the whole plant."],
      "flower": ["flower", "a yellow flower", "A flower blooms", "A beautiful yellow flower blooms at the very top of the plant."],
      "sunlight": ["sunlight", "bright sunlight", "Plants need sunlight", "Plants need bright sunlight to make food and stay healthy."],
      "sprout": ["sprout", "a tiny sprout", "A sprout appears", "A tiny green sprout appears through the soil — the first sign of growth!"]
    },
    distractor_map: {
      "seed": ["book", "pen"],
      "soil": ["water", "cloud"],
      "root": ["leaf", "flower"],
      "stem": ["root", "soil"],
      "leaf": ["stem", "root"],
      "flower": ["leaf", "stem"],
      "sunlight": ["rain", "wind"],
      "sprout": ["flower", "seed"]
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a sentence about plants.",
    instructions_advanced: "Unscramble the words to make a correct Present Simple fact sentence.",
    sentences_easy: [
      { scrambled: ["A", "seed", "water", "needs"], answer: "A seed needs water." },
      { scrambled: ["The", "root", "water", "absorbs"], answer: "The root absorbs water." },
      { scrambled: ["A", "leaf", "food", "makes"], answer: "A leaf makes food." },
      { scrambled: ["The", "stem", "grows", "taller"], answer: "The stem grows taller." },
      { scrambled: ["A", "flower", "top", "the", "at", "blooms"], answer: "A flower blooms at the top." },
      { scrambled: ["First", "seed", "a", "planted", "is"], answer: "First, a seed is planted." },
      { scrambled: ["Finally", "flower", "a", "blooms"], answer: "Finally, a flower blooms." },
      { scrambled: ["Plants", "sunlight", "need"], answer: "Plants need sunlight." }
    ],
    sentences_advanced: [
      { scrambled: ["A", "seed", "water", "warmth", "needs", "and", "to", "germinate"], answer: "A seed needs water and warmth to germinate." },
      { scrambled: ["The", "root", "water", "absorbs", "soil", "from", "the"], answer: "The root absorbs water from the soil." },
      { scrambled: ["A", "leaf", "food", "makes", "sunlight", "using"], answer: "A leaf makes food using sunlight." },
      { scrambled: ["Finally", "yellow", "flower", "blooms", "a", "small"], answer: "Finally, a small yellow flower blooms." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about Maya's plant.",
    instructions_advanced: "Ask a Present Simple question about plant growth.",
    contexts_easy: [
      {
        id: "w27e_what_does_root_do",
        task_type: "find_question",
        topic: "plant parts",
        intro: "The root of a plant absorbs water. Ask what the root does.",
        acceptedQuestions: ["What does the root do?", "What does the root absorb?", "What does a root do?"],
        answer: "The root absorbs water from the soil.",
        question_hints: ["What does the root do?", "What does a root do?"],
        required_question_words: ["what", "does", "root"],
        required_keywords: ["root", "does"],
        hints: { words: ["what", "does", "the", "root", "do"], tricky: ["how", "when"] }
      },
      {
        id: "w27e_what_does_leaf_do",
        task_type: "find_question",
        topic: "plant parts",
        intro: "A leaf uses sunlight to make food. Ask what a leaf uses.",
        acceptedQuestions: ["What does a leaf use?", "What does the leaf use to make food?", "What does a leaf do?"],
        answer: "A leaf uses sunlight to make food.",
        question_hints: ["What does a leaf use?", "What does a leaf do?"],
        required_question_words: ["what", "does", "leaf"],
        required_keywords: ["leaf", "does"],
        hints: { words: ["what", "does", "a", "leaf", "use"], tricky: ["how", "where"] }
      },
      {
        id: "w27e_what_does_plant_need",
        task_type: "find_question",
        topic: "plant needs",
        intro: "A plant needs water, sunlight, and soil. Ask what a plant needs.",
        acceptedQuestions: ["What does a plant need?", "What does the plant need to grow?", "What do plants need?"],
        answer: "A plant needs water, sunlight, and nutrients from the soil.",
        question_hints: ["What does a plant need?", "What do plants need?"],
        required_question_words: ["what", "does", "plant", "need"],
        required_keywords: ["plant", "need"],
        hints: { words: ["what", "does", "a", "plant", "need"], tricky: ["where", "when"] }
      }
    ],
    contexts_advanced: [
      {
        id: "w27e_adv_photosynthesis",
        task_type: "find_question",
        topic: "photosynthesis",
        intro: "Leaves use sunlight to make food in a process called photosynthesis. Ask what photosynthesis is.",
        acceptedQuestions: ["What is photosynthesis?", "What does photosynthesis mean?", "What is photosynthesis called?"],
        answer: "Photosynthesis is when a leaf uses sunlight to make food for the plant.",
        question_hints: ["What is photosynthesis?", "What does photosynthesis mean?"],
        required_question_words: ["what", "is", "photosynthesis"],
        required_keywords: ["photosynthesis"],
        hints: { words: ["what", "is", "photosynthesis"], tricky: ["how", "why"] }
      }
    ]
  }
};

export default week27GamesEasy;
