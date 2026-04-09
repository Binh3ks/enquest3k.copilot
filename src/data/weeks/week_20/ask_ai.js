export default {
  topic_talk_prompt: "Tell me about a place that looked different in the past. What did it look like before? How is it now?",
  prompts: [
    {
      id: 1,
      context_en: "Detective Luna is holding an old map. She sees that there was a market near the river in the past. Now the market is gone. She wants to know WHAT is there now. Ask her.",
      context_vi: "Thám tử Luna đang cầm bản đồ cũ. Cô thấy rằng có một khu chợ gần sông trong quá khứ. Bây giờ chợ không còn nữa. Cô muốn biết BÂY GIỜ có gì ở đó. Hỏi cô.",
      audio_url: "/audio/week20/ask_ai_1.mp3",
      answer: ["What is there now?", "What is at that place now?", "What replaced the market?"],
      hint: "What is there now?"
    },
    {
      id: 2,
      context_en: "You are visiting an old town. You see a beautiful old temple. You want to know HOW OLD the temple is. Ask the tour guide.",
      context_vi: "Bạn đang thăm một thị trấn cũ. Bạn thấy một ngôi đền cũ đẹp. Bạn muốn biết ngôi đền BAO NHIÊU TUỔI. Hỏi hướng dẫn viên.",
      audio_url: "/audio/week20/ask_ai_2.mp3",
      answer: ["How old is the temple?", "How old is this temple?", "When was the temple built?"],
      hint: "How old is..."
    },
    {
      id: 3,
      context_en: "You look at an old photo of your street. There were many trees in the photo. Now the trees are gone. You want to know WHY the trees were cut down. Ask your teacher.",
      context_vi: "Bạn nhìn vào ảnh cũ của đường phố. Có nhiều cây trong ảnh. Bây giờ cây đã biến mất. Bạn muốn biết TẠI SAO cây bị chặt. Hỏi cô giáo.",
      audio_url: "/audio/week20/ask_ai_3.mp3",
      answer: ["Why were the trees cut down?", "Why are there no trees now?", "Why did they cut the trees?"],
      hint: "Why were the trees..."
    },
    {
      id: 4,
      context_en: "In the old town, there was a wooden bridge. Now there is a new steel bridge. You want to know WHO built the new bridge. Ask the town elder.",
      context_vi: "Ở thị trấn cũ, có một cầu gỗ. Bây giờ có một cầu thép mới. Bạn muốn biết AI xây cầu mới. Hỏi trưởng làng.",
      audio_url: "/audio/week20/ask_ai_4.mp3",
      answer: ["Who built the new bridge?", "Who made the bridge?", "Who built this bridge?"],
      hint: "Who built..."
    }
  ]
};
