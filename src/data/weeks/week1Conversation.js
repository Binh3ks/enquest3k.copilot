/**
 * WEEK 1 CONVERSATION STRUCTURE
 * "First Day at School" - 15-turn conversation
 * 
 * Based on: AITutor_Story_New Strategy_Artifact.txt
 * Structure: 10 content topics + 5 extension topics
 */

export const week1Conversation = {
  weekNumber: 1,
  phase: 1,
  missionTitle: "First Day at School",
  storyContext: "Alex goes to a new school for the first time",
  
  easyModeContext: "The Superhero Me",
  advancedModeContext: "The Junior Scholar",
  
  // 10 CONTENT TOPICS (Turn 1-10)
  contentTopics: [
    // Turn 1: Name introduction
    {
      turn: 1,
      label: "Name introduction",
      type: "factual",
      easyQ: "Hi! I am your teacher. What is your name?",
      advQ: "Hello! I'm Ms. Sarah. Could you tell me your name?",
      expectedVocab: ["name"],
      expectedGrammar: "My name is ___",
      hints: {
        easy: ["My", "name", "is"],
        advanced: ["My name is ___"]
      }
    },
    
    // Turn 2: Favorite subject
    {
      turn: 2,
      label: "Favorite subject",
      type: "personal",
      easyQ: "What subject do you like?",
      advQ: "What is your favorite subject in school?",
      expectedVocab: ["subject", "like", "favorite"],
      expectedGrammar: "I like ___ / My favorite subject is ___",
      hints: {
        easy: ["I", "like", "math"],
        advanced: ["My favorite subject is ___"]
      }
    },
    
    // Turn 3: Why that subject
    {
      turn: 3,
      label: "Why that subject is interesting",
      type: "opinion",
      easyQ: "Why do you like [subject]?",
      advQ: "What makes [subject] interesting to you?",
      expectedVocab: ["interesting", "because", "fun"],
      expectedGrammar: "Because it is ___ / I like it because ___",
      hints: {
        easy: ["Because", "it", "is", "fun"],
        advanced: ["I like it because ___"]
      }
    },
    
    // Turn 4: Teacher/classroom
    {
      turn: 4,
      label: "Teacher or classroom details",
      type: "factual",
      easyQ: "Who is your teacher?",
      advQ: "Can you tell me about your teacher or classroom?",
      expectedVocab: ["teacher", "classroom", "nice"],
      expectedGrammar: "My teacher is ___ / The classroom is ___",
      hints: {
        easy: ["My", "teacher", "is"],
        advanced: ["My teacher is ___"]
      }
    },
    
    // Turn 5: Feelings about first day
    {
      turn: 5,
      label: "Feelings about first day",
      type: "personal",
      easyQ: "How do you feel today?",
      advQ: "How do you feel about your first day at this school?",
      expectedVocab: ["feel", "happy", "nervous", "excited"],
      expectedGrammar: "I feel ___ / I am ___",
      hints: {
        easy: ["I", "feel", "happy"],
        advanced: ["I feel ___ about ___"]
      }
    },
    
    // Turn 6: Making new friends
    {
      turn: 6,
      label: "Making new friends",
      type: "personal",
      easyQ: "Did you meet new friends?",
      advQ: "Have you made any new friends today?",
      expectedVocab: ["friend", "meet", "new"],
      expectedGrammar: "Yes, I met ___ / I talked to ___",
      hints: {
        easy: ["Yes", "I", "met"],
        advanced: ["I made friends with ___"]
      }
    },
    
    // Turn 7: School supplies
    {
      turn: 7,
      label: "School supplies",
      type: "factual",
      easyQ: "What is in your bag?",
      advQ: "What did you bring in your backpack?",
      expectedVocab: ["book", "pen", "bag", "pencil"],
      expectedGrammar: "I have ___ / I brought ___",
      hints: {
        easy: ["I", "have", "books"],
        advanced: ["I brought ___ and ___"]
      }
    },
    
    // Turn 8: Lunch/break time
    {
      turn: 8,
      label: "Lunch or break time",
      type: "personal",
      easyQ: "What did you eat for lunch?",
      advQ: "What did you do during lunch time?",
      expectedVocab: ["lunch", "eat", "play"],
      expectedGrammar: "I ate ___ / I played ___",
      hints: {
        easy: ["I", "ate", "food"],
        advanced: ["During lunch, I ___"]
      }
    },
    
    // Turn 9: Favorite part of the day
    {
      turn: 9,
      label: "Favorite part of the day",
      type: "opinion",
      easyQ: "What did you like today?",
      advQ: "What was your favorite part of today?",
      expectedVocab: ["favorite", "like", "best"],
      expectedGrammar: "I liked ___ / My favorite was ___",
      hints: {
        easy: ["I", "liked", "lunch"],
        advanced: ["My favorite part was ___"]
      }
    },
    
    // Turn 10: What learned today
    {
      turn: 10,
      label: "What learned today",
      type: "factual",
      easyQ: "What did you learn today?",
      advQ: "What new thing did you learn at school today?",
      expectedVocab: ["learn", "new", "study"],
      expectedGrammar: "I learned ___ / We studied ___",
      hints: {
        easy: ["I", "learned", "math"],
        advanced: ["We learned about ___"]
      }
    }
  ],
  
  // 5 EXTENSION TOPICS (Turn 11-15)
  extensionTopics: [
    // Turn 11: Own school experiences
    {
      turn: 11,
      label: "Own school experiences",
      type: "personal",
      easyQ: "Do you like your school?",
      advQ: "How does this school compare to your previous school?",
      expectedVocab: ["school", "like", "different"],
      hints: {
        easy: ["Yes", "I", "like"],
        advanced: ["This school is ___"]
      }
    },
    
    // Turn 12: Compare schools
    {
      turn: 12,
      label: "Compare schools",
      type: "comparison",
      easyQ: "Is your school big or small?",
      advQ: "What differences do you notice between schools?",
      expectedVocab: ["big", "small", "different"],
      hints: {
        easy: ["It", "is", "big"],
        advanced: ["The difference is ___"]
      }
    },
    
    // Turn 13: Future education goals
    {
      turn: 13,
      label: "Future education goals",
      type: "prediction",
      easyQ: "What do you want to learn?",
      advQ: "What subjects would you like to study this year?",
      expectedVocab: ["want", "study", "learn"],
      hints: {
        easy: ["I", "want", "to", "learn"],
        advanced: ["I would like to study ___"]
      }
    },
    
    // Turn 14: Favorite teacher memory
    {
      turn: 14,
      label: "Favorite teacher memory",
      type: "personal",
      easyQ: "Do you have a favorite teacher?",
      advQ: "Can you share a memory about a teacher you liked?",
      expectedVocab: ["teacher", "remember", "favorite"],
      hints: {
        easy: ["My", "teacher", "is"],
        advanced: ["I remember when ___"]
      }
    },
    
    // Turn 15: Closing
    {
      turn: 15,
      label: "Closing",
      type: "closing",
      easyQ: "Thank you for sharing!",
      advQ: "Thank you for this wonderful conversation!",
      expectedVocab: [],
      hints: {
        easy: ["Thank", "you"],
        advanced: ["Thank you"]
      }
    }
  ],
  
  // CLOSING SUMMARY
  closing: {
    summary: [
      "your first day at school",
      "your favorite subject",
      "making new friends",
      "what you learned"
    ],
    vocabHighlight: ["name", "subject", "friend", "learn"],
    nextWeekTeaser: "Next time, we'll talk about your family!"
  }
};
