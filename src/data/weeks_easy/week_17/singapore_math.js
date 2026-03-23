export default {
  problems: [
    {
      id: 1,
      type: "part_whole",
      question_en: "Lily has 2 umbrellas. Her mom has 3 umbrellas. How many umbrellas in total?",
      question_vi: "Lily có 2 cái ô. Mẹ cô ấy có 3 cái ô. Tổng cộng có bao nhiêu cái ô?",
      answer: [{ label: "Total umbrellas", value: 5 }],
      bar_model: { parts: [{ label: "Lily", value: 2 }, { label: "Mom", value: 3 }], whole: 5 },
      cpa_stage: "pictorial",
      math_vocab: ["total", "in total", "altogether"],
      hints: ["2 + 3 = ?", "Count all umbrellas together"],
      audio_url: "/audio/week17_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      question_en: "It rained 4 days in Week 1. It rained 6 days in Week 2. How many more days did it rain in Week 2?",
      question_vi: "Tuần 1 có 4 ngày mưa. Tuần 2 có 6 ngày mưa. Tuần 2 mưa nhiều hơn bao nhiêu ngày?",
      answer: [{ label: "More rainy days in Week 2", value: 2 }],
      bar_model: { a: { label: "Week 1", value: 4 }, b: { label: "Week 2", value: 6 }, difference: 2 },
      cpa_stage: "pictorial",
      math_vocab: ["more", "difference", "compare"],
      hints: ["6 - 4 = ?", "How many more: minus"],
      audio_url: "/audio/week17_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "part_whole",
      question_en: "There are 5 coats in the class. 3 are blue. The rest are red. How many are red?",
      question_vi: "Có 5 cái áo khoác trong lớp. 3 cái màu xanh. Những cái còn lại màu đỏ. Có bao nhiêu cái màu đỏ?",
      answer: [{ label: "Red coats", value: 2 }],
      bar_model: { whole: 5, parts: [{ label: "Blue", value: 3 }, { label: "Red", value: "?" }] },
      cpa_stage: "pictorial",
      math_vocab: ["the rest", "remaining", "how many"],
      hints: ["5 - 3 = ?", "Whole minus part = other part"],
      audio_url: "/audio/week17_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "part_whole",
      question_en: "Tim wears 2 hats in winter. His sister wears 1 hat. How many hats do they wear altogether?",
      question_vi: "Tim đội 2 cái mũ vào mùa đông. Em gái Tim đội 1 cái mũ. Tổng cộng họ đội bao nhiêu cái mũ?",
      answer: [{ label: "Total hats", value: 3 }],
      bar_model: { parts: [{ label: "Tim", value: 2 }, { label: "Sister", value: 1 }], whole: 3 },
      cpa_stage: "concrete",
      math_vocab: ["altogether", "total", "add"],
      hints: ["2 + 1 = ?", "Add both numbers"],
      audio_url: "/audio/week17_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "comparison",
      question_en: "Class A has 7 students with boots. Class B has 4 students with boots. How many fewer students in Class B?",
      question_vi: "Lớp A có 7 học sinh đi ủng. Lớp B có 4 học sinh đi ủng. Lớp B có ít hơn bao nhiêu học sinh đi ủng?",
      answer: [{ label: "Fewer students in Class B", value: 3 }],
      bar_model: { a: { label: "Class A", value: 7 }, b: { label: "Class B", value: 4 }, difference: 3 },
      cpa_stage: "pictorial",
      math_vocab: ["fewer", "difference", "less than"],
      hints: ["7 - 4 = ?", "Fewer means minus"],
      audio_url: "/audio/week17_easy/math_p5.mp3"
    }
  ]
};
