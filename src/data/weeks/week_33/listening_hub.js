/**
 * Week 33 Gold Standard Reference Data — Listening & Arena Hub
 * Includes 20 Core Vocab Items (Nouns, Adjectives, Verbs), 10 Lexical Chunks, 5 Sentence Builder Drills, 5 Singapore Bar Models, 4 Flash Arena Card Sets, and 10 Check Mode Questions.
 */

export const listeningHubData = {
  week: 33,
  theme: "The Accident File & Making Amends",

  // 1. Array of 20 Core Vocab Items (Nouns, Adjectives, Verbs)
  vocab_20_words: [
    // Nouns (7)
    { id: "v01", en: "mistake", vi: "sai lầm / lỗi", category: "Nouns" },
    { id: "v02", en: "accident", vi: "sự cố tai nạn", category: "Nouns" },
    { id: "v03", en: "puddle", vi: "vũng nước", category: "Nouns" },
    { id: "v04", en: "backpack", vi: "chiếc cặp sách", category: "Nouns" },
    { id: "v05", en: "flower vase", vi: "bình hoa", category: "Nouns" },
    { id: "v06", en: "alarm clock", vi: "đồng hồ báo thức", category: "Nouns" },
    { id: "v07", en: "juice glass", vi: "ly nước trái cây", category: "Nouns" },
    // Adjectives (6)
    { id: "v08", en: "careful", vi: "cẩn thận", category: "Adjectives" },
    { id: "v09", en: "clumsy", vi: "vụng về", category: "Adjectives" },
    { id: "v10", en: "sorry", vi: "xin lỗi / hối hận", category: "Adjectives" },
    { id: "v11", en: "cautious", vi: "dè chừng / cẩn trọng", category: "Adjectives" },
    { id: "v12", en: "careless", vi: "bất cẩn", category: "Adjectives" },
    { id: "v13", en: "slippery", vi: "trơn trượt", category: "Adjectives" },
    // Verbs (7)
    { id: "v14", en: "broke", vi: "đã làm vỡ", category: "Verbs" },
    { id: "v15", en: "fell", vi: "đã ngã", category: "Verbs" },
    { id: "v16", en: "lost", vi: "đã làm mất", category: "Verbs" },
    { id: "v17", en: "slipped", vi: "đã trượt chân", category: "Verbs" },
    { id: "v18", en: "spilled", vi: "đã làm tràn / đổ", category: "Verbs" },
    { id: "v19", en: "dropped", vi: "đã đánh rơi", category: "Verbs" },
    { id: "v20", en: "apologized", vi: "đã xin lỗi", category: "Verbs" }
  ],

  // 2. Array of 10 Lexical Chunks / Collocations
  lexical_chunks_10: [
    { id: "c01", en: "broke an alarm clock", vi: "làm vỡ đồng hồ báo thức" },
    { id: "c02", en: "slipped on a puddle", vi: "trượt chân trên vũng nước" },
    { id: "c03", en: "spilled the juice", vi: "làm đổ nước trái cây" },
    { id: "c04", en: "apologized to mom", vi: "xin lỗi mẹ" },
    { id: "c05", en: "lost his backpack", vi: "làm mất chiếc cặp" },
    { id: "c06", en: "dropped a glass", vi: "đánh rơi ly nước" },
    { id: "c07", en: "cleaned up carefully", vi: "cẩn thận dọn dẹp" },
    { id: "c08", en: "damaged a notebook", vi: "làm hư cuốn vở" },
    { id: "c09", en: "searched the bus", vi: "tìm kiếm trên xe buýt" },
    { id: "c10", en: "promised to be cautious", vi: "hứa sẽ cẩn trọng hơn" }
  ],

  // 3. Array of 5 Sentence Builder Drills
  grammar_drills: [
    {
      id: "st2_w33_g01",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a past continuous sentence with 'While'.",
      word_blocks: ["While", "Tom", "was", "waking", "up", ",", "he", "broke", "his", "clock", "."],
      distractor_blocks: ["am", "is", "explore"],
      answer_key: {
        valid_structures: [
          ["While", "Tom", "was", "waking", "up", ",", "he", "broke", "his", "clock", "."],
          ["He", "broke", "his", "clock", "while", "Tom", "was", "waking", "up", "."]
        ]
      }
    },
    {
      id: "st2_w33_g02",
      grammar_tag: "clauses_of_reason",
      text_en: "Build a cause and effect sentence with 'because'.",
      word_blocks: ["Tom", "fell", "down", "because", "the", "floor", "was", "slippery", "."],
      distractor_blocks: ["so", "why", "brings"],
      answer_key: {
        valid_structures: [
          ["Tom", "fell", "down", "because", "the", "floor", "was", "slippery", "."],
          ["Because", "the", "floor", "was", "slippery", ",", "Tom", "fell", "down", "."]
        ]
      }
    },
    {
      id: "st2_w33_g03",
      grammar_tag: "connectors",
      text_en: "Build a sentence showing contrast with 'Although'.",
      word_blocks: ["Although", "Tom", "made", "a", "mistake", ",", "Mia", "helped", "him", "."],
      distractor_blocks: ["but", "despite", "walks"],
      answer_key: {
        valid_structures: [
          ["Although", "Tom", "made", "a", "mistake", ",", "Mia", "helped", "him", "."],
          ["Mia", "helped", "him", "although", "Tom", "made", "a", "mistake", "."]
        ]
      }
    },
    {
      id: "st2_w33_g04",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a sentence about dropping a glass of orange juice.",
      word_blocks: ["While", "making", "breakfast", ",", "he", "dropped", "a", "glass", "."],
      distractor_blocks: ["were", "breaks", "while"],
      answer_key: {
        valid_structures: [
          ["While", "making", "breakfast", ",", "he", "dropped", "a", "glass", "."],
          ["He", "dropped", "a", "glass", "while", "making", "breakfast", "."]
        ]
      }
    },
    {
      id: "st2_w33_g05",
      grammar_tag: "clauses_of_reason",
      text_en: "Build a sentence about apologizing for a clumsy mistake.",
      word_blocks: ["Tom", "apologized", "because", "he", "made", "a", "mistake", "."],
      distractor_blocks: ["so", "forgets", "why"],
      answer_key: {
        valid_structures: [
          ["Tom", "apologized", "because", "he", "made", "a", "mistake", "."],
          ["Because", "he", "made", "a", "mistake", ",", "Tom", "apologized", "."]
        ]
      }
    }
  ],

  // 4. Array of 5 Singapore Bar Model Math Problems
  singapore_math: [
    {
      id: "bar_w33_01",
      title: "Problem 1: Broken Clocks & Vases (Part-Whole)",
      problemText: "Tom broke 2 alarm clocks and 3 glass vases by accident. How many total items did Tom break?",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Alarm Clocks (2)", value: 40, color: "#4f46e5" },
          { label: "Glass Vases (3)", value: 60, color: "#06b6d4" }
        ],
        totalLabel: "? items"
      },
      correctAnswer: 5
    },
    {
      id: "bar_w33_02",
      title: "Problem 2: Comparing Replacement Costs (Comparison)",
      problemText: "A new alarm clock costs 25 dollars. A new backpack costs 40 dollars. How much more expensive is the backpack than the alarm clock?",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Backpack", label: "40 dollars", width: 240 },
          { name: "Alarm Clock", label: "25 dollars", width: 150 }
        ]
      },
      correctAnswer: 15
    },
    {
      id: "bar_w33_03",
      title: "Problem 3: Total Repair Time (Part-Whole)",
      problemText: "Tom spent 15 minutes cleaning up spilled juice and 25 minutes fixing his clock. How many total minutes did he spend?",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Juice Cleanup (15m)", value: 37.5, color: "#4f46e5" },
          { label: "Clock Repair (25m)", value: 62.5, color: "#06b6d4" }
        ],
        totalLabel: "? minutes"
      },
      correctAnswer: 40
    },
    {
      id: "bar_w33_04",
      title: "Problem 4: Finding Missing Homework Pages (Comparison)",
      problemText: "Tom’s notebook had 50 total pages. The spilled juice damaged 15 pages. How many clean pages remain?",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Total Pages", label: "50 pages", width: 250 },
          { name: "Damaged Pages", label: "15 pages", width: 75 }
        ]
      },
      correctAnswer: 35
    },
    {
      id: "bar_w33_05",
      title: "Problem 5: Repair Shop Items (Part-Whole)",
      problemText: "The repair shop received 12 broken alarm clocks and 18 damaged school bags. How many items did the shop receive in total?",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Broken Clocks (12)", value: 40, color: "#4f46e5" },
          { label: "Damaged Bags (18)", value: 60, color: "#06b6d4" }
        ],
        totalLabel: "? items"
      },
      correctAnswer: 30
    }
  ],

  // 5. Array of 4 Flash Arena Card Sets (20 Core Words + 10 Chunks)
  flash_arena: {
    set_w33_01: [
      { id: "v01", en: "mistake", vi: "sai lầm / lỗi" },
      { id: "v02", en: "accident", vi: "sự cố tai nạn" },
      { id: "v03", en: "puddle", vi: "vũng nước" },
      { id: "v04", en: "backpack", vi: "chiếc cặp sách" },
      { id: "v05", en: "careful", vi: "cẩn thận" },
      { id: "v06", en: "clumsy", vi: "vụng về" },
      { id: "v07", en: "slippery", vi: "trơn trượt" }
    ],
    set_w33_02: [
      { id: "v08", en: "broke", vi: "đã làm vỡ / gãy" },
      { id: "v09", en: "fell", vi: "đã ngã / rơi" },
      { id: "v10", en: "lost", vi: "đã làm mất" },
      { id: "v11", en: "slipped", vi: "đã trượt chân" },
      { id: "v12", en: "spilled", vi: "đã làm tràn / đổ" },
      { id: "v13", en: "dropped", vi: "đánh rơi" },
      { id: "v14", en: "damaged", vi: "bị hư hại" }
    ],
    set_w33_03: [
      { id: "v15", en: "flower vase", vi: "bình hoa" },
      { id: "v16", en: "alarm clock", vi: "đồng hồ báo thức" },
      { id: "v17", en: "sorry", vi: "xin lỗi" },
      { id: "v18", en: "cautious", vi: "cẩn trọng" },
      { id: "v19", en: "careless", vi: "bất cẩn" },
      { id: "v20", en: "apologized", vi: "đã xin lỗi" }
    ],
    set_w33_04: [
      { id: "c01", en: "broke an alarm clock", vi: "làm vỡ đồng hồ báo thức" },
      { id: "c02", en: "slipped on a puddle", vi: "trượt chân trên vũng nước" },
      { id: "c03", en: "spilled the juice", vi: "làm đổ nước trái cây" },
      { id: "c04", en: "apologized to mom", vi: "xin lỗi mẹ" },
      { id: "c05", en: "lost his backpack", vi: "làm mất chiếc cặp" },
      { id: "c06", en: "dropped a glass", vi: "đánh rơi ly nước" },
      { id: "c07", en: "cleaned up carefully", vi: "cẩn thận dọn dẹp" },
      { id: "c08", en: "damaged a notebook", vi: "làm hư cuốn vở" },
      { id: "c09", en: "searched the bus", vi: "tìm kiếm trên xe buýt" },
      { id: "c10", en: "promised to be cautious", vi: "hứa sẽ cẩn trọng hơn" }
    ]
  },

  // 6. Array of 10 Check Mode Questions for Hub 2
  check_mode_drills: [
    {
      content_id: "chk_h2_01",
      raw_content: { text_en: "While Tom was waking up, he broke his alarm clock.", grammar_tag: "past_continuous_when_while" },
      answer_key: { valid_structures: [["While", "Tom", "was", "waking", "up", ",", "he", "broke", "his", "alarm", "clock", "."]] }
    },
    {
      content_id: "chk_h2_02",
      raw_content: { text_en: "Tom fell down because the floor was wet.", grammar_tag: "clauses_of_reason" },
      answer_key: { valid_structures: [["Tom", "fell", "down", "because", "the", "floor", "was", "wet", "."]] }
    },
    {
      content_id: "chk_h2_03",
      raw_content: { text_en: "Although Tom made a mistake, Mia helped him.", grammar_tag: "connectors" },
      answer_key: { valid_structures: [["Although", "Tom", "made", "a", "mistake", ",", "Mia", "helped", "him", "."]] }
    },
    {
      content_id: "chk_h2_04",
      raw_content: { text_en: "He dropped a glass while he was making breakfast.", grammar_tag: "past_continuous_when_while" },
      answer_key: { valid_structures: [["He", "dropped", "a", "glass", "while", "he", "was", "making", "breakfast", "."]] }
    },
    {
      content_id: "chk_h2_05",
      raw_content: { text_en: "Tom apologized because he was clumsy in the morning.", grammar_tag: "clauses_of_reason" },
      answer_key: { valid_structures: [["Tom", "apologized", "because", "he", "was", "clumsy", "in", "the", "morning", "."]] }
    },
    {
      content_id: "chk_h2_06",
      raw_content: { text_en: "Mia found the backpack while she was searching the bus.", grammar_tag: "past_continuous_when_while" },
      answer_key: { valid_structures: [["Mia", "found", "the", "backpack", "while", "she", "was", "searching", "the", "bus", "."]] }
    },
    {
      content_id: "chk_h2_07",
      raw_content: { text_en: "Because Tom ran downstairs quickly, he slipped on the rug.", grammar_tag: "clauses_of_reason" },
      answer_key: { valid_structures: [["Because", "Tom", "ran", "downstairs", "quickly", ",", "he", "slipped", "on", "the", "rug", "."]] }
    },
    {
      content_id: "chk_h2_08",
      raw_content: { text_en: "Although he lost his bag, his friend brought it to class.", grammar_tag: "connectors" },
      answer_key: { valid_structures: [["Although", "he", "lost", "his", "bag", ",", "his", "friend", "brought", "it", "to", "class", "."]] }
    },
    {
      content_id: "chk_h2_09",
      raw_content: { text_en: "They were fixing the clock when the school bell rang.", grammar_tag: "past_continuous_when_while" },
      answer_key: { valid_structures: [["They", "were", "fixing", "the", "clock", "when", "the", "school", "bell", "rang", "."]] }
    },
    {
      content_id: "chk_h2_10",
      raw_content: { text_en: "Tom promised to be cautious so he could avoid future accidents.", grammar_tag: "connectors" },
      answer_key: { valid_structures: [["Tom", "promised", "to", "be", "cautious", "so", "he", "could", "avoid", "future", "accidents", "."]] }
    }
  ]
};
