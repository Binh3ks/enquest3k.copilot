import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, Volume2, Flame, Play, RotateCcw } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import useArcadeStore from '../../stores/useArcadeStore';

export default function BubblePopGame({ words = [], onComplete, isStandalone = false }) {
  const DEFAULT_WORDS = [
    'friction', 'slippery', 'headmaster', 'bandage', 'medical',
    'corridor', 'rubber', 'safety', 'caution', 'momentum', 'velocity'
  ];
  const activeWords = words && words.length > 0 ? words : DEFAULT_WORDS;

  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'done'
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameTimer, setGameTimer] = useState(60); // 60s max per round
  const [targetWord, setTargetWord] = useState('');
  const [bubbles, setBubbles] = useState([]);
  const containerRef = useRef(null);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const spawnRound = () => {
    const target = activeWords[Math.floor(Math.random() * activeWords.length)];
    setTargetWord(target);

    // Pick 3 distractors
    const distractors = activeWords
      .filter(w => w !== target)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const roundWords = [target, ...distractors].sort(() => Math.random() - 0.5);

    const newBubbles = roundWords.map((word, i) => ({
      id: `${word}_${Date.now()}_${i}`,
      word,
      isTarget: word === target,
      x: 15 + (i * 22) + (Math.random() * 6 - 3),
      y: 65 + (Math.random() * 20),
      speed: 0.8 + Math.random() * 0.5,
      size: word.length > 8 ? 'w-24 h-24 text-[11px]' : 'w-20 h-20 text-xs',
      color: i === 0 ? 'from-cyan-400 to-blue-500' : i === 1 ? 'from-purple-400 to-pink-500' : i === 2 ? 'from-amber-300 to-orange-400' : 'from-emerald-300 to-teal-500'
    }));

    setBubbles(newBubbles);
    speakText(target);
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setGameTimer(60);
    setGameState('playing');
    spawnRound();
  };

  // Timer loop & energy deduction
  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
      // Consume 1s arcade energy if not standalone
      if (!isStandalone) {
        const hasEnergy = consumePlayEnergy(1);
        if (!hasEnergy) {
          endGame();
          return;
        }
      }

      setGameTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, isStandalone]);

  const endGame = () => {
    setGameState('done');
    recordHighScore('bubble_pop', score);
    fireCelebrationConfetti('Arcade_BubblePop_Win');
    if (onComplete) onComplete(score);
  };

  const handlePop = (bubble) => {
    if (bubble.isTarget) {
      const nextStreak = streak + 1;
      const pts = 10 + (nextStreak * 2);
      setScore(s => s + pts);
      setStreak(nextStreak);
      spawnRound();
    } else {
      setStreak(0);
      speakText(`Oops! Find ${targetWord}`);
    }
  };

  return (
    <div className="w-full h-full min-h-[360px] bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 rounded-3xl p-4 text-white relative overflow-hidden flex flex-col justify-between select-none shadow-2xl border-2 border-cyan-500/30">
      
      {/* Top HUD Bar */}
      <div className="flex items-center justify-between z-10 px-2 py-1 bg-slate-900/80 backdrop-blur rounded-2xl border border-cyan-500/30">
        <div className="flex items-center gap-2">
          <span className="text-xl">🫧</span>
          <div>
            <h4 className="text-xs font-black text-cyan-300 uppercase tracking-wider">Bubble Pop Dash</h4>
            <span className="text-[10px] text-slate-400 font-bold">Arcade Mini-Game</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-400/30">
            <Trophy size={13} /> {score} PTS
          </div>
          {streak >= 2 && (
            <div className="flex items-center gap-1 text-xs font-black text-rose-400 bg-rose-400/10 px-2 py-1 rounded-xl border border-rose-400/30 animate-pulse">
              <Flame size={13} /> {streak}x
            </div>
          )}
          <div className="text-xs font-black px-2.5 py-1 bg-cyan-500/20 text-cyan-300 rounded-xl border border-cyan-400/40">
            ⏱️ {gameTimer}s
          </div>
        </div>
      </div>

      {/* Game Canvas Area */}
      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-4xl shadow-xl shadow-cyan-500/30 animate-bounce ring-4 ring-cyan-400/40">
            🫧
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-cyan-300">Pop the Matching Vocab Bubble!</h3>
            <p className="text-xs text-indigo-200 max-w-sm mx-auto">
              Listen to the word & tap the correct bubble before time runs out. Chain combos for high scores!
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black rounded-2xl text-sm shadow-xl active:scale-95 transition flex items-center gap-2"
          >
            <Play size={18} fill="currentColor" /> START BUBBLE POP (1 MIN)
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div ref={containerRef} className="flex-1 relative overflow-hidden my-2 flex flex-col justify-between">
          
          {/* Target Word Display Banner */}
          <div className="text-center z-10 py-1.5 px-4 bg-cyan-500/10 border border-cyan-400/40 rounded-2xl backdrop-blur-sm mx-auto flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-cyan-400">Target Word:</span>
            <span className="text-xl font-black text-cyan-200 tracking-wide">{targetWord}</span>
            <button
              type="button"
              onClick={() => speakText(targetWord)}
              className="p-1 hover:bg-cyan-500/20 rounded-lg text-cyan-300 transition"
              title="Hear word"
            >
              <Volume2 size={15} />
            </button>
          </div>

          {/* Floating Bubbles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center justify-center p-4 my-auto">
            {bubbles.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handlePop(b)}
                className={`${b.size} rounded-full bg-gradient-to-br ${b.color} border-2 border-white/80 shadow-lg shadow-cyan-500/20 flex items-center justify-center font-black text-slate-950 p-2 mx-auto text-center transition-all duration-200 hover:scale-110 active:scale-90 animate-in zoom-in`}
              >
                {b.word}
              </button>
            ))}
          </div>

          <div className="text-center text-[10px] text-indigo-300 font-bold">
            Tap the matching bubble to pop!
          </div>
        </div>
      )}

      {gameState === 'done' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 z-10 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-3xl shadow-xl font-black">
            🏆
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-amber-300">Round Complete!</h3>
            <p className="text-sm font-bold text-white">
              Final Score: <strong className="text-amber-400 text-lg">{score} PTS</strong>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={startGame}
              className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center gap-1.5 active:scale-95"
            >
              <RotateCcw size={14} /> Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
