export default {
  title: "When I Was Small",
  min_words: 30,
  model_sentence: "I was a baby in this old photo. I was very small and cute. My face was round. My eyes were big. My mom says I was a noisy baby. I cried a lot! But I was quiet when I slept. Now I am big. I was in kindergarten when I was five. I grow bigger every year. These photos are special memories. I love looking at my old album!",
  instruction_en: "Use: When I was ___ years old, I was... / I was (tall/small/happy)... / I was at... / ___ was with me.",
  instruction_vi: "Dùng: When I was ___ years old, I was... / I was (tall/small/happy)... / I was at... / ___ was with me.",
  prompt_en: "Write about yourself when you were small! How old were you in an old photo? What were you like — big or small, happy or shy? Where were you? Who was with you?",
  prompt_vi: "Viết về bản thân khi còn nhỏ! Trong ảnh cũ bạn bao nhiêu tuổi? Trông như thế nào — to hay nhỏ, vui hay nhút nhát? Bạn ở đâu? Ai ở cùng?",
  keywords: ["was", "were", "baby", "small", "cute", "photo", "album", "memory", "grow", "kindergarten"],
  topic_talk_prompt: "Tell me about something you did when you were small.",
  sentence_frames: [{"template":"In this photo, I was ___ years old."},{"template":"I was ___ and ___."},{"template":"I was at ___ with ___."},{"template":"My favourite thing to do was ___."},{"template":"I was different because ___."},{"template":"Now I am ___, but then I was ___."}],
  
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        {word: "=== AGE & ADJECTIVES (grouped) ===", vi: "", distractor: false},
        {word: "two", vi: "2 tuổi", distractor: false},
        {word: "three", vi: "3 tuổi", distractor: false},
        {word: "five", vi: "5 tuổi", distractor: false},
        {word: "small", vi: "nhỏ", distractor: false},
        {word: "cute", vi: "đáng yêu", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "shy", vi: "nhút nhát", distractor: false},
        {word: "noisy", vi: "ồn ào", distractor: false},
        {word: "quiet", vi: "yên tĩnh", distractor: false},
        {word: "tall", vi: "cao", distractor: false},
        {word: "=== OTHER WORDS (shuffled) ===", vi: "", distractor: false},
        {word: "kindergarten", vi: "mẫu giáo", distractor: false},
        {word: "home", vi: "nhà", distractor: false},
        {word: "the park", vi: "công viên", distractor: false},
        {word: "my mom", vi: "mẹ tôi", distractor: false},
        {word: "my dad", vi: "bố tôi", distractor: false},
        {word: "my grandma", vi: "bà tôi", distractor: false},
        {word: "playing", vi: "chơi", distractor: false},
        {word: "running", vi: "chạy", distractor: false},
        {word: "eating", vi: "ăn", distractor: false},
        {word: "big", vi: "to", distractor: false},
        {word: "smart", vi: "thông minh", distractor: false},
        {word: "played", vi: "chơi (sai dạng)", distractor: true},
        {word: "smalls", vi: "nhỏ (sai dạng)", distractor: true}
      ]
    }
  }
};
