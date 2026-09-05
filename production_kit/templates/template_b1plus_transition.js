/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: B1+ Academic Reading Transition Week (W113+)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Applicable: W113–W156 (B1+ Strong Academic Reading & Structured Opinion)
 * CEFR Stage: B1+ Academic
 * Final generation (Gen 3) — highest complexity tier
 * 
 * KEY CHANGES from B1 PET:
 *   - Reading: Academic texts 500–800 words with inference + argument extraction
 *   - Writing: Opinion Essay ≥140–190 words + Extended Project Report ≥500 words
 *   - Speaking: Structured Opinion Presentation 3–5 min + Academic Interview
 *   - Listening: Academic lectures, podcasts, extended discussions
 *   - Scoring: B1+ Academic Proficiency Scale + Portfolio Grade (A/B/C/D)
 *   - Mock Test label: "★ B1+ Academic Assessment Mock"
 *   - inference_questions: REQUIRED (≥3 items with deeper analytical types)
 */

export const index_skeleton = {
  weekNumber: 0,        // REPLACE: 113–156
  title: '',
  theme: '',
  cefrLevel: 'B1+',
  isFullMock: false,     // true for W117, W122, W127, W132, W137, W142, W147, W152, W156
  mockExamType: 'B1_PLUS_ACADEMIC',
  weekType: 'rotary_practice',
  generation: 3,
  voiceConfig: {
    examiner_female: { name: 'en-US-Neural2-F', pitch: -1.0, rate: 0.90 },
    student_jake:    { name: 'en-US-Neural2-D', pitch: 0, rate: 0.94 },
    student_mia:     { name: 'en-US-Neural2-C', pitch: 2.0, rate: 0.92 },
    narrator:        { name: 'en-US-Neural2-A', pitch: 0, rate: 0.92 },
    teacher:         { name: 'en-US-Neural2-H', pitch: -0.5, rate: 0.90 },
  },
  rotaryParts: {
    listening: [],      // REPLACE: 2 of Academic L1–L4
    reading: [],        // REPLACE: 2 of Academic R1–R6
    speaking: [],       // REPLACE: 1 of Academic S1–S3
  },
};

// ═══════════════════════════════════════════════════════════════
// READING_HUB.JS — Gen 3 Academic Reading
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  read_explore: {
    title: '',
    story_scenes: [
      // 5 scenes — now more complex narrative with academic themes
      {
        id: 'scene_wNN_1',
        scene_number: 1,
        title_en: '',
        title_vi: '',
        narration_en: '',     // ≤30 words/sentence for academic register
        narration_vi: '',
        image_url: '/images/weekNN/scene1.webp',
        hotspots: [
          { id: 'hs_1', label_en: '', label_vi: '', x: 30, y: 40 },
          { id: 'hs_2', label_en: '', label_vi: '', x: 60, y: 50 },
          { id: 'hs_3', label_en: '', label_vi: '', x: 45, y: 70 },
        ],
      },
    ],

    clil_article: {
      id: 'clil_wNN_topic',
      theme: '',              // Academic CLIL: interdisciplinary deep-dive
      title_en: '',
      title_vi: '',
      content_en: '',         // ≥400 words — academic register with argumentation
      content_vi: '',
      audio_url: '/audio/weekNN/clil_topic.mp3',
      vocab_focus: [],        // Academic Word List basic terms allowed
      grammar_patterns: [],   // Passive, Conditionals 2/3, Relative clauses
      sentence_drills: [],
      glossary: [],

      // ⭐ INFERENCE QUESTIONS — REQUIRED ≥3 items for Gen 3
      // Higher-order thinking: analysis, evaluation, synthesis
      inference_questions: [
        {
          id: 'infer_1',
          text: '',           // "What is the author's main argument about...?"
          type: 'mcq_with_evidence',
          options: ['', '', '', ''],
          correct: 0,
          scaffoldHint: '',
        },
        {
          id: 'infer_2',
          text: '',           // "Which piece of evidence best supports the claim that...?"
          type: 'mcq_with_evidence',
          options: ['', '', '', ''],
          correct: 0,
          scaffoldHint: '',
        },
        {
          id: 'infer_3',
          text: '',           // "Evaluate the strength of the argument..."
          type: 'open_response',
          modelAnswer: '',
          acceptableKeywords: [],
        },
        {
          id: 'infer_4',
          text: '',           // "How might this conclusion change if...?"
          type: 'open_response',
          modelAnswer: '',
          acceptableKeywords: [],
        },
      ],
    },
  },

  shadowingData: { sentences: [/* ≥12 sentences for B1+ */] },
  retellData: { questions: [] },
  vocab: [/* EXACTLY 20 items — Academic Word List basic terms allowed */],

  // ── Zone 5: B1+ Academic Reading Assessment ──
  reading_assessment: {
    // Part 1: Academic text 500–800 words with argument extraction
    acad_r1: { text: '', argument_questions: [] },
    // Part 2: Inference questions on academic passage
    acad_r2: { text: '', inference_questions: [] },
    // Part 3: Gapped text — insert removed sentences
    acad_r3: { text: '', removed_sentences: [] },
    // Part 4: Open cloze (academic register)
    acad_r4: { text: '', gaps: [] },
    // Part 5: Summary completion
    acad_r5: { text: '', summary_gaps: [] },
    // Part 6: Cross-text comparison
    acad_r6: { text_a: '', text_b: '', comparison_questions: [] },
  },
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — B1+ Academic Listening
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  science_lab: { title: '', steps: [] },
  word_match: [],
  grammar_exercises: [],
  singapore_math: [/* 5 problems — advanced multi-step for B1+ */],
  dictation: [],

  // ── Zone 5: B1+ Academic Listening ──
  // Part 1: Academic lecture note-taking
  acad_l1: { lecture_title: '', audio_url: '', notes_template: '', gaps: [] },
  // Part 2: Academic podcast with MCQ
  acad_l2: { podcast_title: '', audio_url: '', questions: [] },
  // Part 3: Extended academic discussion (2+ speakers)
  acad_l3: { audio_url: '', questions: [] },
  // Part 4: Short academic talks — matching
  acad_l4: { talks: [], categories: [] },
};

