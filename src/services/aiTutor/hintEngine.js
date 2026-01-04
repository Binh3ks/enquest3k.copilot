/**
 * HINT ENGINE V4 - SMART SYNC
 * Instant hint generation matching actual AI questions
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
 * Smart hint generation - matches question intelligently
 */
function generateSmartHints(question, ctx) {
  const lower = question.toLowerCase();

  // Name questions
  if (lower.includes('name')) {
    return ['My', 'name', 'is', ctx.name || '_____'];
  }

  // Age questions
  if (lower.includes('old') || lower.includes('age')) {
    return ['I', 'am', ctx.age || '9', 'years', 'old'];
  }

  // Class questions
  if (lower.includes('class') || lower.includes('grade')) {
    return ['I', 'am', 'in', 'class', ctx.class || '3A'];
  }

  // Teacher questions
  if (lower.includes('teacher')) {
    if (lower.includes('name')) {
      return ['My', 'teacher', 'is', ctx.teacherName || 'Mr. Smith'];
    }
    return ['My', 'teacher', 'is', 'nice'];
  }

  // SPECIFIC questions first (most specific to least specific)

  // "What do you like to do" questions - MUST come before generic "like"
  if (lower.includes('what') && lower.includes('like') && lower.includes('do')) {
    if (lower.includes('school')) {
      return ['I', 'like', 'to', 'read', 'books'];
    }
    return ['I', 'like', 'to', 'play', 'games'];
  }

  // "What is your favorite" questions
  if (lower.includes('what') && (lower.includes('favorite') || lower.includes('subject'))) {
    return ['My', 'favorite', 'is', ctx.subject || 'Math'];
  }

  // "Who" questions
  if (lower.startsWith('who')) {
    if (lower.includes('teacher')) {
      return ['My', 'teacher', 'is', ctx.teacherName || 'Ms. Nova'];
    }
    if (lower.includes('friend')) {
      return ['My', 'friend', 'is', 'nice'];
    }
    return ['My', 'friend', 'is', 'nice'];
  }

  // "Where" questions
  if (lower.startsWith('where')) {
    if (lower.includes('live')) {
      return ['I', 'live', 'in', 'Vietnam'];
    }
    if (lower.includes('hiding') || lower.includes('hide')) {
      return ['In', 'the', 'toilet'];
    }
    return ['It', 'is', 'here'];
  }

  // "When" questions
  if (lower.startsWith('when')) {
    return ['In', 'the', 'morning'];
  }

  // "Why" questions
  if (lower.startsWith('why')) {
    return ['Because', 'I', 'like', 'it'];
  }

  // "How" questions
  if (lower.startsWith('how')) {
    if (lower.includes('feel')) {
      return ['I', 'feel', 'happy'];
    }
    return ['I', 'am', 'happy'];
  }

  // "What" questions (general)
  if (lower.startsWith('what')) {
    return ['I', 'think', 'it', 'is', 'good'];
  }

  // Yes/no "Do you like" questions
  if (lower.match(/^do you like/)) {
    if (lower.includes('school')) {
      return ['Yes', 'I', 'like', 'school'];
    }
    if (lower.includes('english')) {
      return ['Yes', 'I', 'like', 'English'];
    }
    if (lower.includes('learning') || lower.includes('learn')) {
      return ['Yes', 'I', 'like', 'learning'];
    }
    if (lower.includes('coming')) {
      return ['Yes', 'I', 'like', 'coming', 'here'];
    }
    return ['Yes', 'I', 'like', 'it'];
  }

  // Generic yes/no questions
  if (lower.match(/^(do you|are you|can you|is|are)/)) {
    return ['Yes', 'I', 'do'];
  }

  // Think/feel questions
  if (lower.includes('think') || lower.includes('feel')) {
    return ['I', 'think', 'it', 'is', 'fun'];
  }

  // Friend questions (not starting with who)
  if (lower.includes('friend')) {
    return ['Yes', 'I', 'have', 'friends'];
  }

  // Subject/favorite questions (not starting with what)
  if (lower.includes('subject') || lower.includes('favorite')) {
    return ['I', 'like', ctx.subject || 'Math'];
  }

  // Ultimate fallback
  return ['I', 'am', 'a', 'student'];
}

/**
 * Main export - generate hints for a question
 */
export function getHints(_mission, beat, context) {
  const question = (beat.task || beat.aiPrompt || '').trim();
  const ctx = context || {};

  if (!question) {
    return shuffleArray(['I', 'am', 'a', 'student']);
  }

  const hints = generateSmartHints(question, ctx);
  console.log('[HintEngine] Hints for:', question, '→', hints);

  return shuffleArray(hints);
}
