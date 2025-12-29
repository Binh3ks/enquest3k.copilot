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
        hints: ["Yes", "I", "am", "student"]
      },
      {
        beatId: 2,
        aiPrompt: "Great! Do you go to school every day?",
        expectedType: "yes_no",
        requiredVocab: ['school'],
        hints: ["Yes", "I", "go", "school"]
      },
      {
        beatId: 3,
        aiPrompt: "Awesome! What do you have in your backpack?",
        expectedType: "short_answer",
        requiredVocab: ['backpack', 'book'],
        hints: ["I", "have", "book", "backpack"]
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
        hints: ["My", "book", "notebook", "backpack"]
      },
      {
        beatId: 2,
        aiPrompt: "Where did you see it last? In the library or in class?",
        expectedType: "location",
        requiredVocab: ['library'],
        hints: ["I", "saw", "library"]
      },
      {
        beatId: 3,
        aiPrompt: "Let's tell the school office. Say: 'I am a student. I lost my backpack.'",
        expectedType: "copy_model",
        requiredVocab: ['student', 'backpack'],
        hints: ["I", "am", "student", "lost", "backpack"]
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
    opener: "Hello! I am your teacher. Today we go to the library. Do you like the library?",
    beats: [
      {
        beatId: 1,
        aiPrompt: "Nice! What book do you want to read?",
        expectedType: "short_answer",
        requiredVocab: ['book'],
        hints: ["I", "want", "book", "about"]
      },
      {
        beatId: 2,
        aiPrompt: "Good choice! Do you write in a notebook at school?",
        expectedType: "yes_no",
        requiredVocab: ['notebook', 'school'],
        hints: ["Yes", "I", "write", "notebook"]
      },
      {
        beatId: 3,
        aiPrompt: "Great! Try to say: 'I write in my notebook at school every day.'",
        expectedType: "copy_model",
        requiredVocab: ['notebook', 'school'],
        hints: ["I", "write", "notebook", "school", "every", "day"]
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
