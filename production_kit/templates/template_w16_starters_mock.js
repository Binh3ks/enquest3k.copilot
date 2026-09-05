/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: W16 — Starters Graduation Mock (Lite Mode Full Mock)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Applicable: W16 ONLY
 * CEFR Stage: Pre-A1 Starters
 * Mode: LITE MOCK — still 10 quests but Zone 5 expands to full mock
 * Special: First graduation ceremony — students receive Starters shield
 * 
 * KEY DIFFERENCES from W01–W15 rotary:
 *   - isFullMock: true → Zone 5 activates ALL Starters exam parts
 *   - Days 1–4: Review & Consolidation (no new vocab)
 *   - Zone 5 Listening: ALL 5 Starters Listening parts with timer
 *   - Zone 5 Reading: Starters R1–R3 integrated in one session
 *   - Zone 5 Speaking: ALL 4 Starters Speaking parts
 *   - Special "Graduation Sticker" reward on completion
 */

export const index_skeleton = {
  weekNumber: 16,           // ← FIXED: W16 only
  title: '★ Starters Graduation Mock — My English Achievement!',
  theme: 'Review & Celebration',
  cefrLevel: 'Pre-A1',
  isLiteMode: true,         // Still Lite Mode (10 quests structure)
  isFullMock: true,         // ← KEY: full mock in Zone 5
  mockExamType: 'STARTERS',
  weekType: 'lite_mock',
  vocabSource: 'starters_pre_a1',

  // No rotaryParts — ALL Starters parts in Zone 5
  graduationReward: {
    shield: 'starters',     // Unlock Starters graduation shield
    message_en: 'You did it! You are a Cambridge Starters Star! 🌟',
    message_vi: 'Bạn đã làm được! Bạn là Ngôi sao Cambridge Starters! 🌟',
  },

  voiceConfig: {
    teacher_female: { name: 'en-US-Neural2-F', pitch: 2.0, rate: 0.80 },
    teacher_male:   { name: 'en-US-Neural2-D', pitch: 1.0, rate: 0.80 },
    child_a:        { name: 'en-US-Neural2-C', pitch: 5.0, rate: 0.85 },
    child_b:        { name: 'en-US-Neural2-J', pitch: 4.0, rate: 0.85 },
    narrator:       { name: 'en-US-Neural2-A', pitch: 1.0, rate: 0.78 },
  },
};

// ═══════════════════════════════════════════════════════════════
// READING_HUB.JS — W16 Review Focus
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  read_explore: {
    // W16: Review story using vocabulary from W01–W15
    // Do NOT introduce new vocabulary
    title: 'Review Adventure: All My Friends!',
    story_scenes: [
      // 5 review scenes featuring all key Starters topics
      // (family, animals, food, school, home, toys, colours, numbers, clothes)
      {
        id: 'scene_w16_1',
        scene_number: 1,
        title_en: 'All My Friends',
        title_vi: 'Tất cả bạn bè của tôi',
        narration_en: '',   // REPLACE: Review sentence with W01-W15 vocab
        narration_vi: '',
        image_url: '/images/week16/scene1.webp',
        hotspots: [
          { id: 'hs_1', label_en: '', label_vi: '', x: 30, y: 40 },
          { id: 'hs_2', label_en: '', label_vi: '', x: 60, y: 50 },
          { id: 'hs_3', label_en: '', label_vi: '', x: 45, y: 70 },
        ],
      },
      // ... scenes 2-5
    ],

    clil_article: {
      id: 'clil_w16_review',
      theme: 'My Starters World Review',
      title_en: 'Everything I Know!',
      title_vi: 'Tất cả những gì tôi biết!',
      content_en: '',       // REPLACE: Review passage (all Starters topics)
      content_vi: '',
      audio_url: '/audio/week16/clil_review.mp3',
      glossary: [],         // Review glossary from W01–W15
    },
  },

  shadowingData: {
    sentences: [
      // Review sentences using W01–W15 vocabulary only
    ],
    mini_retell: {
      prompt: 'Tell me about your favourite thing! Say: "My favourite ___ is ___."',
      model_sentence: 'My favourite animal is a cat.',
    },
  },

  // W16: Full 10-word review vocab (sampled from W01–W15 words)
  vocab: [
    // 10 most important Starters words from W01–W15
    // (No new words — review only)
  ],
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — W16 Full Mock Zone 5
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  // Days 1–4: Same lite activities as rotary weeks
  science_lab: { title: '', type: 'drag_drop_visual', steps: [], draw_and_say: {} },
  word_match: [],
  word_sort: { categories: [], words: [] },
  count_and_match: [],

  // ── Zone 5: FULL Starters Listening Mock — ALL 5 Parts ──
  // Timer: 20 minutes total
  starters_l1: {
    // Starters L1: Listen and colour (5 instructions)
    image_url: '/images/week16/listening_l1_scene.webp',
    instructions: [],       // REPLACE: 5 "Colour the [object] [colour]" instructions
    answers: [],
  },
  starters_l2: {
    // Starters L2: Listen and draw (2-3 items)
    image_url: '/images/week16/listening_l2_scene.webp',
    instructions: [],       // REPLACE: "Draw a [object] on the [location]"
    answers: [],
  },
  starters_l3: {
    // Starters L3: Listen and tick
    questions: [],          // REPLACE: 5 picture-pair tick questions
  },
  starters_l4: {
    // Starters L4: Listen and colour + write
    image_url: '/images/week16/listening_l4_scene.webp',
    instructions: [],       // Colour AND write 1 word
    answers: [],
  },
  starters_l5: {
    // Starters L5: Listen and draw lines (match names to people/animals)
    image_url: '/images/week16/listening_l5_scene.webp',
    names: [],              // ≥4 names
    targets: [],            // ≥4 positions in the image
  },
};

