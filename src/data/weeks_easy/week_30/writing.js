export default {
  title: "My Picnic Story",
  min_words: 32,
  model_sentence: "Last Sunday my family had a picnic at the park. Mum bought bread, fruit, cheese, and lemonade. We spread a colorful blanket on the green grass near the pond. We ate sandwiches, played games, and laughed at funny stories. A little bird hopped close to our crumbs and made us smile. In the afternoon the sun was warm and the breeze was gentle. We packed everything away and walked home feeling happy.",
  instruction_en: "Write a detailed picnic story with rich language!",
  instruction_vi: "Viết một câu chuyện dã ngoại chi tiết với ngôn ngữ phong phú!",
  prompt_en: "Where did you go? What did you bring? What did you do? How did it feel?",
  prompt_vi: "Bạn đi đâu? Bạn mang gì? Bạn làm gì? Cảm giác thế nào?",
  keywords: ["picnic", "bread", "fruit", "blanket", "cheese", "lemonade", "bird", "grass", "sunny", "happy"],
  topic_talk_prompt: "Tell me about a nice picnic you had in at least five sentences.",
  sentence_frames: [
    { template: "Last Sunday my family had a ___ at the park.", answers: ["picnic"] },
    { template: "Mum bought ___, ___, and ___.", answers: ["bread", "fruit", "cheese"] },
    { template: "We spread a ___ on the ___.", answers: ["blanket", "grass"] },
    { template: "A little ___ hopped close to our ___.", answers: ["bird", "crumbs"] },
    { template: "The sun was ___ and the breeze was ___.", answers: ["warm", "gentle"] },
    { template: "We packed everything away and walked home feeling ___.", answers: ["happy"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { word: "picnic", vi: "dã ngoại", distractor: false },
        { word: "bread", vi: "bánh mì", distractor: false },
        { word: "fruit", vi: "trái cây", distractor: false },
        { word: "blanket", vi: "tấm chăn", distractor: false },
        { word: "cheese", vi: "phô mai", distractor: false },
        { word: "lemonade", vi: "nước chanh", distractor: false },
        { word: "bird", vi: "chim", distractor: false }
      ]
    }
  }
};
