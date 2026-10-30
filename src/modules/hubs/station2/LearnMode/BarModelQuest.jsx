import React, { useState, useEffect } from 'react';
import { BarModelSVG } from '../components/BarModelSVG';
import { evaluateBarModelAnswer } from '../../../../utils/barModelEvaluator';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import { renderParsedText } from '../../../../components/common/HoverWord';
import { CheckCircle2, AlertCircle, Sparkles, HelpCircle, RefreshCw, Trophy, Timer, Flame, Play, Pause, RotateCcw } from 'lucide-react';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';

export function BarModelQuest({ barModelData, customQuestions, weekNumber, onComplete }) {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'paused' | 'gameover'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(150); // 30s per problem × 5 problems

  const rawQuestions = (Array.isArray(barModelData) && barModelData.length > 0)
    ? barModelData
    : (Array.isArray(barModelData?.problems) && barModelData.problems.length > 0)
      ? barModelData.problems
      : (Array.isArray(customQuestions) && customQuestions.length > 0)
        ? customQuestions
        : null;

  const questions = (rawQuestions && rawQuestions.length > 0) ? rawQuestions.map((q, idx) => ({
    id: q.id || idx + 1,
    title: q.title || `Problem ${idx + 1}: Singapore Bar Model`,
    problemText: q.problemText || q.problem_en || q.text || 'Solve the Bar Model problem below:',
    correctAnswer: q.correctAnswer || q.answer_value || parseInt(q.answer) || 10,
    svg_url: q.svg_url || q.bar_model_svg || `/images/week${weekNumber}/barmodel_w${weekNumber}_adv_p${idx + 1}.svg`,
    modelData: q.modelData || null,
    hintText: q.hintText || `Check the bar model diagram to calculate the target answer!`
  })) : [];

  const currentQ = questions.length > 0 ? (questions[currentIndex] || questions[0]) : null;

  // Timer Engine (Linear 1s countdown, independent of score changes)
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Timeout trigger when timeLeft hits 0
  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      finishGame();
    }
  }, [timeLeft, gameState]);

  const handleStartGame = () => {
    setCurrentIndex(0);
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setCorrectCount(0);
    setTimeLeft(150);
    setGameState('playing');
  };

  const handleTogglePause = () => {
    setGameState(prev => (prev === 'playing' ? 'paused' : 'playing'));
  };

  const finishGame = () => {
    setGameState('gameover');
    const xpEarned = score > 0 ? 40 : 0; // Anti-cheat: 0 XP if 0 points!

    if (score > 0) {
      fireCelebrationConfetti('MathQuest_Victory');
    }

    if (onComplete) onComplete(score);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || gameState !== 'playing') return;

    const evaluation = evaluateBarModelAnswer(userInput, currentQ.correctAnswer);
    if (evaluation.isCorrect) {
      const nextStreak = streak + 1;
      const nextCorrect = correctCount + 1;
      setStreak(nextStreak);
      setCorrectCount(nextCorrect);

      const bonusScore = 20 + nextStreak * 5;
      setScore(prev => prev + bonusScore);

      setFeedback({
        isCorrect: true,
        message: `🎉 Correct! +${bonusScore} PTS (${nextStreak}x Streak Bonus)`
      });

      setTimeout(() => {
        setUserInput('');
        setFeedback(null);
        setShowHint(false);
        if (currentIndex + 1 < questions.length) {
          setCurrentIndex(prev => prev + 1);
        } else {
          finishGame();
        }
      }, 1000);
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: '❌ Not quite right. Check the Bar Model and try again!'
      });
    }
  };

  const xpEarned = score > 0 ? 40 : 0;

  if (!rawQuestions || rawQuestions.length === 0) {
    return (
      <div data-testid="barmodel-data-missing" className="w-full max-w-7xl mx-auto p-8 bg-rose-50 border-2 border-rose-300 rounded-3xl text-center space-y-3 shadow-inner font-sans">
        <AlertCircle size={48} className="mx-auto text-rose-500 animate-pulse" />
        <h3 className="text-xl font-black text-rose-900">⚠️ Math Quest Bar Model Data Missing</h3>
        <p className="text-sm font-semibold text-rose-700">
          No Singapore Math Bar Model problems found for Week {weekNumber || 'N/A'}. Expected data in skill_practice_hub.singapore_math.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-7 bg-white rounded-2xl sm:rounded-3xl border-2 border-amber-300 shadow-xl space-y-4 text-slate-900 font-sans">
      {/* Header Dashboard */}
      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-amber-100 pb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-base shadow-sm shrink-0">
            📐
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">Math Quest (Singapore Bar Model)</h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {gameState === 'playing' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg border border-slate-300 transition"
              title="Pause Timer"
            >
              <Pause size={14} />
            </button>
          )}

          {gameState === 'paused' && (
            <button
              type="button"
              onClick={handleTogglePause}
              className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-black text-[11px] flex items-center gap-1 shadow-sm"
            >
              <Play size={12} /> Resume
            </button>
          )}

          <div className="px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200 flex items-center gap-1">
            <Timer className={timeLeft <= 10 && gameState === 'playing' ? 'text-rose-500 animate-ping' : 'text-amber-600'} size={13} />
            <span className={`text-xs font-black font-mono ${timeLeft <= 10 ? 'text-rose-600' : 'text-slate-900'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg border border-amber-300 font-black text-xs font-mono">
            {score} PTS
          </div>

          <span className="px-2 py-1 bg-amber-50 text-amber-900 text-[11px] font-mono font-bold rounded-lg border border-amber-200">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>
      </div>

      {/* Start Screen (Idle) */}
      {gameState === 'idle' && (
        <div className="p-5 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl text-center space-y-3 shadow-inner">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl mx-auto shadow-md">
            📐
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
              READY FOR<br />MATH QUEST?
            </h3>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-6 py-2.5 sm:py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 rounded-xl font-black text-sm shadow-lg inline-flex items-center gap-1.5 transition hover:scale-105 active:scale-95"
          >
            <Play size={18} fill="currentColor" /> ▶ START
          </button>
        </div>
      )}

      {/* Paused Banner (Non-blocking) */}
      {gameState === 'paused' && (
        <div className="p-3 bg-amber-50 border border-amber-300 rounded-2xl flex items-center justify-between animate-in fade-in">
          <span className="text-xs font-black text-amber-900 flex items-center gap-2">
            <Pause size={16} className="text-amber-600 animate-pulse" /> Timer Paused — Take your time to inspect the Bar Model!
          </span>
          <button
            type="button"
            onClick={handleTogglePause}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black text-xs shadow-md flex items-center gap-1"
          >
            <Play size={14} fill="currentColor" /> Resume
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl text-center space-y-4 shadow-inner animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-amber-500 animate-bounce" />
          <h3 className="text-2xl font-black text-slate-900">
            {score > 0 ? 'MATH QUEST COMPLETE!' : 'TIME EXPIRED — TRY AGAIN!'}
          </h3>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-700">
            <div>Score: <span className="text-xl font-black text-amber-600">{score} PTS</span></div>
            <div>Correct: <span className="text-xl font-black text-blue-600">{correctCount}/{questions.length}</span></div>
            <div>XP Earned: <span className={`text-xl font-black ${xpEarned > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>+{xpEarned} XP</span></div>
          </div>
          <button
            type="button"
            onClick={handleStartGame}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <RotateCcw size={18} /> Play Math Quest Again
          </button>
        </div>
      )}

      {/* Active Question Display */}
      {(gameState === 'playing' || gameState === 'paused') && (
        <div className="space-y-3 sm:space-y-5">
          {/* Question Text */}
          <div className="p-3 sm:p-5 bg-amber-50/80 rounded-xl sm:rounded-2xl border border-amber-200 space-y-0.5 sm:space-y-1">
            <h4 className="text-xs sm:text-sm font-black uppercase text-amber-800 tracking-wider">{currentQ.title}</h4>
            <p className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 leading-relaxed">
              {renderParsedText(currentQ.problemText, 'amber')}
            </p>
          </div>

          {/* Bar Model Visual Display — Full width zoom */}
          <div className="p-1 sm:p-2 bg-slate-50 rounded-xl sm:rounded-2xl border-2 border-slate-200 flex items-center justify-center shadow-inner w-full overflow-hidden">
            {currentQ.modelData ? (
              <BarModelSVG modelData={currentQ.modelData} />
            ) : (
              <img
                src={currentQ.svg_url}
                alt={currentQ.title}
                className="w-full h-auto max-h-[190px] sm:max-h-[250px] object-contain drop-shadow-md"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>

          {/* Answer Form — responsive stack on mobile, inline on tablet+ */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="flex-1 relative flex items-center">
              <input
                type="number"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter numerical answer..."
                className="w-full p-3.5 sm:p-4 bg-slate-50 text-slate-900 rounded-2xl border-2 border-slate-300 font-mono text-base sm:text-lg font-black outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition"
              />
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="absolute right-3 p-2 text-amber-600 hover:text-amber-800 transition cursor-pointer"
                title="Show Hint"
              >
                <HelpCircle size={22} />
              </button>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-lg transition active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>Submit Answer ▶</span>
            </button>
          </form>

          {/* Hint */}
          {showHint && (
            <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Sparkles size={16} className="text-amber-500 shrink-0" />
              {currentQ.hintText}
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div className={`p-4 rounded-2xl border text-xs font-black flex items-center gap-2 animate-in fade-in ${
              feedback.isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}>
              {feedback.isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              {feedback.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BarModelQuest;
