import React from 'react';
import { Volume2, Square, RotateCcw, CheckCircle2, Clock } from 'lucide-react';
import { useFlyersListeningPlayer } from '../../hooks/useFlyersListeningPlayer';

/**
 * FlyersListeningPlayButton
 *
 * Reusable Cambridge A2 Flyers 2-Play Audio Button for Listening Parts 1-5.
 * Displays real-time state: 1st Listen → Replay Rubric → 3s Pause → 2nd Listen → Closing Rubric → Complete.
 */
export function FlyersListeningPlayButton({
  partNumber = 1,
  audioUrl,
  script,
  weekNumber = 33,
  className = '',
  onComplete
}) {
  const player = useFlyersListeningPlayer({
    partNumber,
    audioUrl,
    script,
    weekNumber,
    onComplete
  });

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={player.togglePlay}
        className={`px-3 py-1.5 font-black text-xs rounded-xl shadow-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${player.badgeColor}`}
        title={player.isPlaying ? 'Click to stop audio' : `Play Part ${partNumber} Audio (2×)`}
      >
        {player.isPlaying ? (
          <>
            <Square size={13} className="shrink-0 fill-current" />
            <span>{player.statusText}</span>
          </>
        ) : player.isCompleted ? (
          <>
            <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
            <span>{player.statusText}</span>
          </>
        ) : (
          <>
            <Volume2 size={14} className="shrink-0" />
            <span>{player.statusText}</span>
          </>
        )}
      </button>

      {player.playStatus === 'pausing' && (
        <span className="text-[11px] font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-300 flex items-center gap-1 animate-pulse">
          <Clock size={11} /> Next listen in {player.pauseCountdown}s
        </span>
      )}
    </div>
  );
}

export default FlyersListeningPlayButton;
