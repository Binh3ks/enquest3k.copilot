export default {
  title: "Word Match: My Weekend Comic Strip",
  image_url: "/images/week26/wordmatch_cover_w26.jpg",
  audio_url: "/audio/week26_easy/wordmatch_main.mp3",
  instruction_en: "Match each word to its meaning.",
  instruction_vi: "Nối mỗi từ với nghĩa của nó.",
  sets: [
    {
      id: "comic_words",
      label_en: "Comic Strip Words",
      label_vi: "Từ vựng truyện tranh",
      pairs: [
        { left: "comic strip", right: "a set of small pictures that tell a story" },
        { left: "panel", right: "one box in a comic strip" },
        { left: "caption", right: "words written under a picture" },
        { left: "speech bubble", right: "shows what a character says" },
        { left: "character", right: "a person or animal in a story" },
        { left: "title", right: "the name of a story" }
      ]
    },
    {
      id: "past_verbs",
      label_en: "Past Tense Verbs",
      label_vi: "Động từ quá khứ",
      pairs: [
        { left: "visited", right: "went to a place" },
        { left: "played", right: "had fun with a game or toy" },
        { left: "watched", right: "looked at something" },
        { left: "returned", right: "went back home" },
        { left: "sketched", right: "made a quick drawing" },
        { left: "created", right: "made something new" }
      ]
    },
    {
      id: "vietnamese",
      label_en: "English to Vietnamese",
      label_vi: "Anh – Việt",
      pairs: [
        { left: "adventure", right: "cuộc phiêu lưu" },
        { left: "weekend", right: "cuối tuần" },
        { left: "scene", right: "cảnh / khung cảnh" },
        { left: "describe", right: "mô tả" },
        { left: "express", right: "diễn đạt" },
        { left: "sketch", right: "phác thảo" }
      ]
    }
  ]
};
