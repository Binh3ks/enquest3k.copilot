import React, { useState, useEffect } from 'react';
import { contentBankService } from '../../../../services/contentBankService';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { evaluateSentenceAttempt } from '../../../../services/answerMatchingEngine';
import { ShieldCheck, CheckCircle2, ArrowRight, RefreshCw, FileText } from 'lucide-react';

const FALLBACK_CHECK_QUESTIONS = [
  {
    content_id: 'chk_h2_01',
    raw_content: { text: "While Tom was waking up, he broke his alarm clock.", grammar_tag: "past_continuous_when_while" },
    answer_key: { valid_structures: [["While", "Tom", "was", "waking", "up", ",", "he", "broke", "his", "alarm", "clock", "."]] }
  },
  {
    content_id: 'chk_h2_02',
    raw_content: { text: "Tom fell down because the floor was wet.", grammar_tag: "clauses_of_reason" },
    answer_key: { valid_structures: [["Tom", "fell", "down", "because", "the", "floor", "was", "wet", "."]] }
  },
  {
    content_id: 'chk_h2_03',
    raw_content: { text: "Although Tom made a mistake, Mia helped him.", grammar_tag: "connectors" },
    answer_key: { valid_structures: [["Although", "Tom", "made", "a", "mistake", ",", "Mia", "helped", "him", "."]] }
  },
  {
    content_id: 'chk_h2_04',
    raw_content: { text: "He dropped a glass while he was making breakfast.", grammar_tag: "past_continuous_when_while" },
    answer_key: { valid_structures: [["He", "dropped", "a", "glass", "while", "he", "was", "making", "breakfast", "."]] }
  },
  {
    content_id: 'chk_h2_05',
    raw_content: { text: "Tom apologized because he was clumsy in the morning.", grammar_tag: "clauses_of_reason" },
    answer_key: { valid_structures: [["Tom", "apologized", "because", "he", "was", "clumsy", "in", "the", "morning", "."]] }
  },
  {
    content_id: 'chk_h2_06',
    raw_content: { text: "Mia found the backpack while she was searching the bus.", grammar_tag: "past_continuous_when_while" },
    answer_key: { valid_structures: [["Mia", "found", "the", "backpack", "while", "she", "was", "searching", "the", "bus", "."]] }
  },
  {
    content_id: 'chk_h2_07',
    raw_content: { text: "Because Tom ran downstairs quickly, he slipped on the rug.", grammar_tag: "clauses_of_reason" },
    answer_key: { valid_structures: [["Because", "Tom", "ran", "downstairs", "quickly", ",", "he", "slipped", "on", "the", "rug", "."]] }
  },
  {
    content_id: 'chk_h2_08',
    raw_content: { text: "Although he lost his bag, his friend brought it to class.", grammar_tag: "connectors" },
    answer_key: { valid_structures: [["Although", "he", "lost", "his", "bag", ",", "his", "friend", "brought", "it", "to", "class", "."]] }
  },
  {
    content_id: 'chk_h2_09',
    raw_content: { text: "They were fixing the clock when the school bell rang.", grammar_tag: "past_continuous_when_while" },
    answer_key: { valid_structures: [["They", "were", "fixing", "the", "clock", "when", "the", "school", "bell", "rang", "."]] }
  },
  {
    content_id: 'chk_h2_10',
    raw_content: { text: "Tom promised to be cautious so he could avoid future accidents.", grammar_tag: "connectors" },
    answer_key: { valid_structures: [["Tom", "promised", "to", "be", "cautious", "so", "he", "could", "avoid", "future", "accidents", "."]] }
  }
];

