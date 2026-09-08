/**
 * MCQBlitzPopup.jsx — 5-second challenge popup triggered when Leo collects a Word Crystal
 * GDD §1.3 — "MCQ Blitz: 1 câu hỏi, 3 lựa chọn, 5s timer"
 * Outcomes: Correct → enemy FREEZE ❄️ 3s | Wrong → enemy SPEED UP 💨 5s
 */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import './MCQBlitzPopup.css';

const TOTAL_TIME_MS = 5000;

export const CURRICULUM_DEFINITIONS = {
  'friction': 'The force that slows things down when surfaces slide together',
  'invisible science force': 'An unseen scientific force like friction that affects motion',
  'shoe soles': 'The bottom part of shoes that touches the ground',
  'smooth tiles': 'Flat, slippery ceramic pieces covering a floor',
  'slippery layer': 'A thin layer of water that makes surfaces slick',
  'reduces friction': 'Decreases the grip between two sliding surfaces',
  'stays balanced': 'Remains steady on feet without falling over',
  'school corridor': 'A long hallway inside a school building',
  'corridor': 'A long passage inside a building with doors on each side',
  'wet tiles': 'Floor tiles covered with spilled water or liquid',
  'plastic soles': 'Shoe bottoms made of hard plastic that slide easily',
  'rubber soles': 'Shoe bottoms made of rubber that give strong grip',
  'strong grip': 'A firm hold that stops slipping or falling',
  'yellow warning sign': 'A bright sign warning people of a wet, slippery floor',
  'bandage': 'A strip of clean cloth used to cover and protect a wound',
  'slipped': 'Slid accidentally on a wet surface and lost balance',
  'nurse': 'A trained medical person who cares for sick or injured people',
  'safe': 'Protected from danger, injury, or accidents',
  'mistake': 'An incorrect action or careless decision',
  'traction': 'The grip between shoes or tires and the floor',
  'laboratory': 'A room equipped for scientific experiments',
  'prevent': 'To stop something dangerous or painful from happening',
  'polished': 'Made smooth and shiny by rubbing or cleaning',
  'ice rink': 'A smooth frozen sheet of ice for skating',
  'careful': 'Taking great care to avoid danger or mistakes',
  'gravity': 'The force that pulls objects toward the earth',
  'hazard': 'A dangerous condition that can cause harm',
};

const PEDAGOGICAL_DISTRACTORS = [
  'A tool used by scientists to measure temperature',
  'A strong magnetic field that attracts metallic objects',
  'The speed at which objects fall through the air',
  'A protective helmet worn during laboratory experiments',
  'A chemical reaction producing bubbles of gas',
  'A musical sound wave traveling through water',
  'A measurement of how heavy an object feels',
  'A special microscope used to view tiny bacteria',
  'A bright light used to signal emergency vehicles',
];

/**
 * Generate MCQ choices for a vocabulary word
 * Picks 1 correct + 2 wrong from vocabPool or curated pedagogical distractors
 *
 * @param {{ word: string, definition: string, def?: string, meaning?: string }} targetWord
 * @param {Array<{ word: string, definition: string }>} vocabPool  — all available words
 * @returns {Array<{ label: string, isCorrect: boolean }>}
 */
export function generateMCQChoices(targetWord, vocabPool = []) {
  const wordKey = (targetWord?.word || '').trim().toLowerCase();
  let correctDef = targetWord?.definition || targetWord?.def || targetWord?.meaning;
  // If definition is missing or in Vietnamese, resolve to Cambridge English definition
  if (!correctDef || typeof correctDef !== 'string' || correctDef.trim() === '' || /[\u00C0-\u1EF9]/.test(correctDef)) {
    correctDef = CURRICULUM_DEFINITIONS[wordKey] ||
      `The natural force or property related to "${targetWord?.word || 'this word'}"`;
  }

  const correct = { label: correctDef, isCorrect: true };

  // Collect pool definitions
  const poolDefs = (vocabPool || [])
    .filter(v => (v?.word || '').trim().toLowerCase() !== wordKey)
    .map(v => {
      const w = (v?.word || '').trim().toLowerCase();
      let d = v?.definition || v?.def || CURRICULUM_DEFINITIONS[w];
      if (typeof d === 'string' && /[\u00C0-\u1EF9]/.test(d)) {
        d = CURRICULUM_DEFINITIONS[w] || null;
      }
      return d;
    })
    .filter(d => Boolean(d) && d !== correctDef);

  const uniquePoolDefs = Array.from(new Set(poolDefs)).sort(() => Math.random() - 0.5);

  const distractors = [];
  for (const def of uniquePoolDefs) {
    if (distractors.length >= 2) break;
    distractors.push({ label: def, isCorrect: false });
  }

  // Fill with pedagogical distractors if pool too small — NEVER use '(none of the above)'
  const shuffledFallback = [...PEDAGOGICAL_DISTRACTORS].sort(() => Math.random() - 0.5);
  for (const fb of shuffledFallback) {
    if (distractors.length >= 2) break;
    if (fb !== correctDef && !distractors.some(d => d.label === fb)) {
      distractors.push({ label: fb, isCorrect: false });
    }
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
