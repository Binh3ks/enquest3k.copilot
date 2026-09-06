/**
 * ArcaneBubbleGame.jsx — Door 1 "Vocab" Mini-Game
 *
 * Bubbles float upward from the bottom. Each bubble contains a word.
 * Player hears/sees a definition prompt and must tap the correct bubble
 * before it floats off screen. 60-second time limit.
 *
 * Star scoring: calculateStars(correct, total, timeTaken, 60)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { calculateStars } from '../../../stores/useChroniclesStore';

// ─── Bubble Physics ─────────────────────────────────────────────────────────

function createBubble(item, index, containerWidth) {
  const x = 10 + Math.random() * (containerWidth - 120);
  const speed = 0.4 + Math.random() * 0.4;
  const wobble = (Math.random() - 0.5) * 0.3;
  const size = 70 + Math.random() * 20;
  return {
    id: `bubble_${index}_${Date.now()}`,
    word: item.word,
    type: item.type,
    x,
    y: 110,           // start below screen (%)
    speed,
    wobble,
    size,
    opacity: 1,
    popped: false,
    isTarget: false,  // set by game logic
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ArcaneBubbleGame({ vocabItems = [], onComplete, duration = 60 }) {
  const [phase, setPhase] = useState('intro'); // intro | playing | result
  const [bubbles, setBubbles] = useState([]);
  const [prompt, setPrompt] = useState(null);       // { text, targetWord }
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(duration);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState(null);    // { correct: bool, word: string }
  const [startTime, setStartTime] = useState(null);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const timerRef = useRef(null);
  const promptQueueRef = useRef([]);
  const activePromptRef = useRef(null);

  // ── Prepare prompts ────────────────────────────────────────────────────────

  const buildPrompts = useCallback(() => {
    const shuffled = [...vocabItems].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(10, shuffled.length)).map((item, i) => ({
      id: i,
      word: item.word,
      definition: item.definition || `Tap the correct word!`,
      used: false,
    }));
  }, [vocabItems]);

  // ── Start game ─────────────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    const prompts = buildPrompts();
    promptQueueRef.current = prompts;
    setPhase('playing');
    setTimeLeft(duration);
    setScore({ correct: 0, wrong: 0, total: 0 });
    setStartTime(Date.now());
    setBubbles([]);
  }, [buildPrompts, duration]);

  // ── Spawn bubbles ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing') return;
    const container = containerRef.current;
    if (!container) return;

    // Issue new prompt + spawn bubbles every ~4s
    const spawnRound = () => {
      const pending = promptQueueRef.current.filter((p) => !p.used);
      if (pending.length === 0) return;
      const target = pending[0];
      promptQueueRef.current = promptQueueRef.current.map((p) =>
        p.id === target.id ? { ...p, used: true } : p
      );
      activePromptRef.current = target;
      setPrompt({ text: target.definition || `Find: "${target.word}"`, targetWord: target.word });

      // Spawn 3–5 bubbles: 1 correct + 2–4 distractors
      const distractors = vocabItems
        .filter((v) => v.word !== target.word)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3 + Math.floor(Math.random() * 2));
      const allItems = [{ word: target.word, isTarget: true }, ...distractors.map((d) => ({ ...d, isTarget: false }))];
      const shuffledItems = allItems.sort(() => Math.random() - 0.5);
      const w = container.offsetWidth || 360;

      setBubbles((prev) => [
        ...prev.filter((b) => !b.popped && b.y > -10),
        ...shuffledItems.map((item, idx) => ({
          ...createBubble(item, idx, w),
          isTarget: item.isTarget,
          word: item.word,
        })),
      ]);
    };

    spawnRound();
    const interval = setInterval(spawnRound, 4500);
    return () => clearInterval(interval);
  }, [phase, vocabItems]);

  // ── Float animation ────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing') return;
    let lastTime = performance.now();

    const animate = (now) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setBubbles((prev) =>
        prev
          .filter((b) => b.y > -20 && !b.popped)
          .map((b) => ({
            ...b,
            y: b.y - b.speed * delta * 15,
            x: b.x + Math.sin(b.y * 0.05) * b.wobble,
          }))
      );
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [phase]);

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          endGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]); // eslint-disable-line

  // ── End game ───────────────────────────────────────────────────────────────

  const endGame = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current);
    clearInterval(timerRef.current);
    setPhase('result');
    setScore((prev) => {
      const elapsed = startTime ? (Date.now() - startTime) / 1000 : duration;
      const earned = calculateStars(prev.correct, Math.max(prev.total, 1), elapsed, duration);
      setStars(earned);
      return prev;
    });
  }, [startTime, duration]);

  // ── Tap bubble ─────────────────────────────────────────────────────────────

  const handleBubbleTap = useCallback((bubble) => {
    if (bubble.popped) return;
    const isCorrect = bubble.word === activePromptRef.current?.word;
    setBubbles((prev) =>
      prev.map((b) => (b.id === bubble.id ? { ...b, popped: true, opacity: 0 } : b))
    );
    setFeedback({ correct: isCorrect, word: bubble.word });
    setTimeout(() => setFeedback(null), 800);

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      // Auto-advance to next prompt
      const pending = promptQueueRef.current.filter((p) => !p.used);
      if (pending.length === 0) {
        setTimeout(endGame, 800);
      }
    }
  }, [endGame]);

  // ── Render ─────────────────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <div className="chronicles-game-intro">
        <div className="cg-mascot">🔮</div>
        <h3 className="cg-title">Arcane Bubble Pop</h3>
        <p className="cg-desc">Tap the correct bubble before it floats away!</p>
        <button className="cg-start-btn" onClick={startGame}>
          ⚡ Start Challenge
        </button>
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
        <h3 className="cgr-title">{stars >= 2 ? '🎉 Excellent!' : stars === 1 ? '✅ Passed!' : '😅 Try Again!'}</h3>
        <p className="cgr-score">{score.correct} / {Math.max(score.total, 1)} correct</p>
        <div className="cgr-actions">
          {stars === 0 && (
            <button className="cg-retry-btn" onClick={startGame}>🔄 Retry</button>
          )}
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

  // Playing
  const timerPct = (timeLeft / duration) * 100;

  return (
    <div className="chronicles-game arcane-bubble" ref={containerRef}>
      {/* HUD */}
      <div className="cg-hud">
        <div className="cg-timer-bar">
          <div
            className={`cg-timer-fill ${timeLeft < 15 ? 'urgent' : ''}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
        <div className="cg-hud-stats">
          <span className="cg-score-correct">✓ {score.correct}</span>
          <span className="cg-time">{timeLeft}s</span>
          <span className="cg-score-wrong">✗ {score.wrong}</span>
        </div>
      </div>

      {/* Prompt */}
      {prompt && (
        <div className="cg-prompt">
          <span className="cg-prompt-label">🎯 Find:</span>
          <span className="cg-prompt-text">{prompt.text}</span>
        </div>
      )}

      {/* Feedback flash */}
      {feedback && (
        <div className={`cg-feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
          {feedback.correct ? '✨ Correct!' : '✗ Wrong!'}
        </div>
      )}

      {/* Bubbles */}
      <div className="cg-bubble-field">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            className={`cg-bubble ${bubble.popped ? 'popped' : ''}`}
            style={{
              left: `${Math.max(2, Math.min(85, bubble.x / 3.6))}%`,
              bottom: `${bubble.y}%`,
              width: bubble.size,
              height: bubble.size,
              opacity: bubble.opacity,
            }}
            onClick={() => handleBubbleTap(bubble)}
          >
            {bubble.word}
          </button>
        ))}
      </div>
    </div>
  );
}
