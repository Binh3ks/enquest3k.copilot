import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Sparkles, BookOpen, Tag, HelpCircle } from 'lucide-react';
import HoverWord, { renderParsedText } from '../common/HoverWord';
import CompletionModal from '../common/CompletionModal';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import { useUserStore } from '../../stores/useUserStore';

export function RWPart3ClozeWithTitle({ customData, data: propData, onComplete }) {
  const [answers, setAnswers] = useState({});
  const [selectedGap, setSelectedGap] = useState(2);
  const [selectedTitleIdx, setSelectedTitleIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const activeData = customData || propData || {};

  const example = activeData?.example || {
    blank: 1,
    answer: "excited",
    word_bank: ["excited", "surprise", "late", "bored", "deepest", "somewhere", "worst", "ago", "explored", "traffic"]
  };

  const wordBank = useMemo(() => {
    return example.word_bank || ["excited", "surprise", "late", "bored", "deepest", "somewhere", "worst", "ago", "explored", "traffic"];
  }, [example]);

  const blanks = useMemo(() => {
    return activeData?.blanks || [
      { id: 2, answer: "traffic" },
      { id: 3, answer: "somewhere" },
      { id: 4, answer: "late" },
      { id: 5, answer: "worst" },
      { id: 6, answer: "surprise" }
    ];
  }, [activeData]);

  const titleOptions = useMemo(() => {
    return activeData?.title_options || [
      { text: "Holly's long journey", isCorrect: true },
      { text: "Grandma's new house", isCorrect: false },
      { text: "Dad's fast car", isCorrect: false }
    ];
  }, [activeData]);

  // Story text segments broken by ___
  const storySegments = useMemo(() => {
    const rawStory = activeData?.story_text || "";
    return rawStory.split("___");
  }, [activeData]);

  const handleSelectWord = (word) => {
    if (isSubmitted) return;
    if (selectedGap) {
      setAnswers(prev => ({ ...prev, [selectedGap]: word }));
      // Advance to next unfilled gap
      const nextGap = blanks.find(b => b.id > selectedGap && !answers[b.id]);
      if (nextGap) {
        setSelectedGap(nextGap.id);
      }
    }
  };

  const handleClearGap = (gapId, e) => {
    e.stopPropagation();
    if (isSubmitted) return;
    setAnswers(prev => {
      const copy = { ...prev };
      delete copy[gapId];
      return copy;
    });
  };

  const handleCheck = () => {
    let correct = 0;
    blanks.forEach(b => {
      const userVal = (answers[b.id] || '').trim().toLowerCase();
      const targetVal = (b.answer || '').trim().toLowerCase();
      if (userVal === targetVal) correct++;
    });

    const isTitleCorrect = selectedTitleIdx !== null && titleOptions[selectedTitleIdx]?.isCorrect;
    if (isTitleCorrect) correct++;

    const totalQuestions = blanks.length + 1; // 5 blanks + 1 title
    const finalScore = Math.round((correct / totalQuestions) * 100);
    setScore(finalScore);
    setIsSubmitted(true);

    if (finalScore >= 80) {
      fireCelebrationConfetti('RWPart3_Complete');
    }

    if (onComplete) onComplete(finalScore);
  };

  const handleReset = () => {
    setAnswers({});
    setSelectedGap(2);
    setSelectedTitleIdx(null);
    setIsSubmitted(false);
    setScore(null);
  };

  const starsEarned = (score || 0) >= 80 ? 3 : (score || 0) >= 60 ? 2 : 1;

  return (
    <div className="w-full max-w-7xl mx-auto my-4 p-4 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans space-y-6">
      <CompletionModal
        isOpen={isSubmitted && (score || 0) >= 50}
        onClose={() => {}}
        score={score || 0}
        stars={starsEarned}
        xpEarned={50}
        srsWordsAdded={5}
        activityTitle="Story Gap-Fill & Title (R&W Part 3)"
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
        <div>
          <span className="px-3 py-1 bg-amber-100 text-amber-900 text-[11px] font-black rounded-full uppercase tracking-wider">
            Flyers Practice
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Story Gap-Fill with Word Bank & Title Selection
          </h2>
          <p className="text-xs text-amber-800 font-bold mt-0.5">
            Read the story. Choose a word from the box. Write the correct word next to numbers 1–5. There is one example.
          </p>
        </div>
        <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-black rounded-xl border border-slate-200">
          5 Gaps · 10 Word Bank · 1 Title
        </span>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Continuous Story Cloze */}
        <div className="lg:col-span-8 space-y-4">
          <div className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen size={15} className="text-amber-600" /> Story Passage:
          </div>

          <div className="p-5 sm:p-6 rounded-2xl border-2 border-slate-200 bg-slate-50/70 leading-loose text-sm sm:text-base text-slate-900 space-y-4 shadow-xs">
            {/* Example row note */}
            <div data-testid="example-row" className="p-3 bg-amber-100/90 rounded-xl border border-amber-300 text-xs text-amber-950 font-bold flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-500 text-white font-black text-[10px] rounded-md shrink-0">
                ★ EXAMPLE
              </span>
              <span>Gap (1): <strong className="underline text-amber-900 font-black">{example.answer}</strong> (Pre-filled example)</span>
            </div>

            <div className="leading-loose">
              {storySegments.map((segment, idx) => {
                if (idx === 0) {
                  return (
                    <React.Fragment key={idx}>
                      <span>{segment}</span>
                      {/* Blank 1 Example */}
                      <span className="inline-flex items-center px-2.5 py-0.5 mx-1 rounded-lg bg-amber-200 text-amber-950 font-black text-xs sm:text-sm border border-amber-300">
                        (1) {example.answer}
                      </span>
                    </React.Fragment>
                  );
                }

                const gapNum = idx + 1; // blanks 2, 3, 4, 5, 6
                const blankDef = blanks.find(b => b.id === gapNum);
                const assignedWord = answers[gapNum];
                const isSelected = selectedGap === gapNum;
                const isCorrect = isSubmitted && assignedWord?.toLowerCase() === blankDef?.answer?.toLowerCase();

                return (
                  <React.Fragment key={idx}>
                    <span>{segment}</span>
                    {blankDef && (
                      <span
                        onClick={() => !isSubmitted && setSelectedGap(gapNum)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 mx-1 rounded-xl border-2 transition-all cursor-pointer font-black text-xs sm:text-sm ${
                          isSubmitted
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                              : 'bg-rose-100 border-rose-400 text-rose-950'
                            : isSelected
                            ? 'bg-amber-200/90 border-amber-500 ring-2 ring-amber-300 text-amber-950 scale-105'
                            : assignedWord
                            ? 'bg-white border-amber-300 text-slate-900'
                            : 'bg-white border-dashed border-slate-400 text-slate-400 hover:border-amber-400'
                        }`}
                      >
                        <span className="text-[10px] text-amber-700 font-mono">({gapNum})</span>
                        <span>{assignedWord || `[Gap ${gapNum}]`}</span>
                        {assignedWord && !isSubmitted && (
                          <button
                            type="button"
                            onClick={(e) => handleClearGap(gapNum, e)}
                            className="text-slate-400 hover:text-rose-600 text-xs font-bold ml-1"
                          >
                            ✕
                          </button>
                        )}
                        {isSubmitted && (
                          isCorrect ? (
                            <CheckCircle2 size={14} className="text-emerald-600" />
                          ) : (
                            <span className="text-[10px] text-rose-700 font-bold ml-1">({blankDef.answer})</span>
                          )
                        )}
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Title Selection Card */}
          <div className="p-5 rounded-2xl border-2 border-amber-200 bg-amber-50/80 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-amber-500 text-white font-black text-xs flex items-center justify-center">
                6
              </span>
              <h3 className="text-sm font-black text-amber-950">
                Now choose the best name for the story:
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {titleOptions.map((opt, idx) => {
                const isSelected = selectedTitleIdx === idx;
                const isCorrect = isSubmitted && opt.isCorrect;

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => setSelectedTitleIdx(idx)}
                    className={`p-3 rounded-xl border-2 text-left transition-all font-bold text-xs sm:text-sm flex items-center justify-between ${
                      isSubmitted
                        ? opt.isCorrect
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                          : isSelected
                          ? 'bg-rose-100 border-rose-400 text-rose-950'
                          : 'bg-white border-slate-200 opacity-60'
                        : isSelected
                        ? 'bg-amber-200 border-amber-500 text-amber-950 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {isSubmitted && opt.isCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: 10-Word Bank Drawer */}
        <div className="lg:col-span-4 space-y-3 bg-amber-50/60 p-4 sm:p-5 rounded-2xl border-2 border-amber-200 h-fit">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200">
            <span className="text-xs font-black text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <Tag size={15} className="text-amber-600" /> Word Bank (10 Words)
            </span>
            <span className="text-[10px] text-amber-700 font-bold">
              Gap ({selectedGap}) Active
            </span>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Tap a word to place it into the active gap:
          </p>

          <div className="grid grid-cols-2 gap-2">
            {wordBank.map((word, idx) => {
              const isUsed = Object.values(answers).includes(word);

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectWord(word)}
                  className={`p-2.5 rounded-xl border-2 font-bold text-xs transition-all text-center ${
                    isUsed
                      ? 'bg-slate-100 border-slate-300 text-slate-400 opacity-60'
                      : 'bg-white border-amber-300 text-amber-950 hover:bg-amber-100 hover:border-amber-500 shadow-xs active:scale-95'
                  }`}
                >
                  {word}
                </button>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="pt-3">
            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleCheck}
                disabled={Object.keys(answers).length < blanks.length || selectedTitleIdx === null}
                className={`w-full py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 ${
                  Object.keys(answers).length >= blanks.length && selectedTitleIdx !== null
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Sparkles size={16} /> Check Story Answers
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider bg-slate-800 hover:bg-slate-900 text-white transition shadow-md"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RWPart3ClozeWithTitle;
