import React, { useState, useEffect } from 'react';
import { BarModelSVG } from '../components/BarModelSVG';
import { evaluateBarModelAnswer } from '../../../../utils/barModelEvaluator';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import { renderParsedText } from '../../../../components/common/HoverWord';
import { CheckCircle2, AlertCircle, Sparkles, HelpCircle, RefreshCw, Trophy, Timer, Flame, Zap } from 'lucide-react';
import { fireCelebrationConfetti } from '../../../../utils/confettiHelper';

const WEEK33_BAR_QUESTIONS = [
  {
    id: 'bar_w33_01',
    title: 'Problem 1: Corridor First Aid Bandages (Part-Whole)',
    problemText: 'The school nurse used 4 small bandages and 6 large bandages to treat students today. How many bandages were used in total?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Small Bandages (4)', value: 40, color: '#4f46e5' },
        { label: 'Large Bandages (6)', value: 60, color: '#06b6d4' }
      ],
      totalLabel: '? bandages'
    },
    correctAnswer: 10,
    hintText: 'Look at the total bar model: Total bandages = 4 small + 6 large = 10 bandages.'
  },
  {
    id: 'bar_w33_02',
    title: 'Problem 2: Corridor Walking vs Running Speed (Comparison)',
    problemText: 'Running down the corridor takes 15 seconds. Walking carefully takes 40 seconds. How many seconds slower is walking carefully?',
    modelData: {
      type: 'comparison',
      bars: [
        { name: 'Walking Carefully', label: '40 seconds', width: 240 },
        { name: 'Running Fast', label: '15 seconds', width: 90 }
      ]
    },
    correctAnswer: 25,
    hintText: 'Difference between the bar models = 40 seconds - 15 seconds = 25 seconds.'
  },
  {
    id: 'bar_w33_03',
    title: 'Problem 3: Total Safety Inspection Time (Part-Whole)',
    problemText: 'The headmaster spent 20 minutes inspecting the corridor floor and 30 minutes placing safety warning signs. How many total minutes did he spend?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Floor Inspection (20m)', value: 40, color: '#4f46e5' },
        { label: 'Safety Signs (30m)', value: 60, color: '#06b6d4' }
      ],
      totalLabel: '? minutes'
    },
    correctAnswer: 50,
    hintText: 'Add both time intervals: 20 minutes + 30 minutes = 50 total minutes.'
  },
  {
    id: 'bar_w33_04',
    title: 'Problem 4: First Aid Kit Bandage Stock (Comparison)',
    problemText: 'The medical room has 35 bandages in Kit A and 20 bandages in Kit B. How many more bandages are in Kit A than Kit B?',
    modelData: {
      type: 'comparison',
      bars: [
        { name: 'Medical Kit A', label: '35 bandages', width: 210 },
        { name: 'Medical Kit B', label: '20 bandages', width: 120 }
      ]
    },
    correctAnswer: 15,
    hintText: 'Subtract Kit B from Kit A: 35 - 20 = 15 bandages.'
  },
  {
    id: 'bar_w33_05',
    title: 'Problem 5: Corridor Safety Sign Clean-Up (Part-Whole)',
    problemText: 'Students cleaned 8 wet spots in the morning and 12 wet spots in the afternoon. How many wet spots were cleaned in total?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Morning Wet Spots (8)', value: 40, color: '#4f46e5' },
        { label: 'Afternoon Spots (12)', value: 60, color: '#06b6d4' }
      ],
      totalLabel: '? wet spots'
    },
    correctAnswer: 20,
    hintText: 'Add both shifts: 8 + 12 = 20 total wet spots cleaned.'
  }
];

