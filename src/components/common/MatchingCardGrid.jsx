import React, { useState } from 'react';
import { CheckCircle2, XCircle, Volume2, RefreshCw } from 'lucide-react';
import VoiceService from '../../services/voiceService';

/**
 * Reusable Matching Card Grid Primitive (NO HTML5 CANVAS)
 * Accessible HTML grid for Vocabulary/Definition matching and Listening Part 3 visual matching.
 * 
 * @param {Object} props
 * @param {Array<{ id: string|number, leftText: string, rightText: string, leftImage?: string, rightImage?: string, audioText?: string }>} props.pairs
 * @param {string} props.audioPrompt Audio text script to play for listening tasks
 * @param {boolean} props.isSubmitted
 * @param {Function} props.onMatchComplete
 */
export default function MatchingCardGrid({
  pairs = [],
  audioPrompt = null,
  isSubmitted = false,
  onMatchComplete = () => {}
}) {
  const [selectedLeft, setSelectedLeft] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState({}); // leftId -> rightId
  const [replayCount, setReplayCount] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Prepare left items (Prompts / Names) and right items (Images / Descriptions)
  const leftItems = pairs.map((p) => ({ id: p.id, text: p.leftText || p.word, image: p.leftImage, audioText: p.audioText }));
  const rightItems = pairs.map((p) => ({
    id: p.id,
    label: p.rightLabel || p.label,
    text: p.rightText || p.definition_en || p.definition_vi,
    image: p.rightImage
  }));

  const handlePlayAudio = async (textToPlay) => {
    const text = textToPlay || audioPrompt;
    if (!text) return;
    setIsPlayingAudio(true);
    setReplayCount((prev) => prev + 1);

    try {
      await VoiceService.speak(text, 'listen');
    } catch (err) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
      }
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handleSelectLeft = (leftItem) => {
    if (isSubmitted) return;
    setSelectedLeft(leftItem);
    if (leftItem.audioText) {
      handlePlayAudio(leftItem.audioText);
    }
  };

  const handleSelectRight = (rightItem) => {
    if (isSubmitted || !selectedLeft) return;

    const newMatches = {
      ...matchedPairs,
      [selectedLeft.id]: rightItem.id
    };
    setMatchedPairs(newMatches);
    setSelectedLeft(null);

    // Call onMatchComplete when all items are paired
    if (Object.keys(newMatches).length === pairs.length) {
      onMatchComplete(newMatches, { replayCount });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Explicit Audio Player Controls for Listening Tasks */}
      {audioPrompt && (
        <div className="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handlePlayAudio(audioPrompt)}
              disabled={isPlayingAudio}
              className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition flex items-center gap-2 text-xs font-black"
            >
              <Volume2 size={18} className={isPlayingAudio ? 'animate-pulse' : ''} />
              {isPlayingAudio ? 'Playing...' : 'Play Listening Audio'}
            </button>
            <span className="text-xs font-bold text-indigo-900 font-mono">
              Replays: {replayCount}
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">
            Listen to audio prompt, then match left items to right picture targets
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column (Items / Audios) */}
        <div className="space-y-3">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono">Target Items / Audios</h5>
          {leftItems.map((left) => {
            const isSelected = selectedLeft && selectedLeft.id === left.id;
            const pairedRightId = matchedPairs[left.id];
            const isPaired = pairedRightId !== undefined;
            const isCorrect = isSubmitted && pairedRightId === left.id;

            let cardStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
            if (isSubmitted) {
              cardStyle = isCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold' : 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
            } else if (isSelected) {
              cardStyle = 'border-indigo-600 bg-indigo-50/80 text-indigo-950 font-bold ring-2 ring-indigo-500 shadow-md';
            } else if (isPaired) {
              cardStyle = 'border-blue-400 bg-blue-50/50 text-blue-900 font-semibold';
            }

            return (
              <button
                key={left.id}
                disabled={isSubmitted}
                onClick={() => handleSelectLeft(left)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${cardStyle}`}
              >
                <div className="flex items-center gap-3">
                  {left.image && (
                    <img src={left.image} alt={left.text} className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                  )}
                  <span className="text-sm font-bold">{left.text}</span>
                </div>
                {isSubmitted && isCorrect && <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />}
                {isSubmitted && !isCorrect && <XCircle size={16} className="text-rose-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Right Column (Visual Picture Cards / Options A-H) */}
        <div className="space-y-3">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-wider font-mono">Visual Picture Targets</h5>
          {rightItems.map((right, idx) => {
            const label = right.label || String.fromCharCode(65 + idx);
            const isUsedByAny = Object.values(matchedPairs).includes(right.id);

            let rightStyle = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';
            if (isUsedByAny) {
              rightStyle = 'border-blue-400 bg-blue-50/50 text-blue-900 font-semibold';
            }

            return (
              <button
                key={right.id}
                disabled={isSubmitted}
                onClick={() => handleSelectRight(right)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${rightStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center shrink-0">
                    {label}
                  </span>
                  {right.image && (
                    <img src={right.image} alt={right.text} className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0" />
                  )}
                  <span className="text-sm font-medium">{right.text}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
