export default {
  title: "My Neighborhood",
  min_words: 30,
  model_sentence: "I live near a river. There was an old market near my house. There were big trees on the road. There was a wooden bridge over the river. Now there are new buildings. But the old temple is still there. I love my neighborhood!",
  instruction_en: "Use: There was a... / There were... / It was... / Now there is/are...",
  instruction_vi: "Dùng: There was a... / There were... / It was... / Now there is/are...",
  prompt_en: "Describe an old place — a market, a school, or a village! Was there a market? Were there trees? Were there many people? What was it like? What is it like now?",
  prompt_vi: "Mô tả một nơi cũ — chợ, trường học hay làng quê! Có chợ không? Có cây không? Có nhiều người không? Ngày xưa như thế nào? Bây giờ ra sao?",
  keywords: ["there was", "there were", "old", "new", "building", "tree", "river", "road", "bridge", "market", "temple", "village"],
  topic_talk_prompt: "Tell me about how a place looked in the past. What was it like?",
  sentence_frames: [{"template":"Long ago, there was a ___ in ___."},{"template":"There were ___ and ___."},{"template":"It was ___ and ___."},{"template":"Now there is/are ___ instead."}],
};
