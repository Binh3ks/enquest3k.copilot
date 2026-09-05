/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: W32 — Movers Graduation Mock (Final Mock)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Applicable: W32 ONLY
 * CEFR Stage: A1 Movers → A2 Flyers (threshold)
 * Mode: FULL MODE (15 quests) — Graduation celebration
 * Purpose: Final Movers mock before transitioning to Flyers (W33).
 *          This is the last A1 Movers week. W33 = new chapter.
 * 
 * KEY DIFFERENCES from W24 mid-mock:
 *   - reviewRange: 'W17–W31' (all Movers weeks, not just W17–W23)
 *   - Graduation GOLD shield + certificate unlocked
 *   - "Flyers Preview" teaser after completion (unlock W33)
 *   - Harder diagnostic: identifies readiness for A2 Flyers
 *   - Special W32→W33 transition message to students
 *   - Parent Dashboard: A1 Movers Completion Badge
 * 
 * After W32 graduation:
 *   → Students unlock W33 (A2 Flyers begin)
 *   → App switches from 'movers_a1' vocab source to 'flyers_a2'
 *   → isLiteMode stays false (Full Mode continues)
 *   → Assessment format changes: Movers 4-part → Flyers 5-part
 */

export const index_skeleton = {
  weekNumber: 32,
  title: '★ Movers Graduation — I\'m Ready for Flyers! 🎓',
  theme: 'Graduation & New Adventure',
  cefrLevel: 'A1',
  isLiteMode: false,
  isFullMock: true,
  mockExamType: 'MOVERS',
  weekType: 'full_mock',
  vocabSource: 'movers_a1',
  isGraduationMock: true,   // Full graduation — unlocks next tier
  reviewRange: 'W17–W31',   // All Movers content

  graduationReward: {
    shield: 'movers_gold',       // GOLD graduation shield
    certificate: 'A1_MOVERS_COMPLETION',
    message_en: 'Congratulations! You have completed A1 Movers! 🎓 Flyers awaits!',
    message_vi: 'Chúc mừng! Bạn đã hoàn thành A1 Movers! 🎓 Tiếp theo là Flyers!',
    unlocksNextTier: 'flyers',
    flyers_preview: {
      // Show a teaser of what's coming in W33
      title_en: 'What\'s coming in Flyers?',
      title_vi: 'Flyers có gì mới?',
      preview_items: [
        'Longer stories with more details',
        'Cambridge A2 Flyers exam practice',
        'Harder math problems',
        'More speaking challenges',
      ],
    },
  },

  parentDashboard: {
    badge: 'A1_MOVERS_COMPLETE',
    skillSummary: true,          // Full W17–W31 skill summary for parents
    recommendNextTier: 'A2_FLYERS',
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
// READING_HUB.JS — W32 Grand Review (W17–W31 all topics)
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  read_explore: {
    title: 'Jake\'s Movers Journey — Grand Finale!',
    // Grand review story: must touch ALL Movers topic areas:
    // school, home, food, animals, sport, clothes, time, weather,
    // transport, health, shopping, hobbies, jobs, places in town
    story_scenes: [
      {
        id: 'scene_w32_1', scene_number: 1,
        title_en: 'The Big Celebration',
        title_vi: 'Bữa tiệc lớn',
        narration_en: '', // Grand finale narrative — all topics woven in
        narration_vi: '',
        image_url: '/images/week32/scene1.webp',
        hotspots: [
          { id: 'hs_1', label_en: '', label_vi: '', x: 30, y: 40 },
          { id: 'hs_2', label_en: '', label_vi: '', x: 60, y: 50 },
          { id: 'hs_3', label_en: '', label_vi: '', x: 45, y: 70 },
        ],
      },
      // ... scenes 2-5 (each scene = different Movers topic review)
    ],

    clil_article: {
      id: 'clil_w32_grand_review',
      theme: 'My Movers World — Everything I Know',
      title_en: 'A Year of Adventures with Jake',
      title_vi: 'Một năm phiêu lưu cùng Jake',
      content_en: '', // Grand review: all topics, ≥120 words, ≤15 words/sentence
      content_vi: '',
      audio_url: '/audio/week32/clil_grand_review.mp3',
      // No inference_questions for A1 Movers
    },
  },

  retellData: {
    questions: [
      // 5 sentences covering ALL key grammar from W17–W31:
      // past simple, present continuous, comparatives, can/can't, there is/are
      { id: 1, sentence: '', chips: [], image_cue: '' },
      { id: 2, sentence: '', chips: [], image_cue: '' },
      { id: 3, sentence: '', chips: [], image_cue: '' },
      { id: 4, sentence: '', chips: [], image_cue: '' },
      { id: 5, sentence: '', chips: [], image_cue: '' },
    ],
  },

  shadowingData: {
    sentences: [
      // 8 sentences — grand review, matching exam rhythm
    ],
  },

  // W32: 20 REVIEW words — the most important Movers words from W17–W31
  // Selection criteria: high frequency in Movers exams, common mistakes
  vocab: [
    { id: 1, word: '', definition_en: '', definition_vi: '', example_en: '', example_vi: '' },
    // ... 19 more review words
  ],

  // ── Zone 5: Full Movers Reading & Writing (harder questions than W24) ──
  reading_assessment: {
    // W32 mock uses different questions than W24 (never repeat same mock)
    movers_r1: { sentences: [], pictures: [] },   // Match sentences to pictures
    movers_r2: { questions: [] },                  // 3-option picture MCQ
    movers_r3: { story: '', gaps: [], options: [] }, // Cloze (7 gaps)
    movers_r4: { text: '', fields_to_complete: [] }, // Write info from text
    movers_r5: { text: '', questions: [] },          // Read and choose MCQ
  },
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — Full Movers Listening Mock (harder than W24)
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  // Days 1–4: Grand review activities
  science_lab: { title: 'Grand Review Lab', steps: [] },
  word_match: [],
  grammar_exercises: [],
  singapore_math: [
    // W32: Final Movers math — include double-step problems
    // (stepping stone toward Flyers bar models in W33)
    { id: 1, problem_en: '', bar_model_svg: '', answer_value: 0 },
    // ... 4 more (2 single-step, 2 double-step, 1 mixed)
  ],
  dictation: [],

  // ── Zone 5: Full Movers Listening Mock ──
  // DIFFERENT questions from W24 mid-mock (never reuse)
  // Timer: 25 minutes
  movers_l1: {
    image_url: '',
    audio_url: '/audio/week32/listening_l1.mp3',
    names: [], targets: [], answers: [],
  },
  movers_l2: {
    audio_url: '/audio/week32/listening_l2.mp3',
    questions: [], answers: [],
  },
  movers_l3: {
    audio_url: '/audio/week32/listening_l3.mp3',
    questions: [],
  },
  movers_l4: {
    audio_url: '/audio/week32/listening_l4.mp3',
    items: [], categories: [], answers: [],
  },
};

// ═══════════════════════════════════════════════════════════════
// WRITING_HUB.JS — Grand Review Story
// ═══════════════════════════════════════════════════════════════
export const writing_hub_skeleton = {
  // Grand finale story using all Movers grammar
  picture_story: {
    images: [],             // 3 panels: graduation-themed story
    scaffolding: {
      level_1_cloze: [],    // Mixed grammar (all W17–W31 structures)
      level_2_pills: [],
      level_3_open: { minWords: 20 },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — Grand Speaking Mock + Graduation Ceremony
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  talkshow_video: { video_id: '', title: '' },
  info_exchange_cards: { card_a: {}, card_b: {} },
  find_differences: { image_a: '', image_b: '', differences: [] },

  // ── Zone 5: Full Movers Speaking Mock ──
  // DIFFERENT topic from W24 (never repeat same mock)
  movers_s1: {
    image_a: '', image_b: '',
    model_sentence: '',
    differences: [],
  },
  movers_s2: {
    images: [],             // 4 story panels (graduation-themed)
    examiner_intro: '',
    student_scope: [2, 3, 4],
  },
  movers_s3: {
    questions: [
      // Cover all Movers topics W17–W31
      // Also hint at Flyers topics: "What do you want to learn next?"
    ],
  },

  // ── Graduation Ceremony (trigger after Speaking Mock completes) ──
  graduation: {
    shield_unlocked: 'movers_gold',
    certificate: 'A1_MOVERS_COMPLETION',
    confetti: true,
    fireworks: true,        // Extra celebration for graduation vs mid-way
    next_tier_unlock: {
      tier: 'flyers',
      week: 33,
      preview_title: 'Your next adventure: A2 Flyers starts next week!',
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// Flyers Readiness Check (unique to W32)
// ═══════════════════════════════════════════════════════════════
export const flyersReadinessConfig = {
  // After graduation mock, compute Flyers readiness score
  enabled: true,
  thresholds: {
    ready: 80,        // ≥80% → "Fully ready for Flyers!"
    nearly: 65,       // 65–79% → "Nearly ready — review these areas"
    needsWork: 0,     // <65% → "Spend 1 extra week on [topics] before Flyers"
  },
  // If needsWork: app can suggest W32+ remediation (optional extension week)
  allowExtensionWeek: false,  // Product decision — set to true if implemented
};

export const examTimerConfig = {
  listening_total_minutes: 25,
  reading_writing_total_minutes: 30,
  speaking_total_minutes: 7,
  show_countdown: true,
  auto_submit_on_expiry: true,
};
