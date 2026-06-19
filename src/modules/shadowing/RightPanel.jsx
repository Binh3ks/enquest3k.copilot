import React from 'react';
import SentenceCard from './SentenceCard';

/**
 * RightPanel — Clean scrollable list of sentences (right side).
 * Matches shadowingenglish.com: numbered sentences with IPA, time range, recording feedback.
 */
import { convertIpaWordsToUk } from './ipaUtils';

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
  accent = 'US',                  // 'US' or 'UK'
  useTranscriptSource = false,
  onToggleSource = null,
}) {
  // Map sentence index → best matching transcript segment (by order)
  // This aligns the script sentences to the video timeline.
  const segs = transcriptSegments || [];
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <h3 className="text-sm font-bold text-slate-500">
          {script.length} sentences
        </h3>
        {onToggleSource && (
          <button
            onClick={onToggleSource}
            className={`text-[10px] font-bold px-2 py-1 rounded ${
              useTranscriptSource
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 text-slate-500'
            }`}
            title="Toggle between lesson text and video transcript"
          >
            {useTranscriptSource ? '📺 Transcript' : '📖 Lesson'}
          </button>
        )}
      </div>
      <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {script.map((s, idx) => {
          // Match sentence to a transcript segment by index (assumes alignment)
          const timeRange = segs[idx] ? {
            start: segs[idx].start,
            duration: segs[idx].duration,
          } : null;

          const scoreData = scores?.[s.id];
          // Convert IPA to UK if needed
          const rawIpaWords = ipaData?.[s.id] || null;
          const displayIpaWords = (accent === 'UK' && rawIpaWords)
            ? convertIpaWordsToUk(rawIpaWords)
            : rawIpaWords;
          return (
            <SentenceCard
              key={s.id}
              sentence={s}
              ipaWords={displayIpaWords}
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
