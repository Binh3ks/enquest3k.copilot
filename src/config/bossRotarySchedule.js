/**
 * Boss Rotary Schedule (4+1 Cycle) for Cambridge A2 Flyers Assessment
 * ────────────────────────────────────────────────────────────────────────────
 * GOLDEN ARCHITECTURE INVARIANT:
 * - 16 Cambridge Parts collectively evaluated across 4 weekly cycles (4 parts/week = 16 parts total):
 *   - Cycle 1 (W33): L1, L2, R1, S1 [4 Cambridge Parts — 1L + 1RW + 1S balanced]
 *   - Cycle 2 (W34): L3, R2, R3, S2 [4 Cambridge Parts — 1L + 1RW + 1S balanced]
 *   - Cycle 3 (W35): L4, R4, R5, S3 [4 Cambridge Parts — 1L + 1RW + 1S balanced]
 *   - Cycle 4 (W36): L5, R6, R7, S4 [4 Cambridge Parts — 1L + 1RW + 1S balanced]
 *   - Cycle 5 (W37): ⚔️ FULL MOCK — all 16 Cambridge Parts (5L + 7RW + 4S)
 *
 * ZERO ROUTE COLLISION INVARIANT:
 *   boss_listening ──► Cambridge Listening Paper ONLY
 *   boss_reading   ──► Cambridge Reading & Writing Paper ONLY
 *   weekly_review  ──► Cambridge Speaking Paper & Passport ONLY
 *
 * DOMAIN CLARITY:
 *   activeParts  = Cambridge Part IDs scheduled for this cycle.
 *   partCount    = number of Cambridge Part tasks in this cycle (Cycles 1–4: 4 parts, Full Mock: 16 parts).
 *   Shield score = Cambridge Paper performance: 0–5 per Paper, max 15 total (5L + 5RW + 5S).
 *                  Computed by MockAssessmentEngine, NOT by Part count.
 */

export const BOSS_ROTARY_CYCLES = {
  1: {
    cycleName:        "Listening, Lexicon & Differences Quests",
    subtitle:         "Focus on Audio Location, Word Bank & Picture Comparison",
    activeParts: [
      { partId: 'list_p1', questId: 'boss_listening' },
      { partId: 'list_p2', questId: 'boss_listening' },
      { partId: 'rw_p1',   questId: 'boss_reading'   },
      { partId: 'spk_p1',  questId: 'weekly_review'  },
    ],
    partCount:        4,
    approxDurationMin: 18,
    bossTitle:        "Master Soundwave Nova",
    bossAvatar:       "🎧",
    bossDescription:  "Test your skills! Locate objects with audio, complete notes, match vocabulary definitions, and spot differences!"
  },
  2: {
    cycleName:        "Visual Audio, Dialogue & Information Quests",
    subtitle:         "Focus on Picture Audio Matching, Conversation & Info Gap",
    activeParts: [
      { partId: 'list_p3', questId: 'boss_listening' },
      { partId: 'rw_p2',   questId: 'boss_reading'   },
      { partId: 'rw_p3',   questId: 'boss_reading'   },
      { partId: 'spk_p2',  questId: 'weekly_review'  },
    ],
    partCount:        4,
    approxDurationMin: 18,
    bossTitle:        "Chroma Detective Nova",
    bossAvatar:       "🎨",
    bossDescription:  "Match audio to pictures, complete dialogue turns, solve story cloze, and ask cue-card questions!"
  },
  3: {
    cycleName:        "Quiz, Grammar Cloze & Narrative Quests",
    subtitle:         "Focus on 3-Picture Quiz, Text Cloze, Extraction & Story Telling",
    activeParts: [
      { partId: 'list_p4', questId: 'boss_listening' },
      { partId: 'rw_p4',   questId: 'boss_reading'   },
      { partId: 'rw_p5',   questId: 'boss_reading'   },
      { partId: 'spk_p3',  questId: 'weekly_review'  },
    ],
    partCount:        4,
    approxDurationMin: 20,
    bossTitle:        "Grand Inquisitor Nova",
    bossAvatar:       "📜",
    bossDescription:  "Listen to 3-picture quizzes, solve grammar cloze gaps, extract story keywords, and narrate a 4-picture story!"
  },
  4: {
    cycleName:        "Colour Coding, Open Cloze, Story Writing & Voice Quests",
    subtitle:         "Focus on Vector Colouring, Open Cloze, Creative Story & Personal Interview",
    activeParts: [
      { partId: 'list_p5', questId: 'boss_listening' },
      { partId: 'rw_p6',   questId: 'boss_reading'   },
      { partId: 'rw_p7',   questId: 'boss_reading'   },
      { partId: 'spk_p4',  questId: 'weekly_review'  },
    ],
    partCount:        4,
    approxDurationMin: 22,
    bossTitle:        "Examiner Titan Nova",
    bossAvatar:       "🎙️",
    bossDescription:  "Colour and write from audio, solve open cloze, write a 3-picture story, and answer personal examiner questions!"
  },
  // Cycle 0 = Full Mock (Week 5 of each 5-week rotation: W37, W42…)
  0: {
    mode:             'FULL_MOCK',
    cycleName:        "Full Cambridge A2 Flyers Mock Exam",
    subtitle:         "All 16 Cambridge Parts — Authentic Exam Simulation",
    maxShieldScore:   15,
    activeParts: [
      { partId: 'list_p1', questId: 'boss_listening' },
      { partId: 'list_p2', questId: 'boss_listening' },
      { partId: 'list_p3', questId: 'boss_listening' },
      { partId: 'list_p4', questId: 'boss_listening' },
      { partId: 'list_p5', questId: 'boss_listening' },
      { partId: 'rw_p1',   questId: 'boss_reading'   },
      { partId: 'rw_p2',   questId: 'boss_reading'   },
      { partId: 'rw_p3',   questId: 'boss_reading'   },
      { partId: 'rw_p4',   questId: 'boss_reading'   },
      { partId: 'rw_p5',   questId: 'boss_reading'   },
      { partId: 'rw_p6',   questId: 'boss_reading'   },
      { partId: 'rw_p7',   questId: 'boss_reading'   },
      { partId: 'spk_p1',  questId: 'weekly_review'  },
      { partId: 'spk_p2',  questId: 'weekly_review'  },
      { partId: 'spk_p3',  questId: 'weekly_review'  },
      { partId: 'spk_p4',  questId: 'weekly_review'  },
    ],
    partCount:        16,
    approxDurationMin: 45,
    bossTitle:        "Supreme Cambridge Dragon Nova",
    bossAvatar:       "👑",
    bossDescription:  "The Ultimate Challenge! All 16 Cambridge Parts across Listening, Reading & Writing, and Speaking. Your Paper scores are displayed as Shields (max 15)."
  }
};

