export default {
  title: "My Weekend Story",
  min_words: 30,
  model_sentence: "It was Sunday afternoon and Leo sat down to create a comic strip. First he wrote the title. In Panel One he drew himself walking to the park. In Panel Two Max chased a ball. In Panel Three they watched a street musician. In Panel Four they walked home tired but happy. It was a perfect day!",
  instruction_en: "Write your weekend story in order, like a four-panel comic strip!",
  instruction_vi: "Viết câu chuyện cuối tuần theo thứ tự như một dải truyện tranh bốn khung!",
  prompt_en: "Where did you go? What did you do first? Then? At the end?",
  prompt_vi: "Bạn đã đi đâu? Đầu tiên làm gì? Tiếp theo? Cuối cùng thế nào?",
  keywords: ["comic strip", "title", "panel", "walked", "park", "chased", "watched", "tired", "happy"],
  topic_talk_prompt: "Tell me about your last weekend like a four-panel story!",
  sentence_frames: [
    {
      "template": "Leo sat down to ___ a comic ___.",
      "answers": ["create", "strip"]
    },
    {
      "template": "First he ___ the title.",
      "answers": ["wrote"]
    },
    {
      "template": "In Panel One he drew himself ___ to the ___.",
      "answers": ["walking", "park"]
    },
    {
      "template": "In Panel Two Max ___ a ball.",
      "answers": ["chased"]
    },
    {
      "template": "In Panel Three they ___ a street ___.",
      "answers": ["watched", "musician"]
    },
    {
      "template": "In Panel Four they ___ home ___ but ___.",
      "answers": ["walked", "tired", "happy"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "low",
      words: [
        { "word": "create a comic strip", "vi": "tạo dải truyện tranh", "distractor": false },
        { "word": "wrote the title", "vi": "viết tiêu đề", "distractor": false },
        { "word": "walking to the park", "vi": "đi bộ đến công viên", "distractor": false },
        { "word": "chased a ball", "vi": "đuổi bóng", "distractor": false },
        { "word": "watched a street musician", "vi": "xem nhạc sĩ đường phố", "distractor": false },
        { "word": "walked home tired but happy", "vi": "đi bộ về nhà mệt nhưng vui", "distractor": false },
        { "word": "airport", "vi": "sân bay", "distractor": true },
        { "word": "threw away", "vi": "ném đi", "distractor": true }
      ]
    }
  }
,
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week26/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 26 story writing.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "On Saturday, ___", "answers": ["I played soccer"]},
        {"template": "In the afternoon, ___", "answers": ["it rained"]},
        {"template": "On Sunday, ___", "answers": ["we went to the museum"]},
        {"template": "At the end, ___", "answers": ["we had a great time"]}
      ]
    }
  }
}
