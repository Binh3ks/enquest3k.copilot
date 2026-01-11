import { createMission } from './missionSchema';

/**
 * Week 1: First Day at School
 * Focus: Introduce yourself, talk about school basics
 * Grammar: Present Simple only (I am, you are, he/she is)
 * CEFR Level: A1 (Beginner)
 */
export const week1FirstDay = createMission({
  id: "W1_FIRST_DAY",
  weekId: 1,
  title: "First Day at School",
  description: "Learn to introduce yourself and talk about your first day at school",
  level: "easy",
  
  targetVocabulary: [
    { word: "name", mustUse: true, phonetic: "/neɪm/", definition: "What you are called" },
    { word: "student", mustUse: true, phonetic: "/ˈstuːdənt/", definition: "A person who learns" },
    { word: "teacher", mustUse: true, phonetic: "/ˈtiːtʃər/", definition: "A person who teaches" },
    { word: "school", mustUse: true, phonetic: "/skuːl/", definition: "A place to learn" },
    { word: "age", mustUse: false, phonetic: "/eɪdʒ/", definition: "How old you are" },
    { word: "class", mustUse: false, phonetic: "/klæs/", definition: "A group of students" },
    { word: "friend", mustUse: false, phonetic: "/frend/", definition: "Someone you like" }
  ],
  
  successCriteria: {
    minTurns: 6,
    mustUseWords: ["name", "student", "teacher", "school"],
    optionalBonus: ["age", "class", "friend"],
    vocabularyThreshold: 0.5
  },
  
  steps: [
    {
      stepId: 1,
      aiPrompt: "Hey there! I'm Ms. Nova. Welcome to your first day! What is your name?",
      task: "Tell me your name",
      expected: { type: "short_answer" },
      hints: ["My", "name", "is"],
      repair: "Try saying: My name is _____",
      modelSentence: "My name is Alex.",
      modelModify: "Now say YOUR name instead of 'Alex'."
    },
    {
      stepId: 2,
      aiPrompt: "{{name}}! I like your name! How old are you?",
      task: "Tell me your age",
      expected: { type: "number" },
      hints: ["I", "am", "years", "old"],
      repair: "Say: I am ___ years old",
      modelSentence: "I am 9 years old.",
      modelModify: "Now say YOUR age."
    },
    {
      stepId: 3,
      aiPrompt: "{{age}} years old! Good! Who is your teacher at school?",
      task: "Tell me your teacher's name",
      expected: { type: "short_answer" },
      hints: ["My", "teacher", "is", "Mr", "Ms"],
      repair: "Try: My teacher is Mr./Ms. _____",
      modelSentence: "My teacher is Ms. Lee.",
      modelModify: "Now say YOUR teacher's name."
    },
    {
      stepId: 4,
      aiPrompt: "{{teacherName}} is your teacher! Good! What is your favorite subject?",
      task: "Tell me what you like to learn",
      expected: { type: "short_answer" },
      hints: ["My", "favorite", "subject", "is"],
      repair: "Say: My favorite subject is _____",
      modelSentence: "My favorite subject is English.",
      modelModify: "Now say YOUR favorite subject."
    },
    {
      stepId: 5,
      aiPrompt: "{{subject}}! That is cool! Do you have friends at school?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "have", "friends"],
      repair: "Answer: Yes, I have friends OR No, I don't have friends",
      modelSentence: "Yes, I have friends.",
      modelModify: "Say yes or no."
    },
    {
      stepId: 6,
      aiPrompt: "Good! What do you like at your school?",
      task: "Tell me one thing you like",
      expected: { type: "short_answer" },
      hints: ["I", "like", "the"],
      repair: "Try: I like the _____ at my school",
      modelSentence: "I like the playground.",
      modelModify: "Say what YOU like at your school."
    },
    // Expansion turns (3 additional)
    {
      stepId: 7,
      aiPrompt: "Nice! {{favoritePlace}}! Do you play there with friends?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "play", "with", "friends"],
      repair: "Say: Yes, I play with friends OR No, I don't play there",
      modelSentence: "Yes, I play with friends.",
      modelModify: "Answer about YOU."
    },
    {
      stepId: 8,
      aiPrompt: "Great! What games do you play at school?",
      task: "Name a game",
      expected: { type: "short_answer" },
      hints: ["I", "play", "tag", "hide", "seek"],
      repair: "Try: I play _____",
      modelSentence: "I play tag.",
      modelModify: "Say YOUR favorite game."
    },
    {
      stepId: 9,
      aiPrompt: "Fun! Do you like your school?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "like", "my", "school"],
      repair: "Say: Yes, I like my school OR No, I don't like my school",
      modelSentence: "Yes, I like my school.",
      modelModify: "Answer honestly!"
    },
    {
      stepId: 10,
      aiPrompt: "Wonderful! You did a great job today! See you next time! 👋",
      task: "Say goodbye",
      expected: { type: "short_answer" },
      hints: ["Goodbye", "See", "you", "Bye"],
      repair: "Say: Goodbye! OR See you!",
      modelSentence: "Goodbye, Ms. Nova!",
      modelModify: "Say goodbye to me!"
    }
  ],
  
  // Scaffolding configuration (Phase 1: Weeks 1-14)
  scaffolding: {
    phase: 1,
    coreTurns: 7,      // Core mission turns
    expansionTurns: 3, // Additional exploration turns
    maxTurns: 10       // Total maximum turns
  },
  
  novaPersonality: {
    traits: ["witty", "encouraging", "uses_emojis"],
    dadJokes: [
      "Why did the student eat their homework? Because the teacher said it was a piece of cake! 🍰",
      "What's a teacher's favorite nation? Expla-nation! 😄",
      "Why don't students trust stairs? They're always up to something! 🪜"
    ],
    emoji: "🎒"
  }
});

// Export as default for easy import
export default week1FirstDay;
