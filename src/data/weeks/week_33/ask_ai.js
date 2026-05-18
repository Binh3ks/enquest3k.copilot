// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Ask AI Station — Advanced Mode
// W16+ schema with prompts + context_en + question_word_bank + question_frame

export default {
  prompts: [
    {
      nova_says: "Yesterday, I fell down in the playground and hurt my knee.",
      nova_says_vi: "Hôm qua, tôi ngã trong sân chơi và đau đầu gối.",
      context_en: "Jake is telling Nova about his accident. Nova responds about falling in the playground.",
      question_word_bank: ["What", "When", "Where", "How"],
      question_frame: "___ did you fall? or ___ did it hurt? or Tell me more!"
    },
    {
      nova_says: "I broke my mum's favourite cup this morning. It was an accident!",
      nova_says_vi: "Tôi làm vỡ chiếc cốc yêu thích của mẹ vào sáng nay. Đó là một tai nạn!",
      context_en: "Nova tells about breaking a cup. Student asks follow-up questions.",
      question_word_bank: ["What", "How", "Did", "Was"],
      question_frame: "___ did you break? or Was it an accident? or Tell me more!"
    },
    {
      nova_says: "My knee hurt a lot after I fell in the corridor.",
      nova_says_vi: "Đầu gối tôi đau nhiều sau khi tôi ngã trong hành lang.",
      context_en: "Nova tells about knee pain after falling. Student asks about pain and recovery.",
      question_word_bank: ["How", "Where", "What", "Did"],
      question_frame: "___ did your knee hurt? or Did you go to the nurse? or Tell me more!"
    },
    {
      nova_says: "I forgot my homework at home and my teacher was sad.",
      nova_says_vi: "Tôi quên bài tập ở nhà và cô giáo buồn.",
      context_en: "Nova forgot homework. Student asks about forgetting and consequences.",
      question_word_bank: ["What", "Did", "When", "Why"],
      question_frame: "___ did you forget? or Did you bring it later? or Tell me more!"
    },
    {
      nova_says: "The nurse put a cold pack on my knee and I felt better.",
      nova_says_vi: "Y tá đặt túi chườm lạnh lên đầu gối tôi và tôi cảm thấy tốt hơn.",
      context_en: "Nova tells about the nurse helping. Student asks about recovery and lessons.",
      question_word_bank: ["What", "Did", "How", "Was"],
      question_frame: "___ did the nurse do? or Did you feel better? or Tell me more!"
    }
  ]
};
