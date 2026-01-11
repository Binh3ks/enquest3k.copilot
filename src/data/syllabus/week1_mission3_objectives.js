/**
 * MISSION 3: Meeting Your Teacher - OBJECTIVE-DRIVEN
 * Same architecture as Mission 1, different topic
 */

export const mission3Objectives = {
  id: 3,
  week: 1,
  topic: "Meeting Your Teacher",
  
  // Constraints for AI
  constraints: {
    vocabulary: [
      "teacher", "school", "classroom", "student", "friend",
      "nice", "kind", "funny", "big", "small", "like", "love",
      "have", "is", "am", "my", "yes", "no", "name"
    ],
    grammar: [
      "My teacher is...",
      "I like...",
      "My school is...",
      "I have...",
      "Yes/No answers"
    ],
    tone: "warm, encouraging, interested, friendly"
  },

  // Educational objectives (10 core + 1 termination)
  objectives: [
    {
      id: "teacher_nice",
      goal: "Check if teacher is nice",
      context: "Is their teacher nice? Teachers are important!"
    },
    {
      id: "teacher_name",
      goal: "Learn teacher's name",
      context: "What is their teacher's name? Show interest."
    },
    {
      id: "like_teacher",
      goal: "Check if they like teacher",
      context: "Do they like their teacher? Why?"
    },
    {
      id: "teacher_funny",
      goal: "Ask if teacher is funny",
      context: "Is their teacher funny? Funny teachers make learning fun!"
    },
    {
      id: "school_size",
      goal: "Ask about school size",
      context: "Is their school big or small? Show curiosity."
    },
    {
      id: "like_school",
      goal: "Check school feelings",
      context: "Do they like their school? Why?"
    },
    {
      id: "classroom_nice",
      goal: "Ask about classroom",
      context: "Is their classroom nice? What's it like?"
    },
    {
      id: "classmates",
      goal: "Ask about classmates/friends",
      context: "Do they have friends at school? Friends are important!"
    },
    {
      id: "favorite_subject",
      goal: "Ask favorite subject",
      context: "What do they like to learn? Math? Reading?"
    },
    {
      id: "school_day",
      goal: "Ask about typical school day",
      context: "What do they do at school? Play? Learn?"
    },
    {
      id: "goodbye",
      goal: "End Conversation",
      type: "termination",
      context: "Say goodbye. Tell them their teacher sounds wonderful!"
    }
  ]
};
