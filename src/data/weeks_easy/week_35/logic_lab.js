// WEEK 35 EASY: ENVIRONMENTAL ISSUES
// Logic Lab Station — Easy Mode

export default {
  title: "Environmental Logic Puzzles",
  image_url: "/images/week35/logic_cover_w35.jpg",
  intro_en: "Solve these easy logic puzzles about the environment.",
  intro_vi: "Giải các câu đố logic dễ về môi trường.",
  puzzles: [
    {
      id: 1,
      puzzle_type: "sequence",
      question_en: "A recycling bin collects: Day 1: 5 bottles, Day 2: 10 bottles, Day 3: 15 bottles. How many bottles on Day 4?",
      question_vi: "Thùng tái chế thu gom: Ngày 1: 5 chai, Ngày 2: 10 chai, Ngày 3: 15 chai. Ngày 4 có bao nhiêu chai?",
      hint_en: "Each day adds 5 more bottles.",
      hint_vi: "Mỗi ngày thêm 5 chai.",
      solution_en: "5, 10, 15... adds 5 each day. Day 4: 15 + 5 = 20.",
      solution_vi: "5, 10, 15... thêm 5 mỗi ngày. Ngày 4: 15 + 5 = 20.",
      answer: "20",
      answer_type: "number",
      audio_url: "/audio/week35_easy/logic_1.mp3"
    },
    {
      id: 2,
      puzzle_type: "pattern",
      question_en: "What comes next: reduce, reuse, recycle, ___?",
      question_vi: "Tiếp theo là gì: giảm, tái sử dụng, tái chế, ___?",
      hint_en: "Start from the beginning.",
      hint_vi: "Bắt đầu lại từ đầu.",
      solution_en: "The pattern is reduce, reuse, recycle, then repeat. Next is reduce.",
      solution_vi: "Pattern là giảm, tái sử dụng, tái chế, rồi lặp lại. Tiếp theo là giảm.",
      answer: "reduce",
      answer_type: "word",
      audio_url: "/audio/week35_easy/logic_2.mp3"
    },
    {
      id: 3,
      puzzle_type: "comparison",
      question_en: "Solar panel A makes 8 units. Solar panel B makes 4 times as much. How much does panel B make?",
      question_vi: "Tấm pin A tạo ra 8 đơn vị. Tấm pin B tạo ra gấp 4 lần. Tấm pin B tạo ra bao nhiêu?",
      hint_en: "Multiply 8 by 4.",
      hint_vi: "Nhân 8 với 4.",
      solution_en: "8 × 4 = 32 units.",
      solution_vi: "8 × 4 = 32 đơn vị.",
      answer: "32",
      answer_type: "number",
      audio_url: "/audio/week35_easy/logic_3.mp3"
    },
    {
      id: 4,
      puzzle_type: "if_then",
      question_en: "If we plant 2 trees every week, how many trees in 6 weeks?",
      question_vi: "Nếu chúng ta trồng 2 cây mỗi tuần, 6 tuần trồng bao nhiêu cây?",
      hint_en: "Multiply 2 by 6.",
      hint_vi: "Nhân 2 với 6.",
      solution_en: "2 × 6 = 12 trees.",
      solution_vi: "2 × 6 = 12 cây.",
      answer: "12",
      answer_type: "number",
      audio_url: "/audio/week35_easy/logic_4.mp3"
    },
    {
      id: 5,
      puzzle_type: "sequence",
      question_en: "Count by 5s: 10, 15, 20, ___?",
      question_vi: "Đếm theo 5: 10, 15, 20, ___?",
      hint_en: "Add 5 each time.",
      hint_vi: "Cộng thêm 5 mỗi lần.",
      solution_en: "10, 15, 20, 25...",
      solution_vi: "10, 15, 20, 25...",
      answer: "25",
      answer_type: "number",
      audio_url: "/audio/week35_easy/logic_5.mp3"
    }
  ]
};
