// WEEK 35: Environmental Issues
// Ask AI Station — Easy Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "We must protect our planet because climate change is making the Earth warmer!",
      nova_says_vi: "Chúng ta phải bảo vệ hành tinh vì biến đổi khí hậu đang làm Trái Đất nóng lên!",
      context_en: "The planet is warming up because of climate change. Student asks about what is happening.",
      question_word_bank: ["What is", "What does", "Why is", "How is"],
      question_frame: "___ the Earth getting warmer?",
      correctWord: "Why is"
    },
    {
      nova_says: "We should recycle paper, plastic, and glass because it saves natural resources!",
      nova_says_vi: "Chúng ta nên tái chế giấy, nhựa và thủy tinh vì nó tiết kiệm tài nguyên thiên nhiên!",
      context_en: "Recycling helps the environment. Student asks about what we should recycle.",
      question_word_bank: ["What should", "What does", "Why should", "When should"],
      question_frame: "___ we recycle?",
      correctWord: "What should"
    },
    {
      nova_says: "Solar power can help reduce air pollution because it does not burn fossil fuels!",
      nova_says_vi: "Năng lượng mặt trời có thể giúp giảm ô nhiễm không khí vì nó không đốt nhiên liệu hóa thạch!",
      context_en: "Solar power is clean energy. Student asks about what solar power can do.",
      question_word_bank: ["What can", "What does", "Why can", "How can"],
      question_frame: "___ solar power do to help the environment?",
      correctWord: "What can"
    },
    {
      nova_says: "Polar ice is melting because the Earth is getting warmer due to greenhouse gases!",
      nova_says_vi: "Băng ở hai cực đang tan vì Trái Đất đang nóng lên do khí nhà kính!",
      context_en: "Polar ice is melting. Student asks why this is happening.",
      question_word_bank: ["Why is", "What is", "When is", "How is"],
      question_frame: "___ polar ice melting?",
      correctWord: "Why is"
    },
    {
      nova_says: "We must act now to save our planet because small changes can make a big difference!",
      nova_says_vi: "Chúng ta phải hành động ngay để cứu hành tinh vì những thay đổi nhỏ có thể tạo ra sự khác biệt lớn!",
      context_en: "Taking action now is important. Student asks about what we must do.",
      question_word_bank: ["What must", "What does", "Why must", "When must"],
      question_frame: "___ we do to save our planet?",
      correctWord: "What must"
    }
  ]
};
