/**
 * AI Tutor Response Schemas
 * JSON schemas for structured AI responses
 * 
 * @module tutorSchemas
 * @version 2.0.0 - Added QuizGame schema for Nova Arcade
 */

/**
 * Story Mission Response Schema
 */
export const storyResponseSchema = {
  type: "object",
  properties: {
    ack: { type: "string", description: "Acknowledgment of student's input" },
    recast: { type: "string", description: "Expanded/corrected version of student's sentence" },
    bridge: { type: "string", description: "Transition to next topic" },
    question: { type: "string", description: "Question to continue story" },
    hints: { 
      type: "array", 
      items: { type: "string" },
      description: "Word hints for answer (max 4-5 words)"
    }
  },
  required: ["ack", "question", "hints"]
};

/**
 * Free Talk Response Schema
 */
export const freeTalkResponseSchema = {
  type: "object",
  properties: {
    ack: { type: "string" },
    recast: { type: "string" },
    bridge: { type: "string" },
    question: { type: "string" },
    hints: { type: "array", items: { type: "string" } }
  },
  required: ["ack", "question", "hints"]
};

/**
 * Quiz Game Response Schema - Nova Arcade
 * Supports 4 game types:
 * 1. emoji_detective - Emoji-based vocab puzzles
 * 2. broken_robot - Grammar correction challenges
 * 3. sentence_builder - Drag-and-drop sentence construction
 * 4. true_false - Quick comprehension challenges
 */
export const quizGameSchema = {
  type: "object",
  properties: {
    game_type: { 
      type: "string", 
      enum: ["emoji_detective", "broken_robot", "sentence_builder", "true_false"],
      description: "Type of mini-game to play"
    },
    intro_text: { 
      type: "string", 
      description: "Short intro from Ms. Nova (max 2 sentences, Vietnamese OK)"
    },
    rounds: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: {
        type: "object",
        properties: {
          question: { 
            type: "string", 
            description: "The challenge content (emoji string, wrong sentence, scrambled words, or statement)" 
          },
          correct_answer: { 
            type: "string",
            description: "The correct answer (lowercase for vocab, exact sentence for grammar)"
          },
          options: { 
            type: "array", 
            items: { type: "string" },
            description: "Multiple choice options (for vocab/true-false games)"
          },
          explanation: { 
            type: "string", 
            description: "Brief explanation in Vietnamese (1 sentence)" 
          },
          hint: {
            type: "string",
            description: "Optional hint for harder questions (Vietnamese OK)"
          }
        },
        required: ["question", "correct_answer", "explanation"]
      }
    }
  },
  required: ["game_type", "intro_text", "rounds"]
};

/**
 * Pronunciation Response Schema
 */
export const pronunciationResponseSchema = {
  type: "object",
  properties: {
    word: { type: "string" },
    phonetic: { type: "string" },
    audio_url: { type: "string" },
    tips: { type: "array", items: { type: "string" } }
  }
};

/**
 * Debate Response Schema
 */
export const debateResponseSchema = {
  type: "object",
  properties: {
    position: { type: "string", enum: ["agree", "disagree", "neutral"] },
    argument: { type: "string" },
    evidence: { type: "string" },
    counterpoint: { type: "string" },
    question: { type: "string" }
  }
};
