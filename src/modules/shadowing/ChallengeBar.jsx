import React from 'react';
import { Mic, Volume2, Square, RotateCcw, ChevronRight, Sparkles, X } from 'lucide-react';

// ──────────────────────────────────────────────────────────────────────
// ChallengeBar — Inline challenge UI overlay for the shadowing inline view.
// Renders the countdown/recording/score status ABOVE the sentence card so
// the user can still see the sentence to shadow.
//
// Phases handled inline:
//   - PLAY_TTS: audio icon + "Listening..."
//   - COUNTDOWN_321: 3-2-1 number
//   - RECORDING: circular timer + waveform + Skip/Stop
//   - SCORING: spinner
//   - SCORED: score ring + Try Again/Skip/Next
//
// Setup (SETUP) and Summary (ALL_DONE) live in modals.
// ──────────────────────────────────────────────────────────────────────

// ── Score ring (same colors as FullPracticeModal) ──────────────────
function ScoreRing({ score, size = 88, stroke = 8, autoAdvanceTimeLeft = 0 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score || 0));
  const dash = `${(pct / 100) * c} ${c}`;
  const color = score >= 80 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444';
  const advanceC = 2 * Math.PI * (r + stroke / 2 + 2);
  const advanceDash = autoAdvanceTimeLeft > 0
    ? `${(autoAdvanceTimeLeft / 3) * advanceC} ${advanceC}`
    : `0 ${advanceC}`;
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={dash}
        />
        {autoAdvanceTimeLeft > 0 && (
          <circle
            cx={size / 2} cy={size / 2} r={r + stroke / 2 + 2}
            fill="none" stroke="#f59e0b"
            strokeWidth={2} strokeLinecap="round"
            strokeDasharray={advanceDash}
            opacity="0.6"
          />
        )}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-black text-slate-800">{Math.round(pct)}%</span>
      </div>
    </div>
  );
}

// ── Circular depleting timer for RECORDING ─────────────────────────
function RecordTimer({ timeLeft, total }) {
  const size = 80;
  const stroke = 7;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, timeLeft / total));
  const dash = `${pct * c} ${c}`;
  return (
    <div className="relative inline-block" style={{ width: size, height: size }}>
      <svg className="-rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="#6366f1"
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={dash}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-black text-indigo-600">{timeLeft}</span>
        <span className="text-[8px] text-slate-400 uppercase tracking-wider">sec</span>
      </div>
    </div>
  );
}

