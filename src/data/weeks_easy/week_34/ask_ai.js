// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Ask AI Station — Easy Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "The hard-working ant gathered seeds every day in the summer!",
      nova_says_vi: "Con kiến chăm chỉ nhặt hạt mỗi ngày trong mùa hè!",
      context_en: "The ant is hard-working. Student asks about what the ant did.",
      question_word_bank: ["What did", "What does", "Why did", "Who did"],
      question_frame: "___ the ant do every day in the summer?",
      correctWord: "What did"
    },
    {
      nova_says: "The lazy grasshopper only sang songs and danced all summer long!",
      nova_says_vi: "Con châu chấu lười biếng chỉ hát và nhảy suốt mùa hè!",
      context_en: "The grasshopper was lazy. Student asks about what the grasshopper did.",
      question_word_bank: ["What did", "What does", "Why did", "Where did"],
      question_frame: "___ the grasshopper do all summer?",
      correctWord: "What did"
    },
    {
      nova_says: "When winter came, the grasshopper was cold and hungry because it had no food.",
      nova_says_vi: "Khi mùa đông đến, con châu chấu lạnh và đói vì không có thức ăn.",
      context_en: "The grasshopper was cold and hungry in winter. Student asks why.",
      question_word_bank: ["Why was", "What was", "How was", "When was"],
      question_frame: "___ the grasshopper cold and hungry?",
      correctWord: "Why was"
    },
    {
      nova_says: "The kind ant shared its food with the grasshopper because it felt sorry for it.",
      nova_says_vi: "Con kiến tốt bụng chia sẻ thức ăn với con châu chấu vì nó thương hại.",
      context_en: "The ant shared food. Student asks what the ant shared.",
      question_word_bank: ["What did", "What does", "Who did", "Why did"],
      question_frame: "___ the ant share with the grasshopper?",
      correctWord: "What did"
    },
    {
      nova_says: "The lesson of the fable is: always prepare for the future!",
      nova_says_vi: "Bài học của truyện ngụ ngôn là: luôn chuẩn bị cho tương lai!",
      context_en: "The lesson is about preparing for the future. Student asks about the lesson.",
      question_word_bank: ["What is", "Why is", "How is", "When is"],
      question_frame: "___ the lesson of the fable?",
      correctWord: "What is"
    }
  ]
};