// ═══════════════════════════════════════════════════════════════
// WRITING_HUB.JS — W16 Reading Assessment integrated
// ═══════════════════════════════════════════════════════════════
export const writing_hub_skeleton = {
  draw_and_tell: {
    prompt: 'Draw your best memory from English class! Then tell me about it.',
    sentence_frames: ['This is me ___ing.', 'I am happy because ___.'],
    model_image: '',
  },

  show_and_tell: {
    topic: 'My Favourite Things',
    picture_prompts: [],
    sentence_starters: ['My favourite colour is ___', 'I like ___'],
  },

  // ── Zone 5: Starters Reading Mock (ALL 3 parts) ──
  starters_r1: {
    // R1: Read and tick (match sentences to pictures)
    questions: [],          // REPLACE: 5 sentence-picture matches
  },
  starters_r2: {
    // R2: Look and read (true/false sentences about a picture)
    image_url: '',
    statements: [],         // REPLACE: 10 yes/no statements
  },
  starters_r3: {
    // R3: Read and draw (follow written instructions to complete a picture)
    base_image_url: '',
    instructions: [],       // "Draw a ___ on the ___"
  },
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — W16 Full Speaking Mock
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  listen_and_repeat: {
    audio_url: '',
    text: '',
    recording_prompt: '',
  },

  // ── Zone 5: Starters Speaking Mock — ALL 4 Parts ──
  // Timer: 3–5 minutes total
  starters_s1: {
    // S1: What's this? — Point to objects in a big picture
    image_url: '',          // Complex scene with many Starters objects
    items_to_name: [],      // 8–10 objects for examiner to ask about
  },
  starters_s2: {
    // S2: Look at this — Answer questions about a picture card
    picture_card: '',
    questions: [
      // 5 questions: "Is there a ___?", "How many ___?", "What colour is the ___?"
    ],
  },
  starters_s3: {
    // S3: Tell me about — Describe personal pictures
    personal_prompts: [
      // "Tell me about your family", "Tell me about your favourite animal"
    ],
    sentence_frames: [],
  },
  starters_s4: {
    // S4: Which one do you like? — Choose between two options and explain
    choices: [
      { option_a: '', option_b: '' },
    ],
    follow_up: '',          // "Why do you like it?"
  },

  // Graduation reward triggered after Speaking Mock completion
  graduation: {
    shield_unlocked: 'starters',
    confetti: true,
    certificate_text: 'Cambridge Starters English Certificate',
  },
};

// Timer config for Lite Mode Full Mock
export const examTimerConfig = {
  listening_total_minutes: 20,
  reading_total_minutes: 20,
  speaking_total_minutes: 5,
  show_countdown: true,
  auto_submit_on_expiry: true,
};
