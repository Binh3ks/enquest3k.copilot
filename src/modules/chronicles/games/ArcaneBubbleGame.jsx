/**
 * ArcaneBubbleGame.jsx — Door 1 "Vocab" Mini-Game
 *
 * Bubbles float upward from the bottom. Each bubble contains a word.
 * Player sees the target word and definition clue, hears the pronunciation,
 * and taps the correct bubble before it floats off screen. 60-second time limit.
 *
 * Star scoring: calculateStars(correct, total, timeTaken, 60)
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { calculateStars } from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';
import { Volume2, HelpCircle } from 'lucide-react';

// ─── Bubble Physics ─────────────────────────────────────────────────────────

function createBubble(item, index, containerWidth) {
  const x = 10 + Math.random() * (containerWidth - 120);
  const speed = 0.35 + Math.random() * 0.35;
  const wobble = (Math.random() - 0.5) * 0.3;
  const size = 74 + Math.random() * 22;
  return {
    id: `bubble_${index}_${Date.now()}_${Math.random()}`,
    word: item.word,
    type: item.type,
    x,
    y: 105,           // start below screen (%)
    speed,
    wobble,
    size,
    opacity: 1,
    popped: false,
    isTarget: Boolean(item.isTarget),
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ArcaneBubbleGame({ vocabItems = [], onComplete, duration = 60 }) {
  const [phase, setPhase] = useState('intro'); // intro | playing | result
  const [bubbles, setBubbles] = useState([]);
  const [prompt, setPrompt] = useState(null);       // { targetWord, definition }
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });
  const [timeLeft, setTimeLeft] = useState(duration);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState(null);    // { correct: bool, word: string }
  const [startTime, setStartTime] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const containerRef = useRef(null);
  const animFrameRef = useRef(null);
  const timerRef = useRef(null);
  const promptQueueRef = useRef([]);
  const activePromptRef = useRef(null);

  // ── Speech Synthesizer Helper ──────────────────────────────────────────────

  const speakWord = useCallback((text) => {
    if (!text) return;
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = 'en-US';
        u.rate = 0.9;
        window.speechSynthesis.speak(u);
      }
    } catch (_) {}
  }, []);

  // ── Prepare prompts ────────────────────────────────────────────────────────

  const buildPrompts = useCallback(() => {
    const rawList = vocabItems.length > 0 ? vocabItems : [
      { word: 'friction', definition: 'The force that slows down sliding' },
      { word: 'shoe soles', definition: 'Bottom part of footwear' },
      { word: 'slippery', definition: 'Difficult to stand on when wet' },
      { word: 'balanced', definition: 'Staying steady without falling' },
    ];
    const shuffled = [...rawList].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(12, shuffled.length)).map((item, i) => ({
      id: i,
      word: item.word,
      definition: item.definition && item.definition !== item.word ? item.definition : '',
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
    setShowHelp(false);
  }, [buildPrompts, duration]);

  // ── Spawn bubbles ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
    const container = containerRef.current;
    if (!container) return;

    // Issue new prompt + spawn bubbles every ~4.5s
    const spawnRound = () => {
      const pending = promptQueueRef.current.filter((p) => !p.used);
      if (pending.length === 0) return;
      const target = pending[0];
      promptQueueRef.current = promptQueueRef.current.map((p) =>
        p.id === target.id ? { ...p, used: true } : p
      );
      activePromptRef.current = target;
      setPrompt({
        targetWord: target.word,
        definition: target.definition || '',
      });

      // Automatically speak the target word so student connects phonetics with text
      speakWord(target.word);

      // Spawn 3–5 bubbles: 1 correct + 2–4 distractors
      const pool = vocabItems.length >= 3 ? vocabItems : [
        { word: 'friction' }, { word: 'smooth' }, { word: 'balance' }, { word: 'motion' }
      ];
      const distractors = pool
        .filter((v) => v.word.toLowerCase() !== target.word.toLowerCase())
        .sort(() => Math.random() - 0.5)
        .slice(0, 3 + Math.floor(Math.random() * 2));

      const allItems = [
        { word: target.word, isTarget: true },
        ...distractors.map((d) => ({ word: d.word, isTarget: false })),
      ];
      const shuffledItems = allItems.sort(() => Math.random() - 0.5);
      const w = container.offsetWidth || 360;

      setBubbles((prev) => [
        ...prev.filter((b) => !b.popped && b.y > -10),
        ...shuffledItems.map((item, idx) => createBubble(item, idx, w)),
      ]);
    };

    spawnRound();
    const interval = setInterval(spawnRound, 4800);
    return () => clearInterval(interval);
  }, [phase, showHelp, vocabItems, speakWord]);

  // ── Float animation ────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
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
  }, [phase, showHelp]);

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
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
  }, [phase, showHelp]); // eslint-disable-line

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
    const isCorrect = bubble.word.toLowerCase() === activePromptRef.current?.word.toLowerCase();

    setBubbles((prev) =>
      prev.map((b) => (b.id === bubble.id ? { ...b, popped: true } : b))
    );

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));

    setFeedback({ correct: isCorrect, word: bubble.word });
    setTimeout(() => setFeedback(null), 900);

    // If 10 correct reached, finish early
    setScore((prev) => {
      if (prev.correct >= 10) {
        setTimeout(endGame, 400);
      }
      return prev;
    });
  }, [endGame]);

  // ── Render ─────────────────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <GameInstructionModal
        isOpen={true}
        isIntro={true}
        gameType="arcane_bubble"
        onStart={startGame}
      />
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
        <h3 className="cgr-title">{stars >= 2 ? '🎉 Xuất sắc!' : stars === 1 ? '✅ Đã vượt qua!' : '😅 Thử lại nhé!'}</h3>
        <p className="cgr-score">{score.correct} / {Math.max(score.total, 1)} câu đúng</p>
        <div className="cgr-actions">
          {stars === 0 && (
            <button className="cg-retry-btn" onClick={startGame}>🔄 Thử lại</button>
          )}
          <button
            className="cg-continue-btn"
            onClick={() => onComplete && onComplete(stars, score)}
            disabled={stars === 0}
          >
            {stars > 0 ? '→ Tiếp tục' : '🔒 Cần ít nhất 1★'}
          </button>
        </div>
      </div>
    );
  }

  // Playing
  const timerPct = (timeLeft / duration) * 100;

  return (
    <div className="chronicles-game arcane-bubble" ref={containerRef}>
      {/* Instructions Modal (can open during gameplay) */}
      <GameInstructionModal
        isOpen={showHelp}
        isIntro={false}
        gameType="arcane_bubble"
        onClose={() => setShowHelp(false)}
      />

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
          <span className="cg-time">⏱️ {timeLeft}s</span>
          <button
            type="button"
            className="cg-help-trigger-btn"
            onClick={() => setShowHelp(true)}
            title="Xem hướng dẫn chơi"
          >
            <HelpCircle size={14} />
            <span>Cách chơi</span>
          </button>
          <span className="cg-score-wrong">✗ {score.wrong}</span>
        </div>
      </div>

      {/* Target Word Prompt Box */}
      {prompt && (
        <div className="cg-prompt arcane-prompt">
          <div className="cg-prompt-header-row">
            <span className="cg-prompt-target-badge">🎯 BẮT BONG BÓNG CHỨA TỪ:</span>
            <button
              type="button"
              className="cg-prompt-audio-btn"
              onClick={() => speakWord(prompt.targetWord)}
              title="Bấm để nghe phát âm"
            >
              <Volume2 size={16} />
              <span>Nghe</span>
            </button>
          </div>
          <div className="cg-prompt-target-word">
            "{prompt.targetWord}"
          </div>
          {prompt.definition ? (
            <div className="cg-prompt-clue">
              💡 Gợi ý: {prompt.definition}
            </div>
          ) : (
            <div className="cg-prompt-clue">
              👆 Chạm vào bong bóng có chữ <strong>"{prompt.targetWord}"</strong> đang bay lên!
            </div>
          )}
        </div>
      )}

      {/* Feedback flash */}
      {feedback && (
        <div className={`cg-feedback ${feedback.correct ? 'correct' : 'wrong'}`}>
          {feedback.correct ? `✨ Đúng rồi! "${feedback.word}"` : '✗ Sai rồi, hãy chọn lại!'}
        </div>
      )}

      {/* Bubbles */}
      <div className="cg-bubble-field">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            className={`cg-bubble ${bubble.popped ? 'popped' : ''}`}
            style={{
              left: `${Math.max(2, Math.min(84, bubble.x / 3.6))}%`,
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
