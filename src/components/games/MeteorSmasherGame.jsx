import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, Volume2, Shield, Zap, Sparkles } from 'lucide-react';
import useArcadeStore from '../../stores/useArcadeStore';

/**
 * MeteorSmasherGame V3 — Upright Text & Easy Trackpad/Touch Controls
 *
 * Features:
 *  - 100% Upright & Legible Text: Meteor rocks spin on background, but WORDS NEVER ROTATE so kids can read easily.
 *  - Gentle descent speed (0.4 - 0.8 px/frame): gives 6-10s per wave to read definitions comfortably.
 *  - Dual Input: Direct Click/Tap ON meteor OR Drag/Swipe across screen for Macbook trackpads & touchscreens.
 *  - TTS Audio: Automatically pronounces definition & word with repeat audio button.
 *  - 3 Shields protection with rich Answer Reveal banner on wrong hit.
 */

export default function MeteorSmasherGame({ words = [], onComplete, isStandalone = false }) {
  const DEFAULT_WORDS = [
    { word: 'friction', definition: 'A force that slows things down when surfaces rub together.' },
    { word: 'slippery', definition: 'Very smooth — hard to grip or stand on.' },
    { word: 'bandage', definition: 'A clean cloth strip used to wrap and protect a wound.' },
    { word: 'corridor', definition: 'A long hallway inside a school building.' },
    { word: 'momentum', definition: 'The force that keeps a moving object moving forward.' },
    { word: 'velocity', definition: 'Speed measured in a specific direction.' },
    { word: 'caution', definition: 'Careful attention to avoid danger or mistakes.' },
    { word: 'medical', definition: 'Related to treating illness or injuries.' },
  ];

  const wordBank = words && words.length >= 4 ? words.map((w, i) => ({
    word: typeof w === 'string' ? w : (w.word || 'word'),
    definition: typeof w === 'object' && w.definition ? w.definition : DEFAULT_WORDS[i % DEFAULT_WORDS.length]?.definition || w,
  })) : DEFAULT_WORDS;

  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [shields, setShields] = useState(3);
  const [gameTimer, setGameTimer] = useState(60);
  const [meteors, setMeteors] = useState([]);
  const [laser, setLaser] = useState(null); // { x1, y1, x2, y2, color, hit }
  const [target, setTarget] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const meteorsRef = useRef([]);
  const shieldsRef = useRef(3);
  const scoreRef = useRef(0);
  const gameStateRef = useRef('idle');
  const targetRef = useRef(null);
  const frameRef = useRef(null);
  const swipeRef = useRef(null);
  const containerRef = useRef(null);

  const { consumePlayEnergy, recordHighScore } = useArcadeStore();

  const W = 600;
  const H = 420;

  const speak = useCallback((text) => {
    if (!text) return;
    try {
      window.speechSynthesis?.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.88;
      u.pitch = 1.05;
      u.lang = 'en-US';
      window.speechSynthesis?.speak(u);
    } catch (_) {}
  }, []);

  const makeMeteor = useCallback((isTarget = false, overrideWord = null, idx = 0) => {
    const pick = overrideWord || wordBank[Math.floor(Math.random() * wordBank.length)];
    const x = 70 + idx * 160 + (Math.random() - 0.5) * 40;
    const y = -40 - Math.random() * 60;
    const r = Math.max(38, Math.min(50, 34 + Math.floor(pick.word.length * 1.5)));

    return {
      id: `m_${Date.now()}_${idx}_${Math.random()}`,
      word: pick.word,
      isTarget,
      x: Math.max(r + 20, Math.min(W - r - 20, x)),
      y,
      vy: 0.45 + Math.random() * 0.35, // Relaxed gentle fall speed
      vx: (Math.random() - 0.5) * 0.3,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      r,
      color: isTarget ? '#f59e0b' : ['#6366f1', '#ec4899', '#0ea5e9', '#10b981', '#8b5cf6'][idx % 5],
      hit: false,
    };
  }, [wordBank]);

  const spawnWave = useCallback((currentTarget) => {
    const decoys = wordBank
      .filter(w => w.word !== currentTarget.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const waveWords = [currentTarget, ...decoys].sort(() => Math.random() - 0.5);

    const newMeteors = waveWords.map((item, i) =>
      makeMeteor(item.word === currentTarget.word, item, i)
    );

    meteorsRef.current = newMeteors;
    setMeteors([...newMeteors]);
    speak(currentTarget.definition);
  }, [wordBank, makeMeteor, speak]);

  const pickNextTarget = useCallback(() => {
    const t = wordBank[Math.floor(Math.random() * wordBank.length)];
    targetRef.current = t;
    setTarget(t);
    spawnWave(t);
  }, [wordBank, spawnWave]);

  // Physics animation loop
  const gameLoop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;

    meteorsRef.current = meteorsRef.current.map(m => {
      if (m.hit) return m;
      let { x, y, vx, vy, rot, rotSpeed, r } = m;

      x += vx;
      y += vy;
      rot += rotSpeed;

      // Reached bottom without hit
      if (y - r > H) {
        if (m.isTarget && !m.hit) {
          shieldsRef.current = Math.max(0, shieldsRef.current - 1);
          setShields(shieldsRef.current);
          setFeedback({
            msg: `🛡️ Missed: "${targetRef.current?.word}" (−1 shield)`,
            type: 'bad'
          });
          setTimeout(() => setFeedback(null), 1200);

          if (shieldsRef.current <= 0) {
            endGame();
            return m;
          }
          setTimeout(() => pickNextTarget(), 300);
        }
        return { ...m, hit: true };
      }

      return { ...m, x, y, vx, vy, rot };
    });

    setMeteors([...meteorsRef.current]);
    frameRef.current = requestAnimationFrame(gameLoop);
  }, [pickNextTarget]);

  // 1-second game timer
  useEffect(() => {
    if (gameState !== 'playing') return;
    const iv = setInterval(() => {
      if (!isStandalone) {
        const ok = consumePlayEnergy(1);
        if (!ok) { endGame(); return; }
      }
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
    scoreRef.current = 0;
    shieldsRef.current = 3;
    setScore(0);
    setShields(3);
    setGameTimer(60);
    setFeedback(null);
    setLaser(null);

    gameStateRef.current = 'playing';
    setGameState('playing');
    frameRef.current = requestAnimationFrame(gameLoop);
    setTimeout(pickNextTarget, 100);
  };

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  // Fire laser at a specific meteor (supports both Direct Click & Drag Slice)
  const fireLaserAtMeteor = useCallback((meteor) => {
    if (!meteor || meteor.hit || gameStateRef.current !== 'playing') return;

    const shipX = W / 2;
    const shipY = H - 20;

    const isCorrect = meteor.isTarget;
    const laserColor = isCorrect ? '#4ade80' : '#ef4444';

    // Show laser beam from rocket ship to meteor
    setLaser({
      x1: shipX,
      y1: shipY,
      x2: meteor.x,
      y2: meteor.y,
      color: laserColor,
      hit: true
    });
    setTimeout(() => setLaser(null), 300);

    if (isCorrect) {
      // Correct laser strike!
      scoreRef.current += 20;
      setScore(scoreRef.current);
      setFeedback({ msg: `💥 Laser Hit! "${meteor.word}" (+20 pts)`, type: 'good' });

      meteorsRef.current = meteorsRef.current.map(m =>
        m.id === meteor.id ? { ...m, hit: true } : m
      );

      setTimeout(() => {
        setFeedback(null);
        pickNextTarget();
      }, 700);
    } else {
      // Wrong meteor strike → shield damage + Answer Reveal
      shieldsRef.current = Math.max(0, shieldsRef.current - 1);
      setShields(shieldsRef.current);

      const correctWord = targetRef.current?.word || '';
      setFeedback({
        msg: `❌ Smashed "${meteor.word}" · Correct word: "${correctWord}"`,
        type: 'bad'
      });

      meteorsRef.current = meteorsRef.current.map(m =>
        m.id === meteor.id ? { ...m, hit: true } : m
      );

      setTimeout(() => setFeedback(null), 1600);
      if (shieldsRef.current <= 0) setTimeout(endGame, 500);
    }
  }, [pickNextTarget, endGame]);

  // Handle Trackpad Drag / Swipe
  const handlePointerDown = (e) => {
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;
    swipeRef.current = {
      x: (e.clientX - cr.left) * (W / cr.width),
      y: (e.clientY - cr.top) * (H / cr.height),
    };
  };

  const handlePointerUp = (e) => {
    if (!swipeRef.current || gameStateRef.current !== 'playing') return;
    const cr = containerRef.current?.getBoundingClientRect();
    if (!cr) return;

    const sx1 = swipeRef.current.x;
    const sy1 = swipeRef.current.y;
    const sx2 = (e.clientX - cr.left) * (W / cr.width);
    const sy2 = (e.clientY - cr.top) * (H / cr.height);
    swipeRef.current = null;

    // Find closest meteor to swipe path or end point
    let closest = null;
    let minD = Infinity;

    meteorsRef.current.forEach(m => {
      if (m.hit) return;
      const d = Math.hypot(m.x - sx2, m.y - sy2);
      if (d < m.r + 35 && d < minD) {
        minD = d;
        closest = m;
      }
    });

    if (closest) {
      fireLaserAtMeteor(closest);
    }
  };

  return (
    <div style={{
      width: '100%', height: '100%', minHeight: '420px',
      background: 'radial-gradient(ellipse at 50% 20%, #1e1b4b 0%, #0f0a1e 60%, #050208 100%)',
      borderRadius: '16px', display: 'flex', flexDirection: 'column',
      fontFamily: 'system-ui, sans-serif', userSelect: 'none', overflow: 'hidden',
    }}>
      {/* Top HUD */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', flexShrink: 0, zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '22px' }}>🛸</span>
          <div>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#a78bfa', letterSpacing: '0.05em' }}>METEOR SMASHER</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Click or Slice to Fire Laser</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Shields */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px 8px', borderRadius: '8px' }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ fontSize: '14px', filter: i < shields ? 'none' : 'grayscale(1) opacity(0.25)' }}>
                🛡️
              </span>
            ))}
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#fbbf24', background: 'rgba(251,191,36,0.12)', border: '1px solid rgba(251,191,36,0.3)', borderRadius: '8px', padding: '4px 12px' }}>
            🏆 {score} pts
          </div>
          <div style={{ fontSize: '13px', fontWeight: 900, color: '#a78bfa', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.25)', borderRadius: '8px', padding: '4px 12px' }}>
            ⏱ {gameTimer}s
          </div>
        </div>
      </div>

      {/* IDLE STATE */}
      {gameState === 'idle' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px', filter: 'drop-shadow(0 0 16px rgba(167,139,250,0.6))' }}>🛸</div>
          <div>
            <h3 style={{ margin: '0 0 8px', fontSize: '22px', fontWeight: 900, color: '#a78bfa' }}>
              Meteor Smasher Defense!
            </h3>
            <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', maxWidth: '340px', lineHeight: 1.5 }}>
              Read the definition, then <b>click or swipe across</b> the falling meteor with the correct word to blast it with your laser!
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '14px 32px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff', fontWeight: 900, fontSize: '15px', borderRadius: '14px',
            border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(124,58,237,0.4)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span>🛸</span> LAUNCH DEFENSE
          </button>
        </div>
      )}

      {/* PLAYING STATE */}
      {gameState === 'playing' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Definition Banner + Listen Audio Button */}
          {target && (
            <div style={{
              padding: '10px 16px', background: 'rgba(124,58,237,0.2)',
              borderBottom: '1.5px solid rgba(124,58,237,0.35)', textAlign: 'center', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <div>
                <div style={{ fontSize: '10px', color: '#c4b5fd', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  TARGET MEANING:
                </div>
                <div style={{ fontSize: '14px', color: '#f8fafc', fontWeight: 800, fontStyle: 'italic', maxWidth: '500px' }}>
                  "{target.definition}"
                </div>
              </div>
              <button
                type="button"
                onClick={() => speak(target.definition)}
                style={{
                  background: 'rgba(167,139,250,0.25)', border: '1px solid rgba(167,139,250,0.4)',
                  color: '#c4b5fd', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 800, flexShrink: 0
                }}
              >
                <Volume2 size={16} /> <span>Listen</span>
              </button>
            </div>
          )}

          {/* Feedback Overlay */}
          {feedback && (
            <div style={{
              position: 'absolute', top: '100px', left: '50%', transform: 'translateX(-50%)',
              zIndex: 40, padding: '8px 20px', borderRadius: '16px', fontWeight: 900, fontSize: '14px',
              background: feedback.type === 'good' ? 'rgba(16,185,129,0.95)' : 'rgba(239,68,68,0.95)',
              color: '#fff', boxShadow: '0 8px 28px rgba(0,0,0,0.6)', border: '2px solid rgba(255,255,255,0.4)',
              whiteSpace: 'nowrap',
            }}>
              {feedback.msg}
            </div>
          )}

          {/* Meteor Space Canvas */}
          <div
            ref={containerRef}
            style={{ flex: 1, position: 'relative', overflow: 'hidden', touchAction: 'none' }}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
          >
            {/* Star field */}
            {[...Array(24)].map((_, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${(i * 37 + 11) % 100}%`,
                top: `${(i * 53 + 7) % 100}%`,
                width: i % 3 === 0 ? '2px' : '1px',
                height: i % 3 === 0 ? '2px' : '1px',
                borderRadius: '50%',
                background: `rgba(255,255,255,${0.3 + (i % 4) * 0.2})`,
                pointerEvents: 'none',
              }} />
            ))}

            {/* Falling Meteors */}
            {meteors.filter(m => !m.hit).map(m => {
              const leftPct = (m.x / W) * 100;
              const topPct = (m.y / H) * 100;

              return (
                <div
                  key={m.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    fireLaserAtMeteor(m);
                  }}
                  style={{
                    position: 'absolute',
                    left: `${leftPct}%`,
                    top: `${topPct}%`,
                    transform: 'translate(-50%, -50%)',
                    width: `${m.r * 2}px`,
                    height: `${m.r * 2}px`,
                    cursor: 'pointer',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.1s',
                  }}
                  onMouseDown={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(0.92)'; }}
                  onMouseUp={(e) => { e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'; }}
                >
                  {/* Rotating Meteor Texture (background only) */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    transform: `rotate(${m.rot}deg)`,
                    background: `radial-gradient(circle at 35% 30%, ${m.color}ff 0%, ${m.color}88 60%, #0f172a 100%)`,
                    border: `2px solid ${m.color}`,
                    boxShadow: `0 0 16px ${m.color}66, inset -4px -4px 10px rgba(0,0,0,0.6)`,
                  }} />

                  {/* 100% FIXED HORIZONTAL TEXT (NEVER ROTATES!) */}
                  <div style={{
                    position: 'relative',
                    zIndex: 10,
                    color: '#ffffff',
                    fontWeight: 900,
                    fontSize: m.word.length > 8 ? '12px' : '13px',
                    letterSpacing: '0.03em',
                    textShadow: '0 2px 6px rgba(0,0,0,0.95), 0 0 10px rgba(0,0,0,0.8)',
                    textAlign: 'center',
                    padding: '4px',
                    pointerEvents: 'none',
                  }}>
                    {m.word}
                  </div>
                </div>
              );
            })}

            {/* Laser Beam SVG */}
            {laser && (
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 30 }} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                {/* Glow beam */}
                <line
                  x1={laser.x1} y1={laser.y1}
                  x2={laser.x2} y2={laser.y2}
                  stroke={laser.color}
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.4"
                />
                {/* Core laser */}
                <line
                  x1={laser.x1} y1={laser.y1}
                  x2={laser.x2} y2={laser.y2}
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                {/* Hit explosion ring */}
                <circle cx={laser.x2} cy={laser.y2} r="18" fill={laser.color} opacity="0.6" />
              </svg>
            )}

            {/* Rocket ship at bottom center */}
            <div style={{
              position: 'absolute', bottom: '10px', left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '32px', zIndex: 15,
              filter: 'drop-shadow(0 0 10px #a78bfa)',
              pointerEvents: 'none'
            }}>
              🚀
            </div>

            {/* Bottom guide */}
            <div style={{
              position: 'absolute', bottom: '6px', right: '12px',
              fontSize: '11px', color: '#64748b', fontWeight: 700, pointerEvents: 'none'
            }}>
              Click or swipe any meteor to fire laser!
            </div>
          </div>
        </div>
      )}

      {/* GAME OVER STATE */}
      {gameState === 'done' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '56px' }}>{shields > 0 ? '🏆' : '💥'}</div>
          <div>
            <h3 style={{ margin: '0 0 6px', fontSize: '24px', fontWeight: 900, color: '#a78bfa' }}>
              {shields > 0 ? 'Mission Complete!' : 'Shields Depleted!'}
            </h3>
            <p style={{ margin: 0, fontSize: '15px', color: '#cbd5e1' }}>
              Final Score: <strong style={{ color: '#fbbf24', fontSize: '20px' }}>{score} pts</strong>
            </p>
          </div>
          <button type="button" onClick={startGame} style={{
            padding: '12px 28px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
            color: '#fff', fontWeight: 900, fontSize: '14px', borderRadius: '12px',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <RotateCcw size={16} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
}
