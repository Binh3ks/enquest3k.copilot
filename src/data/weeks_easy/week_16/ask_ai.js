export default {
  topic_talk_prompt: "Tell me about a sport you enjoy. What do you like about it?",
  prompts: [
    {
      id: 1,
      nova_says: "I'm playing basketball with my friends right now.",
      nova_says_vi: "Hiện tại cô đang chơi bóng rổ với bạn bè.",
      task_en: "Ask Nova WHAT sport she is playing right now.",
      task_vi: "Hỏi cô Nova ngay lúc này cô đang chơi môn thể thao gì.",
      question_word_bank: ["What","Where","Who"],
      question_frame: "___ sport are you playing?",
      answer: ["What sport are you playing?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "We are playing in the school gym.",
      nova_says_vi: "Chúng tôi đang chơi trong phòng thể dục trường.",
      task_en: "Ask Nova WHERE they are playing.",
      task_vi: "Hỏi cô Nova họ đang chơi ở đâu.",
      question_word_bank: ["Where","What","When"],
      question_frame: "___ are you playing?",
      answer: ["Where are you playing?"],
      hint_word: "Where",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "My team is winning the game!",
      nova_says_vi: "Đội của cô đang thắng trận đấu!",
      task_en: "Ask Nova WHO is winning.",
      task_vi: "Hỏi cô Nova ai đang thắng.",
      question_word_bank: ["Who","What","How"],
      question_frame: "___ is winning?",
      answer: ["Who is winning?"],
      hint_word: "Who",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I love basketball because it's exciting.",
      nova_says_vi: "Cô thích bóng rổ vì nó rất kích thích.",
      task_en: "Ask Nova WHY she loves basketball.",
      task_vi: "Hỏi cô Nova tại sao cô thích bóng rổ.",
      question_word_bank: ["Why","What","How"],
      question_frame: "___ do you love basketball?",
      answer: ["Why do you love basketball?"],
      hint_word: "Why",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "We play basketball every Saturday morning.",
      nova_says_vi: "Chúng tôi chơi bóng rổ mỗi sáng thứ Bảy.",
      task_en: "Ask Nova WHEN they play basketball.",
      task_vi: "Hỏi cô Nova họ chơi bóng rổ khi nào.",
      question_word_bank: ["When","Where","Who"],
      question_frame: "___ do you play basketball?",
      answer: ["When do you play basketball?"],
      hint_word: "When",
      audio_url: null
    }
  ]
};
