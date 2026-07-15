import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ChevronRight, AlertTriangle, Trophy, RefreshCw, Pencil } from 'lucide-react';
import { assessmentAPI } from '../services/api';

const SESSIONS = ['vocab', 'grammar', 'reading', 'writing'];

const SESSION_META = {
  vocab: { label: 'Vocabulary', color: 'blue', emoji: '📖' },
  grammar: { label: 'Grammar', color: 'purple', emoji: '✏️' },
  reading: { label: 'Reading', color: 'emerald', emoji: '📚' },
  writing: { label: 'Writing', color: 'amber', emoji: '🖊️' },
};

/**
 * CheckpointAssessment
 * Props:
 *   checkpointData  — imported from src/data/checkpoints/checkpoint_wNN.js
 *   weekNumber      — number (14 | 26 | 36 | 54)
 *   isVi            — boolean
 *   onComplete      — callback({ passed, failedSessions, remediationPlan })
 *   onClose         — callback to dismiss modal
 */
export default function CheckpointAssessment({ checkpointData, weekNumber, isVi, onComplete, onClose }) {
  const [sessionIdx, setSessionIdx] = useState(0);
  const [phase, setPhase] = useState('intro'); // intro | quiz | writing | result
  
  // Quiz state (vocab + grammar + reading)
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [sessionScore, setSessionScore] = useState(0);

  // Writing state
  const [writingText, setWritingText] = useState('');

  // Accumulated results
  const [results, setResults] = useState([]); // { session, score, total, passed }

  if (!checkpointData) return null;

  const currentSession = SESSIONS[sessionIdx];
  const meta = SESSION_META[currentSession];

  // ─── Vocab / Grammar / Reading Quiz ─────────────────────────────────────

  const getQuestions = () => {
    if (currentSession === 'vocab') return checkpointData.vocab_test?.questions || [];
    if (currentSession === 'grammar') return checkpointData.grammar_test?.questions || [];
    if (currentSession === 'reading') return checkpointData.reading?.questions || [];
    return [];
  };

  const getThreshold = () => {
    if (currentSession === 'vocab') return checkpointData.vocab_test?.pass_threshold || 0.75;
    if (currentSession === 'grammar') return checkpointData.grammar_test?.pass_threshold || 0.70;
    if (currentSession === 'reading') return checkpointData.reading?.pass_threshold || 0.70;
    return 0.70;
  };

  const questions = getQuestions();
  const currentQ = questions[qIdx];

  const handleSelectOption = (opt) => {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    const correct = opt === currentQ.answer;
    const newScore = sessionScore + (correct ? 1 : 0);

    setTimeout(() => {
      setSelected(null);
      setAnswered(false);
      if (qIdx + 1 < questions.length) {
        setQIdx((i) => i + 1);
        setSessionScore(newScore);
      } else {
        // Session finished
        finaliseQuizSession(newScore, questions.length);
      }
    }, 700);
  };

  const finaliseQuizSession = (score, total) => {
    const threshold = getThreshold();
    const passed = score / total >= threshold;
    const newResult = { session: currentSession, score, total, passed };
    setResults((prev) => [...prev, newResult]);

    if (sessionIdx + 1 < SESSIONS.length) {
      setSessionIdx((i) => i + 1);
      setQIdx(0);
      setSessionScore(0);
      setPhase(SESSIONS[sessionIdx + 1] === 'writing' ? 'writing' : 'quiz');
    } else {
      setPhase('result');
    }
  };

  // ─── Writing session ─────────────────────────────────────────────────────

  const handleWritingSubmit = () => {
    const wordCount = writingText.trim().split(/\s+/).filter(Boolean).length;
    const minWords = checkpointData.writing?.min_words || 20;
    const threshold = checkpointData.writing?.rubric_threshold || 7;
    // Simple pass: met min words (AI rubric would score later, here we use word count as proxy)
    const passed = wordCount >= minWords && wordCount >= 10;
    const newResult = { session: 'writing', score: wordCount, total: minWords, passed };
    const finalResults = [...results, newResult];
    setResults(finalResults);
    showResult(finalResults);
  };

  const showResult = (finalResults) => {
    setPhase('result');
    const failedSessions = finalResults.filter((r) => !r.passed).map((r) => r.session);
    const overallPassed = failedSessions.length === 0;
    const remediationPlan = failedSessions.map((s) => {
      const meta = SESSION_META[s];
      return `Review ${meta.label} from weeks ${Math.max(1, weekNumber - 13)}–${weekNumber}`;
    });
    // Save to localStorage (offline / same-device fallback)
    const key = `checkpoint_w${weekNumber}`;
    localStorage.setItem(key, JSON.stringify({
      completedAt: new Date().toISOString(),
      passed: overallPassed,
      results: finalResults,
      remediationPlan,
    }));
    // Save to server (authoritative — visible to teacher and parent)
    assessmentAPI.saveCheckpoint({
      week_num: weekNumber,
      passed: overallPassed,
      results: finalResults,
    }).catch(err => console.warn('[Checkpoint] DB save failed (will retry on next login):', err?.message));
    if (onComplete) onComplete({ passed: overallPassed, failedSessions, remediationPlan });
  };

  // ─── Intro screen ──────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-3">{checkpointData.badge || '🎯'}</div>
          <h2 className="text-2xl font-black text-slate-800 mb-1">{checkpointData.title || `Week ${weekNumber} Checkpoint`}</h2>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            {isVi
              ? `Hãy kiểm tra những gì bạn đã học từ W${Math.max(1, weekNumber - 13)}–W${weekNumber}. Bao gồm 4 phần: Từ vựng, Ngữ pháp, Đọc hiểu, và Viết.`
              : `Test what you've learnt from W${Math.max(1, weekNumber - 13)}–W${weekNumber}. 4 sessions: Vocabulary, Grammar, Reading, Writing.`}
          </p>
          <div className="flex gap-2 mb-6">
            {SESSIONS.map((s) => {
              const m = SESSION_META[s];
              return (
                <div key={s} className={`flex-1 bg-${m.color}-50 rounded-xl p-2 text-center`}>
                  <div className="text-lg">{m.emoji}</div>
                  <p className="text-xs font-bold text-slate-500">{m.label}</p>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setPhase('quiz')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl text-lg transition-colors"
          >
            {isVi ? 'Bắt đầu' : 'Begin Checkpoint'} <ChevronRight className="w-5 h-5 inline" />
          </button>
          {onClose && (
            <button onClick={onClose} className="mt-3 text-slate-400 hover:text-slate-600 text-sm">
              {isVi ? 'Để sau' : 'Remind me later'}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── Quiz screen ──────────────────────────────────────────────────────

  if (phase === 'quiz' && currentQ) {
    const isReading = currentSession === 'reading';
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{meta.emoji}</span>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">{meta.label}</p>
                <p className="text-xs text-slate-400">Q{qIdx + 1} / {questions.length}</p>
              </div>
            </div>
            <div className="flex gap-1">
              {SESSIONS.map((s, i) => (
                <div
                  key={s}
                  className={`w-6 h-2 rounded-full ${i < sessionIdx ? 'bg-green-500' : i === sessionIdx ? `bg-${meta.color}-500` : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>

          {/* Reading passage */}
          {isReading && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 text-slate-700 text-xs leading-relaxed max-h-36 overflow-y-auto">
              {checkpointData.reading.passage}
            </div>
          )}

          <p className="text-lg font-black text-slate-800 mb-4">{currentQ.q}</p>

          <div className="grid grid-cols-1 gap-2">
            {currentQ.options.map((opt) => {
              let cls = 'p-3 border-2 rounded-xl font-semibold text-left text-sm transition-all cursor-pointer ';
              if (!answered) {
                cls += `border-slate-200 hover:border-${meta.color}-400 hover:bg-${meta.color}-50 text-slate-700`;
              } else if (opt === currentQ.answer) {
                cls += 'border-green-500 bg-green-50 text-green-700';
              } else if (opt === selected) {
                cls += 'border-rose-400 bg-rose-50 text-rose-600';
              } else {
                cls += 'border-slate-100 bg-slate-50 text-slate-400';
              }
              return (
                <button key={opt} className={cls} onClick={() => handleSelectOption(opt)}>
                  {opt}
                  {answered && opt === currentQ.answer && <CheckCircle className="w-4 h-4 inline ml-2 text-green-500" />}
                  {answered && opt === selected && opt !== currentQ.answer && <XCircle className="w-4 h-4 inline ml-2 text-rose-500" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ─── Writing screen ──────────────────────────────────────────────────

  if (phase === 'writing') {
    const wordCount = writingText.trim().split(/\s+/).filter(Boolean).length;
    const minWords = checkpointData.writing?.min_words || 20;
    const met = wordCount >= minWords;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🖊️</span>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Writing</p>
              <p className="text-xs text-slate-400">Session 4 / 4</p>
            </div>
          </div>

          <p className="text-base font-black text-slate-800 mb-2">{checkpointData.writing.prompt}</p>

          {checkpointData.writing.hint && (
            <p className="text-xs text-slate-400 italic mb-3">{checkpointData.writing.hint}</p>
          )}

          <textarea
            value={writingText}
            onChange={(e) => setWritingText(e.target.value)}
            rows={5}
            placeholder={isVi ? "Viết câu trả lời của bạn tại đây..." : "Write your answer here..."}
            className="w-full p-4 border-2 rounded-2xl text-slate-700 border-slate-200 focus:border-amber-400 outline-none text-sm resize-none"
          />

          <div className="flex items-center justify-between mt-1 mb-4">
            <span className={`text-xs font-bold ${met ? 'text-green-600' : 'text-slate-400'}`}>
              {wordCount} / {minWords} {isVi ? 'từ' : 'words'} {met ? '✓' : ''}
            </span>
          </div>

          <button
            onClick={handleWritingSubmit}
            disabled={!met}
            className={`w-full py-4 rounded-2xl font-black text-white transition-colors ${met ? 'bg-amber-500 hover:bg-amber-600' : 'bg-slate-200 cursor-not-allowed text-slate-400'}`}
          >
            {isVi ? 'Nộp bài' : 'Submit Writing'}
          </button>
        </div>
      </div>
    );
  }

  // ─── Result screen ────────────────────────────────────────────────────

  if (phase === 'result') {
    const failedSessions = results.filter((r) => !r.passed);
    const overallPassed = failedSessions.length === 0;

    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center">
          {overallPassed ? (
            <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          ) : (
            <AlertTriangle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
          )}

          <h2 className="text-2xl font-black text-slate-800 mb-1">
            {overallPassed
              ? (isVi ? '🎉 Xuất sắc! Bạn qua checkpoint!' : '🎉 Checkpoint Passed!')
              : (isVi ? '📋 Cần ôn tập thêm' : 'Keep Practising')}
          </h2>
          <p className="text-slate-500 text-sm mb-6">
            {overallPassed
              ? (isVi ? `Hoàn thành tốt tất cả 4 kỹ năng.` : `All 4 sessions completed successfully.`)
              : (isVi
                ? `Bạn cần ôn lại: ${failedSessions.map((r) => SESSION_META[r.session].label).join(', ')}`
                : `Review needed: ${failedSessions.map((r) => SESSION_META[r.session].label).join(', ')}`)}
          </p>

          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {results.map((r) => {
              const m = SESSION_META[r.session];
              const pct = r.session === 'writing' ? (r.score >= r.total ? 100 : Math.round((r.score / r.total) * 100)) : Math.round((r.score / r.total) * 100);
              return (
                <div key={r.session} className={`rounded-2xl p-3 text-left ${r.passed ? 'bg-green-50 border border-green-200' : 'bg-rose-50 border border-rose-200'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-bold text-slate-500">{m.emoji} {m.label}</p>
                    {r.passed ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-rose-500" />}
                  </div>
                  <p className={`text-lg font-black ${r.passed ? 'text-green-700' : 'text-rose-600'}`}>
                    {r.session === 'writing' ? `${r.score} words` : `${r.score}/${r.total}`}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Remediation plan if failed */}
          {!overallPassed && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-5 text-left">
              <p className="text-xs font-black text-orange-600 uppercase mb-2">
                {isVi ? '📋 Kế hoạch ôn tập' : '📋 Remediation Plan'}
              </p>
              <ul className="space-y-1">
                {failedSessions.map((r) => (
                  <li key={r.session} className="text-xs text-orange-700">
                    • {isVi ? 'Ôn lại' : 'Review'} {SESSION_META[r.session].label} W{Math.max(1, weekNumber - 13)}–W{weekNumber}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl text-lg transition-colors"
          >
            {isVi ? 'Tiếp tục học' : 'Continue Learning'} →
          </button>
        </div>
      </div>
    );
  }

  return null;
}
