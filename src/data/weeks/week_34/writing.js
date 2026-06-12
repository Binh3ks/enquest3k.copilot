// WEEK 34: STORYTELLING PRACTICE 1 — The Three Little Pigs' Projects
// Writing Station — Advanced Mode

export default {
  title: "The Three Little Pigs — Write Your Version",
  theme: "fable_and_moral",
  min_words: 65,
  min_sentences: 8,
  model_sentence: "The first pig was lazy and careless, so he built a weak house from light paper and soft cotton. The second pig worked harder and made his house with thin plastic and recycled wood. But the third pig, who was smart and hardworking, put heavy stones, strong metal, and thick glass together to build a powerful, safe house. When the hungry wolf came, he blew down the first two houses easily, but he could not destroy the strong stone walls. The three pigs locked the heavy metal door and sang a happy song while the tired wolf gave up and ran away forever!",
  topic_talk_prompt: "Tell me about a time when you worked hard with your friends to finish a project!",
  sentence_frames: [
    { "template": "The first pig ___", "answers": ["built a weak house"] },
    { "template": "The second pig ___", "answers": ["built a wooden house"] },
    { "template": "The third pig ___", "answers": ["built a strong house"] },
    { "template": "When the wolf came, ___", "answers": ["he blew two houses"] },
    { "template": "In the end, ___", "answers": ["the pigs were safe"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "lazy", "vi": "lười biếng", "distractor": false },
        { "word": "careless", "vi": "bất cẩn", "distractor": false },
        { "word": "weak", "vi": "yếu ớt", "distractor": false },
        { "word": "hardworking", "vi": "chăm chỉ", "distractor": false },
        { "word": "worked hard", "vi": "làm việc chăm chỉ", "distractor": false },
        { "word": "heavy stones", "vi": "đá nặng", "distractor": false },
        { "word": "strong metal", "vi": "kim loại chắc chắn", "distractor": false },
        { "word": "thick glass", "vi": "kính dày", "distractor": false },
        { "word": "blew down", "vi": "thổi sập", "distractor": false },
        { "word": "ran away", "vi": "chạy trốn", "distractor": false },
        { "word": "gave up", "vi": "từ bỏ", "distractor": false },
        { "word": "locked the door", "vi": "khóa cửa", "distractor": false },
        { "word": "sang a happy song", "vi": "hát bài hát vui", "distractor": false },
        { "word": "clapped loudly", "vi": "vỗ tay to", "distractor": false },
        { "word": "destroy", "vi": "phá hủy", "distractor": false },
        { "word": "pretty", "vi": "xinh", "distractor": true },
        { "word": "delicious", "vi": "ngon", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week34/story_writing_pic.jpg',
      image_prompt: "In our fun English storytelling class today, my group confidently presented the classic story of the Three Little Pigs, but we used all our new vocabulary to make the story special! The first pig was a very lazy and careless animal, so he quickly built a weak house using light paper and soft cotton. He did not work hard at all, and he just wanted to play. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["built a weak house","light paper","soft cotton","worked harder","thin plastic","recycled wood","heavy stones","strong metal","thick glass","blew down","ran as fast as they could","locked the heavy metal door","sang a happy song","gave up","clapped loudly"],
      sentence_frames: [
        { "template": "The first pig ___", "answers": ["built a weak house"] },
        { "template": "The second pig ___", "answers": ["built a wooden house"] },
        { "template": "The third pig ___", "answers": ["built a strong house"] },
        { "template": "When the wolf came, ___", "answers": ["he blew two houses"] },
        { "template": "In the end, ___", "answers": ["the pigs were safe"] }
      ],
      writing_prompts: {
        en: "Look at the picture. Tell the story of the Three Little Pigs. What did each pig build? What happened when the wolf came? Use 3+ phrases from the word bank.",
        vi: "Nhìn bức tranh và kể câu chuyện Ba Chú Lợn. Mỗi chú lợn xây nhà bằng gì? Điều gì xảy ra khi chó sói đến? Dùng 3+ cụm từ trong ngân hàng từ."
      },
      rubric_tier: 1
    }
  }
}