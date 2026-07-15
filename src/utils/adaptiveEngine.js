/**
 * Adaptive Engine — 5 rules that adjust difficulty based on student performance
 * Storage key: localStorage["adaptive_state"]
 *
 * Rule 1 (Vocab Boost):      Watch New Words accuracy < 60% for 2 weeks
 * Rule 2 (Grammar Pacing):   Watch Grammar accuracy > 90% for 3 weeks
 * Rule 3 (Writing Scaffold): Watch Writing rubric < 7/12 for 2 tries
 * Rule 4 (Logic Difficulty): Watch Logic Lab > 85% for 3 weeks
 * Rule 5 (Speaking Streak):  Watch Shadowing/AskAI not used for 2 weeks
 */

const STORAGE_KEY = 'adaptive_state';

// ─── State shape ──────────────────────────────────────────────────────────
const DEFAULT_STATE = {
  // Rule 1
  vocabLowWeeks: [],          // array of weekNumbers with accuracy < 60%
  showWordWorkout: false,

  // Rule 2
  grammarHighWeeks: [],       // array of weekNumbers with accuracy > 90%
  unlockChallengeGrammar: false,

  // Rule 3
  writingLowTries: 0,         // consecutive low-score writing attempts
  needsWritingSupport: false,

  // Rule 4
  logicHighWeeks: [],         // array of weekNumbers with score > 85%
  unlockAdvancedLogic: false,

  // Rule 5
  lastSpeakingWeek: null,     // last weekNumber when speaking was used
  speakingStreakDays: 0,
  showSpeakingNudge: false,

  updatedAt: null,
};

// ─── Helpers ──────────────────────────────────────────────────────────────

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT_STATE, ...JSON.parse(raw) } : { ...DEFAULT_STATE };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, updatedAt: new Date().toISOString() }));
}

// ─── Public API ───────────────────────────────────────────────────────────

/**
 * getAdaptiveState — read current flags for the UI to consume
 */
export function getAdaptiveState() {
  return loadState();
}

/**
 * recordVocabAccuracy(weekNumber, accuracy 0-1)
 * Rule 1: if accuracy < 0.60, track; after 2 such weeks → showWordWorkout = true
 */
export function recordVocabAccuracy(weekNumber, accuracy) {
  const state = loadState();
  if (accuracy < 0.60) {
    const weeks = [...new Set([...state.vocabLowWeeks, weekNumber])].slice(-4);
    state.vocabLowWeeks = weeks;
    state.showWordWorkout = weeks.length >= 2;
  } else {
    // Recovery: remove this week from low list
    state.vocabLowWeeks = state.vocabLowWeeks.filter((w) => w !== weekNumber);
    if (state.vocabLowWeeks.length < 2) state.showWordWorkout = false;
  }
  saveState(state);
  return state;
}

/**
 * recordGrammarAccuracy(weekNumber, accuracy 0-1)
 * Rule 2: if accuracy > 0.90 for 3 weeks → unlockChallengeGrammar = true
 */
export function recordGrammarAccuracy(weekNumber, accuracy) {
  const state = loadState();
  if (accuracy > 0.90) {
    const weeks = [...new Set([...state.grammarHighWeeks, weekNumber])].slice(-6);
    state.grammarHighWeeks = weeks;
    state.unlockChallengeGrammar = weeks.length >= 3;
  } else {
    state.grammarHighWeeks = state.grammarHighWeeks.filter((w) => w !== weekNumber);
    if (state.grammarHighWeeks.length < 3) state.unlockChallengeGrammar = false;
  }
  saveState(state);
  return state;
}

/**
 * recordWritingScore(rubricTotal, maxTotal)
 * Rule 3: if rubricTotal/maxTotal < 7/12 for 2 consecutive tries → needsWritingSupport = true
 */
export function recordWritingScore(rubricTotal, maxTotal = 12) {
  const state = loadState();
  const ratio = rubricTotal / maxTotal;
  const threshold = 7 / 12;

  if (ratio < threshold) {
    state.writingLowTries = (state.writingLowTries || 0) + 1;
    if (state.writingLowTries >= 2) state.needsWritingSupport = true;
  } else {
    state.writingLowTries = 0;
    state.needsWritingSupport = false;
  }
  saveState(state);
  return state;
}

/**
 * recordLogicScore(weekNumber, scorePercent 0-100)
 * Rule 4: if score > 85 for 3 weeks → unlockAdvancedLogic = true
 */
export function recordLogicScore(weekNumber, scorePercent) {
  const state = loadState();
  if (scorePercent > 85) {
    const weeks = [...new Set([...state.logicHighWeeks, weekNumber])].slice(-6);
    state.logicHighWeeks = weeks;
    state.unlockAdvancedLogic = weeks.length >= 3;
  } else {
    state.logicHighWeeks = state.logicHighWeeks.filter((w) => w !== weekNumber);
    if (state.logicHighWeeks.length < 3) state.unlockAdvancedLogic = false;
  }
  saveState(state);
  return state;
}

/**
 * recordSpeakingActivity(weekNumber)
 * Rule 5: call whenever student uses Speaking (shadowing/AskAI).
 * If not called for 2+ weeks → showSpeakingNudge = true.
 * Each call increments speakingStreakDays (capped at 7-day badge cycle).
 */
export function recordSpeakingActivity(weekNumber) {
  const state = loadState();
  const prev = state.lastSpeakingWeek;
  const gap = prev ? weekNumber - prev : 0;

  if (gap >= 2) {
    // Too long a gap → reset streak, show nudge (will be reset now they used it)
    state.speakingStreakDays = 1;
  } else {
    state.speakingStreakDays = Math.min((state.speakingStreakDays || 0) + 1, 99);
  }
  state.lastSpeakingWeek = weekNumber;
  state.showSpeakingNudge = false;
  saveState(state);
  return state;
}

/**
 * evaluateSpeakingNudge(currentWeek)
 * Call on week load to check if speaking hasn't been used in 2+ weeks.
 */
export function evaluateSpeakingNudge(currentWeek) {
  const state = loadState();
  const last = state.lastSpeakingWeek;
  if (last && currentWeek - last >= 2) {
    state.showSpeakingNudge = true;
    saveState(state);
  }
  return state;
}

/**
 * resetAdaptiveState — for testing / new student
 */
export function resetAdaptiveState() {
  saveState({ ...DEFAULT_STATE });
}
