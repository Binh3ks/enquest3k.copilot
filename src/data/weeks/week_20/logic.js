export default {
  puzzles: [
    { 
      id: 1, type: "logic", 
      title_en: "Pattern", title_vi: "Quy luật", 
      question_en: "Pattern: Bone, Pot, Bone, Pot... What comes next?", 
      question_vi: "Quy luật: Xương, Bình, Xương, Bình... Cái gì tiếp theo?", 
      answer: ["Bone"], hint_en: "ABAB Pattern", hint_vi: "Quy luật ABAB" 
    },
    { 
      id: 2, type: "math", 
      title_en: "The Broken Pots", title_vi: "Những chiếc bình vỡ", 
      question_en: "The archaeologist finds 10 old pots. 3 pots are broken. How many good pots are left?", 
      question_vi: "Nhà khảo cổ tìm thấy 10 cái bình cũ. 3 cái bị vỡ. Còn lại bao nhiêu cái bình lành?", 
      answer: ["7 pots", "Seven pots", "7"], target_number: 7, unit: "pots", 
      hint_en: "10 minus 3", hint_vi: "10 trừ 3" 
    },
    { 
      id: 3, type: "mc", 
      title_en: "Shape", title_vi: "Hình khối", 
      question_en: "The ancient gold coin is round. What shape is it?", 
      question_vi: "Đồng xu vàng cổ đại hình tròn. Nó là hình gì?", 
      options: ["Circle", "Square", "Triangle"],
      answer: ["Circle"], hint_en: "Round like a ball", hint_vi: "Tròn như quả bóng" 
    },
    { 
      id: 4, type: "logic", 
      title_en: "Sorting", title_vi: "Phân loại", 
      question_en: "Which one belongs to the past? (Smartphone / Laptop / Ancient Shovel)", 
      question_vi: "Cái nào thuộc về quá khứ? (Điện thoại / Máy tính / Xẻng cổ)", 
      answer: ["Ancient Shovel", "Shovel"], hint_en: "People used it long ago", hint_vi: "Người xưa đã dùng nó" 
    },
    { 
      id: 5, type: "math", 
      title_en: "Team Work", title_vi: "Làm việc nhóm", 
      question_en: "Conan has 5 brushes. Tim has 5 brushes. How many brushes do they have together?", 
      question_vi: "Conan có 5 cái chổi. Tim có 5 cái chổi. Cả hai có tổng cộng bao nhiêu cái chổi?", 
      answer: ["10 brushes", "Ten brushes", "10"], target_number: 10, unit: "brushes", 
      hint_en: "5 + 5", hint_vi: "5 cộng 5" 
    }
  ]
};
