/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: W24 — Movers Mid-Way Progress Mock
 * ═══════════════════════════════════════════════════════════════
 * 
 * Applicable: W24 ONLY
 * CEFR Stage: A1 Movers
 * Mode: FULL MODE (15 quests) — Mid-way check, not graduation
 * Purpose: Identify gaps at Week 24 (halfway through Movers tier),
 *          adjust learning path before W25–W32 sprint.
 * 
 * KEY DIFFERENCES from W17–W23 rotary:
 *   - isFullMock: true → Zone 5 expands to ALL Movers exam parts
 *   - Days 1–4: Review & consolidation (vocab from W17–W23 only)
 *   - No new vocab introduced — review week
 *   - Zone 5 timer: realistic Movers exam timing
 *   - Diagnostic report: shows skill breakdown (L/R/W/S percentages)
 *   - No graduation reward (mid-way only — save for W32)
 *   - "Progress Shield" (silver, not gold) unlocked on completion
 * 
 * Movers exam format:
 *   Listening: 4 parts (~25 min)
 *   Reading & Writing: 5 parts (~30 min)
 *   Speaking: 3 parts (~5–7 min)
 */

export const index_skeleton = {
  weekNumber: 24,
  title: '★ Movers Mid-Way Check — How Far Have I Come?',
  theme: 'Review & Progress Check',
  cefrLevel: 'A1',
  isLiteMode: false,
  isFullMock: true,
  mockExamType: 'MOVERS',
  weekType: 'full_mock',
  vocabSource: 'movers_a1',
  isMidWayMock: true,        // Diagnostic mode — not graduation
  reviewRange: 'W17–W23',    // Only review vocab from this range

  progressReward: {
    shield: 'movers_progress',   // Silver shield (not gold graduation)
    message_en: 'You\'re halfway there! Keep going! 💪',
    message_vi: 'Bạn đã đi được nửa đường! Tiếp tục nào! 💪',
    unlocksDiagnosticReport: true,
  },

  voiceConfig: {
    examiner_female: { name: 'en-US-Neural2-F', pitch: 0.5, rate: 0.85 },
    student_jake:    { name: 'en-US-Neural2-D', pitch: 2.0, rate: 0.90 },
    student_mia:     { name: 'en-US-Neural2-C', pitch: 4.5, rate: 0.88 },
    narrator:        { name: 'en-US-Neural2-A', pitch: 0.5, rate: 0.86 },
    teacher:         { name: 'en-US-Neural2-H', pitch: 0, rate: 0.84 },
  },
};

