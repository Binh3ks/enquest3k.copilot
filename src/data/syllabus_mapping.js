export const SYLLABUS_MAP = {
  // --- TUẦN 10: RURAL ENVIRONMENTS ---
  // Grammar: Comparisons (Er/More) -> Math: More/Less, Size comparison
  10: {
    topic_query: "Country mouse and city mouse story for kids", // Văn học/Truyện thay vì nhạc
    grammar_query: "Comparative adjectives grammar for kids",
    math_query: "More and Less math concept for kids", // Tiền đề toán học cho So sánh
    science_query: "Farm to Table food production for kids", // Kiến thức xã hội thực tế
    target_age: "Group 2" // Ưu tiên kênh độ tuổi 9-12
  },

  // --- TUẦN 11: COMMUNITY ROLES ---
  // Grammar: Modals (Can/Must) -> Math: Sorting/Classifying
  11: {
    topic_query: "Community helpers documentary for kids", // Documentary thực tế hơn Cartoon
    grammar_query: "Modal verbs can and can't rules",
    math_query: "Sorting and Classifying objects math for kids", // Toán logic phân loại
    science_query: "How a city works infrastructure for kids", // Kiến thức xã hội
    target_age: "Group 2"
  },

  // --- TUẦN 12: PERSONAL ABILITIES ---
  // Grammar: Can/Can't -> Math: Time/Practice -> Science: Growth Mindset
  12: {
    topic_query: "Talent show for kids story",
    grammar_query: "Ability modal verbs examples",
    math_query: "Telling time and schedules for kids", // Quản lý thời gian luyện tập
    science_query: "Growth Mindset vs Fixed Mindset for students", // Khoa học não bộ
    target_age: "Group 2"
  }
};

// Danh sách kênh phân loại theo độ tuổi và môn học (Whitelist chuẩn của bạn)
export const CHANNEL_GROUPS = {
  // Nhóm 1: Mầm non/Sơ cấp (Chủ yếu dùng cho Song hoặc Grammar cơ bản)
  KINDER: [
    "Super Simple Songs", "Cocomelon", "Pinkfong", "Little Baby Bum", 
    "Mother Goose Club", "Dave and Ava", "ChuChu TV", "Bounce Patrol",
    "LooLoo Kids", "Blippi" // Blippi hơi ranh giới, nhưng xếp vào đây cho an toàn
  ],
  
  // Nhóm 2: Tiểu học (Mục tiêu chính của chúng ta)
  PRIMARY: [
    "English Singsing", "Wow English TV", "Dream English Kids", "The Singing Walrus",
    "Smile and Learn - English", "Happy Learning English", "Peekaboo Kidz",
    "Dr. Binocs Show", "SciShow Kids", "National Geographic Kids", 
    "Homeschool Pop", "Numberblocks", "Math Songs by NUMBEROCK", 
    "Scratch Garden", "Jack Hartmann", "Periwinkle", "Kids Academy", 
    "Clarendon Learning", "Free School"
  ],

  // Nhóm 3: THCS/Học thuật cao (Dùng cho Phase 2-3 hoặc Science sâu)
  ADVANCED: [
    "TED-Ed", "Crash Course Kids", "Khan Academy", "Khan Academy Kids", 
    "Veritasium", "BBC Learning English", "Easy English", "BrainPOP", 
    "Geography Now", "Simple History", "Kurzgesagt", "AumSum Time",
    "Learn English with Bob the Canadian"
  ]
};
