/**
 * cambridgeCriteria.js — Helper functions for Cambridge Flyers 15-Shield Master Scaffolding System.
 */

export const TRANSITION_CONNECTORS = [
  'one sunny day', 'suddenly', 'meanwhile', 'to their surprise', 'eventually',
  'first', 'then', 'next', 'finally', 'after that', 'before long',
  'in the end', 'as a result', 'however', 'in addition', 'all of a sudden'
];

export function evaluateCambridgeCriteria(text, weekNum = 33, customWordBank = {}) {
  const cleanText = text.trim();
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lowerText = cleanText.toLowerCase();

  // CEFR Scaffolding Tier Progression:
  // W01-15: Beginners (15 words)
  // W16-32: Movers Scaffolding (20 words, basic connectors)
  // W33-42: Cambridge A2 Flyers Tier 1 (20 words, past continuous / past simple, 1+ connectors)
  // W43-54: Cambridge A2 Flyers Tier 2 (30 words, 2+ connectors)
  // W55+: PET/B1 Transition Tier (50+ words)
  let targetWords = 20;
  let minConnectors = 1;
  let requirePastContinuous = false;
  let isExamMode = false;

  if (weekNum >= 55) {
    targetWords = 50;
    minConnectors = 3;
    requirePastContinuous = true;
    isExamMode = true;
  } else if (weekNum >= 43) {
    targetWords = 30;
    minConnectors = 2;
    requirePastContinuous = true;
  } else if (weekNum >= 33) {
    targetWords = 20; // Official Cambridge A2 Flyers Part 7 Standard: 20 or more words
    minConnectors = 1;
    requirePastContinuous = true;
  } else if (weekNum >= 16) {
    targetWords = 20;
    minConnectors = 1;
  } else {
    targetWords = 15;
    minConnectors = 0;
  }

  // 1. Past Tense / Past Continuous Check
  const hasPastContinuous = /\b(was|were)\s+\w+ing\b/i.test(cleanText);
  const pastVerbs = ['was', 'were', 'slipped', 'fell', 'hurt', 'called', 'stopped', 'arrived', 'brought', 'treated', 'helped', 'walked', 'ran', 'saw', 'dropped', 'promised'];
  const foundPastVerbs = Array.from(new Set(pastVerbs.filter(v => lowerText.includes(v))));

  // 2. Transition Connectors Check
  const connectorsList = Array.isArray(customWordBank.connectors) && customWordBank.connectors.length > 0
    ? customWordBank.connectors
    : TRANSITION_CONNECTORS;

  let connectorsFound = [];
  connectorsList.forEach(c => {
    if (lowerText.includes(c.toLowerCase()) && !connectorsFound.includes(c)) {
      connectorsFound.push(c);
    }
  });

  // 3. Target Vocab Keywords Check
  const targetKeywords = Array.isArray(customWordBank.keywords) && customWordBank.keywords.length > 0
    ? customWordBank.keywords
    : ['slipped', 'corridor', 'nurse', 'bandage', 'knee', 'fell', 'help', 'pack', 'clean', 'stopped', 'walked', 'called', 'fast', 'wet', 'floor', 'aid', 'school'];
  const foundKeywords = Array.from(new Set(targetKeywords.filter(k => lowerText.includes(k.toLowerCase()))));

  // Scores
  const isWordCountPass = wordCount >= targetWords;
  const wordScore = isWordCountPass ? 20 : Math.round((wordCount / targetWords) * 20);
  const connectorScore = Math.min(30, connectorsFound.length * 15);
  const syntaxScore = Math.min(30, (foundPastVerbs.length + (hasPastContinuous ? 1 : 0)) * 10);
  const keywordScore = Math.min(20, foundKeywords.length * 5);

  const hasSentencePunctuation = /[.!?]/.test(cleanText);
  const isCoherent = connectorsFound.length >= minConnectors || (hasSentencePunctuation && foundPastVerbs.length >= 1);

  let totalScore = wordScore + connectorScore + syntaxScore + keywordScore;
  if (!isCoherent && isWordCountPass) {
    totalScore = Math.min(55, totalScore);
  } else {
    totalScore = Math.min(100, totalScore);
  }

  const stars = totalScore >= 80 ? 3 : totalScore >= 60 ? 2 : 1;

  // 4. Cumulative Chunks Check
  const cumulativeChunks = Array.isArray(customWordBank.cumulative_chunks) && customWordBank.cumulative_chunks.length > 0
    ? customWordBank.cumulative_chunks
    : ['slipped on wet floor', 'hurt his knee', 'called the school nurse', 'applied a clean bandage', 'cleaned the wet floor', 'walking carefully'];
  const chunksFound = Array.from(new Set(cumulativeChunks.filter(c => lowerText.includes(c.toLowerCase()))));

  const metChunks = chunksFound.length >= 1;

  return {
    totalScore,
    stars,
    wordCount,
    targetWords,
    metWords: isWordCountPass,
    connectorsFound,
    minConnectors,
    metConnectors: connectorsFound.length >= minConnectors,
    hasPastContinuous,
    metPastContinuous: hasPastContinuous,
    foundPastVerbs,
    foundKeywords,
    chunksFound,
    metChunks,
    isExamMode,
    isCoherent
  };
}

/**
 * 5-Paragraph & Essay Structure Analysis (W43+ Scaffolding)
 * Evaluates Narrative Arc (Introduction -> Climax/Action -> Resolution/Conclusion)
 */
export function evaluateEssayStructure(text, weekNum = 33) {
  const clean = (text || '').trim();
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const paragraphs = clean.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);

  const hasIntro = /^(one day|first|in the morning|yesterday|on \w+day|last week|while|as)\b/i.test(clean) || sentences.length >= 1;
  const hasBody = sentences.length >= 3 || /(suddenly|then|next|after that|meanwhile)\b/i.test(clean);
  const hasConclusion = /(finally|in the end|at last|everyone felt|was happy|learned a lesson|relieved)\b/i.test(clean) || sentences.length >= 4;

  const hasCompoundSentences = /\b(and|but|so|because|although|while)\b/i.test(clean);

  return {
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    hasIntro,
    hasBody,
    hasConclusion,
    hasCompoundSentences,
    structureScore: (hasIntro ? 30 : 0) + (hasBody ? 40 : 0) + (hasConclusion ? 30 : 0)
  };
}

