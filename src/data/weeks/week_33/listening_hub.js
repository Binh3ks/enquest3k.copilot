/**
 * Week 33 Gold Standard Reference Data — Listening & Arena Hub
 * Includes 5 Sentence Builder Drills, 5 Singapore Bar Models, 3 Flash Arena Card Sets, and 10 Check Mode Questions.
 */

export const listeningHubData = {
  week: 33,
  theme: "The Accident File",

  // 1. Array of EXACTLY 5 Sentence Builder Drills
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

  // 2. Array of EXACTLY 5 Singapore Bar Model Math Problems
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

  // 3. Array of EXACTLY 3 Flash Arena Card Sets
  flash_arena: [
    {
      set_id: "set_w33_01",
      title: "Group 1: Core Words",
      pairs: [
        { id: "v01", en: "broke", vi: "đã làm vỡ / gãy" },
        { id: "v02", en: "fell", vi: "đã ngã / rơi" },
        { id: "v03", en: "lost", vi: "đã làm mất" },
        { id: "v04", en: "found", vi: "đã tìm thấy" },
        { id: "v05", en: "mistake", vi: "sai lầm / lỗi" }
      ]
    },
    {
      set_id: "set_w33_02",
      title: "Group 2: Irregular Verbs",
      pairs: [
        { id: "v06", en: "dropped", vi: "đánh rơi" },
        { id: "v07", en: "damaged", vi: "bị hư hại" },
        { id: "v08", en: "searched", vi: "đã tìm kiếm" },
        { id: "v09", en: "apologized", vi: "đã xin lỗi" },
        { id: "v10", en: "slipped", vi: "trượt chân" }
      ]
    },
    {
      set_id: "set_w33_03",
      title: "Group 3: Chunks & Collocations",
      pairs: [
        { id: "c01", en: "broke an alarm clock", vi: "làm vỡ đồng hồ báo thức" },
        { id: "c02", en: "slipped on a puddle", vi: "trượt chân trên vũng nước" },
        { id: "c03", en: "dropped a glass", vi: "đánh rơi ly nước" },
        { id: "c04", en: "lost his backpack", vi: "làm mất chiếc cặp" },
        { id: "c05", en: "apologized to teacher", vi: "xin lỗi cô giáo" }
      ]
    }
  ],

  // 4. Array of EXACTLY 10 Check Mode Questions for Hub 2
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
      raw_content: { text_en: "Because Tom ran downstairs quickly, he slipped.", grammar_tag: "clauses_of_reason" },
      answer_key: { valid_structures: [["Because", "Tom", "ran", "downstairs", "quickly", ",", "he", "slipped", "."]] }
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
      raw_content: { text_en: "Tom promised to be cautious so he could avoid accidents.", grammar_tag: "connectors" },
      answer_key: { valid_structures: [["Tom", "promised", "to", "be", "cautious", "so", "he", "could", "avoid", "accidents", "."]] }
    }
  ]
};
