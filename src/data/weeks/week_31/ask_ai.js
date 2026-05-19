// WEEK 31: THE PICNIC — Irregular Verbs 3: eat, drink, buy, give
// Ask AI Station — Advanced Mode
// W16+ schema with prompts + context_en + question_word_bank + question_frame

export default {
  prompts: [
    {
      nova_says: "Last Sunday we had a lovely picnic in the park.",
      nova_says_vi: "Chủ nhật tuần trước chúng tôi có một buổi dã ngoại vui ở công viên.",
      context_en: "Nova describes a picnic in the park. Student asks about who came and what was brought.",
      question_word_bank: ["Who", "What", "Where", "When"],
      question_frame: "___ did you go with? or ___ did you bring to the picnic? or Tell me more!"
    },
    {
      nova_says: "We brought sandwiches, fruit, and lemonade.",
      nova_says_vi: "Chúng tôi mang bánh mì kẹp, trái cây và nước chanh.",
      context_en: "Nova describes the food at the picnic. Student asks about the food and drinks.",
      question_word_bank: ["What", "Did", "How", "Was"],
      question_frame: "___ was your favorite food at the picnic? or ___ you make the sandwiches yourself? or Tell me more!"
    },
    {
      nova_says: "After eating, we played games and flew a kite.",
      nova_says_vi: "Sau khi ăn, chúng tôi chơi trò chơi và thả diều.",
      context_en: "Nova describes post-meal activities — games and kite flying. Student asks about the activities.",
      question_word_bank: ["What", "How", "Did", "When"],
      question_frame: "___ games did you play? or ___ high did the kite fly? or Tell me more!"
    },
    {
      nova_says: "The weather was perfect — warm with a gentle breeze.",
      nova_says_vi: "Thời tiết hoàn hảo — ấm áp với gió nhẹ.",
      context_en: "Nova describes the perfect weather at the picnic. Student asks about the weather conditions.",
      question_word_bank: ["How", "What", "Was", "Did"],
      question_frame: "___ warm was it? or ___ did the breeze feel like? or Tell me more!"
    },
    {
      nova_says: "At the end of the day, we were all tired but very happy.",
      nova_says_vi: "Cuối ngày, chúng tôi đều mệt mỏi nhưng rất vui.",
      context_en: "Nova describes how the picnic day ended — everyone tired but happy. Student asks about the ending.",
      question_word_bank: ["How", "What", "When", "Would"],
      question_frame: "___ did everyone feel at the end? or ___ time did you go home? or Tell me more!"
    }
  ]
};
