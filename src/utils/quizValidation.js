/**
 * Utility functions for validating and preparing Multiple Choice Question (MCQ) options.
 * Adheres to CEFR staging standards & ensures fair distractors.
 */

/**
 * Fisher-Yates shuffle implementation.
 * Returns a new shuffled copy of the array without mutating the input.
 * @param {Array} arr 
 * @returns {Array}
 */
export function shuffleArray(arr) {
  if (!Array.isArray(arr)) return [];
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Validates and balances MCQ options so that:
 * 1. The correct answer is always present.
 * 2. Exactly targetCount (default 4) unique options are provided.
 * 3. Duplicate answers are stripped.
 * 4. Missing options are filled from fallbackPool.
 * 5. Options are randomized (Fisher-Yates).
 * 
 * @param {string[]} options - Initial candidate options
 * @param {string} correctAnswer - The exact correct answer
 * @param {string[]} [fallbackPool=[]] - PHẢI là pool từ vựng của tuần hiện tại (cùng week, cùng CEFR level).
 *   CẤM truyền danh sách generic toàn hệ thống — sẽ tạo distractor sai cấp độ sư phạm.
 * @param {number} [targetCount=4] - Target number of options (default 4)
 * @returns {string[]} Validated and shuffled options
 */
export function validateMCQOptions(options, correctAnswer, fallbackPool = [], targetCount = 4) {
  if (!correctAnswer && correctAnswer !== 0) {
    return Array.isArray(options) ? options.slice(0, targetCount) : [];
  }

  const cleanCorrect = String(correctAnswer).trim();
  const set = new Set();
  set.add(cleanCorrect);

  if (Array.isArray(options)) {
    for (const opt of options) {
      if (opt !== undefined && opt !== null) {
        const clean = String(opt).trim();
        if (clean.length > 0 && clean.toLowerCase() !== cleanCorrect.toLowerCase()) {
          set.add(clean);
        }
      }
      if (set.size >= targetCount) break;
    }
  }

  if (set.size < targetCount && Array.isArray(fallbackPool)) {
    const poolShuffled = shuffleArray(fallbackPool);
    for (const item of poolShuffled) {
      if (item !== undefined && item !== null) {
        const clean = String(item).trim();
        if (clean.length > 0 && !Array.from(set).some(s => s.toLowerCase() === clean.toLowerCase())) {
          set.add(clean);
        }
      }
      if (set.size >= targetCount) break;
    }
  }

  const result = Array.from(set);
  return shuffleArray(result);
}
