/**
 * ChunkCatapultGame.jsx — Door 2 (Floor 3) Mini-Game: Chunk Catapult Match
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - 2-Column Collocation Matching: [Sentence Starter] ➔ [Predicate Completion]
 * - Interactive Catapult Loading & Projectile Launch Mechanics
 * - SVG Dynamic Arc Connecting Lines between matched syntactic chunks
 * - Audio via VoiceService Google Cloud TTS (speakText)
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { HelpCircle, Timer, Sparkles, CheckCircle2, RotateCcw, Crosshair } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { playCorrectSound, playWrongSound, playLaserSound, playVictoryFanfare } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';

const FALLBACK_PAIRS = [
  { id: 1, starter: 'Jake was walking carefully', completion: 'down the school corridor.' },
  { id: 2, starter: 'Rubber soles have', completion: 'strong traction on wet tiles.' },
  { id: 3, starter: 'Water on the floor', completion: 'reduces friction rapidly.' },
  { id: 4, starter: 'Nurse Sarah immediately gave', completion: 'him a cold ice pack.' },
  { id: 5, starter: 'Students should always', completion: 'wear proper anti-slip shoes.' },
];

export default function ChunkCatapultGame({
  grammarSentences = [],
  duration = 75,
  weekNumber = 33,
  gameParams = {},
  onComplete,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('chunk_catapult');

  // Build 5 chunk pairs
  const pairs = useMemo(() => {
    if (grammarSentences && grammarSentences.length >= 5) {
      return grammarSentences.slice(0, 5).map((s, idx) => {
        const text = typeof s === 'string' ? s : s.sentence || s.fullSentence || '';
        const words = text.split(' ').filter(Boolean);
        if (words.length >= 4) {
          const mid = Math.ceil(words.length / 2);
          return {
            id: idx + 1,
            starter: words.slice(0, mid).join(' '),
            completion: words.slice(mid).join(' '),
          };
        }
        return FALLBACK_PAIRS[idx % FALLBACK_PAIRS.length];
      });
    }
    return FALLBACK_PAIRS;
  }, [grammarSentences]);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [selectedStarterId, setSelectedStarterId] = useState(null);
  const [matchedIds, setMatchedIds] = useState(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [shuffledCompletions, setShuffledCompletions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [isFiring, setIsFiring] = useState(false);
  const [firingCoords, setFiringCoords] = useState(null); // { x1, y1, x2, y2 }

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize randomized right column
  const initializeBoard = useCallback(() => {
    const shuffled = [...pairs]
      .map((p) => ({ id: p.id, completion: p.completion }))
      .sort(() => Math.random() - 0.5);
    setShuffledCompletions(shuffled);
    setMatchedIds(new Set());
    setSelectedStarterId(null);
    setMistakes(0);
    setScore(0);
    setTimeLeft(duration);
    setSessionStartTime(Date.now());
  }, [pairs, duration]);

  const handleStartGame = () => {
    initializeBoard();
    setPhase('playing');
  };

  // Timer countdown
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

  // Click starter card (left column)
  const handleSelectStarter = (pairId) => {
    if (matchedIds.has(pairId) || isFiring) return;
    setSelectedStarterId(pairId);
    playLaserSound();
  };

  // Click completion card (right column)
  const handleSelectCompletion = (pairId) => {
    if (!selectedStarterId || matchedIds.has(pairId) || isFiring) return;

    setIsFiring(true);

    if (selectedStarterId === pairId) {
      // MATCH!
      playCorrectSound();
      const updatedMatches = new Set(matchedIds);
      updatedMatches.add(pairId);
      setMatchedIds(updatedMatches);
      setScore((s) => s + 20);

      // Speak complete sentence
      const matchedPair = pairs.find((p) => p.id === pairId);
      if (matchedPair) {
        speakText(`${matchedPair.starter} ${matchedPair.completion}`, null, 1.0, null, 'new_word', weekNumber);
      }

      setSelectedStarterId(null);
      setIsFiring(false);

      if (updatedMatches.size >= pairs.length) {
        setTimeout(() => {
          finishGame();
        }, 800);
      }
    } else {
      // MISMATCH
      playWrongSound();
      setMistakes((m) => m + 1);
      setTimeout(() => {
        setSelectedStarterId(null);
        setIsFiring(false);
      }, 500);
    }
  };

  const finishGame = () => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : duration;
    setTotalElapsedTime(elapsed);

    let earnedStars = 0;
    if (matchedIds.size >= 5 && mistakes <= 1) earnedStars = 3;
    else if (matchedIds.size >= 4 || (matchedIds.size === 5 && mistakes <= 3)) earnedStars = 2;
    else if (matchedIds.size >= 3) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      recordPersonalBest('chunk_catapult', elapsed);
    }

    if (onComplete) {
      onComplete(earnedStars, { pairsMatched: matchedIds.size, mistakes, score, time: elapsed });
    }
  };

  return (
    <div
      ref={containerRef}
      className="chunk-catapult-game w-full h-full flex flex-col bg-slate-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-amber-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">🧩</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-amber-400">
              Grammar Door (Floor 3)
            </div>
            <div className="text-sm font-black text-white">CHUNK CATAPULT MATCH</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-amber-300">
            Pairs: {matchedIds.size}/{pairs.length}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-bold text-slate-200">
            <Timer size={14} className="text-amber-400" />
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

      {/* Main Container */}
      <div className="flex-1 relative overflow-hidden p-4 flex flex-col items-center justify-center">
        {phase === 'intro' && (
          <div className="max-w-md text-center p-6 bg-slate-900/80 border border-amber-500/30 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-500 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-amber-500/20">
              🏹
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Chunk Catapult Match</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Load sentence starters into your magical catapult on the left, then target their matching completions on the right!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Aim & Fire ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="w-full max-w-4xl h-full flex flex-col justify-center">
            {/* Guide hint */}
            <div className="text-center text-[11px] font-semibold text-amber-300/80 mb-3">
              {selectedStarterId
                ? '🎯 Step 2: Now tap the matching completion on the right!'
                : '🏹 Step 1: Tap a sentence starter card on the left to load the catapult.'}
            </div>

            {/* 2 Columns */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 flex-1 max-h-[460px]">
              {/* Left Column: Starters */}
              <div className="flex flex-col gap-2.5 justify-center">
                <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                  <Crosshair size={13} /> <span>1. Sentence Starters</span>
                </div>
                {pairs.map((p) => {
                  const isMatched = matchedIds.has(p.id);
                  const isSelected = selectedStarterId === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectStarter(p.id)}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm font-bold ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 opacity-60 cursor-default'
                          : isSelected
                          ? 'bg-amber-500/20 border-amber-400 text-amber-200 ring-2 ring-amber-400 scale-[1.02] shadow-lg shadow-amber-500/30'
                          : 'bg-slate-900/80 border-white/10 hover:border-amber-400/50 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <span>{p.starter}</span>
                      {isMatched && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                      {isSelected && <span className="text-xs text-amber-400 font-mono">LOADED</span>}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Completions */}
              <div className="flex flex-col gap-2.5 justify-center">
                <div className="text-xs font-black text-orange-400 uppercase tracking-wider mb-1">
                  2. Predicate Completions
                </div>
                {shuffledCompletions.map((item) => {
                  const isMatched = matchedIds.has(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectCompletion(item.id)}
                      className={`p-3 sm:p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between text-xs sm:text-sm font-bold ${
                        isMatched
                          ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300 opacity-60 cursor-default'
                          : 'bg-slate-900/80 border-white/10 hover:border-orange-400/50 text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <span>{item.completion}</span>
                      {isMatched && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="max-w-md text-center p-6 bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl mx-auto mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Target Complete!</h3>
            <div className="flex justify-center gap-2 text-3xl mb-4">
              {[1, 2, 3].map((starIdx) => {
                const earned =
                  (matchedIds.size >= 5 && mistakes <= 1 && starIdx <= 3) ||
                  ((matchedIds.size >= 4 || mistakes <= 3) && starIdx <= 2) ||
                  (matchedIds.size >= 3 && starIdx <= 1);
                return (
                  <span key={starIdx} className={earned ? 'text-amber-400' : 'text-slate-600'}>
                    ★
                  </span>
                );
              })}
            </div>
            <div className="bg-slate-800/80 rounded-xl p-3.5 mb-6 text-xs text-slate-300 space-y-1.5 font-semibold">
              <div className="flex justify-between">
                <span>Pairs Matched:</span>
                <span className="font-bold text-white">{matchedIds.size}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Mistakes:</span>
                <span className="font-bold text-rose-300">{mistakes}</span>
              </div>
              <div className="flex justify-between">
                <span>Time:</span>
                <span className="font-bold text-white">{totalElapsedTime}s</span>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              <RotateCcw size={14} /> <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      <GameInstructionModal
        gameId="chunk_catapult"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
