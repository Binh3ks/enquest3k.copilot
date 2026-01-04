export default {
  puzzles: [
    { 
      id: 1, type: "logic", 
      title_en: "Story Order", title_vi: "Thứ tự Truyện", 
      question_en: "Look at the pictures of the story: 1. They flew in the sky. 2. They built a kite. 3. They fixed the engine. What is the correct order (Beginning -> Middle -> End)?", 
      question_vi: "Nhìn tranh: 1. Bay lên trời. 2. Làm diều. 3. Sửa động cơ. Thứ tự đúng là gì?", 
      answer: ["2, 3, 1"], target_number: 0, unit: "", hint_en: "Build -> Fix -> Fly", hint_vi: "Làm -> Sửa -> Bay" 
    },
    { 
      id: 2, type: "math", 
      title_en: "Flight Time", title_vi: "Thời gian bay", 
      question_en: "The first flight was 12 seconds long. The second flight was 15 seconds long. How many seconds did they fly in total?", 
      question_vi: "Chuyến 1 bay 12 giây. Chuyến 2 bay 15 giây. Tổng cộng bao nhiêu giây?", 
      answer: ["27 seconds"], target_number: 27, unit: "seconds", hint_en: "12 + 15", hint_vi: "12 + 15" 
    },
    { 
      id: 3, type: "logic", 
      title_en: "Identify Problem", title_vi: "Tìm Vấn đề", 
      question_en: "Conan wants to drive his car, but the gas tank is empty. What is the problem?", 
      question_vi: "Conan muốn lái xe, nhưng bình xăng rỗng. Vấn đề là gì?", 
      answer: ["Empty gas tank", "No gas"], target_number: 0, unit: "", hint_en: "No gas", hint_vi: "Hết xăng" 
    },
    { 
      id: 4, type: "math", 
      title_en: "History Math", title_vi: "Toán Lịch sử", 
      question_en: "We are in the year 2025. The first flight was in 1903. How many years ago was the first flight?", 
      question_vi: "Năm nay là 2025. Chuyến bay đầu tiên năm 1903. Cách đây bao nhiêu năm?", 
      answer: ["122 years"], target_number: 122, unit: "years", hint_en: "2025 - 1903", hint_vi: "2025 - 1903" 
    },
    { 
      id: 5, type: "mc", 
      title_en: "Story Pattern", title_vi: "Quy luật Truyện", 
      question_en: "Every story follows a pattern: Beginning, Middle, End, Beginning, Middle, ... What comes next?", 
      question_vi: "Quy luật: Đầu, Giữa, Cuối, Đầu, Giữa... Tiếp theo là gì?", 
      options: ["Beginning", "Middle", "End"],
      answer: ["End"], target_number: 0, unit: "", hint_en: "Pattern B-M-E", hint_vi: "Quy luật Đ-G-C" 
    }
  ]
};
