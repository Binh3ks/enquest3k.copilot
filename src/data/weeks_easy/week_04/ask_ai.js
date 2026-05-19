// WEEK 04: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "My favorite food is pizza.",
      nova_says_vi: "Món ăn yêu thích của cô là pizza.",
      context_en: "Nova talks about her favorite food.",
      task_en: "Ask Nova WHAT her favorite food is.",
      task_vi: "Hỏi cô Nova món ăn yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ your favorite food?"
    },
    {
      nova_says: "I eat pizza on Fridays.",
      nova_says_vi: "Cô ăn pizza vào thứ Sáu.",
      context_en: "Nova eats pizza on Fridays.",
      task_en: "Ask Nova WHEN she eats pizza.",
      task_vi: "Hỏi cô Nova cô ăn pizza khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you eat pizza?"
    },
    {
      nova_says: "I don",
      nova_says_vi: "Cô không thích rau.",
      context_en: "Nova shares her food preferences.",
      task_en: "Ask Nova WHY she doesn",
      task_vi: "Hỏi cô Nova tại sao cô không thích rau.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ don"
    },
    {
      nova_says: "My mum makes good soup.",
      nova_says_vi: "Mẹ cô nấu canh ngon.",
      context_en: "Nova describes her mother's cooking.",
      task_en: "Ask Nova if her mum",
      task_vi: "Hỏi cô Nova canh của mẹ cô có ngon không.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ your mum"
    },
    {
      nova_says: "I like chocolate ice cream.",
      nova_says_vi: "Cô thích kem sô-cô-la.",
      context_en: "Nova talks about dessert.",
      task_en: "Ask Nova WHAT flavor ice cream she likes.",
      task_vi: "Hỏi cô Nova cô thích kem vị gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "What ___ of ice cream do you like?"
    }
  ]
};