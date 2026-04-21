export default {
  topic_talk_prompt: "Tell me about what you are doing right now. What can you see around you?",
  prompts: [
    {
      id: 1,
      nova_says: "I'm sitting in the park right now.",
      nova_says_vi: "Hiện tại cô đang ngồi trong công viên.",
      task_en: "Ask Nova WHERE she is right now.",
      task_vi: "Hỏi cô Nova ngay lúc này cô đang ở đâu.",
      question_word_bank: ["Where","What","Who"],
      question_frame: "___ are you right now?",
      answer: ["Where are you right now?","Where are you?"],
      hint_word: "Where",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I'm eating a sandwich right now.",
      nova_says_vi: "Hiện tại cô đang ăn bánh mì kẹp.",
      task_en: "Ask Nova WHAT she is eating.",
      task_vi: "Hỏi cô Nova cô đang ăn gì.",
      question_word_bank: ["What","Where","Why"],
      question_frame: "___ are you eating?",
      answer: ["What are you eating?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "My friend Tom is playing football in the park.",
      nova_says_vi: "Bạn Tom của cô đang chơi bóng đá trong công viên.",
      task_en: "Ask Nova WHAT Tom is doing.",
      task_vi: "Hỏi cô Nova Tom đang làm gì.",
      question_word_bank: ["What","Where","Who"],
      question_frame: "___ is Tom doing?",
      answer: ["What is Tom doing?","What's Tom doing?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "The birds are singing beautifully.",
      nova_says_vi: "Những con chim đang hót rất hay.",
      task_en: "Ask Nova WHAT the birds are doing.",
      task_vi: "Hỏi cô Nova những con chim đang làm gì.",
      question_word_bank: ["What","Where","Why"],
      question_frame: "___ are the birds doing?",
      answer: ["What are the birds doing?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "It is raining lightly at the park.",
      nova_says_vi: "Trời đang mưa nhẹ ở công viên.",
      task_en: "Ask Nova HOW the weather is at the park.",
      task_vi: "Hỏi cô Nova thời tiết ở công viên như thế nào.",
      question_word_bank: ["How","What","Why"],
      question_frame: "___ is the weather at the park?",
      answer: ["How is the weather at the park?","What is the weather like at the park?"],
      hint_word: "How",
      audio_url: null
    }
  ]
};
