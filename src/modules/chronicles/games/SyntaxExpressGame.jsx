/**
 * SyntaxExpressGame.jsx — Door 2 (Floor 4) Mini-Game: Syntax Express 4-Car
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - Futuristic High-Speed Bullet Train (🚄) on Cyber-Magnetic Rails
 * - 4-Car Complex Syntactic Carriages: [Subject] ➔ [Verb] ➔ [Object] ➔ [Adverbial/Clause]
 * - 2 Scrambled Distractor Carts per Platform
 * - "Express Route" Zero-Undo bonus points
 * - High-speed departure timer accelerating 15% each round
 * - Audio via VoiceService Google Cloud TTS (speakText) & Web Audio SFX
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { HelpCircle, Volume2, Trophy, Timer, RotateCcw, ArrowRight, Sparkles, AlertTriangle } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { playCorrectSound, playWrongSound, playLaserSound, playVictoryFanfare } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';

// Fallback rounds (chapter_pool) — used only when grammarSentences prop is empty
const DEFAULT_EXPRESS_ROUNDS = [
  {
    fullSentence: 'Jake walked carefully down the school hallway after class.',
    chunks: [
      { role: 'Subject', text: 'Jake' },
      { role: 'Verb', text: 'walked carefully' },
      { role: 'Object', text: 'down the school hallway' },
      { role: 'Adverbial / Time', text: 'after class.' },
    ],
    distractors: ['flying airplanes', 'eating spicy noodles'],
  },
  {
    fullSentence: 'Nurse Sarah gently applied a cold ice pack to his swelling.',
    chunks: [
      { role: 'Subject', text: 'Nurse Sarah' },
      { role: 'Verb', text: 'gently applied' },
      { role: 'Object', text: 'a cold ice pack' },
      { role: 'Adverbial / Purpose', text: 'to his swelling.' },
    ],
    distractors: ['baking sweet cakes', 'reading noisy books'],
  },
  {
    fullSentence: 'The janitor placed bright yellow signs around the wet floor.',
    chunks: [
      { role: 'Subject', text: 'The janitor' },
      { role: 'Verb', text: 'placed' },
      { role: 'Object', text: 'bright yellow signs' },
      { role: 'Adverbial / Place', text: 'around the wet floor.' },
    ],
    distractors: ['swimming under water', 'painting old walls'],
  },
  {
    fullSentence: 'Modern running shoes provide excellent grip during rain.',
    chunks: [
      { role: 'Subject', text: 'Modern running shoes' },
      { role: 'Verb', text: 'provide' },
      { role: 'Object', text: 'excellent grip' },
      { role: 'Adverbial / Condition', text: 'during heavy rain.' },
    ],
    distractors: ['playing wooden guitars', 'sleeping in trees'],
  },
];

/** ROLE labels for auto-classification based on position in sentence */
const ROLE_LABELS = ['Subject', 'Verb Phrase', 'Object / Complement', 'Adverbial / Time'];

/**
 * Build express rounds from grammarSentences prop (week-specific data).
 * Each sentence is split into up to 4 chunks based on chips/word groups.
 * Falls back to DEFAULT_EXPRESS_ROUNDS when sentences prop is empty.
 *
 * @param {Array} grammarSentences - from extractQuestVocab or getContentPool
 * @returns {Array} rounds compatible with SyntaxExpressGame state machine
 */
