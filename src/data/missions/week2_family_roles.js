import { createMission } from './missionSchema';

/**
 * Week 2: Family Roles
 * Focus: Describe what each family member does (roles and responsibilities)
 * Grammar: Present Simple (He/She is..., He/She helps...)
 * CEFR Level: A1 (Beginner)
 */
export const week2FamilyRoles = createMission({
  id: "W2_FAMILY_ROLES",
  weekId: 2,
  title: "Family Team",
  description: "Learn to talk about what each family member does and their role in the family",
  level: "easy",
  
  targetVocabulary: [
    { word: "team", mustUse: true, phonetic: "/tiːm/", definition: "A group of people who work together" },
    { word: "leader", mustUse: true, phonetic: "/ˈliːdər/", definition: "A person who guides and helps others" },
    { word: "helper", mustUse: true, phonetic: "/ˈhelpər/", definition: "A person who helps others" },
    { word: "mother", mustUse: false, phonetic: "/ˈmʌðər/", definition: "A female parent" },
    { word: "father", mustUse: false, phonetic: "/ˈfɑːðər/", definition: "A male parent" },
    { word: "family", mustUse: false, phonetic: "/ˈfæməli/", definition: "A group of people who live together" },
    { word: "together", mustUse: false, phonetic: "/təˈɡeðər/", definition: "With each other" }
  ],
  
  successCriteria: {
    minTurns: 6,
    mustUseWords: ["team", "leader", "helper"],
    optionalBonus: ["mother", "father", "together"],
    vocabularyThreshold: 0.5
  },
  
  steps: [
    {
      stepId: 1,
      aiPrompt: "Hello again! 👋 Today we talk about family as a team! Is your family a team?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "my", "family", "is", "team"],
      repair: "Say: Yes, my family is a team",
      modelSentence: "Yes, my family is a team.",
      modelModify: "Now you say it!"
    },
    {
      stepId: 2,
      aiPrompt: "Great! Every team has a leader. Who is the leader in your family?",
      task: "Name who is the leader",
      expected: { type: "short_answer" },
      hints: ["My", "father", "mother", "is", "leader"],
      repair: "Try: My father is the leader OR My mother is the leader",
      modelSentence: "My father is the leader.",
      modelModify: "Say who is YOUR family leader."
    },
    {
      stepId: 3,
      aiPrompt: "{{leader}}! Good! What does your {{leader}} do as the leader?",
      task: "Tell me what the leader does",
      expected: { type: "short_answer" },
      hints: ["He", "She", "helps", "guides", "cooks", "works"],
      repair: "Try: He helps us OR She guides us",
      modelSentence: "He helps us every day.",
      modelModify: "Say what YOUR leader does."
    },
    {
      stepId: 4,
      aiPrompt: "That's important! Who is a good helper in your family?",
      task: "Name a family helper",
      expected: { type: "short_answer" },
      hints: ["My", "mother", "father", "brother", "sister", "helper"],
      repair: "Try: My mother is a good helper OR My brother is a helper",
      modelSentence: "My mother is a good helper.",
      modelModify: "Say YOUR family helper."
    },
    {
      stepId: 5,
      aiPrompt: "Nice! What does your {{helper}} do to help?",
      task: "Tell me how they help",
      expected: { type: "short_answer" },
      hints: ["He", "She", "cooks", "cleans", "helps", "me"],
      repair: "Try: She cooks for us OR He helps me with homework",
      modelSentence: "She cooks for us.",
      modelModify: "Say how YOUR helper helps."
    },
    {
      stepId: 6,
      aiPrompt: "Wonderful! Are you a helper too?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "I", "am", "helper", "too"],
      repair: "Say: Yes, I am a helper too OR No, I am not a helper",
      modelSentence: "Yes, I am a helper too.",
      modelModify: "Tell me about YOU!"
    },
    {
      stepId: 7,
      aiPrompt: "That's great! What do you do to help your family?",
      task: "Tell me one thing you do",
      expected: { type: "short_answer" },
      hints: ["I", "clean", "help", "cook", "play"],
      repair: "Try: I clean my room OR I help my mother",
      modelSentence: "I clean my room.",
      modelModify: "Say what YOU do to help."
    },
    {
      stepId: 8,
      aiPrompt: "You are such a good helper! Does your family work together?",
      task: "Answer yes or no",
      expected: { type: "yes_no" },
      hints: ["Yes", "we", "work", "together"],
      repair: "Say: Yes, we work together",
      modelSentence: "Yes, we work together.",
      modelModify: "Tell me about your family teamwork!"
    },
    {
      stepId: 9,
      aiPrompt: "Perfect! Can you say: 'We are a team'?",
      task: "Repeat the sentence",
      expected: { type: "copy_model" },
      hints: ["We", "are", "a", "team"],
      repair: "Say: We are a team",
      modelSentence: "We are a team.",
      modelModify: "Say it with pride!"
    },
    {
      stepId: 10,
      aiPrompt: "Excellent work! Your family team is amazing! Keep being a great helper! 💪",
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
    traits: ["encouraging", "team-focused", "uses_emojis"],
    dadJokes: [
      "Why did the family go to the bank together? To save their family bonds! 💰",
      "What do you call a group that works well together? A dream team! 💭",
      "Why don't families get lost? Because they always stick together! 🧭"
    ],
    emoji: "💪"
  }
});

export default week2FamilyRoles;
