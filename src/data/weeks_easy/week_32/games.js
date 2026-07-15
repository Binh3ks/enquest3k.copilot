export const week32GamesEasy = {
  title: "Games: My Very Busy Saturday",
  audio_url: "/audio/week32_easy/games_main.mp3",
  games: [
    {
      id: "vocab_match",
      type: "matching",
      title_en: "Word Match: Saturday Words",
      title_vi: "Nối từ: Từ ngữ thứ Bảy",
      instruction_en: "Match each word to its meaning.",
      instruction_vi: "Nối mỗi từ với nghĩa của nó.",
      cards: [
        { id: "a1", type: "word", value: "tidy" },
        { id: "a2", type: "meaning", value: "neat and in order" },
        { id: "b1", type: "word", value: "birdhouse" },
        { id: "b2", type: "meaning", value: "a small wooden box for birds" },
        { id: "c1", type: "word", value: "grandmother" },
        { id: "c2", type: "meaning", value: "the mother of your parent" },
        { id: "d1", type: "word", value: "letter" },
        { id: "d2", type: "meaning", value: "a written message in an envelope" },
        { id: "e1", type: "word", value: "grass" },
        { id: "e2", type: "meaning", value: "green plants that cover a garden" },
        { id: "f1", type: "word", value: "café" },
        { id: "f2", type: "meaning", value: "a small place to buy drinks and food" },
        { id: "g1", type: "word", value: "choose" },
        { id: "g2", type: "meaning", value: "to pick the one you want" },
        { id: "h1", type: "word", value: "Saturday" },
        { id: "h2", type: "meaning", value: "the day between Friday and Sunday" },
        { id: "i1", type: "word", value: "early" },
        { id: "i2", type: "meaning", value: "before the usual time" },
        { id: "j1", type: "word", value: "asleep" },
        { id: "j2", type: "meaning", value: "sleeping; not awake" }
      ]
    },
    {
      id: "story_sequence",
      type: "sorting",
      title_en: "My Saturday: What Happened First?",
      title_vi: "Thứ Bảy của Tôi: Điều gì xảy ra trước?",
      instruction_en: "Put the Saturday events in the correct order.",
      instruction_vi: "Sắp xếp các sự kiện thứ Bảy theo đúng thứ tự.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "I woke up early and made my bed.", correct: "Step 1 (First)" },
        { text: "I wrote a letter to my grandmother.", correct: "Step 1 (First)" },
        { text: "I helped Dad cut the grass.", correct: "Step 2 (Next)" },
        { text: "We built a birdhouse and put it on the apple tree.", correct: "Step 3 (After that)" },
        { text: "I chose my favourite shirt for the trip.", correct: "Step 3 (After that)" },
        { text: "I paid for my juice at the café and fell asleep early.", correct: "Step 4 (Finally)" }
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
        { sentence: "I ___ up early on Saturday.", answer: "woke", options: ["woke", "wake", "waked"] },
        { sentence: "I ___ my bed before breakfast.", answer: "made", options: ["made", "make", "maked"] },
        { sentence: "I ___ my homework first.", answer: "did", options: ["did", "do", "doed"] },
        { sentence: "I ___ a letter to grandma.", answer: "wrote", options: ["wrote", "write", "writed"] },
        { sentence: "We ___ the grass in the garden.", answer: "cut", options: ["cut", "cutted", "cuts"] },
        { sentence: "We ___ a little birdhouse.", answer: "built", options: ["built", "build", "builded"] },
        { sentence: "I ___ my toys in the box.", answer: "put", options: ["put", "putted", "puts"] },
        { sentence: "I ___ my room tidy all day.", answer: "kept", options: ["kept", "keep", "keeped"] },
        { sentence: "I ___ my favourite shirt.", answer: "chose", options: ["chose", "choose", "choosed"] },
        { sentence: "I ___ for my juice myself.", answer: "paid", options: ["paid", "pay", "payed"] }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["tidy", "birdhouse", "grandmother", "letter", "grass", "café", "choose", "Saturday", "early", "asleep"],
    instructions_easy: "Tell your partner about what you did last Saturday using the words in the list!",
    instructions_advanced: "Tell your partner about a busy Saturday using task verbs. Try to use all 10 vocabulary words!",
    step_instructions: {
      1: "Point to 3 words and tell your partner what each one means.",
      2: "Tell your partner 2 things you did last Saturday using past tense verbs.",
      3: "Ask your partner: 'What did you do last Saturday?'"
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a sentence about Saturday.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence.",
    sentences_easy: [
      { scrambled: ["I", "woke", "up", "early"], answer: "I woke up early." },
      { scrambled: ["I", "made", "my", "bed"], answer: "I made my bed." },
      { scrambled: ["I", "did", "my", "homework"], answer: "I did my homework." },
      { scrambled: ["I", "put", "my", "books", "away"], answer: "I put my books away." },
      { scrambled: ["I", "kept", "my", "room", "tidy"], answer: "I kept my room tidy." }
    ],
    sentences_advanced: [
      { scrambled: ["I", "woke", "up", "early", "and", "made", "breakfast"], answer: "I woke up early and made breakfast." },
      { scrambled: ["I", "did", "my", "homework", "and", "wrote", "in", "my", "diary"], answer: "I did my homework and wrote in my diary." },
      { scrambled: ["I", "cut", "the", "grass", "and", "built", "a", "shelf"], answer: "I cut the grass and built a shelf." },
      { scrambled: ["I", "kept", "my", "room", "tidy", "and", "put", "my", "toys", "away"], answer: "I kept my room tidy and put my toys away." },
      { scrambled: ["I", "chose", "a", "book", "and", "paid", "for", "it"], answer: "I chose a book and paid for it." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about Saturday tasks using what or where.",
    instructions_advanced: "Ask a Past Simple question using task verbs from Week 32.",
    contexts_easy: [
      {
        id: "w32_easy_what_built",
        task_type: "find_question",
        topic: "building something",
        intro: "I built a birdhouse with my dad. Ask what I built.",
        acceptedQuestions: ["What did you build?", "What did you make?", "What did you build with your dad?"],
        answer: "I built a wooden birdhouse with my dad and we put it in the garden."
      }
    ],
    contexts_advanced: [
      {
        id: "w32_easy_why_kept",
        task_type: "find_question",
        topic: "keeping tidy",
        intro: "I kept my room tidy all day on Saturday. Ask how I kept it tidy.",
        acceptedQuestions: ["How did you keep your room tidy?", "What did you put away?", "How did you organise your things?"],
        answer: "I put away my toys, kept my books on the shelf, and swept the floor so everything was neat and tidy."
      }
    ]
  }
};
