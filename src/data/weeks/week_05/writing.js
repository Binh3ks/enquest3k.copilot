export default {
  title: "The Mystery House",
  min_words: 45,
  model_sentence: "There is a big mystery house on the hill. Nobody knows what is inside. One day, I open the door slowly. Upstairs, there is a nice bedroom. I see a lamp on the table and a mirror on the wall. The room has a rug on the floor. Downstairs, I find the living room. There is a big sofa and many shelves with books. In the kitchen, I open the cabinet carefully and look in the fridge. There is food and drinks inside! This mystery house has beautiful furniture. Now it is my new home.",
  instruction_en: "Describe your house room by room with full details!",
  instruction_vi: "Mô tả từng phòng trong nhà bạn với đầy đủ chi tiết!",
  prompt_en: "What rooms are there? What is in each room? Which room is your favorite and why?",
  prompt_vi: "Có những phòng nào? Mỗi phòng có gì? Phòng yêu thích của bạn là gì và tại sao?",
  keywords: ["mystery house", "on the hill", "open the door slowly", "nice bedroom", "lamp on the table", "mirror on the wall", "rug on the floor", "living room", "big sofa", "shelves with books", "open the cabinet carefully", "beautiful furniture", "new home"],
  topic_talk_prompt: "Describe your house and your favorite room!",
  sentence_frames: [
    {
      "template": "There is a ___ on the ___. Nobody knows what is inside.",
      "answers": ["mystery house", "hill"]
    },
    {
      "template": "One day, I ___ the door ___. Upstairs, there is a ___.",
      "answers": ["open", "slowly", "nice bedroom"]
    },
    {
      "template": "I see a ___ on the table and a ___ on the wall.",
      "answers": ["lamp", "mirror"]
    },
    {
      "template": "The room has a ___ on the floor.",
      "answers": ["rug"]
    },
    {
      "template": "Downstairs, I find the ___. There is a ___ and many ___ with books.",
      "answers": ["living room", "big sofa", "shelves"]
    },
    {
      "template": "In the kitchen, I ___ the cabinet ___ and look in the fridge.",
      "answers": ["open", "carefully"]
    },
    {
      "template": "There is food and drinks inside the fridge.",
      "answers": ["food and drinks"]
    },
    {
      "template": "This mystery house has ___ furniture. Now it is my ___. ",
      "answers": ["beautiful", "new home"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "low",
      words: [
        { "word": "mystery house", "vi": "ngôi nhà bí ẩn", "distractor": false },
        { "word": "hill", "vi": "đồi", "distractor": false },
        { "word": "open slowly", "vi": "mở từ từ", "distractor": false },
        { "word": "nice bedroom", "vi": "phòng ngủ đẹp", "distractor": false },
        { "word": "lamp", "vi": "đèn", "distractor": false },
        { "word": "mirror", "vi": "gương", "distractor": false },
        { "word": "rug", "vi": "thảm", "distractor": false },
        { "word": "living room", "vi": "phòng khách", "distractor": false },
        { "word": "big sofa", "vi": "ghế sofa lớn", "distractor": false },
        { "word": "shelves", "vi": "kệ", "distractor": false },
        { "word": "open carefully", "vi": "mở cẩn thận", "distractor": false },
        { "word": "food and drinks", "vi": "thức ăn và đồ uống", "distractor": false },
        { "word": "beautiful furniture", "vi": "đồ đạc đẹp", "distractor": false },
        { "word": "new home", "vi": "ngôi nhà mới", "distractor": false },
        { "word": "broken door", "vi": "cửa bị hỏng", "distractor": true },
        { "word": "noisy and crowded", "vi": "ồn ào và đông đúc", "distractor": true },
        { "word": "old and dirty", "vi": "cũ và bẩn", "distractor": true }
      ]
    }
  }
};
