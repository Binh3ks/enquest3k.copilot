export const week32GamesAdvanced = {
  title: "Games: Tom's Very Busy Saturday",
  audio_url: "/audio/week32/games_main.mp3",
  games: [
    {
      id: "vocab_match",
      type: "matching",
      title_en: "Word Match: Saturday Vocabulary",
      title_vi: "Nối từ: Từ vựng Thứ Bảy",
      instruction_en: "Match each vocabulary word to its correct meaning.",
      instruction_vi: "Nối mỗi từ vựng với nghĩa đúng của nó.",
      cards: [
        { id: "a1", type: "word", value: "tidy" },
        { id: "a2", type: "meaning", value: "neat and in good order" },
        { id: "b1", type: "word", value: "birdhouse" },
        { id: "b2", type: "meaning", value: "a small wooden box for birds to nest in" },
        { id: "c1", type: "word", value: "grandmother" },
        { id: "c2", type: "meaning", value: "the mother of your parent" },
        { id: "d1", type: "word", value: "letter" },
        { id: "d2", type: "meaning", value: "a written message sent in an envelope" },
        { id: "e1", type: "word", value: "grass" },
        { id: "e2", type: "meaning", value: "the short green plants that cover a lawn" },
        { id: "f1", type: "word", value: "café" },
        { id: "f2", type: "meaning", value: "a small place to buy drinks and snacks" },
        { id: "g1", type: "word", value: "choose" },
        { id: "g2", type: "meaning", value: "to decide which thing you want" },
        { id: "h1", type: "word", value: "Saturday" },
        { id: "h2", type: "meaning", value: "the day between Friday and Sunday" },
        { id: "i1", type: "word", value: "early" },
        { id: "i2", type: "meaning", value: "before the usual time" },
        { id: "j1", type: "word", value: "asleep" },
        { id: "j2", type: "meaning", value: "in a state of sleep; not awake" }
      ]
    },
    {
      id: "story_sequence",
      type: "sorting",
      title_en: "Sort Tom's Saturday Tasks",
      title_vi: "Sắp xếp các công việc thứ Bảy của Tom",
      instruction_en: "Put Tom's Saturday tasks in the correct order.",
      instruction_vi: "Sắp xếp các công việc thứ Bảy của Tom theo đúng thứ tự.",
      categories: ["Step 1 (First)", "Step 2 (Next)", "Step 3 (After that)", "Step 4 (Finally)"],
      items: [
        { text: "Tom made his bed and kept his room tidy.", correct: "Step 1 (First)" },
        { text: "Tom did his homework and wrote a letter to his grandmother.", correct: "Step 1 (First)" },
        { text: "Tom and his dad cut the grass and built a birdhouse.", correct: "Step 2 (Next)" },
        { text: "They put the birdhouse on the oak tree.", correct: "Step 3 (After that)" },
        { text: "Tom went to the café and chose his lunch.", correct: "Step 3 (After that)" },
        { text: "Tom paid for his sandwich and fell asleep early.", correct: "Step 4 (Finally)" }
      ]
    },
    {
      id: "grammar_fill",
      type: "fill_in",
      title_en: "Task Verb Challenge",
      title_vi: "Thách thức động từ công việc",
      instruction_en: "Choose the correct past tense form of the task verb.",
      instruction_vi: "Chọn dạng quá khứ đúng của động từ công việc.",
      sentences: [
        { sentence: "Tom ___ up early before the birds sang.", answer: "woke", options: ["woke", "wake", "waked"] },
        { sentence: "She ___ her bed before breakfast.", answer: "made", options: ["made", "make", "maked"] },
        { sentence: "He ___ all his homework at his desk.", answer: "did", options: ["did", "do", "doed"] },
        { sentence: "Tom ___ a long letter to his grandmother.", answer: "wrote", options: ["wrote", "write", "writed"] },
        { sentence: "They ___ the long grass in the garden.", answer: "cut", options: ["cut", "cutted", "cuts"] },
        { sentence: "Tom and his dad ___ a wooden birdhouse.", answer: "built", options: ["built", "build", "builded"] },
        { sentence: "He ___ all his tools away in the evening.", answer: "put", options: ["put", "putted", "puts"] },
        { sentence: "She ___ her room tidy all week long.", answer: "kept", options: ["kept", "keep", "keeped"] },
        { sentence: "Tom ___ the smoothest plank of wood for the roof.", answer: "chose", options: ["chose", "choose", "choosed"] },
        { sentence: "He ___ for his lunch with his own pocket money.", answer: "paid", options: ["paid", "pay", "payed"] }
      ]
    }
  ],
  show_tell: {
    steps: 3,
    word_list: ["tidy", "birdhouse", "grandmother", "letter", "grass", "café", "choose", "Saturday", "early", "asleep"],
    instructions_easy: "Tell your partner about what you did last Saturday. Use as many of the words as you can!",
    instructions_advanced: "Tell your partner about a busy Saturday using at least 6 task verbs (woke, made, did, wrote, cut, built, put, kept, chose, paid). Try to use all 10 vocabulary words!",
    step_instructions: {
      1: "Choose 3 vocabulary words and tell your partner what each one means.",
      2: "Tell your partner 3 things Tom did on his Saturday using past tense verbs.",
      3: "Tell your partner about your own busiest Saturday using at least 3 task verbs."
    }
  },
  make_sentence: {
    instructions_easy: "Unscramble the words to make a Past Simple sentence about Tom's Saturday.",
    instructions_advanced: "Unscramble the words to make a correct Past Simple sentence using task verbs.",
    sentences_easy: [
      { scrambled: ["Tom", "woke", "up", "early", "on", "Saturday"], answer: "Tom woke up early on Saturday." },
      { scrambled: ["He", "made", "his", "bed", "before", "breakfast"], answer: "He made his bed before breakfast." },
      { scrambled: ["Tom", "cut", "the", "grass", "with", "his", "dad"], answer: "Tom cut the grass with his dad." },
      { scrambled: ["They", "built", "a", "birdhouse", "together"], answer: "They built a birdhouse together." },
      { scrambled: ["Tom", "paid", "for", "his", "lunch", "at", "the", "café"], answer: "Tom paid for his lunch at the café." }
    ],
    sentences_advanced: [
      { scrambled: ["Tom", "woke", "up", "early", "and", "made", "his", "bed", "before", "breakfast"], answer: "Tom woke up early and made his bed before breakfast." },
      { scrambled: ["He", "did", "his", "homework", "and", "wrote", "a", "letter", "to", "his", "grandmother"], answer: "He did his homework and wrote a letter to his grandmother." },
      { scrambled: ["Tom", "and", "his", "dad", "cut", "the", "grass", "and", "built", "a", "birdhouse"], answer: "Tom and his dad cut the grass and built a birdhouse." },
      { scrambled: ["He", "kept", "his", "room", "tidy", "and", "put", "all", "his", "tools", "away"], answer: "He kept his room tidy and put all his tools away." },
      { scrambled: ["Tom", "chose", "a", "sandwich", "and", "paid", "for", "it", "with", "his", "pocket", "money"], answer: "Tom chose a sandwich and paid for it with his pocket money." }
    ]
  },
  ask_me: {
    instructions_easy: "Ask a simple question about Tom's Saturday using what, where, when, or who.",
    instructions_advanced: "Ask a Past Simple question about Tom's Saturday that uses task verbs from Week 32.",
    contexts_easy: [
      {
        id: "w32_what_built",
        task_type: "find_question",
        topic: "building the birdhouse",
        intro: "Tom and his dad built a birdhouse in the garden. Ask what they built.",
        acceptedQuestions: ["What did Tom build?", "What did they build?", "What did Tom and his dad build?"],
        answer: "Tom and his dad built a wooden birdhouse and put it in the oak tree in the garden."
      },
      {
        id: "w32_where_put",
        task_type: "find_question",
        topic: "placing the birdhouse",
        intro: "They put the birdhouse on the oak tree. Ask where they put it.",
        acceptedQuestions: ["Where did they put the birdhouse?", "Where did Tom put it?", "Where was the birdhouse put?"],
        answer: "They put the birdhouse on the big oak tree in the garden."
      }
    ],
    contexts_advanced: [
      {
        id: "w32_why_wrote",
        task_type: "find_question",
        topic: "writing a letter",
        intro: "Tom wrote a long letter to his grandmother. Ask why he wrote it or who he wrote it to.",
        acceptedQuestions: ["Why did Tom write a letter?", "Who did Tom write to?", "What did Tom write?"],
        answer: "Tom wrote a long letter to his grandmother to tell her about all his Saturday tasks and the birdhouse he built."
      },
      {
        id: "w32_how_kept",
        task_type: "find_question",
        topic: "keeping things tidy",
        intro: "Tom kept his room tidy all day. Ask how he kept his room or what he put away.",
        acceptedQuestions: ["How did Tom keep his room tidy?", "What did Tom put away?", "How did Tom organise his things?"],
        answer: "Tom put all his tools in the shed, placed his books on the shelf, and swept the floor to keep everything neat and tidy."
      }
    ]
  }
};
