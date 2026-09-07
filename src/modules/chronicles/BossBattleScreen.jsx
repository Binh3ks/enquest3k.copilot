/**
 * BossBattleScreen.jsx — Weekly Boss Battle for The Lexio Chronicles
 *
 * Route: /week/:weekId/chronicles → screen='boss'
 *
 * Phase C upgrade: 5 Rotary Boss Types based on week number.
 *   getBossType(weekNumber) = ((weekNumber - 17) % 5) + 1
 *
 * Boss Types:
 *   1 — Ancient Sorcerer 🧙‍♂️ (Vocab MCQ, Mirror Spell at 50% HP → 5th option)
 *   2 — Stone Golem 🗿     (Grammar fill-in, Stone Shuffle at 30% HP → timer-15%)
 *   3 — Sound Dragon 🐉    (Listen & pick, Dragon Roar at 50% HP → timer-20%)
 *   4 — Cloze Sphinx 🦁   (Fill-in-blank, Riddle Lock at 40% HP → double blank)
 *   5 — Memory Guardian 🔮 (Reverse vocab, Mind Fog at 50% HP → screen fog)
 *
 * State machine:
 *   'intro' → 'boss_speech' → 'combat' → ['ability_trigger'] → 'combat'
 *                                       → 'victory' | 'defeat'
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

// ─── Boss Type Detection ───────────────────────────────────────────────────────

/** Returns 1–5 based on week rotation (W17+). */
export function getBossType(weekNumber) {
  const wk = Math.max(17, weekNumber || 17);
  return ((wk - 17) % 5) + 1;
}

// ─── Boss Type Config ──────────────────────────────────────────────────────────

const BOSS_TYPE_CONFIG = {
  1: {
    sprite:           '🧙‍♂️',
    enragedSprite:    '🧙',
    name:             'Ancient Sorcerer',
    cssClass:         'bbs-boss-sorcerer',
    attackAnim:       'bbs-attack-lightning',
    themeColor:       '#8B5CF6',
    abilityName:      '✨ Mirror Spell',
    abilityThreshold: 50,           // fires when boss HP first drops below 50%
    abilityDesc:      'A 5th decoy option appears! Choose carefully...',
    introLines: [
      "Only the sharpest minds dare face me.",
      "I am woven from ten thousand forgotten words.",
      "Can you see through my illusions, young scholar?",
    ],
  },
  2: {
    sprite:           '🗿',
    enragedSprite:    '🗿',
    name:             'Stone Golem',
    cssClass:         'bbs-boss-golem',
    attackAnim:       'bbs-attack-slam',
    themeColor:       '#78716C',
    abilityName:      '🪨 Stone Shuffle',
    abilityThreshold: 30,
    abilityDesc:      'The Golem enrages! Time limit reduced by 3 seconds!',
    introLines: [
      "My body is built from unbreakable grammar.",
      "Every sentence I speak shakes the ground.",
      "You cannot outrun the rules of language!",
    ],
  },
  3: {
    sprite:           '🐉',
    enragedSprite:    '🔥',
    name:             'Sound Dragon',
    cssClass:         'bbs-boss-dragon',
    attackAnim:       'bbs-attack-fire',
    themeColor:       '#EF4444',
    abilityName:      '🔥 Dragon Roar',
    abilityThreshold: 50,
    abilityDesc:      'The Dragon unleashes a ROAR! 2 seconds stolen from your timer!',
    introLines: [
      "My scales are woven from the music of language.",
      "Every syllable you mispronounce feeds my fire.",
      "Brave enough to face the Dragon of Sound?",
    ],
  },
  4: {
    sprite:           '🦁',
    enragedSprite:    '😾',
    name:             'Cloze Sphinx',
    cssClass:         'bbs-boss-sphinx',
    attackAnim:       'bbs-attack-roar',
    themeColor:       '#F59E0B',
    abilityName:      '🔐 Riddle Lock',
    abilityThreshold: 40,
    abilityDesc:      'The Sphinx locks you in! Harder blanks from here on!',
    introLines: [
      "Answer my riddles, or be turned to stone!",
      "Every blank I carve hides a thousand truths.",
      "The desert wind carries my questions...",
    ],
  },
  5: {
    sprite:           '🔮',
    enragedSprite:    '👁️',
    name:             'Memory Guardian',
    cssClass:         'bbs-boss-guardian',
    attackAnim:       'bbs-attack-pulse',
    themeColor:       '#6366F1',
    abilityName:      '🌫️ Mind Fog',
    abilityDesc:      'Mind Fog descends! The screen dims — stay focused!',
    abilityThreshold: 50,
    introLines: [
      "Your memory is tested here, young one.",
      "I have guarded these crystals for ten thousand years.",
      "Do you truly remember what you have learned?",
    ],
  },
};

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
      // Pre-build a 5th decoy (for Type 1 Mirror Spell ability)
      mirrorDecoy: vocabPool
        .filter(v => v.word !== item.word && !options.includes(v.definition))
        .map(v => v.definition)
        .filter(Boolean)[0] || 'an unexpected trick',
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
      type:       'grammar',
      prompt:     blanked,
      answer:     clean,
      options,
      hint:       'Fill in the blank',
      mirrorDecoy: otherWords[0] || 'maybe',
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
      type:       'reverse',
      prompt:     `Which word means: "${item.definition}"?`,
      answer:     item.word,
      options,
      hint:       'Find the word',
      mirrorDecoy: distractors[0] || 'unknown',
    });
  }

  // Fallback hardcoded if still empty
  if (questions.length < 4) {
    return [
      { type: 'vocab',   prompt: 'What does "friction" mean?',  answer: 'the force that slows sliding', options: ['the force that slows sliding', 'a corridor', 'a warning sign', 'balance'],           hint: 'Science',  mirrorDecoy: 'a sticky surface' },
      { type: 'vocab',   prompt: 'What does "slippery" mean?',  answer: 'hard to walk on without falling', options: ['hard to walk on without falling', 'very strong', 'very careful', 'a wet cloth'], hint: 'Adjective', mirrorDecoy: 'smooth to touch' },
      { type: 'grammar', prompt: 'Tom walked _____ down the corridor.', answer: 'carefully', options: ['carefully', 'quickly', 'slippery', 'balanced'], hint: 'Adverb', mirrorDecoy: 'slowly' },
      { type: 'vocab',   prompt: 'What does "corridor" mean?',  answer: 'a long passage in a building', options: ['a long passage in a building', 'a rubber sole', 'a warning sign', 'a class room'], hint: 'Noun', mirrorDecoy: 'a wide hallway' },
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

// ─── Boss Speech Bubble ────────────────────────────────────────────────────────

function BossSpeechBubble({ line, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 400);
    }, 2800);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line

  return (
    <div className={`bbs-speech-bubble ${visible ? 'visible' : 'hidden'}`}>
      <span className="bbs-speech-tail">▼</span>
      <p>{line}</p>
    </div>
  );
}

