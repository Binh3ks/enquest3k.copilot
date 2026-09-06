/**
 * CrystalMemoryMatchGame.jsx — Crystal Memory Match (Day 2/5 — Door 1 Vocab)
 *
 * Mechanic: 4×3 grid of 8 face-down cards (4 word/definition pairs).
 *   - Tap card 1 → flip and reveal
 *   - Tap card 2 → flip and check match
 *   - Match: both cards glow and stay face-up (crystal clear)
 *   - Mismatch: both flip back after 1s
 *   - Win: all 4 pairs matched before time runs out
 *
 * Stars: 3★ ≤3 mistakes | 2★ 4–7 mistakes | 1★ 8+ or timeout
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { calculateStars } from '../../../stores/useChroniclesStore';
import GameInstructionModal from './GameInstructionModal';
import { HelpCircle } from 'lucide-react';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildCards(vocabItems) {
  // Pick up to 4 pairs (8 cards total) — classic memory match
  const pairs = vocabItems
    .filter(item => item.word && (item.definition || item.type))
    .slice(0, 4);

  const list = pairs.length >= 3 ? pairs : [
    { word: 'friction', definition: 'Lực ma sát cản trở trượt' },
    { word: 'shoe soles', definition: 'Đế giày tiếp xúc mặt sàn' },
    { word: 'slippery', definition: 'Trơn trượt dễ ngã' },
    { word: 'balanced', definition: 'Giữ thăng bằng vững vàng' },
  ];

  const cards = [];
  list.slice(0, 4).forEach((item, pairIdx) => {
    cards.push({ id: `w${pairIdx}`, pairId: pairIdx, face: item.word, side: 'word', item });
    cards.push({ id: `d${pairIdx}`, pairId: pairIdx, face: item.definition || `(${item.type || 'vocab'})`, side: 'def', item });
  });

  // Shuffle Fisher-Yates
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CrystalMemoryMatchGame({
  vocabItems = [],
  onComplete,
  duration = 75,
}) {
  const [phase, setPhase]         = useState('intro'); // intro | playing | result
  const [cards, setCards]         = useState([]);
  const [flipped, setFlipped]     = useState([]);      // indices of currently flipped (max 2)
  const [matched, setMatched]     = useState(new Set()); // pairIds that are matched
  const [mistakes, setMistakes]   = useState(0);
  const [timeLeft, setTimeLeft]   = useState(duration);
  const [stars, setStars]         = useState(0);
  const [lockBoard, setLockBoard] = useState(false);
  const [lastPair, setLastPair]   = useState(null);   // 'match' | 'miss'
  const [startTime, setStartTime] = useState(null);
  const [showHelp, setShowHelp]   = useState(false);
  const timerRef = useRef(null);

  const speakText = (text) => {
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

  // ── Start ─────────────────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    const builtCards = buildCards(vocabItems);
    setCards(builtCards);
    setFlipped([]);
    setMatched(new Set());
    setMistakes(0);
    setTimeLeft(duration);
    setLockBoard(false);
    setLastPair(null);
    setStartTime(Date.now());
    setPhase('playing');
    setShowHelp(false);
  }, [vocabItems, duration]);

  // ── Timer ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          endGame(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, showHelp]); // eslint-disable-line

  // ── End game ──────────────────────────────────────────────────────────────

  const endGame = useCallback((timeout = false) => {
    clearInterval(timerRef.current);
    const correct = matched.size; // number of pairs matched
    const total   = cards.length / 2;

    let earnedStars;
    if (timeout && correct < total) {
      earnedStars = correct === 0 ? 0 : 1;
    } else {
      earnedStars = mistakes <= 3 ? 3 : mistakes <= 7 ? 2 : 1;
    }

    setStars(earnedStars);
    setPhase('result');
  }, [matched.size, cards.length, mistakes]);

  // ── Flip Card ─────────────────────────────────────────────────────────────

  const flipCard = useCallback((idx) => {
    if (lockBoard) return;
    if (flipped.includes(idx)) return;
    if (matched.has(cards[idx]?.pairId)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (cards[idx]?.side === 'word') {
      speakText(cards[idx].face);
    }

    if (newFlipped.length === 2) {
      setLockBoard(true);
      const [firstIdx, secondIdx] = newFlipped;
      const c1 = cards[firstIdx];
      const c2 = cards[secondIdx];

      if (c1.pairId === c2.pairId && c1.side !== c2.side) {
        // Match!
        setLastPair('match');
        const nextMatched = new Set(matched);
        nextMatched.add(c1.pairId);
        setMatched(nextMatched);

        setTimeout(() => {
          setFlipped([]);
          setLockBoard(false);
          setLastPair(null);
          if (nextMatched.size >= cards.length / 2) {
            endGame(false);
          }
        }, 800);
      } else {
        // Miss
        setLastPair('miss');
        setMistakes(m => m + 1);
        setTimeout(() => {
          setFlipped([]);
          setLockBoard(false);
          setLastPair(null);
        }, 1000);
      }
    }
  }, [lockBoard, flipped, matched, cards, endGame]);

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <GameInstructionModal
        isOpen={true}
        isIntro={true}
        gameType="crystal_match"
        onStart={startGame}
      />
    );
  }

  // ─── RESULT ───────────────────────────────────────────────────────────────
  if (phase === 'result') {
    return (
      <div className="chronicles-game crystal-match">
        <div className="cg-result-screen">
          <div className="cg-result-stars">
            {[1, 2, 3].map(n => (
              <span key={n} className={`cg-star ${n <= stars ? 'earned' : 'empty'}`}>★</span>
            ))}
          </div>
          <div className="cg-result-title">
            {stars === 3 ? '💎 Bậc Thầy Tinh Thể!' : stars === 2 ? '🔷 Ghép Đôi Xuất Sắc!' : stars === 1 ? '🔹 Hoàn Thành Thử Thách!' : '💤 Hết Giờ Rồi!'}
          </div>
          <div className="cg-result-stats">
            <span>✅ {matched.size}/{cards.length / 2} cặp hoàn thành</span>
            <span>❌ {mistakes} lần lật sai</span>
          </div>
          <div className="cgr-actions" style={{ marginTop: '16px' }}>
            {stars === 0 && <button className="cg-retry-btn" onClick={startGame}>🔄 Thử lại</button>}
            <button
              className="cg-continue-btn"
              onClick={() => onComplete && onComplete(stars, { mistakes, matched: matched.size })}
              disabled={stars === 0}
            >
              {stars > 0 ? '→ Tiếp tục' : '🔒 Cần ít nhất 1★'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── PLAYING ──────────────────────────────────────────────────────────────
  const pct = (timeLeft / duration) * 100;
  const timerColor = pct > 50 ? '#10b981' : pct > 25 ? '#f59e0b' : '#ef4444';

  return (
    <div className="chronicles-game crystal-match">
      <GameInstructionModal
        isOpen={showHelp}
        isIntro={false}
        gameType="crystal_match"
        onClose={() => setShowHelp(false)}
      />

      {/* HUD */}
      <div className="cg-hud">
        <span className="cg-hud-stat correct">💎 {matched.size}/{cards.length / 2}</span>
        <div className="cg-timer-bar-wrap">
          <div className="cg-timer-bar" style={{ width: `${pct}%`, background: timerColor }} />
        </div>
        <span className="cg-hud-timer">⏱️ {timeLeft}s</span>
        <button
          type="button"
          className="cg-help-trigger-btn"
          onClick={() => setShowHelp(true)}
          title="Xem hướng dẫn chơi"
        >
          <HelpCircle size={14} />
          <span>Cách chơi</span>
        </button>
        <span className="cg-hud-stat wrong">❌ {mistakes}</span>
      </div>

      {/* Feedback flash */}
      {lastPair && (
        <div className={`cm-feedback ${lastPair}`}>
          {lastPair === 'match' ? '✨ Ghép chuẩn xác!' : '🔄 Chưa khớp, hãy nhớ vị trí!'}
        </div>
      )}

      {/* Card grid — 4 columns */}
      <div className="cm-grid">
        {cards.map((card, idx) => {
          const isFlipped  = flipped.includes(idx) || matched.has(card.pairId);
          const isMatched  = matched.has(card.pairId);
          const isWordCard = card.side === 'word';

          return (
            <button
              key={card.id}
              id={`cm-card-${card.id}`}
              className={`cm-card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''} ${isWordCard ? 'word-card' : 'def-card'}`}
              onClick={() => flipCard(idx)}
              disabled={isMatched || lockBoard}
            >
              <div className="cm-card-inner">
                <div className="cm-card-back">💎</div>
                <div className="cm-card-front">{card.face}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
