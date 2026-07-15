/**
 * PeriodicAssessmentModal
 * Sprint 2: 4-Week Checkpoint Quiz
 *
 * Triggers after student completes week 4, 8, 12, 16...
 * 10 vocab multiple-choice questions from the last 4 weeks.
 * Shows score, comparison to previous block, and Zalo-ready report.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle, XCircle, Star, BarChart2, Copy, ChevronRight, RefreshCw } from 'lucide-react';
import { assessmentAPI } from '../../services/api';
import { loadWeekData } from '../../data/weeks/index';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Load vocab from a list of week IDs.
 * Returns flat array of { word, definition_vi, definition_en, week_id }
 */
async function loadVocabForWeeks(weekIds) {
  const all = [];
  for (const wId of weekIds) {
    try {
      const data = await loadWeekData(wId, false);
      if (!data) continue;
      const vocab = data.target_vocab || [];
      vocab.forEach(v => {
        if (v.word && v.definition_vi) {
          all.push({ word: v.word, definition_vi: v.definition_vi, definition_en: v.definition_en || '', week_id: wId });
        }
      });
    } catch (e) {
      console.warn(`[Assessment] Failed to load week ${wId} vocab`, e);
    }
  }
  return all;
}

/**
 * Build 10 MC questions from vocab pool.
 * Each question: "What does '[word]' mean?" → 4 Vietnamese options.
 */
