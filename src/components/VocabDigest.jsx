/**
 * src/components/VocabDigest.jsx — End-of-week Vocab Check (Sprint S2.1)
 *
 * Shown inside VocabManager when all cards are complete.
 * Quick fill-in-the-blank test for 5 words from the current week.
 * Results are NOT gated — it's a formative check only.
 *
 * Props:
 *   vocabList   {Object[]}  — the week's vocab array (each has .word, .definition_en)
 *   weekNumber  {number}
 *   themeColor  {string}
 *   isVi        {boolean}
 */

import React, { useState, useMemo } from 'react';
import { CheckCircle, XCircle, RefreshCw, Star } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestion(wordObj, allWords) {
  // Cloze format: show first letter + blanks, then definition as context
  const word = wordObj.word;
  const blank = word[0] + '_ '.repeat(word.length - 1).trim();
  return {
    id: wordObj.id,
    word,
    blank,
    clue: wordObj.definition_en,
    clue_vi: wordObj.definition_vi || '',
  };
}

// ─────────────────────────────────────────────────────────────
// Single question row
// ─────────────────────────────────────────────────────────────
function QuestionRow({ q, idx, isVi, onAnswer }) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null); // null | 'correct' | 'wrong'

  const handleCheck = () => {
    if (!value.trim()) return;
    const correct = value.trim().toLowerCase() === q.word.toLowerCase();
    setResult(correct ? 'correct' : 'wrong');
    onAnswer(q.id, correct);
  };

  return (
    <div className={`rounded-2xl border-2 p-4 transition-all ${
      result === 'correct' ? 'bg-green-50 border-green-200'
      : result === 'wrong' ? 'bg-rose-50 border-rose-200'
      : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-start gap-3">
        <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 font-black text-sm flex items-center justify-center flex-shrink-0">
          {idx + 1}
        </span>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-700 mb-1">
            {isVi ? q.clue_vi || q.clue : q.clue}
          </p>
          <p className="text-[11px] text-slate-400 mb-2 font-mono">
            Hint: {q.blank}
          </p>
          {result === null ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleCheck()}
                placeholder={isVi ? 'Gõ từ...' : 'Type the word...'}
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck="false"
                className="flex-1 px-3 py-2 text-sm border-2 border-slate-200 rounded-xl focus:border-indigo-400 focus:outline-none"
              />
              <button
                onClick={handleCheck}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black hover:bg-indigo-700 transition-all"
              >
                {isVi ? 'Kiểm tra' : 'Check'}
              </button>
            </div>
          ) : (
            <div className={`flex items-center gap-2 text-sm font-bold ${result === 'correct' ? 'text-green-700' : 'text-rose-700'}`}>
              {result === 'correct'
                ? <><CheckCircle size={16} /> {isVi ? 'Đúng!' : 'Correct!'}</>
                : <><XCircle size={16} /> {isVi ? `Đáp án: ${q.word}` : `Answer: ${q.word}`}</>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
const VocabDigest = ({ vocabList = [], weekNumber, themeColor = 'orange', isVi = false }) => {
  const [answeredIds, setAnsweredIds] = useState({});   // { id: true|false }
  const [resetKey, setResetKey] = useState(0);

  const questions = useMemo(() => {
    const pool = shuffle(vocabList).slice(0, 5);
    return pool.map(w => buildQuestion(w, vocabList));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vocabList, resetKey]);

  const handleAnswer = (id, correct) => {
    setAnsweredIds(prev => ({ ...prev, [id]: correct }));
  };

  const answeredCount = Object.keys(answeredIds).length;
  const correctCount  = Object.values(answeredIds).filter(Boolean).length;
  const allDone       = answeredCount === questions.length;

  const handleReset = () => {
    setAnsweredIds({});
    setResetKey(k => k + 1);
  };

  return (
    <div className={`mt-10 bg-${themeColor}-50 border-2 border-${themeColor}-100 rounded-3xl p-6`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Star size={20} className={`text-${themeColor}-500`} />
          <h3 className={`text-base font-black text-${themeColor}-800 uppercase`}>
            {isVi ? 'Kiểm tra nhanh' : 'Vocab Digest'}
          </h3>
        </div>
        {allDone && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-700 transition-all"
          >
            <RefreshCw size={13} />
            {isVi ? 'Thử lại' : 'Retry'}
          </button>
        )}
      </div>

      <p className="text-sm text-slate-500 mb-4 font-medium">
        {isVi
          ? `Điền vào ô trống để kiểm tra ${questions.length} từ của tuần này.`
          : `Fill in the blanks to check ${questions.length} words from this week.`}
      </p>

      {/* Questions */}
      <div className="flex flex-col gap-3" key={resetKey}>
        {questions.map((q, idx) => (
          <QuestionRow
            key={q.id}
            q={q}
            idx={idx}
            isVi={isVi}
            onAnswer={handleAnswer}
          />
        ))}
      </div>

      {/* Result summary */}
      {allDone && (
        <div className={`mt-5 p-4 rounded-2xl text-center font-black ${
          correctCount === questions.length
            ? 'bg-green-100 text-green-800'
            : correctCount >= Math.ceil(questions.length * 0.6)
              ? 'bg-amber-100 text-amber-800'
              : 'bg-rose-100 text-rose-800'
        }`}>
          <p className="text-2xl mb-1">
            {correctCount}/{questions.length}
            {correctCount === questions.length ? ' 🎉' : ''}
          </p>
          <p className="text-sm font-bold">
            {correctCount === questions.length
              ? (isVi ? 'Xuất sắc! Từ đã được thêm vào ôn tập SRS.' : 'Perfect! Words added to SRS review.')
              : correctCount >= Math.ceil(questions.length * 0.6)
                ? (isVi ? 'Tốt! Tiếp tục luyện tập.' : 'Good job! Keep practising.')
                : (isVi ? 'Ôn lại các từ này nhé.' : 'Review these words again.')
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default VocabDigest;