export function BarModelQuest({ barModelData, weekNumber = 33, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);

  const questions = (barModelData && barModelData.length > 0) ? barModelData : WEEK33_BAR_QUESTIONS;
  const currentQ = questions[currentIndex] || questions[0];

  // 45s Timer Countdown
  useEffect(() => {
    if (isGameOver) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          fireCelebrationConfetti('MathQuest_Complete');
          if (onComplete) onComplete(score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isGameOver, score, onComplete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim() || isGameOver) return;

    const evaluation = evaluateBarModelAnswer(userInput, currentQ.correctAnswer);
    if (evaluation.isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      const bonusScore = 20 + nextStreak * 5;
      setScore(prev => prev + bonusScore);
      setTimeLeft(prev => Math.min(45, prev + 3));

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
          setIsGameOver(true);
          fireCelebrationConfetti('MathQuest_Victory');
          const userStore = useUserStore?.getState ? useUserStore.getState() : null;
          if (userStore?.addXP) userStore.addXP(40);
          if (onComplete) onComplete(score + bonusScore);
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

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
    setScore(0);
    setStreak(0);
    setTimeLeft(45);
    setIsGameOver(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-5 sm:p-7 bg-white rounded-3xl border-2 border-amber-300 shadow-xl space-y-6 text-slate-900 font-sans">
      {/* Top Controls */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-amber-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-md">
            📐
          </div>
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
              Singapore Math CLIL • Problem {currentIndex + 1}/{questions.length}
            </span>
            <h3 className="text-lg font-black text-slate-900">📐 MATH QUEST (BAR MODEL CHALLENGE)</h3>
          </div>
        </div>

        {/* Dashboard */}
        <div className="flex items-center gap-3">
          {streak > 1 && (
            <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs animate-bounce flex items-center gap-1 shadow-md rounded-full">
              <Flame size={14} /> {streak}x STREAK!
            </div>
          )}

          <div className="px-4 py-2 bg-slate-100 rounded-2xl border border-slate-200 flex items-center gap-2">
            <Timer className={timeLeft <= 8 ? 'text-rose-500 animate-ping' : 'text-amber-600'} size={18} />
            <span className={`text-base font-black font-mono ${timeLeft <= 8 ? 'text-rose-600' : 'text-slate-900'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="px-4 py-2 bg-amber-100 text-amber-900 rounded-2xl border border-amber-300 font-black text-sm font-mono">
            {score} PTS
          </div>
        </div>
      </div>

      {/* Game Over Display */}
      {isGameOver ? (
        <div className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl text-center space-y-4 shadow-inner animate-in zoom-in-95">
          <Trophy size={56} className="mx-auto text-amber-500 animate-bounce" />
          <h3 className="text-2xl font-black text-slate-900">MATH QUEST COMPLETE!</h3>
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-700">
            <div>Score: <span className="text-xl font-black text-amber-600">{score} PTS</span></div>
            <div>Questions: <span className="text-xl font-black text-blue-600">{currentIndex + (feedback?.isCorrect ? 1 : 0)}/{questions.length}</span></div>
            <div>XP Earned: <span className="text-xl font-black text-emerald-600">+40 XP</span></div>
          </div>
          <button
            type="button"
            onClick={handleRestart}
            className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 text-slate-950 rounded-2xl font-black text-sm shadow-xl inline-flex items-center gap-2 transition hover:scale-105"
          >
            <RefreshCw size={18} /> Play Math Quest Again (45s)
          </button>
        </div>
      ) : (
        /* Active Question Display */
        <div className="space-y-5">
          {/* Question Text */}
          <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-1">
            <h4 className="text-xs font-black uppercase text-amber-800 tracking-wider">{currentQ.title}</h4>
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              {renderParsedText(currentQ.problemText, 'amber')}
            </p>
          </div>

          {/* Singapore Bar Model SVG Display Container */}
          <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 flex items-center justify-center shadow-inner min-h-[180px]">
            <BarModelSVG modelData={currentQ.modelData} />
          </div>

          {/* Answer Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-3">
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter numerical answer..."
              className="flex-1 p-3.5 bg-slate-50 text-slate-900 rounded-2xl border-2 border-slate-300 font-mono text-base font-black outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-200 transition"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition active:scale-95 shrink-0"
            >
              Submit Answer
            </button>
            <button
              type="button"
              onClick={() => setShowHint(!showHint)}
              className="p-3.5 bg-slate-100 hover:bg-slate-200 text-amber-900 rounded-2xl border border-slate-300 transition shrink-0"
              title="Show Hint"
            >
              <HelpCircle size={20} />
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
