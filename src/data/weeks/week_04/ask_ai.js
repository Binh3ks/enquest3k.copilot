// WEEK 04: ask_ai — W1-14 format
// 6-word bank, frame starts with ___, task_en with correct wh-word in ALL CAPS hint
export default {
  prompts: [
    {
      nova_says: "My favorite food is pizza.",
      nova_says_vi: "Món ăn yêu thích của cô là pizza.",
      context_en: "My favorite food is pizza.",
      task_en: "Ask Nova WHAT her favorite food is.",
      task_vi: "Hỏi cô Nova món ăn yêu thích của cô là gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is your favorite food?"
    },
    {
      nova_says: "I eat pizza on Fridays.",
      nova_says_vi: "Cô ăn pizza vào thứ Sáu.",
      context_en: "I eat pizza on Fridays.",
      task_en: "Ask Nova WHEN she eats pizza.",
      task_vi: "Hỏi cô Nova cô ăn pizza khi nào.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do you eat pizza?"
    },
    {
      nova_says: "I don't like vegetables.",
      nova_says_vi: "Cô không thích rau.",
      context_en: "I don't like vegetables.",
      task_en: "Ask Nova WHY she doesn't like vegetables.",
      task_vi: "Hỏi cô Nova tại sao cô không thích rau.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ don't you like vegetables?"
    },
    {
      nova_says: "My mum makes good soup.",
      nova_says_vi: "Mẹ cô nấu canh ngon.",
      context_en: "My mum makes good soup.",
      task_en: "Ask Nova WHAT her mum makes.",
      task_vi: "Hỏi cô Nova mẹ cô nấu gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does your mum make?"
    },
    {
      nova_says: "I like chocolate ice cream.",
      nova_says_vi: "Cô thích kem sô-cô-la.",
      context_en: "I like chocolate ice cream.",
      task_en: "Ask Nova WHAT kind of ice cream she likes.",
      task_vi: "Hỏi cô Nova cô thích kem vị gì.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ kind of ice cream do you like?"
    }
  ]
};
