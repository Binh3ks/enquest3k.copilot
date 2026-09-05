import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, RefreshCw, Layers, BookOpen } from 'lucide-react';
import HoverWord, { renderParsedText } from '../common/HoverWord';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';

function shuffleArray(array) {
  if (!Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function WordBankMatchingGrid({ customData, data: propData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [selectedWord, setSelectedWord] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  const activeData = customData || propData || {};

  // Fisher-Yates Shuffle 15-Word Bank Pool
  const wordBank = useMemo(() => {
    let rawWordBank = activeData?.word_bank;
    if (!rawWordBank && activeData?.words) {
      rawWordBank = activeData.words.map(w => typeof w === 'string' ? w : w.word);
    }
    return shuffleArray(rawWordBank || []);
  }, [activeData, shuffleSeed]);

  const definitions = useMemo(() => {
    const rawDefs = activeData?.definitions || [];
    return rawDefs.map(d => ({
      id: d.id,
      text: d.text || d.prompt,
      target: d.target || d.answer
    }));
  }, [activeData]);


  // Track which words in the 15-word pool have already been assigned
  const usedWords = Object.values(answers).filter(Boolean);

  const handleSelectWord = (word) => {
    if (isSubmitted) return;
    if (selectedWord === word) {
      setSelectedWord(null);
    } else {
      setSelectedWord(word);
    }
  };

  const handleAssignWordToDef = (defId) => {
    if (isSubmitted) return;
    if (selectedWord) {
      setAnswers({ ...answers, [defId]: selectedWord });
      setSelectedWord(null);
    }
  };

  const handleClearDefSlot = (defId, e) => {
    e.stopPropagation();
    if (isSubmitted) return;
    const newAns = { ...answers };
    delete newAns[defId];
    setAnswers(newAns);
  };

  const handleCheck = () => {
    let correct = 0;
    definitions.forEach((def) => {
      const userAns = (answers[def.id] || '').trim().toLowerCase();
      if (userAns === def.target.toLowerCase()) {
        correct++;
      }
    });
    const finalScore = Math.round((correct / definitions.length) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 80) {
      fireCelebrationConfetti('WordBank_Complete');
    }

    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setAnswers({});
    setSelectedWord(null);
    setIsSubmitted(false);
    setScore(null);
    setShuffleSeed((prev) => prev + 1);
  };

  const starsEarned = (score || 0) >= 80 ? 3 : (score || 0) >= 60 ? 2 : 1;

  return (
    <div
      data-testid="word-bank-matching"
      className="word-bank-grid w-full max-w-7xl mx-auto my-1 sm:my-2 p-3 sm:p-5 bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-md font-sans space-y-2.5 sm:space-y-3"
    >
      <CompletionModal
        isOpen={isSubmitted && (score || 0) >= 50}
        onClose={() => {}}
        score={score || 0}
        stars={starsEarned}
        xpEarned={50}
        srsWordsAdded={5}
        activityTitle="Word Match Challenge (R&W Part 1)"
      />
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 border-b border-slate-200 gap-1.5">
        <div>
          <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-900 text-[10.5px] font-black rounded-full uppercase tracking-wider">
            Flyers Practice
          </span>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
            Word Bank Matching
          </h2>
          <p className="text-xs sm:text-sm text-indigo-700 font-bold">
            Look and read. Choose the correct words and write them on the lines. There is one example.
          </p>
        </div>
        <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-black rounded-lg border border-slate-200">
          10 Definitions · 15 Words
        </span>
      </div>

      {/* 📦 Floating 15-Word Bank Pool (Compact 2-Column Mobile Grid, Sticky Dock) */}
      <div className="sticky top-1 z-20 p-2 sm:p-2.5 bg-slate-50/95 backdrop-blur-md rounded-xl border-2 border-indigo-200 shadow-sm space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm font-black text-indigo-800 uppercase tracking-wider flex items-center gap-1.5">
            <Layers size={14} /> 15-Word Bank:
          </span>
          <span className="text-[11px] font-bold text-slate-500 italic">
            Tap word pill, then tap slot below
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 pt-0.5">
          {wordBank.map((word) => {
            const isUsed = usedWords.includes(word);
            const isSelected = selectedWord === word;

            return (
              <button
                key={word}
                disabled={isSubmitted || isUsed}
                onClick={() => handleSelectWord(word)}
                className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-between border shadow-2xs ${
                  isUsed
                    ? 'opacity-40 line-through bg-slate-200 text-slate-500 border-slate-300 cursor-not-allowed'
                    : isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-300 scale-102 shadow-sm font-black'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <span className="truncate">{word}</span>
                {isUsed && <span className="text-[10px] font-mono text-slate-400">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📝 10 Cambridge Definition Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 sm:gap-2">
        {/* Worked Example Definition */}
        <div
          data-testid="example-row"
          className="col-span-1 lg:col-span-2 p-1.5 sm:p-2 rounded-xl border-2 border-amber-300 bg-amber-50/90 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-1.5"
        >
          <div className="flex items-start gap-1.5 flex-1">
            <span className="px-1.5 py-0.5 rounded-md bg-amber-500 text-white font-black text-[9px] uppercase tracking-wider shrink-0 mt-0.5 shadow-2xs">
              ★ EX
            </span>
            <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {activeData?.example?.text || "A quiet room in school with books where students read and borrow stories."}
            </div>
          </div>

          <div className="flex items-center gap-1 self-end sm:self-auto shrink-0">
            <div className="min-w-[100px] sm:min-w-[120px] px-2 py-0.5 rounded-lg border-2 border-amber-400 bg-white text-xs font-black text-center text-amber-950 shadow-inner flex items-center justify-center gap-1">
              <span>{activeData?.example?.target || "library"}</span>
              <span className="text-[8.5px] text-amber-600 font-bold uppercase">(Locked)</span>
            </div>
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          </div>
        </div>

        {definitions.map((def, idx) => {
          const assignedWord = answers[def.id];
          const isCorrect = isSubmitted && assignedWord?.toLowerCase() === def.target.toLowerCase();

          return (
            <div
              key={def.id}
              onClick={() => handleAssignWordToDef(def.id)}
              className={`p-1.5 sm:p-2 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-1.5 cursor-pointer ${
                isSubmitted
                  ? isCorrect
                    ? 'bg-emerald-50/80 border-emerald-300'
                    : 'bg-rose-50/80 border-rose-300'
                  : assignedWord
                  ? 'bg-indigo-50/60 border-indigo-300'
                  : selectedWord
                  ? 'bg-amber-50/60 border-amber-300 hover:bg-amber-100/60'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-2 flex-1">
                <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-900 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {renderParsedText(def.text, 'indigo', null, true)}
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-auto shrink-0">
                <div
                  className={`min-w-[120px] sm:min-w-[140px] px-3 py-1.5 rounded-xl border-2 text-xs sm:text-sm font-black text-center flex items-center justify-between gap-1.5 shadow-inner transition-all ${
                    assignedWord
                      ? 'bg-white border-indigo-400 text-indigo-950'
                      : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  <span className="truncate">{assignedWord || (selectedWord ? '👉 Assign' : 'Tap to slot')}</span>
                  {assignedWord && !isSubmitted && (
                    <button
                      onClick={(e) => handleClearDefSlot(def.id, e)}
                      className="text-slate-400 hover:text-rose-600 text-xs font-bold leading-none ml-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {isSubmitted && (
                  isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      <span className="text-[10px] font-bold text-rose-700">({def.target})</span>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Check & Score */}
      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition active:scale-95 flex items-center justify-center gap-1.5"
          >
            <Sparkles size={16} /> Check Matching Answers
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 animate-bounce" />
              <span className="text-sm sm:text-base font-black text-slate-900">
                Matching Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={13} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WordBankMatchingGrid;
