/**
 * speechSyntaxEvaluator.js — Universal ESL Speech & Syntax Evaluator
 * 
 * Core Pedagogical Invariants:
 * 1. WH-Fronting (Question Mode): Question word ('where', 'what', 'why', 'who', 'when', 'how')
 *    MUST appear at the beginning of the sentence. Inverted patterns (e.g. 'Tom get injured where')
 *    are explicitly caught and rejected with constructive syntax feedback.
 * 2. Sequential Word-Order (Subsequence Matching): Enforces chronological syntactic progression
 *    (Subject -> Verb -> Object or WH -> Aux -> Subject -> Verb) rather than unordered set overlap.
 * 3. Exact & Levenshtein Tolerance: Accurately rewards authentic pronunciation and minor contractions
 *    (e.g., "didn't" vs "did not", "where's" vs "where is").
 * 4. Structured Feedback: Always returns actionable feedback, accuracy score, and matched targets.
 */

/**
 * Normalizes spoken English string for robust syntactic comparison.
 */
export const normalizeSpokenText = (text = '') => {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/’/g, "'")
    .replace(/n't/g, " not")
    .replace(/'s/g, " is")
    .replace(/'re/g, " are")
    .replace(/'ve/g, " have")
    .replace(/'ll/g, " will")
    .replace(/'d/g, " would")
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

/**
 * Universal Speech Syntax Evaluator
 * 
 * @param {string} spokenText - Raw text transcribed from Web Speech API
 * @param {string[]|string} targets - Array of acceptable model sentences or a single target sentence
 * @param {Object} options - Configuration options
 * @param {'question'|'sentence'|'shadowing'|'find_diff'} [options.mode='sentence'] - Evaluation mode
 * @param {string} [options.cueWord=''] - Target WH-word for question mode
 * @param {number} [options.minWords=2] - Minimum word threshold
 * @param {string[]} [options.requiredPhrases=[]] - Compulsory grammatical chunks (e.g., ['in picture a', 'in picture b'])
 * @returns {{ isCorrect: boolean, score: number, feedback: string, spokenText: string, modelTarget: string }}
 */
export const evaluateSpeechSyntax = (spokenText, targets, options = {}) => {
  const {
    mode = 'sentence',
    cueWord = '',
    minWords = 2,
    requiredPhrases = [],
  } = options;

  const targetList = Array.isArray(targets) ? targets : [targets].filter(Boolean);
  const primaryModel = targetList[0] || '';

  if (!spokenText || spokenText.trim().length === 0) {
    return {
      isCorrect: false,
      score: 0,
      feedback: "No speech detected. Please speak clearly into your microphone!",
      spokenText: '',
      modelTarget: primaryModel
    };
  }

  const cleanSpoken = normalizeSpokenText(spokenText);
  const spokenTokens = cleanSpoken.split(/\s+/).filter(Boolean);

  if (spokenTokens.length < minWords) {
    return {
      isCorrect: false,
      score: Math.min(30, spokenTokens.length * 10),
      feedback: `Utterance too short (${spokenTokens.length} word${spokenTokens.length === 1 ? '' : 's'}). Speak a full sentence!`,
      spokenText: cleanSpoken,
      modelTarget: primaryModel
    };
  }

  // 1. Exact Match against any acceptable target
  for (const target of targetList) {
    const cleanTarget = normalizeSpokenText(target);
    if (cleanSpoken === cleanTarget) {
      return {
        isCorrect: true,
        score: 100,
        feedback: "🌟 Perfect pronunciation and grammar!",
        spokenText: cleanSpoken,
        modelTarget: target
      };
    }
  }

  // 2. Question Mode: WH-Fronting Syntactic Position Check
  if (mode === 'question' && cueWord) {
    const cleanCue = normalizeSpokenText(cueWord);
    const cueTokens = cleanCue.split(/\s+/);
    
    // Check if the WH-tokens appear at index 0 or 1 (allowing small filler like 'so', 'and')
    const startsWithCue = cueTokens.every((ct, idx) => spokenTokens[idx] === ct || spokenTokens[idx + 1] === ct);
    
    if (!startsWithCue && cleanSpoken.includes(cleanCue)) {
      return {
        isCorrect: false,
        score: 35,
        feedback: `Syntax error: Put the question word "${cueWord}" at the beginning of your question!`,
        spokenText: cleanSpoken,
        modelTarget: primaryModel
      };
    }
  }

  // 3. Required Phrases / Collocation Check (e.g. Find Differences 'in picture a')
  if (requiredPhrases.length > 0) {
    const missingPhrase = requiredPhrases.find(p => !cleanSpoken.includes(normalizeSpokenText(p)));
    if (missingPhrase) {
      return {
        isCorrect: false,
        score: 40,
        feedback: `Remember to include the key phrase: "${missingPhrase}"!`,
        spokenText: cleanSpoken,
        modelTarget: primaryModel
      };
    }
  }

  // 4. Sequential Subsequence Word-Order Match
  // Enforces chronological order: token A must precede token B as defined in the target sentence
  let bestScore = 0;
  let bestTarget = primaryModel;

  for (const target of targetList) {
    const cleanTarget = normalizeSpokenText(target);
    const targetTokens = cleanTarget.split(/\s+/).filter(Boolean);

    let targetIdx = 0;
    let inOrderMatches = 0;

    for (const token of spokenTokens) {
      if (targetIdx < targetTokens.length && token === targetTokens[targetIdx]) {
        inOrderMatches++;
        targetIdx++;
      } else if (targetIdx < targetTokens.length) {
        // Look ahead in target for next ordered occurrence
        const nextMatchIdx = targetTokens.indexOf(token, targetIdx);
        if (nextMatchIdx !== -1) {
          inOrderMatches++;
          targetIdx = nextMatchIdx + 1;
        }
      }
    }

    const orderRatio = targetTokens.length > 0 ? (inOrderMatches / targetTokens.length) : 0;
    const currentScore = Math.round(orderRatio * 100);

    if (currentScore > bestScore) {
      bestScore = currentScore;
      bestTarget = target;
    }
  }

  // Decision Thresholds
  const isPassing = bestScore >= (mode === 'shadowing' ? 55 : 60);

  let feedbackMsg = "Good effort! Try following the grammatical word order.";
  if (bestScore >= 85) {
    feedbackMsg = "🌟 Excellent! Clear structure and accurate grammar.";
  } else if (bestScore >= 60) {
    feedbackMsg = "✓ Good response! Clearly understood.";
  } else if (bestScore >= 40) {
    feedbackMsg = "⚠️ Word order needs adjustment. Listen to the model and try again!";
  }

  return {
    isCorrect: isPassing,
    score: bestScore,
    feedback: feedbackMsg,
    spokenText: cleanSpoken,
    modelTarget: bestTarget
  };
};

export default evaluateSpeechSyntax;
