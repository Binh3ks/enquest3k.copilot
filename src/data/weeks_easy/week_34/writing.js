// WEEK 34: STORYTELLING PRACTICE 1 — The Ant and the Grasshopper
// Writing Station — Easy Mode

export default {
  title: "Writing: The Ant and the Grasshopper Story",
  audio_url: null,
  min_words: 30,
  model_sentence: "Once upon a time, there was a hard-working ant and a lazy grasshopper. The ant gathered seeds every day in the summer, but the grasshopper only sang songs. When winter came, the ant had a warm shelter and lots of food. The grasshopper was cold and hungry. The grasshopper knocked on the ant's door and said, 'Please help me!' The kind ant shared its food with the grasshopper. The lesson is: always prepare for the future!",
  instruction_en: "Write the story of The Ant and the Grasshopper. Use at least 4 of these words: hard-working, lazy, gather, prepare, shelter, frost, future, share!",
  instruction_vi: "Viết câu chuyện Con Kiến và Con Châu Chấu. Dùng ít nhất 4 từ: hard-working, lazy, gather, prepare, shelter, frost, future, share!",
  prompt_en: "Write your version of The Ant and the Grasshopper. Use: hard-working, lazy, gather, prepare, shelter, frost, share, future",
  prompt_vi: "Viết phiên bản của bạn về Con Kiến và Con Châu Chấu. Dùng: hard-working, lazy, gather, prepare, shelter, frost, share, future",
  keywords: ["hard-working", "lazy", "gather", "prepare", "shelter", "frost", "future", "share", "winter", "summer", "food", "sang", "warm", "lesson", "kind"],
  topic_talk_prompt: "Tell me about the fable — was the ant smart? Was the grasshopper lazy? What lesson did you learn? Would you share your food with the grasshopper?",
  sentence_frames: [
    { template: "Once upon a time, there was a ___ ant and a ___ grasshopper." },
    { template: "The ant ___ seeds every day in the summer." },
    { template: "The grasshopper only ___ ___ all day." },
    { template: "When ___ came, the ant had a ___ ___ and the grasshopper had a ___ ___." },
    { template: "The grasshopper was ___ and ___." },
    { template: "The ___ ant ___ its food with the grasshopper." },
    { template: "The lesson is: always ___ ___ ___. " }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Can giup? Bam ben canh moi o trong",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        {"word": "hard-working", "vi": "cham chi", "distractor": false},
        {"word": "lazy", "vi": "luoi bieng", "distractor": false},
        {"word": "gather", "vi": "thu thap", "distractor": false},
        {"word": "prepare", "vi": "chuan bi", "distractor": false},
        {"word": "shelter", "vi": "noi tru an", "distractor": true},
        {"word": "frost", "vi": "suong gia", "distractor": true},
        {"word": "future", "vi": "tuong lai", "distractor": false},
        {"word": "share", "vi": "chia se", "distractor": false},
        {"word": "winter", "vi": "mua dong", "distractor": true},
        {"word": "summer", "vi": "mua he", "distractor": true},
        {"word": "warm", "vi": "am ap", "distractor": true},
        {"word": "kind", "vi": "tot bung", "distractor": true},
        {"word": "lesson", "vi": "bai hoc", "distractor": true},
        {"word": "food", "vi": "thuc an", "distractor": true}
      ]
    }
  }
};
