// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Writing Station — Easy Mode

export default {
  title: "Jake's Bad Day",
  theme: "accidents_and_consequences",
  min_words: 25,
  model_sentence: "Last Monday, Jake was running in the school corridor. He forgot to walk carefully. He hit his knee on a table and fell down hard. He broke a glass cup! Jake felt terrible. His knee hurt a lot. The nurse put a cold pack on his knee. Jake learned a lesson: always walk carefully in school!",
  instruction_en: "Write about Jake's bad day. Use the past simple: hit, fell, broke, hurt, forgot, learned.",
  instruction_vi: "Viết về ngày tệ của Jake. Dùng quá khứ đơn.",
  prompt_en: "What happened? What lesson did Jake learn?",
  prompt_vi: "Chuyện gì đã xảy ra? Jake học được gì?",
  keywords: ["accident", "corridor", "carefully", "terrible", "lesson", "hurt"],
  topic_talk_prompt: "Tell me about Jake's accident day!",
  sentence_frames: [
    {
      template: "Jake was ___ in the corridor.",
      answers: ["running"]
    },
    {
      template: "He ___ his knee and ___ down.",
      answers: ["hit", "fell"]
    },
    {
      template: "He ___ a glass cup!",
      answers: ["broke"]
    },
    {
      template: "His knee ___ a lot.",
      answers: ["hurt"]
    },
    {
      template: "Jake ___ a lesson: always ___ ___.",
      answers: ["learned", "walk carefully"]
    }
  ]
};
