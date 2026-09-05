/**
 * ═══════════════════════════════════════════════════════════════
 * GOLDEN TEMPLATE: W01 — Pre-A1 Starters (Lite Mode)
 * ═══════════════════════════════════════════════════════════════
 * 
 * Applicable: W01–W16 (Pre-A1 Starters, children 6–7 years old)
 * CEFR Stage: Pre-A1 Starters
 * Mode: LITE MODE — 10 Quests / 5 Zones / 2 Quests per Day
 * 
 * ⚠️ CRITICAL: This is NOT 15-quest architecture.
 * Children 6-7 have 12-18 min attention span.
 * The 5 simplified quests replace the full-mode counterparts:
 *   gear3_retell     → integrated into gear2_karaoke (say 1 sentence)
 *   science_report   → "Draw & Say" (draw + say 1 sentence into mic)
 *   math_quest       → "Count & Match" (count objects + match number)
 *   broadcast_studio → "Listen & Repeat" (hear model + record repeat)
 *   boss_reading     → integrated into boss_listening (picture MCQ)
 * 
 * Vocabulary source: Cambridge Starters wordlist ONLY (starters_pre_a1.json)
 * Sentence complexity: max 1 clause, ≤12 words
 * No inference_questions required (Pre-A1 level)
 */

// ═══════════════════════════════════════════════════════════════
// INDEX.JS
// ═══════════════════════════════════════════════════════════════
export const index_skeleton = {
  weekNumber: 0,            // REPLACE: 1–16
  title: '',                // REPLACE: e.g. "Hello, World! — Greetings & Family"
  theme: '',                // REPLACE: e.g. "Greetings & Family"
  cefrLevel: 'Pre-A1',
  isLiteMode: true,         // ← KEY: triggers 10-quest rendering
  isFullMock: false,        // true only for W16
  mockExamType: null,       // 'STARTERS' for W16 only
  weekType: 'lite_rotary',  // or 'lite_mock' for W16
  vocabSource: 'starters_pre_a1',  // Cambridge Starters wordlist

  // Zone 5 — Starters assessment rotary (not Cambridge 5-part like Flyers)
  // W01-W15: 2-3 Starters parts per week, W16: full mock
  rotaryParts: {
    listening: [],          // REPLACE: e.g. ['L1'] — Starters L1, L2, or L3
    reading: [],            // Integrated into listening for Lite Mode (picture-based)
  },

  voiceConfig: {
    teacher_female: { name: 'en-US-Neural2-F', pitch: 2.0, rate: 0.80 },  // Warm, slow, child-friendly
    teacher_male:   { name: 'en-US-Neural2-D', pitch: 1.0, rate: 0.80 },
    child_a:        { name: 'en-US-Neural2-C', pitch: 5.0, rate: 0.85 },  // Higher pitch for child voice
    child_b:        { name: 'en-US-Neural2-J', pitch: 4.0, rate: 0.85 },
    narrator:       { name: 'en-US-Neural2-A', pitch: 1.0, rate: 0.78 },  // Slow & clear for 6yo
  },
};

