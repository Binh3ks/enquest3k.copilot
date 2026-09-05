/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: B1 PET Transition Week (W73+)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Applicable: W73–W112 (B1 Preliminary & CLIL Lab)
 * CEFR Stage: B1 Preliminary (PET)
 * First week of Generation 2 — major schema changes from Flyers
 * 
 * KEY CHANGES from A2 Flyers:
 *   - Listening: PET Parts 1–4 replace Flyers Parts 1–5
 *   - Reading: PET Parts 1–6 replace Flyers Parts 1–6
 *   - Writing: Email/article ≥100 words replaces 3-picture story ≥20 words
 *   - Speaking: PET Parts 1–4 + CLIL CER Viva Voce
 *   - Scoring: Cambridge English Scale 140–160 replaces 15 Shields
 *   - Sentence length: ≤28 words (up from ≤24)
 *   - Vocab: B1 PET wordlist (`pet_b1.json`) now allowed
 *   - inference_questions: REQUIRED (≥2 items, enforced by gate18)
 */

export const index_skeleton = {
  weekNumber: 0,        // REPLACE: 73–112
  title: '',
  theme: '',
  cefrLevel: 'B1',
  isFullMock: false,     // true for W77, W82, W87, W92, W97, W102, W107, W112
  mockExamType: 'B1_PET', // only when isFullMock: true
  weekType: 'rotary_practice', // or 'full_mock'
  generation: 2,         // Gen 2 marker
  voiceConfig: {
    examiner_female: { name: 'en-US-Neural2-F', pitch: -1.5, rate: 0.88 },
    student_jake:    { name: 'en-US-Neural2-D', pitch: 0.5, rate: 0.92 },
    student_mia:     { name: 'en-US-Neural2-C', pitch: 3.0, rate: 0.90 },
    narrator:        { name: 'en-US-Neural2-A', pitch: 0, rate: 0.90 },
    teacher:         { name: 'en-US-Neural2-H', pitch: -0.5, rate: 0.87 },
  },
  rotaryParts: {
    listening: [],      // REPLACE: 2 of PET L1–L4
    reading: [],        // REPLACE: 2 of PET R1–R6
    speaking: [],       // REPLACE: 1 of PET S1–S4
  },
};

