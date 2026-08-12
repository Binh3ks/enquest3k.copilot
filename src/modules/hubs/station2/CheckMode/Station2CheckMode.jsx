import React, { useState } from 'react';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import HoverWord from '../../../../components/common/HoverWord';
import { speakText } from '../../../../utils/AudioHelper';
import { CheckCircle2, ArrowRight, RefreshCw, FileText, XCircle } from 'lucide-react';

const renderParsedText = (text, themeColor = 'indigo') => {
  if (!text) return null;
  const segments = text.split(/(\*\*.*?\*\*)/);
  let key = 0;
  const parts = [];

  for (const segment of segments) {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      const word = segment.slice(2, -2).trim();
      parts.push(
        <HoverWord
          key={key++}
          word={word}
          themeColor={themeColor}
          onSpeak={(w) => speakText(w, null, 1.0, null, 'grammar', 33, 'advanced')}
          tier={1}
        />
      );
    } else {
      const words = segment.split(/(\s+)/);
      words.forEach((w) => {
        const cleanWord = w.replace(/[^a-zA-Z]/g, '');
        if (cleanWord.length > 2) {
          parts.push(
            <HoverWord
              key={key++}
              word={cleanWord}
              themeColor={themeColor}
              onSpeak={(wordToSpeak) => speakText(wordToSpeak, null, 1.0, null, 'grammar', 33, 'advanced')}
              tier={3}
            >
              {w}
            </HoverWord>
          );
        } else {
          parts.push(<span key={key++}>{w}</span>);
        }
      });
    }
  }

  return parts;
};

const FALLBACK_CHECK_QUESTIONS = [
  {
    id: 'chk_w33_01',
    content_id: 'chk_w33_01',
    dialogue_context: 'Tom: I accidentally broke my alarm clock this morning!',
    text: 'What should Mia reply?',
    prompt: 'What should Mia reply?',
    options: [
      { label: 'A', text: "Don't worry, it was just a clumsy accident.", isCorrect: true },
      { label: 'B', text: 'Yes, I am waking up right now.', isCorrect: false },
      { label: 'C', text: "No, he didn't call the bus driver.", isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_02',
    content_id: 'chk_w33_02',
    dialogue_context: 'Mia: Did you find your lost backpack on the school bus?',
    text: 'What should Tom reply?',
    prompt: 'What should Tom reply?',
    options: [
      { label: 'A', text: 'No, I am walking home.', isCorrect: false },
      { label: 'B', text: 'Yes, thank you for helping me search!', isCorrect: true },
      { label: 'C', text: 'I like riding the bus to school.', isCorrect: false }
    ],
    answerIndex: 1
  },
  {
    id: 'chk_w33_03',
    content_id: 'chk_w33_03',
    text: 'While Tom ___ up in a hurry, he accidentally knocked over his clock.',
    prompt: 'While Tom ___ up in a hurry, he accidentally knocked over his clock.',
    options: [
      { label: 'A', text: 'was waking', isCorrect: true },
      { label: 'B', text: 'is waking', isCorrect: false },
      { label: 'C', text: 'waked', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_04',
    content_id: 'chk_w33_04',
    text: 'Tom slipped and fell ___ the kitchen tile floor was wet.',
    prompt: 'Tom slipped and fell ___ the kitchen tile floor was wet.',
    options: [
      { label: 'A', text: 'because', isCorrect: true },
      { label: 'B', text: 'although', isCorrect: false },
      { label: 'C', text: 'but', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_05',
    content_id: 'chk_w33_05',
    text: '___ Tom made a clumsy mistake, Mia helped him mop the puddle kindly.',
    prompt: '___ Tom made a clumsy mistake, Mia helped him mop the puddle kindly.',
    options: [
      { label: 'A', text: 'Although', isCorrect: true },
      { label: 'B', text: 'Because', isCorrect: false },
      { label: 'C', text: 'So', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_06',
    content_id: 'chk_w33_06',
    text: 'He dropped a glass of juice while he ___ breakfast for his sister.',
    prompt: 'He dropped a glass of juice while he ___ breakfast for his sister.',
    options: [
      { label: 'A', text: 'was making', isCorrect: true },
      { label: 'B', text: 'were making', isCorrect: false },
      { label: 'C', text: 'makes', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_07',
    content_id: 'chk_w33_07',
    text: 'Tom apologized to his mother immediately ___ he felt very sorry.',
    prompt: 'Tom apologized to his mother immediately ___ he felt very sorry.',
    options: [
      { label: 'A', text: 'because', isCorrect: true },
      { label: 'B', text: 'although', isCorrect: false },
      { label: 'C', text: 'while', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_08',
    content_id: 'chk_w33_08',
    text: 'Mia found the blue backpack while she ___ the back row of seats.',
    prompt: 'Mia found the blue backpack while she ___ the back row of seats.',
    options: [
      { label: 'A', text: 'was searching', isCorrect: true },
      { label: 'B', text: 'searches', isCorrect: false },
      { label: 'C', text: 'is search', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_09',
    content_id: 'chk_w33_09',
    text: 'Because Tom rushed downstairs too quickly, he ___ on the rug.',
    prompt: 'Because Tom rushed downstairs too quickly, he ___ on the rug.',
    options: [
      { label: 'A', text: 'slipped', isCorrect: true },
      { label: 'B', text: 'slips', isCorrect: false },
      { label: 'C', text: 'was slip', isCorrect: false }
    ],
    answerIndex: 0
  },
  {
    id: 'chk_w33_10',
    content_id: 'chk_w33_10',
    text: 'Tom promised to be cautious ___ he could avoid future morning accidents.',
    prompt: 'Tom promised to be cautious ___ he could avoid future morning accidents.',
    options: [
      { label: 'A', text: 'so', isCorrect: true },
      { label: 'B', text: 'because', isCorrect: false },
      { label: 'C', text: 'although', isCorrect: false }
    ],
    answerIndex: 0
  }
];

export function Station2CheckMode({ onFinishCheckMode, weekNumber = 33 }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const [questions] = useState(FALLBACK_CHECK_QUESTIONS);
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

      <div className="space-y-3 mb-8">
        {currentQ.options.map((opt, optIdx) => {
          const isSelected = currentSelection && currentSelection.label === opt.label;
          const isCorrect = opt.isCorrect || (currentQ.answerIndex !== undefined && optIdx === currentQ.answerIndex);

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

          return (
            <button
              key={opt.label}
              disabled={isSubmitted}
              onClick={() => handleSelectOption(opt)}
              className={`w-full p-4 rounded-xl text-left border transition-all flex items-center justify-between gap-4 ${buttonStyle}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <span className={`w-7 h-7 rounded-full font-black flex items-center justify-center text-xs shrink-0 ${badgeStyle}`}>
                  {opt.label}
                </span>
                <span className="text-sm font-bold leading-relaxed">{renderParsedText(opt.text, 'indigo')}</span>
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
