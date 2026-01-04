/**
 * SYLLABUS LOADER
 * Loads and parses syllabus rules for each week
 * Provides curriculum-aware context for AI Tutor
 */

import { readFile } from 'fs/promises';
import { join } from 'path';

// Cache for syllabus data
let syllabusCache = null;

/**
 * Load and parse syllabus file
 */
export async function loadSyllabus() {
  if (syllabusCache) return syllabusCache;
  
  try {
    // For browser environment, we'll embed key syllabus rules
    // In production, this would load from backend/CDN
    syllabusCache = EMBEDDED_SYLLABUS_RULES;
    return syllabusCache;
  } catch (error) {
    console.error('[SyllabusLoader] Failed to load syllabus:', error);
    return EMBEDDED_SYLLABUS_RULES; // Fallback
  }
}

/**
 * Get curriculum rules for specific week
 * Returns: grammar rules, vocabulary themes, scaffolding level
 */
export function getWeekRules(weekId) {
  const week = EMBEDDED_SYLLABUS_RULES.weeks[weekId];
  if (!week) {
    console.warn(`[SyllabusLoader] Week ${weekId} not found, using defaults`);
    return getDefaultRules(weekId);
  }
  return week;
}

/**
 * Get scaffolding rules based on phase
 */
export function getScaffoldingRules(weekId) {
  // Phase 1: Weeks 1-54
  if (weekId <= 54) {
    return {
      phase: 1,
      name: 'Foundational Fluency',
      hints: {
        type: 'sentence_frames', // "I ___ at ___"
        maxWords: 5,
        showModels: true,
        allowBankWords: true
      },
      speaking: {
        mode: 'shadow_asking', // Nhại lại câu hỏi mẫu
        guidance: 'high'
      },
      writing: {
        mode: 'photo_submission', // Viết giấy & chụp ảnh
        minWords: 40
      }
    };
  }
  
  // Phase 2: Weeks 55-120
  if (weekId <= 120) {
    return {
      phase: 2,
      name: 'Academic Application',
      hints: {
        type: 'sentence_starters', // "The main reason is..."
        maxWords: 7,
        showModels: false,
        allowBankWords: true
      },
      speaking: {
        mode: 'guided_asking', // Tự lắp ghép câu từ từ khóa
        guidance: 'medium'
      },
      writing: {
        mode: 'dictation_draft', // Nói để viết (Speech-to-Text)
        minWords: 100
      }
    };
  }
  
  // Phase 3: Weeks 121-156
  return {
    phase: 3,
    name: 'Advanced Synthesis',
    hints: {
      type: 'key_words', // Chỉ từ khóa, không câu mẫu
      maxWords: 3,
      showModels: false,
      allowBankWords: false
    },
    speaking: {
      mode: 'free_inquiry', // Tự do hỏi/tranh biện
      guidance: 'low'
    },
    writing: {
      mode: 'free_writing', // Tự viết với gợi ý tiêu chí
      minWords: 150
    }
  };
}

/**
 * Get default rules for weeks not in syllabus
 */
function getDefaultRules(weekId) {
  return {
    weekId,
    title: `Week ${weekId}`,
    grammar: {
      allowed: ['present simple'],
      banned: ['past tense', 'future']
    },
    vocabulary: {
      core: [],
      optional: []
    },
    topics: ['General'],
    scaffolding: getScaffoldingRules(weekId)
  };
}

/**
 * EMBEDDED SYLLABUS RULES
 * Key curriculum rules embedded for browser use
 * Based on: NEW-FINAL_Khung CT_SYLLABUS_3yrs copy.txt
 */
