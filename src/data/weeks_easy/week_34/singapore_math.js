// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Singapore Math Station — Easy Mode

export default {
  title: "Singapore Math: The Ant and the Grasshopper",
  image_url: "/images/week34/math_cover_w34.jpg",
  audio_url: "/audio/week34_easy/math_main.mp3",
  intro_en: "Use the bar model to solve these fable word problems.",
  intro_vi: "Dùng mô hình thanh để giải các bài toán về truyện ngụ ngôn.",
  problems: [
    {
      id: 1,
      type: "part_whole",
      cpa_stage: "pictorial",
      question_en: "The ant gathered 18 seeds on Monday and 12 seeds on Tuesday. How many seeds did the ant gather in total?",
      question_vi: "Con kiến nhặt 18 hạt vào thứ Hai và 12 hạt vào thứ Ba. Con kiến nhặt tổng cộng bao nhiêu hạt?",
      bar_model: "/images/week34/barmodel_w34_easy_p1_v1.jpg",
      solution_steps: ["Monday: 18 seeds", "Tuesday: 12 seeds", "Total: 18 + 12 = ?"],
      answer: ["30", "thirty", "30 seeds"],
      unit: "seeds",
      hint_en: "Add 18 and 12: 18 + 12.",
      hint_vi: "Cộng 18 và 12: 18 + 12.",
      explanation_en: "18 + 12 = 30. The ant gathered 30 seeds in total.",
      math_vocab: ["total", "gather", "add", "sum"],
      audio_url: "/audio/week34_easy/math_p1.mp3"
    },
    {
      id: 2,
      type: "comparison",
      cpa_stage: "pictorial",
      question_en: "The ant stored 24 seeds. The grasshopper stored 8 seeds. How many more seeds did the ant store?",
      question_vi: "Con kiến dự trữ 24 hạt. Con châu chấu dự trữ 8 hạt. Con kiến dự trữ nhiều hơn bao nhiêu hạt?",
      bar_model: "/images/week34/barmodel_w34_easy_p2_v1.jpg",
      solution_steps: ["Ant: 24 seeds", "Grasshopper: 8 seeds", "More: 24 - 8 = ?"],
      answer: ["16", "sixteen", "16 seeds"],
      unit: "seeds",
      hint_en: "Subtract 8 from 24: 24 - 8.",
      hint_vi: "Lấy 24 trừ 8: 24 - 8.",
      explanation_en: "24 - 8 = 16. The ant stored 16 more seeds than the grasshopper.",
      math_vocab: ["more", "difference", "compare", "subtract"],
      audio_url: "/audio/week34_easy/math_p2.mp3"
    },
    {
      id: 3,
      type: "missing_part",
      cpa_stage: "pictorial",
      question_en: "The ant needed 40 seeds for winter. It gathered 25 seeds. How many more seeds does it need?",
      question_vi: "Con kiến cần 40 hạt cho mùa đông. Nó đã nhặt được 25 hạt. Nó cần thêm bao nhiêu hạt nữa?",
      bar_model: "/images/week34/barmodel_w34_easy_p3_v1.jpg",
      solution_steps: ["Needed: 40 seeds", "Gathered: 25 seeds", "Remaining: 40 - 25 = ?"],
      answer: ["15", "fifteen", "15 seeds"],
      unit: "seeds",
      hint_en: "Subtract 25 from 40: 40 - 25.",
      hint_vi: "Lấy 40 trừ 25: 40 - 25.",
      explanation_en: "40 - 25 = 15. The ant needs 15 more seeds.",
      math_vocab: ["missing part", "remaining", "need", "subtract"],
      audio_url: "/audio/week34_easy/math_p3.mp3"
    },
    {
      id: 4,
      type: "groups",
      cpa_stage: "pictorial",
      question_en: "The ant put 6 seeds in each of its 3 shelters. How many seeds did the ant store in total?",
      question_vi: "Con kiến đặt 6 hạt vào mỗi trong 3 nơi trú ẩn. Tổng cộng con kiến dự trữ bao nhiêu hạt?",
      bar_model: "/images/week34/barmodel_w34_easy_p4_v1.jpg",
      solution_steps: ["Shelters: 3", "Seeds each: 6", "Total: 3 x 6 = ?"],
      answer: ["18", "eighteen", "18 seeds"],
      unit: "seeds",
      hint_en: "Multiply 3 shelters by 6 seeds: 3 x 6.",
      hint_vi: "Nhân 3 nơi trú ẩn với 6 hạt: 3 x 6.",
      explanation_en: "3 x 6 = 18. The ant stored 18 seeds in total.",
      math_vocab: ["groups", "multiply", "total", "each"],
      audio_url: "/audio/week34_easy/math_p4.mp3"
    },
    {
      id: 5,
      type: "before_after",
      cpa_stage: "pictorial",
      question_en: "The ant ate 9 seeds in the first week of winter. It had 20 seeds left. How many seeds did the ant have at first?",
      question_vi: "Con kiến ăn 9 hạt trong tuần đầu tiên của mùa đông. Nó còn lại 20 hạt. Ban đầu con kiến có bao nhiêu hạt?",
      bar_model: "/images/week34/barmodel_w34_easy_p5_v1.jpg",
      solution_steps: ["Seeds left: 20", "Seeds eaten: 9", "At first: 20 + 9 = ?"],
      answer: ["29", "twenty-nine", "29 seeds"],
      unit: "seeds",
      hint_en: "Add seeds left and seeds eaten: 20 + 9.",
      hint_vi: "Cộng số hạt còn lại và số hạt đã ăn: 20 + 9.",
      explanation_en: "20 + 9 = 29. The ant had 29 seeds at first.",
      math_vocab: ["at first", "before", "after", "left", "add"],
      audio_url: "/audio/week34_easy/math_p5.mp3"
    }
  ]
};