// ═══════════════════════════════════════════════════════════════
// WRITING_HUB.JS — B1+ Academic Writing
// ═══════════════════════════════════════════════════════════════
export const writing_hub_skeleton = {
  // ── Zone 4: Story Writer → now Opinion Essay ──
  writing_task: {
    type: 'opinion_essay',
    prompt: '',               // REPLACE: debate topic
    minWords: 140,
    maxWords: 190,
    scaffolding: {
      level_1_frame: '',      // Introduction-Body-Conclusion frame
      level_2_outline: [],    // Topic sentence + supporting points
      level_3_open: { minWords: 140 },
    },
    rubric: {
      content: 5,
      communicative_achievement: 5,
      organisation: 5,
      language: 5,
    },
  },

  // ── Extended Project Report (unique to Gen 3) ──
  extended_project: {
    title: '',
    research_question: '',
    minWords: 500,
    sections: ['Introduction', 'Method', 'Findings', 'Conclusion', 'Bibliography'],
    scaffolding: {
      level_1_template: {},   // Full section templates
      level_2_outline: [],    // Section headers + guiding questions
      level_3_open: {},       // Free-form with word counter
    },
  },

  // ── Zone 5: B1+ Academic Writing Assessment ──
  acad_writing: {
    part_1: { prompt: '', minWords: 140 },   // Opinion essay
    part_2: { prompt: '', minWords: 500 },   // Extended report (portfolio)
  },
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — B1+ Academic Speaking
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  talkshow_video: { video_id: '', title: '' },
  info_exchange_cards: { card_a: {}, card_b: {} },
  find_differences: { image_a: '', image_b: '', differences: [] },

  // ── Zone 5: B1+ Academic Speaking Assessment ──
  speaking_assessment: {
    // Structured Opinion Presentation (3–5 minutes, recorded)
    opinion_presentation: {
      topic: '',
      preparation_time_seconds: 60,
      presentation_time_seconds: 300,
      rubric_criteria: ['Content & Argument', 'Structure', 'Fluency', 'Academic Vocabulary', 'Pronunciation'],
    },
    // Extended Project Report presentation (recorded)
    project_presentation: {
      linked_to: 'extended_project',
      presentation_time_seconds: 300,
    },
    // Academic Interview (examiner asks follow-up questions)
    academic_interview: {
      questions: [],          // REPLACE: 4–6 academic follow-up questions
    },
  },

  // Scoring: B1+ Academic Proficiency Scale + Portfolio Grade
  scoringScale: {
    type: 'b1plus_academic',
    proficiencyLevels: ['Developing', 'Competent', 'Proficient', 'Distinguished'],
    portfolioGrades: ['A', 'B', 'C', 'D'],
  },
};

// ═══════════════════════════════════════════════════════════════
// W156 CAPSTONE SPECIAL — Final Graduation Week
// ═══════════════════════════════════════════════════════════════
export const capstone_w156_additions = {
  // W156 is unique: 3-Year Portfolio Showcase + Graduation Ceremony
  isCapstone: true,
  portfolioPresentation: {
    duration_minutes: 10,
    sections: [
      'My English Journey (Timeline)',
      'Best Work Showcase (3 pieces)',
      'Extended Project Summary',
      'Self-Reflection & Future Goals',
    ],
  },
  graduationCeremony: {
    certificates: ['B1+ Academic Reading Proficiency', '3-Year EngQuest Completion'],
    portfolioGrade: null,     // Computed from all assessment data
  },
};