// ═══════════════════════════════════════════════════════════════
// READING_HUB.JS — Gen 2 Changes
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  read_explore: {
    title: '',
    story_scenes: [
      // STILL 5 scenes, but narration ≤28 words/sentence
      // Vocabulary can include B1 PET wordlist
      {
        id: 'scene_wNN_1',
        scene_number: 1,
        title_en: '',
        title_vi: '',
        narration_en: '',     // ≤28 words/sentence (up from ≤24)
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
      theme: '',              // CLIL expands: science, social studies, geography, history
      title_en: '',
      title_vi: '',
      content_en: '',         // ≥300 words for B1 (up from ≥200)
      content_vi: '',
      audio_url: '/audio/weekNN/clil_topic.mp3',
      vocab_focus: [],
      grammar_patterns: [],
      sentence_drills: [],
      glossary: [],

      // ⭐ INFERENCE QUESTIONS — REQUIRED from W49+ (Gen 2 always required)
      inference_questions: [
        {
          id: 'infer_1',
          text: '',           // "Why does the author argue that...?"
          type: 'mcq_with_evidence',
          options: ['', '', '', ''],  // 4 options for B1 difficulty
          correct: 0,
          scaffoldHint: '',
        },
        {
          id: 'infer_2',
          text: '',           // "What evidence supports the idea that...?"
          type: 'mcq_with_evidence',
          options: ['', '', '', ''],
          correct: 0,
          scaffoldHint: '',
        },
        {
          id: 'infer_3',
          text: '',           // "How would the outcome change if...?"
          type: 'open_response',
          modelAnswer: '',
          acceptableKeywords: [],
        },
      ],
    },
  },

  shadowingData: { sentences: [/* ≥10 sentences for B1 */] },
  retellData: { questions: [] },
  vocab: [/* EXACTLY 20 items — B1 PET wordlist allowed */],

  // ── Zone 5: PET Reading Assessment ──
  reading_assessment: {
    // PET Reading Part 1: Short texts with MCQ (signs, notices, labels)
    pet_r1: { items: [] },    // REPLACE: 5 items
    // PET Reading Part 2: Matching people to texts
    pet_r2: { people: [], texts: [] },
    // PET Reading Part 3: Long text with gapped sentences
    pet_r3: { text: '', gaps: [] },
    // PET Reading Part 4: Long text with MCQ
    pet_r4: { text: '', questions: [] },
    // PET Reading Part 5: Open cloze (6 gaps)
    pet_r5: { text: '', gaps: [] },
    // PET Reading Part 6: Word formation (6 gaps)
    pet_r6: { text: '', gaps: [] },
  },
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — PET Listening Format
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  science_lab: { title: '', steps: [] },
  word_match: [],
  grammar_exercises: [],
  singapore_math: [/* 5 Bar Model problems — complexity scales up for B1 */],
  dictation: [],

  // ── Zone 5: PET Listening Assessment ──
  // PET Part 1: 7 short conversations × 3-picture MCQ
  pet_l1: { questions: [] },  // REPLACE: 7 questions
  // PET Part 2: Note completion (monologue, 6 gaps)
  pet_l2: { notepad: '', gaps: [] },
  // PET Part 3: Long conversation — 6 MCQ
  pet_l3: { questions: [] },
  // PET Part 4: Long monologue — 6 True/False
  pet_l4: { statements: [] },
};

// ═══════════════════════════════════════════════════════════════
// WRITING_HUB.JS — PET Writing Format
// ═══════════════════════════════════════════════════════════════
export const writing_hub_skeleton = {
  // ── Zone 4: Story Writer — now ≥100 words ──
  writing_task: {
    type: 'email_or_article',     // PET format
    prompt: '',                   // REPLACE
    minWords: 100,
    scaffolding: {
      level_1_frame: '',          // Guided email/article frame
      level_2_outline: [],        // Paragraph topic outline
      level_3_open: { minWords: 100 },
    },
  },

  // ── Zone 5: PET Writing Assessment ──
  pet_writing: {
    part_1: {
      // Sentence transformations (5 items)
      items: [],                  // REPLACE
    },
    part_2: {
      // Email/article ≥100 words
      prompt: '',
      rubric: { content: 5, communicative_achievement: 5, organisation: 5, language: 5 },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — PET Speaking + CLIL Viva Voce
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  talkshow_video: { video_id: '', title: '' },
  info_exchange_cards: { card_a: {}, card_b: {} },
  find_differences: { image_a: '', image_b: '', differences: [] },

  // ── Zone 5: PET Speaking Assessment + CLIL Viva ──
  speaking_assessment: {
    // PET Part 1: Interview (2 min)
    pet_s1: { questions: [] },
    // PET Part 2: Simulated situation — decision making with visual prompts
    pet_s2: { situation: '', visual_url: '', options: [] },
    // PET Part 3: Photo description and discussion
    pet_s3: { photo_url: '', examiner_questions: [] },
    // PET Part 4: Topic discussion (extended from Part 3)
    pet_s4: { discussion_prompts: [] },
    // CLIL CER Viva Voce — experimental science Q&A
    clil_viva: {
      experiment_title: '',
      claim_prompt: '',
      evidence_data: {},
      reasoning_scaffold: [],
    },
  },

  // Scoring: Cambridge English Scale 140–160
  scoringScale: {
    type: 'cambridge_english_scale',
    min: 140,
    max: 160,
    passThreshold: 140,
    meritThreshold: 153,
    distinctionThreshold: 160,
  },
};
