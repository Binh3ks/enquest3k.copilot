import React, { useState } from 'react';
import { SkipBack, Play, Pause, SkipForward, RotateCcw, Settings as SettingsIcon, Save, Video, ArrowUpToLine, Square } from 'lucide-react';
import { getStressStyle, convertIpaWordsToUk } from './ipaUtils';
import PracticeSettingsModal from './PracticeSettingsModal';
import YouTubeEmbed from './YouTubeEmbed';

/**
 * LeftPanel — FOCUS MODE (matches shadowingenglish.com):
 * - Top: language toggles
 * - Focused sentence card: karaoke-style word animation with growing underline
 * - Playback controls: prev/play/next/replay/save/settings
 * - Full Text (hidden by default, click to expand)
 *   - Shows content_en by default
 *   - Shows video transcript (cleaned) when video is loaded
 * - Video button: opens FloatingVideoWindow (not inline iframe)
 */

// Fallback word splitting when useWordHighlight hasn't provided timing data
function splitWordsStatic(text) {
  if (!text) return [];
  const words = text.match(/[A-Za-z']+/g) || [];
  return words.map(w => ({ word: w, start: 0, end: 0 }));
}

export default function LeftPanel({
  contentEn,
  script,
  activeSentenceId,
  ipaData,
  videoId,
  videoInline,
  videoPopupOpen,
  onToggleFloating,
  onPlayerReady,
  onPlayerUnloaded,
  onSwitchToTranscript,
  useTranscriptSource = false,
  hasTranscript,
  videoTranscriptSegments,
  transcriptIpa = {},
  currentWordIdx = -1,
  wordTime = 0,
  highlightWords = [],
  themeColor,
  isVi,
  isPlaying,
  isPaused = false,
  isChallengeActive = false,
  // When true, the inline Pause still FUNCTIONS (clicking triggers
  // pauseChallenge which pauses the MediaRecorder + VoiceService +
  // YouTube). It just gets a recording-active ring/pulse so the user
  // knows a recording is in progress. Pre-fix the button was disabled,
  // which the user complained about ("mic on continuously, pause button
  // dimmed and doesn't work").
  isRecording = false,
  speed,
  onSpeedChange,
  speedOptions,
  onPlayPrev,
  onPlayPause,
  onPlayNext,
  onReplay,
  onStop,
  onSave,
  onOpenVideo,
  settings,
  onSettingsChange,
  showIPA,
  showStress,
  showTranslate,
  translating,
  translatedTexts = {},
  onToggleIPA,
  onToggleStress,
  onToggleTranslate,
}) {
  const [showUrlInput, setShowUrlInput] = useState(!videoId);
  const [showSettings, setShowSettings] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  // Determine active sentence
  // In transcript mode (when explicitly toggled), use transcript sentence; otherwise strictly use lesson script
  const activeSentence = ((useTranscriptSource && videoTranscriptSegments && videoTranscriptSegments.length > 0)
    ? videoTranscriptSegments.find(s => s.id === activeSentenceId) || videoTranscriptSegments[0]
    : script?.find(s => s.id === activeSentenceId) || script?.[0]) || null;
  // Use transcript IPA if available (for transcript mode), else fall back to script IPA
  const transcriptIpaWords = transcriptIpa?.[activeSentenceId];
  const inTranscriptMode = !!videoTranscriptSegments;
  const activeIpa = transcriptIpaWords && transcriptIpaWords.length > 0
    ? transcriptIpaWords
    : (inTranscriptMode ? null : (activeSentence ? ipaData?.[activeSentence.id] : null));

  const hasVideoTranscript = !!videoTranscriptSegments;
  const fullText = contentEn;

  // Get time range for active sentence
  const activeSeg = videoTranscriptSegments?.[(activeSentence?.id || 1) - 1] || null;

  // Words for karaoke display — use timed words from hook, fallback to static split
  const karaokeWords = (highlightWords && highlightWords.length > 0)
    ? highlightWords
    : splitWordsStatic(activeSentence?.text);
  const isPlayState = isPaused;
  const isPauseState = !isPaused && (isRecording || isPlaying);

  return (
    <div className="space-y-3">
      {/* 1. Top toolbar — language toggles */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-4 py-2 flex items-center justify-center gap-1 flex-wrap">
        <TogglePill label="US" active={settings?.accent === 'US'} onClick={() => onSettingsChange({ ...settings, accent: 'US' })} />
        <TogglePill label="UK" active={settings?.accent === 'UK'} onClick={() => onSettingsChange({ ...settings, accent: 'UK' })} />
        <TogglePill label="IPA" icon="👁" active={showIPA} onClick={onToggleIPA} />
        <TogglePill label="Stress" icon="~" active={showStress} onClick={onToggleStress} />
        <TogglePill label="Translate" icon="🌐" active={showTranslate} onClick={onToggleTranslate} vietnameseOnly />
      </div>

      {/* 2. Focused sentence card — karaoke underline animation */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
        {activeSentence ? (
          <>
            {/* Karaoke word-by-word rendering.
                Each word has a background underline bar whose width fills
                from 0%→100% as currentTime passes through that word.
                Active word also scales up and changes color for a strong cue. */}
            <p className="text-2xl font-bold text-slate-800 text-center leading-relaxed mb-2 flex flex-wrap justify-center gap-x-1.5 gap-y-1">
              {karaokeWords.map((w, i) => {
                const isCurrentWord = i === currentWordIdx;
                const wordDur = (w.end || 0) - (w.start || 0);
                let fillPercent = 0;
                if (isCurrentWord && wordDur > 0 && wordTime > 0) {
                  fillPercent = Math.max(0, Math.min(100, ((wordTime - w.start) / wordDur) * 100));
                } else if (currentWordIdx >= 0 && i < currentWordIdx) {
                  fillPercent = 100;
                }
                return (
                  <span
                    key={i}
                    className={`relative inline-block transition-all duration-150 ${isCurrentWord ? 'text-rose-600 scale-105' : 'text-slate-800'}`}
                  >
                    <span className="relative z-10 px-0.5">{w.word}</span>
                    <span
                      className="absolute left-0 right-0 bottom-0.5 h-[3px] rounded-full bg-slate-100"
                      aria-hidden
                    >
                      <span
                        className={`block h-full rounded-full ${isCurrentWord ? 'bg-rose-500' : fillPercent > 0 ? 'bg-slate-400' : 'bg-transparent'}`}
                        style={{
                          width: `${fillPercent}%`,
                          transition: isCurrentWord ? 'width 80ms linear' : 'width 200ms ease-out',
                        }}
                      />
                    </span>
                  </span>
                );
              })}
            </p>

            {/* Time range from video transcript */}
            {activeSeg && activeSeg.duration != null && (
              <p className="text-center text-[11px] text-slate-400 font-mono mb-3">
                {fmtTime(activeSeg.start)} – {fmtTime(activeSeg.start + activeSeg.duration)}{' '}
                <span className="text-slate-300">({activeSeg.duration.toFixed(1)}s)</span>
              </p>
            )}

            {showIPA && activeIpa && activeIpa.length > 0 && (
              <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 mb-3">
                {((settings?.accent === 'UK') ? convertIpaWordsToUk(activeIpa) : activeIpa).map((w, i) => {
                  const style = getStressStyle(w.stress);
                  const isCurrentWord = i === currentWordIdx;
                  return (
                    <span key={i} className={`inline-flex flex-col items-center transition-all duration-150 ${isCurrentWord ? 'scale-110' : ''}`}>
                      <span
                        className={`text-sm font-semibold border-b-2 pb-0.5 transition-colors duration-100 ${
                          isCurrentWord
                            ? 'text-rose-600 border-rose-500 bg-rose-50 px-1 rounded'
                            : showStress
                            ? `${style.text} ${style.underline}`
                            : 'text-slate-500 border-slate-300'
                        }`}
                      >
                        {w.word}
                      </span>
                      {w.ipa && (
                        <span className="text-xs text-slate-400 font-mono mt-0.5">{w.ipa}</span>
                      )}
                    </span>
                  );
                })}
              </div>
            )}

            {showTranslate && (
              <p className="text-center text-sm text-slate-400 italic mt-2">
                {translating && !activeSentence.vi && !translatedTexts[activeSentenceId]
                  ? <span className="text-blue-400">...</span>
                  : (activeSentence.vi || translatedTexts[activeSentenceId] || '—')
                }
              </p>
            )}
          </>
        ) : (
          <p className="text-center text-slate-400 py-8">
            {isVi ? 'Chọn câu để bắt đầu' : 'Select a sentence to start'}
          </p>
        )}

        {/* Main playback controls */}
        <div className="flex items-center justify-center gap-3 flex-wrap mt-5 pt-4 border-t border-slate-100">
          <button
            onClick={onPlayPrev}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            disabled={!activeSentenceId || activeSentenceId === script?.[0]?.id}
          >
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={onPlayPause}
            aria-disabled={isRecording}
            className={`p-4 rounded-full shadow-lg transition-all active:scale-95 ${
              isPauseState
                ? `bg-${themeColor}-500 text-white ring-4 ring-rose-300 hover:bg-${themeColor}-600 animate-pulse`
                : isPlayState
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : `bg-${themeColor}-500 text-white hover:bg-${themeColor}-600`
            }`}
            title={isRecording
              ? (isVi ? 'Đang ghi âm — bấm để tạm dừng' : 'Recording — click to pause')
              : isPlayState
              ? (isVi ? 'Tiếp tục' : 'Resume')
              : isPlaying
              ? (isVi ? 'Tạm dừng' : 'Pause')
              : (isVi ? 'Phát' : 'Play')}
          >
            {isPlayState
              ? <Play className="w-6 h-6 ml-0.5" />
              : isPauseState
              ? <Pause className="w-6 h-6" />
              : <Play className="w-6 h-6 ml-0.5" />}
          </button>

          <button
            onClick={onPlayNext}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            disabled={!activeSentenceId || activeSentenceId === script?.[script.length - 1]?.id}
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            onClick={onStop}
            className={`p-2.5 rounded-xl transition-colors ${
              isChallengeActive
                ? 'bg-rose-100 text-rose-600 hover:bg-rose-200 animate-pulse'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
            title={isChallengeActive
              ? (isVi ? 'Dừng toàn bộ shadowing' : 'Stop all shadowing')
              : isVi ? 'Dừng' : 'Stop'}
          >
            <Square className="w-5 h-5" />
          </button>

          <button
            onClick={onReplay}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            title="Replay"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={onSave}
            className="p-2.5 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm"
            title={isVi ? 'Lưu bài luyện tập' : 'Save your practice'}
          >
            <Save className="w-5 h-5" />
          </button>

          <button
            onClick={() => setShowSettings(true)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
            title="Practice settings"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Speed selector */}
        <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500">
          <span>{isVi ? 'Tốc độ:' : 'Speed:'}</span>
          <select
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="bg-slate-100 rounded px-2 py-1 text-xs font-bold"
          >
            {speedOptions.map(s => (
              <option key={s} value={s}>{s}x</option>
            ))}
          </select>
        </div>
      </div>

      {/* 0. Inline YouTube video — placed BELOW TTS controls.
          Default: TTS lesson text shows first. When user clicks Play in
          the video, transcript source activates for video-synced highlighting. */}
      {videoId && videoInline && !videoPopupOpen && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <YouTubeEmbed
              videoId={videoId}
              onPlayerReady={onPlayerReady}
              onPlayerUnloaded={onPlayerUnloaded}
            />
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {isVi ? 'Video YouTube' : 'YouTube Video'}
                </span>
                {onToggleFloating && (
                  <button
                    onClick={onToggleFloating}
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold text-slate-500 hover:bg-slate-200 transition-colors"
                    title={isVi ? 'Mở cửa sổ nổi' : 'Pop out to floating window'}
                  >
                    <ArrowUpToLine className="w-3 h-3" />
                    {isVi ? 'Pop out' : 'Pop out'}
                  </button>
                )}
              </div>
              {onSwitchToTranscript && (
                <button
                  onClick={onSwitchToTranscript}
                  className={`w-full mt-2 px-3 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                    useTranscriptSource
                      ? 'bg-slate-100 text-slate-600 border-2 border-slate-200 hover:bg-slate-200'
                      : 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  {useTranscriptSource
                    ? (isVi ? '↩ Quay lại TTS' : '↩ Switch back to TTS')
                    : (isVi ? '▶ Play Video & đồng bộ transcript' : '▶ Play Video & Sync Transcript')}
                </button>
              )}
            </div>
        </div>
      )}

      {/* 3. Full Text — hidden by default, click to expand */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <button
          onClick={() => setShowFullText(!showFullText)}
          className="w-full flex items-center justify-between p-3 text-xs font-bold uppercase text-slate-400 tracking-wider hover:bg-slate-50 transition-colors"
        >
          <span className="flex items-center gap-2">
            {hasVideoTranscript && <Video className="w-3.5 h-3.5 text-blue-500" />}
            {hasVideoTranscript
              ? (isVi ? 'Transcript video (đã làm sạch)' : 'Video Transcript (cleaned)')
              : (isVi ? 'Toàn bộ văn bản' : 'Full Text')}
          </span>
          <span className="text-[10px] text-slate-400 normal-case font-normal">
            {showFullText ? (isVi ? 'Thu gọn' : 'Hide') : (isVi ? 'Mở rộng' : 'Show')}
          </span>
        </button>
        {showFullText && (
          <div className="px-4 pb-4 max-h-96 overflow-y-auto space-y-3">
            {contentEn ? (
              <p className="text-sm text-slate-600 leading-relaxed text-justify">
                {contentEn.split(/(\*\*.*?\*\*)/).map((part, i) =>
                  part.startsWith('**') ? (
                    <span key={i} className={`font-bold text-${themeColor}-600`}>{part.replace(/\*\*/g, '')}</span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </p>
            ) : (
              <p className="text-sm text-slate-400">
                {isVi ? 'Chưa có nội dung' : 'No text available'}
              </p>
            )}

            {/* Script sentences with time ranges (for shadowing source) */}
            {script && script.length > 0 && (
              <div className="pt-3 mt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">
                  {isVi ? 'Các câu luyện shadowing' : 'Shadowing sentences'}
                </p>
                <div className="space-y-1.5">
                  {script.map((s) => {
                    const seg = videoTranscriptSegments?.[s.id - 1];
                    return (
                      <p key={s.id} className="text-sm text-slate-700 leading-relaxed">
                        <span className="text-slate-400 mr-2">{s.id}.</span>
                        {s.text}
                        {seg && (
                          <span className="text-[10px] text-slate-400 font-mono ml-2">
                            ({seg.duration.toFixed(1)}s)
                          </span>
                        )}
                      </p>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. YouTube URL input (hidden by default — only for swapping video) */}
      {videoId && !videoInline && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {isVi ? 'Video YouTube' : 'YouTube Video'}
            </p>
            <button
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              {showUrlInput ? (isVi ? 'Ẩn' : 'Hide') : (isVi ? 'Đổi' : 'Change')}
            </button>
          </div>

          {showUrlInput && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const match = customUrl.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
                if (match) {
                  window.location.reload();
                }
              }}
              className="flex gap-2 mt-2"
            >
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button type="submit" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-bold hover:bg-slate-200">
                {isVi ? 'Đổi' : 'Set'}
              </button>
            </form>
          )}
        </div>
      )}

      <PracticeSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSettingsChange={onSettingsChange}
        speed={speed}
        onSpeedChange={onSpeedChange}
        speedOptions={speedOptions}
        isVi={isVi}
      />
    </div>
  );
}

// ── Helper: format timestamp as "m:ss.s" ────────────────────────
function fmtTime(seconds) {
  const m = Math.floor(seconds / 60);
  const ss = (seconds % 60).toFixed(2).padStart(5, '0');
  return `${m}:${ss}`;
}

// ── Helper: TogglePill ────────────────────────────────────────
function TogglePill({ label, icon, active, onClick, vietnameseOnly }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors flex items-center gap-1 ${
        active
          ? 'bg-blue-500 text-white'
          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
      }`}
    >
      {icon && <span className="text-sm">{icon}</span>}
      {label}
      {vietnameseOnly && <span className="ml-1">🇻🇳</span>}
    </button>
  );
}