function buildExpressRounds(grammarSentences) {
  // If no real data, use fallback
  const validSentences = (grammarSentences || []).filter(
    (s) => (typeof s === 'string' ? s : s?.sentence || s?.fullSentence || '').length > 10
  );
  if (validSentences.length < 2) return DEFAULT_EXPRESS_ROUNDS;

  const rounds = validSentences.slice(0, 6).map((entry, idx) => {
    const sentence = typeof entry === 'string'
      ? entry
      : (entry.sentence || entry.fullSentence || entry.prompt || '');
    const chips = (typeof entry === 'object' && entry.chips) ? entry.chips : null;

    let chunks;
    if (chips && chips.length >= 2) {
      // Use existing chips as syntactic units (most accurate)
      chunks = chips.slice(0, 4).map((chip, i) => ({
        role: ROLE_LABELS[i] || `Part ${i + 1}`,
        text: chip,
      }));
    } else {
      // Auto-split: divide words into 3–4 groups by rough word-count boundaries
      const words = sentence.split(/\s+/);
      const n = words.length;
      const groupSize = Math.max(1, Math.ceil(n / 4));
      const groups = [];
      for (let i = 0; i < n; i += groupSize) {
        groups.push(words.slice(i, i + groupSize).join(' '));
      }
      chunks = groups.slice(0, 4).map((text, i) => ({
        role: ROLE_LABELS[i] || `Part ${i + 1}`,
        text,
      }));
    }

    // Distractors: borrow 2 chunks from a different sentence
    const otherIdx = (idx + 1) % validSentences.length;
    const otherEntry = validSentences[otherIdx];
    const otherSentence = typeof otherEntry === 'string'
      ? otherEntry
      : (otherEntry.sentence || otherEntry.fullSentence || '');
    const otherWords = otherSentence.split(/\s+/);
    const half = Math.ceil(otherWords.length / 2);
    const distractors = [
      otherWords.slice(0, half).join(' '),
      otherWords.slice(half).join(' '),
    ].filter(Boolean).slice(0, 2);

    return { fullSentence: sentence, chunks, distractors };
  });

  return rounds;
}

