/**
 * ChapterFinalBossScreen.jsx — Chapter Final Boss Battle
 *
 * Unlocks after: All 8 weeks in a Chapter have ≥1 Weekly Boss defeated
 *               AND 4/4 Boss Fragments collected.
 *
 * State machine:
 *   'ritual' → 'phase1' → [phase_transition] → 'phase2' → [phase_transition]
 *            → 'phase3' → 'crystal_forge' → 'victory'
 *
 * HP Phases:
 *   Phase 1: Boss 100% → 60%  (15 questions, standard)
 *   Phase 2: Boss  60% → 30%  (15 questions, ENRAGED — mixed types, 10s timer)
 *   Phase 3: Boss  30% →  0%  (10 questions, FINAL STAND — all abilities, red vignette)
 *
 * Rewards: +500 XP, +200 Lexio Coins, Chapter Crystal NFT
 */

import React, {
  useState, useEffect, useCallback, useRef, useMemo,
} from 'react';
import { extractQuestVocab } from './extractQuestVocab';
import useChroniclesStore, {
  CHAPTER_CONFIG,
  getChapterForWeek,
} from '../../stores/useChroniclesStore';
import { getBossType, BOSS_TYPE_CONFIG as WEEKLY_BOSS_CONFIG } from './BossBattleScreen';
import './ChapterFinalBossScreen.css';

// ─── Constants ────────────────────────────────────────────────────────────────

const BOSS_HP_START    = 100;
const PLAYER_HP_START  = 100;

const PHASE_THRESHOLDS = { phase2: 60, phase3: 30 };

const QUESTIONS_PER_PHASE = { phase1: 15, phase2: 15, phase3: 10 };
const TIMER_PER_PHASE     = { phase1: 15, phase2: 10, phase3: 10 };
const DAMAGE_TO_BOSS      = {
  phase1: Math.ceil(100 / 15),   // ~6-7% per correct answer
  phase2: Math.ceil(100 / 15),
  phase3: Math.ceil(100 / 10),   // ~10% per correct answer
};

const PLAYER_DAMAGE = { bronze: 15, silver: 10, gold: 8 };

const COINS_VICTORY    = 200;
const XP_VICTORY       = 500;
const FRAGMENTS_NEEDED = 4;

// ─── Chapter Final Boss Names ──────────────────────────────────────────────────

const CHAPTER_FINAL_BOSS = {
  1: { name: 'Archivist Supreme',   sprite: '📚',   enraged: '🌌',  theme: 'library', desc: 'Guardian of the Grand Library',   abilityName: '📖 Word Storm'    },
  2: { name: 'Tidal Overlord',      sprite: '🌊',   enraged: '⛈️', theme: 'ocean',   desc: 'Sovereign of the Aqua Vault',     abilityName: '🌊 Tidal Surge'   },
  3: { name: 'Storm Titan Prime',   sprite: '⚡',   enraged: '🔥',  theme: 'storm',   desc: 'Lord of the Storm Tower',         abilityName: '⚡ Thunder Chain' },
  4: { name: 'Ancient Grove Warden',sprite: '🌿',   enraged: '🌳',  theme: 'forest',  desc: 'Keeper of the Ancient Greenhouse',abilityName: '🌿 Root Lock'     },
  5: { name: 'Forge Colossus',      sprite: '🔥',   enraged: '⚒️',  theme: 'forge',   desc: 'Master of the Forge of Words',    abilityName: '🔥 Lava Wall'     },
  6: { name: 'Cosmic Overseer',     sprite: '🌌',   enraged: '🌠',  theme: 'space',   desc: 'Ruler of the Observatory',        abilityName: '🌌 Gravity Crush' },
  7: { name: 'Grand Throne Tyrant', sprite: '👑',   enraged: '💀',  theme: 'throne',  desc: 'Sovereign of the Throne of Mastery',abilityName:'👑 Final Decree'},
};

// ─── Build Questions ──────────────────────────────────────────────────────────

