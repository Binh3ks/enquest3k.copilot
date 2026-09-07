/**
 * ArcaneBubbleGame.jsx — Door 1 "Vocab" Mini-Game: Arcane Bubble Pop
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - 5 Progressive Waves of Target Vocabulary
 * - Glowing Spellbook Target Card with IPA & Definition
 * - Audio via VoiceService Google Cloud TTS / R2 (zero window.speechSynthesis)
 * - Crystal Bubble physics with particle bursts on pop
 * - Combo Streak multiplier (x2, x3, x4)
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, HelpCircle, Trophy, Timer, Sparkles, Flame, CheckCircle2 } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';
import HallOfFameModal from '../HallOfFameModal';

const FALLBACK_WORDS = [
  { word: 'corridor', definition: 'A long passage in a building with doors leading into rooms.' },
  { word: 'friction', definition: 'The resistance that one surface or object encounters when moving over another.' },
  { word: 'traction', definition: 'The grip of a tire on a road or a shoe on a floor.' },
  { word: 'slippery', definition: 'Difficult to hold on to or walk on because it is smooth or wet.' },
  { word: 'bandage',  definition: 'A strip of material used to bind up a wound or sprain.' },
];

export default function ArcaneBubbleGame({
  vocabItems = [],
  onComplete,
  weekNumber = 33,
  duration = 60,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('arcane_bubble');

  // Build 5 target word rounds from vocabItems or fallback
  const waves = useMemo(() => {
    const valid = vocabItems.filter((v) => v.word && v.word.length >= 3);
    const pool = valid.length >= 5 ? valid : [...valid, ...FALLBACK_WORDS];
    return pool.slice(0, 5);
  }, [vocabItems]);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [waveIndex, setWaveIndex] = useState(0); // 0 to 4 (5 waves)
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [gameTimer, setGameTimer] = useState(duration);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [poppedParticles, setPoppedParticles] = useState([]);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const timerRef = useRef(null);

  const currentTarget = waves[waveIndex % waves.length];

  // Spawn bubbles for a given wave
  const spawnWaveBubbles = useCallback((targetItem) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width > 0 ? rect.width : 400;

    // Distractor words
    const otherWords = waves
      .filter((w) => w.word !== targetItem.word)
      .map((w) => w.word);
    const distractors = otherWords.length >= 3 ? otherWords.slice(0, 3) : ['pencil', 'bottle', 'backpack'];

    const itemsToSpawn = [
      { word: targetItem.word, isTarget: true },
      ...distractors.map((w) => ({ word: w, isTarget: false })),
    ].sort(() => Math.random() - 0.5);

    const newBubbles = itemsToSpawn.map((item, idx) => ({
      id: `b_${waveIndex}_${idx}_${Date.now()}`,
      word: item.word,
      isTarget: item.isTarget,
      x: 10 + (idx * (width - 120)) / itemsToSpawn.length + (Math.random() * 20 - 10),
      y: 95 + idx * 6, // Start below viewport
      speed: 0.28 + waveIndex * 0.05 + Math.random() * 0.15,
      size: 74 + Math.random() * 16,
      popped: false,
    }));

    setBubbles(newBubbles);

    // Speak native audio via VoiceService Google TTS
    speakText(targetItem.word, null, 1.0, null, 'new_word', weekNumber);
  }, [waveIndex, waves, weekNumber]);

  // Start game session
  const handleStartGame = () => {
    setPhase('playing');
    setWaveIndex(0);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setStrikes(0);
    setGameTimer(duration);
    setSessionStartTime(Date.now());
    setIsNewRecord(false);
    setTimeout(() => {
      spawnWaveBubbles(waves[0]);
    }, 200);
  };

  // Timer loop
  useEffect(() => {
    if (phase !== 'playing' || showHelp || showHallOfFame) return;

    timerRef.current = setInterval(() => {
      setGameTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, showHelp, showHallOfFame]);

  // Bubble Physics Animation Loop
  useEffect(() => {
    if (phase !== 'playing' || showHelp || showHallOfFame) return;

    const animate = () => {
      setBubbles((prev) => {
        const next = [];
        let targetEscaped = false;

        for (const b of prev) {
          if (b.popped) continue;
          const nextY = b.y - b.speed;

          // If bubble floats off screen
          if (nextY < -15) {
            if (b.isTarget) targetEscaped = true;
          } else {
            next.push({ ...b, y: nextY });
          }
        }

        // If target escaped, penalty strike
        if (targetEscaped) {
          setCombo(0);
          setStrikes((s) => s + 1);
          speakText('Missed target! Keep eyes sharp!', null, 1.0, null, 'new_word', weekNumber);
          // Respawn current wave
          setTimeout(() => spawnWaveBubbles(currentTarget), 400);
        }

        return next;
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase, showHelp, showHallOfFame, currentTarget, spawnWaveBubbles, weekNumber]);

  // Handle bubble tap
  const handleBubbleTap = (bubble) => {
    if (bubble.popped || phase !== 'playing') return;

    // Pop animation
    setBubbles((prev) => prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b)));

    if (bubble.isTarget) {
      // Correct Pop!
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      const points = 20 + newCombo * 5;
      setScore((s) => s + points);

      // Trigger sparkle particle burst
      setPoppedParticles((p) => [...p, { id: Date.now(), x: bubble.x, y: bubble.y, text: `+${points}` }]);
      setTimeout(() => setPoppedParticles((p) => p.filter((x) => x.id !== Date.now())), 1000);

      // Advance wave or finish
      setTimeout(() => {
        if (waveIndex + 1 >= waves.length) {
          finishSession();
        } else {
          const nextWave = waveIndex + 1;
          setWaveIndex(nextWave);
          spawnWaveBubbles(waves[nextWave]);
        }
      }, 500);
    } else {
      // Wrong bubble popped
      setCombo(0);
      setStrikes((s) => s + 1);
      speakText('Wrong bubble! Look for the target word!', null, 1.0, null, 'new_word', weekNumber);
    }
  };

  // Finish session
  const finishSession = () => {
    setPhase('result');
    const elapsedSeconds = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : 40;
    setTotalElapsedTime(elapsedSeconds);

    let earnedStars = 0;
    if (waveIndex >= 4 && strikes === 0) earnedStars = 3;
    else if (waveIndex >= 3) earnedStars = 2;
    else if (waveIndex >= 2) earnedStars = 1;

    if (earnedStars >= 1) {
      const isPB = recordPersonalBest('arcane_bubble', elapsedSeconds);
      if (isPB) setIsNewRecord(true);
    }

    if (onComplete) {
      onComplete(earnedStars, { waves: waveIndex + 1, score, time: elapsedSeconds });
    }
  };

  return (
    <div
      ref={containerRef}
      className="arcane-bubble-game w-full h-full flex flex-col bg-slate-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* Top Station HUD */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-white/10 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔮</span>
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-indigo-400">
                Vocab Door
              </div>
              <div className="text-sm font-black text-white">ARCANE BUBBLE POP</div>
            </div>
          </div>

          <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-800 border border-white/10 text-[11px] font-bold text-slate-300">
            Wave {waveIndex + 1} / {waves.length}
          </span>
        </div>

        {/* HUD Center & Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {combo >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-black animate-pulse">
              <Flame size={14} /> <span>{combo}x STREAK</span>
            </div>
          )}

          {personalBest && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black">
              <span>⚡ PB:</span> <span>{personalBest}s</span>
            </div>
          )}

          <button
            onClick={() => setShowHallOfFame(true)}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Trophy size={14} /> <span className="hidden sm:inline">Hall of Fame</span>
          </button>

          {/* Countdown Timer */}
          {phase === 'playing' && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-black font-mono">
              <Timer size={14} /> <span>{gameTimer}s</span>
            </div>
          )}

          {/* Help Button */}
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors cursor-pointer"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

      {/* ── Main Gameplay Screen ── */}
      {phase === 'playing' && (
        <div className="flex-1 flex flex-col justify-between p-4 relative overflow-hidden">
          {/* Glowing Spellbook Target Card */}
          <div className="z-10 max-w-lg mx-auto w-full bg-gradient-to-r from-indigo-950/90 via-slate-900/90 to-purple-950/90 border-2 border-indigo-500/50 rounded-2xl p-4 shadow-xl shadow-indigo-500/15 backdrop-blur flex items-center justify-between">
            <div className="min-w-0 pr-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                  Target Word • Wave {waveIndex + 1}
                </span>
              </div>
              <h3 className="text-2xl font-black text-amber-300 tracking-wide leading-tight truncate">
                {currentTarget?.word}
              </h3>
              {currentTarget?.definition && (
                <p className="text-[11px] text-slate-300 line-clamp-1 italic mt-0.5">
                  💡 {currentTarget.definition}
                </p>
              )}
            </div>

            {/* Native Audio Listen Button */}
            <button
              onClick={() => speakText(currentTarget?.word, null, 1.0, null, 'new_word', weekNumber)}
              className="p-3 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 shadow-lg shadow-amber-500/30 transition-all cursor-pointer shrink-0"
              title="Listen Pronunciation"
            >
              <Volume2 size={22} />
            </button>
          </div>

          {/* Floating Crystal Bubbles Canvas */}
          <div className="absolute inset-0 pointer-events-auto">
            {bubbles.map((b) => (
              <button
                key={b.id}
                onClick={() => handleBubbleTap(b)}
                style={{
                  left: `${b.x}px`,
                  top: `${b.y}%`,
                  width: `${b.size}px`,
                  height: `${b.size}px`,
                }}
                className={`absolute rounded-full flex items-center justify-center p-2 text-center transition-transform active:scale-90 cursor-pointer shadow-lg select-none ${
                  b.popped
                    ? 'scale-150 opacity-0 pointer-events-none'
                    : 'bg-gradient-to-tr from-indigo-600/70 via-purple-500/60 to-cyan-400/80 border-2 border-white/60 hover:border-amber-300 shadow-indigo-500/30 backdrop-blur-sm'
                }`}
              >
                <span className="text-xs sm:text-sm font-black text-white leading-tight drop-shadow">
                  {b.word}
                </span>
              </button>
            ))}

            {/* Sparkle Particles Feedback */}
            {poppedParticles.map((p) => (
              <div
                key={p.id}
                style={{ left: `${p.x}px`, top: `${p.y}%` }}
                className="absolute pointer-events-none text-amber-300 font-black text-lg animate-bounce drop-shadow-md z-30"
              >
                ✨ {p.text}
              </div>
            ))}
          </div>

          {/* Bottom Guidance Status */}
          <div className="z-10 text-center shrink-0">
            <span className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-white/10 text-xs font-bold text-slate-300">
              👇 Tap the bubble containing: <strong className="text-amber-300">"{currentTarget?.word}"</strong>
            </span>
          </div>
        </div>
      )}

      {/* ── Result Phase ── */}
      {phase === 'result' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-400 flex items-center justify-center text-4xl mb-4 shadow-xl shadow-indigo-500/30">
            🔮
          </div>

          <h2 className="text-2xl font-black text-white mb-1">
            {waveIndex >= 4 ? 'VOCABULARY MASTERY CLEARED!' : 'CHALLENGE COMPLETED!'}
          </h2>

          <p className="text-xs text-slate-300 max-w-sm mb-4">
            You cleared {Math.min(waveIndex + 1, 5)} of 5 vocabulary waves with score of {score} points.
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4 text-3xl">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={
                  star <= (waveIndex >= 4 && strikes === 0 ? 3 : waveIndex >= 3 ? 2 : waveIndex >= 2 ? 1 : 0)
                    ? 'text-amber-400 filter drop-shadow'
                    : 'text-slate-700'
                }
              >
                ★
              </span>
            ))}
          </div>

          {/* Stat Badges */}
          <div className="flex gap-3 mb-5">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Total Time</div>
              <div className="text-sm font-black text-amber-300 font-mono">{totalElapsedTime}s</div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-white/10 text-center">
              <div className="text-[10px] uppercase font-bold text-slate-400">Max Streak</div>
              <div className="text-sm font-black text-orange-400 font-mono">{maxCombo}x</div>
            </div>

            {isNewRecord && (
              <div className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-400 text-center animate-bounce">
                <div className="text-[10px] uppercase font-black text-amber-400">Record</div>
                <div className="text-xs font-black text-white">NEW PB!</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full max-w-xs">
            <button
              onClick={() => setShowHallOfFame(true)}
              className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-amber-300 font-black rounded-xl text-xs uppercase tracking-wider border border-amber-500/30 transition-all cursor-pointer"
            >
              Hall of Fame
            </button>
            <button
              onClick={() => {
                if (onComplete) onComplete(waveIndex >= 4 ? 3 : waveIndex >= 3 ? 2 : 1);
              }}
              className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 text-white font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Instruction Modal */}
      <GameInstructionModal
        gameId="arcane_bubble"
        isOpen={phase === 'intro' || showHelp}
        isIntro={phase === 'intro'}
        onClose={() => setShowHelp(false)}
        onStart={handleStartGame}
      />

      {/* Hall of Fame */}
      <HallOfFameModal
        isOpen={showHallOfFame}
        onClose={() => setShowHallOfFame(false)}
        currentGameId="arcane_bubble"
        playerTime={totalElapsedTime}
      />
    </div>
  );
}
