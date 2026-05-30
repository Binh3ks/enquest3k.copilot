// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Writing Station — Advanced Mode

export default {
  title: "The Ant and the Grasshopper — Write Your Ending",
  theme: "fable_and_moral",
  min_words: 45,
  model_sentence: "Once upon a time, there was a hard-working ant who gathered seeds every day. There was also a lazy grasshopper who only played and sang songs. When winter came, the grasshopper was cold and hungry. The kind ant shared food with the grasshopper. Both learned a lesson: always prepare for the future!",
  topic_talk_prompt: "Tell me about a time when you worked hard with your friends to finish a project!",
  sentence_frames: [
    {
        "template": "Once upon a time, there was ___ ant who ___ every day and a ___ grasshopper who only ___ and ___ songs all day.",
        "answers": [
            "a hard-working",
            "gathered seeds",
            "stored food",
            "lazy",
            "played",
            "sang"
        ]
    },
    {
        "template": "The ant ___ to the field ___ and ___ seeds to ___ for the coming winter.",
        "answers": [
            "went",
            "every day",
            "gathered",
            "store",
            "prepare"
        ]
    },
    {
        "template": "The grasshopper only ___ games and ___ happily in the ___ summer sunshine.",
        "answers": [
            "played",
            "danced",
            "jumped",
            "sang",
            "warm",
            "bright"
        ]
    },
    {
        "template": "When ___ came, the grasshopper felt very ___ and very ___ because he had not ___ any food.",
        "answers": [
            "winter",
            "autumn",
            "cold",
            "hungry",
            "stored",
            "gathered"
        ]
    },
    {
        "template": "The grasshopper ___ to the ant's house and ___ for food, saying 'Please ___ me!'",
        "answers": [
            "came",
            "went",
            "asked",
            "begged",
            "help",
            "food"
        ]
    },
    {
        "template": "The kind ant ___ the grasshopper some food and ___ him inside to ___ ___ ___ ___.",
        "answers": [
            "gave",
            "shared",
            "invited",
            "warm up",
            "get warm",
            "rest safely"
        ]
    },
    {
        "template": "The grasshopper ___ an important ___: always ___ ___ and ___ ___ ___ ___.",
        "answers": [
            "learned",
            "remembered",
            "lesson",
            "work hard",
            "prepare for the future",
            "save for winter"
        ]
    },
    {
        "template": "From that day on, both the ant and the grasshopper ___ ___ together and ___ ___ for the rest of the year.",
        "answers": [
            "worked hard",
            "helped each other",
            "prepared food",
            "saved seeds"
        ]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "hard-working", "vi": "chăm chỉ", "distractor": false },
        { "word": "gathered", "vi": "nhặt", "distractor": false },
        { "word": "stored", "vi": "dự trữ", "distractor": false },
        { "word": "lazy", "vi": "lười biếng", "distractor": false },
        { "word": "played", "vi": "chơi", "distractor": false },
        { "word": "sang", "vi": "hát", "distractor": false },
        { "word": "winter", "vi": "mùa đông", "distractor": false },
        { "word": "autumn", "vi": "mùa thu", "distractor": false },
        { "word": "cold", "vi": "lạnh", "distractor": false },
        { "word": "hungry", "vi": "đói", "distractor": false },
        { "word": "came", "vi": "đến", "distractor": false },
        { "word": "asked", "vi": "xin", "distractor": false },
        { "word": "gave", "vi": "cho", "distractor": false },
        { "word": "shared", "vi": "chia sẻ", "distractor": false },
        { "word": "learned", "vi": "học được", "distractor": false },
        { "word": "lesson", "vi": "bài học", "distractor": false },
        { "word": "prepare", "vi": "chuẩn bị", "distractor": false },
        { "word": "future", "vi": "tương lai", "distractor": false },
        { "word": "worked hard", "vi": "làm việc chăm chỉ", "distractor": false },
        { "word": "warm", "vi": "ấm", "distractor": true },
        { "word": "hot", "vi": "nóng", "distractor": true }
      ]
    }
  }
};
