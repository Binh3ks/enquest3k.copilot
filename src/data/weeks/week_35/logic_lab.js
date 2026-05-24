// WEEK 35: ENVIRONMENTAL ISSUES
// Logic Lab Station — Advanced Mode

export default {
  title: "Climate Change Logic Puzzles",
  image_url: "/images/week35/logic_cover_w35.jpg",
  intro_en: "Solve these logic puzzles about environmental topics.",
  intro_vi: "Giải các câu đố logic về chủ đề môi trường.",
  puzzles: [
    {
      id: 1,
      puzzle_type: "sequence",
      question_en: "A recycling program collects: Week 1: 120 bottles, Week 2: 135 bottles, Week 3: 150 bottles. If the pattern continues, how many bottles in Week 4?",
      question_vi: "Chương trình tái chế thu gom: Tuần 1: 120 chai, Tuần 2: 135 chai, Tuần 3: 150 chai. Nếu pattern tiếp tục, tuần 4 có bao nhiêu chai?",
      hint_en: "Find the pattern in the sequence.",
      hint_vi: "Tìm pattern trong dãy số.",
      solution_en: "Each week increases by 15. 150 + 15 = 165 bottles.",
      solution_vi: "Mỗi tuần tăng 15. 150 + 15 = 165 chai.",
      answer: "165",
      answer_type: "number",
      audio_url: "/audio/week35/logic_1.mp3"
    },
    {
      id: 2,
      puzzle_type: "if_then",
      question_en: "If factories reduce emissions by 20% and currently emit 500 tons, how much will they emit after reduction?",
      question_vi: "Nếu nhà máy giảm khí thải 20% và hiện tại thải 500 tấn, sau khi giảm họ sẽ thải bao nhiêu?",
      hint_en: "Calculate 20% of 500, then subtract.",
      hint_vi: "Tính 20% của 500, rồi trừ đi.",
      solution_en: "20% of 500 = 100. 500 − 100 = 400 tons.",
      solution_vi: "20% của 500 = 100. 500 − 100 = 400 tấn.",
      answer: "400",
      answer_type: "number",
      audio_url: "/audio/week35/logic_2.mp3"
    },
    {
      id: 3,
      puzzle_type: "pattern",
      question_en: "The sequence is: reduce, reuse, recycle, reduce, reuse, ? What comes next?",
      question_vi: "Dãy: giảm, tái sử dụng, tái chế, giảm, tái sử dụng, ? Tiếp theo là gì?",
      hint_en: "The 3Rs repeat in order.",
      hint_vi: "3 chữ R lặp lại theo thứ tự.",
      solution_en: "The 3Rs repeat: reduce, reuse, recycle. Next is recycle.",
      solution_vi: "3 chữ R lặp lại: giảm, tái sử dụng, tái chế. Tiếp theo là tái chế.",
      answer: "recycle",
      answer_type: "word",
      audio_url: "/audio/week35/logic_3.mp3"
    },
    {
      id: 4,
      puzzle_type: "comparison",
      question_en: "Turbine A produces 45 kWh daily. Turbine B produces 3 times as much. How much does Turbine B produce?",
      question_vi: "Turbine A tạo ra 45 kWh mỗi ngày. Turbine B tạo ra gấp 3 lần. Turbine B tạo ra bao nhiêu?",
      hint_en: "Multiply 45 by 3.",
      hint_vi: "Nhân 45 với 3.",
      solution_en: "45 × 3 = 135 kWh.",
      solution_vi: "45 × 3 = 135 kWh.",
      answer: "135",
      answer_type: "number",
      audio_url: "/audio/week35/logic_4.mp3"
    },
    {
      id: 5,
      puzzle_type: "sequence",
      question_en: "A carbon footprint calculator shows: Year 1: 8 tons, Year 2: 6 tons, Year 3: 4 tons. If the pattern continues, Year 5 footprint?",
      question_vi: "Máy tính dấu chân carbon cho thấy: Năm 1: 8 tấn, Năm 2: 6 tấn, Năm 3: 4 tấn. Nếu pattern tiếp tục, Năm 5 là bao nhiêu?",
      hint_en: "Each year decreases by 2 tons.",
      hint_vi: "Mỗi năm giảm 2 tấn.",
      solution_en: "Year 4: 2 tons, Year 5: 0 tons (or 0 if they reach zero).",
      solution_vi: "Năm 4: 2 tấn, Năm 5: 0 tấn.",
      answer: "0",
      answer_type: "number",
      audio_url: "/audio/week35/logic_5.mp3"
    }
  ]
};
