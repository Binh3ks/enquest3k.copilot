// 🧠 LOGIC & SCIENCE - Week 16: Time Traveler
// Theme: Time Travel | Grammar: Past Simple (Irregular Verbs)
// Focus: Critical Thinking, Patterns, Science Facts (NO arithmetic word problems)

export default {
  title_en: "Logic & Science",
  title_vi: "Logic & Khoa học",
  description_en: "Develop critical thinking and learn science vocabulary",
  description_vi: "Phát triển tư duy phản biện và học từ vựng khoa học",
  
  problems: [
    // ===== PROBLEM 1: PATTERN/SEQUENCE =====
    {
      id: 1,
      type: "pattern",
      question_en: "Look at the pattern: Past, Present, Future, Past, Present, Future, Past, Present... What comes next?",
      question_vi: "Nhìn vào quy luật: Quá khứ, Hiện tại, Tương lai, Quá khứ, Hiện tại, Tương lai, Quá khứ, Hiện tại... Tiếp theo là gì?",
      
      // Answer is non-numeric (pattern completion)
      answer: ["Future", "future", "The future"],
      
      reasoning_type: "inductive", // inductive, deductive, abductive
      
      hint_en: "Look at the repeating pattern: Past → Present → Future → (repeat)",
      hint_vi: "Nhìn vào quy luật lặp lại: Quá khứ → Hiện tại → Tương lai → (lặp lại)",
      
      audio_url: "/audio/week16/logic_science_q1.mp3"
    },
    
    // ===== PROBLEM 2: LOGIC YES/NO (Deductive Reasoning) =====
    {
      id: 2,
      type: "logic_yesno",
      question_en: "T-Rex is a dinosaur that eats meat. Vegetarians do NOT eat meat. Is T-Rex a vegetarian?",
      question_vi: "T-Rex là khủng long ăn thịt. Người ăn chay KHÔNG ăn thịt. T-Rex có phải là động vật ăn chay không?",
      
      answer: ["No", "no", "NO"],
      
      reasoning_type: "deductive",
      
      hint_en: "Think: If T-Rex eats meat, can it be a vegetarian?",
      hint_vi: "Nghĩ: Nếu T-Rex ăn thịt, nó có thể ăn chay không?",
      
      audio_url: "/audio/week16/logic_science_q2.mp3"
    },
    
    // ===== PROBLEM 3: SCIENCE FACT =====
    {
      id: 3,
      type: "science_fact",
      question_en: "Plants need sunlight to make food through photosynthesis. Can plants grow without sunlight?",
      question_vi: "Cây cần ánh sáng mặt trời để tạo thức ăn qua quang hợp. Cây có thể phát triển mà không có ánh sáng mặt trời không?",
      
      answer: ["No", "no", "NO", "Cannot", "cannot"],
      
      reasoning_type: "factual",
      
      hint_en: "Remember: Plants need sunlight for photosynthesis",
      hint_vi: "Nhớ: Cây cần ánh sáng để quang hợp",
      
      audio_url: "/audio/week16/logic_science_q3.mp3"
    },
    
    // ===== PROBLEM 4: TOOL FUNCTION =====
    {
      id: 4,
      type: "tool_function",
      question_en: "Scientists use different tools. Which tool makes small things look BIG so we can see details? (Ruler / Magnifying glass / Thermometer)",
      question_vi: "Các nhà khoa học dùng nhiều công cụ. Công cụ nào làm vật nhỏ trông TO để ta thấy chi tiết? (Thước / Kính lúp / Nhiệt kế)",
      
      answer: ["Magnifying glass", "magnifying glass", "Magnifier", "magnifier"],
      
      reasoning_type: "functional",
      
      hint_en: "Think: Which tool makes things bigger?",
      hint_vi: "Nghĩ: Công cụ nào làm vật to lên?",
      
      audio_url: "/audio/week16/logic_science_q4.mp3"
    },
    
    // ===== PROBLEM 5: CLASSIFICATION =====
    {
      id: 5,
      type: "classification",
      question_en: "Look at these creatures: T-Rex, Triceratops, Dragon. Which one is NOT a real dinosaur?",
      question_vi: "Nhìn các sinh vật này: T-Rex, Triceratops, Rồng. Cái nào KHÔNG phải là khủng long thật?",
      
      answer: ["Dragon", "dragon", "The dragon"],
      
      reasoning_type: "categorical",
      
      hint_en: "Think: Which one is from fairy tales, not from history?",
      hint_vi: "Nghĩ: Cái nào từ truyện cổ tích, không phải từ lịch sử?",
      
      audio_url: "/audio/week16/logic_science_q5.mp3"
    }
  ],
  
  // Instructions for students
  instructions_en: "Use your brain! These questions need logical thinking, not calculations. Read carefully and think about the reason for your answer.",
  instructions_vi: "Dùng não bộ! Những câu hỏi này cần tư duy logic, không phải tính toán. Đọc kỹ và suy nghĩ về lý do cho câu trả lời.",
  
  // Tips for logical thinking
  tips_en: [
    "Read the question twice to understand",
    "Look for patterns or rules",
    "Think: Does this make sense?",
    "Use what you know about the world"
  ],
  tips_vi: [
    "Đọc câu hỏi hai lần để hiểu",
    "Tìm kiếm quy luật hoặc mẫu",
    "Nghĩ: Điều này có hợp lý không?",
    "Dùng những gì bạn biết về thế giới"
  ]
};
