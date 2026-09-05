/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: W17 — A1 Movers Transition (Full Mode Begins)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Applicable: W17–W32 (A1 Movers, children 8–9 years old)
 * CEFR Stage: A1 Movers
 * Mode: FULL MODE — 15 Quests / 5 Zones / 3 Quests per Day
 * 
 * ⚠️ CRITICAL TRANSITION from Lite Mode (W01–W16):
 *   W15: Transition week — introduced gear3_retell and math_quest (simple)
 *   W16: Last Lite Mock
 *   W17: FULL SWITCH — all 15 quests active for first time
 * 
 * Changes from Starters (W01–W16):
 *   Vocabulary: Cambridge Movers wordlist (movers_a1.json) — ~300 words
 *   Sentence length: ≤15 words (up from ≤12)
 *   Quests: 15 (up from 10 — adds gear3_retell, science_report, math_quest,
 *             broadcast_studio, boss_reading)
 *   Assessment: Cambridge Movers format replaces Starters format
 *   inference_questions: Still not required (A1 — not yet enforced)
 *   Bar Models: Singapore Math appears for first time (simple 2-bar)
 */

export const index_skeleton = {
  weekNumber: 0,            // REPLACE: 17–32
  title: '',                // REPLACE: e.g. "Jake's First Day at School"
  theme: '',                // REPLACE: e.g. "School & Classroom"
  cefrLevel: 'A1',
  isLiteMode: false,        // ← KEY: Full Mode now
  isFullMock: false,        // true for W24, W32 only
  mockExamType: null,       // 'MOVERS' for W24 and W32
  weekType: 'rotary_practice',
  vocabSource: 'movers_a1', // Cambridge Movers wordlist

  // Zone 5 rotary: Movers format (smaller set than Flyers)
  rotaryParts: {
    listening: [],          // REPLACE: 2 of Movers L1–L4 (no L5 in Movers)
    reading: [],            // REPLACE: 2 of Movers R1–R5 (no R6 in Movers)
    speaking: [],           // REPLACE: 1 of Movers S1–S3
  },

  voiceConfig: {
    examiner_female: { name: 'en-US-Neural2-F', pitch: 0.5, rate: 0.85 },
    student_jake:    { name: 'en-US-Neural2-D', pitch: 2.0, rate: 0.90 },  // Slightly younger
    student_mia:     { name: 'en-US-Neural2-C', pitch: 4.5, rate: 0.88 },
    narrator:        { name: 'en-US-Neural2-A', pitch: 0.5, rate: 0.86 },
    teacher:         { name: 'en-US-Neural2-H', pitch: 0, rate: 0.84 },
  },
};

