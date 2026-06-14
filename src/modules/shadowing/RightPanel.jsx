import React from 'react';
import SentenceCard from './SentenceCard';

/**
 * RightPanel — Scrollable list of SentenceCard components with IPA.
 */
export default function RightPanel({
  script,
  ipaData,
  activeSentenceId,
  scores,
  onPlay,
  onPractice,
  themeColor,
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold uppercase text-slate-400 ml-1 tracking-wider">
        {script.length} sentences
      </h3>
      <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {script.map((s) => (
          <SentenceCard
            key={s.id}
            sentence={s}
            ipaWords={ipaData?.[s.id] || null}
            isActive={activeSentenceId === s.id}
            isPracticed={!!scores[s.id]}
            score={scores[s.id]?.score}
            onPlay={onPlay}
            onPractice={onPractice}
            themeColor={themeColor}
          />
        ))}
      </div>
    </div>
  );
}
