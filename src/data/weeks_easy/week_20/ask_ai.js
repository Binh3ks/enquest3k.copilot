// WEEK 20: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "There was a big tree here before, but now it",
      nova_says_vi: "Trước đây có một cây lớn ở đây, nhưng bây giờ không còn nữa.",
      context_en: "A big tree used to be here.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ was the big tree?"
    },
    {
      nova_says: "This street was very quiet when I was young.",
      nova_says_vi: "Con đường này rất yên tĩnh khi cô còn nhỏ.",
      context_en: "The street was quiet.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ was this street when you were young?"
    },
    {
      nova_says: "There used to be a small market on this corner.",
      nova_says_vi: "Trước đây có một cái chợ nhỏ ở góc đường này.",
      context_en: "A market was on the corner.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ used to be on this corner?"
    },
    {
      nova_says: "The old school building was knocked down last year.",
      nova_says_vi: "Tòa nhà trường cũ bị phá dỡ năm ngoái.",
      context_en: "The school was knocked down.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ was the old school building knocked down?"
    },
    {
      nova_says: "People moved the market because the road became too busy.",
      nova_says_vi: "Người ta chuyển chợ vì đường trở nên quá đông.",
      context_en: "People moved the market.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ did people move the market?"
    }
  ]
};