// ═══════════════════════════════════════════════════════════════
// READING_HUB.JS — Lite Mode (simplified)
// ═══════════════════════════════════════════════════════════════
export const reading_hub_skeleton = {
  // ── Day 1, Quest 1: Scene Explorer (gear1_webtoon) ──
  // LITE: Still 5 panels but simpler narration (≤8 words/sentence)
  read_explore: {
    title: '',              // REPLACE: story title (simple, concrete)
    story_scenes: [
      {
        id: 'scene_wNN_1',
        scene_number: 1,
        title_en: '',       // REPLACE: 2-3 word title
        title_vi: '',
        narration_en: '',   // REPLACE: ≤8 words, present tense, concrete actions
                            // Good: "Lily sees a big dog."
                            // Bad: "Lily encounters a substantial canine."
        narration_vi: '',
        image_url: '/images/weekNN/scene1.webp',
        hotspots: [
          // LITE: Hotspots use only Cambridge Starters vocabulary labels
          { id: 'hs_1', label_en: '', label_vi: '', x: 30, y: 40 },
          { id: 'hs_2', label_en: '', label_vi: '', x: 60, y: 50 },
          { id: 'hs_3', label_en: '', label_vi: '', x: 45, y: 70 },
        ],
      },
      // ... scenes 2-5 (same structure)
    ],

    // ── Day 2, Quest 1: Fact Finder / Action Lab hybrid ──
    // LITE: clil_article replaced by simple picture vocabulary
    clil_article: {
      id: 'clil_wNN_topic',
      theme: '',
      title_en: '',         // REPLACE: simple topic (animals, colors, family)
      title_vi: '',
      // LITE: Shorter content — picture vocabulary + simple sentences
      content_en: '',       // ≥60 words (not 100+), max 8 words/sentence
      content_vi: '',
      audio_url: '/audio/weekNN/clil_topic.mp3',
      // NO inference_questions for Pre-A1 (cognitive level too low)
      // NO grammar_patterns (implicit pattern learning only)
      glossary: [
        // 4–6 key picture vocabulary words only
        { term: '', meaning: '', image: '' },
      ],
    },
  },

  // ── Day 1, Quest 2: Voice Shadow (gear2_karaoke) ──
  // LITE: Includes "Say 1 sentence" mini-retell at the end
  shadowingData: {
    sentences: [
      // 4–6 sentences only (not ≥8) — very simple, rhyme-friendly
      {
        id: 1,
        text: '',           // REPLACE: ≤8 words, rhyme/rhythm helps
        words: [],
        ipa: [],            // Starters IPA (simple phonics focus)
        audio_url: '/audio/weekNN/shadow_1.mp3',
      },
      // ... 3-5 more sentences
    ],
    // Inline mini-retell (replaces gear3_retell)
    mini_retell: {
      prompt: '',           // REPLACE: "What did [character] do? Say: He/She [verb]..."
      model_sentence: '',   // REPLACE: the 1 sentence students should say
    },
  },

  // ── 10 Vocab items only (Lite Mode — not 20) ──
  // Children 6-7yo cannot handle 20 new words per week
  vocab: [
    {
      id: 1,
      word: '',             // REPLACE: Cambridge Starters wordlist only
      definition_en: '',    // REPLACE: simple picture description
      definition_vi: '',    // REPLACE: full Vietnamese diacritics
      example_en: '',       // REPLACE: ≤6 words
      example_vi: '',
    },
    // ... 9 more (total: 10, not 20)
  ],
};

// ═══════════════════════════════════════════════════════════════
// LISTENING_HUB.JS — Lite Mode
// ═══════════════════════════════════════════════════════════════
export const listening_hub_skeleton = {
  // ── Day 2, Quest 2: Action Lab (science_lab) ──
  // LITE: Drag-and-drop visual experiment (not text-based)
  science_lab: {
    title: '',              // REPLACE
    type: 'drag_drop_visual', // Lite Mode: always visual drag-drop
    steps: [
      {
        id: 1,
        instruction: '',    // ≤8 words
        instruction_vi: '',
        draggable_items: [],
        drop_zones: [],
        image: '',
      },
    ],
    // Draw & Say (replaces science_report in Lite Mode)
    draw_and_say: {
      prompt: '',           // REPLACE: "Draw your [topic]. Then say: 'This is my ___'"
      sentence_frame: '',   // REPLACE: "This is my ___"
    },
  },

  // ── Day 3, Quest 1: Speed Match (word_blitz) ──
  // LITE: Simple picture-word matching (not definition matching)
  word_match: [
    {
      id: 1,
      word: '',             // Starters vocab
      image: '',            // Required in Lite Mode — picture-word pairs
    },
  ],

  // ── Day 3, Quest 2: Word Sort (replaces Grammar Duel in Lite Mode) ──
  // Children sort words into categories by picture
  word_sort: {
    categories: [],         // REPLACE: e.g. ['Animals', 'Food', 'Colors']
    words: [],              // REPLACE: words to sort into categories
  },

  // Count & Match (replaces math_quest Bar Models in Lite Mode)
  count_and_match: [
    {
      id: 1,
      image: '',            // Objects to count
      count: 0,             // Correct answer
      number_options: [],   // Numbers to choose from
    },
  ],

  // ── Zone 5: Starters Listening Assessment ──
  // Starters L1: Listen and colour (or draw)
  starters_l1: {
    image_url: '',
    instructions: [],       // Simple "Colour the [object] [colour]"
  },
  // Starters L2: Listen and tick (or cross)
  starters_l2: {
    questions: [],          // Picture pairs — tick correct one
  },
  // Starters L3: Listen and draw lines (match names to pictures)
  starters_l3: {
    image_url: '',
    names: [],
    targets: [],
  },
};

