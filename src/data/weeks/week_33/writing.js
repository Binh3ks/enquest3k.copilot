// Week 33 Writing Studio Data
export default {
  title: "Corridor Incident & Safety Report",
  prompt_en: "Look at the three pictures. Write the story. Write 20 or more words.",
  prompt_vi: "Nhìn vào 3 bức tranh. Viết câu chuyện kể lại sự việc (20 từ trở lên).",
  min_sentences: 3,
  min_words: 20,
  max_words: 60,
  model_sentence: "Jake was walking carefully down the school corridor after science class. Suddenly, a boy lost his balance on the wet floor and slipped. Jake stopped immediately to help his friend and called the school nurse. The nurse arrived quickly with a clean bandage and a cold pack to treat the cut. Everyone felt relieved, and the headmaster reminded all students never to run in corridors.",
  picture_story: [
    {
      panel_id: 'panel_1',
      title_en: 'Panel 1: Walking Down the Corridor',
      title_vi: 'Cảnh 1: Đi Bộ Cẩn Thận Tại Hành Lang',
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
      title_en: 'Panel 3: Helping Friend & Calling Nurse',
      title_vi: 'Cảnh 3: Giúp Bạn Và Gọi Y Tá',
      image_url: '/images/week33/writing_panel_3.png'
    },
    {
      panel_id: 'panel_4',
      title_en: 'Panel 4: Nurse Arriving with Bandage',
      title_vi: 'Cảnh 4: Y Tá Băng Bó Vết Thương',
      image_url: '/images/week33/writing_panel_4.png'
    },
    {
      panel_id: 'panel_5',
      title_en: 'Panel 5: Relief & Safety Reminder',
      title_vi: 'Cảnh 5: Nhẹ Nhõm Và Nhắc Nhở An Toàn',
      image_url: '/images/week33/writing_panel_5.png'
    }
  ],
  word_bank_pills: {
    action_verbs: ['was walking carefully', 'lost his balance', 'slipped heavily', 'stopped immediately', 'called the school nurse', 'arrived quickly', 'felt relieved', 'reminded all students'],
    connectors: ['In the beginning,', 'Suddenly,', 'Then,', 'After that,', 'In the end,', 'and', 'because', 'so'],
    cumulative_chunks: ['down the school corridor', 'after science class', 'on the wet floor', 'help his friend', 'clean bandage', 'cold pack', 'treat the cut', 'never to run in corridors'],
    grammar_boosters: ['was walking carefully', 'was running fast', 'stopped immediately', 'had slipped']
  },
  sentence_frames: [
    { template: "Jake was walking carefully down the school ___.", answers: ["corridor"] },
    { template: "Suddenly, he lost his balance on the wet floor and ___.", answers: ["slipped"] },
    { template: "Jake stopped immediately to help and called the school ___.", answers: ["nurse"] },
    { template: "The nurse brought a clean ___ and a cold pack.", answers: ["bandage"] },
    { template: "Everyone felt ___ and the headmaster reminded all students.", answers: ["relieved"] }
  ],
  picture_mode: {
    type: "picture",
    image_url: "/images/week33/writing_panel_1.png",
    panels: [
      {
        id: 1,
        image_url: "/images/week33/writing_panel_1.png",
        caption: "Panel 1: Jake walks carefully down the school corridor",
        action_tags: ["walking", "corridor", "science class", "carefully"],
        pills: ["was walking carefully,", "down the school corridor,", "after science class,", "noticed the wet floor tiles,"],
        sentence_frame: "In the beginning, Jake was walking carefully down the school corridor.",
        pill_color: "blue",
      },
      {
        id: 2,
        image_url: "/images/week33/writing_panel_2.png",
        caption: "Panel 2: Running fast and slipping on wet floor",
        action_tags: ["running", "slipping", "wet floor", "balance"],
        pills: ["a boy was running very fast,", "lost his balance,", "on the wet floor,", "slipped heavily,"],
        sentence_frame: "Suddenly, a boy was running very fast, lost his balance, and slipped.",
        pill_color: "amber",
      },
      {
        id: 3,
        image_url: "/images/week33/writing_panel_3.png",
        caption: "Panel 3: Helping friend and calling nurse",
        action_tags: ["stopped", "helping", "calling", "nurse"],
        pills: ["stopped immediately,", "to help his friend,", "stay calm,", "called the school nurse,"],
        sentence_frame: "Then, Jake stopped immediately to help his friend and called the school nurse.",
        pill_color: "purple",
      },
      {
        id: 4,
        image_url: "/images/week33/writing_panel_4.png",
        caption: "Panel 4: Nurse arrives with bandage and cold pack",
        action_tags: ["nurse", "bandage", "cold pack", "treat"],
        pills: ["the school nurse arrived quickly,", "with a clean bandage,", "placed a cold pack,", "to treat the cut,"],
        sentence_frame: "After that, the school nurse arrived quickly with a clean bandage and a cold pack.",
        pill_color: "emerald",
      },
      {
        id: 5,
        image_url: "/images/week33/writing_panel_5.png",
        caption: "Panel 5: Relief and safety reminder",
        action_tags: ["relieved", "headmaster", "reminded", "corridors"],
        pills: ["everyone felt relieved,", "the headmaster reminded all students,", "never to run in corridors,", "that Tom was safe,"],
        sentence_frame: "In the end, everyone felt relieved, and the headmaster reminded all students never to run in corridors.",
        pill_color: "rose",
      }
    ],
    word_bank: ["corridor", "slipped", "balance", "nurse", "bandage", "cold pack", "relieved", "headmaster", "carefully"],
    sentence_frames: [
      "Jake was walking carefully down the school corridor after science class.",
      "Suddenly, he lost his balance on the wet floor and slipped.",
      "Jake stopped immediately to help his friend and called the school nurse.",
      "The nurse arrived quickly with a clean bandage and a cold pack to treat the cut.",
      "Everyone felt relieved, and the headmaster reminded all students never to run in corridors."
    ],
    writing_prompts: {
      en: "Describe what happened across the 5 pictures using past continuous and past simple verbs.",
      vi: "Mô tả điều xảy ra trong 5 bức tranh bằng động từ quá khứ tiếp diễn và quá khứ đơn."
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
