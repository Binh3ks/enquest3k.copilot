export default {
  title: "My Home News Report",
  min_words: 30,
  instruction_en: "Use: I am standing at... / I can see... / ___ is ___ing... / Right now, people are...",
  instruction_vi: "Dùng: I am standing at... / I can see... / ___ is ___ing... / Right now, people are...",
  prompt_en: "Imagine you are a news reporter! What can you see right now? What are people doing around you? What is happening? Report the scene in 4–5 sentences.",
  prompt_vi: "Hãy tưởng tượng bạn là phóng viên tin tức! Bạn đang nhìn thấy gì? Mọi người xung quanh đang làm gì? Chuyện gì đang xảy ra? Tường thuật 4–5 câu.",
  model_sentence: "Hello! This is live news from my home. I am sitting at my desk and learning English. My mum is cooking in the kitchen right now. My brother is reading a book in his room. My cat is sleeping on the big sofa. The fan is spinning quietly above us. It is a very busy and exciting scene at my house today!",
  keywords: ["I am", "is", "are", "happening", "reporter", "describe", "live", "-ing"],
  topic_talk_prompt: "Tell me about something interesting happening near you right now.",
  sentence_frames: [{"template":"Hello! I am reporting live from ___."},{"template":"Right now, I can see ___."},{"template":"___ is ___ing and ___ is ___ing."},{"template":"Over there, ___ people are ___ing ___."},{"template":"This is happening because ___."},{"template":"This is ___ reporting. Back to you!"}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== PLACES (Địa điểm) ===", vi: "", distractor: false},
        {word: "my home", vi: "nhà tôi", distractor: false},
        {word: "the park", vi: "công viên", distractor: false},
        {word: "school", vi: "trường học", distractor: false},
        {word: "the playground", vi: "sân chơi", distractor: false},
        {word: "=== PEOPLE (Người) ===", vi: "", distractor: false},
        {word: "my mom", vi: "mẹ tôi", distractor: false},
        {word: "my dad", vi: "bố tôi", distractor: false},
        {word: "my brother", vi: "anh/em trai tôi", distractor: false},
        {word: "my sister", vi: "chị/em gái tôi", distractor: false},
        {word: "my teacher", vi: "giáo viên", distractor: false},
        {word: "=== VERBS -ING (Động từ tiếp diễn) ===", vi: "", distractor: false},
        {word: "cooking", vi: "đang nấu", distractor: false},
        {word: "reading", vi: "đang đọc", distractor: false},
        {word: "playing", vi: "đang chơi", distractor: false},
        {word: "studying", vi: "đang học", distractor: false},
        {word: "watching", vi: "đang xem", distractor: false},
        {word: "sleeping", vi: "đang ngủ", distractor: false},
        {word: "eating", vi: "đang ăn", distractor: false},
        {word: "walking", vi: "đang đi bộ", distractor: false},
        {word: "=== NOUNS (Danh từ) ===", vi: "", distractor: false},
        {word: "Emma", vi: "Emma (tên phóng viên)", distractor: false},
        {word: "Max", vi: "Max (tên phóng viên)", distractor: false},
        {word: "report", vi: "đang ở (sai dạng)", distractor: true},
        {word: "cooked", vi: "nấu (sai dạng)", distractor: true}
      ]
    }
  }
};
