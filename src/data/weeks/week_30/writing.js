export default {
  title: "My Picnic Story",
  min_words: 65,
  min_sentences: 8,
  model_sentence: "Last Sunday my family had the most wonderful outdoor picnic in the large park at the end of our street, and the warm sunny weather made everything feel absolutely perfect. My mum had spent Saturday afternoon preparing all the food, which included soft white bread rolls, slices of cheddar cheese, cold roast chicken, fresh grapes and strawberries, and a large bottle of homemade lemonade that she had chilled overnight. We found a perfect spot under a wide spreading oak tree near the duck pond and spread two large blankets on the cool soft grass. We spent the afternoon eating, chatting, and laughing at funny stories from when my parents were young, and my younger brother kept trying to steal extra strawberries when he thought nobody was looking. At one point, a group of sparrows flew down and pecked at our breadcrumbs, which made everyone laugh. As the sun began to set and the air grew cooler, we packed everything into our baskets and walked home slowly, full of good food and happy memories.",
  instruction_en: "Write a detailed picnic story from start to finish using vivid language!",
  instruction_vi: "Vi\u1ebft c\u00e2u chuy\u1ec7n d\u00e3 ngo\u1ea1i chi ti\u1ebft t\u1eeb \u0111\u1ea7u \u0111\u1ebfn cu\u1ed1i b\u1eb1ng ng\u00f4n ng\u1eef sinh \u0111\u1ed9ng!",
  prompt_en: "What food did you bring? What happened during the picnic? How did the day end?",
  prompt_vi: "B\u1ea1n mang th\u1ee9c \u0103n g\u00ec? Chuy\u1ec7n g\u00ec x\u1ea3y ra trong chuy\u1ebfn d\u00e3 ngo\u1ea1i? Ng\u00e0y k\u1ebft th\u00fac th\u1ebf n\u00e0o?",
  keywords: ["lemonade", "chilled", "spreading", "breadcrumbs", "sparrows", "pecked", "baskets", "memories"],
  topic_talk_prompt: "Tell me everything about your perfect picnic day!",
  sentence_frames: [
    {"template":"Last Sunday, my family had a ___", "answers": ["picnic"]},
    {"template":"We went to a ___", "answers": ["perfect grassy spot"]},
    {"template":"Mum brought ___", "answers": ["tasty chicken sandwiches"]},
    {"template":"We also had ___", "answers": ["sweet cold lemonade"]},
    {"template":"We sat on ___", "answers": ["soft green grass"]},
    {"template":"Then dark grey ___", "answers": ["clouds appeared"]},
    {"template":"We ran fast under the ___", "answers": ["shelter"]},
    {"template":"It was a wonderful ___", "answers": ["picnic"]}
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "woke up early", "vi": "thức dậy sớm", "distractor": false },
        { "word": "prepared for a picnic", "vi": "chuẩn bị cho buổi dã ngoại", "distractor": false },
        { "word": "perfect grassy spot", "vi": "một chỗ cỏ đẹp hoàn hảo", "distractor": false },
        { "word": "strong wooden shelter", "vi": "nơi trú ẩn bằng gỗ chắc chắn", "distractor": false },
        { "word": "intelligent engineer", "vi": "kỹ sư thông minh", "distractor": false },
        { "word": "tasty chicken sandwiches", "vi": "bánh mì kẹp gà ngon", "distractor": false },
        { "word": "sweet cold lemonade", "vi": "nước chanh ngọt lạnh", "distractor": false },
        { "word": "beautiful flower crown", "vi": "vòng hoa đẹp", "distractor": false },
        { "word": "soft green grass", "vi": "cỏ mềm xanh", "distractor": false },
        { "word": "ate our delicious sandwiches", "vi": "ăn bánh mì ngon", "distractor": false },
        { "word": "drank the lemonade joyfully", "vi": "uống nước chanh vui vẻ", "distractor": false },
        { "word": "dark grey clouds", "vi": "mây xám đen", "distractor": false },
        { "word": "heavy rain", "vi": "mưa lớn", "distractor": false },
        { "word": "ran fast under the shelter", "vi": "chạy nhanh vào nơi trú ẩn", "distractor": false },
        { "word": "wonderful picnic", "vi": "buổi dã ngoại tuyệt vời", "distractor": false },
        { "word": "spicy noodles", "vi": "mì cay", "distractor": true },
        { "word": "empty parking lot", "vi": "bãi đậu xe trống", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week30/story_writing_pic.jpg',
      image_prompt: "On a beautiful, breezy Sunday morning, my family woke up early, packed our heavy bags, and prepared for a wonderful picnic in the quiet, green countryside. We drove our car for an hour and finally found a perfect, grassy spot near a small river. My father is an intelligent engineer, and he carefully built a strong wooden shelter for us in case the weather suddenly turned bad. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["woke up early", "prepared for a picnic", "perfect grassy spot", "strong wooden shelter", "intelligent engineer", "tasty chicken sandwiches", "sweet cold lemonade", "beautiful flower crown", "soft green grass", "ate our delicious sandwiches", "drank the lemonade joyfully", "dark grey clouds", "heavy rain", "ran fast under the shelter", "wonderful picnic"],
      sentence_frames: [
        {"template": "Last Sunday, my family had a ___", "answers": ["picnic"]},
        {"template": "We went to a ___", "answers": ["perfect grassy spot"]},
        {"template": "Mum brought ___", "answers": ["tasty chicken sandwiches"]},
        {"template": "We also had ___", "answers": ["sweet cold lemonade"]},
        {"template": "We sat on ___", "answers": ["soft green grass"]},
        {"template": "Then dark grey ___", "answers": ["clouds appeared"]},
        {"template": "We ran fast under the ___", "answers": ["shelter"]},
        {"template": "It was a wonderful ___", "answers": ["picnic"]}
      ],
      writing_prompts: {
        en: "Look at the picture. Imagine your family picnic. What food did you prepare? Describe a sudden surprise that happened during the picnic. How did you stay dry? Use words from the word bank!",
        vi: "Nhìn bức tranh. Tưởng tượng buổi dã ngoại của gia đình bạn. Bạn chuẩn bị gì? Mô tả một bất ngờ xảy ra trong buổi dã ngoại. Bạn trú ướt thế nào? Dùng từ trong ngân hàng từ nhé!"
      },
      rubric_tier: 1,
      min_sentences: 8
    }
  }
}