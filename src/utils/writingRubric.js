/**
 * src/utils/writingRubric.js — 4-Dimension Writing Rubric Engine (Sprint S1.3)
 *
 * Scores a student writing submission across 4 dimensions (D1–D4).
 * Each dimension scores 1–3. Total = 4–12.
 *
 * Phase activation:
 *   Phase 1 (W1–54):   D1 + D2 + D3 active; D4 = warning only (not counted in total)
 *   Phase 2 (W55–120): D1 + D2 + D3 + D4 active, D4 required for full score
 *   Phase 3 (W121+):   Full rubric + paragraph structure check in D4
 *
 * Usage:
 *   import { scoreWriting } from './writingRubric.js';
 *   const result = scoreWriting({ text, wordBank, promptEn, phase, weekNumber });
 */

import {
  countWords,
  countBankWordsUsed,
  detectFragments,
  countGrammarErrors,
  countConnectors,
  assessRelevance,
  pickBestSentence,
  countSceneElements,
  detectSequenceMarkers,
  detectTopicStructure,
  assessPastTenseConsistency,
  assessVocabularyDiversity,
} from './writingAnalyzer.js';

// ─────────────────────────────────────────────────────────────
// Rubric descriptor tables
// ─────────────────────────────────────────────────────────────

export const RUBRIC_DESCRIPTORS = {
  D1_task_completion: {
    3: 'Fully answers the prompt with all key elements.',
    2: 'Answers the prompt but is missing one element.',
    1: 'Off-topic or does not address the prompt.',
  },
  D2_vocabulary_use: {
    3: 'Uses 3 or more target words/phrases correctly.',
    2: 'Uses 1–2 target words/phrases.',
    1: 'Does not use any target vocabulary.',
  },
  D3_grammar_accuracy: {
    3: 'Fewer than 2 errors; all sentences have subject + verb.',
    2: '2–4 errors; meaning is still clear.',
    1: 'More than 4 errors or many sentence fragments.',
  },
  D4_coherence: {
    phase1: {
      3: 'Uses 2+ connectors (and, but, so, because …).',
      2: 'Uses 1 connector.',
      1: 'No connectors — ideas not linked.',
    },
    phase2: {
      3: 'Uses 1+ complex connector (therefore, however …).',
      2: 'Only basic connectors used.',
      1: 'No connectors.',
    },
    phase3: {
      3: 'Clear topic sentence + 2 supporting details + closing.',
      2: 'Has topic sentence but weak structure.',
      1: 'No paragraph structure.',
    },
  },
};

// ─────────────────────────────────────────────────────────────
// Score thresholds & badges
// ─────────────────────────────────────────────────────────────

export const THRESHOLDS = {
  excellent:  { min: 10, badge: 'Writing Star ⭐' },
  good:       { min: 7,  badge: null },
  needs_work: { min: 4,  badge: null, canSubmit: true },
  // Phase 2+: below needs_work blocks submission
  fail:       { min: 0,  canSubmit: false, phase: 2 },
};

/**
 * Map a total score to a tier label.
 * @param {number} total — scored out of 9 (Phase 1) or 12 (Phase 2+)
 * @param {number} phase
 * @returns {{ tier: string, badge: string|null, canSubmit: boolean }}
 */
export function getTier(total, phase) {
  if (total >= THRESHOLDS.excellent.min) {
    return { tier: 'excellent', badge: THRESHOLDS.excellent.badge, canSubmit: true };
  }
  if (total >= THRESHOLDS.good.min) {
    return { tier: 'good', badge: null, canSubmit: true };
  }
  if (total >= THRESHOLDS.needs_work.min) {
    return { tier: 'needs_work', badge: null, canSubmit: true };
  }
  // Fail: only blocks submission in Phase 2+
  return { tier: 'fail', badge: null, canSubmit: phase < 2 };
}

// ─────────────────────────────────────────────────────────────
// Individual dimension scorers
// ─────────────────────────────────────────────────────────────

