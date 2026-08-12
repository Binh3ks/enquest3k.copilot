/**
 * Week 33 Gold Standard Reference Data — Listening & Arena Hub
 * Includes 30 Flash Arena Items (10 Nouns/Adj, 10 Verbs, 10 Chunks), 5 Sentence Builders, 5 Bar Models, and 10 Check Questions.
 */

export const listeningHubData = {
  week: 33,
  theme: "The Accident File & Making Amends",

  // 1. Array of 30 Flash Arena Card Items in 3 Independent Sets (10 each)
  flash_arena: {
    set1_nouns_adj: [
      { id: "na01", en: "mistake", vi: "sai lầm / lỗi" },
      { id: "na02", en: "accident", vi: "sự cố tai nạn" },
      { id: "na03", en: "puddle", vi: "vũng nước" },
      { id: "na04", en: "backpack", vi: "chiếc cặp sách" },
      { id: "na05", en: "vase", vi: "bình hoa" },
      { id: "na06", en: "careful", vi: "cẩn thận" },
      { id: "na07", en: "clumsy", vi: "vụng về" },
      { id: "na08", en: "sorry", vi: "xin lỗi / hối hận" },
      { id: "na09", en: "cautious", vi: "cẩn trọng" },
      { id: "na10", en: "careless", vi: "bất cẩn" }
    ],
    set2_verbs: [
      { id: "v01", en: "broke", vi: "đã làm vỡ" },
      { id: "v02", en: "fell", vi: "đã ngã" },
      { id: "v03", en: "lost", vi: "đã làm mất" },
      { id: "v04", en: "found", vi: "đã tìm thấy" },
      { id: "v05", en: "slipped", vi: "đã trượt chân" },
      { id: "v06", en: "spilled", vi: "đã làm tràn / đổ" },
      { id: "v07", en: "dropped", vi: "đánh rơi" },
      { id: "v08", en: "apologized", vi: "đã xin lỗi" },
      { id: "v09", en: "repaired", vi: "đã sửa chữa" },
      { id: "v10", en: "searched", vi: "đã tìm kiếm" }
    ],
    set3_chunks: [
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
    set4_definitions: [
      { id: "def01", en: "backpack", vi: "You put your books in this to take them to school." },
      { id: "def02", en: "puddle", vi: "A small pool of liquid on the ground after rain." },
      { id: "def03", en: "alarm clock", vi: "A device that wakes you up with a loud sound." },
      { id: "def04", en: "vase", vi: "A container used for holding fresh flowers." },
      { id: "def05", en: "clumsy", vi: "Moving awkwardly or dropping things easily." },
      { id: "def06", en: "careful", vi: "Paying close attention to avoid making mistakes." },
      { id: "def07", en: "cautious", vi: "Taking care to avoid potential danger or mistakes." },
      { id: "def08", en: "spilled", vi: "Accidentally allowed liquid to flow out of a cup." },
      { id: "def09", en: "repaired", vi: "Fixed or restored something that was broken." },
      { id: "def10", en: "apologized", vi: "Said sorry for causing an accident or mistake." }
    ]
  },

  // 2. Array of 5 Sentence Builder Drills
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

  // 3. Array of 5 Singapore Bar Model Math Problems
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

  // 4. Array of 10 Clean Cambridge Check Mode Exam Questions for Hub 2
  check_mode_drills: [
    {
      id: "chk_w33_01",
      content_id: "chk_w33_01",
      dialogue_context: "Tom: I accidentally broke my alarm clock this morning!",
      text: "What should Mia reply?",
      prompt: "What should Mia reply?",
      options: [
        { label: "A", text: "Don't worry, it was just a clumsy accident.", isCorrect: true },
        { label: "B", text: "Yes, I am waking up right now.", isCorrect: false },
        { label: "C", text: "No, he didn't call the bus driver.", isCorrect: false }
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_02",
      content_id: "chk_w33_02",
      dialogue_context: "Mia: Did you find your lost backpack on the school bus?",
      text: "What should Tom reply?",
      prompt: "What should Tom reply?",
      options: [
        { label: "A", text: "No, I am walking home.", isCorrect: false },
        { label: "B", text: "Yes, thank you for helping me search!", isCorrect: true },
        { label: "C", text: "I like riding the bus to school.", isCorrect: false }
      ],
      answerIndex: 1
    },
    {
      id: "chk_w33_03",
      content_id: "chk_w33_03",
      text: "While Tom ___ up in a hurry, he accidentally knocked over his clock.",
      prompt: "While Tom ___ up in a hurry, he accidentally knocked over his clock.",
      options: [
        { label: "A", text: "was waking", isCorrect: true },
        { label: "B", text: "is waking", isCorrect: false },
        { label: "C", text: "waked", isCorrect: false }
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_04",
      content_id: "chk_w33_04",
      text: "Tom slipped and fell ___ the kitchen tile floor was wet.",
      prompt: "Tom slipped and fell ___ the kitchen tile floor was wet.",
      options: [
        { label: "A", text: "because", isCorrect: true },
        { label: "B", text: "although", isCorrect: false },
        { label: "C", text: "but", isCorrect: false }
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_05",
      content_id: "chk_w33_05",
      text: "___ Tom made a clumsy mistake, Mia helped him mop the puddle kindly.",
      prompt: "___ Tom made a clumsy mistake, Mia helped him mop the puddle kindly.",
      options: [
        { label: "A", text: "Although", isCorrect: true },
        { label: "B", text: "Because", isCorrect: false },
        { label: "C", text: "So", isCorrect: false }
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_06",
      content_id: "chk_w33_06",
      text: "He dropped a glass of juice while he ___ breakfast for his sister.",
      prompt: "He dropped a glass of juice while he ___ breakfast for his sister.",
      options: [
        { label: "A", text: "was making", isCorrect: true },
        { label: "B", text: "were making", isCorrect: false },
        { label: "C", text: "makes", isCorrect: false }
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_07",
      content_id: "chk_w33_07",
      text: "Tom apologized to his mother immediately ___ he felt very sorry.",
      prompt: "Tom apologized to his mother immediately ___ he felt very sorry.",
      options: [
        { label: "A", text: "because", isCorrect: true },
        { label: "B", text: "although", isCorrect: false },
        { label: "C", text: "while", isCorrect: false }
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_08",
      content_id: "chk_w33_08",
      text: "Mia found the blue backpack while she ___ the back row of seats.",
      prompt: "Mia found the blue backpack while she ___ the back row of seats.",
      options: [
        { label: "A", text: "was searching", isCorrect: true },
        { label: "B", text: "searches", isCorrect: false },
        { label: "C", text: "is search", isCorrect: false }
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_09",
      content_id: "chk_w33_09",
      text: "Because Tom rushed downstairs too quickly, he ___ on the rug.",
      prompt: "Because Tom rushed downstairs too quickly, he ___ on the rug.",
      options: [
        { label: "A", text: "slipped", isCorrect: true },
        { label: "B", text: "slips", isCorrect: false },
        { label: "C", text: "was slip", isCorrect: false }
      ],
      answerIndex: 0
    },
    {
      id: "chk_w33_10",
      content_id: "chk_w33_10",
      text: "Tom promised to be cautious ___ he could avoid future morning accidents.",
      prompt: "Tom promised to be cautious ___ he could avoid future morning accidents.",
      options: [
        { label: "A", text: "so", isCorrect: true },
        { label: "B", text: "because", isCorrect: false },
        { label: "C", text: "although", isCorrect: false }
      ],
      answerIndex: 0
    }
  ]
};
