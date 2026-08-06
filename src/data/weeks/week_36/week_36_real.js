// WEEK 36: Adventure Stories (Irregular Verbs)
// AI Tutor — V28 Format

const week36RealData = {
  week_id: 36,
  week_number: 36,
  title: "Adventure Stories",
  weekTitle_en: "Adventure Stories",
  weekTitle_vi: "Nhung Cau Chuyen Phieu Luu",
  topic: "Adventure stories — exploring new places, discovering hidden caves, Marco Polo on the Silk Road, the excitement of adventure",
  topic_vi: "Cau chuyen phieu luu — kham pha noi moi, phat hien hang dong, Marco Polo tren Con duong To lua, su hao huc cua cuoc phieu luu",
  theme: "adventure_stories",
  grammar_focus: "Irregular Verbs (5 groups: go/went, see/saw, take/took, come/came, find/found)",
  grammar_pattern: "I went to the museum. We saw amazing things. He took many photos.",
  grammar_examples: [
    "I went on a submarine adventure.",
    "We saw beautiful coral reefs underwater.",
    "They found a gold compass from the 1500s."
  ],
  chunk_focus: [
    "went on an adventure",
    "dove down into",
    "saw magnificent",
    "found something unexpected",
    "wrote down everything",
    "came back to the surface",
    "gave our findings to",
    "made an important discovery",
    "began to plan",
    "took our breath away",
    "spoke many languages",
    "inspired many other adventurers"
  ],
  target_vocab: [
    { word: "submarine", pronunciation: "/ˈsʌbməriːn/", definition_vi: "tau ngam", definition_en: "a ship that can travel underwater" },
    { word: "coral reef", pronunciation: "/ˈkɔrəl riːf/", definition_vi: "ran san ho", definition_en: "colourful underwater structures built by tiny sea animals" },
    { word: "compass", pronunciation: "/ˈkʌmpəs/", definition_vi: "la ban", definition_en: "a tool that shows direction using a magnetic needle" },
    { word: "museum", pronunciation: "/mjuːˈziːəm/", definition_vi: "bao tang", definition_en: "a place where old and interesting objects are kept and shown" },
    { word: "discovery", pronunciation: "/dɪˈskʌvəri/", definition_vi: "phat hien", definition_en: "something new and exciting that someone finds" }
  ],
  spark_talk: {
    opening_narrative: "I heard you went on an amazing adventure! You explored an underwater cave and found treasures. I am so curious — tell me everything!",
    frames: [
      { id: 1, text_en: "That sounds exciting! Where did you explore?", text_vi: "Nghe that tuyet voi! Ban kham pha o dau?" },
      { id: 2, text_en: "What did you see inside the cave?", text_vi: "Ban thay gi trong hang?" },
      { id: 3, text_en: "Did you find anything special?", text_vi: "Ban co tim thay gi dac biet khong?" },
      { id: 4, text_en: "How did you feel when you came back home?", text_vi: "Ban cam thay nhu the nao khi tro ve nha?" },
      { id: 5, text_en: "What adventure would you like to go on next?", text_vi: "Ban muon di cuoc phieu luu nao tiep theo?" },
      { id: 6, text_en: "Did you write down what you found?", text_vi: "Ban co ghi lai nhung gi ban tim thay khong?" },
      { id: 7, text_en: "Who did you go on the adventure with?", text_vi: "Ban di phieu luu voi ai?" },
      { id: 8, text_en: "Would you like to go back to the cave?", text_vi: "Ban co muon quay lai hang khong?" }
    ]
  },
  knowledge_base: "Students will describe an adventure story using irregular past tense verbs. The AI should encourage students to use irregular verbs: went, saw, took, came, found, wrote, gave, made. NEVER force verbs — only encourage. When a student describes a negative event, NEVER say 'Great!' — instead say 'That sounds scary!' or 'I am sorry to hear that.'"
};

export default week36RealData;
if (typeof module !== 'undefined' && module.exports) {
  module.exports = week36RealData;
}
