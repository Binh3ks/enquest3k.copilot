export default {
  title: "My Art Class Story",
  min_words: 45,
  model_sentence: "Yesterday, Mia arrived at art class and picked up her brush. She dipped her brush into red pigment and painted a picture of red flowers. Mia colored carefully the flowers in her picture using blue and yellow. Then she folded carefully a sheet of paper into a butterfly shape. Both wings were the same — perfect symmetry! She used the scissors to cut shapes carefully from green paper. Mia glued the leaves around her picture to create a beautiful border. She pressed carefully each piece to check the texture of the paper. Finally, Mia held up proudly the picture she had worked so hard to create. The teacher clapped loudly and said the picture had wonderful texture, bright pigment, and beautiful symmetry.",
  instruction_en: "Write a step-by-step art class story using first, next, then, and finally!",
  instruction_vi: "Viết câu chuyện mỹ thuật theo từng bước dùng first, next, then, finally!",
  prompt_en: "What did you paint? What steps did you follow? How did you feel at the end?",
  prompt_vi: "Bạn vẽ gì? Bạn đã làm theo những bước nào? Cuối cùng bạn cảm thấy thế nào?",
  keywords: ["picked up", "painted a picture", "colored carefully", "folded carefully", "cut shapes", "glued", "pressed carefully", "held up proudly"],
  topic_talk_prompt: "Describe your art class step by step — what did you make and how did it turn out?",
  sentence_frames: [
    {
      "template": "Yesterday I arrived at art class and ___ my ___.",
      "answers": ["picked up", "brush"]
    },
    {
      "template": "I ___ my brush into ___ pigment and ___ a picture of ___.",
      "answers": ["dipped", "bright red", "painted", "red flowers"]
    },
    {
      "template": "Then I ___ a sheet of paper into a butterfly shape and ___ both wings carefully.",
      "answers": ["folded", "studied"]
    },
    {
      "template": "I ___ the scissors to ___ ___ from green paper.",
      "answers": ["used", "cut shapes"]
    },
    {
      "template": "I ___ the leaves around my picture to create a beautiful ___.",
      "answers": ["glued", "border"]
    },
    {
      "template": "I ___ ___ each piece to check the texture of the paper.",
      "answers": ["pressed carefully"]
    },
    {
      "template": "Finally, I ___ ___ the picture I had worked so hard to create.",
      "answers": ["held up proudly"]
    },
    {
      "template": "The teacher ___ ___ and said my picture had wonderful ___ and beautiful ___.",
      "answers": ["clapped loudly", "texture", "symmetry"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "picked up", "vi": "nhặt lên", "distractor": false },
        { "word": "brush", "vi": "cọ vẽ", "distractor": false },
        { "word": "dipped", "vi": "nhúng", "distractor": false },
        { "word": "bright red pigment", "vi": "màu đỏ sáng", "distractor": false },
        { "word": "painted a picture", "vi": "vẽ một bức tranh", "distractor": false },
        { "word": "red flowers", "vi": "hoa đỏ", "distractor": false },
        { "word": "folded", "vi": "gấp", "distractor": false },
        { "word": "studied both wings", "vi": "quan sát hai cánh", "distractor": false },
        { "word": "used the scissors", "vi": "dùng kéo", "distractor": false },
        { "word": "cut shapes", "vi": "cắt hình", "distractor": false },
        { "word": "glued", "vi": "dán", "distractor": false },
        { "word": "border", "vi": "viền tranh", "distractor": false },
        { "word": "pressed carefully", "vi": "ấn cẩn thận", "distractor": false },
        { "word": "held up proudly", "vi": "giơ lên tự hào", "distractor": false },
        { "word": "clapped loudly", "vi": "vỗ tay lớn", "distractor": false },
        { "word": "texture", "vi": "kết cấu bề mặt", "distractor": false },
        { "word": "symmetry", "vi": "đối xứng", "distractor": false },
        { "word": "a dirty plate", "vi": "đĩa bẩn", "distractor": true },
        { "word": "threw away", "vi": "ném đi", "distractor": true }
      ]
    }
  }
};
