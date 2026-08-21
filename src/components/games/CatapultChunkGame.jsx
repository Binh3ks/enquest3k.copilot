import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Trophy, Play, RotateCcw, Shield } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';

/**
 * CatapultChunkGame V2 — Drag Physics Sentence Builder
 * - Chunks float with fluid inertia (bob and drift on their own)
 * - Player drags chunk toward correct slot
 * - SNAP if dropped within slot bounds → locked in with click sound
 * - REJECT (bounce back with higher velocity) if dropped in wrong slot
 * - SCATTER if dropped in open space
 * - Decoy chunks appear from Round 3+
 * - Timer per round: 15s, penalty on time-out
 */
export default function CatapultChunkGame({ onComplete, isStandalone = false }) {
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(60);
  const [roundIdx, setRoundIdx] = useState(0);
  const [lockedSlots, setLockedSlots] = useState({});
  const [roundTimer, setRoundTimer] = useState(15);
  const [launchAnim, setLaunchAnim] = useState(false);
  const [feedback, setFeedback] = useState(null); // {msg, type: 'good'|'bad'}

  const containerRef = useRef(null);
  const chunksRef = useRef([]);
  const animRef = useRef(null);
  const dragRef = useRef(null); // {chunkId, startX, startY, offsetX, offsetY}
  const gameStateRef = useRef('idle');
  const lockedSlotsRef = useRef({});

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const ROUNDS = [
    {
      sentence: 'Jake was walking down the corridor with rubber shoes.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Jake' },
        { id: 'VP', label: 'Verb Phrase', answer: 'was walking down the corridor' },
        { id: 'C', label: 'With...', answer: 'with rubber shoes' },
      ],
    },
    {
      sentence: 'Water reduces friction on the wet lab floor.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'Water' },
        { id: 'VP', label: 'Verb Phrase', answer: 'reduces friction' },
        { id: 'C', label: 'Place/Time', answer: 'on the wet lab floor' },
      ],
    },
    {
      sentence: 'The nurse arrived quickly with clean bandages.',
      slots: [
        { id: 'S', label: 'Subject', answer: 'The nurse' },
        { id: 'VP', label: 'Verb Phrase', answer: 'arrived quickly' },
        { id: 'C', label: 'With...', answer: 'with clean bandages' },
      ],
      decoy: 'carefully at school', // extra floating chunk that doesn't belong
    },
  ];

  const round = ROUNDS[Math.min(roundIdx, ROUNDS.length - 1)];

  const makeChunks = useCallback((r) => {
    const allWords = [...r.slots.map(s => s.answer)];
    if (r.decoy) allWords.push(r.decoy);
    const shuffled = allWords.sort(() => Math.random() - 0.5);

    const cw = 300, ch = 200;
    return shuffled.map((word, i) => ({
      id: `chunk_${i}_${Date.now()}`,
      word,
      isDecoy: word === r.decoy,
      x: 40 + Math.random() * (cw - 80),
      y: 40 + Math.random() * (ch - 80),
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      locked: false,
      lockedSlotId: null,
      dragging: false,
    }));
  }, []);

  // Float animation loop
  const floatLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    const cw = containerRef.current?.offsetWidth || 400;
    const ch = containerRef.current?.offsetHeight || 220;

    chunksRef.current = chunksRef.current.map(c => {
      if (c.locked || c.dragging) return c;
      let { x, y, vx, vy } = c;

      // Gentle random nudge (Brownian-like)
      vx += (Math.random() - 0.5) * 0.08;
      vy += (Math.random() - 0.5) * 0.08;

      // Dampen so it doesn't rocket off
      vx *= 0.97;
      vy *= 0.97;

      x += vx; y += vy;

      // Soft wall bounce
      const hw = 55, hh = 22; // half-width, half-height of chunk
      if (x - hw < 0) { x = hw; vx = Math.abs(vx) * 0.7; }
      if (x + hw > cw) { x = cw - hw; vx = -Math.abs(vx) * 0.7; }
      if (y - hh < 0) { y = hh; vy = Math.abs(vy) * 0.7; }
      if (y + hh > ch) { y = ch - hh; vy = -Math.abs(vy) * 0.7; }

      return { ...c, x, y, vx, vy };
    });

    animRef.current = requestAnimationFrame(floatLoop);
  }, []);

  const startGame = () => {
    gameStateRef.current = 'playing';
    lockedSlotsRef.current = {};
    setGameState('playing');
    setScore(0);
    setGameTimer(60);
    setRoundIdx(0);
    setLockedSlots({});
    setRoundTimer(15);
    setFeedback(null);
    chunksRef.current = makeChunks(ROUNDS[0]);
    animRef.current = requestAnimationFrame(floatLoop);
  };

  // Game clock
  useEffect(() => {
    if (gameState !== 'playing') return;
    const tick = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
      }
      setGameTimer(t => {
        if (t <= 1) { endGame(); return 0; }
        return t - 1;
      });
      setRoundTimer(rt => {
        if (rt <= 1) {
          // Time-out penalty — reset round
          setScore(s => Math.max(0, s - 5));
          setFeedback({ msg: '⏰ Time up! −5 pts', type: 'bad' });
          setTimeout(() => setFeedback(null), 1000);
          lockedSlotsRef.current = {};
          setLockedSlots({});
          chunksRef.current = makeChunks(round);
          return 15;
        }
        return rt - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [gameState, roundIdx, isStandalone]);

  const endGame = useCallback(() => {
    gameStateRef.current = 'done';
    setGameState('done');
    cancelAnimationFrame(animRef.current);
    recordHighScore('chunk_catapult', score);
    if (onComplete) onComplete(score);
  }, [score, onComplete, recordHighScore]);

  // Check if round complete (all non-decoy slots locked)
  const checkRoundComplete = useCallback((newLocked) => {
    const allSlotsFilled = round.slots.every(s => newLocked[s.id]);
    if (!allSlotsFilled) return;

    setLaunchAnim(true);
    setScore(s => s + 25);
    setFeedback({ msg: '🎯 LAUNCH! +25 pts', type: 'good' });
    setTimeout(() => {
      setLaunchAnim(false);
      setFeedback(null);
      const next = Math.min(roundIdx + 1, ROUNDS.length - 1);
      setRoundIdx(next);
      lockedSlotsRef.current = {};
      setLockedSlots({});
      setRoundTimer(15);
      chunksRef.current = makeChunks(ROUNDS[next]);
    }, 1200);
  }, [round, roundIdx, makeChunks]);

  // Drag handlers
  const getSlotBounds = useCallback(() => {
    if (!containerRef.current) return [];
    const slotEls = containerRef.current.querySelectorAll('[data-slotid]');
    return Array.from(slotEls).map(el => {
      const r = el.getBoundingClientRect();
      const cr = containerRef.current.getBoundingClientRect();
      return {
        id: el.dataset.slotid,
        left: r.left - cr.left, right: r.right - cr.left,
        top: r.top - cr.top, bottom: r.bottom - cr.top,
      };
    });
  }, []);

  const onPointerDown = useCallback((e, chunkId) => {
    e.preventDefault();
    const c = chunksRef.current.find(c => c.id === chunkId);
    if (!c || c.locked) return;
    const cr = containerRef.current.getBoundingClientRect();
    dragRef.current = {
      chunkId,
      offsetX: e.clientX - cr.left - c.x,
      offsetY: e.clientY - cr.top - c.y,
    };
    chunksRef.current = chunksRef.current.map(ch => ch.id === chunkId ? { ...ch, dragging: true, vx: 0, vy: 0 } : ch);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const x = e.clientX - cr.left - dragRef.current.offsetX;
    const y = e.clientY - cr.top - dragRef.current.offsetY;
    chunksRef.current = chunksRef.current.map(c =>
      c.id === dragRef.current.chunkId ? { ...c, x, y } : c
    );
  }, []);

  const onPointerUp = useCallback((e) => {
    if (!dragRef.current) return;
    const { chunkId } = dragRef.current;
    dragRef.current = null;

    const c = chunksRef.current.find(ch => ch.id === chunkId);
    if (!c) return;

    // Find which slot (if any) this chunk was dropped into
    const slotBounds = getSlotBounds();
    const hit = slotBounds.find(s =>
      c.x > s.left && c.x < s.right && c.y > s.top && c.y < s.bottom
    );

    if (hit) {
      // Check if correct answer for slot
      const slot = round.slots.find(s => s.id === hit.id);
      if (slot && slot.answer === c.word && !lockedSlotsRef.current[hit.id]) {
        // SNAP — correct!
        const newLocked = { ...lockedSlotsRef.current, [hit.id]: c.word };
        lockedSlotsRef.current = newLocked;
        setLockedSlots({ ...newLocked });
        chunksRef.current = chunksRef.current.map(ch =>
          ch.id === chunkId ? { ...ch, locked: true, lockedSlotId: hit.id, dragging: false } : ch
        );
        setFeedback({ msg: '✓ Locked in!', type: 'good' });
        setTimeout(() => setFeedback(null), 600);
        checkRoundComplete(newLocked);
      } else {
        // REJECT — bounce back with higher speed
        chunksRef.current = chunksRef.current.map(ch =>
          ch.id === chunkId ? {
            ...ch, dragging: false,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
          } : ch
        );
        setFeedback({ msg: c.isDecoy ? '❌ Decoy chunk!' : '❌ Wrong slot!', type: 'bad' });
        setTimeout(() => setFeedback(null), 700);
      }
    } else {
      // SCATTER — released in open space, chunk flies off
      chunksRef.current = chunksRef.current.map(ch =>
        ch.id === chunkId ? {
          ...ch, dragging: false,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
        } : ch
      );
    }
  }, [round, getSlotBounds, checkRoundComplete]);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  useEffect(() => {
    return () => { cancelAnimationFrame(animRef.current); };
  }, []);

  // Force re-render from ref on animation frame
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (gameState !== 'playing') return;
    const id = setInterval(() => setTick(t => t + 1), 40);
    return () => clearInterval(id);
  }, [gameState]);

  const displayChunks = chunksRef.current;

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '420px',
      background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', background: 'rgba(0,0,0,0.35)',
        backdropFilter: 'blur(4px)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🧩</span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#fcd34d', letterSpacing: '0.05em' }}>CHUNK CATAPULT</div>
            <div style={{ fontSize: '10px', color: '#475569' }}>Round {roundIdx + 1}/{ROUNDS.length}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '3px 10px' }}>
            🏆 {score} pts
          </div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: roundTimer <= 5 ? '#f87171' : '#fcd34d', background: 'rgba(252,211,77,0.1)', border: '1px solid rgba(252,211,77,0.25)', borderRadius: '8px', padding: '3px 10px' }}>
            🕐 {roundTimer}s
          </div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#7dd3fc', background: 'rgba(125,211,252,0.1)', border: '1px solid rgba(125,211,252,0.25)', borderRadius: '8px', padding: '3px 10px' }}>
            ⏱ {gameTimer}s
          </div>
        </div>
      </div>

      {/* IDLE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px' }}>
          <div style={{ fontSize: '56px' }}>🏰</div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 900, color: '#fcd34d' }}>Drag Chunks to Destroy the Slime Castle!</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', maxWidth: '300px' }}>
              Drag the floating chunks into the correct grammar slots. Drop in the wrong slot and they'll fly away!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px', background: 'linear-gradient(135deg, #d97706, #ea580c)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(217,119,6,0.3)',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <span>▶</span> LOAD CATAPULT (1 MIN)
          </button>
        </div>
      )}

      {/* PLAYING */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Target sentence */}
          <div style={{
            padding: '6px 12px', background: 'rgba(217,119,6,0.15)', borderBottom: '1px solid rgba(217,119,6,0.25)',
            textAlign: 'center', flexShrink: 0,
          }}>
            <div style={{ fontSize: '10px', color: '#fcd34d', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Target Sentence:</div>
            <div style={{ fontSize: '13px', color: '#fef3c7', fontWeight: 700, fontStyle: 'italic' }}>{round.sentence}</div>
          </div>

          {/* Feedback flash */}
          {feedback && (
            <div style={{
              position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)',
              zIndex: 20, padding: '6px 16px', borderRadius: '20px', fontWeight: 900, fontSize: '13px',
              background: feedback.type === 'good' ? 'rgba(16,185,129,0.9)' : 'rgba(239,68,68,0.9)',
              color: '#fff', pointerEvents: 'none', whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}>{feedback.msg}</div>
          )}

          {/* Grammar slots */}
          <div style={{
            display: 'flex', gap: '8px', padding: '10px 12px', flexShrink: 0,
            justifyContent: 'center',
          }}>
            {round.slots.map(slot => {
              const filled = lockedSlots[slot.id];
              return (
                <div
                  key={slot.id}
                  data-slotid={slot.id}
                  style={{
                    flex: 1, minHeight: '52px', maxWidth: '180px',
                    border: `2px dashed ${filled ? '#10b981' : '#d97706'}`,
                    borderRadius: '10px',
                    background: filled ? 'rgba(16,185,129,0.15)' : 'rgba(217,119,6,0.08)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '6px',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: '9px', color: filled ? '#6ee7b7' : '#d97706', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '3px' }}>
                    [{slot.label}]
                  </div>
                  {filled ? (
                    <div style={{ fontSize: '12px', color: '#6ee7b7', fontWeight: 800, textAlign: 'center' }}>
                      ✓ {filled}
                    </div>
                  ) : (
                    <div style={{ fontSize: '11px', color: '#92400e', fontStyle: 'italic' }}>drop here</div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating chunks canvas */}
          <div
            ref={containerRef}
            style={{ flex: 1, position: 'relative', overflow: 'hidden', margin: '0 8px 8px' }}
          >
            {displayChunks.map(c => {
              if (c.locked) return null;
              return (
                <div
                  key={c.id}
                  onPointerDown={(e) => onPointerDown(e, c.id)}
                  style={{
                    position: 'absolute',
                    left: c.x, top: c.y,
                    transform: 'translate(-50%, -50%)',
                    padding: '8px 14px',
                    background: c.isDecoy
                      ? 'rgba(100,116,139,0.9)'
                      : c.dragging
                      ? 'rgba(217,119,6,0.95)'
                      : 'rgba(30,58,138,0.9)',
                    border: `2px solid ${c.isDecoy ? '#64748b' : c.dragging ? '#fbbf24' : '#60a5fa'}`,
                    borderRadius: '10px',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: '12px',
                    cursor: 'grab',
                    whiteSpace: 'nowrap',
                    boxShadow: c.dragging
                      ? '0 8px 24px rgba(251,191,36,0.4)'
                      : '0 4px 12px rgba(0,0,0,0.4)',
                    transition: 'box-shadow 0.1s, background 0.1s',
                    zIndex: c.dragging ? 50 : 5,
                    userSelect: 'none',
                    touchAction: 'none',
                  }}
                >
                  {c.word}
                </div>
              );
            })}

            {/* Launch animation overlay */}
            {launchAnim && (
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(251,191,36,0.15)',
                fontSize: '48px', fontWeight: 900, zIndex: 30,
                animation: 'fadeIn 0.2s',
              }}>
                🏹💥 LAUNCH!
              </div>
            )}
          </div>
        </div>
      )}

      {/* DONE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '24px' }}>
          <div style={{ fontSize: '56px' }}>🏆</div>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#fbbf24' }}>Fortress Destroyed!</h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0' }}>
            Final Score: <strong style={{ color: '#fbbf24', fontSize: '18px' }}>{score} pts</strong>
          </p>
          <button type="button" onClick={startGame} style={{
            padding: '10px 24px', background: 'linear-gradient(135deg, #d97706, #ea580c)',
            color: '#fff', fontWeight: 900, fontSize: '13px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
          }}>
            <RotateCcw size={14} /> Siege Again
          </button>
        </div>
      )}
    </div>
  );
}