// ═══════════════════════════════════════════════════════════════
// READING_HUB.JS — W24 Review (W17–W23 vocab only)
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  read_explore: {
    title: 'Review Story: Jake\'s Best Weeks!',
    // Review narrative touching all W17–W23 themes
    // (school, home, food, animals, sport, clothes, time)
    story_scenes: [
      {
        id: 'scene_w24_1', scene_number: 1,
        title_en: '', title_vi: '',
        narration_en: '', // Review of W17–W23 vocabulary only
        narration_vi: '',
        image_url: '/images/week24/scene1.webp',
        hotspots: [
          { id: 'hs_1', label_en: '', label_vi: '', x: 30, y: 40 },
          { id: 'hs_2', label_en: '', label_vi: '', x: 60, y: 50 },
          { id: 'hs_3', label_en: '', label_vi: '', x: 45, y: 70 },
        ],
      },
      // ... scenes 2-5 (review different topics each scene)
    ],

    clil_article: {
      id: 'clil_w24_review',
      theme: 'My Favourite Things — Movers Review',
      title_en: '', title_vi: '',
      content_en: '', // Review passage: ≥100 words, W17–W23 vocab only
      content_vi: '',
      audio_url: '/audio/week24/clil_review.mp3',
      // No inference_questions for A1 Movers
    },
  },

  retellData: {
    questions: [
      // Review retell sentences covering W17–W23 grammar:
      // past simple, present continuous, can/can't
      {
        id: 1, sentence: '', chips: [], image_cue: '',
      },
      // 4 more review sentences
    ],
  },

  shadowingData: {
    sentences: [
      // 6 review sentences (from W17–W23 shadowing bank)
    ],
  },

  // W24: 20 REVIEW words (no new vocab — sampled from W17–W23 vocab banks)
  vocab: [
    // NOTE: These are review words, not new words
    // Source: high-frequency words from W17–W23 vocab lists
    { id: 1, word: '', definition_en: '', definition_vi: '', example_en: '', example_vi: '' },
    // ... 19 more
  ],

  // ── Zone 5: Full Movers Reading & Writing Mock ──
  reading_assessment: {
    // Movers R1: Match sentences to pictures (6 sentences, 8 options)
    movers_r1: { sentences: [], pictures: [] },
    // Movers R2: 3-option picture MCQ (5 questions)
    movers_r2: { questions: [] },
    // Movers R3: Cloze (7 gaps, A-H options from word box)
    movers_r3: { story: '', gaps: [], options: [] },
    // Movers R4: Letter/message — write info from text
    movers_r4: { text: '', fields_to_complete: [] },
    // Movers R5: Read and choose (5 MCQ from a text)
    movers_r5: { text: '', questions: [] },
  },
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — W24 Review activities + Full Movers L Mock
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  // Days 1–4: Review activities using W17–W23 content
  science_lab: { title: 'Review Lab', steps: [] },
  word_match: [], // Review word-picture pairs
  grammar_exercises: [], // Review grammar drills
  singapore_math: [
    // Review bar models (single and double-step problems from W17–W23)
    { id: 1, problem_en: '', bar_model_svg: '', answer_value: 0 },
    // ... 4 more
  ],
  dictation: [],

  // ── Zone 5: Full Movers Listening Mock (4 parts) ──
  // Timer: 25 minutes total
  movers_l1: {
    // L1: Draw lines (match 5 names to 8 positions in a picture)
    image_url: '',
    audio_url: '/audio/week24/listening_l1.mp3',
    names: [],
    targets: [],
    answers: [],            // correct name→target mapping
  },
  movers_l2: {
    // L2: Write answers (5 questions from listening)
    audio_url: '/audio/week24/listening_l2.mp3',
    questions: [],
    answers: [],
  },
  movers_l3: {
    // L3: Tick correct picture (6 questions × 3 pictures each)
    audio_url: '/audio/week24/listening_l3.mp3',
    questions: [],          // Each: { stem, options: [img_a, img_b, img_c], answer }
  },
  movers_l4: {
    // L4: Match (5 items to 8 categories)
    audio_url: '/audio/week24/listening_l4.mp3',
    items: [],
    categories: [],
    answers: [],
  },
};

// ═══════════════════════════════════════════════════════════════
// WRITING_HUB.JS — W24 Story review
// ═══════════════════════════════════════════════════════════════
export const writing_hub_skeleton = {
  // Review story writing task (familiar topic from W17–W23)
  picture_story: {
    images: [],             // 3 panels using familiar characters/settings
    scaffolding: {
      level_1_cloze: [],    // Review grammar structures
      level_2_pills: [],
      level_3_open: { minWords: 20 },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — Full Movers Speaking Mock
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  // Review broadcast activity
  talkshow_video: { video_id: '', title: '' },
  info_exchange_cards: { card_a: {}, card_b: {} },
  find_differences: { image_a: '', image_b: '', differences: [] },

  // ── Zone 5: Full Movers Speaking Mock (3 parts) ──
  // Timer: 5–7 minutes total
  movers_s1: {
    // S1: Find the differences (2 pictures, 5 differences)
    image_a: '', image_b: '',
    model_sentence: '', // "In picture A, the [object] is [adj]..."
    differences: [],    // 5 differences to find/describe
  },
  movers_s2: {
    // S2: Picture story (examiner shows 4 pictures, student tells story)
    images: [],         // 4 sequential story panels
    examiner_intro: '', // Examiner narrates picture 1
    student_scope: [2, 3, 4], // Student narrates pictures 2-4
  },
  movers_s3: {
    // S3: Personal questions (about student's own life)
    questions: [
      // 5–6 personal questions touching W17–W23 topics
      // E.g.: "What's your favourite subject at school?"
      //       "What did you do last weekend?"
    ],
  },
};

// ═══════════════════════════════════════════════════════════════
// Diagnostic Report Config (unique to mid-way mock)
// ═══════════════════════════════════════════════════════════════
export const diagnosticConfig = {
  enabled: true,
  skillBreakdown: ['Listening', 'Reading', 'Writing', 'Speaking'],
  generateRecommendations: true,   // "Focus on R3 gap-fill and L4 matching"
  parentNotification: true,        // Send diagnostic to Parent Dashboard
};

export const examTimerConfig = {
  listening_total_minutes: 25,
  reading_writing_total_minutes: 30,
  speaking_total_minutes: 7,
  show_countdown: true,
  auto_submit_on_expiry: true,
};
