export default {
  puzzles: [
    { 
      id: 1, type: "math", 
      title_en: "Birthday Candles", title_vi: "Nến sinh nhật", 
      question_en: "Last year, Tom was 7 years old. He had 7 candles on his cake. This year, how many candles will he have?", 
      question_vi: "Năm ngoái, Tom 7 tuổi. Cậu ấy có 7 ngọn nến trên bánh. Năm nay, cậu ấy sẽ có bao nhiêu ngọn nến?", 
      answer: ["8 candles", "Eight candles", "8"], target_number: 8, unit: "candles", 
      hint_en: "7 + 1", hint_vi: "7 cộng 1" 
    },
    { 
      id: 2, type: "logic", 
      title_en: "Timeline", title_vi: "Dòng thời gian", 
      question_en: "Baby → Child → Teenager → Adult. What comes after 'Child'?", 
      question_vi: "Em bé → Trẻ em → Thiếu niên → Người lớn. Cái gì đến sau 'Trẻ em'?", 
      answer: ["Teenager"], 
      hint_en: "The next stage...", hint_vi: "Giai đoạn tiếp theo..." 
    },
    { 
      id: 3, type: "mc", 
      title_en: "Old Photos", title_vi: "Ảnh cũ", 
      question_en: "Grandma has 12 old photos. She gives 4 photos to Mom. How many photos does Grandma have now?", 
      question_vi: "Bà có 12 bức ảnh cũ. Bà cho Mẹ 4 bức. Giờ Bà còn bao nhiêu bức?", 
      options: ["6 photos", "8 photos", "10 photos"],
      answer: ["8 photos", "8"], target_number: 8, unit: "photos",
      hint_en: "12 minus 4", hint_vi: "12 trừ 4" 
    },
    { 
      id: 4, type: "logic", 
      title_en: "Sorting", title_vi: "Phân loại", 
      question_en: "Which one is from the past? (Smartphone / Vinyl record / Tablet)", 
      question_vi: "Cái nào thuộc về quá khứ? (Điện thoại thông minh / Đĩa than / Máy tính bảng)", 
      answer: ["Vinyl record", "Vinyl"], 
      hint_en: "People used it long ago for music", hint_vi: "Người xưa dùng nó để nghe nhạc" 
    },
    { 
      id: 5, type: "math", 
      title_en: "Family Tree", title_vi: "Cây gia đình", 
      question_en: "In the family photo from 2010, there were 4 people. Now in 2025, there are 6 people. How many more people are there now?", 
      question_vi: "Trong ảnh gia đình năm 2010, có 4 người. Giờ năm 2025, có 6 người. Giờ có thêm bao nhiêu người?", 
      answer: ["2 people", "Two people", "2"], target_number: 2, unit: "people",
      hint_en: "6 - 4", hint_vi: "6 trừ 4" 
    }
  ]
};
