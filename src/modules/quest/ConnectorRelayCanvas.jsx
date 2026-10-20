/**
 * ConnectorRelayCanvas.jsx — Floor 6, Door 2 (Grammar) Mini-Game: CONNECTOR BURST
 *
 * Architecture & Pedagogy (PA-A: Interactive Connector Card / Circuit Linking):
 * 1. Pacing & Stress-Free Thinking (No per-turn countdown):
 *    - Children can think, read, and reflect as long as needed.
 * 2. Macro Timer 120s (Option a):
 *    - Timer countdown from 120s. Expiration at 0s does NOT cause KO or defeat.
 *    - Timer only affects final time bonus: Math.max(0, timeLeft) * 2.
 * 3. Explicit 2 Hearts Invariant:
 *    - maxHearts={2}, hearts={hearts} passed explicitly to HUDOverlay.
 *    - 1 heart deducted per wrong answer. 0 hearts triggers KO.
 * 4. Fisher-Yates Slot Randomization:
 *    - 3 options shuffled via Fisher-Yates per round (p = 1/3 equal slot probability).
 * 5. StrictMode-Proof Session Exclusion Queue:
 *    - 12 curriculum questions per week pool.
 *    - Attempt 1 (first run) = questions 0..5 (6 rounds).
 *    - Attempt 2 (Retry 1)   = questions 6..11 (6 rounds) -> E[overlap] = 0.0!
 * 6. Natural Language Syntax & Determiners:
 *    - Uses approved 84-question master pool with 0 bare singular nouns.
 *    - Full TTS audio playback of completed sentence on correct link.
 */

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Sparkles,
  Zap,
  Heart,
  Trophy,
  RotateCcw,
  ArrowRight,
  Volume2,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Activity,
  Layers,
  Lock
} from 'lucide-react';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import GameInstructionModal from '../chronicles/games/GameInstructionModal';
import { speakText } from '../../utils/AudioHelper';
import useChroniclesStore, { calculateStars } from '../../stores/useChroniclesStore';
import { getActiveUserId } from '../../stores/useArcadeStore';
import { getConnectorQuestionsForWeek } from '../../services/chroniclesFloor67Service';
import './ConnectorRelayCanvas.css';

