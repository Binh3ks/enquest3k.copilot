/**
 * SpellTrainGame.jsx — Door 2 "Grammar" Mini-Game
 *
 * A magical train of word-carriages flies across the screen.
 * Player must arrange the carriages in the correct sentence order
 * by tapping them in sequence. 90-second time limit.
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { calculateStars } from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';
import { HelpCircle, Volume2 } from 'lucide-react';

const FALLBACK_SENTENCES = [
  { sentence: 'Friction keeps your feet on the ground.', hint: 'Subject + Verb + Object' },
  { sentence: 'Rubber soles have strong grip.', hint: 'Noun phrase + Verb + Adjective + Noun' },
  { sentence: 'Be careful on the wet floor.', hint: 'Imperative sentence' },
  { sentence: 'Ice has very little friction.', hint: 'Subject + Verb + Object' },
];

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
  const [showHelp, setShowHelp] = useState(false);
  const timerRef = useRef(null);

  const rawQuestions = grammarSentences.filter((s) => s.sentence && s.sentence.length > 4);
  const questions = rawQuestions.length > 0 ? rawQuestions : FALLBACK_SENTENCES;

  const speakSentence = (text) => {
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
    setShowHelp(false);
    loadQuestion(0);
  }, [duration, loadQuestion]);

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { clearInterval(timerRef.current); endGame(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, showHelp]); // eslint-disable-line

  // ── Tap word to add to sentence ────────────────────────────────────────────

  const handleWordTap = (wordObj) => {
    if (wordObj.used || feedback) return;
    speakSentence(wordObj.word);
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
    if (isCorrect) speakSentence(currentQ.sentence);

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      wrong: prev.wrong + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));

    setTimeout(() => {
      loadQuestion(questionIndex + 1);
    }, isCorrect ? 1000 : 1600);
  }, [questions, questionIndex, selectedWords, loadQuestion]);

  // Auto-check when all words are placed
  useEffect(() => {
    if (phase !== 'playing' || feedback) return;
    if (shuffledWords.length > 0 && selectedWords.length === shuffledWords.length) {
      checkAnswer();
    }
  }, [selectedWords, shuffledWords, phase, feedback, checkAnswer]);

  // ── End game ───────────────────────────────────────────────────────────────

  const endGame = (clearedAll = false) => {
    clearInterval(timerRef.current);
    setPhase('result');
    const elapsed = startTime ? (Date.now() - startTime) / 1000 : duration;
    setScore((prev) => {
      const earned = calculateStars(
        prev.correct,
        Math.max(questions.length, 1),
        elapsed,
        duration
      );
      setStars(earned);
      return prev;
    });
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  if (phase === 'intro') {
    return (
      <GameInstructionModal
        isOpen={true}
        isIntro={true}
        gameType="spell_train"
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
        <h3 className="cgr-title">{stars >= 2 ? '🎉 Xuất sắc! Đoàn tàu đã về đích!' : stars === 1 ? '✅ Đã vượt qua!' : '😅 Hãy thử lại nhé!'}</h3>
        <p className="cgr-score">{score.correct} / {Math.max(score.total, 1)} câu đúng</p>
        <div className="cgr-actions">
          {stars === 0 && <button className="cg-retry-btn" onClick={startGame}>🔄 Thử lại</button>}
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

  const currentQ = questions[questionIndex] || questions[0];
  const timerPct = (timeLeft / duration) * 100;
  const allPlaced = shuffledWords.every((w) => w.used);

  return (
    <div className="chronicles-game spell-train">
      <GameInstructionModal
        isOpen={showHelp}
        isIntro={false}
        gameType="spell_train"
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

      {/* Hint */}
      {currentQ?.hint && (
        <div className="cg-grammar-hint">💡 Gợi ý: {currentQ.hint}</div>
      )}

      {/* Train track — answer area */}
      <div className={`cg-train-track ${feedback === 'correct' ? 'track-correct' : feedback === 'wrong' ? 'track-wrong' : ''}`}>
        <div className="cg-track-label">🚂 Đoàn tàu ngữ pháp của bạn (Chạm từ bên dưới để ghép):</div>
        <div className="cg-selected-words">
          {selectedWords.length === 0 && (
            <span className="cg-track-placeholder">Chạm lần lượt vào các từ bên dưới...</span>
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
        {feedback === 'correct' && <div className="cg-correct-flash">✨ Ghép câu chuẩn xác!</div>}
        {feedback === 'wrong' && (
          <div className="cg-wrong-flash">
            ✗ Đáp án đúng: <em>{currentQ.sentence}</em>
          </div>
        )}
      </div>

      {/* Word bank */}
      <div className="cg-word-bank">
        {shuffledWords.map((w) => (
          <button
            key={w.id}
            className={`cg-word-carriage available ${w.used ? 'used' : ''}`}
            onClick={() => handleWordTap(w)}
            disabled={w.used || Boolean(feedback)}
          >
            {w.word}
          </button>
        ))}
      </div>

      {/* Submit / skip button if stuck */}
      <div className="cg-spell-actions">
        <button
          className="cg-listen-sentence-btn"
          onClick={() => speakSentence(currentQ.sentence)}
          title="Nghe câu mẫu"
        >
          <Volume2 size={16} />
          <span>Nghe câu mẫu</span>
        </button>
        {!allPlaced && (
          <button
            className="cg-skip-btn"
            onClick={() => loadQuestion(questionIndex + 1)}
          >
            Bỏ qua →
          </button>
        )}
      </div>
    </div>
  );
}
