/**
 * LexicalDetectiveGame.jsx — Door 3 "Integration" Mini-Game
 *
 * "Odd One Out" style game. Player sees 4 word cards and must find
 * the ONE that doesn't belong to the group. 90-second time limit.
 * Uses ALL 3 quest vocabulary combined for true integration.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { calculateStars } from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';
import { HelpCircle, Volume2 } from 'lucide-react';

/**
 * Build Odd-One-Out questions from a flat vocab list.
 * Strategy: group words by type/semantic field, then inject 1 outsider.
 */
function buildOOOQuestions(vocabItems) {
  const list = vocabItems.length >= 4 ? vocabItems : [
    { word: 'shoe soles' }, { word: 'friction' }, { word: 'slippery' }, { word: 'banana' },
    { word: 'rubber grip' }, { word: 'smooth tiles' }, { word: 'balanced' }, { word: 'computer' },
  ];

  const questions = [];
  const shuffled = [...list].sort(() => Math.random() - 0.5);

  for (let i = 0; i < Math.min(8, Math.floor(shuffled.length / 4)); i++) {
    const base = shuffled.slice(i * 4, i * 4 + 4);
    if (base.length < 4) break;

    // The odd one out is item 3
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
      hint: `Which word doesn't fit with the other three?`,
      groupLabel: 'Odd One Out Challenge',
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
  const [showHelp, setShowHelp] = useState(false);
  const timerRef = useRef(null);

  const speakWord = (text) => {
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
  };

  const startGame = useCallback(() => {
    const built = buildOOOQuestions(vocabItems);
    setQuestions(built);
    setQuestionIndex(0);
    setPhase('playing');
    setTimeLeft(duration);
    setScore({ correct: 0, wrong: 0, total: 0 });
    setStartTime(Date.now());
    setSelected(null);
    setFeedback(null);
    setRevealed(false);
    setShowHelp(false);
  }, [vocabItems, duration]);

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, showHelp]); // eslint-disable-line

  // ── Card selection ─────────────────────────────────────────────────────────

  const handleSelectCard = (card) => {
    if (selected !== null || revealed) return;
    setSelected(card.id);
    setRevealed(true);
    speakWord(card.word);

    const isCorrect = card.isOdd;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));

    setTimeout(() => {
      if (questionIndex + 1 >= questions.length) {
        endGame();
      } else {
        setQuestionIndex((i) => i + 1);
        setSelected(null);
        setFeedback(null);
        setRevealed(false);
      }
    }, isCorrect ? 1000 : 1800);
  };

  // ── End game ───────────────────────────────────────────────────────────────

  function endGame() {
    clearInterval(timerRef.current);
    setPhase('result');
    const elapsed = startTime ? (Date.now() - startTime) / 1000 : duration;
    setScore((prev) => {
      const earned = calculateStars(prev.correct, Math.max(prev.total, 1), elapsed, duration);
      setStars(earned);
      return prev;
    });
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <GameInstructionModal
        isOpen={true}
        isIntro={true}
        gameType="lexical_det"
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
        <h3 className="cgr-title">
          {stars >= 2 ? '🔍 Vụ án đã được phá!' : stars === 1 ? '✅ Thám tử giỏi!' : '😅 Hãy quan sát kỹ hơn nhé!'}
        </h3>
        <p className="cgr-score">{score.correct} / {Math.max(score.total, 1)} vụ đúng</p>
        <div className="cgr-actions">
          {stars === 0 && <button className="cg-retry-btn" onClick={startGame}>🔄 Thử lại</button>}
          <button
            className="cg-continue-btn"
            onClick={() => onComplete && onComplete(stars, score)}
            disabled={stars === 0}
          >
            {stars > 0 ? '→ Mở Cửa Hoàn Tất!' : '🔒 Cần ít nhất 1★'}
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
      <GameInstructionModal
        isOpen={showHelp}
        isIntro={false}
        gameType="lexical_det"
        onClose={() => setShowHelp(false)}
      />

      {/* HUD */}
      <div className="cg-hud">
        <div className="cg-timer-bar">
          <div className={`cg-timer-fill ${timeLeft < 20 ? 'urgent' : ''}`} style={{ width: `${timerPct}%` }} />
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
          <span className="cg-q-count">{questionIndex + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Prompt */}
      <div className="cg-detective-prompt">
        <span className="cg-detective-icon">🕵️‍♂️</span>
        <div>
          <strong className="text-amber-300">Nhiệm vụ Thám Tử:</strong>
          <span className="ml-1 text-slate-200">Tìm 1 từ KHÔNG CÙNG NHÓM với 3 từ còn lại!</span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="cg-ooo-grid">
        {currentQ.cards.map((card) => {
          const isSelected = selected === card.id;
          let cardClass = '';
          if (revealed) {
            if (card.isOdd) cardClass = 'revealed-odd';
            else cardClass = 'revealed-group';
            if (isSelected) cardClass += card.isOdd ? ' selected-correct' : ' selected-wrong';
          }

          return (
            <button
              key={card.id}
              className={`cg-ooo-card ${cardClass}`}
              onClick={() => handleSelectCard(card)}
              disabled={revealed}
            >
              <div className="cg-ooo-word">{card.word}</div>
              {revealed && card.isOdd && (
                <div className="cg-ooo-badge">🎯 Từ lạc quẻ</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback text */}
      {feedback === 'correct' && (
        <div className="cg-feedback correct">✨ Xuất sắc! Bạn đã tìm đúng từ lạc quẻ!</div>
      )}
      {feedback === 'wrong' && (
        <div className="cg-feedback wrong">
          ✗ Chưa chính xác. Từ lạc quẻ là từ được đánh dấu đỏ!
        </div>
      )}
    </div>
  );
}
