/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: A2 Flyers Rotary Practice Week (W33–W72)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Usage: Copy this skeleton when creating a new Rotary Practice week.
 *        Replace all /* REPLACE: ... *​/ markers with actual content.
 * 
 * Applicable: W33–W72 (excluding Full Mock Test weeks: W37, W42, W47, W52, W57, W62, W67, W72)
 * CEFR Stage: A2 Flyers
 * Week Type: rotary_practice (isFullMock: false)
 * Architecture: 15 Quests / 5 Zones / 4 Hubs
 * 
 * Data Contract v2.0.0 (2026-09-05):
 *   - inference_questions[] REQUIRED in clil_article (≥2 items, W49+ enforced by gate18)
 *   - vocab[] EXACTLY 20 items with definition_en + definition_vi (SRS Leitner enrollment)
 */

// ═══════════════════════════════════════════════════════════════
// INDEX.JS — Week Metadata
// ═══════════════════════════════════════════════════════════════
export const index_skeleton = {
  weekNumber: 0,        // REPLACE: week number (33–72)
  title: '',            // REPLACE: "Jake's Corridor Friction Adventure" 
  theme: '',            // REPLACE: "Science of Friction"
  cefrLevel: 'A2',
  isFullMock: false,
  weekType: 'rotary_practice',
  // Zone 5 rotary schedule — which Cambridge parts to practice this week
  // Cycle: Each week covers 4 parts. Over 4 weeks all 16 parts are covered.
  rotaryParts: {
    listening: [],      // REPLACE: e.g. ['L1', 'L2'] — 2 of L1-L5
    reading: [],        // REPLACE: e.g. ['R1', 'R3'] — 2 of R1-R6
    speaking: [],       // REPLACE: e.g. ['S1'] — 1 of S1-S4
  },
  voiceConfig: {
    // 5 distinct TTS voices for dialogue diversity
    examiner_female: { name: 'en-US-Neural2-F', pitch: -1.5, rate: 0.86 },
    student_jake:    { name: 'en-US-Neural2-D', pitch: 1.0, rate: 0.92 },
    student_mia:     { name: 'en-US-Neural2-C', pitch: 4.0, rate: 0.90 },
    narrator:        { name: 'en-US-Neural2-A', pitch: 0, rate: 0.88 },
    teacher:         { name: 'en-US-Neural2-H', pitch: -0.5, rate: 0.85 },
  },
};

