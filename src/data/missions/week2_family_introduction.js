import { createMission } from './missionSchema';

/**
 * Week 2: Family Introduction
 * Focus: Introduce family members using "This is my..."
 * Grammar: Present Simple (This is, He/She is), Demonstratives
 * CEFR Level: A1 (Beginner)
 */
export const week2FamilyIntroduction = createMission({
  id: "W2_FAMILY_INTRO",
  weekId: 2,
  title: "Meet My Family",
  description: "Learn to introduce your family members using 'This is my...'",
  level: "easy",
  
  targetVocabulary: [
    { word: "family", mustUse: true, phonetic: "/ˈfæməli/", definition: "A group of people who live together and love each other" },
    { word: "mother", mustUse: true, phonetic: "/ˈmʌðər/", definition: "A female parent" },
    { word: "father", mustUse: true, phonetic: "/ˈfɑːðər/", definition: "A male parent" },
    { word: "brother", mustUse: false, phonetic: "/ˈbrʌðər/", definition: "A boy who has the same parents as you" },
    { word: "sister", mustUse: false, phonetic: "/ˈsɪstər/", definition: "A girl who has the same parents as you" },
    { word: "love", mustUse: false, phonetic: "/lʌv/", definition: "To care very much about someone" },
    { word: "together", mustUse: false, phonetic: "/təˈɡeðər/", definition: "With each other" }
  ],
  
  successCriteria: {
    minTurns: 6,
    mustUseWords: ["family", "mother", "father"],
    optionalBonus: ["brother", "sister", "love", "together"],
    vocabularyThreshold: 0.5
  },
  
  steps: [
    {
      stepId: 1,
      aiPrompt: "Hi! I'm Ms. Nova! 👋 Today we will talk about families! Do you have a family?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "have", "a", "family"],
      repair: "Say: Yes, I have a family",
      modelSentence: "Yes, I have a family.",
      modelModify: "Now you say it!"
    },
    {
      stepId: 2,
      aiPrompt: "Great! Tell me, who is in your family?",
      task: "Name at least one family member",
      expected: { type: "short_answer" },
      hints: ["My", "mother", "father", "brother", "sister"],
      repair: "Try: My mother and father are in my family",
      modelSentence: "My mother and father are in my family.",
      modelModify: "Say YOUR family members."
    },
    {
      stepId: 3,
      aiPrompt: "Nice! Now, tell me about your mother. What is her name?",
      task: "Tell me your mother's name",
      expected: { type: "short_answer" },
      hints: ["My", "mother", "is", "Her", "name"],
      repair: "Try: My mother is _____ OR Her name is _____",
      modelSentence: "My mother is Sarah.",
      modelModify: "Say YOUR mother's name."
    },
    {
      stepId: 4,
      aiPrompt: "{{motherName}}! That is a beautiful name! What about your father? What is his name?",
      task: "Tell me your father's name",
      expected: { type: "short_answer" },
      hints: ["My", "father", "is", "His", "name"],
      repair: "Try: My father is _____ OR His name is _____",
      modelSentence: "My father is Tom.",
      modelModify: "Say YOUR father's name."
    },
    {
      stepId: 5,
      aiPrompt: "{{fatherName}}! Good! Do you have brothers or sisters?",
      task: "Answer yes or no, and say who",
      expected: { type: "short_answer" },
      hints: ["Yes", "I", "have", "brother", "sister", "No"],
      repair: "Say: Yes, I have a brother OR No, I don't have brothers or sisters",
      modelSentence: "Yes, I have a brother and a sister.",
      modelModify: "Say about YOUR siblings."
    },
    {
      stepId: 6,
      aiPrompt: "Nice! Do you love your family?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "love", "my", "family"],
      repair: "Say: Yes, I love my family",
      modelSentence: "Yes, I love my family.",
      modelModify: "Tell me your feelings!"
    },
    {
      stepId: 7,
      aiPrompt: "That's wonderful! What do you do together with your family?",
      task: "Tell me one activity",
      expected: { type: "short_answer" },
      hints: ["We", "play", "eat", "talk", "together"],
      repair: "Try: We play together OR We eat together",
      modelSentence: "We play together.",
      modelModify: "Say what YOUR family does."
    },
    {
      stepId: 8,
      aiPrompt: "Fun! Who helps you at home?",
      task: "Name a family member who helps",
      expected: { type: "short_answer" },
      hints: ["My", "mother", "father", "helps", "me"],
      repair: "Try: My mother helps me OR My father helps me",
      modelSentence: "My mother helps me.",
      modelModify: "Say who helps YOU."
    },
    {
      stepId: 9,
      aiPrompt: "That's great! Your family sounds wonderful! Can you say: 'This is my family'?",
      task: "Repeat the sentence",
      expected: { type: "copy_model" },
      hints: ["This", "is", "my", "family"],
      repair: "Say: This is my family",
      modelSentence: "This is my family.",
      modelModify: "Say it loud and clear!"
    },
    {
      stepId: 10,
      aiPrompt: "Perfect! You did an amazing job today! Your family is lucky to have you! 👨‍👩‍👧‍👦",
      task: "Say goodbye",
      expected: { type: "short_answer" },
      hints: ["Goodbye", "See", "you", "Bye"],
      repair: "Say: Goodbye! OR See you!",
      modelSentence: "Goodbye, Ms. Nova!",
      modelModify: "Say goodbye to me!"
    }
  ],
  
  scaffolding: {
    phase: 1,
    coreTurns: 7,
    expansionTurns: 3,
    maxTurns: 10
  },
  
  novaPersonality: {
    traits: ["warm", "family-loving", "uses_emojis"],
    dadJokes: [
      "Why do families love photos? Because they're picture-perfect! 📸",
      "What did the mama tomato say to the baby tomato? Ketchup! 🍅",
      "Why don't families play hide and seek? Because good families always stick together! 👨‍👩‍👧"
    ],
    emoji: "👨‍👩‍👧‍👦"
  }
});

export default week2FamilyIntroduction;
