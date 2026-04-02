export default {
  title: "Word Match: My Weekend Comic",
  image_url: "/images/week26/wordmatch_cover_w26.jpg",
  audio_url: "/audio/week26/wordmatch_main.mp3",
  instruction_en: "Match each word or phrase to its meaning or pair.",
  instruction_vi: "Nối mỗi từ hoặc cụm từ với nghĩa hoặc cặp của nó.",
  sets: [
    {
      id: "past_verbs",
      label_en: "Base Verb → Past Simple",
      label_vi: "Động từ gốc → Quá Khứ Đơn",
      pairs: [
        { left: "visit", right: "visited" },
        { left: "play", right: "played" },
        { left: "watch", right: "watched" },
        { left: "return", right: "returned" },
        { left: "sketch", right: "sketched" },
        { left: "create", right: "created" }
      ]
    },
    {
      id: "was_were",
      label_en: "Subject → Was or Were",
      label_vi: "Chủ ngữ → Was hay Were",
      pairs: [
        { left: "It ___ sunny.", right: "was" },
        { left: "Max ___ happy.", right: "was" },
        { left: "We ___ tired.", right: "were" },
        { left: "They ___ excited.", right: "were" },
        { left: "The performance ___ brilliant.", right: "was" },
        { left: "Leo and Mia ___ proud.", right: "were" }
      ]
    },
    {
      id: "comic_vocab",
      label_en: "Word to Vietnamese",
      label_vi: "Anh – Việt",
      pairs: [
        { left: "comic strip", right: "truyện tranh khung" },
        { left: "panel", right: "khung vẽ" },
        { left: "caption", right: "chú thích" },
        { left: "speech bubble", right: "bong bóng lời thoại" },
        { left: "character", right: "nhân vật" },
        { left: "adventure", right: "cuộc phiêu lưu" },
        { left: "sketch", right: "phác thảo" }
      ]
    }
  ]
};
