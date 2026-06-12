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
  ],
    hints: {
    vocabulary_bank: {
      label_en: "💡 Need help? Click 💡 next to each blank",
      label_vi: "💡 Cần trợ giúp? Bấm 💡 bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium-low",
      words: [
        { "word": "old photo album", "vi": "old photo album", "distractor": false },
        { "word": "sitting in the living room", "vi": "sitting in the living room", "distractor": false },
        { "word": "looking at pictures", "vi": "looking at pictures", "distractor": false },
        { "word": "tiny baby", "vi": "tiny baby", "distractor": false },
        { "word": "very small and cute", "vi": "very small and cute", "distractor": false },
        { "word": "extremely noisy", "vi": "extremely noisy", "distractor": false },
        { "word": "not quiet like my brother", "vi": "not quiet like my brother", "distractor": false },
        { "word": "very brave and smart", "vi": "very brave and smart", "distractor": false },
        { "word": "hold my hand and feel safe", "vi": "hold my hand and feel safe", "distractor": false },
        { "word": "first day of kindergarten", "vi": "first day of kindergarten", "distractor": false },
        { "word": "big blue school backpack", "vi": "big blue school backpack", "distractor": false },
        { "word": "very happy to wear", "vi": "very happy to wear", "distractor": false },
        { "word": "a little shy and nervous", "vi": "a little shy and nervous", "distractor": false },
        { "word": "tall strong and confident", "vi": "tall strong and confident", "distractor": false },
        { "word": "wonderful funny pictures", "vi": "wonderful funny pictures", "distractor": false },
        { "word": "my grandmother is smiling", "vi": "my grandmother is smiling", "distractor": true },
        { "word": "a long time ago", "vi": "a long time ago", "distractor": true },
        { "word": "my dad looks young", "vi": "my dad looks young", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: "picture",
      image_url: "/images/week19/story_writing_pic.jpg",
      image_prompt: "A family looking at old photos in a photo album.",
      word_bank: [],
      writing_prompts: {
        en: "Look at the picture. What can you see? Use simple sentences.",
        vi: "Nhìn bức tranh. Bạn thấy gì? Viết những câu đơn giản."
      },
      rubric_tier: 1
    }
  }
};
