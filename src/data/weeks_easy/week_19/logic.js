export default {
  puzzles: [
    { 
      id: 1, type: "math", 
      title_en: "Birthday Candles", title_vi: "Nến sinh nhật", 
      question_en: "Last year, I was 6. How old am I now?", 
      question_vi: "Năm ngoái, tớ 6 tuổi. Giờ tớ bao nhiêu tuổi?", 
      answer: ["7", "Seven", "7 years old"], target_number: 7, unit: "years old", 
      hint_en: "6 + 1", hint_vi: "6 cộng 1" 
    },
    { 
      id: 2, type: "logic", 
      title_en: "Growing Up", title_vi: "Lớn lên", 
      question_en: "Baby → Child → ?. What comes after 'Child'?", 
      question_vi: "Em bé → Trẻ em → ?. Cái gì đến sau 'Trẻ em'?", 
      answer: ["Teenager", "Adult"], 
      hint_en: "Bigger than child...", hint_vi: "Lớn hơn trẻ em..." 
    },
    { 
      id: 3, type: "mc", 
      title_en: "Photos", title_vi: "Bức ảnh", 
      question_en: "I have 5 photos. Mom gives me 3 more. How many do I have?", 
      question_vi: "Tớ có 5 bức ảnh. Mẹ cho thêm 3 bức. Tớ có bao nhiêu bức?", 
      options: ["6 photos", "8 photos", "10 photos"],
      answer: ["8 photos", "8"], target_number: 8, unit: "photos",
      hint_en: "5 + 3", hint_vi: "5 cộng 3" 
    },
    { 
      id: 4, type: "logic", 
      title_en: "Past or Now", title_vi: "Quá khứ hay Hiện tại", 
      question_en: "Which one is from the past? (Baby photo / Selfie / Video call)", 
      question_vi: "Cái nào từ quá khứ? (Ảnh em bé / Selfie / Gọi video)", 
      answer: ["Baby photo", "Baby"], 
      hint_en: "From long ago...", hint_vi: "Từ lâu rồi..." 
    },
    { 
      id: 5, type: "math", 
      title_en: "Toys", title_vi: "Đồ chơi", 
      question_en: "There were 4 toys in the box. I took 2 toys. How many are left?", 
      question_vi: "Có 4 đồ chơi trong hộp. Tớ lấy 2 cái. Còn lại bao nhiêu?", 
      answer: ["2 toys", "Two toys", "2"], target_number: 2, unit: "toys",
      hint_en: "4 - 2", hint_vi: "4 trừ 2" 
    }
  ]
};
