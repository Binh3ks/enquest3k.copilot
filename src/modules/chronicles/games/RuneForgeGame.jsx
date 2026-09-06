/**
 * RuneForgeGame.jsx — Rune Forge (Day 2/5 — Door 2 Grammar)
 *
 * Mechanic: Fill-in-the-blank sentence.
 *   - Display sentence with ONE word removed (shown as _____)
 *   - 4 rune stone options to tap and fill the blank
 *   - Correct rune: slot glows green, forge sound, next question
 *   - Wrong rune: stone cracks red, -1 HP from the forge shield
 *   - Win: answer 5 sentences before forge breaks (3 HP)
 *
 * Stars: calculateStars(correct, total, timeTaken, maxTime)
 */

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { calculateStars } from '../../../stores/useChroniclesStore';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Build fill-in-blank items from grammar sentences.
 * Removes one "interesting" word (length > 3, not stopword) from each sentence.
 */
const STOPWORDS = new Set(['the','a','an','is','are','was','were','be','been','being',
  'and','but','or','not','with','of','in','on','at','to','for','from','by','as','it',
  'its','this','that','he','she','they','we','you','i','me','him','her','us','them']);

function buildFillItems(grammarSentences) {
  const items = [];
  for (const entry of grammarSentences) {
    const sentence = typeof entry === 'string' ? entry : (entry.sentence || '');
    if (!sentence.trim()) continue;

    const words = sentence.split(/\s+/);
    // Find candidate words: len>3, not stopword, alphabetic
    const candidates = words
      .map((w, i) => ({ w: w.replace(/[^a-zA-Z]/g, '').toLowerCase(), i, raw: w }))
      .filter(({ w }) => w.length > 3 && !STOPWORDS.has(w));

    if (!candidates.length) continue;

    // Pick a random candidate
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    const displayWord = target.raw.replace(/[^a-zA-Z]/g, '');
    const punctuation = target.raw.replace(/[a-zA-Z]/g, '');

    // Build display sentence with blank
    const displayWords = [...words];
    displayWords[target.i] = `_____${punctuation}`;
    const displaySentence = displayWords.join(' ');

    // Build distractors — 3 random words from other sentences
    const otherWords = grammarSentences
      .map(s => typeof s === 'string' ? s : (s.sentence || ''))
      .join(' ')
      .split(/\s+/)
      .map(w => w.replace(/[^a-zA-Z]/g, '').toLowerCase())
      .filter(w => w.length > 3 && !STOPWORDS.has(w) && w !== displayWord.toLowerCase());

    const shuffledDistractors = [...new Set(otherWords)].sort(() => Math.random() - 0.5).slice(0, 3);
    while (shuffledDistractors.length < 3) {
      shuffledDistractors.push(['quickly', 'carefully', 'bright', 'strong'][shuffledDistractors.length]);
    }

    // 4 options with answer shuffled in
    const options = [...shuffledDistractors, displayWord].sort(() => Math.random() - 0.5);

    items.push({
      sentence: displaySentence,
      answer:   displayWord.toLowerCase(),
      options,
      hint:     entry.hint || '',
    });
  }
  return items.slice(0, 5);
}

// Rune stone colour palette — cycles per question index
const RUNE_COLORS = ['#6366f1', '#8b5cf6', '#0ea5e9', '#f59e0b'];

// ─── Component ────────────────────────────────────────────────────────────────

