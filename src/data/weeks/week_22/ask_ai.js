export default {
  topic_talk_prompt: "Tell me about something interesting that happened in the past week. What did you do or see?",
  prompts: [
    {
      id: 1,
      context_en: "You are interviewing a classmate about yesterday. They say: I walked to school and talked with my friend. You want to know WHO they talked with. Ask politely.",
      context_vi: "Ban cua ban noi: Hom qua toi da di bo den truong. Ban muon biet ban ay di voi AI. Hay hoi ban ay.",
      audio_url: "/audio/week22/ask_ai_1.mp3",
      answer: ["Who did you talk with?", "Who did you walk with?", "Did you talk with your best friend?"],
      hint: "Who did you..."
    },
    {
      id: 2,
      context_en: "A witness says: Last night I cooked dinner with my mother. You want to know WHAT they cooked for dinner. Ask clearly.",
      context_vi: "Max noi: Toi da nau bua toi voi me. Ban muon biet ho da nau GI. Hay hoi Max.",
      audio_url: "/audio/week22/ask_ai_2.mp3",
      answer: ["What did you cook for dinner?", "Did you cook rice and soup?", "What did your mother cook?"],
      hint: "What did you..."
    },
    {
      id: 3,
      context_en: "Your classmate says: I played soccer at break time yesterday. You want to know WHERE they played soccer. Ask now.",
      context_vi: "Ban cung lop noi: Toi da choi bong da vao gio giai lao. Ban muon biet ban ay choi O DAU. Hay hoi ban ay.",
      audio_url: "/audio/week22/ask_ai_3.mp3",
      answer: ["Where did you play soccer?", "Did you play on the school field?", "Where did you play at break time?"],
      hint: "Where did you..."
    },
    {
      id: 4,
      context_en: "Your sister says: I watched TV and listened to music yesterday. You want to know WHEN she watched TV. Ask directly.",
      context_vi: "Chi cua ban noi: Toi da xem TV va nghe nhac toi qua. Ban muon biet chi ay da lam luc KHI NAO. Hay hoi chi ay.",
      audio_url: "/audio/week22/ask_ai_4.mp3",
      answer: ["When did you watch TV?", "Did you watch TV last night?", "When did you listen to music?"],
      hint: "When did you..."
    },
    {
      id: 5,
      context_en: "You read in a diary: I finished homework and started a new story. You want to know WHY this was a good day. Ask your friend.",
      context_vi: "Ban doc trong nhat ky: Toi da hoan thanh bai tap va bat dau mot cau chuyen moi. Ban muon biet TAI SAO day la mot ngay tot. Hay hoi ban cua ban.",
      audio_url: "/audio/week22/ask_ai_5.mp3",
      answer: ["Why was it a good day?", "Were you happy after finishing homework?", "Why did you start a new story?"],
      hint: "Why did..."
    }
  ],
};
