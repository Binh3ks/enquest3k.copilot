import React, { useState } from 'react';
import { BarModelSVG } from '../components/BarModelSVG';
import { evaluateBarModelAnswer } from '../../../../utils/barModelEvaluator';
import { learnerProgressService } from '../../../../services/learnerProgressService';
import { CheckCircle2, AlertCircle, Sparkles, HelpCircle } from 'lucide-react';

const MOCK_BAR_QUESTIONS = [
  {
    id: 'bar_w33_01',
    title: 'Bài toán Sơ Đồ Thanh W33 - Tải trọng Hang Động (Part-Whole)',
    problemText: 'Đoàn thám hiểm chia thành 2 nhóm mang đồ. Nhóm A mang 60 kg thiết bị. Nhóm B mang 40 kg thiết bị. Hỏi tổng trọng lượng thiết bị cả đoàn mang là bao nhiêu kg?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Nhóm A (60 kg)', value: 60, color: '#4f46e5' },
        { label: 'Nhóm B (40 kg)', value: 40, color: '#06b6d4' }
      ],
      totalLabel: '? kg'
    },
    correctAnswer: 100,
    hintText: 'Nhìn vào sơ đồ thanh tổng: Trọng lượng cả đoàn = Nhóm A + Nhóm B = 60 + 40.'
  },
  {
    id: 'bar_w33_02',
    title: 'Bài toán So Sánh Sơ Đồ Thanh W33 - Pha lê Hang Động (Comparison)',
    problemText: 'Nhà thám hiểm Leo thu thập được 24 viên pha lê. Nhà thám hiểm Mia thu thập được 15 viên pha lê. Hỏi Leo thu thập nhiều hơn Mia bao nhiêu viên pha lê?',
    modelData: {
      type: 'comparison',
      bars: [
        { name: 'Leo', label: '24 viên', width: 240 },
        { name: 'Mia', label: '15 viên', width: 150 }
      ]
    },
    correctAnswer: 9,
    hintText: 'Chênh lệch giữa 2 thanh = Số viên của Leo - Số viên của Mia = 24 - 15.'
  },
  {
    id: 'bar_w34_01',
    title: 'Bài toán Sơ Đồ Thanh W34 - Cuộn dây thừng Thám hiểm (Part-Whole)',
    problemText: 'Đội cứu hộ có 3 cuộn dây thừng lần lượt dài 15m, 25m và 30m. Hỏi tổng độ dài dây thừng đội cứu hộ có là bao nhiêu mét?',
    modelData: {
      type: 'part_whole',
      bars: [
        { label: 'Cuộn 1 (15m)', value: 21, color: '#4f46e5' },
        { label: 'Cuộn 2 (25m)', value: 35, color: '#06b6d4' },
        { label: 'Cuộn 3 (30m)', value: 44, color: '#10b981' }
      ],
      totalLabel: '? m'
    },
    correctAnswer: 70,
    hintText: 'Tổng độ dài = 15 + 25 + 30 = 70 mét.'
  },
  {
    id: 'bar_w34_02',
    title: 'Bài toán So Sánh Sơ Đồ Thanh W34 - Bản đồ Cổ (Comparison)',
    problemText: 'Trong kho báu có 80 mảnh bản đồ. Nhóm 1 ghép được 45 mảnh. Hỏi nhóm 1 còn thiếu bao nhiêu mảnh bản đồ nữa để hoàn chỉnh?',
    modelData: {
      type: 'comparison',
      bars: [
        { name: 'Tổng số', label: '80 mảnh', width: 280 },
        { name: 'Đã ghép', label: '45 mảnh', width: 160 }
      ]
    },
    correctAnswer: 35,
    hintText: 'Số mảnh còn thiếu = 80 - 45 = 35 mảnh.'
  }
];

export function BarModelQuest({ onAttemptResult }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const currentQ = MOCK_BAR_QUESTIONS[questionIndex];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use enhanced evaluation engine supporting mixed units ("100kg" -> 100) and rejecting decimals/negatives
    const evalRes = evaluateBarModelAnswer(userInput, currentQ.correctAnswer);

    if (!evalRes.isCorrect && evalRes.errorMsg && evalRes.errorMsg.includes('không')) {
      setFeedback({ isCorrect: false, text: evalRes.errorMsg });
      return;
    }

    const isCorrect = evalRes.isCorrect;
    const resultText = isCorrect
      ? 'Chính xác 100%! Bạn đã tính toán đúng mô hình thanh!'
      : evalRes.errorMsg;

    setFeedback({ isCorrect, text: resultText });

    // Log attempt
    await learnerProgressService.logAttempt({
      learnerId: 'learner_default_01',
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
    setQuestionIndex((prev) => (prev + 1) % MOCK_BAR_QUESTIONS.length);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl text-white">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
        <div>
          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-bold uppercase tracking-wider">
            Station 2 — Singapore Bar Model Quest (W33-W34 Content)
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-amber-400 mt-2">
            {currentQ.title}
          </h2>
        </div>
        <span className="text-xs text-slate-400 font-mono bg-slate-800 px-3 py-1.5 rounded-xl">
          Bài {questionIndex + 1} / {MOCK_BAR_QUESTIONS.length}
        </span>
      </div>

      {/* Problem Description */}
      <p className="text-base text-slate-200 leading-relaxed font-medium mb-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        {currentQ.problemText}
      </p>

      {/* Interactive Bar Model SVG Visual */}
      <BarModelSVG modelData={currentQ.modelData} />

      {/* Input Answer Form */}
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center gap-4">
        <div className="flex-1 w-full flex items-center gap-3">
          <label className="text-sm font-bold text-slate-300 whitespace-nowrap">
            Đáp án số của bạn:
          </label>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Nhập số (VD: 100 hoặc 100 kg)..."
            className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-lg font-bold text-amber-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button
          type="submit"
          disabled={!userInput.trim()}
          className="w-full sm:w-auto px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Sparkles size={16} /> Kiểm tra đáp án
        </button>
      </form>

      {/* Hint Accordion */}
      <div className="mt-4">
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
        >
          <HelpCircle size={14} /> {showHint ? 'Ẩn gợi ý giải thích' : 'Xem gợi ý sơ đồ thanh'}
        </button>
        {showHint && (
          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-cyan-500/30 text-xs text-cyan-200">
            {currentQ.hintText}
          </div>
        )}
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          className={`mt-6 p-4 rounded-2xl flex items-center justify-between gap-3 ${
            feedback.isCorrect
              ? 'bg-emerald-950/60 border border-emerald-500 text-emerald-200'
              : 'bg-rose-950/60 border border-rose-500 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-3 text-sm font-medium">
            {feedback.isCorrect ? <CheckCircle2 size={24} className="text-emerald-400" /> : <AlertCircle size={24} className="text-rose-400" />}
            <span>{feedback.text}</span>
          </div>

          {feedback.isCorrect && (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs whitespace-nowrap"
            >
              Bài tiếp theo →
            </button>
          )}
        </div>
      )}
    </div>
  );
}
