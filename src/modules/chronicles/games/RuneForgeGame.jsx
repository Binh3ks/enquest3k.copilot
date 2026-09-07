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
import GameInstructionModal from './GameInstructionModal';
import { HelpCircle } from 'lucide-react';

const STOPWORDS = new Set(['the','a','an','is','are','was','were','be','been','being',
  'and','but','or','not','with','of','in','on','at','to','for','from','by','as','it',
  'its','this','that','he','she','they','we','you','i','me','him','her','us','them']);

function buildFillItems(grammarSentences) {
  const items = [];
  const list = grammarSentences.length > 0 ? grammarSentences : [
    { sentence: 'Friction keeps shoes firmly on the floor.' },
    { sentence: 'Rubber soles have strong grip.' },
    { sentence: 'Water makes the smooth floor very slippery.' },
  ];

  for (const entry of list) {
    const sentence = typeof entry === 'string' ? entry : (entry.sentence || '');
    if (!sentence.trim()) continue;

    const words = sentence.split(/\s+/);
    const candidates = words
      .map((w, i) => ({ w: w.replace(/[^a-zA-Z]/g, '').toLowerCase(), i, raw: w }))
      .filter(({ w }) => w.length > 3 && !STOPWORDS.has(w));

    if (!candidates.length) continue;

    const target = candidates[Math.floor(Math.random() * candidates.length)];
    const displayWord = target.raw.replace(/[^a-zA-Z]/g, '');
    const punctuation = target.raw.replace(/[a-zA-Z]/g, '');

    const displayWords = [...words];
    displayWords[target.i] = `_____${punctuation}`;
    const displaySentence = displayWords.join(' ');

    const otherWords = list
      .map(s => typeof s === 'string' ? s : (s.sentence || ''))
      .join(' ')
      .split(/\s+/)
      .map(w => w.replace(/[^a-zA-Z]/g, '').toLowerCase())
      .filter(w => w.length > 3 && !STOPWORDS.has(w) && w !== displayWord.toLowerCase());

    const shuffledDistractors = [...new Set(otherWords)].sort(() => Math.random() - 0.5).slice(0, 3);
    const fallbacks = ['friction', 'balance', 'danger', 'grip'];
    while (shuffledDistractors.length < 3) {
      const fb = fallbacks.find(f => f !== displayWord.toLowerCase() && !shuffledDistractors.includes(f));
      shuffledDistractors.push(fb || 'motion');
    }

    const options = [displayWord, ...shuffledDistractors].sort(() => Math.random() - 0.5);

    items.push({
      sentence: displaySentence,
      answer: displayWord,
      options,
      fullSentence: sentence,
      hint: typeof entry === 'object' && entry.hint ? entry.hint : '',
    });
  }

  return items.slice(0, 5);
}

