/**
 * WEEK 1 CONVERSATION STRUCTURE
 * Phase 1 (Week 1-14): 7 turns - Present Simple ONLY
 * Grammar: I am, you are, where is, my/your, this is
 */

export const week1Conversation = {
  weekNumber: 1,
  phase: 1,
  missionTitle: "First Day at School",
  storyContext: "A simple conversation about student's school life",
  
  // 7 CORE TURNS - Present Simple only (NO past tense!)
  // FIXED ORDER to match natural conversation flow
  contentTopics: [
    // Turn 1: Name (Opening)
    {
      turn: 1,
      label: "Name introduction",
      type: "factual",
      opener: "Hello! Welcome to your first day at school! I am Ms. Sarah, your teacher. What is your name?",
      expectedVocab: ["name", "I", "am"],
      hints: ["My", "name", "is"],
      grammar: "My name is ___ / I am ___",
      contextKey: "studentName"
    },
    
    // Turn 2: Age (natural follow-up to name)
    {
      turn: 2,
      label: "Age",
      type: "factual",
      expectedVocab: ["old", "years", "am"],
      hints: ["I", "am", "___", "years", "old"],
      grammar: "I am ___ years old",
      contextKey: "age"
    },
    
    // Turn 3: Teacher name (before asking about subjects)
    {
      turn: 3,
      label: "Teacher name",
      type: "factual",
      expectedVocab: ["teacher", "is", "name"],
      hints: ["My", "teacher", "is", "Mr", "Smith"],
      grammar: "My teacher is ___",
      contextKey: "teacherName"
    },
    
    // Turn 4: Favorite subject (after establishing context)
    {
      turn: 4,
      label: "Favorite subject",
      type: "personal",
      expectedVocab: ["subject", "like", "favorite", "is"],
      hints: ["My", "favorite", "subject", "is", "math"],
      grammar: "My favorite subject is ___ / I like ___",
      contextKey: "favoriteSubject"
    },
    
    // Turn 5: Friends (do you have - present)
    {
      turn: 5,
      label: "Friends",
      type: "personal",
      expectedVocab: ["friend", "have", "many"],
      hints: ["I", "have", "friends"],
      grammar: "I have ___ friends / I have many friends"
    },
    
    // Turn 6: Classroom location (where is)
    {
      turn: 6,
      label: "Classroom location",
      type: "factual",
      expectedVocab: ["classroom", "is", "where"],
      hints: ["My", "classroom", "is"],
      grammar: "My classroom is ___"
    },
    
    // Turn 7: What you like about school (present)
    {
      turn: 7,
      label: "What you like about school",
      type: "opinion",
      expectedVocab: ["like", "school", "favorite"],
      hints: ["I", "like", "my", "school"],
      grammar: "I like ___ / My favorite is ___"
    },
    
    // EXTENSION TURNS (8-10) for deeper conversation
    // Turn 8: Activities with friends
    {
      turn: 8,
      label: "Activities with friends",
      type: "personal",
      expectedVocab: ["play", "do", "with", "friends"],
      hints: ["We", "play", "games", "together"],
      grammar: "We ___ together / I ___ with my friends"
    },
    
    // Turn 9: Backpack contents
    {
      turn: 9,
      label: "Backpack items",
      type: "factual",
      expectedVocab: ["have", "backpack", "books", "pens"],
      hints: ["I", "have", "books", "and", "pens"],
      grammar: "I have ___ in my backpack"
    },
    
    // Turn 10: Learning goals
    {
      turn: 10,
      label: "Learning goals",
      type: "opinion",
      expectedVocab: ["want", "learn", "next"],
      hints: ["I", "want", "to", "learn"],
      grammar: "I want to learn ___"
    }
  ],
  
  // No extra extension topics - 10 turns is enough for Phase 1
  extensionTopics: []
};
