/**
 * BossBattleScreen.jsx — Weekly Boss Battle for The Lexio Chronicles
 *
 * Route: /week/:weekId/chronicles → screen='boss'
 *
 * State machine: 'intro' → 'combat' → 'victory' | 'defeat'
 *
 * Combat: 10-question gauntlet from extractQuestVocab Zone 5 (full-week vocab).
 *   - Each correct → Boss HP drops 10%
 *   - Each wrong   → Player HP drops (bronze: 20%, silver: 15%, gold: 10%)
 *   - Victory if Boss HP = 0 before Player HP = 0
 *   - Defeat: Player HP = 0 → return to map (PP kept, no coins)
 *
 * PP Tier: bronze ≥150 | silver ≥270 | gold ≥360
 * Coins on victory: bronze 30 | silver 60 | gold 100
 */

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { extractQuestVocab } from './extractQuestVocab';
import useChroniclesStore, {
  BOSS_ACCESS_THRESHOLDS,
  COINS_PER_BOSS_DEFEAT,
  getChapterForWeek,
} from '../../stores/useChroniclesStore';
import './BossBattleScreen.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const TOTAL_QUESTIONS  = 10;
const BOSS_HP_START    = 100;
const PLAYER_HP_START  = 100;

const DAMAGE_TO_BOSS   = 10;  // per correct answer
const PLAYER_DAMAGE    = {
  bronze: 20,
  silver: 15,
  gold:   10,
};
const QUESTION_TIME    = 12;  // seconds per question

// ─── Build questions from vocab items ─────────────────────────────────────────

function buildQuestions(vocabItems, grammarSentences) {
  const questions = [];

  // Vocab MCQ (word → definition)
  const vocabPool = vocabItems.filter(v => v.word && v.definition);
  for (const item of vocabPool) {
    const distractors = vocabPool
      .filter(v => v.word !== item.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.definition || v.word);

    if (distractors.length < 3) continue;

    const options = [...distractors, item.definition].sort(() => Math.random() - 0.5);
    questions.push({
      type:    'vocab',
      prompt:  `What does "${item.word}" mean?`,
      answer:  item.definition,
      options,
      hint:    item.type || 'vocabulary',
    });

    if (questions.length >= 6) break;
  }

  // Grammar fill-in from sentences
  const sentPool = (grammarSentences || [])
    .map(s => typeof s === 'string' ? s : (s.sentence || ''))
    .filter(s => s.length > 15);

  for (const sent of sentPool) {
    const words = sent.split(/\s+/).filter(w => w.length > 4);
    if (words.length < 2) continue;

    const targetWord = words[Math.floor(Math.random() * words.length)];
    const clean      = targetWord.replace(/[^a-zA-Z]/g, '');
    const blanked    = sent.replace(targetWord, '_____');

    const otherWords = vocabPool.slice(0, 3).map(v => v.word).filter(w => w !== clean);
    while (otherWords.length < 3) otherWords.push(['quickly', 'carefully', 'strong'][otherWords.length]);

    const options = [...otherWords.slice(0, 3), clean].sort(() => Math.random() - 0.5);
    questions.push({
      type:    'grammar',
      prompt:  blanked,
      answer:  clean,
      options,
      hint:    'Fill in the blank',
    });

    if (questions.length >= TOTAL_QUESTIONS) break;
  }

  // Pad with reverse vocab (definition → word) if needed
  let idx = 0;
  while (questions.length < TOTAL_QUESTIONS && idx < vocabPool.length) {
    const item = vocabPool[idx++];
    const distractors = vocabPool
      .filter(v => v.word !== item.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.word);
    if (distractors.length < 3) continue;

    const options = [...distractors, item.word].sort(() => Math.random() - 0.5);
    questions.push({
      type:    'reverse',
      prompt:  `Which word means: "${item.definition}"?`,
      answer:  item.word,
      options,
      hint:    'Find the word',
    });
  }

  // Fallback hardcoded if still empty
  if (questions.length < 4) {
    return [
      { type: 'vocab', prompt: 'What does "friction" mean?', answer: 'the force that slows sliding', options: ['the force that slows sliding', 'a corridor', 'a warning sign', 'balance'], hint: 'Science' },
      { type: 'vocab', prompt: 'What does "slippery" mean?', answer: 'hard to walk on without falling', options: ['hard to walk on without falling', 'very strong', 'very careful', 'a wet cloth'], hint: 'Adjective' },
      { type: 'grammar', prompt: 'Tom walked _____ down the corridor.', answer: 'carefully', options: ['carefully', 'quickly', 'slippery', 'balanced'], hint: 'Adverb' },
      { type: 'vocab', prompt: 'What does "corridor" mean?', answer: 'a long passage in a building', options: ['a long passage in a building', 'a rubber sole', 'a warning sign', 'a class room'], hint: 'Noun' },
    ];
  }

  return questions.slice(0, TOTAL_QUESTIONS);
}

