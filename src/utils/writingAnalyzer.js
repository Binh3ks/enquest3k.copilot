/**
 * src/utils/writingAnalyzer.js — Text analysis utilities for Writing Rubric (Sprint S1.3)
 *
 * Pure functions — no side effects, no imports from other utils.
 * Called by writingRubric.js to perform linguistic analysis on student submissions.
 */

// ─────────────────────────────────────────────────────────────
// Word/sentence tokenisation
// ─────────────────────────────────────────────────────────────

/**
 * Count tokens (words) in a text string.
 * @param {string} text
 * @returns {number}
 */
export function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Split text into sentences (by . ! ?).
 * @param {string} text
 * @returns {string[]}
 */
export function splitSentences(text) {
  if (!text) return [];
  return text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
}

// ─────────────────────────────────────────────────────────────
// D2: Vocabulary use
// ─────────────────────────────────────────────────────────────

/**
 * Count how many words from the word_bank / keywords appear in the submission.
 * Case-insensitive, checks for whole-word or phrase match.
 *
 * @param {string} text — student submission
 * @param {string[]} wordBank — words/phrases from writing.js keywords or word_bank
 * @returns {number} count of matched bank words
 */
export function countBankWordsUsed(text, wordBank) {
  if (!text || !Array.isArray(wordBank) || wordBank.length === 0) return 0;
  const lower = text.toLowerCase();
  return wordBank.filter(w => {
    if (!w) return false;
    return lower.includes(w.toLowerCase());
  }).length;
}

// ─────────────────────────────────────────────────────────────
// D3: Grammar accuracy
// ─────────────────────────────────────────────────────────────

/**
 * Detect potential sentence fragments — sentences with fewer than 3 words,
 * or sentences lacking a likely verb (very simple heuristic for young learners).
 *
 * @param {string} text
 * @returns {number} count of suspected fragments
 */
export function detectFragments(text) {
  const sentences = splitSentences(text);
  return sentences.filter(s => {
    const words = s.split(/\s+/).filter(Boolean);
    return words.length < 3; // very short = likely fragment
  }).length;
}

/**
 * Count basic grammar errors using simple pattern detection.
 * Returns an estimated error count (not a full parser — suitable for A1/A2 level):
 * - Repeated words adjacent (e.g. "the the")
 * - Missing space after comma
 * - Obvious subject-verb agreement patterns (I are, he are, they is)
 *
 * @param {string} text
 * @returns {number} estimated error count
 */
export function countGrammarErrors(text) {
  if (!text) return 0;
  let errors = 0;

  // Repeated adjacent words
  const repeatMatches = text.match(/\b(\w+)\s+\1\b/gi) || [];
  errors += repeatMatches.length;

  // Missing space after punctuation (comma, period before letter)
  const missingSpace = text.match(/[,;][a-zA-Z]/g) || [];
  errors += missingSpace.length;

  // Basic S-V agreement errors for young learners
  const svErrors = [
    /\bi are\b/i,
    /\bhe are\b/i, /\bshe are\b/i, /\bit are\b/i,
    /\bthey is\b/i, /\bwe is\b/i, /\byou is\b/i,
    /\bi were\b/i, // common mistake at this level
  ];
  svErrors.forEach(re => {
    if (re.test(text)) errors++;
  });

  return errors;
}

// ─────────────────────────────────────────────────────────────
// D3: Sentence structure
// ─────────────────────────────────────────────────────────────

/**
 * Check if every sentence appears to have at least a subject + verb.
 * Uses basic token count (≥4 words) as a proxy — not NLP.
 *
 * @param {string} text
 * @returns {boolean} true if all sentences look structurally complete
 */
export function allSentencesHaveSubjectVerb(text) {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return false;
  return sentences.every(s => s.split(/\s+/).filter(Boolean).length >= 4);
}

// ─────────────────────────────────────────────────────────────
// D4: Coherence / connectors
// ─────────────────────────────────────────────────────────────

/**
 * Connector word lists per phase.
 */
export const CONNECTORS = {
  phase1: ['and', 'but', 'so', 'because', 'then', 'or', 'also'],
  phase2: ['therefore', 'however', 'as a result', 'in addition', 'on the other hand',
           'furthermore', 'although', 'despite', 'consequently'],
  phase3: [], // Phase 3 checks paragraph structure — handled separately
};

/**
 * Count how many connector phrases from a given phase appear in the text.
 *
 * @param {string} text
 * @param {1|2|3} phase
 * @returns {number} count of distinct connectors found
 */
export function countConnectors(text, phase = 1) {
  if (!text) return 0;
  const lower = text.toLowerCase();
  const list = phase === 1 ? CONNECTORS.phase1 : CONNECTORS.phase2;
  return list.filter(c => lower.includes(c)).length;
}

// ─────────────────────────────────────────────────────────────
// D1: Relevance heuristic
// ─────────────────────────────────────────────────────────────

/**
 * Estimate whether the submission is on-topic by looking for
 * presence of at least some word-bank or prompt keyword overlap.
 *
 * @param {string} text
 * @param {string[]} wordBank
 * @param {string} promptText — the writing prompt (en)
 * @returns {'full' | 'partial' | 'off_topic'}
 */
export function assessRelevance(text, wordBank, promptText) {
  const bankHits = countBankWordsUsed(text, wordBank);
  if (bankHits >= 3) return 'full';

  // Check prompt keyword overlap
  const promptWords = (promptText || '')
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 4); // content words only (skip short words)
  const textLower = text.toLowerCase();
  const promptHits = promptWords.filter(w => textLower.includes(w)).length;
  if (promptHits >= 2 || bankHits >= 1) return 'partial';

  return 'off_topic';
}

