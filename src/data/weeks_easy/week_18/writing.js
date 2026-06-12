export default {
  title: "A Funny Rainy Day",
  min_words: 35,
  min_sentences: 6,
  instruction_en: "Write about a funny rainy day!",
  instruction_vi: "Viết về một ngày mưa vui nhộn!",
  prompt_en: "What happened when you got caught in the rain? What were you wearing?",
  prompt_vi: "Chuyện gì xảy ra khi bạn bị mắc kẹt trong mưa? Bạn đang mặc gì?",
  topic_talk_prompt: "Tell the class about a funny rainy day!",
  show_by_default: true,
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "caught in the rain",
    "started pouring down",
    "wearing the wrong clothes",
    "getting completely muddy",
    "splashing through puddles",
    "running for shelter",
    "soaking wet but laughing",
    "check the weather first"
  ],
  sentence_frames: [
    {
      "template": "I am walking to school. Suddenly, it ___ ___ ___ ___!",
      "answers": ["started pouring down"]
    },
    {
      "template": "I am ___ ___ ___ because I am wearing the wrong clothes.",
      "answers": ["caught in the rain"]
    },
    {
      "template": "I am ___ through puddles. My shoes are ___ ___!",
      "answers": ["splashing", "getting muddy"]
    },
    {
      "template": "I am ___ ___ ___ ___ the rain is getting heavier.",
      "answers": ["running for shelter"]
    },
    {
      "template": "I am ___ ___ ___ ___ but I am ___ ___.",
      "answers": ["soaking wet but laughing"]
    },
    {
      "template": "Next time, I will ___ the weather first!",
      "answers": ["check"]
    }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week18/story_writing_pic.jpg',
      image_prompt: "A funny scene of a child caught in heavy rain on the way to school. The child is wearing the wrong clothes — no raincoat, no umbrella. The child is splashing through big puddles, getting completely muddy, but laughing at the same time. Other children are running for shelter. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "caught in the rain",
        "started pouring down",
        "wearing the wrong clothes",
        "getting completely muddy",
        "splashing through puddles",
        "running for shelter",
        "soaking wet but laughing",
        "check the weather first"
      ],
      writing_prompts: {
        en: "Look at the picture. Who can you see? What is happening? Why is it funny? Use 3+ words from the word bank to describe the scene.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Điều gì đang xảy ra? Tại sao nó buồn cười? Dùng 3+ từ trong ngân hàng từ để mô tả."
      },
      rubric_tier: 1,
      sentence_frames: [
        {
          "template": "The child is ___ ___ ___ ___ because it started pouring down.",
          "answers": ["caught in the rain"]
        },
        {
          "template": "The child is ___ ___ ___ ___ and ___ ___ ___ ___.",
          "answers": ["splashing through puddles", "getting completely muddy"]
        },
        {
          "template": "The child is ___ ___ ___ ___, so the children are ___ ___ ___ ___.",
          "answers": ["soaking wet but laughing", "running for shelter"]
        }
      ]
    }
  }
}