// ── Waveform bars ──────────────────────────────────────────────────
function WaveformBars() {
  return (
    <div className="flex items-end gap-0.5 h-6">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-rose-400 rounded-full animate-pulse"
          style={{
            height: `${30 + Math.random() * 70}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ChallengeBar({
  state,
  PHASES,
  isLast,
  isVi,
  practiceMode = 'per-sentence',
  onTryAgain,
  onSkip,
  onStopEarly,
  onSkipAutoAdvance,
  playRecording,
  totalSentences,
}) {
  if (state.phase === PHASES.SETUP || state.phase === PHASES.ALL_DONE || state.phase === PHASES.BATCH_EVALUATING) return null;

  const currentScore = state.currentScore;

  // ── PLAY_TTS: brief "Listening" indicator ──────────────────────
  if (state.phase === PHASES.PLAY_TTS) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-3 mb-3 flex items-center gap-3">
        <Volume2 className="w-5 h-5 text-blue-500 animate-pulse shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-blue-700">
            {isVi ? 'Đang nghe câu mẫu...' : 'Listening to the sample...'}
          </p>
          <p className="text-[10px] text-blue-500">
            {isVi ? 'Hãy chú ý phát âm và ngữ điệu' : 'Pay attention to pronunciation and intonation'}
          </p>
        </div>
        <span className="text-[10px] font-bold text-blue-400 bg-blue-100 px-2 py-1 rounded">
          {state.currentIndex + 1}/{totalSentences}
        </span>
      </div>
    );
  }

  // ── COUNTDOWN_321: large 3-2-1 number ──────────────────────────
  if (state.phase === PHASES.COUNTDOWN_321) {
    return (
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 border-2 border-rose-200 rounded-2xl p-4 mb-3 flex items-center gap-4">
        {state.preCountdown > 0 ? (
          <>
            <div className="text-6xl font-black text-rose-500 animate-pulse w-16 text-center shrink-0">
              {state.preCountdown}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-rose-700">
                {isVi ? 'Chuẩn bị... sắp đến lượt bạn!' : 'Get ready... it\'s almost your turn!'}
              </p>
              <p className="text-[10px] text-rose-500">
                {isVi ? 'Đọc to và rõ ràng khi số đếm về 0' : 'Read aloud clearly when the count hits 0'}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-3xl font-black text-indigo-600 w-16 text-center shrink-0">
              {isVi ? 'NÓI!' : 'GO!'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-indigo-700">
                {isVi ? 'Bắt đầu nói ngay bây giờ!' : 'Start speaking now!'}
              </p>
            </div>
          </>
        )}
        <span className="text-[10px] font-bold text-rose-400 bg-rose-100 px-2 py-1 rounded">
          {state.currentIndex + 1}/{totalSentences}
        </span>
      </div>
    );
  }

  // ── RECORDING: timer + waveform + Skip/Stop ────────────────────
  if (state.phase === PHASES.RECORDING) {
    if (state.micError === 'mic_denied') {
      return (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3 mb-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-rose-700">
              {isVi ? 'Không có quyền truy cập mic' : 'Microphone access denied'}
            </p>
            <p className="text-[10px] text-rose-500">
              {isVi ? 'Vui lòng cho phép truy cập mic trong cài đặt trình duyệt và thử lại.' : 'Please allow microphone access in your browser settings and retry.'}
            </p>
          </div>
          <button
            onClick={onTryAgain}
            className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600 shrink-0"
          >
            {isVi ? 'Thử lại' : 'Retry'}
          </button>
        </div>
      );
    }
    const isPaused = state.isPaused;
    return (
      <div className="bg-gradient-to-r from-rose-50 to-rose-100 border-2 border-rose-300 rounded-2xl p-3 mb-3 flex items-center gap-3">
        <RecordTimer timeLeft={state.recordTimeLeft} total={state.countdownDuration + (state.sentenceStats?.[state.currentSentenceId]?.extendedSeconds || 0)} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-rose-700 flex items-center gap-1">
            <Mic className="w-3.5 h-3.5" />
            {isPaused
              ? (isVi ? 'Tạm dừng — bấm Play để tiếp tục' : 'Paused — press Play to resume')
              : (isVi ? 'Đang ghi âm... đọc ngay' : 'Recording... speak now')}
          </p>
          {!isPaused && (
            <div className="mt-1">
              <WaveformBars />
            </div>
          )}
          {state.sentenceStats?.[state.currentSentenceId]?.extendedSeconds > 0 && (
            <p className="text-[10px] text-rose-500 mt-0.5 italic">
              {isVi ? `+${state.sentenceStats[state.currentSentenceId].extendedSeconds}s thêm (hệ thống tự động)` : `+${state.sentenceStats[state.currentSentenceId].extendedSeconds}s extra (auto-extended)`}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={onStopEarly}
            disabled={isPaused}
            className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
              isPaused
                ? 'bg-slate-300 text-slate-400 cursor-not-allowed'
                : 'bg-slate-700 text-white hover:bg-slate-800'
            }`}
            title={isPaused ? (isVi ? 'Đang tạm dừng' : 'Paused') : (isVi ? 'Dừng sớm' : 'Stop early')}
          >
            <Square className="w-3 h-3" /> {isVi ? 'Dừng' : 'Stop'}
          </button>
          <button
            onClick={onSkip}
            className="px-2.5 py-1.5 bg-white text-slate-600 rounded-lg text-[10px] font-bold border border-slate-200 hover:bg-slate-50"
            title={isVi ? 'Bỏ qua câu này' : 'Skip this sentence'}
          >
            {isVi ? 'Bỏ qua' : 'Skip'}
          </button>
        </div>
        <span className="text-[10px] font-bold text-rose-500 bg-white px-1.5 py-0.5 rounded shrink-0">
          {state.currentIndex + 1}/{totalSentences}
        </span>
      </div>
    );
  }

  // ── SCORING: spinner ────────────────────────────────────────────
  if (state.phase === PHASES.SCORING) {
    // In whole-script mode, scoring happens async at the end — don't show per-sentence spinner
    if (practiceMode === 'whole-script') return null;
    return (
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-2xl p-3 mb-3 flex items-center gap-3">
        <div className="w-10 h-10 border-3 border-indigo-200 border-t-indigo-500 rounded-full animate-spin shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-indigo-700">
            {isVi ? 'Đang chấm điểm...' : 'Analyzing your speech...'}
          </p>
          <p className="text-[10px] text-indigo-500">
            {isVi ? 'AI đang đánh giá phát âm của bạn' : 'AI is evaluating your pronunciation'}
          </p>
        </div>
        <span className="text-[10px] font-bold text-indigo-400 bg-indigo-100 px-2 py-1 rounded">
          {state.currentIndex + 1}/{totalSentences}
        </span>
      </div>
    );
  }

  // ── SCORED: score ring + Try Again/Skip/Next ────────────────────
  if (state.phase === PHASES.SCORED) {
    // In whole-script mode, don't show per-sentence score (eval happens at end)
    if (practiceMode === 'whole-script') return null;
    // Per-sentence: render with whatever score data we have (may be undefined briefly)
    const safeScore = currentScore || { score: 0, feedback: '...', transcript: '' };
    const passed = (safeScore.score ?? 0) >= 70;
    const isFinal = isLast;
    return (
      <div className={`border-2 rounded-2xl p-3 mb-3 flex items-center gap-3 ${
        passed ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'
      }`}>
        <ScoreRing
          score={safeScore.score || 0}
        />
        <div className="flex-1 min-w-0">
          {safeScore.feedback && (
            <p className="text-sm font-bold text-slate-700 leading-tight">
              {safeScore.feedback}
            </p>
          )}
          {safeScore.transcript && (
            <p className="text-[10px] text-slate-500 italic mt-0.5 truncate">
              {isVi ? 'Bạn nói' : 'You said'}: "{safeScore.transcript}"
            </p>
          )}
        </div>
        {/* Per-sentence mode: always show Redo + Next (no auto-advance) */}
        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={onTryAgain}
            className="px-3 py-1.5 bg-rose-500 text-white rounded-lg text-xs font-bold hover:bg-rose-600 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> {isVi ? 'Làm lại' : 'Redo'}
          </button>
          {isFinal ? (
            <button
              onClick={onSkipAutoAdvance}
              className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 flex items-center gap-1"
            >
              {isVi ? 'Xem kết quả' : 'See Results'} <ChevronRight className="w-3 h-3" />
            </button>
          ) : (
            <button
              onClick={onSkip}
              className="px-3 py-1.5 bg-indigo-500 text-white rounded-lg text-xs font-bold hover:bg-indigo-600 flex items-center gap-1"
            >
              {isVi ? 'Câu tiếp' : 'Next'} <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0 ${
          passed ? 'text-emerald-600 bg-white' : 'text-amber-700 bg-white'
        }`}>
          {state.currentIndex + 1}/{totalSentences}
        </span>
      </div>
    );
  }

  return null;
}