/**
 * D1 — Task Completion (1–3)
 */
function scoreD1({ text, wordBank, promptEn }) {
  const relevance = assessRelevance(text, wordBank, promptEn);
  if (relevance === 'full') return 3;
  if (relevance === 'partial') return 2;
  return 1;
}

/**
 * D2 — Vocabulary Use (1–3)
 */
function scoreD2({ text, wordBank }) {
  const hits = countBankWordsUsed(text, wordBank);
  if (hits >= 3) return 3;
  if (hits >= 1) return 2;
  return 1;
}

/**
 * D3 — Grammar Accuracy (1–3)
 */
function scoreD3({ text }) {
  const errors = countGrammarErrors(text);
  const fragments = detectFragments(text);
  const totalIssues = errors + fragments;

  if (totalIssues < 2) return 3;
  if (totalIssues <= 4) return 2;
  return 1;
}

/**
 * D4 — Coherence / Paragraph Structure (1–3)
 * Returns null score for Phase 1 (warning only, not counted).
 */
function scoreD4({ text, phase }) {
  if (phase === 1) {
    // Phase 1: warning only — compute but do not count in total
    const connectors = countConnectors(text, 1);
    return { score: connectors >= 1 ? 3 : 1, isWarningOnly: true };
  }
  if (phase === 2) {
    const complexConnectors = countConnectors(text, 2);
    const basicConnectors = countConnectors(text, 1);
    if (complexConnectors >= 1) return { score: 3, isWarningOnly: false };
    if (basicConnectors >= 1) return { score: 2, isWarningOnly: false };
    return { score: 1, isWarningOnly: false };
  }
  // Phase 3: paragraph structure check (heuristic)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length >= 4) return { score: 3, isWarningOnly: false };
  if (sentences.length >= 2) return { score: 2, isWarningOnly: false };
  return { score: 1, isWarningOnly: false };
}

// ─────────────────────────────────────────────────────────────
// Main scoring entry point
// ─────────────────────────────────────────────────────────────

/**
 * Score a writing submission.
 *
 * @param {Object} params
 * @param {string}   params.text        — student submission text
 * @param {string[]} params.wordBank    — from writing.js keywords/word_bank
 * @param {string}   [params.promptEn] — writing prompt in English (for D1 relevance)
 * @param {1|2|3}    [params.phase]    — curriculum phase (default: 1)
 * @param {number}   [params.weekNumber] — used to auto-derive phase if not provided
 *
 * @returns {Object} scoring result
 * {
 *   dimensions: { D1, D2, D3, D4: { score, descriptor, isWarningOnly } },
 *   total:         number,        — sum of active dimensions (excl. D4 if Phase 1 warning)
 *   maxTotal:      number,        — 9 (Phase 1) or 12 (Phase 2+)
 *   tier:          string,        — 'excellent' | 'good' | 'needs_work' | 'fail'
 *   badge:         string|null,
 *   canSubmit:     boolean,
 *   wordCount:     number,
 *   bestSentence:  string,
 *   feedback:      string,        — short student-facing feedback message (English)
 * }
 */
