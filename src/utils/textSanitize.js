/**
 * Text sanitization utilities for game chips, tokens, and chunk display.
 */

/**
 * Strips edge punctuation from chunk text while preserving internal apostrophes and hyphens.
 * Prevents awkward chips like "corridor," or "class." in game train carriages and catapult targets.
 * 
 * @param {string} raw - Raw input chunk/text
 * @returns {string} Sanitized chunk text
 */
export function sanitizeChunkText(raw) {
  if (typeof raw !== 'string') return '';
  // Trim edge whitespace and trailing/leading sentence punctuation (.,!?:;"'()[]{})
  return raw.trim().replace(/^[\s.,!?:;"'()[\]{}]+|[\s.,!?:;"'()[\]{}]+$/g, '');
}