// ═══════════════════════════════════════════════════════════════
// READING_HUB.JS — Powers Zone 1 (Webtoon, Retell), Zone 2 (Fact Finder), Zone 5 (Reading Shield)
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  // ── Zone 1: Story World ──
  read_explore: {
    title: '',          // REPLACE: story title
    story_scenes: [
      // EXACTLY 5 scenes required
      {
        id: 'scene_wNN_1',                    // REPLACE: wNN
        scene_number: 1,
        title_en: '',                         // REPLACE
        title_vi: '',                         // REPLACE  
        narration_en: '',                     // REPLACE: ≤22 words/sentence, storytelling style
        narration_vi: '',                     // REPLACE: Vietnamese diacritics required
        image_url: '/images/weekNN/scene1.webp',  // REPLACE: NN
        hotspots: [
          // EXACTLY 3 hotspots per scene
          { id: 'hs_1', label_en: '', label_vi: '', x: 30, y: 40 },
          { id: 'hs_2', label_en: '', label_vi: '', x: 60, y: 50 },
          { id: 'hs_3', label_en: '', label_vi: '', x: 45, y: 70 },
        ],
      },
      // ... scenes 2-5 follow same structure
    ],

    // ── Zone 2: CLIL Article (Fact Finder) ──
    clil_article: {
      id: 'clil_wNN_topic',                  // REPLACE
      theme: '',                              // REPLACE: CLIL topic (science/social studies/geography)
      title_en: '',                           // REPLACE
      title_vi: '',                           // REPLACE
      content_en: '',                         // REPLACE: ≥200 words, ≤24 words/sentence
      content_vi: '',                         // REPLACE: full Vietnamese diacritics
      audio_url: '/audio/weekNN/clil_topic.mp3', // REPLACE

      // Vocab focus: 10–15 pedagogical target collocations
      vocab_focus: [],                        // REPLACE: ['invisible science force', ...]

      // Grammar patterns: 2 regex patterns with paragraph scope
      grammar_patterns: [
        {
          pattern: '',                        // REPLACE: regex
          label: '',                          // REPLACE: grammar label
          paragraph_scope: 1,
        },
      ],

      // Sentence drills: 2 scrambled sentence exercises
      sentence_drills: [
        {
          id: 1,
          label: '',                          // REPLACE
          scrambled: [],                      // REPLACE: chunks in wrong order
          correct: [],                        // REPLACE: chunks in correct order
        },
      ],

      // Glossary: 6–8 key terms
      glossary: [
        { term: '', meaning: '' },            // REPLACE
      ],

      // ⭐ INFERENCE QUESTIONS (v2.0.0 — 5-feature compliance)
      // At least 2 questions: 1× MCQ + 1× open_response
      inference_questions: [
        {
          id: 'infer_1',
          text: '',                           // REPLACE: "Why did [character] [action]?"
          type: 'mcq_with_evidence',
          options: ['', '', ''],              // REPLACE: 3–4 options
          correct: 0,                         // REPLACE: index of correct answer
          scaffoldHint: '',                   // REPLACE: "Look at paragraph 2..."
        },
        {
          id: 'infer_2',
          text: '',                           // REPLACE: "What can we learn from...?"
          type: 'open_response',
          modelAnswer: '',                    // REPLACE: full model answer
          acceptableKeywords: [],             // REPLACE: ['keyword1', 'keyword2', ...]
        },
      ],
    },
  },

  // ── Shadowing Data (Voice Shadow) ──
  shadowingData: {
    sentences: [
      // ≥8 sentences from the story narration
      {
        id: 1,
        text: '',                             // REPLACE: sentence from story
        words: [],                            // REPLACE: ['word1', 'word2', ...]
        ipa: [],                              // REPLACE: ['/wɜːrd/', ...]
        audio_url: '/audio/weekNN/shadow_1.mp3',
      },
      // ... 7+ more sentences
    ],
  },

  // ── Story Retell Data ──
  retellData: {
    questions: [
      // Retell scaffolding: full/half/chunks modes
      {
        id: 1,
        sentence: '',                         // REPLACE: full model sentence
        chips: [],                            // REPLACE: Linear Thinking ESL collocation chunks
                                              // e.g. ['Jake was', 'walking carefully', 'down the', 'school corridor']
        image_cue: '',                        // REPLACE: visual prompt keyword
      },
    ],
  },

  // ── Vocabulary (SRS Leitner auto-enrollment) ──
  // EXACTLY 20 items. Each word auto-enrolls in SRS box 1 on first encounter.
  vocab: [
    {
      id: 1,
      word: '',                               // REPLACE
      definition_en: '',                      // REPLACE
      definition_vi: '',                      // REPLACE: full Vietnamese diacritics
      example_en: '',                         // REPLACE
      example_vi: '',                         // REPLACE
    },
    // ... 19 more vocab items (total: 20)
  ],

  // ── Zone 5: Reading Shield (Rotary Parts) ──
  // Only include parts specified in index.rotaryParts.reading
  reading_assessment: {
    // Include 2 of: rw_part_1, rw_part_2, rw_part_3, rw_part_4, rw_part_5, rw_part_6
  },
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — Powers Zone 2 (Action Lab), Zone 3 (Battle Arena), Zone 5 (Listening Shield)
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  // ── Zone 2: Action Lab (science_lab) ──
  science_lab: {
    title: '',                                // REPLACE: experiment title
    steps: [],                                // REPLACE: drag-drop experiment steps
  },

  // ── Zone 3: Battle Arena ──
  // Speed Match (word_blitz)
  word_match: [],                             // REPLACE: word-definition pairs from vocab

  // Grammar Duel (sentence_smash) — 20 exercises
  grammar_exercises: [],                      // REPLACE: scrambled sentences

  // Math Quest (math_quest) — 5 Singapore Math Bar Model problems
  singapore_math: [
    {
      id: 1,
      problem_en: '',                         // REPLACE
      bar_model_svg: '/images/weekNN/barmodel_wNN_adv_p1.svg',
      answer_value: 0,                        // REPLACE
    },
    // ... 4 more problems (total: 5)
  ],

  // ── Zone 3: Dictation ──
  dictation: [],                              // REPLACE: ≥5 dictation sentences

  // ── Zone 5: Listening Shield (Rotary Parts) ──
  // Only include parts specified in index.rotaryParts.listening
  listening_p1: {
    image_url: '/images/weekNN/listening_p1_scene.webp',
    names: [],                                // REPLACE: ≥6 character names
    targets: [],                              // REPLACE: ≥6 target objects/locations
  },
  listening_p3: {
    items: [],                                // REPLACE: ≥5 conversation items
    cards: [],                                // REPLACE: exactly 8 cards (A–H)
  },
  listening_p5: {
    image_url: '/images/weekNN/listening_p5_scene.webp',
    instructions: [],                         // REPLACE: ≥4 color+write instructions
  },
};

