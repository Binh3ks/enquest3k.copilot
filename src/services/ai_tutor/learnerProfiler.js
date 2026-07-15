/**
 * Learner Profiler - Detect Student Learning Style
 * 
 * Adaptive Pedagogy: Infer learner style from behavior patterns
 * From AI_TUTOR_MASTER_ARTIFACT.md:
 * "learnerStyle: (shy, normal, confident) based on scaffold dependency"
 * 
 * DETECTION CRITERIA:
 * - Shy: Frequent scaffold usage, short answers, many hints needed
 * - Normal: Balanced scaffold usage, moderate answers
 * - Confident: Minimal scaffolds, detailed answers, self-sufficient
 */

// ============================================
// CONFIGURATION
// ============================================

const ANALYSIS_WINDOW = 10; // Analyze last N turns
const MIN_TURNS_FOR_PROFILE = 5; // Minimum turns before inferring style

const THRESHOLDS = {
  // Scaffold usage thresholds (clicks per turn)
  scaffold: {
    shy: 0.5,       // ≥ 0.5 clicks/turn = shy
    confident: 0.1  // ≤ 0.1 clicks/turn = confident
  },
  
  // Answer length thresholds (words per answer)
  answerLength: {
    shy: 3,         // ≤ 3 words = shy
    confident: 8    // ≥ 8 words = confident
  },
  
  // Silent turn ratio (turns with no meaningful input)
  silentRatio: {
    shy: 0.3        // ≥ 30% silent turns = shy
  }
};

// ============================================
// BEHAVIOR TRACKING
// ============================================

/**
 * Track student behavior for a single turn
 * @typedef {Object} TurnBehavior
 * @property {number} turnNumber - Turn index
 * @property {string} userInput - Student's input
 * @property {number} wordCount - Words in student input
 * @property {boolean} usedScaffold - Whether student clicked hint
 * @property {boolean} isSilent - Whether turn was silent (≤ 2 words)
 * @property {number} timestamp - Unix timestamp
 */

/**
 * Analyze recent behavior to infer learner style
 * @param {TurnBehavior[]} behaviorHistory - Recent turn behaviors
 * @returns {{ style: string, confidence: number, analysis: Object }}
 */
export function inferLearnerStyle(behaviorHistory) {
  if (!Array.isArray(behaviorHistory) || behaviorHistory.length < MIN_TURNS_FOR_PROFILE) {
    return {
      style: 'normal',
      confidence: 0,
      analysis: {
        reason: `Insufficient data (${behaviorHistory?.length || 0} turns < ${MIN_TURNS_FOR_PROFILE})`
      }
    };
  }

  // Analyze last N turns
  const recentTurns = behaviorHistory.slice(-ANALYSIS_WINDOW);
  
  // Calculate metrics
  const totalTurns = recentTurns.length;
  const scaffoldClicks = recentTurns.filter(t => t.usedScaffold).length;
  const silentTurns = recentTurns.filter(t => t.isSilent).length;
  const avgWordCount = recentTurns.reduce((sum, t) => sum + t.wordCount, 0) / totalTurns;
  
  const scaffoldRatio = scaffoldClicks / totalTurns;
  const silentRatio = silentTurns / totalTurns;
  
  // Calculate scores for each style
  const scores = {
    shy: 0,
    normal: 0,
    confident: 0
  };
  
  // Shy indicators
  if (scaffoldRatio >= THRESHOLDS.scaffold.shy) scores.shy += 3;
  if (avgWordCount <= THRESHOLDS.answerLength.shy) scores.shy += 2;
  if (silentRatio >= THRESHOLDS.silentRatio.shy) scores.shy += 2;
  
  // Confident indicators
  if (scaffoldRatio <= THRESHOLDS.scaffold.confident) scores.confident += 3;
  if (avgWordCount >= THRESHOLDS.answerLength.confident) scores.confident += 2;
  if (silentRatio === 0) scores.confident += 1;
  
  // Normal is default (middle range)
  if (scaffoldRatio > THRESHOLDS.scaffold.confident && scaffoldRatio < THRESHOLDS.scaffold.shy) {
    scores.normal += 2;
  }
  if (avgWordCount > THRESHOLDS.answerLength.shy && avgWordCount < THRESHOLDS.answerLength.confident) {
    scores.normal += 2;
  }
  
  // Determine style (highest score)
  const maxScore = Math.max(scores.shy, scores.normal, scores.confident);
  let inferredStyle = 'normal';
  
  if (maxScore === 0) {
    inferredStyle = 'normal';
  } else if (scores.shy === maxScore) {
    inferredStyle = 'shy';
  } else if (scores.confident === maxScore) {
    inferredStyle = 'confident';
  } else {
    inferredStyle = 'normal';
  }
  
  // Calculate confidence (0-1 scale)
  const totalScore = scores.shy + scores.normal + scores.confident;
  const confidence = totalScore > 0 ? maxScore / totalScore : 0.5;
  
  return {
    style: inferredStyle,
    confidence: Math.round(confidence * 100) / 100,
    analysis: {
      totalTurns,
      scaffoldClicks,
      scaffoldRatio: Math.round(scaffoldRatio * 100) / 100,
      silentTurns,
      silentRatio: Math.round(silentRatio * 100) / 100,
      avgWordCount: Math.round(avgWordCount * 10) / 10,
      scores
    }
  };
}

