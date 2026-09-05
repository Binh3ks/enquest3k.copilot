import React, { useState, useCallback, useEffect, useRef } from 'react';
import { X, RotateCcw, CheckCircle, XCircle, Volume2, Brain, Sparkles, ChevronRight } from 'lucide-react';
import srsService from '../../services/srsService';
import useTTSStore from '../../stores/useTTSStore';
import './SRSFlashcardReview.css';

/**
 * SRSFlashcardReview — Daily flashcard warm-up modal.
 * Shows 5–10 due SRS words before the first quest each day.
 * Cards flip with 3D CSS animation. Student marks "Nhớ rồi" or "Chưa nhớ".
 */

const MAX_CARDS = 10;

export default function SRSFlashcardReview({ onComplete }) {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [results, setResults] = useState([]);  // { word, remembered: boolean }[]
  const [phase, setPhase] = useState('review'); // 'review' | 'summary'
  const { speak } = useTTSStore();
  const cardRef = useRef(null);

  // Load due words on mount
  useEffect(() => {
    const dueWords = srsService.getDueWords(MAX_CARDS);
    if (dueWords.length === 0) {
      onComplete?.();
      return;
    }
    setCards(dueWords);
  }, [onComplete]);

  const currentCard = cards[currentIndex];
  const progress = cards.length > 0 ? ((currentIndex) / cards.length) * 100 : 0;
  const stats = srsService.getStats();

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handleSpeak = useCallback((e) => {
    e?.stopPropagation();
    if (currentCard?.word) {
      speak?.(currentCard.word, 'en-US');
    }
  }, [currentCard, speak]);

  const handleAnswer = useCallback((remembered) => {
    if (!currentCard) return;

    // Record in SRS engine
    srsService.recordReview(currentCard.word, remembered);

    // Track result
    setResults(prev => [...prev, { word: currentCard.word, remembered }]);

    // Next card or finish
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      srsService.markDailyReviewDone();
      setPhase('summary');
    }
  }, [currentCard, currentIndex, cards.length]);

  const handleFinish = useCallback(() => {
    onComplete?.();
  }, [onComplete]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (phase !== 'review') return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!isFlipped) {
          handleFlip();
        }
      }
      if (isFlipped && e.key === 'ArrowRight') handleAnswer(true);
      if (isFlipped && e.key === 'ArrowLeft') handleAnswer(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, isFlipped, handleFlip, handleAnswer]);

  if (cards.length === 0) return null;

  // ── Summary Screen ──────────────────────────────────────────
  if (phase === 'summary') {
    const remembered = results.filter(r => r.remembered).length;
    const total = results.length;
    const percentage = total > 0 ? Math.round((remembered / total) * 100) : 0;

    return (
      <div className="srs-overlay">
        <div className="srs-modal srs-summary">
          <div className="srs-summary-icon">
            <Sparkles size={48} />
          </div>
          <h2 className="srs-summary-title">Ôn tập xong! 🎉</h2>
          <p className="srs-summary-score">
            {remembered}/{total} từ nhớ ({percentage}%)
          </p>

          <div className="srs-stats-grid">
            <div className="srs-stat-item">
              <span className="srs-stat-number">{stats.totalWords}</span>
              <span className="srs-stat-label">Tổng từ</span>
            </div>
            <div className="srs-stat-item srs-stat-mastered">
              <span className="srs-stat-number">{stats.masteredWords}</span>
              <span className="srs-stat-label">Thuộc lòng</span>
            </div>
            <div className="srs-stat-item">
              <span className="srs-stat-number">{stats.dueNow}</span>
              <span className="srs-stat-label">Cần ôn tiếp</span>
            </div>
          </div>

          {/* Word results list */}
          <div className="srs-results-list">
            {results.map((r, i) => (
              <div key={i} className={`srs-result-item ${r.remembered ? 'srs-correct' : 'srs-incorrect'}`}>
                {r.remembered ? <CheckCircle size={14} /> : <XCircle size={14} />}
                <span>{r.word}</span>
              </div>
            ))}
          </div>

          <button type="button" className="srs-continue-btn" onClick={handleFinish}>
            <span>Bắt đầu học! 🚀</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ── Review Screen ──────────────────────────────────────────
  return (
    <div className="srs-overlay">
      <div className="srs-modal">
        {/* Header */}
        <div className="srs-header">
          <div className="srs-header-left">
            <Brain size={20} />
            <span>Ôn tập từ vựng</span>
          </div>
          <div className="srs-header-right">
            <span className="srs-counter">{currentIndex + 1}/{cards.length}</span>
            <button type="button" className="srs-skip-btn" onClick={handleFinish} title="Bỏ qua">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="srs-progress-bar">
          <div className="srs-progress-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Box indicator */}
        <div className="srs-box-indicator">
          {[1, 2, 3, 4, 5].map(box => (
            <div
              key={box}
              className={`srs-box-dot ${currentCard?.box === box ? 'srs-box-active' : ''} ${currentCard?.box > box ? 'srs-box-passed' : ''}`}
              title={`Box ${box}`}
            >
              {box}
            </div>
          ))}
        </div>

        {/* Flashcard */}
        <div
          ref={cardRef}
          className={`srs-card-container ${isFlipped ? 'srs-flipped' : ''}`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
        >
          {/* Front: English word */}
          <div className="srs-card srs-card-front">
            <button
              type="button"
              className="srs-speak-btn"
              onClick={handleSpeak}
              title="Nghe phát âm"
            >
              <Volume2 size={20} />
            </button>
            <h3 className="srs-word">{currentCard?.word}</h3>
            <p className="srs-hint">Bấm để lật thẻ</p>
          </div>

          {/* Back: Vietnamese definition */}
          <div className="srs-card srs-card-back">
            <p className="srs-definition">{currentCard?.definition}</p>
            <p className="srs-week-label">Tuần {currentCard?.week}</p>
          </div>
        </div>

        {/* Action buttons — only visible when flipped */}
        <div className={`srs-actions ${isFlipped ? 'srs-actions-visible' : ''}`}>
          <button
            type="button"
            className="srs-action-btn srs-btn-forgot"
            onClick={() => handleAnswer(false)}
          >
            <XCircle size={20} />
            <span>Chưa nhớ</span>
          </button>
          <button
            type="button"
            className="srs-action-btn srs-btn-remember"
            onClick={() => handleAnswer(true)}
          >
            <CheckCircle size={20} />
            <span>Nhớ rồi!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
