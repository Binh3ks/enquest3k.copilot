export default {
  topic_talk_prompt: "Tell me about a time you went to a market. What did you see, hear, smell, and feel? What were things made of — wood, stone, or cotton?",
  prompts: [
    {
      id: 1,
      nova_says: "Last Saturday I went to the old town market with my family and saw rows of colorful stalls!",
      nova_says_vi: "Thứ Bảy tuần trước cô đi chợ phố cổ với gia đình và thấy những hàng quầy đầy màu sắc!",
      task_en: "Ask Nova 2 questions about the stalls she saw.",
      task_vi: "Hỏi cô Nova 2 câu về các quầy hàng cô ấy thấy.",
      question_starters: ["What was on the colorful stalls...?", "How many stalls did you...?"],
      answer: ["What was on the colorful stalls?", "How many stalls did you see?", "Which stall was your favorite?"],
      audio_url: null
    },
    {
      id: 2,
      nova_says: "I touched a wooden shelf and it felt so smooth! Next to it was a stone bowl — very heavy and hard.",
      nova_says_vi: "Cô chạm vào một cái kệ gỗ và nó rất mịn! Cạnh đó là một cái bát đá — rất nặng và cứng.",
      task_en: "Ask Nova about what she touched at the market.",
      task_vi: "Hỏi cô Nova về những thứ cô ấy chạm vào ở chợ.",
      question_starters: ["How did the wooden shelf feel...?", "Was the stone bowl rough or smooth...?"],
      answer: ["How did the wooden shelf feel?", "Was the stone bowl rough or smooth?", "What other things did you touch?"],
      audio_url: null
    },
    {
      id: 3,
      nova_says: "I saw cotton scarves in beautiful colors — red, blue, and orange. The cloth felt so soft!",
      nova_says_vi: "Cô thấy khăn lụa bằng vải cotton với màu sắc đẹp — đỏ, xanh và cam. Vải rất mềm!",
      task_en: "Ask Nova about the cotton scarves she saw.",
      task_vi: "Hỏi cô Nova về những chiếc khăn cotton cô ấy thấy.",
      question_starters: ["What colors were the scarves...?", "Did you buy a scarf...?"],
      answer: ["What colors were the scarves?", "Did you buy a scarf?", "How did the cloth feel in your hands?"],
      audio_url: null
    },
    {
      id: 4,
      nova_says: "Near the spice stall I smelt wonderful cinnamon — it was sweet and warm. I also smelt fresh roses!",
      nova_says_vi: "Gần quầy gia vị, cô ngửi thấy mùi quế tuyệt vời — ngọt ngào và ấm áp. Cô cũng ngửi thấy hoa hồng tươi!",
      task_en: "Ask Nova what she smelt at the spice stall.",
      task_vi: "Hỏi cô Nova cô ấy ngửi thấy gì ở quầy gia vị.",
      question_starters: ["What did the cinnamon smell like...?", "Did the roses smell nice...?"],
      answer: ["What did the cinnamon smell like?", "Did the roses smell nice?", "What was your favorite smell?"],
      audio_url: null
    },
    {
      id: 5,
      nova_says: "I heard vendors calling out prices across the stalls! Children laughed and birds sang nearby.",
      nova_says_vi: "Cô nghe những người bán hàng rao giá ở các quầy! Trẻ em cười và chim hót gần đó.",
      task_en: "Ask Nova what she heard at the market.",
      task_vi: "Hỏi cô Nova cô ấy nghe thấy gì ở chợ.",
      question_starters: ["What sounds did you hear...?", "Was the market loud or quiet...?"],
      answer: ["What sounds did you hear at the market?", "Was the market loud or quiet?", "What was your favorite part of the market?"],
      audio_url: null
    }
  ]
};
