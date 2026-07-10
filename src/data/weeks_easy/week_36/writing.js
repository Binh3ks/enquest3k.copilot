// WEEK 36: Adventure Stories (Irregular Verbs) — Easy Mode
// Writing Station — Easy Mode

export default {
  title: "My Adventure Story — Easy",
  theme: "adventure_stories",
  min_words: 45,
  min_sentences: 6,
  model_sentence: "I went on a submarine trip last summer. I saw amazing coral reefs underwater. We found a beautiful gold compass in a cave. My dad took many photos of the cave. We wrote about everything we found. Mom gave the compass to the museum. The director said we were real explorers. We came back home with the best memories!",
  topic_talk_prompt: "Tell me about your favourite trip. Where did you go? What did you see? Use these words: went, saw, found, took, came.",
  prompt_en: "Write about a trip you went on. Use 4+ irregular verbs (went, saw, found, took, came, made).",
  prompt_vi: "Viet ve mot chuyen di ban da di. Dung 4+ dong tu bat quy tac (went, saw, found, took, came, made).",
  sentence_frames: [
    { "template": "Last summer, I ___ (go) to the beach.", "answers": ["went"] },
    { "template": "I ___ (see) many fish in the water.", "answers": ["saw"] },
    { "template": "We ___ (find) a big shell.", "answers": ["found"] },
    { "template": "I ___ (take) photos of the waves.", "answers": ["took"] },
    { "template": "Then we ___ (come) home.", "answers": ["came"] },
    { "template": "I ___ (make) a sandcastle.", "answers": ["made"] }
  ],
  hints: {
    vocabulary_bank: {
      label_en: "Need help? Click next to each blank",
      label_vi: "Can tro giup? Bam ben canh moi o",
      show_by_default: false,
      scaffolding_stage: "medium",
      words: [
        { "word": "went", "vi": "da di", "distractor": false },
        { "word": "saw", "vi": "da nhin thay", "distractor": false },
        { "word": "found", "vi": "da tim thay", "distractor": false },
        { "word": "took", "vi": "da chup", "distractor": false },
        { "word": "came", "vi": "da den", "distractor": false },
        { "word": "made", "vi": "da tao", "distractor": false },
        { "word": "beautiful beach", "vi": "bien dep", "distractor": false },
        { "word": "big adventure", "vi": "cuoc phieu luu lon", "distractor": false },
        { "word": "funny day", "vi": "ngay vui", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week36/story_writing_pic.jpg',
      image_prompt: "A friendly cartoon child in a small yellow submarine looks at a beautiful coral reef. Watercolour children book illustration style, soft pastel colours, no text.",
      word_bank: ["went on a trip","saw a cave","found a compass","took photos","came home","made a sandcastle","wrote about the trip","gave a gift"],
      sentence_frames: [
        { "template": "I ___ (go) on a trip.", "answers": ["went"] },
        { "template": "I ___ (see) a cave.", "answers": ["saw"] },
        { "template": "I ___ (find) a compass.", "answers": ["found"] },
        { "template": "I ___ (take) many photos.", "answers": ["took"] },
        { "template": "I ___ (come) home.", "answers": ["came"] },
        { "template": "I ___ (make) great memories.", "answers": ["made"] }
      ],
      writing_prompts: {
        en: "Write about a trip you went on. Use 4 irregular verbs (went, saw, found, took, came, made).",
        vi: "Viet ve mot chuyen di ban da di. Dung 4 dong tu bat quy tac (went, saw, found, took, came, made)."
      },
      rubric_tier: 1
    }
  }
};