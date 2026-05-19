// WEEK 31: A DAY AT THE MARKET — Perception Verbs & Materials
// Ask AI Station — Advanced Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "Last Saturday, Luna went to the market with her mum. The old town market was colourful and busy. Luna looked around and saw many different stalls.",
      nova_says_vi: "Thứ bảy tuần trước, Luna đến chợ với mẹ. Chợ truyền thống đầy màu sắc và nhộn nhịp. Luna nhìn xung quanh và thấy nhiều gian hàng khác nhau.",
      context_en: "Luna visits the old town market. Student asks about what she saw.",
      question_word_bank: ["What did", "What does", "Where did", "Did"],
      question_frame: "___ Luna see at the market?",
      correctWord: "What did"
    },
    {
      nova_says: "Luna picked up a heavy stone bowl. The stone felt cool and smooth. She touched a wooden shelf carved with leaf patterns. The wood felt rough and warm.",
      nova_says_vi: "Luna nhặt một bát đá nặng. Đá cảm thấy mát và mịn. Cô bé chạm vào giá gỗ khắc hoa văn lá. Gỗ cảm thấy thô và ấm.",
      context_en: "Luna felt the cool stone bowl and rough wooden shelf. Student asks about textures.",
      question_word_bank: ["What did", "How did", "What does", "Where did"],
      question_frame: "___ the wooden shelf feel?",
      correctWord: "How did"
    },
    {
      nova_says: "Luna smelt sweet strawberries from the fruit stall. She tasted a piece of mango. It was juicy and sweet!",
      nova_says_vi: "Luna ngửi dâu tây ngọt và nếm một miếng xoài. Nó ngọt và đầy nước!",
      context_en: "Luna smelt and tasted things at the market. Student asks about what she smelt.",
      question_word_bank: ["What did", "How did", "What does", "Where did"],
      question_frame: "___ Luna smell at the fruit stall?",
      correctWord: "What did"
    },
    {
      nova_says: "Luna tasted a small piece of mango. It was juicy and sweet!",
      nova_says_vi: "Luna nếm một miếng nhỏ xoài. Nó ngọt và đầy nước!",
      context_en: "Luna tasted the mango. Student asks about the taste.",
      question_word_bank: ["What did", "How does", "What does", "Was"],
      question_frame: "___ the mango taste like?",
      correctWord: "What did"
    },
    {
      nova_says: "At the stall entrance, Luna heard the seller call out prices. A plastic bag broke and made a loud noise!",
      nova_says_vi: "Tại cửa gian hàng, Luna nghe người bán hàng gọi giá. Một túi nhựa vỡ và tạo tiếng động lớn!",
      context_en: "Luna heard a seller and a plastic bag broke. Student asks about the sounds.",
      question_word_bank: ["What made", "What does", "How does", "Did"],
      question_frame: "___ the loud noise?",
      correctWord: "What made"
    }
  ]
};
