/* SMART CHECK ENGINE v18.0 (CRITICAL THINKING POLISHED) */

const getLevenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
  for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
      }
    }
  }
  return matrix[b.length][a.length];
};

export const analyzeAnswer = (userInput, correctAnswers, mode = 'strict', unit = '') => {
  // 0. GUARD
  if (userInput === null || userInput === undefined || userInput.toString().trim() === '') {
    return { isCorrect: false, status: 'empty', message: 'Hãy nhập câu trả lời.' };
  }

  let inputOriginal = userInput.toString().trim();
  inputOriginal = inputOriginal.replace(/\s+/g, ' '); 

  if (!correctAnswers) {
    return { isCorrect: true, status: 'perfect', message: 'Chính xác!' };
  }

  let targets = Array.isArray(correctAnswers)
    ? correctAnswers.filter(Boolean).map(t => t.toString().trim())
    : [correctAnswers.toString().trim()];

  // --- MODE SPEECH (SpeechRecognition input — tolerant but word-accurate) ---
  // Philosophy: STT noise in short function words is OK. Wrong CONTENT words must fail.
  // Guard: every content word (≥4 chars) in target must have a close match (Lev ≤ 1) in input.
  // This catches "pot"≠"past" (Lev=2) and "server"≠"soft" (Lev=5) regardless of sentence length.
  if (mode === 'speech') {
    const normSpeech = (text) => {
      let str = text.toLowerCase().trim();
      str = str.replace(/\bwhat's\b/g, 'what is').replace(/\bit's\b/g, 'it is').replace(/\bi'm\b/g, 'i am')
               .replace(/\bdon't\b/g, 'do not').replace(/\bcan't\b/g, 'cannot').replace(/\bisn't\b/g, 'is not');
      return str.replace(/[.,!?;:"()\-]/g, '').replace(/\s+/g, ' ').trim();
    };

    // Every content word (≥4 chars) in target must have a near-match (Lev ≤ 1) in input words.
    // Lev ≤ 1 catches minor STT glitches ("babie"→"baby") but rejects wrong words ("pot"→"past" Lev=2).
    const allContentWordsPresent = (inputStr, targetStr) => {
      const iWords = inputStr.split(' ');
      const cWords = targetStr.split(' ').filter(w => w.length >= 4);
      return cWords.every(cw => iWords.some(iw => iw === cw || getLevenshteinDistance(cw, iw) <= 1));
    };

    const ns = normSpeech(inputOriginal);
    for (const t of targets) {
      const nt = normSpeech(t);
      // 1. Exact normalized match
      if (ns === nt) return { isCorrect: true, status: 'perfect', message: 'Chính xác tuyệt đối! 🌟' };
      // 2. Content-word guard — if any key word is wrong, reject immediately
      if (!allContentWordsPresent(ns, nt)) continue;
      // 3. Levenshtein ≤ 15% (handles dropped articles, minor function word noise)
      const dist = getLevenshteinDistance(ns, nt);
      if (dist <= Math.max(2, Math.floor(nt.length * 0.15))) {
        return { isCorrect: true, status: 'good', message: 'Rất tốt! Nghe rõ rồi 👏' };
      }
      // 4. Word overlap ≥ 88% (all key words present, minor extras/missing articles)
      const tWords = nt.split(' ').filter(w => w.length > 1);
      const sWordSet = new Set(ns.split(' '));
      const overlap = tWords.length > 0 ? tWords.filter(w => sWordSet.has(w)).length / tWords.length : 0;
      if (overlap >= 0.88) {
        return { isCorrect: true, status: 'good', message: 'Rất tốt! Nghe rõ rồi 👏' };
      }
    }
    return { isCorrect: false, status: 'warning', message: 'Chưa nghe rõ. Nói to và rõ hơn nhé! 🎤' };
  }

  // --- MODE CRITICAL (Ask AI / Explore Critical) ---
  if (mode === 'critical') {
    const words = inputOriginal.split(/\s+/);
    
    // 1. Check độ dài
    if (words.length < 3) return { isCorrect: false, status: 'warning', message: 'Hãy viết câu dài hơn (ít nhất 3 từ).' };
    
    // 2. Check Viết hoa đầu câu
    if (!/^[A-Z]/.test(inputOriginal)) return { isCorrect: false, status: 'warning', message: 'Lưu ý: Viết hoa chữ cái đầu câu.' };
    
    // 3. Check dấu câu kết thúc
    if (!/[.!?]$/.test(inputOriginal)) return { isCorrect: false, status: 'warning', message: 'Đừng quên dấu câu kết thúc (./?/!).' };

    // 4. If a real target is provided, verify content words match
    // (targets is non-empty and not a placeholder like the input itself)
    const hasRealTarget = targets.length > 0 && targets[0] !== '' && targets[0] !== inputOriginal;
    if (hasRealTarget) {
      const normC = (t) => t.toLowerCase().replace(/[.,!?;:"()\-]/g, '').replace(/\s+/g, ' ').trim();
      const normInput = normC(inputOriginal);
      const iWords = normInput.split(' ');
      for (const t of targets) {
        const normT = normC(t);
        const tWords = normT.split(' ');
        const contentWords = tWords.filter(w => w.length >= 4);
        if (contentWords.length === 0) {
          // All words < 4 chars (very short sentence) — fall back to Levenshtein
          const dist = getLevenshteinDistance(normInput, normT);
          const allowed = Math.max(2, Math.floor(normT.length * 0.15));
          if (dist <= allowed) return { isCorrect: true, status: 'perfect', message: 'Tuyệt vời! Câu trả lời tốt.', isPass: true };
        } else {
          // All content words (≥4 chars) must appear in input (Lev ≤ 1 for minor typos)
          const allPresent = contentWords.every(cw =>
            iWords.some(iw => iw === cw || getLevenshteinDistance(cw, iw) <= 1)
          );
          if (allPresent) return { isCorrect: true, status: 'perfect', message: 'Tuyệt vời! Câu trả lời tốt.', isPass: true };
        }
      }
      return { isCorrect: false, status: 'warning', message: 'Chưa đúng nội dung. Kiểm tra lại từ khóa.' };
    }

    // No real target (open-ended) → structure OK is enough
    return { isCorrect: true, status: 'perfect', message: 'Tuyệt vời! Câu trả lời tốt.', isPass: true };
  }

  // 1. NORMALIZE
  const normalize = (text) => {
    let str = text.toLowerCase().trim();
    str = str.replace(/\bwhat's\b/g, "what is").replace(/\bit's\b/g, "it is").replace(/\bi'm\b/g, "i am")
             .replace(/\bdon't\b/g, "do not").replace(/\bcan't\b/g, "cannot").replace(/\bisn't\b/g, "is not");
    return str.replace(/[.,!?;:"()\-]/g, '').replace(/\s+/g, ' ');
  };

  const normInput = normalize(inputOriginal);
  let bestMatch = null;
  let matchType = 'none';

  // --- MODE MATH ---
  if (mode === 'math' || mode === 'logic') {
    const inputNums = normInput.match(/\d+/g);
    if (inputNums) {
        const inputVal = inputNums.join('');
        for (let t of targets) {
            const targetNums = normalize(t).match(/\d+/g);
            if (targetNums && targetNums.join('') === inputVal) { bestMatch = t; matchType = 'number'; break; }
        }
    }
    if (!bestMatch) {
       for (let t of targets) { if (normalize(t) === normInput) { bestMatch = t; matchType = 'exact'; break; } }
    }
  } 
  
  // --- MODE TEXT ---
  if (!bestMatch) {
    for (let t of targets) {
      const normT = normalize(t);
      const distance = getLevenshteinDistance(normInput, normT);
      // Allow 15% character-edit distance for minor typos
      const allowedErrors = Math.max(2, Math.floor(normT.length * 0.15));

      if (normInput === normT) {
        bestMatch = t; matchType = 'exact'; break;
      } else if (distance <= allowedErrors) {
        bestMatch = t; matchType = 'fuzzy'; break;
      } else if ((mode === 'academic' || mode === 'explore') && normInput.length >= 3) {
         // Check if key words match (more flexible matching)
         // 🔧 FIX: For mindmap-style sentences, DON'T filter out short words/numbers
         const tWords = normT.split(' ');
         const iWords = normInput.split(' ');
         
         // If sentences are similar length (mindmap fill-in-blank), require stricter match
         const isMindmapStyle = Math.abs(tWords.length - iWords.length) <= 2;
         
         if (isMindmapStyle) {
           // For mindmap: Check ALL words including numbers and short words
           const tWordsSet = new Set(tWords);
           const iWordsSet = new Set(iWords);
           const commonWords = tWords.filter(w => iWordsSet.has(w));
           
           // Require 85% match AND all numbers must match
           const matchPercent = commonWords.length / tWords.length;
           const tNumbers = tWords.filter(w => /\d/.test(w));
           const iNumbers = iWords.filter(w => /\d/.test(w));
           const numbersMatch = tNumbers.length === 0 || tNumbers.every(n => iNumbers.includes(n));
           
           if (matchPercent >= 0.85 && numbersMatch) {
             bestMatch = t; matchType = 'subset'; break;
           }
         } else {
           // For longer answers: 65% key-word overlap (filters >2 chars)
           // Stricter than old 60% — prevents random partial matches
           // but still allows valid concise answers like "The bark felt rough"
           const tWordsFiltered = tWords.filter(w => w.length > 2);
           const iWordsFiltered = iWords.filter(w => w.length > 2);
           const commonWords = tWordsFiltered.filter(w => iWordsFiltered.includes(w));
           if (commonWords.length >= tWordsFiltered.length * 0.65 && tWordsFiltered.length > 0) {
             bestMatch = t; matchType = 'subset'; break;
           }
         }
         // Original regex checks
         const regex = new RegExp(`\\b${normT}\\b`, 'i');
         if (regex.test(normInput)) { bestMatch = t; matchType = 'subset'; break; }
         // Only allow reverse-regex (input found inside target) if input is ≥3 words,
         // to prevent single words like "Her" or "warm" matching inside long answers.
         const iWordsCount = normInput.trim().split(/\s+/).length;
         if (iWordsCount >= 3) {
           const regexRev = new RegExp(`\\b${normInput}\\b`, 'i');
           if (regexRev.test(normT)) { bestMatch = t; matchType = 'subset'; break; }
         }
      }
    }
  }

  // --- KẾT QUẢ ---
  if (bestMatch) {
    if (matchType === 'fuzzy') return { isCorrect: false, status: 'warning', message: `Sai chính tả: "${bestMatch}"` }; 

    if ((mode === 'math' || mode === 'logic') && unit) {
      const normUnit = normalize(unit);
      if (!normInput.includes(normUnit)) return { isCorrect: false, status: 'warning', message: `Thiếu đơn vị từ (ví dụ: ${unit})` };
    }

    if (mode === 'academic' || mode === 'explore') {
        const tWords = normalize(bestMatch).split(' ');
        const iWords = normInput.split(' ');

        // 1. Câu không có subject+verb (< 2 từ không thể tạo câu hoàn chỉnh)
        if (iWords.length < 2) {
          return { isCorrect: false, status: 'warning', message: 'Cần viết câu hoàn chỉnh có chủ ngữ và động từ (e.g., "I am not tall.")' };
        }

        // 2. Thiếu từ khóa quan trọng (content words ≥ 4 ký tự)
        const contentWords = tWords.filter(w => w.length >= 4);
        const missingContent = contentWords.filter(tw =>
          !iWords.some(iw => iw === tw || (iw.length >= 3 && getLevenshteinDistance(iw, tw) <= 1))
        );
        if (missingContent.length > 0) {
          const display = missingContent.slice(0, 3).map(w => `"${w}"`).join(', ');
          return { isCorrect: false, status: 'warning', message: `Câu thiếu từ quan trọng: ${display}. Thử lại nhé!` };
        }
    }

    if (mode === 'strict') {
       const errors = [];
       
       // Bắt buộc viết hoa đầu câu
       if (!/^[A-Z]/.test(inputOriginal)) {
         errors.push('Viết hoa chữ cái đầu câu');
       }
       
       // Bắt buộc dấu câu cuối câu
       if (!/[.!?]$/.test(inputOriginal)) {
         errors.push('Thiếu dấu câu cuối câu (./?/!)');
       }
       
       // Kiểm tra ngữ pháp There was/were
       const firstTwoWords = inputOriginal.split(' ').slice(0, 2).join(' ').toLowerCase();
       if (firstTwoWords === 'there was') {
         // Phải theo sau bởi a/an hoặc danh từ số ít
         const afterWas = inputOriginal.split(' ').slice(2).join(' ');
         if (!/^(a|an)\s/.test(afterWas) && !/^(the)\s/.test(afterWas)) {
           // Check if plural noun (ends with s, es, ies but not 'was' or 'is')
           if (/(s|es|ies)$/.test(afterWas.split(' ')[0]) && !/(was|is|has)$/.test(afterWas.split(' ')[0])) {
             errors.push('Sai ngữ pháp: "There was" phải đi với danh từ số ít (dùng "There were" cho danh từ số nhiều)');
           }
         }
       } else if (firstTwoWords === 'there were') {
         // Phải theo sau bởi danh từ số nhiều (không có a/an)
         const afterWere = inputOriginal.split(' ').slice(2).join(' ');
         if (/^(a|an)\s/.test(afterWere)) {
           errors.push('Sai ngữ pháp: "There were" phải đi với danh từ số nhiều (không dùng a/an)');
         }
       }

       if (errors.length > 0) return { isCorrect: false, status: 'warning', message: errors.join(' & ') };
    }

    if (mode === 'academic' || mode === 'explore' || (mode === 'grammar' && bestMatch.split(' ').length > 3)) {
       const errors = [];
       if (!/^[A-Z]/.test(inputOriginal) && /[a-z]/.test(inputOriginal.charAt(0))) errors.push('Viết hoa chữ đầu');
       
       const lastCharT = bestMatch.slice(-1);
       const lastCharI = inputOriginal.slice(-1);
       // Bắt buộc dấu cuối câu khi target có dấu và input có ≥ 2 từ
       if (/[.!?]/.test(lastCharT) && inputOriginal.split(' ').length >= 2) {
           if (!/[.!?]/.test(lastCharI)) errors.push(`Thiếu dấu câu cuối (${lastCharT})`);
           else if (lastCharI !== lastCharT && mode === 'strict') errors.push(`Sai dấu câu (phải là ${lastCharT})`);
       }

       // isCorrect: false — bắt lỗi thật, không phải chỉ cảnh báo
       if (errors.length > 0) return { isCorrect: false, status: 'warning', message: `Đúng nội dung nhưng: ${errors.join(' & ')}` };
    }

    return { isCorrect: true, status: 'perfect', message: 'Chính xác tuyệt đối!' };
  }

  // --- KHÔNG TÌM THẤY MATCH - Kiểm tra grammar/spelling trước khi báo sai ---
  const grammarErrors = [];
  
  // Check viết hoa đầu câu
  if (!/^[A-Z]/.test(inputOriginal) && /[a-z]/.test(inputOriginal.charAt(0))) {
    grammarErrors.push('Viết hoa chữ đầu câu');
  }
  
  // Check dấu câu cuối (nếu câu có >= 2 từ)
  if (inputOriginal.split(' ').length >= 2 && !/[.!?]$/.test(inputOriginal)) {
    grammarErrors.push('Thiếu dấu câu cuối (./?/!)');
  }

  const primeTarget = normalize(targets[0]);
  const tWords = primeTarget.split(' ');
  const iWords = normInput.split(' ');
  const intersection = tWords.filter(w => iWords.includes(w));

  // --- Academic/Explore: specific structural feedback ---
  if (mode === 'academic' || mode === 'explore') {
    // 1. Câu không có subject+verb (< 2 từ)
    if (iWords.length < 2) {
      const extras = [];
      if (!/^[A-Z]/.test(inputOriginal)) extras.push('viết hoa chữ đầu');
      if (!/[.!?]$/.test(inputOriginal)) extras.push('thêm dấu câu cuối');
      const extraStr = extras.length > 0 ? ` (và ${extras.join(', ')})` : '';
      return {
        isCorrect: false, status: 'warning',
        message: `Cần viết câu hoàn chỉnh có chủ ngữ và động từ.${extraStr}`
      };
    }

    // 2. Thiếu từ khóa quan trọng (content words ≥ 4 ký tự)
    const contentTarget = tWords.filter(w => w.length >= 4);
    const missingContent = contentTarget.filter(tw =>
      !iWords.some(iw => iw === tw || (iw.length >= 3 && getLevenshteinDistance(iw, tw) <= 1))
    );
    if (missingContent.length > 0 && missingContent.length <= 4) {
      const display = missingContent.slice(0, 3).map(w => `"${w}"`).join(', ');
      const grammarNote = grammarErrors.length > 0 ? ` Lưu ý thêm: ${grammarErrors.join(' & ')}.` : '';
      return {
        isCorrect: false, status: 'warning',
        message: `Câu thiếu từ quan trọng: ${display}.${grammarNote} Thử lại nhé!`
      };
    }
  }

  // Gần đúng (50%+ từ khớp)
  if (intersection.length >= tWords.length * 0.5) {
    const msg = grammarErrors.length > 0 
      ? `Gần đúng. ${grammarErrors.join(' & ')}.`
      : 'Gần đúng. Kiểm tra lại ngữ pháp/từ vựng.';
    return { isCorrect: false, status: 'warning', message: msg };
  }
  
  // Hoàn toàn sai - vẫn check grammar nếu có lỗi
  if (grammarErrors.length > 0) {
    return { isCorrect: false, status: 'warning', message: `Chưa đúng. Lưu ý: ${grammarErrors.join(' & ')}.` };
  }

  return { isCorrect: false, status: 'wrong', message: 'Chưa đúng. Thử lại nhé!' };
};
