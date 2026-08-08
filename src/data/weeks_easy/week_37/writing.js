export default {
  title: "My Sports Day — Writing",
  theme: "sports_day",
  min_words: 45,
  min_sentences: 6,
  model_sentence: "On Saturday morning, I went to the sports day at the stadium with my best friends. Leo ran very fast in the relay race. He passed the baton cleanly to Maya. Max sprinted to the finish line! Everyone cheered loudly when we won gold medals. We were tired but happy!",
  topic_talk_prompt: "Tell me about playing sports in the park with your friends!",
  prompt_en: "Write 5+ sentences about your sports day. Use words: went, ran, passed, cheered, won.",
  prompt_vi: "Viết 5+ câu về ngày hội thể thao. Dùng các từ: went, ran, passed, cheered, won.",
  sentence_frames: [
    { "template": "On Saturday morning, I went to the ___.", "answers": ["stadium", "park"] },
    { "template": "The weather was warm and ___.", "answers": ["sunny"] },
    { "template": "Leo ran very ___ in the race.", "answers": ["fast"] },
    { "template": "He passed the ___ cleanly to Maya.", "answers": ["baton"] },
    { "template": "Everyone cheered and ___ loudly.", "answers": ["clapped"] },
    { "template": "Our team won a gold ___.", "answers": ["medal"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Click for help",
      label_vi: "Bấm để trợ giúp",
      show_by_default: false,
      scaffolding_stage: "easy",
      words: [
        { "word": "stadium", "vi": "sân vận động", "distractor": false },
        { "word": "sunny", "vi": "nắng", "distractor": false },
        { "word": "fast", "vi": "nhanh", "distractor": false },
        { "word": "baton", "vi": "gậy tiếp sức", "distractor": false },
        { "word": "clapped", "vi": "vỗ tay", "distractor": false },
        { "word": "medal", "vi": "huy chương", "distractor": false },
        { "word": "cold rain", "vi": "mưa lạnh", "distractor": true },
        { "word": "sleep late", "vi": "ngủ muộn", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: null,
      image_prompt: "Happy children running on grass passing a baton, sunny sky, cartoon style.",
      word_bank: ["ran fast", "passed baton", "won medal", "cheered loudly", "smiled happy"],
      sentence_frames: [
        { "template": "I went to the ___.", "answers": ["park"] },
        { "template": "Leo ran very ___.", "answers": ["fast"] },
        { "template": "He passed the ___.", "answers": ["baton"] },
        { "template": "We won a gold ___.", "answers": ["medal"] }
      ],
      writing_prompts: {
        en: "Look at the picture and write 4 sentences about sports day.",
        vi: "Nhìn hình và viết 4 câu về ngày hội thể thao."
      },
      rubric_tier: 1
    }
  }
};
