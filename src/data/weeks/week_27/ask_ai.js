// WEEK 27: ask_ai — Fixed scaffolding (W1-27 format)
// Standard 6 wh-word bank + question frame per prompt
export default {
  prompts: [
    {
      nova_says: "Did you know? Plants make their own food from sunlight.",
      nova_says_vi: "Bạn có biết không? Cây tự tạo ra thức ăn từ ánh sáng mặt trời.",
      context_en: "Plants make their own food.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do plants make their food?"
    },
    {
      nova_says: "Plants need sunlight, water, and carbon dioxide to grow.",
      nova_says_vi: "Cây cần ánh sáng, nước và khí CO2 để phát triển.",
      context_en: "Plants need sunlight and water.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ do plants need to grow?"
    },
    {
      nova_says: "Without sunlight, plants cannot make food and they will die.",
      nova_says_vi: "Không có ánh sáng, cây không thể tạo ra thức ăn và sẽ chết.",
      context_en: "Plants die without sunlight.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ happens to plants without sunlight?"
    },
    {
      nova_says: "This process is called photosynthesis.",
      nova_says_vi: "Quá trình này gọi là quang hợp.",
      context_en: "The process is photosynthesis.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ is this process called?"
    },
    {
      nova_says: "Photosynthesis happens mostly during the daytime.",
      nova_says_vi: "Quang hợp xảy ra chủ yếu vào ban ngày.",
      context_en: "Photosynthesis happens in daylight.",
      question_word_bank: ["What","When","Where","Who","Why","How"],
      question_frame: "___ does photosynthesis happen?"
    }
  ]
};