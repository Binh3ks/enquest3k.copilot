// WEEK 24: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "I felt very excited on the day of the school trip.",
      nova_says_vi: "Cô cảm thấy rất phấn khích vào ngày đi dã ngoại.",
      context_en: "Nova felt excited.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you feel on the day of the school trip?"
    },
    {
      nova_says: "I was nervous before my piano recital.",
      nova_says_vi: "Cô đã hồi hộp trước buổi biểu diễn đàn.",
      context_en: "Nova was nervous.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ were you nervous before the recital?"
    },
    {
      nova_says: "I was surprised when my friends threw me a party.",
      nova_says_vi: "Cô đã bị bất ngờ khi bạn bè tổ chức tiệc cho cô.",
      context_en: "Friends threw Nova a party.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ surprised you?"
    },
    {
      nova_says: "I felt proud when I got full marks on my test.",
      nova_says_vi: "Cô cảm thấy tự hào khi được điểm tuyệt đối trong bài kiểm tra.",
      context_en: "Nova felt proud.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you feel proud?"
    },
    {
      nova_says: "I felt sad when my best friend moved to another city.",
      nova_says_vi: "Cô cảm thấy buồn khi người bạn thân chuyển đến thành phố khác.",
      context_en: "Nova felt sad.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did you feel sad?"
    }
  ]
};