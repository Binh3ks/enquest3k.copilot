export default {
  title: "My Favorite Sport",
  min_words: 30,
  model_sentence: "I love soccer. I am kicking the ball. My team is running fast. We are scoring goals. Everyone is cheering. I have energy. Playing sports is fun!",
  instruction_en: "Use: I am playing... / I am (running/kicking)... / We are... / I feel... because...",
  instruction_vi: "Dùng: I am playing... / I am (running/kicking)... / We are... / I feel... because...",
  prompt_en: "Write about your favourite sport or game! What sport are you playing? What are you doing right now in the game? Who are you playing with? Are you winning? How do you feel?",
  prompt_vi: "Viết về môn thể thao hoặc trò chơi yêu thích! Bạn đang chơi môn nào? Bạn đang làm gì trong trận đấu? Chơi cùng ai? Đang thắng không? Cảm giác thế nào?",
  keywords: ["I am", "is", "are", "playing", "running", "kicking", "scoring", "team", "energy"],
  topic_talk_prompt: "Tell me about your favourite sport. What are the players doing?",
  sentence_frames: [{"template":"Right now I am playing ___."},{"template":"I am ___ing the ___ and my team is ___."},{"template":"We are playing against ___."},{"template":"My job in the team is to ___."},{"template":"The score is ___ to ___."},{"template":"I feel ___ because ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {word: "=== SPORTS (Môn thể thao) ===", vi: "", distractor: false},
        {word: "soccer", vi: "bóng đá", distractor: false},
        {word: "basketball", vi: "bóng rổ", distractor: false},
        {word: "volleyball", vi: "bóng chuyền", distractor: false},
        {word: "badminton", vi: "cầu lông", distractor: false},
        {word: "=== VERBS -ING (Động từ tiếp diễn) ===", vi: "", distractor: false},
        {word: "kicking", vi: "đang đá", distractor: false},
        {word: "throwing", vi: "đang ném", distractor: false},
        {word: "catching", vi: "đang bắt", distractor: false},
        {word: "running", vi: "đang chạy", distractor: false},
        {word: "jumping", vi: "đang nhảy", distractor: false},
        {word: "scoring", vi: "đang ghi bàn", distractor: false},
        {word: "kick", vi: "đá (sai dạng)", distractor: true},
        {word: "=== NOUNS (Danh từ) ===", vi: "", distractor: false},
        {word: "ball", vi: "bóng", distractor: false},
        {word: "team", vi: "đội", distractor: false},
        {word: "goal", vi: "khung thành", distractor: false},
        {word: "=== VERBS (Động từ) ===", vi: "", distractor: false},
        {word: "defend", vi: "phòng thủ", distractor: false},
        {word: "attack", vi: "tấn công", distractor: false},
        {word: "pass", vi: "chuyền", distractor: false},
        {word: "=== ADJECTIVES (Tính từ) ===", vi: "", distractor: false},
        {word: "excited", vi: "hào hứng", distractor: false},
        {word: "tired", vi: "mệt", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "proud", vi: "tự hào", distractor: false},
        {word: "plays", vi: "chơi (sai dạng)", distractor: true}
      ]
    }
  }
};
