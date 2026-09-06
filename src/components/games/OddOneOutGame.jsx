import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, RotateCcw, Trophy, Zap, Sparkles, CheckCircle2, Timer, ArrowLeft, Search, ShieldAlert } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { ODD_ONE_OUT_ROUNDS } from '../../data/oddOneOutData';
import { speakText } from '../../utils/AudioHelper';
import { playCorrectSound, playWrongSound, playVictoryFanfare, playButtonClick } from '../../utils/soundEffects';
import LexioMascot from '../mascot/LexioMascot';

export default function OddOneOutGame({ weekNumber = 1, onExit, isStandalone = false }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'done'
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [revealedIntruder, setRevealedIntruder] = useState(null);
  const [wrongSelection, setWrongSelection] = useState(null);
  const [mascotMood, setMascotMood] = useState('happy');
  const [mascotBubble, setMascotBubble] = useState(null);

  const { consumePlayEnergy, recordHighScore, highScores } = useArcadeStore();
  const personalBest = highScores['odd_one_out'] || 0;

  const currentRound = ODD_ONE_OUT_ROUNDS[roundIdx % ODD_ONE_OUT_ROUNDS.length];

  // Start game
  const handleStart = () => {
    playButtonClick();
    setScore(0);
    setStreak(0);
    setRoundIdx(0);
    setGameTimer(60);
    setRevealedIntruder(null);
    setWrongSelection(null);
    setGameState('playing');
    setMascotMood('happy');
    setMascotBubble('Spot the intruder! 🕵️');
    speakText(ODD_ONE_OUT_ROUNDS[0].clue);
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
          recordHighScore('odd_one_out', score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, isStandalone, consumePlayEnergy, recordHighScore, score]);

  // Handle item tap
  const handleItemClick = (item) => {
    if (gameState !== 'playing' || revealedIntruder) return;
    speakText(item.text);

    if (item.isIntruder) {
      // Correct intruder found!
      playCorrectSound();
      setRevealedIntruder(item);
      const points = 15 + streak * 5;
      setScore(s => s + points);
      setStreak(st => st + 1);
      setMascotMood('celebrate');
      setMascotBubble(`Busted! 🔍 ${item.reason}`);

      setTimeout(() => {
        const nextIdx = roundIdx + 1;
        setRoundIdx(nextIdx);
        setRevealedIntruder(null);
        setWrongSelection(null);
        const nextRound = ODD_ONE_OUT_ROUNDS[nextIdx % ODD_ONE_OUT_ROUNDS.length];
        speakText(nextRound.clue);
      }, 1400);
    } else {
      // Wrong item
      playWrongSound();
      setStreak(0);
      setWrongSelection(item.text);
      setMascotMood('thinking');
      setMascotBubble(`No, '${item.text}' belongs to ${currentRound.category}! 🧐`);
      setTimeout(() => {
        setWrongSelection(null);
      }, 600);
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
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <span>🕵️ LEXICAL DETECTIVE</span>
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
          {/* Mission Card */}
          <div className="flex items-center gap-2.5 p-3 bg-emerald-950/70 rounded-2xl border border-emerald-500/40 mb-4 shadow-md">
            <LexioMascot size={46} mood={mascotMood} />
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-500 text-slate-950 rounded-full">
                Case #{roundIdx + 1}: {currentRound.category}
              </span>
              <p className="text-xs text-emerald-200 font-bold truncate mt-0.5">
                {mascotBubble || currentRound.clue}
              </p>
            </div>
          </div>

          {/* 4 Mystery Cards */}
          <div className="flex-1 grid grid-cols-2 gap-3 items-center justify-center p-2">
            {currentRound.items.map((item) => {
              const isIntruderRevealed = revealedIntruder?.text === item.text;
              const isWrong = wrongSelection === item.text;

              let cardStyle = 'bg-white/10 hover:bg-white/20 border-white/20';
              if (isIntruderRevealed) {
                cardStyle = 'bg-amber-500 text-slate-950 border-amber-300 scale-105 ring-4 ring-amber-400 shadow-2xl';
              } else if (isWrong) {
                cardStyle = 'bg-rose-500 text-white border-rose-600 animate-shake';
              }

              return (
                <button
                  key={item.text}
                  type="button"
                  onClick={() => handleItemClick(item)}
                  className={`w-full aspect-[4/3] rounded-2xl border-2 flex flex-col items-center justify-center p-3 text-center transition-all cursor-pointer shadow-lg active:scale-95 ${cardStyle}`}
                >
                  <span className="text-3xl sm:text-4xl mb-1">{item.icon}</span>
                  <span className="text-sm sm:text-base font-black tracking-wide">
                    {item.text}
                  </span>
                  {isIntruderRevealed && (
                    <span className="text-[10px] font-black uppercase mt-1 px-2 py-0.5 bg-slate-950 text-amber-300 rounded-full">
                      INTRUDER! 🚨
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Streak */}
          {streak > 1 && (
            <div className="text-center pt-2 text-xs font-black text-amber-400 animate-bounce">
              🔥 DETECTIVE STREAK x{streak}! (+{streak * 5} bonus)
            </div>
          )}
        </div>
      )}

      {/* Idle Screen */}
      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <LexioMascot size={84} mood="happy" className="mb-3" />
          <h2 className="text-2xl font-black text-white tracking-wide mb-1">LEXICAL DETECTIVE 🕵️</h2>
          <p className="text-xs text-emerald-300 max-w-sm mb-4">
            Spot the odd word out! 3 items share a semantic group, and 1 is an imposter. Tap the intruder fast!
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            START INVESTIGATION 🚀
          </button>
        </div>
      )}

      {/* Done Screen */}
      {gameState === 'done' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <LexioMascot size={90} mood="celebrate" className="mb-3" />
          <h2 className="text-2xl font-black text-white mb-1">CASE CLOSED! 🔍</h2>
          <p className="text-xs text-emerald-300 mb-4">Top detective performance!</p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-full max-w-xs mb-6 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-bold">Your Score:</span>
              <span className="text-amber-300 font-black text-xl">{score} PTS</span>
            </div>
            <div className="flex justify-between items-center text-xs text-emerald-400 font-bold pt-2 border-t border-white/10">
              <span>XP Reward:</span>
              <span>+{Math.min(50, Math.round(score / 4))} XP</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleStart}
              className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-sm flex items-center gap-2 cursor-pointer shadow-lg"
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
