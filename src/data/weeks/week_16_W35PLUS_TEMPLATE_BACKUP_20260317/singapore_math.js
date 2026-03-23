// 📐 SINGAPORE MATH - Week 16: Time Traveler
// Theme: Time Travel | Grammar: Past Simple (Irregular Verbs)
// Focus: Math Vocabulary in English + Bar Model Visualization

export default {
  title_en: "Singapore Math",
  title_vi: "Toán Singapore",
  description_en: "Learn math vocabulary through word problems with Bar Model",
  description_vi: "Học từ vựng toán qua bài toán có lời văn với sơ đồ thanh",
  
  problems: [
    // ===== PROBLEM 1: PART-PART-WHOLE (Addition) =====
    {
      id: 1,
      type: "part_whole",
      question_en: "A T-Rex had 5 eggs in the morning. She laid 3 more eggs in the afternoon. How many eggs does she have in total?",
      question_vi: "Con khủng long T-Rex có 5 trứng buổi sáng. Nó đẻ thêm 3 trứng buổi chiều. Tổng cộng bao nhiêu trứng?",
      
      // Answer must include unit
      answer: ["8 eggs", "eight eggs", "8"],
      
      // Bar Model static image path
      bar_model: "/images/week16/singapore_math/bar_part_whole_q1.svg",
      
      // CPA Stage: concrete (objects), pictorial (bar model), abstract (numbers only)
      cpa_stage: "pictorial",
      
      // Math vocabulary to highlight
      math_vocab: ["total", "part", "whole", "more", "in total"],
      
      // Hint guides through Singapore Math thinking
      hint_en: "Think: Part 1 + Part 2 = Whole. Morning eggs + Afternoon eggs = Total eggs",
      hint_vi: "Nghĩ: Phần 1 + Phần 2 = Tổng. Trứng sáng + Trứng chiều = Tổng trứng",
      
      // Audio path
      audio_url: "/audio/week16/singapore_math_q1.mp3"
    },
    
    // ===== PROBLEM 2: COMPARISON MODEL (Subtraction for Difference) =====
    {
      id: 2,
      type: "comparison",
      question_en: "The old castle is 15 meters tall. The new castle is 9 meters tall. How much taller is the old castle?",
      question_vi: "Lâu đài cũ cao 15 mét. Lâu đài mới cao 9 mét. Lâu đài cũ cao hơn bao nhiêu mét?",
      
      answer: ["6 meters", "6 metres", "6 m", "six meters"],
      
      bar_model: "/images/week16/singapore_math/bar_comparison_q2.svg",
      
      cpa_stage: "pictorial",
      
      math_vocab: ["taller", "difference", "compare", "how much", "meters"],
      
      hint_en: "Think: Compare the heights. Old castle - New castle = Difference. 15 - 9 = ?",
      hint_vi: "Nghĩ: So sánh chiều cao. Lâu đài cũ - Lâu đài mới = Hiệu. 15 - 9 = ?",
      
      audio_url: "/audio/week16/singapore_math_q2.mp3"
    },
    
    // ===== PROBLEM 3: MISSING PART (Subtraction to find unknown part) =====
    {
      id: 3,
      type: "missing_part",
      question_en: "Max's time machine has 12 buttons. Some buttons are red, and 5 buttons are blue. How many buttons are red?",
      question_vi: "Cỗ máy thời gian của Max có 12 nút. Một số nút màu đỏ, và 5 nút màu xanh. Có bao nhiêu nút đỏ?",
      
      answer: ["7 red buttons", "7 buttons", "seven buttons", "7"],
      
      bar_model: "/images/week16/singapore_math/bar_missing_part_q3.svg",
      
      cpa_stage: "abstract",
      
      math_vocab: ["some", "total", "missing part", "how many", "rest"],
      
      hint_en: "Think: Total - Blue buttons = Red buttons. 12 - 5 = ?",
      hint_vi: "Nghĩ: Tổng - Nút xanh = Nút đỏ. 12 - 5 = ?",
      
      audio_url: "/audio/week16/singapore_math_q3.mp3"
    },
    
    // ===== PROBLEM 4: GROUPS (Multiplication as repeated addition) =====
    {
      id: 4,
      type: "groups",
      question_en: "There are 3 knights. Each knight has 2 swords. How many swords in total?",
      question_vi: "Có 3 hiệp sĩ. Mỗi hiệp sĩ có 2 thanh kiếm. Tổng cộng bao nhiêu thanh kiếm?",
      
      answer: ["6 swords", "six swords", "6"],
      
      bar_model: "/images/week16/singapore_math/bar_groups_q4.svg",
      
      cpa_stage: "concrete",
      
      math_vocab: ["each", "groups", "times", "in total", "multiply"],
      
      hint_en: "Think: 3 groups, each has 2. Add: 2 + 2 + 2 = ? or Multiply: 3 × 2 = ?",
      hint_vi: "Nghĩ: 3 nhóm, mỗi nhóm có 2. Cộng: 2 + 2 + 2 = ? hoặc Nhân: 3 × 2 = ?",
      
      audio_url: "/audio/week16/singapore_math_q4.mp3"
    },
    
    // ===== PROBLEM 5: BEFORE-AFTER (Timeline subtraction) =====
    {
      id: 5,
      type: "before_after",
      question_en: "Max went back 200 years from the year 2026. What year did he arrive in the past?",
      question_vi: "Max quay lại 200 năm từ năm 2026. Cậu ấy đến năm nào trong quá khứ?",
      
      answer: ["1826", "year 1826", "the year 1826"],
      
      bar_model: "/images/week16/singapore_math/bar_timeline_q5.svg",
      
      cpa_stage: "abstract",
      
      math_vocab: ["go back", "subtract", "timeline", "past", "before"],
      
      hint_en: "Think: Go back means subtract. Present year - Years back = Past year. 2026 - 200 = ?",
      hint_vi: "Nghĩ: Quay lại nghĩa là trừ. Năm hiện tại - Số năm quay lại = Năm quá khứ. 2026 - 200 = ?",
      
      audio_url: "/audio/week16/singapore_math_q5.mp3"
    }
  ],
  
  // Instructions for students
  instructions_en: "Read each word problem carefully. Look at the Bar Model to understand the problem. Write your answer with the correct unit (eggs, meters, buttons, etc.).",
  instructions_vi: "Đọc kỹ mỗi bài toán. Nhìn vào Sơ đồ Thanh để hiểu bài toán. Viết câu trả lời kèm đơn vị đúng (trứng, mét, nút, v.v.).",
  
  // Tips for solving Singapore Math problems
  tips_en: [
    "Always draw or look at the Bar Model",
    "Identify: What do I know? What do I need to find?",
    "Check: Does my answer make sense?",
    "Don't forget the unit (eggs, meters, etc.)"
  ],
  tips_vi: [
    "Luôn vẽ hoặc nhìn vào Sơ đồ Thanh",
    "Xác định: Tôi biết gì? Tôi cần tìm gì?",
    "Kiểm tra: Câu trả lời có hợp lý không?",
    "Đừng quên đơn vị (trứng, mét, v.v.)"
  ]
};
