/**
 * MISSION 2: What's in Your Backpack? - OBJECTIVE-DRIVEN
 * Same architecture as Mission 1, different topic
 */

export const mission2Objectives = {
  id: 2,
  week: 1,
  topic: "What's in Your Backpack?",
  
  // Constraints for AI
  constraints: {
    vocabulary: [
      "backpack", "book", "notebook", "pen", "pencil", "eraser",
      "have", "in", "my", "color", "is", "red", "blue", "green",
      "heavy", "light", "new", "old", "like", "yes", "no"
    ],
    grammar: [
      "I have...",
      "My backpack is...",
      "It is...",
      "I like...",
      "Yes/No answers"
    ],
    tone: "warm, encouraging, curious, friendly"
  },

  // Educational objectives (10 core + 1 termination)
  objectives: [
    {
      id: "has_backpack",
      goal: "Check if student has backpack",
      context: "Ask what they have in their backpack. The opening question asks about backpack contents."
    },
    {
      id: "backpack_color",
      goal: "Learn backpack color",
      context: "What color is their backpack? Show interest in the backpack itself."
    },
    {
      id: "whats_else_inside",
      goal: "Ask what ELSE is inside",
      context: "Ask about OTHER things in backpack. Use 'what else' or 'anything else' since you already asked what's inside."
    },
    {
      id: "has_books",
      goal: "Confirm they have books",
      context: "Ask if they have any books in their backpack. Show interest in reading materials."
    },
    {
      id: "books_count",
      goal: "Ask how many books",
      context: "Only if they said YES to books - ask how many. If they said NO books, skip this naturally and just acknowledge. Count together: one, two, three..."
    },
    {
      id: "has_notebook",
      goal: "Check for notebook specifically",
      context: "Do they have a notebook? Different from books - for writing."
    },
    {
      id: "has_pencils",
      goal: "Ask about writing tools",
      context: "What do they write with? Pencils, pens, crayons?"
    },
    {
      id: "backpack_weight",
      goal: "Ask if backpack is heavy",
      context: "Is their backpack heavy or light? Show caring concern."
    },
    {
      id: "like_backpack",
      goal: "Check feelings about backpack",
      context: "Do they like their backpack? Why or why not?"
    },
    {
      id: "backpack_new",
      goal: "Ask about backpack age",
      context: "Is their backpack new or old? New backpacks are exciting!"
    },
    {
      id: "goodbye",
      goal: "End Conversation",
      type: "termination",
      context: "Say goodbye. Tell them their backpack is great!"
    }
  ]
};
