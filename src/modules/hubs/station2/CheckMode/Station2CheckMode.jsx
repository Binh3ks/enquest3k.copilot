import React, { useState } from 'react';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import HoverWord, { renderParsedText } from '../../../../components/common/HoverWord';
import { speakText } from '../../../../utils/AudioHelper';
import { CheckCircle2, ArrowRight, RefreshCw, FileText, XCircle } from 'lucide-react';

const FALLBACK_CHECK_QUESTIONS = [
  {
    id: 'chk_w33_p4_01',
    content_id: 'chk_w33_p4_01',
    type: 'listening_p4_picture',
    prompt: 'Cambridge Listening Part 4: Where was the boy when he slipped on the wet floor?',
    text: 'Where was the boy when he slipped on the wet floor?',
    options: [
      { label: 'A', text: 'A) In the school corridor near science room', image_url: '/images/week33/webtoon_scene_1.png', isCorrect: true },
      { label: 'B', text: 'B) Inside the science laboratory', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false },
      { label: 'C', text: 'C) In the school nurse office', image_url: '/images/week33/webtoon_scene_3.png', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_p4_02',
    content_id: 'chk_w33_p4_02',
    type: 'listening_p4_picture',
    prompt: 'Cambridge Listening Part 4: What medical aid item did the nurse bring first?',
    text: 'What medical aid item did the nurse bring first?',
    options: [
      { label: 'A', text: 'A) A clean bandage and cold pack', image_url: '/images/week33/webtoon_scene_4.png', isCorrect: true },
      { label: 'B', text: 'B) A pair of crutches', image_url: '/images/week33/webtoon_scene_5.png', isCorrect: false },
      { label: 'C', text: 'C) A glass of orange juice', image_url: '/images/week33/webtoon_scene_2.png', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_01',
    content_id: 'chk_w33_01',
    dialogue_context: 'Jake: What happened while you were walking down the corridor?',
    text: 'What does Tom say?',
    prompt: 'What does Tom say?',
    options: [
      { label: 'A', text: "A boy running fast slipped on the wet floor.", isCorrect: true },
      { label: 'B', text: 'Yes, I am walking home now.', isCorrect: false },
      { label: 'C', text: "No, he didn't eat lunch.", isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_02',
    content_id: 'chk_w33_02',
    dialogue_context: 'Teacher: What did Jake do when his classmate fell down?',
    text: 'What does Mia say?',
    prompt: 'What does Mia say?',
    options: [
      { label: 'A', text: 'He called the school nurse immediately for help.', isCorrect: true },
      { label: 'B', text: 'While he was running outside.', isCorrect: false },
      { label: 'C', text: 'Yes, he broke his backpack.', isCorrect: false }
    ],
    answerIndex: 0
  }
];

export function Station2CheckMode({ weekData, onFinishCheckMode, weekNumber = 33 }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const initialQuestions = weekData?.stations?.listening_hub?.check_mode_drills || weekData?.check_mode_drills || FALLBACK_CHECK_QUESTIONS;
  const [questions] = useState(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuestions, setSubmittedQuestions] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultsSummary, setResultsSummary] = useState(null);
  const [startTime] = useState(Date.now());

  const currentQ = questions[currentIndex] || questions[0];
  const isSubmitted = !!submittedQuestions[currentQ.content_id];

  const handleSelectOption = (opt) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.content_id]: opt
    }));
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswers[currentQ.content_id]) return;
    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQ.content_id]: true
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitExam = async () => {
    const totalTimeSpent = Math.round((Date.now() - startTime) / 1000);
    let totalScore = 0;

    for (const q of questions) {
      const selectedOpt = selectedAnswers[q.content_id];
      const isCorrect = selectedOpt && selectedOpt.isCorrect;
      const score = isCorrect ? 100 : 0;
      totalScore += score;

      await learnerProgressService.logAttempt({
        learnerId,
        contentId: q.content_id,
        mode: 'check',
        result: isCorrect ? 'correct' : 'incorrect',
        score: score,
        timeSpentSeconds: Math.round(totalTimeSpent / questions.length)
      });
    }

    const finalAvgScore = Math.round(totalScore / questions.length);

    setResultsSummary({
      totalQuestions: questions.length,
      finalAvgScore,
      totalTimeSpent
    });
    setIsCompleted(true);
  };

  if (isCompleted && resultsSummary) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl text-slate-900 font-sans">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText size={32} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Grammar Check Mode Completed</h3>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
            <div className="text-[10px] text-indigo-700 font-black uppercase">Average Score</div>
            <div className="text-2xl font-black text-indigo-950">{resultsSummary.finalAvgScore} / 100</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 font-black uppercase">Questions</div>
            <div className="text-2xl font-black text-slate-900">{resultsSummary.totalQuestions}</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-[10px] text-slate-500 font-black uppercase">Time Spent</div>
            <div className="text-2xl font-black text-slate-900">{resultsSummary.totalTimeSpent}s</div>
          </div>
        </div>

        <button
          onClick={() => {
            setIsCompleted(false);
            setCurrentIndex(0);
            setSelectedAnswers({});
            setSubmittedQuestions({});
          }}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-base transition flex items-center justify-center gap-2 shadow-md"
        >
          <RefreshCw size={18} /> Retake 10-Question Check Mode Exam
        </button>
      </div>
    );
  }

  const currentSelection = selectedAnswers[currentQ.content_id];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl font-sans">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
            {currentQ.dialogue_context
              ? 'CAMBRIDGE READING PART 2 — CHOOSE THE BEST RESPONSE'
              : 'CAMBRIDGE FLYERS & PET — GRAMMAR CHECK MODE'}
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>
      </div>

      {currentQ.dialogue_context ? (
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3 bg-amber-50/90 p-4 rounded-2xl border border-amber-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
              Speaker A
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-amber-700 uppercase tracking-wider mb-1">
                Statement / Question:
              </div>
              <div className="text-sm font-bold text-amber-950 leading-relaxed italic">
                "{renderParsedText(currentQ.dialogue_context, 'amber')}"
              </div>
            </div>
          </div>

          <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100">
            <p className="text-xs font-black text-indigo-700 mb-1 uppercase tracking-wide">
              Question:
            </p>
            <div className="text-base font-black text-slate-900 leading-relaxed">
              {renderParsedText(currentQ.text || currentQ.prompt || currentQ.question || currentQ.raw_content?.text_en || '', 'indigo')}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-100 mb-6">
          <p className="text-xs font-black text-indigo-700 mb-1 uppercase tracking-wide">
            CHOOSE THE CORRECT WORD TO FILL IN THE BLANK:
          </p>
          <div className="text-base font-black text-slate-900 leading-relaxed">
            {renderParsedText(currentQ.text || currentQ.prompt || currentQ.question || currentQ.raw_content?.text_en || '', 'indigo')}
          </div>
        </div>
      )}

      {/* Option Choices (Supports Text MC or Cambridge Listening Part 4 3-Picture Choice Cards A/B/C) */}
      <div className={currentQ.options.some(o => o.image_url || o.image) ? "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" : "space-y-3 mb-8"}>
        {currentQ.options.map((opt, optIdx) => {
          const isSelected = currentSelection && currentSelection.label === opt.label;
          const isCorrect = opt.isCorrect || (currentQ.answerIndex !== undefined && optIdx === currentQ.answerIndex);
          const optImage = opt.image_url || opt.image || (optIdx === 0 ? '/images/week33/webtoon_scene_1.png' : optIdx === 1 ? '/images/week33/webtoon_scene_2.png' : '/images/week33/webtoon_scene_4.png');

          let buttonStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
          let badgeStyle = 'bg-slate-200 text-slate-700';

          if (isSubmitted) {
            if (isCorrect) {
              buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400 shadow-sm';
              badgeStyle = 'bg-emerald-600 text-white';
            } else if (isSelected && !isCorrect) {
              buttonStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-bold ring-2 ring-rose-400 shadow-sm';
              badgeStyle = 'bg-rose-600 text-white';
            } else {
              buttonStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
              badgeStyle = 'bg-slate-200 text-slate-400';
            }
          } else if (isSelected) {
            buttonStyle = 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-500 shadow-sm';
            badgeStyle = 'bg-indigo-600 text-white';
          }

          if (currentQ.type === 'listening_p4_picture' || currentQ.options.some(o => o.image_url || o.image)) {
            return (
              <button
                key={opt.label || optIdx}
                disabled={isSubmitted}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center gap-3 relative overflow-hidden shadow-sm hover:scale-[1.02] active:scale-95 ${buttonStyle}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`w-8 h-8 rounded-xl text-sm font-black flex items-center justify-center ${badgeStyle}`}>
                    {opt.label || String.fromCharCode(65 + optIdx)}
                  </span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
                  {isSubmitted && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500" />}
                </div>

                <div className="w-full h-32 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                  <img src={optImage} alt={opt.text} className="w-full h-full object-cover" />
                </div>

                <span className="text-xs font-bold text-slate-800 line-clamp-2">{opt.text}</span>
              </button>
            );
          }

          return (
            <button
              key={opt.label || optIdx}
              disabled={isSubmitted}
              onClick={() => handleSelectOption(opt)}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between gap-3.5 shadow-sm active:scale-[0.99] ${buttonStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-xl text-sm font-black flex items-center justify-center shrink-0 ${badgeStyle}`}>
                  {opt.label || String.fromCharCode(65 + optIdx)}
                </span>
                <span className="text-sm font-bold text-slate-800">{opt.text}</span>
              </div>

              {isSubmitted && isCorrect && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 font-extrabold text-xs rounded-full shrink-0">
                  <CheckCircle2 size={16} /> Correct
                </span>
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-100 text-rose-700 font-extrabold text-xs rounded-full shrink-0">
                  <XCircle size={16} /> Incorrect
                </span>
              )}
            </button>
          );

        })}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black rounded-lg text-xs transition disabled:opacity-40"
        >
          ← Previous
        </button>

        {!isSubmitted ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!currentSelection}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg text-xs transition flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            <CheckCircle2 size={16} /> Check Answer
          </button>
        ) : currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitExam}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg text-xs transition flex items-center gap-2 shadow-md"
          >
            <CheckCircle2 size={16} /> Finish Exam & View Results
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-lg text-xs transition flex items-center gap-2 shadow-md"
          >
            Next Question <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