/**
 * Get recommended scaffolding level based on learner style
 * @param {string} learnerStyle - 'shy' | 'normal' | 'confident'
 * @param {number} strugglingTurns - Number of consecutive short/silent answers
 * @returns {number} Scaffolding level (0=none, 1=low, 2=medium, 3=high)
 */
export function getRecommendedScaffoldingLevel(learnerStyle, strugglingTurns = 0) {
  // Base scaffolding by style
  const baseLevel = {
    shy: 2,       // Start with medium scaffolding
    normal: 1,    // Start with low scaffolding
    confident: 0  // Start with no scaffolding
  };
  
  let level = baseLevel[learnerStyle] || 1;
  
  // Escalate if student is struggling (consecutive short answers)
  if (strugglingTurns >= 3) {
    level = Math.min(3, level + 2); // Jump to high
  } else if (strugglingTurns >= 2) {
    level = Math.min(3, level + 1); // Escalate one level
  }
  
  return level;
}

/**
 * Create a turn behavior record
 * @param {number} turnNumber - Turn index
 * @param {string} userInput - Student input
 * @param {boolean} usedScaffold - Whether hints were used
 * @returns {TurnBehavior}
 */
export function createTurnBehavior(turnNumber, userInput, usedScaffold = false) {
  const words = userInput.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  
  return {
    turnNumber,
    userInput,
    wordCount,
    usedScaffold,
    isSilent: wordCount <= 2,
    timestamp: Date.now()
  };
}

/**
 * Get scaffolding level name
 * @param {number} level - 0-3
 * @returns {string}
 */
export function getScaffoldingLevelName(level) {
  const names = ['none', 'low', 'medium', 'high'];
  return names[level] || 'low';
}

/**
 * Get adaptive prompt adjustment based on learner style
 * Appends to system prompt to adjust AI behavior
 * @param {string} learnerStyle - 'shy' | 'normal' | 'confident'
 * @returns {string} Additional prompt instructions
 */
export function getAdaptivePromptAdjustment(learnerStyle) {
  const adjustments = {
    shy: `
🎯 LEARNER PROFILE: SHY STUDENT
This student needs extra encouragement and scaffolding:
- Ask simpler, more direct questions
- Offer hints proactively after 1-2 turns of silence
- Celebrate even small efforts ("Great try!", "You're doing well!")
- Use A/B choice questions: "Do you like cats or dogs?"
- Keep questions concrete and familiar
    `.trim(),
    
    normal: `
🎯 LEARNER PROFILE: NORMAL STUDENT
This student is progressing well with balanced support:
- Use open-ended questions but be ready to scaffold
- Offer hints if student is silent for 2+ turns
- Mix simple and slightly challenging questions
- Encourage elaboration: "Can you tell me more?"
    `.trim(),
    
    confident: `
🎯 LEARNER PROFILE: CONFIDENT STUDENT
This student is self-sufficient and ready for challenges:
- Ask open-ended, thought-provoking questions
- Use "Why?" and "How?" questions
- Encourage complex sentences
- Withhold scaffolding unless explicitly requested
- Challenge them: "Can you use 2-3 sentences?"
    `.trim()
  };
  
  return adjustments[learnerStyle] || adjustments.normal;
}

/**
 * Update learner profile with new turn data
 * @param {Object} currentProfile - Current profile { style, confidence, behaviorHistory }
 * @param {TurnBehavior} newTurn - New turn behavior
 * @returns {Object} Updated profile
 */
export function updateLearnerProfile(currentProfile, newTurn) {
  const behaviorHistory = [...(currentProfile.behaviorHistory || []), newTurn];
  
  // Keep only recent history (max 50 turns)
  const recentHistory = behaviorHistory.slice(-50);
  
  // Re-infer style with updated data
  const inference = inferLearnerStyle(recentHistory);
  
  return {
    style: inference.style,
    confidence: inference.confidence,
    analysis: inference.analysis,
    behaviorHistory: recentHistory,
    lastUpdated: Date.now()
  };
}

/**
 * Get learner profile summary for UI display
 * @param {Object} profile - Learner profile
 * @returns {string} Human-readable summary
 */
export function getProfileSummary(profile) {
  if (!profile || !profile.style) {
    return '📊 Analyzing learning style...';
  }
  
  const emoji = {
    shy: '🌱',
    normal: '📘',
    confident: '⭐'
  };
  
  const description = {
    shy: 'Shy learner - needs encouragement',
    normal: 'Normal learner - progressing well',
    confident: 'Confident learner - ready for challenges'
  };
  
  return `${emoji[profile.style]} ${description[profile.style]} (${Math.round(profile.confidence * 100)}% confidence)`;
}
