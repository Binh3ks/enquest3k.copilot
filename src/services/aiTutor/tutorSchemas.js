/**
 * STRICT JSON SCHEMAS FOR AI RESPONSES
 * AI must return data in these formats - no free-form text
 */

/**
 * Chat response schema
 */
export const ChatResponseSchema = {
  type: 'object',
  required: ['response', 'follow_up'],
  properties: {
    response: {
      type: 'string',
      description: 'AI response (1-2 sentences max)'
    },
    follow_up: {
      type: 'string',
      description: 'One question to continue conversation'
    },
    scaffold: {
      type: 'object',
      properties: {
        level: { type: 'number', enum: [1, 2, 3, 4] },
        hints: { type: 'array', items: { type: 'string' } },
        starter: { type: 'string' },
        model: { type: 'string' }
      }
    }
  }
};

/**
 * Story Mission response schema
 */
export const StoryMissionSchema = {
  type: 'object',
  required: ['story_beat', 'task', 'required_vocab'],
  properties: {
    story_beat: {
      type: 'string',
      description: 'ONE short sentence continuing the story (3-5 words)'
    },
    task: {
      type: 'string',
      description: 'What student must do next (specific action)'
    },
    required_vocab: {
      type: 'array',
      items: { type: 'string' },
      description: 'Words student MUST use in their response'
    },
    scaffold: {
      type: 'object',
      properties: {
        hints: { type: 'array', items: { type: 'string' } },
        sentence_starter: { type: 'string' },
        model_sentence: { type: 'string' }
      }
    },
    feedback: {
      type: 'object',
      properties: {
        praise: { type: 'string' },
        correction: { type: 'string' },
        progress: { type: 'string' }
      }
    }
  }
};

/**
 * Quiz response schema
 */
export const QuizResponseSchema = {
  type: 'object',
  required: ['question', 'correct_answer'],
  properties: {
    question: { type: 'string' },
    correct_answer: { type: 'string' },
    options: {
      type: 'array',
      items: { type: 'string' }
    },
    explanation: { type: 'string' },
    hint: { type: 'string' }
  }
};

/**
 * Parse AI response with tolerance
 * @param {string} rawText - Raw AI response
 * @param {Object} schema - Expected schema
 * @returns {Object} Parsed data
 */
export function parseResponse(rawText, schema) {
  try {
    // Try JSON first
    const parsed = JSON.parse(rawText);
    return parsed;
  } catch (e) {
    // Tolerant parsing for common formats
    console.warn('[SchemaParser] JSON parse failed, using tolerant parser');
    
    if (schema === StoryMissionSchema) {
      return parseStoryMission(rawText);
    } else if (schema === ChatResponseSchema) {
      return parseChatResponse(rawText);
    }
    
    throw new Error('[SchemaParser] Cannot parse response');
  }
}

/**
 * Tolerant parser for Story Mission format
 */
function parseStoryMission(text) {
  const storyMatch = text.match(/STORY[:\s]+(.+?)(?=TASK:|$)/is);
  const taskMatch = text.match(/TASK[:\s]+(.+?)(?=VOCAB:|REQUIRED:|$)/is);
  const vocabMatch = text.match(/(?:VOCAB|REQUIRED)[:\s]+(.+?)(?=HINTS:|SCAFFOLD:|$)/is);
  const hintsMatch = text.match(/HINTS[:\s]+(.+?)(?=$)/is);
  
  return {
    story_beat: storyMatch?.[1]?.trim() || text.split('\n')[0],
    task: taskMatch?.[1]?.trim() || 'Continue the story',
    required_vocab: vocabMatch?.[1]?.split(/[,|]/).map(w => w.trim()).filter(Boolean) || [],
    scaffold: {
      hints: hintsMatch?.[1]?.split(/[,|]/).map(w => w.trim()).filter(Boolean) || []
    }
  };
}

/**
 * Tolerant parser for Chat response
 */
function parseChatResponse(text) {
  const lines = text.split('\n').filter(l => l.trim());
  const response = lines[0] || text;
  const followUp = lines.find(l => l.includes('?')) || 'Tell me more?';
  
  return {
    response,
    follow_up: followUp
  };
}

/**
 * Validate parsed response
 */
export function validateResponse(parsed, schema) {
  const required = schema.required || [];
  
  for (const field of required) {
    if (!parsed[field]) {
      console.warn(`[SchemaValidator] Missing required field: ${field}`);
      return false;
    }
  }
  
  return true;
}
