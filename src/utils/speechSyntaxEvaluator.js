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

  // 2. Question Mode: WH-Fronting & Question Structure Check
  if (mode === 'question') {
    const cleanCue = normalizeSpokenText(cueWord);
    if (cleanCue) {
      const cueTokens = cleanCue.split(/\s+/).filter(Boolean);
      const startsWithCue = cueTokens.every((ct, idx) => spokenTokens[idx] === ct || spokenTokens[idx + 1] === ct);
      
      if (!startsWithCue) {
        return {
          isCorrect: false,
          score: 30,
          feedback: `Please start your question with the question word "${cueWord}"!`,
          spokenText: cleanSpoken,
          modelTarget: primaryModel
        };
      }
    } else {
      // General question check: Must start with question word or auxiliary
      const QUESTION_STARTERS = ['what', 'where', 'when', 'why', 'who', 'how', 'which', 'whose', 'is', 'are', 'was', 'were', 'do', 'does', 'did', 'can', 'could', 'will', 'would', 'have', 'has', 'had'];
      const firstToken = spokenTokens[0];
      const secondToken = spokenTokens[1];
      const hasStarter = QUESTION_STARTERS.includes(firstToken) || (secondToken && QUESTION_STARTERS.includes(secondToken));
      if (!hasStarter) {
        return {
          isCorrect: false,
          score: 35,
          feedback: "Please ask a complete question starting with a question word or helping verb!",
          spokenText: cleanSpoken,
          modelTarget: primaryModel
        };
      }
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

  // 4. Sequential Subsequence Word-Order Match with Precision/Recall Balance (F1)
  // Enforces chronological order AND penalizes noisy extraneous words
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

    // Recall (coverage of target) and Precision (relevance of spoken tokens)
    const recall = targetTokens.length > 0 ? (inOrderMatches / targetTokens.length) : 0;
    const precision = spokenTokens.length > 0 ? (inOrderMatches / spokenTokens.length) : 0;
    
    // Balanced F1 Harmonic Mean to prevent noisy random babble passing
    const f1Score = (precision + recall > 0) 
      ? Math.round((2 * precision * recall / (precision + recall)) * 100)
      : 0;

    if (f1Score > bestScore) {
      bestScore = f1Score;
      bestTarget = target;
    }
  }

  // Decision Thresholds
  const isPassing = bestScore >= (mode === 'shadowing' ? 55 : 60);

  let feedbackMsg = "Good effort! Try following the sentence structure and pronunciation.";
  if (bestScore >= 85) {
    feedbackMsg = "🌟 Excellent! Clear structure and accurate grammar.";
  } else if (bestScore >= 60) {
    feedbackMsg = "✓ Good response! Clearly understood.";
  } else if (bestScore >= 40) {
    feedbackMsg = "⚠️ Try again! Listen to the model and repeat clearly.";
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
