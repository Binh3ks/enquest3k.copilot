import React from 'react';
import SentenceCard from './SentenceCard';

/**
 * RightPanel — Clean numbered list of sentences (right side).
 * MAIN purpose: navigation list + time ranges. IPA is NOT here —
 * only in inline focus (LeftPanel). Matches shadowingenglish.com UX.
 */
export default function RightPanel({
  script,
  transcriptSegments,
  transcriptIpa = null,
  scores,
  activeSentenceId,
  isPlaying,
  onPlay,
  onPlayBack,
  onPractice,
  themeColor,
  useTranscriptSource = false,
  onToggleSource = null,
  hasTranscript = false,
  onCorrect = null,
}) {
  const segs = transcriptSegments || [];
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between mb-2 gap-2 flex-wrap">
        <h3 className="text-sm font-bold text-slate-500">
          {script.length} sentences
        </h3>
        {onToggleSource && hasTranscript && (
          <button
            onClick={onToggleSource}
            className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${
              useTranscriptSource
                ? 'bg-blue-500 text-white'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
            title="Toggle between lesson text and video transcript"
          >
            {useTranscriptSource ? '📺 Transcript' : '📖 Lesson'}
          </button>
        )}
      </div>
      <div className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
        {script.map((s, idx) => {
          const timeRange = segs[idx] ? {
            start: segs[idx].start,
            duration: segs[idx].duration,
          } : null;

          const scoreData = scores?.[s.id];
          const ipa = transcriptIpa?.[s.id] || null;
          return (
            <SentenceCard
              key={s.id}
              sentence={s}
              ipaWords={ipa}
              timeRange={timeRange}
              score={scoreData?.score}
              transcript={scoreData?.transcript}
              isActive={activeSentenceId === s.id}
              isPlaying={isPlaying && activeSentenceId === s.id}
              isPracticed={!!scoreData}
              onPlay={onPlay}
              onPlayBack={onPlayBack}
              onPractice={onPractice}
              onCorrect={onCorrect}
              themeColor={themeColor}
            />
          );
        })}
      </div>
    </div>
  );
}
