import React, { useState } from 'react';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { useUserStore } from '../../../../stores/useUserStore';
import HoverWord from '../../../../components/common/HoverWord';
import { speakText } from '../../../../utils/AudioHelper';
import { CheckCircle2, ArrowRight, RefreshCw, FileText } from 'lucide-react';

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
      let currentWord = '';
      let currentNonWord = '';

      for (let i = 0; i < segment.length; i++) {
        const char = segment[i];
        if (/[\w'-]/.test(char)) {
          if (currentNonWord) {
            parts.push(<span key={key++}>{currentNonWord}</span>);
            currentNonWord = '';
          }
          currentWord += char;
        } else {
          if (currentWord) {
            parts.push(
              <HoverWord
                key={key++}
                word={currentWord}
                themeColor={themeColor}
                onSpeak={(w) => speakText(w, null, 1.0, null, 'grammar', 33, 'advanced')}
                tier={3}
              />
            );
            currentWord = '';
          }
          currentNonWord += char;
        }
      }
      if (currentWord) {
        parts.push(
          <HoverWord
            key={key++}
            word={currentWord}
            themeColor={themeColor}
            onSpeak={(w) => speakText(w, null, 1.0, null, 'grammar', 33, 'advanced')}
            tier={3}
          />
        );
      }
      if (currentNonWord) {
        parts.push(<span key={key++}>{currentNonWord}</span>);
      }
    }
  }

  return parts;
};

const FALLBACK_CHECK_QUESTIONS = [
  {
    content_id: 'chk_h2_01',
    text: 'While Tom ___ up, he accidentally broke his alarm clock.',
    prompt: 'While Tom ___ up, he accidentally broke his alarm clock.',
    options: [
      { label: 'A', text: 'was waking', isCorrect: true },
      { label: 'B', text: 'is waking', isCorrect: false },
      { label: 'C', text: 'waked', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_02',
    text: 'Tom fell down ___ the floor was wet and slippery.',
    prompt: 'Tom fell down ___ the floor was wet and slippery.',
    options: [
      { label: 'A', text: 'because', isCorrect: true },
      { label: 'B', text: 'although', isCorrect: false },
      { label: 'C', text: 'but', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_03',
    text: '___ Tom made a clumsy mistake, Mia helped him kindly.',
    prompt: '___ Tom made a clumsy mistake, Mia helped him kindly.',
    options: [
      { label: 'A', text: 'Although', isCorrect: true },
      { label: 'B', text: 'Because', isCorrect: false },
      { label: 'C', text: 'So', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_04',
    text: 'He dropped a glass while he ___ breakfast in the kitchen.',
    prompt: 'He dropped a glass while he ___ breakfast in the kitchen.',
    options: [
      { label: 'A', text: 'was making', isCorrect: true },
      { label: 'B', text: 'were making', isCorrect: false },
      { label: 'C', text: 'makes', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_05',
    text: 'Tom apologized immediately ___ he felt very sorry.',
    prompt: 'Tom apologized immediately ___ he felt very sorry.',
    options: [
      { label: 'A', text: 'because', isCorrect: true },
      { label: 'B', text: 'although', isCorrect: false },
      { label: 'C', text: 'while', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_06',
    text: 'Mia found the backpack while she ___ the bus.',
    prompt: 'Mia found the backpack while she ___ the bus.',
    options: [
      { label: 'A', text: 'was searching', isCorrect: true },
      { label: 'B', text: 'searches', isCorrect: false },
      { label: 'C', text: 'is search', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_07',
    text: 'Because Tom ran downstairs quickly, he ___ on the rug.',
    prompt: 'Because Tom ran downstairs quickly, he ___ on the rug.',
    options: [
      { label: 'A', text: 'slipped', isCorrect: true },
      { label: 'B', text: 'slips', isCorrect: false },
      { label: 'C', text: 'was slip', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_08',
    text: '___ he lost his school bag, his friend found it.',
    prompt: '___ he lost his school bag, his friend found it.',
    options: [
      { label: 'A', text: 'Although', isCorrect: true },
      { label: 'B', text: 'Because', isCorrect: false },
      { label: 'C', text: 'So', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_09',
    text: 'They ___ the clock when the school bell rang.',
    prompt: 'They ___ the clock when the school bell rang.',
    options: [
      { label: 'A', text: 'were fixing', isCorrect: true },
      { label: 'B', text: 'was fixing', isCorrect: false },
      { label: 'C', text: 'fixed', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_h2_10',
    text: 'Tom promised to be cautious ___ he could avoid future accidents.',
    prompt: 'Tom promised to be cautious ___ he could avoid future accidents.',
    options: [
      { label: 'A', text: 'so', isCorrect: true },
      { label: 'B', text: 'because', isCorrect: false },
      { label: 'C', text: 'although', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_d01',
    dialogue_context: 'Tom: I accidentally broke my alarm clock this morning!',
    text: 'What should Mia reply?',
    prompt: 'What should Mia reply?',
    options: [
      { label: 'A', text: "Don't worry, it's just an accident.", isCorrect: true },
      { label: 'B', text: 'I am waking up.', isCorrect: false },
      { label: 'C', text: 'Yes, it is.', isCorrect: false }
    ]
  },
  {
    content_id: 'chk_d02',
    dialogue_context: 'Mia: Did you find your lost backpack on the bus?',
    text: 'What should Tom reply?',
    prompt: 'What should Tom reply?',
    options: [
      { label: 'A', text: 'No, I am going home.', isCorrect: false },
      { label: 'B', text: 'Yes, thank you for helping me!', isCorrect: true },
      { label: 'C', text: 'I like riding the bus.', isCorrect: false }
    ]
  }
];

export function Station2CheckMode({ onFinishCheckMode, weekNumber = 33 }) {
  const currentUser = useUserStore((state) => state.currentUser);
  const learnerId = currentUser?.id || currentUser?.username || 'guest_01';

  const [questions] = useState(FALLBACK_CHECK_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultsSummary, setResultsSummary] = useState(null);
  const [startTime] = useState(Date.now());

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (opt) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.content_id]: opt
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
        /* LUỒNG A: CAMBRIDGE READING PART 2 - DIALOGUE RESPONSE (SPEECH BUBBLE) */
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
        /* LUỒNG B: STANDARD GRAMMAR GAP-FILL */
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
        {currentQ.options.map((opt) => {
          const isSelected = currentSelection && currentSelection.label === opt.label;

          return (
            <button
              key={opt.label}
              onClick={() => handleSelectOption(opt)}
              className={`w-full p-4 rounded-xl text-left border transition-all flex items-center gap-4 ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-500 shadow-sm'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <span className={`w-7 h-7 rounded-full font-black flex items-center justify-center text-xs shrink-0 ${
                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {opt.label}
              </span>
              <span className="text-sm font-bold leading-relaxed">{renderParsedText(opt.text, 'indigo')}</span>
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

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitExam}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg text-xs transition flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            <CheckCircle2 size={16} /> Submit Exam
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
