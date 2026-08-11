/**
 * Week 33 Gold Standard Reference Data — Listening & Arena Hub
 * Includes 16 Sentence Builder Drills, 10 Singapore Bar Models, and 4 Flash Arena Card Sets.
 */

export const listeningHubData = {
  week: 33,
  theme: "The Accident File",

  // 1. Array of 16 Sentence Builder Drills (Past Continuous, Clauses of Reason, Connectors)
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
        ],
        acceptable_connectors: ["as", "when"],
        clause_rules: { main_clause: ["he broke his clock"], subordinate_clause: ["Tom was waking up"], connector: ["while"], requires_comma_if_subordinate_first: true }
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
        ],
        acceptable_connectors: ["as", "since"],
        clause_rules: { main_clause: ["Tom fell down"], subordinate_clause: ["the floor was slippery"], connector: ["because"], requires_comma_if_subordinate_first: true }
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
        ],
        acceptable_connectors: ["even though"],
        clause_rules: { main_clause: ["Mia helped him"], subordinate_clause: ["Tom made a mistake"], connector: ["although"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g04",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a sentence describing an interruption with 'when'.",
      word_blocks: ["They", "were", "walking", "when", "it", "started", "to", "rain", "."],
      distractor_blocks: ["was", "while", "walked"],
      answer_key: {
        valid_structures: [
          ["They", "were", "walking", "when", "it", "started", "to", "rain", "."],
          ["When", "it", "started", "to", "rain", ",", "they", "were", "walking", "."]
        ],
        acceptable_connectors: ["as"],
        clause_rules: { main_clause: ["They were walking"], subordinate_clause: ["it started to rain"], connector: ["when"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g05",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a sentence about dropping juice while making breakfast.",
      word_blocks: ["While", "he", "was", "making", "breakfast", ",", "he", "dropped", "a", "glass", "."],
      distractor_blocks: ["were", "breaks", "while"],
      answer_key: {
        valid_structures: [
          ["While", "he", "was", "making", "breakfast", ",", "he", "dropped", "a", "glass", "."],
          ["He", "dropped", "a", "glass", "while", "he", "was", "making", "breakfast", "."]
        ],
        acceptable_connectors: ["as"],
        clause_rules: { main_clause: ["he dropped a glass"], subordinate_clause: ["he was making breakfast"], connector: ["while"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g06",
      grammar_tag: "clauses_of_reason",
      text_en: "Build a sentence showing why Tom was late.",
      word_blocks: ["Tom", "was", "late", "because", "he", "lost", "his", "backpack", "."],
      distractor_blocks: ["so", "falls", "why"],
      answer_key: {
        valid_structures: [
          ["Tom", "was", "late", "because", "he", "lost", "his", "backpack", "."],
          ["Because", "he", "lost", "his", "backpack", ",", "Tom", "was", "late", "."]
        ],
        acceptable_connectors: ["as", "since"],
        clause_rules: { main_clause: ["Tom was late"], subordinate_clause: ["he lost his backpack"], connector: ["because"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g07",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a sentence about slipping on a wet floor.",
      word_blocks: ["While", "Tom", "was", "running", ",", "he", "slipped", "on", "a", "puddle", "."],
      distractor_blocks: ["is", "slips", "run"],
      answer_key: {
        valid_structures: [
          ["While", "Tom", "was", "running", ",", "he", "slipped", "on", "a", "puddle", "."],
          ["He", "slipped", "on", "a", "puddle", "while", "Tom", "was", "running", "."]
        ],
        acceptable_connectors: ["as", "when"],
        clause_rules: { main_clause: ["he slipped on a puddle"], subordinate_clause: ["Tom was running"], connector: ["while"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g08",
      grammar_tag: "connectors",
      text_en: "Build a contrast sentence with 'Although'.",
      word_blocks: ["Although", "Tom", "felt", "sorry", ",", "his", "teacher", "remained", "kind", "."],
      distractor_blocks: ["but", "helps", "makes"],
      answer_key: {
        valid_structures: [
          ["Although", "Tom", "felt", "sorry", ",", "his", "teacher", "remained", "kind", "."],
          ["His", "teacher", "remained", "kind", "although", "Tom", "felt", "sorry", "."]
        ],
        acceptable_connectors: ["even though"],
        clause_rules: { main_clause: ["his teacher remained kind"], subordinate_clause: ["Tom felt sorry"], connector: ["although"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g09",
      grammar_tag: "past_continuous_when_while",
      text_en: "Build a sentence about searching for the lost backpack.",
      word_blocks: ["Mia", "found", "the", "bag", "while", "she", "was", "searching", "."],
      distractor_blocks: ["finds", "were", "search"],
      answer_key: {
        valid_structures: [
          ["Mia", "found", "the", "bag", "while", "she", "was", "searching", "."],
          ["While", "she", "was", "searching", ",", "Mia", "found", "the", "bag", "."]
        ],
        acceptable_connectors: ["as", "when"],
        clause_rules: { main_clause: ["Mia found the bag"], subordinate_clause: ["she was searching"], connector: ["while"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g10",
      grammar_tag: "clauses_of_reason",
      text_en: "Build a sentence about apologizing for a mistake.",
      word_blocks: ["Tom", "apologized", "because", "he", "made", "a", "clumsy", "mistake", "."],
      distractor_blocks: ["so", "forgets", "why"],
      answer_key: {
        valid_structures: [
          ["Tom", "apologized", "because", "he", "made", "a", "clumsy", "mistake", "."],
          ["Because", "he", "made", "a", "clumsy", "mistake", ",", "Tom", "apologized", "."]
        ],
        acceptable_connectors: ["as", "since"],
        clause_rules: { main_clause: ["Tom apologized"], subordinate_clause: ["he made a clumsy mistake"], connector: ["because"], requires_comma_if_subordinate_first: true }
      }
    }
  ],

  // 2. Array of EXACTLY 10 Singapore Bar Model Math Problems (Part-Whole & Comparison)
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
      problemText: "The repair shop received 12 broken clocks and 18 damaged school bags. How many items did the shop receive in total?",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Broken Clocks (12)", value: 40, color: "#4f46e5" },
          { label: "Damaged Bags (18)", value: 60, color: "#06b6d4" }
        ],
        totalLabel: "? items"
      },
      correctAnswer: 30
    },
    {
      id: "bar_w33_06",
      title: "Problem 6: Comparing Repair Fees (Comparison)",
      problemText: "Repairing a school bag costs 50 dollars. Repairing a vintage clock costs 85 dollars. How much more does the clock repair cost?",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Clock Repair", label: "85 dollars", width: 255 },
          { name: "Bag Repair", label: "50 dollars", width: 150 }
        ]
      },
      correctAnswer: 35
    },
    {
      id: "bar_w33_07",
      title: "Problem 7: First Aid Bandages (Part-Whole)",
      problemText: "The school nurse had 35 small bandages and 25 large bandages. How many bandages were in the first aid box in total?",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Small Bandages (35)", value: 58, color: "#4f46e5" },
          { label: "Large Bandages (25)", value: 42, color: "#06b6d4" }
        ],
        totalLabel: "? bandages"
      },
      correctAnswer: 60
    },
    {
      id: "bar_w33_08",
      title: "Problem 8: Distance to School (Comparison)",
      problemText: "The bus route to school is 100 meters long. Tom walked 68 meters before catching the bus. How many meters did he ride on the bus?",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Total Distance", label: "100 meters", width: 300 },
          { name: "Walked Distance", label: "68 meters", width: 204 }
        ]
      },
      correctAnswer: 32
    },
    {
      id: "bar_w33_09",
      title: "Problem 9: Cleaning Towels Used (Part-Whole)",
      problemText: "Tom used 6 paper towels for the spilled juice and 4 paper towels for the wet stairs. How many towels did he use in total?",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Juice Cleanup (6)", value: 60, color: "#4f46e5" },
          { label: "Stair Cleanup (4)", value: 40, color: "#06b6d4" }
        ],
        totalLabel: "? towels"
      },
      correctAnswer: 10
    },
    {
      id: "bar_w33_10",
      title: "Problem 10: Bus Seat Search (Comparison)",
      problemText: "The school bus has 45 total seats. Mia searched 30 seats before finding Tom's backpack. How many seats were left unsearched?",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Total Seats", label: "45 seats", width: 225 },
          { name: "Searched Seats", label: "30 seats", width: 150 }
        ]
      },
      correctAnswer: 15
    }
  ],

  // 3. Array of 4 Flash Arena Card Sets
  flash_arena: [
    {
      set_id: "set_w33_01",
      title: "Set 1: Accident Verbs",
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
      title: "Set 2: Attributes & Fixes",
      pairs: [
        { id: "v06", en: "accident", vi: "sự cố tai nạn" },
        { id: "v07", en: "fix", vi: "sửa chữa" },
        { id: "v08", en: "sorry", vi: "xin lỗi / hối hận" },
        { id: "v09", en: "careful", vi: "cẩn thận" },
        { id: "v10", en: "clumsy", vi: "vụng về" }
      ]
    },
    {
      set_id: "set_w33_03",
      title: "Set 3: Extended Actions A2/B1+",
      pairs: [
        { id: "v11", en: "dropped", vi: "đánh rơi" },
        { id: "v12", en: "damaged", vi: "bị hư hại" },
        { id: "v13", en: "searched", vi: "đã tìm kiếm" },
        { id: "v14", en: "apologized", vi: "đã xin lỗi" },
        { id: "v15", en: "trip", vi: "vấp chân" }
      ]
    },
    {
      set_id: "set_w33_04",
      title: "Set 4: Caution & Carefulness",
      pairs: [
        { id: "v16", en: "slip", vi: "trượt chân" },
        { id: "v17", en: "repair", vi: "sửa sang" },
        { id: "v18", en: "cautious", vi: "thận trọng" },
        { id: "v19", en: "careless", vi: "bất cẩn" },
        { id: "v20", en: "ignore", vi: "ngó lơ" }
      ]
    }
  ]
};
