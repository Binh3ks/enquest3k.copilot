export default {
  topic_talk_prompt: "Tell me about your morning routine. What do you do in the morning?",
  prompts: [
    {
      id: 1,
      nova_says: "I wake up at six every morning.",
      nova_says_vi: "Cô thức dậy lúc sáu giờ mỗi sáng.",
      task_en: "Ask Nova WHAT TIME she wakes up.",
      task_vi: "Hỏi cô Nova cô thức dậy lúc mấy giờ.",
      question_frame: "What ___ do you wake up?",
      answer: ["What time do you wake up?"],
      hint: "time",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I eat breakfast before school.",
      nova_says_vi: "Cô ăn sáng trước khi đi học.",
      task_en: "Ask Nova WHEN she eats breakfast.",
      task_vi: "Hỏi cô Nova cô ăn sáng khi nào.",
      question_frame: "___ do you eat breakfast?",
      answer: ["When do you eat breakfast?"],
      hint: "When",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I brush my teeth for two minutes.",
      nova_says_vi: "Cô đánh răng trong hai phút.",
      task_en: "Ask Nova HOW LONG she brushes her teeth.",
      task_vi: "Hỏi cô Nova cô đánh răng bao lâu.",
      question_frame: "How ___ do you brush your teeth?",
      answer: ["How long do you brush your teeth?"],
      hint: "long",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "I walk to school with my friend.",
      nova_says_vi: "Cô đi bộ đến trường với bạn.",
      task_en: "Ask Nova HOW she gets to school.",
      task_vi: "Hỏi cô Nova cô đến trường bằng cách nào.",
      question_frame: "How ___ you get to school?",
      answer: ["How do you get to school?"],
      hint: "do",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I pack my bag the night before.",
      nova_says_vi: "Cô chuẩn bị cặp vào tối hôm trước.",
      task_en: "Ask Nova WHEN she packs her bag.",
      task_vi: "Hỏi cô Nova cô chuẩn bị cặp khi nào.",
      question_frame: "___ do you pack your bag?",
      answer: ["When do you pack your bag?"],
      hint: "When",
      audio_url: null
    }
  ]
};
