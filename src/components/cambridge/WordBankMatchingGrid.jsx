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

export function WordBankMatchingGrid({ customData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [selectedWord, setSelectedWord] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Fisher-Yates Shuffle 15-Word Bank Pool
  const wordBank = useMemo(() => {
    const rawWordBank = customData?.word_bank || [
      "corridor", "nurse", "bandage", "headmaster", "puddle",
      "library", "cafeteria", "handrail", "warning sign", "first-aid kit",
      "playground", "stairs", "slippery", "cold pack", "science room"
    ];
    return shuffleArray(rawWordBank);
  }, [customData, shuffleSeed]);

  const definitions = customData?.definitions || [
    { id: 1, text: "You walk along this long passage inside a school building to get to your classroom.", target: "corridor" },
    { id: 2, text: "A trained medical worker at school who helps students when they get hurt.", target: "nurse" },
    { id: 3, text: "A soft piece of cloth used to cover and protect a cut or knee injury.", target: "bandage" },
    { id: 4, text: "The person in charge of managing the school who praises students for safe behaviour.", target: "headmaster" },
    { id: 5, text: "A small pool of liquid left on the floor after cleaning or rain.", target: "puddle" },
    { id: 6, text: "A quiet room in school with books where students read and borrow stories.", target: "library" },
    { id: 7, text: "A large room at school where children eat lunch and talk with friends.", target: "cafeteria" },
    { id: 8, text: "You hold onto this long metal bar when walking up or down stairs.", target: "handrail" },
    { id: 9, text: "A yellow sign placed on the floor to warn people to walk carefully on wet tiles.", target: "warning sign" },
    { id: 10, text: "A bag or box containing bandages and cold packs used for immediate medical aid at school.", target: "first-aid kit" }
  ];


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
    const userStore = useUserStore?.getState ? useUserStore.getState() : null;
    if (userStore?.addXP) userStore.addXP(50);

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
    <div className="w-full max-w-5xl mx-auto my-4 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            🧩 WORD MATCH CHALLENGE
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Word Bank Matching (15 Words & 10 Definitions)
          </h2>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          10 Definitions · 15 Candidate Words
        </span>
      </div>

      {/* 📦 Floating 15-Word Bank Pool (Visual Elimination Effect) */}
      <div className="p-4 bg-slate-50 rounded-2xl border-2 border-indigo-100 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black text-indigo-700 uppercase tracking-widest flex items-center gap-1.5">
            <Layers size={15} /> 15-Word Bank Pool:
          </span>
          <span className="text-[11px] font-bold text-slate-500 italic">
            Click a word pill, then click a definition slot below
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {wordBank.map((word) => {
            const isUsed = usedWords.includes(word);
            const isSelected = selectedWord === word;

            return (
              <button
                key={word}
                disabled={isSubmitted || isUsed}
                onClick={() => handleSelectWord(word)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 border shadow-sm ${
                  isUsed
                    ? 'opacity-40 line-through bg-slate-200 text-slate-500 border-slate-300 cursor-not-allowed'
                    : isSelected
                    ? 'bg-indigo-600 text-white border-indigo-700 ring-4 ring-indigo-200 scale-105 shadow-md'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-indigo-400 hover:bg-indigo-50'
                }`}
              >
                <span>{word}</span>
                {isUsed && <span className="text-[9px] font-mono text-slate-400">(Used)</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 📜 10 Definition Sentences Form */}
      <div className="space-y-3">
        {definitions.map((def, idx) => {
          const assignedWord = answers[def.id];
          const isCorrect = isSubmitted && assignedWord?.toLowerCase() === def.target.toLowerCase();

          return (
            <div
              key={def.id}
              onClick={() => handleAssignWordToDef(def.id)}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer ${
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
              <div className="flex items-start gap-3 flex-1">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-900 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                  {renderParsedText(def.text, 'indigo', null, true)}
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <div
                  className={`min-w-[140px] px-3.5 py-2 rounded-xl border-2 text-xs font-black text-center flex items-center justify-between gap-2 shadow-inner transition-all ${
                    assignedWord
                      ? 'bg-white border-indigo-400 text-indigo-950'
                      : 'bg-slate-100 border-dashed border-slate-300 text-slate-400'
                  }`}
                >
                  <span>{assignedWord || (selectedWord ? 'Click to Assign' : 'Select Word')}</span>
                  {assignedWord && !isSubmitted && (
                    <button
                      onClick={(e) => handleClearDefSlot(def.id, e)}
                      className="text-slate-400 hover:text-rose-600 text-sm font-bold leading-none"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {isSubmitted && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  ) : (
                    <div className="flex items-center gap-1">
                      <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      <span className="text-[11px] font-bold text-rose-700">({def.target})</span>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Check & Score */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            onClick={handleCheck}
            className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Check Matching Answers
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-500 animate-bounce" />
              <span className="text-lg font-black text-slate-900">
                Matching Score: {score}%
              </span>
            </div>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WordBankMatchingGrid;
