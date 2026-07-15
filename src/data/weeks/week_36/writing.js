// WEEK 36: Adventure Stories (Irregular Verbs)
// Writing Station — Advanced Mode
// Schema: W35 evolved format (model_sentence, topic_talk_prompt, hints.vocabulary_bank)

export default {
  title: "Marco Polo's Journey — Adventure Story Writing",
  theme: "adventure_stories",
  min_words: 65,
  min_sentences: 8,
  model_sentence: "Marco Polo left Venice when he was only 17 years old. He rode across high mountains and hot deserts on the famous Silk Road. He saw amazing and unusual things during his long travels. He met merchants, kings, and artists from many different countries. He spoke many languages and wrote about everything he saw. When he came back home after 24 years, people said he made up his stories, but his book was true. His courage inspired many other explorers to begin their own adventures around the world!",
  topic_talk_prompt: "Tell me about a trip or adventure you went on — where did you go, what did you see, and what did you do? Use irregular verbs: went, saw, found, came, took, wrote.",
  prompt_en: "Write about an adventure. Use 5+ irregular verbs (went, saw, took, came, gave, made, wrote, found).",
  prompt_vi: "Viet ve mot cuoc phieu luu. Dung 5+ dong tu bat quy tac (went, saw, took, came, gave, made, wrote, found).",
  sentence_frames: [
    { "template": "Last summer, my family ___ (go) to the ocean.", "answers": ["went"] },
    { "template": "We ___ (see) beautiful coral reefs.", "answers": ["saw"] },
    { "template": "We ___ (find) an old compass.", "answers": ["found"] },
    { "template": "My dad ___ (take) many photos.", "answers": ["took"] },
    { "template": "We ___ (write) about everything.", "answers": ["wrote"] },
    { "template": "The museum director ___ (give) us a big thank you.", "answers": ["gave"] },
    { "template": "When we ___ (come) back home, we were excited.", "answers": ["came"] },
    { "template": "We ___ (make) many memories that day.", "answers": ["made"] }
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
        { "word": "wrote", "vi": "da viet", "distractor": false },
        { "word": "gave", "vi": "da trao", "distractor": false },
        { "word": "came", "vi": "da den", "distractor": false },
        { "word": "made", "vi": "da tao", "distractor": false },
        { "word": "submarine trip", "vi": "chuyen di tau ngam", "distractor": false },
        { "word": "underwater cave", "vi": "hang dong duoi nuoc", "distractor": false },
        { "word": "gold compass", "vi": "la ban vang", "distractor": false },
        { "word": "amazing discovery", "vi": "phat hien tuyet voi", "distractor": false },
        { "word": "famous book", "vi": "cuon sach noi tieng", "distractor": false },
        { "word": "great adventure", "vi": "cuoc phieu luu tuyet voi", "distractor": false },
        { "word": "brave explorer", "vi": "nha tham hiem dung cam", "distractor": false },
        { "word": "went home", "vi": "da ve nha", "distractor": true },
        { "word": "beautiful day", "vi": "ngay dep", "distractor": true }
      ]
    }
  },
  story_prompts: {
    picture_mode: {
      type: 'picture',
      image_url: '/images/week36/story_writing_pic.jpg',
      image_prompt: "A young explorer in an old wooden submarine looks through a large porthole at colourful coral reefs and golden treasure in a dark underwater cave. Watercolour children book illustration style, soft blue and gold tones, friendly cartoon characters, no text on image.",
      word_bank: ["went on an adventure","saw beautiful coral reefs","found an underwater cave","took many photographs","wrote down everything","gave findings to the museum","came back home safely","made an important discovery","rode into the dark cave","spoke about the journey","began a new adventure","brought treasures home"],
      sentence_frames: [
        { "template": "Last summer, we ___ (go) on a submarine trip.", "answers": ["went"] },
        { "template": "We ___ (see) amazing coral reefs.", "answers": ["saw"] },
        { "template": "We ___ (find) a gold compass.", "answers": ["found"] },
        { "template": "Dad ___ (take) many photos.", "answers": ["took"] },
        { "template": "We ___ (write) about the cave.", "answers": ["wrote"] },
        { "template": "Mom ___ (give) the compass to the museum.", "answers": ["gave"] },
        { "template": "When we ___ (come) back, everyone was excited.", "answers": ["came"] },
        { "template": "We ___ (make) memories that will last forever.", "answers": ["made"] }
      ],
      writing_prompts: {
        en: "Look at the picture and write Marco Polo's adventure story. What did he find? What did he do? Use 5+ irregular verbs from the word bank to tell the story.",
        vi: "Nhin hinh va viet cau chuyen phieu luu cua Marco Polo. Ong tim thay gi? Ong lam gi? Dung 5+ dong tu bat quy tac de ke chuyen."
      },
      rubric_tier: 1
    }
  }
};