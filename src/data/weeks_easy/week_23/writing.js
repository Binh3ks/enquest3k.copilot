export default {
  title: "My Art Class Story",
  min_words: 30,
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
  }
};
