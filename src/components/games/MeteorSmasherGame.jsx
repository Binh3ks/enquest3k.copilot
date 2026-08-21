import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Shield } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';

/**
 * MeteorSmasherGame V2 — Swipe-Laser with Curved Trajectories
 *
 * Meteors fall from top along non-linear (parabolic/curved) paths,
 * rotating as they fall. Each meteor carries a WORD.
 *
 * The DEFINITION or IMAGE of a target word is displayed at bottom.
 * Player drags a swipe across the meteor they think matches the definition.
 * The swipe direction fires a laser — the laser only destroys a meteor
 * if it actually intersects the meteor's current position.
 *
 * Wrong meteor: 1 shield lost. 3 shields → game over.
 * Meteor reaches bottom: 1 shield lost and new one spawns.
 *
 * After 10s: speed increases 20%.
 * After 30s: DOUBLE meteors appear (two words, one correct).
 */

export default function MeteorSmasherGame({ words = [], onComplete, isStandalone = false }) {
  const DEFAULT_WORDS = [
    { word: 'friction', definition: 'A force that slows things down when surfaces rub together.' },
    { word: 'slippery', definition: 'Very smooth — hard to grip or stand on.' },
    { word: 'bandage', definition: 'A strip of cloth used to wrap a wound.' },
    { word: 'corridor', definition: 'A long hallway inside a building.' },
    { word: 'momentum', definition: 'The force that keeps a moving object moving.' },
    { word: 'velocity', definition: 'Speed measured in a specific direction.' },
    { word: 'caution', definition: 'Careful attention to avoid danger or mistakes.' },
    { word: 'medical', definition: 'Related to treating illness or injury.' },
  ];

  const wordBank = words?.length >= 4 ? words.map((w, i) => ({
    word: typeof w === 'string' ? w : w.word,
    definition: typeof w === 'object' ? w.definition : DEFAULT_WORDS[i % DEFAULT_WORDS.length]?.definition || w,
  })) : DEFAULT_WORDS;

  // ── State ──────────────────────────────────────────────────────────────────
  const [gameState, setGameState]   = useState('idle');
  const [score, setScore]           = useState(0);
  const [shields, setShields]       = useState(3);
  const [gameTimer, setGameTimer]   = useState(60);
  const [meteors, setMeteors]       = useState([]);
  const [laser, setLaser]           = useState(null);   // {x1,y1,x2,y2,hit,color}
  const [target, setTarget]         = useState(null);   // current word/def to identify
  const [feedback, setFeedback]     = useState(null);
  const [phase, setPhase]           = useState(1);      // 1 = normal, 2 = fast, 3 = double

  // ── Refs ───────────────────────────────────────────────────────────────────
  const meteorsRef    = useRef([]);
  const shieldsRef    = useRef(3);
  const scoreRef      = useRef(0);
  const gameStateRef  = useRef('idle');
  const targetRef     = useRef(null);
  const frameRef      = useRef(null);
  const swipeRef      = useRef(null);
  const containerRef  = useRef(null);
  const phaseRef      = useRef(1);
  const elapsedRef    = useRef(0);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const W = 480, H = 360; // virtual canvas dimensions

  // ── Meteor factory ────────────────────────────────────────────────────────
  const makeMeteor = useCallback((isTarget = false, overrideWord = null) => {
    const pick = overrideWord || wordBank[Math.floor(Math.random() * wordBank.length)];
    const speed = phaseRef.current === 3 ? 1.5 : phaseRef.current === 2 ? 1.2 : 0.85;
    const x = 40 + Math.random() * (W - 80);
    const curveAmt = (Math.random() - 0.5) * 2.5; // horizontal drift
    return {
      id: Date.now() + Math.random(),
      word: pick.word,
      isTarget,
      x,
      y: -40 - Math.random() * 80,
      vy: speed + Math.random() * 0.5,
      vx: curveAmt,
      ax: (Math.random() - 0.5) * 0.04, // slight horizontal acceleration (curve)
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 3,
      r: 32 + Math.floor(pick.word.length / 3) * 3,
      color: isTarget ? '#f59e0b' : ['#6366f1', '#ec4899', '#0ea5e9', '#10b981'][Math.floor(Math.random() * 4)],
      hit: false,
    };
  }, [wordBank]);

  // ── Spawn wave of meteors ─────────────────────────────────────────────────
  const spawnWave = useCallback((currentTarget) => {
    const decoys = wordBank
      .filter(w => w.word !== currentTarget.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, phaseRef.current === 3 ? 4 : 3);

    const newMeteors = [
      makeMeteor(true, currentTarget),
      ...decoys.map(d => makeMeteor(false, d)),
    ].sort(() => Math.random() - 0.5);

    meteorsRef.current = newMeteors;
    setMeteors([...newMeteors]);
  }, [wordBank, makeMeteor]);

  // ── Pick new target & spawn ───────────────────────────────────────────────
  const pickNextTarget = useCallback(() => {
    const t = wordBank[Math.floor(Math.random() * wordBank.length)];
    targetRef.current = t;
    setTarget(t);
    spawnWave(t);
  }, [wordBank, spawnWave]);

  // ── Physics animation loop ────────────────────────────────────────────────
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    meteorsRef.current = meteorsRef.current.map(m => {
      if (m.hit) return m;
      let { x, y, vx, vy, ax, rot, rotSpeed } = m;
      vx += ax;
      // Soft horizontal bounce off walls
      if (x - m.r < 0 || x + m.r > W) { vx = -vx * 0.7; ax = -ax; }
      x += vx;
      y += vy;
      rot += rotSpeed;

      // Reached bottom → shield damage
      if (y - m.r > H) {
        if (m.isTarget && !m.hit) {
          shieldsRef.current = Math.max(0, shieldsRef.current - 1);
          setShields(shieldsRef.current);
          setFeedback({ msg: '🛡️ Target escaped! −1 shield', type: 'bad' });
          setTimeout(() => setFeedback(null), 900);
          if (shieldsRef.current <= 0) { endGame(); return m; }
          // Respawn wave
          setTimeout(() => pickNextTarget(), 300);
        }
        return { ...m, hit: true }; // remove from canvas
      }

      return { ...m, x, y, vx, vy, rot };
    });

    setMeteors([...meteorsRef.current]);
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [pickNextTarget]);

  // ── Game clock + phase escalation ─────────────────────────────────────────
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
      }
      elapsedRef.current += 1;
      if (elapsedRef.current === 10) { phaseRef.current = 2; setPhase(2); }
      if (elapsedRef.current === 30) { phaseRef.current = 3; setPhase(3); }
      setGameTimer(t => {
        if (t <= 1) { endGame(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [gameState, isStandalone]);

  const endGame = useCallback(() => {
    gameStateRef.current = 'done';
    setGameState('done');
    cancelAnimationFrame(frameRef.current);
    recordHighScore('meteor_smasher', scoreRef.current);
    if (onComplete) onComplete(scoreRef.current);
  }, [onComplete, recordHighScore]);

  const startGame = () => {
    scoreRef.current = 0; shieldsRef.current = 3; phaseRef.current = 1; elapsedRef.current = 0;
    setScore(0); setShields(3); setPhase(1); setGameTimer(60);
    setFeedback(null); setLaser(null);
    gameStateRef.current = 'playing';
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
    // Delay first wave so RAF is running
    setTimeout(pickNextTarget, 100);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  // ── Swipe-to-fire laser ───────────────────────────────────────────────────
  const handlePointerDown = useCallback((e) => {
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;
    swipeRef.current = {
      x: e.clientX - cr.left,
      y: e.clientY - cr.top,
    };
  }, []);

  const handlePointerUp = useCallback((e) => {
    if (!swipeRef.current || gameStateRef.current !== 'playing') return;
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;

    const x1 = swipeRef.current.x;
    const y1 = swipeRef.current.y;
    const x2 = e.clientX - cr.left;
    const y2 = e.clientY - cr.top;
    swipeRef.current = null;

    // Minimum swipe distance
    const dist = Math.hypot(x2 - x1, y2 - y1);
    if (dist < 20) return;

    // Scale to virtual coords
    const scaleX = W / (cr.width || W);
    const scaleY = H / (cr.height || H);
    const sx1 = x1 * scaleX, sy1 = y1 * scaleY;
    const sx2 = x2 * scaleX, sy2 = y2 * scaleY;

    // Find closest meteor the laser line passes through
    let hitMeteor = null;
    let bestDist = Infinity;

    meteorsRef.current.forEach(m => {
      if (m.hit) return;
      // Distance from point m to line segment sx1,sy1 → sx2,sy2
      const A = m.x - sx1, B = m.y - sy1;
      const C = sx2 - sx1, D = sy2 - sy1;
      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      const t = lenSq > 0 ? Math.max(0, Math.min(1, dot / lenSq)) : 0;
      const closestX = sx1 + t * C;
      const closestY = sy1 + t * D;
      const d = Math.hypot(m.x - closestX, m.y - closestY);
      if (d < m.r + 8 && d < bestDist) {
        bestDist = d;
        hitMeteor = m;
      }
    });

    const laserColor = hitMeteor ? (hitMeteor.isTarget ? '#4ade80' : '#ef4444') : '#60a5fa';

    // Show laser
    setLaser({ x1: sx1, y1: sy1, x2: sx2, y2: sy2, color: laserColor, hit: !!hitMeteor });
    setTimeout(() => setLaser(null), 350);

    if (!hitMeteor) return; // miss

    if (hitMeteor.isTarget) {
      // Correct hit!
      scoreRef.current += 20;
      setScore(scoreRef.current);
      setFeedback({ msg: `💥 "${hitMeteor.word}"! +20`, type: 'good' });
      meteorsRef.current = meteorsRef.current.map(m =>
        m.id === hitMeteor.id ? { ...m, hit: true } : m
      );
      setTimeout(() => {
        setFeedback(null);
        pickNextTarget();
      }, 500);
    } else {
      // Wrong meteor → shield damage
      shieldsRef.current = Math.max(0, shieldsRef.current - 1);
      setShields(shieldsRef.current);
      setFeedback({ msg: `❌ "${hitMeteor.word}" — Wrong! −1 🛡️`, type: 'bad' });
      meteorsRef.current = meteorsRef.current.map(m =>
        m.id === hitMeteor.id ? { ...m, hit: true } : m
      );
      setTimeout(() => setFeedback(null), 900);
      if (shieldsRef.current <= 0) setTimeout(endGame, 400);
    }
  }, [pickNextTarget, endGame]);

  // ── Render meteors scaled to container ───────────────────────────────────
  const scaleToPercent = (val, max) => `${(val / max) * 100}%`;

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '400px',
      background: 'radial-gradient(ellipse at 50% 20%, #1e1b4b 0%, #0f0a1e 60%, #050208 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🛸</span>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#a78bfa', letterSpacing: '0.05em' }}>METEOR SMASHER</div>
            <div style={{ fontSize: '10px', color: '#4c1d95' }}>
              {phase === 3 ? '⚡ DOUBLE METEOR PHASE' : phase === 2 ? '⚡ SPEED PHASE' : 'Swipe to fire laser!'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Shields */}
          <div style={{ display: 'flex', gap: '3px' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ fontSize: '14px', filter: i < shields ? 'none' : 'grayscale(1) opacity(0.3)' }}>🛡️</span>
            ))}
          </div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '3px 10px' }}>🏆 {score}</div>
          <div style={{ fontSize: '12px', fontWeight: 800, color: '#a78bfa', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '8px', padding: '3px 10px' }}>⏱ {gameTimer}s</div>
        </div>
      </div>

      {/* IDLE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px' }}>
          <div style={{ fontSize: '56px' }}>🛸</div>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '20px', fontWeight: 900, color: '#a78bfa' }}>Meteor Smasher!</h3>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', maxWidth: '310px' }}>
              Read the <b>definition</b> below, then <b>swipe through</b> the meteor with the matching word to fire your laser!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 6px 20px rgba(124,58,237,0.3)',
          }}>
            🛸 LAUNCH LASER
          </button>
        </div>
      )}

      {/* PLAYING */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Definition display */}
          {target && (
            <div style={{
              padding: '8px 14px', background: 'rgba(124,58,237,0.15)',
              borderBottom: '1px solid rgba(124,58,237,0.25)', textAlign: 'center', flexShrink: 0,
            }}>
              <div style={{ fontSize: '10px', color: '#a78bfa', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Find the word that means:</div>
              <div style={{ fontSize: '13px', color: '#e2e8f0', fontWeight: 700, fontStyle: 'italic', maxWidth: '400px', margin: '0 auto' }}>
                "{target.definition}"
              </div>
            </div>
          )}

          {/* Feedback */}
          {feedback && (
            <div style={{
              position: 'absolute', top: '90px', left: '50%', transform: 'translateX(-50%)',
              zIndex: 30, padding: '6px 16px', borderRadius: '20px', fontWeight: 900, fontSize: '13px',
              background: feedback.type === 'good' ? 'rgba(16,185,129,0.92)' : 'rgba(239,68,68,0.92)',
              color: '#fff', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            }}>
              {feedback.msg}
            </div>
          )}

          {/* Meteor canvas */}
          <div
            ref={containerRef}
            style={{ flex: 1, position: 'relative', overflow: 'hidden', touchAction: 'none' }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* Star field */}
            {[...Array(20)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${(i * 37 + 11) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                width: i % 3 === 0 ? '2px' : '1px',
                height: i % 3 === 0 ? '2px' : '1px',
                borderRadius: '50%',
                background: `rgba(255,255,255,${0.2 + (i % 4) * 0.15})`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* Meteors */}
            {meteors.filter(m => !m.hit && m.y > -60).map(m => (
              <div key={m.id} style={{
                position: 'absolute',
                left: scaleToPercent(m.x, W),
                top: scaleToPercent(m.y, H),
                transform: `translate(-50%, -50%) rotate(${m.rot}deg)`,
                width: `${m.r * 2}px`,
                height: `${m.r * 2}px`,
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 30%, ${m.color}dd, ${m.color}66, ${m.color}22)`,
                border: `2px solid ${m.color}88`,
                boxShadow: `0 0 ${m.isTarget ? '16px' : '8px'} ${m.color}44, inset -3px -3px 6px rgba(0,0,0,0.4)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
                fontWeight: 900,
                fontSize: m.r > 38 ? '11px' : '10px',
                textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                textAlign: 'center',
                padding: '4px',
                pointerEvents: 'none',
                zIndex: 5,
              }}>
                {m.isTarget && (
                  <div style={{
                    position: 'absolute', inset: '-3px', borderRadius: '50%',
                    border: '2px solid #f59e0b',
                    animation: 'none',
                    opacity: 0.6,
                  }} />
                )}
                {m.word}
              </div>
            ))}

            {/* Laser beam */}
            {laser && (
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 20 }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                <defs>
                  <filter id="laserGlow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Outer glow */}
                <line x1={laser.x1} y1={laser.y1} x2={laser.x2} y2={laser.y2}
                  stroke={laser.color} strokeWidth="8" strokeLinecap="round"
                  opacity="0.3" filter="url(#laserGlow)" />
                {/* Core beam */}
                <line x1={laser.x1} y1={laser.y1} x2={laser.x2} y2={laser.y2}
                  stroke={laser.color} strokeWidth="2.5" strokeLinecap="round"
                  opacity="0.95" />
                {/* Hit flash */}
                {laser.hit && (
                  <circle cx={laser.x2} cy={laser.y2} r="14" fill={laser.color} opacity="0.5" />
                )}
              </svg>
            )}

            {/* Ship at bottom center */}
            <div style={{
              position: 'absolute', bottom: '8px', left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '28px', zIndex: 10,
              filter: 'drop-shadow(0 0 8px #a78bfa)',
            }}>
              🚀
            </div>

            <div style={{ position: 'absolute', bottom: '8px', right: '10px', fontSize: '10px', color: '#3730a3', fontWeight: 700 }}>
              Swipe through meteor
            </div>
          </div>
        </div>
      )}

      {/* DONE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '14px', padding: '24px' }}>
          <div style={{ fontSize: '56px' }}>{shields > 0 ? '🏆' : '💥'}</div>
          <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 900, color: '#a78bfa' }}>
            {shields > 0 ? 'Mission Complete!' : 'Shields Destroyed!'}
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#e2e8f0' }}>
            Final Score: <strong style={{ color: '#fbbf24', fontSize: '18px' }}>{score} pts</strong>
          </p>
          <button type="button" onClick={startGame} style={{
            padding: '10px 24px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff', fontWeight: 900, fontSize: '13px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          }}>
            <RotateCcw size={14} /> Relaunch
          </button>
        </div>
      )}
    </div>
  );
}
