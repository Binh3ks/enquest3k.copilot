export default {
  topic_talk_prompt: "Tell me an interesting science fact you know. What did you learn about nature or animals?",
  prompts: [
    {
      id: 1,
      nova_says: "Did you know? Plants make their own food from sunlight.",
      nova_says_vi: "Bạn có biết không? Cây tự tạo ra thức ăn từ ánh sáng mặt trời.",
      task_en: "Ask Nova HOW plants make their food.",
      task_vi: "Hỏi cô Nova cây tạo ra thức ăn như thế nào.",
      question_word_bank: ["How","What","Why","Where"],
      question_frame: "___ do plants make their food?",
      answer: ["How do plants make their food?"],
      hint_word: "How",
      audio_url: null
    },
    {
      id: 2,
      nova_says: "Plants need sunlight, water, and carbon dioxide to grow.",
      nova_says_vi: "Cây cần ánh sáng, nước và khí CO2 để phát triển.",
      task_en: "Ask Nova WHAT plants need to grow.",
      task_vi: "Hỏi cô Nova cây cần gì để phát triển.",
      question_word_bank: ["What","How","Why","Where"],
      question_frame: "___ do plants need to grow?",
      answer: ["What do plants need to grow?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 3,
      nova_says: "Without sunlight, plants cannot make food and they will die.",
      nova_says_vi: "Không có ánh sáng, cây không thể tạo ra thức ăn và sẽ chết.",
      task_en: "Ask Nova WHAT happens to plants without sunlight.",
      task_vi: "Hỏi cô Nova điều gì xảy ra với cây nếu không có ánh sáng.",
      question_word_bank: ["What","Why","How","Where"],
      question_frame: "___ happens to plants without sunlight?",
      answer: ["What happens to plants without sunlight?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 4,
      nova_says: "This process is called photosynthesis.",
      nova_says_vi: "Quá trình này gọi là quang hợp.",
      task_en: "Ask Nova WHAT this process is called.",
      task_vi: "Hỏi cô Nova quá trình này gọi là gì.",
      question_word_bank: ["What","How","Why","When"],
      question_frame: "___ is this process called?",
      answer: ["What is this process called?","What's this process called?"],
      hint_word: "What",
      audio_url: null
    },
    {
      id: 5,
      nova_says: "Photosynthesis happens mostly during the daytime.",
      nova_says_vi: "Quang hợp xảy ra chủ yếu vào ban ngày.",
      task_en: "Ask Nova WHEN photosynthesis happens.",
      task_vi: "Hỏi cô Nova quang hợp xảy ra khi nào.",
      question_word_bank: ["When","Why","How","What"],
      question_frame: "___ does photosynthesis happen?",
      answer: ["When does photosynthesis happen?"],
      hint_word: "When",
      audio_url: null
    }
  ]
};
