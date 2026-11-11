import React, { useState } from 'react';
import { BookOpen, CheckCircle2, AlertCircle, RotateCcw, Sparkles } from 'lucide-react';
import { playButtonClick, playCorrectSound, playWrongSound, playVictoryFanfare } from '../../utils/soundEffects';

/**
 * Cambridge B1 Preliminary (PET) Reading Part 3 — Longer Text Multiple Choice
 * Handles `rw_part3` schema: `{ part: 3, title, instructions, text, items: [{ id, question, options, answer }] }`.
 */
export function RWPart3PetMCQ({ data, customData, onComplete }) {
  const activeData = data || customData || {};
  const items = Array.isArray(activeData.items) ? activeData.items : [];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (itemId, optionText) => {
    if (isSubmitted) return;
    playButtonClick();
    setSelectedAnswers((prev) => ({ ...prev, [itemId]: optionText }));
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    const correctCount = items.filter((item) => selectedAnswers[item.id] === item.answer).length;
    if (correctCount === items.length && items.length > 0) {
      playVictoryFanfare();
    } else if (correctCount > 0) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
  };

  const answeredCount = items.filter((item) => Boolean(selectedAnswers[item.id])).length;
  const scoreCount = isSubmitted
    ? items.filter((item) => selectedAnswers[item.id] === item.answer).length
    : 0;
  const paragraphs = String(activeData.text || '').split(/\n+/).filter(Boolean);

  if (items.length === 0 || !activeData.text) {
    return (
      <div className="p-6 bg-rose-50 border-2 border-rose-200 rounded-2xl text-center space-y-2">
        <AlertCircle size={32} className="mx-auto text-rose-500" />
        <p className="text-sm font-black text-rose-900">PET Reading Part 3 data missing.</p>
      </div>
    );
  }

  return (
    <div data-testid="pet-rw-part3" className="space-y-5 font-sans">
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-2xl flex items-start justify-between gap-3 flex-wrap">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-emerald-700">
            <BookOpen size={14} /> Reading Part {activeData.part || 3} • Cambridge B1 Preliminary (PET)
          </div>
          <h3 className="text-base sm:text-lg font-black text-slate-900">{activeData.title || 'Reading Comprehension'}</h3>
          {activeData.instructions && (
            <p className="text-xs sm:text-sm font-medium text-slate-600">{activeData.instructions}</p>
          )}
        </div>
        <div className="px-3 py-1.5 bg-white border border-emerald-200 rounded-xl text-xs font-black text-emerald-900">
          {isSubmitted ? `Score: ${scoreCount}/${items.length}` : `${answeredCount}/${items.length} Answered`}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Reading Passage */}
        <div className="lg:col-span-6 p-5 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-3 leading-relaxed text-sm sm:text-base text-slate-800 max-h-[620px] overflow-y-auto">
          {paragraphs.map((para, idx) => (
            <p key={idx} className="font-medium">
              {para}
            </p>
          ))}
        </div>

        {/* Questions List */}
        <div className="lg:col-span-6 space-y-4">
          {items.map((item, qIdx) => {
            const chosen = selectedAnswers[item.id];
            const isCorrect = isSubmitted && chosen === item.answer;
            return (
              <div
                key={item.id || qIdx}
                data-testid={`pet-rw-p3-q-${item.id || qIdx}`}
                className="p-4 bg-white border-2 border-slate-200 rounded-2xl space-y-2.5 shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-sm font-black text-slate-900">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-black mr-2">
                      {item.id || qIdx + 1}
                    </span>
                    {item.question}
                  </p>
                  {isSubmitted && (
                    isCorrect
                      ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      : <AlertCircle size={18} className="text-rose-500 shrink-0" />
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {(item.options || []).map((opt, optIdx) => {
                    const letter = String.fromCharCode(65 + optIdx);
                    const isSelected = chosen === opt;
                    const isRightOpt = item.answer === opt;
                    let cardCls = 'bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-400';
                    if (isSubmitted) {
                      if (isRightOpt) {
                        cardCls = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-black';
                      } else if (isSelected) {
                        cardCls = 'bg-rose-50 border-rose-400 text-rose-950';
                      } else {
                        cardCls = 'bg-slate-50 border-slate-200 text-slate-500 opacity-70';
                      }
                    } else if (isSelected) {
                      cardCls = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-200';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(item.id, opt)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl border-2 text-xs sm:text-sm transition flex items-start gap-2.5 ${cardCls}`}
                      >
                        <span className="font-mono font-black text-xs px-1.5 py-0.5 rounded bg-white border border-slate-300 shrink-0">
                          {letter}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-1 flex items-center gap-3">
            {!isSubmitted ? (
              <button
                type="button"
                data-testid="pet-rw-p3-check-btn"
                onClick={handleCheck}
                disabled={answeredCount < items.length}
                className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 ${
                  answeredCount >= items.length
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Sparkles size={16} /> Check Part 3 Answers ({answeredCount}/{items.length})
              </button>
            ) : (
              <div className="w-full flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="sm:flex-1 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-slate-800 hover:bg-slate-900 text-white transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw size={16} /> Try Again
                </button>
                {onComplete && (
                  <button
                    type="button"
                    data-testid="pet-rw-p3-complete-btn"
                    onClick={() => onComplete(scoreCount, items.length)}
                    className="sm:flex-1 py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 size={16} /> Complete Part 3 ▶
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RWPart3PetMCQ;

