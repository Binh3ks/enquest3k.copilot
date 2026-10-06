/**
 * HighwayRunnerGame.jsx — Door 1 (Floor 4) Mini-Game: Highway Word Runner
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - Top-down 3-lane Highway Driving Simulation with scrolling road textures
 * - Real keyboard (← / →) & on-screen touch lane-shift controls
 * - Target definition collection HUD with hazard avoidance mechanics
 * - 3 Lives system, vehicle spin animations on collision, dynamic speed scaling
 * - Audio via VoiceService Google Cloud TTS (speakText) & Web Audio SFX
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Timer, Heart, Trophy, HelpCircle, RotateCcw, ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { validateMCQOptions } from '../../../utils/quizValidation';
import { playDriftSound, playCorrectSound, playWrongSound, playVictoryFanfare, playCoinSound } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';

const DEFAULT_HIGHWAY_ITEMS = [
  { word: 'explore', definition: 'To travel around a new place to learn about it' },
  { word: 'discover', definition: 'To find or learn something for the first time' },
  { word: 'journey', definition: 'An act of traveling from one place to another' },
  { word: 'challenge', definition: 'Something new and difficult that tests your ability' },
  { word: 'victory', definition: 'Success in a game, contest, or struggle' },
  { word: 'champion', definition: 'A person who has defeated all rivals in a contest' },
];

export default function HighwayRunnerGame({
  vocabItems = [],
  duration = 60,
  weekNumber = 33,
  gameParams = {},
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('highway_runner');

  const pool = useMemo(() => {
    const valid = vocabItems.filter((v) => v.word && (v.definition || v.meaning));
    if (valid.length >= 4) {
      return valid.map((v) => ({ 
        word: v.word, 
        definition: v.definition || v.meaning,
        isReview: Boolean(v.isReview)
      }));
    }
    return DEFAULT_HIGHWAY_ITEMS.map(i => ({ ...i, isReview: false }));
  }, [vocabItems]);

  const [currentWeekCollects, setCurrentWeekCollects] = useState(0);
  const [reviewBonusScore, setReviewBonusScore] = useState(0);
  const [bonusPopup, setBonusPopup] = useState(null);
  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [currentLane, setCurrentLane] = useState(1); // 0 = left, 1 = center, 2 = right
  const [targetIdx, setTargetIdx] = useState(0);
  const [roadItems, setRoadItems] = useState([]);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [collects, setCollects] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const animRef = useRef(null);

  const currentTarget = pool[targetIdx % pool.length];

  // Spawn an obstacle or target item on the highway
  const spawnHighwayItem = useCallback(() => {
    const lane = Math.floor(Math.random() * 3);
    const isTarget = Math.random() > 0.4;

    let text = currentTarget.word;
    if (!isTarget) {
      const rawDistractors = pool.filter((p) => p.word !== currentTarget.word).map(p => p.word);
      const fallbackPool = pool.map(p => p.word);
      const validatedPool = validateMCQOptions(rawDistractors, currentTarget.word, fallbackPool, 4);
      const distractors = validatedPool.filter(w => w.toLowerCase() !== currentTarget.word.toLowerCase());
      text = distractors[Math.floor(Math.random() * distractors.length)] || 'hazard';
    }

    const newItem = {
      id: `h_${Date.now()}_${Math.random()}`,
      lane, // 0, 1, or 2
      y: -12, // top percentage
      text,
      isTarget,
      isReview: Boolean(currentTarget.isReview),
      speed: 0.85,
    };

    setRoadItems((prev) => [...prev, newItem]);
  }, [currentTarget, pool]);

  // Handle steering
  const steerLeft = useCallback(() => {
    setCurrentLane((prev) => Math.max(0, prev - 1));
    playDriftSound();
  }, []);

  const steerRight = useCallback(() => {
    setCurrentLane((prev) => Math.min(2, prev + 1));
    playDriftSound();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phase !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        steerLeft();
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        steerRight();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, steerLeft, steerRight]);

  // Start game session
  const handleStartGame = () => {
    setPhase('playing');
    setCurrentLane(1);
    setLives(3);
    setScore(0);
    setCollects(0);
    setCurrentWeekCollects(0);
    setReviewBonusScore(0);
    setTimeLeft(duration);
    setRoadItems([]);
    setTargetIdx(0);
    setSessionStartTime(Date.now());
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

  // Highway simulation & item movement loop
  useEffect(() => {
    if (phase !== 'playing') return;

    let spawnTick = 0;

    const updateHighway = () => {
      spawnTick++;
      if (spawnTick % 60 === 0) {
        spawnHighwayItem();
      }

      setRoadItems((prev) => {
        const remaining = [];
        for (const item of prev) {
          const nextY = item.y + item.speed;

          // Check collision with car near bottom (y between 72% and 86%)
          if (nextY >= 72 && nextY <= 86 && item.lane === currentLane) {
            if (item.isTarget) {
              // Collected Target!
              playCoinSound();
              playCorrectSound();
              if (item.isReview) {
                setReviewBonusScore((b) => b + 30);
                setScore((s) => s + 30);
                setBonusPopup({
                  title: '✨ SPIRAL REVIEW BONUS!',
                  xp: '+30 XP',
                  desc: 'Ôn tập tuần trước (Điểm thưởng phụ)',
                });
                setTimeout(() => setBonusPopup(null), 2500);
              } else {
                setCurrentWeekCollects((c) => c + 1);
                setScore((s) => s + 20);
              }
              setCollects((c) => {
                const updated = c + 1;
                if (updated % 4 === 0) {
                  // Switch target definition
                  setTargetIdx((idx) => idx + 1);
                }
                return updated;
              });
            } else {
              // Hit Hazard / Wrong Word!
              playWrongSound();
              setIsSpinning(true);
              setTimeout(() => setIsSpinning(false), 500);
              setLives((l) => {
                const nextLives = l - 1;
                if (nextLives <= 0) {
                  finishGame();
                }
                return Math.max(0, nextLives);
              });
            }
            continue; // Item absorbed
          }

          // Off bottom of road
          if (nextY > 110) {
            continue;
          }

          remaining.push({ ...item, y: nextY });
        }
        return remaining;
      });

      animRef.current = requestAnimationFrame(updateHighway);
    };

    animRef.current = requestAnimationFrame(updateHighway);
    return () => cancelAnimationFrame(animRef.current);
  }, [phase, currentLane, spawnHighwayItem]);

  const finishGame = () => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : duration;
    setTotalElapsedTime(elapsed);

    // Pedagogy Policy: Main stars strictly calculated from current-week items.
    // Review items grant bonus score and coins without gating room star progress.
    let earnedStars = 0;
    const baseTargetCount = currentWeekCollects > 0 ? currentWeekCollects : collects;
    if (baseTargetCount >= 10 && lives >= 2) earnedStars = 3;
    else if (baseTargetCount >= 6) earnedStars = 2;
    else if (baseTargetCount >= 3) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      recordPersonalBest('highway_runner', elapsed);
    }

    if (onComplete) {
      onComplete(earnedStars, { 
        collects, 
        currentWeekCollects, 
        reviewBonusScore, 
        livesLeft: lives, 
        score, 
        time: elapsed 
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="highway-runner-game w-full h-full flex flex-col bg-slate-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-rose-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          {onExit && (
            <button
              onClick={onExit}
              className="flex items-center gap-1 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg border border-slate-700 text-slate-300 transition-colors"
            >
              <ArrowLeft size={14} /> Exit
            </button>
          )}
          <span className="text-xl">🏎️</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-rose-400">
              Vocab Door (Floor 4)
            </div>
            <div className="text-sm font-black text-white">HIGHWAY WORD RUNNER</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Lives */}
          <div className="flex items-center gap-1">
            {[1, 2, 3].map((heart) => (
              <Heart
                key={heart}
                size={16}
                className={heart <= lives ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}
              />
            ))}
          </div>
          <div className="text-xs font-bold text-amber-300">Stars: {collects}</div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-bold text-slate-200">
            <Timer size={14} className="text-rose-400" />
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

      {/* Target Definition Dashboard */}
      {phase === 'playing' && (
        <div className="px-4 py-2 bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-b border-rose-500/30 flex items-center justify-center text-center z-10 relative">
          <div className="flex items-center gap-2 max-w-lg">
            <span className="text-xs font-black uppercase text-rose-400 shrink-0">Drive Into:</span>
            <span className="text-xs font-bold text-slate-200 truncate">
              "{currentTarget.definition}"
            </span>
          </div>
          {bonusPopup && (
            <div className="absolute top-11 px-4 py-1.5 bg-amber-400 text-slate-950 rounded-xl font-black text-xs shadow-2xl flex items-center gap-2 border-2 border-amber-200 animate-bounce z-50">
              <span>{bonusPopup.title}</span>
              <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded-md">{bonusPopup.xp}</span>
              <span className="text-[10px] font-semibold text-slate-900">{bonusPopup.desc}</span>
            </div>
          )}
        </div>
      )}

      {/* 3-Lane Highway Area */}
      <div className="flex-1 relative overflow-hidden bg-slate-900 flex justify-center">
        {phase === 'intro' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30 bg-slate-950/80">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-4xl shadow-xl shadow-rose-500/30 mb-4 animate-bounce">
              🏎️
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Highway Word Runner
            </h2>
            <p className="text-xs sm:text-sm text-rose-200/90 max-w-md mb-6 leading-relaxed">
              Steer your vehicle across 3 highway lanes to collect the words matching the target definition! Dodge incorrect word hazards to preserve your 3 lives.
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 font-black text-base shadow-lg shadow-rose-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Start Engines ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="w-full max-w-md h-full relative bg-slate-950 border-x-4 border-slate-700 shadow-2xl">
            {/* Lane Dividers */}
            <div className="absolute inset-0 grid grid-cols-3 pointer-events-none">
              <div className="border-r-2 border-dashed border-amber-400/40 h-full" />
              <div className="border-r-2 border-dashed border-amber-400/40 h-full" />
              <div className="h-full" />
            </div>

            {/* Falling Road Items */}
            {roadItems.map((item) => {
              const laneX = item.lane === 0 ? '16%' : item.lane === 1 ? '50%' : '84%';
              return (
                <div
                  key={item.id}
                  style={{
                    left: laneX,
                    top: `${item.y}%`,
                    transform: 'translateX(-50%)',
                  }}
                  className={`absolute px-2.5 py-1.5 rounded-xl text-xs font-black shadow-lg flex items-center gap-1.5 transition-transform ${
                    item.isTarget
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 border border-white ring-2 ring-amber-300 animate-pulse'
                      : 'bg-gradient-to-r from-rose-800 to-red-900 text-rose-200 border border-rose-500/60'
                  }`}
                >
                  <span>{item.isTarget ? '🌟' : '🛑'}</span>
                  <span>{item.text}</span>
                </div>
              );
            })}

            {/* Player Car */}
            <div
              style={{
                left: currentLane === 0 ? '16%' : currentLane === 1 ? '50%' : '84%',
                top: '78%',
                transform: `translateX(-50%) ${isSpinning ? 'rotate(360deg)' : 'rotate(0deg)'}`,
                transition: 'left 0.15s ease-out, transform 0.4s ease-in-out',
              }}
              className="absolute text-4xl select-none filter drop-shadow-[0_4px_12px_rgba(244,63,94,0.6)]"
            >
              🏎️
            </div>

            {/* On-Screen Touch Controls */}
            <div className="absolute bottom-4 inset-x-4 flex justify-between pointer-events-auto z-20">
              <button
                onClick={steerLeft}
                className="w-16 h-16 rounded-2xl bg-slate-900/80 border-2 border-rose-500/50 active:bg-rose-600 flex items-center justify-center text-white text-xl shadow-lg backdrop-blur"
              >
                <ArrowLeft size={28} />
              </button>
              <button
                onClick={steerRight}
                className="w-16 h-16 rounded-2xl bg-slate-900/80 border-2 border-rose-500/50 active:bg-rose-600 flex items-center justify-center text-white text-xl shadow-lg backdrop-blur"
              >
                <ArrowRight size={28} />
              </button>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30 bg-slate-950/90">
            <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center text-3xl mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Race Complete!</h3>
            <div className="flex gap-2 text-3xl mb-4">
              {[1, 2, 3].map((starIdx) => {
                const earned =
                  (collects >= 14 && lives >= 2 && starIdx <= 3) ||
                  (collects >= 9 && starIdx <= 2) ||
                  (collects >= 5 && starIdx <= 1);
                return (
                  <span key={starIdx} className={earned ? 'text-amber-400' : 'text-slate-600'}>
                    ★
                  </span>
                );
              })}
            </div>
            <div className="bg-slate-900/90 border border-white/10 rounded-xl p-4 w-64 mb-6 space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex justify-between">
                <span>Words Collected:</span>
                <span className="font-bold text-white">{collects}</span>
              </div>
              <div className="flex justify-between">
                <span>Lives Remaining:</span>
                <span className="font-bold text-rose-400">{lives}/3</span>
              </div>
              <div className="flex justify-between">
                <span>Score:</span>
                <span className="font-bold text-amber-300">{score} pts</span>
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
        gameId="highway_runner"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