// ─── HP Bar ───────────────────────────────────────────────────────────────────

function HPBar({ label, hp, maxHp, color, icon }) {
  const pct = Math.max(0, (hp / maxHp) * 100);
  return (
    <div className="bbs-hp-row">
      <span className="bbs-hp-icon">{icon}</span>
      <div className="bbs-hp-bar-wrap">
        <div
          className="bbs-hp-bar"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <span className="bbs-hp-num">{Math.max(0, hp)}%</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BossBattleScreen({
  weekNumber,
  pp,
  weekData,
  onDefeat,
  onBackToMap,
}) {
  const { recordBossDefeat } = useChroniclesStore();
  const chapter = getChapterForWeek(weekNumber);

  // Determine tier
  const tier = pp >= BOSS_ACCESS_THRESHOLDS.gold
    ? 'gold'
    : pp >= BOSS_ACCESS_THRESHOLDS.silver
      ? 'silver'
      : 'bronze';

  // Build questions from full-week vocab (zone 4 = all hubs combined)
  const { vocabItems, grammarSentences } = useMemo(
    () => extractQuestVocab(weekData || {}, 4),
    [weekData]
  );
  const questions = useMemo(
    () => buildQuestions(vocabItems, grammarSentences),
    [vocabItems, grammarSentences]
  );

  // ── State ─────────────────────────────────────────────────────────────────
  const [phase, setPhase]       = useState('intro');   // intro|combat|victory|defeat
  const [current, setCurrent]   = useState(0);
  const [bossHP, setBossHP]     = useState(BOSS_HP_START);
  const [playerHP, setPlayerHP] = useState(PLAYER_HP_START);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [chosen, setChosen]     = useState(null);      // selected option string
  const [feedback, setFeedback] = useState(null);      // 'right' | 'wrong'
  const [correctCount, setCorrectCount] = useState(0);
  const [bossShake, setBossShake] = useState(false);
  const [playerShake, setPlayerShake] = useState(false);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const timerRef = useRef(null);

  // ── Timer per question ────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'combat' || feedback !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null); // timeout = wrong
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, current, feedback]); // eslint-disable-line

  // ── Handle answer ─────────────────────────────────────────────────────────

  const handleAnswer = useCallback((option) => {
    clearInterval(timerRef.current);
    if (feedback) return;

    const q       = questions[current];
    const isRight = option !== null && option.toLowerCase() === q.answer.toLowerCase();
    setChosen(option);
    setFeedback(isRight ? 'right' : 'wrong');

    if (isRight) {
      setCorrectCount(c => c + 1);
      const newBossHP = Math.max(0, bossHP - DAMAGE_TO_BOSS);
      setBossHP(newBossHP);
      setBossShake(true);
      setTimeout(() => setBossShake(false), 500);

      if (newBossHP <= 0) {
        setTimeout(() => endCombat('victory'), 900);
        return;
      }
    } else {
      const dmg       = PLAYER_DAMAGE[tier];
      const newPlayer = Math.max(0, playerHP - dmg);
      setPlayerHP(newPlayer);
      setPlayerShake(true);
      setTimeout(() => setPlayerShake(false), 500);

      if (newPlayer <= 0) {
        setTimeout(() => endCombat('defeat'), 900);
        return;
      }
    }

    // Next question after feedback
    setTimeout(() => {
      setFeedback(null);
      setChosen(null);
      const next = current + 1;
      if (next >= questions.length) {
        endCombat('victory');
      } else {
        setCurrent(next);
        setTimeLeft(QUESTION_TIME);
      }
    }, 1200);
  }, [feedback, current, questions, bossHP, playerHP, tier]); // eslint-disable-line

  const endCombat = useCallback((result) => {
    clearInterval(timerRef.current);
    if (result === 'victory') {
      const coins = COINS_PER_BOSS_DEFEAT[tier] || 30;
      setCoinsEarned(coins);
      recordBossDefeat(weekNumber, tier, coins);
      setPhase('victory');
    } else {
      setPhase('defeat');
    }
  }, [tier, weekNumber, recordBossDefeat]);

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const tierEmoji = tier === 'gold' ? '🥇' : tier === 'silver' ? '🥈' : '🥉';
    const tierLabel = tier === 'gold' ? 'Gold Challenger' : tier === 'silver' ? 'Silver Challenger' : 'Bronze Challenger';
    return (
      <div className={`bbs-screen bbs-theme-${chapter.theme}`}>
        <div className="bbs-intro">
          <div className="bbs-boss-sprite intro-pulse">👾</div>
          <h1 className="bbs-boss-name">⚔️ {chapter.title} Boss</h1>
          <p className="bbs-boss-subtitle">The {chapter.crystal} is within reach!</p>

          <div className="bbs-tier-badge">
            {tierEmoji} You enter as <strong>{tierLabel}</strong>
            <div className="bbs-tier-sub">PP: {pp} — {TOTAL_QUESTIONS} questions await</div>
          </div>

          <div className="bbs-tier-perks">
            {tier === 'gold' && <span>🛡️ Gold: Only -10% HP per mistake</span>}
            {tier === 'silver' && <span>🛡️ Silver: -15% HP per mistake</span>}
            {tier === 'bronze' && <span>🛡️ Bronze: -20% HP per mistake</span>}
          </div>

          <button
            id="bbs-start-btn"
            className="bbs-start-btn"
            onClick={() => setPhase('combat')}
          >
            ⚔️ Enter Boss Battle
          </button>
          <button className="bbs-back-link" onClick={onBackToMap}>
            ← Back to Map
          </button>
        </div>
      </div>
    );
  }

  // ─── VICTORY ─────────────────────────────────────────────────────────────
  if (phase === 'victory') {
    const tierLabel = tier === 'gold' ? 'Gold' : tier === 'silver' ? 'Silver' : 'Bronze';
    return (
      <div className={`bbs-screen bbs-theme-${chapter.theme}`}>
        <div className="bbs-victory">
          <div className="bbs-victory-fireworks">🎆🎇🎆</div>
          <div className="bbs-crystal-reveal">{chapter.crystal === 'Crystal of Speaking' ? '💎' : '🔮'}</div>
          <h1 className="bbs-victory-title">⚔️ Boss Defeated!</h1>
          <p className="bbs-victory-crystal">You earned the<br /><strong>{chapter.crystal}</strong>!</p>

          <div className="bbs-victory-stats">
            <div className="bbs-stat-pill">🎯 {correctCount}/{questions.length} correct</div>
            <div className="bbs-stat-pill">🏅 {tierLabel} Victory</div>
            <div className="bbs-stat-pill">🪙 +{coinsEarned} Lexio Coins</div>
          </div>

          <button
            id="bbs-return-btn"
            className="bbs-return-btn"
            onClick={onBackToMap}
          >
            🗺️ Return to World Map
          </button>
        </div>
      </div>
    );
  }

  // ─── DEFEAT ──────────────────────────────────────────────────────────────
  if (phase === 'defeat') {
    return (
      <div className={`bbs-screen bbs-theme-${chapter.theme}`}>
        <div className="bbs-defeat">
          <div className="bbs-defeat-icon">💔</div>
          <h1 className="bbs-defeat-title">Defeated...</h1>
          <p className="bbs-defeat-msg">
            The Boss was too powerful this time.<br />
            Your PP is safe — practice more and return stronger! 🦊
          </p>
          <div className="bbs-defeat-stats">
            <div className="bbs-stat-pill">🎯 {correctCount}/{questions.length} correct</div>
            <div className="bbs-stat-pill">💀 Boss survived at {bossHP}% HP</div>
          </div>
          <button
            id="bbs-retry-btn"
            className="bbs-retry-btn"
            onClick={() => {
              setBossHP(BOSS_HP_START);
              setPlayerHP(PLAYER_HP_START);
              setCurrent(0);
              setCorrectCount(0);
              setTimeLeft(QUESTION_TIME);
              setFeedback(null);
              setChosen(null);
              setPhase('intro');
            }}
          >
            ⚔️ Try Again
          </button>
          <button className="bbs-back-link" onClick={onBackToMap}>
            ← Back to Map
          </button>
        </div>
      </div>
    );
  }

  // ─── COMBAT ──────────────────────────────────────────────────────────────
  const q   = questions[current];
  const pct = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = pct > 60 ? '#10b981' : pct > 30 ? '#f59e0b' : '#ef4444';

  return (
    <div className={`bbs-screen bbs-theme-${chapter.theme}`}>
      {/* HP Bars */}
      <div className="bbs-hpbars">
        <HPBar label="Boss"   hp={bossHP}   maxHp={BOSS_HP_START}   color="#ef4444" icon="👾" />
        <HPBar label="You"    hp={playerHP} maxHp={PLAYER_HP_START} color="#10b981" icon="🦊" />
      </div>

      {/* Boss sprite */}
      <div className={`bbs-boss-sprite combat ${bossShake ? 'shake' : ''}`}>
        👾
      </div>

      {/* Question counter */}
      <div className="bbs-question-meta">
        <span>Question {current + 1} / {questions.length}</span>
        <span className="bbs-q-type">{q.type === 'vocab' ? '📚 Vocab' : q.type === 'grammar' ? '📝 Grammar' : '🔁 Reverse'}</span>
      </div>

      {/* Timer bar */}
      <div className="bbs-timer-wrap">
        <div className="bbs-timer-bar" style={{ width: `${pct}%`, background: timerColor }} />
        <span className="bbs-timer-num">{timeLeft}s</span>
      </div>

      {/* Question prompt */}
      <div className="bbs-question-box">
        <p className="bbs-question-text">{q.prompt}</p>
        {q.hint && <span className="bbs-question-hint">💡 {q.hint}</span>}
      </div>

      {/* Player shake overlay */}
      {playerShake && <div className="bbs-damage-flash" />}

      {/* Answer options */}
      <div className="bbs-options-grid">
        {q.options.map((opt, i) => {
          const isChosen  = chosen === opt;
          const isCorrect = feedback && opt.toLowerCase() === q.answer.toLowerCase();
          const isWrong   = feedback === 'wrong' && isChosen;
          return (
            <button
              key={`${current}_${i}`}
              id={`bbs-opt-${i}`}
              className={`bbs-option ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${isChosen && feedback === 'right' ? 'selected-right' : ''}`}
              onClick={() => !feedback && handleAnswer(opt)}
              disabled={!!feedback}
            >
              <span className="bbs-opt-letter">{String.fromCharCode(65 + i)}</span>
              <span className="bbs-opt-text">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback overlay */}
      {feedback && (
        <div className={`bbs-feedback ${feedback}`}>
          {feedback === 'right'
            ? `⚡ +${DAMAGE_TO_BOSS}% damage to boss!`
            : `💔 -${PLAYER_DAMAGE[tier]}% to your HP!`}
        </div>
      )}
    </div>
  );
}
