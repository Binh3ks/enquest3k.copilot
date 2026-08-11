/**
 * Week 33 Gold Standard Reference Data — Writing Studio Hub
 * Includes 3-Picture Story Prompts (Writing Part 7), Word Bank Pills, and Rule-Based Config.
 */

export const writingHubData = {
  week: 33,
  theme: "The Broken Flower Vase & Apology",

  // 1. Array of 3 Picture Story Panels for Writing Part 7
  picture_story: [
    {
      panel_id: "panel_1",
      title_en: "Panel 1: Running in the Living Room",
      title_vi: "Cảnh 1: Chạy Nhảy Trong Phòng Khách",
      description_en: "First, Tom was playing with his soccer ball inside the living room near the table.",
      description_vi: "Đầu tiên, Tom đang đá bóng trong phòng khách gần chiếc bàn.",
      image_prompt: "Cute 3D render of a young boy playing with a soccer ball in a cozy living room near a wooden table, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.",
      image_url: "/images/week33/writing_panel_1.png"
    },
    {
      panel_id: "panel_2",
      title_en: "Panel 2: Accidental Crash",
      title_vi: "Cảnh 2: Va Chạm Vô Tình",
      description_en: "Suddenly, the ball hit the table, and a glass flower vase fell down and broke into pieces.",
      description_vi: "Bất ngờ, quả bóng đập vào bàn, làm chiếc bình hoa thủy tinh rơi xuống và vỡ tan.",
      image_prompt: "Cute 3D render of a glass flower vase breaking on the floor near a wooden table, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.",
      image_url: "/images/week33/writing_panel_2.png"
    },
    {
      panel_id: "panel_3",
      title_en: "Panel 3: Apologizing and Cleaning",
      title_vi: "Cảnh 3: Xin Lỗi Và Dọn Dẹp",
      description_en: "Finally, Tom apologized to his mom and carefully cleaned up the broken pieces.",
      description_vi: "Cuối cùng, Tom xin lỗi mẹ và cẩn thận dọn dẹp các mảnh vỡ.",
      image_prompt: "Cute 3D render of a boy apologizing to his mom while sweeping the floor together, Pixar animation style, vibrant colors, soft studio lighting, clean background. No text or letters in the image.",
      image_url: "/images/week33/writing_panel_3.png"
    }
  ],

  // 2. Word Bank Pills (4 categories)
  word_bank_pills: {
    action_verbs: ["broke", "fell", "lost", "found", "slipped", "spilled", "dropped", "apologized", "repaired", "cleaned"],
    connectors: ["first", "suddenly", "finally", "while", "because", "although", "so", "meanwhile", "afterward", "however"],
    cumulative_chunks: ["broke a flower vase", "slipped on the floor", "apologized to mom", "cleaned up carefully", "searched everywhere", "found his backpack"],
    grammar_boosters: ["was playing", "were climbing", "had realized", "was searching", "was waking up", "were fixing"]
  },

  // 3. Array of 10 Guided Writing & Check Mode Prompts
  writing_prompts: [
    { id: "wp_01", prompt: "Write about a time you broke something by accident in your room.", sentence_frame: "First, I was... when I accidentally broke..." },
    { id: "wp_02", prompt: "Describe how Tom felt after spilling orange juice on his homework.", sentence_frame: "Tom felt very sorry because his juice damaged..." },
    { id: "wp_03", prompt: "Explain how Mia helped Tom find his lost school backpack.", sentence_frame: "Mia found the backpack while she was searching on..." },
    { id: "wp_04", prompt: "Write a sentence using 'although' to describe Tom's clumsy morning.", sentence_frame: "Although Tom was clumsy, he tried his best to..." },
    { id: "wp_05", prompt: "Describe what Tom did after dropping his alarm clock.", sentence_frame: "After dropping the clock, Tom carefully checked..." },
    { id: "wp_06", prompt: "Write a short apology note from Tom to his teacher.", sentence_frame: "Dear teacher, I am very sorry for forgetting my..." },
    { id: "wp_07", prompt: "Explain why it is important to be cautious when walking on wet floors.", sentence_frame: "We must be cautious on wet floors because..." },
    { id: "wp_08", prompt: "Describe the steps Tom took to clean up the broken flower vase.", sentence_frame: "First, Tom picked up... Then he swept..." },
    { id: "wp_09", prompt: "Write a story sentence with 'While' and 'Past Continuous'.", sentence_frame: "While Tom was running, he suddenly slipped on..." },
    { id: "wp_10", prompt: "Summarize the main lesson Tom learned from his clumsy morning.", sentence_frame: "At the end of the day, Tom learned to be..." }
  ],

  // 4. Rule-Based Evaluation Config for Client-Side Layer 1 Check
  rule_based_config: {
    target_verbs: ["broke", "fell", "lost", "found", "slipped", "spilled", "tore", "hurt", "dropped", "apologized"],
    target_connectors: ["first", "suddenly", "finally", "while", "because", "although", "so"],
    min_word_count: 20,
    min_past_verbs: 2,
    min_connectors: 1
  }
};
