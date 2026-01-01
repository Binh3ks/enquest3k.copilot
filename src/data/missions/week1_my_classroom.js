import { createMission } from './missionSchema';

/**
 * Week 1: My Classroom
 * Focus: Describe classroom objects and locations
 * Grammar: Present Simple + There is/There are
 * CEFR Level: A1 (Beginner)
 */
export const week1MyClassroom = createMission({
  id: "W1_MY_CLASSROOM",
  weekId: 1,
  title: "My Classroom",
  description: "Learn to describe your classroom and objects in it",
  level: "normal",
  
  targetVocabulary: [
    { word: "desk", mustUse: true, phonetic: "/desk/", definition: "A table for studying" },
    { word: "chair", mustUse: true, phonetic: "/tʃer/", definition: "A thing to sit on" },
    { word: "board", mustUse: true, phonetic: "/bɔːrd/", definition: "Where the teacher writes" },
    { word: "book", mustUse: true, phonetic: "/bʊk/", definition: "A thing you read" },
    { word: "pen", mustUse: false, phonetic: "/pen/", definition: "A thing to write with" },
    { word: "window", mustUse: false, phonetic: "/ˈwɪndoʊ/", definition: "You see outside through it" },
  ],
  
  grammarRules: [
    "Present Simple (I have, you have, there is, there are)",
    "NO past tense",
    "NO future tense"
  ],
  
  novaPersonality: {
    emoji: "📚",
    traits: ["patient", "visual", "simple"]
  },
  
  steps: [
    {
      stepId: 1,
      aiPrompt: "Hi! I'm Ms. Nova. Today we talk about your classroom. What do you have in your classroom?",
      task: "Name one thing in your classroom",
      expected: { type: "short_answer" },
      hints: ["I", "have", "a"],
      repair: "Try: I have a _____",
      modelSentence: "I have a desk.",
      modelModify: "Say what YOU have in YOUR classroom."
    },
    {
      stepId: 2,
      aiPrompt: "Good! A {{object}}! Where is your {{object}} in the classroom?",
      task: "Tell me where it is",
      expected: { type: "short_answer" },
      hints: ["It", "is", "near", "the"],
      repair: "Say: It is near the _____",
      modelSentence: "It is near the window.",
      modelModify: "Say where YOUR {{object}} is."
    },
    {
      stepId: 3,
      aiPrompt: "Good! What do you like in your classroom?",
      task: "Tell me your favorite thing",
      expected: { type: "short_answer" },
      hints: ["I", "like", "the"],
      repair: "Try: I like the _____",
      modelSentence: "I like the board.",
      modelModify: "Say what YOU like."
    },
    {
      stepId: 4,
      aiPrompt: "Nice! Why do you like the {{favoritePlace}}?",
      task: "Give a simple reason",
      expected: { type: "short_answer" },
      hints: ["It", "is", "good", "nice", "big"],
      repair: "Say: It is _____",
      modelSentence: "It is nice.",
      modelModify: "Say why YOU like it."
    },
    {
      stepId: 5,
      aiPrompt: "Great! How many windows are in your classroom?",
      task: "Count the windows",
      expected: { type: "number" },
      hints: ["There", "are", "windows"],
      repair: "Say: There are ___ windows",
      modelSentence: "There are 4 windows.",
      modelModify: "Count YOUR classroom windows."
    },
    {
      stepId: 6,
      aiPrompt: "Perfect! Is your classroom big or small?",
      task: "Describe the size",
      expected: { type: "short_answer" },
      hints: ["It", "is", "big", "small"],
      repair: "Answer: It is big OR It is small",
      modelSentence: "It is big.",
      modelModify: "Describe YOUR classroom."
    },
    // Expansion turns (3 additional)
    {
      stepId: 7,
      aiPrompt: "Good! What color is your classroom?",
      task: "Name a color",
      expected: { type: "short_answer" },
      hints: ["It", "is", "white", "yellow", "blue"],
      repair: "Say: It is _____",
      modelSentence: "It is white.",
      modelModify: "Say YOUR classroom color."
    },
    {
      stepId: 8,
      aiPrompt: "Nice! How many students are in your classroom?",
      task: "Tell me a number",
      expected: { type: "number" },
      hints: ["There", "are", "students"],
      repair: "Say: There are ___ students",
      modelSentence: "There are 25 students.",
      modelModify: "Count students in YOUR class."
    },
    {
      stepId: 9,
      aiPrompt: "Wow! Do you sit near the window?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "sit", "near", "the", "window"],
      repair: "Say: Yes, I sit near the window OR No, I don't sit near the window",
      modelSentence: "Yes, I sit near the window.",
      modelModify: "Answer about YOUR seat."
    },
    {
      stepId: 10,
      aiPrompt: "Awesome! You know your classroom very well! Great job! 📚",
      task: "Say thank you",
      expected: { type: "short_answer" },
      hints: ["Thank", "you", "Thanks"],
      repair: "Say: Thank you!",
      modelSentence: "Thank you, Ms. Nova!",
      modelModify: "Say thank you!"
    }
  ],
  
  // Scaffolding configuration (Phase 1: Weeks 1-14)
  scaffolding: {
    phase: 1,
    coreTurns: 7,
    expansionTurns: 3,
    maxTurns: 10
  },
  
  novaPersonality: {
    traits: ["visual", "patient", "simple"],
    emoji: "📚"
  },
  
  successCriteria: {
    minTurns: 7,
    mustUseWords: ["desk", "chair", "board", "book"],
    grammarFocus: "present_simple_there_is",
    completionMessage: "Awesome! You can describe your classroom! 🎉"
  },
  
  hints: {
    level1: ["desk", "chair", "board"],
    level2: ["I have", "There is", "It is"],
    level3: ["I have a desk", "There are 4 windows"],
    level4: ["I have a desk. It is near the window.", "My classroom is big."]
  }
});
