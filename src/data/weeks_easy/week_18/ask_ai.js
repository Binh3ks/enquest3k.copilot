export default {
  topic_talk_prompt: "Tell me about something interesting you observed or noticed recently.",
  prompts: [
    {
      id: 1,
      nova_says: "A butterfly is landing on a flower right now.",
      nova_says_vi: "Một con bướm đang đậu trên hoa ngay lúc này.",
      task_en: "Ask Nova WHAT is landing on the flower.",
      task_vi: "Hỏi cô Nova có gì đang đậu trên hoa.",
      question_word_bank: ["What","Where","Who"],
      question_frame: "___ is landing on the flower?",
      answer: ["What is landing on the flower?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "The butterfly has orange and black wings.",
      nova_says_vi: "Con bướm có đôi cánh màu cam và đen.",
      task_en: "Ask Nova WHAT color the butterfly's wings are.",
      task_vi: "Hỏi cô Nova cánh bướm màu gì.",
      question_word_bank: ["What","How","Where"],
      question_frame: "___ color are the butterfly's wings?",
      answer: ["What color are the butterfly's wings?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "There are about ten butterflies in the garden.",
      nova_says_vi: "Có khoảng mười con bướm trong vườn.",
      task_en: "Ask Nova HOW MANY butterflies are in the garden.",
      task_vi: "Hỏi cô Nova có bao nhiêu con bướm trong vườn.",
      question_word_bank: ["How","What","Where"],
      question_frame: "___ many butterflies are in the garden?",
      answer: ["How many butterflies are in the garden?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "The butterflies come here because there are lots of flowers.",
      nova_says_vi: "Bướm đến đây vì có nhiều hoa.",
      task_en: "Ask Nova WHY the butterflies come to the garden.",
      task_vi: "Hỏi cô Nova tại sao bướm đến vườn.",
      question_word_bank: ["Why","What","When"],
      question_frame: "___ do butterflies come to the garden?",
      answer: ["Why do butterflies come to the garden?"],
      hint_word: "Why",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "The butterflies will leave when winter comes.",
      nova_says_vi: "Bướm sẽ rời đi khi mùa đông đến.",
      task_en: "Ask Nova WHEN the butterflies will leave.",
      task_vi: "Hỏi cô Nova bướm sẽ rời đi khi nào.",
      question_word_bank: ["When","What","Where"],
      question_frame: "___ will the butterflies leave?",
      answer: ["When will the butterflies leave?"],
      hint_word: "When",
      audio_url: null
    }
  ]
};
