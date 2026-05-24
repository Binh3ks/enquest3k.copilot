// WEEK 35: Environmental Issues
// Ask AI Station — Advanced Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "Climate change is a serious problem. The Earth is getting warmer because of greenhouse gases in the atmosphere.",
      nova_says_vi: "Biến đổi khí hậu là một vấn đề nghiêm trọng. Trái Đất đang nóng lên vì các khí nhà kính trong khí quyển.",
      context_en: "Climate change is causing global warming. Student asks about why Earth is warming.",
      question_word_bank: ["Why is", "Why does", "What is", "How is"],
      question_frame: "___ the Earth getting warmer?",
      correctWord: "Why is"
    },
    {
      nova_says: "We should reduce, reuse, and recycle. We must protect our planet from pollution and climate change.",
      nova_says_vi: "Chúng ta nên giảm, tái sử dụng, và tái chế. Chúng ta phải bảo vệ hành tinh khỏi ô nhiễm và biến đổi khí hậu.",
      context_en: "We need to take action. Student asks about what we must do.",
      question_word_bank: ["What must", "What should", "What can", "How must"],
      question_frame: "___ we do to protect our planet?",
      correctWord: "What must"
    },
    {
      nova_says: "Solar power and wind power are renewable energy sources. They can replace fossil fuels and help reduce carbon emissions.",
      nova_says_vi: "Năng lượng mặt trời và năng lượng gió là các nguồn năng lượng tái tạo. Chúng có thể thay thế nhiên liệu hóa thạch và giúp giảm lượng khí thải carbon.",
      context_en: "Renewable energy is important. Student asks about renewable energy sources.",
      question_word_bank: ["What can", "What must", "How can", "Which can"],
      question_frame: "___ replace fossil fuels?",
      correctWord: "What can"
    },
    {
      nova_says: "Polar ice is melting and sea levels are rising. Many coastal areas may be underwater in the future if we do not act now.",
      nova_says_vi: "Băng ở hai cực đang tan và mực nước biển đang dâng cao. Nhiều vùng ven biển có thể bị ngập trong tương lai nếu chúng ta không hành động ngay bây giờ.",
      context_en: "Rising sea levels are dangerous. Student asks about what is happening.",
      question_word_bank: ["What is", "Why is", "How is", "When is"],
      question_frame: "___ happening to polar ice and sea levels?",
      correctWord: "What is"
    },
    {
      nova_says: "Young people can help by turning off lights, using less plastic, and planting trees. Small actions make a big difference.",
      nova_says_vi: "Người trẻ có thể giúp bằng cách tắt đèn, sử dụng ít nhựa hơn, và trồng cây. Những hành động nhỏ tạo ra sự khác biệt lớn.",
      context_en: "Young people can make a difference. Student asks about what young people can do.",
      question_word_bank: ["What can", "What must", "How can", "When can"],
      question_frame: "___ young people do to help the environment?",
      correctWord: "What can"
    }
  ]
};
