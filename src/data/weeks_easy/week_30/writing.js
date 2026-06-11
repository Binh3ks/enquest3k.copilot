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
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week30/story_writing_pic.jpg',
      image_prompt: "On a beautiful, breezy Sunday morning, my family woke up early, packed our heavy bags, and prepared for a wonderful picnic in the quiet, green countryside. We drove our car for an hour and finally found a perfect, grassy spot near a small river. My father is an intelligent engineer, and he carefully built a strong wooden shelter for us in case the weather suddenly turned bad. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["picnic","bread","fruit","blanket","cheese","lemonade","bird"],
      writing_prompts: {
        en: "Look at the picture. Who can you see? Where are they? What are they doing? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ ở đâu? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 2
    }
  }
}