// Fisher-Yates array shuffle utility
function shuffleArray(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Module-level token set to prevent React StrictMode double-increment in dev
const activeMountTokens = new Set();

export default function ConnectorRelayCanvas({
  grammarSentences = [],
  duration = 120,
  weekNumber = 33,
  targetScore = 150,
  weekData = null,
  onComplete,
  onExit,
}) {
  const { recordPersonalBest, getPersonalBest } = useChroniclesStore();
  const personalBest = getPersonalBest('connector_relay') || 0;

  const activeUid = useMemo(() => {
    try {
      return getActiveUserId() || 'guest';
    } catch {
      return 'guest';
    }
  }, []);
  const capKey = `attempt_cap_${activeUid}_connector_w${weekNumber || 33}`;

  const initialStoredAttempts = useMemo(() => {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(capKey) : null;
      return raw !== null ? parseInt(raw, 10) : 0;
    } catch {
      return 0;
    }
  }, [capKey]);

  const isInitialLocked = initialStoredAttempts >= 2;

  // Retrieve 12 curriculum questions for the selected week
  const fullPool = useMemo(() => {
    const raw = getConnectorQuestionsForWeek(weekNumber, grammarSentences);
    if (raw && raw.length >= 12) return raw;
    return getConnectorQuestionsForWeek(33, grammarSentences);
  }, [weekNumber, grammarSentences]);

  // Session Exclusion Queue (StrictMode-proof):
  // Attempt 0 = slice(0, 6)
  // Attempt 1 (Retry 1) = slice(6, 12) -> E[overlap] = 0.0!
  const sessionQueueRef = useRef(null);
  if (!sessionQueueRef.current || sessionQueueRef.current.poolRef !== fullPool) {
    sessionQueueRef.current = {
      poolRef: fullPool,
      shuffled: shuffleArray(fullPool),
      attempt: 0,
    };
  }

  const getAttemptSlice = useCallback((attemptNum) => {
    const { shuffled } = sessionQueueRef.current;
    const startIndex = (attemptNum % 2) * 6;
    sessionQueueRef.current.attempt = attemptNum;
    return shuffled.slice(startIndex, startIndex + 6);
  }, []);

  // Game States
  const [attemptCount, setAttemptCount] = useState(() => isInitialLocked ? 2 : initialStoredAttempts);
  const [questions, setQuestions] = useState(() => getAttemptSlice(isInitialLocked ? 0 : initialStoredAttempts));
  const [roundIdx, setRoundIdx] = useState(0);
  const [hearts, setHearts] = useState(2); // Strict 2 hearts invariant
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [finalStats, setFinalStats] = useState(null);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [phase, setPhase] = useState(() => isInitialLocked ? 'locked' : 'playing'); // 'playing' | 'cleared' | 'ko' | 'locked'
  const [showHelp, setShowHelp] = useState(false);

  // Mount tracking: record attempt start in localStorage immediately
  const instanceTokenRef = useRef(null);
  if (!instanceTokenRef.current) {
    instanceTokenRef.current = Math.random().toString(36).slice(2);
  }

  useEffect(() => {
    if (activeMountTokens.has(instanceTokenRef.current)) return;
    activeMountTokens.add(instanceTokenRef.current);
    try {
      const raw = localStorage.getItem(capKey);
      const current = raw !== null ? parseInt(raw, 10) : 0;
      if (current < 2) {
        localStorage.setItem(capKey, String(current + 1));
      }
    } catch (e) {
      // Safe fallback
    }
  }, [capKey]);

  // Per-round UI interaction states
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null); // { isCorrect: boolean, chosen: string, message: string }
  const [circuitActive, setCircuitActive] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  const currentQ = questions[roundIdx] || questions[0];

  // Randomize the 3 options for the current question via Fisher-Yates (p = 1/3)
  useEffect(() => {
    if (!currentQ || !currentQ.options) return;
    const shuffled = shuffleArray(currentQ.options);
    setShuffledOptions(shuffled);
    setSelectedOpt(null);
    setFeedback(null);
    setCircuitActive(false);
  }, [currentQ, roundIdx]);

  // Macro Timer 120s (Option a: No KO on 0s, purely bonus scoring)
  useEffect(() => {
    if (phase !== 'playing') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [phase]);

  // Helper to split stem at the connector blank '_____'
  const parsedStem = useMemo(() => {
    if (!currentQ?.sentence) return { left: '', right: '' };
    const parts = currentQ.sentence.split('_____');
    return {
      left: parts[0] || '',
      right: parts[1] || '',
    };
  }, [currentQ]);

  // Handle option selection
  const handleSelectOption = useCallback((chosenOption) => {
    if (feedback !== null || phase !== 'playing' || !currentQ) return;

    setSelectedOpt(chosenOption);
    const isCorrect = chosenOption.toLowerCase() === currentQ.answer.toLowerCase();

    if (isCorrect) {
      // Correct Connector: Energize circuit and award +50 XP
      setCircuitActive(true);
      const newCorrect = correctCount + 1;
      setCorrectCount(newCorrect);
      setScore(newCorrect * 50);
      setFeedback({
        isCorrect: true,
        chosen: chosenOption,
        message: '⚡ Logical Link Connected! (+50 XP)'
      });

      // Play audio of full completed sentence
      const completedSentence = currentQ.fullSentence || currentQ.sentence.replace('_____', chosenOption);
      try {
        speakText(completedSentence);
      } catch (e) {
        // Audio fallback safe
      }

      // Advance after celebratory animation (1200ms)
      setTimeout(() => {
        if (roundIdx + 1 >= questions.length) {
          // Cleared all 6 rounds!
          const baseXP = newCorrect * 50;
          const remainingSecs = timeLeft;
          const timeBonus = Math.max(0, remainingSecs) * 2;
          const totalFinal = baseXP + timeBonus;
          setFinalStats({
            baseXP,
            bonusXP: timeBonus,
            totalScore: totalFinal,
            remainingSeconds: remainingSecs
          });
          setScore(totalFinal);
          recordPersonalBest('connector_relay', totalFinal);
          setPhase('cleared');
        } else {
          setRoundIdx(r => r + 1);
        }
      }, 1300);

    } else {
      // Incorrect Connector: Deduct 1 heart
      const newHearts = hearts - 1;
      setHearts(newHearts);
      setFeedback({
        isCorrect: false,
        chosen: chosenOption,
        message: '⚠️ Circuit Overloaded! (-1 Heart)'
      });

      if (newHearts <= 0) {
        // KO: Energy depleted
        setTimeout(() => {
          setPhase('ko');
        }, 1200);
      } else {
        // 1 Heart remaining: show brief feedback and advance to keep momentum
        setTimeout(() => {
          if (roundIdx + 1 >= questions.length) {
            const baseXP = correctCount * 50;
            const remainingSecs = timeLeft;
            const timeBonus = Math.max(0, remainingSecs) * 2;
            const totalFinal = baseXP + timeBonus;
            setFinalStats({
              baseXP,
              bonusXP: timeBonus,
              totalScore: totalFinal,
              remainingSeconds: remainingSecs
            });
            setScore(totalFinal);
            recordPersonalBest('connector_relay', totalFinal);
            setPhase('cleared');
          } else {
            setRoundIdx(r => r + 1);
          }
        }, 1400);
      }
    }
  }, [feedback, phase, currentQ, roundIdx, questions.length, timeLeft, correctCount, hearts, recordPersonalBest]);

  // Keyboard shortcut listener (1, 2, 3 or A, B, C)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phase !== 'playing' || feedback !== null) return;
      if (e.key === '1' && shuffledOptions[0]) handleSelectOption(shuffledOptions[0]);
      if (e.key === '2' && shuffledOptions[1]) handleSelectOption(shuffledOptions[1]);
      if (e.key === '3' && shuffledOptions[2]) handleSelectOption(shuffledOptions[2]);
      if ((e.key === 'a' || e.key === 'A') && shuffledOptions[0]) handleSelectOption(shuffledOptions[0]);
      if ((e.key === 'b' || e.key === 'B') && shuffledOptions[1]) handleSelectOption(shuffledOptions[1]);
      if ((e.key === 'c' || e.key === 'C') && shuffledOptions[2]) handleSelectOption(shuffledOptions[2]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, feedback, shuffledOptions, handleSelectOption]);

  // Audio prompt speaker
  const handleSpeakStem = useCallback(() => {
    if (!currentQ) return;
    try {
      const speech = currentQ.sentence.replace('_____', '... blank ...');
      speakText(speech);
    } catch (e) {
      // Audio fallback safe
    }
  }, [currentQ]);

  // Retry logic (StrictMode-proof queue: Attempt 1 uses questions 6..11, capped at 2 attempts per session)
  const handleRetry = useCallback(() => {
    if (attemptCount >= 1) return; // Chặn lượt 3 (chỉ cho phép Attempt 0 và Retry 1)
    const nextAttempt = attemptCount + 1;
    try {
      localStorage.setItem(capKey, String(nextAttempt + 1));
    } catch (e) {
      // Safe fallback
    }
    setAttemptCount(nextAttempt);
    setQuestions(getAttemptSlice(nextAttempt));
    setRoundIdx(0);
    setHearts(2);
    setScore(0);
    setCorrectCount(0);
    setFinalStats(null);
    setTimeLeft(duration);
    setFeedback(null);
    setSelectedOpt(null);
    setCircuitActive(false);
    setPhase('playing');
  }, [attemptCount, capKey, getAttemptSlice, duration]);

  // Track best win stats and guarantee onComplete is called exactly once
  const bestWinStatsRef = useRef(null);
  const hasCalledOnCompleteRef = useRef(false);

  useEffect(() => {
    if (phase === 'cleared') {
      const currentStars = calculateStars(correctCount, 6);
      const prev = bestWinStatsRef.current;
      if (!prev) {
        bestWinStatsRef.current = { stars: currentStars, score };
      } else if (currentStars > prev.stars || (currentStars === prev.stars && score > prev.score)) {
        bestWinStatsRef.current = { stars: currentStars, score };
      }
    }
  }, [phase, correctCount, score]);

  // Victory Continue action
  const handleContinue = useCallback(() => {
    const currentStars = calculateStars(correctCount, 6);
    const best = bestWinStatsRef.current || { stars: currentStars, score };
    if (onComplete && !hasCalledOnCompleteRef.current) {
      hasCalledOnCompleteRef.current = true;
      onComplete(best.stars, best.score, 1);
    } else if (onExit) {
      onExit();
    }
  }, [correctCount, score, onComplete, onExit]);

  // Exit action preserving best win credit if player replayed after winning Attempt 0
  const handleExitWithWinCredit = useCallback(() => {
    if (bestWinStatsRef.current && onComplete && !hasCalledOnCompleteRef.current) {
      hasCalledOnCompleteRef.current = true;
      onComplete(bestWinStatsRef.current.stars, bestWinStatsRef.current.score, 1);
    } else if (onExit) {
      onExit();
    }
  }, [onComplete, onExit]);

  // Computed stars for victory screen (Accuracy-based: 6/6 -> 3 stars, 5/6 -> 2 stars)
  const starsEarned = useMemo(() => calculateStars(correctCount, 6), [correctCount]);
  const timeBonusEarned = useMemo(() => Math.max(0, timeLeft) * 2, [timeLeft]);

  return (
    <div className="connector-burst-root" data-testid="connector-burst-container">
      {/* ── Fixed Unified HUD Overlay (Invariant Props) ── */}
      <HUDOverlay
        floorDoorLabel="Floor 6 Door 2 — Connector Burst"
        hearts={hearts}
        maxHearts={2}
        round={`${roundIdx + 1} / 6`}
        score={score}
        timeLeft={timeLeft}
        rightActions={
          <button
            className="connector-help-hud-btn"
            onClick={() => setShowHelp(true)}
            title="Grammar Connectors Guide"
            data-testid="connector-help-btn"
          >
            <HelpCircle size={18} />
            <span>Guide</span>
          </button>
        }
      />

      <FloatingExitBtn onExit={onExit} />

      {/* ── Background Arcane Circuit Skyway Atmosphere ── */}
      <div className="connector-bg-ambient">
        <div className="connector-skyway-glow" />
        <div className={`connector-circuit-grid ${circuitActive ? 'active-pulse' : ''}`} />
      </div>

      {/* ── Main Gameplay Card Arena ── */}
      <main className="connector-card-arena">
        {/* Upper Badge: Logical Relation Indicator */}
        <div className="connector-theme-pill">
          <Activity size={14} className="theme-pill-icon" />
          <span>CEFR PRE-A1 → A2 • LOGICAL CONNECTIVE RELAY</span>
          <span className="theme-pill-round">CIRCUIT {roundIdx + 1}/6</span>
        </div>

        {/* Central Bridge Sentence Card */}
        <section
          className={`connector-sentence-card ${feedback ? (feedback.isCorrect ? 'card-success' : 'card-shake-error') : ''}`}
          data-testid="connector-sentence-card"
        >
          {/* Card Speaker Button */}
          <button
            className="connector-card-audio-btn"
            onClick={handleSpeakStem}
            title="Listen to sentence"
            aria-label="Listen to sentence"
            data-testid="connector-card-audio-btn"
          >
            <Volume2 size={20} />
          </button>

          {/* Interactive Bridge Sentence with Blank Link Slot */}
          <div className="connector-clause-wrapper">
            <span className="connector-clause connector-clause-left">
              {parsedStem.left}
            </span>

            {/* Glowing Circuit Connector Slot */}
            <div
              className={`connector-link-slot ${circuitActive ? 'slot-energized' : ''} ${feedback && !feedback.isCorrect ? 'slot-error' : ''}`}
              data-testid="connector-link-slot"
            >
              {circuitActive && selectedOpt ? (
                <span className="slot-connector-text pulse-in">{selectedOpt}</span>
              ) : (
                <span className="slot-placeholder">_____</span>
              )}
              <div className="slot-beam-fx" />
            </div>

            <span className="connector-clause connector-clause-right">
              {parsedStem.right}
            </span>
          </div>

          {/* Subtle Instruction Prompt */}
          <p className="connector-sub-prompt">
            Select the conjunction that logically connects the two clauses:
          </p>
        </section>

        {/* Feedback Banner */}
        <div className="connector-feedback-bar">
          {feedback && (
            <div className={`feedback-toast ${feedback.isCorrect ? 'toast-success' : 'toast-error'}`} data-testid="connector-feedback-toast">
              {feedback.isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              <span>{feedback.message}</span>
            </div>
          )}
        </div>

        {/* ── 3 Interactive Choice Buttons (Fisher-Yates Shuffled) ── */}
        <section className="connector-options-grid" data-testid="connector-options-grid">
          {shuffledOptions.map((opt, idx) => {
            const isSelected = selectedOpt === opt;
            const isCorrectAnswer = currentQ.answer.toLowerCase() === opt.toLowerCase();
            let optStatusClass = '';

            if (feedback) {
              if (isSelected && feedback.isCorrect) optStatusClass = 'btn-correct';
              else if (isSelected && !feedback.isCorrect) optStatusClass = 'btn-wrong';
              else if (isCorrectAnswer && !feedback.isCorrect) optStatusClass = 'btn-highlight-correct';
            }

            return (
              <button
                key={`${opt}-${idx}`}
                className={`connector-option-btn ${optStatusClass}`}
                onClick={() => handleSelectOption(opt)}
                disabled={feedback !== null}
                data-testid={`connector-option-${idx}`}
                data-answer={opt}
              >
                <span className="option-key-badge">{idx + 1}</span>
                <span className="option-word-text">{opt}</span>
                <Zap size={16} className="option-zap-icon" />
              </button>
            );
          })}
        </section>

        {/* Bottom Pacing Hint */}
        <div className="connector-bottom-hint">
          <span>💡 Tip: Press Keys 1, 2, 3 or Click. Untimed turns — take your time to read!</span>
        </div>
      </main>

      {/* ── Victory Modal (Cleared 6/6) ── */}
      {phase === 'cleared' && (
        <div className="connector-modal-overlay" data-testid="connector-cleared-modal">
          <div className="connector-modal-box victory-box">
            <div className="modal-glow-ring" />
            <div className="modal-header-icon">
              <Trophy size={48} className="trophy-gold" />
            </div>

            <h2 className="modal-title">CIRCUIT LINK RESTORED!</h2>
            <p className="modal-subtitle">
              All 6 Arcane Skyway bridges energized with perfect grammatical connectors.
            </p>

            {/* Stars Display */}
            <div className="victory-stars-row">
              {[1, 2, 3].map((s) => (
                <Sparkles
                  key={s}
                  size={32}
                  className={`star-icon ${s <= starsEarned ? 'star-lit' : 'star-dim'}`}
                />
              ))}
            </div>

            {/* Score Breakdown */}
            <div className="victory-stats-card">
              <div className="stat-line">
                <span>Rounds Completed:</span>
                <strong>6 / 6</strong>
              </div>
              <div className="stat-line">
                <span>Base Grammar XP:</span>
                <strong data-testid="stat-base-xp">+{finalStats?.baseXP || 0} XP</strong>
              </div>
              <div className="stat-line bonus-line">
                <span>Macro Time Bonus ({finalStats?.remainingSeconds || 0}s):</span>
                <strong data-testid="stat-bonus-xp">+{finalStats?.bonusXP || 0} XP</strong>
              </div>
              <div className="stat-line total-line">
                <span>Total Score:</span>
                <strong className="total-gold" data-testid="stat-total-score">{finalStats?.totalScore || 0} XP</strong>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="modal-actions-row">
              {attemptCount < 1 && (
                <button className="modal-btn btn-secondary" onClick={handleRetry} data-testid="connector-replay-btn">
                  <RotateCcw size={18} />
                  <span>Chơi lại</span>
                </button>
              )}
              <button className="modal-btn btn-primary" onClick={handleContinue} data-testid="connector-continue-btn">
                <span>Next Door</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── KO / Defeat Modal (0 Hearts) ── */}
      {phase === 'ko' && (
        <div className="connector-modal-overlay" data-testid="connector-ko-modal">
          <div className="connector-modal-box ko-box">
            <div className="modal-header-icon">
              <Heart size={48} className="heart-broken" />
            </div>

            <h2 className="modal-title ko-title">ENERGY DEPLETED</h2>
            <p className="modal-subtitle">
              {attemptCount >= 1
                ? 'Hết lượt bài này. Về bài học để ôn lại!'
                : 'The Arcane Skyway circuit lost power. Review the connector types and try again!'}
            </p>

            <div className="victory-stats-card">
              <div className="stat-line">
                <span>Bridges Connected:</span>
                <strong>{correctCount} / 6</strong>
              </div>
              <div className="stat-line">
                <span>Score Accumulated:</span>
                <strong>{score} XP</strong>
              </div>
            </div>

            <div className="modal-actions-row">
              <button className="modal-btn btn-secondary" onClick={handleExitWithWinCredit} data-testid="connector-ko-exit-btn">
                <span>Về bài học</span>
              </button>
              {attemptCount < 1 && (
                <button className="modal-btn btn-primary" onClick={handleRetry} data-testid="connector-ko-retry-btn">
                  <RotateCcw size={18} />
                  <span>Try Again</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Cap Exhausted / Locked Modal ── */}
      {phase === 'locked' && (
        <div className="connector-modal-overlay" data-testid="connector-locked-modal">
          <div className="connector-modal-box ko-box">
            <div className="modal-header-icon">
              <Lock size={48} className="heart-broken" />
            </div>

            <h2 className="modal-title ko-title">ENERGY DEPLETED</h2>
            <p className="modal-subtitle" data-testid="connector-locked-subtitle">
              Hết lượt bài này. Về bài học để ôn lại!
            </p>

            <div className="modal-actions-row">
              <button className="modal-btn btn-secondary" onClick={handleExitWithWinCredit} data-testid="connector-locked-exit-btn">
                <span>Về bài học</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Instructional Guide Modal ── */}
      <GameInstructionModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        title="Arcane Connector Guide"
        instructions={[
          { title: 'Reason & Cause', description: 'because (explains why), so (shows the result)' },
          { title: 'Contrast & Difference', description: 'although (unexpected contrast), but (opposite idea)' },
          { title: 'Time & Sequence', description: 'while / when (time of action), before / after / until (order of events)' },
          { title: 'Condition & Warning', description: 'unless (except if), or (warning alternative), and (joins ideas)' },
        ]}
      />
    </div>
  );
}
