export default {
  puzzles: [
    { 
      id: 1, type: "logic", 
      title_en: "Feeling Match", title_vi: "Nối Cảm xúc", 
      question_en: "In a story, when there is a big 'Problem', how does the character usually feel? (Happy / Sad / Excited)", 
      question_vi: "Trong truyện, khi gặp 'Vấn đề' lớn, nhân vật thường cảm thấy thế nào?", 
      answer: ["Sad", "Scared", "Worried"], target_number: 0, unit: "", hint_en: "Not happy", hint_vi: "Không vui" 
    },
    { 
      id: 2, type: "math", 
      title_en: "Lost Dogs", title_vi: "Chó lạc", 
      question_en: "There are 5 dogs in the park. 2 dogs run away and get lost. How many dogs are left in the park?", 
      question_vi: "Có 5 con chó. 2 con chạy mất. Còn lại bao nhiêu con?", 
      answer: ["3 dogs", "3"], target_number: 3, unit: "dogs", hint_en: "5 - 2", hint_vi: "5 - 2" 
    },
    { 
      id: 3, type: "logic", 
      title_en: "Story Order", title_vi: "Thứ tự Truyện", 
      question_en: "A story has 3 parts. Part 1 is Beginning. Part 2 is Middle. What is Part 3?", 
      question_vi: "Truyện có 3 phần. Phần 1 là Đầu. Phần 2 là Giữa. Phần 3 là gì?", 
      answer: ["End", "The End"], target_number: 0, unit: "", hint_en: "Last part", hint_vi: "Phần cuối" 
    },
    { 
      id: 4, type: "math", 
      title_en: "Search Time", title_vi: "Thời gian tìm kiếm", 
      question_en: "Conan looks for the dog for 10 minutes. I look for 5 minutes. How many minutes do we look in total?", 
      question_vi: "Conan tìm 10 phút. Tớ tìm 5 phút. Tổng cộng bao nhiêu phút?", 
      answer: ["15 minutes", "15"], target_number: 15, unit: "minutes", hint_en: "10 + 5", hint_vi: "10 + 5" 
    },
    { 
      id: 5, type: "mc", 
      title_en: "Pattern", title_vi: "Quy luật", 
      question_en: "Look at the pattern: Problem, Solution, Problem, Solution, ... What comes next?", 
      question_vi: "Quy luật: Vấn đề, Giải pháp, Vấn đề, Giải pháp... Tiếp theo là gì?", 
      options: ["Problem", "Solution", "End"],
      answer: ["Problem"], target_number: 0, unit: "", hint_en: "Starts with P", hint_vi: "Bắt đầu chữ V" 
    }
  ]
};
