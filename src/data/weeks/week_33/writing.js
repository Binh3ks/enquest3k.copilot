// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Writing Station — Advanced Mode

export default {
  title: "Jake's Accident Story",
  theme: "accidents_and_consequences",
  min_words: 45,
  model_sentence: "Last Monday, Jake was running in the school corridor because he was late for class. Suddenly, he hit his knee on the corner of a table and fell down hard. He broke the glass cup that another student was holding, and everyone looked at him. Jake felt terrible about what happened. His knee hurt a lot, but the nurse put a cold pack on it. Jake learned an important lesson: always walk carefully in the corridor, even when he is late. He never forgot this lesson again.",
  instruction_en: "Write about Jake's accident story. Use past simple irregular verbs: hit, fell, broke, hurt, forgot, learned.",
  instruction_vi: "Viết về câu chuyện tai nạn của Jake. Sử dụng quá khứ đơn bất quy tắc.",
  prompt_en: "What happened? How did Jake feel? What lesson did he learn?",
  prompt_vi: "Chuyện gì đã xảy ra? Jake cảm thấy thế nào? Cậu học được bài học gì?",
  keywords: ["accident", "corridor", "carefully", "terrible", "lesson", "hurt", "forgot", "learned"],
  topic_talk_prompt: "Tell me about Jake's accident — what happened, how he felt, and what lesson he learned!",
  sentence_frames: [
    {
      template: "Last Monday, Jake was ___ in the school corridor because he was ___.",
      answers: ["running", "late for class"]
    },
    {
      template: "Suddenly, he ___ his knee on the ___ and ___ down hard.",
      answers: ["hit", "corner of a table", "fell"]
    },
    {
      template: "He ___ the glass cup that another student was holding and ___ ___ ___.",
      answers: ["broke", "felt terrible", "about it"]
    },
    {
      template: "His knee ___ a lot, but the nurse ___ a ___ ___ on it.",
      answers: ["hurt", "put", "cold pack"]
    },
    {
      template: "Jake ___ an important lesson: always ___ ___ in the corridor.",
      answers: ["learned", "walk carefully"]
    }
  ]
};
