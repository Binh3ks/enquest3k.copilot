/**
 * GrandMasterMatrixGame.jsx — Door 1 (Floor 5) Mini-Game: Grand Master Matrix
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - 4×4 Matrix Grid (16 cards total) with 4 synthesis dimensions per vocab item:
 *   [Word] + [Definition] + [Example Sentence] + [Part of Speech / Collocation]
 * - Group Selection & Matrix Stabilization Locking Mechanic
 * - Golden Arcane Resonator burst on full 4-card set clearance
 * - Audio via VoiceService Google Cloud TTS (speakText) & Web Audio SFX
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HelpCircle, Trophy, Timer, CheckCircle2, RotateCcw, Lock, Layers, Sparkles } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { playCorrectSound, playWrongSound, playLaserSound, playVictoryFanfare } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';

const MATRIX_GROUPS = [
  {
    groupId: 'friction',
    word: 'Friction',
    definition: 'Force resisting motion between two surfaces in contact',
    example: 'Rough soles generate more ___ on wet tiles.',
    badge: 'Noun • Resistance',
  },
  {
    groupId: 'corridor',
    word: 'Corridor',
    definition: 'A long indoor passage connecting various rooms',
    example: 'Jake walked quietly down the school ___ after class.',
    badge: 'Noun • Hallway',
  },
  {
    groupId: 'slippery',
    word: 'Slippery',
    definition: 'Difficult to stand on because of water or smooth polish',
    example: 'Be careful! The freshly cleaned floor is very ___.',
    badge: 'Adjective • Smooth',
  },
  {
    groupId: 'bandage',
    word: 'Bandage',
    definition: 'Medical cloth strip wrapped around wounds or sprains',
    example: 'Nurse Sarah gently wrapped a sterile ___ on his knee.',
    badge: 'Noun • Medical Wrap',
  },
];

export default function GrandMasterMatrixGame({
  vocabItems = [],
  duration = 90,
  weekNumber = 33,
  gameParams = {},
  onComplete,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('grand_matrix');

  const groups = useMemo(() => {
    return MATRIX_GROUPS;
  }, []);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [cards, setCards] = useState([]);
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [clearedGroupIds, setClearedGroupIds] = useState(new Set());
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showHelp, setShowHelp] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [shakeIds, setShakeIds] = useState([]);

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Initialize 16 matrix cards
  const initializeGrid = () => {
    const rawCards = [];
    groups.forEach((g) => {
      rawCards.push({ id: `${g.groupId}_w`, groupId: g.groupId, type: 'Word', text: g.word });
      rawCards.push({ id: `${g.groupId}_d`, groupId: g.groupId, type: 'Definition', text: g.definition });
      rawCards.push({ id: `${g.groupId}_e`, groupId: g.groupId, type: 'Example', text: g.example });
      rawCards.push({ id: `${g.groupId}_b`, groupId: g.groupId, type: 'Grammar Tag', text: g.badge });
    });

    // Shuffle
    const shuffled = rawCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setSelectedCardIds([]);
    setClearedGroupIds(new Set());
    setAttemptsLeft(5);
    setScore(0);
    setTimeLeft(duration);
    setSessionStartTime(Date.now());
  };

  const handleStartGame = () => {
    initializeGrid();
    setPhase('playing');
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

  // Card click
  const handleCardClick = (cardId) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card || clearedGroupIds.has(card.groupId)) return;

    if (selectedCardIds.includes(cardId)) {
      setSelectedCardIds((prev) => prev.filter((id) => id !== cardId));
    } else {
      if (selectedCardIds.length < 4) {
        playLaserSound();
        setSelectedCardIds((prev) => [...prev, cardId]);
      }
    }
  };

  // Lock group button
  const handleLockGroup = () => {
    if (selectedCardIds.length !== 4) return;

    const selectedCards = cards.filter((c) => selectedCardIds.includes(c.id));
    const firstGroupId = selectedCards[0].groupId;
    const allMatch = selectedCards.every((c) => c.groupId === firstGroupId);

    if (allMatch) {
      // Correct Group!
      playCorrectSound();
      const updatedCleared = new Set(clearedGroupIds);
      updatedCleared.add(firstGroupId);
      setClearedGroupIds(updatedCleared);
      setSelectedCardIds([]);
      setScore((s) => s + 25);

      speakText(`Matrix group locked: ${firstGroupId}!`, null, 1.0, null, 'new_word', weekNumber);

      if (updatedCleared.size >= groups.length) {
        setTimeout(() => finishGame(), 800);
      }
    } else {
      // Mismatch
      playWrongSound();
      setShakeIds(selectedCardIds);
      setTimeout(() => setShakeIds([]), 500);

      setAttemptsLeft((a) => {
        const next = a - 1;
        if (next <= 0) {
          finishGame();
        }
        return Math.max(0, next);
      });
      setSelectedCardIds([]);
    }
  };

  const finishGame = () => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : duration;
    setTotalElapsedTime(elapsed);

    let earnedStars = 0;
    if (clearedGroupIds.size >= 4 && attemptsLeft >= 3) earnedStars = 3;
    else if (clearedGroupIds.size >= 3) earnedStars = 2;
    else if (clearedGroupIds.size >= 2) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      recordPersonalBest('grand_matrix', elapsed);
    }

    if (onComplete) {
      onComplete(earnedStars, { groupsCleared: clearedGroupIds.size, attemptsLeft, score, time: elapsed });
    }
  };

  return (
    <div
      ref={containerRef}
      className="grand-matrix-game w-full h-full flex flex-col bg-purple-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-purple-900/90 border-b border-purple-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">👑</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-purple-400">
              Vocab Elite Door (Floor 5)
            </div>
            <div className="text-sm font-black text-white">GRAND MASTER MATRIX</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-amber-300">
            Groups: {clearedGroupIds.size}/4
          </div>
          <div className="text-xs font-bold text-purple-300">
            Stabilizers: {attemptsLeft}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-800 border border-white/10 text-xs font-bold text-purple-200">
            <Timer size={14} className="text-purple-400" />
            <span>{timeLeft}s</span>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="p-1.5 rounded-lg bg-purple-800 hover:bg-purple-700 text-purple-300 cursor-pointer"
          >
            <HelpCircle size={16} />
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 relative overflow-hidden p-4 flex flex-col justify-center items-center">
        {phase === 'intro' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-purple-900/90 border border-purple-500/30 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-purple-500/20">
              👑
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Grand Master Matrix</h2>
            <p className="text-xs sm:text-sm text-purple-200 leading-relaxed mb-6">
              Group all 4 dimensions of each vocabulary term together: [Word] + [Definition] + [Example] + [Part of Speech]. Select 4 matching cards and hit Lock Group!
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-black text-sm shadow-lg shadow-purple-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Enter Matrix ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="max-w-4xl mx-auto w-full flex flex-col gap-3">
            {/* Action Bar */}
            <div className="flex items-center justify-between bg-purple-900/50 p-2.5 rounded-xl border border-purple-500/30">
              <span className="text-xs font-bold text-purple-300">
                Selected: {selectedCardIds.length}/4 cards
              </span>
              <button
                disabled={selectedCardIds.length !== 4}
                onClick={handleLockGroup}
                className={`px-5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  selectedCardIds.length === 4
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 shadow-md hover:brightness-110 active:scale-95 cursor-pointer animate-pulse'
                    : 'bg-purple-950 text-purple-600 border border-purple-800/40 cursor-not-allowed'
                }`}
              >
                <Lock size={13} /> <span>Lock Group</span>
              </button>
            </div>

            {/* 4x4 Grid (16 cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {cards.map((card) => {
                const isCleared = clearedGroupIds.has(card.groupId);
                const isSelected = selectedCardIds.includes(card.id);
                const isShaking = shakeIds.includes(card.id);

                return (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`h-24 p-2.5 rounded-xl border-2 flex flex-col justify-between transition-all cursor-pointer text-left select-none ${
                      isCleared
                        ? 'bg-emerald-950/40 border-emerald-500/60 opacity-50 cursor-default'
                        : isSelected
                        ? 'bg-purple-600/40 border-amber-400 text-white ring-2 ring-amber-400 scale-[1.02] shadow-lg shadow-purple-900/50'
                        : 'bg-purple-900/70 border-purple-700/50 hover:border-purple-400/60 text-purple-100 hover:bg-purple-850'
                    } ${isShaking ? 'animate-bounce border-rose-500' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-purple-300 tracking-tight">
                        {card.type}
                      </span>
                      {isCleared && <CheckCircle2 size={14} className="text-emerald-400" />}
                    </div>
                    <div className="text-xs font-bold leading-snug line-clamp-3 text-white">
                      {card.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-purple-900/90 border border-white/10 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border-2 border-purple-400 flex items-center justify-center text-3xl mx-auto mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Matrix Stabilized!</h3>
            <div className="flex justify-center gap-2 text-3xl mb-4">
              {[1, 2, 3].map((starIdx) => {
                const earned =
                  (clearedGroupIds.size >= 4 && attemptsLeft >= 3 && starIdx <= 3) ||
                  (clearedGroupIds.size >= 3 && starIdx <= 2) ||
                  (clearedGroupIds.size >= 2 && starIdx <= 1);
                return (
                  <span key={starIdx} className={earned ? 'text-amber-400' : 'text-slate-600'}>
                    ★
                  </span>
                );
              })}
            </div>
            <div className="bg-purple-800/80 rounded-xl p-3.5 mb-6 text-xs text-purple-200 space-y-1.5 font-semibold">
              <div className="flex justify-between">
                <span>Groups Cleared:</span>
                <span className="font-bold text-white">{clearedGroupIds.size}/4</span>
              </div>
              <div className="flex justify-between">
                <span>Stabilizers Left:</span>
                <span className="font-bold text-amber-300">{attemptsLeft}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Score:</span>
                <span className="font-bold text-purple-300">{score} pts</span>
              </div>
            </div>
            <button
              onClick={handleStartGame}
              className="px-6 py-2.5 rounded-xl bg-purple-800 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              <RotateCcw size={14} /> <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      <GameInstructionModal
        gameId="grand_matrix"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
