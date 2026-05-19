// WEEK 30: THE OLD TOWN MARKET — Irregular Verbs 2: eat, drink, buy, give
// Ask AI Station — Easy Mode
// W28+ format: question_word_bank (4 aux verb options) + question_frame (1 blank replaced by selected option)

export default {
  prompts: [
    {
      nova_says: "Last Saturday I went to the old town market with my family and saw rows of colourful stalls!",
      nova_says_vi: "Thứ Bảy tuần trước cô đi chợ phố cổ với gia đình và thấy những hàng quầy đầy màu sắc!",
      context_en: "Nova visits the old town market. Student asks about the colourful stalls.",
      question_word_bank: ["What did", "What does", "Where did", "When did"],
      question_frame: "___ you see at the colourful stalls?",
      correctWord: "What did"
    },
    {
      nova_says: "I touched a wooden shelf and it felt so smooth! Next to it was a stone bowl — very heavy and hard.",
      nova_says_vi: "Cô chạm vào một cái kệ gỗ và nó rất mịn! Cạnh đó là một cái bát đá — rất nặng và cứng.",
      context_en: "Nova describes touching a smooth wooden shelf and a heavy stone bowl.",
      question_word_bank: ["How did", "What did", "Where did", "Did"],
      question_frame: "___ the wooden shelf feel?",
      correctWord: "How did"
    },
    {
      nova_says: "I saw cotton scarves in beautiful colours — red, blue, and orange. The cloth felt so soft!",
      nova_says_vi: "Cô thấy khăn lụa bằng vải cotton với màu sắc đẹp — đỏ, xanh và cam. Vải rất mềm!",
      context_en: "Nova describes soft cotton scarves in beautiful colours. Student asks about the scarves.",
      question_word_bank: ["What colours", "What colour", "How were", "Where were"],
      question_frame: "___ were the cotton scarves?",
      correctWord: "What colours"
    },
    {
      nova_says: "Near the spice stall I smelt wonderful cinnamon — it was sweet and warm. I also smelt fresh roses!",
      nova_says_vi: "Gần quầy gia vị, cô ngửi thấy mùi quế tuyệt vời — ngọt ngào và ấm áp. Cô cũng ngửi thấy hoa hồng tươi!",
      context_en: "Nova describes wonderful smells at the spice stall. Student asks about the smells.",
      question_word_bank: ["What did", "What does", "Where did", "When did"],
      question_frame: "___ you smell at the spice stall?",
      correctWord: "What did"
    },
    {
      nova_says: "I heard vendors calling out prices across the stalls! Children laughed and birds sang nearby.",
      nova_says_vi: "Cô nghe những người bán hàng rao giá ở các quầy! Trẻ em cười và chim hót gần đó.",
      context_en: "Nova describes sounds at the market. Student asks about the sounds.",
      question_word_bank: ["What sounds", "What sound", "How did", "Where did"],
      question_frame: "___ did you hear at the market?",
      correctWord: "What sounds"
    }
  ]
};
