/**
 * Boss Rotary Schedule (4+1 Cycle) for Cambridge A2 Flyers Assessment
 * ────────────────────────────────────────────────────────────────────────────
 * - Cycle 1 (W33, W38…): Listening Focus — L1, L2, L3 [3 Cambridge Parts]
 * - Cycle 2 (W34, W39…): Mixed — L4, L5, R&W P1, Speaking P1 [4 Cambridge Parts]
 * - Cycle 3 (W35, W40…): Deep Reading — R&W P2, P3, P4, P5 [4 Cambridge Parts]
 * - Cycle 4 (W36, W41…): Production — R&W P6, P7, Speaking P2, P3 [4 Cambridge Parts]
 * - Cycle 5 (W37, W42…): ⚔️ FULL MOCK — all 16 Cambridge Parts
 *
 * DOMAIN CLARITY:
 *   activeParts  = Cambridge Part IDs scheduled for this cycle.
 *   partCount    = number of Cambridge Part tasks in this cycle (Cycles 1–4)
 *                  OR 16 for Full Mock (16 Cambridge Parts).
 *                  partCount is NOT the Shield score maximum.
 *   Shield score = Cambridge Paper performance: 0–5 per Paper, max 15 total.
 *                  Computed by MockAssessmentEngine, not by Part count.
 *
 * Each activePart entry: { partId, questId }
 *   partId:  Cambridge Part ID (authoritative key in cambridgePartRegistry.js)
 *   questId: Day-5 quest that completing this Part contributes to.
 *            Valid values: 'boss_listening' | 'boss_reading' | 'weekly_review'
 *            Multiple Parts may share the same questId (idempotent completion).
 */

export const BOSS_ROTARY_CYCLES = {
  1: {
    cycleName:        "Listening Shield Quests",
    subtitle:         "Focus on Audio Discrimination & Pin Location",
    // activeParts: Cambridge Part IDs for this cycle (renamed from testedSkills)
    activeParts: [
      { partId: 'list_p1', questId: 'boss_listening' },
      { partId: 'list_p2', questId: 'boss_reading'   },
      { partId: 'list_p3', questId: 'weekly_review'  },
    ],
    // partCount: number of Cambridge Part tasks in this cycle (renamed from shieldCount)
    partCount:        3,
    approxDurationMin: 15,
    bossTitle:        "Master Soundwave Nova",
    bossAvatar:       "🎧",
    bossDescription:  "Test your ears! Locate objects, complete secret notes and match people to actions."
  },
  2: {
    cycleName:        "Color, Code & Lexicon Quests",
    subtitle:         "Focus on Audio Quiz, Word Matching & Vector Color",
    activeParts: [
      // L4 + L5 both grouped under boss_listening (audio focus cluster)
      { partId: 'list_p4', questId: 'boss_listening' },
      { partId: 'list_p5', questId: 'boss_listening' },
      { partId: 'rw_p1',   questId: 'boss_reading'   },
      { partId: 'spk_p1',  questId: 'weekly_review'  },
    ],
    partCount:        4,
    approxDurationMin: 15,
    bossTitle:        "Chroma Detective Nova",
    bossAvatar:       "🎨",
    bossDescription:  "3-Picture audio quiz, vector color coordination, word matching, and spot the differences!"
  },
  3: {
    cycleName:        "Deep Reading & Cloze Quests",
    subtitle:         "Focus on Dialogue, Story Logic & Comprehension",
    activeParts: [
      { partId: 'rw_p2', questId: 'boss_listening' },
      { partId: 'rw_p3', questId: 'boss_reading'   },
      { partId: 'rw_p4', questId: 'weekly_review'  },
      { partId: 'rw_p5', questId: 'weekly_review'  },  // shares slot with rw_p4
    ],
    partCount:        4,
    approxDurationMin: 20,
    bossTitle:        "Grand Inquisitor Nova",
    bossAvatar:       "📜",
    bossDescription:  "Read passages, complete dialogue turns, solve cloze gaps, and extract story keywords!"
  },
  4: {
    cycleName:        "Master Creator & Speaking Quests",
    subtitle:         "Focus on Open Cloze, Story Writing & Voice Examination",
    activeParts: [
      { partId: 'rw_p6',  questId: 'boss_listening' },
      // rw_p7 (Story Writing) is an explicit Cambridge Part — NOT silently omitted
      { partId: 'rw_p7',  questId: 'boss_reading'   },
      { partId: 'spk_p2', questId: 'weekly_review'  },
      { partId: 'spk_p3', questId: 'weekly_review'  },  // shares slot with spk_p2
    ],
    partCount:        4,
    approxDurationMin: 20,
    bossTitle:        "Examiner Titan Nova",
    bossAvatar:       "🎙️",
    bossDescription:  "Complete open cloze, write a story, ask & answer cue-card questions, and narrate picture stories."
  },
  // Cycle 0 = Full Mock (Week 5 of each 5-week rotation: W37, W42…)
  // partCount = 16 (all Cambridge Parts) — NOT 15 (the max Shield score is separate)
  0: {
    cycleName:        "Full Cambridge A2 Flyers Mock Exam",
    subtitle:         "All 16 Cambridge Parts — Authentic Exam Simulation",
    // Full Mock: all 16 Parts — activeParts is a flat list
    // Quest completion is managed by the Full Mock completion handler, not per-Part
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
    partCount:        16,  // 16 Cambridge Parts — Shield score is computed separately (max 15)
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
  // Offset relative to W33 baseline (W33 = Cycle 1)
  const relativeIndex = (weekNumber - 33 + 1);
  const cycleKey = relativeIndex % 5;
  const cycle = BOSS_ROTARY_CYCLES[cycleKey];
  return {
    weekNumber,
    cycleNumber: cycleKey === 0 ? 5 : cycleKey,
    ...cycle,
    // Backwards-compat shim: some consumers still read shieldCount or testedSkills.
    // These are deprecated aliases — prefer partCount and activeParts.
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
    if (cycle === 1) return 'Listening Parts (L1–L3)';
    if (cycle === 2) return 'Listening Parts (L4–L5)';
    if (cycle === 3) return 'Reading Part (R2)';
    if (cycle === 4) return 'Reading & Writing Part (R6)';
    return 'Full Mock — Listening Paper';
  }
  if (taskId === 'boss_reading') {
    if (cycle === 1) return 'Listening Part (L2)';
    if (cycle === 2) return 'Reading Part (R1)';
    if (cycle === 3) return 'Reading Parts (R3)';
    if (cycle === 4) return 'Reading & Writing Part (R7 — Story Writing)';
    return 'Full Mock — Reading & Writing Paper';
  }
  if (taskId === 'weekly_review') {
    if (cycle === 1) return 'Listening Part (L3)';
    if (cycle === 2) return 'Speaking Part (S1)';
    if (cycle === 3) return 'Reading Parts (R4 & R5)';
    if (cycle === 4) return 'Speaking Parts (S2 & S3)';
    return 'Full Mock — Speaking Paper';
  }
  return null;
}

export default getBossRotaryConfig;