function buildQuestions(vocabPool, count = 10) {
  if (vocabPool.length < 4) return [];
  const selected = shuffle(vocabPool).slice(0, Math.min(count, vocabPool.length));
  const allDefs = vocabPool.map(v => v.definition_vi);

  return selected.map(item => {
    const correct = item.definition_vi;
    const distractors = shuffle(allDefs.filter(d => d !== correct)).slice(0, 3);
    const options = shuffle([correct, ...distractors]);
    return { word: item.word, correct, options, week_id: item.week_id };
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ScoreBar({ pct, label, color = 'indigo' }) {
  const colors = {
    indigo: 'bg-indigo-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };
  const barColor = pct >= 80 ? colors.green : pct >= 50 ? colors.yellow : colors.red;
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-400 font-bold">
        <span>{label}</span>
        <span className={pct >= 80 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400'}>{pct}%</span>
      </div>
      <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function PeriodicAssessmentModal({ isOpen, onClose, pendingData, studentName }) {
  const { block = 1, weeks = [], trigger_week = 4 } = pendingData || {};

  const [phase, setPhase] = useState('loading'); // loading | quiz | results
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({}); // { qIndex: chosenOption }
  const [selected, setSelected] = useState(null); // option selected for current q (before next)
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  // Load vocab and build questions
  useEffect(() => {
    if (!isOpen || !weeks.length) return;
    setPhase('loading');
    setAnswers({});
    setCurrent(0);
    setSelected(null);

    loadVocabForWeeks(weeks).then(vocab => {
      const qs = buildQuestions(vocab, 10);
      if (qs.length < 4) {
        // Not enough vocab content for this block yet — close silently, do NOT fake a score
        console.warn('[Assessment] Not enough vocab to build quiz for weeks:', weeks);
        onClose();
      } else {
        setQuestions(qs);
        setPhase('quiz');
      }
    });
  }, [isOpen, block]);

  const handleAnswer = (option) => {
    if (selected !== null) return; // already answered
    setSelected(option);
    setAnswers(prev => ({ ...prev, [current]: option }));
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(c => c + 1);
      setSelected(null);
    } else {
      // Quiz done
      const correct = Object.entries(answers).filter(([i, ans]) => ans === questions[i]?.correct).length +
        (selected === questions[current]?.correct ? 1 : 0);
      const total = questions.length;
      // Count the last answered question
      const finalCorrect = questions.filter((q, i) => answers[i] === q.correct || (i === current && selected === q.correct)).length;
      handleSubmit(finalCorrect, total);
    }
  };

  const handleSubmit = useCallback(async (correct, total) => {
    setPhase('results_loading');
    try {
      const res = await assessmentAPI.submit({ block, trigger_week, correct, total });
      setHistory(res.data?.history || []);
    } catch (e) {
      console.error('Assessment submit error:', e);
      setHistory([]);
    }
    setPhase('results');
  }, [block, trigger_week]);

  if (!isOpen) return null;

  // ── Results ──
  if (phase === 'results' || phase === 'results_loading') {
    const prevBlock = history.find(h => h.block === block - 1);
    const thisBlock = history.find(h => h.block === block);

    // Prefer DB-stored correct/total (authoritative). Fall back to in-session answers.
    const totalQs   = thisBlock ? Number(thisBlock.total)   : (questions.length || 10);
    const correctCount = thisBlock ? Number(thisBlock.correct) : questions.filter((q, i) => answers[i] === q.correct).length;
    const scorePct  = totalQs > 0 ? Math.round((correctCount / totalQs) * 100) : 0;
    const displayPct = thisBlock?.total_pct ?? scorePct;

    const blockLabel = `W${(block - 1) * 4 + 1}–${block * 4}`;
    const grade = displayPct >= 90 ? '🏆 Xuất sắc!' : displayPct >= 70 ? '⭐ Tốt lắm!' : displayPct >= 50 ? '📚 Cần ôn thêm' : '💪 Cố gắng lên!';

    const zaloReport =
      `📊 Kết quả Mini Quiz Vocab – EngQuest\n` +
      `👤 Học sinh: ${studentName || 'HS'}\n` +
      `📅 Lần ${block} (${blockLabel}): ${displayPct}% (${correctCount}/${totalQs} câu đúng)\n` +
      (prevBlock ? `📈 Lần trước: ${prevBlock.total_pct}% → Lần này: ${displayPct}%\n` : '') +
      `${grade}\n` +
      `🔗 app.bkbacademy.vn`;

    const copyZalo = () => {
      navigator.clipboard.writeText(zaloReport).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    };

    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <div>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Mini Quiz #{block}</p>
              <h2 className="text-white font-black text-lg">Vocab · {blockLabel}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400">
              <X size={18}/>
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Big score */}
            <div className="text-center">
              <p className="text-6xl font-black text-white">{displayPct}<span className="text-2xl text-gray-400">%</span></p>
              <p className="text-lg mt-1">{grade}</p>
              <p className="text-sm text-gray-400 mt-1">{correctCount}/{totalQs} câu đúng</p>
            </div>

            {/* Progress over blocks */}
            {history.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 font-bold uppercase">Tiến trình</p>
                {history.map(h => (
                  <ScoreBar
                    key={h.block}
                    label={`Mini Quiz #${h.block} (W${(h.block-1)*4+1}–${h.block*4})`}
                    pct={h.total_pct}
                  />
                ))}
              </div>
            )}

            {/* Comparison */}
            {prevBlock && (
              <div className={`rounded-xl px-4 py-3 text-sm font-bold ${displayPct >= prevBlock.total_pct ? 'bg-green-900/30 text-green-300 border border-green-700/30' : 'bg-red-900/30 text-red-300 border border-red-700/30'}`}>
                {displayPct >= prevBlock.total_pct
                  ? `📈 Tiến bộ +${displayPct - prevBlock.total_pct}% so với lần trước!`
                  : `📉 Giảm ${prevBlock.total_pct - displayPct}% so với lần trước — cần ôn luyện thêm.`}
              </div>
            )}

            {/* Zalo report */}
            <button
              onClick={copyZalo}
              className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-700 hover:bg-indigo-600 rounded-xl text-sm font-bold text-white transition-colors"
            >
              <Copy size={14}/>
              {copied ? '✓ Đã copy báo cáo Zalo!' : '📤 Copy báo cáo gửi phụ huynh (Zalo)'}
            </button>

            {/* Dashboard CTA */}
            <div className="bg-indigo-950/60 border border-indigo-700/30 rounded-xl px-4 py-3 text-center">
              <p className="text-xs text-indigo-300 font-bold">📊 Phụ huynh xem báo cáo đầy đủ tại</p>
              <p className="text-xs text-indigo-400 mt-0.5 font-mono">app.bkbacademy.vn → Theo Dõi Học Tập</p>
            </div>

            <button onClick={onClose} className="w-full py-2.5 rounded-xl text-xs text-gray-500 hover:text-gray-300 font-bold transition-colors">
              Đóng
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading ──
  if (phase === 'loading' || phase === 'results_loading') {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70">
        <div className="text-white text-center">
          <RefreshCw size={32} className="mx-auto mb-3 animate-spin text-indigo-400"/>
          <p className="font-bold">Đang tải bài kiểm tra…</p>
        </div>
      </div>
    );
  }

  // ── Quiz ──
  const q = questions[current];
  if (!q) return null;

  const isAnswered = selected !== null;
  const isCorrect = selected === q.correct;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">Checkpoint {block} · Tuần {weeks[0]}–{weeks[weeks.length-1]}</p>
              <p className="text-white font-black">Câu {current + 1}/{questions.length}</p>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-gray-400">
              <X size={18}/>
            </button>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${((current) / questions.length) * 100}%` }}/>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Question */}
          <div className="text-center">
            <p className="text-xs text-gray-500 font-bold uppercase mb-2">"{q.word}" có nghĩa là gì?</p>
            <p className="text-3xl font-black text-white">{q.word}</p>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {q.options.map((opt, i) => {
              let style = 'bg-gray-800 border-gray-700 text-white hover:border-indigo-500 hover:bg-gray-750';
              if (isAnswered) {
                if (opt === q.correct) style = 'bg-green-900/40 border-green-500 text-green-300';
                else if (opt === selected && opt !== q.correct) style = 'bg-red-900/40 border-red-500 text-red-300';
                else style = 'bg-gray-800/50 border-gray-700/50 text-gray-500';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  disabled={isAnswered}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${style}`}
                >
                  <span className="mr-2 text-gray-500">{String.fromCharCode(65+i)}.</span> {opt}
                  {isAnswered && opt === q.correct && <CheckCircle size={14} className="inline ml-2 text-green-400"/>}
                  {isAnswered && opt === selected && opt !== q.correct && <XCircle size={14} className="inline ml-2 text-red-400"/>}
                </button>
              );
            })}
          </div>

          {/* Feedback + Next */}
          {isAnswered && (
            <div className="space-y-3">
              <div className={`text-center text-sm font-bold py-2 rounded-lg ${isCorrect ? 'text-green-400 bg-green-900/20' : 'text-red-400 bg-red-900/20'}`}>
                {isCorrect ? '✅ Chính xác!' : `❌ Đáp án đúng: "${q.correct}"`}
              </div>
              <button
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold text-white transition-colors"
              >
                {current + 1 < questions.length ? (
                  <><ChevronRight size={16}/> Câu tiếp theo</>
                ) : (
                  <><Star size={16}/> Xem kết quả</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
