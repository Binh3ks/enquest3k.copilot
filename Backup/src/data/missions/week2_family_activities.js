import { createMission } from './missionSchema';

/**
 * Week 2: Family Activities
 * Focus: Talk about activities families do together
 * Grammar: Present Simple (We play, We eat), Present Continuous introduction
 * CEFR Level: A1 (Beginner)
 */
export const week2FamilyActivities = createMission({
  id: "W2_FAMILY_ACTIVITIES",
  weekId: 2,
  title: "Family Time",
  description: "Learn to talk about fun activities you do with your family",
  level: "easy",
  
  targetVocabulary: [
    { word: "together", mustUse: true, phonetic: "/təˈɡeðər/", definition: "With each other" },
    { word: "love", mustUse: true, phonetic: "/lʌv/", definition: "To care very much about someone" },
    { word: "family", mustUse: true, phonetic: "/ˈfæməli/", definition: "A group of people who live together" },
    { word: "mother", mustUse: false, phonetic: "/ˈmʌðər/", definition: "A female parent" },
    { word: "father", mustUse: false, phonetic: "/ˈfɑːðər/", definition: "A male parent" },
    { word: "brother", mustUse: false, phonetic: "/ˈbrʌðər/", definition: "A boy who has the same parents as you" },
    { word: "sister", mustUse: false, phonetic: "/ˈsɪstər/", definition: "A girl who has the same parents as you" }
  ],
  
  successCriteria: {
    minTurns: 6,
    mustUseWords: ["together", "love", "family"],
    optionalBonus: ["mother", "father", "brother", "sister"],
    vocabularyThreshold: 0.5
  },
  
  steps: [
    {
      stepId: 1,
      aiPrompt: "Hi there! 🌟 Today we talk about family time! What do you do with your family?",
      task: "Name one activity",
      expected: { type: "short_answer" },
      hints: ["We", "play", "eat", "talk", "watch", "together"],
      repair: "Try: We play together OR We eat together",
      modelSentence: "We play together.",
      modelModify: "Say what YOUR family does!"
    },
    {
      stepId: 2,
      aiPrompt: "That sounds fun! Do you eat together with your family?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "we", "eat", "together"],
      repair: "Say: Yes, we eat together OR No, we don't eat together",
      modelSentence: "Yes, we eat together.",
      modelModify: "Tell me about YOUR family meals!"
    },
    {
      stepId: 3,
      aiPrompt: "Good! What is your favorite food to eat with your family?",
      task: "Name a food",
      expected: { type: "short_answer" },
      hints: ["I", "like", "rice", "bread", "chicken", "vegetables"],
      repair: "Try: I like rice OR I like chicken",
      modelSentence: "I like rice.",
      modelModify: "Say YOUR favorite food!"
    },
    {
      stepId: 4,
      aiPrompt: "Yummy! {{favoriteFood}}! Do you play games with your family?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "we", "play", "games"],
      repair: "Say: Yes, we play games OR No, we don't play games",
      modelSentence: "Yes, we play games.",
      modelModify: "Tell me about YOUR family games!"
    },
    {
      stepId: 5,
      aiPrompt: "Fun! What games do you play together?",
      task: "Name a game or activity",
      expected: { type: "short_answer" },
      hints: ["We", "play", "cards", "tag", "hide", "seek"],
      repair: "Try: We play cards OR We play tag",
      modelSentence: "We play cards.",
      modelModify: "Say what YOUR family plays!"
    },
    {
      stepId: 6,
      aiPrompt: "That's wonderful! Who do you play with most often?",
      task: "Name a family member",
      expected: { type: "short_answer" },
      hints: ["I", "play", "with", "my", "mother", "father", "brother", "sister"],
      repair: "Try: I play with my brother OR I play with my mother",
      modelSentence: "I play with my brother.",
      modelModify: "Say who YOU play with!"
    },
    {
      stepId: 7,
      aiPrompt: "Nice! Does your family watch TV together?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "we", "watch", "TV", "together"],
      repair: "Say: Yes, we watch TV together OR No, we don't watch TV",
      modelSentence: "Yes, we watch TV together.",
      modelModify: "Tell me about YOUR family TV time!"
    },
    {
      stepId: 8,
      aiPrompt: "Cool! Do you help your family at home?",
      task: "Answer yes or no and say how",
      expected: { type: "short_answer" },
      hints: ["Yes", "I", "help", "clean", "cook"],
      repair: "Try: Yes, I help clean OR Yes, I help cook",
      modelSentence: "Yes, I help clean.",
      modelModify: "Say how YOU help!"
    },
    {
      stepId: 9,
      aiPrompt: "You're such a great family member! Can you say: 'I love my family'?",
      task: "Repeat the sentence",
      expected: { type: "copy_model" },
      hints: ["I", "love", "my", "family"],
      repair: "Say: I love my family",
      modelSentence: "I love my family.",
      modelModify: "Say it from your heart!"
    },
    {
      stepId: 10,
      aiPrompt: "Beautiful! Family time is the best time! You did amazing work today! 💝",
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
    traits: ["warm", "playful", "uses_emojis"],
    dadJokes: [
      "Why do families love board games? Because they're never bored together! 🎲",
      "What did the dinner plate say to the cup? Dinner is on me! 🍽️",
      "Why did the family bring a ladder to dinner? They heard the food was on another level! 🪜"
    ],
    emoji: "💝"
  }
});

export default week2FamilyActivities;
