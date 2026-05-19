// WEEK 13: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I wake up at six every morning.",
      nova_says_vi: "Cô thức dậy lúc sáu giờ mỗi sáng.",
      context_en: "Nova describes her morning routine.",
      task_en: "Ask Nova WHAT TIME she wakes up.",
      task_vi: "Hỏi cô Nova cô thức dậy lúc mấy giờ.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ do you wake up?"
    },
    {
      nova_says: "I eat breakfast before school.",
      nova_says_vi: "Cô ăn sáng trước khi đi học.",
      context_en: "Nova eats breakfast before school.",
      task_en: "Ask Nova WHEN she eats breakfast.",
      task_vi: "Hỏi cô Nova cô ăn sáng khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you eat breakfast?"
    },
    {
      nova_says: "I brush my teeth for two minutes.",
      nova_says_vi: "Cô đánh răng trong hai phút.",
      context_en: "Nova brushes her teeth.",
      task_en: "Ask Nova HOW LONG she brushes her teeth.",
      task_vi: "Hỏi cô Nova cô đánh răng bao lâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ do you brush your teeth?"
    },
    {
      nova_says: "I walk to school with my friend.",
      nova_says_vi: "Cô đi bộ đến trường với bạn.",
      context_en: "Nova walks to school.",
      task_en: "Ask Nova HOW she gets to school.",
      task_vi: "Hỏi cô Nova cô đến trường bằng cách nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "How ___ you get to school?"
    },
    {
      nova_says: "I pack my bag the night before.",
      nova_says_vi: "Cô chuẩn bị cặp vào tối hôm trước.",
      context_en: "Nova packs her bag.",
      task_en: "Ask Nova WHEN she packs her bag.",
      task_vi: "Hỏi cô Nova cô chuẩn bị cặp khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you pack your bag?"
    }
  ]
};