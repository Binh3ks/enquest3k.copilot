export default {
  topic_talk_prompt: "Tell me about what you did yesterday. What happened from morning to night?",
  prompts: [
    {
      id: 1,
      context_en: "Your friend says: I walked to school yesterday. You want to know WHO walked with them. Ask your friend.",
      context_vi: "Ban cua ban noi: Hom qua toi da di bo den truong. Ban muon biet ban ay di voi AI. Hay hoi ban ay.",
      audio_url: "/audio/week21/ask_ai_1.mp3",
      answer: ["Who walked with you?", "Did anyone walk with you?", "Who went with you?"],
      hint: "Who walked..."
    },
    {
      id: 2,
      context_en: "Max says: I cooked dinner with my mom. You want to know WHAT they cooked. Ask Max.",
      context_vi: "Max noi: Toi da nau bua toi voi me. Ban muon biet ho da nau GI. Hay hoi Max.",
      audio_url: "/audio/week21/ask_ai_2.mp3",
      answer: ["What did you cook?", "What did you cook for dinner?", "Did you cook rice and soup?"],
      hint: "What did you..."
    },
    {
      id: 3,
      context_en: "Your classmate says: I played soccer at break time. You want to know WHERE they played. Ask your classmate.",
      context_vi: "Ban cung lop noi: Toi da choi bong da vao gio giai lao. Ban muon biet ban ay choi O DAU. Hay hoi ban ay.",
      audio_url: "/audio/week21/ask_ai_3.mp3",
      answer: ["Where did you play soccer?", "Where did you play?", "Did you play on the school field?"],
      hint: "Where did you..."
    },
    {
      id: 4,
      context_en: "Your sister says: I watched TV and listened to music last night. You want to know WHEN she did that. Ask her.",
      context_vi: "Chi cua ban noi: Toi da xem TV va nghe nhac toi qua. Ban muon biet chi ay da lam luc KHI NAO. Hay hoi chi ay.",
      audio_url: "/audio/week21/ask_ai_4.mp3",
      answer: ["When did you watch TV?", "When did you listen to music?", "Did you do that last night?"],
      hint: "When did you..."
    },
    {
      id: 5,
      context_en: "You read in a diary: I finished my homework and started a new story. You want to know WHY this was a good day. Ask your friend.",
      context_vi: "Ban doc trong nhat ky: Toi da hoan thanh bai tap va bat dau mot cau chuyen moi. Ban muon biet TAI SAO day la mot ngay tot. Hay hoi ban cua ban.",
      audio_url: "/audio/week21/ask_ai_5.mp3",
      answer: ["Why was it a good day?", "Why were you happy yesterday?", "Did finishing homework make you happy?"],
      hint: "Why was..."
    }
  ],
};
