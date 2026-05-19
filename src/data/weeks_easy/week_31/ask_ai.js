// WEEK 31: A DAY AT THE MARKET — Perception Verbs & Materials
// Ask AI Station — Easy Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "Last Saturday, Luna went to the market with her mum. The market was colourful and fun.",
      nova_says_vi: "Thứ Bảy tuần trước, Luna đi chợ với mẹ. Chợ đầy màu sắc và vui vẻ.",
      context_en: "Luna visited the market. Student asks about the market.",
      question_word_bank: ["Was", "What was", "How was", "Where was"],
      question_frame: "___ the market very colourful?"
    },
    {
      nova_says: "Luna picked up a wooden shelf. The wood felt rough and warm. She also touched a stone bowl. The stone felt cool and smooth.",
      nova_says_vi: "Luna nhặt một cái kệ gỗ. Gỗ cảm thấy thô ráp và ấm. Cô cũng chạm vào một cái bát đá. Đá cảm thấy mát và nhẵn.",
      context_en: "Luna touched a wooden shelf and a stone bowl. Student asks about what she felt.",
      question_word_bank: ["What did", "How did", "Where did", "Did"],
      question_frame: "___ the wooden shelf feel?"
    },
    {
      nova_says: "Then Luna felt soft cotton scarves. They were very light and gentle. She touched the cold metal gate at the entrance.",
      nova_says_vi: "Rồi Luna sờ những chiếc khăn cotton mềm mại. Chúng rất nhẹ và dịu dàng. Cô chạm cổng kim loại lạnh ở lối vào.",
      context_en: "Luna felt soft cotton scarves. Student asks about the cotton.",
      question_word_bank: ["Were", "What were", "How were", "Was"],
      question_frame: "___ the cotton scarves soft?"
    },
    {
      nova_says: "Luna smelt sweet strawberries from the fruit stall. She tasted a small piece of mango. It was juicy and sweet.",
      nova_says_vi: "Luna ngửi thấy dâu ngọt từ gian hàng trái cây. Cô nếm một miếng nhỏ xoài. Nó ngọt và đầy nước.",
      context_en: "Luna smelt and tasted things. Student asks about what she smelt.",
      question_word_bank: ["What did", "How did", "What does", "Where did"],
      question_frame: "___ Luna smell at the fruit stall?"
    },
    {
      nova_says: "A plastic bag broke near the gate with a big crash! Luna felt surprised. Then she laughed.",
      nova_says_vi: "Một túi nhựa bị rách gần cổng với tiếng động lớn! Luna giật mình. Rồi cô cười.",
      context_en: "A plastic bag broke. Student asks about what Luna felt.",
      question_word_bank: ["Did", "Was", "How did", "What did"],
      question_frame: "___ Luna feel surprised?"
    }
  ]
};
