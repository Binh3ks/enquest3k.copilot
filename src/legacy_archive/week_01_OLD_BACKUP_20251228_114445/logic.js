export default {
  puzzles: [
    { 
      id: 1, type: "math", 
      title_en: "Pencil Count", title_vi: "Đếm bút chì", 
      question_en: "Alex has 3 pencils in his backpack. His friend Mary gives him 2 more pencils before class. How many pencils does Alex have now?", 
      question_vi: "Alex có 3 cây bút chì trong ba lô. Bạn Mary cho cậu ấy thêm 2 cây trước giờ học. Giờ Alex có bao nhiêu cây bút chì?", 
      answer: ["5 pencils", "Five pencils", "5"], target_number: 5, unit: "pencils", 
      hint_en: "3 + 2", hint_vi: "3 cộng 2" 
    },
    { 
      id: 2, type: "logic", 
      title_en: "Classroom Mystery", title_vi: "Bí ẩn lớp học", 
      question_en: "There are 10 students in Alex's classroom. 3 students go to the library to read books. How many students are still in the classroom?", 
      question_vi: "Có 10 học sinh trong lớp của Alex. 3 học sinh đi thư viện đọc sách. Còn bao nhiêu học sinh trong lớp?", 
      answer: ["7 students", "Seven students", "7"], target_number: 7, unit: "students",
      hint_en: "10 minus 3", hint_vi: "10 trừ 3" 
    },
    { 
      id: 3, type: "mc", 
      title_en: "Book Sharing", title_vi: "Chia sẻ sách", 
      question_en: "Ms. Johnson has 12 science books in the library. She gives 4 books to Alex's class and 3 books to another class. How many books does Ms. Johnson have left?", 
      question_vi: "Cô Johnson có 12 quyển sách khoa học trong thư viện. Cô cho lớp Alex 4 quyển và lớp khác 3 quyển. Cô còn bao nhiêu quyển?", 
      options: ["3 books", "5 books", "7 books"],
      answer: ["5 books", "5"], target_number: 5, unit: "books",
      hint_en: "12 - 4 - 3", hint_vi: "12 trừ 4 trừ 3" 
    },
    { 
      id: 4, type: "logic", 
      title_en: "Tools Sorting", title_vi: "Phân loại công cụ", 
      question_en: "Which tool helps scientists see very tiny things that our eyes cannot see? (Ruler / Microscope / Thermometer)", 
      question_vi: "Công cụ nào giúp nhà khoa học nhìn thấy vật rất nhỏ mà mắt không thấy? (Thước kẻ / Kính hiển vi / Nhiệt kế)", 
      answer: ["Microscope", "microscope"], 
      hint_en: "It makes tiny things look big", hint_vi: "Nó làm vật nhỏ trông to" 
    },
    { 
      id: 5, type: "math", 
      title_en: "Notebook Count", title_vi: "Đếm vở", 
      question_en: "Alex starts the week with 8 notebooks. He uses 2 notebooks for English class and 1 notebook for Science class. How many notebooks does Alex have left?", 
      question_vi: "Alex bắt đầu tuần với 8 quyển vở. Cậu ấy dùng 2 quyển cho tiếng Anh và 1 quyển cho Khoa học. Alex còn bao nhiêu quyển?", 
      answer: ["5 notebooks", "Five notebooks", "5"], target_number: 5, unit: "notebooks",
      hint_en: "8 - 2 - 1", hint_vi: "8 trừ 2 trừ 1" 
    }
  ]
};
