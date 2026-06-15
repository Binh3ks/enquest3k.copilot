import React from 'react';
import SentenceCard from './SentenceCard';

/**
 * RightPanel — Clean scrollable list of sentences (right side).
 * Matches shadowingenglish.com: numbered sentences with IPA, time range, recording feedback.
 */
export default function RightPanel({
  script,
  ipaData,
  scores,
  transcriptSegments,  // [{ start, duration, text }] from cached video transcript
  activeSentenceId,
  isPlaying,
  onPlay,
  onPlayBack,
  onPractice,
  themeColor,
}) {
  // Map sentence index → best matching transcript segment (by order)
  // This aligns the script sentences to the video timeline.
  const segs = transcriptSegments || [];
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-500">
          {script.length} sentences
        </h3>
      </div>
      <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {script.map((s, idx) => {
          // Match sentence to a transcript segment by index (assumes alignment)
          const timeRange = segs[idx] ? {
            start: segs[idx].start,
            duration: segs[idx].duration,
          } : null;

          const scoreData = scores?.[s.id];
          return (
            <SentenceCard
              key={s.id}
              sentence={s}
              ipaWords={ipaData?.[s.id] || null}
              timeRange={timeRange}
              score={scoreData?.score}
              transcript={scoreData?.transcript}
              isActive={activeSentenceId === s.id}
              isPlaying={isPlaying && activeSentenceId === s.id}
              isPracticed={!!scoreData}
              onPlay={onPlay}
              onPlayBack={onPlayBack}
              onPractice={onPractice}
              themeColor={themeColor}
            />
          );
        })}
      </div>
    </div>
  );
}
