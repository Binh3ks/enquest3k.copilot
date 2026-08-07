// WEEK 36: Adventure Stories (Irregular Verbs) Easy Mode
// AI Tutor Easy Mode

const week36EasyRealData = {
  week_id: 36,
  week_number: 36,
  title: "Adventure Stories",
  weekTitle_en: "Adventure Stories",
  weekTitle_vi: 'Những Câu Chuyện Phiêu Lưu',
  topic: "Adventure stories — exploring underwater caves, finding treasure, going on a submarine trip",
  topic_vi: 'Câu chuyện phiêu lưu — khám phá hang động, tìm kho báu, đi tàu ngầm',
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
    { word: "submarine", pronunciation: "/ˈsʌbməriːn/", definition_vi: 'tàu ngầm', definition_en: "a ship that goes underwater" },
    { word: "cave", pronunciation: "/keɪv/", definition_vi: 'hang động', definition_en: "a large hole in rock or under the ground" },
    { word: "museum", pronunciation: "/mjuːˈziːəm/", definition_vi: 'bảo tàng', definition_en: "a place where old objects are kept" },
    { word: "explorer", pronunciation: "/ɪkˈsplɔːrər/", definition_vi: 'nhà thám hiểm', definition_en: "a person who travels to find new places" },
    { word: "adventure", pronunciation: "/ədˈventʃər/", definition_vi: 'cuộc phiêu lưu', definition_en: "an exciting trip or experience" }
  ],
  spark_talk: {
    opening_narrative: "Hi there! I heard you went on a submarine adventure! That sounds really exciting! Tell me what happened.",
    frames: [
      { id: 1, text_en: "Wow! Where did you go?", text_vi: "Tuyet voi! Ban di dau?" },
      { id: 2, text_en: "What did you see underwater?", text_vi: 'Bạn thấy gì dưới nước?' },
      { id: 3, text_en: "Did you find a cave?", text_vi: 'Bạn có tìm thấy hang không?' },
      { id: 4, text_en: "What photos did you take?", text_vi: 'Bạn có chụp những ảnh nào?' },
      { id: 5, text_en: "Did you give anything to the museum?", text_vi: 'Bạn có trao gì cho bảo tàng không?' },
      { id: 6, text_en: "What was the best part of your adventure?", text_vi: 'Phần hay nhất của cuộc phiêu lưu là gì?' }
    ]
  },
  knowledge_base: "Students will describe a simple adventure story using irregular past tense verbs. The AI should use simple, encouraging language. When a student describes a negative experience, NEVER say Great! — say Oh no! or That sounds scary! or I am sorry to hear that."
};

module.exports = week36EasyRealData;
