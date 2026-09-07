/**
 * CambridgeClozeGame.jsx — Door 3 (Floor 5) Mini-Game: Cambridge Cloze Gauntlet
 *
 * 100% ENGLISH IMMERSION.
 * Features:
 * - Cambridge Open Cloze text gauntlet with real interactive keyboard <input> fields
 * - Depleting Boss Guardian HP bar as correct answers are submitted
 * - "💡 Hint" system revealing initial character cues with score tradeoff
 * - Case-insensitive & Levenshtein edit-distance tolerance for typing accuracy
 * - Audio via VoiceService Google Cloud TTS (speakText) & Web Audio SFX
 * - Personal Best (PB) & Speedrunner Hall of Fame integration
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HelpCircle, Trophy, Timer, CheckCircle2, RotateCcw, Lightbulb, ShieldAlert, Swords } from 'lucide-react';
import { speakText } from '../../../utils/AudioHelper';
import { playCorrectSound, playWrongSound, playLaserSound, playVictoryFanfare } from '../../../utils/soundEffects';
import useChroniclesStore from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';

const CLOZE_PASSAGE = {
  title: 'The Mystery in Corridor 4B',
  segments: [
    { text: 'During science class on Monday, Jake was walking down the school ' },
    { blankId: 1, answer: 'corridor', hint: 'c' },
    { text: '. Suddenly, he noticed that water had spilled across the tiles, making the floor extremely ' },
    { blankId: 2, answer: 'slippery', hint: 's' },
    { text: '. Because the smooth surface had very little ' },
    { blankId: 3, answer: 'friction', hint: 'f' },
    { text: ', Jake lost his balance and fell. Fortunately, his rubber soles provided some ' },
    { blankId: 4, answer: 'traction', hint: 't' },
    { text: ' to prevent a severe injury. Nurse Sarah quickly arrived and wrapped a clean ' },
    { blankId: 5, answer: 'bandage', hint: 'b' },
    { text: ' around his ankle so he could recover safely.' },
  ],
};

function levenshteinDistance(s1, s2) {
  const a = s1.toLowerCase().trim();
  const b = s2.toLowerCase().trim();
  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

export default function CambridgeClozeGame({
  vocabItems = [],
  grammarSentences = [],
  duration = 120,
  weekNumber = 33,
  gameParams = {},
  onComplete,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('cambridge_cloze');

  const passage = useMemo(() => {
    return CLOZE_PASSAGE;
  }, []);

  const [phase, setPhase] = useState('intro'); // 'intro' | 'playing' | 'result'
  const [userInputs, setUserInputs] = useState({ 1: '', 2: '', 3: '', 4: '', 5: '' });
  const [hintsRevealed, setHintsRevealed] = useState({ 1: false, 2: false, 3: false, 4: false, 5: false });
  const [activeBlankId, setActiveBlankId] = useState(1);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [results, setResults] = useState({});
  const [score, setScore] = useState(100);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showHelp, setShowHelp] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);

  const containerRef = useRef(null);
  const timerRef = useRef(null);

  // Start game
  const handleStartGame = () => {
    setPhase('playing');
    setUserInputs({ 1: '', 2: '', 3: '', 4: '', 5: '' });
    setHintsRevealed({ 1: false, 2: false, 3: false, 4: false, 5: false });
    setIsEvaluated(false);
    setResults({});
    setScore(100);
    setCorrectCount(0);
    setTimeLeft(duration);
    setSessionStartTime(Date.now());
    speakText('Type the missing Cambridge words directly into each blank to deplete the Boss HP!', null, 1.0, null, 'new_word', weekNumber);
  };

  // Timer loop
  useEffect(() => {
    if (phase !== 'playing') return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmitGauntlet();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [phase, userInputs]);

  // Handle typing in a blank
  const handleInputChange = (blankId, val) => {
    if (isEvaluated) return;
    setUserInputs((prev) => ({ ...prev, [blankId]: val }));
  };

  // Hint button for active blank
  const handleUseHint = () => {
    if (isEvaluated || !activeBlankId) return;

    const targetSegment = passage.segments.find((s) => s.blankId === activeBlankId);
    if (!targetSegment) return;

    if (!hintsRevealed[activeBlankId]) {
      playLaserSound();
      setHintsRevealed((prev) => ({ ...prev, [activeBlankId]: true }));
      setScore((s) => Math.max(10, s - 10)); // Hint cost: -10 score points
      setUserInputs((prev) => ({
        ...prev,
        [activeBlankId]: targetSegment.hint,
      }));
    }
  };

  // Submit and evaluate gauntlet
  const handleSubmitGauntlet = () => {
    if (isEvaluated) return;

    let correct = 0;
    const evaluatedResults = {};

    passage.segments.forEach((seg) => {
      if (seg.blankId) {
        const input = (userInputs[seg.blankId] || '').trim().toLowerCase();
        const target = seg.answer.toLowerCase();

        if (input === target) {
          evaluatedResults[seg.blankId] = { isCorrect: true, answer: seg.answer };
          correct++;
        } else if (levenshteinDistance(input, target) === 1) {
          evaluatedResults[seg.blankId] = { isCorrect: true, answer: seg.answer, partial: true };
          correct++;
        } else {
          evaluatedResults[seg.blankId] = { isCorrect: false, answer: seg.answer };
        }
      }
    });

    setIsEvaluated(true);
    setResults(evaluatedResults);
    setCorrectCount(correct);

    if (correct >= 4) {
      playCorrectSound();
      speakText('Gauntlet Cleared! Boss defeated!', null, 1.0, null, 'new_word', weekNumber);
    } else {
      playWrongSound();
      speakText('The gauntlet resisted! Review your answers!', null, 1.0, null, 'new_word', weekNumber);
    }

    setTimeout(() => {
      finishGame(correct);
    }, 2200);
  };

  const finishGame = (finalCorrect) => {
    setPhase('result');
    const elapsed = sessionStartTime ? parseFloat(((Date.now() - sessionStartTime) / 1000).toFixed(1)) : duration;
    setTotalElapsedTime(elapsed);

    let earnedStars = 0;
    if (finalCorrect >= 5) earnedStars = 3;
    else if (finalCorrect >= 4) earnedStars = 2;
    else if (finalCorrect >= 3) earnedStars = 1;

    if (earnedStars >= 1) {
      playVictoryFanfare();
      recordPersonalBest('cambridge_cloze', elapsed);
    }

    if (onComplete) {
      onComplete(earnedStars, { blanksCorrect: finalCorrect, score, time: elapsed });
    }
  };

  const bossHpPercent = Math.max(0, 100 - correctCount * 20);

  return (
    <div
      ref={containerRef}
      className="cambridge-cloze-game w-full h-full flex flex-col bg-slate-950 text-white select-none relative overflow-hidden font-sans"
    >
      {/* Top HUD */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-yellow-500/20 shrink-0 z-20 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xl">🏆</span>
          <div>
            <div className="text-[10px] uppercase font-black tracking-widest text-yellow-400">
              Integration Elite Door (Floor 5)
            </div>
            <div className="text-sm font-black text-white">CAMBRIDGE CLOZE GAUNTLET</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 border border-white/10 text-xs font-bold text-slate-200">
            <Timer size={14} className="text-yellow-400" />
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

      {/* Boss HP Bar */}
      {phase === 'playing' && (
        <div className="px-4 py-2 bg-gradient-to-r from-red-950/80 via-slate-900 to-red-950/80 border-b border-red-500/30 flex flex-col items-center z-10">
          <div className="flex items-center justify-between w-full max-w-xl text-xs font-black uppercase tracking-wider mb-1">
            <span className="text-red-400 flex items-center gap-1">
              <Swords size={14} /> Cloze Guardian HP
            </span>
            <span className="text-slate-300">{bossHpPercent}%</span>
          </div>
          <div className="w-full max-w-xl h-2.5 bg-slate-800 rounded-full overflow-hidden border border-red-500/30">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-rose-400 transition-all duration-500"
              style={{ width: `${bossHpPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Main Play Area */}
      <div className="flex-1 relative overflow-hidden p-4 flex flex-col justify-center items-center">
        {phase === 'intro' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-slate-900/90 border border-yellow-500/30 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-500 to-amber-600 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg shadow-yellow-500/20">
              📜
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Cambridge Cloze Gauntlet</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Read the story and type the exact missing Cambridge words into the 5 blanks! Correct answers will deal damage to deplete the Guardian Boss HP.
            </p>
            <button
              onClick={handleStartGame}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-yellow-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              Enter Gauntlet ▶
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
            {/* Story Passage Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-yellow-500/40 shadow-xl relative leading-loose text-sm sm:text-base font-medium text-slate-200">
              <div className="text-[11px] font-black uppercase text-yellow-400 tracking-wider mb-3">
                {passage.title}
              </div>

              <div>
                {passage.segments.map((seg, idx) => {
                  if (!seg.blankId) {
                    return <span key={idx}>{seg.text}</span>;
                  }

                  const blankId = seg.blankId;
                  const res = results[blankId];
                  const isActive = activeBlankId === blankId;

                  return (
                    <span key={idx} className="inline-block mx-1.5 align-middle">
                      <input
                        type="text"
                        disabled={isEvaluated}
                        value={userInputs[blankId]}
                        onFocus={() => setActiveBlankId(blankId)}
                        onChange={(e) => handleInputChange(blankId, e.target.value)}
                        placeholder={`[ ${blankId} ]`}
                        className={`w-28 sm:w-32 px-2.5 py-1 rounded-lg text-center font-black text-xs sm:text-sm transition-all outline-none border-2 ${
                          isEvaluated
                            ? res?.isCorrect
                              ? 'bg-emerald-950 border-emerald-400 text-emerald-200'
                              : 'bg-rose-950 border-rose-500 text-rose-200'
                            : isActive
                            ? 'bg-slate-800 border-yellow-400 text-white ring-2 ring-yellow-400/50 shadow-md'
                            : 'bg-slate-900 border-slate-700 text-slate-200 hover:border-yellow-500/40'
                        }`}
                      />
                      {isEvaluated && !res?.isCorrect && (
                        <span className="block text-[10px] text-rose-400 font-bold text-center">
                          ({res.answer})
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleUseHint}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 border border-yellow-500/40 text-yellow-300 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Lightbulb size={14} /> <span>Hint Active Blank (-10 pts)</span>
              </button>

              <button
                onClick={handleSubmitGauntlet}
                disabled={isEvaluated}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-yellow-500/30 hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Swords size={16} /> <span>Submit Gauntlet</span>
              </button>
            </div>
          </div>
        )}

        {phase === 'result' && (
          <div className="max-w-md mx-auto my-auto text-center p-6 bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-400 flex items-center justify-center text-3xl mx-auto mb-3">
              🏆
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Gauntlet Mastered!</h3>
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
            <div className="bg-slate-800/80 rounded-xl p-3.5 mb-6 text-xs text-slate-300 space-y-1.5 font-semibold">
              <div className="flex justify-between">
                <span>Blanks Correct:</span>
                <span className="font-bold text-white">{correctCount}/5</span>
              </div>
              <div className="flex justify-between">
                <span>Score:</span>
                <span className="font-bold text-yellow-300">{score} pts</span>
              </div>
              <div className="flex justify-between">
                <span>Completion Time:</span>
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
        gameId="cambridge_cloze"
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </div>
  );
}