// ═══════════════════════════════════════════════════════════════
// WRITING_HUB.JS — Lite Mode (Draw & Tell)
// ═══════════════════════════════════════════════════════════════
export const writing_hub_skeleton = {
  // ── Day 4, Quest 1: Draw & Tell (replaces Story Writer) ──
  draw_and_tell: {
    prompt: '',             // REPLACE: "Draw yourself doing [activity]"
    sentence_frames: [
      '',                   // "I am ___ing"
      '',                   // "I like ___"
    ],
    model_image: '',        // Example drawing to inspire
  },

  // ── Day 4, Quest 2: Show & Tell (replaces Info Exchange) ──
  show_and_tell: {
    topic: '',              // REPLACE: "My family", "My pet", "My school bag"
    picture_prompts: [],    // Images to point at and name
    sentence_starters: [],  // "This is my ___", "I have a ___"
  },
};

// ═══════════════════════════════════════════════════════════════
// SPEAKING_HUB.JS — Lite Mode
// ═══════════════════════════════════════════════════════════════
export const speaking_hub_skeleton = {
  // Listen & Repeat (replaces Video Challenge in Lite Mode)
  listen_and_repeat: {
    audio_url: '',          // Model audio (teacher reading a short poem/chant)
    text: '',               // Text for display while listening
    recording_prompt: '',   // "Now you say it! Press record."
  },

  // ── Zone 5: Starters Speaking Assessment ──
  // Starters S1: Point & Name (point to pictures and say names)
  starters_s1: {
    image_url: '',
    items_to_name: [],      // Objects the examiner will ask about
    question_frame: '',     // "What's this?" / "What colour is it?"
  },
  // Starters S2: Answer questions about picture card
  starters_s2: {
    picture_card: '',
    questions: [],          // Simple "Is there a ___?" / "How many ___?"
  },
};

// ═══════════════════════════════════════════════════════════════
// 10-QUEST STRUCTURE REFERENCE (Lite Mode)
// ═══════════════════════════════════════════════════════════════
/**
 * DAY 1 (Zone 1 — Story World): 2 quests
 *   Quest 1: gear1_webtoon  → Scene Explorer (picture comic)
 *   Quest 2: gear2_karaoke  → Voice Shadow + mini-retell (say 1 sentence)
 * 
 * DAY 2 (Zone 2 — Knowledge Lab): 2 quests
 *   Quest 1: gear4_clil     → Fact Finder (picture vocabulary)
 *   Quest 2: science_lab    → Action Lab + Draw & Say
 * 
 * DAY 3 (Zone 3 — Battle Arena): 2 quests
 *   Quest 1: word_blitz     → Speed Match (picture-word pairs)
 *   Quest 2: sentence_smash → Word Sort (categories)
 *   [math_quest → Count & Match — integrated into sentence_smash for Lite]
 * 
 * DAY 4 (Zone 4 — Creator Studio): 2 quests
 *   Quest 1: story_writer   → Draw & Tell (1 picture + 2 sentences)
 *   Quest 2: info_exchange  → Show & Tell (point & name)
 *   [broadcast_studio → Listen & Repeat — integrated into info_exchange]
 * 
 * DAY 5 (Zone 5 — Boss Castle): 2 quests
 *   Quest 1: boss_listening → Starters Listening Shield (L1-L3 rotary)
 *   Quest 2: weekly_review  → Speaking & Sticker (S1-S2 + reward sticker)
 *   [boss_reading → integrated into boss_listening (Starters picture MCQ)]
 */

// ═══════════════════════════════════════════════════════════════
// QUALITY GATES CHECKLIST — Lite Mode
// ═══════════════════════════════════════════════════════════════
// 1. npm run audit:cefr <N>            — 0 violations, ALL vocab from Starters list
// 2. node scripts/audit_all_w33_tasks.mjs — 10/10 quests pass (not 15)
// 3. node scripts/gate18_feature_compliance.mjs <N>
//    — VOC: 10 items OK (Lite Mode), no inference_questions required
// 4. npm run build — exit code 0
// 5. MANUAL: Verify no sentence > 12 words, no multi-clause sentences
