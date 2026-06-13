export default {
  title: "The Live Reporter",
  min_words: 30,
  instruction_en: "Write a live news report from your classroom!",
  instruction_vi: "Viết bản tin trực tiếp từ lớp học của bạn!",
  prompt_en: "What is everyone doing in your classroom right now?",
  prompt_vi: "Mỗi người trong lớp đang làm gì lúc này?",
  topic_talk_prompt: "Report the news from your classroom!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "Welcome to the **live morning news**!",
      "answers": [
        "live morning news"
      ]
    },
    {
      "template": "I am the ___. I pick up the microphone.",
      "answers": [
        "reporter"
      ]
    },
    {
      "template": "Tom is ___ a rocket.",
      "answers": [
        "drawing"
      ]
    },
    {
      "template": "Sara is ___ at her desk.",
      "answers": [
        "reading quietly"
      ]
    },
    {
      "template": "I **walk to my friend** Maya. I **ask if I can interview her**.",
      "answers": [
        "walk to my friend",
        "ask if I can interview her"
      ]
    },
    {
      "template": "Maya says she is writing a report. This is **what is happening** right now!",
      "answers": [
        "what is happening"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "live morning news",
    "reporter",
    "drawing",
    "reading quietly",
    "walk to my friend",
    "ask if I can interview her",
    "what is happening"
  ]
,
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week18/story_writing_pic.jpg",
      image_prompt: "A simple picture for week 18 story writing.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Write simply.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết đơn giản."
      },
      rubric_tier: 1,
      min_sentences: 6,
      sentence_frames: [
        {"template": "At the Art Club, ___", "answers": ["students are painting"]},
        {"template": "At the Science Club, ___", "answers": ["a girl mixes liquids"]},
        {"template": "At the Drama Club, ___", "answers": ["students are acting"]},
        {"template": "Everywhere I look, ___", "answers": ["people are smiling"]}
      ]
    }
  }
}
