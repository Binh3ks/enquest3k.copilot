// WEEK 30: THE OLD TOWN MARKET — Irregular Verbs 2: eat, drink, buy, give
// Ask AI Station — Advanced Mode
// W28-42 format: question_word_bank (1 item) + question_frame

export default {
  prompts: [
    {
      nova_says: "Last Saturday my class went on a field trip to the old town market. The teacher said we had to use all our senses to explore!",
      nova_says_vi: "Thứ Bảy tuần trước lớp tôi đi dã ngoại đến chợ phố cổ. Cô giáo nói chúng tôi phải dùng tất cả các giác quan để khám phá!",
      context_en: "Nova's class visits the old town market. Student asks about the field trip.",
      question_word_bank: ["What"],
      question_frame: "___ did you see at the market?"
    },
    {
      nova_says: "I touched a wooden shelf carved with leaf patterns — it felt rough and warm. Then I picked up a heavy stone bowl — it felt cool and smooth.",
      nova_says_vi: "Tôi chạm vào một chiếc kệ gỗ khắc hoa văn lá cây — bề mặt thô ráp và ấm. Rồi tôi nhấc một cái bát đá nặng — bề mặt mát lạnh và nhẵn bóng.",
      context_en: "Nova describes touching a wooden shelf and a stone bowl. Student asks about textures.",
      question_word_bank: ["How"],
      question_frame: "___ did the wooden shelf feel?"
    },
    {
      nova_says: "At the fabric stall, I felt soft cotton scarves in every colour. Cotton is so light and gentle — nothing like cold metal railings!",
      nova_says_vi: "Ở quầy vải, tôi cảm nhận những chiếc khăn cotton mềm mại đủ màu. Cotton thật nhẹ nhàng — hoàn toàn khác với lan can kim loại lạnh lẽo!",
      context_en: "Nova describes touching cotton scarves and metal railings. Student asks about materials.",
      question_word_bank: ["Which"],
      question_frame: "___ material did you like more?"
    },
    {
      nova_says: "Near the spice stall, I smelt cinnamon and sweet roses drifting through the air. I heard vendors calling and children laughing everywhere!",
      nova_says_vi: "Gần quầy gia vị, tôi ngửi thấy mùi quế và hoa hồng ngọt ngào lan trong không khí. Tôi nghe tiếng người bán hàng rao và tiếng trẻ em cười vang.",
      context_en: "Nova describes smells and sounds at the market. Student asks about senses.",
      question_word_bank: ["What"],
      question_frame: "___ did the cinnamon smell like?"
    },
    {
      nova_says: "My favourite thing was a beautiful cotton cloth with a bright flower pattern.",
      nova_says_vi: "Thứ tôi yêu thích nhất là một tấm vải cotton đẹp với hoa văn hoa rực rỡ.",
      context_en: "Nova shares her favourite thing. Student asks about it.",
      question_word_bank: ["What"],
      question_frame: "___ was your favourite thing at the market?"
    }
  ]
};
