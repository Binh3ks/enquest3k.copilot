export default {
  title: "Word Match: The Tortoise and the Hare",
  image_url: "/images/week28/wordmatch_cover_w28.jpg",
  audio_url: "/audio/week28_easy/wordmatch_main.mp3",
  instruction_en: "Match each word to its meaning.",
  instruction_vi: "Nối mỗi từ với nghĩa của nó.",
  sets: [
    {
      id: "story_events",
      label_en: "What happened in the story?",
      label_vi: "Điều gì đã xảy ra trong câu chuyện?",
      pairs: [
        { left: "The hare", right: "boasted and then slept" },
        { left: "The tortoise", right: "walked slow and steady" },
        { left: "All the animals", right: "cheered at the finish line" },
        { left: "The hare (end)", right: "woke up too late" },
        { left: "The tortoise (end)", right: "crossed the finish line first" },
        { left: "The lesson", right: "slow and steady wins the race" }
      ]
    },
    {
      id: "irregular_verbs",
      label_en: "Base Form → Past Simple",
      label_vi: "Dạng gốc → Quá khứ đơn",
      pairs: [
        { left: "run", right: "ran" },
        { left: "sleep", right: "slept" },
        { left: "win", right: "won" },
        { left: "lose", right: "lost" }
      ]
    },
    {
      id: "easy_vocab",
      label_en: "English to Vietnamese",
      label_vi: "Anh – Việt",
      pairs: [
        { left: "tortoise", right: "con rùa" },
        { left: "hare", right: "con thỏ" },
        { left: "race", right: "cuộc đua" },
        { left: "nap", right: "ngủ ngắn" },
        { left: "finish", right: "vạch đích / kết thúc" },
        { left: "lesson", right: "bài học" }
      ]
    },
    {
      id: "cambridge_transport",
      label_en: "Transport → Meaning",
      label_vi: "Phương tiện → Nghĩa",
      pairs: [
        { left: "car", right: "xe ô tô" },
        { left: "bus", right: "xe buýt" },
        { left: "train", right: "tàu hỏa" },
        { left: "boat", right: "thuyền" },
        { left: "bicycle", right: "xe đạp" },
        { left: "taxi", right: "xe taxi" },
        { left: "motorbike", right: "xe máy" },
        { left: "ship", right: "tàu biển" }
      ]
    }
  ]
};