// ═══════════════════════════════════════════════════════════════
// WRITING_HUB.JS — Powers Zone 4 (Story Writer), Zone 5 (R&W Shield Part 7)
// ═══════════════════════════════════════════════════════════════
export const writing_hub_skeleton = {
  // ── Zone 4: Story Writer (3-picture narrative ≥20 words) ──
  picture_story: {
    images: [],                               // REPLACE: 3 story panel image URLs
    scaffolding: {
      level_1_cloze: [],                      // REPLACE: guided cloze frames
      level_2_pills: [],                      // REPLACE: collocation keyword pills
      level_3_open: { minWords: 20 },         // Open composition
    },
  },

  // ── Zone 5: Reading & Writing Shield ──
  rw_part_1: { words: [], definitions: [] },  // REPLACE
  rw_part_2: { turns: [], options: [] },      // REPLACE
  rw_part_4: { text_template: '', answers: [] }, // REPLACE
  rw_part_5: { title: '', story_text: '', questions: [] }, // REPLACE
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — Powers Zone 4 (Video Challenge, Info Exchange), Zone 5 (Speaking Shield)
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  // ── Zone 4: Video Challenge (broadcast_studio) ──
  talkshow_video: {
    video_id: '',                             // REPLACE: YouTube video ID
    title: '',                                // REPLACE
  },

  // ── Zone 4: Info Exchange ──
  info_exchange_cards: {
    card_a: {},                               // REPLACE: student A cue card
    card_b: {},                               // REPLACE: student B cue card
  },

  // ── Zone 4: Spot Differences ──
  find_differences: {
    image_a: '',                              // REPLACE
    image_b: '',                              // REPLACE
    differences: [],                          // REPLACE: calibrated hotspot differences
  },

  // ── Zone 5: Speaking Shield (Rotary Parts) ──
  // Only include parts specified in index.rotaryParts.speaking
  speaking_assessment: {
    // Include 1 of: S1 (spot diff), S2 (info exchange), S3 (picture story), S4 (personal interview)
  },
};

// ═══════════════════════════════════════════════════════════════
// QUALITY GATES CHECKLIST — Must pass before merge
// ═══════════════════════════════════════════════════════════════
// 1. npm run audit:cefr <N>           — 0 B2/C1 vocab violations
// 2. node scripts/audit_all_w33_tasks.mjs — 15/15 tasks pass
// 3. node scripts/gate17_fidelity_doctrine.mjs <N> — schema valid
// 4. node scripts/gate18_feature_compliance.mjs <N> — 5-feature contracts OK
// 5. npm run build — exit code 0
