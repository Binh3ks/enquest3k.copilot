export default {
  title: "Writing: My Forest Walk",
  image_url: "/images/week31/writing_cover_easy.jpg",
  audio_url: "/audio/week31/writing_main_easy.mp3",
  model_sentence: "Last Saturday, I went to the forest with my dad. I saw a beautiful blue and yellow bird sitting on a branch. I heard it sing a beautiful song. I felt the soft warm grass with my hands and touched a hard rock. I smelt a pink flower and it smelt sweet and nice. A cool breeze came through the trees. I felt wonder because the forest was so beautiful and quiet!",
  prompt_en: "Write about a walk outside! Where did you go? What did you see? What did you hear? What did you touch? Did you smell anything? How did you feel?",
  prompt_vi: "Viết về một chuyến đi dạo bên ngoài! Bạn đã đi đâu? Bạn đã thấy gì? Bạn đã nghe thấy gì? Bạn đã chạm vào thứ gì? Bạn có ngửi thấy gì không? Bạn cảm thấy thế nào?",
  topic_talk_prompt: "Tell me about a walk or trip outside. What did you see, hear, feel, or smell? Use saw, heard, felt, or smelt.",
  min_words: 30,
  sentence_frames: [
    { id: 1, template: "I went to the ___ with ___.", example: "I went to the forest with my dad.", audio_url: "/audio/week31/writing_f1_easy.mp3" },
    { id: 2, template: "I saw a ___ ___.", example: "I saw a beautiful bird.", audio_url: "/audio/week31/writing_f2_easy.mp3" },
    { id: 3, template: "I heard a ___ sound.", example: "I heard a loud sound.", audio_url: "/audio/week31/writing_f3_easy.mp3" },
    { id: 4, template: "I smelt a ___ flower.", example: "I smelt a beautiful flower.", audio_url: "/audio/week31/writing_f4_easy.mp3" },
    { id: 5, template: "I felt ___.", example: "I felt happy.", audio_url: "/audio/week31/writing_f5_easy.mp3" },
    { id: 6, template: "It was a ___ experience.", example: "It was a wonderful experience.", audio_url: "/audio/week31/writing_f6_easy.mp3" }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Word Bank",
      label_vi: "💡 Ngân hàng từ",
      show_by_default: true,
      words: [
        {word: "saw", vi: "đã nhìn", distractor: false},
        {word: "see", vi: "nhìn", distractor: true},
        {word: "heard", vi: "đã nghe", distractor: false},
        {word: "felt", vi: "đã cảm thấy", distractor: false},
        {word: "hear", vi: "nghe", distractor: true},
        {word: "smelt", vi: "đã ngửi", distractor: false},
        {word: "forest", vi: "rừng", distractor: false},
        {word: "smell", vi: "ngửi", distractor: true},
        {word: "park", vi: "công viên", distractor: false},
        {word: "beach", vi: "bãi biển", distractor: false},
        {word: "bird", vi: "chim", distractor: false},
        {word: "flower", vi: "hoa", distractor: false},
        {word: "tree", vi: "cây", distractor: false},
        {word: "grass", vi: "cỏ", distractor: false},
        {word: "beautiful", vi: "đẹp", distractor: false},
        {word: "loud", vi: "to", distractor: false},
        {word: "soft", vi: "mềm", distractor: false},
        {word: "happy", vi: "vui", distractor: false},
        {word: "wonderful", vi: "tuyệt vời", distractor: false}
      ]
    },
    model_paragraph: {
      label_en: "📖 See example paragraph",
      label_vi: "📖 Xem bài mẫu",
      show_by_default: false,
      warning_en: "⚠️ Try writing first before looking!",
      warning_vi: "⚠️ Hãy thử viết trước khi xem!",
      text: "Last Saturday, I went to the forest with my dad. I saw a beautiful blue and yellow bird sitting on a branch. I heard it sing a beautiful song. I felt the soft warm grass with my hands and touched a hard rock. I smelt a pink flower and it smelt sweet and nice. A cool breeze came through the trees. I felt wonder because the forest was so beautiful and quiet!"
    }
  }
};
