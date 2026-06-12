export default {
  title: "Live from the School Festival",
  min_words: 50,
  min_sentences: 8,
  instruction_en: "Write about the school festival using the present continuous tense!",
  instruction_vi: "Viết về ngày hội trường học dùng thì hiện tại tiếp diễn!",
  prompt_en: "What clubs can you see? What are they doing right now? Who is watching?",
  prompt_vi: "Bạn thấy câu lạc bộ nào? Họ đang làm gì lúc này? Ai đang xem?",
  topic_talk_prompt: "Tell the class about a school festival or fair you attended!",
  vocabulary_bank: [
    "broadcasting live",
    "school courtyard",
    "annual Spring Festival",
    "exciting activities",
    "painting a giant mural",
    "using bright paints",
    "creating an ocean scene",
    "watching them carefully",
    "mixing mysterious liquids",
    "changing color",
    "practicing for their play",
    "speaking loudly",
    "clapping happily",
    "smiling and chatting"
  ],
  sentence_frames: [
    {
      "template": "I am broadcasting live from the busy ___ ___! The annual Spring Festival is ___.",
      "answers": ["school courtyard", "happening"]
    },
    {
      "template": "At the Art Club booth, students are ___ a giant ___ on the wall.",
      "answers": ["painting", "colorful mural"]
    },
    {
      "template": "They are using bright ___ and blue paints to ___ an ocean scene.",
      "answers": ["yellow", "create"]
    },
    {
      "template": "Meanwhile, the Science Club is doing a fascinating ___ ___. Sarah is ___ two mysterious liquids.",
      "answers": ["chemistry experiment", "mixing"]
    },
    {
      "template": "The liquid is changing ___ from clear to dark ___. Everyone is gasping!",
      "answers": ["color", "purple"]
    },
    {
      "template": "On the other side, the Drama Club is ___ for their upcoming school ___.",
      "answers": ["practicing", "play"]
    },
    {
      "template": "A group of teachers is sitting on the grass, ___ happily for the young ___.",
      "answers": ["clapping", "actors"]
    },
    {
      "template": "Everywhere I look, people are ___ and ___ this wonderful day!",
      "answers": ["smiling", "enjoying"]
    }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week18/story_writing_pic.jpg',
      image_prompt: "A colorful school festival in a busy courtyard. Students are painting a giant mural at the Art Club booth, a girl with safety glasses is mixing liquids at the Science Club, and Drama Club students are acting on a small stage. Teachers and students are watching and clapping. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "broadcasting live",
        "annual Spring Festival",
        "exciting activities",
        "painting a giant mural",
        "using bright paints",
        "creating an ocean scene",
        "mixing mysterious liquids",
        "changing color",
        "practicing for their play",
        "speaking loudly",
        "clapping happily",
        "smiling and chatting",
        "reporting all these fantastic events",
        "the atmosphere is amazing"
      ],
      writing_prompts: {
        en: "Look at the picture. You are a student reporter at the school festival. What clubs can you see? What are the students doing right now? Describe at least THREE different activities using present continuous tense.",
        vi: "Nhìn bức tranh. Bạn là phóng viên học sinh tại ngày hội trường. Bạn thấy câu lạc bộ nào? Học sinh đang làm gì lúc này? Mô tả ít nhất BA hoạt động khác nhau dùng thì hiện tại tiếp diễn."
      },
      rubric_tier: 1,
      sentence_frames: [
        {
          "template": "I am ___ ___ from the busy school ___. The Spring Festival is ___!",
          "answers": ["broadcasting live", "courtyard", "happening"]
        },
        {
          "template": "At the Art Club, students are ___ a giant ___ on the wall.",
          "answers": ["painting", "colorful mural"]
        },
        {
          "template": "Sarah is ___ two mysterious liquids in a small ___ ___.",
          "answers": ["mixing", "glass tube"]
        },
        {
          "template": "The Drama Club is ___ for their upcoming school ___. They are ___ loudly.",
          "answers": ["practicing", "play", "acting"]
        },
        {
          "template": "Teachers are ___ ___ for the young ___. Everyone is ___ and ___!",
          "answers": ["sitting on the grass", "actors", "smiling", "chatting"]
        }
      ]
    }
  }
};
