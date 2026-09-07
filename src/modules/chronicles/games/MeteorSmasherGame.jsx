/**
 * MeteorSmasherGame.jsx — Door 3 (Floor 3) Mini-Game: Cosmic Meteor Smasher
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - High-Speed Definition & Vocabulary Reflex Target Defense
 * - 3 Simultaneous Falling Cosmic Meteors with fiery particles
 * - "Meteor Storm" Super Blast upon 3 consecutive precision hits
 * - Audio via VoiceService Google Cloud TTS (speakText) & Web Audio SFX
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Timer, Zap, Trophy, HelpCircle, RotateCcw, Flame, Sparkles } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { playLaserSound, playPopSound, playCorrectSound, playWrongSound, playVictoryFanfare } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';

const FALLBACK_TARGETS = [
  { word: 'friction', definition: 'The resistance force between two moving surfaces' },
  { word: 'traction', definition: 'The grip of shoes or tires preventing slipping' },
  { word: 'slippery', definition: 'Smooth or wet surface that is hard to walk on' },
  { word: 'bandage',  definition: 'A strip of material used to protect a wound' },
  { word: 'corridor', definition: 'A hallway connecting various rooms in a school' },
  { word: 'ice pack', definition: 'A frozen bag placed on an injury to reduce swelling' },
];

export default function MeteorSmasherGame({
  vocabItems = [],
  duration = 45,
  weekNumber = 33,
  gameParams = {},
  onComplete,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('meteor_smasher');

  const targets = useMemo(() => {
    const valid = vocabItems.filter((v) => v.word && (v.definition || v.meaning));
    if (valid.length >= 4) {
      return valid.map((v) => ({ word: v.word, definition: v.definition || v.meaning }));
    }
    return FALLBACK_TARGETS;
  }, [vocabItems]);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [currentTargetIdx, setCurrentTargetIdx] = useState(0);
  const [meteors, setMeteors] = useState([]);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showHelp, setShowHelp] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [explosions, setExplosions] = useState([]);
  const [isMeteorStorm, setIsMeteorStorm] = useState(false);

  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const animRef = useRef(null);

  const activeTarget = targets[currentTargetIdx % targets.length];

  // Spawn 3 falling meteors for active target
  const spawnMeteors = useCallback((target) => {
    const otherWords = targets.filter((t) => t.word !== target.word);
    const distractors = otherWords.sort(() => Math.random() - 0.5).slice(0, 2);

    const pool = [
      { text: target.definition, isCorrect: true },
      ...distractors.map((d) => ({ text: d.definition, isCorrect: false })),
    ].sort(() => Math.random() - 0.5);

    const spawned = pool.map((item, idx) => ({
      id: `m_${idx}_${Date.now()}`,
      text: item.text,
      isCorrect: item.isCorrect,
      x: 15 + idx * 30 + (Math.random() * 8 - 4),
      y: -10 - idx * 12,
      speed: 0.35 + Math.random() * 0.15,
      scale: 0.95 + Math.random() * 0.1,
    }));

    setMeteors(spawned);
  }, [targets]);

  // Start game session
  const handleStartGame = () => {
    setPhase('playing');
    setScore(0);
    setHits(0);
    setStreak(0);
    setMaxStreak(0);
    setTimeLeft(duration);
    setCurrentTargetIdx(0);
    setSessionStartTime(Date.now());
    spawnMeteors(targets[0]);
  };

  // Timer loop
  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase]);

  // Falling animation loop
  useEffect(() => {
    if (phase !== 'playing') return;

    const updateFall = () => {
      setMeteors((prev) =>
        prev.map((m) => {
          const nextY = m.y + m.speed;
          // If meteor reaches bottom without being hit, respawn at top
          if (nextY > 105) {
            return {
              ...m,
              y: -10,
              x: 15 + Math.random() * 65,
            };
          }
          return { ...m, y: nextY };
        })
      );
      animRef.current = requestAnimationFrame(updateFall);
    };

    animRef.current = requestAnimationFrame(updateFall);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase]);

  // Handle shooting a meteor
  const handleMeteorClick = (meteor) => {
    if (phase !== 'playing') return;

    if (meteor.isCorrect) {
      // HIT!
      playLaserSound();
      playCorrectSound();
      const newHits = hits + 1;
      const newStreak = streak + 1;
      setHits(newHits);
      setStreak(newStreak);
      setMaxStreak((m) => Math.max(m, newStreak));

      let gained = 20 + newStreak * 5;

      // Trigger METEOR STORM at streak multiple of 3
      if (newStreak > 0 && newStreak % 3 === 0) {
        setIsMeteorStorm(true);
        gained += 25;
        setTimeout(() => setIsMeteorStorm(false), 1200);
      }

      setScore((s) => s + gained);

      // Trigger explosion animation
      setExplosions((ex) => [
        ...ex,
        { id: Date.now(), x: meteor.x, y: meteor.y, text: `+${gained}` },
      ]);
      setTimeout(() => setExplosions((ex) => ex.filter((e) => e.id !== Date.now())), 800);

      // Advance to next target
      const nextIdx = currentTargetIdx + 1;
      setCurrentTargetIdx(nextIdx);
      spawnMeteors(targets[nextIdx % targets.length]);
    } else {
      // MISSED / WRONG METEOR
      playWrongSound();
      setStreak(0);
      setScore((s) => Math.max(0, s - 5));
    }
  };

  const finishGame = () => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : duration;
    setTotalElapsedTime(elapsed);

    let earnedStars = 0;
    if (hits >= 10) earnedStars = 3;
    else if (hits >= 7) earnedStars = 2;
    else if (hits >= 4) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      recordPersonalBest('meteor_smasher', elapsed);
    }

    if (onComplete) {
      onComplete(earnedStars, { hits, score, maxStreak, time: elapsed });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`meteor-smasher-game w-full h-full flex flex-col bg-slate-950 text-white select-none relative overflow-hidden font-sans ${
        isMeteorStorm ? 'ring-4 ring-amber-400/80 animate-pulse' : ''
      }`}
    >
      {/* HUD Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-indigo-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">🛸</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-indigo-400">
              Integration Door (Floor 3)
            </div>
            <div className="text-sm font-black text-white">METEOR SMASHER</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {streak >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs font-black animate-pulse">
              <Flame size={14} /> <span>{streak} Streak!</span>
            </div>
          )}
          <div className="text-xs font-bold text-sky-300">Hits: {hits}</div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-bold text-slate-200">
            <Timer size={14} className="text-indigo-400" />
            <span>{timeLeft}s</span>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </div>

      {/* Target Word HUD */}
      {phase === 'playing' && (
        <div className="px-4 py-2 bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/30 flex items-center justify-center text-center z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-indigo-300">Shoot the meaning of:</span>
            <span className="px-3 py-0.5 rounded-lg bg-indigo-500/30 border border-indigo-400/50 text-indigo-100 font-black text-sm uppercase tracking-wider">
              {activeTarget.word}
            </span>
          </div>
        </div>
      )}

      {/* Cosmic Game Area */}
      <div className="flex-1 relative overflow-hidden bg-radial from-indigo-950/40 via-slate-950 to-slate-950 p-4">
        {phase === 'intro' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 to-fuchsia-500 flex items-center justify-center text-4xl shadow-xl shadow-indigo-500/30 mb-4 animate-bounce">
              ☄️
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Cosmic Meteor Smasher
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200/90 max-w-md mb-6 leading-relaxed">
              Cosmic meteors carry definitions toward your defense base. Read the target word and shoot the correct meteor before time expires!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-black text-base shadow-lg shadow-indigo-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Defend Base ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="w-full h-full relative">
            {/* Meteor Storm Banner */}
            {isMeteorStorm && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest shadow-xl shadow-amber-500/50 animate-bounce">
                🌠 METEOR STORM ACTIVE! +25 BONUS!
              </div>
            )}

            {/* Falling Meteors */}
            {meteors.map((m) => (
              <div
                key={m.id}
                onClick={() => handleMeteorClick(m)}
                style={{
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: `scale(${m.scale})`,
                }}
                className="absolute w-44 sm:w-56 p-3 rounded-2xl bg-gradient-to-b from-amber-800/90 via-orange-950 to-slate-900 border-2 border-orange-500/60 shadow-xl shadow-orange-900/60 cursor-pointer hover:border-amber-300 active:scale-90 transition-transform flex flex-col items-center justify-center text-center select-none"
              >
                <div className="text-orange-400 text-xs mb-1">☄️ INCOMING</div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  {m.text}
                </div>
              </div>
            ))}

            {/* Explosions */}
            {explosions.map((ex) => (
              <div
                key={ex.id}
                style={{ left: `${ex.x}%`, top: `${ex.y}%` }}
                className="absolute text-amber-300 font-black text-lg animate-out fade-out zoom-out-150 duration-500 pointer-events-none z-30"
              >
                💥 {ex.text}
              </div>
            ))}
          </div>
        )}

        {phase === 'result' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-3xl mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Space Defense Complete!</h3>
            <div className="flex gap-2 text-3xl mb-4">
              {[1, 2, 3].map((starIdx) => {
                const earned =
                  (hits >= 10 && starIdx <= 3) ||
                  (hits >= 7 && starIdx <= 2) ||
                  (hits >= 4 && starIdx <= 1);
                return (
                  <span key={starIdx} className={earned ? 'text-amber-400' : 'text-slate-600'}>
                    ★
                  </span>
                );
              })}
            </div>
            <div className="bg-slate-900/90 border border-white/10 rounded-xl p-4 w-64 mb-6 space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex justify-between">
                <span>Meteors Smashed:</span>
                <span className="font-bold text-white">{hits}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Precision Streak:</span>
                <span className="font-bold text-amber-300">{maxStreak}x</span>
              </div>
              <div className="flex justify-between">
                <span>Total Score:</span>
                <span className="font-bold text-indigo-300">{score} pts</span>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} /> <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      <GameInstructionModal
        gameId="meteor_smasher"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