export function scoreWriting({ text, wordBank = [], promptEn = '', phase, weekNumber }) {
  // Derive phase from week if not provided
  if (!phase) {
    if (!weekNumber || weekNumber <= 54) phase = 1;
    else if (weekNumber <= 120) phase = 2;
    else phase = 3;
  }

  const d1Score = scoreD1({ text, wordBank, promptEn });
  const d2Score = scoreD2({ text, wordBank });
  const d3Score = scoreD3({ text });
  const d4Result = scoreD4({ text, phase });

  const getD1Descriptor = () => RUBRIC_DESCRIPTORS.D1_task_completion[d1Score];
  const getD2Descriptor = () => RUBRIC_DESCRIPTORS.D2_vocabulary_use[d2Score];
  const getD3Descriptor = () => RUBRIC_DESCRIPTORS.D3_grammar_accuracy[d3Score];
  const getD4Descriptor = () => {
    const descriptors = phase === 1
      ? RUBRIC_DESCRIPTORS.D4_coherence.phase1
      : phase === 2
        ? RUBRIC_DESCRIPTORS.D4_coherence.phase2
        : RUBRIC_DESCRIPTORS.D4_coherence.phase3;
    return descriptors[d4Result.score];
  };

  // Total: D4 only counts in Phase 2+
  const activeScores = [d1Score, d2Score, d3Score];
  if (phase >= 2) activeScores.push(d4Result.score);
  const total = activeScores.reduce((a, b) => a + b, 0);
  const maxTotal = phase >= 2 ? 12 : 9;

  const { tier, badge, canSubmit } = getTier(total, phase);

  const bestSentence = pickBestSentence(text, wordBank);
  const wordCount = countWords(text);

  return {
    dimensions: {
      D1: { score: d1Score, descriptor: getD1Descriptor() },
      D2: { score: d2Score, descriptor: getD2Descriptor() },
      D3: { score: d3Score, descriptor: getD3Descriptor() },
      D4: { score: d4Result.score, descriptor: getD4Descriptor(), isWarningOnly: d4Result.isWarningOnly },
    },
    total,
    maxTotal,
    tier,
    badge,
    canSubmit,
    wordCount,
    bestSentence,
    feedback: buildFeedbackMessage({ d1Score, d2Score, d3Score, d4Result, tier, phase }),
  };
}

// ─────────────────────────────────────────────────────────────
// Student-facing feedback builder
// ─────────────────────────────────────────────────────────────

function buildFeedbackMessage({ d1Score, d2Score, d3Score, d4Result, tier, phase }) {
  const tips = [];

  if (d1Score < 2) tips.push('Try to answer the question more directly.');
  if (d2Score < 2) tips.push('Use more vocabulary words from this week.');
  if (d3Score < 2) tips.push('Check your sentences — each sentence needs a subject and a verb.');
  if (phase >= 1 && d4Result.score < 2) {
    tips.push(
      phase === 1
        ? 'Try linking your ideas with words like "and", "but", "because", or "so".'
        : 'Use linking words like "however", "therefore", or "as a result".'
    );
  }

  if (tier === 'excellent') {
    return `Amazing writing! ${tips.length === 0 ? 'Keep it up!' : tips.join(' ')}`;
  }
  if (tier === 'good') {
    return `Good job! ${tips.length > 0 ? 'To improve: ' + tips.join(' ') : ''}`;
  }
  if (tier === 'needs_work') {
    return `Keep trying! ${tips.join(' ')}`;
  }
  return `Let\'s work on this together. ${tips.join(' ')}`;
}

// ─────────────────────────────────────────────────────────────
// TIERED RUBRIC (Sprint S4 — Story Writing & Topic Mode)
// ─────────────────────────────────────────────────────────────
//
// Tier 1 (W16-W23): Picture Description — scaffolded via sentence frames
//   D1 = scene elements (who/where/what) >= 3 elements = score 3
//   D2 = uses 3+ word bank items
//   D3 = subject+verb in every sentence
//   D4 = 1+ connector (warning only)
//
// Tier 2 (W24-W35): Picture Story — narrative with sequence
//   D1 = has sequence markers (first/then/finally)
//   D2 = uses 5+ word bank items
//   D3 = past-tense consistency
//   D4 = 2+ connectors
//
// Tier 3 (W36+): Topic Essay — free writing with structure
//   D1 = topic + 2 supporting + closing
//   D2 = diverse vocabulary
//   D3 = mixed tenses correct
//   D4 = complex connectors

