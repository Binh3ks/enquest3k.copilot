import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, RotateCcw, Trophy, Zap, Sparkles, CheckCircle2, Timer, ArrowLeft, TrainTrack } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { SENTENCE_CHOO_CHOO_ROUNDS } from '../../data/sentenceChooChooData';
import { speakText } from '../../utils/AudioHelper';
import { playCorrectSound, playWrongSound, playVictoryFanfare, playButtonClick } from '../../utils/soundEffects';
import LexioMascot from '../mascot/LexioMascot';

export default function SentenceChooChooGame({ weekNumber = 1, onExit, isStandalone = false }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'done'
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [selectedChunks, setSelectedChunks] = useState([]);
  const [availableCarts, setAvailableCarts] = useState([]);
  const [isTrainDeparting, setIsTrainDeparting] = useState(false);
  const [mascotMood, setMascotMood] = useState('happy');
  const [mascotBubble, setMascotBubble] = useState(null);

  const { consumePlayEnergy, recordHighScore, highScores } = useArcadeStore();
  const personalBest = highScores['sentence_train'] || 0;

  const currentRound = SENTENCE_CHOO_CHOO_ROUNDS[roundIdx % SENTENCE_CHOO_CHOO_ROUNDS.length];

  // Initialize round carts
  const initRound = useCallback((round) => {
    if (!round) return;
    const allCarts = [...round.chunks, round.distractor].sort(() => Math.random() - 0.5);
    setAvailableCarts(allCarts.map((c, i) => ({ id: `c_${i}_${c}`, text: c })));
    setSelectedChunks([]);
    setIsTrainDeparting(false);
  }, []);

  // Start game
  const handleStart = () => {
    playButtonClick();
    setScore(0);
    setStreak(0);
    setRoundIdx(0);
    setGameTimer(60);
    setGameState('playing');
    setMascotMood('happy');
    setMascotBubble('Load the train in correct order! 🚂');
    initRound(SENTENCE_CHOO_CHOO_ROUNDS[0]);
  };

  // Timer loop
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      setGameTimer(prev => {
        if (!isStandalone) consumePlayEnergy(1);
        if (prev <= 1) {
          clearInterval(interval);
          setGameState('done');
          playVictoryFanfare();
          recordHighScore('sentence_train', score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, isStandalone, consumePlayEnergy, recordHighScore, score]);

  // Click cart to hitch to train
  const handleCartClick = (cart) => {
    if (gameState !== 'playing' || isTrainDeparting) return;
    playButtonClick();
    speakText(cart.text);

    // Remove from available, append to train
    setAvailableCarts(prev => prev.filter(c => c.id !== cart.id));
    const nextSelected = [...selectedChunks, cart];
    setSelectedChunks(nextSelected);

    // If all required chunks selected, check sentence
    if (nextSelected.length === currentRound.chunks.length) {
      checkTrainOrder(nextSelected);
    }
  };

  // Unhitch cart
  const handleUnhitch = (cart) => {
    if (gameState !== 'playing' || isTrainDeparting) return;
    playButtonClick();
    setSelectedChunks(prev => prev.filter(c => c.id !== cart.id));
    setAvailableCarts(prev => [...prev, cart]);
  };

  // Verify train syntax
  const checkTrainOrder = (selected) => {
    const isCorrect = selected.every((c, i) => c.text === currentRound.chunks[i]);

    if (isCorrect) {
      // Train departs!
      playCorrectSound();
      setIsTrainDeparting(true);
      const points = 25 + streak * 10;
      setScore(s => s + points);
      setStreak(st => st + 1);
      setMascotMood('celebrate');
      setMascotBubble(`Toot toot! Perfect sentence! 🚂 (+${points} pts)`);

      setTimeout(() => {
        speakText(currentRound.fullSentence);
      }, 300);

      // Next train round
      setTimeout(() => {
        const nextIdx = roundIdx + 1;
        setRoundIdx(nextIdx);
        initRound(SENTENCE_CHOO_CHOO_ROUNDS[nextIdx % SENTENCE_CHOO_CHOO_ROUNDS.length]);
      }, 1500);
    } else {
      // Wrong sequence
      playWrongSound();
      setStreak(0);
      setMascotMood('thinking');
      setMascotBubble('Grammar check! Chunks in wrong order! 🤔');
      setTimeout(() => {
        // Return carts to available
        initRound(currentRound);
      }, 1000);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-white select-none rounded-2xl overflow-hidden border border-slate-800 relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between p-3 bg-slate-900/90 backdrop-blur border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onExit}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-black flex items-center gap-1.5 cursor-pointer border border-white/15"
          >
            <ArrowLeft size={14} /> <span>EXIT</span>
          </button>
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
            <span>🚂 SENTENCE CHOO-CHOO</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg text-xs font-black border border-amber-500/30">
            <Trophy size={13} /> <span>{score}</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-lg text-xs font-black border border-emerald-500/30 font-mono">
            <Timer size={13} /> <span>{gameTimer}s</span>
          </div>
        </div>
      </div>

      {/* Main Game Screen */}
      {gameState === 'playing' && (
        <div className="flex-1 flex flex-col p-3 overflow-hidden">
          {/* Mascot Companion Prompt */}
          <div className="flex items-center gap-2.5 p-3 bg-slate-900/80 rounded-2xl border border-white/10 mb-3 shadow-md">
            <LexioMascot size={44} mood={mascotMood} />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-amber-500 text-slate-950 rounded-full">
                Level: {currentRound.level} · Round {roundIdx + 1}
              </span>
              <p className="text-xs text-amber-200 font-bold truncate mt-0.5">
                {mascotBubble || 'Tap chunks in order: Subject ➔ Verb ➔ Object / Place!'}
              </p>
            </div>
          </div>

          {/* Train Tracks & Carriages */}
          <div className={`p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-white/10 mb-4 transition-transform duration-700 ${
            isTrainDeparting ? 'translate-x-full opacity-0' : 'translate-x-0'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">🚂</span>
              <span className="text-xs font-black tracking-wider text-slate-400">EXPRESS SYNTAX TRAIN</span>
            </div>

            {/* Empty or Loaded Carriages */}
            <div className="grid grid-cols-3 gap-2">
              {currentRound.chunks.map((_, idx) => {
                const loaded = selectedChunks[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => loaded && handleUnhitch(loaded)}
                    className={`min-h-[56px] rounded-xl border-2 flex flex-col items-center justify-center p-2 text-center transition-all cursor-pointer ${
                      loaded
                        ? 'bg-amber-500/20 border-amber-400 text-amber-200 font-black shadow-md hover:bg-rose-500/20 hover:border-rose-400'
                        : 'border-dashed border-slate-700 bg-slate-950/40 text-slate-500 font-bold text-xs'
                    }`}
                  >
                    {loaded ? (
                      <>
                        <span className="text-xs sm:text-sm">{loaded.text}</span>
                        <span className="text-[9px] text-amber-400/80 font-bold">Carriage {idx + 1} (tap to remove)</span>
                      </>
                    ) : (
                      <span>Slot {idx + 1}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Railway Track Graphic */}
            <div className="mt-3 border-b-4 border-dashed border-slate-700 w-full" />
          </div>

          {/* Available Chunks / Word Carts */}
          <div className="flex-1 flex flex-col justify-end">
            <p className="text-xs text-center text-slate-400 font-bold mb-2">
              👇 Tap carts below to hitch to the train:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {availableCarts.map((cart) => (
                <button
                  key={cart.id}
                  type="button"
                  onClick={() => handleCartClick(cart)}
                  className="p-3 bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 rounded-xl text-xs sm:text-sm font-black text-white text-center cursor-pointer shadow-md transition-all flex items-center justify-center min-h-[48px]"
                >
                  <span>{cart.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Idle Screen */}
      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <LexioMascot size={84} mood="happy" className="mb-3" />
          <h2 className="text-2xl font-black text-white tracking-wide mb-1">SENTENCE CHOO-CHOO 🚂</h2>
          <p className="text-xs text-amber-300 max-w-sm mb-4">
            Build fluent sentences by loading chunk carriages in correct grammatical order. Avoid the trick distractor cart!
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            START TRAIN RUN 🚀
          </button>
        </div>
      )}

      {/* Done Screen */}
      {gameState === 'done' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <LexioMascot size={90} mood="celebrate" className="mb-3" />
          <h2 className="text-2xl font-black text-white mb-1">ALL ABOARD! 🚂💨</h2>
          <p className="text-xs text-amber-300 mb-4">You completed the syntax railway challenge!</p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-full max-w-xs mb-6 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-bold">Your Score:</span>
              <span className="text-amber-300 font-black text-xl">{score} PTS</span>
            </div>
            <div className="flex justify-between items-center text-xs text-emerald-400 font-bold pt-2 border-t border-white/10">
              <span>XP Reward:</span>
              <span>+{Math.min(50, Math.round(score / 5))} XP</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleStart}
              className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg"
            >
              <RotateCcw size={16} /> Play Again
            </button>
            <button
              type="button"
              onClick={onExit}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-sm cursor-pointer border border-white/20"
            >
              Back to Arcade
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
