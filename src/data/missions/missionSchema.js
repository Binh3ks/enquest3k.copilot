/**
 * Mission Schema V2 - AI-Driven Goal-Oriented Structure
 * Defines the contract for mission data, focusing on high-level goals for the AI.
 */

/**
 * Opening beat structure (only the first turn is scripted)
 */
export const OpeningBeat = {
  beatId: 0,
  aiPrompt: "Hi! I am Ms. Nova, your teacher. What is your name?",
  hints: ["My", "name", "is", "..."],
};

/**
 * Complete Mission structure
 */
export const Mission = {
  id: "", // e.g., "W1_FIRST_DAY"
  weekId: 1,
  title: "", // e.g., "First Day at School"
  description: "", // e.g., "Learn to introduce yourself"
  level: "easy", // easy | normal | challenge

  targetVocabulary: [
    {
      word: "", // e.g., "student"
      mustUse: true,
      definition: "",
    },
  ],

  successCriteria: {
    minTurns: 6,
    mustUseWords: [],
  },

  // The first turn of the mission
  openingBeat: {}, // OpeningBeat structure

  // High-level goals for the AI to achieve during the conversation
  missionGoals: [
    "Discover the student's name.",
    "Find out the student's age.",
    "Ask what class the student is in.",
  ],

  // Context for the AI
  context: {
      scene: "You are at school on your first day."
  }
};

/**
 * Validate a mission structure (simplified for V2)
 * @param {Object} mission - Mission object to validate
 * @returns {Object} Validation result { valid: boolean, errors: string[] }
 */
export function validateMission(mission) {
  const errors = [];

  if (!mission.id) errors.push("Missing mission.id");
  if (!mission.title) errors.push("Missing mission.title");
  if (!mission.missionGoals || mission.missionGoals.length === 0) {
    errors.push("Mission must have at least one goal in missionGoals.");
  }
  if (!mission.openingBeat || !mission.openingBeat.aiPrompt) {
    errors.push("Mission requires a valid openingBeat.");
  }
  if (!mission.successCriteria || !mission.successCriteria.mustUseWords) {
    errors.push("Missing successCriteria or mustUseWords.");
  }
  if (!mission.targetVocabulary || mission.targetVocabulary.length === 0) {
    errors.push("Mission must have targetVocabulary.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
