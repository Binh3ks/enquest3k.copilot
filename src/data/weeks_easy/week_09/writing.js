export default {
  title: "My City",
  min_words: 40,
  model_sentence: "I live in a big city. My city is very busy and noisy. Every day I see tall buildings and modern cars. The streets are full of people and traffic. I take a yellow bus to school. It is a busy street with many cars. Sometimes the traffic is heavy and we move slowly. I see a very tall building near my house. It is a modern building with glass windows. I like my city because it is exciting. There are many places to visit. But sometimes I want to go to a quiet place!",
  instruction_en: "Use: My city is... / It is a ___ city. / There is a ___ near my house. / I can see...",
  instruction_vi: "Dùng: My city is... / It is a ___ city. / There is a ___ near my house. / I can see...",
  prompt_en: "Describe your city or town! What buildings are there? What vehicles do you see? Is your city big or small? What is special about it? Write 4–5 sentences.",
  prompt_vi: "Mô tả thành phố/thị trấn của bạn! Có những công trình nào? Thấy những phương tiện nào? Thành phố to hay nhỏ? Điều đặc biệt là gì?",
  keywords: ["city", "street", "noisy", "busy", "tall", "modern", "car", "bus", "building", "traffic"],
  topic_talk_prompt: "Tell me about a city. What sounds and sights are there?",
  sentence_frames: [{"template":"My city is called ___. It is a ___ city."},{"template":"There is a ___ and a ___ near my house."},{"template":"I can see ___ and ___ on the street."},{"template":"In my city, people like to ___."},{"template":"I love my city because ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== NOUNS (Danh từ) ===", vi: "", distractor: false},
        {word: "Hanoi", vi: "Hà Nội", distractor: false},
        {word: "Saigon", vi: "Sài Gòn", distractor: false},
        {word: "city", vi: "thành phố", distractor: false},
        {word: "building", vi: "tòa nhà", distractor: false},
        {word: "mall", vi: "trung tâm thương mại", distractor: false},
        {word: "park", vi: "công viên", distractor: false},
        {word: "hospital", vi: "bệnh viện", distractor: false},
        {word: "cars", vi: "ô tô", distractor: false},
        {word: "buses", vi: "xe buýt", distractor: false},
        {word: "motorcycles", vi: "xe máy", distractor: false},
        {word: "people", vi: "người", distractor: false},
        {word: "=== ADJECTIVES (Tính từ) ===", vi: "", distractor: false},
        {word: "big", vi: "to", distractor: false},
        {word: "small", vi: "nhỏ", distractor: false},
        {word: "busy", vi: "bận rộn", distractor: false},
        {word: "noisy", vi: "ồn ào", distractor: false},
        {word: "modern", vi: "hiện đại", distractor: false},
        {word: "tall", vi: "cao", distractor: false},
        {word: "exciting", vi: "thú vị", distractor: false},
        {word: "=== VERBS (Động từ) ===", vi: "", distractor: false},
        {word: "shop", vi: "mua sắm", distractor: false},
        {word: "visit", vi: "thăm", distractor: false},
        {word: "walk", vi: "đi bộ", distractor: false},
        {word: "play", vi: "chơi", distractor: false},
        {word: "shopping", vi: "mua sắm (sai dạng)", distractor: true},
        {word: "modernly", vi: "hiện đại (sai loại từ)", distractor: true}
      ]
    }
  }
};
