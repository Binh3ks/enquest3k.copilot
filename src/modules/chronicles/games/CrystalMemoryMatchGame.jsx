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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildCards(vocabItems) {
  // Pick up to 4 pairs (8 cards total) — classic memory match
  const pairs = vocabItems
    .filter(item => item.word && (item.definition || item.type))
    .slice(0, 4);

  const cards = [];
  pairs.forEach((item, pairIdx) => {
    cards.push({ id: `w${pairIdx}`, pairId: pairIdx, face: item.word,       side: 'word',       item });
    cards.push({ id: `d${pairIdx}`, pairId: pairIdx, face: item.definition || `(${item.type})`, side: 'def', item });
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
  const timerRef = useRef(null);

  // ── Start ─────────────────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    const builtCards = buildCards(vocabItems.length >= 4 ? vocabItems : [
      { word: 'word', definition: 'a unit of language', type: 'vocab' },
      { word: 'match', definition: 'to find the pair', type: 'vocab' },
      { word: 'crystal', definition: 'a clear, hard mineral', type: 'vocab' },
      { word: 'memory', definition: 'the ability to remember', type: 'vocab' },
    ]);
    setCards(builtCards);
    setFlipped([]);
    setMatched(new Set());
    setMistakes(0);
    setTimeLeft(duration);
    setLockBoard(false);
    setLastPair(null);
    setStartTime(Date.now());
    setPhase('playing');
  }, [vocabItems, duration]);

  // ── Timer ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing') return;
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
  }, [phase]); // eslint-disable-line

  // ── End game ──────────────────────────────────────────────────────────────

  const endGame = useCallback((timeout = false) => {
    clearInterval(timerRef.current);
    const timeTaken = (Date.now() - (startTime || Date.now())) / 1000;
    const correct = matched.size; // number of pairs matched
    const total   = cards.length / 2;

    // Stars based on mistakes
    let earnedStars;
    if (timeout && correct < total) {
      earnedStars = correct === 0 ? 0 : 1;
    } else {
      earnedStars = mistakes <= 3 ? 3 : mistakes <= 7 ? 2 : 1;
    }

    setStars(earnedStars);
    setPhase('result');

    // Small delay then report
    setTimeout(() => {
      onComplete && onComplete(earnedStars, { correct, total, mistakes, timeTaken });
    }, 2000);
  }, [matched, cards, mistakes, startTime, onComplete]); // eslint-disable-line

  // ── Flip card ─────────────────────────────────────────────────────────────

  const flipCard = useCallback((idx) => {
    if (lockBoard) return;
    if (flipped.includes(idx)) return;
    if (matched.has(cards[idx]?.pairId)) return;

    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setLockBoard(true);
      const [a, b] = newFlipped;
      const cardA = cards[a];
      const cardB = cards[b];

      if (cardA.pairId === cardB.pairId && cardA.side !== cardB.side) {
        // Match!
        setLastPair('match');
        const newMatched = new Set(matched);
        newMatched.add(cardA.pairId);
        setMatched(newMatched);

        setTimeout(() => {
          setFlipped([]);
          setLockBoard(false);
          setLastPair(null);
          // Check win
          if (newMatched.size === cards.length / 2) {
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
      <div className="chronicles-game crystal-match">
        <div className="cg-intro-screen">
          <div className="cg-game-icon">🔮</div>
          <h2 className="cg-game-title">Crystal Memory Match</h2>
          <p className="cg-game-desc">
            Tap two crystals that match — a word and its meaning!<br />
            Match all pairs before time runs out.
          </p>
          <div className="cg-rules">
            <span>⏱ {duration}s</span>
            <span>🃏 4 pairs</span>
            <span>⭐ Fewer mistakes = more stars</span>
          </div>
          <button id="cm-start-btn" className="cg-start-btn" onClick={startGame}>
            ⚡ Start Challenge
          </button>
        </div>
      </div>
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
            {stars === 3 ? '💎 Crystal Master!' : stars === 2 ? '🔷 Well Matched!' : stars === 1 ? '🔹 Keep Practising!' : '💤 Time\'s Up!'}
          </div>
          <div className="cg-result-stats">
            <span>✅ {matched.size}/{cards.length / 2} pairs</span>
            <span>❌ {mistakes} mistakes</span>
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
      {/* HUD */}
      <div className="cg-hud">
        <span className="cg-hud-stat correct">✅ {matched.size}/{cards.length / 2}</span>
        <div className="cg-timer-bar-wrap">
          <div className="cg-timer-bar" style={{ width: `${pct}%`, background: timerColor }} />
        </div>
        <span className="cg-hud-timer">{timeLeft}s</span>
        <span className="cg-hud-stat wrong">❌ {mistakes}</span>
      </div>

      {/* Feedback flash */}
      {lastPair && (
        <div className={`cm-feedback ${lastPair}`}>
          {lastPair === 'match' ? '✨ Match!' : '🔄 Try again!'}
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
