// WEEK 15: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I",
      nova_says_vi: "Hiện tại cô đang ngồi trong công viên.",
      context_en: "Nova describes where she is.",
      task_en: "Ask Nova WHERE she is right now.",
      task_vi: "Hỏi cô Nova ngay lúc này cô đang ở đâu.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ are you right now?"
    },
    {
      nova_says: "I",
      nova_says_vi: "Hiện tại cô đang ăn bánh mì kẹp.",
      context_en: "Nova is eating something.",
      task_en: "Ask Nova WHAT she is eating.",
      task_vi: "Hỏi cô Nova cô đang ăn gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ are you eating?"
    },
    {
      nova_says: "My friend Tom is playing football in the park.",
      nova_says_vi: "Bạn Tom của cô đang chơi bóng đá trong công viên.",
      context_en: "Tom plays football.",
      task_en: "Ask Nova WHAT Tom is doing.",
      task_vi: "Hỏi cô Nova Tom đang làm gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is Tom doing?"
    },
    {
      nova_says: "The birds are singing beautifully.",
      nova_says_vi: "Những con chim đang hót rất hay.",
      context_en: "Birds are singing.",
      task_en: "Ask Nova WHAT the birds are doing.",
      task_vi: "Hỏi cô Nova những con chim đang làm gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ are the birds doing?"
    },
    {
      nova_says: "It is raining lightly at the park.",
      nova_says_vi: "Trời đang mưa nhẹ ở công viên.",
      context_en: "It is raining at the park.",
      task_en: "Ask Nova HOW the weather is at the park.",
      task_vi: "Hỏi cô Nova thời tiết ở công viên như thế nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is the weather at the park?"
    }
  ]
};