export function Station2CheckMode({ onFinishCheckMode, weekNumber = 33 }) {
  const [questions, setQuestions] = useState(FALLBACK_CHECK_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultsSummary, setResultsSummary] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    async function loadExamContent() {
      try {
        const items = await contentBankService.getStationContent({
          week: `W${weekNumber}`,
          station: '2',
          mode: 'learn'
        });
        if (items && items.length >= 10) {
          setQuestions(items.slice(0, 10));
        } else {
          setQuestions(FALLBACK_CHECK_QUESTIONS);
        }
      } catch (e) {
        console.error('Failed to load check mode questions', e);
        setQuestions(FALLBACK_CHECK_QUESTIONS);
      }
    }
    loadExamContent();
  }, [weekNumber]);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (optionTokens) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.content_id]: optionTokens
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
    const evaluatedResults = [];

    for (const q of questions) {
      const userAnsTokens = selectedAnswers[q.content_id] || [];
      const evalRes = evaluateSentenceAttempt(userAnsTokens, q.answer_key);

      const score = evalRes.isCorrect ? (evalRes.isMinorError ? 90 : 100) : 0;
      totalScore += score;

      await learnerProgressService.logAttempt({
        learnerId: 'learner_default_01',
        contentId: q.content_id,
        mode: 'check',
        result: evalRes.isCorrect ? (evalRes.isMinorError ? 'minor_error' : 'correct') : 'incorrect',
        hintUsed: false,
        minorErrors: evalRes.minorErrors,
        diagnosticTag: evalRes.diagnosticTag,
        score: score,
        timeSpentSeconds: Math.round(totalTimeSpent / Math.max(1, questions.length))
      });

      evaluatedResults.push({
        contentId: q.content_id,
        grammarTag: q.raw_content?.grammar_tag || 'grammar',
        score: score,
        evalRes
      });
    }

    const finalAvgScore = Math.round(totalScore / Math.max(1, questions.length));

    setResultsSummary({
      totalQuestions: questions.length,
      finalAvgScore,
      totalTimeSpent,
      evaluatedResults
    });
    setIsCompleted(true);
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 font-bold animate-pulse">
        Loading Cambridge Check Mode Exam...
      </div>
    );
  }

  if (isCompleted && resultsSummary) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl text-slate-900 font-sans">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <FileText size={32} />
          </div>
          <h3 className="text-2xl font-black text-slate-900">Grammar Check Mode Completed</h3>
          <p className="text-xs text-slate-500 font-medium">10-question isolated exam results saved to learner progress.</p>
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
            setStartTime(Date.now());
          }}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-base transition flex items-center justify-center gap-2 shadow-md"
        >
          <RefreshCw size={18} /> Retake 10-Question Check Mode Exam
        </button>
      </div>
    );
  }

  if (!currentQ) return null;

  const validOptionA = currentQ.answer_key?.valid_structures[0] || [];
  const validOptionB = currentQ.answer_key?.valid_structures[1] || validOptionA;
  const invalidOptionC = [...validOptionA].sort(() => 0.5 - Math.random());

  const options = [
    { label: 'A', tokens: validOptionA },
    { label: 'B', tokens: validOptionB },
    { label: 'C', tokens: invalidOptionC }
  ];

  const currentSelection = selectedAnswers[currentQ.content_id];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl font-sans">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-black text-slate-500 uppercase tracking-widest">
            CAMBRIDGE FLYERS & PET — GRAMMAR CHECK MODE
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-600">
          <ShieldCheck size={14} className="text-emerald-600" /> Isolated Exam Mode (10 Questions)
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
        <p className="text-xs font-bold text-slate-600 mb-1">
          Exam Directive: Choose the correct grammatical sentence structure.
        </p>
        <p className="text-sm font-black text-slate-900">
          {currentQ.raw_content?.text_en || currentQ.raw_content?.text} ({currentQ.raw_content?.grammar_tag || 'grammar'})
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {options.map((opt) => {
          const optStr = opt.tokens.join(' ').replace(/\s+([.,!?:;])/g, '$1');
          const isSelected = currentSelection && currentSelection.join(' ') === opt.tokens.join(' ');

          return (
            <button
              key={opt.label}
              onClick={() => handleSelectOption(opt.tokens)}
              className={`w-full p-4 rounded-xl text-left border transition-all flex items-start gap-4 ${
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
              <span className="text-sm font-bold leading-relaxed">{optStr}</span>
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
