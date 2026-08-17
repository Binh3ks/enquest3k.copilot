// Week 33 Writing Studio Data
export default {
  title: "Corridor Incident & Safety Report",
  prompt_en: "Look at the three pictures. Write the story. Write 20 or more words.",
  prompt_vi: "Nhìn vào 3 bức tranh. Viết câu chuyện kể lại sự việc (20 từ trở lên).",
  min_sentences: 3,
  min_words: 20,
  max_words: 60,
  model_sentence: "While Jake was walking down the school corridor, a boy slipped on the wet floor and hurt his knee. Jake called the nurse immediately. The nurse arrived quickly with a clean bandage and a cold pack. Everyone felt relieved.",
  sentence_frames: [
    { template: "While Jake was walking in the ___, a boy slipped.", answers: ["corridor"] },
    { template: "The boy fell down and hurt his ___.", answers: ["knee"] },
    { template: "Jake called the school ___ immediately.", answers: ["nurse"] },
    { template: "The nurse brought a clean ___ and cold pack.", answers: ["bandage"] },
    { template: "Everyone felt ___ and praised Jake.", answers: ["relieved"] }
  ],
  picture_mode: {
    type: "picture",
    image_url: "/images/week33/writing_panel_1.png",
    panels: [
      { id: 1, image_url: "/images/week33/writing_panel_1.png", caption: "Panel 1: Running in corridor" },
      { id: 2, image_url: "/images/week33/writing_panel_2.png", caption: "Panel 2: Slipping on wet floor" },
      { id: 3, image_url: "/images/week33/writing_panel_3.png", caption: "Panel 3: Nurse applying bandage" }
    ],
    word_bank: ["corridor", "slipped", "fell", "nurse", "bandage", "relieved", "careful"],
    sentence_frames: [
      "While a student was running in the corridor, he...",
      "Suddenly, he slipped on the wet floor and...",
      "Jake called the school nurse, who arrived with..."
    ],
    writing_prompts: {
      en: "Describe what happened in the 3 picture panels using past continuous and past simple verbs.",
      vi: "Mô tả điều xảy ra trong 3 bức tranh dùng động từ quá khứ tiếp diễn và quá khứ đơn."
    }
  },
  hints: {
    words: [
      { word: "corridor", meaning_vi: "hành lang" },
      { word: "slipped", meaning_vi: "trượt chân" },
      { word: "nurse", meaning_vi: "y tá" },
      { word: "bandage", meaning_vi: "băng cá nhân" },
      { word: "relieved", meaning_vi: "nhẹ nhõm" },
      { word: "swimming", meaning_vi: "bơi lội", distractor: true },
      { word: "bicycle", meaning_vi: "xe đạp", distractor: true }
    ]
  }
};
