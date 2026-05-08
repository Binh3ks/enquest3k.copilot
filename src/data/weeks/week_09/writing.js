export default {
  title: "My City",
  min_words: 40,
  model_sentence: "I live in a big city. My city is very busy and noisy. Every day I see tall buildings and modern cars. The streets are full of people and traffic. I take a yellow bus to school. It is a busy street with many cars. Sometimes the traffic is heavy and we move slowly. I see a very tall building near my house. It is a modern building with glass windows. I like my city because it is exciting. There are many places to visit. But sometimes I want to go to a quiet place!",
  instruction_en: "Use: My city is... / It is a ___ city. / There is a ___ near my house. / I can see...",
  instruction_vi: "Dùng: My city is... / It is a ___ city. / There is a ___ near my house. / I can see...",
  prompt_en: "Describe your city or town! What buildings are there? What vehicles do you see? Is your city big or small? What is special about it? Write 4–5 sentences.",
  prompt_vi: "Mô tả thành phố/thị trấn của bạn! Có những công trình nào? Thấy những phương tiện nào? Thành phố to hay nhỏ? Điều đặc biệt là gì?",
  keywords: ["city", "street", "noisy", "busy", "tall", "modern", "car", "bus", "building", "traffic"],
  topic_talk_prompt: "Tell me about a city you know. What sounds can you hear? What can you see on the streets?",
  sentence_frames: [
    {"template":"My city is called ___ and it is a very ___ place to live."},
    {"template":"There is a ___ and a ___ near my house, and they are both ___."},
    {"template":"When I walk on the street, I can see ___ and ___ everywhere."},
    {"template":"In my city, people like to ___ and they also enjoy ___."},
    {"template":"I love my city because ___, but sometimes ___."}
  ],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== CITY NAMES (Tên thành phố) ===", vi: "", distractor: false},
        {word: "Hanoi", vi: "Hà Nội", distractor: false},
        {word: "Ho Chi Minh City", vi: "TP HCM", distractor: false},
        {word: "Da Nang", vi: "Đà Nẵng", distractor: false},
        {word: "=== DESCRIPTIONS (Mô tả) ===", vi: "", distractor: false},
        {word: "busy and exciting", vi: "nhộn nhịp và thú vị", distractor: false},
        {word: "modern and noisy", vi: "hiện đại và ồn ào", distractor: false},
        {word: "beautiful and lively", vi: "đẹp và sống động", distractor: false},
        {word: "=== PLACES (Địa điểm) ===", vi: "", distractor: false},
        {word: "tall building", vi: "toà nhà cao", distractor: false},
        {word: "big supermarket", vi: "siêu thị lớn", distractor: false},
        {word: "modern shopping mall", vi: "trung tâm thương mại", distractor: false},
        {word: "busy bus station", vi: "bến xe nhộn nhịp", distractor: false},
        {word: "very useful", vi: "rất hữu ích", distractor: false},
        {word: "always crowded", vi: "luôn đông đúc", distractor: false},
        {word: "=== WHAT YOU SEE (Bạn nhìn thấy) ===", vi: "", distractor: false},
        {word: "many cars and buses", vi: "nhiều xe ô tô và xe buýt", distractor: false},
        {word: "tall buildings and shops", vi: "toà nhà cao và cửa hàng", distractor: false},
        {word: "people walking quickly", vi: "người đi bộ nhanh", distractor: false},
        {word: "traffic lights and signs", vi: "đèn giao thông và biển báo", distractor: false},
        {word: "=== ACTIVITIES (Hoạt động) ===", vi: "", distractor: false},
        {word: "go shopping at the mall", vi: "đi mua sắm ở trung tâm", distractor: false},
        {word: "take the bus to work", vi: "đi xe buýt đến cơ quan", distractor: false},
        {word: "visit museums and parks", vi: "thăm bảo tàng và công viên", distractor: false},
        {word: "walk in the evening", vi: "đi dạo buổi tối", distractor: false},
        {word: "eat at restaurants", vi: "ăn ở nhà hàng", distractor: false},
        {word: "=== REASONS (Lý do) ===", vi: "", distractor: false},
        {word: "it is very exciting and modern", vi: "nó rất thú vị và hiện đại", distractor: false},
        {word: "there are many things to do", vi: "có nhiều thứ để làm", distractor: false},
        {word: "it can be very noisy", vi: "nó có thể rất ồn ào", distractor: false},
        {word: "the traffic is sometimes heavy", vi: "giao thông đôi khi đông", distractor: false},
        {word: "boring", vi: "nhàm chán (sai)", distractor: true},
        {word: "quiet", vi: "yên tĩnh (sai)", distractor: true}
      ]
    }
  }
};
