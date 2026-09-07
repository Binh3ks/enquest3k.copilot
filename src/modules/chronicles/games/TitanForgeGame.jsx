/**
 * TitanForgeGame.jsx — Door 2 (Floor 5) Mini-Game: Titan Grammar Forge
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - Error Detection & Correction (Cambridge Reading & Writing Part 7)
 * - Two-Step Mechanic: 1. Tap error word in Titan Stone Tablet ➔ 2. Select correction rune
 * - Mythic Titan Forge theme with lightning and golden rune imbue effects
 * - 6 Progressive Syntactic Trial Inscriptions
 * - Audio via VoiceService Google Cloud TTS (speakText) & Web Audio SFX
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HelpCircle, Trophy, Timer, CheckCircle2, RotateCcw, Zap, Hammer } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { playCorrectSound, playWrongSound, playLaserSound, playVictoryFanfare } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';

const TITAN_TRIALS = [
  {
    id: 1,
    words: ['Jake', 'walk', 'carefully', 'down', 'the', 'hallway.'],
    errorWordIndex: 1, // 'walk' -> 'walked'
    errorExplanation: 'Past tense requires "walked" instead of base verb "walk".',
    options: ['walked', 'walking', 'walks', 'walker'],
    correctOption: 'walked',
  },
  {
    id: 2,
    words: ['Nurse', 'Sarah', 'give', 'Jake', 'a', 'cold', 'ice', 'pack.'],
    errorWordIndex: 2, // 'give' -> 'gave'
    errorExplanation: 'Past narrative requires "gave" instead of "give".',
    options: ['gave', 'given', 'gives', 'giving'],
    correctOption: 'gave',
  },
  {
    id: 3,
    words: ['Water', 'on', 'smooth', 'tiles', 'reduce', 'friction.'],
    errorWordIndex: 4, // 'reduce' -> 'reduces'
    errorExplanation: 'Uncountable noun "Water" requires singular verb "reduces".',
    options: ['reduces', 'reducing', 'reduced', 'reduction'],
    correctOption: 'reduces',
  },
  {
    id: 4,
    words: ['Students', 'must', 'walking', 'slowly', 'around', 'wet', 'floors.'],
    errorWordIndex: 2, // 'walking' -> 'walk'
    errorExplanation: 'Modal verb "must" must be followed by base verb "walk".',
    options: ['walk', 'walked', 'walks', 'walker'],
    correctOption: 'walk',
  },
  {
    id: 5,
    words: ['Rubber', 'soles', 'has', 'strong', 'traction', 'on', 'stairs.'],
    errorWordIndex: 2, // 'has' -> 'have'
    errorExplanation: 'Plural subject "Rubber soles" requires plural auxiliary "have".',
    options: ['have', 'having', 'had', 'haven'],
    correctOption: 'have',
  },
  {
    id: 6,
    words: ['The', 'janitor', 'placed', 'yellow', 'signs', 'in', 'the', 'floor.'],
    errorWordIndex: 5, // 'in' -> 'on'
    errorExplanation: 'Preposition of surface must be "on", not "in".',
    options: ['on', 'under', 'at', 'into'],
    correctOption: 'on',
  },
];

export default function TitanForgeGame({
  grammarSentences = [],
  duration = 90,
  weekNumber = 33,
  gameParams = {},
  onComplete,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('titan_forge');

  const trials = useMemo(() => {
    return TITAN_TRIALS;
  }, []);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [trialIndex, setTrialIndex] = useState(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState(null);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showHelp, setShowHelp] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [forgeSuccess, setForgeSuccess] = useState(false);

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const currentTrial = trials[trialIndex % trials.length];

  // Start game session
  const handleStartGame = () => {
    setPhase('playing');
    setTrialIndex(0);
    setSelectedWordIdx(null);
    setScore(0);
    setCorrectCount(0);
    setTimeLeft(duration);
    setSessionStartTime(Date.now());
    speakText('Trial 1: Identify the grammatical error on the Titan tablet!', null, 1.0, null, 'new_word', weekNumber);
  };

  // Countdown timer loop
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

  // Step 1: Click word in sentence to select error
  const handleSelectWord = (idx) => {
    if (forgeSuccess) return;
    playLaserSound();
    setSelectedWordIdx(idx);
  };

  // Step 2: Choose replacement rune
  const handleSelectReplacement = (option) => {
    if (forgeSuccess) return;

    const isWordCorrect = selectedWordIdx === currentTrial.errorWordIndex;
    const isOptionCorrect = option === currentTrial.correctOption;

    if (isWordCorrect && isOptionCorrect) {
      // Correct!
      playCorrectSound();
      setForgeSuccess(true);
      setScore((s) => s + 25);
      setCorrectCount((c) => c + 1);

      speakText(`Rune Forged! ${currentTrial.errorExplanation}`, null, 1.0, null, 'new_word', weekNumber);

      setTimeout(() => {
        advanceTrial();
      }, 1500);
    } else {
      // Wrong
      playWrongSound();
      if (!isWordCorrect) {
        speakText('That word does not contain the error. Re-read carefully!', null, 1.0, null, 'new_word', weekNumber);
      } else {
        speakText('Incorrect rune replacement. Try another rune!', null, 1.0, null, 'new_word', weekNumber);
      }
    }
  };

  const advanceTrial = () => {
    setForgeSuccess(false);
    setSelectedWordIdx(null);
    if (trialIndex + 1 >= trials.length) {
      finishGame();
    } else {
      setTrialIndex((t) => t + 1);
    }
  };

  const finishGame = () => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : duration;
    setTotalElapsedTime(elapsed);

    let earnedStars = 0;
    if (correctCount >= 5) earnedStars = 3;
    else if (correctCount >= 4) earnedStars = 2;
    else if (correctCount >= 3) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      recordPersonalBest('titan_forge', elapsed);
    }

    if (onComplete) {
      onComplete(earnedStars, { trialsCleared: correctCount, score, time: elapsed });
    }
  };

  return (
    <div
      ref={containerRef}
      className="titan-forge-game w-full h-full flex flex-col bg-zinc-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-amber-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">⚡</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-amber-400">
              Grammar Elite Door (Floor 5)
            </div>
            <div className="text-sm font-black text-white">TITAN GRAMMAR FORGE</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-amber-300">
            Trial {trialIndex + 1}/6
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 border border-white/10 text-xs font-bold text-zinc-200">
            <Timer size={14} className="text-amber-400" />
            <span>{timeLeft}s</span>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="flex-1 relative overflow-hidden p-4 flex flex-col justify-center items-center">
        {phase === 'intro' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-zinc-900/90 border border-amber-500/30 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-amber-500/20">
              ⚒️
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Titan Grammar Forge</h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
              Spot the single grammatical error inscribed upon the Titan stone tablet. Tap the wrong word, then forge it with the correct replacement rune!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-black text-sm shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Ignite Forge ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="max-w-2xl mx-auto w-full flex flex-col gap-5">
            {/* Guide hint */}
            <div className="text-center text-xs font-bold text-amber-300/80">
              {selectedWordIdx === null
                ? '👉 Step 1: Tap the erroneous word on the stone tablet below.'
                : '🔨 Step 2: Now select the correct replacement rune from the forge.'}
            </div>

            {/* Titan Stone Tablet */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 border-4 transition-all shadow-2xl relative text-center ${
              forgeSuccess
                ? 'border-amber-400 ring-4 ring-amber-400/50 shadow-amber-500/50'
                : 'border-zinc-700'
            }`}>
              <div className="text-[10px] uppercase font-black tracking-widest text-amber-400 mb-4 flex items-center justify-center gap-1.5">
                <Hammer size={13} /> <span>Titan Tablet Inscription</span>
              </div>

              {/* Interactive Words */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-base sm:text-xl font-black">
                {currentTrial.words.map((word, idx) => {
                  const isSelected = selectedWordIdx === idx;
                  const isForged = forgeSuccess && idx === currentTrial.errorWordIndex;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectWord(idx)}
                      className={`px-3 py-1.5 rounded-xl border-2 transition-all cursor-pointer ${
                        isForged
                          ? 'bg-amber-500 text-zinc-950 border-white ring-2 ring-amber-300 font-black scale-105'
                          : isSelected
                          ? 'bg-rose-500/30 border-rose-400 text-rose-200 ring-2 ring-rose-400 scale-105 animate-pulse'
                          : 'bg-zinc-800/80 border-zinc-600 hover:border-amber-400 text-zinc-200'
                      }`}
                    >
                      {isForged ? currentTrial.correctOption : word}
                    </button>
                  );
                })}
              </div>

              {forgeSuccess && (
                <div className="mt-4 text-xs font-bold text-emerald-400 flex items-center justify-center gap-1.5 animate-in fade-in">
                  <CheckCircle2 size={14} /> <span>{currentTrial.errorExplanation}</span>
                </div>
              )}
            </div>

            {/* Forge Runes Options */}
            {selectedWordIdx !== null && (
              <div className="space-y-2 animate-in fade-in">
                <div className="text-[11px] font-black uppercase text-zinc-400 tracking-wider text-center">
                  Select Correction Rune:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentTrial.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleSelectReplacement(option)}
                      className="py-3 px-4 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border-2 border-amber-500/40 hover:border-amber-400 active:scale-95 text-amber-200 hover:text-white font-black text-sm tracking-wide shadow-md transition-all cursor-pointer text-center"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {phase === 'result' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl mx-auto mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Trials Completed!</h3>
            <div className="flex justify-center gap-2 text-3xl mb-4">
              {[1, 2, 3].map((starIdx) => {
                const earned =
                  (correctCount >= 5 && starIdx <= 3) ||
                  (correctCount >= 4 && starIdx <= 2) ||
                  (correctCount >= 3 && starIdx <= 1);
                return (
                  <span key={starIdx} className={earned ? 'text-amber-400' : 'text-slate-600'}>
                    ★
                  </span>
                );
              })}
            </div>
            <div className="bg-zinc-800/80 rounded-xl p-3.5 mb-6 text-xs text-zinc-300 space-y-1.5 font-semibold">
              <div className="flex justify-between">
                <span>Inscriptions Repaired:</span>
                <span className="font-bold text-white">{correctCount}/6</span>
              </div>
              <div className="flex justify-between">
                <span>Total Score:</span>
                <span className="font-bold text-amber-300">{score} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Time Taken:</span>
                <span className="font-bold text-white">{totalElapsedTime}s</span>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              <RotateCcw size={14} /> <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      <GameInstructionModal
        gameId="titan_forge"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
