import React from 'react';
import { Play, Check, RotateCcw } from 'lucide-react';
import { getStressStyle } from './ipaUtils';

/**
 * SentenceCard — Matches shadowingenglish.com reference:
 * - Numbered checkmark (left)
 * - Sentence text + IPA with colored underlines
 * - Time range below
 * - Play back button when recorded (right)
 * - Inline feedback (transcript + score) after recording
 */
export default function SentenceCard({
  sentence,
  ipaWords,
  timeRange,          // { start, duration } from transcript segments
  isActive,
  isPlaying,
  isPracticed,
  score,
  transcript,         // user's recorded transcript
  onPlay,             // play TTS
  onPlayBack,         // play user's recording
  onPractice,
  themeColor,
}) {
  // Format time as "m:ss.s" like "0:04.76"
  const fmtTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = (s % 60).toFixed(2);
    return `${m}:${sec.padStart(5, '0')}`;
  };

  return (
    <div
      onClick={() => onPlay(sentence.id, sentence.text)}
      className={`relative px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${
        isActive
          ? `border-2 border-${themeColor}-400 bg-${themeColor}-50 shadow-md`
          : isPracticed
          ? 'border-2 border-green-200 bg-green-50/50'
          : 'border-2 border-transparent bg-white hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Numbered checkmark circle */}
        <span
          className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
            isPracticed
              ? 'bg-green-500 text-white'
              : isActive
              ? `bg-${themeColor}-500 text-white`
              : 'bg-slate-200 text-slate-500'
          }`}
        >
          {isPracticed ? <Check className="w-4 h-4" /> : sentence.id}
        </span>

        {/* Text + IPA + timestamp */}
        <div className="flex-1 min-w-0">
          <p className={`text-[15px] leading-relaxed ${
            isActive ? 'font-bold text-slate-900' : 'text-slate-700'
          }`}>
            {sentence.text}
          </p>

          {/* Time range from video transcript */}
          {timeRange && (
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              {fmtTime(timeRange.start)} – {fmtTime(timeRange.start + timeRange.duration)}{' '}
              <span className="text-slate-300">({timeRange.duration.toFixed(1)}s)</span>
            </p>
          )}

          {/* IPA word-by-word — small, subtle */}
          {ipaWords && ipaWords.length > 0 && (
            <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 mt-1.5">
              {ipaWords.map((w, i) => {
                const style = getStressStyle(w.stress);
                return (
                  <span key={i} className="text-[10px] font-mono text-slate-500">
                    {w.word && w.ipa ? (
                      <span className={style.text}>{w.ipa}</span>
                    ) : (
                      <span>{w.word}</span>
                    )}
                  </span>
                );
              })}
            </div>
          )}

          {/* Inline recording feedback — what the student said + score */}
          {isPracticed && score !== undefined && (
            <div className="mt-2 pt-2 border-t border-green-200/50">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                    score >= 80
                      ? 'bg-green-100 text-green-700'
                      : score >= 50
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {score}%
                </span>
                {transcript && (
                  <span className="text-[10px] text-slate-400 italic">
                    You said: "{transcript}"
                  </span>
                )}
              </div>
              {onPlayBack && (
                <button
                  onClick={(e) => { e.stopPropagation(); onPlayBack(sentence.id); }}
                  className="mt-1.5 text-[10px] flex items-center gap-1 text-green-600 hover:text-green-700 font-bold"
                >
                  <Play className="w-3 h-3" /> Play back
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Active indicator bar */}
      {isActive && (
        <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-full bg-${themeColor}-500`} />
      )}
    </div>
  );
}
