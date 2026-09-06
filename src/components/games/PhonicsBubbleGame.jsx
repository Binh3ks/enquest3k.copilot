import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, RotateCcw, Trophy, Zap, Target, Sparkles, CheckCircle2, Timer, ArrowLeft } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';
import { PHONICS_ROUNDS } from '../../data/phonicsArcadeData';
import { speakText } from '../../utils/AudioHelper';
import { playPopSound, playCorrectSound, playWrongSound, playVictoryFanfare, playButtonClick } from '../../utils/soundEffects';
import { duckArcadeBgm } from '../../utils/arcadeBgm';
import LexioMascot from '../mascot/LexioMascot';

const COLORS = [
  ['#06b6d4', '#0ea5e9'],
  ['#a855f7', '#ec4899'],
  ['#f59e0b', '#f97316'],
  ['#10b981', '#0d9488'],
  ['#6366f1', '#8b5cf6'],
  ['#ec4899', '#f43f5e'],
];

export default function PhonicsBubbleGame({ weekNumber = 1, onExit, isStandalone = false }) {
  const [roundIdx, setRoundIdx] = useState(0);
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'done'
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [bubbles, setBubbles] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [mascotMood, setMascotMood] = useState('happy');
  const [mascotBubble, setMascotBubble] = useState(null);

  const { consumePlayEnergy, recordHighScore, highScores } = useArcadeStore();
  const personalBest = highScores['phonics_bubble'] || 0;

  const currentRound = PHONICS_ROUNDS[roundIdx % PHONICS_ROUNDS.length];

  // Play target sound prompt
  const playPromptAudio = useCallback(() => {
    if (!currentRound) return;
    try { window.speechSynthesis?.cancel(); } catch (_) {}
    duckArcadeBgm(2000);
    speakText(`${currentRound.sound}. ${currentRound.audioHint}`);
  }, [currentRound]);

  // Spawn bubbles for current round
  const spawnRoundBubbles = useCallback((round) => {
    if (!round) return;
    // Mix 3 targets and 3 distractors
    const targets = [...round.targets].sort(() => Math.random() - 0.5).slice(0, 3);
    const distractors = [...round.distractors].sort(() => Math.random() - 0.5).slice(0, 3);
    const combined = [...targets, ...distractors].sort(() => Math.random() - 0.5);

    const newBubbles = combined.map((item, idx) => ({
      id: `pb_${Date.now()}_${idx}_${item.word}`,
      word: item.word,
      hasSound: item.hasSound,
      isPopped: false,
      color: COLORS[idx % COLORS.length],
      scale: 1,
    }));

    setBubbles(newBubbles);
    setPoppedCount(0);
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
    setMascotBubble('Listen and pop! 🫧');
    spawnRoundBubbles(PHONICS_ROUNDS[0]);
    setTimeout(() => {
      playPromptAudio();
    }, 400);
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
          recordHighScore('phonics_bubble', score);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, isStandalone, consumePlayEnergy, recordHighScore, score]);

  // Handle bubble tap
  const handleBubbleClick = (bubble) => {
    if (gameState !== 'playing' || bubble.isPopped) return;

    // Speak the word
    speakText(bubble.word);

    if (bubble.hasSound) {
      // Correct!
      playPopSound();
      playCorrectSound();
      const points = 10 + streak * 5;
      setScore(s => s + points);
      setStreak(st => st + 1);
      setMascotMood('celebrate');
      setMascotBubble(`+${points}! Combo x${streak + 1} 🔥`);

      // Mark bubble popped
      setBubbles(prev => prev.map(b => b.id === bubble.id ? { ...b, isPopped: true } : b));

      const newPopped = poppedCount + 1;
      setPoppedCount(newPopped);

      // Check if all 3 targets popped in this round
      const totalTargets = bubbles.filter(b => b.hasSound).length;
      if (newPopped >= totalTargets) {
        // Advance round
        setTimeout(() => {
          const nextIdx = roundIdx + 1;
          setRoundIdx(nextIdx);
          setMascotMood('celebrate');
          setMascotBubble('Round Cleared! 🌟');
          spawnRoundBubbles(PHONICS_ROUNDS[nextIdx % PHONICS_ROUNDS.length]);
          setTimeout(() => {
            const nextRound = PHONICS_ROUNDS[nextIdx % PHONICS_ROUNDS.length];
            speakText(`${nextRound.sound}. ${nextRound.audioHint}`);
          }, 300);
        }, 500);
      }
    } else {
      // Wrong bubble
      playWrongSound();
      setStreak(0);
      setMascotMood('thinking');
      setMascotBubble(`Oops! '${bubble.word}' has a different sound! 🧐`);
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
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
            <span>🫧 PHONICS BLASTER</span>
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
          {/* Target Sound Banner */}
          <div className="flex items-center justify-between p-3 bg-indigo-950/80 rounded-2xl border border-indigo-500/40 mb-3 shadow-lg">
            <div className="flex items-center gap-2.5 min-w-0">
              <LexioMascot size={46} mood={mascotMood} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-indigo-500 text-white rounded-full">
                    Target Sound
                  </span>
                  <span className="text-sm font-black text-amber-300">{currentRound.sound}</span>
                </div>
                <p className="text-xs text-indigo-200 truncate mt-0.5">
                  {mascotBubble || currentRound.prompt}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={playPromptAudio}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md border border-indigo-400/50 cursor-pointer shrink-0 ml-2"
              title="Nghe lại âm mẫu"
            >
              <Volume2 size={20} />
            </button>
          </div>

          {/* Bubble Grid / Tank */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 items-center justify-center p-2 bg-gradient-to-b from-indigo-950/40 to-slate-900/60 rounded-2xl border border-white/5 relative overflow-hidden">
            {bubbles.map((b) => (
              <button
                key={b.id}
                type="button"
                disabled={b.isPopped}
                onClick={() => handleBubbleClick(b)}
                style={{
                  background: b.isPopped ? 'transparent' : `linear-gradient(135deg, ${b.color[0]}, ${b.color[1]})`,
                }}
                className={`w-full aspect-square max-w-[120px] mx-auto rounded-full flex flex-col items-center justify-center p-2 text-center transition-all duration-200 cursor-pointer shadow-lg border-2 ${
                  b.isPopped
                    ? 'opacity-0 scale-50 pointer-events-none'
                    : 'hover:scale-105 active:scale-95 border-white/40 shadow-sky-500/20 animate-pulse'
                }`}
              >
                <span className="text-sm sm:text-base font-black text-white drop-shadow-md">
                  {b.word}
                </span>
                <span className="text-[10px] text-white/80 font-bold mt-0.5">🫧 tap!</span>
              </button>
            ))}
          </div>

          {/* Footer Combo Bar */}
          <div className="flex items-center justify-between px-2 pt-2 text-xs font-bold text-slate-400">
            <span>Round {roundIdx + 1} / {PHONICS_ROUNDS.length}</span>
            {streak > 1 && (
              <span className="text-amber-400 font-black animate-bounce flex items-center gap-1">
                <Zap size={14} /> COMBO x{streak} (+{streak * 5} bonus)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Start / Idle Screen */}
      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <LexioMascot size={84} mood="happy" className="mb-3" />
          <h2 className="text-2xl font-black text-white tracking-wide mb-1">PHONICS SOUND BLASTER 🫧</h2>
          <p className="text-xs text-indigo-300 max-w-sm mb-4">
            Listen to the target phoneme sound, then tap all matching bubbles before the timer ends! Perfect for Cambridge Starters & Movers phonics practice.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-6 flex items-center gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">PERSONAL BEST</span>
              <span className="text-amber-300 font-black text-base">{personalBest} PTS</span>
            </div>
            <div className="w-[1px] h-6 bg-white/10" />
            <div>
              <span className="text-slate-400 block text-[10px]">TIME LIMIT</span>
              <span className="text-emerald-300 font-black text-base">60 SEC</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleStart}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-base shadow-xl shadow-sky-500/25 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            START PHONICS BATTLE 🚀
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === 'done' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <LexioMascot size={90} mood="celebrate" className="mb-3" />
          <h2 className="text-2xl font-black text-white mb-1">GAME OVER! 🏆</h2>
          <p className="text-xs text-indigo-300 mb-4">Great phonics ears today!</p>
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4 w-full max-w-xs mb-6 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-300 font-bold">Your Score:</span>
              <span className="text-amber-300 font-black text-xl">{score} PTS</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">High Score:</span>
              <span className="text-white font-bold">{Math.max(score, personalBest)} PTS</span>
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
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 cursor-pointer shadow-lg"
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
