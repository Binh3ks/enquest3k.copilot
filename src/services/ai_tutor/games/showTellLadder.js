/**
 * Show and Tell Ladder - Production-first ladder game
 */

import { analyzeAnswer } from '../../../utils/smartCheck';

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function buildFrameRegexes(frames) {
  return frames.map((frame) => {
    const pattern = escapeRegex(frame).replace(/___/g, '[^.?!]+');
    return new RegExp(`^${pattern}$`, 'i');
  });
}

export function validateShowTell({
  input,
  step,
  word,
  details,
  frameRegexes,
  phase = 1,
  weekNumber = 1,
  learningMode = 'easy' // Add mode parameter for dual-mode progression
}) {
  const clean = input.trim();
  const lower = clean.toLowerCase();
  const target = word.toLowerCase();

  if (!clean) {
    return { correct: false, message: 'Please type or speak your answer.' };
  }

  // STEP 1: Say the word
  if (step === 1) {
    const hasWord = new RegExp(`\\b${escapeRegex(target)}\\b`, 'i').test(clean);
    return hasWord
      ? { correct: true, message: `✓ Perfect! You said "${word}". Now add a detail!` }
      : { correct: false, message: `Say the word: ${word}.` };
  }

  // STEP 2: Add a detail (phrase)
  if (step === 2) {
    const hasWord = new RegExp(`\\b${escapeRegex(target)}\\b`, 'i').test(clean);
    const hasDetail = details.some((d) => new RegExp(`\\b${escapeRegex(d)}\\b`, 'i').test(clean));
    if (hasWord && hasDetail) {
      return { correct: true, message: '✓ Nice detail! Now make a full sentence.' };
    }
    return { correct: false, message: `Add one detail from: ${details.slice(0, 3).join(', ')}.` };
  }

  // STEP 3: Make a full sentence
  if (step === 3) {
    const hasWord = new RegExp(`\\b${escapeRegex(target)}\\b`, 'i').test(clean);
    const wordCount = clean.split(/\s+/).length;
    const hasProperEnding = /[.!?]$/.test(clean);
    const startsWithCapital = /^[A-Z]/.test(clean);
    
    if (!startsWithCapital) {
      return { correct: false, message: 'Start your sentence with a capital letter.' };
    }
    if (!hasProperEnding) {
      return { correct: false, message: 'End your sentence with . ! or ?' };
    }
    if (!hasWord) {
      return { correct: false, message: `Your sentence must include the word: ${word}.` };
    }
    if (wordCount < 3) {
      return { correct: false, message: 'Make a longer sentence (at least 3 words).' };
    }

    const smart = analyzeAnswer(clean, clean, 'critical');
    if (smart.status === 'warning' || smart.status === 'incorrect') {
      return { correct: false, message: smart.message };
    }
    
    const nextStepMessage = phase >= 3 
      ? '✓ Perfect sentence! Now add a second sentence.' 
      : '✓ Perfect sentence! Moving to next word.';
    
    return { correct: true, message: nextStepMessage };
  }

  // STEP 4: Add a second sentence (Phase 3+: W15+)
  if (step === 4) {
    const sentences = clean.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const hasWord = new RegExp(`\\b${escapeRegex(target)}\\b`, 'i').test(clean);
    const startsWithCapital = /^[A-Z]/.test(clean);
    
    if (!startsWithCapital) {
      return { correct: false, message: 'Start with a capital letter.' };
    }
    
    if (sentences.length < 2) {
      return { correct: false, message: 'Add a second sentence about the same topic.' };
    }
    
    if (!hasWord) {
      return { correct: false, message: `Include the word "${word}" in your response.` };
    }
    
    // Check that each sentence ends properly
    const properEndings = (clean.match(/[.!?]/g) || []).length;
    if (properEndings < 2) {
      return { correct: false, message: 'Each sentence needs proper punctuation (.!?)' };
    }
    
    const smart = analyzeAnswer(clean, clean, 'critical');
    if (smart.status === 'warning' || smart.status === 'incorrect') {
      return { correct: false, message: smart.message };
    }
    
    // Guide to Step 5 based on mode + phase
    // Advanced mode: W25+ (Phase 4+) can access Step 5
    // Easy mode: W37+ (Phase 6+) can access Step 5
    const canAccessStep5 = learningMode === 'advanced' ? (weekNumber >= 25) : (phase >= 6);
    const nextStepMessage = canAccessStep5
      ? '✓ Great! Now tell a mini story with "because" or "so".'
      : '✓ Excellent! Moving to next word.';
    
    return { correct: true, message: nextStepMessage };
  }

  // STEP 5: Mini story or opinion with connectors
  // Advanced mode: W25+ (Phase 4+)
  // Easy mode: W37+ (Phase 6+)
  if (step === 5) {
    const sentences = clean.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const hasWord = new RegExp(`\\b${escapeRegex(target)}\\b`, 'i').test(clean);
    
    // Mode-aware connector requirements
    // Advanced W25-28 (Phase 4): Simple connectors only (because, so)
    // Advanced W29+ or Easy W37+ (Phase 5-6+): Full connector set
    const simpleConnectors = /\b(because|so|I think)\b/i;
    const fullConnectors = /\b(because|so|and|but|or|I think|I believe)\b/i;
    
    const isEarlyAdvanced = learningMode === 'advanced' && weekNumber >= 25 && weekNumber < 29;
    const hasConnector = isEarlyAdvanced
      ? simpleConnectors.test(clean)
      : fullConnectors.test(clean);
    
    const startsWithCapital = /^[A-Z]/.test(clean);
    
    if (!startsWithCapital) {
      return { correct: false, message: 'Start with a capital letter.' };
    }
    
    if (sentences.length < 2) {
      return { correct: false, message: 'Tell a mini story with at least 2 sentences.' };
    }
    
    if (!hasWord) {
      return { correct: false, message: `Include the word "${word}" in your story.` };
    }
    
    if (!hasConnector) {
      const connectorHint = isEarlyAdvanced
        ? 'Use a connector word: because, so, or "I think".'
        : 'Use a connector word: because, so, and, but, or "I think".';
      return { correct: false, message: connectorHint };
    }
    
    const smart = analyzeAnswer(clean, clean, 'critical');
    if (smart.status === 'warning' || smart.status === 'incorrect') {
      return { correct: false, message: smart.message };
    }
    
    return { correct: true, message: '✓ Amazing story! Moving to next word.' };
  }

  return { correct: false, message: 'Try again.' };
}
