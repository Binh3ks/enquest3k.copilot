/**
 * STORY MISSIONS DATA
 * Week 1 missions following Learning Role-play spec
 */

export const Week1Missions = [
  {
    id: 'W1_FIRST_DAY',
    title: 'First Day at School',
    level: 'easy',
    context: {
      weekId: 1,
      lessonId: 'new_words',
      unit: 'The Young Scholar'
    },
    targetVocabulary: [
      { word: 'student', mustUse: true },
      { word: 'teacher', mustUse: true },
      { word: 'school', mustUse: true },
      { word: 'name', mustUse: true },
      { word: 'backpack', mustUse: false },
      { word: 'book', mustUse: false }
    ],
    successCriteria: {
      minTurns: 6,
      mustUseWords: ['student', 'teacher', 'school', 'name'],
      targetSentenceLength: 5
    },
    opener: "Hi! I am your teacher. What is your name?",
    beats: [
      {
        beatId: 1,
        aiPrompt: "Nice to meet you, {{NAME}}! Are you a student?",
        expectedType: "yes_no",
        requiredVocab: ['student'],
        hints: ["Yes", "I", "am", "a", "student"]
      },
      {
        beatId: 2,
        aiPrompt: "Great! Where is your school?",
        expectedType: "short_answer",
        requiredVocab: ['school'],
        hints: ["My", "school", "is", "in"]
      },
      {
        beatId: 3,
        aiPrompt: "Awesome! What is in your backpack?",
        expectedType: "short_answer",
        requiredVocab: ['backpack', 'book'],
        hints: ["My", "backpack", "book", "is"]
      }
    ]
  },
  
  {
    id: 'W1_LOST_BACKPACK',
    title: 'Lost Backpack',
    level: 'challenge',
    context: {
      weekId: 1,
      lessonId: 'new_words',
      unit: 'The Young Scholar'
    },
    targetVocabulary: [
      { word: 'backpack', mustUse: true },
      { word: 'book', mustUse: true },
      { word: 'notebook', mustUse: true },
      { word: 'teacher', mustUse: true },
      { word: 'school', mustUse: true },
      { word: 'library', mustUse: false }
    ],
    successCriteria: {
      minTurns: 5,
      mustUseWords: ['backpack', 'book', 'notebook', 'teacher'],
      targetSentenceLength: 6
    },
    opener: "Oh no! You are at school. You cannot find your backpack. I am your teacher. What do you say?",
    beats: [
      {
        beatId: 1,
        aiPrompt: "Good! What is in your backpack?",
        expectedType: "short_answer",
        requiredVocab: ['book', 'notebook', 'backpack'],
        hints: ["My", "book", "and", "notebook", "are"]
      },
      {
        beatId: 2,
        aiPrompt: "Where is your backpack? In the library or in class?",
        expectedType: "location",
        requiredVocab: ['library'],
        hints: ["I", "am", "in", "library"]
      },
      {
        beatId: 3,
        aiPrompt: "Let's tell the school office. Say: 'I cannot find my backpack.'",
        expectedType: "copy_model",
        requiredVocab: ['backpack'],
        hints: ["I", "cannot", "find", "my", "backpack"]
      }
    ]
  },
  
  {
    id: 'W1_LIBRARY_HELPER',
    title: 'At the Library',
    level: 'normal',
    context: {
      weekId: 1,
      lessonId: 'new_words',
      unit: 'The Young Scholar'
    },
    targetVocabulary: [
      { word: 'library', mustUse: true },
      { word: 'book', mustUse: true },
      { word: 'notebook', mustUse: true },
      { word: 'school', mustUse: true },
      { word: 'teacher', mustUse: false }
    ],
    successCriteria: {
      minTurns: 5,
      mustUseWords: ['library', 'book', 'notebook'],
      targetSentenceLength: 5
    },
    opener: "Hello! I am your teacher. We are in the library. Where is your book?",
    beats: [
      {
        beatId: 1,
        aiPrompt: "Nice! Where is your notebook?",
        expectedType: "short_answer",
        requiredVocab: ['notebook'],
        hints: ["My", "notebook", "is", "in"]
      },
      {
        beatId: 2,
        aiPrompt: "Good! What is in the library?",
        expectedType: "short_answer",
        requiredVocab: ['library', 'book'],
        hints: ["There", "are", "books", "in", "library"]
      },
      {
        beatId: 3,
        aiPrompt: "Great! Try to say: 'My book is in the library.'",
        expectedType: "copy_model",
        requiredVocab: ['book', 'library'],
        hints: ["My", "book", "is", "in", "library"]
      }
    ]
  }
];

/**
 * Get missions for a specific week
 */
export function getMissionsForWeek(weekId) {
  // For now, only Week 1 missions
  if (weekId === 1) {
    return Week1Missions;
  }
  return [];
}

/**
 * Get mission by ID
 */
export function getMissionById(missionId) {
  return Week1Missions.find(m => m.id === missionId);
}
