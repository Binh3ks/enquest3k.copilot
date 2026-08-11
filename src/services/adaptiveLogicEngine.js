/**
 * Adaptive Logic Engine for Station 2 (Rule-Based).
 * Implements strict rules specified in Technical Brief section 3.3:
 * 1. Elite Challenge Unlock: Requires 5 consecutive 100% PERFECT correct answers (zero minor errors).
 *    Minor errors (90%) DO NOT count towards the streak and reset it to 0.
 * 2. Adaptive Explainer Hint ("Học lại mẹo"): Triggered when 2 consecutive non-perfect/minor-error attempts
 *    occur on the same grammar_tag.
 */

export const adaptiveLogicEngine = {
  /**
   * Process attempt result and update streak & hint state
   * @param {Object} state - Current adaptive state { streak100: number, failTracker: Record<string, number>, isEliteUnlocked: boolean }
   * @param {Object} evaluation - Evaluation from evaluateSentenceAttempt
   * @param {string} grammarTag - Target grammar_tag
   */
  processAttempt(state, evaluation, grammarTag) {
    const {
      streak100 = 0,
      failTracker = {},
      isEliteUnlocked = false
    } = state;

    let newStreak100 = streak100;
    let newFailTracker = { ...failTracker };
    let triggerHint = false;
    let newEliteUnlocked = isEliteUnlocked;

    const currentFailCount = newFailTracker[grammarTag] || 0;

    // Rule 1: Streak tracking for Elite Challenge
    if (evaluation.isCorrect && !evaluation.isMinorError && evaluation.score === 100) {
      newStreak100 += 1;
      newFailTracker[grammarTag] = 0; // Reset fail counter on 100% success

      if (newStreak100 >= 5) {
        newEliteUnlocked = true;
      }
    } else {
      // Minor Error (90%) or Incorrect (0%) resets the 100% streak to 0
      newStreak100 = 0;

      // Rule 2: Increment non-perfect counter for Adaptive Explainer Hint
      const nextFailCount = currentFailCount + 1;
      newFailTracker[grammarTag] = nextFailCount;

      if (nextFailCount >= 2) {
        triggerHint = true;
      }
    }

    return {
      newState: {
        streak100: newStreak100,
        failTracker: newFailTracker,
        isEliteUnlocked: newEliteUnlocked
      },
      triggerHint: triggerHint,
      hintGrammarTag: triggerHint ? grammarTag : null,
      unlockedEliteJustNow: !isEliteUnlocked && newEliteUnlocked
    };
  }
};
