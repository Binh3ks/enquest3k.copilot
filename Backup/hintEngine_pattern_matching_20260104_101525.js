/**
 * HINT ENGINE V3 - SIMPLIFIED
 * Extract hints directly from AI's question
 * No complex intent detection - just parse the question
 */

/**
 * Fisher-Yates shuffle
 */
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Extract hints from AI's question intelligently
 * Examples:
 * "How old are you?" → ["I", "am", "9", "years", "old"]
 * "What class are you in?" → ["I", "am", "in", "class", "3A"]
 * "What is your name?" → ["My", "name", "is", "Alex"]
 */
export function getHints(_mission, beat, context) {
  try {
    // Get the question from beat
    const question = (beat.task || beat.aiPrompt || '').toLowerCase().trim();
    const ctx = context || {};

    // Pattern matching for common questions
    if (question.includes('what is your name') || question.includes("what's your name")) {
      return shuffleArray(['My', 'name', 'is', ctx.name || '_____']);
    }

    if (question.includes('how old are you') || question.includes('your age')) {
      return shuffleArray(['I', 'am', ctx.age || '9', 'years', 'old']);
    }

    if (question.includes('what class are you in') || question.includes('which class')) {
      return shuffleArray(['I', 'am', 'in', 'class', ctx.class || '3A']);
    }

    if (question.includes('do you like school') || question.includes('like school')) {
      return shuffleArray(['Yes', 'I', 'like', 'school']);
    }

    if (question.includes('do you like') || question.includes('favorite subject')) {
      return shuffleArray(['I', 'like', ctx.subject || 'math']);
    }

    if (question.includes('who is your teacher') || question.includes("what's your teacher")) {
      return shuffleArray(['My', 'teacher', 'is', ctx.teacherName || 'Mr. Smith']);
    }

    if (question.includes('do you have friends') || question.includes('any friends')) {
      return shuffleArray(['Yes', 'I', 'have', 'friends']);
    }

    if (question.includes('where is') || question.includes('cannot find')) {
      const objectMatch = question.match(/\b(backpack|book|notebook|pencil)\b/);
      const object = objectMatch ? objectMatch[1] : 'backpack';
      return shuffleArray(['My', object, 'is', 'in', 'my', 'desk']);
    }

    if (question.includes('what is in your')) {
      return shuffleArray(['I', 'have', 'a', 'book', 'and', 'a', 'pencil']);
    }

    // Fallback: use static hints from beat if available
    if (beat.hints && beat.hints.length > 0) {
      return shuffleArray(beat.hints);
    }

    // Ultimate fallback
    return shuffleArray(['I', 'am', 'a', 'student']);

  } catch (error) {
    console.error('[HintEngine] Error:', error);
    return ['Help', 'me'];
  }
}
