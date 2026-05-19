// WEEK 30: THE OLD TOWN MARKET — Irregular Verbs 2: eat, drink, buy, give
// Ask AI Station — Easy Mode
// W16+ schema with prompts + context_en + question_word_bank + question_frame

export default {
  prompts: [
    {
      nova_says: "Last Saturday I went to the old town market with my family and saw rows of colorful stalls!",
      nova_says_vi: "Thứ Bảy tuần trước cô đi chợ phố cổ với gia đình và thấy những hàng quầy đầy màu sắc!",
      context_en: "Nova visits the old town market with her family. Student asks about the colorful stalls she saw.",
      question_word_bank: ["What", "How", "Did", "Were"],
      question_frame: "___ was on the colorful stalls? or ___ many stalls did you see? or Tell me more!"
    },
    {
      nova_says: "I touched a wooden shelf and it felt so smooth! Next to it was a stone bowl — very heavy and hard.",
      nova_says_vi: "Cô chạm vào một cái kệ gỗ và nó rất mịn! Cạnh đó là một cái bát đá — rất nặng và cứng.",
      context_en: "Nova describes touching a smooth wooden shelf and a heavy stone bowl. Student asks about what she touched.",
      question_word_bank: ["How", "Was", "What", "Did"],
      question_frame: "___ did the wooden shelf feel? or ___ the stone bowl rough or smooth? or Tell me more!"
    },
    {
      nova_says: "I saw cotton scarves in beautiful colors — red, blue, and orange. The cloth felt so soft!",
      nova_says_vi: "Cô thấy khăn lụa bằng vải cotton với màu sắc đẹp — đỏ, xanh và cam. Vải rất mềm!",
      context_en: "Nova describes soft cotton scarves in beautiful colors. Student asks about the cotton scarves.",
      question_word_bank: ["What", "Did", "How", "Was"],
      question_frame: "___ colors were the scarves? or ___ you buy a scarf? or Tell me more!"
    },
    {
      nova_says: "Near the spice stall I smelt wonderful cinnamon — it was sweet and warm. I also smelt fresh roses!",
      nova_says_vi: "Gần quầy gia vị, cô ngửi thấy mùi quế tuyệt vời — ngọt ngào và ấm áp. Cô cũng ngửi thấy hoa hồng tươi!",
      context_en: "Nova describes wonderful smells at the spice stall — cinnamon and roses. Student asks about the smells.",
      question_word_bank: ["What", "Did", "How", "Was"],
      question_frame: "___ did the cinnamon smell like? or ___ the roses smell nice? or Tell me more!"
    },
    {
      nova_says: "I heard vendors calling out prices across the stalls! Children laughed and birds sang nearby.",
      nova_says_vi: "Cô nghe những người bán hàng rao giá ở các quầy! Trẻ em cười và chim hót gần đó.",
      context_en: "Nova describes the sounds at the market — vendors calling, children laughing, birds singing. Student asks about sounds.",
      question_word_bank: ["What", "Was", "Did", "How"],
      question_frame: "___ sounds did you hear at the market? or ___ the market loud or quiet? or Tell me more!"
    }
  ]
};
