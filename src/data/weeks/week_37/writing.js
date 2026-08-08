export default {
  title: "Sports Day Relay Adventure — Writing Station",
  theme: "sports_day",
  min_words: 65,
  min_sentences: 8,
  model_sentence: "On Saturday morning, our school held an exciting sports day at the stadium. I entered the 100-metre relay race with my best friends. When the whistle blew, Leo ran very fast and passed the baton cleanly to me. I sprinted across the grass and handed it to Max. Thousands of spectators clapped loudly. We crossed the finish line first! Our teamwork brought victory, and we smiled with pride while receiving our gold medals.",
  topic_talk_prompt: "Tell me about a sports day or race you joined — what sport did you play, who was in your team, and how did you work together?",
  prompt_en: "Write about a sports day experience. Use 5+ sports action words (ran fast, passed the baton, sprinted, cheered, won, clapped).",
  prompt_vi: "Viết về trải nghiệm ngày hội thể thao. Dùng 5+ từ chỉ hành động thể thao (ran fast, passed the baton, sprinted, cheered, won, clapped).",
  sentence_frames: [
    { "template": "On Saturday morning, we went to the ___.", "answers": ["sports stadium", "stadium"] },
    { "template": "The weather was ___ and warm.", "answers": ["sunny"] },
    { "template": "Leo ran very ___ along the track.", "answers": ["fast"] },
    { "template": "He passed the ___ cleanly to Maya.", "answers": ["baton"] },
    { "template": "Max sprinted with ___ toward the line.", "answers": ["determination"] },
    { "template": "Spectators watched and ___ with joy.", "answers": ["clapped"] },
    { "template": "Our dedicated ___ brought victory.", "answers": ["teamwork"] },
    { "template": "We received our golden ___ with pride.", "answers": ["medals", "medal"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Cần trợ giúp? Bấm bên cạnh mỗi ô",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "sports stadium", "vi": "sân vận động", "distractor": false },
        { "word": "sunny", "vi": "nắng", "distractor": false },
        { "word": "fast", "vi": "nhanh", "distractor": false },
        { "word": "baton", "vi": "gậy tiếp sức", "distractor": false },
        { "word": "determination", "vi": "sự quyết tâm", "distractor": false },
        { "word": "clapped", "vi": "vỗ tay", "distractor": false },
        { "word": "teamwork", "vi": "tinh thần đồng đội", "distractor": false },
        { "word": "medals", "vi": "huy chương", "distractor": false },
        { "word": "passed the baton", "vi": "truyền gậy", "distractor": false },
        { "word": "finish line", "vi": "vạch đích", "distractor": false },
        { "word": "shake hands", "vi": "bắt tay", "distractor": false },
        { "word": "went home", "vi": "đã về nhà", "distractor": true },
        { "word": "cold rain", "vi": "mưa lạnh", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: null,
      image_prompt: "Young athletes sprinting on a red athletic track passing a baton under bright sunlight, cheering spectators in background, cartoon illustration.",
      word_bank: ["ran very fast", "passed the baton", "sprinted with determination", "crossed the finish line", "cheered loudly", "smiled with pride", "teamwork brought victory", "shook hands politely"],
      sentence_frames: [
        { "template": "On Saturday morning, Leo ___ (go) to the sports stadium.", "answers": ["went"] },
        { "template": "He ___ (run) very fast on the track.", "answers": ["ran"] },
        { "template": "He ___ (pass) the baton cleanly to Maya.", "answers": ["passed"] },
        { "template": "Maya ___ (run) across the grass.", "answers": ["ran"] },
        { "template": "Max ___ (catch) the baton smoothly.", "answers": ["caught"] },
        { "template": "They ___ (cross) the finish line first.", "answers": ["crossed"] },
        { "template": "Spectators ___ (clap) enthusiastically.", "answers": ["clapped"] },
        { "template": "Leo ___ (smile) with pride.", "answers": ["smiled"] }
      ],
      writing_prompts: {
        en: "Look at the sports day relay picture and write the story. How did the runners pass the baton? Use 5+ past action verbs.",
        vi: "Nhìn hình ngày hội thể thao và viết câu chuyện. Các vận động viên đã truyền gậy như thế nào? Dùng 5+ động từ quá quá khứ."
      },
      rubric_tier: 1
    }
  }
};
