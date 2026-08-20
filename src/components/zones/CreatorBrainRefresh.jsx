import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, Zap, Play, RotateCcw, CheckCircle2 } from 'lucide-react';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';

/**
 * CreatorBrainRefresh — 30-second Mini Brain Refresh Game for Creator Studio.
 * Breaks up heavy writing/creation tasks with a fun, high-energy tap game.
 */
export default function CreatorBrainRefresh({ onContinue }) {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'done'
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [targetWord, setTargetWord] = useState('corridor');
  const [wordOptions, setWordOptions] = useState([]);

  const WORDS = [
    'corridor', 'friction', 'slippery', 'headmaster', 'bandage',
    'medical', 'nurse', 'safety', 'caution', 'rubber', 'motion', 'careful'
  ];

  const generateRound = () => {
    const target = WORDS[Math.floor(Math.random() * WORDS.length)];
    const distractors = WORDS.filter(w => w !== target).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [target, ...distractors].sort(() => Math.random() - 0.5);
    setTargetWord(target);
    setWordOptions(options);
  };

  const handleStart = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
    generateRound();
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameState('done');
          fireCelebrationConfetti?.('BrainRefresh_Victory');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  const handleTap = (word) => {
    if (word === targetWord) {
      setScore(prev => prev + 10);
      generateRound();
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 via-purple-50 to-indigo-50 border-2 border-purple-200 rounded-3xl text-center space-y-4 shadow-inner">
      <div className="flex items-center justify-between">
        <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
          ⚡ 30s BRAIN REFRESH MINI-GAME
        </span>
        {gameState === 'playing' && (
          <span className="text-xs font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
            ⏱️ {timeLeft}s remaining
          </span>
        )}
      </div>

      {gameState === 'idle' && (
        <div className="space-y-4 py-4">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center font-black text-3xl mx-auto shadow-lg animate-bounce">
            ⚡
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900">Take a 30s Brain Break!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
              Tap the matching word as fast as you can to recharge your energy before the next creation task!
            </p>
          </div>
          <button
            type="button"
            onClick={handleStart}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 text-white font-black rounded-2xl text-xs shadow-lg inline-flex items-center gap-2 transition hover:scale-105 active:scale-95"
          >
            <Play size={16} fill="currentColor" /> START 30s SPEED REFRESH
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="space-y-5 py-2">
          <div className="bg-white/80 backdrop-blur p-4 rounded-2xl border border-purple-200 shadow-sm max-w-xs mx-auto">
            <span className="text-[10px] font-black uppercase text-purple-500 block mb-1">Find & Tap:</span>
            <span className="text-2xl font-black text-indigo-900">{targetWord}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {wordOptions.map((word, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleTap(word)}
                className="p-3 bg-white hover:bg-purple-100 border-2 border-purple-200 text-indigo-950 font-black rounded-2xl text-sm shadow transition active:scale-90"
              >
                {word}
              </button>
            ))}
          </div>

          <div className="text-xs font-black text-amber-700">Score: {score} PTS</div>
        </div>
      )}

      {gameState === 'done' && (
        <div className="space-y-4 py-3 animate-in zoom-in-95">
          <Trophy size={48} className="mx-auto text-amber-500 animate-bounce" />
          <div>
            <h3 className="text-xl font-black text-slate-900">BRAIN RECHARGED! 🎉</h3>
            <p className="text-xs font-bold text-emerald-700 mt-1">You earned +{score} XP!</p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleStart}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-black rounded-xl text-xs transition"
            >
              <RotateCcw size={14} className="inline mr-1" /> Play Again
            </button>
            <button
              type="button"
              onClick={onContinue}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-black rounded-xl text-xs shadow-md transition hover:scale-105"
            >
              Continue to Broadcast Studio ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
