import { createMission } from './missionSchema';

/**
 * Week 1: School Friends
 * Focus: Talk about friends and social interaction
 * Grammar: Present Simple (I/we/they)
 * CEFR Level: A1 (Beginner)
 */
export const week1SchoolFriends = createMission({
  id: "W1_SCHOOL_FRIENDS",
  weekId: 1,
  title: "School Friends",
  description: "Learn to talk about your friends at school",
  level: "normal",
  
  targetVocabulary: [
    { word: "friend", mustUse: true, phonetic: "/frend/", definition: "A person you like" },
    { word: "classmate", mustUse: true, phonetic: "/ˈklæsmeɪt/", definition: "A friend in your class" },
    { word: "play", mustUse: true, phonetic: "/pleɪ/", definition: "Have fun" },
    { word: "talk", mustUse: false, phonetic: "/tɔːk/", definition: "Speak to someone" },
    { word: "like", mustUse: true, phonetic: "/laɪk/", definition: "Think something is good" },
    { word: "fun", mustUse: false, phonetic: "/fʌn/", definition: "Something enjoyable" },
  ],
  
  grammarRules: [
    "Present Simple (I play, we play, they play)",
    "NO past tense",
    "NO future tense"
  ],
  
  novaPersonality: {
    emoji: "👫",
    traits: ["warm", "patient", "simple"]
  },
  
  steps: [
    {
      stepId: 1,
      aiPrompt: "Hi! I'm Ms. Nova. Let's talk about friends! Do you have friends at school?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "have", "friends"],
      repair: "Say: Yes, I have friends OR No, I don't have friends",
      modelSentence: "Yes, I have friends.",
      modelModify: "Answer about YOU."
    },
    {
      stepId: 2,
      aiPrompt: "Good! What is your friend's name?",
      task: "Tell me one friend's name",
      expected: { type: "short_answer" },
      hints: ["My", "friend", "is"],
      repair: "Try: My friend is _____",
      modelSentence: "My friend is Linh.",
      modelModify: "Say YOUR friend's name."
    },
    {
      stepId: 3,
      aiPrompt: "{{friendName}}! Nice! What do you and {{friendName}} do at school?",
      task: "Tell me an activity",
      expected: { type: "short_answer" },
      hints: ["We", "play", "talk"],
      repair: "Say: We play OR We talk",
      modelSentence: "We play together.",
      modelModify: "Say what YOU and your friend do."
    },
    {
      stepId: 4,
      aiPrompt: "Fun! Do you like to {{activity}}?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "like"],
      repair: "Answer: Yes, I like it OR No, I don't like it",
      modelSentence: "Yes, I like it.",
      modelModify: "Answer about YOU."
    },
    {
      stepId: 5,
      aiPrompt: "Great! How many friends do you have at school?",
      task: "Tell me a number",
      expected: { type: "number" },
      hints: ["I", "have", "friends"],
      repair: "Say: I have ___ friends",
      modelSentence: "I have 3 friends.",
      modelModify: "Count YOUR friends."
    },
    {
      stepId: 6,
      aiPrompt: "Wonderful! Are your friends nice?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "they", "are", "nice"],
      repair: "Say: Yes, they are nice OR No, they are not nice",
      modelSentence: "Yes, they are nice.",
      modelModify: "Answer about YOUR friends."
    },
    // Expansion turns (3 additional)
    {
      stepId: 7,
      aiPrompt: "Great! What do you talk about with your friends?",
      task: "Name a topic",
      expected: { type: "short_answer" },
      hints: ["We", "talk", "about", "games", "school"],
      repair: "Say: We talk about _____",
      modelSentence: "We talk about games.",
      modelModify: "Say what YOU talk about."
    },
    {
      stepId: 8,
      aiPrompt: "Cool! Do your friends help you at school?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "they", "help", "me"],
      repair: "Say: Yes, they help me OR No, they don't help me",
      modelSentence: "Yes, they help me.",
      modelModify: "Answer honestly."
    },
    {
      stepId: 9,
      aiPrompt: "Awesome! Do you like your friends?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "like", "my", "friends"],
      repair: "Say: Yes, I like my friends",
      modelSentence: "Yes, I like my friends.",
      modelModify: "Answer about YOUR feelings."
    },
    {
      stepId: 10,
      aiPrompt: "Perfect! Friends are very important! You did great today! 👏",
      task: "Say goodbye",
      expected: { type: "short_answer" },
      hints: ["Goodbye", "Bye", "See", "you"],
      repair: "Say: Goodbye!",
      modelSentence: "Goodbye, Ms. Nova!",
      modelModify: "Say goodbye!"
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
    traits: ["warm", "patient", "simple"],
    emoji: "👫"
  },
  
  successCriteria: {
    minTurns: 7,
    mustUseWords: ["friend", "classmate", "play", "like"],
    grammarFocus: "present_simple_we_they",
    completionMessage: "Fantastic! You can talk about your friends! 👏"
  },
  
  hints: {
    level1: ["friend", "play", "talk"],
    level2: ["My friend is", "We play", "I have"],
    level3: ["My friend is Linh", "We play together", "I have 3 friends"],
    level4: ["My friend is Linh. We play together.", "I have 3 friends. They are nice."]
  }
});
