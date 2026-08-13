/**
 * Week 33 Gold Standard Reference Data — Writing Studio Hub
 * Cambridge Flyers Writing Part 7 — Tom's Diary & Picture Story
 */

export const writingHubData = {
  week: 33,
  theme: "The Broken Flower Vase & Apology",
  title: "Cambridge Flyers Writing Part 7 — Tom's Diary",
  prompt: "Imagine you are Tom. Write a short diary entry (30-50 words) about your clumsy Saturday morning. Try to use at least 4 phrases from the Word Bank below.",
  word_bank: [
    "woke up in a hurry",
    "felt extremely clumsy",
    "accidentally knocked over",
    "rushed downstairs",
    "slipped on a wet puddle",
    "to make things worse",
    "spilled a glass of juice",
    "cleaned up the mess",
    "apologized to his mother",
    "promised to be more careful"
  ],
  writing_studio: {
    title: "Cambridge Flyers Writing Part 7 — Tom's Diary",
    prompt: "Imagine you are Tom. Write a short diary entry (30-50 words) about your clumsy Saturday morning. Try to use at least 4 phrases from the Word Bank below.",
    min_chunks_required: 4,
    word_bank: [
      "woke up in a hurry",
      "felt extremely clumsy",
      "accidentally knocked over",
      "rushed downstairs",
      "slipped on a wet puddle",
      "to make things worse",
      "spilled a glass of juice",
      "cleaned up the mess",
      "apologized to his mother",
      "promised to be more careful"
    ]
  },
  // 1. Array of 3 Picture Story Panels for Writing Part 7
  picture_story: [
    {
      panel_id: "panel_1",
      title_en: "Panel 1: Running in the Living Room",
      title_vi: "Cảnh 1: Chạy Nhảy Trong Phòng Khách",
      image_prompt: "Cute 3D render of a young boy playing with a soccer ball in a cozy living room near a wooden table, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.",
      image_url: "/images/week33/writing_panel_1.png"
    },
    {
      panel_id: "panel_2",
      title_en: "Panel 2: Accidental Crash",
      title_vi: "Cảnh 2: Va Chạm Vô Tình",
      image_prompt: "Cute 3D render of a glass flower vase breaking on the floor near a wooden table, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.",
      image_url: "/images/week33/writing_panel_2.png"
    },
    {
      panel_id: "panel_3",
      title_en: "Panel 3: Apologizing and Cleaning",
      title_vi: "Cảnh 3: Xin Lỗi Và Dọn Dẹp",
      image_prompt: "Cute 3D render of a boy apologizing to his mom while sweeping the floor together, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.",
      image_url: "/images/week33/writing_panel_3.png"
    }
  ],
  word_bank_pills: {
    action_verbs: ["broke", "fell", "lost", "found", "slipped", "spilled", "dropped", "apologized", "repaired", "cleaned"],
    connectors: ["first", "suddenly", "finally", "while", "because", "although", "so", "meanwhile", "afterward", "however"],
    cumulative_chunks: [
      "woke up in a hurry",
      "felt extremely clumsy",
      "accidentally knocked over",
      "rushed downstairs",
      "slipped on a wet puddle",
      "to make things worse",
      "spilled a glass of juice",
      "cleaned up the mess",
      "apologized to his mother",
      "promised to be more careful"
    ],
    grammar_boosters: ["was playing", "were climbing", "had realized", "was searching", "was waking up", "were fixing"]
  },
  writing_prompts: [
    { id: "wp_01", prompt: "Write about a time you woke up in a hurry and accidentally knocked over something.", sentence_frame: "First, I woke up in a hurry and..." },
    { id: "wp_02", prompt: "Describe how Tom felt extremely clumsy when he slipped on a wet puddle.", sentence_frame: "Tom felt extremely clumsy because..." },
    { id: "wp_03", prompt: "Explain how Tom spilled a glass of juice and cleaned up the mess.", sentence_frame: "To make things worse, he spilled..." },
    { id: "wp_04", prompt: "Write a short apology note after Tom apologized to his mother.", sentence_frame: "Tom apologized to his mother and promised..." }
  ]
};

export default writingHubData;
