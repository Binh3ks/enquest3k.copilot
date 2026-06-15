import React from 'react';
import SentenceCard from './SentenceCard';

/**
 * RightPanel — Clean scrollable list of sentences (right side).
 * Matches shadowingenglish.com: numbered sentences with IPA display, play + record buttons.
 */
export default function RightPanel({
  script,
  ipaData,
  scores,
  activeSentenceId,
  isPlaying,
  onPlay,
  onSelect,
  onPractice,
  themeColor,
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-500">
          {script.length} sentences
        </h3>
      </div>
      <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {script.map((s, idx) => (
          <SentenceCard
            key={s.id}
            sentence={s}
            ipaWords={ipaData?.[s.id] || null}
            score={scores?.[s.id]?.score}
            isActive={activeSentenceId === s.id}
            isPlaying={isPlaying && activeSentenceId === s.id}
            isPracticed={!!scores?.[s.id]}
            onPlay={onPlay}
            onPractice={onPractice}
            themeColor={themeColor}
          />
        ))}
      </div>
    </div>
  );
}
