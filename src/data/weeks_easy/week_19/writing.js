export default {
  title: "My Old Photo Album",
  min_words: 30,
  instruction_en: "Write about an old photo of yourself!",
  instruction_vi: "Viết về một bức ảnh cũ của bạn!",
  prompt_en: "What did you look like as a baby? What were you like?",
  prompt_vi: "Bạn trông thế nào khi còn là em bé? Bạn như thế nào?",
  topic_talk_prompt: "Describe yourself as a baby!",
  show_by_default: true,
  sentence_frames: [
    {
      "template": "I was a ___ in this photo.",
      "answers": [
        "baby"
      ]
    },
    {
      "template": "I **was little**! I was cute.",
      "answers": [
        "was little"
      ]
    },
    {
      "template": "My face **was round and** my eyes **were very big**.",
      "answers": [
        "was round and",
        "were very big"
      ]
    },
    {
      "template": "I was noisy. I cried many times.",
      "answers": [
        "was noisy"
      ]
    },
    {
      "template": "I **was quiet and sleeping** in this picture.",
      "answers": [
        "was quiet and sleeping"
      ]
    },
    {
      "template": "These photos are **special memories**. I **keep these memories in my heart**.",
      "answers": [
        "special memories",
        "keep these memories in my heart"
      ]
    }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "baby",
    "was little",
    "was round and",
    "were very big",
    "was noisy",
    "was quiet and sleeping",
    "special memories",
    "keep these memories in my heart"
  ]
};