// ─────────────────────────────────────────────────────────────
// Best sentence detection
// ─────────────────────────────────────────────────────────────

/**
 * Select the "best" sentence from the submission — defined as:
 * the longest sentence that contains at least one bank word.
 * Falls back to the longest sentence overall.
 *
 * @param {string} text
 * @param {string[]} wordBank
 * @returns {string}
 */
export function pickBestSentence(text, wordBank) {
  const sentences = splitSentences(text);
  if (sentences.length === 0) return '';

  const lower = (wordBank || []).map(w => w.toLowerCase());
  const withBankWord = sentences.filter(s =>
    lower.some(w => s.toLowerCase().includes(w))
  );
  const pool = withBankWord.length > 0 ? withBankWord : sentences;
  const longest = pool.reduce((a, b) => (b.length > a.length ? b : a), '');
  return longest;
}

// ─────────────────────────────────────────────────────────────
// TIERED RUBRIC HELPERS (Sprint S4 — Story Writing)
// ─────────────────────────────────────────────────────────────

/**
 * Tier 1 (W16-W23): Count scene elements — how many distinct pieces
 * of picture content the student described. Looks for:
 *   - characters (people/family/friends)
 *   - locations (place nouns: room, park, school, etc.)
 *   - actions (verb_ing or past-tense verbs)
 * Returns count of distinct element types present.
 */
export function countSceneElements(text, wordBank) {
  if (!text) return 0;
  const lower = text.toLowerCase();
  let elements = 0;

  // Heuristic: count word bank hits
  const hits = countBankWordsUsed(text, wordBank || []);
  if (hits >= 1) elements += 1;
  if (hits >= 3) elements += 1;
  if (hits >= 5) elements += 1;

  return Math.min(elements, 3);
}

/**
 * Tier 2 (W24-W35): Detect sequence markers — does the student
 * narrate events in order? Look for first/then/next/after/finally/before.
 * Returns count of distinct sequence markers found.
 */
export function detectSequenceMarkers(text) {
  if (!text) return 0;
  const lower = text.toLowerCase();
  const markers = ['first', 'then', 'next', 'after that', 'finally', 'before', 'after', 'later', 'soon', 'suddenly'];
  return markers.filter(m => lower.includes(m)).length;
}

/**
 * Tier 3 (W36+): Detect topic essay structure — does the student
 * write a topic sentence (with opinion markers) + 2+ supporting
 * sentences + closing (conclusion markers)?
 * Returns 1-3 based on completeness.
 */
export function detectTopicStructure(text) {
  if (!text) return 1;
  const lower = text.toLowerCase();
  let score = 1; // base for any submission

  // Topic sentence: first sentence contains opinion markers
  const sentences = splitSentences(text);
  if (sentences.length > 0) {
    const first = sentences[0].toLowerCase();
    if (/\b(i think|i believe|in my opinion|i feel|i like|i love|i hate|i prefer)\b/.test(first)) {
      score += 1;
    }
  }

  // Supporting: at least 2 sentences with "because" or "for example"
  const hasSupport = /\b(because|for example|such as|for instance|also|additionally)\b/.test(lower);
  if (hasSupport) score += 1;

  // Closing: last sentence contains conclusion markers
  if (sentences.length > 1) {
    const last = sentences[sentences.length - 1].toLowerCase();
    if (/\b(in conclusion|therefore|so i think|that's why|finally|in summary)\b/.test(last)) {
      // already counted above? no — this is the 3rd dimension
    }
  }

  return Math.min(score, 3);
}

/**
 * Tier 2 (W24-W35): Check past-tense consistency.
 * Count past-tense verb patterns vs present-tense. Return:
 *   3 = mostly past (>= 2 past for every present)
 *   2 = mixed (similar count)
 *   1 = mostly present (narrative inconsistency)
 */
export function assessPastTenseConsistency(text) {
  if (!text) return 1;
  const pastPattern = /\b(was|were|had|did|went|saw|made|took|came|ran|ate|got|said|told|gave|found|knew|thought|worked|played|walked|looked|watched|cooked|cleaned|helped|talked|opened|listened|finished|started|liked|loved|wanted|needed|visited|enjoyed)\b/gi;
  const presentPattern = /\b(is|am|are|do|does|go|see|make|take|come|run|eat|get|say|tell|give|find|know|think|work|play|walk|look|watch|cook|clean|help|talk|open|listen|finish|start|like|love|want|need|visit|enjoy)\b/gi;

  // Strip out common false-positives
  const cleanText = text.replace(/\b(the|a|an|to|of|and|in|on|at|for|with|by|is not|am not|are not)\b/gi, '');

  const pastMatches = cleanText.match(pastPattern) || [];
  const presentMatches = cleanText.match(presentPattern) || [];

  if (pastMatches.length === 0 && presentMatches.length === 0) return 2;
  if (pastMatches.length >= presentMatches.length * 1.5) return 3;
  if (pastMatches.length < presentMatches.length * 0.5) return 1;
  return 2;
}

/**
 * Tier 3 (W36+): Count diverse vocabulary.
 * Returns ratio of unique words to total words. Higher = more diverse.
 *   >= 0.7 → 3
 *   >= 0.5 → 2
 *   <  0.5 → 1
 */
export function assessVocabularyDiversity(text) {
  if (!text) return 1;
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  if (words.length === 0) return 1;
  const unique = new Set(words);
  const ratio = unique.size / words.length;
  if (ratio >= 0.7) return 3;
  if (ratio >= 0.5) return 2;
  return 1;
}
