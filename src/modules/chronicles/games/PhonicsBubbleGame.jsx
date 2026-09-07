/**
 * PhonicsBubbleGame.jsx — Door 1 (Floor 3) Mini-Game: Phonics Sound Blaster
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - 5 Progressive Rounds of Cambridge Phonemic Discrimination
 * - Audio-First: Student listens to target sound, previews bubble audio via 🔊 button
 * - Floating Cyan / Azure Phonics Bubbles with particle bursts
 * - Combo streak multiplier (x2, x3, x4)
 * - Native voice synthesis via VoiceService Google Cloud TTS (speakText)
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, HelpCircle, Trophy, Timer, Sparkles, Flame, CheckCircle2, RotateCcw } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { playPopSound, playCorrectSound, playWrongSound, playVictoryFanfare } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';
import HallOfFameModal from '../HallOfFameModal';

const PHONICS_ROUNDS = [
  {
    phoneme: '/æ/',
    sample: 'cat',
    desc: 'Short vowel sound as in "cat" or "trap"',
    correct: [
      { word: 'trap', soundText: 'trap' },
      { word: 'clap', soundText: 'clap' },
      { word: 'hand', soundText: 'hand' },
    ],
    distractors: [
      { word: 'lake', soundText: 'lake' },
      { word: 'car', soundText: 'car' },
      { word: 'star', soundText: 'star' },
    ],
  },
  {
    phoneme: '/eɪ/',
    sample: 'train',
    desc: 'Long "A" sound as in "train" or "play"',
    correct: [
      { word: 'train', soundText: 'train' },
      { word: 'skate', soundText: 'skate' },
      { word: 'plate', soundText: 'plate' },
    ],
    distractors: [
      { word: 'track', soundText: 'track' },
      { word: 'pan', soundText: 'pan' },
      { word: 'flag', soundText: 'flag' },
    ],
  },
  {
    phoneme: '/ʃ/',
    sample: 'shoe',
    desc: 'Consonant digraph "sh" as in "shoe" or "fish"',
    correct: [
      { word: 'shine', soundText: 'shine' },
      { word: 'splash', soundText: 'splash' },
      { word: 'brush', soundText: 'brush' },
    ],
    distractors: [
      { word: 'chair', soundText: 'chair' },
      { word: 'catch', soundText: 'catch' },
      { word: 'cheese', soundText: 'cheese' },
    ],
  },
  {
    phoneme: '/tʃ/',
    sample: 'chair',
    desc: 'Consonant digraph "ch" as in "chair" or "beach"',
    correct: [
      { word: 'chip', soundText: 'chip' },
      { word: 'torch', soundText: 'torch' },
      { word: 'match', soundText: 'match' },
    ],
    distractors: [
      { word: 'ship', soundText: 'ship' },
      { word: 'shoe', soundText: 'shoe' },
      { word: 'wash', soundText: 'wash' },
    ],
  },
  {
    phoneme: '/iː/',
    sample: 'bee',
    desc: 'Long "E" sound as in "bee" or "feet"',
    correct: [
      { word: 'screen', soundText: 'screen' },
      { word: 'clean', soundText: 'clean' },
      { word: 'sleep', soundText: 'sleep' },
    ],
    distractors: [
      { word: 'step', soundText: 'step' },
      { word: 'bell', soundText: 'bell' },
      { word: 'neck', soundText: 'neck' },
    ],
  },
];

export default function PhonicsBubbleGame({
  vocabItems = [],
  onComplete,
  weekNumber = 33,
  duration = 60,
  gameParams = {},
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('phonics_bubble');

  // Build rounds incorporating curriculum vocab if matching
  const rounds = useMemo(() => {
    return PHONICS_ROUNDS;
  }, []);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [roundIdx, setRoundIdx] = useState(0);
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [correctPopsInRound, setCorrectPopsInRound] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showHallOfFame, setShowHallOfFame] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [activeAudioWord, setActiveAudioWord] = useState(null);
  const [particles, setParticles] = useState([]);

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const currentRound = rounds[roundIdx % rounds.length];

  // Spawn bubbles for current round
  const spawnBubbles = useCallback((round) => {
    if (!round) return;
    const pool = [
      ...round.correct.map((c) => ({ ...c, isCorrect: true })),
      ...round.distractors.map((d) => ({ ...d, isCorrect: false })),
    ].sort(() => Math.random() - 0.5);

    const spawned = pool.map((item, idx) => ({
      id: `pb_${roundIdx}_${idx}_${Date.now()}`,
      word: item.word,
      isCorrect: item.isCorrect,
      popped: false,
      x: 10 + (idx % 3) * 30 + (Math.random() * 8 - 4),
      y: 18 + Math.floor(idx / 3) * 38 + (Math.random() * 6 - 3),
      size: 84,
      floatOffset: Math.random() * 2,
    }));

    setBubbles(spawned);
    setCorrectPopsInRound(0);

    // Prompt the student with the target phoneme
    speakText(`Find words with the sound ${round.sample}`, null, 1.0, null, 'new_word', weekNumber);
  }, [roundIdx, weekNumber]);

  // Start game
  const handleStartGame = () => {
    setPhase('playing');
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setMistakes(0);
    setRoundIdx(0);
    setTimeLeft(duration);
    setSessionStartTime(Date.now());
    spawnBubbles(rounds[0]);
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

  // Preview audio on a bubble
  const handlePreviewAudio = (e, bubble) => {
    e.stopPropagation();
    setActiveAudioWord(bubble.word);
    speakText(bubble.word, null, 1.0, null, 'new_word', weekNumber);
    setTimeout(() => setActiveAudioWord(null), 1200);
  };

  // Pop bubble
  const handleBubbleClick = (bubble) => {
    if (bubble.popped || phase !== 'playing') return;

    if (bubble.isCorrect) {
      playPopSound(1.2);
      playCorrectSound();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      const gained = 15 + newCombo * 5;
      setScore((s) => s + gained);

      setBubbles((prev) => prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b)));

      // Add floating particle
      setParticles((p) => [...p, { id: Date.now(), x: bubble.x, y: bubble.y, text: `+${gained}` }]);
      setTimeout(() => setParticles((p) => p.filter((x) => x.id !== Date.now())), 900);

      const nextCount = correctPopsInRound + 1;
      setCorrectPopsInRound(nextCount);

      if (nextCount >= currentRound.correct.length) {
        // Round cleared!
        setTimeout(() => {
          if (roundIdx + 1 >= rounds.length) {
            finishGame();
          } else {
            const nextRound = roundIdx + 1;
            setRoundIdx(nextRound);
            spawnBubbles(rounds[nextRound]);
          }
        }, 600);
      }
    } else {
      // Wrong bubble
      playWrongSound();
      setCombo(0);
      setMistakes((m) => m + 1);
      speakText(`Not this sound! Listen again!`, null, 1.0, null, 'new_word', weekNumber);
    }
  };

  // Finish session
  const finishGame = () => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : duration;
    setTotalElapsedTime(elapsed);

    let earnedStars = 0;
    if (roundIdx >= 4 && mistakes <= 2) earnedStars = 3;
    else if (roundIdx >= 3) earnedStars = 2;
    else if (roundIdx >= 2) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      const isPB = recordPersonalBest('phonics_bubble', elapsed);
      if (isPB) setIsNewRecord(true);
    }

    if (onComplete) {
      onComplete(earnedStars, { roundsCleared: roundIdx + 1, score, time: elapsed });
    }
  };

  return (
    <div
      ref={containerRef}
      className="phonics-bubble-game w-full h-full flex flex-col bg-slate-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* HUD Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-sky-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔊</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-sky-400">
              Phonics Door (Floor 3)
            </div>
            <div className="text-sm font-black text-white">PHONICS SOUND BLASTER</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {combo >= 2 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-black animate-pulse">
              <Flame size={14} /> <span>x{combo}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-bold text-slate-200">
            <Timer size={14} className="text-sky-400" />
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

      {/* Target Sound Bar */}
      {phase === 'playing' && (
        <div className="px-4 py-2.5 bg-gradient-to-r from-sky-950/80 via-slate-900/90 to-sky-950/80 border-b border-sky-500/30 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="text-xs font-black tracking-wider text-sky-300 uppercase">
              Round {roundIdx + 1}/5
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-300">Target Sound:</span>
              <span className="px-2.5 py-0.5 rounded-md bg-sky-500/20 border border-sky-400/50 text-sky-200 font-mono font-black text-base">
                {currentRound.phoneme}
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">like "{currentRound.sample}"</span>
            </div>
          </div>
          <button
            onClick={() => speakText(`Target sound ${currentRound.sample}`, null, 1.0, null, 'new_word', weekNumber)}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <Volume2 size={14} /> <span>Listen 🔊</span>
          </button>
        </div>
      )}

      {/* Main Play Area */}
      <div className="flex-1 relative overflow-hidden bg-radial from-sky-950/40 via-slate-950 to-slate-950 p-4">
        {phase === 'intro' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-400 flex items-center justify-center text-4xl shadow-xl shadow-sky-500/30 mb-4 animate-bounce">
              🔊
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mb-2">
              Phonics Sound Blaster
            </h2>
            <p className="text-sm text-sky-200/90 max-w-md mb-6 leading-relaxed">
              Listen to the English target sound. Tap the speaker icon on each bubble to hear its pronunciation, then blast the matching bubbles!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-black text-base shadow-lg shadow-sky-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Start Mission ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="w-full h-full relative">
            {/* Instruction banner */}
            <div className="text-center text-[11px] font-semibold text-sky-300/80 mb-2">
              💡 Tap 🔊 to preview pronunciation • Tap bubble to POP!
            </div>

            {/* Bubble Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-4">
              {bubbles.map((bubble) => {
                if (bubble.popped) {
                  return (
                    <div
                      key={bubble.id}
                      className="h-24 rounded-2xl border border-dashed border-sky-500/20 flex items-center justify-center opacity-40"
                    >
                      <CheckCircle2 className="text-emerald-400" size={24} />
                    </div>
                  );
                }

                const isSpeaking = activeAudioWord === bubble.word;

                return (
                  <div
                    key={bubble.id}
                    onClick={() => handleBubbleClick(bubble)}
                    className={`h-24 rounded-2xl relative flex flex-col items-center justify-center p-2 cursor-pointer transition-all transform hover:scale-105 active:scale-95 shadow-lg ${
                      isSpeaking
                        ? 'bg-sky-500/40 border-2 border-sky-300 shadow-sky-500/50 ring-2 ring-sky-400'
                        : 'bg-gradient-to-b from-sky-600/30 to-slate-900/80 border-2 border-sky-400/40 hover:border-sky-300 shadow-sky-900/40'
                    }`}
                  >
                    <span className="text-base sm:text-lg font-black text-white tracking-wide">
                      {bubble.word}
                    </span>

                    {/* Speaker Preview Button */}
                    <button
                      onClick={(e) => handlePreviewAudio(e, bubble)}
                      className="absolute bottom-2 right-2 p-1.5 rounded-full bg-sky-500/30 hover:bg-sky-500/60 text-sky-200 transition-colors cursor-pointer"
                      title="Hear pronunciation"
                    >
                      <Volume2 size={13} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Floating text particles */}
            {particles.map((p) => (
              <div
                key={p.id}
                className="absolute text-emerald-400 font-black text-sm animate-out fade-out slide-out-to-top duration-700 pointer-events-none"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                {p.text}
              </div>
            ))}
          </div>
        )}

        {phase === 'result' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30">
            <div className="w-16 h-16 rounded-full bg-sky-500/20 border-2 border-sky-400 flex items-center justify-center text-3xl mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Challenge Complete!</h3>
            <div className="flex gap-2 text-3xl mb-4">
              {[1, 2, 3].map((starIdx) => {
                const earned =
                  (roundIdx >= 4 && mistakes <= 2 && starIdx <= 3) ||
                  (roundIdx >= 3 && starIdx <= 2) ||
                  (roundIdx >= 2 && starIdx <= 1);
                return (
                  <span key={starIdx} className={earned ? 'text-amber-400' : 'text-slate-600'}>
                    ★
                  </span>
                );
              })}
            </div>
            <div className="bg-slate-900/90 border border-white/10 rounded-xl p-4 w-64 mb-6 space-y-2 text-xs font-semibold text-slate-300">
              <div className="flex justify-between">
                <span>Rounds Cleared:</span>
                <span className="font-bold text-white">{roundIdx + 1}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Score:</span>
                <span className="font-bold text-sky-300">{score} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Max Combo:</span>
                <span className="font-bold text-amber-300">{maxCombo}x</span>
              </div>
              <div className="flex justify-between">
                <span>Time Taken:</span>
                <span className="font-bold text-white">{totalElapsedTime}s</span>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold mb-2 flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw size={14} /> <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      {/* Guide Modal */}
      <GameInstructionModal
        gameId="phonics_bubble"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
