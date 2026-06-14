import React from 'react';
import { Play, Mic, RotateCcw } from 'lucide-react';
import { getStressStyle } from './ipaUtils';

/**
 * SentenceCard — Matches shadowingenglish.com reference:
 * - Play button (left)
 * - Sentence text + IPA with colored underlines
 * - Practice/record button (right)
 * Active state: highlighted border + colored indicator bar
 */
export default function SentenceCard({
  sentence,
  ipaWords,
  index,
  isActive,
  isPlaying,
  isPracticed,
  score,
  onPlay,
  onPractice,
  themeColor,
}) {
  return (
    <div
      className={`relative px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive
          ? `border-2 border-${themeColor}-400 bg-${themeColor}-50 shadow-md`
          : isPracticed
          ? 'border-2 border-green-200 bg-green-50/50'
          : 'border-2 border-transparent bg-white hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Play button */}
        <button
          onClick={() => onPlay(sentence.id, sentence.text)}
          className={`mt-0.5 p-2 rounded-full transition-all shrink-0 ${
            isActive && isPlaying
              ? `bg-${themeColor}-500 text-white shadow-md animate-pulse`
              : isActive
              ? `bg-${themeColor}-100 text-${themeColor}-600`
              : 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600'
          }`}
        >
          <Play className="w-4 h-4" />
        </button>

        {/* Text + IPA */}
        <div className="flex-1 min-w-0">
          <p className={`text-[15px] leading-relaxed ${
            isActive ? 'font-bold text-slate-900' : 'text-slate-700'
          }`}>
            {sentence.text}
          </p>

          {/* IPA word-by-word with colored underlines */}
          {ipaWords && ipaWords.length > 0 && (
            <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5">
              {ipaWords.map((w, i) => {
                const style = getStressStyle(w.stress);
                const wordHighlighted = isActive && isPlaying;
                return (
                  <span key={i} className="inline-flex flex-col items-center">
                    <span
                      className={`text-[11px] leading-tight font-semibold border-b-[3px] pb-0.5 transition-all duration-300 ${
                        wordHighlighted
                          ? `${style.text} border-b-current`
                          : isActive
                          ? `${style.text} ${style.underline}`
                          : 'text-slate-500 border-b-transparent'
                      }`}
                      style={wordHighlighted ? { borderBottomColor: w.stress === 1 ? '#ef4444' : w.stress === 2 ? '#3b82f6' : '#94a3b8' } : undefined}
                    >
                      {w.word}
                    </span>
                    {w.ipa && (
                      <span className="text-[10px] text-slate-400 font-mono leading-tight mt-0.5">
                        {w.ipa}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Practice button + score */}
        <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
          {isPracticed && score !== undefined && (
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black ${
                score >= 80
                  ? 'bg-green-100 text-green-700 ring-2 ring-green-300'
                  : score >= 50
                  ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-300'
                  : 'bg-rose-100 text-rose-700 ring-2 ring-rose-300'
              }`}
            >
              {score}%
            </div>
          )}
          <button
            onClick={() => onPractice(sentence)}
            className={`group/mic relative p-2.5 rounded-full shadow-sm transition-all active:scale-95 ${
              isPracticed
                ? 'bg-orange-500 text-white hover:bg-orange-600'
                : `bg-${themeColor}-600 text-white hover:bg-${themeColor}-700`
            }`}
            title="Click to record yourself"
          >
            <Mic className="w-4 h-4" />
            <span className="pointer-events-none absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/mic:opacity-100 transition-opacity">
              Click to record
            </span>
          </button>
        </div>
      </div>

      {/* Active indicator bar */}
      {isActive && (
        <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-full bg-${themeColor}-500`} />
      )}
    </div>
  );
}
