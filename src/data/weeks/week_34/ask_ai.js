// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper (Fable)
// Ask AI Station — Advanced Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "The ant was very hard-working. She gathered seeds every day and stored food for the whole winter.",
      nova_says_vi: "Con kiến rất chăm chỉ. Cô ấy nhặt hạt mỗi ngày và dự trữ thức ăn cho cả mùa đông.",
      context_en: "The ant worked hard all summer. Student asks about what the ant did.",
      question_word_bank: ["What did", "What does", "What was", "How did"],
      question_frame: "___ the ant do every day in summer?",
      correctWord: "What did"
    },
    {
      nova_says: "The grasshopper was very lazy. He jumped around and sang songs all day while the ant worked hard.",
      nova_says_vi: "Con châu chấu rất lười biếng. Nó nhảy tung tăng và hát ríu rít cả ngày trong khi con kiến làm việc chăm chỉ.",
      context_en: "The grasshopper never worked. Student asks about what the grasshopper did.",
      question_word_bank: ["What did", "What does", "How was", "Why did"],
      question_frame: "___ the grasshopper do all summer?",
      correctWord: "What did"
    },
    {
      nova_says: "The first frost appeared on a cold day in autumn. The grasshopper felt very cold and very hungry because he had no food stored.",
      nova_says_vi: "Sương giá đầu tiên xuất hiện vào một ngày lạnh vào mùa thu. Con châu chấu cảm thấy rất lạnh và rất đói vì nó không có thức ăn dự trữ.",
      context_en: "The grasshopper was cold and hungry. Student asks about why the grasshopper felt cold.",
      question_word_bank: ["Why did", "Why does", "What did", "When did"],
      question_frame: "___ the grasshopper feel cold and hungry?",
      correctWord: "Why did"
    },
    {
      nova_says: "The kind ant gave the grasshopper some food and invited him inside her warm shelter. She said: 'Come inside my house. Work with me next summer.'",
      nova_says_vi: "Con kiến tốt bụng cho châu chấu một ít thức ăn và mời nó vào ngôi nhà ấm áp. Cô ấy nói: 'Hãy vào nhà tôi. Làm việc cùng tôi vào mùa hè tới.'",
      context_en: "The ant helped the grasshopper. Student asks about what the ant gave to the grasshopper.",
      question_word_bank: ["What did", "What does", "How did", "When did"],
      question_frame: "___ the ant give to the grasshopper?",
      correctWord: "What did"
    },
    {
      nova_says: "The grasshopper learned a very important lesson: always work hard and prepare for the future. Both animals worked hard together for the rest of the year.",
      nova_says_vi: "Con châu chấu học được một bài học quan trọng: luôn làm việc chăm chỉ và chuẩn bị cho tương lai. Cả hai con vật làm việc chăm chỉ cùng nhau suốt phần còn lại của năm.",
      context_en: "Both animals learned a lesson. Student asks about what lesson they learned.",
      question_word_bank: ["What was", "What did", "How was", "When was"],
      question_frame: "___ the most important lesson that both animals learned?",
      correctWord: "What was"
    }
  ]
};