export default function RuneForgeGame({
  grammarSentences = [],
  onComplete,
  duration = 60,
}) {
  const [phase, setPhase]     = useState('intro'); // intro | playing | result
  const [items, setItems]     = useState([]);
  const [current, setCurrent] = useState(0);
  const [forgeHP, setForgeHP] = useState(3);       // 3 lives
  const [correct, setCorrect] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [stars, setStars]     = useState(0);
  const [feedback, setFeedback] = useState(null);  // { type: 'right'|'wrong', word }
  const [startTime, setStartTime] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const timerRef = useRef(null);

  // ── Start ─────────────────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    const built = buildFillItems(grammarSentences);
    setItems(built);
    setCurrent(0);
    setForgeHP(3);
    setCorrect(0);
    setTimeLeft(duration);
    setFeedback(null);
    setStartTime(Date.now());
    setPhase('playing');
    setShowHelp(false);
  }, [grammarSentences, duration]);

  // ── Timer ─────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'playing' || showHelp) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          endGame(false, 0);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, showHelp]); // eslint-disable-line

  // ── End Game ──────────────────────────────────────────────────────────────

  const endGame = useCallback((cleared = false, finalHP = forgeHP) => {
    clearInterval(timerRef.current);
    const timeTaken = (Date.now() - (startTime || Date.now())) / 1000;
    const earnedStars = calculateStars(correct + (cleared ? 1 : 0), items.length || 5, timeTaken, duration);
    setStars(finalHP === 0 ? 0 : earnedStars);
    setPhase('result');
  }, [correct, items.length, forgeHP, startTime, duration]);

  // ── Tap Option ────────────────────────────────────────────────────────────

  const pickOption = useCallback((word) => {
    if (feedback) return;
    const item = items[current];
    if (!item) return;

    const isRight = word.toLowerCase() === item.answer.toLowerCase();

    if (isRight) {
      setFeedback({ type: 'right', word });
      const nextCorrect = correct + 1;
      setCorrect(nextCorrect);

      setTimeout(() => {
        setFeedback(null);
        if (current + 1 >= items.length) {
          endGame(true, forgeHP);
        } else {
          setCurrent(c => c + 1);
        }
      }, 700);
    } else {
      setFeedback({ type: 'wrong', word });
      const nextHP = forgeHP - 1;
      setForgeHP(nextHP);

      setTimeout(() => {
        setFeedback(null);
        if (nextHP <= 0) {
          endGame(false, 0);
        } else if (current + 1 >= items.length) {
          endGame(false, nextHP);
        } else {
          setCurrent(c => c + 1);
        }
      }, 900);
    }
  }, [feedback, items, current, correct, forgeHP, endGame]);

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <GameInstructionModal
        isOpen={true}
        isIntro={true}
        gameType="rune_forge"
        onStart={startGame}
      />
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
            {stars === 3 ? '⚗️ MASTER RUNE SMITH!' : stars === 2 ? '🔥 FORGE SUCCESS!' : stars >= 1 ? '🔩 CHALLENGE PASSED!' : '💔 THE FORGE BROKE!'}
          </div>
          <div className="cg-result-stats">
            <span>✅ {correct}/{items.length || 3} Runes Forged</span>
            <span>❤️ {forgeHP}/3 HP Remaining</span>
          </div>
          <div className="cgr-actions" style={{ marginTop: '16px' }}>
            {stars === 0 && <button className="cg-retry-btn" onClick={startGame}>🔄 Retry</button>}
            <button
              className="cg-continue-btn"
              onClick={() => onComplete && onComplete(stars, { correct, forgeHP })}
              disabled={stars === 0}
            >
              {stars > 0 ? '→ Continue' : '🔒 Need at least 1★'}
            </button>
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
      <GameInstructionModal
        isOpen={showHelp}
        isIntro={false}
        gameType="rune_forge"
        onClose={() => setShowHelp(false)}
      />

      {/* HUD */}
      <div className="cg-hud">
        <span className="cg-hud-stat correct">✅ {correct}/{items.length}</span>
        <div className="cg-timer-bar-wrap">
          <div className="cg-timer-bar" style={{ width: `${pct}%`, background: timerColor }} />
        </div>
        <span className="cg-hud-timer">⏱️ {timeLeft}s</span>
        <button
          type="button"
          className="cg-help-trigger-btn"
          onClick={() => setShowHelp(true)}
          title="How to play"
        >
          <HelpCircle size={14} />
          <span>How to Play</span>
        </button>
        <span className="rf-hp">{'❤️'.repeat(forgeHP)}{'🖤'.repeat(3 - forgeHP)}</span>
      </div>

      {/* Sentence with blank */}
      <div className="rf-sentence-box">
        {item.hint && <div className="rf-hint-label">💡 Clue: {item.hint}</div>}
        <div className="rf-sentence">{item.sentence}</div>
        <div className="rf-fill-target">
          Tap the glowing rune with the correct word to fill the blank: <strong>_____</strong>
        </div>
      </div>

      {/* Feedback flash */}
      {feedback && (
        <div className={`cg-feedback ${feedback.type === 'right' ? 'correct' : 'wrong'}`}>
          {feedback.type === 'right' ? `✨ "${feedback.word}" — Correct!` : `❌ "${feedback.word}" — Try again!`}
        </div>
      )}

      {/* Rune stone options */}
      <div className="rf-runes-grid">
        {item.options.map((opt, i) => {
          const isRight = feedback?.type === 'right' && opt.toLowerCase() === item.answer.toLowerCase();
          const isWrong = feedback?.type === 'wrong' && opt === feedback?.word;
          return (
            <button
              key={i}
              id={`rf-rune-${i}`}
              className={`rf-rune-btn ${isRight ? 'rune-correct' : ''} ${isWrong ? 'rune-wrong' : ''}`}
              onClick={() => pickOption(opt)}
              disabled={Boolean(feedback)}
            >
              <span className="rf-rune-icon">⚗️</span>
              <span className="rf-rune-text">{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
