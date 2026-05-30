export default {
  title: "The Mystery House",
  min_words: 30,
  model_sentence: "My name is Tim. I live in a house. My house has many rooms. I sleep in my bedroom. I have a soft bed in my bedroom. I eat in the kitchen. I sit on a chair at the table. I wash my hands in the bathroom. I watch TV in the living room every evening. I like to explore every room. Every room in my house is fun. I love my house!",
  instruction_en: "Write about your house and what you do in each room!",
  instruction_vi: "Viết về ngôi nhà của bạn và bạn làm gì ở mỗi phòng!",
  prompt_en: "What rooms does your house have? What do you do in each room?",
  prompt_vi: "Nhà bạn có những phòng nào? Bạn làm gì ở mỗi phòng?",
  keywords: ["live in a house", "many rooms", "sleep in my bedroom", "soft bed", "eat in the kitchen", "sit on a chair", "at the table", "wash my hands", "in the bathroom", "watch TV", "in the living room", "every evening", "explore every room", "love my house"],
  topic_talk_prompt: "Describe your house and rooms!",
  sentence_frames: [
    {
      "template": "My name is ___. I ___ in a house.",
      "answers": ["Tim", "live"]
    },
    {
      "template": "My house has ___ rooms.",
      "answers": ["many"]
    },
    {
      "template": "I sleep in my ___. I have a soft ___.",
      "answers": ["bedroom", "bed"]
    },
    {
      "template": "I eat in the ___. I sit on a chair ___ the table.",
      "answers": ["kitchen", "at"]
    },
    {
      "template": "I ___ my hands in the ___.",
      "answers": ["wash", "bathroom"]
    },
    {
      "template": "I watch TV in the ___ every evening. I love my house!",
      "answers": ["living room"]
    }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: true,
      scaffolding_stage: "high",
      words: [
        { "word": "Tim", "vi": "", "distractor": false },
        { "word": "live", "vi": "sống", "distractor": false },
        { "word": "many", "vi": "nhiều", "distractor": false },
        { "word": "bedroom", "vi": "phòng ngủ", "distractor": false },
        { "word": "bed", "vi": "giường", "distractor": false },
        { "word": "kitchen", "vi": "nhà bếp", "distractor": false },
        { "word": "at", "vi": "ở", "distractor": false },
        { "word": "wash", "vi": "rửa", "distractor": false },
        { "word": "bathroom", "vi": "phòng tắm", "distractor": false },
        { "word": "living room", "vi": "phòng khách", "distractor": false },
        { "word": "garage", "vi": "nhà để xe", "distractor": true },
        { "word": "hate", "vi": "ghét", "distractor": true },
        { "word": "pool", "vi": "bể bơi", "distractor": true }
      ]
    }
  }
};
