/**
 * Week 33 Gold Standard Reference Data — Listening & Arena Hub
 * Includes 16 Sentence Builder Drills, 8 Singapore Bar Models, and 4 Flash Arena Card Sets.
 */

export const listeningHubData = {
  week: 33,
  theme: "The Accident File",

  // 1. Array of 16 Sentence Builder Drills (Past Continuous, Clauses of Reason, Connectors)
  grammar_drills: [
    {
      id: "st2_w33_g01",
      grammar_tag: "past_continuous_when_while",
      text: "Ghép câu diễn tả hành động đang diễn ra thì có hành động khác xen vào (Past Continuous + While).",
      word_blocks: ["While", "I", "was", "exploring", "the", "cave", ",", "I", "found", "a", "glowing", "crystal", "."],
      distractor_blocks: ["am", "is", "explore"],
      answer_key: {
        valid_structures: [
          ["While", "I", "was", "exploring", "the", "cave", ",", "I", "found", "a", "glowing", "crystal", "."],
          ["I", "found", "a", "glowing", "crystal", "while", "I", "was", "exploring", "the", "cave", "."]
        ],
        acceptable_connectors: ["as", "when"],
        clause_rules: { main_clause: ["I found a glowing crystal"], subordinate_clause: ["I was exploring the cave"], connector: ["while"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g02",
      grammar_tag: "clauses_of_reason",
      text: "Ghép câu chỉ nguyên nhân kết quả với Because.",
      word_blocks: ["We", "brought", "torches", "because", "the", "cave", "was", "very", "dark", "."],
      distractor_blocks: ["so", "why", "brings"],
      answer_key: {
        valid_structures: [
          ["We", "brought", "torches", "because", "the", "cave", "was", "very", "dark", "."],
          ["Because", "the", "cave", "was", "very", "dark", ",", "we", "brought", "torches", "."]
        ],
        acceptable_connectors: ["as", "since"],
        clause_rules: { main_clause: ["We brought torches"], subordinate_clause: ["the cave was very dark"], connector: ["because"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g03",
      grammar_tag: "connectors",
      text: "Ghép câu sử dụng từ nối đối lập Although.",
      word_blocks: ["Although", "the", "path", "was", "steep", ",", "the", "scout", "kept", "walking", "."],
      distractor_blocks: ["but", "despite", "walks"],
      answer_key: {
        valid_structures: [
          ["Although", "the", "path", "was", "steep", ",", "the", "scout", "kept", "walking", "."],
          ["The", "scout", "kept", "walking", "although", "the", "path", "was", "steep", "."]
        ],
        acceptable_connectors: ["even though"],
        clause_rules: { main_clause: ["the scout kept walking"], subordinate_clause: ["the path was steep"], connector: ["although"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g04",
      grammar_tag: "past_continuous_when_while",
      text: "Ghép câu hành động đang làm thì gặp tai nạn bất ngờ (Past Continuous + When).",
      word_blocks: ["They", "were", "climbing", "when", "it", "started", "to", "rain", "."],
      distractor_blocks: ["was", "while", "climbed"],
      answer_key: {
        valid_structures: [
          ["They", "were", "climbing", "when", "it", "started", "to", "rain", "."],
          ["When", "it", "started", "to", "rain", ",", "they", "were", "climbing", "."]
        ],
        acceptable_connectors: ["as"],
        clause_rules: { main_clause: ["They were climbing"], subordinate_clause: ["it started to rain"], connector: ["when"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g05",
      grammar_tag: "past_continuous_when_while",
      text: "Ghép câu Tom đang thức dậy thì làm vỡ đồng hồ.",
      word_blocks: ["Tom", "was", "waking", "up", "when", "he", "broke", "his", "clock", "."],
      distractor_blocks: ["were", "breaks", "while"],
      answer_key: {
        valid_structures: [
          ["Tom", "was", "waking", "up", "when", "he", "broke", "his", "clock", "."],
          ["When", "he", "broke", "his", "clock", ",", "Tom", "was", "waking", "up", "."]
        ],
        acceptable_connectors: ["as"],
        clause_rules: { main_clause: ["Tom was waking up"], subordinate_clause: ["he broke his clock"], connector: ["when"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g06",
      grammar_tag: "clauses_of_reason",
      text: "Ghép câu Tom ngã vì sàn nhà có vũng nước.",
      word_blocks: ["Tom", "fell", "down", "because", "the", "floor", "was", "slippery", "."],
      distractor_blocks: ["so", "falls", "why"],
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
      id: "st2_w33_g07",
      grammar_tag: "past_continuous_when_while",
      text: "Ghép câu Tom trượt chân khi đang chạy xuống nhà.",
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
      text: "Ghép câu mặc dù Tom bất cẩn nhưng bạn bè đã giúp đỡ.",
      word_blocks: ["Although", "Tom", "made", "a", "mistake", ",", "Mia", "helped", "him", "."],
      distractor_blocks: ["but", "helps", "makes"],
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
      id: "st2_w33_g09",
      grammar_tag: "past_continuous_when_while",
      text: "Ghép câu Mia tìm thấy cặp khi xe buýt vừa dừng.",
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
      text: "Ghép câu chỉ lý do Tom phải xin lỗi cô giáo.",
      word_blocks: ["Tom", "apologized", "because", "he", "forgot", "his", "homework", "."],
      distractor_blocks: ["so", "forgets", "why"],
      answer_key: {
        valid_structures: [
          ["Tom", "apologized", "because", "he", "forgot", "his", "homework", "."],
          ["Because", "he", "forgot", "his", "homework", ",", "Tom", "apologized", "."]
        ],
        acceptable_connectors: ["as", "since"],
        clause_rules: { main_clause: ["Tom apologized"], subordinate_clause: ["he forgot his homework"], connector: ["because"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g11",
      grammar_tag: "past_continuous_when_while",
      text: "Ghép câu họ đang sửa đồ thì chuông reo.",
      word_blocks: ["They", "were", "fixing", "the", "clock", "when", "the", "bell", "rang", "."],
      distractor_blocks: ["was", "fixes", "while"],
      answer_key: {
        valid_structures: [
          ["They", "were", "fixing", "the", "clock", "when", "the", "bell", "rang", "."],
          ["When", "the", "bell", "rang", ",", "they", "were", "fixing", "the", "clock", "."]
        ],
        acceptable_connectors: ["as"],
        clause_rules: { main_clause: ["They were fixing the clock"], subordinate_clause: ["the bell rang"], connector: ["when"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g12",
      grammar_tag: "connectors",
      text: "Ghép câu Tom mang băng gạc để phòng tai nạn.",
      word_blocks: ["Tom", "was", "cautious", "so", "he", "avoided", "another", "accident", "."],
      distractor_blocks: ["because", "avoiding", "is"],
      answer_key: {
        valid_structures: [
          ["Tom", "was", "cautious", "so", "he", "avoided", "another", "accident", "."],
          ["Because", "Tom", "was", "cautious", ",", "he", "avoided", "another", "accident", "."]
        ],
        acceptable_connectors: ["therefore"],
        clause_rules: { main_clause: ["he avoided another accident"], subordinate_clause: ["Tom was cautious"], connector: ["so"], requires_comma_if_subordinate_first: false }
      }
    },
    {
      id: "st2_w33_g13",
      grammar_tag: "past_continuous_when_while",
      text: "Ghép câu trong khi Tom dọn dẹp thì Mia cất sách.",
      word_blocks: ["While", "Tom", "was", "cleaning", ",", "Mia", "was", "packing", "."],
      distractor_blocks: ["is", "clean", "pack"],
      answer_key: {
        valid_structures: [
          ["While", "Tom", "was", "cleaning", ",", "Mia", "was", "packing", "."],
          ["Mia", "was", "packing", "while", "Tom", "was", "cleaning", "."]
        ],
        acceptable_connectors: ["as"],
        clause_rules: { main_clause: ["Mia was packing"], subordinate_clause: ["Tom was cleaning"], connector: ["while"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g14",
      grammar_tag: "clauses_of_reason",
      text: "Ghép câu ly nước bị hư hại vì rơi từ trên bàn xuống.",
      word_blocks: ["The", "glass", "damaged", "because", "it", "fell", "from", "the", "table", "."],
      distractor_blocks: ["so", "falls", "why"],
      answer_key: {
        valid_structures: [
          ["The", "glass", "damaged", "because", "it", "fell", "from", "the", "table", "."],
          ["Because", "it", "fell", "from", "the", "table", ",", "the", "glass", "damaged", "."]
        ],
        acceptable_connectors: ["as"],
        clause_rules: { main_clause: ["The glass damaged"], subordinate_clause: ["it fell from the table"], connector: ["because"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g15",
      grammar_tag: "connectors",
      text: "Ghép câu dù bị đau nhưng Tom vẫn mỉm cười.",
      word_blocks: ["Although", "his", "leg", "hurt", ",", "Tom", "kept", "smiling", "."],
      distractor_blocks: ["but", "hurts", "smile"],
      answer_key: {
        valid_structures: [
          ["Although", "his", "leg", "hurt", ",", "Tom", "kept", "smiling", "."],
          ["Tom", "kept", "smiling", "although", "his", "leg", "hurt", "."]
        ],
        acceptable_connectors: ["even though"],
        clause_rules: { main_clause: ["Tom kept smiling"], subordinate_clause: ["his leg hurt"], connector: ["although"], requires_comma_if_subordinate_first: true }
      }
    },
    {
      id: "st2_w33_g16",
      grammar_tag: "past_continuous_when_while",
      text: "Ghép câu Tom nhận ra bài học khi chuẩn bị đi ngủ.",
      word_blocks: ["Tom", "was", "thinking", "when", "he", "understood", "his", "lesson", "."],
      distractor_blocks: ["thinks", "were", "while"],
      answer_key: {
        valid_structures: [
          ["Tom", "was", "thinking", "when", "he", "understood", "his", "lesson", "."],
          ["When", "he", "understood", "his", "lesson", ",", "Tom", "was", "thinking", "."]
        ],
        acceptable_connectors: ["as"],
        clause_rules: { main_clause: ["Tom was thinking"], subordinate_clause: ["he understood his lesson"], connector: ["when"], requires_comma_if_subordinate_first: true }
      }
    }
  ],

  // 2. Array of 8 Singapore Bar Model Math Problems (Smooth Text Formulas, 0% LaTeX)
  singapore_math: [
    {
      id: "bar_w33_01",
      title: "Bài toán 1: Tải trọng Thiết bị Hang Động (Part-Whole)",
      problemText: "Đoàn thám hiểm chia thành 2 nhóm mang đồ. Nhóm A mang 60 kg thiết bị. Nhóm B mang 40 kg thiết bị. Hỏi tổng trọng lượng thiết bị cả đoàn mang là bao nhiêu kg? (Công thức: Tổng trọng lượng = Nhóm A + Nhóm B)",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Nhóm A (60 kg)", value: 60, color: "#4f46e5" },
          { label: "Nhóm B (40 kg)", value: 40, color: "#06b6d4" }
        ],
        totalLabel: "? kg"
      },
      correctAnswer: 100
    },
    {
      id: "bar_w33_02",
      title: "Bài toán 2: So Sánh Số Pha Lê Thu Thập (Comparison)",
      problemText: "Leo thu thập được 24 viên pha lê. Mia thu thập được 15 viên pha lê. Hỏi Leo thu thập nhiều hơn Mia bao nhiêu viên pha lê? (Công thức: Chênh lệch = Số viên của Leo - Số viên của Mia)",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Leo", label: "24 viên", width: 240 },
          { name: "Mia", label: "15 viên", width: 150 }
        ]
      },
      correctAnswer: 9
    },
    {
      id: "bar_w33_03",
      title: "Bài toán 3: Độ dài Dây Thừng Cứu Hộ (Part-Whole)",
      problemText: "Đội cứu hộ ghép 3 cuộn dây thừng lần lượt dài 15m, 25m và 30m. Hỏi tổng độ dài dây thừng sau khi ghép là bao nhiêu mét? (Công thức: Tổng độ dài = Dây 1 + Dây 2 + Dây 3)",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Cuộn 1 (15m)", value: 21, color: "#4f46e5" },
          { label: "Cuộn 2 (25m)", value: 35, color: "#06b6d4" },
          { label: "Cuộn 3 (30m)", value: 44, color: "#10b981" }
        ],
        totalLabel: "? m"
      },
      correctAnswer: 70
    },
    {
      id: "bar_w33_04",
      title: "Bài toán 4: Mảnh Bản Đồ Cổ Còn Thiếu (Comparison)",
      problemText: "Bức bản đồ cổ cần 80 mảnh ghép. Nhóm thám hiểm đã tìm thấy 45 mảnh. Hỏi còn thiếu bao nhiêu mảnh nữa để hoàn chỉnh bản đồ? (Công thức: Số mảnh thiếu = Tổng số mảnh - Số mảnh đã tìm)",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Tổng số", label: "80 mảnh", width: 280 },
          { name: "Đã tìm", label: "45 mảnh", width: 160 }
        ]
      },
      correctAnswer: 35
    },
    {
      id: "bar_w33_05",
      title: "Bài toán 5: Số Đồng Hồ Cần Sửa (Part-Whole)",
      problemText: "Tiệm sửa chữa nhận 12 chiếc đồng hồ gãy kim và 18 chiếc đồng hồ vỡ mặt kính. Hỏi tổng số đồng hồ tiệm nhận sửa là bao nhiêu chiếc? (Công thức: Tổng = Số gãy kim + Số vỡ kính)",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Gãy kim (12)", value: 40, color: "#4f46e5" },
          { label: "Vỡ kính (18)", value: 60, color: "#06b6d4" }
        ],
        totalLabel: "? chiếc"
      },
      correctAnswer: 30
    },
    {
      id: "bar_w33_06",
      title: "Bài toán 6: So Sánh Chi Phí Sửa Đồ (Comparison)",
      problemText: "Chi phí sửa chiếc cặp xách là 50 nghìn đồng. Chi phí sửa chiếc đồng hồ là 85 nghìn đồng. Hỏi chi phí sửa đồng hồ đắt hơn chi phí sửa cặp bao nhiêu nghìn đồng? (Công thức: Chênh lệch = Chi phí đồng hồ - Chi phí cặp)",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Đồng hồ", label: "85 nghìn", width: 255 },
          { name: "Cặp xách", label: "50 nghìn", width: 150 }
        ]
      },
      correctAnswer: 35
    },
    {
      id: "bar_w33_07",
      title: "Bài toán 7: Số Băng Gạc Cứu Thương (Part-Whole)",
      problemText: "Hộp y tế trường học có 35 cuộn băng gạc nhỏ và 25 cuộn băng gạc lớn. Hỏi tổng số cuộn băng gạc trong hộp là bao nhiêu? (Công thức: Tổng = Băng nhỏ + Băng lớn)",
      modelData: {
        type: "part_whole",
        bars: [
          { label: "Băng nhỏ (35)", value: 58, color: "#4f46e5" },
          { label: "Băng lớn (25)", value: 42, color: "#06b6d4" }
        ],
        totalLabel: "? cuộn"
      },
      correctAnswer: 60
    },
    {
      id: "bar_w33_08",
      title: "Bài toán 8: Quãng Đường Trở Về (Comparison)",
      problemText: "Quãng đường thám hiểm dài 100 km. Đội thám hiểm đã đi được 68 km. Hỏi đội thám hiểm còn phải đi bao nhiêu km nữa để đến đích? (Công thức: Quãng đường còn lại = Tổng quãng đường - Quãng đường đã đi)",
      modelData: {
        type: "comparison",
        bars: [
          { name: "Tổng đường", label: "100 km", width: 300 },
          { name: "Đã đi", label: "68 km", width: 204 }
        ]
      },
      correctAnswer: 32
    }
  ],

  // 3. Array of 4 Flash Arena Card Sets
  flash_arena: [
    {
      set_id: "set_w33_01",
      title: "Bộ Từ 1: Động Từ Tai Nạn (Accident Verbs)",
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
      title: "Bộ Từ 2: Tính Từ & Khắc Phục (Attributes & Fixes)",
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
      title: "Bộ Từ 3: Từ Vựng Mở Rộng A2/B1+ (Extended A2/B1+)",
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
      title: "Bộ Từ 4: Cảnh Báo & Thận Trọng (Caution & Care)",
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
