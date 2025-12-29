export default {
  grammar_explanation: {
    title_en: "Story Structure (Problem & Solution)",
    title_vi: "Cấu trúc Truyện (Vấn đề & Giải pháp)",
    rules: [
      { type: "rule", icon: "1️⃣", rule_en: "Beginning: Characters & Setting.", rule_vi: "Mở đầu: Nhân vật & Bối cảnh." },
      { type: "rule", icon: "2️⃣", rule_en: "Middle: The Problem.", rule_vi: "Thân bài: Vấn đề xảy ra." },
      { type: "rule", icon: "3️⃣", rule_en: "End: The Solution.", rule_vi: "Kết bài: Giải pháp." }
    ]
  },
  exercises: [
    { id: 1, type: "mc", question: "The brothers _____ (have) a dream. (Beginning)", options: ["had", "has"], answer: "had", hint: "Past tense" },
    { id: 2, type: "fill", question: "The wind _____ (break) the kite. (Middle)", answer: "broke", hint: "Irregular" },
    { id: 3, type: "mc", question: "It _____ (be) a big problem.", options: ["was", "were"], answer: "was", hint: "Singular" },
    { id: 4, type: "unscramble", question: "Order:", words: ["problem", "The", "hard", "was"], answer: "The problem was hard.", hint: "S + V + Adj" },
    { id: 5, type: "fill", question: "They _____ (find) a solution. (End)", answer: "found", hint: "Irregular" },
    { id: 6, type: "mc", question: "They _____ (try) again with courage.", options: ["tried", "tryed"], answer: "tried", hint: "y -> ied" },
    { id: 7, type: "fill", question: "The machine _____ (fly) in the sky.", answer: "flew", hint: "Irregular" },
    { id: 8, type: "mc", question: "Everyone _____ (cheer) for them.", options: ["cheered", "cheer"], answer: "cheered", hint: "Regular" },
    { id: 9, type: "fill", question: "They _____ (change) the world.", answer: "changed", hint: "Regular" },
    { id: 10, type: "unscramble", question: "Order:", words: ["history", "They", "made"], answer: "They made history.", hint: "S + V + O" },
    { id: 11, type: "mc", question: "The engine _____ (be) heavy.", options: ["was", "were"], answer: "was", hint: "Singular" },
    { id: 12, type: "fill", question: "People _____ (say) it was impossible.", answer: "said", hint: "Irregular" },
    { id: 13, type: "mc", question: "He _____ (be) an inventor.", options: ["was", "were"], answer: "was", hint: "Singular" },
    { id: 14, type: "fill", question: "They _____ (build) a plane.", answer: "built", hint: "Irregular" },
    { id: 15, type: "unscramble", question: "Order:", words: ["solution", "found", "We", "a"], answer: "We found a solution.", hint: "S + V + O" },
    { id: 16, type: "mc", question: "The story has a _____ (begin).", options: ["beginning", "begin"], answer: "beginning", hint: "Noun" },
    { id: 17, type: "fill", question: "The _____ (middle) part had a problem.", answer: "middle", hint: "Adjective/Noun" },
    { id: 18, type: "mc", question: "They were _____ (success).", options: ["successful", "success"], answer: "successful", hint: "Adjective" },
    { id: 19, type: "fill", question: "It was the _____ (end) of the story.", answer: "end", hint: "Noun" },
    { id: 20, type: "unscramble", question: "Order:", words: ["flew", "high", "They"], answer: "They flew high.", hint: "S + V + Adv" }
  ]
};
