export default {
  title: "The Creative Art Class",
  min_words: 40,
  min_sentences: 6,
  model_sentence: "Yesterday I had art class. First I picked up my brush. Then I dipped it in red paint. I painted a flower. It looked beautiful. My teacher clapped and said it was wonderful.",
  instruction_en: "Write a sequence story about your art class!",
  instruction_vi: "Viết một câu chuyện theo trình tự về giờ học mỹ thuật!",
  prompt_en: "What did you do first? Then? What did you make?",
  prompt_vi: "Đầu tiên bạn làm gì? Tiếp theo? Bạn làm ra gì?",
  keywords: ["art class", "picked up", "brush", "painted", "flower", "beautiful", "clapped"],
  topic_talk_prompt: "Tell me what you did in art class step by step!",
  sentence_frames: [
    {
      "template": "Yesterday I had ___ class.",
      "answers": ["art"]
    },
    {
      "template": "First I ___ my brush.",
      "answers": ["picked up"]
    },
    {
      "template": "Then I dipped it in ___ paint.",
      "answers": ["red"]
    },
    {
      "template": "I ___ a picture of a ___.",
      "answers": ["painted", "flower"]
    },
    {
      "template": "It looked ___.",
      "answers": ["beautiful"]
    },
    {
      "template": "My teacher ___ loudly and said it was ___.",
      "answers": ["clapped", "wonderful"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "art class", "vi": "lớp mỹ thuật", "distractor": false },
        { "word": "picked up", "vi": "nhặt lên", "distractor": false },
        { "word": "brush", "vi": "cọ vẽ", "distractor": false },
        { "word": "red paint", "vi": "sơn đỏ", "distractor": false },
        { "word": "painted", "vi": "vẽ", "distractor": false },
        { "word": "flower", "vi": "bông hoa", "distractor": false },
        { "word": "beautiful", "vi": "đẹp", "distractor": false },
        { "word": "wonderful", "vi": "tuyệt vời", "distractor": false },
        { "word": "maths class", "vi": "lớp toán", "distractor": true },
        { "word": "spoon", "vi": "thìa", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week23/story_writing_pic.jpg',
      image_prompt: "Last week, my class had a wonderful art project, and we worked together in small groups to create a beautiful model of a mystery house. We started the big project early in the morning, and everyone was very excited. First, my friend Peter designed the shape of the house on a large piece of white paper. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: ["art project","small groups","designed the shape","white paper","thick cardboard","folded carefully","glued the walls","painted the roof","wooden windows","mixed colors","small stones","fantastic job"],
      writing_prompts: {
        en: "Look at the picture. Your class built a model house together! Write about the art project step by step using words from the word bank.",
        vi: "Nhìn bức tranh. Lớp bạn đã cùng nhau làm mô hình ngôi nhà! Viết về dự án mỹ thuật từng bước dùng các từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        { "template": "First, ___", "answers": ["I started"] },
        { "template": "Then, ___", "answers": ["I painted"] },
        { "template": "After that, ___", "answers": ["I folded"] },
        { "template": "We also ___", "answers": ["cut shapes"] },
        { "template": "Finally, ___", "answers": ["I held it up"] }
      ]
    }
  }
}