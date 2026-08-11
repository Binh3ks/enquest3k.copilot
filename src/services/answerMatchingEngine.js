/**
 * Flexible Answer-Matching Engine for Station 2 Grammar Sentence Builder.
 * Performs rule-based 3-layer verification without AI/LLM overhead.
 */

function normalizeToken(token) {
  if (!token) return '';
  return token.trim().toLowerCase();
}

function tokensToString(tokens) {
  return tokens
    .map((t) => t.trim())
    .join(' ')
    .replace(/\s+([.,!?:;])/g, '$1')
    .toLowerCase();
}

export function evaluateSentenceAttempt(userTokens, answerKey) {
  if (!userTokens || userTokens.length === 0) {
    return {
      isCorrect: false,
      isMinorError: false,
      score: 0,
      minorErrors: [],
      diagnosticTag: 'empty_attempt',
      feedbackText: 'Hãy xếp các khối từ để tạo thành câu hoàn chỉnh!'
    };
  }

  const {
    valid_structures = [],
    clause_rules = {},
    acceptable_connectors = []
  } = answerKey;

  const userStringNormalized = tokensToString(userTokens);

  // 1. Layer 1: Check Exact Matches (Case-insensitive & space-normalized)
  for (const validTokens of valid_structures) {
    const validStringNormalized = tokensToString(validTokens);
    if (userStringNormalized === validStringNormalized) {
      return {
        isCorrect: true,
        isMinorError: false,
        score: 100,
        minorErrors: [],
        diagnosticTag: null,
        feedbackText: 'Xuất sắc! Cấu trúc câu chuẩn xác 100%!'
      };
    }
  }

  // 1b. Layer 1b: Check Acceptable Synonym Connectors (e.g. 'as' / 'since' instead of 'because')
  if (acceptable_connectors.length > 0) {
    for (const validTokens of valid_structures) {
      for (const altConnector of acceptable_connectors) {
        // Substitute primary connector in validTokens with altConnector
        const substitutedValid = validTokens.map((tok) => {
          const lower = tok.toLowerCase();
          if (clause_rules.connector && clause_rules.connector.includes(lower)) {
            return altConnector;
          }
          return tok;
        });
        if (userStringNormalized === tokensToString(substitutedValid)) {
          return {
            isCorrect: true,
            isMinorError: false,
            score: 100,
            minorErrors: [],
            diagnosticTag: 'acceptable_connector_synonym',
            feedbackText: `Chính xác! Bạn dùng từ nối đồng nghĩa "${altConnector}" rất hay!`
          };
        }
      }
    }
  }

  // 2. Layer 2: Check Minor Error - Comma Omission or Punctuation Placement
  const userNoPunct = userTokens.filter((t) => !/^[.,!?:;]$/.test(t.trim()));
  const userNoPunctStr = userNoPunct.map(normalizeToken).join(' ');

  for (const validTokens of valid_structures) {
    const validNoPunct = validTokens.filter((t) => !/^[.,!?:;]$/.test(t.trim()));
    const validNoPunctStr = validNoPunct.map(normalizeToken).join(' ');

    if (userNoPunctStr === validNoPunctStr) {
      const userHasComma = userTokens.some((t) => t.trim() === ',');
      const validHasComma = validTokens.some((t) => t.trim() === ',');

      if (validHasComma && !userHasComma) {
        return {
          isCorrect: true, // Note: Minor error counts as partially valid (90%) but NOT absolute 100%
          isMinorError: true,
          score: 90,
          minorErrors: ['missing_comma'],
          diagnosticTag: 'minor_comma_omitted',
          feedbackText: 'Đúng ngữ pháp! Nhắc nhỏ: Nên thêm dấu phẩy (,) khi mệnh đề phụ đứng trước.'
        };
      }
    }
  }

  // 3. Layer 3: Diagnostic Feedback for Incorrect Attempt (Feeds Adaptive Logic)
  const userNoPunctTokensLower = userNoPunct.map(normalizeToken);

  // Check specific Past Continuous error: V-ing without was/were auxiliary
  const hasVing = userNoPunctTokensLower.some((w) => w.endsWith('ing') && w.length > 4);
  const hasAuxiliaryWasWere = userNoPunctTokensLower.some((w) => w === 'was' || w === 'were');

  if (hasVing && !hasAuxiliaryWasWere) {
    return {
      isCorrect: false,
      isMinorError: false,
      score: 0,
      minorErrors: [],
      diagnosticTag: 'past_cont_missing_was',
      feedbackText: 'Thiếu trợ động từ WAS/WERE trước động từ thêm -ING trong thì Quá khứ tiếp diễn!'
    };
  }

  // Check if all correct words are present but order is wrong
  const targetTokensAll = valid_structures[0] || [];
  const targetWordsNoPunct = new Set(
    targetTokensAll.filter((t) => !/^[.,!?:;]$/.test(t.trim())).map(normalizeToken)
  );

  const missingWords = [...targetWordsNoPunct].filter(
    (w) => !userNoPunctTokensLower.includes(w)
  );

  if (missingWords.length === 0) {
    return {
      isCorrect: false,
      isMinorError: false,
      score: 0,
      minorErrors: [],
      diagnosticTag: 'word_order_incorrect',
      feedbackText: 'Các từ đã đủ nhưng thứ tự câu chưa chuẩn. Thử sắp xếp lại nhé!'
    };
  }

  return {
    isCorrect: false,
    isMinorError: false,
    score: 0,
    minorErrors: [],
    diagnosticTag: 'missing_target_words',
    feedbackText: 'Câu chưa chính xác. Bạn thử quan sát kỹ từ nối và các khối từ!'
  };
}
