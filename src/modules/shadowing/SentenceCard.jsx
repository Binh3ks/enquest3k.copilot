import React from 'react';
import { Play, Mic } from 'lucide-react';
import { getStressStyle } from './ipaUtils';

/**
 * SentenceCard — Displays a single shadowing sentence with IPA, play, and practice buttons.
 */
export default function SentenceCard({
  sentence,
  ipaWords,
  isActive,
  isPracticed,
  score,
  onPlay,
  onPractice,
  themeColor,
}) {
  return (
    <div
      className={`p-3 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 ${
        isActive
          ? `border-${themeColor}-400 bg-${themeColor}-50 shadow-md`
          : isPracticed
          ? 'border-green-200 bg-green-50'
          : 'border-slate-100 bg-white hover:border-slate-200'
      }`}
    >
      {/* Play button */}
      <button
        onClick={() => onPlay(sentence.id, sentence.text)}
        className={`mt-1 p-2 rounded-full transition-colors shrink-0 ${
          isActive
            ? `bg-${themeColor}-500 text-white`
            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
        }`}
        title="Listen"
      >
        <Play className="w-4 h-4" />
      </button>

      {/* Text + IPA */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-slate-800 leading-relaxed">
          {sentence.text}
        </p>

        {/* IPA line — word by word with stress coloring */}
        {ipaWords && ipaWords.length > 0 && (
          <div className="flex flex-wrap gap-x-2 gap-y-1 mt-1.5">
            {ipaWords.map((w, i) => {
              const style = getStressStyle(w.stress);
              return (
                <span key={i} className="inline-flex flex-col items-center">
                  <span
                    className={`text-[11px] leading-tight font-mono border-b-2 ${style.text} ${style.underline}`}
                  >
                    {w.word}
                  </span>
                  {w.ipa && (
                    <span className="text-[10px] text-slate-400 font-mono leading-tight">
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
      <div className="flex items-center gap-2 shrink-0 mt-1">
        {isPracticed && score !== undefined && (
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-black ${
              score >= 80
                ? 'bg-green-100 text-green-700 ring-2 ring-green-300'
                : score >= 50
                ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-300'
                : 'bg-rose-100 text-rose-700 ring-2 ring-rose-300'
            }`}
            title={`Score: ${score}%`}
          >
            {score}%
          </div>
        )}
        <button
          onClick={() => onPractice(sentence)}
          className={`p-2.5 rounded-full shadow-md transition-all active:scale-95 ${
            isPracticed
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : `bg-${themeColor}-600 text-white hover:bg-${themeColor}-700`
          }`}
          title="Practice this sentence"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