// ─── Ability Overlay ──────────────────────────────────────────────────────────

function AbilityOverlay({ bossType, abilityName, abilityDesc, onDone }) {
  const config = BOSS_TYPE_CONFIG[bossType] || BOSS_TYPE_CONFIG[1];

  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line

  return (
    <div className={`bbs-ability-overlay bbs-ability-${bossType}`}>
      <div className="bbs-ability-icon">{config.sprite}</div>
      <div className="bbs-ability-name">{abilityName}</div>
      <div className="bbs-ability-desc">{abilityDesc}</div>
    </div>
  );
}

// ─── Boss Attack Animation ────────────────────────────────────────────────────

function BossAttackFlash({ animClass }) {
  return <div className={`bbs-boss-attack ${animClass}`} />;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function BossBattleScreen({
  weekNumber,
  pp,
  weekData,
  onDefeat,
  onBackToMap,
}) {
  const { recordBossDefeat, defeatBoss } = useChroniclesStore();
  const chapter  = getChapterForWeek(weekNumber);
  const bossType = getBossType(weekNumber);
  const config   = BOSS_TYPE_CONFIG[bossType] || BOSS_TYPE_CONFIG[1];

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
  const [phase, setPhase]               = useState('intro');   // intro|boss_speech|ability_trigger|combat|victory|defeat
  const [speechLineIdx, setSpeechLineIdx] = useState(0);
  const [current, setCurrent]           = useState(0);
  const [bossHP, setBossHP]             = useState(BOSS_HP_START);
  const [playerHP, setPlayerHP]         = useState(PLAYER_HP_START);
  const [timeLeft, setTimeLeft]         = useState(QUESTION_TIME);
  const [chosen, setChosen]             = useState(null);
  const [feedback, setFeedback]         = useState(null);      // 'right' | 'wrong'
  const [correctCount, setCorrectCount] = useState(0);
  const [bossShake, setBossShake]       = useState(false);
  const [playerShake, setPlayerShake]   = useState(false);
  const [coinsEarned, setCoinsEarned]   = useState(0);
  const [abilityTriggered, setAbilityTriggered] = useState(false);
  const [showAbility, setShowAbility]   = useState(false);
  const [isEnraged, setIsEnraged]       = useState(false);     // Boss sprite changes
  const [mirrorActive, setMirrorActive] = useState(false);     // Type 1: 5th option
  const [fogActive, setFogActive]       = useState(false);     // Type 5: Mind Fog
  const [timerPenalty, setTimerPenalty] = useState(0);         // Type 2/3 timer reduction
  const [showAttack, setShowAttack]     = useState(false);
  const timerRef = useRef(null);

  // Effective time limit (shrinks after Type 2/3 ability)
  const effectiveTimeLimit = Math.max(5, QUESTION_TIME - timerPenalty);

  // ── Boss speech sequence ──────────────────────────────────────────────────

  const advanceSpeech = useCallback(() => {
    const lines = config.introLines;
    const next = speechLineIdx + 1;
    if (next >= lines.length) {
      setPhase('combat');
    } else {
      setSpeechLineIdx(next);
    }
  }, [speechLineIdx, config.introLines]);

  // ── Timer per question ────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'combat' || feedback !== null) return;
    setTimeLeft(effectiveTimeLimit);
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
  }, [phase, current, feedback, effectiveTimeLimit]); // eslint-disable-line

  // ── Trigger special ability ────────────────────────────────────────────────

  const triggerAbility = useCallback(() => {
    setAbilityTriggered(true);
    setShowAbility(true);
    setIsEnraged(true);

    // Type-specific effects (applied after overlay closes)
    setTimeout(() => {
      setShowAbility(false);
      if (bossType === 1) setMirrorActive(true);   // Mirror Spell: 5th option
      if (bossType === 2) setTimerPenalty(3);       // Stone Shuffle: -3s timer
      if (bossType === 3) setTimerPenalty(2);       // Dragon Roar: -2s timer
      if (bossType === 5) setFogActive(true);       // Mind Fog: dim overlay
    }, 2700);
  }, [bossType]);

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

      // Check ability trigger
      if (!abilityTriggered && newBossHP < config.abilityThreshold) {
        triggerAbility();
      }

      if (newBossHP <= 0) {
        setTimeout(() => endCombat('victory'), 900);
        return;
      }
    } else {
      // Boss attacks!
      setShowAttack(true);
      setTimeout(() => setShowAttack(false), 600);

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
        setTimeLeft(effectiveTimeLimit);
      }
    }, 1200);
  }, [feedback, current, questions, bossHP, playerHP, tier, abilityTriggered, config.abilityThreshold, effectiveTimeLimit, triggerAbility]); // eslint-disable-line

  const endCombat = useCallback((result) => {
    clearInterval(timerRef.current);
    if (result === 'victory') {
      const coins = COINS_PER_BOSS_DEFEAT[tier] || 30;
      setCoinsEarned(coins);
      if (typeof recordBossDefeat === 'function') {
        recordBossDefeat(weekNumber, tier, coins);
      } else if (typeof defeatBoss === 'function') {
        defeatBoss(weekNumber, tier);
      }
      setPhase('victory');
    } else {
      setPhase('defeat');
    }
  }, [tier, weekNumber, recordBossDefeat, defeatBoss]);

  // ─── Helper: build options for current question ────────────────────────────

  const getOptions = useCallback((q) => {
    if (!q) return [];
    // Type 1 Mirror Spell: add 5th decoy when mirrorActive
    if (bossType === 1 && mirrorActive && q.mirrorDecoy && !q.options.includes(q.mirrorDecoy)) {
      return [...q.options, q.mirrorDecoy].sort(() => Math.random() - 0.5);
    }
    return q.options;
  }, [bossType, mirrorActive]);

  // ─── INTRO ────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    const tierEmoji = tier === 'gold' ? '🥇' : tier === 'silver' ? '🥈' : '🥉';
    const tierLabel = tier === 'gold' ? 'Gold Challenger' : tier === 'silver' ? 'Silver Challenger' : 'Bronze Challenger';
    return (
      <div className={`bbs-screen bbs-theme-${chapter.theme}`}>
        <div className="bbs-intro">
          <div className={`bbs-boss-sprite intro-pulse ${config.cssClass}`}>
            {config.sprite}
          </div>
          <h1 className="bbs-boss-name" style={{ '--boss-color': config.themeColor }}>
            ⚔️ {config.name}
          </h1>
          <p className="bbs-boss-subtitle">{chapter.title} — {chapter.crystal}</p>

          <div className="bbs-boss-type-badge" style={{ borderColor: config.themeColor }}>
            <span style={{ color: config.themeColor }}>Boss Type {bossType}</span>
            <span className="bbs-ability-teaser">
              ⚡ Special: {config.abilityName}
            </span>
          </div>

          <div className="bbs-tier-badge">
            {tierEmoji} You enter as <strong>{tierLabel}</strong>
            <div className="bbs-tier-sub">PP: {pp} — {TOTAL_QUESTIONS} questions await</div>
          </div>

          <div className="bbs-tier-perks">
            {tier === 'gold'   && <span>🛡️ Gold: Only -10% HP per mistake</span>}
            {tier === 'silver' && <span>🛡️ Silver: -15% HP per mistake</span>}
            {tier === 'bronze' && <span>🛡️ Bronze: -20% HP per mistake</span>}
          </div>

          <button
            id="bbs-start-btn"
            className="bbs-start-btn"
            style={{ '--boss-color': config.themeColor }}
            onClick={() => setPhase('boss_speech')}
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

  // ─── BOSS SPEECH ─────────────────────────────────────────────────────────
  if (phase === 'boss_speech') {
    return (
      <div className={`bbs-screen bbs-theme-${chapter.theme}`}>
        <div className="bbs-speech-screen">
          <div className={`bbs-boss-sprite-large ${config.cssClass} boss-idle`}>
            {config.sprite}
          </div>
          <div className="bbs-boss-speech-name" style={{ color: config.themeColor }}>
            {config.name}
          </div>
          <BossSpeechBubble
            key={speechLineIdx}
            line={config.introLines[speechLineIdx]}
            onDone={advanceSpeech}
          />
          <button className="bbs-skip-speech" onClick={() => setPhase('combat')}>
            Skip ▶
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
          <p className="bbs-victory-crystal">
            <span style={{ color: config.themeColor, fontWeight: 900 }}>{config.name}</span> falls!
            <br />You earned the <strong>{chapter.crystal}</strong>!
          </p>

          <div className="bbs-victory-stats">
            <div className="bbs-stat-pill">🎯 {correctCount}/{questions.length} correct</div>
            <div className="bbs-stat-pill">🏅 {tierLabel} Victory</div>
            <div className="bbs-stat-pill">🪙 +{coinsEarned} Lexio Coins</div>
            {abilityTriggered && <div className="bbs-stat-pill">⚡ Survived {config.abilityName}!</div>}
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
          <div className="bbs-defeat-boss-sprite">{config.sprite}</div>
          <div className="bbs-defeat-icon">💔</div>
          <h1 className="bbs-defeat-title">Defeated...</h1>
          <p className="bbs-defeat-msg">
            <span style={{ color: config.themeColor }}>{config.name}</span> was too powerful this time.
            <br />Your PP is safe — practice more and return stronger! 🦊
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
              setAbilityTriggered(false);
              setShowAbility(false);
              setIsEnraged(false);
              setMirrorActive(false);
              setFogActive(false);
              setTimerPenalty(0);
              setSpeechLineIdx(0);
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
  const q          = questions[current];
  const options    = getOptions(q);
  const pct        = (timeLeft / effectiveTimeLimit) * 100;
  const timerColor = pct > 60 ? '#10b981' : pct > 30 ? '#f59e0b' : '#ef4444';
  const currentSprite = isEnraged ? config.enragedSprite : config.sprite;

  return (
    <div className={`bbs-screen bbs-theme-${chapter.theme} ${fogActive ? 'bbs-fog-active' : ''}`}>

      {/* Fog overlay for Type 5 */}
      {fogActive && <div className="bbs-fog-overlay" />}

      {/* Ability Overlay */}
      {showAbility && (
        <AbilityOverlay
          bossType={bossType}
          abilityName={config.abilityName}
          abilityDesc={config.abilityDesc}
          onDone={() => setShowAbility(false)}
        />
      )}

      {/* Boss attack flash */}
      {showAttack && <BossAttackFlash animClass={config.attackAnim} />}

      {/* HP Bars */}
      <div className="bbs-hpbars">
        <HPBar label="Boss"  hp={bossHP}   maxHp={BOSS_HP_START}   color={config.themeColor} icon={currentSprite} />
        <HPBar label="You"   hp={playerHP} maxHp={PLAYER_HP_START} color="#10b981"            icon="🦊" />
      </div>

      {/* Boss sprite */}
      <div className={`bbs-boss-sprite combat ${config.cssClass} ${bossShake ? 'shake' : ''} ${isEnraged ? 'enraged' : ''}`}>
        {currentSprite}
      </div>

      {/* Ability active indicator */}
      {abilityTriggered && !showAbility && (
        <div className="bbs-ability-active-badge" style={{ color: config.themeColor }}>
          ⚡ {config.abilityName} active!
        </div>
      )}

      {/* Question counter */}
      <div className="bbs-question-meta">
        <span>Question {current + 1} / {questions.length}</span>
        <span className="bbs-q-type">
          {q.type === 'vocab' ? '📚 Vocab' : q.type === 'grammar' ? '📝 Grammar' : '🔁 Reverse'}
        </span>
        {isEnraged && (
          <span className="bbs-enrage-badge" style={{ color: config.themeColor }}>
            🔥 ENRAGED
          </span>
        )}
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

      {/* Player shake / damage overlay */}
      {playerShake && <div className="bbs-damage-flash" />}

      {/* Answer options — adapts to 5 options when Mirror Spell is active */}
      <div className={`bbs-options-grid ${options.length === 5 ? 'bbs-options-5' : ''}`}>
        {options.map((opt, i) => {
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
