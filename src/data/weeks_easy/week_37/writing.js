export default {
  title: "My Sports Day — Writing",
  theme: "sports_day",
  min_words: 35,
  min_sentences: 5,
  model_sentence: "I went to the sports day with my friends. Leo ran very fast in the relay race. He passed the baton to Maya. We cheered loudly and won gold medals!",
  topic_talk_prompt: "Tell me about playing sports in the park with your friends!",
  prompt_en: "Write 4 sentences about sports day.",
  prompt_vi: "Viết 4 câu về ngày hội thể thao.",
  sentence_frames: [
    { "template": "I went to the ___.", "answers": ["park", "stadium"] },
    { "template": "Leo ran very ___.", "answers": ["fast"] },
    { "template": "He passed the ___.", "answers": ["baton"] },
    { "template": "We won a gold ___.", "answers": ["medal"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Click for help",
      label_vi: "Bấm để trợ giúp",
      show_by_default: false,
      scaffolding_stage: "easy",
      words: [
        { "word": "park", "vi": "công viên", "distractor": false },
        { "word": "fast", "vi": "nhanh", "distractor": false },
        { "word": "baton", "vi": "gậy tiếp sức", "distractor": false },
        { "word": "medal", "vi": "huy chương", "distractor": false }
      ]
    }
  }
};
