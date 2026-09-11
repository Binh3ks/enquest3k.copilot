/**
 * StoryAltarPuzzle.jsx — Hạng #5: Story Sequencer (Floor 6 Door 3)
 *
 * Mechanic:
 *  - 5 narrative slabs (phiến đá) scrambled, each shows ~40-80 word excerpt.
 *  - Leo (character sprite) moves left/right + carries a slab.
 *  - 5 altar pedestals numbered 1-5. Drop slab onto correct pedestal = score.
 *  - ANTI-BRUTE-FORCE: NO green border reveal on placement until ALL 5 placed.
 *    Validation happens only after the 5th slab is placed (Verify button OR auto).
 *  - HEARTS: Wrong placement (wrong pedestal number) → -1 heart immediately.
 *  - ANTI-LEAK: Each game session gets a unique roundId; stale slabs from old
 *    roundId are ignored.
 *  - TEST HOOK: window.__STORY_ALTAR_TEST_HOOK__ for puppeteer.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import HUDOverlay from './HUDOverlay';
import FloatingExitBtn from './FloatingExitBtn';
import { calculateStars } from '../../stores/useChroniclesStore';
import { getStoryScenesForWeek } from '../../services/chroniclesFloor67Service';
import { loadWeekData } from '../../data/weeks/index';
import './StoryAltarPuzzle.css';

// ── helpers ──────────────────────────────────────────────────────────────────

function scramble(scenes) {
  let arr = [...scenes];
  let same = true, tries = 0;
  while (same && tries < 20) {
    arr.sort(() => Math.random() - 0.5);
    same = arr.every((s, i) => s.originalOrder === i + 1);
    tries++;
  }
  return arr;
}

function newRoundId() {
  return `ss_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

// ── component ─────────────────────────────────────────────────────────────────

export default function StoryAltarPuzzle({
  weekNumber = 33,
  weekData = null,
  duration = 90,
  onComplete,
  onExit,
}) {
  // ── session state ──────────────────────────────────────────────────────────
  const [roundId, setRoundId]       = useState(newRoundId);
  const [scenes, setScenes]         = useState([]);          // ordered truth
  const [slabs, setSlabs]           = useState([]);          // scrambled carry pile
  const [altars, setAltars]         = useState(
    Array.from({ length: 5 }, (_, i) => ({ pos: i + 1, slab: null, wrongBlink: false }))
  );

  // ── gameplay state ─────────────────────────────────────────────────────────
  const [heldSlabIdx, setHeldSlabIdx] = useState(null);  // index into slabs[]
  const [phase, setPhase]             = useState('loading'); // loading|playing|cleared|ko
  const [hearts, setHearts]           = useState(3);
  const [score, setScore]             = useState(0);
  const [timeLeft, setTimeLeft]       = useState(duration);
  const [verified, setVerified]       = useState(false);     // post-verify mode
  const [feedback, setFeedback]       = useState(null);      // { ok, text }
  const [leoPos, setLeoPos]           = useState(0);         // 0-4 (which altar Leo stands near)
  const [showHelp, setShowHelp]       = useState(false);

  // ── refs for test hook ────────────────────────────────────────────────────
  const heartsRef   = useRef(hearts);
  const scoreRef    = useRef(score);
  const slabsRef    = useRef(slabs);
  const altarsRef   = useRef(altars);
  const roundIdRef  = useRef(roundId);
  const phaseRef    = useRef(phase);
  const heldIdxRef  = useRef(heldSlabIdx);
  const timeLeftRef = useRef(timeLeft);
  useEffect(() => { heartsRef.current  = hearts; },      [hearts]);
  useEffect(() => { scoreRef.current   = score; },       [score]);
  useEffect(() => { slabsRef.current   = slabs; },       [slabs]);
  useEffect(() => { altarsRef.current  = altars; },      [altars]);
  useEffect(() => { roundIdRef.current = roundId; },     [roundId]);
  useEffect(() => { phaseRef.current   = phase; },       [phase]);
  useEffect(() => { heldIdxRef.current = heldSlabIdx; }, [heldSlabIdx]);
  useEffect(() => { timeLeftRef.current = timeLeft; },   [timeLeft]);

  // ── load week data ────────────────────────────────────────────────────────
  useEffect(() => {
    const load = async () => {
      let data = weekData;
      if (!data) {
        try { data = await loadWeekData(weekNumber); } catch { data = null; }
      }
      const raw = getStoryScenesForWeek(weekNumber, data);
      setScenes(raw);
      setSlabs(scramble(raw));
      setAltars(Array.from({ length: 5 }, (_, i) => ({ pos: i + 1, slab: null, wrongBlink: false })));
      setHeldSlabIdx(null);
      setPhase('playing');
      setHearts(3);
      setScore(0);
      setTimeLeft(duration);
      setVerified(false);
      setFeedback(null);
      setLeoPos(0);
      const rid = newRoundId();
      setRoundId(rid);
    };
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weekNumber, weekData]);

  // ── timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return;
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(t); setPhase('ko'); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [phase]);

  // ── pick up a slab ────────────────────────────────────────────────────────
  const pickUp = useCallback((idx) => {
    if (phase !== 'playing' || verified) return;
    setHeldSlabIdx(prev => (prev === idx ? null : idx));
  }, [phase, verified]);

  // ── drop held slab onto altar at position (1-5) ───────────────────────────
  const dropOnAltar = useCallback((altarPos) => {
    if (phase !== 'playing' || heldSlabIdx === null || verified) return;

    const heldSlab = slabs[heldSlabIdx];
    if (!heldSlab) return;

    // Is this altar already occupied?
    const altar = altars.find(a => a.pos === altarPos);
    if (altar?.slab) return; // occupied, do nothing

    // ANTI-BRUTE-FORCE: check correctness ONLY to apply heart penalty.
    // Do NOT store isCorrect visually until final verify.
    const isCorrect = heldSlab.originalOrder === altarPos;

    if (!isCorrect) {
      // Heart penalty
      setHearts(h => {
        const next = Math.max(0, h - 1);
        if (next <= 0) { setPhase('ko'); }
        return next;
      });
      // Brief red blink on altar, but slab NOT placed
      setAltars(prev => prev.map(a =>
        a.pos === altarPos ? { ...a, wrongBlink: true } : a
      ));
      setTimeout(() => {
        setAltars(prev => prev.map(a =>
          a.pos === altarPos ? { ...a, wrongBlink: false } : a
        ));
      }, 600);
      return; // slab stays in Leo's hand
    }

    // Correct drop: place slab on altar (no color feedback yet)
    const rid = roundIdRef.current;
    setAltars(prev => prev.map(a =>
      a.pos === altarPos
        ? { ...a, slab: { ...heldSlab, placedRoundId: rid } }
        : a
    ));
    // Remove slab from carry pile
    setSlabs(prev => prev.filter((_, i) => i !== heldSlabIdx));
    setHeldSlabIdx(null);
    setLeoPos(altarPos - 1);

    // Auto-verify when all 5 placed
    setAltars(prev => {
      const next = prev.map(a =>
        a.pos === altarPos
          ? { ...a, slab: { ...heldSlab, placedRoundId: rid } }
          : a
      );
      if (next.every(a => a.slab !== null)) {
        setTimeout(() => handleVerify(next), 300);
      }
      return next;
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, heldSlabIdx, slabs, altars, verified]);

  // ── verify ────────────────────────────────────────────────────────────────
  const handleVerify = useCallback((altarsSnapshot) => {
    const a = altarsSnapshot || altars;
    // Only valid slabs from current roundId
    const rid = roundIdRef.current;
    const allPlaced = a.every(al => al.slab && al.slab.placedRoundId === rid);
    if (!allPlaced) {
      setFeedback({ ok: false, text: 'Place all 5 slabs first!' });
      return;
    }
    const correct = a.every(al => al.slab.originalOrder === al.pos);
    setVerified(true);
    if (correct) {
      const baseXP = 300;
      const timeBonus = Math.floor(timeLeft * 1.5);
      const total = baseXP + timeBonus;
      setScore(total);
      setFeedback({ ok: true, text: `✨ CHRONOLOGY RESTORED! +${total} XP` });
      setTimeout(() => setPhase('cleared'), 1400);
    } else {
      // Show which altars are wrong, penalise hearts
      setFeedback({ ok: false, text: '⚠️ Wrong order! Fix mismatched slabs.' });
      setHearts(h => {
        const next = Math.max(0, h - 1);
        if (next <= 0) setPhase('ko');
        return next;
      });
      // Return wrong slabs to carry pile
      setAltars(prev => {
        const wrongAltars = prev.filter(al => al.slab && al.slab.originalOrder !== al.pos);
        const wrongSlabs = wrongAltars.map(al => al.slab);
        setSlabs(s => [...s, ...wrongSlabs]);
        return prev.map(al =>
          al.slab && al.slab.originalOrder !== al.pos ? { ...al, slab: null } : al
        );
      });
      setVerified(false);
      setTimeout(() => setFeedback(null), 2000);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [altars, timeLeft]);

  // ── reset ─────────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    const rid = newRoundId();
    setRoundId(rid);
    setSlabs(scramble(scenes));
    setAltars(Array.from({ length: 5 }, (_, i) => ({ pos: i + 1, slab: null, wrongBlink: false })));
    setHeldSlabIdx(null);
    setHearts(3);
    setScore(0);
    setTimeLeft(duration);
    setVerified(false);
    setFeedback(null);
    setLeoPos(0);
    setPhase('playing');
  }, [scenes, duration]);

  // ── finish ────────────────────────────────────────────────────────────────
  const handleFinish = useCallback(() => {
    const timeTaken = duration - timeLeft;
    const stars = calculateStars(score, 480, timeTaken, duration);
    if (onComplete) onComplete(stars, score);
  }, [duration, timeLeft, score, onComplete]);

  // ── test hook (ref-based, no stale closure) ──────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.__STORY_ALTAR_TEST_HOOK__ = {
      getRoundId:    () => roundIdRef.current,
      getHearts:     () => heartsRef.current,
      getScore:      () => scoreRef.current,
      getSlabs:      () => slabsRef.current,
      getAltars:     () => altarsRef.current,
      getPhase:      () => phaseRef.current,
      getHeldIdx:    () => heldIdxRef.current,
      setHeartsVal:  (h) => setHearts(h),

      // Imperative pickUp by array index — uses ref (always fresh)
      pickUpImperative: (idx) => {
        if (phaseRef.current !== 'playing') return;
        setHeldSlabIdx(prev => (prev === idx ? null : idx));
      },

      // Imperative drop — reads from refs, then calls independent setters (no nesting)
      dropOnAltarImperative: (altarPos) => {
        if (phaseRef.current !== 'playing') return;
        const heldIdx = heldIdxRef.current;
        if (heldIdx === null) return;

        const currentSlabs = slabsRef.current;
        const currentAltars = altarsRef.current;
        const heldSlab = currentSlabs[heldIdx];
        if (!heldSlab) return;

        const targetAltar = currentAltars.find(a => a.pos === altarPos);
        if (targetAltar?.slab) return; // occupied

        const isCorrect = heldSlab.originalOrder === altarPos;

        if (!isCorrect) {
          // heart penalty — single independent setter call
          const currentHearts = heartsRef.current;
          const next = Math.max(0, currentHearts - 1);
          setHearts(next);
          if (next <= 0) setPhase('ko');
          // brief red blink
          setAltars(prev => prev.map(a =>
            a.pos === altarPos ? { ...a, wrongBlink: true } : a
          ));
          setTimeout(() => setAltars(prev => prev.map(a =>
            a.pos === altarPos ? { ...a, wrongBlink: false } : a
          )), 600);
          return; // slab stays in hand
        }

        // Correct: place slab
        const rid = roundIdRef.current;
        const nextAltars = currentAltars.map(a =>
          a.pos === altarPos
            ? { ...a, slab: { ...heldSlab, placedRoundId: rid } }
            : a
        );
        setAltars(nextAltars);
        setSlabs(currentSlabs.filter((_, i) => i !== heldIdx));
        setHeldSlabIdx(null);
        setLeoPos(altarPos - 1);

        // Auto-verify when all 5 placed
        if (nextAltars.every(a => a.slab !== null)) {
          const allCorrect = nextAltars.every(a => a.slab.originalOrder === a.pos);
          if (allCorrect) {
            const timeBonus = Math.floor(timeLeftRef.current * 1.5);
            const total = 300 + timeBonus;
            setScore(total);
            setFeedback({ ok: true, text: `✨ CHRONOLOGY RESTORED! +${total} XP` });
            setTimeout(() => setPhase('cleared'), 1400);
          }
        }
      },

      // Anti-leak check
      getStaleSlabs: (rid) => altarsRef.current.filter(a => a.slab?.placedRoundId === rid),
    };
    return () => { delete window.__STORY_ALTAR_TEST_HOOK__; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // mount only — all state accessed via refs or functional setters

  const stars = calculateStars(score, 480);
  const allPlaced = altars.every(a => a.slab !== null);
  const heldSlab = heldSlabIdx !== null ? slabs[heldSlabIdx] : null;

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="sa-root">
      <HUDOverlay
        score={score}
        hearts={hearts}
        timeLeft={timeLeft}
        totalTime={duration}
        stars={stars}
        title="Shrine of Chronicles: Story Sequencer"
      />
      <FloatingExitBtn onExit={onExit} />

      {/* ── Help overlay ── */}
      {showHelp && (
        <div className="sa-help-overlay" onClick={() => setShowHelp(false)}>
          <div className="sa-help-box" onClick={e => e.stopPropagation()}>
            <h3>📜 How to Play</h3>
            <p>1. Click a <strong>slab</strong> to pick it up (Leo will hold it).</p>
            <p>2. Click an <strong>altar pedestal</strong> to drop it there.</p>
            <p>3. Arrange all 5 slabs in the <strong>correct chronological order</strong> (1→5).</p>
            <p>4. Press <strong>Verify Order</strong> when done, or it auto-checks after placing #5.</p>
            <p>⚠️ Dropping on the <strong>wrong pedestal</strong> costs 1 ❤️.</p>
            <button className="sa-help-close" onClick={() => setShowHelp(false)}>Got it!</button>
          </div>
        </div>
      )}

      {/* ── Loading ── */}
      {phase === 'loading' && (
        <div className="sa-center">
          <div className="sa-spinner" />
          <p className="sa-loading-text">Loading story fragments...</p>
        </div>
      )}

      {/* ── Playing ── */}
      {phase === 'playing' && (
        <div className="sa-playing">
          {/* Top instruction bar */}
          <div className="sa-instruction-bar">
            <button className="sa-help-btn" onClick={() => setShowHelp(true)}>❓ Guide</button>
            <span className="sa-instruction-text">
              {heldSlab
                ? `Holding: Slab "${heldSlab.text.slice(0, 35)}…" — click an altar pedestal to place`
                : 'Click a slab to pick it up, then click an altar pedestal (1–5)'}
            </span>
            <button
              className={`sa-verify-btn ${allPlaced ? 'sa-verify-btn--ready' : ''}`}
              onClick={() => handleVerify()}
              disabled={!allPlaced}
            >
              ✅ Verify Order
            </button>
          </div>

          {/* ── Altar row (top) ── */}
          <div className="sa-altar-row">
            {altars.map((altar) => (
              <div
                key={altar.pos}
                className={[
                  'sa-altar',
                  altar.wrongBlink ? 'sa-altar--wrong' : '',
                  altar.slab ? 'sa-altar--filled' : 'sa-altar--empty',
                  heldSlabIdx !== null && !altar.slab ? 'sa-altar--droppable' : '',
                ].join(' ')}
                onClick={() => dropOnAltar(altar.pos)}
                data-altar-pos={altar.pos}
              >
                <div className="sa-altar-number">Altar {altar.pos}</div>
                <div className="sa-altar-pedestal">
                  {altar.slab ? (
                    <div className="sa-altar-slab-placed sa-slab-text">
                      {altar.slab.text}
                    </div>
                  ) : (
                    <div className="sa-altar-empty-hint">
                      {heldSlabIdx !== null ? '⬇ Drop here' : `— place scene ${altar.pos} —`}
                    </div>
                  )}
                </div>
                <div className="sa-altar-base" />
              </div>
            ))}
          </div>

          {/* ── Leo + carry pile (bottom) ── */}
          <div className="sa-ground-area">
            {/* Leo sprite */}
            <div
              className="sa-leo"
              style={{ left: `${(leoPos / 4) * 80 + 2}%` }}
              data-testid="sa-leo"
            >
              <div className="sa-leo-sprite">🧙</div>
              {heldSlab && (
                <div className="sa-leo-holding">
                  <div className="sa-held-slab sa-slab-text">
                    {heldSlab.text}
                  </div>
                </div>
              )}
            </div>

            {/* Carry pile */}
            <div className="sa-carry-pile">
              <div className="sa-pile-label">📦 Remaining slabs ({slabs.length})</div>
              <div className="sa-pile-list">
                {slabs.map((slab, idx) => (
                  <div
                    key={`${slab.id}_${roundId}`}
                    className={[
                      'sa-slab',
                      heldSlabIdx === idx ? 'sa-slab--held' : '',
                    ].join(' ')}
                    onClick={() => pickUp(idx)}
                    data-slab-id={slab.id}
                    data-slab-order={slab.originalOrder}
                  >
                    <div className="sa-slab-text">{slab.text}</div>
                    <div className="sa-slab-grip">≡</div>
                  </div>
                ))}
                {slabs.length === 0 && (
                  <div className="sa-pile-empty">All slabs placed — verify the order!</div>
                )}
              </div>
            </div>
          </div>

          {/* Feedback toast */}
          {feedback && (
            <div className={`sa-feedback-toast ${feedback.ok ? 'sa-feedback-toast--ok' : 'sa-feedback-toast--err'}`}
              data-testid="sa-feedback">
              {feedback.text}
            </div>
          )}
        </div>
      )}

      {/* ── Cleared ── */}
      {phase === 'cleared' && (
        <div className="sa-center sa-cleared">
          <div className="sa-cleared-icon">🏛️</div>
          <h2 className="sa-cleared-title">CHRONOLOGY RESTORED!</h2>
          <p className="sa-cleared-sub">
            The shrine's story slabs are in perfect order.<br />
            Time taken: <strong>{duration - timeLeft}s</strong>
          </p>
          <div className="sa-cleared-altars">
            {altars.map(a => (
              <div key={a.pos} className="sa-cleared-slot">
                <span className="sa-cleared-slot-num">{a.pos}</span>
                <span className="sa-cleared-slot-text">{a.slab?.text?.slice(0, 60)}…</span>
              </div>
            ))}
          </div>
          <button className="sa-finish-btn" onClick={handleFinish}>
            Claim Reward &amp; Continue →
          </button>
        </div>
      )}

      {/* ── KO ── */}
      {phase === 'ko' && (
        <div className="sa-center sa-ko">
          <div className="sa-ko-icon">{hearts <= 0 ? '💔' : '⌛'}</div>
          <h2 className="sa-ko-title">
            {hearts <= 0 ? 'OUT OF HEARTS!' : 'TIME RUN OUT!'}
          </h2>
          <p className="sa-ko-sub">The shrine's order crumbled…</p>
          <button className="sa-retry-btn" onClick={reset}>
            Rewind Timeline 🔄
          </button>
        </div>
      )}
    </div>
  );
}
