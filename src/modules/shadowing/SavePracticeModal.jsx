import React from 'react';
import { X, Sparkles, Mic, RotateCcw, ChevronRight, Play, Download } from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────
// SavePracticeModal — Setup + Summary screens for the inline challenge
//
// Split from the previous 7-phase state machine in 2026-06-29:
// - SETUP (here): bilingual countdown picker — opens on Save button click
// - PLAY_TTS / COUNTDOWN_321 / RECORDING / SCORING / SCORED: now inline
//   in <ChallengeBar /> so user can see the sentence to shadow
// - ALL_DONE (here): summary screen — opens when all sentences done
//
// State machine lives in useShadowingChallenge hook.
// ──────────────────────────────────────────────────────────────────────

export default function SavePracticeModal({
  isOpen,
  onClose,
  isVi,
  mode,                  // 'SETUP' | 'SUMMARY'
  countdownOptions = [10, 15, 20, 30],
  countdownDuration,
  onSelectCountdown,
  sentences,
  sessionScores,
  skippedIds,
  practiceMode,          // 'per-sentence' | 'whole-script'
  onSelectPracticeMode,
  onStart,
  onRetryWrong,
  onDownload,
  isBatchEvaluating = false,
  batchEvalProgress = null, // { done, total }
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-slate-800">
              {mode === 'SETUP'
                ? (isVi ? 'Thử thách Shadowing' : 'Shadowing Challenge')
                : (isVi ? 'Hoàn thành!' : 'All done!')}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {mode === 'SETUP' && (
          <SetupContent
            isVi={isVi}
            countdownOptions={countdownOptions}
            countdownDuration={countdownDuration}
            onSelectCountdown={onSelectCountdown}
            practiceMode={practiceMode}
            onSelectPracticeMode={onSelectPracticeMode}
            sentences={sentences}
            onStart={onStart}
          />
        )}

        {mode === 'SUMMARY' && (
          <SummaryContent
            isVi={isVi}
            sentences={sentences}
            sessionScores={sessionScores}
            skippedIds={skippedIds}
            onRetryWrong={onRetryWrong}
            onDownload={onDownload}
            onClose={onClose}
            isBatchEvaluating={isBatchEvaluating}
            batchEvalProgress={batchEvalProgress}
          />
        )}
      </div>
    </div>
  );
}

