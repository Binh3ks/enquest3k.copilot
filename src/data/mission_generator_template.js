/**
 * MISSION GENERATOR TEMPLATE
 * 
 * This template defines the logic for automatically generating 3 story missions
 * for any week based on vocabulary and grammar scope.
 * 
 * Use this pattern to mass-produce content for 156 weeks.
 */

/**
 * Mission Generation Logic
 * 
 * For each week, generate 3 missions following this pattern:
 * 
 * Mission 1: INTRODUCTION (10-15 turns)
 *   - Focus: First 2-3 vocabulary words
 *   - Theme: Meeting/greeting context
 *   - Grammar: Basic sentence patterns
 *   - Example: "First day at [place]", "Meeting new [people]"
 * 
 * Mission 2: INTERACTION (12-15 turns)
 *   - Focus: Next 3-4 vocabulary words
 *   - Theme: Activity/action context
 *   - Grammar: Expand on basic patterns
 *   - Example: "Doing [activity]", "Using [objects]"
 * 
 * Mission 3: INTEGRATION (15+ turns)
 *   - Focus: All vocabulary words from week
 *   - Theme: Real-world application
 *   - Grammar: Combine all patterns
 *   - Example: "Complete [task]", "Describe [experience]"
 */

/**
 * Mission Structure Template
 * 
 * Each mission MUST have these fields:
 */
export const MISSION_TEMPLATE = {
  mission_id: 1, // 1, 2, or 3
  
  title: "[Action/Context Title]",
  title_vi: "[Vietnamese Translation]",
  
  theme: "[1-2 word theme]", // e.g., "Self-introduction", "School belongings"
  
  // SHORT description shown to student (1 sentence)
  scenario: `[Brief mission description for student]`,
  
  // Context for AI (NOT shown to student) - guides conversation
  mission_context: `[Detailed context for AI behavior and conversation flow]`,
  
  // Vocabulary focus (subset of week vocabulary)
  target_vocab: ["word1", "word2", "word3"],
  
  // Grammar pattern to practice
  target_pattern: "[Grammar pattern from week]",
  
  // Topic boundaries (guide AI to stay on track)
  conversation_topics: [
    "[Topic 1]",
    "[Topic 2]",
    "[Topic 3]"
  ],
  
  // Example questions (NOT hardcoded in conversation, just examples for AI)
  example_questions: [
    "[Question using present simple]",
    "[Question using target vocab]",
    "[Question encouraging production]"
  ],
  
  minimum_turns: 10, // 10, 12, or 15 for missions 1, 2, 3
  
  success_criteria: [
    "[Criterion 1]",
    "[Criterion 2]",
    "[Criterion 3]"
  ]
};

/**
 * Week Data Requirements
 * 
 * To generate missions, each week MUST provide:
 * - target_vocab: Array of vocabulary objects with word, definition, example
 * - grammar_pattern: Main grammar structure to practice
 * - grammar_scope: Week number (for Grammar Guard validation)
 * - topic: Overall theme (used to generate mission contexts)
 */

/**
 * Example: Week 1 (School Basics)
 * 
 * Vocabulary: name, age, student, teacher, school, classroom, backpack, book, notebook
 * Grammar: "I am..." (identity)
 * Topic: Introduction & School
 * 
 * Generated Missions:
 * 1. First Day at School → Focus: name, age, student
 * 2. What's in Your Backpack? → Focus: backpack, book, notebook
 * 3. Meeting Your Teacher → Focus: teacher, school, classroom
 */

/**
 * Example: Week 5 (Family)
 * 
 * Vocabulary: mother, father, sister, brother, family, home, love, help, together
 * Grammar: "I have..." (possession)
 * Topic: Family & Home
 * 
 * Generated Missions:
 * 1. My Family Members → Focus: mother, father, sister, brother
 * 2. At Home with Family → Focus: home, together, help
 * 3. Family Activities → Focus: family, love, all vocabulary
 */

/**
 * Example: Week 10 (Food)
 * 
 * Vocabulary: food, eat, drink, hungry, thirsty, like, delicious, healthy, fruit
 * Grammar: "I like..." (preferences)
 * Topic: Food & Eating
 * 
 * Generated Missions:
 * 1. What Do You Like to Eat? → Focus: food, eat, like
 * 2. Healthy Eating → Focus: healthy, fruit, delicious
 * 3. Mealtime Conversation → Focus: hungry, thirsty, drink, all vocabulary
 */

