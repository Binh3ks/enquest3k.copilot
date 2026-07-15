export const week27GamesAdvanced = {
  title: "Games: Nature Sequencing — Plant Growth",
  image_url: null,
  audio_url: "/audio/week27/games_main.mp3",
  games: [
    {
      id: "plant_vocab_match",
      type: "matching",
      title_en: "Plant Vocabulary Match",
      instruction_en: "Match each plant word to its Vietnamese meaning.",
      instruction_vi: "Noi moi tu ve thuc vat voi nghia tieng Viet.",
      cards: [
        { id: "a1", type: "word", value: "seed" }, { id: "a2", type: "meaning", value: "hat giong" },
        { id: "b1", type: "word", value: "soil" }, { id: "b2", type: "meaning", value: "dat" },
        { id: "c1", type: "word", value: "root" }, { id: "c2", type: "meaning", value: "re cay" },
        { id: "d1", type: "word", value: "stem" }, { id: "d2", type: "meaning", value: "than cay" },
        { id: "e1", type: "word", value: "leaf" }, { id: "e2", type: "meaning", value: "la cay" },
        { id: "f1", type: "word", value: "flower" }, { id: "f2", type: "meaning", value: "bong hoa" },
        { id: "g1", type: "word", value: "germinate" }, { id: "g2", type: "meaning", value: "nay mam" }
      ]
    },
    {
      id: "growth_sequence",
      type: "sorting",
      title_en: "Plant Growth Sequence!",
      instruction_en: "Drag each step into the correct order of plant growth.",
      instruction_vi: "Keo moi buoc vao dung thu tu truong thanh cua cay.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "A tiny green sprout pushes through the soil.", correct: "Step 2 (Next)" },
        { text: "A seed is planted in warm, moist soil.", correct: "Step 1 (First)" },
        { text: "A beautiful flower blooms at the top.", correct: "Step 4 (Finally)" },
        { text: "The stem and leaves grow toward the sunlight.", correct: "Step 3 (After that)" },
        { text: "The seed absorbs water and germinates.", correct: "Step 2 (Next)" },
        { text: "Roots grow deeper into the soil.", correct: "Step 2 (Next)" },
        { text: "The flower produces new seeds.", correct: "Step 4 (Finally)" },
        { text: "The leaves open and start photosynthesis.", correct: "Step 3 (After that)" }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["seed", "soil", "root", "stem", "leaf", "flower", "sunlight", "germinate", "absorb", "nutrients", "sprout", "photosynthesis", "observe"],
    instructions_easy: "Say the word clearly, then add a short phrase, then use it in a Present Simple fact sentence.",
    instructions_advanced: "Use the word in a full Present Simple sentence describing a fact about plant growth.",
    step_instructions: {
      1: "Step 1: say the word clearly.",
      2: "Step 2: add a short phrase with the word.",
      3: "Step 3: make a full Present Simple sentence about plants."
    },
    frames_easy: ["A ___ needs ___.", "The ___ grows ___."],
    frames_advanced: ["First, the ___. Next, the ___. Finally, ___."],
    details_easy: [],
    details_advanced: [],
    detail_map: {
      "seed": ["seed", "a tiny seed", "A seed grows into a plant", "A tiny seed is planted in warm moist soil, and with water and warmth, it germinates into a new plant."],
      "soil": ["soil", "rich soil", "Soil contains nutrients", "Rich soil contains nutrients and minerals that roots absorb to help the plant grow strong and tall."],
      "root": ["root", "the root", "The root absorbs water", "The root absorbs water and nutrients from the soil and sends them upward through the stem to feed the plant."],
      "stem": ["stem", "the stem", "The stem carries water", "The stem carries water from the root upward to the leaves, and it holds the plant upright toward the sunlight."],
      "leaf": ["leaf", "a green leaf", "A leaf makes food", "A green leaf collects sunlight and uses photosynthesis to make food that the plant needs to grow."],
      "flower": ["flower", "a blooming flower", "A flower produces seeds", "A beautiful flower blooms at the top of the plant and produces new seeds so the life cycle can begin again."],
      "sunlight": ["sunlight", "bright sunlight", "Plants need sunlight", "Plants need bright sunlight to perform photosynthesis and produce the food they need to survive and grow."],
      "germinate": ["germinate", "seeds germinate", "Seeds germinate in soil", "Seeds germinate in warm moist soil when they absorb water and warmth — this starts the plant life cycle."],
      "absorb": ["absorb", "absorb water", "Roots absorb water", "Plant roots absorb water and nutrients from the soil and carry them upward through the stem to every part of the plant."],
      "nutrients": ["nutrients", "essential nutrients", "Plants need nutrients", "Plants need essential nutrients from the soil to grow strong — without nutrients, leaves turn yellow and growth slows."],
      "sprout": ["sprout", "a tiny sprout", "A sprout appears", "A tiny green sprout appears through the soil on Day Five — it is the first sign that the seed has germinated successfully."],
      "photosynthesis": ["photosynthesis", "process of photosynthesis", "Leaves use photosynthesis", "Leaves use photosynthesis to convert sunlight, water, and carbon dioxide into glucose that feeds the entire plant."],
      "observe": ["observe", "observe and record", "Scientists observe plants", "Scientists observe and record how plants grow every day — Maya observes her bean seed every morning and writes in her notebook."]
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Present Simple sentence about plant growth.",
    instructions_advanced: "Unscramble the words to make a correct Present Simple fact sentence using plant vocabulary.",
    sentences_easy: [
      { scrambled: ["A", "seed", "grows", "in", "soil"], answer: "A seed grows in soil." },
      { scrambled: ["The", "root", "absorbs", "water"], answer: "The root absorbs water." },
      { scrambled: ["Leaves", "sunlight", "need"], answer: "Leaves need sunlight." },
      { scrambled: ["The", "stem", "grows", "tall"], answer: "The stem grows tall." },
      { scrambled: ["A", "flower", "blooms", "on", "top"], answer: "A flower blooms on top." }
    ],
    sentences_advanced: [
      { scrambled: ["a", "in", "soil", "seed", "warm", "moist", "germinates"], answer: "A seed germinates in warm moist soil." },
      { scrambled: ["the", "root", "absorbs", "nutrients", "and", "water", "from", "soil", "the"], answer: "The root absorbs water and nutrients from the soil." },
      { scrambled: ["leaves", "use", "sunlight", "to", "food", "photosynthesis", "make"], answer: "Leaves use photosynthesis to make food from sunlight." },
      { scrambled: ["the", "stem", "upward", "carries", "to", "the", "leaves", "water"], answer: "The stem carries water upward to the leaves." },
      { scrambled: ["scientists", "observe", "and", "plant", "record", "how", "grows", "a"], answer: "Scientists observe and record how a plant grows." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about Maya's plant using what, where, when, or why.",
    instructions_advanced: "Ask a Present Simple question about plant biology that matches the science context.",
    contexts_easy: [
      {
        id: "w27_seed_soil",
        task_type: "find_question",
        topic: "plant growth",
        intro: "Maya planted a seed in soil. Ask where seeds grow.",
        acceptedQuestions: ["Where do seeds grow?", "Where does a seed grow?", "Where did Maya plant the seed?"],
        answer: "Seeds grow in warm moist soil.",
        question_hints: ["Where do seeds grow?", "Where does a seed grow?"],
        required_question_words: ["where"],
        required_keywords: ["seed", "grow"],
        hints: { words: ["where", "do", "seeds", "grow"], tricky: ["what", "when"] }
      },
      {
        id: "w27_root_function",
        task_type: "find_question",
        topic: "plant parts",
        intro: "The root drinks water from the soil. Ask what the root does.",
        acceptedQuestions: ["What does the root do?", "What does a root absorb?", "What does the root absorb?"],
        answer: "The root absorbs water and nutrients from the soil.",
        question_hints: ["What does the root do?", "What does a root absorb?"],
        required_question_words: ["what"],
        required_keywords: ["root"],
        hints: { words: ["what", "does", "the", "root", "do"], tricky: ["where", "why"] }
      },
      {
        id: "w27_leaves_sunlight",
        task_type: "find_question",
        topic: "photosynthesis basics",
        intro: "Leaves collect sunlight and make food. Ask why leaves need sunlight.",
        acceptedQuestions: ["Why do leaves need sunlight?", "Why do plants need sunlight?", "Why does the leaf need sun?"],
        answer: "Leaves need sunlight to make food through photosynthesis.",
        question_hints: ["Why do leaves need sunlight?", "Why do plants need sun?"],
        required_question_words: ["why"],
        required_keywords: ["leaf", "leaves", "sunlight", "sun"],
        hints: { words: ["why", "do", "leaves", "need", "sunlight"], tricky: ["what", "when"] }
      }
    ],
    contexts_advanced: [
      {
        id: "w27_adv_germination",
        task_type: "find_question",
        topic: "plant science",
        intro: "A seed germinates when it absorbs water and warmth. Ask what conditions a seed needs to germinate.",
        acceptedQuestions: ["What does a seed need to germinate?", "What conditions does a seed need?", "What does a seed need to grow?"],
        answer: "A seed needs warm moist soil, water, and warmth to germinate.",
        question_hints: ["What does a seed need to germinate?", "What conditions does a seed need?"],
        required_question_words: ["what"],
        required_keywords: ["seed", "germinate", "need"],
        hints: { words: ["what", "does", "a", "seed", "need", "to", "germinate"], tricky: ["where", "how"] }
      },
      {
        id: "w27_adv_photosynthesis",
        task_type: "find_question",
        topic: "photosynthesis process",
        intro: "Leaves use sunlight, water, and CO2 to make food — this is photosynthesis. Ask which part of the plant performs photosynthesis.",
        acceptedQuestions: ["Which part of the plant performs photosynthesis?", "Which part uses photosynthesis?", "What part of the plant makes food?"],
        answer: "The leaves perform photosynthesis — they use sunlight, water, and CO2 to make glucose.",
        question_hints: ["Which part of the plant performs photosynthesis?", "What part makes food?"],
        required_question_words: ["which", "what"],
        required_keywords: ["photosynthesis", "leaf", "leaves"],
        hints: { words: ["which", "part", "of", "the", "plant", "performs", "photosynthesis"], tricky: ["root", "stem", "flower"] }
      },
      {
        id: "w27_adv_stem_function",
        task_type: "find_question",
        topic: "plant anatomy",
        intro: "The stem carries water from the root to the leaves. Ask what function the stem performs.",
        acceptedQuestions: ["What function does the stem perform?", "What does the stem do?", "What does the stem carry?"],
        answer: "The stem carries water and nutrients upward from the roots to the leaves.",
        question_hints: ["What does the stem do?", "What function does the stem perform?"],
        required_question_words: ["what"],
        required_keywords: ["stem"],
        hints: { words: ["what", "does", "the", "stem", "do"], tricky: ["leaf", "root", "flower"] }
      }
    ]
  }
};

export default week27GamesAdvanced;
