import React, { useState, useEffect } from 'react';
import { Trophy, Volume2, Flame, Play, RotateCcw, Crosshair, Zap } from 'lucide-react';
import { speakText } from '../../utils/AudioHelper';
import { fireCelebrationConfetti } from '../../utils/confettiHelper';
import useArcadeStore from '../../stores/useArcadeStore';

export default function MeteorSmasherGame({ words = [], onComplete, isStandalone = false }) {
  const DEFAULT_WORDS = [
    'friction', 'slippery', 'headmaster', 'bandage', 'medical',
    'corridor', 'rubber', 'safety', 'caution', 'momentum'
  ];
  const activeWords = words && words.length > 0 ? words : DEFAULT_WORDS;

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [targetWord, setTargetWord] = useState('');
  const [meteors, setMeteors] = useState([]);
  const [laserEffect, setLaserEffect] = useState(null);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const spawnRound = () => {
    const target = activeWords[Math.floor(Math.random() * activeWords.length)];
    setTargetWord(target);

    const distractors = activeWords
      .filter(w => w !== target)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    const roundWords = [target, ...distractors].sort(() => Math.random() - 0.5);

    const newMeteors = roundWords.map((word, i) => ({
      id: `${word}_${Date.now()}_${i}`,
      word,
      isTarget: word === target,
      color: i === 0 ? 'border-purple-400 bg-purple-950/80' : i === 1 ? 'border-rose-400 bg-rose-950/80' : 'border-amber-400 bg-amber-950/80'
    }));

    setMeteors(newMeteors);
    speakText(target);
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setGameTimer(60);
    setGameState('playing');
    spawnRound();
  };

  useEffect(() => {
    if (gameState !== 'playing') return;
    const interval = setInterval(() => {
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
    recordHighScore('meteor_smasher', score);
    fireCelebrationConfetti('Arcade_Meteor_Win');
    if (onComplete) onComplete(score);
  };

  const handleShoot = (meteor) => {
    setLaserEffect(meteor.id);
    setTimeout(() => setLaserEffect(null), 300);

    if (meteor.isTarget) {
      const nextStreak = streak + 1;
      setScore(s => s + 15 + nextStreak * 3);
      setStreak(nextStreak);
      spawnRound();
    } else {
      setStreak(0);
      speakText(`Target: ${targetWord}`);
    }
  };

  return (
    <div className="w-full h-full min-h-[360px] bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 rounded-3xl p-4 text-white relative overflow-hidden flex flex-col justify-between select-none shadow-2xl border-2 border-purple-500/30 font-sans">
      
      {/* Top HUD */}
      <div className="flex items-center justify-between z-10 px-2 py-1 bg-slate-900/80 backdrop-blur rounded-2xl border border-purple-500/30">
        <div className="flex items-center gap-2">
          <span className="text-xl">🛸</span>
          <div>
            <h4 className="text-xs font-black text-purple-300 uppercase tracking-wider">Vocab Meteor Smasher</h4>
            <span className="text-[10px] text-slate-400 font-bold">Space Laser Challenge</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs font-black text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-xl border border-amber-400/30">
            <Trophy size={13} /> {score} PTS
          </div>
          {streak >= 2 && (
            <div className="flex items-center gap-1 text-xs font-black text-purple-400 bg-purple-400/10 px-2 py-1 rounded-xl border border-purple-400/30 animate-pulse">
              <Flame size={13} /> {streak}x
            </div>
          )}
          <div className="text-xs font-black px-2.5 py-1 bg-purple-500/20 text-purple-300 rounded-xl border border-purple-400/40">
            ⏱️ {gameTimer}s
          </div>
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 z-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-4xl shadow-xl shadow-purple-500/30 animate-pulse ring-4 ring-purple-400/40">
            🛸
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-purple-300">Blast the Target Asteroid!</h3>
            <p className="text-xs text-indigo-200 max-w-sm mx-auto">
              Fire your spaceship laser at the incoming meteor matching the prompt word!
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className="px-8 py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 text-white font-black rounded-2xl text-sm shadow-xl active:scale-95 transition flex items-center gap-2"
          >
            <Play size={18} fill="currentColor" /> ENGAGE LASERS (1 MIN)
          </button>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="flex-1 relative overflow-hidden my-2 flex flex-col justify-between">
          <div className="text-center z-10 py-1.5 px-4 bg-purple-500/10 border border-purple-400/40 rounded-2xl backdrop-blur-sm mx-auto flex items-center gap-2">
            <span className="text-[10px] font-black uppercase text-purple-400">Lock Target:</span>
            <span className="text-xl font-black text-purple-200 tracking-wide">{targetWord}</span>
            <button type="button" onClick={() => speakText(targetWord)} className="p-1 hover:bg-purple-500/20 rounded-lg text-purple-300">
              <Volume2 size={15} />
            </button>
          </div>

          {/* Asteroids falling */}
          <div className="grid grid-cols-3 gap-3 my-auto px-4">
            {meteors.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleShoot(m)}
                className={`p-4 rounded-3xl border-2 ${m.color} shadow-lg flex flex-col items-center justify-center gap-1.5 transition-all hover:scale-105 active:scale-90 ${
                  laserEffect === m.id ? 'ring-4 ring-rose-500 scale-110 bg-rose-900' : ''
                }`}
              >
                <Crosshair size={22} className="text-purple-400" />
                <span className="text-sm font-black text-white">{m.word}</span>
              </button>
            ))}
          </div>

          <div className="text-center text-[10px] text-purple-300 font-bold">
            Tap the asteroid to fire spaceship laser!
          </div>
        </div>
      )}

      {gameState === 'done' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8 z-10 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-3xl shadow-xl font-black">
            🏆
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-amber-300">Asteroids Cleared!</h3>
            <p className="text-sm font-bold text-white">
              Final Score: <strong className="text-amber-400 text-lg">{score} PTS</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={startGame}
            className="px-6 py-2.5 bg-purple-500 hover:bg-purple-400 text-white font-black rounded-xl text-xs transition flex items-center gap-1.5 active:scale-95"
          >
            <RotateCcw size={14} /> Re-launch
          </button>
        </div>
      )}
    </div>
  );
}
