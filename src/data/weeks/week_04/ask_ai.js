export default {
  topic_talk_prompt: "Tell me about your favourite food. What do you like to eat? When do you eat it?",
  prompts: [
    {
      id: 1,
      nova_says: "My favourite food is pizza.",
      nova_says_vi: "Món ăn yêu thích của cô là pizza.",
      task_en: "Ask Nova WHAT her favourite food is.",
      task_vi: "Hỏi cô Nova món ăn yêu thích của cô là gì.",
      question_frame: "What ___ your favourite food?",
      answer: ["What is your favourite food?","What's your favourite food?"],
      hint: "is",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I eat pizza on Fridays.",
      nova_says_vi: "Cô ăn pizza vào các ngày thứ Sáu.",
      task_en: "Ask Nova WHEN she eats pizza.",
      task_vi: "Hỏi cô Nova cô ăn pizza khi nào.",
      question_frame: "___ do you eat pizza?",
      answer: ["When do you eat pizza?"],
      hint: "When",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I don't like vegetables very much.",
      nova_says_vi: "Cô không thích rau lắm.",
      task_en: "Ask Nova WHY she doesn't like vegetables.",
      task_vi: "Hỏi cô Nova tại sao cô không thích rau.",
      question_frame: "___ don't you like vegetables?",
      answer: ["Why don't you like vegetables?"],
      hint: "Why",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "My mum makes really good soup.",
      nova_says_vi: "Mẹ của cô nấu canh rất ngon.",
      task_en: "Ask Nova if her mum's soup is delicious.",
      task_vi: "Hỏi cô Nova canh của mẹ cô có ngon không.",
      question_frame: "___ your mum's soup delicious?",
      answer: ["Is your mum's soup delicious?"],
      hint: "Is",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I like chocolate ice cream for dessert.",
      nova_says_vi: "Cô thích kem sô-cô-la tráng miệng.",
      task_en: "Ask Nova WHAT flavour ice cream she likes.",
      task_vi: "Hỏi cô Nova cô thích kem vị gì.",
      question_frame: "What ___ of ice cream do you like?",
      answer: ["What flavour of ice cream do you like?","What flavour ice cream do you like?"],
      hint: "flavour",
      audio_url: null
    }
  ]
};
