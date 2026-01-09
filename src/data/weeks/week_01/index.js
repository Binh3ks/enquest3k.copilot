import read from './read.js';
import vocab from './vocab.js';
import grammar from './grammar.js';
import ask_ai from './ask_ai.js';
import logic from './logic.js';
import dictation from './dictation.js';
import shadowing from './shadowing.js';
import writing from './writing.js';
import explore from './explore.js';
import word_power from './word_power.js';
import daily_watch from './daily_watch.js';
import word_match from './word_match.js';
import mindmap from './mindmap.js';

/**
 * OBJECTIVE-DRIVEN STORY MISSION SCHEMA
 * Defines WHAT to achieve (objectives), not HOW to ask (hardcoded questions)
 * Allows AI to generate natural variations while meeting learning goals
 */
export const storyMission = {
  id: "week1_mission",
  topic: "First Day at School",
  theme: "Self-Introduction & School Environment",
  constraints: {
    vocabulary: [
      "teacher", "student", "classroom", "friend", "name", "nice",
      "school", "desk", "book", "pencil", "happy", "age"
    ],
    grammar: [
      "I am...",
      "My name is...",
      "This is...",
      "Do you...?",
      "Are you...?",
      "Yes, I am.",
      "No, I am not."
    ],
    cefr_level: "A0",
    grammatical_constraints: "Present Simple only - no past, future, or modals",
    tone: "Warm, encouraging, supportive"
  },
  objectives: [
    {
      id: "obj_greeting",
      goal: "Greeting & Introduction",
      context: "Ms. Nova introduces herself. Student introduces themselves with their name.",
      required_info: ["student_name"],
      proficiency_level: "A0",
      teaching_strategy: "Model the introduction, use recast technique"
    },
    {
      id: "obj_age",
      goal: "Ask and Answer about Age",
      context: "Natural follow-up question after establishing names. Student shares their age.",
      required_info: ["student_age"],
      proficiency_level: "A0",
      teaching_strategy: "Use number scaffolding if needed"
    },
    {
      id: "obj_student_status",
      goal: "Confirm Student Status",
      context: "Establish that the student is indeed a student (expectation setting).",
      required_info: ["is_student"],
      proficiency_level: "A0",
      teaching_strategy: "Simple yes/no question with binary choice hints"
    },
    {
      id: "obj_school_feelings",
      goal: "Discuss Feelings About School",
      context: "Is the student happy? shy? excited? Build emotional connection.",
      required_info: ["sentiment_school"],
      proficiency_level: "A0",
      teaching_strategy: "Ask open-ended question, accept varied responses"
    },
    {
      id: "obj_grade",
      goal: "Ask about Grade/Year",
      context: "Find out what year/grade the student is in.",
      required_info: ["grade_level"],
      proficiency_level: "A0",
      teaching_strategy: "Use ordinal numbers or simple counting"
    },
    {
      id: "obj_friends",
      goal: "Discuss Friendships",
      context: "Does the student have friends? Names? Do they play together?",
      required_info: ["has_friends"],
      proficiency_level: "A0",
      teaching_strategy: "Yes/no first, then expand to names if willing"
    },
    {
      id: "obj_classroom_description",
      goal: "Describe Classroom",
      context: "What does the student see in their classroom? Colors, objects, feelings?",
      required_info: ["classroom_elements"],
      proficiency_level: "A0",
      teaching_strategy: "Use 'I see...' pattern with visual vocabulary"
    },
    {
      id: "obj_favorite_subject",
      goal: "Identify Favorite Subject",
      context: "What subject does the student enjoy most in school?",
      required_info: ["favorite_subject"],
      proficiency_level: "A0",
      teaching_strategy: "Offer multiple choice hints if needed"
    },
    {
      id: "obj_goodbye",
      goal: "End Conversation Politely",
      context: "Celebrate completion, praise effort, say goodbye warmly.",
      type: "termination",
      required_info: [],
      proficiency_level: "A0",
      teaching_strategy: "Use affirmation and positive reinforcement"
    }
  ],
  metadata: {
    duration_minutes: 10,
    minimum_turns: 10,
    maximum_turns: 15,
    ai_talker_ratio: 0.3,
    created_date: "2026-01-09",
    version: "2.0-objective-driven",
    migration_notes: "Converted from hardcoded question format to objective-driven schema"
  }
};

const weekData = {
  weekId: 1,
  isEasy: false,
  weekTitle_en: "The Young Scholar",
  weekTitle_vi: "Học Sinh Trẻ",
  grammar_focus: "Subject Pronouns & Verb to be",
  global_vocab: vocab.vocab,
  // ⚠️ MANDATORY: voiceConfig for unique voices per week
  // Week 1 Advanced: US voices only (scaffolding - simpler accent for beginners)
  voiceConfig: {
    narration: 'en-US-Neural2-D',    // US Male, clear for first week stories
    vocabulary: 'en-US-Neural2-F',   // US Female, friendly for vocab
    dictation: 'en-US-Neural2-F',    // US Female, neutral for dictation
    questions: 'en-US-Neural2-D',    // US Male for logic/ask_ai
    mindmap: 'en-US-Neural2-D'       // US Male for mindmap branches
  },
  stations: {
    read_explore: read,
    new_words: vocab,
    word_match: word_match,
    grammar: grammar,
    ask_ai: ask_ai,
    logic_lab: logic,
    dictation: dictation,
    shadowing: shadowing,
    video: writing,
    writing: writing,
    explore: explore,
    word_power: word_power,
    daily_watch: daily_watch,
    mindmap_speaking: mindmap
  },
  // Export story mission objectives separately for AI tutor
  storyMission: storyMission
};

export default weekData;
