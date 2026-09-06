/**
 * SpellTrainGame.jsx — Door 2 "Grammar" Mini-Game
 *
 * A magical train of word-carriages flies across the screen.
 * Player must arrange the carriages in the correct sentence order
 * by tapping them in sequence. 90-second time limit.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { calculateStars } from '../../../stores/useChroniclesStore';

export default function SpellTrainGame({ grammarSentences = [], onComplete, duration = 90 }) {
  const [phase, setPhase] = useState('intro');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledWords, setShuffledWords] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(duration);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);

  const questions = grammarSentences.filter((s) => s.sentence && s.sentence.length > 4);

  const loadQuestion = useCallback((idx) => {
    if (idx >= questions.length) {
      endGame(true);
      return;
    }
    const sentence = questions[idx].sentence;
    const words = sentence
      .replace(/[.,!?]/g, '')
      .split(/\s+/)
      .filter(Boolean);
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledWords(shuffled.map((w, i) => ({ id: `w_${idx}_${i}`, word: w, used: false })));
    setSelectedWords([]);
    setFeedback(null);
    setQuestionIndex(idx);
  }, [questions]); // eslint-disable-line

  const startGame = useCallback(() => {
    setPhase('playing');
    setTimeLeft(duration);
    setScore({ correct: 0, wrong: 0, total: 0 });
    setStartTime(Date.now());
    loadQuestion(0);
  }, [duration, loadQuestion]);

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); endGame(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]); // eslint-disable-line

  // ── Tap word to add to sentence ────────────────────────────────────────────

  const handleWordTap = (wordObj) => {
    if (wordObj.used || feedback) return;
    setShuffledWords((prev) => prev.map((w) => w.id === wordObj.id ? { ...w, used: true } : w));
    setSelectedWords((prev) => [...prev, wordObj]);
  };

  const handleRemoveWord = (wordObj) => {
    if (feedback) return;
    setSelectedWords((prev) => prev.filter((w) => w.id !== wordObj.id));
    setShuffledWords((prev) => prev.map((w) => w.id === wordObj.id ? { ...w, used: false } : w));
  };

  // ── Check answer ───────────────────────────────────────────────────────────

  const checkAnswer = useCallback(() => {
    const currentQ = questions[questionIndex];
    const correctWords = currentQ.sentence
      .replace(/[.,!?]/g, '')
      .split(/\s+/)
      .filter(Boolean);
    const playerWords = selectedWords.map((w) => w.word);
    const isCorrect = playerWords.join(' ').toLowerCase() === correctWords.join(' ').toLowerCase();

    setFeedback(isCorrect ? 'correct' : 'wrong');
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));

    setTimeout(() => {
      loadQuestion(questionIndex + 1);
    }, isCorrect ? 1000 : 1500);
  }, [questions, questionIndex, selectedWords, loadQuestion]);

  // ── Auto-check when all words placed ──────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing' || feedback) return;
    const allUsed = shuffledWords.length > 0 && shuffledWords.every((w) => w.used);
    if (allUsed && selectedWords.length === shuffledWords.length) {
      checkAnswer();
    }
  }, [shuffledWords, selectedWords, phase, feedback, checkAnswer]);

  function endGame(allDone = false) {
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

  if (questions.length === 0) {
    return (
      <div className="chronicles-game-intro">
        <p>No grammar sentences available for this zone.</p>
        <button className="cg-continue-btn" onClick={() => onComplete && onComplete(1, {})}>
          → Skip (1★)
        </button>
      </div>
    );
  }

  if (phase === 'intro') {
    return (
      <div className="chronicles-game-intro">
        <div className="cg-mascot">🚂</div>
        <h3 className="cg-title">Spell Sentence Train</h3>
        <p className="cg-desc">Tap the word carriages in the correct order to cast the sentence spell!</p>
        <button className="cg-start-btn" onClick={startGame}>⚡ Start Challenge</button>
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
        <h3 className="cgr-title">{stars >= 2 ? '🎉 Spells Cast!' : stars === 1 ? '✅ Passed!' : '😅 Retry!'}</h3>
        <p className="cgr-score">{score.correct} / {Math.max(score.total, 1)} correct</p>
        <div className="cgr-actions">
          {stars === 0 && <button className="cg-retry-btn" onClick={startGame}>🔄 Retry</button>}
          <button
            className="cg-continue-btn"
            onClick={() => onComplete && onComplete(stars, score)}
            disabled={stars === 0}
          >
            {stars > 0 ? '→ Continue' : '🔒 Need 1 Star'}
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[questionIndex];
  const timerPct = (timeLeft / duration) * 100;
  const allPlaced = shuffledWords.every((w) => w.used);

  return (
    <div className="chronicles-game spell-train">
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

      {/* Hint */}
      {currentQ.hint && (
        <div className="cg-grammar-hint">💡 {currentQ.hint}</div>
      )}

      {/* Train track — answer area */}
      <div className={`cg-train-track ${feedback === 'correct' ? 'track-correct' : feedback === 'wrong' ? 'track-wrong' : ''}`}>
        <div className="cg-track-label">🚂 Your sentence:</div>
        <div className="cg-selected-words">
          {selectedWords.length === 0 && (
            <span className="cg-track-placeholder">Tap words below...</span>
          )}
          {selectedWords.map((w) => (
            <button
              key={w.id}
              className="cg-word-carriage selected"
              onClick={() => handleRemoveWord(w)}
            >
              {w.word}
            </button>
          ))}
        </div>
        {feedback === 'correct' && <div className="cg-correct-flash">✨ Correct spell!</div>}
        {feedback === 'wrong' && (
          <div className="cg-wrong-flash">
            ✗ Correct: <em>{currentQ.sentence}</em>
          </div>
        )}
      </div>

      {/* Word bank */}
      <div className="cg-word-bank">
        {shuffledWords.map((w) => (
          <button
            key={w.id}
            className={`cg-word-carriage ${w.used ? 'used' : ''}`}
            onClick={() => handleWordTap(w)}
            disabled={w.used}
          >
            {w.word}
          </button>
        ))}
      </div>

      {/* Manual check if not all auto-placed */}
      {selectedWords.length > 0 && !allPlaced && !feedback && (
        <button className="cg-check-btn" onClick={checkAnswer}>
          ⚡ Check Spell
        </button>
      )}
    </div>
  );
}