// ═══════════════════════════════════════════════════════════════
// READING_HUB.JS — Full Mode begins (15 quests)
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  read_explore: {
    title: '',
    story_scenes: [
      // FULL: 5 scenes, ≤15 words/sentence, Movers vocabulary
      {
        id: 'scene_wNN_1',
        scene_number: 1,
        title_en: '',
        title_vi: '',
        narration_en: '',   // ≤15 words, past tense now OK, Movers vocab
        narration_vi: '',
        image_url: '/images/weekNN/scene1.webp',
        hotspots: [
          { id: 'hs_1', label_en: '', label_vi: '', x: 30, y: 40 },
          { id: 'hs_2', label_en: '', label_vi: '', x: 60, y: 50 },
          { id: 'hs_3', label_en: '', label_vi: '', x: 45, y: 70 },
        ],
      },
      // ... scenes 2-5
    ],

    clil_article: {
      id: 'clil_wNN_topic',
      theme: '',            // CLIL: Science/Social Studies topics now active
      title_en: '',
      title_vi: '',
      content_en: '',       // ≥100 words, ≤15 words/sentence, Movers vocab
      content_vi: '',
      audio_url: '/audio/weekNN/clil_topic.mp3',
      vocab_focus: [],
      grammar_patterns: [
        // W17+ introduces: past simple, present continuous, can/can't
        { pattern: '', label: '', paragraph_scope: 1 },
      ],
      sentence_drills: [
        { id: 1, label: '', scrambled: [], correct: [] },
      ],
      glossary: [
        { term: '', meaning: '' },
      ],
      // inference_questions: NOT yet required for A1 Movers
      // Will be required from W49+ (A2 Flyers mid-stage)
    },
  },

  // gear3_retell — NEW in W17 (not in W01–W16 Lite Mode)
  retellData: {
    questions: [
      {
        id: 1,
        sentence: '',       // Full model sentence
        chips: [],          // Linear Thinking ESL collocations
                            // Simpler than Flyers: ["Jake went", "to school", "on Monday."]
        image_cue: '',
      },
    ],
  },

  shadowingData: {
    sentences: [
      // ≥6 sentences (not ≥8 yet — building up)
      {
        id: 1,
        text: '',
        words: [],
        ipa: [],
        audio_url: '/audio/weekNN/shadow_1.mp3',
      },
    ],
  },

  // FULL: 20 vocab items from W17 onward (SRS Leitner enrollment)
  // Movers wordlist only
  vocab: [
    {
      id: 1,
      word: '',             // Cambridge Movers wordlist
      definition_en: '',
      definition_vi: '',    // Full Vietnamese diacritics
      example_en: '',       // ≤12 words
      example_vi: '',
    },
    // ... 19 more (total: 20)
  ],

  // ── Zone 5: Movers Reading Assessment ──
  reading_assessment: {
    // Movers R1: Picture-sentence matching (6 sentences, 8 pictures)
    movers_r1: { sentences: [], pictures: [] },
    // Movers R2: 3-option picture MCQ (5 questions)
    movers_r2: { questions: [] },
    // Movers R3: Cloze — fill gaps in story (7 gaps, A-H options)
    movers_r3: { story: '', gaps: [], options: [] },
    // Movers R4: Letter writing — read text and write information
    movers_r4: { text: '', fields_to_complete: [] },
    // Movers R5: Multiple choice (5 items from a text)
    movers_r5: { text: '', questions: [] },
  },
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — Full Mode (math_quest & science_report added)
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  // ── Day 2: Action Lab (science_lab) ──
  science_lab: {
    title: '',
    steps: [],
  },

  // ── Day 3: Speed Match ──
  word_match: [],

  // ── Day 3: Grammar Duel — NEW in W17 ──
  // Simple Movers-level sentence unscrambling
  grammar_exercises: [
    {
      id: 1,
      scrambled: [],        // ['at', 'school', 'I', 'am']
      correct: [],          // ['I', 'am', 'at', 'school']
    },
  ],

  // ── Day 3: Math Quest — NEW in W17 (simple 2-bar models) ──
  // Simpler than Flyers — start with single-step problems
  singapore_math: [
    {
      id: 1,
      problem_en: '',       // ≤20 words, single-step, Movers vocab
      bar_model_svg: '/images/weekNN/barmodel_wNN_adv_p1.svg',
      answer_value: 0,
    },
    // ... 4 more (total: 5)
  ],

  dictation: [],

  // ── Zone 5: Movers Listening Assessment ──
  // Movers has 4 parts (not 5 like Flyers)
  movers_l1: {
    // L1: Draw lines (match names to people in picture)
    image_url: '',
    names: [],              // ≥5 names
    targets: [],
  },
  movers_l2: {
    // L2: Write answers (5 gap-fills from listening)
    questions: [],
  },
  movers_l3: {
    // L3: Tick correct picture (6 questions × 3 pictures)
    questions: [],
  },
  movers_l4: {
    // L4: Match (5 items to 8 categories)
    items: [],
    categories: [],
  },
};

// ═══════════════════════════════════════════════════════════════
// WRITING_HUB.JS — Full Mode (story_writer 3-panel ≥20 words)
// ═══════════════════════════════════════════════════════════════
export const writing_hub_skeleton = {
  // ── Day 4: Story Writer — NEW in full mode ──
  picture_story: {
    images: [],             // 3 sequential story panels
    scaffolding: {
      level_1_cloze: [],
      level_2_pills: [],
      level_3_open: { minWords: 20 },
    },
  },

  // ── Zone 5: Movers Reading Part 4 & 5 (writing parts) ──
  movers_r4_writing: {
    prompt: '',             // Write information from text into form
    fields: [],
  },
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — broadcast_studio added
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  // ── Day 4: Video Challenge — NEW in W17 ──
  talkshow_video: {
    video_id: '',
    title: '',
    teleprompter: '',       // W17: full teleprompter (Level 1 scaffold)
  },

  // ── Day 4: Info Exchange ──
  info_exchange_cards: {
    card_a: {},
    card_b: {},
  },

  // Spot Differences
  find_differences: {
    image_a: '',
    image_b: '',
    differences: [],
  },

  // ── Zone 5: Movers Speaking Assessment ──
  // Movers has 3 speaking parts
  movers_s1: {
    // S1: Find the difference (2 similar pictures, 5 differences)
    image_a: '',
    image_b: '',
    model_sentence: '',     // "In picture A, the dog is [adj]. In picture B..."
  },
  movers_s2: {
    // S2: Picture story (4 pictures — examiner introduces #1)
    images: [],             // 4 images
    examiner_intro: '',
  },
  movers_s3: {
    // S3: Personal questions (about school, family, daily activities)
    questions: [],          // 5–6 personal questions
  },
};