function buildAllQuestions(vocabItems, grammarSentences) {
  const vocabPool = (vocabItems || []).filter(v => v.word && v.definition);
  const sentPool  = (grammarSentences || [])
    .map(s => typeof s === 'string' ? s : (s.sentence || ''))
    .filter(s => s.length > 15);

  const all = [];

  // Vocab MCQ
  for (const item of vocabPool) {
    const distractors = vocabPool
      .filter(v => v.word !== item.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.definition || v.word);
    if (distractors.length < 3) continue;
    all.push({
      type:   'vocab',
      prompt: `What does "${item.word}" mean?`,
      answer: item.definition,
      options: [...distractors, item.definition].sort(() => Math.random() - 0.5),
      hint:   item.type || 'Vocabulary',
    });
  }

  // Grammar fill-in
  for (const sent of sentPool) {
    const words = sent.split(/\s+/).filter(w => w.length > 4);
    if (words.length < 2) continue;
    const target = words[Math.floor(Math.random() * words.length)];
    const clean  = target.replace(/[^a-zA-Z]/g, '');
    const blank  = sent.replace(target, '_____');
    const others = vocabPool.slice(0, 3).map(v => v.word).filter(w => w !== clean);
    while (others.length < 3) others.push(['quickly', 'carefully', 'strong'][others.length]);
    all.push({
      type:   'grammar',
      prompt: blank,
      answer: clean,
      options: [...others.slice(0, 3), clean].sort(() => Math.random() - 0.5),
      hint:   'Fill in the blank',
    });
  }

  // Reverse vocab
  for (const item of vocabPool) {
    const dis = vocabPool
      .filter(v => v.word !== item.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(v => v.word);
    if (dis.length < 3) continue;
    all.push({
      type:   'reverse',
      prompt: `Which word means: "${item.definition}"?`,
      answer: item.word,
      options: [...dis, item.word].sort(() => Math.random() - 0.5),
      hint:   'Find the word',
    });
  }

  // Shuffle entire pool
  return all.sort(() => Math.random() - 0.5);
}

function slicePhase(all, phase) {
  const counts = QUESTIONS_PER_PHASE;
  if (phase === 'phase1') return all.slice(0, counts.phase1);
  if (phase === 'phase2') return all.slice(counts.phase1, counts.phase1 + counts.phase2);
  return all.slice(counts.phase1 + counts.phase2, counts.phase1 + counts.phase2 + counts.phase3);
}

// ─── HP Bar ───────────────────────────────────────────────────────────────────

function HPBar({ label, hp, maxHp, color, icon }) {
  const pct = Math.max(0, Math.min(100, (hp / maxHp) * 100));
  return (
    <div className="cfb-hp-row">
      <span className="cfb-hp-icon">{icon}</span>
      <div className="cfb-hp-bar-wrap">
        <div className="cfb-hp-bar" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="cfb-hp-num">{Math.max(0, Math.round(hp))}%</span>
    </div>
  );
}

// ─── Phase Transition Flash ───────────────────────────────────────────────────

function PhaseTransition({ phase, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line

  const labels = {
    phase2: ['⚡ BOSS ENRAGED!', 'Phase 2 — The Storm Wakes'],
    phase3: ['🔥 FINAL STAND!',  'Phase 3 — No Mercy'],
  };
  const [title, sub] = labels[phase] || ['', ''];

  return (
    <div className={`cfb-phase-transition cfb-pt-${phase}`}>
      <div className="cfb-pt-flash" />
      <div className="cfb-pt-content">
        <div className="cfb-pt-title">{title}</div>
        <div className="cfb-pt-sub">{sub}</div>
      </div>
    </div>
  );
}

// ─── Crystal Forge Ceremony ───────────────────────────────────────────────────

function CrystalForgeCeremony({ chapter, onDone }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timings = [400, 1000, 2000, 3200, 4200, 5500];
    const timers  = timings.map((ms, i) => setTimeout(() => setStep(i + 1), ms));
    const done    = setTimeout(onDone, 7000);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, []); // eslint-disable-line

  return (
    <div className="cfb-forge-ceremony">
      {/* Step 1: Boss shatter */}
      {step >= 1 && (
        <div className="cfb-boss-shatter">
          <span className="cfb-shatter-sprite">💥</span>
        </div>
      )}

      {/* Step 2: 4 fragments fly in from corners */}
      {step >= 2 && (
        <div className="cfb-fragments-wrap">
          {['⚡','⚡','⚡','⚡'].map((f, i) => (
            <div key={i} className={`cfb-fragment cfb-frag-${i}`}>{f}</div>
          ))}
        </div>
      )}

      {/* Step 3: Fragment merge flash */}
      {step >= 3 && <div className="cfb-merge-flash" />}

      {/* Step 4: Crystal materializes */}
      {step >= 4 && (
        <div className="cfb-crystal-materialize">
          <div className="cfb-crystal-icon crystal-forge-flash">💎</div>
          <div className="cfb-crystal-rays" />
        </div>
      )}

      {/* Step 5: Text crawl */}
      {step >= 5 && (
        <div className="cfb-forge-text">
          <div className="cfb-forge-chapter">Chapter {chapter.id} Complete!</div>
          <div className="cfb-forge-crystal">You have forged the</div>
          <div className="cfb-forge-crystal-name">{chapter.crystal}!</div>
        </div>
      )}

      {/* Step 6: Reward shower */}
      {step >= 6 && (
        <div className="cfb-reward-shower">
          <div className="cfb-reward-pill">⚡ +{XP_VICTORY} XP</div>
          <div className="cfb-reward-pill">🪙 +{COINS_VICTORY} Coins</div>
          <div className="cfb-reward-pill">💎 Crystal Forged!</div>
        </div>
      )}
    </div>
  );
}

// ─── Ritual Intro Screen ──────────────────────────────────────────────────────

function RitualScreen({ chapter, finalBoss, fragments, onBegin }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setStep(1), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`cfb-screen cfb-theme-${finalBoss.theme}`}>
      <div className="cfb-ritual">
        {/* Fragment display */}
        <div className={`cfb-ritual-fragments ${step >= 1 ? 'visible' : ''}`}>
          {Array.from({ length: FRAGMENTS_NEEDED }, (_, i) => (
            <div key={i} className={`cfb-ritual-frag ${i < fragments ? 'collected' : 'empty'}`}>
              {i < fragments ? '⚡' : '○'}
            </div>
          ))}
          <div className="cfb-ritual-frag-label">{fragments}/{FRAGMENTS_NEEDED} Fragments</div>
        </div>

        {/* Boss sprite */}
        <div className="cfb-ritual-boss-sprite">{finalBoss.sprite}</div>

        <h1 className="cfb-ritual-title">⚔️ {finalBoss.name}</h1>
        <p className="cfb-ritual-desc">{finalBoss.desc}</p>
        <p className="cfb-ritual-chapter">{chapter.title}</p>

        <div className="cfb-ritual-phase-preview">
          <div className="cfb-pp-phase">Phase 1 — Standard (15 questions)</div>
          <div className="cfb-pp-phase cfb-pp-p2">Phase 2 — Enraged (15 questions, 10s timer)</div>
          <div className="cfb-pp-phase cfb-pp-p3">Phase 3 — Final Stand (10 questions)</div>
        </div>

        <div className="cfb-ritual-reward-teaser">
          Victory: <strong>+{XP_VICTORY} XP · +{COINS_VICTORY} Coins · {chapter.crystal} 💎</strong>
        </div>

        <button
          id="cfb-begin-btn"
          className="cfb-begin-btn"
          onClick={onBegin}
        >
          ⚔️ Begin Chapter Battle
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChapterFinalBossScreen({
  chapterId,
  weekNumber,
  pp,
  weekData,
  onBackToMap,
}) {
  const { addBonusCoins, chapterBossCompleted, recordChapterBossDefeat } = useChroniclesStore();
  const chapter   = CHAPTER_CONFIG.find(c => c.id === chapterId)
                    || getChapterForWeek(weekNumber || 33);
  const finalBoss = CHAPTER_FINAL_BOSS[chapter.id] || CHAPTER_FINAL_BOSS[3];

  // Derive fragments count from store (supports both 'chapterN' and 'cN' keys)
  const fragments = useChroniclesStore(s =>
    Math.min(
      s.bossFragments?.[`chapter${chapter.id}`] ?? s.bossFragments?.[`c${chapter.id}`] ?? 0,
      FRAGMENTS_NEEDED
    )
  );

  // Tier based on pp
  const tier = pp >= 360 ? 'gold' : pp >= 270 ? 'silver' : 'bronze';

  // Build full question pool from week data
  const { vocabItems, grammarSentences } = useMemo(
    () => extractQuestVocab(weekData || {}, 4),
    [weekData]
  );
  const allQuestions = useMemo(
    () => buildAllQuestions(vocabItems, grammarSentences),
    [vocabItems, grammarSentences]
  );
  const phase1Q = useMemo(() => slicePhase(allQuestions, 'phase1'), [allQuestions]);
  const phase2Q = useMemo(() => slicePhase(allQuestions, 'phase2'), [allQuestions]);
  const phase3Q = useMemo(() => slicePhase(allQuestions, 'phase3'), [allQuestions]);

  // ── State ──────────────────────────────────────────────────────────────────
  const [phase, setPhase]                   = useState('ritual');
  const [combatPhase, setCombatPhase]       = useState('phase1');   // 'phase1'|'phase2'|'phase3'
  const [transitioning, setTransitioning]   = useState(false);
  const [nextCombatPhase, setNextCombatPhase] = useState(null);
  const [current, setCurrent]               = useState(0);
  const [bossHP, setBossHP]                 = useState(BOSS_HP_START);
  const [playerHP, setPlayerHP]             = useState(PLAYER_HP_START);
  const [timeLeft, setTimeLeft]             = useState(TIMER_PER_PHASE.phase1);
  const [chosen, setChosen]                 = useState(null);
  const [feedback, setFeedback]             = useState(null);
  const [correctCount, setCorrectCount]     = useState(0);
  const [bossShake, setBossShake]           = useState(false);
  const [playerShake, setPlayerShake]       = useState(false);
  const [isEnraged, setIsEnraged]           = useState(false);
  const [showVignette, setShowVignette]     = useState(false);
  const [overdriveUsed, setOverdriveUsed]   = useState(false);
  const [overdriveActive, setOverdriveActive] = useState(false);
  const [showAttack, setShowAttack]         = useState(false);
  const timerRef = useRef(null);

  const currentPhaseQ = combatPhase === 'phase1' ? phase1Q
                      : combatPhase === 'phase2' ? phase2Q
                      : phase3Q;
  const q = currentPhaseQ[current] || null;
  const timerLimit = TIMER_PER_PHASE[combatPhase] || 15;

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase !== 'combat' || feedback !== null || transitioning) return;
    setTimeLeft(timerLimit);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleAnswer(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, combatPhase, current, feedback, transitioning]); // eslint-disable-line

  // ── Overdrive: auto-offer when player HP ≤ 20% in phase3 ──────────────────

  useEffect(() => {
    if (combatPhase === 'phase3' && playerHP <= 20 && !overdriveUsed) {
      // Overlay is shown in JSX via the playerHP check
    }
  }, [combatPhase, playerHP, overdriveUsed]);

  // ── Handle answer ──────────────────────────────────────────────────────────

  const handleAnswer = useCallback((option) => {
    clearInterval(timerRef.current);
    if (feedback) return;
    if (!q) return;

    const isRight = option !== null && option.toLowerCase() === q.answer.toLowerCase();
    setChosen(option);
    setFeedback(isRight ? 'right' : 'wrong');

    const dmgPerCorrect = DAMAGE_TO_BOSS[combatPhase] || 7;

    if (isRight) {
      setCorrectCount(c => c + 1);
      const newBossHP = Math.max(0, bossHP - dmgPerCorrect);
      setBossHP(newBossHP);
      setBossShake(true);
      setTimeout(() => setBossShake(false), 500);

      if (newBossHP <= 0) {
        setTimeout(() => setPhase('crystal_forge'), 900);
        return;
      }
    } else {
      setShowAttack(true);
      setTimeout(() => setShowAttack(false), 700);

      const dmg       = overdriveActive ? 0 : PLAYER_DAMAGE[tier];
      const newPlayer = Math.max(0, playerHP - dmg);
      setPlayerHP(newPlayer);
      setPlayerShake(true);
      setTimeout(() => setPlayerShake(false), 500);
      if (overdriveActive) setOverdriveActive(false); // shield consumed per hit

      if (newPlayer <= 0) {
        setTimeout(() => setPhase('defeat'), 900);
        return;
      }
    }

    setTimeout(() => {
      setFeedback(null);
      setChosen(null);
      const next = current + 1;
      const phaseLen = currentPhaseQ.length;

      if (next >= phaseLen) {
        // Phase complete — advance to next
        if (combatPhase === 'phase1') {
          triggerPhaseTransition('phase2');
        } else if (combatPhase === 'phase2') {
          triggerPhaseTransition('phase3');
        } else {
          // Phase 3 done — if boss still alive, victory (answered everything)
          setTimeout(() => setPhase('crystal_forge'), 400);
        }
      } else {
        setCurrent(next);
        setTimeLeft(timerLimit);
      }
    }, 1300);
  }, [feedback, current, q, bossHP, playerHP, tier, combatPhase, currentPhaseQ, timerLimit, overdriveActive]); // eslint-disable-line

  // ── Phase Transition ───────────────────────────────────────────────────────

  const triggerPhaseTransition = useCallback((nextPhase) => {
    clearInterval(timerRef.current);
    setTransitioning(true);
    setNextCombatPhase(nextPhase);

    setTimeout(() => {
      setCombatPhase(nextPhase);
      setCurrent(0);
      setTransitioning(false);
      setNextCombatPhase(null);
      if (nextPhase === 'phase2') {
        setIsEnraged(true);
        setTimeLeft(TIMER_PER_PHASE.phase2);
      }
      if (nextPhase === 'phase3') {
        setShowVignette(true);
        setTimeLeft(TIMER_PER_PHASE.phase3);
      }
    }, 1900);
  }, []);

  // ── Overdrive Activation ───────────────────────────────────────────────────

  const activateOverdrive = useCallback(() => {
    setOverdriveUsed(true);
    setOverdriveActive(true);
    // Restore 20 HP
    setPlayerHP(p => Math.min(PLAYER_HP_START, p + 20));
  }, []);

  // ── Record Victory ─────────────────────────────────────────────────────────

  useEffect(() => {
    if (phase === 'crystal_forge') {
      addBonusCoins(COINS_VICTORY);
      if (typeof recordChapterBossDefeat === 'function') {
        recordChapterBossDefeat(chapter.id);
      } else {
        useChroniclesStore.setState(s => ({
          chapterBossCompleted: {
            ...s.chapterBossCompleted,
            [`chapter${chapter.id}`]: true,
            [`c${chapter.id}`]: true,
          },
        }));
      }
    }
  }, [phase]); // eslint-disable-line

  // ─── RITUAL ───────────────────────────────────────────────────────────────
  if (phase === 'ritual') {
    return (
      <RitualScreen
        chapter={chapter}
        finalBoss={finalBoss}
        fragments={fragments}
        onBegin={() => setPhase('combat')}
      />
    );
  }

  // ─── CRYSTAL FORGE ────────────────────────────────────────────────────────
  if (phase === 'crystal_forge') {
    return (
      <div className={`cfb-screen cfb-theme-${finalBoss.theme}`}>
        <CrystalForgeCeremony
          chapter={chapter}
          onDone={() => setPhase('victory')}
        />
      </div>
    );
  }

  // ─── VICTORY ──────────────────────────────────────────────────────────────
  if (phase === 'victory') {
    const nextChapter = CHAPTER_CONFIG.find(c => c.id === chapter.id + 1);
    return (
      <div className={`cfb-screen cfb-theme-${finalBoss.theme}`}>
        <div className="cfb-victory">
          <div className="cfb-victory-fireworks">🎆🎇🎆🎇🎆</div>
          <div className="cfb-victory-crystal">💎</div>
          <h1 className="cfb-victory-title">Chapter {chapter.id} Mastered!</h1>
          <p className="cfb-victory-crystal-name">{chapter.crystal} Forged!</p>

          <div className="cfb-victory-stats">
            <div className="cfb-stat-pill">🎯 {correctCount} correct answers</div>
            <div className="cfb-stat-pill">⚡ +{XP_VICTORY} XP</div>
            <div className="cfb-stat-pill">🪙 +{COINS_VICTORY} Coins</div>
            {overdriveUsed && <div className="cfb-stat-pill">🔰 Overdrive Activated!</div>}
          </div>

          {nextChapter && (
            <div className="cfb-next-chapter-teaser">
              🌟 Chapter {nextChapter.id}: <strong>{nextChapter.title}</strong> unlocks soon!
            </div>
          )}

          <button
            id="cfb-return-btn"
            className="cfb-return-btn"
            onClick={onBackToMap}
          >
            🗺️ Return to World Map
          </button>
        </div>
      </div>
    );
  }

  // ─── DEFEAT ───────────────────────────────────────────────────────────────
  if (phase === 'defeat') {
    return (
      <div className={`cfb-screen cfb-theme-${finalBoss.theme}`}>
        <div className="cfb-defeat">
          <div className="cfb-defeat-sprite">{finalBoss.sprite}</div>
          <div className="cfb-defeat-icon">💔</div>
          <h1 className="cfb-defeat-title">Defeated by the Final Boss</h1>
          <p className="cfb-defeat-msg">
            <strong>{finalBoss.name}</strong> was too powerful this time.
            <br />Keep practicing and return with full power! 🦊
          </p>
          <div className="cfb-defeat-stats">
            <div className="cfb-stat-pill">🎯 {correctCount} correct</div>
            <div className="cfb-stat-pill">💀 Boss at {Math.max(0, Math.round(bossHP))}% HP</div>
            <div className="cfb-stat-pill">Reached {combatPhase === 'phase1' ? 'Phase 1' : combatPhase === 'phase2' ? 'Phase 2 ⚡' : 'Phase 3 🔥'}</div>
          </div>
          <button id="cfb-retry-btn" className="cfb-retry-btn" onClick={() => {
            setBossHP(BOSS_HP_START);
            setPlayerHP(PLAYER_HP_START);
            setCurrent(0);
            setCorrectCount(0);
            setFeedback(null);
            setChosen(null);
            setIsEnraged(false);
            setShowVignette(false);
            setOverdriveUsed(false);
            setOverdriveActive(false);
            setTransitioning(false);
            setCombatPhase('phase1');
            setPhase('ritual');
          }}>⚔️ Try Again</button>
          <button className="cfb-back-link" onClick={onBackToMap}>← Back to Map</button>
        </div>
      </div>
    );
  }

  // ─── COMBAT ───────────────────────────────────────────────────────────────
  const pct        = q ? (timeLeft / timerLimit) * 100 : 0;
  const timerColor = pct > 60 ? '#10b981' : pct > 30 ? '#f59e0b' : '#ef4444';
  const bossSprite = isEnraged ? finalBoss.enraged : finalBoss.sprite;

  const phaseLabel = combatPhase === 'phase1' ? 'Phase 1'
                   : combatPhase === 'phase2' ? '⚡ Phase 2 — ENRAGED'
                   : '🔥 Phase 3 — FINAL STAND';

  const bossHPColor = bossHP > 60 ? '#ef4444'
                    : bossHP > 30 ? '#f97316'
                    : '#dc2626';

  return (
    <div className={`cfb-screen cfb-theme-${finalBoss.theme} ${showVignette ? 'cfb-vignette' : ''} ${isEnraged ? 'cfb-enraged-bg' : ''}`}>

      {/* Phase Transition Overlay */}
      {transitioning && nextCombatPhase && (
        <PhaseTransition
          phase={nextCombatPhase}
          onDone={() => { /* handled by timeout */ }}
        />
      )}

      {/* Boss attack flash */}
      {showAttack && (
        <div className="cfb-attack-flash cfb-attack-final" />
      )}

      {/* Player damage flash */}
      {playerShake && <div className="cfb-damage-flash" />}

      {/* Overdrive offer (Phase 3, HP ≤ 20%, not yet used) */}
      {combatPhase === 'phase3' && playerHP <= 20 && !overdriveUsed && (
        <div className="cfb-overdrive-offer">
          <div className="cfb-od-icon">🔰</div>
          <div className="cfb-od-text">LEXIO OVERDRIVE available! +20 HP, next wrong = no damage</div>
          <button id="cfb-overdrive-btn" className="cfb-od-btn" onClick={activateOverdrive}>
            🔰 Activate!
          </button>
        </div>
      )}

      {/* Overdrive active indicator */}
      {overdriveActive && (
        <div className="cfb-overdrive-active">🔰 Shield Active — Next mistake blocked!</div>
      )}

      {/* HP Bars */}
      <div className="cfb-hpbars">
        <HPBar label={finalBoss.name} hp={bossHP}   maxHp={BOSS_HP_START}   color={bossHPColor} icon={bossSprite} />
        <HPBar label="You"           hp={playerHP} maxHp={PLAYER_HP_START} color="#10b981"      icon="🦊"        />
      </div>

      {/* Phase label */}
      <div className={`cfb-phase-label ${combatPhase}`}>{phaseLabel}</div>

      {/* Boss sprite */}
      <div className={`cfb-boss-sprite ${bossShake ? 'shake' : ''} ${isEnraged ? 'enraged' : ''}`}>
        {bossSprite}
      </div>

      {/* Question meta */}
      {q && (
        <>
          <div className="cfb-question-meta">
            <span>Q {current + 1} / {currentPhaseQ.length}</span>
            <span className="cfb-q-type">
              {q.type === 'vocab' ? '📚 Vocab' : q.type === 'grammar' ? '📝 Grammar' : '🔁 Reverse'}
            </span>
          </div>

          {/* Timer bar */}
          <div className="cfb-timer-wrap">
            <div className="cfb-timer-bar" style={{ width: `${pct}%`, background: timerColor }} />
            <span className="cfb-timer-num">{timeLeft}s</span>
          </div>

          {/* Question */}
          <div className="cfb-question-box">
            <p className="cfb-question-text">{q.prompt}</p>
            {q.hint && <span className="cfb-question-hint">💡 {q.hint}</span>}
          </div>

          {/* Answer options */}
          <div className="cfb-options-grid">
            {q.options.map((opt, i) => {
              const isChosen  = chosen === opt;
              const isCorrect = feedback && opt.toLowerCase() === q.answer.toLowerCase();
              const isWrong   = feedback === 'wrong' && isChosen;
              return (
                <button
                  key={`${combatPhase}_${current}_${i}`}
                  id={`cfb-opt-${i}`}
                  className={`cfb-option ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''} ${isChosen && feedback === 'right' ? 'selected-right' : ''}`}
                  onClick={() => !feedback && handleAnswer(opt)}
                  disabled={!!feedback}
                >
                  <span className="cfb-opt-letter">{String.fromCharCode(65 + i)}</span>
                  <span className="cfb-opt-text">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`cfb-feedback ${feedback}`}>
              {feedback === 'right'
                ? `⚡ Hit! Boss at ${Math.max(0, Math.round(bossHP - DAMAGE_TO_BOSS[combatPhase]))}% HP`
                : overdriveActive ? '🔰 Shield blocked the damage!'
                : `💔 -${PLAYER_DAMAGE[tier]}% HP`}
            </div>
          )}
        </>
      )}
    </div>
  );
}
