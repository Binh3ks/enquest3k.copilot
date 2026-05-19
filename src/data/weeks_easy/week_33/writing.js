// WEEK 33: THE MISTAKE — Irregular Verbs 5: Accidents
// Writing Station — Easy Mode

export default {
  title: "Writing: My Accident Story",
  audio_url: null,
  min_words: 30,
  model_sentence: "Last week, I had a small accident at home. I ran in the kitchen and slipped on the floor. I fell down and hurt my knee. My mum put a cold pack on it and told me to rest. I promised to be more careful from now on. I learned an important lesson: always walk carefully at home, even when I am in a hurry!",
  instruction_en: "Write about a time you had an accident. Use at least 4 verbs: hit, fell, broke, hurt, ran, learned, promised, understood!",
  instruction_vi: "Viết về một lần bạn bị tai nạn. Dùng ít nhất 4 động từ: hit, fell, broke, hurt, ran, learned, promised, understood!",
  prompt_en: "Write about your accident. Use: ran, hit, fell, hurt, cold pack, lesson, carefully, promised",
  prompt_vi: "Viết về tai nạn của bạn. Dùng: ran, hit, fell, hurt, cold pack, lesson, carefully, promised",
  keywords: ["ran", "hit", "fell", "hurt", "broke", "cold pack", "lesson", "carefully", "promised", "understood", "explained", "late", "corridor", "nurse", "recovered"],
  topic_talk_prompt: "Tell me about an accident — did you fall down? What hurt? Who helped you? What lesson did you learn?",
  sentence_frames: [
    { template: "Last ___, I had an accident at ___." },
    { template: "I was ___ so I ___ in the ___" },
    { template: "I ___ my ___ and ___ down." },
    { template: "My ___ ___ a lot." },
    { template: "The nurse put a ___ on my ___." },
    { template: "I promised to ___ ___ from now on." },
    { template: "I learned: always ___ ___ in the ___. " }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Can giup? Bam ben canh moi o trong",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {"word": "ran", "vi": "chay", "distractor": false},
        {"word": "hit", "vi": "dap vao", "distractor": false},
        {"word": "fell", "vi": "nga", "distractor": false},
        {"word": "hurt", "vi": "dau", "distractor": false},
        {"word": "broke", "vi": "lam vo", "distractor": false},
        {"word": "late", "vi": "muon", "distractor": true},
        {"word": "knee", "vi": "dau goi", "distractor": true},
        {"word": "arm", "vi": "canh tay", "distractor": true},
        {"word": "nurse", "vi": "y ta", "distractor": true},
        {"word": "cold pack", "vi": "tui chuom lanh", "distractor": true},
        {"word": "lesson", "vi": "bai hoc", "distractor": true},
        {"word": "carefully", "vi": "can than", "distractor": true},
        {"word": "promised", "vi": "hua", "distractor": false},
        {"word": "understood", "vi": "hieu", "distractor": false}
      ]
    }
  }
};
