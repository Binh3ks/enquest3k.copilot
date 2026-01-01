/**
 * Mission Schema - Standard structure for all Story Missions
 * Defines the contract for mission data and validation
 */

/**
 * Mission Step structure
 */
export const MissionStep = {
  stepId: 0,           // Step number
  aiPrompt: "",        // What AI should say (can include {{placeholders}})
  expected: {          // Expected response type
    type: "short_answer" | "yes_no" | "choice" | "number",
    validation: null   // Optional regex/function to validate
  },
  hints: [],          // Array of hint words
  repair: ""          // Scaffold sentence if student is stuck
};

/**
 * Complete Mission structure
 */
export const Mission = {
  id: "",             // e.g., "W1_FIRST_DAY"
  weekId: 1,
  title: "",          // e.g., "First Day at School"
  description: "",    // e.g., "Learn to introduce yourself"
  level: "easy",      // easy | normal | challenge
  
  targetVocabulary: [
    {
      word: "",       // e.g., "student"
      mustUse: true,  // Required to use?
      phonetic: "",   // e.g., "/ˈstuːdənt/"
      definition: ""  // e.g., "A person who studies"
    }
  ],
  
  successCriteria: {
    minTurns: 6,                    // Minimum number of turns
    mustUseWords: [],               // Required words list
    optionalBonus: [],              // Bonus words (not required)
    vocabularyThreshold: 0.5        // Must use 50% of target vocab
  },
  
  steps: [],          // Array of MissionStep
  
  novaPersonality: {  // Personality settings for this mission
    traits: ["witty", "patient", "encouraging"],
    dadJokes: [],     // e.g., ["Why did the student eat homework? Teacher said it's a piece of cake!"]
    emoji: "📚"
  }
};

/**
 * Factory function to create a mission with defaults
 * @param {Object} config - Mission configuration
 * @returns {Object} Complete mission object
 */
export function createMission(config) {
  // Validation
  if (!config.id || !config.title || !config.steps || config.steps.length === 0) {
    throw new Error("Invalid mission config: missing id, title, or steps");
  }
  
  // Default values
  return {
    ...config,
    level: config.level || "easy",
    successCriteria: {
      minTurns: config.successCriteria?.minTurns || 6,
      mustUseWords: config.successCriteria?.mustUseWords || [],
      optionalBonus: config.successCriteria?.optionalBonus || [],
      vocabularyThreshold: config.successCriteria?.vocabularyThreshold || 0.5
    },
    novaPersonality: {
      traits: ["witty", "patient", "encouraging"],
      dadJokes: config.novaPersonality?.dadJokes || [],
      emoji: config.novaPersonality?.emoji || "📚",
      ...config.novaPersonality
    }
  };
}

/**
 * Validate a mission structure
 * @param {Object} mission - Mission object to validate
 * @returns {Object} Validation result { valid: boolean, errors: string[] }
 */
export function validateMission(mission) {
  const errors = [];
  
  // Check required fields
  if (!mission.id) errors.push("Missing mission.id");
  if (!mission.title) errors.push("Missing mission.title");
  if (!mission.steps || mission.steps.length === 0) {
    errors.push("Mission must have at least one step");
  }
  
  // Validate each step
  if (mission.steps) {
    mission.steps.forEach((step, i) => {
      if (!step.aiPrompt) errors.push(`Step ${i + 1}: Missing aiPrompt`);
      if (!step.hints || step.hints.length === 0) {
        errors.push(`Step ${i + 1}: Missing hints`);
      }
      if (!step.expected || !step.expected.type) {
        errors.push(`Step ${i + 1}: Missing expected.type`);
      }
    });
  }
  
  // Check success criteria
  if (!mission.successCriteria) {
    errors.push("Missing successCriteria");
  } else if (mission.successCriteria.mustUseWords.length === 0) {
    errors.push("Mission must have at least 1 required word in mustUseWords");
  }
  
  // Check vocabulary
  if (!mission.targetVocabulary || mission.targetVocabulary.length === 0) {
    errors.push("Mission must have targetVocabulary");
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Get mission statistics
 * @param {Object} mission - Mission object
 * @returns {Object} Statistics about the mission
 */
export function getMissionStats(mission) {
  return {
    totalSteps: mission.steps.length,
    requiredWords: mission.successCriteria.mustUseWords.length,
    bonusWords: mission.successCriteria.optionalBonus.length,
    totalVocabulary: mission.targetVocabulary.length,
    minTurns: mission.successCriteria.minTurns,
    level: mission.level
  };
}
