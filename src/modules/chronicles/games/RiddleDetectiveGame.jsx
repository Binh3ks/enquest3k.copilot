/**
 * RiddleDetectiveGame.jsx — Door 3 (Floor 4) Mini-Game: Mystery Riddle Detective
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - 5 Detective Case Dossiers with 3 Progressive Clue Lines
 * - Early Deductive Bonus Scoring (+30, +20, +10 pts)
 * - 4 MCQ Suspect Card Analysis
 * - Case File dossiers with Magnifying Glass animations
 * - Audio via VoiceService Google Cloud TTS (speakText) & Web Audio SFX
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HelpCircle, Search, Trophy, Timer, Sparkles, CheckCircle2, RotateCcw, FileText, ChevronRight } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { validateMCQOptions } from '../../../utils/quizValidation';
import { playCorrectSound, playWrongSound, playLaserSound, playVictoryFanfare } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';

const DEFAULT_RIDDLES = [
  {
    answer: 'friction',
    clues: [
      'I am an invisible physical force that appears whenever two surfaces touch.',
      'Without me, your shoes would continuously slide and you could never walk forward.',
      'I stop wheels from slipping and make rubber soles grip wet bathroom tiles.',
    ],
    options: ['friction', 'gravity', 'electricity', 'magnetism'],
  },
  {
    answer: 'corridor',
    clues: [
      'I am a long, indoor architectural pathway found inside large buildings.',
      'Students walk through me quietly between classrooms and the science laboratory.',
      'I have many numbered doors along my walls leading to different rooms.',
    ],
    options: ['corridor', 'balcony', 'attic', 'playground'],
  },
  {
    answer: 'bandage',
    clues: [
      'I am made of clean cloth or sterile medical gauze.',
      'When you trip and scrape your knee, the school nurse wraps me gently around it.',
      'I keep dirt away from cuts so your skin can heal safely.',
    ],
    options: ['bandage', 'blanket', 'curtain', 'scarf'],
  },
  {
    answer: 'slippery',
    clues: [
      'I am an adjective describing surfaces with very low resistance.',
      'Spilled soapy water or melted ice makes floors behave like this.',
      'Bright yellow warning signs alert pedestrians that floors are dangerous.',
    ],
    options: ['slippery', 'sticky', 'fragile', 'spiky'],
  },
  {
    answer: 'ice pack',
    clues: [
      'I live inside a medical freezer until an emergency happens.',
      'A doctor or nurse presses me against an ankle to soothe pain and swelling.',
      'I feel freezing cold to the touch and slowly melt as I absorb heat.',
    ],
    options: ['ice pack', 'hot towel', 'thermometer', 'flashlight'],
  },
];

export default function RiddleDetectiveGame({
  vocabItems = [],
  duration = 90,
  weekNumber = 33,
  gameParams = {},
  onComplete,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('lexical_riddle');

  const riddles = useMemo(() => {
    const fallbackWords = vocabItems.map(v => v.word);
    return DEFAULT_RIDDLES.map(r => ({
      ...r,
      options: validateMCQOptions(r.options, r.answer, fallbackWords, 4),
    }));
  }, [vocabItems]);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [caseIndex, setCaseIndex] = useState(0);
  const [revealedCluesCount, setRevealedCluesCount] = useState(1);
  const [score, setScore] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [caseTimer, setCaseTimer] = useState(25);
  const [showHelp, setShowHelp] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const currentCase = riddles[caseIndex % riddles.length];

  // Start game session
  const handleStartGame = () => {
    setPhase('playing');
    setCaseIndex(0);
    setRevealedCluesCount(1);
    setScore(0);
    setSolvedCount(0);
    setCaseTimer(25);
    setSessionStartTime(Date.now());
    speakText(`Case File 1: Read the clue carefully!`, null, 1.0, null, 'new_word', weekNumber);
  };

  // Case countdown timer
  useEffect(() => {
    if (phase !== 'playing') return;

    timerRef.current = setInterval(() => {
      setCaseTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, caseIndex]);

  // When timer runs out for a case
  const handleTimeExpire = () => {
    playWrongSound();
    setFeedback('wrong');
    speakText(`Time is up for Case File ${caseIndex + 1}! Moving to the next file.`, null, 1.0, null, 'new_word', weekNumber);
    advanceCase();
  };

  // Reveal next clue
  const handleRevealNextClue = () => {
    if (revealedCluesCount < 3) {
      playLaserSound();
      setRevealedCluesCount((prev) => prev + 1);
    }
  };

  // Select suspect card
  const handleSelectOption = (option) => {
    if (feedback !== null) return;

    if (option === currentCase.answer) {
      // Correct answer!
      playCorrectSound();
      setFeedback('correct');
      const bonus = revealedCluesCount === 1 ? 30 : revealedCluesCount === 2 ? 20 : 10;
      setScore((s) => s + bonus);
      setSolvedCount((sc) => sc + 1);

      speakText(`Case Solved! The mystery word is ${currentCase.answer}!`, null, 1.0, null, 'new_word', weekNumber);

      setTimeout(() => {
        advanceCase();
      }, 1200);
    } else {
      // Wrong suspect
      playWrongSound();
      setFeedback('wrong');
      speakText(`Incorrect lead! That is not the mystery subject.`, null, 1.0, null, 'new_word', weekNumber);

      setTimeout(() => {
        setFeedback(null);
      }, 800);
    }
  };

  const advanceCase = () => {
    setFeedback(null);
    if (caseIndex + 1 >= riddles.length) {
      finishGame();
    } else {
      const next = caseIndex + 1;
      setCaseIndex(next);
      setRevealedCluesCount(1);
      setCaseTimer(25);
    }
  };

  const finishGame = () => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : 60;
    setTotalElapsedTime(elapsed);

    let earnedStars = 0;
    if (solvedCount >= 5 && score >= 90) earnedStars = 3;
    else if (solvedCount >= 4) earnedStars = 2;
    else if (solvedCount >= 3) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      recordPersonalBest('lexical_riddle', elapsed);
    }

    if (onComplete) {
      onComplete(earnedStars, { casesSolved: solvedCount, score, time: elapsed });
    }
  };

  return (
    <div
      ref={containerRef}
      className="riddle-detective-game w-full h-full flex flex-col bg-stone-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-stone-900/90 border-b border-amber-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔍</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-amber-400">
              Integration Door (Floor 4)
            </div>
            <div className="text-sm font-black text-white">MYSTERY RIDDLE DETECTIVE</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-amber-300">
            Case File {caseIndex + 1}/5
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-stone-800 border border-white/10 text-xs font-bold text-stone-200">
            <Timer size={14} className="text-amber-400" />
            <span>{caseTimer}s</span>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 cursor-pointer"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="flex-1 relative overflow-hidden p-4 flex flex-col justify-center">
        {phase === 'intro' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-stone-900/90 border border-amber-500/30 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 to-yellow-500 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-amber-500/20">
              🕵️‍♂️
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Mystery Riddle Detective</h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mb-6">
              Crack 5 mystery dossiers! Clue 1 gives the highest bonus (+30 pts). Reveal more clues if you need evidence, then select the matching suspect!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-stone-950 font-black text-sm shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Open Dossier ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
            {/* Dossier Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-500/40 shadow-xl relative">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider">
                  <FileText size={15} /> <span>Case File #{caseIndex + 1}: Classified Evidence</span>
                </div>
                <span className="text-[11px] font-bold text-stone-400">
                  Current Value: {revealedCluesCount === 1 ? '+30 pts' : revealedCluesCount === 2 ? '+20 pts' : '+10 pts'}
                </span>
              </div>

              {/* Clues List */}
              <div className="space-y-2.5 my-3">
                {currentCase.clues.slice(0, revealedCluesCount).map((clue, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-800/80 border border-white/5 animate-in fade-in"
                  >
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-black shrink-0">
                      Clue #{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm font-medium text-stone-200 leading-relaxed">
                      "{clue}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Reveal More Clues Button */}
              {revealedCluesCount < 3 && (
                <button
                  onClick={handleRevealNextClue}
                  className="w-full mt-2 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Search size={14} /> <span>Reveal Next Clue ({revealedCluesCount === 1 ? 'Clue #2' : 'Clue #3'})</span>
                </button>
              )}
            </div>

            {/* Suspect Options */}
            <div className="grid grid-cols-2 gap-3">
              {currentCase.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelectOption(option)}
                  className="p-3.5 sm:p-4 rounded-xl bg-stone-900 border-2 border-stone-800 hover:border-amber-400/60 active:scale-95 transition-all text-center text-sm sm:text-base font-black text-white hover:bg-stone-850 cursor-pointer shadow-md"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-stone-900/90 border border-white/10 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-3xl mx-auto mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Investigation Closed!</h3>
            <div className="flex justify-center gap-2 text-3xl mb-4">
              {[1, 2, 3].map((starIdx) => {
                const earned =
                  (solvedCount >= 5 && score >= 90 && starIdx <= 3) ||
                  (solvedCount >= 4 && starIdx <= 2) ||
                  (solvedCount >= 3 && starIdx <= 1);
                return (
                  <span key={starIdx} className={earned ? 'text-amber-400' : 'text-slate-600'}>
                    ★
                  </span>
                );
              })}
            </div>
            <div className="bg-stone-800/80 rounded-xl p-3.5 mb-6 text-xs text-stone-300 space-y-1.5 font-semibold">
              <div className="flex justify-between">
                <span>Cases Cracked:</span>
                <span className="font-bold text-white">{solvedCount}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Total Score:</span>
                <span className="font-bold text-amber-300">{score} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Investigation Time:</span>
                <span className="font-bold text-white">{totalElapsedTime}s</span>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              <RotateCcw size={14} /> <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      <GameInstructionModal
        gameId="lexical_riddle"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
