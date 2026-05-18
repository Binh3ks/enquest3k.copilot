// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Ask AI Station — Easy Mode
// W16+ schema with prompts + context_en + question_word_bank + question_frame

export default {
  prompts: [
    {
      nova_says: "Yesterday, I fell down in the playground and hurt my knee.",
      nova_says_vi: "Hôm qua, tôi ngã trong sân chơi và đau đầu gối.",
      context_en: "Nova fell in the playground. Student asks what happened.",
      question_word_bank: ["What", "Where", "When"],
      question_frame: "___ happened? or ___ did you fall?"
    },
    {
      nova_says: "I broke my mum's favourite cup this morning.",
      nova_says_vi: "Tôi làm vỡ chiếc cốc yêu thích của mẹ vào sáng nay.",
      context_en: "Nova broke a cup. Student asks about it.",
      question_word_bank: ["What", "How"],
      question_frame: "___ did you break?"
    },
    {
      nova_says: "My knee hurt a lot after I fell in the corridor.",
      nova_says_vi: "Đầu gối tôi đau nhiều sau khi tôi ngã trong hành lang.",
      context_en: "Nova's knee hurts. Student asks about it.",
      question_word_bank: ["Where", "How"],
      question_frame: "___ did it hurt?"
    },
    {
      nova_says: "I forgot my homework at home.",
      nova_says_vi: "Tôi quên bài tập ở nhà.",
      context_en: "Nova forgot homework. Student asks about it.",
      question_word_bank: ["What", "When"],
      question_frame: "___ did you forget?"
    },
    {
      nova_says: "The nurse put a cold pack on my knee.",
      nova_says_vi: "Y tá đặt túi chườm lạnh lên đầu gối tôi.",
      context_en: "Nurse helped Nova. Student asks about the nurse.",
      question_word_bank: ["What", "Who"],
      question_frame: "___ did she do?"
    }
  ]
};
