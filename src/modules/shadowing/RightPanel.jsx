import React from 'react';
import SentenceCard from './SentenceCard';

/**
 * RightPanel — Clean scrollable list of sentences (right side).
 * Matches shadowingenglish.com: just numbered sentences, no IPA, no buttons.
 * Clicking a sentence selects it and shows IPA in the left panel's focused area.
 */
export default function RightPanel({
  script,
  activeSentenceId,
  onPlay,
  onSelect,
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
            index={idx}
            isActive={activeSentenceId === s.id}
            isPracticed={false}
            onPlay={onPlay}
            onClick={onSelect}
            themeColor={themeColor}
          />
        ))}
      </div>
    </div>
  );
}
