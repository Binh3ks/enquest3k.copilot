// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Ask AI Station — Easy Mode
// W28-42 format: question_word_bank (1 item) + question_frame

export default {
  prompts: [
    {
      nova_says: "Yesterday, I fell down in the playground and hurt my knee!",
      nova_says_vi: "Hôm qua, tôi ngã trong sân chơi và đau đầu gối!",
      context_en: "Nova fell in the playground. Student asks about what she hurt.",
      question_word_bank: ["What"],
      question_frame: "___ did you hurt?"
    },
    {
      nova_says: "I broke my mum's favourite cup this morning. It was an accident!",
      nova_says_vi: "Tôi làm vỡ chiếc cốc yêu thích của mẹ vào sáng nay. Đó là một tai nạn!",
      context_en: "Nova broke a cup. Student asks about what she broke.",
      question_word_bank: ["What"],
      question_frame: "___ did you break?"
    },
    {
      nova_says: "The nurse put a cold pack on my knee and I felt better!",
      nova_says_vi: "Y tá đặt túi chườm lạnh lên đầu gối tôi và tôi cảm thấy tốt hơn!",
      context_en: "The nurse helped Nova. Student asks about what the nurse did.",
      question_word_bank: ["What"],
      question_frame: "___ did the nurse do?"
    },
    {
      nova_says: "I forgot my homework at home and my teacher was sad!",
      nova_says_vi: "Tôi quên bài tập ở nhà và cô giáo buồn!",
      context_en: "Nova forgot her homework. Student asks about what she forgot.",
      question_word_bank: ["What"],
      question_frame: "___ did you forget?"
    },
    {
      nova_says: "I learned an important lesson: always walk carefully in the corridor!",
      nova_says_vi: "Tôi đã học được một bài học quan trọng: luôn đi cẩn thận trong hành lang!",
      context_en: "Nova learned a lesson. Student asks about what she learned.",
      question_word_bank: ["What"],
      question_frame: "___ lesson did you learn?"
    }
  ]
};
