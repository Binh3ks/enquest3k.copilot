// WEEK 30: THE OLD TOWN MARKET — Irregular Verbs 2: eat, drink, buy, give
// Ask AI Station — Easy Mode
// W29+ Schema: prompts[] with nova_says, task_en/vi, question_starters[], answer[]

export default {
  prompts: [
    {
      id: 1,
      context_en: "Nova visited the old town market with her family and saw colourful stalls.",
      nova_says: "Last Saturday I went to the old town market with my family and saw rows of colourful stalls!",
      nova_says_vi: "Thứ Bảy tuần trước cô đi chợ phố cổ với gia đình và thấy những hàng quầy đầy màu sắc!",
      task_en: "Ask Nova a question about the colourful stalls she saw.",
      task_vi: "Hỏi Nova một câu hỏi về những quầy đầy màu sắc cô đã thấy.",
      question_starters: [
        "What was on the colourful…?",
        "Did you see many…?"
      ],
      answer: [
        "There were many colourful stalls with beautiful things to look at!",
        "The stalls were full of colourful items — I saw so many different things!"
      ]
    },
    {
      id: 2,
      context_en: "Nova touched a smooth wooden shelf and a heavy stone bowl.",
      nova_says: "I touched a wooden shelf and it felt so smooth! Next to it was a stone bowl — very heavy and hard.",
      nova_says_vi: "Cô chạm vào một cái kệ gỗ và nó rất mịn! Cạnh đó là một cái bát đá — rất nặng và cứng.",
      task_en: "Ask Nova a question about what she touched.",
      task_vi: "Hỏi Nova một câu hỏi về những gì cô đã chạm vào.",
      question_starters: [
        "How did the wooden shelf…?",
        "Was the stone bowl rough…?"
      ],
      answer: [
        "The wooden shelf felt very smooth!",
        "No, the stone bowl was heavy and hard, but not rough — it was smooth too."
      ]
    },
    {
      id: 3,
      context_en: "Nova saw cotton scarves in beautiful colours.",
      nova_says: "I saw cotton scarves in beautiful colours — red, blue, and orange. The cloth felt so soft!",
      nova_says_vi: "Cô thấy khăn lụa bằng vải cotton với màu sắc đẹp — đỏ, xanh và cam. Vải rất mềm!",
      task_en: "Ask Nova a question about the cotton scarves.",
      task_vi: "Hỏi Nova một câu hỏi về khăn lụa cotton.",
      question_starters: [
        "What colours were the…?",
        "Did you buy a…?"
      ],
      answer: [
        "The scarves were in red, blue, and orange — such beautiful colours!",
        "Yes, I liked the red one best because it felt so soft and looked very pretty!"
      ]
    },
    {
      id: 4,
      context_en: "Nova smelt wonderful cinnamon and fresh roses at the spice stall.",
      nova_says: "Near the spice stall I smelt wonderful cinnamon — it was sweet and warm. I also smelt fresh roses!",
      nova_says_vi: "Gần quầy gia vị, cô ngửi thấy mùi quế tuyệt vời — ngọt ngào và ấm áp. Cô cũng ngửi thấy hoa hồng tươi!",
      task_en: "Ask Nova a question about the smells at the market.",
      task_vi: "Hỏi Nova một câu hỏi về mùi ở chợ.",
      question_starters: [
        "What did the cinnamon smell…?",
        "Did the roses smell…?"
      ],
      answer: [
        "The cinnamon smelt sweet and warm — it was wonderful!",
        "Yes, the roses smelt very nice and fresh!"
      ]
    },
    {
      id: 5,
      context_en: "Nova describes the sounds at the market — vendors, children, and birds.",
      nova_says: "I heard vendors calling out prices across the stalls! Children laughed and birds sang nearby.",
      nova_says_vi: "Cô nghe những người bán hàng rao giá ở các quầy! Trẻ em cười và chim hót gần đó.",
      task_en: "Ask Nova a question about the sounds she heard.",
      task_vi: "Hỏi Nova một câu hỏi về những âm thanh cô đã nghe.",
      question_starters: [
        "What sounds did you hear…?",
        "Was the market loud…?"
      ],
      answer: [
        "I heard vendors calling, children laughing, and birds singing — it was very lively!",
        "Yes, the market was quite loud with vendors calling and people talking everywhere!"
      ]
    }
  ]
};
