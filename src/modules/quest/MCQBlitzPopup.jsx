/**
 * MCQBlitzPopup.jsx — 5-second challenge popup triggered when Leo collects a Word Crystal
 * GDD §1.3 — "MCQ Blitz: 1 câu hỏi, 3 lựa chọn, 5s timer"
 * Outcomes: Correct → enemy FREEZE ❄️ 3s | Wrong → enemy SPEED UP 💨 5s
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './MCQBlitzPopup.css';

const TOTAL_TIME_MS = 5000;

/**
 * Generate MCQ choices for a vocabulary word
 * Picks 1 correct + 2 wrong from vocabPool
 *
 * @param {{ word: string, definition: string }} targetWord
 * @param {Array<{ word: string, definition: string }>} vocabPool  — all available words
 * @returns {Array<{ label: string, isCorrect: boolean }>}
 */
export function generateMCQChoices(targetWord, vocabPool) {
  const correct = { label: targetWord.definition, isCorrect: true };

  // Pick 2 wrong distractors from pool (different word)
  const distractors = vocabPool
    .filter(v => v.word !== targetWord.word && v.definition)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)
    .map(v => ({ label: v.definition, isCorrect: false }));

  // Fill with fallback distractors if pool too small
  while (distractors.length < 2) {
    distractors.push({ label: '(none of the above)', isCorrect: false });
  }

  // Shuffle correct answer into random position
  const choices = [correct, ...distractors].sort(() => Math.random() - 0.5);
  return choices;
}

/**
 * MCQBlitzPopup — 5-second vocabulary challenge that appears mid-game
 *
 * @param {{
 *   word: string,
 *   question: string,        — e.g. "What does 'friction' mean?"
 *   choices: Array<{ label: string, isCorrect: boolean }>,
 *   onCorrect: () => void,   — triggers enemy freeze
 *   onWrong: () => void,     — triggers enemy speedup
 *   onClose: () => void,
 *   isRetry?: boolean,       — true if this is 2nd attempt (no freeze bonus)
 * }} props
 */
export default function MCQBlitzPopup({
  word,
  question,
  choices = [],
  onCorrect,
  onWrong,
  onClose,
  isRetry = false,
}) {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_MS);
  const [answered, setAnswered] = useState(null);    // null | 'correct' | 'wrong'
  const [chosenIdx, setChosenIdx] = useState(null);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  // Slide in after mount
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (answered) return; // stop timer once answered

    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, TOTAL_TIME_MS - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timerRef.current);
        handleTimeout();
      }
    }, 50);

    return () => clearInterval(timerRef.current);
  }, [answered]);

  const handleTimeout = useCallback(() => {
    setAnswered('wrong');
    setTimeout(() => {
      onWrong?.();
      onClose?.();
    }, 900);
  }, [onWrong, onClose]);

  const handleChoice = useCallback((choice, idx) => {
    if (answered) return;
    clearInterval(timerRef.current);
    setChosenIdx(idx);

    if (choice.isCorrect) {
      setAnswered('correct');
      setTimeout(() => {
        onCorrect?.();
        onClose?.();
      }, 900);
    } else {
      setAnswered('wrong');
      setTimeout(() => {
        onWrong?.();
        onClose?.();
      }, 900);
    }
  }, [answered, onCorrect, onWrong, onClose]);

  const progressPercent = (timeLeft / TOTAL_TIME_MS) * 100;
  const isUrgent = timeLeft < 2000;

  const resultClass = answered === 'correct' ? 'mcq-result-correct'
                    : answered === 'wrong'   ? 'mcq-result-wrong'
                    : '';

  return (
    <div className="mcq-backdrop" aria-modal="true" role="dialog" aria-labelledby="mcq-question">
      <div className={`mcq-popup ${visible ? 'mcq-popup-visible' : ''} ${resultClass}`}>

        {/* ── Header: Word Badge + Timer ─────────────────────────────── */}
        <div className="mcq-header">
          <div className="mcq-word-badge">
            <span className="mcq-word-icon">💎</span>
            <span className="mcq-word-text">{word}</span>
            {isRetry && <span className="mcq-retry-badge">2nd Try</span>}
          </div>

          <div className={`mcq-timer ${isUrgent ? 'mcq-timer-urgent' : ''}`}>
            <span className="mcq-timer-value">{Math.ceil(timeLeft / 1000)}</span>
            <span className="mcq-timer-unit">s</span>
          </div>
        </div>

        {/* ── Timer Progress Bar ─────────────────────────────────────── */}
        <div className="mcq-progress-track" aria-hidden="true">
          <div
            className={`mcq-progress-bar ${isUrgent ? 'mcq-progress-urgent' : ''}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* ── Question ───────────────────────────────────────────────── */}
        <p id="mcq-question" className="mcq-question">{question}</p>

        {/* ── Choices ────────────────────────────────────────────────── */}
        <div className="mcq-choices" role="group" aria-label="Answer choices">
          {choices.map((choice, idx) => {
            const letter = ['A', 'B', 'C'][idx];
            const isChosen = chosenIdx === idx;
            const showResult = answered !== null;

            const choiceClass = [
              'mcq-choice',
              isChosen && answered === 'correct' ? 'mcq-choice-correct' : '',
              isChosen && answered === 'wrong'   ? 'mcq-choice-wrong'   : '',
              showResult && choice.isCorrect && !isChosen ? 'mcq-choice-reveal-correct' : '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={idx}
                className={choiceClass}
                onClick={() => handleChoice(choice, idx)}
                disabled={answered !== null}
                aria-label={`Choice ${letter}: ${choice.label}`}
              >
                <span className="mcq-choice-letter">{letter}</span>
                <span className="mcq-choice-label">{choice.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── Result Banner ──────────────────────────────────────────── */}
        {answered === 'correct' && (
          <div className="mcq-result-banner mcq-result-banner-correct" aria-live="polite">
            <span>✅ Correct! </span>
            {!isRetry && <span className="mcq-bonus">Enemy FREEZE ❄️ +3s</span>}
            <span className="mcq-xp">+{isRetry ? 5 : 10} XP</span>
          </div>
        )}
        {answered === 'wrong' && (
          <div className="mcq-result-banner mcq-result-banner-wrong" aria-live="polite">
            <span>❌ Enemies speed up! 💨</span>
          </div>
        )}
      </div>
    </div>
  );
}
