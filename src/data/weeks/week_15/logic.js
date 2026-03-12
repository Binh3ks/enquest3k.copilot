export default {
  title: "Logic Puzzles - Park Activities",
  image_url: "/images/week15/logic_cover_w15.jpg",
  audio_url: "/audio/week15/logic_main.mp3",
  puzzles: [
    {
      id: 1,
      question_en: "Tom is running faster than Sarah. Sarah is running faster than Mike. Who is the slowest runner?",
      question_vi: "Tom chạy nhanh hơn Sarah. Sarah chạy nhanh hơn Mike. Ai là người chạy chậm nhất?",
      answer: ["Mike", "mike"],
      hint_en: "Think about the order: Tom > Sarah > ?",
      hint_vi: "Nghĩ về thứ tự: Tom > Sarah > ?",
      audio: "/audio/week15/logic_q1.mp3"
    },
    {
      id: 2,
      question_en: "Three children are flying kites: Anna's kite is red, Ben's kite is not blue, and there are only red, blue, and yellow kites. If Chen's kite is blue, what color is Ben's kite?",
      question_vi: "Ba đứa trẻ đang thả diều: Diều của Anna màu đỏ, diều của Ben không màu xanh dương, và chỉ có diều đỏ, xanh dương và vàng. Nếu diều của Chen màu xanh dương, diều của Ben màu gì?",
      answer: ["yellow", "Yellow"],
      hint_en: "Anna = red, Chen = blue, Ben = ?",
      hint_vi: "Anna = đỏ, Chen = xanh dương, Ben = ?",
      audio: "/audio/week15/logic_q2.mp3"
    },
    {
      id: 3,
      question_en: "A family is having a picnic. The mother is sitting between the father and the daughter. The son is sitting next to the father but not next to the mother. Who is sitting at the end?",
      question_vi: "Một gia đình đang dã ngoại. Mẹ ngồi giữa bố và con gái. Con trai ngồi cạnh bố nhưng không cạnh mẹ. Ai ngồi ở đầu?",
      answer: ["son", "the son", "Son"],
      hint_en: "Order: Son - Father - Mother - Daughter",
      hint_vi: "Thứ tự: Con trai - Bố - Mẹ - Con gái",
      audio: "/audio/week15/logic_q3.mp3"
    },
    {
      id: 4,
      question_en: "Four people are jogging around the park path. Emma starts before David. David starts before Lisa. Frank is jogging before Emma. Who started first?",
      question_vi: "Bốn người đang chạy bộ quanh đường công viên. Emma bắt đầu trước David. David bắt đầu trước Lisa. Frank chạy bộ trước Emma. Ai bắt đầu đầu tiên?",
      answer: ["Frank", "frank"],
      hint_en: "Follow the chain: Frank > Emma > David > Lisa",
      hint_vi: "Theo chuỗi: Frank > Emma > David > Lisa",
      audio: "/audio/week15/logic_q4.mp3"
    },
    {
      id: 5,
      question_en: "At the fountain, 5 children are playing. 2 children are wearing red shirts, 2 are wearing blue shirts, and 1 is wearing both red and blue. How many children are wearing red?",
      question_vi: "Ở đài phun nước, 5 đứa trẻ đang chơi. 2 đứa mặc áo đỏ, 2 đứa mặc áo xanh, và 1 đứa mặc cả đỏ và xanh. Có bao nhiêu đứa trẻ đang mặc đỏ?",
      answer: ["3", "three", "Three"],
      hint_en: "2 wearing only red + 1 wearing both red and blue = ?",
      hint_vi: "2 chỉ mặc đỏ + 1 mặc cả đỏ và xanh = ?",
      audio: "/audio/week15/logic_q5.mp3"
    }
  ],
  instructions_en: "Read each puzzle carefully. Think about the information given. Write your answer and check it!",
  instructions_vi: "Đọc kỹ mỗi câu đố. Suy nghĩ về thông tin được đưa ra. Viết câu trả lời và kiểm tra!",
  tips: [
    "Draw a picture or diagram to help you visualize the problem",
    "List all the information you know from the question",
    "Work through the clues step by step",
    "Check your answer makes sense with all the clues"
  ]
};
