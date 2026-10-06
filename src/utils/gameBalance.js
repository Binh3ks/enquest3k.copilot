/**
 * gameBalance.js — Shared Game Balance & Pacing Engine
 * Based on ENGQUEST3K_REDESIGN_THEO_NHOM_CO_CHE.md §2 (Formulas 1 & 2)
 */

function combinations(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let c = 1;
  for (let i = 1; i <= k; i++) {
    c = (c * (n - (k - i))) / i;
  }
  return c;
}

/**
 * Formula 1 — Legible Real-Time Pacing Budget (N2)
 *
 * T_read = N_words * t_per_word + t_decision
 * T_engine_min = T_read * safetyFactor (1.3 default)
 * max_speed = distance_px / T_engine_min
 *
 * Supports both object: calcPacingBudget({ wordCount, choicesCount, ... })
 * and positional: calcPacingBudget(words, choices, distancePx, ...)
 */
export function calcPacingBudget(
  wordsOrParams = 10,
  choices = 3,
  distance = 360,
  tPerWord = 0.67,
  tDecisionBase = 1.5,
  safetyFactor = 1.3
) {
  let wordCount = 10;
  let choicesCount = 3;
  let distancePx = 360;

  if (typeof wordsOrParams === 'object' && wordsOrParams !== null) {
    wordCount = wordsOrParams.wordCount ?? wordsOrParams.words ?? 10;
    choicesCount = wordsOrParams.choicesCount ?? wordsOrParams.choices ?? 3;
    distancePx = wordsOrParams.distancePx ?? wordsOrParams.distance ?? 360;
    tPerWord = wordsOrParams.tPerWord ?? 0.67;
    tDecisionBase = wordsOrParams.tDecisionBase ?? 1.5;
    safetyFactor = wordsOrParams.safetyFactor ?? 1.3;
  } else {
    wordCount = Number(wordsOrParams) || 10;
    choicesCount = Number(choices) || 3;
    distancePx = Number(distance) || 360;
  }

  const tDecision = tDecisionBase + Math.max(0, (choicesCount - 2) * 0.6);
  const tRead = wordCount * tPerWord + tDecision;
  const tEngineMin = tRead * safetyFactor;
  const maxSpeedPxPerSec = distancePx > 0 && tEngineMin > 0 ? distancePx / tEngineMin : 0;

  return {
    wordCount,
    choicesCount,
    distancePx,
    tRead: Number(tRead.toFixed(2)),
    tDecision: Number(tDecision.toFixed(2)),
    tEngineMin: Number(tEngineMin.toFixed(2)),
    maxSpeedPxPerSec: Number(maxSpeedPxPerSec.toFixed(2)),
    // Aliases
    t_doc: Number(tRead.toFixed(2)),
    t_engine_toi_thieu: Number(tEngineMin.toFixed(2)),
    toc_do_toi_da: Number(maxSpeedPxPerSec.toFixed(2)),
  };
}

/**
 * Formula 2 — Anti-Guesswork Probability (N4)
 *
 * Binomial probability of winning by pure random guessing with L allowed misses.
 * P(pass) = sum_{k=0}^{maxMisses} C(rounds, k) * q^k * p^(rounds - k)
 * where p = 1/n_choices, q = (n_choices - 1)/n_choices
 *
 * Supports both object: calcAntiGuessParams({ nChoices, rounds, maxMisses })
 * and positional: calcAntiGuessParams(nChoices, rounds, maxMisses)
 */
export function calcAntiGuessParams(nChoicesOrParams = 3, rounds = 5, maxMisses = 1) {
  let n = 3;
  let r = 5;
  let m = 1;

  if (typeof nChoicesOrParams === 'object' && nChoicesOrParams !== null) {
    n = nChoicesOrParams.nChoices ?? nChoicesOrParams.n_choices ?? 3;
    r = nChoicesOrParams.rounds ?? 5;
    m = nChoicesOrParams.maxMisses ?? nChoicesOrParams.max_misses ?? 1;
  } else {
    n = Number(nChoicesOrParams) || 3;
    r = Number(rounds) || 5;
    m = Number(maxMisses) || 1;
  }

  if (n <= 1) {
    return {
      nChoices: n,
      rounds: r,
      maxMisses: m,
      pPass: 1,
      pPassPercent: 100,
      isUnder5Percent: false,
      p_pass: 1,
      p_pass_percent: 100,
    };
  }

  const p = 1 / n;
  const q = (n - 1) / n;

  let pPass = 0;
  for (let k = 0; k <= m; k++) {
    const ways = combinations(r, k);
    pPass += ways * Math.pow(q, k) * Math.pow(p, r - k);
  }

  const pPassPercent = Number((pPass * 100).toFixed(2));
  return {
    nChoices: n,
    rounds: r,
    maxMisses: m,
    pPass,
    pPassPercent,
    isUnder5Percent: pPass < 0.05,
    p_pass: pPass,
    p_pass_percent: pPassPercent,
  };
}
