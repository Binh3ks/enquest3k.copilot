// WEEK 36: Adventure Stories (Irregular Verbs) Easy Mode
// AI Tutor Easy Mode

const week36EasyRealData = {
  week_id: 36,
  week_number: 36,
  title: "Adventure Stories",
  weekTitle_en: "Adventure Stories",
  weekTitle_vi: "Nhung Cau Chuyen Phieu Luu",
  topic: "Adventure stories — exploring underwater caves, finding treasure, going on a submarine trip",
  topic_vi: "Cau chuyen phieu luu — kham pha hang dong, tim kho bau, di tau ngam",
  theme: "adventure_stories",
  grammar_focus: "Irregular Verbs (simple: go/went, see/saw, find/found, come/came)",
  grammar_pattern: "I went to the museum. We saw a cave. He found a treasure.",
  grammar_examples: [
    "I went on a submarine trip.",
    "We saw a beautiful cave.",
    "We found an old compass in the cave."
  ],
  chunk_focus: [
    "went on a trip",
    "saw beautiful things",
    "found a cave",
    "took photos",
    "came back home",
    "wrote down everything",
    "gave photos to the museum",
    "made great memories",
    "best adventure ever",
    "began to plan"
  ],
  target_vocab: [
    { word: "submarine", pronunciation: "/ˈsʌbməriːn/", definition_vi: "tau ngam", definition_en: "a ship that goes underwater" },
    { word: "cave", pronunciation: "/keɪv/", definition_vi: "hang dong", definition_en: "a large hole in rock or under the ground" },
    { word: "museum", pronunciation: "/mjuːˈziːəm/", definition_vi: "bao tang", definition_en: "a place where old objects are kept" },
    { word: "explorer", pronunciation: "/ɪkˈsplɔːrər/", definition_vi: "nha tham hiem", definition_en: "a person who travels to find new places" },
    { word: "adventure", pronunciation: "/ədˈventʃər/", definition_vi: "cuoc phieu luu", definition_en: "an exciting trip or experience" }
  ],
  spark_talk: {
    opening_narrative: "Hi there! I heard you went on a submarine adventure! That sounds really exciting! Tell me what happened.",
    frames: [
      { id: 1, text_en: "Wow! Where did you go?", text_vi: "Tuyet voi! Ban di dau?" },
      { id: 2, text_en: "What did you see underwater?", text_vi: "Ban thay gi duoi nuoc?" },
      { id: 3, text_en: "Did you find a cave?", text_vi: "Ban co tim thay hang khong?" },
      { id: 4, text_en: "What photos did you take?", text_vi: "Ban chup nhung anh nao?" },
      { id: 5, text_en: "Did you give anything to the museum?", text_vi: "Ban co trao gi cho bao tang khong?" },
      { id: 6, text_en: "What was the best part of your adventure?", text_vi: "Phan hay nhat cua cuoc phieu luu la gi?" }
    ]
  },
  knowledge_base: "Students will describe a simple adventure story using irregular past tense verbs. The AI should use simple, encouraging language. When a student describes a negative experience, NEVER say Great! — say Oh no! or That sounds scary! or I am sorry to hear that."
};

module.exports = week36EasyRealData;
