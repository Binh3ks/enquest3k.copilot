export default {
  title: "Live from the School Festival",
  min_words: 35,
  min_sentences: 6,
  instruction_en: "Write about the school festival using the present continuous tense!",
  instruction_vi: "Viết về ngày hội trường học dùng thì hiện tại tiếp diễn!",
  prompt_en: "What can you see at the festival? What are the students doing right now?",
  prompt_vi: "Bạn thấy gì ở ngày hội? Học sinh đang làm gì lúc này?",
  topic_talk_prompt: "Tell the class about a school festival you attended!",
  show_by_default: true,
  scaffolding_stage: "medium",
  vocabulary_bank: [
    "broadcasting live",
    "school courtyard",
    "painting a giant mural",
    "using bright paints",
    "mixing mysterious liquids",
    "changing color",
    "practicing for their play",
    "speaking loudly",
    "clapping happily",
    "smiling and chatting"
  ],
  sentence_frames: [
    {
      "template": "I am ___ ___ from the school ___.",
      "answers": ["broadcasting live", "courtyard"]
    },
    {
      "template": "Students are ___ a giant ___ on the wall.",
      "answers": ["painting", "mural"]
    },
    {
      "template": "Sarah is ___ two liquids in a small ___.",
      "answers": ["mixing", "tube"]
    },
    {
      "template": "The Drama Club is ___ for their school ___.",
      "answers": ["practicing", "play"]
    },
    {
      "template": "Teachers are ___ ___ for the young ___.",
      "answers": ["clapping happily", "actors"]
    },
    {
      "template": "Everyone is ___ and ___ this wonderful day!",
      "answers": ["smiling", "chatting"]
    }
  ],
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week18/story_writing_pic.jpg',
      image_prompt: "A colorful school festival in a busy courtyard. Students are painting a giant mural at the Art Club booth, a girl with safety glasses is mixing liquids at the Science Club, and Drama Club students are acting on a small stage. Teachers and students are watching and clapping. Watercolor children book illustration style, soft pastel colors, friendly cartoon characters, cozy setting, no text on image.",
      word_bank: [
        "broadcasting live",
        "school courtyard",
        "annual Spring Festival",
        "painting a giant mural",
        "using bright paints",
        "mixing mysterious liquids",
        "changing color",
        "practicing for their play",
        "speaking loudly",
        "clapping happily",
        "smiling and chatting",
        "exciting activities"
      ],
      writing_prompts: {
        en: "Look at the picture. You are a student reporter at the school festival. What clubs can you see? What are the students doing right now? Use 3+ words from the word bank.",
        vi: "Nhìn bức tranh. Bạn là phóng viên học sinh tại ngày hội trường. Bạn thấy câu lạc bộ nào? Học sinh đang làm gì lúc này? Dùng 3+ từ trong ngân hàng từ."
      },
      rubric_tier: 1,
      sentence_frames: [
        { "template": "At the Art Club, ___", "answers": ["students are painting"] },
        { "template": "At the Science Club, ___", "answers": ["Sarah is mixing liquids"] },
        { "template": "At the Drama Club, ___", "answers": ["students are acting"] },
        { "template": "Meanwhile, ___", "answers": ["the crowd is watching"] },
        { "template": "Everywhere I look, ___", "answers": ["people are smiling"] }
      ]
    }
  }
};