export const TIERED_RUBRIC_DESCRIPTORS = {
  1: {
    D1_task: { 3: 'Describes 3+ scene elements (who/where/what).', 2: 'Describes 2 scene elements.', 1: 'Describes 0-1 elements.' },
    D2_vocab: { 3: 'Uses 3+ target words correctly.', 2: 'Uses 1-2 target words.', 1: 'No target vocabulary used.' },
    D3_grammar: { 3: 'Every sentence has subject + verb.', 2: '1-2 sentences are fragments.', 1: 'Many fragments or errors.' },
    D4_connector: { 3: '1+ basic connector used.', 2: 'Sentences mostly independent.', 1: 'No connectors at all.' },
  },
  2: {
    D1_task: { 3: 'Has clear sequence (2+ markers).', 2: '1 sequence marker.', 1: 'No sequence — single moment.' },
    D2_vocab: { 3: 'Uses 5+ target words.', 2: 'Uses 3-4 target words.', 1: 'Uses 0-2 target words.' },
    D3_grammar: { 3: 'Past-tense consistent throughout.', 2: 'Mostly past, 1-2 slips.', 1: 'Many tense inconsistencies.' },
    D4_connector: { 3: '2+ connectors.', 2: '1 connector.', 1: 'No connectors.' },
  },
  3: {
    D1_task: { 3: 'Topic sentence + 2 supporting + closing.', 2: 'Topic sentence + some support.', 1: 'No clear structure.' },
    D2_vocab: { 3: 'Diverse vocabulary (uniqueness >= 0.7).', 2: 'Some repetition (0.5-0.7).', 1: 'Heavy repetition (< 0.5).' },
    D3_grammar: { 3: 'Mixed tenses used correctly.', 2: 'Some tense errors.', 1: 'Tense errors confuse meaning.' },
    D4_connector: { 3: 'Complex connectors (therefore, however...).', 2: 'Basic connectors only.', 1: 'No connectors.' },
  },
};

function scoreD1Tiered({ text, wordBank, tier }) {
  if (tier === 1) {
    const elements = countSceneElements(text, wordBank);
    if (elements >= 3) return 3;
    if (elements >= 2) return 2;
    return 1;
  }
  if (tier === 2) {
    const markers = detectSequenceMarkers(text);
    if (markers >= 2) return 3;
    if (markers >= 1) return 2;
    return 1;
  }
  // tier === 3
  return detectTopicStructure(text);
}

function scoreD2Tiered({ text, wordBank, tier }) {
  if (tier === 3) return assessVocabularyDiversity(text);
  const hits = countBankWordsUsed(text, wordBank || []);
  if (tier === 1) {
    if (hits >= 3) return 3;
    if (hits >= 1) return 2;
    return 1;
  }
  // tier === 2
  if (hits >= 5) return 3;
  if (hits >= 3) return 2;
  return 1;
}

function scoreD3Tiered({ text, tier }) {
  if (tier === 2) return assessPastTenseConsistency(text);
  // Tier 1 and Tier 3: subject+verb check
  const fragments = detectFragments(text);
  const errors = countGrammarErrors(text);
  const total = fragments + errors;
  if (total === 0) return 3;
  if (total <= 2) return 2;
  return 1;
}

function scoreD4Tiered({ text, tier }) {
  if (tier === 3) {
    const complex = countConnectors(text, 2);
    if (complex >= 1) return 3;
    const basic = countConnectors(text, 1);
    if (basic >= 1) return 2;
    return 1;
  }
  if (tier === 2) {
    const conns = countConnectors(text, 1);
    if (conns >= 2) return 3;
    if (conns >= 1) return 2;
    return 1;
  }
  // tier === 1: warning only
  const conns = countConnectors(text, 1);
  if (conns >= 1) return 3;
  if (conns >= 0) return 1; // give at least 1 for trying
  return 1;
}

/**
 * Tiered scoring entry point for Story Writing (W16+) and Topic Mode (W36+).
 *
 * @param {Object} params
 * @param {string}   params.text     — student submission
 * @param {string[]} params.wordBank — topic-specific target vocab
 * @param {string}   [params.promptEn] — writing prompt
 * @param {1|2|3}    params.tier     — rubric tier (required!)
 * @param {number}   [params.weekNumber] — for tier inference
 *
 * @returns Same shape as scoreWriting().
 */