export default function SyntaxExpressGame({
  grammarSentences = [],
  duration = 90,
  weekNumber = 33,
  gameParams = {},
  onComplete,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('spell_train_express');

  const rounds = useMemo(() => {
    // FIX: Use week-specific grammarSentences instead of hardcoded W33 content
    return buildExpressRounds(grammarSentences);
  }, [grammarSentences]);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [trainIndex, setTrainIndex] = useState(0);
  const [hitchedCarts, setHitchedCarts] = useState([]);
  const [availableCarts, setAvailableCarts] = useState([]);
  const [undoUsedInTrain, setUndoUsedInTrain] = useState(false);
  const [zeroUndoTrains, setZeroUndoTrains] = useState(0);
  const [strikes, setStrikes] = useState(0);
  const [score, setScore] = useState(0);
  const [trainTimer, setTrainTimer] = useState(25);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [isDeparting, setIsDeparting] = useState(false);

  const containerRef = useRef(null);
  const countdownRef = useRef(null);

  const currentRound = rounds[trainIndex % rounds.length];

  // Load platform carts for current round
  const loadPlatform = useCallback((round, roundNumber) => {
    const carts = [
      ...round.chunks.map((c, i) => ({ id: `c_${i}`, role: c.role, text: c.text, order: i, isDistractor: false })),
      ...round.distractors.map((d, i) => ({ id: `d_${i}`, role: 'Decoy', text: d, order: -1, isDistractor: true })),
    ].sort(() => Math.random() - 0.5);

    setAvailableCarts(carts);
    setHitchedCarts([]);
    setUndoUsedInTrain(false);
    setIsDeparting(false);

    // Dynamic timer: 25s for first round, 15% faster per round
    const timeForRound = Math.max(14, Math.round(25 * Math.pow(0.85, roundNumber)));
    setTrainTimer(timeForRound);
  }, []);

  // Start game session
  const handleStartGame = () => {
    setPhase('playing');
    setTrainIndex(0);
    setScore(0);
    setStrikes(0);
    setZeroUndoTrains(0);
    setSessionStartTime(Date.now());
    loadPlatform(rounds[0], 0);
  };

  // Departure countdown loop
  useEffect(() => {
    if (phase !== 'playing' || isDeparting) return;

    countdownRef.current = setInterval(() => {
      setTrainTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownRef.current);
  }, [phase, isDeparting, trainIndex]);

  // Train whistle expired
  const handleTimeExpire = () => {
    playWrongSound();
    setStrikes((s) => s + 1);
    speakText('The bullet train departed without all cars! Moving to the next route!', null, 1.0, null, 'new_word', weekNumber);

    if (trainIndex + 1 >= rounds.length) {
      finishGame();
    } else {
      const next = trainIndex + 1;
      setTrainIndex(next);
      loadPlatform(rounds[next], next);
    }
  };

  // Hitch a cart from platform to train
  const handleHitchCart = (cart) => {
    if (isDeparting) return;

    if (cart.isDistractor) {
      playWrongSound();
      setStrikes((s) => s + 1);
      speakText('Distractor cart detected! Check your syntax!', null, 1.0, null, 'new_word', weekNumber);
      return;
    }

    const expectedOrder = hitchedCarts.length;
    if (cart.order !== expectedOrder) {
      playWrongSound();
      speakText(`Order mismatch! The next carriage needs to be ${currentRound.chunks[expectedOrder]?.role}!`, null, 1.0, null, 'new_word', weekNumber);
      return;
    }

    // Correct cart hitched!
    playLaserSound();
    const updatedHitched = [...hitchedCarts, cart];
    setHitchedCarts(updatedHitched);
    setAvailableCarts((prev) => prev.filter((c) => c.id !== cart.id));

    // Check if full 4-car train complete
    if (updatedHitched.length === currentRound.chunks.length) {
      playCorrectSound();
      setIsDeparting(true);
      let gained = 30;
      if (!undoUsedInTrain) {
        gained += 15; // Express Route bonus
        setZeroUndoTrains((z) => z + 1);
      }
      setScore((s) => s + gained);

      speakText(currentRound.fullSentence, null, 1.0, null, 'new_word', weekNumber);

      setTimeout(() => {
        if (trainIndex + 1 >= rounds.length) {
          finishGame();
        } else {
          const next = trainIndex + 1;
          setTrainIndex(next);
          loadPlatform(rounds[next], next);
        }
      }, 1500);
    }
  };

  // Unhitch a cart from train back to platform
  const handleUnhitchCart = (cartIndex) => {
    if (isDeparting || cartIndex !== hitchedCarts.length - 1) return; // Only unhitch the last cart

    setUndoUsedInTrain(true);
    const cartToReturn = hitchedCarts[cartIndex];
    setHitchedCarts((prev) => prev.slice(0, cartIndex));
    setAvailableCarts((prev) => [...prev, cartToReturn]);
    playWrongSound();
  };

  const finishGame = () => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : 60;
    setTotalElapsedTime(elapsed);

    let earnedStars = 0;
    if (trainIndex >= 3 && strikes === 0) earnedStars = 3;
    else if (trainIndex >= 2) earnedStars = 2;
    else if (trainIndex >= 1) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      recordPersonalBest('spell_train_express', elapsed);
    }

    if (onComplete) {
      onComplete(earnedStars, { trainsCleared: trainIndex + 1, score, zeroUndoBonus: zeroUndoTrains, time: elapsed });
    }
  };

  return (
    <div
      ref={containerRef}
      className="syntax-express-game w-full h-full flex flex-col bg-slate-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-cyan-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">🚆</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-cyan-400">
              Grammar Door (Floor 4)
            </div>
            <div className="text-sm font-black text-white">SYNTAX EXPRESS 4-CAR</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-cyan-300">
            Route {trainIndex + 1}/4
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-bold text-slate-200">
            <Timer size={14} className="text-cyan-400" />
            <span>{trainTimer}s</span>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="flex-1 relative overflow-hidden p-4 flex flex-col justify-between">
        {phase === 'intro' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-slate-900/80 border border-cyan-500/30 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-cyan-500/20 animate-pulse">
              🚄
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Syntax Express 4-Car</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Hitch 4 syntactic carriages to the high-speed bullet train: [Subject] ➔ [Verb] ➔ [Object] ➔ [Adverbial]. Filter out distractor carts before the departure timer hits zero!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              All Aboard ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="flex-1 flex flex-col justify-between max-w-4xl mx-auto w-full">
            {/* Express Route Track Area */}
            <div className="p-4 bg-slate-900/80 border border-cyan-500/30 rounded-2xl relative overflow-hidden shadow-inner my-2">
              <div className="text-[11px] font-black uppercase text-cyan-400 tracking-wider mb-2 flex items-center justify-between">
                <span>Maglev Track Line 1</span>
                {!undoUsedInTrain && (
                  <span className="text-amber-400 flex items-center gap-1">
                    <Sparkles size={12} /> Express Route Active (+15 Bonus)
                  </span>
                )}
              </div>

              {/* The Bullet Train */}
              <div className={`flex items-center gap-2 overflow-x-auto py-2 transition-transform duration-700 ${isDeparting ? 'translate-x-full opacity-50' : ''}`}>
                {/* Silver Bullet Engine */}
                <div className="w-28 h-20 rounded-2xl bg-gradient-to-r from-slate-200 via-cyan-100 to-slate-300 text-slate-900 flex flex-col items-center justify-center border-2 border-cyan-400 shadow-lg shrink-0">
                  <span className="text-2xl">🚄</span>
                  <span className="text-[10px] font-black uppercase tracking-tight text-cyan-900">
                    EXPRESS 01
                  </span>
                </div>

                {/* 4 Carriage Slots */}
                {[0, 1, 2, 3].map((slotIdx) => {
                  const hitched = hitchedCarts[slotIdx];
                  const roleName = currentRound.chunks[slotIdx]?.role;
                  return (
                    <div
                      key={slotIdx}
                      onClick={() => hitched && handleUnhitchCart(slotIdx)}
                      className={`h-20 min-w-36 px-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center shrink-0 transition-all ${
                        hitched
                          ? 'bg-gradient-to-b from-cyan-900/70 to-slate-900 border-cyan-400 text-white cursor-pointer hover:border-rose-400 shadow-md'
                          : 'border-dashed border-slate-700 bg-slate-950/40 text-slate-500'
                      }`}
                    >
                      {hitched ? (
                        <>
                          <span className="text-[10px] font-black text-cyan-300 uppercase">
                            {hitched.role}
                          </span>
                          <span className="text-xs font-bold text-slate-100 mt-0.5">
                            {hitched.text}
                          </span>
                        </>
                      ) : (
                        <span className="text-[11px] font-black text-slate-500 uppercase">
                          [{roleName}]
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Glowing Rail Line */}
              <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-400 to-cyan-500 rounded-full mt-2 shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
            </div>

            {/* Station Platform: Available Carts */}
            <div className="p-4 bg-slate-900/60 border border-white/10 rounded-2xl">
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-2">
                Station Platform Carts (Tap in Syntactic Order):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableCarts.map((cart) => (
                  <button
                    key={cart.id}
                    onClick={() => handleHitchCart(cart)}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-cyan-400 text-left active:scale-95 transition-all cursor-pointer shadow-md group"
                  >
                    <div className="text-[10px] font-black text-slate-400 group-hover:text-cyan-300 uppercase tracking-tight">
                      Platform Cart
                    </div>
                    <div className="text-xs font-bold text-white mt-1">
                      {cart.text}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-3xl mx-auto mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">All Routes Cleared!</h3>
            <div className="flex justify-center gap-2 text-3xl mb-4">
              {[1, 2, 3].map((starIdx) => {
                const earned =
                  (trainIndex >= 3 && strikes === 0 && starIdx <= 3) ||
                  (trainIndex >= 2 && starIdx <= 2) ||
                  (trainIndex >= 1 && starIdx <= 1);
                return (
                  <span key={starIdx} className={earned ? 'text-amber-400' : 'text-slate-600'}>
                    ★
                  </span>
                );
              })}
            </div>
            <div className="bg-slate-800/80 rounded-xl p-3.5 mb-6 text-xs text-slate-300 space-y-1.5 font-semibold">
              <div className="flex justify-between">
                <span>Trains Cleared:</span>
                <span className="font-bold text-white">{trainIndex + 1}/4</span>
              </div>
              <div className="flex justify-between">
                <span>Express Route Bonuses:</span>
                <span className="font-bold text-amber-300">+{zeroUndoTrains * 15} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Total Score:</span>
                <span className="font-bold text-cyan-300">{score} pts</span>
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
        gameId="spell_train_express"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
