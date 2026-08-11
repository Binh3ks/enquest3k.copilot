import React, { useState, useEffect } from 'react';
import { contentBankService } from '../../../../services/contentBankService';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { evaluateSentenceAttempt } from '../../../../services/answerMatchingEngine';
import { ShieldCheck, CheckCircle2, ArrowRight, RefreshCw, FileText } from 'lucide-react';

export function Station2CheckMode({ onFinishCheckMode }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [resultsSummary, setResultsSummary] = useState(null);
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    async function loadExamContent() {
      setLoading(true);
      try {
        const items = await contentBankService.getStationContent({
          week: 'W33',
          station: '2',
          mode: 'learn' // Same content bank items, rendered exam-style!
        });
        setQuestions(items);
        setStartTime(Date.now());
      } catch (e) {
        console.error('Failed to load check mode questions', e);
      } finally {
        setLoading(false);
      }
    }
    loadExamContent();
  }, []);

  const currentQ = questions[currentIndex];

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

      // Log to Learner Progress Layer with mode: 'check'
      await learnerProgressService.logAttempt({
        learnerId: 'learner_default_01',
        contentId: q.content_id,
        mode: 'check', // ISOLATED CHECK MODE RECORD
        result: evalRes.isCorrect ? (evalRes.isMinorError ? 'minor_error' : 'correct') : 'incorrect',
        hintUsed: false,
        minorErrors: evalRes.minorErrors,
        diagnosticTag: evalRes.diagnosticTag,
        score: score,
        timeSpentSeconds: Math.round(totalTimeSpent / questions.length)
      });

      evaluatedResults.push({
        contentId: q.content_id,
        grammarTag: q.raw_content.grammar_tag,
        score: score,
        evalRes
      });
    }

    const finalAvgScore = Math.round(totalScore / questions.length);

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
      <div className="flex flex-col items-center justify-center py-20 text-slate-400">
        <RefreshCw className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
        <p className="text-sm font-medium">Đang tải đề thi Cambridge Check Mode...</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="w-full max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl font-sans">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-100 text-indigo-700 rounded-xl">
              <FileText size={24} />
            </div>
            <div>
              <span className="text-xs text-indigo-600 font-bold uppercase tracking-wider">Cambridge Assessment Result</span>
              <h2 className="text-2xl font-black text-slate-900">KẾT QUẢ BÀI THI CHECK MODE (TRẠM 2)</h2>
            </div>
          </div>
          <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-mono font-bold rounded-lg">
            Mode: Check
          </span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold uppercase">Điểm Trung Bình</div>
            <div className="text-3xl font-black text-indigo-600">{resultsSummary.finalAvgScore} / 100</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold uppercase">Số Câu Đã Thi</div>
            <div className="text-3xl font-black text-slate-800">{resultsSummary.totalQuestions} câu</div>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold uppercase">Thời Gian</div>
            <div className="text-3xl font-black text-slate-800">{resultsSummary.totalTimeSpent}s</div>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <h4 className="text-sm font-bold text-slate-700 uppercase">Chi tiết từng câu:</h4>
          {resultsSummary.evaluatedResults.map((r, idx) => (
            <div key={r.contentId} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-sm">
              <span className="font-semibold text-slate-800">Câu {idx + 1} ({r.grammarTag}):</span>
              <span className={`font-bold ${r.score >= 90 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {r.score >= 90 ? `ĐẠT (${r.score}%)` : 'CHƯA ĐẠT (0%)'}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setIsCompleted(false);
            setCurrentIndex(0);
            setSelectedAnswers({});
            setStartTime(Date.now());
          }}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-base transition flex items-center justify-center gap-2 shadow-md"
        >
          <RefreshCw size={18} /> Làm lại bài thi Check Mode
        </button>
      </div>
    );
  }

  // Generate standardized Cambridge MCQ options for current question
  const validOptionA = currentQ.answer_key.valid_structures[0];
  const validOptionB = currentQ.answer_key.valid_structures[1] || currentQ.answer_key.valid_structures[0];
  const invalidOptionC = [...validOptionA].sort(() => 0.5 - Math.random());

  const options = [
    { label: 'A', tokens: validOptionA },
    { label: 'B', tokens: validOptionB },
    { label: 'C', tokens: invalidOptionC }
  ];

  const currentSelection = selectedAnswers[currentQ.content_id];

  return (
    <div className="w-full max-w-3xl mx-auto bg-white text-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-300 shadow-xl font-sans">
      {/* Cambridge Standard Minimal Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            CAMBRIDGE FLYERS & PET — GRAMMAR CHECK MODE
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Question {currentIndex + 1} of {questions.length}
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-slate-600">
          <ShieldCheck size={14} className="text-emerald-600" /> Isolated Exam Mode
        </div>
      </div>

      {/* Question Text */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6">
        <p className="text-sm font-semibold text-slate-700 mb-1">
          Exam Directive: Choose the correct grammatical sentence structure.
        </p>
        <p className="text-base font-bold text-slate-900">
          {currentQ.raw_content.text} ({currentQ.raw_content.grammar_tag})
        </p>
      </div>

      {/* Standard Multiple-Choice Options */}
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
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-500'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
              }`}
            >
              <span className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs shrink-0 ${
                isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {opt.label}
              </span>
              <span className="text-base leading-relaxed">{optStr}</span>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-sm transition disabled:opacity-40"
        >
          ← Previous
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmitExam}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            <CheckCircle2 size={16} /> Submit Exam
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-sm transition flex items-center gap-2 shadow-md"
          >
            Next Question <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
