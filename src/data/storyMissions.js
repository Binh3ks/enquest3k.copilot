/**
 * STORY MISSIONS DATA V2 - AI-Driven Goal-Oriented Structure
 */

export const Week1Missions = [
  {
    id: "W1_FIRST_DAY",
    title: "First Day at School",
    level: "easy",
    weekId: 1,
    context: {
      scene:
        "You are at school on your first day. Ms. Nova is your new teacher and she wants to know about you.",
    },
    targetVocabulary: [
      { word: "student", mustUse: true, definition: "a person who studies" },
      { word: "teacher", mustUse: true, definition: "a person who teaches" },
      { word: "school", mustUse: true, definition: "a place for learning" },
      { word: "name", mustUse: true, definition: "what we call someone" },
    ],
    successCriteria: {
      minTurns: 10,
      mustUseWords: ["student", "teacher", "school", "name"],
    },
    openingBeat: {
      aiPrompt: "Hi! I am Ms. Nova, your teacher. What is your name?",
      hints: ["My", "name", "is", "Minh"],
    },
    missionGoals: [
      "Get the student's name",
      "Get the student's age",
      "Get the student's class",
      "Ask if the student likes school",
    ],
  },
  {
    id: "W1_LOST_BACKPACK",
    title: "Lost Backpack",
    level: "challenge",
    weekId: 1,
    context: {
      scene:
        "You are at school and you cannot find your backpack! Ms. Nova is your teacher and wants to help you.",
    },
    targetVocabulary: [
      { word: "backpack", mustUse: true, definition: "bag for school" },
      { word: "book", mustUse: true, definition: "something we read" },
      { word: "notebook", mustUse: true, definition: "where we write" },
      { word: "teacher", mustUse: true, definition: "person who teaches" },
    ],
    successCriteria: {
      minTurns: 10,
      mustUseWords: ["backpack", "book", "notebook", "teacher"],
    },
    openingBeat: {
      aiPrompt: "Oh no! You look worried. What is wrong?",
      hints: ["I", "cannot", "find", "my", "backpack"],
    },
    missionGoals: [
      "Find out what is wrong",
      "Ask what is in the student's backpack",
      "Ask where the student thinks the backpack is",
      "Suggest a place to look for the backpack",
    ],
  },
  {
    id: "W1_LIBRARY_HELPER",
    title: "At the Library",
    level: "normal",
    weekId: 1,
    context: {
      scene:
        "You are in the school library with Ms. Nova. There are many books around you.",
    },
    targetVocabulary: [
      { word: "library", mustUse: true, definition: "place with many books" },
      { word: "book", mustUse: true, definition: "something we read" },
      { word: "notebook", mustUse: true, definition: "where we write" },
      { word: "school", mustUse: true, definition: "place for learning" },
    ],
    successCriteria: {
      minTurns: 10,
      mustUseWords: ["library", "book", "notebook"],
    },
    openingBeat: {
      aiPrompt: "Hi! We are in the library today. Do you like books?",
      hints: ["Yes", "I", "like", "books"],
    },
    missionGoals: [
      "Ask what the student sees in the library",
      "Ask if the student likes reading books",
      "Ask if the student has a notebook",
      "Ask if the student likes the library",
    ],
  },
];

export const Week2Missions = [
  // Assuming these are converted to the new format as well
];

export function getMissionsForWeek(weekId) {
  if (weekId === 1) {
    return Week1Missions;
  }
  if (weekId === 2) {
    return Week2Missions;
  }
  return [];
}

export function getMissionById(missionId) {
  const allMissions = [...Week1Missions, ...Week2Missions];
  return allMissions.find((m) => m.id === missionId);
}