export function scoreWritingTiered({ text, wordBank = [], promptEn = '', tier, weekNumber }) {
  if (!tier) {
    if (!weekNumber || weekNumber <= 23) tier = 1;
    else if (weekNumber <= 35) tier = 2;
    else tier = 3;
  }
  tier = Math.max(1, Math.min(3, tier));

  const d1 = scoreD1Tiered({ text, wordBank, tier });
  const d2 = scoreD2Tiered({ text, wordBank, tier });
  const d3 = scoreD3Tiered({ text, tier });
  const d4 = scoreD4Tiered({ text, tier });

  // Tier 1: D4 is warning only (not counted in total)
  const activeScores = [d1, d2, d3];
  if (tier !== 1) activeScores.push(d4);
  const total = activeScores.reduce((a, b) => a + b, 0);
  const maxTotal = tier === 1 ? 9 : 12;

  const tierDescriptors = TIERED_RUBRIC_DESCRIPTORS[tier];
  const wordCount = countWords(text);
  const bestSentence = pickBestSentence(text, wordBank);

  // Tier-based feedback message
  let tierName;
  if (tier === 1) tierName = 'Picture Description';
  else if (tier === 2) tierName = 'Picture Story';
  else tierName = 'Topic Essay';

  // Tier-based thresholds (matching legacy)
  const tier_excellent = tier === 1 ? 8 : 10;
  const tier_good = tier === 1 ? 6 : 7;
  let tier_label = 'keep_trying';
  if (total >= tier_excellent) tier_label = 'excellent';
  else if (total >= tier_good) tier_label = 'good';

  return {
    dimensions: {
      D1: { score: d1, descriptor: tierDescriptors.D1_task[d1] },
      D2: { score: d2, descriptor: tierDescriptors.D2_vocab[d2] },
      D3: { score: d3, descriptor: tierDescriptors.D3_grammar[d3] },
      D4: { score: d4, descriptor: tierDescriptors.D4_connector[d4], isWarningOnly: tier === 1 },
    },
    total,
    maxTotal,
    tier: tier_label,
    tierName,
    badge: tier_label === 'excellent' ? `${tierName} Star ⭐` : null,
    canSubmit: true,
    wordCount,
    bestSentence,
    feedback: buildTieredFeedback({ tier, total, d1, d2, d3, d4, tier_label }),
  };
}

function buildTieredFeedback({ tier, total, d1, d2, d3, d4, tier_label }) {
  const tips = [];
  if (d1 < 2) {
    if (tier === 1) tips.push('Try to describe who is in the picture, where they are, and what they are doing.');
    else if (tier === 2) tips.push('Try ordering events with words like "first", "then", and "finally".');
    else tips.push('Start with a clear topic sentence, then add 2 supporting details, and end with a closing.');
  }
  if (d2 < 2) {
    if (tier === 1) tips.push('Use 3+ words from the word bank.');
    else if (tier === 2) tips.push('Use 5+ words from the word bank to enrich your story.');
    else tips.push('Try to use a wider range of vocabulary — avoid repeating the same words.');
  }
  if (d3 < 2) {
    if (tier === 2) tips.push('Keep your verbs in past tense for a consistent story.');
    else tips.push('Check that every sentence has a clear subject and verb.');
  }
  if (tier !== 1 && d4 < 2) {
    tips.push(tier === 3
      ? 'Use linking words like "therefore", "however", or "as a result".'
      : 'Link your ideas with words like "and", "but", "so", or "because".');
  }

  if (tier_label === 'excellent') return `Excellent ${tier === 1 ? 'picture description' : tier === 2 ? 'story' : 'essay'}! ${tips.length === 0 ? 'Keep it up!' : tips.join(' ')}`;
  if (tier_label === 'good') return `Good work! ${tips.length > 0 ? 'To improve: ' + tips.join(' ') : ''}`;
  return `Keep trying! ${tips.join(' ') || 'Type more and add details.'}`;
}