const EMBEDDED_SYLLABUS_RULES = {
  phases: {
    1: {
      name: 'Foundational Fluency',
      weeks: '1-54',
      goal: 'Master foundational vocabulary and grammar. Write simple descriptive, narrative, and procedural paragraphs.',
      timeAllocation: '120 mins ELA per session'
    },
    2: {
      name: 'Academic Application',
      weeks: '55-120',
      goal: 'Transition from personal to academic writing. Use English to learn Math, Science, Social Studies.',
      timeAllocation: '60 mins English Math + 60 mins ELA'
    },
    3: {
      name: 'Advanced Synthesis & Debate',
      weeks: '121-156',
      goal: 'Achieve academic autonomy. Research, argumentative essays, formal debates.',
      timeAllocation: '60 mins Research/Writing + 60 mins Debate Practice'
    }
  },
  
  weeks: {
    // Week 1: Hello, World! (Identity)
    1: {
      weekId: 1,
      title: 'Hello, World! (Identity)',
      topic: 'Introduction & Superheroes (Creating a "Hero Identity")',
      keyOutcome: 'Say and write sentences introducing name/age naturally',
      grammar: {
        focus: 'I am...',
        pattern: 'Identity statements',
        allowed: ['present simple: I am', 'possessive: my'],
        banned: ['past tense', 'future', 'continuous']
      },
      vocabulary: {
        core: ['name', 'age', 'student', 'hero', 'power', 'boy', 'girl'],
        numbers: ['1-10'],
        mustUse: ['name', 'student']
      },
      topics: ['Identity', 'Self-introduction', 'Superheroes'],
      scaffolding: getScaffoldingRules(1),
      sentencePatterns: [
        'My name is ___',
        'I am ___ years old',
        'I am a ___'
      ]
    },
    
    // Week 2: My Family Squad
    2: {
      weekId: 2,
      title: 'My Family Squad (Relationships)',
      topic: 'Family members as a team',
      keyOutcome: 'Point to a photo and describe roles using "My"',
      grammar: {
        focus: 'This is my...',
        pattern: 'Possession',
        allowed: ['present simple: is', 'possessive: my/his/her'],
        banned: ['past tense', 'future']
      },
      vocabulary: {
        core: ['mother', 'father', 'brother', 'sister', 'team', 'leader', 'helper'],
        mustUse: ['mother', 'father']
      },
      topics: ['Family', 'Relationships', 'Team'],
      scaffolding: getScaffoldingRules(2),
      sentencePatterns: [
        'This is my ___',
        'My ___ is ___',
        'I have a ___'
      ]
    },
    
    // Week 3: The Mirror Game (Appearance)
    3: {
      weekId: 3,
      title: 'The Mirror Game (Appearance)',
      topic: 'Describing physical traits',
      keyOutcome: 'Describe self/others using "is" vs "has"',
      grammar: {
        focus: 'She is tall vs She has long hair',
        pattern: 'Be vs Have',
        allowed: ['present simple: is/has', 'adjectives before nouns'],
        banned: ['past tense', 'continuous']
      },
      vocabulary: {
        core: ['tall', 'short', 'hair', 'eyes', 'long', 'curly', 'straight', 'glasses'],
        mustUse: ['tall', 'hair', 'eyes']
      },
      topics: ['Appearance', 'Physical description'],
      scaffolding: getScaffoldingRules(3),
      sentencePatterns: [
        'I am ___',
        'I have ___ hair',
        'My ___ is ___'
      ]
    },
    
    // Week 4: My Happy Jar (Personality)
    4: {
      weekId: 4,
      title: 'My Happy Jar (Personality)',
      topic: 'Emotions and Likes',
      keyOutcome: 'Connect feelings with hobbies',
      grammar: {
        focus: 'I like + V-ing',
        pattern: 'Gerunds',
        allowed: ['present simple: like', 'gerunds: playing/reading'],
        banned: ['past tense', 'infinitives with to']
      },
      vocabulary: {
        core: ['funny', 'friendly', 'happy', 'playing', 'reading', 'drawing'],
        mustUse: ['like', 'happy']
      },
      topics: ['Emotions', 'Hobbies', 'Likes/Dislikes'],
      scaffolding: getScaffoldingRules(4),
      sentencePatterns: [
        'I like ___',
        'I am ___',
        'I like ___ because ___'
      ]
    },
    
    // Add more weeks as needed...
    // For now, provide template for weeks 5-54
    ...(generateWeeks5to54())
  }
};

/**
 * Generate placeholder rules for weeks 5-54
 * In production, load from full syllabus file
 */
function generateWeeks5to54() {
  const weeks = {};
  for (let i = 5; i <= 54; i++) {
    weeks[i] = {
      weekId: i,
      title: `Week ${i} - Phase 1`,
      topic: 'Foundational Grammar & Vocabulary',
      grammar: {
        allowed: ['present simple', 'basic past simple (was/were)'],
        banned: ['present perfect', 'conditional', 'passive']
      },
      vocabulary: {
        core: [],
        mustUse: []
      },
      topics: ['Phase 1 Content'],
      scaffolding: getScaffoldingRules(i),
      sentencePatterns: []
    };
  }
  return weeks;
}

/**
 * Build context string for AI from syllabus rules
 */
export function buildSyllabusContext(weekId) {
  const rules = getWeekRules(weekId);
  const scaffolding = getScaffoldingRules(weekId);
  
  return `
## CURRICULUM RULES - Week ${weekId}: ${rules.title}

**Topic:** ${rules.topic || 'General'}

**Grammar Scope:**
- Allowed: ${rules.grammar.allowed.join(', ')}
- BANNED: ${rules.grammar.banned.join(', ')}

**Core Vocabulary:**
${rules.vocabulary.core.join(', ')}

**Must-Use Words:**
${rules.vocabulary.mustUse.join(', ')}

**Sentence Patterns:**
${rules.sentencePatterns.map(p => `- ${p}`).join('\n')}

**Scaffolding Level (Phase ${scaffolding.phase}):**
- Hint Type: ${scaffolding.hints.type}
- Max Words per Hint: ${scaffolding.hints.maxWords}
- Show Model Sentences: ${scaffolding.hints.showModels ? 'YES' : 'NO'}
- Speaking Mode: ${scaffolding.speaking.mode}
- Writing Min Words: ${scaffolding.writing.minWords}

**Key Outcome:**
${rules.keyOutcome || 'Master target vocabulary and grammar patterns'}
`.trim();
}

export default {
  loadSyllabus,
  getWeekRules,
  getScaffoldingRules,
  buildSyllabusContext
};
