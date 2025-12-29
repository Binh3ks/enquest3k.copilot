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

  let targets = Array.isArray(correctAnswers) ? correctAnswers.map(t => t.toString().trim()) : [correctAnswers.toString().trim()];

  // --- MODE CRITICAL (Ask AI / Explore Critical) ---
  if (mode === 'critical') {
    const words = inputOriginal.split(/\s+/);
    
    // 1. Check độ dài
    if (words.length < 3) return { isCorrect: false, status: 'warning', message: 'Hãy viết câu dài hơn (ít nhất 3 từ).' };
    
    // 2. Check Viết hoa đầu câu
    if (!/^[A-Z]/.test(inputOriginal)) return { isCorrect: true, status: 'warning', message: 'Lưu ý: Viết hoa chữ cái đầu câu.', isPass: true };
    
    // 3. Check Dấu câu (nếu là câu hỏi trong Ask AI, hoặc câu trần thuật trong Explore)
    // Để đơn giản và linh hoạt, ta chỉ cảnh báo nếu KHÔNG CÓ dấu kết thúc câu nào cả
    if (!/[.!?]$/.test(inputOriginal)) return { isCorrect: true, status: 'warning', message: 'Đừng quên dấu câu kết thúc (./?./!).', isPass: true };

    // Nếu qua được các check cơ bản -> Perfect!
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
      // More lenient: allow 20% errors instead of 15%
      const allowedErrors = Math.max(2, Math.floor(normT.length * 0.20));

      if (normInput === normT) {
        bestMatch = t; matchType = 'exact'; break;
      } else if (distance <= allowedErrors) {
        bestMatch = t; matchType = 'fuzzy'; break;
      } else if ((mode === 'academic' || mode === 'explore') && normInput.length >= 3) {
         // Check if key words match (more flexible matching)
         const tWords = normT.split(' ').filter(w => w.length > 2);
         const iWords = normInput.split(' ').filter(w => w.length > 2);
         const commonWords = tWords.filter(w => iWords.includes(w));
         // If 60%+ of target's key words are in input, consider it a match
         if (commonWords.length >= tWords.length * 0.6 && tWords.length > 0) {
            bestMatch = t; matchType = 'subset'; break;
         }
         // Original regex checks
         const regex = new RegExp(`\\b${normT}\\b`, 'i');
         if (regex.test(normInput)) { bestMatch = t; matchType = 'subset'; break; }
         const regexRev = new RegExp(`\\b${normInput}\\b`, 'i'); 
         if (regexRev.test(normT)) { bestMatch = t; matchType = 'subset'; break; }
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
        if (tWords.length >= 3 && iWords.length < 2) return { isCorrect: true, status: 'warning', message: 'Hãy viết câu đầy đủ (Full sentence).' };
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
       if (/[.!?]/.test(lastCharT) && inputOriginal.split(' ').length >= 3) {
           if (!/[.!?]/.test(lastCharI)) errors.push(`Thiếu dấu câu cuối (${lastCharT})`);
           else if (lastCharI !== lastCharT && mode === 'strict') errors.push(`Sai dấu câu (phải là ${lastCharT})`);
       }

       if (errors.length > 0) return { isCorrect: true, status: 'warning', message: `Đúng từ, nhưng: ${errors.join(' & ')}` };
    }

    return { isCorrect: true, status: 'perfect', message: 'Chính xác tuyệt đối!' };
  }

  // --- KHÔNG TÌM THẤY MATCH - Kiểm tra grammar/spelling trước khi báo sai ---
  const grammarErrors = [];
  
  // Check viết hoa đầu câu
  if (!/^[A-Z]/.test(inputOriginal) && /[a-z]/.test(inputOriginal.charAt(0))) {
    grammarErrors.push('Viết hoa chữ đầu câu');
  }
  
  // Check dấu câu cuối (nếu câu dài >= 3 từ)
  if (inputOriginal.split(' ').length >= 3 && !/[.!?]$/.test(inputOriginal)) {
    grammarErrors.push('Thiếu dấu câu cuối (./?/!)');
  }

  const primeTarget = normalize(targets[0]);
  const tWords = primeTarget.split(' ');
  const iWords = normInput.split(' ');
  const intersection = tWords.filter(w => iWords.includes(w));
  
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