// ── SETUP: mode selector + countdown picker + Start ────────────────
function SetupContent({
  isVi, countdownOptions, countdownDuration, onSelectCountdown,
  practiceMode, onSelectPracticeMode, sentences, onStart,
}) {
  return (
    <div className="p-6">
      <div className="text-center mb-5">
        <div className="w-14 h-14 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-3">
          <Mic className="w-7 h-7 text-blue-600" />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          {isVi
            ? 'Nghe câu tiếng Anh, sau đó đọc theo khi mic bật. AI chấm điểm và cho phép thử lại.'
            : 'Listen to each English sentence, then read it aloud when the mic turns on. AI scores your speech and lets you retry.'}
        </p>
      </div>

      {/* Practice mode selector */}
      <div className="mb-5">
        <label className="block text-xs font-bold uppercase text-slate-500 mb-2 text-center">
          {isVi ? 'Chế độ luyện tập' : 'Practice mode'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSelectPracticeMode('per-sentence')}
            className={`p-3 rounded-xl text-left transition-all border-2 ${
              practiceMode === 'per-sentence'
                ? 'bg-indigo-50 border-indigo-400 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <p className={`text-sm font-bold ${practiceMode === 'per-sentence' ? 'text-indigo-700' : 'text-slate-700'}`}>
              {isVi ? 'Từng câu' : 'Per sentence'}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
              {isVi ? 'AI đánh giá ngay, có thể thử lại' : 'AI scores each one, retry allowed'}
            </p>
          </button>
          <button
            onClick={() => onSelectPracticeMode('whole-script')}
            className={`p-3 rounded-xl text-left transition-all border-2 ${
              practiceMode === 'whole-script'
                ? 'bg-indigo-50 border-indigo-400 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <p className={`text-sm font-bold ${practiceMode === 'whole-script' ? 'text-indigo-700' : 'text-slate-700'}`}>
              {isVi ? 'Cả bài' : 'Whole script'}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
              {isVi ? 'Tự động chuyển câu, AI đánh giá cuối' : 'Auto-advance, AI scores at end'}
            </p>
          </button>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-bold uppercase text-slate-500 mb-2 text-center">
          {isVi ? 'Thời gian ghi âm mỗi câu' : 'Recording time per sentence'}
        </label>
        <div className="flex justify-center gap-2">
          {countdownOptions.map(s => (
            <button
              key={s}
              onClick={() => onSelectCountdown(s)}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                countdownDuration === s
                  ? 'bg-indigo-500 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}s
            </button>
          ))}
        </div>
        <p className="text-center text-[10px] text-slate-400 mt-2">
          {isVi ? 'Mặc định 5s. Tăng nếu bạn cần thêm thời gian.' : '5s default. Increase if you need more time.'}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-5">
        <span className="px-3 py-1 bg-slate-100 rounded-full font-bold">
          {sentences.length} {isVi ? 'câu' : 'sentences'}
        </span>
      </div>

      <button
        onClick={onStart}
        className="w-full py-4 bg-blue-500 text-white rounded-xl font-bold text-base hover:bg-blue-600 transition-colors shadow-md"
      >
        {isVi ? 'Bắt đầu thử thách' : 'Start Challenge'}
      </button>
    </div>
  );
}

// ── SUMMARY: avg score + per-sentence list ─────────────────────────
function SummaryContent({ isVi, sentences, sessionScores, skippedIds, onRetryWrong, onDownload, onClose, isBatchEvaluating, batchEvalProgress }) {
  const safeScores = sessionScores || {};
  const completed = Object.values(safeScores).filter(s => s && typeof s === 'object');
  const avg = completed.length > 0
    ? Math.round(completed.reduce((sum, s) => sum + (s.score || 0), 0) / completed.length)
    : 0;
  const wrongCount = completed.filter(s => (s.score || 0) < 70).length;
  return (
    <div className="p-6">
      <div className="text-center mb-5">
        {isBatchEvaluating ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mb-3" />
            <p className="text-sm font-bold text-indigo-700">
              {isVi ? 'Đang chấm điểm tất cả...' : 'Evaluating all sentences...'}
            </p>
            {batchEvalProgress && (
              <p className="text-[10px] text-slate-500 mt-1">
                {batchEvalProgress.done} / {batchEvalProgress.total} {isVi ? 'câu' : 'sentences'}
              </p>
            )}
          </div>
        ) : (
          <>
            <SummaryRing score={avg} />
            <p className="text-xs text-slate-500 mt-2 uppercase tracking-wider">
              {isVi ? 'Điểm trung bình' : 'Average Score'}
            </p>
            <div className="flex justify-center gap-2 mt-3 text-xs text-slate-500">
              <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded font-bold">
                {completed.filter(s => (s.score || 0) >= 70).length} ✓
              </span>
              {wrongCount > 0 && (
                <span className="px-2 py-1 bg-rose-50 text-rose-700 rounded font-bold">
                  {wrongCount} ✗
                </span>
              )}
              {skippedIds && skippedIds.size > 0 && (
                <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded font-bold">
                  {skippedIds.size} {isVi ? 'bỏ qua' : 'skipped'}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="max-h-72 overflow-y-auto space-y-2 mb-5 border-t border-b border-slate-100 py-3">
        {sentences.map((sent, idx) => {
          const sd = sessionScores[sent.id];
          const wasSkipped = skippedIds && skippedIds.has(sent.id);
          const score = sd?.score ?? null;
          const colorClass = wasSkipped
            ? 'bg-slate-50 border-slate-200'
            : score == null
            ? 'bg-slate-50 border-slate-200'
            : score >= 80
            ? 'bg-emerald-50 border-emerald-200'
            : score >= 50
            ? 'bg-amber-50 border-amber-200'
            : 'bg-rose-50 border-rose-200';
          return (
            <div key={sent.id} className={`flex items-center gap-2 p-2 rounded-lg border ${colorClass}`}>
              <span className="text-[10px] font-bold text-slate-400 w-6 shrink-0">
                #{idx + 1}
              </span>
              <span className="flex-1 text-xs text-slate-700 line-clamp-1">
                {sent.text}
              </span>
              {score != null ? (
                <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
                  score >= 80 ? 'bg-emerald-500 text-white' :
                  score >= 50 ? 'bg-amber-500 text-white' :
                  'bg-rose-500 text-white'
                }`}>
                  {Math.round(score)}%
                </span>
              ) : wasSkipped ? (
                <span className="text-[10px] text-slate-500 font-bold">
                  {isVi ? 'BỎ QUA' : 'SKIP'}
                </span>
              ) : (
                <span className="text-[10px] text-slate-400">—</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        {wrongCount > 0 && (
          <>
            <button
              onClick={onDownload}
              className="flex-1 py-3 bg-slate-600 text-white rounded-xl font-bold text-sm hover:bg-slate-700 flex items-center justify-center gap-1"
            >
              <Download className="w-4 h-4" /> {isVi ? 'Tải bản ghi' : 'Download'}
            </button>
            <button
              onClick={onRetryWrong}
              className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-bold text-sm hover:bg-amber-600 flex items-center justify-center gap-1"
            >
              <RotateCcw className="w-4 h-4" /> {isVi ? 'Luyện lại câu sai' : 'Retry wrong'}
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className={`${wrongCount > 0 ? 'flex-1' : 'w-full'} py-3 bg-indigo-500 text-white rounded-xl font-bold text-sm hover:bg-indigo-600`}
        >
          {isVi ? 'Xong' : 'Done'}
        </button>
      </div>
    </div>
  );
}

// ── Summary ring (avg score) ───────────────────────────────────────
function SummaryRing({ score }) {
  const size = 100;
  const stroke = 8;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score || 0));
  const dash = `${(pct / 100) * c} ${c}`;
  const color = score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={dash}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-black text-slate-800">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}
