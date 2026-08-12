import React, { useState } from 'react';
import { BarModelSVG } from '../components/BarModelSVG';
import { evaluateBarModelAnswer } from '../../../../utils/barModelEvaluator';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import { renderParsedText } from '../../../../components/common/HoverWord';
import { CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';

const WEEK33_BAR_QUESTIONS = [
  {
    id: 'bar_w33_01',
    title: 'Problem 1: Broken Clocks & Vases (Part-Whole)',
    problemText: 'Tom broke 2 alarm clocks and 3 glass vases by accident in the morning. How many items did Tom break in total?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Alarm Clocks (2)', value: 40, color: '#4f46e5' },
        { label: 'Glass Vases (3)', value: 60, color: '#06b6d4' }
      ],
      totalLabel: '? items'
    },
    correctAnswer: 5,
    hintText: 'Look at the total bar model: Total items broken = 2 alarm clocks + 3 glass vases = 5 items.'
  },
  {
    id: 'bar_w33_02',
    title: 'Problem 2: Comparing Replacement Costs (Comparison)',
    problemText: 'A new alarm clock costs 25 dollars. A new backpack costs 40 dollars. How much more expensive is the backpack than the alarm clock?',
    modelData: {
      type: 'comparison',
      bars: [
        { name: 'Backpack', label: '40 dollars', width: 240 },
        { name: 'Alarm Clock', label: '25 dollars', width: 150 }
      ]
    },
    correctAnswer: 15,
    hintText: 'Difference between the two bar models = 40 dollars - 25 dollars = 15 dollars.'
  },
  {
    id: 'bar_w33_03',
    title: 'Problem 3: Total Repair Time (Part-Whole)',
    problemText: 'Tom spent 15 minutes cleaning up spilled juice and 25 minutes fixing his clock. How many total minutes did he spend?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Juice Cleanup (15m)', value: 37.5, color: '#4f46e5' },
        { label: 'Clock Repair (25m)', value: 62.5, color: '#06b6d4' }
      ],
      totalLabel: '? minutes'
    },
    correctAnswer: 40,
    hintText: 'Total repair time = 15 minutes + 25 minutes = 40 minutes.'
  },
  {
    id: 'bar_w33_04',
    title: 'Problem 4: Multiplied Cleanup Work (Equal Parts)',
    problemText: 'Tom cleaned 4 clumsy mistakes today. Each cleanup took 10 minutes. How many total minutes did Tom spend on cleanups?',
    modelData: {
      type: 'equal_parts',
      bars: [
        { label: 'Mistake 1 (10m)', value: 25, color: '#4f46e5' },
        { label: 'Mistake 2 (10m)', value: 25, color: '#4f46e5' },
        { label: 'Mistake 3 (10m)', value: 25, color: '#4f46e5' },
        { label: 'Mistake 4 (10m)', value: 25, color: '#4f46e5' }
      ],
      totalLabel: '? total minutes'
    },
    correctAnswer: 40,
    hintText: 'Total cleanup time = 4 mistakes × 10 minutes = 40 minutes.'
  },
  {
    id: 'bar_w33_05',
    title: 'Problem 5: Remaining Bus Seats (Part-Whole Difference)',
    problemText: 'The school bus has 50 seats. 35 passengers are sitting inside. How many empty seats are remaining for Tom and Mia?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Seated (35)', value: 70, color: '#4f46e5' },
        { label: 'Empty (?)', value: 30, color: '#f59e0b' }
      ],
      totalLabel: '50 Seats'
    },
    correctAnswer: 15,
    hintText: 'Empty seats = 50 total seats - 35 seated passengers = 15 empty seats.'
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

  const handleNext = () => {
    setUserInput('');
    setFeedback(null);
    setShowHint(false);
    setQuestionIndex((prev) => (prev + 1) % questionsList.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-3xl border border-slate-200 shadow-md text-slate-900 font-sans">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">
            STATION 2 — SINGAPORE BAR MODEL QUEST
          </span>
          <h3 className="text-lg font-black text-slate-900 mt-0.5">{currentQ.title}</h3>
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-900 text-xs font-mono font-bold rounded-lg border border-amber-200">
          Problem {questionIndex + 1} / {questionsList.length}
        </span>
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
