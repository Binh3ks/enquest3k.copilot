export default {
  title: "My Old Photo Album",
  min_words: 45,
  instruction_en: "Write about an old photo album using was, were, and could!",
  instruction_vi: "Viết về album ảnh cũ dùng was, were và could!",
  prompt_en: "What did you look like? What were you like? What could or couldn't you do?",
  prompt_vi: "Bạn trông thế nào? Bạn như thế nào? Bạn có thể hoặc không thể làm gì?",
  topic_talk_prompt: "Describe yourself as a baby — what did you look like?",
  sentence_frames: [
    {
      "template": "I **was little** and cute! My face **was round and** my eyes **were very big**.",
      "answers": [
        "was little",
        "was round and",
        "were very big"
      ]
    },
    {
      "template": "In this photo, I was one year old. I was noisy. I cried many times.",
      "answers": [
        "was noisy"
      ]
    },
    {
      "template": "But in this picture, I **was quiet and sleeping**. Everyone loved me!",
      "answers": [
        "was quiet and sleeping"
      ]
    },
    {
      "template": "Here is another photo. I was five years old. I **was young** and I **begin to grow**.",
      "answers": [
        "was young",
        "begin to grow"
      ]
    },
    {
      "template": "I **grow bigger** every year. My body **gets taller** and stronger.",
      "answers": [
        "grow bigger",
        "gets taller"
      ]
    },
    {
      "template": "These photos are **special memories**. They show me when I **remember when I was little**.",
      "answers": [
        "special memories",
        "remember when I was little"
      ]
    },
    {
      "template": "The past was different from now. But I **keep these memories in my heart**.",
      "answers": [
        "keep these memories in my heart"
      ]
    },
    {
      "template": "Now I am big! I have grown so much. **The past was different** but the memories are precious.",
      "answers": [
        "The past was different"
      ]
    }
  ],
  scaffolding_stage: "medium-low",
  vocabulary_bank: [
    "was little",
    "was round and",
    "were very big",
    "was noisy",
    "was quiet and sleeping",
    "was young",
    "begin to grow",
    "grow bigger",
    "gets taller",
    "special memories",
    "remember when I was little",
    "keep these memories in my heart",
    "The past was different"
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
      image_prompt: "A family looking at old photos in an album.",
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
