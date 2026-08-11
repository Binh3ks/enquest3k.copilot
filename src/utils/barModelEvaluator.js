/**
 * Enhanced Bar Model Answer Evaluator
 * Supports numeric parsing, mixed unit strings (e.g. "100kg", "100 kg", "100 viên" -> 100),
 * and rejects decimals and negative numbers.
 */
export function evaluateBarModelAnswer(inputStr, correctAnswer) {
  if (typeof inputStr !== 'string' || inputStr.trim() === '') {
    return { isCorrect: false, score: 0, errorMsg: 'Vui lòng nhập một số nguyên hợp lệ!' };
  }

  const trimmed = inputStr.trim();

  // Reject negative numbers
  if (trimmed.startsWith('-')) {
    return { isCorrect: false, score: 0, errorMsg: 'Giá trị không được là số âm!' };
  }

  // Reject decimals
  if (trimmed.includes('.') || trimmed.includes(',')) {
    return { isCorrect: false, score: 0, errorMsg: 'Vui lòng nhập số nguyên (không dùng số thập phân)!' };
  }

  // Sanitize trailing units (e.g., "100kg", "100 kg", "100 viên" -> 100)
  const matchNum = trimmed.match(/^(\d+)/);
  if (!matchNum) {
    return { isCorrect: false, score: 0, errorMsg: 'Không tìm thấy số nguyên hợp lệ!' };
  }

  const num = parseInt(matchNum[1], 10);
  const isCorrect = num === correctAnswer;

  return {
    isCorrect,
    score: isCorrect ? 100 : 0,
    errorMsg: isCorrect ? null : `Đáp án đúng là ${correctAnswer}.`
  };
}
