export default {
  title: "The Live Reporter",
  min_words: 45,
  instruction_en: "Write a live news broadcast using the present continuous tense!",
  instruction_vi: "Viết bản tin trực tiếp dùng thì hiện tại tiếp diễn!",
  prompt_en: "Where are you reporting from? What is everyone doing right now?",
  prompt_vi: "Bạn đang phát sóng từ đâu? Mỗi người đang làm gì lúc này?",
  topic_talk_prompt: "Give a live broadcast from your classroom — what is everyone doing?",
  sentence_frames: [
    {
      "template": "Welcome to the **live morning news** from Room 5! I am your reporter today.",
      "answers": [
        "live morning news"
      ]
    },
    {
      "template": "I **pick up a toy microphone** and **stand next to a toy camera**. The classroom is now a studio!",
      "answers": [
        "pick up a toy microphone",
        "stand next to a toy camera"
      ]
    },
    {
      "template": "I **speak warmly into** the microphone and **turn to the camera** and smile.",
      "answers": [
        "speak warmly into",
        "turn to the camera"
      ]
    },
    {
      "template": "I can see Tom **drawing a rocket** and Sara **reading quietly at** her desk.",
      "answers": [
        "drawing a rocket",
        "reading quietly at"
      ]
    },
    {
      "template": "Mr. Lee **writes on the board** and the class hamster **eats a carrot**.",
      "answers": [
        "writes on the board",
        "eats a carrot"
      ]
    },
    {
      "template": "I **walk to my friend** Maya and **ask if I can interview her**. She says yes!",
      "answers": [
        "walk to my friend",
        "ask if I can interview her"
      ]
    },
    {
      "template": "Maya says she is writing a report about ocean animals. This is **what is happening** in Room 5!",
      "answers": [
        "what is happening"
      ]
    },
    {
      "template": "I **turn back to the camera** and say, 'There you have it, audience! A **live report from** Room 5!'",
      "answers": [
        "turn back to the camera",
        "live report from"
      ]
    }
  ],
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "live morning news",
    "pick up a toy microphone",
    "stand next to a toy camera",
    "speak warmly into",
    "turn to the camera",
    "drawing a rocket",
    "reading quietly at",
    "writes on the board",
    "eats a carrot",
    "walk to my friend",
    "ask if I can interview her",
    "what is happening",
    "turn back to the camera",
    "live report from"
  ],
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week18/story_writing_pic.jpg",
      image_prompt: "Students reporting live from the school festival.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. Who can you see? What are they doing? Use 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Bạn thấy ai? Họ đang làm gì? Dùng 3+ từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      min_sentences: 8,
      sentence_frames: [
        { "template": "First, ___" },
        { "template": "Then, ___" },
        { "template": "After that, ___" },
        { "template": "Finally, ___" }
      ]
    }
  }
}
