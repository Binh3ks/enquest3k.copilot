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
 * @param {string} mode - Tutor mode
 * @returns {Object} Parsed data
 */
export function parseResponse(rawText, mode) {
  // Clean text
  let cleanText = rawText.trim();
  
  // Try to extract JSON if wrapped in markdown
  const jsonMatch = cleanText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
  if (jsonMatch) {
    cleanText = jsonMatch[1];
  }
  
  try {
    // Try JSON first
    const parsed = JSON.parse(cleanText);
    return parsed;
  } catch (e) {
    // Tolerant parsing for common formats
    console.warn('[SchemaParser] JSON parse failed, using tolerant parser');
    console.warn('[SchemaParser] Raw text:', cleanText.substring(0, 200));
    
    if (mode === 'story' || mode === 'STORY_MISSION') {
      return parseStoryMission(cleanText);
    } else {
      return parseChatResponse(cleanText);
    }
  }
}

/**
 * Tolerant parser for Story Mission format
 */
function parseStoryMission(text) {
  // Try to extract key parts even if format is wrong
  const result = {
    story_beat: '',
    task: '',
    required_vocab: [],
    scaffold: {
      hints: [],
      sentence_starter: ''
    }
  };
  
  // Extract story beat (first sentence or paragraph)
  const firstSentence = text.match(/^[^.!?]+[.!?]/);
  if (firstSentence) {
    result.story_beat = firstSentence[0].trim();
  } else {
    // Take first line as story beat
    result.story_beat = text.split('\n')[0].trim();
  }
  
  // Extract task if present
  const taskMatch = text.match(/(?:TASK|task|Task)[:\s]+([^.\n]+)/i);
  if (taskMatch) {
    result.task = taskMatch[1].trim();
  }
  
  // Extract hints (look for word lists in brackets or arrays)
  const hintsMatch = text.match(/hints?[:\s]*\[([^\]]+)\]/i);
  if (hintsMatch) {
    result.scaffold.hints = hintsMatch[1]
      .split(',')
      .map(h => h.trim().replace(/['"]/g, ''))
      .filter(h => h.length > 0);
  }
  
  return result;
}
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
