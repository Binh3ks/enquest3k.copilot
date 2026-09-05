/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: A2 Flyers Full Mock Test Week
 * ═══════════════════════════════════════════════════════════════
 * 
 * Applicable: W37, W42, W47, W52, W57, W62, W67, W72
 * CEFR Stage: A2 Flyers
 * Week Type: full_mock (isFullMock: true)
 * 
 * KEY DIFFERENCE from Rotary:
 *   - Zone 5 (Day 5) activates ALL Cambridge exam parts with strict timer
 *   - Days 1–4 shift to Review & Priming mode (error analysis focus)
 *   - boss_listening: ALL 5 Listening Parts (L1–L5)
 *   - boss_reading: ALL 6 Reading Parts + Part 7 Writing
 *   - weekly_review: ALL 4 Speaking Parts
 */

export const index_skeleton = {
  weekNumber: 0,        // REPLACE: 37, 42, 47, 52, 57, 62, 67, or 72
  title: '',            // REPLACE
  theme: '',            // REPLACE
  cefrLevel: 'A2',
  isFullMock: true,     // ← KEY: triggers full exam mode in Zone 5
  mockExamType: 'FLYERS',
  weekType: 'full_mock',
  // No rotaryParts — ALL parts activated
  voiceConfig: {
    examiner_female: { name: 'en-US-Neural2-F', pitch: -1.5, rate: 0.86 },
    student_jake:    { name: 'en-US-Neural2-D', pitch: 1.0, rate: 0.92 },
    student_mia:     { name: 'en-US-Neural2-C', pitch: 4.0, rate: 0.90 },
    narrator:        { name: 'en-US-Neural2-A', pitch: 0, rate: 0.88 },
    teacher:         { name: 'en-US-Neural2-H', pitch: -0.5, rate: 0.85 },
  },
};

// ═══════════════════════════════════════════════════════════════
// READING_HUB.JS — Full Exam Mode
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  // Days 1–4: Same structure as Rotary (story + CLIL + retell)
  // Day 5 ADDS: Complete Reading & Writing exam
  
  // ... (same read_explore, shadowingData, retellData, vocab as rotary template)
  
  // ── Zone 5: FULL Reading & Writing Shield ──
  // ALL 7 parts required for Mock Test week
  reading_assessment: {
    rw_part_1: {
      // Part 1: 10 definitions → match to 15-word bank
      words: [],              // REPLACE: 15 words
      definitions: [],        // REPLACE: 10 definitions
    },
    rw_part_2: {
      // Part 2: 5-turn dialogue gap-fill (A–H options)
      turns: [],              // REPLACE: 5 dialogue turns with gaps
      options: [],            // REPLACE: 8 options (A–H)
    },
    rw_part_3: {
      // Part 3: ~120-word story gap-fill + title
      story_text: '',         // REPLACE: story with 5 gaps
      gaps: [],               // REPLACE: gap answers
      title_options: [],      // REPLACE: 3 title choices
      correct_title: 0,       // REPLACE: index
    },
    rw_part_4: {
      // Part 4: 10 grammar MCQ inline dropdowns
      text_template: '',      // REPLACE: text with 10 dropdown positions
      answers: [],            // REPLACE: 10 × { options: [], correct: index }
    },
    rw_part_5: {
      // Part 5: ~250-word story + 7 completions (1–4 words)
      title: '',              // REPLACE
      story_text: '',         // REPLACE
      questions: [],          // REPLACE: 7 extraction questions
    },
    rw_part_6: {
      // Part 6: 5 open cloze gaps
      text: '',               // REPLACE
      gaps: [],               // REPLACE: 5 gap answers
    },
    rw_part_7: {
      // Part 7: 3-picture narrative writing ≥20 words
      images: [],             // REPLACE: 3 sequential story images
      rubric: {
        content: 2,           // max 2 marks
        grammar_flow: 2,      // max 2 marks
        vocab_spelling: 1,    // max 1 mark
      },
    },
  },
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — Full Exam Mode
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  // ... (same science_lab, word_match, grammar, math as rotary)
  
  // ── Zone 5: FULL Listening Shield — ALL 5 Parts ──
  // Two-play loop mandatory for ALL parts
  listening_p1: {
    // Part 1: Draw lines (match names to people in picture)
    image_url: '',            // REPLACE
    names: [],                // REPLACE: ≥6
    targets: [],              // REPLACE: ≥6
    // Pin coordinates calibrated via listening-p1-pins skill
  },
  listening_p2: {
    // Part 2: Notepad gap-fill (names, numbers, dates, spelling)
    notepad_fields: [],       // REPLACE: 5 fields with labels
    answers: [],              // REPLACE: 5 correct answers
  },
  listening_p3: {
    // Part 3: Card matching (5 items → 8 cards A–H)
    items: [],                // REPLACE: 5 conversation items
    cards: [],                // REPLACE: 8 cards (A–H) with labels
  },
  listening_p4: {
    // Part 4: 3-picture MCQ (5 questions × 3 options each)
    questions: [],            // REPLACE: 5 questions with image triplets
  },
  listening_p5: {
    // Part 5: Color & Write (color objects + write words)
    image_url: '',            // REPLACE
    instructions: [],         // REPLACE: ≥4 instructions
  },
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — Full Exam Mode
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  // ... (same talkshow_video, info_exchange_cards as rotary)
  
  // ── Zone 5: FULL Speaking Shield — ALL 4 Parts ──
  speaking_assessment: {
    speaking_p1: {
      // Part 1: Spot the Differences (2 pictures)
      image_a: '',            // REPLACE
      image_b: '',            // REPLACE
      differences: [],        // REPLACE: calibrated difference hotspots
    },
    speaking_p2: {
      // Part 2: Information Exchange (cue cards with info gaps)
      card_a: {},             // REPLACE
      card_b: {},             // REPLACE
    },
    speaking_p3: {
      // Part 3: Picture Story (4–5 sequential images)
      // Examiner introduces Picture 1; student narrates Pictures 2–4/5
      images: [],             // REPLACE: 4–5 story images
      examiner_intro: '',     // REPLACE: examiner's Picture 1 description
    },
    speaking_p4: {
      // Part 4: Personal Questions
      questions: [],          // REPLACE: 4–6 personal interview questions
    },
  },
};

// Timer config for Full Mock
export const examTimerConfig = {
  listening_total_minutes: 25,
  reading_writing_total_minutes: 40,
  speaking_total_minutes: 10,
  show_countdown: true,
  auto_submit_on_expiry: true,
};
