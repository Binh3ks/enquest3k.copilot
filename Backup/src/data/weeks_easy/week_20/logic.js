export default {
  puzzles: [
    { 
      id: 1, type: "logic", 
      title_en: "Color Pattern", title_vi: "Quy luật màu sắc", 
      question_en: "Pattern: Red pot, Blue pot, Red pot... What is next?", 
      question_vi: "Quy luật: Bình đỏ, Bình xanh, Bình đỏ... Tiếp theo là gì?", 
      options: ["Red pot", "Blue pot"],
      answer: ["Blue pot"], hint_en: "ABAB", hint_vi: "Đỏ - Xanh - Đỏ..." 
    },
    { 
      id: 2, type: "math", 
      title_en: "Counting Cups", title_vi: "Đếm cốc", 
      question_en: "Grandma has 3 old cups. I give her 2 more. How many cups total?", 
      question_vi: "Bà có 3 cái cốc cũ. Tớ cho bà thêm 2 cái nữa. Tổng cộng có bao nhiêu cái cốc?", 
      answer: ["5 cups", "5"], target_number: 5, unit: "cups", 
      hint_en: "3 plus 2", hint_vi: "3 cộng 2" 
    },
    { 
      id: 3, type: "mc", 
      title_en: "The Plate", title_vi: "Cái đĩa", 
      question_en: "The old plate is a circle. What is its shape?", 
      question_vi: "Cái đĩa cũ là một hình tròn. Hình dáng của nó là gì?", 
      options: ["Circle", "Square"],
      answer: ["Circle"], hint_en: "Round", hint_vi: "Hình tròn" 
    },
    { 
      id: 4, type: "logic", 
      title_en: "Old vs New", title_vi: "Cũ và Mới", 
      question_en: "Which one is OLD? (Old Lamp / New Phone)", 
      question_vi: "Cái nào CŨ? (Đèn cũ / Điện thoại mới)", 
      answer: ["Old Lamp", "Lamp"], hint_en: "Not new", hint_vi: "Không phải đồ mới" 
    },
    { 
      id: 5, type: "math", 
      title_en: "Spoons", title_vi: "Những chiếc thìa", 
      question_en: "There are 10 spoons. 4 spoons are dirty. How many are clean?", 
      question_vi: "Có 10 cái thìa. 4 cái bị bẩn. Còn bao nhiêu cái sạch?", 
      answer: ["6 spoons", "6"], target_number: 6, unit: "spoons", 
      hint_en: "10 minus 4", hint_vi: "10 trừ 4" 
    }
  ]
};
