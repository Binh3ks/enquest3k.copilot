import React, { useState } from 'react';
import { Sparkles, Trophy, ArrowRight, Play, RotateCcw } from 'lucide-react';
import BubblePopGame from '../games/BubblePopGame';

/**
 * CreatorBrainRefresh — High-energy 1-minute Bubble Pop Dash Mini-Game.
 * Bridges Story Writer and Video Challenge with a fun, dopamine-recharging micro-break!
 */
export default function CreatorBrainRefresh({ onContinue, words = [] }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [earnedScore, setEarnedScore] = useState(0);

  const handleGameDone = (score) => {
    setEarnedScore(score);
    setIsCompleted(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 animate-in fade-in duration-200">
      {/* Mini Game Engine */}
      <BubblePopGame
        words={words}
        isStandalone={true}
        onComplete={handleGameDone}
      />

      {/* Continue Action Button */}
      <div className="flex items-center justify-between p-3.5 bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl">
        <div>
          <span className="text-xs font-black text-purple-950 block">
            Ready to Record Your Story?
          </span>
          <span className="text-[11px] text-purple-700 font-medium">
            Jump into the Video Challenge and record your narrative performance!
          </span>
        </div>
        <button
          type="button"
          onClick={onContinue}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white rounded-xl font-black text-xs shadow-md transition hover:scale-105 active:scale-95 flex items-center gap-1.5 shrink-0"
        >
          Go to Video Challenge <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