/**
 * Theme Patterns by Category
 * 
 * Use these theme patterns to generate mission titles:
 */
export const THEME_PATTERNS = {
  introduction: [
    "First Day at [Place]",
    "Meeting [People]",
    "Welcome to [Place]",
    "Getting to Know [Topic]"
  ],
  
  objects: [
    "What's in Your [Container]?",
    "Using [Objects]",
    "My Favorite [Item]",
    "Exploring [Things]"
  ],
  
  activities: [
    "Let's [Action]!",
    "[Activity] Time",
    "I Like to [Action]",
    "Learning to [Action]"
  ],
  
  places: [
    "At the [Place]",
    "Visiting [Location]",
    "Around the [Place]",
    "My [Place]"
  ],
  
  people: [
    "Meeting Your [Person]",
    "Talking with [People]",
    "My [Person]",
    "[People] and Me"
  ],
  
  experiences: [
    "A Day in [Context]",
    "[Experience] Story",
    "My [Experience]",
    "Remember [Event]"
  ]
};

/**
 * Opening Line Patterns
 * 
 * Generate mission opening lines using these patterns:
 * IMPORTANT: Use ONLY present simple for Week 1-4
 */
export const OPENING_PATTERNS = {
  mission_1: [
    "Hello! I am Ms. Nova. What is your [identity]?",
    "Hi! My name is Ms. Nova. Tell me about yourself!",
    "Welcome! I am your teacher. What is your name?"
  ],
  
  mission_2: [
    "Hi again! I want to know about [topic]. What do you [action]?",
    "Great to see you! Tell me about your [object/topic].",
    "Welcome back! Show me your [object]. What do you have?"
  ],
  
  mission_3: [
    "Hello again! Let's talk about [complete topic]!",
    "Welcome back! Tell me everything about [topic]!",
    "Hi! Now I want to know more about your [topic]."
  ]
};

/**
 * Conversation Topic Generator
 * 
 * Generate conversation_topics from vocabulary:
 * - Mission 1: Use first 2-3 vocabulary words
 * - Mission 2: Use next 3-4 vocabulary words
 * - Mission 3: Use all vocabulary words
 * 
 * Convert each word into a topic phrase:
 * - "name" → "Student's name"
 * - "backpack" → "What's in the backpack"
 * - "teacher" → "The teacher"
 * - "like" → "Things student likes"
 */

/**
 * Example Question Generator
 * 
 * Generate example_questions from vocabulary and grammar pattern:
 * - Use grammar pattern: "I am..." → "What are you?" / "Are you a [noun]?"
 * - Use grammar pattern: "I have..." → "What do you have?" / "Do you have a [noun]?"
 * - Use grammar pattern: "I like..." → "What do you like?" / "Do you like [noun]?"
 * 
 * ALWAYS respect grammar scope (Week 1-4 = present simple only)
 */

/**
 * Success Criteria Generator
 * 
 * Generate success_criteria from target vocabulary and grammar pattern:
 * - Criterion 1: Uses [grammar pattern] correctly
 * - Criterion 2: Uses [number] target vocabulary words
 * - Criterion 3: Maintains conversation for [minimum_turns] turns
 */

/**
 * MASS PRODUCTION WORKFLOW
 * 
 * Step 1: Prepare week data (vocabulary, grammar, topic)
 * Step 2: Split vocabulary into 3 groups (2-3, 3-4, all)
 * Step 3: Generate mission titles using THEME_PATTERNS
 * Step 4: Generate opening lines using OPENING_PATTERNS
 * Step 5: Generate conversation topics from vocabulary
 * Step 6: Generate example questions from grammar + vocabulary
 * Step 7: Generate success criteria from target_vocab + target_pattern
 * Step 8: Export week data file
 * 
 * Repeat for 156 weeks.
 */

/**
 * GRAMMAR GUARDRAIL COMPLIANCE
 * 
 * CRITICAL: All opening lines and example questions MUST respect grammar scope:
 * - Week 1-4: Present simple ONLY (am/is/are, do/does, have/has)
 * - Week 5-8: Add present continuous (am/is/are + -ing)
 * - Week 9+: Gradually introduce past simple, future, etc.
 * 
 * Grammar Guard will block any content using unauthorized tenses.
 */

export default {
  MISSION_TEMPLATE,
  THEME_PATTERNS,
  OPENING_PATTERNS
};
