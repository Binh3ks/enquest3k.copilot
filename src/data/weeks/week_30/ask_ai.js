// WEEK 30: THE OLD TOWN MARKET — Irregular Verbs 2: eat, drink, buy, give
// Ask AI Station — Advanced Mode
// W16+ schema with prompts + context_en + question_word_bank + question_frame

export default {
  prompts: [
    {
      nova_says: "Last Saturday my class went on a field trip to the old town market. The teacher said we had to use all our senses to explore!",
      nova_says_vi: "Thứ Bảy tuần trước lớp tôi đi dã ngoại đến chợ phố cổ. Cô giáo nói chúng tôi phải dùng tất cả các giác quan để khám phá!",
      context_en: "Nova's class visits the old town market for a senses exploration trip. Student asks about the field trip.",
      question_word_bank: ["What", "How", "Did", "Who"],
      question_frame: "___ did you see at the market? or ___ did your teacher say about the senses? or Tell me more!"
    },
    {
      nova_says: "I saw rows of colorful stalls and smooth glass jars filled with golden honey. The colors were so bright and beautiful!",
      nova_says_vi: "Tôi thấy những dãy gian hàng đầy màu sắc và những lọ thủy tinh nhẵn bóng đựng mật ong vàng. Màu sắc thật rực rỡ và đẹp!",
      context_en: "Nova describes the colorful stalls and glass jars she saw at the market. Student asks about what she saw.",
      question_word_bank: ["What", "How", "Were", "Did"],
      question_frame: "___ else did you see? or ___ were the glass jars made of? or Tell me more!"
    },
    {
      nova_says: "I touched a wooden shelf carved with leaf patterns — it felt rough and warm. Then I picked up a heavy stone bowl — it felt cool and smooth.",
      nova_says_vi: "Tôi chạm vào một chiếc kệ gỗ khắc hoa văn lá cây — bề mặt thô ráp và ấm. Rồi tôi nhấc một cái bát đá nặng — bề mặt mát lạnh và nhẵn bóng.",
      context_en: "Nova describes the textures she felt — rough wooden shelf and smooth stone bowl. Student asks about textures.",
      question_word_bank: ["Which", "What", "How", "Did"],
      question_frame: "___ felt rougher — the wooden shelf or the stone bowl? or ___ was the wooden shelf made of? or Tell me more!"
    },
    {
      nova_says: "At the fabric stall, I felt soft cotton scarves in every color. Cotton is so light and gentle — nothing like cold metal railings!",
      nova_says_vi: "Ở quầy vải, tôi cảm nhận những chiếc khăn cotton mềm mại đủ màu. Cotton thật nhẹ nhàng — hoàn toàn khác với lan can kim loại lạnh lẽo!",
      context_en: "Nova describes touching soft cotton scarves and comparing them to cold metal. Student asks about materials.",
      question_word_bank: ["Which", "What", "How", "Did"],
      question_frame: "___ material did you like more — cotton or metal? or ___ does cotton feel like? or Tell me more!"
    },
    {
      nova_says: "Near the spice stall, I smelt cinnamon and sweet roses drifting through the air. I heard vendors calling and children laughing everywhere!",
      nova_says_vi: "Gần quầy gia vị, tôi ngửi thấy mùi quế và hoa hồng ngọt ngào lan trong không khí. Tôi nghe tiếng người bán hàng rao và tiếng trẻ em cười vang.",
      context_en: "Nova describes the smells and sounds at the market — cinnamon, roses, vendors, children. Student asks about senses.",
      question_word_bank: ["What", "How", "Did", "Was"],
      question_frame: "___ did the cinnamon smell like? or ___ was the loudest sound you heard? or Tell me more!"
    },
    {
      nova_says: "My favorite thing was a beautiful cotton cloth with a bright flower pattern. What is your school bag made of? Is it plastic, metal, or cotton?",
      nova_says_vi: "Thứ tôi yêu thích nhất là một tấm vải cotton đẹp với hoa văn hoa rực rỡ. Túi cặp của bạn làm bằng gì? Nhựa, kim loại hay cotton?",
      context_en: "Nova shares her favorite thing — a cotton cloth — and asks about the student's bag materials.",
      question_word_bank: ["What", "Was", "Did", "Why"],
      question_frame: "___ was your favorite thing at the market? or ___ did you like the cotton cloth? or Tell me more!"
    }
  ]
};
