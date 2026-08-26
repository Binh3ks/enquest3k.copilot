/**
 * Boss Rotary Schedule (4+1 Cycle) for Cambridge A2 Flyers Mock Simulations
 * - Week 1 (e.g. W33, W38): Listening Focus (Parts 1, 2, 3) ~ 3 Shields
 * - Week 2 (e.g. W34, W39): Audio-Visual & Vocab Focus (Listening P4, P5 + R&W P1) ~ 3 Shields
 * - Week 3 (e.g. W35, W40): Deep Reading & Cloze Focus (R&W P2, P3, P4, P5, P6) ~ 5 Shields
 * - Week 4 (e.g. W36, W41): Production Focus (R&W P7 Story Writing + Speaking P1, P2, P3/P4) ~ 4 Shields
 * - Week 5 (e.g. W37, W42): ⚔️ FULL CAPSTONE MOCK EXAM (All 15 Shields - 16 Parts)
 */

export const BOSS_ROTARY_CYCLES = {
  1: {
    cycleName: "Listening Shield Quests",
    subtitle: "Focus on Audio Discrimination & Pin Location",
    testedSkills: ["listening_p1", "listening_p2", "listening_p3"],
    shieldCount: 3,
    approxDurationMin: 15,
    bossTitle: "Master Soundwave Nova",
    bossAvatar: "🎧",
    bossDescription: "Test your ears! Locate objects, complete secret notes and match people to actions."
  },
  2: {
    cycleName: "Color, Code & Lexicon Quests",
    subtitle: "Focus on Audio Quiz, Word Matching & Vector Color",
    testedSkills: ["listening_p4", "listening_p5", "rw_p1", "speaking_p1"],
    shieldCount: 4,
    approxDurationMin: 15,
    bossTitle: "Chroma Detective Nova",
    bossAvatar: "🎨",
    bossDescription: "3-Picture audio quiz, vector color coordination, word matching, and spot the differences!"
  },
  3: {
    cycleName: "Deep Reading & Cloze Quests",
    subtitle: "Focus on Dialogue, Story Logic & Comprehension",
    testedSkills: ["rw_p2", "rw_p3", "rw_p4", "rw_p5"],
    shieldCount: 4,
    approxDurationMin: 20,
    bossTitle: "Grand Inquisitor Nova",
    bossAvatar: "📜",
    bossDescription: "Read passages, complete dialogue turns, solve cloze gaps, and extract story keywords!"
  },
  4: {
    cycleName: "Master Creator & Speaking Quests",
    subtitle: "Focus on Open Cloze, Story Writing & Voice Examination",
    testedSkills: ["rw_p6", "rw_p7", "speaking_p2", "speaking_p3"],
    shieldCount: 4,
    approxDurationMin: 20,
    bossTitle: "Examiner Titan Nova",
    bossAvatar: "🎙️",
    bossDescription: "Complete open cloze, ask & answer cue-card questions, and narrate picture stories."
  },
  0: { // Module 5 remainder (e.g. W37, W42, W47, W52, W72)
    cycleName: "Full Cambridge A2 Flyers Mock Exam",
    subtitle: "Complete 16-Part Real Exam Simulation",
    testedSkills: ["all_15_shields"],
    shieldCount: 15,
    approxDurationMin: 45,
    bossTitle: "Supreme Cambridge Dragon Nova",
    bossAvatar: "👑",
    bossDescription: "The Ultimate Challenge! Complete all 15 Shields across Listening, Reading, Writing and Speaking."
  }
};

/**
 * Returns the rotary config for a given week number
 */
export function getBossRotaryConfig(weekNumber = 33) {
  // Offset relative to W33 baseline (W33 = Cycle 1)
  const relativeIndex = (weekNumber - 33 + 1);
  const cycleKey = relativeIndex % 5;
  return {
    weekNumber,
    cycleNumber: cycleKey === 0 ? 5 : cycleKey,
    ...BOSS_ROTARY_CYCLES[cycleKey]
  };
}

/**
 * Returns dynamic task label for Day 5 boss stations based on active cycle
 */
export function getRotaryTaskLabel(taskId, weekNumber = 33) {
  const config = getBossRotaryConfig(weekNumber);
  const cycle = config.cycleNumber;

  if (taskId === 'boss_listening') {
    if (cycle === 1) return 'Listening Shield (Part 1)';
    if (cycle === 2) return 'Listening Shield (Part 4)';
    if (cycle === 3) return 'Reading Shield (R&W P2)';
    if (cycle === 4) return 'Reading & Writing Shield (R&W P6)';
    return 'Full Mock Listening Shield';
  }
  if (taskId === 'boss_reading') {
    if (cycle === 1) return 'Listening Shield (Part 2)';
    if (cycle === 2) return 'Reading Shield (R&W P1)';
    if (cycle === 3) return 'Reading Shield (R&W P3)';
    if (cycle === 4) return 'Story Writer Shield (R&W P7)';
    return 'Full Mock Reading & Writing Shield';
  }
  if (taskId === 'weekly_review') {
    if (cycle === 1) return 'Listening Shield (Part 3)';
    if (cycle === 2) return 'Speaking & Passport (S1)';
    if (cycle === 3) return 'Reading Shield (R&W P4 & P5)';
    if (cycle === 4) return 'Speaking & Passport (S2 & S3)';
    return 'Full Mock Speaking & Passport';
  }
  return null;
}

export default getBossRotaryConfig;

