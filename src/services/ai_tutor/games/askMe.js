/**
 * Ask Me - Question formation
 */

import { analyzeAnswer } from '../../../utils/smartCheck';

// Structure words that should be in questions (not content words)
const STRUCTURE_WORDS = new Set([
  // Pronouns
  'i', 'you', 'he', 'she', 'it', 'we', 'they',
  'my', 'your', 'his', 'her', 'its', 'our', 'their',
  'this', 'that', 'these', 'those',
  // Verbs
  'is', 'are', 'am', 'was', 'were',
  'have', 'has', 'had',
  'do', 'does', 'did',
  'can', 'could', 'will', 'would', 'should',
  'like', 'love', 'want', 'need',
  // Question words
  'what', 'where', 'who', 'whose', 'when', 'why', 'how',
  // Prepositions often used in question structure
  'in', 'on', 'at', 'under', 'over', 'with', 'from', 'to'
]);

function isStructureWord(word) {
  return STRUCTURE_WORDS.has(word.toLowerCase());
}

/**
 * Normalize question for comparison (remove punctuation, lowercase, trim)
 */
function normalizeQuestion(text) {
  return text
    .toLowerCase()
    .replace(/[?.!,;]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if input matches any accepted question (with tolerance)
 */
function matchesAcceptedQuestion(input, acceptedQuestions) {
  const normalized = normalizeQuestion(input);
  return acceptedQuestions.some(q => {
    const normalizedAccepted = normalizeQuestion(q);
    return normalized === normalizedAccepted;
  });
}

export function validateAskMeQuestion({ input, requiredWords, requiredKeywords, acceptedQuestions }) {
  const clean = input.trim();
  if (!clean) {
    return { valid: false, message: 'Please ask a question.' };
  }

  const startsWithCapital = /^[A-Z]/.test(clean);
  if (!startsWithCapital) {
    return { valid: false, message: 'Start your question with a capital letter.' };
  }

  const endsWithQuestion = /\?$/.test(clean);
  if (!endsWithQuestion) {
    return { valid: false, message: 'End your question with a question mark (?).' };
  }

  // **NEW: Hardcoded exact question matching (if provided)**
  if (acceptedQuestions && acceptedQuestions.length > 0) {
    if (matchesAcceptedQuestion(clean, acceptedQuestions)) {
      return { valid: true, message: 'Perfect question!' };
    } else {
      // Show first 2 accepted questions as hints
      const hints = acceptedQuestions.slice(0, 2).join(' OR ');
      return { 
        valid: false, 
        message: `Try asking: "${hints}"` 
      };
    }
  }

  // **FALLBACK: Old validation (if no acceptedQuestions provided)**
  const lower = clean.toLowerCase();
  const startsWithQuestionWord = /^(what|where|who|whose|when|why|how|is|are|can|do|does|did|will|would|could|should)\b/i.test(clean);
  if (!startsWithQuestionWord) {
    return { valid: false, message: 'Start with a question word (What, Where, Who, How, Is, Are, Do, Does, etc.).' };
  }

  if (requiredWords && requiredWords.length > 0) {
    const hasRequired = requiredWords.some((w) => lower.startsWith(w) || lower.includes(` ${w} `));
    if (!hasRequired) {
      return { valid: false, message: `Use a question word like: ${requiredWords.join(', ')}.` };
    }
  }

  if (requiredKeywords && requiredKeywords.length > 0) {
    const structureKeywords = requiredKeywords.filter(isStructureWord);
    
    if (structureKeywords.length > 0) {
      const hasKeyword = structureKeywords.some((w) => new RegExp(`\\b${w}\\b`, 'i').test(clean));
      if (!hasKeyword) {
        return { valid: false, message: `Include one of these words: ${structureKeywords.join(', ')}.` };
      }
    }
  }

  const smart = analyzeAnswer(clean, clean, 'critical');
  if (smart.status === 'warning') {
    return { valid: true, message: smart.message };
  }

  return { valid: true, message: 'Good question!' };
}
