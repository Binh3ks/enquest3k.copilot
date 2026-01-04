/**
 * AI Tutor Memory
 * Persists student context and learning progress in local storage
 */

const MEMORY_KEY = 'engquest_ai_tutor_memory';

/**
 * Save student context to local storage
 */
export function saveToMemory(context) {
  try {
    const current = getMemory();
    const updated = {
      ...current,
      ...context,
      lastSeen: new Date().toISOString()
    };
    localStorage.setItem(MEMORY_KEY, JSON.stringify(updated));
    console.log('[Memory] Context saved:', context);
  } catch (e) {
    console.error('[Memory] Failed to save:', e);
  }
}

/**
 * Get student context from local storage
 */
export function getMemory() {
  try {
    const data = localStorage.getItem(MEMORY_KEY);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Clear specific memory keys or all
 */
export function clearMemory() {
  localStorage.removeItem(MEMORY_KEY);
}

/**
 * Track specific vocabulary usage across sessions
 */
export function trackVocabGlobal(word) {
  const mem = getMemory();
  const vocab = mem.knownVocab || [];
  if (!vocab.includes(word.toLowerCase())) {
    vocab.push(word.toLowerCase());
    saveToMemory({ knownVocab: vocab });
  }
}

export default {
  saveToMemory,
  getMemory,
  clearMemory,
  trackVocabGlobal
};
