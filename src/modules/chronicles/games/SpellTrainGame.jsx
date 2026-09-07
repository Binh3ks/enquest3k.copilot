/**
 * SpellTrainGame.jsx — Door 2 "Grammar" Mini-Game: The Express Syntax Locomotive
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - Real animated Steam Locomotive chugging at the station with billowing steam puffs
 * - 3 or 4 Syntactic Carriages: [Subject] ➔ [Verb] ➔ [Object] ➔ [Place / Time]
 * - Urgent Departure Timer (25s per train) with whistles & strike penalty if missed
 * - Multi-Train Progression: 4 consecutive trains to clear the station
 * - Audio via VoiceService Google Cloud TTS / R2 (zero window.speechSynthesis)
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { HelpCircle, Volume2, Trophy, Timer, AlertTriangle, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';
import HallOfFameModal from '../HallOfFameModal';

const DEFAULT_TRAIN_ROUNDS = [
  {
    fullSentence: 'Jake was walking down the school corridor.',
    chunks: [
      { role: 'Subject', text: 'Jake' },
      { role: 'Verb', text: 'was walking' },
      { role: 'Object', text: 'down the' },
      { role: 'Place / Time', text: 'school corridor.' },
    ],
    distractor: 'flying airplanes',
  },
  {
    fullSentence: 'Rubber soles have strong grip on tiles.',
    chunks: [
      { role: 'Subject', text: 'Rubber soles' },
      { role: 'Verb', text: 'have' },
      { role: 'Object', text: 'strong grip' },
      { role: 'Place / Time', text: 'on tiles.' },
    ],
    distractor: 'swimming dolphins',
  },
  {
    fullSentence: 'Water on tiles reduces friction quickly.',
    chunks: [
      { role: 'Subject', text: 'Water on tiles' },
      { role: 'Verb', text: 'reduces' },
      { role: 'Object', text: 'friction' },
      { role: 'Place / Time', text: 'very quickly.' },
    ],
    distractor: 'eating sandwiches',
  },
  {
    fullSentence: 'Nurse Sarah gave Jake an ice pack.',
    chunks: [
      { role: 'Subject', text: 'Nurse Sarah' },
      { role: 'Verb', text: 'gave' },
      { role: 'Object', text: 'Jake' },
      { role: 'Place / Time', text: 'an ice pack.' },
    ],
    distractor: 'baking cakes',
  },
];

const DISTRACTORS = [
  'eating pizza', 'sleeping cats', 'flying kites', 'climbing trees',
  'swimming fast', 'baking cakes', 'running away', 'singing songs'
];

function parseSentenceToSyntaxChunks(sentence, index) {
  if (!sentence || sentence.length < 6) return null;
  const clean = sentence.replace(/[.!?]/g, '').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 3) return null;

  const distractor = DISTRACTORS[index % DISTRACTORS.length];

  if (words.length <= 4) {
    return {
      fullSentence: sentence,
      chunks: [
        { role: 'Subject', text: words[0] },
        { role: 'Verb', text: words[1] },
        { role: 'Object', text: words.slice(2).join(' ') + '.' },
      ],
      distractor,
    };
  }

  // 4 chunks for 5+ words: Subject, Verb, Object, Place/Time
  const sLen = 1;
  const vLen = words.length >= 6 && ['was', 'is', 'are', 'were', 'have', 'has', 'had'].includes(words[1].toLowerCase()) ? 2 : 1;
  const remaining = words.slice(sLen + vLen);
  const mid = Math.floor(remaining.length / 2) || 1;
  const oWords = remaining.slice(0, mid);
  const mWords = remaining.slice(mid);

  return {
    fullSentence: sentence,
    chunks: [
      { role: 'Subject', text: words.slice(0, sLen).join(' ') },
      { role: 'Verb', text: words.slice(sLen, sLen + vLen).join(' ') },
      { role: 'Object', text: oWords.join(' ') },
      { role: 'Place / Time', text: (mWords.length > 0 ? mWords.join(' ') : 'today') + '.' },
    ],
    distractor,
  };
}

export default function SpellTrainGame({
  grammarSentences = [],
  onComplete,
  weekNumber = 33,
  duration = 25, // seconds per train
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('spell_train');

  // Build rounds from week grammar sentences or default
  const rounds = useMemo(() => {
    const parsed = grammarSentences
      .map((s, idx) => parseSentenceToSyntaxChunks(s.sentence || s.text || '', idx))
      .filter(Boolean);
    return parsed.length >= 3 ? parsed.slice(0, 4) : DEFAULT_TRAIN_ROUNDS;
  }, [grammarSentences]);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [trainIndex, setTrainIndex] = useState(0); // 0 to 3 (4 trains)
  const [trainTimer, setTrainTimer] = useState(duration);
  const [strikes, setStrikes] = useState(0);
  const [clearedTrains, setClearedTrains] = useState(0);
  const [hitchedCarts, setHitchedCarts] = useState([]);
  const [availableCarts, setAvailableCarts] = useState([]);
  const [isDeparting, setIsDeparting] = useState(false);
  const [isMissedDeparture, setIsMissedDeparture] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [isNewRecord, setIsNewRecord] = useState(false);

  const currentRound = rounds[trainIndex % rounds.length];
  const timerRef = useRef(null);

  // Initialize word carts for current train
  const initTrain = useCallback((round) => {
    if (!round) return;
    const items = [
      ...round.chunks.map((c, i) => ({ id: `chk_${i}_${c.text}`, text: c.text, role: c.role, isCorrect: true })),
      { id: `dist_${round.distractor}`, text: round.distractor, role: 'Distractor', isCorrect: false },
    ].sort(() => Math.random() - 0.5);

    setAvailableCarts(items);
    setHitchedCarts([]);
    setTrainTimer(duration);
    setIsDeparting(false);
    setIsMissedDeparture(false);
  }, [duration]);

  // Start game session
  const handleStartGame = () => {
    setPhase('playing');
    setTrainIndex(0);
    setStrikes(0);
    setClearedTrains(0);
    setSessionStartTime(Date.now());
    setIsNewRecord(false);
    initTrain(rounds[0]);
  };

  // Urgent departure timer loop (per train)
  useEffect(() => {
    if (phase !== 'playing' || showHelp || showHallOfFame || isDeparting || isMissedDeparture) return;

    timerRef.current = setInterval(() => {
      setTrainTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTrainMissed();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, showHelp, showHallOfFame, isDeparting, isMissedDeparture, trainIndex]);

  // Train missed departure (time expired)
  const handleTrainMissed = () => {
    setIsMissedDeparture(true);
    speakText("Time's up! Train departed empty!", null, 1.0, null, 'grammar', weekNumber);

    const nextStrikes = strikes + 1;
    setStrikes(nextStrikes);

    setTimeout(() => {
      if (nextStrikes >= 3 || trainIndex + 1 >= rounds.length) {
        finishSession(clearedTrains, nextStrikes);
      } else {
        const nextIdx = trainIndex + 1;
        setTrainIndex(nextIdx);
        initTrain(rounds[nextIdx]);
      }
    }, 1800);
  };

  // Hitch a word cart to the train
  const handleHitchCart = (cart) => {
    if (phase !== 'playing' || isDeparting || isMissedDeparture) return;
    speakText(cart.text, null, 1.0, null, 'grammar', weekNumber);

    // Remove from platform, add to hitched
    setAvailableCarts((prev) => prev.filter((c) => c.id !== cart.id));
    const nextHitched = [...hitchedCarts, cart];
    setHitchedCarts(nextHitched);

    // If all carriages are filled, verify grammar syntax
    if (nextHitched.length === currentRound.chunks.length) {
      checkSyntax(nextHitched);
    }
  };

  // Unhitch a cart from the train
  const handleUnhitchCart = (cart) => {
    if (phase !== 'playing' || isDeparting || isMissedDeparture) return;
    setHitchedCarts((prev) => prev.filter((c) => c.id !== cart.id));
    setAvailableCarts((prev) => [...prev, cart]);
  };

  // Verify grammar syntax sequence
  const checkSyntax = (hitched) => {
    const isCorrect = hitched.every((c, i) => c.text === currentRound.chunks[i].text);

    if (isCorrect) {
      // Successful fill-up! Train departs in glory!
      setIsDeparting(true);
      const nextCleared = clearedTrains + 1;
      setClearedTrains(nextCleared);

      // Play whole sentence audio via VoiceService Google TTS
      setTimeout(() => {
        speakText(currentRound.fullSentence, null, 1.0, null, 'grammar', weekNumber);
      }, 300);

      setTimeout(() => {
        if (trainIndex + 1 >= rounds.length) {
          finishSession(nextCleared, strikes);
        } else {
          const nextIdx = trainIndex + 1;
          setTrainIndex(nextIdx);
          initTrain(rounds[nextIdx]);
        }
      }, 2000);
    } else {
      // Incorrect syntax sequence
      speakText('Incorrect syntax order! Unhitch and reorder!', null, 1.0, null, 'grammar', weekNumber);
      setTimeout(() => {
        // Return carts to platform for retry before timer expires
        setHitchedCarts([]);
        setAvailableCarts([
          ...currentRound.chunks.map((c, i) => ({ id: `chk_${i}_${c.text}`, text: c.text, role: c.role, isCorrect: true })),
          { id: `dist_${currentRound.distractor}`, text: currentRound.distractor, role: 'Distractor', isCorrect: false },
        ].sort(() => Math.random() - 0.5));
      }, 1000);
    }
  };

  // Finish session & calculate stars
  const finishSession = (cleared, finalStrikes) => {
    setPhase('result');
    const elapsedSeconds = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : 45;
    setTotalElapsedTime(elapsedSeconds);

    let earnedStars = 0;
    if (cleared >= 4 && finalStrikes === 0) earnedStars = 3;
    else if (cleared >= 3) earnedStars = 2;
    else if (cleared >= 2) earnedStars = 1;

    // Record personal best if at least 2 trains cleared
    if (earnedStars >= 1) {
      const isPB = recordPersonalBest('spell_train', elapsedSeconds);
      if (isPB) setIsNewRecord(true);
    }

    if (onComplete) {
      onComplete(earnedStars, { cleared, strikes: finalStrikes, time: elapsedSeconds });
    }
  };

  return (
    <div className="spell-train-game w-full h-full flex flex-col bg-slate-950 text-white select-none relative overflow-hidden font-sans">
      {/* Top Station HUD */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-white/10 shrink-0 z-10 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚂</span>
            <div>
              <div className="text-[10px] uppercase font-black tracking-widest text-amber-400">
                Grammar Door
              </div>
              <div className="text-sm font-black text-white">
                SPELL SENTENCE TRAIN
              </div>
            </div>
          </div>

          <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-slate-800 border border-white/10 text-[11px] font-bold text-slate-300">
            Train {trainIndex + 1} / {rounds.length}
          </span>
        </div>

        {/* HUD Center / Right: PB, Hall of Fame, Timer, Help */}
        <div className="flex items-center gap-2 sm:gap-3">
          {personalBest && (
            <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-black">
              <span>⚡ PB:</span> <span>{personalBest}s</span>
            </div>
          )}

          {/* Hall of Fame Trigger */}
          <button
            onClick={() => setShowHallOfFame(true)}
            className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
            title="View Hall of Fame Leaderboard"
          >
            <Trophy size={14} /> <span className="hidden sm:inline">Hall of Fame</span>
          </button>

          {/* Urgent Departure Countdown */}
          {phase === 'playing' && (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-black font-mono transition-colors ${
                trainTimer <= 7
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
              }`}
            >
              <Timer size={14} /> <span>{trainTimer}s</span>
            </div>
          )}

          {/* Strikes tracker */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-bold">
            <span className="text-slate-400 text-[10px] uppercase">Strikes:</span>
            {[0, 1, 2].map((s) => (
              <span key={s} className={s < strikes ? 'text-rose-500 font-black' : 'text-slate-600'}>
                ✗
              </span>
            ))}
          </div>

          {/* How to Play Help */}
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors cursor-pointer"
            title="How to Play"
          >
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

      {/* ── Main Station Gameplay Screen ── */}
      {phase === 'playing' && (
        <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden relative">
          {/* Station Departure Header & Audio Cue */}
          <div className="flex items-center justify-between bg-slate-900/60 p-3 rounded-xl border border-white/5 shrink-0 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-black text-amber-300 uppercase tracking-wide">
                Platform 1 • Steaming Engine Ready
              </span>
            </div>

            <button
              onClick={() => speakText(currentRound.fullSentence, null, 1.0, null, 'grammar', weekNumber)}
              className="px-2.5 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <Volume2 size={14} /> <span>Listen Clue</span>
            </button>
          </div>

          {/* 🚂 THE STEAM TRAIN & RAILWAY TRACKS 🚂 */}
          <div className="my-auto py-2">
            <div
              className={`transition-all duration-1000 ease-in-out ${
                isDeparting
                  ? 'translate-x-[110%] opacity-0'
                  : isMissedDeparture
                  ? 'translate-x-[110%] opacity-20 filter grayscale'
                  : 'translate-x-0 opacity-100'
              }`}
            >
              {/* Train Row */}
              <div className="flex items-end justify-center gap-2 sm:gap-3 overflow-x-auto pb-3 px-2">
                {/* 1. Animated Steam Locomotive Engine */}
                <div className="flex flex-col items-center shrink-0 relative mr-1">
                  {/* Billowing Steam Clouds */}
                  <div className="absolute -top-7 left-3 flex gap-1 pointer-events-none">
                    <div className="w-4 h-4 rounded-full bg-white/70 blur-[1px] animate-bounce" />
                    <div className="w-5 h-5 rounded-full bg-white/50 blur-[2px] animate-ping" />
                  </div>

                  {/* Engine Body Graphic */}
                  <div className="p-3.5 bg-gradient-to-tr from-slate-950 via-slate-800 to-amber-700/80 border-2 border-amber-500 rounded-2xl shadow-xl shadow-amber-500/20 flex flex-col items-center justify-center min-w-[85px] h-[85px]">
                    <span className="text-4xl filter drop-shadow">🚂</span>
                    <span className="text-[9px] font-black text-amber-300 tracking-wider uppercase mt-1">
                      Express
                    </span>
                  </div>

                  {/* Wheels */}
                  <div className="flex gap-2 -mt-1.5">
                    <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-950 animate-spin" />
                    <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-slate-950 animate-spin" />
                  </div>
                </div>

                {/* 2. Syntax Carriages (Subject, Verb, Object, Place/Time) */}
                {currentRound.chunks.map((chunk, idx) => {
                  const hitched = hitchedCarts[idx];
                  const roleColors = [
                    'border-amber-400 bg-amber-500/10 text-amber-200',
                    'border-emerald-400 bg-emerald-500/10 text-emerald-200',
                    'border-cyan-400 bg-cyan-500/10 text-cyan-200',
                    'border-purple-400 bg-purple-500/10 text-purple-200',
                  ];
                  const colorClass = roleColors[idx % roleColors.length];

                  return (
                    <div key={idx} className="flex flex-col items-center shrink-0">
                      {/* Carriage Box */}
                      <div
                        onClick={() => hitched && handleUnhitchCart(hitched)}
                        className={`min-w-[95px] sm:min-w-[115px] h-[85px] p-2.5 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative shadow-lg ${
                          hitched
                            ? `${colorClass} font-black shadow-amber-500/10 hover:scale-105 hover:border-rose-400`
                            : 'border-dashed border-slate-700 bg-slate-900/60 text-slate-500'
                        }`}
                      >
                        {hitched ? (
                          <>
                            <span className="text-xs sm:text-sm font-black leading-tight line-clamp-2">
                              {hitched.text}
                            </span>
                            <span className="text-[9px] font-bold text-amber-300 uppercase tracking-wider mt-1">
                              [{chunk.role}]
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                              Carriage {idx + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-500 mt-0.5">
                              [{chunk.role}]
                            </span>
                          </>
                        )}
                      </div>

                      {/* Carriage Wheels & Coupler */}
                      <div className="flex gap-4 -mt-1.5">
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-600 border border-slate-900" />
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-600 border border-slate-900" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* 3. Steel Railway Track */}
              <div className="w-full max-w-2xl mx-auto mt-1 flex flex-col items-center">
                <div className="w-full h-1.5 bg-slate-600 rounded-full shadow-inner" />
                <div className="w-full flex justify-between px-4 -mt-1">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-3 bg-amber-900/80 rounded-sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Departure Banner Notice */}
            {isDeparting && (
              <div className="text-center mt-3 animate-bounce">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-black text-xs tracking-wider uppercase shadow-lg shadow-emerald-500/30">
                  🎉 Toot Toot! Train Departing on Time! (+25 PP)
                </span>
              </div>
            )}
            {isMissedDeparture && (
              <div className="text-center mt-3 animate-shake">
                <span className="px-4 py-1.5 rounded-full bg-rose-500 text-white font-black text-xs tracking-wider uppercase shadow-lg shadow-rose-500/30">
                  ⚠️ Time Expired! Train Missed! (+1 Strike)
                </span>
              </div>
            )}
          </div>

          {/* 📦 Platform Word Carts Waiting to Hitch 📦 */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300">
                👇 Tap word carts in grammatical order:
              </span>
              <span className="text-[11px] font-semibold text-slate-400 italic">
                (Avoid the trick distractor cart)
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {availableCarts.map((cart) => (
                <button
                  key={cart.id}
                  onClick={() => handleHitchCart(cart)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 active:scale-95 border-2 border-white/15 hover:border-amber-400 rounded-xl text-xs sm:text-sm font-bold text-white text-center cursor-pointer transition-all shadow-md flex items-center justify-center min-h-[52px]"
                >
                  <span>{cart.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Result Phase ── */}
      {phase === 'result' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-4xl mb-4 shadow-xl shadow-amber-500/30">
            {clearedTrains >= 3 ? '🏆' : clearedTrains >= 2 ? '🌟' : '🚂'}
          </div>

          <h2 className="text-2xl font-black text-white mb-1">
            {clearedTrains >= 3 ? 'STATION MASTER EXCELLENCE!' : 'CHALLENGE COMPLETED!'}
          </h2>

          <p className="text-xs text-slate-300 max-w-sm mb-4">
            You cleared {clearedTrains} of {rounds.length} express syntax trains with {strikes} strikes.
          </p>

          {/* Stars */}
          <div className="flex justify-center gap-2 mb-4 text-3xl">
            {[1, 2, 3].map((star) => (
              <span
                key={star}
                className={
                  star <= (clearedTrains >= 4 && strikes === 0 ? 3 : clearedTrains >= 3 ? 2 : clearedTrains >= 2 ? 1 : 0)
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
              <div className="text-[10px] uppercase font-bold text-slate-400">Trains Cleared</div>
              <div className="text-sm font-black text-emerald-300 font-mono">{clearedTrains} / {rounds.length}</div>
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
                if (onComplete) onComplete(clearedTrains >= 3 ? 3 : clearedTrains >= 2 ? 2 : 1);
              }}
              className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Instruction Modal (Intro or In-Game) */}
      <GameInstructionModal
        gameId="spell_train"
        isOpen={phase === 'intro' || showHelp}
        isIntro={phase === 'intro'}
        onClose={() => setShowHelp(false)}
        onStart={handleStartGame}
      />

      {/* Speedrunner Hall of Fame Modal */}
      <HallOfFameModal
        isOpen={showHallOfFame}
        onClose={() => setShowHallOfFame(false)}
        currentGameId="spell_train"
        playerTime={totalElapsedTime}
      />
    </div>
  );
}
