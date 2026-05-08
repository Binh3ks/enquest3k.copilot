export default {
  title: "Writing: My Sensory Walk",
  min_words: 50,
  model_sentence: "Last Saturday, my family went for a walk in the park near our house. I saw beautiful orange and yellow leaves on the ground. I heard birds singing softly in the trees — it was a wonderful sound. I felt the cool breeze on my face and smelt the fresh air after the rain. The roughness of the old stone wall felt interesting under my fingers. At the end, we sat on the damp grass and watched the sunset. It was the most peaceful and sensory-rich walk I have ever taken.",
  instruction_en: "Use: Last ___, I/we went to... / I saw... / I heard... / I felt... / I smelt... / The most amazing thing was...",
  instruction_vi: "Dùng: Last ___, I/we went to... / I saw... / I heard... / I felt... / I smelt... / The most amazing thing was...",
  prompt_en: "Write about a walk or trip where you used your senses! Where did you go? What did you see? What did you hear? What did you feel with your hands? Did you smell anything special? What was the most amazing moment?",
  prompt_vi: "Viết về một chuyến đi dạo hoặc chuyến đi mà bạn đã dùng các giác quan! Bạn đã đi đâu? Bạn đã thấy gì? Bạn đã nghe thấy gì? Bạn đã cảm nhận gì với bàn tay? Bạn có ngửi thấy gì đặc biệt không? Khoảnh khắc tuyệt vời nhất là gì?",
  topic_talk_prompt: "Tell me about a walk or trip where you noticed interesting things with your senses. What did you see, hear, feel, or smell?",
  keywords: ["saw", "heard", "felt", "smelt", "forest", "creature", "rustling", "fragrant", "damp", "echo", "sensation", "texture", "vivid", "distant", "breeze", "startled", "whisper"],
  sentence_frames: [
    {"template": "Last ___, I went to ___ with ___."},
    {"template": "I saw ___ and heard ___."},
    {"template": "I felt ___ and smelt ___."},
    {"template": "It smelt ___ and felt ___."},
    {"template": "The most amazing moment was when ___."}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need words? Click here",
      label_vi: "💡 Cần từ? Bấm đây",
      show_by_default: false,
      words: [
        {word: "saw", vi: "đã thấy", distractor: false},
        {word: "heard", vi: "đã nghe", distractor: false},
        {word: "see", vi: "thấy", distractor: true},
        {word: "felt", vi: "đã cảm nhận", distractor: false},
        {word: "smelt", vi: "đã ngửi thấy", distractor: false},
        {word: "hear", vi: "nghe", distractor: true},
        {word: "forest", vi: "rừng", distractor: false},
        {word: "creature", vi: "sinh vật", distractor: false},
        {word: "feel", vi: "cảm nhận", distractor: true},
        {word: "rustling", vi: "tiếng xào xạc", distractor: false},
        {word: "fragrant", vi: "thơm", distractor: false},
        {word: "smell", vi: "ngửi", distractor: true},
        {word: "damp", vi: "ẩm ướt", distractor: false},
        {word: "texture", vi: "kết cấu", distractor: false},
        {word: "vivid", vi: "sống động", distractor: false},
        {word: "breeze", vi: "gió nhẹ", distractor: false},
        {word: "distant", vi: "xa xôi", distractor: false},
        {word: "whisper", vi: "tiếng thì thầm", distractor: false}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example? (Try writing first!)",
      label_vi: "📖 Xem mẫu? (Thử viết trước nhé!)",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Last Saturday, my family went for a walk in the park near our house. I saw beautiful orange and yellow leaves on the ground. I heard birds singing softly in the trees — it was a wonderful sound. I felt the cool breeze on my face and smelt the fresh air after the rain. The roughness of the old stone wall felt interesting under my fingers. At the end, we sat on the damp grass and watched the sunset. It was the most peaceful and sensory-rich walk I have ever taken."
    }
  }
};
