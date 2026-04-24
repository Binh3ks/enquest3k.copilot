export default {
  grammar_explanation: {
    title_en: "Present Continuous: Describing What Is Happening Right Now",
    title_vi: "Hiện tại Tiếp diễn: Mô tả những gì đang xảy ra ngay lúc này",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Use am/is/are + verb-ing for actions happening RIGHT NOW.", example_en: "I am writing a report. She is filming the news.", example_vi: "Tôi đang viết báo cáo. Cô ấy đang quay tin tức.", rule_vi: "Dùng am/is/are + verb-ing cho hành động đang diễn ra NGAY LÚC NÀY." },
      { type: "rule", icon: "2️⃣", rule_en: "I am → am + verb-ing. He/She/It → is + verb-ing. We/You/They → are + verb-ing.", example_en: "I am reporting. He is filming. They are interviewing.", example_vi: "Tôi đang đưa tin. Anh ấy đang quay phim. Họ đang phỏng vấn.", rule_vi: "I am → am + verb-ing. He/She/It → is + verb-ing. We/You/They → are + verb-ing." },
      { type: "rule", icon: "3️⃣", rule_en: "Add -ing: report → reporting, film → filming, run → running (double last letter), describe → describing.", example_en: "She is describing the scene. He is running to the camera.", example_vi: "Cô ấy đang mô tả cảnh. Anh ấy đang chạy đến máy quay.", rule_vi: "Thêm -ing: report → reporting, film → filming, run → running (gấp đôi chữ cuối), describe → describing." },
      { type: "rule", icon: "4️⃣", rule_en: "Negative: He is NOT reporting. She is not filming.", example_en: "He is not reporting today. She is not filming the interview.", example_vi: "Anh ấy không đưa tin hôm nay. Cô ấy không quay phim buổi phỏng vấn.", rule_vi: "Phủ định: He is NOT reporting. She is not filming." }
    ]
  },
  exercises: [
    { id: 1,  type: "fill", question: "Alex ___ (report) the news right now.", answer: "is reporting", hint: "He (singular) + is" },
    { id: 2,  type: "fill", question: "She ___ (hold) a microphone.", answer: "is holding", hint: "She + is" },
    { id: 3,  type: "fill", question: "The students ___ (watch) the live show.", answer: "are watching", hint: "They (plural) + are" },
    { id: 4,  type: "mc",   question: "Tom ___ right now.", options: ["is filming", "are filming", "films"], answer: "is filming", hint: "Tom = He (singular)" },
    { id: 5,  type: "fill", question: "Look! The reporter ___ (run) to the scene.", answer: "is running", hint: "run → running (double n)" },
    { id: 6,  type: "mc",   question: "What ___ you doing? he asks.", options: ["is", "are", "am"], answer: "are", hint: "You → are" },
    { id: 7,  type: "fill", question: "I ___ (describe) the exciting scene.", answer: "am describing", hint: "I + am" },
    { id: 8,  type: "fill", question: "The audience ___ (cheer) for Alex.", answer: "is cheering", hint: "audience = It (singular group)" },
    { id: 9,  type: "unscramble", question: "Order:", words: ["is", "Alex", "speaking", "microphone", "the", "into"], answer: "Alex is speaking into the microphone.", hint: "Alex is..." },
    { id: 10, type: "fill", question: "Everyone in the studio ___ (work) hard.", answer: "is working", hint: "Everyone = singular" },
    { id: 11, type: "mc",   question: "She is ___ a live report.", options: ["making", "make", "made"], answer: "making", hint: "is + verb-ing" },
    { id: 12, type: "fill", question: "The camera ___ (film) the classroom right now.", answer: "is filming", hint: "camera = It (singular)" },
    { id: 13, type: "fill", question: "Two reporters ___ (interview) the students.", answer: "are interviewing", hint: "Two reporters = plural" },
    { id: 14, type: "mc",   question: "We ___ to the live news right now.", options: ["are listening", "is listening", "listen"], answer: "are listening", hint: "We → are" },
    { id: 15, type: "fill", question: "The teacher ___ (smile) at the camera.", answer: "is smiling", hint: "smile → smiling (drop e)" },
    { id: 16, type: "unscramble", question: "Order:", words: ["students", "are", "The", "clapping", "all"], answer: "The students are all clapping.", hint: "The students are..." },
    { id: 17, type: "fill", question: "The reporter ___ (read) the headline right now.", answer: "is reading", hint: "reporter = He/She (singular)" },
    { id: 18, type: "mc",   question: "What is happening? The children ___.", options: ["are playing", "is playing", "plays"], answer: "are playing", hint: "children = They (plural)" },
    { id: 19, type: "unscramble", question: "Order:", words: ["running", "The", "to", "reporter", "is", "the", "scene"], answer: "The reporter is running to the scene.", hint: "The reporter is..." },
    { id: 20, type: "fill", question: "I ___ (not film). I ___ (report)!", answer: "am not filming / am reporting", hint: "I + am not / I + am" }
  ]
};
