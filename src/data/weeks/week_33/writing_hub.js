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
    action_verbs: ["broke", "fell", "lost", "found", "slipped", "spilled", "dropped", "apologized"],
    connectors: ["first", "suddenly", "finally", "while", "because", "although", "so"],
    cumulative_chunks: ["broke a flower vase", "slipped on the floor", "apologized to mom", "cleaned up carefully"],
    grammar_boosters: ["was playing", "were climbing", "had realized", "was searching"]
  },

  // 3. Rule-Based Evaluation Config for Client-Side Layer 1 Check
  rule_based_config: {
    target_verbs: ["broke", "fell", "lost", "found", "slipped", "spilled", "tore", "hurt", "dropped", "apologized"],
    target_connectors: ["first", "suddenly", "finally", "while", "because", "although", "so"],
    min_word_count: 20,
    min_past_verbs: 2,
    min_connectors: 1
  }
};
