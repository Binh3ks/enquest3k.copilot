import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertCircle, Sparkles, Trophy, RotateCcw, ChevronRight } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { playCorrectSound, playWrongSound, playButtonClick } from '../../utils/soundEffects';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

export default function MultipleChoice3Pic({ customData, data, weekNumber = 34, onComplete }) {
  const p4Data = customData || data || {};
  const questions = p4Data.questions || [];

  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const currentQ = questions[currentQIdx] || questions[0];

  if (!currentQ) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <p className="text-sm font-bold text-slate-500">No questions available for Listening Part 4.</p>
      </div>
    );
  }

  const handleSelectOption = (letter) => {
    if (showFeedback) return;
    playButtonClick();
    const isCorrect = letter === currentQ.answer;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: letter }));
    setShowFeedback(true);

    if (isCorrect) {
      playCorrectSound();
      setScore(prev => prev + 1);
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentQIdx + 1 < questions.length) {
      setCurrentQIdx(prev => prev + 1);
    } else {
      fireCelebrationConfetti('P4_Complete');
      if (onComplete) onComplete(score + 1);
    }
  };

  const selected = selectedAnswers[currentQ.id];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 font-sans text-slate-900 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-2xl">
        <div className="flex items-center gap-2">
          <span className="text-base">🎧</span>
          <div>
            <h4 className="text-xs font-black text-blue-950 uppercase tracking-wider">Cambridge A2 Flyers — Listening Part 4</h4>
            <p className="text-[10px] text-blue-700 font-bold">Listen and tick the box. There is one example.</p>
          </div>
        </div>
        <div className="text-xs font-black text-blue-900 bg-white px-3 py-1 rounded-xl border border-blue-200">
          Question {currentQIdx + 1} / {questions.length}
        </div>
      </div>

      {/* Question prompt & Audio button */}
      <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm flex items-center justify-between gap-3">
        <div className="text-sm sm:text-base font-black text-slate-900">
          {currentQ.question_en}
        </div>
        <button
          type="button"
          onClick={() => speakText(currentQ.question_en)}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition shrink-0"
        >
          <Volume2 size={15} /> Listen
        </button>
      </div>

      {/* 3-Picture Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {currentQ.options?.map((opt) => {
          const isSelected = selected === opt.letter;
          const isCorrect = opt.letter === currentQ.answer;

          let btnClass = "bg-white border-2 border-slate-200 hover:border-blue-400 hover:scale-[1.02]";
          if (showFeedback) {
            if (isCorrect) {
              btnClass = "bg-emerald-50 border-2 border-emerald-500 ring-4 ring-emerald-200 scale-[1.02]";
            } else if (isSelected) {
              btnClass = "bg-rose-50 border-2 border-rose-500 ring-4 ring-rose-200";
            } else {
              btnClass = "bg-slate-50 border-slate-200 opacity-50";
            }
          } else if (isSelected) {
            btnClass = "bg-blue-50 border-2 border-blue-500 ring-4 ring-blue-200";
          }

          return (
            <button
              key={opt.letter}
              type="button"
              disabled={showFeedback}
              onClick={() => handleSelectOption(opt.letter)}
              className={`p-3 rounded-2xl flex flex-col items-center gap-2.5 text-center transition-all cursor-pointer shadow-sm ${btnClass}`}
            >
              {/* Picture frame */}
              <div className="w-full aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative">
                <img
                  src={opt.image_url}
                  alt={opt.text}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => { e.target.src = '/images/scenes/default_story.jpg'; }}
                />
                <span className="absolute top-2 left-2 w-6 h-6 rounded-full bg-slate-900/80 text-white font-black text-xs flex items-center justify-center shadow">
                  {opt.letter}
                </span>
              </div>
              <span className="text-xs font-black text-slate-800 leading-snug">
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback bar & Next button */}
      {showFeedback && (
        <div className="p-3 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 text-xs font-bold pl-2">
            {selected === currentQ.answer ? (
              <span className="text-emerald-400 font-black flex items-center gap-1">
                <CheckCircle2 size={16} /> Correct! Well done!
              </span>
            ) : (
              <span className="text-rose-400 font-black flex items-center gap-1">
                <AlertCircle size={16} /> Correct answer is ({currentQ.answer})
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl text-xs font-black shadow-md transition active:scale-95 flex items-center gap-1.5"
          >
            {currentQIdx + 1 < questions.length ? 'Next Question ▶' : 'Finish Part 4 🏆'}
          </button>
        </div>
      )}
    </div>
  );
}
