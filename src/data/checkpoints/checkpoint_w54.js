/**
 * Checkpoint W54 — End of A1+ Phase (YLE Movers mastery)
 * Tests: Vocabulary (W37-54, academic/topic vocab), Grammar (present perfect + past + modals),
 *        Reading (dual-source informational), Writing (structured argument)
 */
export default {
  week: 54,
  title: "Movers Mastery Checkpoint",
  badge: "🏅 Movers Master",

  vocab_test: {
    pass_threshold: 0.75,
    questions: [
      { q: "___ means the average weather conditions in an area.", options: ["Climate", "Weather", "Season", "Forecast"], answer: "Climate" },
      { q: "The scientist's ___ proved the theory was correct.", options: ["experiment", "opinion", "story", "question"], answer: "experiment" },
      { q: "The new law ___ the use of plastic bags.", options: ["banned", "encouraged", "started", "invented"], answer: "banned" },
      { q: "She showed great ___ when she didn't give up.", options: ["perseverance", "confusion", "laziness", "doubt"], answer: "perseverance" },
      { q: "The team found a ___ to the pollution problem.", options: ["solution", "problem", "argument", "disaster"], answer: "solution" },
      { q: "___ is the process of making products in factories.", options: ["Manufacturing", "Recycling", "Farming", "Exporting"], answer: "Manufacturing" },
      { q: "The judge made a fair ___.", options: ["decision", "discovery", "demand", "discussion"], answer: "decision" },
      { q: "___ species are those that can adapt easily to change.", options: ["Resilient", "Fragile", "Rare", "Extinct"], answer: "Resilient" },
      { q: "The ___ of the country depends on its natural resources.", options: ["economy", "population", "climate", "language"], answer: "economy" },
      { q: "She ___ her community by building a new school.", options: ["transformed", "ignored", "left", "damaged"], answer: "transformed" },
      { q: "___ means the way something is organised or built.", options: ["Structure", "Surface", "System", "Symbol"], answer: "Structure" },
      { q: "The disease ___ quickly through the town.", options: ["spread", "stopped", "grew", "improved"], answer: "spread" },
      { q: "He was ___ by the amazing view from the mountain.", options: ["captivated", "bored", "confused", "frightened"], answer: "captivated" },
      { q: "___ farming uses fewer chemicals and protects the land.", options: ["Sustainable", "Industrial", "Urban", "Modern"], answer: "Sustainable" },
      { q: "The government ___ new funds for education.", options: ["allocated", "removed", "ignored", "delayed"], answer: "allocated" },
      { q: "The team's ___ effort led to their victory.", options: ["collective", "individual", "failed", "ordinary"], answer: "collective" },
      { q: "___ means to put something into action.", options: ["Implement", "Observe", "Create", "Discuss"], answer: "Implement" },
      { q: "The bridge was ___ to support heavy vehicles.", options: ["reinforced", "removed", "painted", "built"], answer: "reinforced" },
      { q: "She made a ___ contribution to the project.", options: ["significant", "small", "ordinary", "boring"], answer: "significant" },
      { q: "___ means to officially say something is not allowed.", options: ["Prohibit", "Allow", "Encourage", "Require"], answer: "Prohibit" },
    ],
  },

  grammar_test: {
    pass_threshold: 0.70,
    questions: [
      { q: "By the time we arrived, the film ___ already started.", options: ["has", "have", "had", "was"], answer: "had" },
      { q: "She ___ been studying for three hours when the phone rang.", options: ["has", "have", "had", "was"], answer: "had" },
      { q: "Choose the correct sentence:", options: ["If I have time, I would help.", "If I had time, I would help.", "If I have time, I will help.", "If I had time, I will help."], answer: "If I have time, I will help." },
      { q: "You ___ wear a seatbelt in the car. It's the law.", options: ["should", "might", "could", "must"], answer: "must" },
      { q: "We ___ bring raincoats — it might rain.", options: ["must", "should", "will", "shall"], answer: "should" },
      { q: "She ___ speak French fluently by next year.", options: ["will be able to", "must", "used to", "would"], answer: "will be able to" },
      { q: "He ___ eaten dinner before he went out.", options: ["has", "had", "have", "was"], answer: "had" },
      { q: "Choose the correct sentence:", options: ["They might comes late.", "They might come late.", "They might came late.", "They might coming late."], answer: "They might come late." },
      { q: "I ___ to have a dog when I was young.", options: ["used", "would", "could", "should"], answer: "used" },
      { q: "The results ___ announced tomorrow.", options: ["will be", "are being", "were", "have been"], answer: "will be" },
      { q: "Choose the correct sentence:", options: ["He could swam when he was five.", "He could swim when he was five.", "He can swim when he was five.", "He could swimming when five."], answer: "He could swim when he was five." },
      { q: "By 2030, scientists hope they ___ a cure.", options: ["found", "have found", "will have found", "are finding"], answer: "will have found" },
      { q: "The homework ___ hand in by Friday.", options: ["must be", "should", "will", "has"], answer: "must be" },
      { q: "She ___ rather study than watch TV.", options: ["would", "used", "should", "might"], answer: "would" },
      { q: "Choose the correct sentence:", options: ["He don't have to go.", "He doesn't has to go.", "He doesn't have to go.", "He mustn't to go."], answer: "He doesn't have to go." },
    ],
  },

  reading: {
    pass_threshold: 0.70,
    passage: "Technology is changing the way we learn. In classrooms around the world, students now use tablets, interactive software, and online platforms to access information and practise skills. Supporters of educational technology argue that it makes learning more engaging and allows students to learn at their own pace. Critics, however, warn that too much screen time can reduce attention spans and reduce face-to-face social interaction. Research suggests that the most effective approach combines digital tools with traditional teaching methods, ensuring that students develop both technical skills and essential interpersonal abilities.",
    questions: [
      { q: "What is the main topic of the passage?", options: ["The history of computers", "How technology is changing education", "The problems with the internet", "How students use social media"], answer: "How technology is changing education" },
      { q: "What do supporters of educational technology claim?", options: ["It replaces teachers completely.", "It makes learning more engaging and allows self-paced learning.", "It is too expensive for most schools.", "It reduces screen time."], answer: "It makes learning more engaging and allows self-paced learning." },
      { q: "What concern do critics raise?", options: ["Technology is unreliable.", "Too much screen time reduces attention and social interaction.", "Students prefer books to tablets.", "Technology makes tests harder."], answer: "Too much screen time reduces attention and social interaction." },
      { q: "What does research suggest is the best approach?", options: ["Using only digital tools", "Using only traditional methods", "Combining digital tools with traditional teaching", "Reducing the use of technology"], answer: "Combining digital tools with traditional teaching" },
      { q: "What does the word 'interpersonal' most likely mean?", options: ["Relating to computers", "Relating to relationships between people", "Relating to academic study", "Relating to internet skills"], answer: "Relating to relationships between people" },
      { q: "Which of the following best summarises the passage?", options: ["Technology is harmful and should not be used in schools.", "Technology is perfect for all types of learning.", "Technology has benefits and risks; a balanced approach is best.", "Students learn better without technology."], answer: "Technology has benefits and risks; a balanced approach is best." },
    ],
  },

  writing: {
    prompt: "Write a structured paragraph (5-7 sentences) arguing for OR against this statement: 'Technology makes students smarter.' Include: a clear position, two supporting reasons with examples, and a conclusion.",
    rubric_threshold: 8,
    min_words: 40,
    hint: "Structure: Position → Reason 1 + example → Reason 2 + example → Conclusion. Use: I believe..., For example..., Furthermore..., In conclusion...",
  },
};
