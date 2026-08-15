/**
 * cambridgeCriteria.js — Helper functions for Cambridge Flyers 15-Shield Master Scaffolding System.
 */

export const TRANSITION_CONNECTORS = [
  'one sunny day', 'suddenly', 'meanwhile', 'to their surprise', 'eventually',
  'first', 'then', 'next', 'finally', 'after that', 'before long',
  'in the end', 'as a result', 'however', 'in addition', 'all of a sudden'
];

export function evaluateCambridgeCriteria(text, weekNum, customWordBank = {}) {
  const cleanText = text.trim();
  const words = cleanText.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lowerText = cleanText.toLowerCase();

  // 1. Past Continuous Check: was/were + V-ing
  const hasPastContinuous = /\b(was|were)\s+\w+ing\b/i.test(cleanText);
  const pastContinuousMatches = cleanText.match(/\b(was|were)\s+\w+ing\b/gi) || [];

  // 2. Transition Connectors Check
  let connectorsFound = [];
  const connectorsList = Array.isArray(customWordBank.connectors) && customWordBank.connectors.length > 0
    ? customWordBank.connectors
    : TRANSITION_CONNECTORS;

  connectorsList.forEach(c => {
    if (lowerText.includes(c.toLowerCase()) && !connectorsFound.includes(c)) {
      connectorsFound.push(c);
    }
  });

  // 3. Cumulative Chunks Check
  let chunksFound = [];
  const chunksList = Array.isArray(customWordBank.cumulative_chunks) ? customWordBank.cumulative_chunks : [];
  chunksList.forEach(chunk => {
    if (lowerText.includes(chunk.toLowerCase()) && !chunksFound.includes(chunk)) {
      chunksFound.push(chunk);
    }
  });

  // 4. Target specs based on week tier
  let targetWords = 50;
  let minConnectors = 1;
  let requirePastContinuous = false;
  let requireChunks = false;
  let isExamMode = false;

  if (weekNum >= 66) {
    targetWords = 80;
    minConnectors = 3;
    requirePastContinuous = true;
    requireChunks = true;
    isExamMode = true;
  } else if (weekNum >= 55) {
    targetWords = 60;
    minConnectors = 3;
    requirePastContinuous = true;
    requireChunks = true;
  } else if (weekNum >= 43) {
    targetWords = 35;
    minConnectors = 2;
    requirePastContinuous = true;
  } else if (weekNum >= 16) {
    targetWords = 20; // Cambridge A2 Flyers Part 7 Standard: 20 or more words
    minConnectors = 1;
  }

  const metWords = wordCount >= targetWords;
  const metConnectors = connectorsFound.length >= minConnectors;
  const metPastContinuous = !requirePastContinuous || hasPastContinuous;
  const metChunks = !requireChunks || chunksFound.length >= 1;

  const isAllMet = metWords && metConnectors && metPastContinuous && metChunks;

  return {
    wordCount,
    targetWords,
    metWords,
    connectorsFound,
    minConnectors,
    metConnectors,
    hasPastContinuous,
    pastContinuousMatches,
    requirePastContinuous,
    metPastContinuous,
    chunksFound,
    requireChunks,
    metChunks,
    isExamMode,
    isAllMet,
  };
}