/**
 * Returns the rotary config for a given week number.
 * @param {number} weekNumber
 * @returns {{ weekNumber, cycleNumber, cycleName, activeParts, partCount, ... }}
 */
export function getBossRotaryConfig(weekNumber = 33) {
  const relativeIndex = (weekNumber - 33 + 1);
  const cycleKey = relativeIndex % 5;
  const cycle = BOSS_ROTARY_CYCLES[cycleKey];
  return {
    weekNumber,
    cycleNumber: cycleKey === 0 ? 5 : cycleKey,
    ...cycle,
    shieldCount: cycle.partCount,
    testedSkills: cycle.activeParts.map(ap => ap.partId),
  };
}

/**
 * Returns dynamic task label for Day-5 boss stations based on active cycle.
 */
export function getRotaryTaskLabel(taskId, weekNumber = 33) {
  const config = getBossRotaryConfig(weekNumber);
  const cycle = config.cycleNumber;

  if (taskId === 'boss_listening') {
    if (cycle === 1) return 'Listening Shield (L1 & L2)';
    if (cycle === 2) return 'Listening Shield (L3)';
    if (cycle === 3) return 'Listening Shield (L4)';
    if (cycle === 4) return 'Listening Shield (L5)';
    return 'Full Mock — Listening Paper';
  }
  if (taskId === 'boss_reading') {
    if (cycle === 1) return 'Reading & Writing Shield (R1)';
    if (cycle === 2) return 'Reading & Writing Shield (R2 & R3)';
    if (cycle === 3) return 'Reading & Writing Shield (R4 & R5)';
    if (cycle === 4) return 'Reading & Writing Shield (R6 & R7)';
    return 'Full Mock — Reading & Writing Paper';
  }
  if (taskId === 'weekly_review') {
    if (cycle === 1) return 'Speaking & Passport (S1)';
    if (cycle === 2) return 'Speaking & Passport (S2)';
    if (cycle === 3) return 'Speaking & Passport (S3)';
    if (cycle === 4) return 'Speaking & Passport (S4)';
    return 'Full Mock — Speaking Paper';
  }
  return null;
}

export default getBossRotaryConfig;
