/**
 * LexicalDetectiveGame.jsx — Door 3 "Integration" Mini-Game
 *
 * "Odd One Out" style game. Player sees 4 word cards and must find
 * the ONE that doesn't belong to the group. 90-second time limit.
 * Uses ALL 3 quest vocabulary combined for true integration.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { calculateStars } from '../../../stores/useChroniclesStore';

/**
 * Build Odd-One-Out questions from a flat vocab list.
 * Strategy: group words by type/semantic field, then inject 1 outsider.
 */
function buildOOOQuestions(vocabItems) {
  if (vocabItems.length < 4) return [];

  const questions = [];
  const shuffled = [...vocabItems].sort(() => Math.random() - 0.5);

  // Create rounds: pick 3 related + 1 odd
  for (let i = 0; i < Math.min(8, Math.floor(shuffled.length / 4)); i++) {
    const base = shuffled.slice(i * 4, i * 4 + 4);
    if (base.length < 4) break;

    // The "odd one out" is the 4th item (already random due to shuffle)
    const oddIndex = 3;
    const cards = base.map((item, idx) => ({
      id: `card_${i}_${idx}`,
      word: item.word,
      isOdd: idx === oddIndex,
    }));

    // Shuffle cards so odd position isn't always position 4
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    questions.push({
      id: i,
      cards: shuffledCards,
      hint: `Which word doesn't fit with the others?`,
      groupLabel: 'This week\'s magic words',
    });
  }

  return questions;
}

export default function LexicalDetectiveGame({ vocabItems = [], onComplete, duration = 90 }) {
  const [phase, setPhase] = useState('intro');
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(duration);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [startTime, setStartTime] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const timerRef = useRef(null);

  const startGame = useCallback(() => {
    const qs = buildOOOQuestions(vocabItems);
    setQuestions(qs);
    setPhase(qs.length > 0 ? 'playing' : 'result');
    setQuestionIndex(0);
    setScore({ correct: 0, wrong: 0, total: 0 });
    setTimeLeft(duration);
    setStartTime(Date.now());
    setSelected(null);
    setFeedback(null);
    setRevealed(false);
  }, [vocabItems, duration]);

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]); // eslint-disable-line

  // ── Select card ────────────────────────────────────────────────────────────

  const handleCardSelect = useCallback((card) => {
    if (feedback || selected) return;
    setSelected(card.id);
    const isCorrect = card.isOdd;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setRevealed(true);
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));

    setTimeout(() => {
      const nextIdx = questionIndex + 1;
      if (nextIdx >= questions.length) {
        endGame();
      } else {
        setQuestionIndex(nextIdx);
        setSelected(null);
        setFeedback(null);
        setRevealed(false);
      }
    }, 1500);
  }, [feedback, selected, questionIndex, questions.length]); // eslint-disable-line

  function endGame() {
    clearInterval(timerRef.current);
    setPhase('result');
    setScore((prev) => {
      const elapsed = startTime ? (Date.now() - startTime) / 1000 : duration;
      const earned = calculateStars(prev.correct, Math.max(prev.total, 1), elapsed, duration);
      setStars(earned);
      return prev;
    });
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <div className="chronicles-game-intro">
        <div className="cg-mascot">🔍</div>
        <h3 className="cg-title">Lexical Detective</h3>
        <p className="cg-desc">Find the word that doesn't belong! Tap the odd one out.</p>
        <button className="cg-start-btn" onClick={startGame}>⚡ Start Investigation</button>
      </div>
    );
  }

  if (phase === 'result') {
    return (
      <div className="chronicles-game-result">
        <div className="cgr-stars">
          {[1, 2, 3].map((n) => (
            <span key={n} className={`cgr-star ${n <= stars ? 'earned' : 'empty'}`}>★</span>
          ))}
        </div>
        <h3 className="cgr-title">
          {stars >= 2 ? '🔍 Case Solved!' : stars === 1 ? '✅ Good Detective!' : '😅 Keep Investigating!'}
        </h3>
        <p className="cgr-score">{score.correct} / {Math.max(score.total, 1)} correct</p>
        <div className="cgr-actions">
          {stars === 0 && <button className="cg-retry-btn" onClick={startGame}>🔄 Retry</button>}
          <button
            className="cg-continue-btn"
            onClick={() => onComplete && onComplete(stars, score)}
            disabled={stars === 0}
          >
            {stars > 0 ? '→ Open the Door!' : '🔒 Need 1 Star'}
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[questionIndex];
  if (!currentQ) return null;
  const timerPct = (timeLeft / duration) * 100;

  return (
    <div className="chronicles-game lexical-detective">
      {/* HUD */}
      <div className="cg-hud">
        <div className="cg-timer-bar">
          <div className={`cg-timer-fill ${timeLeft < 20 ? 'urgent' : ''}`} style={{ width: `${timerPct}%` }} />
        </div>
        <div className="cg-hud-stats">
          <span className="cg-score-correct">✓ {score.correct}</span>
          <span className="cg-time">{timeLeft}s</span>
          <span className="cg-q-count">{questionIndex + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Prompt */}
      <div className="cg-detective-prompt">
        <span className="cg-detective-icon">🕵️</span>
        <span className="cg-prompt-text">{currentQ.hint}</span>
      </div>

      {/* Cards */}
      <div className="cg-ooo-grid">
        {currentQ.cards.map((card) => {
          let cardClass = 'cg-ooo-card';
          if (revealed) {
            cardClass += card.isOdd ? ' revealed-odd' : ' revealed-group';
          }
          if (selected === card.id) {
            cardClass += feedback === 'correct' ? ' selected-correct' : ' selected-wrong';
          }
          return (
            <button
              key={card.id}
              className={cardClass}
              onClick={() => handleCardSelect(card)}
              disabled={!!feedback}
            >
              <span className="cg-ooo-word">{card.word}</span>
              {revealed && card.isOdd && (
                <span className="cg-ooo-badge">ODD ONE</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`cg-feedback ${feedback}`}>
          {feedback === 'correct' ? '🔍 Correct deduction!' : '✗ Wrong — find the odd word!'}
        </div>
      )}
    </div>
  );
}
