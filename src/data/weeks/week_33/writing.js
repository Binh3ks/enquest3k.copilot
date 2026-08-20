// Week 33 Writing Studio Data
export default {
  title: "Corridor Incident & Safety Report",
  prompt_en: "Look at the three pictures. Write the story. Write 20 or more words.",
  prompt_vi: "Nhìn vào 3 bức tranh. Viết câu chuyện kể lại sự việc (20 từ trở lên).",
  min_sentences: 3,
  min_words: 20,
  max_words: 60,
  model_sentence: "While Jake was walking carefully down the school corridor after class, a boy slipped on the wet floor and hurt his knee badly. Jake stopped immediately and called the school nurse. The nurse arrived quickly with a clean bandage and a cold pack. Everyone felt relieved and praised Jake for his quick action.",
  picture_story: [
    {
      panel_id: 'panel_1',
      title_en: 'Panel 1: Running in the Corridor',
      title_vi: 'Cảnh 1: Chạy Nhảy Tại Hành Lang Trường',
      image_url: '/images/week33/writing_panel_1.png'
    },
    {
      panel_id: 'panel_2',
      title_en: 'Panel 2: Slipping on Wet Floor',
      title_vi: 'Cảnh 2: Trượt Chân Trên Sàn Ướt',
      image_url: '/images/week33/writing_panel_2.png'
    },
    {
      panel_id: 'panel_3',
      title_en: 'Panel 3: Nurse Applying Bandage',
      title_vi: 'Cảnh 3: Y Tá Băng Bó Và Dọn Dẹp',
      image_url: '/images/week33/writing_panel_3.png'
    }
  ],
  word_bank_pills: {
    action_verbs: ['slipped', 'fell down', 'hurt knee', 'called nurse', 'applied bandage', 'helped clean', 'walked carefully'],
    connectors: ['first', 'suddenly', 'then', 'while', 'because', 'so', 'finally'],
    cumulative_chunks: ['slipped on wet floor', 'hurt his knee', 'called the school nurse', 'applied a clean bandage', 'cleaned the wet floor'],
    grammar_boosters: ['was running', 'was walking carefully', 'were helping', 'had slipped']
  },
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
      {
        id: 1,
        image_url: "/images/week33/writing_panel_1.png",
        caption: "Panel 1: Running in corridor",
        action_tags: ["running", "walking", "corridor", "warning sign"],
        nova_question_en: "Where does the story begin? Look closely at the picture — what is happening in the corridor?",
        pills: ["was running very fast,", "down the school corridor,", "was walking carefully,", "On a Monday morning,", "near the yellow warning sign,"],
        grammar_hint: "Past Continuous: was/were + verb-ing (e.g. was running, was walking)",
        sentence_frame: "While a student was running fast in the corridor, Jake...",
        pill_color: "blue",
      },
      {
        id: 2,
        image_url: "/images/week33/writing_panel_2.png",
        caption: "Panel 2: Slipping on wet floor",
        action_tags: ["slipping", "falling", "wet floor", "knee hurt"],
        nova_question_en: "Uh oh! What happened suddenly? Describe the problem you see in this picture!",
        pills: ["slipped on the wet floor,", "fell down heavily,", "hurt his knee badly,", "Suddenly,", "lost his balance,"],
        grammar_hint: "Simple Past: slipped / fell / hurt (no -ing here!)",
        sentence_frame: "Suddenly, he slipped on the wet floor and...",
        pill_color: "amber",
      },
      {
        id: 3,
        image_url: "/images/week33/writing_panel_3.png",
        caption: "Panel 3: Nurse applying bandage",
        action_tags: ["nurse", "bandage", "helping", "relieved"],
        nova_question_en: "How does the story end? Who came to help, and how did everyone feel?",
        pills: ["called the school nurse,", "with a clean bandage,", "felt deeply relieved,", "Everyone praised", "arrived quickly,"],
        grammar_hint: "Simple Past + Feeling: called / arrived / felt / praised",
        sentence_frame: "Jake called the school nurse, who arrived with...",
        pill_color: "purple",
      }
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
