import React, { useState } from 'react';
import { BarModelSVG } from '../components/BarModelSVG';
import { evaluateBarModelAnswer } from '../../../../utils/barModelEvaluator';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import { renderParsedText } from '../../../../components/common/HoverWord';
import { CheckCircle2, AlertCircle, Sparkles, HelpCircle, RefreshCw, Trophy } from 'lucide-react';
import CompletionModal from '../../../../components/common/CompletionModal';
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
        { name: 'First Aid Kit A', label: '35 bandages', width: 210 },
        { name: 'First Aid Kit B', label: '20 bandages', width: 120 }
      ]
    },
    correctAnswer: 15,
    hintText: 'Compare the bar models: 35 bandages - 20 bandages = 15 bandages difference.'
  },
  {
    id: 'bar_w33_05',
    title: 'Problem 5: Total Ice Packs and Bandages (Part-Whole)',
    problemText: 'The nurse stocked 12 cold ice packs and 18 rolls of clean bandages. How many medical supplies were stocked altogether?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Ice Packs (12)', value: 40, color: '#4f46e5' },
        { label: 'Bandages (18)', value: 60, color: '#06b6d4' }
      ],
      totalLabel: '? supplies'
    },
    correctAnswer: 30,
    hintText: 'Sum of parts: 12 ice packs + 18 bandage rolls = 30 total supplies.'
  }
];

export function BarModelQuest({ customQuestions, onAttemptResult }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const [questionIndex, setQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const questionsList = customQuestions || WEEK33_BAR_QUESTIONS;
  const currentQ = questionsList[questionIndex] || questionsList[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const evalRes = evaluateBarModelAnswer(userInput, currentQ.correctAnswer);

    if (evalRes.isInvalidFormat) {
      setFeedback({ isCorrect: false, text: evalRes.errorMsg });
      return;
    }

    const isCorrect = evalRes.isCorrect;
    const resultText = isCorrect
      ? '100% Correct! You solved the Singapore Bar Model correctly!'
      : evalRes.errorMsg || 'Incorrect. Check your math and try again!';

    setFeedback({ isCorrect, text: resultText });

    await learnerProgressService.logAttempt({
      learnerId,
      contentId: currentQ.id,
      mode: 'learn',
      result: isCorrect ? 'correct' : 'incorrect',
      score: isCorrect ? 100 : 0,
      timeSpentSeconds: 15
    });

    if (onAttemptResult) {
      onAttemptResult(isCorrect, 'singapore_math_bar');
    }
  };

  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
    if (questionIndex + 1 < questionsList.length) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setIsCompleted(true);
      fireCelebrationConfetti('BarModelQuest_Complete');
      const userStore = useUserStore?.getState ? useUserStore.getState() : null;
      if (userStore?.addXP) userStore.addXP(50);
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setIsCompleted(false);
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-md text-slate-900 font-sans">
      <CompletionModal
        isOpen={isCompleted}
        onClose={() => {}}
        score={100}
        stars={3}
        xpEarned={50}
        srsWordsAdded={5}
        activityTitle="Bar Model Quest (Arena Game)"
      />
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">
            STATION 2 — SINGAPORE BAR MODEL QUEST
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">{currentQ.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {isCompleted && (
            <button
              onClick={handleRestart}
              className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-black rounded-lg border border-indigo-200 flex items-center gap-1 transition shadow-sm"
            >
              <RefreshCw size={12} /> Play Again
            </button>
          )}
          <span className="px-3 py-1 bg-indigo-50 text-indigo-900 text-xs font-mono font-bold rounded-lg border border-indigo-200">
            Problem {questionIndex + 1} / {questionsList.length}
          </span>
        </div>
      </div>

      {/* Problem Statement Card */}
      <div className="p-4 bg-indigo-50/70 rounded-2xl border border-indigo-100 mb-6 shadow-sm">
        <p className="text-sm font-bold text-indigo-950 leading-relaxed">{renderParsedText(currentQ.problemText, 'indigo')}</p>
      </div>

      {/* Bar Model SVG Rendering Component */}
      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6 flex justify-center shadow-inner">
        <BarModelSVG modelData={currentQ.modelData} />
      </div>

      {/* Answer Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your numeric answer here..."
            className="flex-1 p-3.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
          />
          <button
            type="submit"
            className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-sm transition shadow-md"
          >
            Submit Answer
          </button>
        </div>
      </form>

      {/* Hint Modal Toggle */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
        >
          <HelpCircle size={14} /> {showHint ? 'Hide Visual Formula Hint' : 'Need a Hint?'}
        </button>
      </div>

      {showHint && (
        <div className="mt-3 p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-semibold animate-in fade-in">
          💡 <span className="font-black">Formula Hint:</span> {currentQ.hintText}
        </div>
      )}

      {/* Feedback Bar */}
      {feedback && (
        <div
          className={`mt-4 p-4 rounded-2xl border text-sm font-black flex items-center justify-between animate-in fade-in ${
            feedback.isCorrect
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-red-50 text-red-900 border-red-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.isCorrect ? <CheckCircle2 size={18} className="text-emerald-600" /> : <AlertCircle size={18} className="text-red-600" />}
            <span>{feedback.text}</span>
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition shadow-sm"
          >
            Next Problem →
          </button>
        </div>
      )}
    </div>
  );
}
