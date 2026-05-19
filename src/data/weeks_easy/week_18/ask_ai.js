// WEEK 18: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "A butterfly is landing on a flower right now.",
      nova_says_vi: "Một con bướm đang đậu trên hoa ngay lúc này.",
      context_en: "A butterfly is on a flower.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is landing on the flower?"
    },
    {
      nova_says: "The butterfly has orange and black wings.",
      nova_says_vi: "Con bướm có đôi cánh màu cam và đen.",
      context_en: "The butterfly has wings.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ color are the butterfly"
    },
    {
      nova_says: "There are about ten butterflies in the garden.",
      nova_says_vi: "Có khoảng mười con bướm trong vườn.",
      context_en: "There are butterflies in the garden.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ many butterflies are in the garden?"
    },
    {
      nova_says: "The butterflies come here because there are lots of flowers.",
      nova_says_vi: "Bướm đến đây vì có nhiều hoa.",
      context_en: "Butterflies come for flowers.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do butterflies come to the garden?"
    },
    {
      nova_says: "The butterflies will leave when winter comes.",
      nova_says_vi: "Bướm sẽ rời đi khi mùa đông đến.",
      context_en: "Butterflies leave in winter.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ will the butterflies leave?"
    }
  ]
};