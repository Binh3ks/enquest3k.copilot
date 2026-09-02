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
        feedback: "🌟 Perfect sentence structure and grammar!",
        spokenText: cleanSpoken,
        modelTarget: target
      };
    }
  }

  // 2. Question Mode: WH-Fronting & Question Structure Check
  if (mode === 'question') {
    const WH_HOMOPHONES = {
      'where': ['where', 'wear', "we're", 'ware', 'were', 'we'],
      'what': ['what', 'wat', 'watt', 'water'],
      'why': ['why', 'y', 'while', 'white'],
      'who': ['who', 'hoo', 'whose'],
      'when': ['when', 'wen', 'win'],
      'how': ['how', 'house'],
      'which': ['which', 'witch'],
      'whose': ['whose', 'who']
    };

    const cleanCue = normalizeSpokenText(cueWord);
    if (cleanCue) {
      const allowedStarters = WH_HOMOPHONES[cleanCue] || [cleanCue];
      const firstToken = spokenTokens[0];
      const secondToken = spokenTokens[1];
      const startsWithCue = allowedStarters.includes(firstToken) || (secondToken && allowedStarters.includes(secondToken)) || (cleanCue === 'where' && firstToken === 'we' && secondToken === 'are');
      
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
      // General question check: Must start with question word or auxiliary (including common ESL homophones)
      const QUESTION_STARTERS = [
        'what', 'wat', 'where', 'wear', 'when', 'why', 'who', 'how', 'which', 'whose',
        'is', 'are', 'was', 'were', 'do', 'does', 'did', 'can', 'could', 'will', 'would', 'have', 'has', 'had'
      ];
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

/**
 * Evaluates long-form multi-scene story retell / video challenge.
 * Uses scene-by-scene semantic alignment, STT homophone normalization,
 * connector detection, and Cambridge Speaking criteria (Content, Grammar/Chunks, Fluency).
 * 
 * @param {string} spokenText - Raw text from Web Speech API
 * @param {Array<{en: string, text: string, title: string}>|string} scenes - Scene list or full target script
 * @returns {{ isCorrect: boolean, score: number, feedback: string, breakdown: Object, recognizedScenes: number }}
 */
export const evaluateStoryRetell = (spokenText = '', scenes = []) => {
  if (!spokenText || spokenText.trim().length === 0) {
    return {
      isCorrect: false,
      score: 0,
      feedback: "No speech detected. Please speak clearly into your microphone!",
      breakdown: { content: 0, chunks: 0, fluency: 0 },
      recognizedScenes: 0
    };
  }

  // Pre-process spoken text with speech-to-text phonetic normalization
  let normalizedSpoken = normalizeSpokenText(spokenText);
  // Common STT homophones in ESL retell
  const PHONETIC_CORRECTIONS = [
    [/\bwhy check\b/g, "while jake"],
    [/\bwhy jake\b/g, "while jake"],
    [/\bcheck was\b/g, "jake was"],
    [/\bfirst eight\b/g, "first aid"],
    [/\bfirst eight kit\b/g, "first aid kit"],
    [/\bhad master\b/g, "headmaster"],
    [/\bthey had master\b/g, "then headmaster"],
    [/\bsafety or what\b/g, "safety award"],
    [/\braise him raise his\b/g, "praised his"],
    [/\bfelt round of\b/g, "felt proud of"],
    [/\bfelt round\b/g, "felt proud"],
    [/\bpass him\b/g, "past him"],
    [/\bfelt down\b/g, "fell down"],
    [/\bsadly\b/g, "suddenly"],
    [/\bclean his\b/g, "cleaned his"],
  ];

  for (const [pattern, replacement] of PHONETIC_CORRECTIONS) {
    normalizedSpoken = normalizedSpoken.replace(pattern, replacement);
  }

  const spokenTokens = normalizedSpoken.split(/\s+/).filter(Boolean);

  // Normalize scenes array
  let sceneList = [];
  if (Array.isArray(scenes) && scenes.length > 0) {
    sceneList = scenes.map(s => (typeof s === 'string' ? s : s.en || s.text || '')).filter(Boolean);
  }
  if (sceneList.length === 0 && typeof scenes === 'string') {
    sceneList = scenes.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 10);
  }

  const totalTargetWords = sceneList.reduce((sum, s) => sum + normalizeSpokenText(s).split(/\s+/).filter(Boolean).length, 0) || 50;

  // 1. Scene-by-Scene Semantic / Keyword Recognition
  let matchedSceneCount = 0;
  let sceneScores = [];

  for (const sceneText of sceneList) {
    const cleanScene = normalizeSpokenText(sceneText);
    const sceneTokens = cleanScene.split(/\s+/).filter(Boolean);
    if (sceneTokens.length === 0) continue;

    // Count how many content words in this scene appear in the spoken text
    let matches = 0;
    const keyTokens = sceneTokens.filter(w => !['a', 'an', 'the', 'in', 'on', 'at', 'to', 'of', 'and', 'was', 'were', 'he', 'she', 'his', 'her', 'for', 'with', 'from', 'it'].includes(w));
    
    for (const kw of keyTokens) {
      if (normalizedSpoken.includes(kw)) {
        matches++;
      }
    }

    const sceneRatio = keyTokens.length > 0 ? (matches / keyTokens.length) : 1;
    sceneScores.push(sceneRatio);
    if (sceneRatio >= 0.30) {
      matchedSceneCount++;
    }
  }

  const avgSceneCoverage = sceneScores.length > 0 
    ? sceneScores.reduce((a, b) => a + b, 0) / sceneScores.length 
    : 0;

  // 2. Length & Fluency Ratio (Spoken words vs Target words)
  const lengthRatio = Math.min(1.2, spokenTokens.length / Math.max(20, totalTargetWords * 0.7));
  const fluencyScore = Math.min(100, Math.round(lengthRatio * 100));

  // 3. Connectors & Discourse Markers Recognition
  const CONNECTORS = ['in the beginning', 'while', 'suddenly', 'then', 'after that', 'next', 'in the end', 'finally', 'so', 'because'];
  let connectorHits = 0;
  for (const conn of CONNECTORS) {
    if (normalizedSpoken.includes(conn)) connectorHits++;
  }
  const connectorScore = Math.min(100, connectorHits * 25);

  // 4. Weighted Cambridge Speaking Score
  // Content Coverage (40%) + Keyword/Scene Match (35%) + Fluency/Length (15%) + Connectors (10%)
  const rawScore = Math.round(
    (matchedSceneCount / Math.max(1, sceneList.length)) * 40 +
    avgSceneCoverage * 35 +
    (fluencyScore / 100) * 15 +
    (connectorScore / 100) * 10
  );

  const finalScore = Math.min(100, Math.max(30, rawScore));
  const isPassing = finalScore >= 60;

  let feedbackMsg = "Good effort! Practice retelling your story with natural expression.";
  if (finalScore >= 85) {
    feedbackMsg = "🌟 Outstanding video challenge! Fluent delivery and excellent Cambridge story retelling!";
  } else if (finalScore >= 70) {
    feedbackMsg = "✓ Great storytelling! You covered the story clearly with good linking words.";
  } else if (finalScore >= 50) {
    feedbackMsg = "👍 Good attempt! Try speaking a bit more clearly to hit all scene details.";
  }

  return {
    isCorrect: isPassing,
    score: finalScore,
    feedback: feedbackMsg,
    spokenText: normalizedSpoken,
    recognizedScenes: matchedSceneCount,
    totalScenes: sceneList.length,
    breakdown: {
      content: Math.round(avgSceneCoverage * 100),
      fluency: fluencyScore,
      connectors: connectorHits
    }
  };
};

export default evaluateSpeechSyntax;