export default function RuneForgeGame({
  grammarSentences = [],
  onComplete,
  duration = 75,
}) {
  const [phase, setPhase]         = useState('intro');
  const [items, setItems]         = useState([]);
  const [current, setCurrent]     = useState(0);
  const [forgeHP, setForgeHP]     = useState(3);   // lives
  const [correct, setCorrect]     = useState(0);
  const [feedback, setFeedback]   = useState(null); // { type:'right'|'wrong', word }
  const [timeLeft, setTimeLeft]   = useState(duration);
  const [stars, setStars]         = useState(0);
  const [startTime, setStartTime] = useState(null);
  const timerRef = useRef(null);

  // ── Start ─────────────────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    const source = grammarSentences.length >= 3 ? grammarSentences : [
      { sentence: 'Water reduces friction on wet tiles.', hint: 'Cause & Effect' },
      { sentence: 'Jake walked carefully down the corridor.', hint: 'Adverb' },
      { sentence: 'The nurse carried a bandage to the student.', hint: 'Past Simple' },
      { sentence: 'Rubber soles provide strong grip on the floor.', hint: 'Adjective' },
      { sentence: 'Tom slipped because his shoes were slippery.', hint: 'Cause clause' },
    ];
    const built = buildFillItems(source);
    setItems(built.length >= 3 ? built : [
      { sentence: 'She walked _____down the hall.', answer: 'carefully', options: ['carefully', 'slippery', 'friction', 'rubber'], hint: 'Adverb' },
      { sentence: 'The floor was _____ after the rain.', answer: 'slippery', options: ['slippery', 'careful', 'corridor', 'balanced'], hint: 'Adjective' },
      { sentence: 'Jake picked up the _____ from the bench.', answer: 'bandage', options: ['bandage', 'reduce', 'provide', 'corridor'], hint: 'Noun' },
    ]);
    setCurrent(0);
    setForgeHP(3);
    setCorrect(0);
    setFeedback(null);
    setTimeLeft(duration);
    setStartTime(Date.now());
    setPhase('playing');
  }, [grammarSentences, duration]);

  // ── Timer ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing') return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); endGame(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase]); // eslint-disable-line

  // ── End ───────────────────────────────────────────────────────────────────

  const endGame = useCallback((timeout = false) => {
    clearInterval(timerRef.current);
    const timeTaken = (Date.now() - (startTime || Date.now())) / 1000;
    const total = items.length || 3;
    const earned = calculateStars(correct, total, timeTaken, duration);
    setStars(earned);
    setPhase('result');
    setTimeout(() => {
      onComplete && onComplete(earned, { correct, total, timeTaken });
    }, 2000);
  }, [correct, items, duration, startTime, onComplete]);

  // ── Tap rune ──────────────────────────────────────────────────────────────

  const tapRune = useCallback((option) => {
    if (feedback) return; // locked during feedback
    const item = items[current];
    if (!item) return;

    const isRight = option.toLowerCase() === item.answer.toLowerCase();
    setFeedback({ type: isRight ? 'right' : 'wrong', word: option });

    if (isRight) {
      setCorrect(c => c + 1);
    } else {
      setForgeHP(hp => {
        if (hp <= 1) {
          // No lives left — end
          setTimeout(() => endGame(false), 900);
          return 0;
        }
        return hp - 1;
      });
    }

    setTimeout(() => {
      setFeedback(null);
      const next = current + 1;
      if (next >= items.length) {
        endGame(false);
      } else {
        setCurrent(next);
      }
    }, 900);
  }, [feedback, items, current, endGame]);

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="chronicles-game rune-forge">
        <div className="cg-intro-screen">
          <div className="cg-game-icon">⚗️</div>
          <h2 className="cg-game-title">Rune Forge</h2>
          <p className="cg-game-desc">
            Complete the sentence! Tap the correct rune stone to fill the blank.<br />
            3 mistakes and the forge breaks! ⚒️
          </p>
          <div className="cg-rules">
            <span>⏱ {duration}s</span>
            <span>❤️ 3 HP</span>
            <span>📝 {Math.min(grammarSentences.length || 5, 5)} sentences</span>
          </div>
          <button id="rf-start-btn" className="cg-start-btn" onClick={startGame}>
            ⚡ Start Challenge
          </button>
        </div>
      </div>
    );
  }

  // ─── RESULT ───────────────────────────────────────────────────────────────
  if (phase === 'result') {
    return (
      <div className="chronicles-game rune-forge">
        <div className="cg-result-screen">
          <div className="cg-result-stars">
            {[1, 2, 3].map(n => (
              <span key={n} className={`cg-star ${n <= stars ? 'earned' : 'empty'}`}>★</span>
            ))}
          </div>
          <div className="cg-result-title">
            {stars === 3 ? '⚗️ Master Forger!' : stars === 2 ? '🔥 Forge Complete!' : stars >= 1 ? '🔩 Apprentice Rune!' : '💔 Forge Broken!'}
          </div>
          <div className="cg-result-stats">
            <span>✅ {correct}/{items.length || 3} correct</span>
            <span>❤️ {forgeHP}/3 HP left</span>
          </div>
        </div>
      </div>
    );
  }

  // ─── PLAYING ──────────────────────────────────────────────────────────────
  const item = items[current];
  if (!item) return null;

  const pct = (timeLeft / duration) * 100;
  const timerColor = pct > 50 ? '#10b981' : pct > 25 ? '#f59e0b' : '#ef4444';

  return (
    <div className="chronicles-game rune-forge">
      {/* HUD */}
      <div className="cg-hud">
        <span className="cg-hud-stat correct">✅ {correct}/{items.length}</span>
        <div className="cg-timer-bar-wrap">
          <div className="cg-timer-bar" style={{ width: `${pct}%`, background: timerColor }} />
        </div>
        <span className="cg-hud-timer">{timeLeft}s</span>
        <span className="rf-hp">{'❤️'.repeat(forgeHP)}{'🖤'.repeat(3 - forgeHP)}</span>
      </div>

      {/* Sentence with blank */}
      <div className="rf-sentence-box">
        {item.hint && <div className="rf-hint-label">💡 {item.hint}</div>}
        <div className="rf-sentence">{item.sentence}</div>
        <div className="rf-fill-target">
          Tap the correct rune to fill: <strong>_____</strong>
        </div>
      </div>

      {/* Feedback flash */}
      {feedback && (
        <div className={`cg-feedback ${feedback.type === 'right' ? 'correct' : 'wrong'}`}>
          {feedback.type === 'right' ? `✨ "${feedback.word}" — Correct!` : `❌ "${feedback.word}" — Wrong!`}
        </div>
      )}

      {/* Rune stone options */}
      <div className="rf-runes-grid">
        {item.options.map((opt, i) => {
          const isRight = feedback?.type === 'right' && opt.toLowerCase() === item.answer.toLowerCase();
          const isWrong = feedback?.type === 'wrong' && opt === feedback?.word;
          return (
            <button
              key={`${current}_${i}`}
              id={`rf-rune-${i}`}
              className={`rf-rune-stone ${isRight ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
              style={{ '--rune-color': RUNE_COLORS[i] }}
              onClick={() => tapRune(opt)}
              disabled={!!feedback}
            >
              <span className="rf-rune-glyph">᚛</span>
              <span className="rf-rune-word">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Progress dots */}
      <div className="cg-progress-dots">
        {items.map((_, i) => (
          <span key={i} className={`cg-dot ${i < current ? 'done' : i === current ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}
